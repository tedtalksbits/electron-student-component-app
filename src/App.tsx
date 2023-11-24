import './App.css';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { AnkiLayout, AppLayout } from './components/layouts';
import { routes } from './routes';
import { AppProvider } from './providers/app';

function App() {
  return (
    <AppProvider>
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
            {/* Playground Routes */}
            {routes.playground.routes.map((route) => (
              <Route
                key={route.href}
                path={route.href}
                element={route.element}
              />
            ))}
          </Route>

          <Route element={<AnkiLayout />}>
            {/* Analytics Routes */}
            {routes.analytics.routes.map((route) => (
              <Route
                key={route.href}
                path={route.href}
                element={route.element}
              />
            ))}
          </Route>

          {/* 404 */}
          <Route path='*' element={<h1>404</h1>} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
