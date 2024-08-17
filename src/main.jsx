import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import router from './Routes/Router';
import AuthProvider from './Providers/Authprovider';

// Create a QueryClient instance
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)