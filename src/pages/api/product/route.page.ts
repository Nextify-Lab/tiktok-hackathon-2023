import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../firebase/admin";

const productsCollection = db.collection("products");
const shopsCollection = db.collection("shops");
const itemsCollection = db.collection("items");

// Function to create multiple items with optional buyerID and return their doc IDs
async function createItems(
  shopId: string,
  productId: string, // Include productId as an input
  stock: number,
  price: number,
  description: string,
  productName: string
): Promise<string[]> {
  const itemSerialNumbers: string[] = [];

  for (let i = 0; i < stock; i++) {
    const itemRef = await itemsCollection.add({
      shopId,
      productId, // Store the productId in each item
      price: price,
      description: description,
      buyerID: null,
      deleted: false,
      productName: productName,
    });

    itemSerialNumbers.push(itemRef.id);
  }

  return itemSerialNumbers;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;

  switch (method) {
    case "GET":
      try {
        // You can provide query parameters to filter products
        let queryRef: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> =
          productsCollection;

        const { productId, price, description } = query;

        if (productId) {
          queryRef = queryRef.where("productId", "==", productId);
        }

        if (price) {
          queryRef = queryRef.where("price", "==", parseFloat(price as string));
        }

        if (description) {
          queryRef = queryRef.where("description", "==", description);
        }

        const querySnapshot = await queryRef.get();
        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Include the document ID
          ...doc.data(),
        }));

        res.status(200).json(products);
      } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: error.toString() });
      }
      break;

    case "POST":
      try {
        const { shopId, price, description, stock, productName } = req.body as {
          shopId: string;
          price: number;
          description: string;
          stock: number;
          productName: string;
        };

        // Check if the provided shopId exists in the shopsCollection
        const shopExistsDoc = await shopsCollection.doc(shopId).get();

        if (!shopExistsDoc.exists) {
          res.status(400).json({ error: `Invalid shopId parameter` });
          return;
        }

        // Create the product in the productsCollection with the stock value
        const productRef = await productsCollection.add({
          shopId,
          price,
          description,
          productName,
          stock, // Include stock value
          deleted: false,
        });

        // Create the specified number of items and get their doc IDs
        const itemSerialNumbers = await createItems(
          shopId,
          productRef.id, // Pass the product ID
          stock,
          price,
          description,
          productName
        );

        // Update the product with itemSerialNumbers
        await productRef.update({ itemSerialNumbers });

        // Add the product ID to the shop's productIds array
        const shopDoc = await shopExistsDoc.ref.get();
        const currentProductIds = shopDoc.get("productIds") || [];
        currentProductIds.push(productRef.id);

        await shopDoc.ref.update({ productIds: currentProductIds });

        res
          .status(201)
          .json({ id: productRef.id, ...req.body, itemSerialNumbers });
      } catch (error: any) {
        res.status(500).json({ error: error.toString() });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
