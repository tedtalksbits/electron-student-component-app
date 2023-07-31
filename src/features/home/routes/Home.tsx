import { AvatarIcon } from '@radix-ui/react-icons';
import { Card } from '@tremor/react';

export const Home = () => {
  return (
    <div className='grid grid-cols-12 sm:grid-rows-3 gap-8 h-screen p-4'>
      <Card className='col-span-12 sm:col-span-6 md:col-span-4 shadow-lg'>
        <AvatarIcon className='h-10 w-10' />
      </Card>
      <Card className='col-span-12 sm:col-span-6 md:col-span-8 shadow-lg'>
        skedrool
      </Card>
      <Card className='col-span-12 sm:col-span-6 md:col-span-8 shadow-lg'>
        decks
      </Card>
      <Card className='col-span-12 sm:col-span-6 md:col-span-4 shadow-lg'>
        flashcards
      </Card>
      <Card className='col-span-12 sm:col-span-6 md:col-span-4 shadow-lg'>
        study
      </Card>
      <Card className='col-span-12 sm:col-span-6 md:col-span-8 shadow-lg'>
        tasks
      </Card>
    </div>
  );
};
