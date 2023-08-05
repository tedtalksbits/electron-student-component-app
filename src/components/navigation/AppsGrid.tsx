import { routes } from '@/routes';
import { Link } from 'react-router-dom';

export const AppsGrid = ({
  onItemClick,
  size = 'sm',
}: {
  onItemClick?: () => void;
  size?: 'sm' | 'lg';
}) => {
  const ankiBaseApp = routes.anki.routes[0];
  const skedroolBaseApp = routes.skedrool.routes[0];
  const taskifyBaseApp = routes.taskify.routes[0];
  const homeBaseApp = routes.home.routes[0];
  const baseApps = [homeBaseApp, ankiBaseApp, skedroolBaseApp, taskifyBaseApp];
  const gridSizes = {
    sm: 'grid-cols-3 gap-1',
    lg: 'grid-cols-3 gap-4',
  };
  const itemSizes = {
    sm: 'p-4 text-sm',
    lg: 'p-8 text-xl',
  };
  const iconSizes = {
    sm: 'h-3 w-3',
    lg: 'h-6 w-6',
  };

  const colors = [
    'text-purple-500',
    'text-green-500',
    'text-blue-500',
    'text-yellow-500',
    'text-pink-500',
    'text-sky-500',
    'text-indigo-500',
    'text-gray-500',
  ];
  return (
    <div className={`grid ${gridSizes[size]}`}>
      {baseApps.map((app, i) => (
        <Link
          key={app.href}
          to={app.href}
          onClick={onItemClick}
          className={`border flex items-center justify-center rounded-md flex-col ${itemSizes[size]} no-underline outline-none hover:bg-secondary hover:text-primary transition-colors`}
        >
          <app.icon className={`${iconSizes[size]} ${colors[i]}`} />
          <span className='text-center'>{app.title}</span>
        </Link>
      ))}
    </div>
  );
};
