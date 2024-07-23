import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Error from './components/common/Error';
import ThemeSwitcher from './components/header/ThemeSwitcher';
import Layout from './components/layout/Layout';
import { BookstoreThemeProvider } from './context/ThemeContext';
import BookDetail from './pages/BookDetail';
import Books from './pages/Books';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import Order from './pages/Order';
import OrderList from './pages/OrderList';
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
  {
    path: '/cart',
    element: (
      <Layout>
        <Cart />
      </Layout>
    ),
  },
  {
    path: '/order',
    element: (
      <Layout>
        <Order />
      </Layout>
    ),
  },
  {
    path: '/orderlist',
    element: (
      <Layout>
        <OrderList />
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
