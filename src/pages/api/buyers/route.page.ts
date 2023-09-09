import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../firebase/admin";

const buyersCollection = db.collection("buyers");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;

  switch (method) {
    case "GET":
      try {
        if (Object.keys(query).length === 0) {
          res.status(400).json({ error: "No search parameters provided" });
          return;
        }

        let queryRef: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> =
          buyersCollection;
        for (const key in query) {
          if (key === "age") {
            const ageValue = parseInt(query[key] as string, 10); // Convert to base 10
            if (!isNaN(ageValue)) {
              // Check if the conversion was successful
              queryRef = queryRef.where(key, "==", ageValue);
            } else {
              res.status(400).json({ error: "Invalid age parameter" });
              return;
            }
          } else {
            // For other query parameters, you can proceed as before
            queryRef = queryRef.where(key, "==", query[key]);
          }
        }

        const querySnapshot = await queryRef.get();
        const buyers = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        res.status(200).json(buyers);
      } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: error.toString() });
      }
      break;

    case "POST":
      try {
        const newBuyer: Buyer = req.body;
        // Check if the username already exists
        const usernameExistsQuery = await buyersCollection
          .where("username", "==", newBuyer.username)
          .get();

        if (!usernameExistsQuery.empty) {
          res.status(400).json({ error: "Username already exists" });
          return;
        }

        // If the username is unique, add the newBuyer to the database
        const docRef = await buyersCollection.add(newBuyer);
        const createdBuyer = { ...newBuyer, id: docRef.id };
        res.status(201).json(createdBuyer);
      } catch (error: any) {
        res.status(500).json({ error: error.toString() });
      }
      break;
  }
}
