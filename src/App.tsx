import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Error from './components/common/Error';
import ThemeSwitcher from './components/header/ThemeSwitcher';
import Layout from './components/layout/Layout';
import { BookstoreThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import Signup from './pages/Signup';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
    errorElement: (
      <Layout>
        <Error />
      </Layout>
    ),
  },
  {
    path: '/signup',
    element: (
      <Layout>
        <Signup />
      </Layout>
    ),
  },
]);

function App() {
  return (
    <BookstoreThemeProvider>
      <ThemeSwitcher />

      <RouterProvider router={router} />
    </BookstoreThemeProvider>
  );
}

export default App;
