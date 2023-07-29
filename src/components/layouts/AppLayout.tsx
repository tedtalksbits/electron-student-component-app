import React from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';

type AppLayoutProps = {
  children: React.ReactNode;
};
export default function AppLayout() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className='p-4 max-w-7xl mx-auto'>
      <header>
        <nav>
          <button onClick={goBack}>← Back</button>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}
