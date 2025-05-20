"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type Step = {
  num: string;
  title: string;
  desc: string;
  bg: string;
  textColor: string;
};

const patientsSteps: Step[] = [
  {
    num: "1",
    title: "Upload Your Photos",
    desc: "Take clear photos of your acne condition and securely upload them to our platform. Your privacy is guaranteed with end-to-end encryption.",
    bg: "bg-violet-100",
    textColor: "text-violet-700",
  },
  {
    num: "2",
    title: "AI-Powered Analysis",
    desc: "Our advanced AI analyzes your skin condition, identifying acne type, severity, and underlying factors with 98% accuracy.",
    bg: "bg-violet-100",
    textColor: "text-violet-700",
  },
  {
    num: "3",
    title: "Personalized Treatment Plan",
    desc: "Receive a customized treatment plan with product recommendations specifically matched to your skin condition.",
    bg: "bg-violet-100",
    textColor: "text-violet-700",
  },
  {
    num: "4",
    title: "Blockchain-Verified Products",
    desc: "Shop with confidence knowing all recommended products have been verified by experts and certified on the blockchain.",
    bg: "bg-violet-100",
    textColor: "text-violet-700",
  },
  {
    num: "5",
    title: "Track Your Progress",
    desc: "Monitor your skin's improvement over time and receive ongoing recommendations as your condition changes.",
    bg: "bg-violet-100",
    textColor: "text-violet-700",
  },
];

const brandsSteps: Step[] = [
  {
    num: "1",
    title: "Register Your Brand",
    desc: "Create a brand profile and submit your company information for verification on our platform.",
    bg: "bg-indigo-100",
    textColor: "text-white",
  },
  {
    num: "2",
    title: "Submit Product Details",
    desc: "Provide comprehensive information about your acne treatment products, including ingredients, clinical studies, and efficacy data.",
    bg: "bg-indigo-100",
    textColor: "text-indigo-700",
  },
  {
    num: "3",
    title: "Expert Review Process",
    desc: "Our team of dermatologists and skincare experts reviews your products for safety, efficacy, and quality.",
    bg: "bg-indigo-100",
    textColor: "text-indigo-700",
  },
  {
    num: "4",
    title: "Blockchain Certification",
    desc: "Approved products receive a blockchain certificate that verifies their quality and creates an immutable record of authenticity.",
    bg: "bg-indigo-100",
    textColor: "text-indigo-700",
  },
  {
    num: "5",
    title: "Connect with Patients",
    desc: "Your products are automatically matched with patients whose skin conditions would benefit from them.",
    bg: "bg-indigo-100",
    textColor: "text-indigo-700",
  },
];

export default function OurProcess() {
  const [activeTab, setActiveTab] = useState<"patients" | "brands">("patients");

  const handleTabChange = (tab: "patients" | "brands") => {
    setActiveTab(tab);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-violet-50 to-indigo-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="mb-4 inline-block bg-violet-100 text-violet-800 border border-violet-200 rounded-full px-3 py-1 text-sm font-semibold">
            Our Process
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-slate-900">
            How GlowChain Works
          </h2>
          <p className="text-lg text-slate-600">
            Our platform combines AI diagnosis with blockchain verification to
            create a transparent ecosystem for acne treatment.
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex justify-center space-x-8 mb-12">
          <button
            onClick={() => handleTabChange("patients")}
            className={`text-base font-semibold py-3 px-6 rounded-full transition-colors ${
              activeTab === "patients"
                ? "bg-violet-100 text-violet-900 shadow-md"
                : "text-slate-600 hover:text-violet-700"
            }`}
            aria-selected={activeTab === "patients"}
            role="tab"
          >
            For Patients
          </button>
          <button
            onClick={() => handleTabChange("brands")}
            className={`text-base font-semibold py-3 px-6 rounded-full transition-colors ${
              activeTab === "brands"
                ? "bg-indigo-100 text-indigo-900 shadow-md"
                : "text-slate-600 hover:text-indigo-700"
            }`}
            aria-selected={activeTab === "brands"}
            role="tab"
          >
            For Brands
          </button>
        </div>

        {/* Tabs Content */}
        {activeTab === "patients" && (
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="">
                <Image
                  src="/app.png"
                  alt="AI Skin Analysis"
                  width={600}
                  height={600}
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-slate-900">
                Your Journey to Clearer Skin
              </h3>

              <div className="space-y-8">
                {patientsSteps.map(({ num, title, desc, bg, textColor }) => (
                  <div key={num} className="relative pl-14">
                    <div
                      className={`absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center ${bg}`}
                    >
                      <span className={`${textColor} font-semibold text-lg`}>
                        {num}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-slate-900">
                        {title}
                      </h4>
                      <p className="text-slate-600 text-sm">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Button className="bg-violet-600 hover:bg-violet-700 px-8 py-3 text-white font-semibold rounded-lg shadow-md">
                  Start Your Skin Journey
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "brands" && (
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold mb-6 text-slate-900">
                Certify & Connect Your Products
              </h3>

              <div className="space-y-8">
                {brandsSteps.map(({ num, title, desc, bg, textColor }) => (
                  <div key={num} className="relative pl-14">
                    <div
                      className={`absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center ${bg}`}
                    >
                      <span className={`${textColor} font-semibold text-lg`}>
                        {num}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-slate-900">
                        {title}
                      </h4>
                      <p className="text-slate-600 text-sm">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Button className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 text-white font-semibold rounded-lg shadow-md">
                  Register as a Brand Partner
                </Button>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/brands.png"
                  alt="Blockchain Certification"
                  width={600}
                  height={600}
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
