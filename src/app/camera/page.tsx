"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function CameraPage() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [shouldUpload, setShouldUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const loadDefaultImage = async () => {
    try {
      const imageUrl =
        "https://raw.githubusercontent.com/JavaKhangNguyen/Acnes-Detection/main/test/test2.jpg";
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);
      setImageUri(objectURL);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChooseImage = async () => {
    try {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = async (e: any) => {
        const file = e.target.files[0];
        const objectURL = URL.createObjectURL(file);
        setImageUri(objectURL);
        setShouldUpload(true);
      };
      input.click();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = async () => {
    try {
      if (!imageUri) return;
      setLoading(true);
      const blob = await (await fetch(imageUri)).blob();
      const formData = new FormData();
      formData.append("image", blob);

      const response = await axios.post(
        "https://acne10.aiotlab.io.vn/upload_image",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const result = response.data;
      setLoading(false);
      setShouldUpload(false);

      sessionStorage.setItem("ai_result", JSON.stringify(response.data));
      router.push("/result-medical");
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
      setShouldUpload(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6">Scan Your Skin</h2>

      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">Image Preview</CardHeader>
        <CardContent>
          <div className="w-full h-64 border rounded-md flex items-center justify-center overflow-hidden">
            {imageUri ? (
              <img
                src={imageUri}
                alt="Preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-muted-foreground">No Image Selected</span>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2 mt-6">
        <Button variant="secondary" onClick={loadDefaultImage}>
          Load Default
        </Button>
        <Button onClick={handleChooseImage}>Choose Image</Button>
        {shouldUpload && (
          <Button onClick={handleUpload} disabled={loading || !imageUri}>
            {loading ? "Uploading..." : "Upload"}
          </Button>
        )}
      </div>
    </div>
  );
}
