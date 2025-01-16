
import { createRoot } from 'react-dom/client'
import './index.css'; 
import App from './App.tsx'
import { Provider } from 'react-redux';
import { store } from './redux/store.ts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage.tsx';
import PageNotFound from './pages/PageNotFound.tsx';
import Dashboard from './pages/Dashboard.tsx';
import AddProduct from './pages/AddProduct.tsx';
import HomePage from './pages/HomePage.tsx';


// Define routes

const router = createBrowserRouter([
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
  
])


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
    
  
)
