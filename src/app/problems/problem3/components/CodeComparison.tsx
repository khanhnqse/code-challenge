import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { Code, CheckCircle } from "lucide-react";

const originalCode = `interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100
      case 'Ethereum':
        return 50
      case 'Arbitrum':
        return 30
      case 'Zilliqa':
        return 20
      case 'Neo':
        return 20
      default:
        return -99
    }
  }

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
      const balancePriority = getPriority(balance.blockchain);
      if (lhsPriority > -99) { // ❌ UNDEFINED VARIABLE
        if (balance.amount <= 0) { // ❌ INVERTED LOGIC
          return true;
        }
      }
      return false
    }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
      const leftPriority = getPriority(lhs.blockchain);
      const rightPriority = getPriority(rhs.blockchain);
      if (leftPriority > rightPriority) {
        return -1;
      } else if (rightPriority > leftPriority) {
        return 1;
      }
      // ❌ MISSING RETURN STATEMENT
    });
  }, [balances, prices]); // ❌ UNUSED DEPENDENCY

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        className={classes.row}
        key={index} // ❌ ARRAY INDEX AS KEY
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}`;

const refactoredCode = `// ✅ Types with proper blockchain typing
type Blockchain = 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo';

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
  usdValue: number;
  priority: number;
}

interface Props extends BoxProps {}

// ✅ Constants for magic numbers
const BLOCKCHAIN_PRIORITIES: Record<Blockchain, number> = {
  'Osmosis': 100,
  'Ethereum': 50,
  'Arbitrum': 30,
  'Zilliqa': 20,
  'Neo': 20,
} as const;

const DEFAULT_PRIORITY = -99;

// ✅ Memoized priority function
const getPriority = (blockchain: Blockchain): number => {
  return BLOCKCHAIN_PRIORITIES[blockchain] ?? DEFAULT_PRIORITY;
};

const WalletPage: React.FC<Props> = (props: Props) => {
  const { ...rest } = props; // ✅ Remove unused children
  const balances = useWalletBalances();
  const prices = usePrices();

  // ✅ Single optimized useMemo with proper dependencies
  const processedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const priority = getPriority(balance.blockchain);
        // ✅ Fixed filter logic - keep positive balances with valid priority
        return priority > DEFAULT_PRIORITY && balance.amount > 0;
      })
      .sort((a: WalletBalance, b: WalletBalance) => {
        const priorityA = getPriority(a.blockchain);
        const priorityB = getPriority(b.blockchain);
        // ✅ Complete sort function with proper return
        return priorityB - priorityA; // Descending order
      })
      .map((balance: WalletBalance): FormattedWalletBalance => {
        const priority = getPriority(balance.blockchain);
        const usdValue = (prices[balance.currency] || 0) * balance.amount;
        
        return {
          ...balance,
          formatted: balance.amount.toFixed(2),
          usdValue,
          priority,
        };
      });
  }, [balances, prices]); // ✅ Correct dependencies

  // ✅ Memoized rows with proper keys
  const rows = useMemo(() => {
    return processedBalances.map((balance: FormattedWalletBalance) => (
      <WalletRow 
        className={classes.row}
        key={\`\${balance.blockchain}-\${balance.currency}\`} // ✅ Stable key
        amount={balance.amount}
        usdValue={balance.usdValue}
        formattedAmount={balance.formatted}
        priority={balance.priority}
      />
    ));
  }, [processedBalances]);

  return (
    <div {...rest}>
      {rows}
    </div>
  );
};`;

export function CodeComparison() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Original Code */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5 text-red-500" />
              Original Code
            </CardTitle>
            <CardDescription>
              The problematic code with all issues highlighted
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock language="typescript" code={originalCode} />
          </CardContent>
        </Card>

        {/* Refactored Code */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Refactored Solution
            </CardTitle>
            <CardDescription>
              Optimized code with all issues fixed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock language="typescript" code={refactoredCode} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
