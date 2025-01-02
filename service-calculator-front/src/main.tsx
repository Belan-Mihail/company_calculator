
import { createRoot } from 'react-dom/client'
import './index.css'; 
import App from './App.tsx'
import { Provider } from 'react-redux';
import { store } from './redux/store.ts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Define routes

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  
])


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
    
  
)
