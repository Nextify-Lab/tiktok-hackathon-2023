import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../firebase/admin";

const groupBuysCollection = db.collection("groupBuys");
const transactionsCollection = db.collection("transactions");
const productsCollection = db.collection("products");
const buyersCollection = db.collection("buyers");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { id },
  } = req;

  try {
    if (typeof id !== "string") {
      res.status(400).json({ error: "Invalid groupBuy ID" });
      return;
    }

    switch (method) {
      case "GET":
        try {
          // Retrieve the groupBuy by ID
          const groupBuyDoc = await groupBuysCollection.doc(id).get();
          const groupBuyData = groupBuyDoc.data();

          if (!groupBuyData) {
            res.status(404).json({ error: "GroupBuy not found" });
            return;
          }

          res.status(200).json(groupBuyData);
        } catch (error: any) {
          res.status(500).json({ error: error.toString() });
        }
        break;

      case "POST":
        try {
          const groupBuyDoc = await groupBuysCollection.doc(id).get();
          const groupBuyData = groupBuyDoc.data();

          if (!groupBuyData || groupBuyData.status !== "pending") {
            res.status(400).json({ error: "Invalid GroupBuy session" });
            return;
          }

          // Create a transaction for each buyer in the group buy
          for (const buyerId in groupBuyData.selections) {
            const purchases = groupBuyData.selections[buyerId];
            await transactionsCollection.add({
              buyerId,
              purchases,
              groupBuyId: id,
            });
          }

          // Reduce stock for each product based on aggregate quantities from all buyers
          const productUpdates: { [productId: string]: number } = {};
          for (const buyerId in groupBuyData.selections) {
            for (const productId in groupBuyData.selections[buyerId]) {
              if (!productUpdates[productId]) {
                productUpdates[productId] = 0;
              }
              productUpdates[productId] +=
                groupBuyData.selections[buyerId][productId];
            }
          }

          for (const productId in productUpdates) {
            const productDoc = await productsCollection.doc(productId).get();
            const productData = productDoc.data();
            if (!productData) {
              throw new Error(`Product ${productId} not found`);
            }

            const newStock = productData.stock - productUpdates[productId];

            await productsCollection.doc(productId).update({ stock: newStock });
          }

          // Update the status of the GroupBuy session
          await groupBuysCollection.doc(id).update({ status: "completed" });
          res.status(200).json({ message: "GroupBuy completed successfully" });
        } catch (error: any) {
          res.status(500).json({ error: error.toString() });
        }
        break;

      case "PUT":
        try {
          const { buyerId, productId, quantity } = req.body;

          // Retrieve the GroupBuy to check its current status
          const groupBuyDoc = await groupBuysCollection.doc(id).get();
          const groupBuyData = groupBuyDoc.data();

          if (!groupBuyData) {
            res.status(404).json({ error: "GroupBuy not found" });
            return;
          }

          if (groupBuyData.status !== "pending") {
            res
              .status(400)
              .json({ error: "GroupBuy is not in 'pending' status" });
            return;
          }

          // Validation of buyer, product, and quantity
          const buyerDoc = await buyersCollection.doc(buyerId).get();
          const buyerData = buyerDoc.data();
          if (!buyerData || buyerData.deleted) {
            res.status(400).json({ error: "Invalid buyerId" });
            return;
          }

          const productDoc = await productsCollection.doc(productId).get();
          const productData = productDoc.data();
          if (
            !productData ||
            productData.deleted ||
            quantity > productData.stock
          ) {
            res
              .status(400)
              .json({ error: "Invalid productId or insufficient stock" });
            return;
          }

          // Add/update the buyer's selection in the group buy session
          await groupBuysCollection.doc(id).update({
            [`selections.${buyerId}.${productId}`]: quantity,
          });

          res.status(200).json({ message: "Selection updated successfully" });
        } catch (error: any) {
          res.status(500).json({ error: error.toString() });
        }
        break;

      case "DELETE":
        try {
          // Retrieve the GroupBuy to check its current status
          const groupBuyDoc = await groupBuysCollection.doc(id).get();
          const groupBuyData = groupBuyDoc.data();

          if (!groupBuyData) {
            res.status(404).json({ error: "GroupBuy not found" });
            return;
          }

          if (groupBuyData.status === "completed") {
            res
              .status(400)
              .json({ error: "Cannot terminate a completed GroupBuy" });
            return;
          }

          // Soft delete by setting status to terminated
          await groupBuysCollection.doc(id).update({ status: "terminated" });
          res.status(200).json({ message: "GroupBuy terminated successfully" });
        } catch (error: any) {
          res.status(500).json({ error: error.toString() });
        }
        break;

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.toString() });
  }
}
