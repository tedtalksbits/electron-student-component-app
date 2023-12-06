import React from 'react';
import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { Progress } from 'antd';

const ProgressDisplayVariants = cva('daily p-2 border rounded-md my-2', {
  variants: {
    variant: {
      default: '',
      success: 'bg-success/5 border-success/10',
      shiney: 'animate-shine [animation-delay:.35s]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const ProgressDisplay = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> &
    VariantProps<typeof ProgressDisplayVariants> &
    DailyStudyProps
>(({ className, label, progress, total, ...props }, ref) => {
  const isComplete = progress >= total;

  return (
    <div
      className={`${
        isComplete
          ? 'bg-success/5 border-success/10'
          : 'animate-shine [animation-delay:.45s]'
      }${cn(ProgressDisplayVariants({ className, ...props }))}`}
      {...props}
      ref={ref}
    >
      <header className='m-0 p-0'>
        <span className='text-xs'>
          {label} {isComplete && '✅'}
        </span>
        {props.children}
      </header>
      <Progress percent={progress} />
    </div>
  );
});

export interface DailyStudyProps {
  label: string;
  progress: number;
  total: number;
}

export default ProgressDisplay;
