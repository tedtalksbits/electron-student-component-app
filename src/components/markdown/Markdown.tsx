import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
export default function Markdown({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <ReactMarkdown
      className={
        className +
        ' my-4 whitespace-break-spaces markdown [&>*a]:text-primary [&>*]:text-xl hover:text-primary-600 dark:hover:text-primary-400'
      }
      remarkPlugins={[remarkGfm]}
      children={children}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              className='dark:bg-background rounded-xl text-orange-600 text-xl'
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
                className +
                ' dark:bg-background rounded-xl text-orange-600 text-xl'
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
