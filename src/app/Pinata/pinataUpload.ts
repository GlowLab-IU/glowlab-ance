export interface AcneResult {
  bounding_boxes: number[][];
  total_acnes: number;
  skin_type: string;
  recommended_compositions: string[];
  raw_output_image?: string;
}

/**
 * POSTs metadata JSON to /api/pinJSON, returns the Pinata gateway URI and raw IPFS hash
 */
export async function uploadMetadataToPinata(
  result: AcneResult
): Promise<{ uri: string; ipfsHash: string }> {
  const metadata = {
    name: "Acne Diagnosis NFT",
    symbol: "ACNE",
    description:
      "This NFT contains the result of an AI-powered acne skin diagnosis.",
    seller_fee_basis_points: 0,
    image: result.raw_output_image || "",
    properties: {
      creators: [
        { address: "G5qtEie1iVQVAGNx7RDqiazUaLXh6g9AevsxsFdR6HmX", share: 100 },
      ],
      attributes: [
        { trait_type: "Total Acnes", value: result.total_acnes },
        { trait_type: "Skin Type", value: result.skin_type },
        {
          trait_type: "Recommended Compositions",
          value: result.recommended_compositions.join(", "),
        },
        {
          trait_type: "Bounding Boxes Count",
          value: result.bounding_boxes.length,
        },
      ],
    },
  };

  const resp = await fetch("/api/pinJSON", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ metadata }),
  });

  if (!resp.ok) {
    const errorBody = await resp.json().catch(() => ({}));
    throw new Error(errorBody.error || "Failed to pin JSON via proxy");
  }

  const { uri, ipfsHash } = await resp.json();
  return { uri, ipfsHash };
}
