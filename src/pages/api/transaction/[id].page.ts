import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../firebase/admin";

const transactionsCollection = db.collection("transactions");

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
      res.status(400).json({ error: "Invalid transaction ID" });
      return;
    }

    switch (method) {
      case "GET":
        try {
          // Retrieve the transaction by ID
          const transactionDoc = await transactionsCollection.doc(id).get();
          const transactionData = transactionDoc.data();

          if (!transactionData) {
            res.status(404).json({ error: "Transaction not found" });
            return;
          }

          res.status(200).json(transactionData);
        } catch (error: any) {
          res.status(500).json({ error: error.toString() });
        }
        break;

      default:
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.toString() });
  }
}
