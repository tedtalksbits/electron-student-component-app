import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { ConfigProvider, theme } from 'antd';
import React, { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useToggleConfig } from '@/hooks/theme';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { Toaster } from '@/components/ui/toaster';
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
  const { theme: currTheme } = useToggleConfig();
  const antdTheme =
    currTheme === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm;
  useEffect(() => {
    console.log('appProvider' + currTheme);
  }, [currTheme]);
  return (
    <React.Suspense fallback={<LoadingScreen />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ConfigProvider
          theme={{
            algorithm: antdTheme,
            token: {
              colorPrimary: '#1890ff',
              borderRadius: 2,
              colorBgContainer: 'bg-primary',
            },
            components: {
              Calendar: {
                colorBgBase: '#fff',
                colorPrimary: '#1890ff',
              },
            },
          }}
        >
          <Provider store={store}>{children}</Provider>
          <Toaster />
        </ConfigProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
