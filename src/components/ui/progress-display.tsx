import React from 'react';
import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { Progress } from 'antd';
import { ProgressCircle } from '@tremor/react';

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
>(
  (
    {
      className,
      label,
      progress,
      total,
      progressDisplayType = 'bar',
      color = 'orange',
      ...props
    },
    ref
  ) => {
    const isComplete = progress >= total;
    if (progressDisplayType === 'cricle')
      return (
        <div
          className={`flex items-center gap-4 ${
            isComplete
              ? 'bg-success/5 border-success/10'
              : 'animate-shine [animation-delay:.45s]'
          }${cn(ProgressDisplayVariants({ className, ...props }))}`}
          {...props}
          ref={ref}
        >
          <ProgressCircle
            showAnimation
            value={progress}
            color={`${isComplete ? '' : color}`}
          >
            {(progress / total) * 100 > 100 ? '100' : (progress / total) * 100}%
          </ProgressCircle>
          <header className='m-0 p-0 flex-col flex gap-1'>
            <span className='font-semibold'>
              {label} {isComplete && '✅'}
            </span>
            {props.children}
          </header>
        </div>
      );

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
  }
);

export interface DailyStudyProps {
  label: string;
  progress: number;
  total: number;
  progressDisplayType?: 'bar' | 'cricle';
  color?: Parameters<typeof ProgressCircle>[0]['color'];
}

export default ProgressDisplay;
