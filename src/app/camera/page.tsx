// src/app/scan/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Progress } from "@/components/ui/progress";
import { AcneUploader } from "@/components/acne-uploader";
import { AcneResults } from "@/components/acne-results";
import SuggestionPanel from "@/components/SuggestionPanel";
import { ClaimButton } from "@/components/ClaimButton";
import { inferSkinType } from "@/app/suggestions/skintypeMock";
import type { AcneResult } from "@/app/Pinata/pinataUpload";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";

export default function ScanAcnePage() {
  const [scanStage, setScanStage] = useState<
    "instructions" | "uploading" | "scanning" | "results"
  >("instructions");
  const [progress, setProgress] = useState(0);
  const [acneResult, setAcneResult] = useState<AcneResult | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [skinType, setSkinType] = useState<string>("oily");

  useEffect(() => {
    if (acneResult) {
      const stats: Record<string, number> = {};
      acneResult.bounding_boxes.forEach((box) => {
        const cls = box[4] as unknown as string;
        stats[cls] = (stats[cls] || 0) + 1;
      });
      setSkinType(inferSkinType(stats));
    }
  }, [acneResult]);

  const handleFileSelected = async (file: File) => {
    setScanStage("uploading");
    let p = 0;
    const iv = setInterval(() => {
      p += 10;
      setProgress(p);
      if (p >= 100) clearInterval(iv);
    }, 100);

    try {
      const form = new FormData();
      form.append("image", file);
      const resp = await axios.post(
        "https://acne10.aiotlab.io.vn/upload_image",
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      clearInterval(iv);
      setScanStage("scanning");
      const raw = resp.data;
      const processed: AcneResult = {
        bounding_boxes: raw.bounding_boxes,
        total_acnes: raw.bounding_boxes.length,
        skin_type: raw.skin_type,
        recommended_compositions: raw.recommended_compositions || [],
        raw_output_image: raw.output_image,
      };
      setAcneResult(processed);
      setScanStage("results");
    } catch (error) {
      clearInterval(iv);
      setScanStage("instructions");
      setProgress(0);
      alert("Có lỗi xảy ra khi phân tích ảnh. Vui lòng thử lại.");
    }
  };

  if (scanStage === "instructions") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <AcneUploader onFileSelected={handleFileSelected} />
      </div>
    );
  }

  if (scanStage === "uploading" || scanStage === "scanning") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Progress value={progress} className="w-64" />
      </div>
    );
  }

  // results stage
  return (
    <div className="container mx-auto py-8 relative">
      <Tabs defaultValue="results" className="w-full">
        <TabsContent value="results" className="mt-6 relative">
          {/* AI Result Image */}
          {acneResult?.raw_output_image && (
            <div className="flex flex-col items-center mb-6">
              <img
                src={acneResult.raw_output_image}
                alt="AI Result"
                className="rounded-lg shadow-lg max-w-full h-auto"
                style={{ maxHeight: 400 }}
              />
              <p className="text-sm text-muted-foreground mt-2">
                AI Detection Results
              </p>
            </div>
          )}

          {/* Overlay until claim */}
          {!showResults && acneResult && (
            <div className="absolute inset-0 bg-white bg-opacity-70 backdrop-blur-sm rounded-lg p-8 z-20 flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-600"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Analysis Complete!
              </h3>
              <p className="text-gray-600 mb-6 text-center">
                Your skin analysis is ready. Click the button below to view your
                detailed results and personalized recommendations.
              </p>
              <ClaimButton
                result={acneResult}
                onSuccess={() => setShowResults(true)}
              />
            </div>
          )}

          {/* Blurred content until claim */}
          <div
            className={`transition-all duration-500 ${
              !showResults
                ? "filter blur-lg pointer-events-none select-none"
                : ""
            }`}
          >
            <AcneResults
              results={{
                types: [],
                alerts: [],
                rawData: { output_image: acneResult?.raw_output_image || "" },
                overallSeverity: undefined,
                totalScore: acneResult?.total_acnes,
                skinType,
                composition: acneResult?.recommended_compositions,
              }}
            />
            <div className="mt-6">
              <SuggestionPanel
                skinType={skinType}
                acneTypes={acneResult?.recommended_compositions || []}
                acneCounts={acneResult?.bounding_boxes.map(() => 1) || []}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center mt-8">
        <Button
          onClick={() => {
            setScanStage("instructions");
            setShowResults(false);
          }}
          variant="outline"
        >
          Scan Again
        </Button>
      </div>
    </div>
  );
}
