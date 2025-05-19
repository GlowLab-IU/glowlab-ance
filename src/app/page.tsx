import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h2 className="text-3xl font-bold mb-6">Welcome to GlowChain MVP</h2>
      <Link
        href="/camera"
        className="bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-600"
      >
        Start Skin Scan
      </Link>
    </div>
  );
}
