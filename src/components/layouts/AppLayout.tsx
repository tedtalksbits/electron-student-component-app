import { Outlet } from 'react-router-dom';
import Navbar from '../navigation/Navbar';

export const AppLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <section className='max-w-7xl mx-auto'>
          <Outlet />
        </section>
      </main>
    </div>
  );
};
