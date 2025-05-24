"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AcneUploader } from "@/components/acne-uploader";
import { AcneResults } from "@/components/acne-results";
import { useWallet } from "@solana/wallet-adapter-react";
import { claimNFT } from "@/app/camera/claimNFT";

export default function ScanAcnePage() {
  const [scanStage, setScanStage] = useState<
    "instructions" | "uploading" | "scanning" | "results"
  >("instructions");
  const [progress, setProgress] = useState(0);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [acneResults, setAcneResults] = useState<null | {
    types: Array<{
      name: string;
      count: number;
      severity: "low" | "medium" | "high";
    }>;
    alerts: string[];
    rawData?: any;
    overallSeverity?: "low" | "medium" | "high";
    totalScore?: number;
    compositionInfo?: Record<string, string>;
    skinType?: string;
    composition?: string[];
  }>(null);

  const [skinType, setSkinType] = useState<string>("oily");
  const [composition, setComposition] = useState<string[]>([]);
  const { connected } = useWallet();
  const router = useRouter();

  const handleFileSelected = async (file: File) => {
    const objectURL = URL.createObjectURL(file);
    setImageUri(objectURL);
    setScanStage("uploading");
    setTimeout(() => handleUpload(file), 100);
  };

  const loadDefaultImage = async () => {
    try {
      const imageUrl =
        "https://raw.githubusercontent.com/JavaKhangNguyen/Acnes-Detection/main/test/test2.jpg";
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);
      setImageUri(objectURL);
      setScanStage("uploading");
      setTimeout(() => handleUpload(blob), 100);
    } catch (error) {
      alert("Không thể tải ảnh mẫu.");
    }
  };

  const handleUpload = async (fileOrBlob: File | Blob) => {
    setProgress(0);
    setScanStage("uploading");
    let uploadProgress = 0;
    const uploadInterval = setInterval(() => {
      uploadProgress += 10;
      setProgress(uploadProgress);
      if (uploadProgress >= 100) clearInterval(uploadInterval);
    }, 120);

    try {
      const formData = new FormData();
      formData.append("image", fileOrBlob);
      const response = await axios.post(
        "https://inspired-bear-emerging.ngrok-free.app/upload_image",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      clearInterval(uploadInterval);
      setProgress(100);
      setScanStage("scanning");
      setTimeout(() => {
        // Add console log to debug the API response
        console.log("API Response:", response.data);

        // Extract fields using correct API response field names
        const skinTypeFromApi = response.data.skin_type || "";
        const compositionsFromApi =
          response.data.recommended_compositions ||
          response.data.composition ||
          [];

        // Set state variables with the extracted data
        setSkinType(skinTypeFromApi.toLowerCase());
        setComposition(
          Array.isArray(compositionsFromApi) ? compositionsFromApi : []
        );

        // Add the skinType and composition directly to the results object
        const processedResults = {
          ...processAIResults(response.data),
          skinType: skinTypeFromApi,
          composition: compositionsFromApi,
        };

        // Log the processed results to verify data
        console.log("Processed Results:", processedResults);
        console.log("Extracted Skin Type:", skinTypeFromApi);
        console.log("Extracted Compositions:", compositionsFromApi);

        setAcneResults(processedResults);
        setScanStage("results");
        setProgress(0);
      }, 800);
    } catch (error) {
      clearInterval(uploadInterval);
      setScanStage("instructions");
      setProgress(0);
      alert("Có lỗi xảy ra khi phân tích ảnh. Vui lòng thử lại.");
    }
  };

  // Keep the existing processAIResults function but ensure it doesn't override our composition
  const processAIResults = (aiData: any) => {
    const types: Array<{
      name: string;
      count: number;
      severity: "low" | "medium" | "high";
    }> = [];
    const alerts: string[] = [];

    const severityPoints: Record<string, number> = {
      blackhead: 1,
      whitehead: 1,
      milium: 1,
      flat_wart: 1,
      syringoma: 1,
      papular: 2,
      purulent: 2,
      folliculitis: 2,
      "sebo-crystan-conglo": 2,
      cystic: 3,
      acne_scars: 3,
      keloid: 3,
    };

    // Danh sách các loại mụn hỗ trợ
    const acneTypes = Object.keys(severityPoints);

    // Đếm số lượng từng loại mụn
    const countMap: Record<string, number> = {};
    if (Array.isArray(aiData.bounding_boxes)) {
      aiData.bounding_boxes.forEach((box: any) => {
        const key = box.class_id;
        if (acneTypes.includes(key)) {
          countMap[key] = (countMap[key] || 0) + 1;
        }
      });
    }

    // Map sang format types (chỉ lấy count >= 1)
    acneTypes.forEach((name) => {
      const count = countMap[name] || 0;
      if (count > 0) {
        // Gán severity từng loại dựa trên điểm
        let severity: "low" | "medium" | "high" = "low";
        if (severityPoints[name] === 3) severity = "high";
        else if (severityPoints[name] === 2) severity = "medium";
        types.push({ name, count, severity });
      }
    });

    // Tính tổng điểm để xác định mức độ nghiêm trọng tổng thể
    const totalScore = Object.entries(countMap).reduce(
      (sum, [acne, count]) => sum + (severityPoints[acne] || 0) * count,
      0
    );
    let overallSeverity: "low" | "medium" | "high" = "low";
    if (totalScore > 20) overallSeverity = "high";
    else if (totalScore > 10) overallSeverity = "medium";

    // Alert nếu có mụn nang
    if (countMap["cystic"] && countMap["cystic"] > 0) {
      alerts.push(
        "Phát hiện mụn nang nghiêm trọng. Nên tham khảo ý kiến bác sĩ da liễu."
      );
    }

    // Also extract composition descriptions if available in the API response
    const compositionInfo: Record<string, string> = {};
    if (
      aiData.composition_details &&
      typeof aiData.composition_details === "object"
    ) {
      Object.entries(aiData.composition_details).forEach(([key, value]) => {
        if (typeof value === "string") {
          compositionInfo[key] = value;
        }
      });
    }

    return {
      types,
      alerts,
      rawData: aiData,
      overallSeverity,
      totalScore,
      compositionInfo,
      // Remove skinType and composition from here since we're adding them directly above
    };
  };

  const resetScan = () => {
    setScanStage("instructions");
    setProgress(0);
    setAcneResults(null);
    setImageUri(null);
    setComposition([]);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container py-8 md:py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tighter mb-6 text-center">
            Scan Your Acne
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            Get personalized skincare recommendations based on AI analysis of
            your skin condition
          </p>

          {scanStage === "instructions" && (
            <div className="space-y-8">
              <div className="bg-slate-50 rounded-lg p-6 space-y-4">
                <h2 className="text-xl font-semibold">Instructions</h2>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <div className="bg-primary/10 rounded-full h-6 w-6 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-primary font-medium text-sm">
                        1
                      </span>
                    </div>
                    <p>Upload a clear photo of your face</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-primary/10 rounded-full h-6 w-6 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-primary font-medium text-sm">
                        2
                      </span>
                    </div>
                    <p>
                      Ensure good lighting and no makeup for accurate results
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-primary/10 rounded-full h-6 w-6 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-primary font-medium text-sm">
                        3
                      </span>
                    </div>
                    <p>Position your face in the center of the frame</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-primary/10 rounded-full h-6 w-6 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-primary font-medium text-sm">
                        4
                      </span>
                    </div>
                    <p>Wait for AI analysis to complete</p>
                  </li>
                </ul>
              </div>

              <AcneUploader onFileSelected={handleFileSelected} />

              <div className="text-center">
                <Button variant="outline" onClick={loadDefaultImage}>
                  Try with Sample Image
                </Button>
              </div>
            </div>
          )}

          {(scanStage === "uploading" || scanStage === "scanning") && (
            <div className="space-y-8 text-center">
              <div className="bg-slate-50 rounded-lg p-8 space-y-6">
                {imageUri && (
                  <div className="relative h-48 w-48 mx-auto rounded-lg overflow-hidden border">
                    <img
                      src={imageUri || "/placeholder.svg"}
                      alt="Uploaded image"
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">
                    {scanStage === "uploading"
                      ? "Uploading your photo..."
                      : "Analyzing your skin..."}
                  </h2>
                  <p className="text-muted-foreground">
                    {scanStage === "uploading"
                      ? "Please wait while we upload your photo"
                      : "Our AI is analyzing your skin condition"}
                  </p>
                </div>

                <Progress value={progress} className="w-full" />

                <p className="text-sm text-muted-foreground">
                  {scanStage === "uploading"
                    ? `Upload progress: ${progress}%`
                    : "Detecting acne types and severity..."}
                </p>
              </div>
            </div>
          )}

          {scanStage === "results" && acneResults && (
            <div className="space-y-8">
              {/* Log acneResults to verify data */}

              <Tabs defaultValue="results" className="w-full">
                <div className="relative flex justify-center my-6">
                  <div className="bg-gray-300 w-[320px] h-14 rounded-md absolute top-0 left-1/2 -translate-x-1/2 z-0" />

                  <div className="bg-white w-[280px] h-12 rounded-md absolute top-1 left-1/2 -translate-x-1/2 z-10" />

                  <div className="relative z-20 text-xl font-semibold text-gray-800 flex items-center justify-center h-12">
                    Acne Detection Results
                  </div>
                </div>

                <TabsContent value="results" className="mt-6">
                  <AcneResults
                    results={{
                      ...acneResults,
                      skinType: skinType,
                      composition: composition,
                    }}
                  />

                  {/* Enhanced display for skin type and recommended ingredients */}
                  <div className="mt-6 p-6 bg-slate-50 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-4 text-center border-b pb-2">
                      Analysis Results
                    </h3>

                    <div className="mb-6">
                      <h4 className="text-lg font-medium mb-2 flex items-center">
                        <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                        Detected Skin Type
                      </h4>
                      <div className="ml-5 bg-white p-3 rounded-md shadow-sm">
                        <span className="text-blue-600 font-medium">
                          {skinType}
                        </span>
                        <p className="text-sm text-gray-500 mt-1">
                          {skinType === "oily" &&
                            "Tends to have excess sebum production and may be prone to acne and enlarged pores."}
                          {skinType === "dry" &&
                            "Tends to feel tight, may have flaky patches, and needs extra hydration."}
                          {skinType === "combination" &&
                            "Features both oily and dry areas, typically oily in the T-zone and dry elsewhere."}
                          {skinType === "sensitive" &&
                            "May react easily to products with redness, irritation, or discomfort."}
                        </p>
                      </div>
                    </div>

                    {composition.length > 0 && (
                      <div>
                        <h4 className="text-lg font-medium mb-2 flex items-center">
                          <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                          Recommended Active Ingredients
                        </h4>
                        <div className="ml-5 bg-white p-4 rounded-md shadow-sm">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {composition.map((item, index) => (
                              <div
                                key={index}
                                className="border border-green-100 rounded-lg p-3 hover:bg-green-50 transition"
                              >
                                <div className="flex items-start">
                                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                    {item}
                                  </div>
                                </div>
                                {acneResults?.compositionInfo?.[item] && (
                                  <p className="text-sm text-gray-600 mt-2">
                                    {acneResults.compositionInfo[item]}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                          <p className="text-xs text-gray-500 mt-4">
                            These ingredients are recommended based on your skin
                            analysis. Look for products containing these
                            ingredients.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-center gap-10">
                <Button onClick={resetScan} variant="outline">
                  Scan Again
                </Button>
                <Button onClick={(e) => {
                  if (acneResults) {
                    claimNFT(acneResults.rawData);
                  }
                }}>
                  Claim NFT
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
