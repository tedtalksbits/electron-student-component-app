import { PreferenceContext } from '@/providers/preferenceProvider';
import { useContext } from 'react';

export const useUserPreferences = () => {
  const preferences = useContext(PreferenceContext);
  return preferences;
};
