import logo from '@/assets/icon.png';
import { ThemeToggler } from '../theme/ThemeToggler';
import { indexRoutes } from '@/routes';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='border-b p-3 h-[5rem]'>
      <div className='max-w-screen-8xl p-4 flex items-center justify-between flex-wrap mx-auto'>
        <div className='flex items-center flex-shrink-0 mr-6 '>
          <img src={logo} alt='logo' className='h-10 w-10' />
        </div>
        <div className='flex gap-8 items-center'>
          {/* <AppGridPopover /> */}
          {indexRoutes.map((route) => (
            <NavLink
              key={route.href}
              to={route.href}
              className={({ isActive }) =>
                isActive ? 'text-primary' : 'text-foreground/50'
              }
              target={route.target ?? ''}
            >
              {route.title}
            </NavLink>
          ))}
          <ThemeToggler />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
