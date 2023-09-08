import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../firebase/admin";

const productsCollection = db.collection("products");
const itemsCollection = db.collection("items");

// Function to create multiple items with optional buyerID and return their doc IDs
async function createItems(
  shopId: string,
  productId: string,
  stock: number,
  price: number,
  description: string,
  productName: string
): Promise<string[]> {
  const itemSerialNumbers: string[] = [];

  for (let i = 0; i < stock; i++) {
    const itemRef = await itemsCollection.add({
      shopId,
      productId, // Include productId
      price,
      description,
      buyerID: null,
      deleted: false,
      productName,
    });

    itemSerialNumbers.push(itemRef.id);
  }

  return itemSerialNumbers;
}

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

      case "PATCH":
        try {
          // Allow updating only specific attributes (shopId, price, description, productName)
          const { shopId, price, description, productName } = body;
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

          // Update the items in the itemsCollection where buyerID is null
          const itemSerialNumbers = productData.itemSerialNumbers || [];

          for (const itemSerialNumber of itemSerialNumbers) {
            const itemDoc = await itemsCollection.doc(itemSerialNumber).get();
            const itemData = itemDoc.data();

            if (itemData && itemData.buyerID === null) {
              await itemsCollection.doc(itemSerialNumber).update(updatedData);
            }
          }

          res
            .status(200)
            .json({
              message: "Product and related items updated successfully",
            });
        } catch (error: any) {
          res.status(500).json({ error: error.toString() });
        }
        break;

      case "PUT":
        try {
          // Check if the product stock is being updated
          const { addedstock } = body;
          if (typeof addedstock !== "number" || addedstock <= 0) {
            res.status(400).json({ error: "Invalid stock value" });
            return;
          }

          // Calculate the new stock value
          const newStock = (productData.stock || 0) + addedstock;

          // Create new items and get their doc IDs, passing the productId
          const itemSerialNumbers = await createItems(
            productData.shopId,
            id, // Pass the product ID
            addedstock,
            productData.price, // Include price from productData
            productData.description, // Include description from productData
            productData.productName // Include productName from productData
          );

          // Update the product with the new stock value and itemSerialNumbers
          await productsCollection.doc(id).update({
            stock: newStock, // Update stock
            itemSerialNumbers: [
              ...(productData.itemSerialNumbers || []),
              ...itemSerialNumbers,
            ],
          });

          res.status(200).json({ message: "Stock added successfully" });
        } catch (error: any) {
          res.status(500).json({ error: error.toString() });
        }
        break;

      case "DELETE":
        try {
          // Change stock to 0
          await productsCollection.doc(id).update({ stock: 0 });

          // Turn deleted to true for items with null buyerID
          const itemSerialNumbers = productData.itemSerialNumbers || [];
          for (const itemSerialNumber of itemSerialNumbers) {
            const itemDoc = await itemsCollection.doc(itemSerialNumber).get();
            const itemData = itemDoc.data();

            if (itemData && itemData.buyerID === null) {
              await itemsCollection.doc(itemSerialNumber).update({
                deleted: true,
              });
            }
          }

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
