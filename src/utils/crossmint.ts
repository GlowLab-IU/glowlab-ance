// utils/crossmint.ts
export async function mintWithCrossmint(
  metadataUri: string,
  recipient: string // e.g. your wallet publicKey.toBase58()
) {
  const projectId = process.env.NEXT_PUBLIC_CROSSMINT_PROJECT_ID!;
  const clientSecret = process.env.CROSSMINT_CLIENT_SECRET!;
  const env = process.env.CROSSMINT_ENVIRONMENT!;
  const url = `https://${env}.crossmint.com/api/2022-06-09/collections/default/nfts`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-project-id": projectId,
      "x-client-secret": clientSecret,
      accept: "application/json",
    },
    body: JSON.stringify({
      recipient: `solana:${recipient}`, // deliver to Solana wallet
      metadata: metadataUri, // Pinata gateway URL
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Crossmint mint failed: ${err}`);
  }
  return res.json();
}
