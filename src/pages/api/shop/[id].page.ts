import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../firebase/admin";

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
      res.status(400).json({ error: "Invalid shop ID" });
      return;
    }

    // Check if the shop with the given ID exists
    const shopDoc = await shopsCollection.doc(id).get();
    const shopData = shopDoc.data();

    if (!shopData) {
      res.status(404).json({ error: "Shop not found" });
      return;
    }

    switch (method) {
      case "GET":
        res.status(200).json(shopData);
        break;

      case "PATCH":
        try {
          if (typeof id !== "string") {
            res.status(400).json({ error: "Invalid ID" });
            return;
          }

          const shopDoc = await shopsCollection.doc(id).get();

          if (!shopDoc.exists) {
            res.status(404).json({ error: "Shop not found" });
            return;
          }

          // Assuming that you have the new shop data in the request body
          const updatedShopData = req.body as Shop;

          // Check if the storeName and tiktokUsername combination already exists
          const shopExistsQuery = await shopsCollection
            .where("storeName", "==", updatedShopData.storeName)
            .where("tiktokUsername", "==", updatedShopData.tiktokUsername)
            .get();

          if (!shopExistsQuery.empty && shopExistsQuery.docs[0].id !== id) {
            res.status(400).json({
              error:
                "Shop with given storeName and tiktokUsername already exists",
            });
            return;
          }

          // Convert the Shop instance to a plain object for Firebase
          const shopToUpdate = { ...updatedShopData };

          // Update the shop document in the database
          await shopsCollection.doc(id).update(shopToUpdate);

          res.status(200).json({ message: "Shop updated successfully" });
        } catch (error: any) {
          res.status(500).json({ error: error.toString() });
        }
        break;

      case "DELETE":
        // Soft delete by setting the "deleted" attribute to true
        await shopsCollection.doc(id).update({ deleted: true });
        res.status(204).end();
        break;

      default:
        res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.toString() });
  }
}
