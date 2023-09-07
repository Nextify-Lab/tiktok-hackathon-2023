// api/item/[id].ts

import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../firebase/admin";

const itemsCollection = db.collection("items");
const buyersCollection = db.collection("buyers");
const shopsCollection = db.collection("shops");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { id },
    body,
  } = req;

  try {
    if (typeof id !== "string") {
      res.status(400).json({ error: "Invalid item ID" });
      return;
    }

    // Check if the item with the given ID exists
    const itemDoc = await itemsCollection.doc(id).get();
    const itemData = itemDoc.data();

    if (!itemData) {
      res.status(404).json({ error: "Item not found" });
      return;
    }

    switch (method) {
      case "GET":
        res.status(200).json(itemData);
        break;

      case "PUT":
        try {
          // Check if the provided buyer ID exists in the buyersCollection
          const buyerId = body.buyerID;
          const buyerExistsDoc = await buyersCollection.doc(buyerId).get();

          if (!buyerExistsDoc.exists) {
            res.status(400).json({ error: `Invalid buyerID parameter` });
            return;
          }

          // Check if the item already has a buyer
          if (itemData.buyerID) {
            res.status(400).json({ error: `Item already purchased` });
            return;
          }

          // Update the item's buyerID
          await itemsCollection.doc(id).update({ buyerID: buyerId });

          // Fetch the updated item data after the update
          const updatedItemDoc = await itemsCollection.doc(id).get();
          const updatedItemDataAfterUpdate = updatedItemDoc.data();

          res.status(200).json(updatedItemDataAfterUpdate);
        } catch (error: any) {
          res.status(500).json({ error: error.toString() });
        }
        break;

      case "PATCH":
        try {
          // Update only the specified properties
          const updates = {
            productName: body.productName,
            shopId: body.shopId,
            description: body.description,
            price: parseFloat(body.price),
          };

          // Check if shopId is defined and valid
          if (!updates.shopId) {
            res.status(400).json({
              error: "shopId is required",
            });
            return;
          }

          const shopId = updates.shopId;
          const shopExistsDoc = await shopsCollection.doc(shopId).get();

          if (!shopExistsDoc.exists) {
            res.status(400).json({ error: `Invalid shopId parameter` });
            return;
          }

          // Check if the price is valid (not negative)
          if (isNaN(updates.price) || updates.price < 0) {
            res.status(400).json({
              error: "Price must be a non-negative number",
            });
            return;
          }

          // Update the item data
          await itemsCollection.doc(id).update(updates);

          // Fetch the updated item data after the update
          const updatedItemDoc = await itemsCollection.doc(id).get();
          const updatedItemDataAfterUpdate = updatedItemDoc.data();

          res.status(200).json(updatedItemDataAfterUpdate);
        } catch (error: any) {
          res.status(500).json({ error: error.toString() });
        }
        break;

      case "DELETE":
        // Soft delete by setting the "deleted" attribute to true
        await itemsCollection.doc(id).update({ deleted: true });
        res.status(204).end();
        break;

      default:
        res.setHeader("Allow", ["GET", "PUT", "PATCH", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.toString() });
  }
}
