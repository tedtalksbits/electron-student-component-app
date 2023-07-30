import { useCallback, useEffect, useState } from 'react';

export const useToggleTheme = () => {
  const [theme, setTheme] = useState(
    window.localStorage.getItem('theme') || 'dark'
  );

  useEffect(() => {
    window.localStorage.setItem('theme', theme);
    document.cookie = `theme=${theme}`;

    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return { theme, toggleTheme };
};
