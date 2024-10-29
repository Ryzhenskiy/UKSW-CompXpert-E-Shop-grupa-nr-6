import { Header } from '@/components/layout/Header';
import AppProvider from '@/components/AppContext';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'CompXpert',
  description: 'E-shop with computer parts',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className=" p-2 md:max-w-full">
          <AppProvider>
            <Header />
            <Toaster />
            {children}
            <footer className="border-t p-8 text-center text-gray-500 mt-16">
              &copy; 2024 All rights reserved.
            </footer>
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
