import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  language = "typescript",
  showLineNumbers = true,
  className = "",
}: CodeBlockProps) {
  return (
    <div className={`rounded-md overflow-hidden ${className}`}>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          fontSize: "0.875rem",
          lineHeight: "1.5",
        }}
        wrapLines={true}
        wrapLongLines={true}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
