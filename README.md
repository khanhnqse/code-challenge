# Code Challenge Solutions

A modern web application showcasing coding challenge solutions built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15 with App Router, TypeScript, and Tailwind CSS
- **Beautiful UI**: shadcn/ui components for a polished user experience
- **Interactive Solutions**: Live testing and performance comparison tools
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Type Safety**: Full TypeScript support throughout the application

## 📁 Project Structure

```
src/
├── app/
│   ├── problems/
│   │   ├── problem1/          # Three Ways to Sum to N
│   │   ├── problem2/          # Currency Swap Form
│   │   └── problem3/          # Coming soon...
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/
│   ├── ui/                    # shadcn/ui components
│   └── navigation.tsx         # Main navigation
└── lib/
    └── utils.ts               # Utility functions
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd code-challenge
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📋 Problems

### Problem 1: Three Ways to Sum to N ✅
Three unique implementations of the `sum_to_n` function:
- **Iterative Approach**: O(n) time complexity using a for loop
- **Mathematical Formula**: O(1) time complexity using Gauss's formula
- **Recursive Approach**: O(n) time complexity using recursion

Features interactive testing and performance comparison tools.

### Problem 2: Currency Swap Form ✅
A streamlined, highly optimized currency swap form with:
- **Real-time Exchange Rates**: Fetches live token prices with caching and retry logic
- **Advanced Token Selection**: Searchable dropdown with keyboard navigation and accessibility
- **Smart Calculations**: Debounced input processing and memoized exchange rate calculations
- **Price Impact Analysis**: Shows price impact for large trades with minimum received amounts
- **Real-time Validation**: Instant form validation with comprehensive error handling
- **Simplified UX**: One-click swap without complex slippage settings
- **Performance Optimized**: Memoized components, image optimization, and efficient re-renders
- **Enhanced UX**: Loading states, retry mechanisms, and smooth animations
- **Responsive Design**: Works seamlessly on all devices with touch-friendly interactions

### Problem 3: Coming Soon 🚧
Additional coding challenges will be added in future updates.

## 🎨 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Development**: ESLint, Prettier

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
