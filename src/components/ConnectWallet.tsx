"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const ConnectWallet = () => {
  return (
    <div className="p-4">
      <WalletMultiButton />
    </div>
  );
};

export default ConnectWallet;
