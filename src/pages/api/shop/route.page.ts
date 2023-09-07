import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../firebase/admin";

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
          shopsCollection;

        // Exclude deleted shops by default
        queryRef = queryRef.where("deleted", "==", false);

        // Iterate through query parameters
        for (const key in query) {
          if (key === "rating") {
            // Handle numeric comparison for the "rating" field
            const ratingValue = parseFloat(query[key] as string);
            if (!isNaN(ratingValue)) {
              queryRef = queryRef.where(key, ">=", ratingValue);
            } else {
              res.status(400).json({ error: "Invalid rating parameter" });
              return;
            }
          } else if (key === "id") {
            // Allow searching by document ID
            queryRef = queryRef.where("id", "==", query[key]);
          } else {
            // Handle exact matches for other fields
            queryRef = queryRef.where(key, "==", query[key]);
          }
        }

        const querySnapshot = await queryRef.get();
        const shops = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Include the document ID
          ...doc.data(),
        }));

        res.status(200).json(shops);
      } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: error.toString() });
      }
      break;

    case "POST":
      try {
        const newShop = req.body as Shop;

        // Check if a shop with the same tiktokUsername and storeName exists
        const shopExistsQuery = await shopsCollection
          .where("tiktokUsername", "==", newShop.tiktokUsername)
          .where("storeName", "==", newShop.storeName)
          .get();

        if (!shopExistsQuery.empty) {
          res.status(400).json({
            error:
              "A shop with the same TikTok username and store name already exists",
          });
          return;
        }

        // Add the new shop to the database
        const docRef = await shopsCollection.add(newShop);
        const createdShop = { ...newShop, id: docRef.id };
        res.status(201).json(createdShop);
      } catch (error: any) {
        res.status(500).json({ error: error.toString() });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
