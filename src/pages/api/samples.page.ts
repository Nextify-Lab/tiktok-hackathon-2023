// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type sampleTextType = {
  sample: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<sampleTextType[]>
) {
  res
    .status(200)
    .json([{ sample: "sampleText" }, { sample: "also sampleText" }]);
}
