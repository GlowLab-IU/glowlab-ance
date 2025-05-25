"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  ClipboardList,
  BadgeCheck,
  LineChart,
  Building,
  FileText,
  UserCheck,
  Users,
} from "lucide-react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { GradientText } from "@/components/ui/gradient-text";
import { GradientButton } from "@/components/ui/gradient-button";

type Step = {
  num: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
};

export default function CertificationProcess() {
  const [activeTab, setActiveTab] = useState<"products" | "authorities">(
    "products"
  );

  const productsSteps: Step[] = [
    {
      num: "01",
      title: "Register Your Product",
      desc: "Create a product profile and submit your product information for verification on our platform.",
      icon: <Building className="w-5 h-5" />,
    },
    {
      num: "02",
      title: "Submit Documentation",
      desc: "Provide comprehensive information about your product, including specifications, materials, and compliance data.",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      num: "03",
      title: "Expert Review Process",
      desc: "Our team of experts reviews your product for safety, quality, and compliance with industry standards.",
      icon: <UserCheck className="w-5 h-5" />,
    },
    {
      num: "04",
      title: "Blockchain Certification",
      desc: "Approved products receive a blockchain certificate that verifies their quality and creates an immutable record of authenticity.",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      num: "05",
      title: "Ongoing Monitoring",
      desc: "Your certification is monitored and you'll receive alerts when renewal or updates are needed.",
      icon: <LineChart className="w-5 h-5" />,
    },
  ];

  const authoritiesSteps: Step[] = [
    {
      num: "01",
      title: "Register Your Authority",
      desc: "Create an authority profile and submit your organization's credentials for verification.",
      icon: <Building className="w-5 h-5" />,
    },
    {
      num: "02",
      title: "Define Certification Standards",
      desc: "Establish the certification standards, requirements, and testing procedures for your industry.",
      icon: <ClipboardList className="w-5 h-5" />,
    },
    {
      num: "03",
      title: "Verification Process",
      desc: "Our platform verifies your authority's credentials and expertise in the certification domain.",
      icon: <BadgeCheck className="w-5 h-5" />,
    },
    {
      num: "04",
      title: "Blockchain Integration",
      desc: "Your authority is integrated with our blockchain network to issue tamper-proof certificates.",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      num: "05",
      title: "Connect with Products",
      desc: "Start certifying products and issuing blockchain-verified certificates through our platform.",
      icon: <Users className="w-5 h-5" />,
    },
  ];

  const renderBlockchainVisualization = () => (
    <div className="relative z-10 rounded-2xl overflow-hidden border-2 border-blue-500/20 shadow-2xl shadow-blue-500/10">
      <video
        src="/text.mp4"
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster="/text-poster.jpg" // optional: fallback image
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );

  const renderProcessSteps = (steps: Step[]) => (
    <div className="space-y-8">
      {steps.map(({ num, title, desc, icon }, index) => (
        <motion.div
          key={num}
          initial={{ opacity: 0, x: activeTab === "products" ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="relative pl-16 group"
        >
          <div className="absolute left-0 top-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
            {icon}
          </div>
          <div>
            <div className="flex items-center mb-2">
              <span className="text-xs font-mono text-blue-400 mr-2">
                {num}
              </span>
              <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                {title}
              </h4>
            </div>
            <p className="text-slate-300 text-sm">{desc}</p>
          </div>

          {/* Connector line */}
          {index < steps.length - 1 && (
            <div className="absolute left-6 top-12 w-0.5 h-8 bg-gradient-to-b from-blue-500 to-purple-500 opacity-50"></div>
          )}
        </motion.div>
      ))}
    </div>
  );

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white min-h-screen">
      <AnimatedBackground />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="ml-3 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-bold">
              BLOCKCHAIN POWERED
            </span>
          </div>

          <GradientText
            as="h2"
            className="text-3xl md:text-5xl font-extrabold mb-6"
          >
            Certification Process
          </GradientText>

          <p className="text-lg text-slate-300">
            Our platform combines expert verification with blockchain technology
            to create a transparent, secure, and immutable certification
            ecosystem.
          </p>
        </motion.div>

        {/* Tabs Navigation */}
        <div className="flex justify-center space-x-4 mb-16">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("products")}
            className={`text-base font-semibold py-3 px-8 rounded-xl transition-all duration-300 ${
              activeTab === "products"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700"
            }`}
            aria-selected={activeTab === "products"}
            role="tab"
          >
            For Products
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("authorities")}
            className={`text-base font-semibold py-3 px-8 rounded-xl transition-all duration-300 ${
              activeTab === "authorities"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700"
            }`}
            aria-selected={activeTab === "authorities"}
            role="tab"
          >
            For Certification Authorities
          </motion.button>
        </div>

        {/* Tabs Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          {activeTab === "products" && (
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                {renderBlockchainVisualization()}
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-20 -z-10"></div>
              </div>

              <div>
                <GradientText as="h3" className="text-2xl font-bold mb-8">
                  Product Certification Journey
                </GradientText>

                {renderProcessSteps(productsSteps)}

                <div className="mt-12">
                  <GradientButton
                    size="lg"
                    className="px-8 py-6 font-semibold rounded-xl"
                  >
                    Start Certification Process
                  </GradientButton>
                </div>
              </div>
            </div>
          )}

          {activeTab === "authorities" && (
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <GradientText as="h3" className="text-2xl font-bold mb-8">
                  Authority Certification Process
                </GradientText>

                {renderProcessSteps(authoritiesSteps)}

                <div className="mt-12">
                  <GradientButton
                    size="lg"
                    className="px-8 py-6 font-semibold rounded-xl"
                  >
                    Register as Certification Authority
                  </GradientButton>
                </div>
              </div>

              <div className="order-1 md:order-2 relative">
                {renderBlockchainVisualization()}
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-20 -z-10"></div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
