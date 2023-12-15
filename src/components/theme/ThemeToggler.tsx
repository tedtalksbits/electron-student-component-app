import { Button } from '../ui/button';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useUserPreferences } from '@/hooks/useUserPreferences';

export const ThemeToggler = () => {
  const { theme, toggleTheme } = useUserPreferences();
  return (
    <Button variant='secondary' onClick={toggleTheme}>
      {theme === 'light' ? (
        <MoonIcon className='h-5 w-5' />
      ) : (
        <SunIcon className='h-5 w-5' />
      )}
    </Button>
  );
};
