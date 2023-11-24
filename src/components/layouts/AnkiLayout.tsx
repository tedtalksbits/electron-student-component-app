import { Outlet } from 'react-router-dom';
import Navbar from '../navigation/Navbar';

export function AnkiLayout() {
  return (
    <main>
      <header>
        <Navbar />
      </header>
      <div className='p-4 max-w-screen-8xl mx-auto'>
        <Outlet />
      </div>
    </main>
  );
}
