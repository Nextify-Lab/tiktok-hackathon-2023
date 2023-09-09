import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../firebase/admin";

const productsCollection = db.collection("products");
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
      res.status(400).json({ error: "Invalid product ID" });
      return;
    }

    // Check if the product with the given ID exists
    const productDoc = await productsCollection.doc(id).get();
    const productData = productDoc.data();

    if (!productData) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    switch (method) {
      case "GET":
        res.status(200).json(productData);
        break;

      case "PUT":
        try {
          // Validate that the shopId is a valid document ID in the shopsCollection
          const { shopId, price, description, productName } = body;

          const shopDoc = await shopsCollection.doc(shopId).get();
          const shopData = shopDoc.data();

          if (!shopData || shopData.deleted) {
            res.status(400).json({ error: `Invalid shopId parameter` });
            return;
          }

          // Allow updating only specific attributes (shopId, price, description, productName)
          const updatedData: Partial<typeof body> = {};

          if (shopId) {
            updatedData.shopId = shopId;
          }
          if (price) {
            updatedData.price = price;
          }
          if (description) {
            updatedData.description = description;
          }
          if (productName) {
            updatedData.productName = productName;
          }

          // Update the product information
          await productsCollection.doc(id).update(updatedData);

          res.status(200).json({
            message: "Product and related items updated successfully",
          });
        } catch (error: any) {
          res.status(500).json({ error: error.toString() });
        }
        break;

      case "PATCH":
        try {
          // Check if the product stock is being updated
          const { addedstock } = body;
          if (typeof addedstock !== "number" || addedstock <= 0) {
            res.status(400).json({ error: "Invalid stock value" });
            return;
          }

          // Calculate the new stock value
          const newStock = (productData.stock || 0) + addedstock;

          // Update the product with the new stock value
          await productsCollection.doc(id).update({ stock: newStock });

          res.status(200).json({ message: "Stock added successfully" });
        } catch (error: any) {
          res.status(500).json({ error: error.toString() });
        }
        break;

      case "DELETE":
        try {
          // Change stock to 0
          await productsCollection.doc(id).update({ stock: 0 });

          res.status(204).end();
        } catch (error: any) {
          res.status(500).json({ error: error.toString() });
        }
        break;

      default:
        res.setHeader("Allow", ["GET", "PATCH", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.toString() });
  }
}
