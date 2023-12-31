import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { Toaster } from '@/components/ui/toaster';
import { PreferenceProvider } from './preferenceProvider';
type ErrorFallbackProps = {
  error: Error;
  resetErrorBoundary: (...args: Array<unknown>) => void;
};
const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  return (
    <div role='alert'>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
};
const LoadingScreen = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className='animate-spin' />
    </div>
  );
};
type AppProviderProps = {
  children: React.ReactNode;
};
export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense fallback={<LoadingScreen />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <PreferenceProvider>
          <Provider store={store}>{children}</Provider>
          <Toaster />
        </PreferenceProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
