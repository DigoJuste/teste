import { OpenProvider } from '@/contexts/OpenContext';
import '@/styles/globals.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (<OpenProvider><QueryClientProvider client={queryClient}>
    <Component {...pageProps} />
  </QueryClientProvider></OpenProvider>
  );
}
