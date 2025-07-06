import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Micro-Quiz Platform - Test Your Knowledge',
  description: 'Challenge yourself with our collection of engaging quizzes across various topics including History, Science, Math, and Programming.',
  keywords: 'quiz, education, learning, test, knowledge, history, science, math, programming',
  authors: [{ name: 'Micro-Quiz Platform' }],
  creator: 'Micro-Quiz Platform',
  publisher: 'Micro-Quiz Platform',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'Micro-Quiz Platform - Test Your Knowledge',
    description: 'Challenge yourself with our collection of engaging quizzes across various topics.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Micro-Quiz Platform',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Micro-Quiz Platform - Test Your Knowledge',
    description: 'Challenge yourself with our collection of engaging quizzes across various topics.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google',
    yandex: 'yandex',
    yahoo: 'yahoo',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}