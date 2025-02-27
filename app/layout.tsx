import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { Inter, Montserrat } from 'next/font/google';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Metadata } from 'next';
import { AuthProvider } from '@/components/providers/AuthProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Nametica - Fresh Ideas, Every Time',
  description: 'AI-driven name and slogan generator for various categories',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${montserrat.variable} font-sans min-h-screen flex flex-col`}
      >
        <AuthProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}
