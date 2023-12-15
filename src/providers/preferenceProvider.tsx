import { USER_ID } from '@/constants';
import React, { createContext, useEffect } from 'react';

export const PreferenceContext = createContext({
  theme: 'light',
  toggleTheme: () => {
    console.log('toggleTheme');
  },
  deckViewType: 'list',
  setDeckViewType: (_type: 'list' | 'grid') => {
    console.log('setDeckViewType');
  },
  setTheme: () => {
    console.log('setTheme');
  },
});

type PrefProviderProps = {
  children: React.ReactNode;
};

export const PreferenceProvider = ({ children }: PrefProviderProps) => {
  const [theme, setTheme] = React.useState<'dark' | 'light'>(
    (window.localStorage.getItem('theme') as 'dark' | 'light') || 'light'
  );
  const [deckViewType, setDeckViewType] = React.useState<'list' | 'grid'>(
    'list'
  );
  useEffect(() => {
    console.log('before fetching', theme, deckViewType);
    window.electron.ipcRenderer.preference
      .getPreference(USER_ID)
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
          return;
        }
        if (data) {
          setTheme(data.theme);
          setDeckViewType(data.deck_view);

          document.documentElement.classList.remove('dark', 'light');
          document.documentElement.classList.add(data.theme);
        }
      });
    console.log('after fetching', theme, deckViewType);
  }, [theme, deckViewType]);

  return (
    <PreferenceContext.Provider
      value={{
        theme,
        toggleTheme: async () => {
          await window.electron.ipcRenderer.preference.setPreference(USER_ID, {
            theme: theme === 'light' ? 'dark' : 'light',
          });
          document.documentElement.classList.remove('dark', 'light');
          document.documentElement.classList.add(theme);

          setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
        },

        deckViewType,
        setDeckViewType: async (type) => {
          console.log('setDeckViewType');
          await window.electron.ipcRenderer.preference.setPreference(USER_ID, {
            deck_view: type,
          });
          setDeckViewType(type);
        },
        setTheme: () => {
          console.log('setTheme');
        },
      }}
    >
      {children}
    </PreferenceContext.Provider>
  );
};
