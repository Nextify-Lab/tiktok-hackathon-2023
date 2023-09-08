import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../firebase/admin";

const transactionsCollection = db.collection("transactions");
const buyersCollection = db.collection("buyers");
const productsCollection = db.collection("products");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;

  switch (method) {
    case "GET":
      try {
        const { buyerId, productId } = query;

        let results: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[] =
          [];

        // Query based on buyerId
        if (buyerId) {
          const buyerSnapshot = await transactionsCollection
            .where("buyerId", "==", buyerId)
            .get();
          results = buyerSnapshot.docs;
        }

        // Query based on productId
        if (productId) {
          const productSnapshot = await transactionsCollection
            .where(`purchases.${productId}`, ">=", 0)
            .get();

          if (buyerId) {
            const productIds = new Set(
              productSnapshot.docs.map((doc) => doc.id)
            );
            results = results.filter((doc) => productIds.has(doc.id));
          } else {
            results = productSnapshot.docs;
          }
        }

        const transactions = results.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        res.status(200).json(transactions);
      } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: error.toString() });
      }
      break;

    case "POST":
      try {
        const { buyerId, purchases } = req.body as {
          buyerId: string;
          purchases: { [productId: string]: number };
        };

        // Validate that buyerId is a valid document ID in the buyersCollection
        console.log(buyerId);
        const buyerDoc = await buyersCollection.doc(buyerId).get();
        const buyerData = buyerDoc.data();

        if (!buyerData || buyerData.deleted) {
          res.status(400).json({ error: `Invalid buyerId parameter` });
          return;
        }

        // Validate and update product stock values
        const updatedStockPromises = Object.entries(purchases).map(
          async ([productId, quantity]) => {
            console.log("prodcutid", productId, "quantity", quantity);
            // Validate that productId is a valid document ID in the productsCollection
            const productDoc = await productsCollection.doc(productId).get();
            const productData = productDoc.data();

            if (!productData || productData.deleted) {
              throw new Error(`Invalid productId parameter: ${productId}`);
            }

            // Check if the requested quantity is greater than available stock
            if (quantity > productData.stock) {
              throw new Error(
                `Requested quantity for product ${productId} exceeds available stock`
              );
            }

            // Calculate the new stock value and update it
            const newStock = productData.stock - quantity;
            await productsCollection.doc(productId).update({ stock: newStock });

            // Return a key-value pair instead of an object
            return [productId, quantity];
          }
        );

        const updatedStockPairs = await Promise.all(updatedStockPromises);

        // Create the transaction in the transactionsCollection
        const transactionRef = await transactionsCollection.add({
          buyerId,
          purchases: Object.fromEntries(updatedStockPairs),
        });

        res.status(201).json({
          id: transactionRef.id,
          buyerId,
          purchases: Object.fromEntries(updatedStockPairs),
        });
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
