import { iRoute, indexRoutes } from '@/routes';
import { Link } from 'react-router-dom';

export const AppsGrid = ({
  onItemClick,
  size = 'sm',
  routes,
}: {
  onItemClick?: () => void;
  size?: 'sm' | 'lg';
  routes: iRoute[];
}) => {
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
      {routes.map((app, i) => (
        <Link
          key={app.href}
          to={app.href || ''}
          onClick={onItemClick}
          className={`border flex items-center justify-center rounded-md flex-col ${itemSizes[size]} no-underline outline-none  transition-colors bg-foreground/5 hover:shadow-md active:border-primary`}
        >
          <app.icon className={`${iconSizes[size]} ${colors[i]}`} />
          <span className='text-center'>{app.title}</span>
        </Link>
      ))}
    </div>
  );
};
