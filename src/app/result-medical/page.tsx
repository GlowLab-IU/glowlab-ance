"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { inferSkinType } from "../suggestions/skintypeMock";
import { useWallet } from "@solana/wallet-adapter-react";

interface BoundingBox {
  class_id: string;
  cords: number[];
  percentage_conf: string;
}

const decodeBase64 = (base64String: string) =>
  `data:image/jpeg;base64,${base64String}`;

const groupBoundingBoxes = (boundingBoxes: BoundingBox[]) => {
  const grouped: Record<string, { count: number; averageConf: number }> = {};

  boundingBoxes.forEach((box) => {
    const conf = parseFloat(box.percentage_conf);
    if (!grouped[box.class_id]) {
      grouped[box.class_id] = { count: 0, averageConf: 0 };
    }
    grouped[box.class_id].count++;
    grouped[box.class_id].averageConf += conf;
  });

  for (const key in grouped) {
    grouped[key].averageConf /= grouped[key].count;
  }

  return grouped;
};

export default function ResultMedicalPage() {
  const router = useRouter();
  const { publicKey, connected } = useWallet();
  const [boundingBoxes, setBoundingBoxes] = useState<BoundingBox[]>([]);
  const [outputImage, setOutputImage] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});

  const [skinType, setSkinType] = useState<string>("oily");

  useEffect(() => {
    const stored = sessionStorage.getItem("ai_result");
    if (!stored) {
      router.push("/camera");
      return;
    }
    const parsed = JSON.parse(stored);
    setBoundingBoxes(parsed.bounding_boxes || []);
    setOutputImage(parsed.output_image || "");
    setMessage(parsed.message || "");

    const grouped = groupBoundingBoxes(parsed.bounding_boxes || []);
    const acneStats: Record<string, number> = {};
    for (const [type, { count }] of Object.entries(grouped)) {
      acneStats[type] = count;
    }
    const inferredSkin = inferSkinType(acneStats);
    setSkinType(inferredSkin);
  }, []);

  const toggleOpenState = (class_id: string) => {
    setOpenStates((prev) => ({ ...prev, [class_id]: !prev[class_id] }));
  };

  const groupedData = groupBoundingBoxes(boundingBoxes);
  const dominantType = Object.entries(groupedData).sort(
    (a, b) => b[1].count - a[1].count
  )[0];
  const maxType = dominantType?.[0] ?? "";
  const maxCount = dominantType?.[1].count ?? 0;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Acne Analysis Result
      </h1>

      {outputImage && (
        <img
          src={decodeBase64(outputImage)}
          alt="Result"
          className="rounded shadow mb-6 mx-auto max-w-full"
        />
      )}

      {message && boundingBoxes.length === 0 ? (
        <p className="text-center text-muted-foreground">{message}</p>
      ) : (
        <>
          {maxType && (
            <Card className="mb-6">
              <CardHeader className="text-center">
                <p className="text-lg font-semibold text-muted-foreground">
                  Most common acne type:
                </p>
                <p className="text-2xl font-bold text-primary">{maxType}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Count:{" "}
                  <span className="text-green-600 font-medium">{maxCount}</span>
                </p>
              </CardHeader>
            </Card>
          )}

          <div className="space-y-4">
            {Object.entries(groupedData).map(
              ([type, { count, averageConf }]) => (
                <Card
                  key={type}
                  className="cursor-pointer"
                  onClick={() => toggleOpenState(type)}
                >
                  <CardHeader className="flex justify-between items-center">
                    <span className="font-semibold text-base text-gray-800">
                      {type}
                    </span>
                    <span className="text-sm text-gray-500">
                      {openStates[type] ? "Hide" : "Show"} Details
                    </span>
                  </CardHeader>
                  {openStates[type] && (
                    <CardContent className="text-sm text-muted-foreground space-y-1">
                      <p>Total Count: {count}</p>
                      <p>Average Confidence: {averageConf.toFixed(2)}%</p>
                    </CardContent>
                  )}
                </Card>
              )
            )}
          </div>
        </>
      )}

      <Separator className="my-6" />

      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={() => router.push("/camera")}>
          Upload New
        </Button>
        <Button
          onClick={() => {
            if (!connected) {
              alert("Please connect your wallet to view suggestions.");
              return;
            }
            router.push("/suggestions?skin=" + skinType);
          }}
        >
          Suggest Cosmetics
        </Button>
      </div>
    </div>
  );
}
