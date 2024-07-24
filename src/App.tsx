import { QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { queryClient } from '@/api/queryClient';
import Error from '@/components/common/Error';
import Layout from '@/components/layout/Layout';
import { BookstoreThemeProvider } from '@/context/ThemeContext';
import BookDetail from '@/pages/BookDetail';
import Books from '@/pages/Books';
import Cart from '@/pages/Cart';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Order from '@/pages/Order';
import OrderList from '@/pages/OrderList';
import ResetPassword from '@/pages/ResetPassword';
import Signup from '@/pages/Signup';

const routeList = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/books',
    element: <Books />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/reset',
    element: <ResetPassword />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/book/:bookId',
    element: <BookDetail />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/order',
    element: <Order />,
  },
  {
    path: '/orderlist',
    element: <OrderList />,
  },
];

const router = createBrowserRouter(
  routeList.map((item) => ({
    ...item,
    element: <Layout>{item.element}</Layout>,
    errorElement: (
      <Layout>
        <Error />
      </Layout>
    ),
  }))
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BookstoreThemeProvider>
        <RouterProvider router={router} />
      </BookstoreThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
