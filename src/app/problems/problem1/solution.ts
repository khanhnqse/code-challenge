// Three unique implementations of sum_to_n function

// Method 1: Iterative approach using a for loop
export const sum_to_n_a = function(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

// Method 2: Mathematical formula approach (Gauss's formula)
export const sum_to_n_b = function(n: number): number {
    return (n * (n + 1)) / 2;
};

// Method 3: Recursive approach
export const sum_to_n_c = function(n: number): number {
    if (n <= 0) {
        return 0;
    }
    return n + sum_to_n_c(n - 1);
};

// Test function to verify all implementations work correctly
export function testSumToN(): void {
    const testCases = [1, 5, 10, 100, 0];
    
    console.log("Testing all three implementations:");
    console.log("=====================================");
    
    testCases.forEach(n => {
        const resultA = sum_to_n_a(n);
        const resultB = sum_to_n_b(n);
        const resultC = sum_to_n_c(n);
        
        console.log(`n = ${n}:`);
        console.log(`  Method A (Iterative): ${resultA}`);
        console.log(`  Method B (Formula):   ${resultB}`);
        console.log(`  Method C (Recursive): ${resultC}`);
        console.log(`  All equal: ${resultA === resultB && resultB === resultC ? '✓' : '✗'}`);
        console.log();
    });
}
