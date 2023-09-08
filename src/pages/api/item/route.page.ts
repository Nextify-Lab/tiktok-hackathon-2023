// api/item/route

import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../firebase/admin";

const itemsCollection = db.collection("items");
const shopsCollection = db.collection("shops");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;

  switch (method) {
    case "GET":
      try {
        if (Object.keys(query).length === 0) {
          res.status(400).json({ error: "No search parameters provided" });
          return;
        }

        let queryRef: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> =
          itemsCollection.where("deleted", "==", false);

        // Handle price query
        if (query.price) {
          const value = parseFloat(query.price as string);
          if (!isNaN(value)) {
            queryRef = queryRef.where("price", "<=", value);
          } else {
            res.status(400).json({ error: `Invalid price parameter` });
            return;
          }
        }

        // Handle productName query separately
        if (query.productName) {
          const productName = query.productName;
          queryRef = queryRef.where("productName", "==", productName);
        }

        // Handle other parameters
        for (const key in query) {
          if (key !== "price" && key !== "productName") {
            queryRef = queryRef.where(key, "==", query[key]);
          }
        }

        const querySnapshot = await queryRef.get();
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        res.status(200).json(items);
      } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: error.toString() });
      }
      break;
  }
}
