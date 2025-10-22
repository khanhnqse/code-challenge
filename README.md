# Code Challenge Solutions

A modern web application showcasing coding challenge solutions built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui. This project demonstrates advanced React patterns, performance optimization, and modern web development best practices.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15 with App Router, TypeScript, and Tailwind CSS
- **Beautiful UI**: shadcn/ui components with dark theme support
- **Interactive Solutions**: Live testing, performance comparison, and real-time data
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Type Safety**: Full TypeScript support throughout the application
- **Performance Optimized**: Memoization, debouncing, and efficient re-renders
- **Real-time Data**: Live API integration with caching and error handling
- **Accessibility**: Keyboard navigation and screen reader support

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── prices/            # API route for token prices
│   ├── problems/
│   │   ├── problem1/          # Three Ways to Sum to N
│   │   │   ├── page.tsx       # Main problem page
│   │   │   └── solution.ts    # Algorithm implementations
│   │   ├── problem2/          # Currency Swap Form
│   │   │   ├── components/    # Modular components
│   │   │   ├── hooks/         # Custom hooks
│   │   │   ├── types.ts       # TypeScript definitions
│   │   │   └── tokenData.ts   # Token configuration
│   │   └── problem3/          # Code Analysis & Refactoring
│   │       ├── components/    # Analysis components
│   │       └── page.tsx       # Main analysis page
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout with dark theme
│   └── page.tsx               # Home page with candidate info
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── navigation.tsx         # Animated navigation
│   ├── CandidateCard.tsx      # Candidate information
│   └── CodeBlock.tsx          # Syntax highlighting
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
Three unique implementations of the `sum_to_n` function with comprehensive analysis:

- **Iterative Approach**: O(n) time complexity using a for loop
- **Mathematical Formula**: O(1) time complexity using Gauss's formula  
- **Recursive Approach**: O(n) time complexity using recursion

**Features:**
- Interactive testing with input validation
- Real-time performance comparison
- Input limits to prevent stack overflow (max 10,000)
- Visual execution time display
- Syntax highlighting with CodeBlock component

### Problem 2: Currency Swap Form ✅
A production-ready currency swap interface with advanced features:

**Core Features:**
- **Real-time Exchange Rates**: Live token prices with 5-minute caching
- **Smart Token Selection**: Searchable dropdown with 40+ tokens
- **Advanced Calculations**: Debounced input processing and memoized exchange rates
- **Price Impact Analysis**: Shows impact for large trades with minimum received amounts
- **Comprehensive Validation**: Real-time form validation with detailed error messages

**Technical Optimizations:**
- **Performance**: Memoized components, image optimization, efficient re-renders
- **Error Handling**: Retry logic, fallback mechanisms, graceful degradation
- **User Experience**: Loading states, smooth animations, responsive design
- **Accessibility**: Keyboard navigation, screen reader support, ARIA labels

**API Integration:**
- Server-side proxy to avoid CORS issues
- Automatic retry with exponential backoff
- Image error handling with placeholder fallbacks
- Token filtering based on price availability

### Problem 3: Code Analysis & Refactoring ✅
Comprehensive analysis of computational inefficiencies and anti-patterns:

**Analysis Features:**
- **Issue Identification**: 8 major performance and code quality issues
- **Before/After Comparison**: Side-by-side code comparison with syntax highlighting
- **Detailed Explanations**: In-depth analysis of each improvement
- **Best Practices**: Modern React patterns and optimization techniques

**Technical Improvements:**
- **Performance**: Memoization, callback optimization, state management
- **Code Quality**: Type safety, error handling, component structure
- **Maintainability**: Modular components, custom hooks, clean architecture

## 🎨 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with dark theme support
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Syntax Highlighting**: react-syntax-highlighter
- **Development**: ESLint, Prettier
- **API Integration**: Fetch with caching and retry logic
- **Image Optimization**: Next.js Image component

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🚀 Key Features Implemented

### Performance Optimizations
- **Memoization**: React.memo, useMemo, useCallback for optimal re-renders
- **Debouncing**: Input debouncing for smooth user experience
- **Image Optimization**: Next.js Image component with error handling
- **Caching**: API response caching with TTL
- **Lazy Loading**: Component-level optimization

### User Experience
- **Dark Theme**: Global dark theme with proper contrast
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Loading States**: Comprehensive loading indicators and error handling
- **Animations**: Smooth transitions and hover effects
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

### Code Quality
- **TypeScript**: Full type safety throughout the application
- **Modular Architecture**: Component-based design with custom hooks
- **Error Boundaries**: Graceful error handling and recovery
- **Code Splitting**: Optimized bundle size and loading
- **Best Practices**: Modern React patterns and conventions

## 🛠️ Development Process

This project was developed using modern web development practices:
- **ChatGPT Integration**: Used as reference for ideas and best practices
- **Component Architecture**: Modular, reusable components
- **Custom Hooks**: Encapsulated business logic and state management
- **API Design**: RESTful API routes with proper error handling
- **Testing**: Manual testing with comprehensive error scenarios

