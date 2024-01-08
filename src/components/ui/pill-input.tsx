import { Cross1Icon } from '@radix-ui/react-icons';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import React from 'react';

export interface CustomTagSelectProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  items: string;
  defaultItems?: string[];
  onAdd: (item: string) => void;
  onRemove: (item: string) => void;
}

const commonTagsArr = [
  'bug',
  'feature',
  'enhancement',
  'documentation',
  'help wanted',
  'good first issue',
];
const PillInput = React.forwardRef<HTMLInputElement, CustomTagSelectProps>(
  (
    {
      items,
      defaultItems = commonTagsArr,
      onAdd,
      onRemove,
      ...props
    }: CustomTagSelectProps,
    ref
  ) => (
    <div>
      <div className='flex flex-wrap gap-2'>
        {defaultItems.map((item) => (
          <div key={item} className='relative'>
            <Badge
              className='cursor-pointer'
              onClick={() => onAdd(item)}
              variant='secondary'
            >
              {item}
            </Badge>
            {items.includes(item) && (
              <span
                onClick={() => onRemove(item)}
                className='p-1 absolute top-[-10px] right-[-10px]  bg-red-500 rounded-full cursor-pointer z-10'
              >
                <Cross1Icon className='w-2 h-2' />
              </span>
            )}
          </div>
        ))}
      </div>
      <Input type='text' {...props} ref={ref} />
    </div>
  )
);

export { PillInput };
