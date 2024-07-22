import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Error from './components/common/Error';
import ThemeSwitcher from './components/header/ThemeSwitcher';
import Layout from './components/layout/Layout';
import { BookstoreThemeProvider } from './context/ThemeContext';
import BookDetail from './pages/BookDetail';
import Books from './pages/Books';
import Home from './pages/Home';
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
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
    path: '/books',
    element: (
      <Layout>
        <Books />
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
  {
    path: '/reset',
    element: (
      <Layout>
        <ResetPassword />
      </Layout>
    ),
  },
  {
    path: '/login',
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: '/book/:bookId',
    element: (
      <Layout>
        <BookDetail />
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
