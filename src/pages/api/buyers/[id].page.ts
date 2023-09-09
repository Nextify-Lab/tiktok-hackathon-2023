import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../firebase/admin";

const buyersCollection = db.collection("buyers");
const transactionsCollection = db.collection("transactions");
const productsCollection = db.collection("products");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { id },
    body,
  } = req;

  switch (method) {
    case "GET":
      try {
        if (typeof id !== "string") {
          res.status(400).json({ error: "Invalid ID" });
          return;
        }

        const buyerDoc = await buyersCollection.doc(id).get();
        let buyer: Buyer | null = null; // Initialize buyer to null

        if (buyerDoc.exists) {
          const buyerData = buyerDoc.data() as Omit<Buyer, "id">;

          buyer = {
            id: buyerDoc.id,
            username: buyerData.username,
            age: buyerData.age,
            address: buyerData.address,
            deleted: buyerData.deleted,
          };

          if (buyer.deleted) {
            res.status(404).json({ error: "Buyer not found" });
            return; // Add a return here to exit early
          }
        } else {
          res.status(404).json({ error: "Buyer not found" });
          return; // Add a return here to exit early
        }

        // Check if withItems query parameter is true
        if (req.query.withItems === "true") {
          const transactionsSnapshot = await transactionsCollection
            .where("buyerId", "==", id)
            .get();

          const transactions = await Promise.all(
            transactionsSnapshot.docs.map(async (transactionDoc) => {
              const transactionData = transactionDoc.data();
              const items = await Promise.all(
                Object.entries(transactionData.purchases).map(
                  async ([productId, quantity]) => {
                    const productDoc = await productsCollection.doc(productId).get();
                    const productData = productDoc.data();
                    return {
                      productId,
                      itemName: productData?.productName,
                      quantity,
                      price: productData?.price,
                      groupbuyId: transactionData.groupbuyId || null,
                    };
                  }
                )
              );
              return {
                transactionId: transactionDoc.id,
                items,
              };
            })
          );

          res.status(200).json({ buyer, transactions });
        } else {
          res.status(200).json(buyer);
        }

      } catch (error: any) {
        res.status(500).json({ error: (error as Error).message });
      }
      break;

    // case "GET":
    //   try {
    //     if (typeof id !== "string") {
    //       res.status(400).json({ error: "Invalid ID" });
    //       return;
    //     }

    //     const buyerDoc = await buyersCollection.doc(id).get();
    //     let buyer: Buyer | null = null;

    //     if (buyerDoc.exists) {
    //       const buyerData = buyerDoc.data() as Omit<Buyer, "id">;

    //       const buyer: Buyer = {
    //         id: buyerDoc.id,
    //         username: buyerData.username,
    //         age: buyerData.age,
    //         address: buyerData.address,
    //         deleted: buyerData.deleted,
    //       };

    //       if (buyer.deleted) {
    //         res.status(404).json({ error: "Buyer not found" });
    //         // return;
    //       } else {
    //         res.status(200).json(buyer);
    //         // return;
    //       }
    //     } else {
    //       res.status(404).json({ error: "Buyer not found" });
    //       // return;
    //     }

    //     // Check if withItems query parameter is true
    //     if (req.query.withItems === "true") {
    //       const transactionsSnapshot = await transactionsCollection
    //         .where("buyerId", "==", id)
    //         .get();

    //       const transactions = await Promise.all(
    //         transactionsSnapshot.docs.map(async (transactionDoc) => {
    //           const transactionData = transactionDoc.data();
    //           const items = await Promise.all(
    //             Object.entries(transactionData.purchases).map(
    //               async ([productId, quantity]) => {
    //                 const productDoc = await productsCollection.doc(productId).get();
    //                 const productData = productDoc.data();
    //                 return {
    //                   productId,
    //                   itemName: productData?.productName,
    //                   quantity,
    //                   price: productData?.price,
    //                   groupbuyId: transactionData.groupbuyId || null,
    //                 };
    //               }
    //             )
    //           );
    //           return {
    //             transactionId: transactionDoc.id,
    //             items,
    //           };
    //         })
    //       );

    //       res.status(200).json({ buyer, transactions });
    //     } else {
    //       res.status(200).json(buyer);
    //     }

    //   } catch (error: any) {
    //     res.status(500).json({ error: (error as Error).message });
    //   }
    //   break;
    case "PUT":
      try {
        if (typeof id !== "string") {
          res.status(400).json({ error: "Invalid ID" });
          return;
        }

        const buyerDoc = await buyersCollection.doc(id).get();

        if (!buyerDoc.exists) {
          res.status(404).json({ error: "Buyer not found" });
          return;
        }

        const updatedBuyerData: Partial<Buyer> = {
          ...buyerDoc.data(),
          ...body,
        };

        // Update the buyer document in the database
        await buyersCollection.doc(id).update(updatedBuyerData);
        console.log("PUT request - ID:", id);
        console.log("PUT request - Body:", body);

        res.status(200).json({ message: "Buyer updated successfully" });
      } catch (error: unknown) {
        res.status(500).json({ error: (error as Error).message });
      }
      break;
    case "DELETE":
      try {
        if (typeof id !== "string") {
          res.status(400).json({ error: "Invalid ID" });
          return;
        }

        await buyersCollection.doc(id).update({ deleted: true });

        res.status(200).json({ message: "Buyer deleted successfully" });
      } catch (error: unknown) {
        res.status(500).json({ error: (error as Error).message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
