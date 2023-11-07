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
    </AppProvider>
  );
}

export default App;
