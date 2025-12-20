import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Router/Router'
import ThemeProvider from './Contex/ThemeProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from './Contex/AuthProvider'
import ModalProvider from './Contex/ModalProvider'
const queryClient = new QueryClient()
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <StrictMode>


    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          < ModalProvider>
            <Toaster
              position="top-right"
              reverseOrder={false}
              toastOptions={{
                duration: 1000,
              }}
            />
            <RouterProvider router={router}></RouterProvider>
          </ModalProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
