import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Land of Stone Flowers — An Illustrated Book by Sveta Dorosheva',
  description: 'A fairy guide to the mythical human being. Hand-drawn illustrations by Sveta Dorosheva.',
  openGraph: {
    title: 'The Land of Stone Flowers — An Illustrated Book by Sveta Dorosheva',
    description: 'A fairy guide to the mythical human being. Hand-drawn illustrations by Sveta Dorosheva.',
    type: 'book',
    url: 'https://landofstoneflowers.com/',
    images: [{ url: 'https://land-of-stone-flowers.misha-novoselov.chatgpt.site/archive/header-new.jpg', width: 1900, height: 1254 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Land of Stone Flowers',
    description: 'A fairy guide to the mythical human being.',
    images: ['https://land-of-stone-flowers.misha-novoselov.chatgpt.site/archive/header-new.jpg'],
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
