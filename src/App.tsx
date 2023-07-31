import './App.css';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import { ErrorBoundary } from 'react-error-boundary';

import { Button } from './components/ui/button';

import { AnkiLayout, AppLayout } from './components/layouts';
import { routes } from './routes';

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

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            {/* App Routes */}
            {routes.home.routes.map((route) => (
              <Route
                key={route.href}
                path={route.href}
                element={route.element}
              />
            ))}
          </Route>
          <Route element={<AnkiLayout />}>
            {/* Anki Routes */}
            {routes.anki.routes.map((route) => (
              <Route
                key={route.href}
                path={route.href}
                element={route.element}
              />
            ))}
          </Route>
          <Route element={<AppLayout />}>
            {/* Taskify Routes */}
            {routes.taskify.routes.map((route) => (
              <Route
                key={route.href}
                path={route.href}
                element={route.element}
              />
            ))}
          </Route>
          <Route element={<AppLayout />}>
            {/* Skedrool Routes */}
            {routes.skedrool.routes.map((route) => (
              <Route
                key={route.href}
                path={route.href}
                element={route.element}
              />
            ))}
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
