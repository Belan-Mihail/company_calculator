// index.tsx
import { createRoot } from 'react-dom/client'
import './index.css'; 
import { Provider } from 'react-redux';
import { store } from './redux/store.ts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage.tsx';
import PageNotFound from './pages/PageNotFound.tsx';
import Dashboard from './pages/Dashboard.tsx';
import AddProduct from './pages/AddProduct.tsx';
import HomePage from './pages/HomePage.tsx';
import App from './App.tsx'; // Global Layout

// Define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Use App as the global layout for all pages
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/add-product',
        element: <AddProduct />,
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
