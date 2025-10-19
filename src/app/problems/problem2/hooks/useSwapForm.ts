import { useState, useEffect, useMemo, useCallback } from "react";
import { useTokenPrices } from "./useTokenPrices";
import { useDebounce } from "./useDebounce";
import { TOKENS } from "../tokenData";
import { SwapFormData, Token } from "../types";

export function useSwapForm() {
  const {
    prices,
    loading: pricesLoading,
    error: pricesError,
    availableTokens,
    retry: retryPrices,
  } = useTokenPrices();

  const [formData, setFormData] = useState<SwapFormData>({
    fromToken: null,
    toToken: null,
    fromAmount: "",
    toAmount: "",
    slippage: 0.5,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [swapResults, setSwapResults] = useState<{
    fromToken: Token | null;
    toToken: Token | null;
    fromAmount: string;
    toAmount: string;
    exchangeRate: number | null;
    priceImpact: number | null;
    minimumReceived: string;
    estimatedValue: string;
  } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const debouncedFromAmount = useDebounce(formData.fromAmount, 300);

  // Memoize tokens with prices for better performance
  const tokensWithPrices = useMemo(() => {
    if (!prices || Object.keys(prices).length === 0) return TOKENS;

    return TOKENS.filter((token) => availableTokens.includes(token.symbol)).map(
      (token) => ({
        ...token,
        price: prices[token.symbol],
      })
    );
  }, [prices, availableTokens]);

  // Update form data with prices when they're available
  useEffect(() => {
    if (availableTokens.length > 0) {
      setFormData((prev) => ({
        ...prev,
        fromToken:
          prev.fromToken && availableTokens.includes(prev.fromToken.symbol)
            ? tokensWithPrices.find((t) => t.symbol === prev.fromToken?.symbol) || null
            : null,
        toToken:
          prev.toToken && availableTokens.includes(prev.toToken.symbol)
            ? tokensWithPrices.find((t) => t.symbol === prev.toToken?.symbol) || null
            : null,
      }));
    }
  }, [tokensWithPrices, availableTokens]);

  // Memoize exchange rate calculation
  const exchangeRate = useMemo(() => {
    if (
      formData.fromToken?.price &&
      formData.toToken?.price &&
      formData.toToken.price > 0
    ) {
      return formData.fromToken.price / formData.toToken.price;
    }
    return null;
  }, [formData.fromToken?.price, formData.toToken?.price]);

  // Real-time validation function
  const validateFormRealTime = useCallback(() => {
    const newErrors: Record<string, string> = {};

    // Validate from token
    if (!formData.fromToken) {
      newErrors.fromToken = "Please select a token to swap from";
    }

    // Validate to token
    if (!formData.toToken) {
      newErrors.toToken = "Please select a token to swap to";
    } else if (
      formData.fromToken &&
      formData.fromToken.symbol === formData.toToken.symbol
    ) {
      newErrors.toToken = "Cannot swap to the same token";
    }

    // Validate amount
    const amount = Number(formData.fromAmount);
    if (formData.fromAmount && (isNaN(amount) || amount <= 0)) {
      newErrors.fromAmount = "Please enter a valid amount";
    } else if (amount > 1000000) {
      newErrors.fromAmount = "Amount too large (max 1,000,000)";
    } else if (amount > 0 && amount < 0.000001) {
      newErrors.fromAmount = "Amount too small (min 0.000001)";
    }

    // Validate exchange rate availability
    if (formData.fromToken && formData.toToken && !exchangeRate) {
      newErrors.general = "Exchange rate not available for these tokens";
    }

    setErrors(newErrors);
  }, [formData.fromToken, formData.toToken, formData.fromAmount, exchangeRate]);

  // Real-time validation
  useEffect(() => {
    validateFormRealTime();
  }, [validateFormRealTime]);

  // Form validation
  const canSwap = useMemo(() => {
    return (
      formData.fromToken &&
      formData.toToken &&
      formData.fromToken.symbol !== formData.toToken.symbol &&
      formData.fromAmount &&
      !isNaN(Number(formData.fromAmount)) &&
      Number(formData.fromAmount) > 0 &&
      Number(formData.fromAmount) >= 0.000001 &&
      Number(formData.fromAmount) <= 1000000 &&
      exchangeRate &&
      Object.keys(errors).length === 0
    );
  }, [
    formData.fromToken,
    formData.toToken,
    formData.fromAmount,
    exchangeRate,
    errors,
  ]);

  // Calculate toAmount with debounced input
  useEffect(() => {
    if (
      formData.fromToken &&
      formData.toToken &&
      debouncedFromAmount &&
      !isNaN(Number(debouncedFromAmount)) &&
      exchangeRate
    ) {
      const calculatedAmount = (Number(debouncedFromAmount) * exchangeRate).toFixed(6);
      setFormData((prev) => ({
        ...prev,
        toAmount: calculatedAmount,
      }));
    } else if (!debouncedFromAmount) {
      setFormData((prev) => ({
        ...prev,
        toAmount: "",
      }));
    }
  }, [formData.fromToken, formData.toToken, debouncedFromAmount, exchangeRate]);

  // Memoize estimated value
  const estimatedValue = useMemo(() => {
    if (formData.fromToken && formData.fromAmount && formData.fromToken.price) {
      const value = Number(formData.fromAmount) * formData.fromToken.price;
      return `≈ $${value.toFixed(2)}`;
    }
    return "";
  }, [formData.fromToken, formData.fromAmount]);

  // Calculate price impact (simplified)
  const priceImpact = useMemo(() => {
    if (
      !formData.fromAmount ||
      !exchangeRate ||
      Number(formData.fromAmount) < 1000
    ) {
      return null;
    }

    const tradeSize = Number(formData.fromAmount) * (formData.fromToken?.price || 0);
    if (tradeSize > 10000) {
      return Math.min((tradeSize / 100000) * 0.5, 5); // Max 5% impact
    }
    return null;
  }, [formData.fromAmount, exchangeRate, formData.fromToken?.price]);

  // Memoize minimum received amount
  const minimumReceived = useMemo(() => {
    if (formData.toAmount && formData.slippage) {
      const slippageAmount = Number(formData.toAmount) * (formData.slippage / 100);
      return (Number(formData.toAmount) - slippageAmount).toFixed(6);
    }
    return "";
  }, [formData.toAmount, formData.slippage]);

  // Validation for submit
  const validateForm = (): boolean => {
    validateFormRealTime();
    return Boolean(canSwap);
  };

  // Form handlers
  const handleSwapTokens = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      fromToken: prev.toToken,
      toToken: prev.fromToken,
      fromAmount: prev.toAmount,
      toAmount: prev.fromAmount,
    }));
  }, []);

  const handleClearForm = useCallback(() => {
    setFormData({
      fromToken: null,
      toToken: null,
      fromAmount: "",
      toAmount: "",
      slippage: 0.5,
    });
    setErrors({});
    setSubmitSuccess(false);
    setSwapResults(null);
  }, []);

  const handleCloseSwapResults = useCallback(() => {
    setSubmitSuccess(false);
    setSwapResults(null);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSwapResults(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Capture swap results
      setSwapResults({
        fromToken: formData.fromToken,
        toToken: formData.toToken,
        fromAmount: formData.fromAmount,
        toAmount: formData.toAmount,
        exchangeRate,
        priceImpact,
        minimumReceived,
        estimatedValue,
      });
      
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Swap failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [validateForm, formData, exchangeRate, priceImpact, minimumReceived, estimatedValue]);

  // Input handlers
  const handleFromTokenSelect = useCallback((token: Token) => {
    setFormData((prev) => ({ ...prev, fromToken: token }));
  }, []);

  const handleToTokenSelect = useCallback((token: Token) => {
    setFormData((prev) => ({ ...prev, toToken: token }));
  }, []);

  const handleFromAmountChange = useCallback((amount: string) => {
    // Allow only numbers, decimal point, and empty string
    if (amount === "" || /^\d*\.?\d*$/.test(amount)) {
      setFormData((prev) => ({ ...prev, fromAmount: amount }));
    }
  }, []);

  return {
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
  };
}
