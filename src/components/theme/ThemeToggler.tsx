import { Button } from '../ui/button';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useToggleTheme } from '@/hooks/theme';

export const ThemeToggler = () => {
  const { theme, toggleTheme } = useToggleTheme();
  return (
    <Button variant='outline' onClick={toggleTheme}>
      {theme === 'light' ? (
        <MoonIcon className='h-5 w-5' />
      ) : (
        <SunIcon className='h-5 w-5' />
      )}
    </Button>
  );
};
