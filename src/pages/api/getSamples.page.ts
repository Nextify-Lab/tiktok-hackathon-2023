// src/pages/api/sample.ts
import { db } from "../../firebase/admin";
import type { NextApiRequest, NextApiResponse } from "next";

// TO CALL: /api/getSamples?id=l0fFrt0ZwKvj7v9oIenb
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const sampleId = req.query.id as string;

  try {
    const sampleDoc = await db.collection("samples").doc(sampleId).get();

    if (!sampleDoc.exists) {
      return res.status(404).json({ error: "sample not found" });
    }

    return res.status(200).json(sampleDoc.data());
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
};
