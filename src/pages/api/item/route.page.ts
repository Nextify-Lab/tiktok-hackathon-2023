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

        let allResults: FirebaseFirestore.DocumentData[] = [];

        // Always exclude deleted items
        const deletedItemsSnapshot = await itemsCollection
          .where("deleted", "==", false)
          .get();
        const deletedItems = deletedItemsSnapshot.docs.map((doc) => doc.data());

        allResults = deletedItems;

        // Handle price query
        if (query.price) {
          const value = parseFloat(query.price as string);
          if (!isNaN(value)) {
            const itemsUnderPriceSnapshot = await itemsCollection
              .where("price", "<=", value)
              .get();
            const itemsUnderPrice = itemsUnderPriceSnapshot.docs.map((doc) =>
              doc.data()
            );

            allResults = allResults.filter((item) =>
              itemsUnderPrice.some(
                (priceItem) => priceItem.productId === item.productId
              )
            );
          } else {
            res.status(400).json({ error: `Invalid price parameter` });
            return;
          }
        }

        // Handle other parameters
        for (const key in query) {
          if (key !== "price") {
            const paramSnapshot = await itemsCollection
              .where(key, "==", query[key])
              .get();
            const paramItems = paramSnapshot.docs.map((doc) => doc.data());

            allResults = allResults.filter((item) =>
              paramItems.some(
                (paramItem) => paramItem.productId === item.productId
              )
            );
          }
        }

        // Return the combined results
        const items = allResults.map((item) => ({
          id: item.productId,
          ...item,
        }));

        res.status(200).json(items);
      } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: error.toString() });
      }
      break;

    case "POST":
      try {
        const newItem = req.body as Partial<Item>;

        // Assign null to the buyerID if it's not provided in the request body
        if (!newItem.hasOwnProperty("buyerID")) {
          newItem.buyerID = null;
        }

        // Ensure that price is defined and a valid number
        if (
          typeof newItem.price !== "number" ||
          isNaN(newItem.price) ||
          newItem.price <= 0
        ) {
          res.status(400).json({
            error: "Price must be a positive number",
          });
          return;
        }

        // Check if shopId is defined
        if (!newItem.shopId) {
          res.status(400).json({
            error: "shopId is required",
          });
          return;
        }

        // Check if the shop with the provided shopId exists and is not deleted
        const shopId = newItem.shopId;
        const shopExistsDoc = await shopsCollection.doc(shopId).get();

        if (!shopExistsDoc.exists) {
          res.status(400).json({ error: `Invalid shopId parameter` });
          return;
        }

        // Add the new item to the database
        const docRef = await itemsCollection.add(newItem as Item);
        const createdItem = { ...newItem, productId: docRef.id };
        res.status(201).json(createdItem);
      } catch (error: any) {
        res.status(500).json({ error: error.toString() });
      }
      break;
  }
}
