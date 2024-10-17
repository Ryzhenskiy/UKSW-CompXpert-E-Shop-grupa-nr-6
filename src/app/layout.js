import { Header } from '@/components/layout/Header';
import './globals.css';

export const metadata = {
  title: 'CompXpert',
  description: 'E-shop with computer parts',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="max-w-6xl mx-auto mt-2">
          <Header />
          {children}
          <footer className="border-t p-8 text-center text-gray-500 mt-16">
            &copy; 2024 All rights reserved.
          </footer>
        </main>
      </body>
    </html>
  );
}
