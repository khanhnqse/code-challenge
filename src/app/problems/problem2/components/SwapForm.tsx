"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSwapForm } from "../hooks/useSwapForm";
import { TokenInputSection } from "./TokenInputSection";
import { SwapButton } from "./SwapButton";
import { ExchangeRateDisplay } from "./ExchangeRateDisplay";
import { ErrorAlerts } from "./ErrorAlerts";
import { SubmitButton } from "./SubmitButton";
import { SwapResults } from "./SwapResults";
import { ClearFormButton } from "./ClearFormButton";
import { PriceLoadingIndicator } from "./PriceLoadingIndicator";

export function SwapForm() {
  const {
    // State
    formData,
    isSubmitting,
    submitSuccess,
    swapResults,
    errors,
    pricesLoading,
    pricesError,

    // Computed values
    tokensWithPrices,
    exchangeRate,
    canSwap,
    estimatedValue,
    priceImpact,
    minimumReceived,

    // Handlers
    handleSubmit,
    handleSwapTokens,
    handleClearForm,
    handleCloseSwapResults,
    handleFromTokenSelect,
    handleToTokenSelect,
    handleFromAmountChange,
    retryPrices,
  } = useSwapForm();

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Currency Swap</CardTitle>
          <CardDescription className="text-center">
            Swap between different cryptocurrencies instantly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* From Token Section */}
            <TokenInputSection
              label="From"
              token={formData.fromToken}
              amount={formData.fromAmount}
              estimatedValue={estimatedValue}
              tokens={tokensWithPrices}
              errors={errors}
              onTokenSelect={handleFromTokenSelect}
              onAmountChange={handleFromAmountChange}
              loading={pricesLoading}
            />

            {/* Swap Button */}
            <SwapButton
              onSwap={handleSwapTokens}
              disabled={!formData.fromToken || !formData.toToken}
            />

            {/* To Token Section */}
            <TokenInputSection
              label="To"
              token={formData.toToken}
              amount={formData.toAmount}
              tokens={tokensWithPrices}
              errors={errors}
              onTokenSelect={handleToTokenSelect}
              onAmountChange={() => {}} // Read-only
              readOnly={true}
              loading={pricesLoading}
            />

            {/* Exchange Rate Display */}
            <ExchangeRateDisplay
              exchangeRate={exchangeRate}
              fromToken={formData.fromToken}
              toToken={formData.toToken}
              priceImpact={priceImpact}
              minimumReceived={minimumReceived}
            />

            <Separator />

            {/* Error Alerts */}
            <ErrorAlerts
              errors={errors}
              pricesError={pricesError}
              onRetryPrices={retryPrices}
            />

            {/* Submit Button */}
            <SubmitButton
              isSubmitting={isSubmitting}
              pricesLoading={pricesLoading}
              canSwap={Boolean(canSwap)}
              hasErrors={Object.keys(errors).length > 0}
            />

            {/* Swap Results */}
            <SwapResults
              show={submitSuccess && !!swapResults}
              fromToken={swapResults?.fromToken || null}
              toToken={swapResults?.toToken || null}
              fromAmount={swapResults?.fromAmount || ""}
              toAmount={swapResults?.toAmount || ""}
              exchangeRate={swapResults?.exchangeRate || null}
              priceImpact={swapResults?.priceImpact || null}
              minimumReceived={swapResults?.minimumReceived || ""}
              estimatedValue={swapResults?.estimatedValue || ""}
              onClose={handleCloseSwapResults}
            />

            {/* Clear Form Button */}
            <ClearFormButton
              show={Boolean(
                formData.fromToken || formData.toToken || formData.fromAmount
              )}
              disabled={isSubmitting}
              onClear={handleClearForm}
            />
          </form>
        </CardContent>
      </Card>

      {/* Price Loading Indicator */}
      <PriceLoadingIndicator show={pricesLoading && !pricesError} />
    </div>
  );
}
