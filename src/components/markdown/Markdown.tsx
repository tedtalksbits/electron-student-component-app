import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
export default function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      className='my-4 before:content-["A:"] before:block before:h-4'
      remarkPlugins={[remarkGfm]}
      children={children}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              children={String(children).replace(/\n$/, '')}
              style={atomDark}
              language={match[1]}
              PreTag='div'
            />
          ) : (
            <code
              {...props}
              className={
                className + ' bg-neutral-700 rounded-md text-amber-200'
              }
            >
              {children}
            </code>
          );
        },
      }}
    />
  );
}
