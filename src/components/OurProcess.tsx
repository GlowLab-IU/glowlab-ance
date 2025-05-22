"use client";
import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Blocks,
  Shield,
  Upload,
  Brain,
  ClipboardList,
  BadgeCheck,
  LineChart,
  Building,
  FileText,
  UserCheck,
  Users,
} from "lucide-react";

type Step = {
  num: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
};

export default function OurProcess() {
  const [activeTab, setActiveTab] = useState<"patients" | "brands">("patients");
  const [animateHex, setAnimateHex] = useState(false);

  useEffect(() => {
    // Start hex animation after component mounts
    setAnimateHex(true);
  }, []);

  const patientsSteps: Step[] = [
    {
      num: "01",
      title: "Upload Your Photos",
      desc: "Take clear photos of your acne condition and securely upload them to our platform. Your privacy is guaranteed with end-to-end encryption.",
      icon: <Upload className="w-5 h-5" />,
    },
    {
      num: "02",
      title: "AI-Powered Analysis",
      desc: "Our advanced AI analyzes your skin condition, identifying acne type, severity, and underlying factors with 98% accuracy.",
      icon: <Brain className="w-5 h-5" />,
    },
    {
      num: "03",
      title: "Personalized Treatment Plan",
      desc: "Receive a customized treatment plan with product recommendations specifically matched to your skin condition.",
      icon: <ClipboardList className="w-5 h-5" />,
    },
    {
      num: "04",
      title: "Blockchain-Verified Products",
      desc: "Shop with confidence knowing all recommended products have been verified by experts and certified on the blockchain.",
      icon: <BadgeCheck className="w-5 h-5" />,
    },
    {
      num: "05",
      title: "Track Your Progress",
      desc: "Monitor your skin's improvement over time and receive ongoing recommendations as your condition changes.",
      icon: <LineChart className="w-5 h-5" />,
    },
  ];

  const brandsSteps: Step[] = [
    {
      num: "01",
      title: "Register Your Brand",
      desc: "Create a brand profile and submit your company information for verification on our platform.",
      icon: <Building className="w-5 h-5" />,
    },
    {
      num: "02",
      title: "Submit Product Details",
      desc: "Provide comprehensive information about your acne treatment products, including ingredients, clinical studies, and efficacy data.",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      num: "03",
      title: "Expert Review Process",
      desc: "Our team of dermatologists and skincare experts reviews your products for safety, efficacy, and quality.",
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
      title: "Connect with Patients",
      desc: "Your products are automatically matched with patients whose skin conditions would benefit from them.",
      icon: <Users className="w-5 h-5" />,
    },
  ];

  const handleTabChange = (tab: "patients" | "brands") => {
    setActiveTab(tab);
  };

  // Hex grid background animation variants
  const hexVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: [0.1, 0.3, 0.1],
      transition: {
        delay: i * 0.1,
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as const,
      },
    }),
  };

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Animated hex grid background */}
      <div className="absolute inset-0 z-0 opacity-20">
        {animateHex &&
          Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              custom={i % 5}
              variants={hexVariants}
              initial="hidden"
              animate="visible"
              className="absolute"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${30 + Math.random() * 40}px`,
                height: `${30 + Math.random() * 40}px`,
                clipPath:
                  "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                background: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
              }}
            />
          ))}
      </div>

      {/* Connected nodes animation */}
      <div className="absolute inset-0 z-0">
        <svg width="100%" height="100%" className="opacity-10">
          <defs>
            <linearGradient
              id="nodeGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <path
            d="M0,100 Q250,50 500,100 T1000,100"
            fill="none"
            stroke="url(#nodeGradient)"
            strokeWidth="2"
          />
          <path
            d="M0,200 Q250,150 500,200 T1000,200"
            fill="none"
            stroke="url(#nodeGradient)"
            strokeWidth="2"
          />
          <path
            d="M0,300 Q250,250 500,300 T1000,300"
            fill="none"
            stroke="url(#nodeGradient)"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg">
              <Blocks className="w-6 h-6 text-white" />
            </div>
            <span className="ml-3 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-bold">
              BLOCKCHAIN POWERED
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
            How GlowChain Works
          </h2>

          <p className="text-lg text-slate-300">
            Our platform combines AI diagnosis with blockchain verification to
            create a transparent, secure, and decentralized ecosystem for acne
            treatment.
          </p>
        </motion.div>

        {/* Tabs Navigation */}
        <div className="flex justify-center space-x-4 mb-16">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleTabChange("patients")}
            className={`text-base font-semibold py-3 px-8 rounded-xl transition-all duration-300 ${
              activeTab === "patients"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700"
            }`}
            aria-selected={activeTab === "patients"}
            role="tab"
          >
            For Patients
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleTabChange("brands")}
            className={`text-base font-semibold py-3 px-8 rounded-xl transition-all duration-300 ${
              activeTab === "brands"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700"
            }`}
            aria-selected={activeTab === "brands"}
            role="tab"
          >
            For Brands
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
          {activeTab === "patients" && (
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="relative z-10 rounded-2xl overflow-hidden border-2 border-blue-500/20 shadow-2xl shadow-blue-500/10">
                  <Image
                    src="/app.png"
                    alt="AI Skin Analysis"
                    width={600}
                    height={600}
                    className="object-cover"
                    priority
                  />

                  {/* Blockchain overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-purple-900/40 mix-blend-overlay"></div>

                  {/* Blockchain nodes */}
                  <div className="absolute inset-0 flex items-center justify-center"></div>
                </div>

                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-20 -z-10"></div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Your Journey to Clearer Skin
                </h3>

                <div className="space-y-8">
                  {patientsSteps.map(({ num, title, desc, icon }, index) => (
                    <motion.div
                      key={num}
                      initial={{ opacity: 0, x: 20 }}
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
                      {index < patientsSteps.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-8 bg-gradient-to-b from-blue-500 to-purple-500 opacity-50"></div>
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/camera" passHref>
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-6 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300">
                        Start Your Skin Journey
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "brands" && (
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Certify & Connect Your Products
                </h3>

                <div className="space-y-8">
                  {brandsSteps.map(({ num, title, desc, icon }, index) => (
                    <motion.div
                      key={num}
                      initial={{ opacity: 0, x: -20 }}
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
                      {index < brandsSteps.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-8 bg-gradient-to-b from-blue-500 to-purple-500 opacity-50"></div>
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-6 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300">
                      Register as a Brand Partner
                    </Button>
                  </motion.div>
                </div>
              </div>

              <div className="order-1 md:order-2 relative">
                <div className="relative z-10 rounded-2xl overflow-hidden border-2 border-blue-500/20 shadow-2xl shadow-blue-500/10">
                  <Image
                    src="/brands.png"
                    alt="Blockchain Certification"
                    width={600}
                    height={600}
                    className="object-cover"
                    priority
                  />

                  {/* Blockchain overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-purple-900/40 mix-blend-overlay"></div>

                  {/* Blockchain visualization */}
                  <div className="absolute inset-0 flex items-center justify-center"></div>
                </div>

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
