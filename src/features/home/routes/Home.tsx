import { SkedroolPreview } from '@/features/skedrool/components/SkedroolPreview';
import { AvatarIcon } from '@radix-ui/react-icons';
import { Card, Title, Divider } from '@tremor/react';

export const Home = () => {
  return (
    <div className='grid grid-cols-12 sm:grid-rows-3 gap-8 h-[calc(100vh-5rem)] p-4'>
      <Card className='col-span-12 sm:col-span-6 md:col-span-4 shadow-lg'>
        <AvatarIcon className='h-36 w-36' />
        <h2 className='text-3xl font-medium'>Tedane</h2>
        <p className='text-muted-foreground'>
          <a href='mailto:tedaneblake@gmail.com'>tedaneblake@gmail.com</a>
        </p>
        {/* <Clock /> */}
      </Card>
      <Card className='col-span-12 sm:col-span-6 md:col-span-8 shadow-lg overflow-auto'>
        <Title>Skedrool</Title>
        <Divider />
        <SkedroolPreview />
      </Card>
      <Card className='col-span-12 sm:col-span-6 md:col-span-8 shadow-lg'>
        <Title>Decks</Title>
        <p className='text-muted-foreground'>coming soon...</p>
      </Card>
      <Card className='col-span-12 sm:col-span-6 md:col-span-4 shadow-lg'>
        <Title>Flashcards</Title>
        <p className='text-muted-foreground'>coming soon...</p>
      </Card>
      <Card className='col-span-12 sm:col-span-6 md:col-span-4 shadow-lg'>
        <Title>Study</Title>
        <p className='text-muted-foreground'>coming soon...</p>
      </Card>
      <Card className='col-span-12 sm:col-span-6 md:col-span-8 shadow-lg'>
        <Title>Tasks</Title>
        <p className='text-muted-foreground'>coming soon...</p>
      </Card>
    </div>
  );
};
