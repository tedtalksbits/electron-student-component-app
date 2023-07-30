import './App.css';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layouts/AppLayout';
import { Flashcards } from './features/flashcards/routes';
import { Decks } from './features/decks/routes';
import { ErrorBoundary } from 'react-error-boundary';
import { Study } from './features/study/routes';
import { Button } from './components/ui/button';

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
            <Route path='/' element={<Decks />} />
            <Route path='/deck/:id/flashcards' element={<Flashcards />} />
          </Route>
          <Route path='/deck/:id/study' element={<Study />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
