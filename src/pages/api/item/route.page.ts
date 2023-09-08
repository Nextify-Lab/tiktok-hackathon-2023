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

        // Fetch all items that are not deleted first
        const notDeletedItemsSnapshot = await itemsCollection
          .where("deleted", "==", false)
          .get();
        let notDeletedItems = notDeletedItemsSnapshot.docs.map((doc) =>
          doc.data()
        );

        const { price, productName, ...otherFilters } = query;

        if (price) {
          const priceItemsSnapshot = await itemsCollection
            .where("price", "<=", parseFloat(price as string))
            .get();
          const priceItems = priceItemsSnapshot.docs.map((doc) => doc.data());

          // Intersect results
          notDeletedItems = notDeletedItems.filter((item) =>
            priceItems.some(
              (priceItem) => priceItem.productId === item.productId
            )
          );
        }

        if (productName) {
          const nameItemsSnapshot = await itemsCollection
            .where("productName", "==", productName)
            .get();
          const nameItems = nameItemsSnapshot.docs.map((doc) => doc.data());

          // Intersect results
          notDeletedItems = notDeletedItems.filter((item) =>
            nameItems.some((nameItem) => nameItem.productId === item.productId)
          );
        }

        // Handle other parameters
        for (const key in otherFilters) {
          const paramItemsSnapshot = await itemsCollection
            .where(key, "==", otherFilters[key])
            .get();
          const paramItems = paramItemsSnapshot.docs.map((doc) => doc.data());

          // Intersect results
          notDeletedItems = notDeletedItems.filter((item) =>
            paramItems.some(
              (paramItem) => paramItem.productId === item.productId
            )
          );
        }

        // Return the combined results
        const items = notDeletedItems.map((item) => ({
          id: item.productId,
          ...item,
        }));

        res.status(200).json(items);
      } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: error.toString() });
      }
      break;
  }
}
