import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://interview.switcheo.com/prices.json', {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; NextJS-App)',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Validate data structure
    if (!Array.isArray(data)) {
      throw new Error('Invalid price data format - expected array');
    }
    
    // Transform array to object format
    const pricesObject: Record<string, number> = {};
    data.forEach((item: { currency: string; price: number; date: string }) => {
      if (item.currency && typeof item.price === 'number') {
        pricesObject[item.currency] = item.price;
      }
    });

    return NextResponse.json(pricesObject, {
      headers: {
        'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
      },
    });
  } catch (error) {
    console.error('Error fetching prices:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prices' },
      { status: 500 }
    );
  }
}
