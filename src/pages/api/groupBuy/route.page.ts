import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../firebase/admin";

const groupBuysCollection = db.collection("groupBuys");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;

  switch (method) {
    case "GET":
      try {
        const { buyerId, productId, status } = query;

        let allGroupBuysSnapshot = await groupBuysCollection.get();
        let results: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[] =
          allGroupBuysSnapshot.docs;

        if (buyerId) {
          results = results.filter((doc) =>
            (doc.data().buyerIds || []).includes(buyerId)
          );
        }

        if (productId) {
          const productKey =
            typeof productId === "string" ? productId : productId[0];

          results = results.filter((doc) => {
            const buyerSelections = doc.data().selections || {};
            for (const buyerId in buyerSelections) {
              if (buyerSelections.hasOwnProperty(buyerId)) {
                if (buyerSelections[buyerId][productKey] >= 0) {
                  return true;
                }
              }
            }
            return false;
          });
        }

        if (status) {
          results = results.filter((doc) => doc.data().status === status);
        }

        const groupBuys = results.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        res.status(200).json(groupBuys);
      } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: error.toString() });
      }
      break;

    case "POST":
      try {
        const { shopId } = req.body;
        const groupBuyRef = await groupBuysCollection.add({
          shopId,
          selections: {},
          status: "pending",
        });

        res.status(201).json({
          id: groupBuyRef.id,
          shopId,
          selections: {},
          status: "pending",
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
