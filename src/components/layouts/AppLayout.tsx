import { Outlet } from 'react-router-dom';
import Navbar from '../navigation/Navbar';

export const AppLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <section className=''>
          <Outlet />
        </section>
      </main>
    </div>
  );
};
