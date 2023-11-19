import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MedalIcon } from 'lucide-react';
import { Tilt } from 'react-tilt';

const defaultOptions = {
  reverse: true, // reverse the tilt direction
  max: 20, // max tilt rotation (degrees)
  perspective: 2000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1.01, // 2 = 200%, 1.5 = 150%, etc..
  speed: 2000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: 'cubic-bezier(.03,.98,.52,.99)', // Easing on enter/exit.
  glare: true, // if it should have a "glare" effect
};
export const MedalsPopover = () => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={() => setOpen(!open)}>
      <PopoverTrigger asChild>
        <Button variant='secondary' onClick={() => setOpen(true)}>
          <MedalIcon className='h-5 w-5' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-96 grid grid-cols-3 gap-4'>
        {/* create a nice gradient box */}

        <Tilt
          options={defaultOptions}
          style={{ height: 250, width: 250 }}
          className='border rounded-md p-4 bg-gradient-to-br from-primary to-secondary flex items-center justify-center cursor-pointer'
        >
          <div className='text-9xl translate-z-200 select-none '>👽</div>
        </Tilt>
      </PopoverContent>
    </Popover>
  );
};
