import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.jsx'
import './index.css'

// QueryClient 인스턴스 생성
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
<<<<<<< HEAD
  </>,
=======
  </React.StrictMode>
>>>>>>> 133dd125a115cc716a0b7eab477a0a0f9e641acd
)
