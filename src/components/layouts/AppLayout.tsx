import React from 'react';
import { NavLink } from 'react-router-dom';
type AppLayoutProps = {
  children: React.ReactNode;
};
export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className='p-4 max-w-7xl mx-auto'>
      <header>
        <nav>
          <NavLink to='/'>Home</NavLink>
        </nav>
      </header>
      {children}
    </div>
  );
}
