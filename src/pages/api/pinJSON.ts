import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end("Method Not Allowed");
  }

  const { metadata } = req.body;
  const PINATA_KEY = process.env.PINATA_API_KEY!;
  const PINATA_SECRET = process.env.PINATA_SECRET_API_KEY!;
  const PINATA_URL = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

  try {
    const resp = await axios.post(PINATA_URL, metadata, {
      headers: {
        pinata_api_key: PINATA_KEY,
        pinata_secret_api_key: PINATA_SECRET,
        "Content-Type": "application/json",
      },
      timeout: 30000,
    });
    const ipfsHash = resp.data.IpfsHash;
    if (!ipfsHash) throw new Error("Pinata missing IpfsHash");
    const gateway = process.env.PINATA_GATEWAY_DOMAIN!;
    const uri = `https://${gateway}/ipfs/${ipfsHash}`;
    return res.status(200).json({ uri, ipfsHash });
  } catch (err: any) {
    const message = err.response?.data || err.message;
    return res.status(500).json({ error: message });
  }
}
