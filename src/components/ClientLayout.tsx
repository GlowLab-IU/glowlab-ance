"use client";

import Header from "./Header";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="pt-12">{children}</div>
    </>
  );
}
