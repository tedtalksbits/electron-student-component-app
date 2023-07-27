import './App.css';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layouts/AppLayout';
import Flashcards from './features/flashcards/routes/Flashcards';
import { Decks } from './features/decks/routes';
import { ErrorBoundary } from 'react-error-boundary';

type ErrorFallbackProps = {
  error: Error;
  resetErrorBoundary: (...args: Array<unknown>) => void;
};
const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  return (
    <div role='alert'>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Router>
        <AppLayout>
          <Routes>
            <Route path='/' element={<Decks />} />
            <Route path='/deck/:id/flashcards' element={<Flashcards />} />
            <Route path='*' element={<h1> Not found </h1>} />
          </Routes>
        </AppLayout>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
