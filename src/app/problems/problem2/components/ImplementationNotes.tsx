"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// Removed unused Alert imports
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

  // Removed unused getIcon function

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
    <Card className="mt-6 border-2 border-dashed border-muted-foreground/20">
      <CardHeader className="bg-muted/30">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Info className="w-5 h-5 text-blue-400" />
          Implementation Notes & Assumptions
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-auto hover:bg-muted/50"
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
        <CardContent className="space-y-6 bg-muted/10">
          {/* Assumptions */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-foreground">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              Assumptions Made
            </h3>
            <div className="space-y-4">
              {assumptions.map((item, index) => (
                <div key={index} className="p-4 bg-yellow-900/20 border border-yellow-800/30 rounded-lg">
                  <h4 className="font-medium text-yellow-300 mb-2">
                    {index + 1}. {item.title}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-200 font-medium">Impact:</span>
                      <Badge variant={getBadgeVariant(item.impact)} className="text-xs">
                        {item.impact}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-yellow-200 font-medium">Description:</span>
                      <p className="text-yellow-100 mt-1 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Design Decisions */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-foreground">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Key Design Decisions
            </h3>
            <div className="space-y-4">
              {designDecisions.map((item, index) => (
                <div key={index} className="p-4 bg-green-900/20 border border-green-800/30 rounded-lg">
                  <h4 className="font-medium text-green-300 mb-2">
                    {index + 1}. {item.title}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-green-200 font-medium">Impact:</span>
                      <Badge variant={getBadgeVariant(item.impact)} className="text-xs">
                        {item.impact}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-green-200 font-medium">Description:</span>
                      <p className="text-green-100 mt-1 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Notes */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-foreground">
              <Lightbulb className="w-4 h-4 text-blue-400" />
              Technical Implementation Notes
            </h3>
            <div className="space-y-4">
              {technicalNotes.map((item, index) => (
                <div key={index} className="p-4 bg-blue-900/20 border border-blue-800/30 rounded-lg">
                  <h4 className="font-medium text-blue-300 mb-2">
                    {index + 1}. {item.title}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-200 font-medium">Status:</span>
                      <Badge variant={item.status === "resolved" ? "default" : "secondary"} className="text-xs">
                        {item.status}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-blue-200 font-medium">Description:</span>
                      <p className="text-blue-100 mt-1 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* External Resources */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-foreground">
              <ExternalLink className="w-4 h-4 text-purple-400" />
              External Resources Used
            </h3>
            <div className="space-y-4 text-sm">
              <div className="p-4 bg-purple-900/20 border border-purple-800/30 rounded-lg">
                <h4 className="font-medium text-purple-300 mb-2">
                  1. Token Prices API
                </h4>
                <div className="space-y-2">
                  <span className="text-purple-200 font-medium">URL:</span>
                  <div>
                    <a
                      href="https://interview.switcheo.com/prices.json"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 hover:underline break-all"
                    >
                      interview.switcheo.com/prices.json
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-purple-900/20 border border-purple-800/30 rounded-lg">
                <h4 className="font-medium text-purple-300 mb-2">
                  2. Token Icons Repository
                </h4>
                <div className="space-y-2">
                  <span className="text-purple-200 font-medium">URL:</span>
                  <div>
                    <a
                      href="https://github.com/Switcheo/token-icons"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 hover:underline break-all"
                    >
                      github.com/Switcheo/token-icons
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
