import { AppsGrid } from '@/components/navigation/AppsGrid';
import { SkedroolPreview } from '@/features/skedrool/components/SkedroolPreview';
import { AvatarIcon } from '@radix-ui/react-icons';
import { Card, Title, Divider } from '@tremor/react';

export const Home = () => {
  return (
    <div className='mt-20 p-4 border rounded-xl shadow-md max-w-xl mx-auto'>
      <Title className='mb-4'>Apps</Title>
      <AppsGrid size='lg' />
    </div>
  );
};
