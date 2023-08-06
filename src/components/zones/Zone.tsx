import React from 'react';
interface ZonesProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'normal' | 'destructive';
  children: React.ReactNode;
  title?: string;
  props?: any;
}

export const Zone = ({
  variant = 'normal',
  children,
  title,
  ...props
}: ZonesProps) => {
  const variants = {
    normal: 'border border-gray-200',
    destructive: 'border-destructive border',
  };

  return (
    <div {...props}>
      {title && <h2 className='text-lg font-medium my-3'>{title}</h2>}
      <div className={`${variants[variant]} p-4 rounded-lg`}>{children}</div>
    </div>
  );
};
