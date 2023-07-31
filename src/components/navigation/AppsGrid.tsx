import { routes } from '@/routes';
import { Link } from 'react-router-dom';

export const AppsGrid = () => {
  const ankiBaseApp = routes.anki.routes[0];
  const skedroolBaseApp = routes.skedrool.routes[0];
  const taskifyBaseApp = routes.taskify.routes[0];
  const homeBaseApp = routes.home.routes[0];
  const baseApps = [homeBaseApp, ankiBaseApp, skedroolBaseApp, taskifyBaseApp];
  return (
    <div className='grid grid-cols-3 gap-1'>
      {baseApps.map((app) => (
        <Link
          key={app.href}
          to={app.href}
          className='border flex items-center justify-center rounded-md p-4 no-underline outline-none hover:bg-secondary hover:text-primary transition-colors'
        >
          {app.title}
        </Link>
      ))}
    </div>
  );
};
