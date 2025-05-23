"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Filter, Plus, Search, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { AnimatedBackground } from "@/components/ui/animated-background";
import { GradientText } from "@/components/ui/gradient-text";
import { GradientButton } from "@/components/ui/gradient-button";
import { GradientCard } from "@/components/ui/gradient-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { ProductTable } from "@/components/dashboard/product-table";
import { CertificateTable } from "@/components/dashboard/certificate-table";
import { ActivityCard } from "@/components/dashboard/activity-card";
import { CertificationOverview } from "@/components/dashboard/certification-overview";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Pagination } from "@/components/dashboard/pagination";

// Sample data (giữ nguyên)
const products = [
  {
    name: "Premium Air Purifier X500",
    category: "Electronics",
    status: "active" as const,
    expiryDate: "Dec 15, 2025",
  },
  {
    name: "Eco-Friendly Water Filter",
    category: "Home Appliances",
    status: "expiring" as const,
    expiryDate: "Jun 30, 2025",
  },
  {
    name: "Medical Grade Mask N95",
    category: "Healthcare",
    status: "expired" as const,
    expiryDate: "Mar 15, 2025",
  },
];

const certificates = [
  {
    id: "CERT-2025-0042",
    type: "ISO 9001:2015",
    product: "Premium Air Purifier X500",
    authority: "International Standards Organization",
    status: "active" as const,
    expiryDate: "Dec 15, 2025",
  },
  {
    id: "CERT-2025-0036",
    type: "CE Marking",
    product: "Eco-Friendly Water Filter",
    authority: "European Commission",
    status: "expiring" as const,
    expiryDate: "Jun 30, 2025",
  },
  {
    id: "CERT-2025-0021",
    type: "FDA Approval",
    product: "Medical Grade Mask N95",
    authority: "Food and Drug Administration",
    status: "expired" as const,
    expiryDate: "Mar 15, 2025",
  },
];

const activities = [
  {
    icon: "check" as const,
    title: "Certificate Issued",
    description:
      "ISO 9001:2015 certificate issued for Premium Air Purifier X500",
    time: "2 hours ago",
  },
  {
    icon: "clock" as const,
    title: "Certification Expiring",
    description: "CE Marking for Eco-Friendly Water Filter expires in 30 days",
    time: "1 day ago",
  },
  {
    icon: "edit" as const,
    title: "Product Updated",
    description: "Medical Grade Mask N95 specifications updated",
    time: "3 days ago",
  },
];

const certificationStats = [
  {
    label: "Active",
    value: "75%",
    percentage: 75,
    color: "bg-gradient-to-r from-green-500 to-emerald-500",
  },
  {
    label: "Expiring Soon",
    value: "9%",
    percentage: 9,
    color: "bg-gradient-to-r from-amber-500 to-orange-500",
  },
  {
    label: "Expired",
    value: "6%",
    percentage: 6,
    color: "bg-gradient-to-r from-red-500 to-rose-500",
  },
  {
    label: "Pending",
    value: "10%",
    percentage: 10,
    color: "bg-gradient-to-r from-blue-500 to-indigo-500",
  },
];

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      <AnimatedBackground />

      <header className="sticky top-0 z-10 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
        <div className="px-20 flex h-16 items-center justify-between pt-6 py-4">
          <div className="flex items-center gap-2 font-semibold">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-bold">
              PRODUCT CERTIFICATION MANAGEMENT
            </span>
          </div>
<<<<<<< HEAD
=======
<<<<<<< HEAD
          <div className="flex items-center gap-4 ">
            <Button
              variant="outline"
              size="sm"
              className="border-slate-700 bg-[darkgreen] text-slate-300 hover:bg-[darkgreen] hover:text-white"
            >
              <Link
                href="/certification-process"
                className="flex items-center "
              >
                <ShieldCheck className="mr-2 h-4 w-4 " />
=======
>>>>>>> a3ce03e
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white"
            >
              <Link href="/certification-process" className="flex items-center">
                <ShieldCheck className="mr-2 h-4 w-4" />
<<<<<<< HEAD
=======
>>>>>>> 9114ea5 (Initial commit)
>>>>>>> a3ce03e
                Certification Process
              </Link>
            </Button>
            <GradientButton size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New Product
            </GradientButton>
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10 px-20 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <GradientText as="h1" className="text-3xl mb-1">
            Dashboard
          </GradientText>
          <p className="text-slate-300">
            Manage your products and certification status
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <StatCard
            title="Total Products"
            value="128"
            subtext="+6 from last month"
            delay={0.1}
          />
          <StatCard
            title="Active Certifications"
            value="96"
            subtext="75% of products certified"
            delay={0.2}
          />
          <StatCard
            title="Expiring Soon"
            value="12"
            subtext="Renewal required within 30 days"
            delay={0.3}
          />
        </div>

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8"
        >
          <Tabs defaultValue="products" className="w-full">
            {/* Bọc TabsList và Search/Filter trong một div riêng, đặt trước TabsContent */}
            <div className="flex items-center justify-between mb-4">
              {" "}
              {/* Thêm khoảng cách dưới nếu cần */}
              <TabsList className="bg-slate-800/50 border border-slate-700/50 p-1">
                {["products", "certificates", "pending"].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="data-[state=active]:bg-gradient-to-r
                         data-[state=active]:from-blue-600
                         data-[state=active]:to-purple-600
                         data-[state=active]:text-white
                         data-[state=active]:shadow-lg
                         data-[state=active]:shadow-blue-500/20
                         text-slate-300"
                  >
                    {tab === "products"
                      ? "Products"
                      : tab === "certificates"
                      ? "Certificates"
                      : "Pending Approval"}
                  </TabsTrigger>
                ))}
              </TabsList>
              {/* Search & Filter */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-[200px] pl-8 md:w-[300px]
                         bg-slate-800/50 border-slate-700
                         text-slate-300
                         focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-slate-700 bg-slate-800/50
                       text-slate-300 hover:bg-slate-700/50 hover:text-white"
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Tab Contents */}
            {/* Đảm bảo TabsContent là con trực tiếp của Tabs */}
            <TabsContent value="products" className="mt-2">
              {" "}
              {/* Điều chỉnh margin top nếu đã có mb-4 ở trên */}
              <GradientCard
                footer={
                  <Pagination
                    currentPage={currentPage}
                    totalPages={43}
                    totalItems={128}
                    itemsPerPage={3}
                    onPageChange={setCurrentPage}
                  />
                }
              >
                <ProductTable products={products} />
              </GradientCard>
            </TabsContent>

            <TabsContent value="certificates" className="mt-2">
              <GradientCard
                footer={
                  <Pagination
                    currentPage={currentPage}
                    totalPages={32}
                    totalItems={96}
                    itemsPerPage={3}
                    onPageChange={setCurrentPage}
                  />
                }
              >
                <CertificateTable certificates={certificates} />
              </GradientCard>
            </TabsContent>

            <TabsContent value="pending" className="mt-2">
              <GradientCard>
                <EmptyState
                  title="No Pending Approvals"
                  description="There are currently no products waiting for certification approval. When you submit a product for certification, it will appear here."
                  buttonText="Submit New Product"
                />
              </GradientCard>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Activity & Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 grid gap-6 md:grid-cols-2"
        >
          <ActivityCard activities={activities} />
          <CertificationOverview stats={certificationStats} />
        </motion.div>
      </main>
    </div>
  );
}
