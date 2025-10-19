"use client";

import { useState, useEffect, useCallback } from 'react';
import { PriceData } from '../types';

// Cache for storing prices with timestamp
let priceCache: { data: PriceData; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes


export function useTokenPrices() {
  const [prices, setPrices] = useState<PriceData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [availableTokens, setAvailableTokens] = useState<string[]>([]);

  const fetchPrices = useCallback(async (isRetry = false) => {
    try {
      if (!isRetry) setLoading(true);
      setError(null);
      
      // Check cache first
      if (priceCache && Date.now() - priceCache.timestamp < CACHE_DURATION) {
        setPrices(priceCache.data);
        setLoading(false);
        return;
      }

      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
      
      const response = await fetch('/api/prices', {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        },
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Validate data structure
      if (typeof data !== 'object' || data === null) {
        throw new Error('Invalid price data format');
      }
      
      // Update cache
      priceCache = { data, timestamp: Date.now() };
      setPrices(data);
      setAvailableTokens(Object.keys(data));
      setRetryCount(0);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch prices';
      console.error('Error fetching token prices:', err);
      
      
      setError(errorMessage);
      
      // Retry logic with exponential backoff
      if (retryCount < 3) {
        const delay = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          fetchPrices(true);
        }, delay);
      } else {
        // All retry attempts failed
        console.error('All retry attempts failed');
        setError('Failed to fetch prices after multiple attempts');
        setRetryCount(0);
      }
    } finally {
      setLoading(false);
    }
  }, [retryCount]);

  const retry = useCallback(() => {
    setRetryCount(0);
    fetchPrices();
  }, [fetchPrices]);

  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  return { prices, loading, error, availableTokens, retry };
}
