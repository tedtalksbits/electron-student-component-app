import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { ViewGridIcon } from '@heroicons/react/solid';
import { AppsGrid } from './AppsGrid';
import { indexRoutes } from '@/routes';

export const AppGridPopover = () => {
  const [open, setOpen] = useState(false);
  const onItemClick = () => setOpen(false);
  return (
    <Popover open={open} onOpenChange={() => setOpen(!open)}>
      <PopoverTrigger asChild>
        <Button variant='secondary' onClick={() => setOpen(true)}>
          <ViewGridIcon className='h-5 w-5' />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <AppsGrid routes={indexRoutes} onItemClick={onItemClick} />
      </PopoverContent>
    </Popover>
  );
};
