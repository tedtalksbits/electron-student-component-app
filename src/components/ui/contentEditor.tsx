import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';
import { cn } from '../../lib/utils';

const contentEditorVariants = cva(
  'contentEditor flex min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border',
        destructive: 'bg-destructive text-destructive',
        outline: 'border',
        secondary: 'bg-secondary text-secondary',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'text-base',
        small: 'text-sm',
        large: 'text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ContentEditorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof contentEditorVariants> {
  value?: string;
  editable?: boolean;
}

const ContentEditor = React.forwardRef<HTMLDivElement, ContentEditorProps>(
  ({ className, value, editable, ...props }, ref) => {
    if (props.onChange)
      throw new Error('onChange is not allowed, use onInput instead');
    if (props.onInput && !editable)
      throw new Error('editable must be true to use onInput');

    return (
      <div
        className={cn(contentEditorVariants({ className, ...props }))}
        ref={ref}
        contentEditable={editable}
        dangerouslySetInnerHTML={{ __html: value ?? '' }}
      ></div>
    );
  }
);

export default ContentEditor;
