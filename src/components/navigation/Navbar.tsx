import { MoonIcon, SunIcon, ViewGridIcon } from '@heroicons/react/solid';
import { Button } from '../ui/button';
import { useToggleTheme } from '@/hooks/theme';
import { useLocation } from 'react-router-dom';
import GoBackButton from './GoBackButton';
import logo from '@/assets/ankiwindows.png';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { AppsGrid } from './AppsGrid';

const Navbar = () => {
  const location = useLocation();

  const { theme, toggleTheme } = useToggleTheme();
  return (
    <nav className='border-b p-3 '>
      <div className='max-w-7xl flex items-center justify-between flex-wrap mx-auto'>
        <div className='flex items-center flex-shrink-0 mr-6 '>
          {location.pathname === '/' ? (
            <img src={logo} alt='logo' className='h-10 w-10' />
          ) : (
            <GoBackButton />
          )}
        </div>
        <div className='block'>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant='outline'>
                <ViewGridIcon className='h-5 w-5' />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <AppsGrid />
            </PopoverContent>
          </Popover>
          <Button variant='outline' onClick={toggleTheme}>
            {theme === 'light' ? (
              <MoonIcon className='h-5 w-5' />
            ) : (
              <SunIcon className='h-5 w-5' />
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
