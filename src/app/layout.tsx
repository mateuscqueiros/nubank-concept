import { Container } from '@/components/Layout';
import { DataProvider, ModalsProvider } from '@/providers';
import '@/styles/fonts.css';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Loading from './loading';

export const metadata: Metadata = {
  title: 'Nubank',
  description: 'Conceito do App Nubank pela Hcode Treinamentos desenvolvido durante o Hcode Lab',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-theme="light">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicons//favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicons//favicon-16x16.png" />
        <link rel="manifest" href="/icons/favicons//site.webmanifest" />
        <meta name="msapplication-TileColor" content="#8a05be" />
        <meta name="theme-color" content="#8a05be" />
      </head>
      <body>
        <DataProvider>
          <ModalsProvider>
            <Suspense fallback={<Loading />}>
              <Container>{children}</Container>
            </Suspense>
          </ModalsProvider>
        </DataProvider>
      </body>
    </html>
  );
}
