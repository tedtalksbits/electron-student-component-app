import { Outlet } from 'react-router-dom';
import { ProjectsNavigation } from '@/features/taskify/components/ProjectsNavigation';
import { AppGridPopover } from '../navigation/AppGridPopover';
import { ThemeToggler } from '../theme/ThemeToggler';

export const TaskLayout = () => {
  return (
    <div className='flex'>
      <div className=' max-w-[300px] border-r w-full'>
        <div className='h-screen'>
          <ProjectsNavigation />
        </div>
      </div>
      <div className='w-full'>
        <div className='h-screen flex flex-col gap-4'>
          <nav className='w-full border-b'>
            <div className='flex items-center justify-between px-4 py-2'>
              <h2 className='text-2xl font-bold'>Taskify</h2>
              <div className='actions'>
                <AppGridPopover />
                <ThemeToggler />
              </div>
            </div>
          </nav>
          <div className='px-4'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
