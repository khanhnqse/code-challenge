"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Info,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export function ImplementationNotes() {
  const [isExpanded, setIsExpanded] = useState(false);

  const assumptions = [
    {
      type: "assumption",
      title: "Real-time Price Updates",
      description:
        "Assumed that token prices from the API are current and sufficient for exchange rate calculations. No real-time price streaming implemented.",
      impact: "Medium",
    },
    {
      type: "assumption",
      title: "No Slippage Tolerance",
      description:
        "Removed slippage tolerance UI as requested. Assumed direct 1:1 exchange rate calculation is acceptable for this demo.",
      impact: "Low",
    },
    {
      type: "assumption",
      title: "Simulated Backend",
      description:
        "Implemented simulated swap processing with 2-second delay. Assumed this is sufficient to demonstrate loading states and user feedback.",
      impact: "Low",
    },
    {
      type: "assumption",
      title: "Token Icon Fallbacks",
      description:
        "Assumed that missing token icons should show a placeholder rather than breaking the UI. Implemented fallback system for unavailable icons.",
      impact: "Low",
    },
  ];

  const designDecisions = [
    {
      type: "decision",
      title: "Server-side API Proxy",
      description:
        "Created Next.js API route to proxy external API calls to avoid CORS issues. This ensures reliable data fetching.",
      impact: "High",
    },
    {
      type: "decision",
      title: "Token Filtering by Price Availability",
      description:
        "Only show tokens that have prices in the API response. This prevents users from selecting tokens that can't be swapped.",
      impact: "High",
    },
    {
      type: "decision",
      title: "Real-time Form Validation",
      description:
        "Implemented immediate validation feedback as users type. This provides better UX than validation only on submit.",
      impact: "Medium",
    },
    {
      type: "decision",
      title: "Persistent Form Data",
      description:
        "Form data persists after successful swap to allow multiple swaps with same settings. Added manual clear button for user control.",
      impact: "Medium",
    },
  ];

  const technicalNotes = [
    {
      type: "technical",
      title: "CORS Handling",
      description:
        "External API (interview.switcheo.com) has CORS restrictions. Solved with server-side proxy in /api/prices route.",
      status: "resolved",
    },
    {
      type: "technical",
      title: "Image Loading Optimization",
      description:
        "Used Next.js Image component with error handling and placeholder fallbacks for optimal performance.",
      status: "implemented",
    },
    {
      type: "technical",
      title: "Input Validation",
      description:
        "Prevented invalid characters in amount field and enforced min/max limits for better data integrity.",
      status: "implemented",
    },
    {
      type: "technical",
      title: "Performance Optimization",
      description:
        "Implemented caching, debouncing, and memoization to optimize API calls and re-renders.",
      status: "implemented",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "assumption":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "decision":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "technical":
        return <Lightbulb className="w-4 h-4 text-blue-500" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  const getBadgeVariant = (impact: string) => {
    switch (impact) {
      case "High":
        return "destructive";
      case "Medium":
        return "default";
      case "Low":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="w-5 h-5" />
          Implementation Notes & Assumptions
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-auto"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </CardTitle>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-6">
          {/* Assumptions */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              Assumptions Made
            </h3>
            <div className="space-y-3">
              {assumptions.map((item, index) => (
                <Alert key={index}>
                  <div className="flex items-start gap-3">
                    {getIcon(item.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{item.title}</span>
                        <Badge
                          variant={getBadgeVariant(item.impact)}
                          className="text-xs"
                        >
                          {item.impact} Impact
                        </Badge>
                      </div>
                      <AlertDescription>{item.description}</AlertDescription>
                    </div>
                  </div>
                </Alert>
              ))}
            </div>
          </div>

          {/* Design Decisions */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Key Design Decisions
            </h3>
            <div className="space-y-3">
              {designDecisions.map((item, index) => (
                <Alert key={index}>
                  <div className="flex items-start gap-3">
                    {getIcon(item.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{item.title}</span>
                        <Badge
                          variant={getBadgeVariant(item.impact)}
                          className="text-xs"
                        >
                          {item.impact} Impact
                        </Badge>
                      </div>
                      <AlertDescription>{item.description}</AlertDescription>
                    </div>
                  </div>
                </Alert>
              ))}
            </div>
          </div>

          {/* Technical Notes */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-blue-500" />
              Technical Implementation Notes
            </h3>
            <div className="space-y-3">
              {technicalNotes.map((item, index) => (
                <Alert key={index}>
                  <div className="flex items-start gap-3">
                    {getIcon(item.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{item.title}</span>
                        <Badge
                          variant={
                            item.status === "resolved" ? "default" : "secondary"
                          }
                          className="text-xs"
                        >
                          {item.status}
                        </Badge>
                      </div>
                      <AlertDescription>{item.description}</AlertDescription>
                    </div>
                  </div>
                </Alert>
              ))}
            </div>
          </div>

          {/* External Resources */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              External Resources Used
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium">Token Prices:</span>
                <a
                  href="https://interview.switcheo.com/prices.json"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  interview.switcheo.com/prices.json
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Token Icons:</span>
                <a
                  href="https://github.com/Switcheo/token-icons"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  github.com/Switcheo/token-icons
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
