import { useCallback, useEffect, useState } from 'react';

export const useToggleConfig = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [deckViewType, setDeckViewType] = useState<'list' | 'grid'>('list');

  useEffect(() => {
    const getCongig = async () => {
      const res = await window.electron.ipcRenderer.appConfig.get();
      console.log(res);
      setTheme(res.theme);
      setDeckViewType(res.deckViewType);
    };
    getCongig();
    // window.localStorage.setItem('theme', theme);
    // document.cookie = `theme=${theme}`;

    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
  }, [theme, deckViewType]);

  const toggleTheme = useCallback(async () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    await window.electron.ipcRenderer.appConfig.set({
      deckViewType,
      theme: theme === 'light' ? 'dark' : 'light',
    });
  }, [deckViewType, theme]);

  const toggleDeckViewType = useCallback(
    async (type: 'list' | 'grid') => {
      setDeckViewType((prev) => (prev === 'list' ? 'grid' : 'list'));
      await window.electron.ipcRenderer.appConfig.set({
        deckViewType: type,
        theme,
      });
    },
    [theme]
  );

  return { theme, toggleTheme, toggleDeckViewType, deckViewType };
};
