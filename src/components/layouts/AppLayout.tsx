import { Outlet } from 'react-router-dom';
import Navbar from '../navigation/Navbar';

export default function AppLayout() {
  return (
    <main>
      <header>
        <Navbar />
      </header>
      <div className='p-4 max-w-7xl mx-auto'>
        <Outlet />
      </div>
    </main>
  );
}
