import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Land of Stone Flowers — An Illustrated Book by Sveta Dorosheva',
  description: 'A genre-defying artist book about the human world as observed by fairy creatures, written and illustrated by Sveta Dorosheva.',
  openGraph: {
    title: 'The Land of Stone Flowers — An Illustrated Book by Sveta Dorosheva',
    description: 'A genre-defying artist book about the human world as observed by fairy creatures, written and illustrated by Sveta Dorosheva.',
    type: 'book',
    url: 'https://landofstoneflowers.com/',
    images: [{ url: 'https://landofstoneflowers.com/archive/header-new.jpg', width: 1900, height: 1254 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Land of Stone Flowers',
    description: 'A genre-defying artist book about the human world as observed by fairy creatures.',
    images: ['https://landofstoneflowers.com/archive/header-new.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
