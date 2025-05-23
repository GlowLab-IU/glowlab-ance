import { AlertTriangle, Eye, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AcneType {
  name: string
  count: number
  severity: "low" | "medium" | "high"
}

interface AcneResultsProps {
  results: {
    types: AcneType[]
    alerts: string[]
    rawData?: any
    overallSeverity?: "low" | "medium" | "high"
    totalScore?: number
  }
}

const ACNE_LABELS: Record<string, string> = {
  acne_scars: "Acne Scars",
  blackhead: "Blackheads",
  cystic: "Cystic Acne",
  flat_wart: "Flat Warts",
  folliculitis: "Folliculitis",
  keloid: "Keloid Scars",
  milium: "Milia",
  papular: "Papules",
  purulent: "Pustules",
  "sebo-crystan-conglo": "Sebum Conglomerates",
  syringoma: "Syringomas",
  whitehead: "Whiteheads",
}

const ACNE_COLORS: Record<string, string> = {
  blackhead: "#fbbf24", // yellow
  whitehead: "#34d399", // green
  milium: "#a3e635", // light green
  flat_wart: "#f472b6", // pink
  syringoma: "#818cf8", // light blue
  papular: "#f59e42", // orange
  purulent: "#facc15", // dark yellow
  folliculitis: "#60a5fa", // blue
  "sebo-crystan-conglo": "#f87171", // light red
  cystic: "#ef4444", // red
  acne_scars: "#a78bfa", // light purple
  keloid: "#6366f1", // dark purple
}

export function AcneResults({ results }: AcneResultsProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "low":
        return "🟢"
      case "medium":
        return "🟡"
      case "high":
        return "🔴"
      default:
        return "⚪"
    }
  }

  const filteredResults = results.types.filter((type) => type.count > 0)

  const getTotalAcneCount = () => {
    return filteredResults.reduce((total, type) => total + type.count, 0)
  }

  const getOverallSeverity = () => {
    if (results.overallSeverity) return results.overallSeverity
    if (filteredResults.some((type) => type.severity === "high")) return "high"
    if (filteredResults.some((type) => type.severity === "medium")) return "medium"
    return "low"
  }

  const getRecommendationMessage = () => {
    const overallSeverity = getOverallSeverity()
    const totalCount = getTotalAcneCount()

    if (totalCount === 0) {
      return "Great! No acne detected. Keep up your current skincare routine."
    }

    switch (overallSeverity) {
      case "high":
        return "Severe acne condition. You should consult a dermatologist for appropriate treatment."
      case "medium":
        return "Moderate acne condition. Maintain a consistent skincare routine with suitable products."
      case "low":
        return "Mild acne condition. It can be improved with proper skincare products."
      default:
        return "Maintain a good skincare routine to prevent acne."
    }
  }

  return (
    <div className="space-y-6">
       
       {results.rawData?.output_image && (
        <div className="flex flex-col items-center my-4">
          <img
            src={
              results.rawData.output_image.startsWith("http")
                ? results.rawData.output_image
                : `data:image/jpeg;base64,${results.rawData.output_image}`
            }
            alt="AI Result"
            className="rounded border max-w-full h-auto"
            style={{ maxHeight: 400 }}
          />
        </div>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            AI Analysis Results
          </CardTitle>
          <CardDescription>
            {getTotalAcneCount() > 0
              ? `Detected ${getTotalAcneCount()} acne spots across ${
                  filteredResults.length
                } types.`
              : "No acne detected"}
            {typeof results.totalScore === "number" && (
              <span className="ml-2">
                | Total Score: {results.totalScore}, Severity:{" "}
                {getOverallSeverity() === "high"
                  ? "Severe"
                  : getOverallSeverity() === "medium"
                  ? "Moderate"
                  : "Mild"}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert
              className={`border-l-4 ${
                getOverallSeverity() === "high"
                  ? "border-l-red-500 bg-red-50"
                  : getOverallSeverity() === "medium"
                  ? "border-l-yellow-500 bg-yellow-50"
                  : "border-l-green-500 bg-green-50"
              }`}
            >
              <Info className="h-4 w-4" />
              <AlertTitle>Overall Evaluation</AlertTitle>
              <AlertDescription>{getRecommendationMessage()}</AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredResults.map((type, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${getSeverityColor(
                    type.severity
                  )}`}
                  style={{ borderLeft: `8px solid ${ACNE_COLORS[type.name]}` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {getSeverityIcon(type.severity)}
                      </span>
                      <h3 className="font-semibold">
                        {ACNE_LABELS[type.name] || type.name}
                      </h3>
                    </div>
                    <Badge className="bg-white">{type.count} spots</Badge>
                  </div>
                  <p className="text-sm opacity-80">
                    Severity:{" "}
                    {type.severity === "low"
                      ? "Mild"
                      : type.severity === "medium"
                      ? "Moderate"
                      : "Severe"}
                  </p>
                </div>
              ))}
            </div>

            {getTotalAcneCount() > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">
                  Acne Type Distribution
                </h3>
                <div className="flex h-4 w-full rounded-full overflow-hidden border">
                  {filteredResults.map((type, idx) => {
                    const percentage = (type.count / getTotalAcneCount()) * 100;
                    return (
                      <div
                        key={idx}
                        style={{
                          width: `${percentage}%`,
                          background: ACNE_COLORS[type.name],
                        }}
                        title={`${type.name}: ${type.count}`}
                      />
                    );
                  })}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {filteredResults.map((type, idx) => (
                    <span key={idx} className="flex items-center gap-1 text-xs">
                      <span
                        style={{
                          display: "inline-block",
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          background: ACNE_COLORS[type.name],
                        }}
                      />
                      {ACNE_LABELS[type.name] || type.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      

      {results.alerts.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Health Warnings
          </h3>
          {results.alerts.map((alert, index) => (
            <Alert key={index} variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Important Notice</AlertTitle>
              <AlertDescription>{alert}</AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="space-y-2">
              <h3 className="font-medium text-blue-900">
                Advice from GlowChain
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• This result is for reference only</li>
                <li>
                  • You should consult a dermatologist for an accurate diagnosis
                </li>
                <li>• Use blockchain-verified products to ensure quality</li>
                <li>• Maintain a consistent skincare routine</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
