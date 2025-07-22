
import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { useRef } from 'react';

export default function App({ Component, pageProps }) {
  // Ensure QueryClient is not recreated on every render
  const queryClientRef = useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  return (
    <QueryClientProvider client={queryClientRef.current}>
      <TooltipProvider>
        <Component {...pageProps} />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
