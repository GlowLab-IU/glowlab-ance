"use client"

import { useState } from "react"
import Link from "next/link"
import axios from "axios"
import { Facebook, Instagram, Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AcneUploader } from "@/components/acne-uploader"
import { AcneResults } from "@/components/acne-results"

export default function ScanAcnePage() {
  const [scanStage, setScanStage] = useState<"instructions" | "uploading" | "scanning" | "results">("instructions")
  const [progress, setProgress] = useState(0)
  const [imageUri, setImageUri] = useState<string | null>(null)
  const [acneResults, setAcneResults] = useState<null | {
    types: Array<{ name: string; count: number; severity: "low" | "medium" | "high" }>
    alerts: string[]
    rawData?: any
  }>(null)

  // Đảm bảo upload chỉ chạy sau khi set ảnh xong
  const handleFileSelected = async (file: File) => {
    const objectURL = URL.createObjectURL(file)
    setImageUri(objectURL)
    setScanStage("uploading")
    setTimeout(() => handleUpload(file), 100)
  }

  const loadDefaultImage = async () => {
    try {
      const imageUrl = "https://raw.githubusercontent.com/JavaKhangNguyen/Acnes-Detection/main/test/test2.jpg"
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const objectURL = URL.createObjectURL(blob)
      setImageUri(objectURL)
      setScanStage("uploading")
      setTimeout(() => handleUpload(blob), 100)
    } catch (error) {
      alert("Không thể tải ảnh mẫu.")
    }
  }

  const handleUpload = async (fileOrBlob: File | Blob) => {
    setProgress(0)
    setScanStage("uploading")
    let uploadProgress = 0
    const uploadInterval = setInterval(() => {
      uploadProgress += 10
      setProgress(uploadProgress)
      if (uploadProgress >= 100) clearInterval(uploadInterval)
    }, 120)

    try {
      const formData = new FormData()
      formData.append("image", fileOrBlob)
      const response = await axios.post("https://acne10.aiotlab.io.vn/upload_image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      clearInterval(uploadInterval)
      setProgress(100)
      setScanStage("scanning")
      setTimeout(() => {
        const processedResults = processAIResults(response.data)
        setAcneResults(processedResults)
        setScanStage("results")
        setProgress(0)
      }, 800)
    } catch (error) {
      clearInterval(uploadInterval)
      setScanStage("instructions")
      setProgress(0)
      alert("Có lỗi xảy ra khi phân tích ảnh. Vui lòng thử lại.")
    }
  }

  // Map key API về đúng key UI nếu cần
  const processAIResults = (aiData: any) => {
  const types: Array<{ name: string; count: number; severity: "low" | "medium" | "high" }> = []
  const alerts: string[] = []

  // Bảng điểm severity
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
  }

  // Danh sách các loại mụn hỗ trợ
  const acneTypes = Object.keys(severityPoints)

  // Đếm số lượng từng loại mụn
  const countMap: Record<string, number> = {}
  if (Array.isArray(aiData.bounding_boxes)) {
    aiData.bounding_boxes.forEach((box: any) => {
      const key = box.class_id
      if (acneTypes.includes(key)) {
        countMap[key] = (countMap[key] || 0) + 1
      }
    })
  }

  // Map sang format types (chỉ lấy count >= 1)
  acneTypes.forEach((name) => {
    const count = countMap[name] || 0
    if (count > 0) {
      // Gán severity từng loại dựa trên điểm
      let severity: "low" | "medium" | "high" = "low"
      if (severityPoints[name] === 3) severity = "high"
      else if (severityPoints[name] === 2) severity = "medium"
      types.push({ name, count, severity })
    }
  })

  // Tính tổng điểm để xác định mức độ nghiêm trọng tổng thể
  const totalScore = Object.entries(countMap).reduce(
    (sum, [acne, count]) => sum + (severityPoints[acne] || 0) * count,
    0
  )
  let overallSeverity: "low" | "medium" | "high" = "low"
  if (totalScore > 20) overallSeverity = "high"
  else if (totalScore > 10) overallSeverity = "medium"

  // Alert nếu có mụn nang
  if (countMap["cystic"] && countMap["cystic"] > 0) {
    alerts.push("Phát hiện mụn nang nghiêm trọng. Nên tham khảo ý kiến bác sĩ da liễu.")
  }

  return {
    types,
    alerts,
    rawData: aiData,
    overallSeverity, // truyền thêm mức độ tổng thể
    totalScore,
  }
}

  const resetScan = () => {
    setScanStage("instructions")
    setProgress(0)
    setAcneResults(null)
    setImageUri(null)
  }

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
              <Tabs defaultValue="results" className="w-full">
                <div className="relative flex justify-center my-6">
                  {/* Khung màu xám sau cùng */}
                  <div className="bg-gray-300 w-[320px] h-14 rounded-md absolute top-0 left-1/2 -translate-x-1/2 z-0" />

                  {/* Khung màu trắng ở giữa */}
                  <div className="bg-white w-[280px] h-12 rounded-md absolute top-1 left-1/2 -translate-x-1/2 z-10" />

                  {/* Dòng chữ đè lên khung trắng */}
                  <div className="relative z-20 text-xl font-semibold text-gray-800 flex items-center justify-center h-12">
                    Acne Detection Results
                  </div>
                </div>

                <TabsContent value="results" className="mt-6">
                  <AcneResults results={acneResults} />
                </TabsContent>
              </Tabs>

              <div className="flex justify-center">
                <Button onClick={resetScan} variant="outline">
                  Scan Again
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}