import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import SocketsProvider from 'context/socket.context';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SocketsProvider>
      <Component {...pageProps} />
    </SocketsProvider>
  );
}
