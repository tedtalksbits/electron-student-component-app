import { Outlet } from 'react-router-dom';
import Navbar from '../navigation/Navbar';
import { ProjectsNavigation } from '@/features/taskify/components/ProjectsNavigation';

export const TaskLayout = () => {
  return (
    <div className='flex'>
      <div className=' max-w-[300px] border-r w-full'>
        <div className='h-screen'>
          <ProjectsNavigation />
        </div>
      </div>
      <div className='w-full'>
        <div className='h-screen'>
          <Navbar showBackButton={false} />
          <Outlet />
        </div>
      </div>
    </div>
  );
};
