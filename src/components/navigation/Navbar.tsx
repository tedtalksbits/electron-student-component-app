import logo from '@/assets/icon.png';
import { AppGridPopover } from './AppGridPopover';
import { ThemeToggler } from '../theme/ThemeToggler';

const Navbar = () => {
  return (
    <nav className='border-b p-3 h-[5rem]'>
      <div className='max-w-screen-8xl p-4 flex items-center justify-between flex-wrap mx-auto'>
        <div className='flex items-center flex-shrink-0 mr-6 '>
          <img src={logo} alt='logo' className='h-10 w-10' />
        </div>
        <div className='flex gap-2'>
          <AppGridPopover />
          <ThemeToggler />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
