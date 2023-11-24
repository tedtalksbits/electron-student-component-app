import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';

const ProgressVariants = cva(
  'relative h-2 w-full overflow-hidden rounded-full bg-primary/20',
  {
    variants: {
      variant: {
        default: 'bg-primary/20',
        destructive: 'bg-destructive/20',
        secondary: 'bg-secondary/20',
        success: 'bg-success/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> &
    VariantProps<typeof ProgressVariants>
>(({ className, value, ...props }, ref) => {
  const variant = props.variant || 'default';

  const variantColors = {
    default: {
      root: 'bg-primary/20',
      indicator: 'bg-primary',
    },
    destructive: {
      root: 'bg-destructive/20',
      indicator: 'bg-destructive',
    },
    secondary: {
      root: 'bg-secondary/20',
      indicator: 'bg-secondary',
    },
    success: {
      root: 'bg-success/20',
      indicator: 'bg-success',
    },
  };

  const rootColor = variantColors[variant].root;
  const indicatorColor = variantColors[variant].indicator;

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        `relative h-2 w-full overflow-hidden rounded-full ${rootColor}`,
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={`h-full w-full flex-1 ${indicatorColor} transition-all indicator`}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
