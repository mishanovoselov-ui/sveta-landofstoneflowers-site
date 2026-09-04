import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

const SITE_URL = 'https://landofstoneflowers.com';
const GA_MEASUREMENT_ID = 'G-3YQYE48LYV';
const TITLE = 'The Land of Stone Flowers | Sveta Dorosheva';
const DESCRIPTION = 'Discover The Land of Stone Flowers, Sveta Dorosheva’s 216-page illustrated book. Most editions are out of print; explore the original project and shop official merchandise on So-called.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: 'The Land of Stone Flowers',
  keywords: [
    'The Land of Stone Flowers',
    'The Nenuphar Book',
    'Sveta Dorosheva',
    'illustrated book',
    'artist book',
    'fairy book',
    'Chronicle Books',
  ],
  authors: [{ name: 'Sveta Dorosheva', url: 'https://www.svetadorosheva.com/' }],
  creator: 'Sveta Dorosheva',
  publisher: 'Chronicle Books',
  category: 'books',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'book',
    url: '/',
    siteName: 'The Land of Stone Flowers',
    locale: 'en_US',
    authors: ['https://www.svetadorosheva.com/'],
    isbn: '9781452163703',
    images: [{
      url: '/archive/header-new.jpg',
      width: 1900,
      height: 1254,
      alt: 'The Land of Stone Flowers by Sveta Dorosheva',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/archive/header-new.jpg'],
  },
  icons: { icon: '/favicon.svg' },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: 'The Land of Stone Flowers',
      alternateName: 'The Nenuphar Book',
      description: DESCRIPTION,
      inLanguage: 'en',
      about: { '@id': `${SITE_URL}/#book` },
      copyrightHolder: { '@id': `${SITE_URL}/#sveta-dorosheva` },
    },
    {
      '@type': 'Book',
      '@id': `${SITE_URL}/#book`,
      url: `${SITE_URL}/#book`,
      name: 'The Land of Stone Flowers',
      alternateName: 'The Nenuphar Book',
      description: 'A genre-defying artist book about humans and their world, observed by gnomes, pixies, and other fairy creatures.',
      isbn: '9781452163703',
      numberOfPages: 216,
      bookFormat: 'https://schema.org/Hardcover',
      inLanguage: 'en',
      image: `${SITE_URL}/archive/english-cover.jpg`,
      author: { '@id': `${SITE_URL}/#sveta-dorosheva` },
      illustrator: { '@id': `${SITE_URL}/#sveta-dorosheva` },
      publisher: {
        '@type': 'Organization',
        name: 'Chronicle Books',
        url: 'https://www.chroniclebooks.com/',
      },
      sameAs: [
        'https://www.svetadorosheva.com/project/the-land-of-stone-flower',
        'https://www.goodreads.com/book/show/41968801-the-land-of-stone-flowers',
      ],
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#sveta-dorosheva`,
      name: 'Sveta Dorosheva',
      url: 'https://www.svetadorosheva.com/',
      image: `${SITE_URL}/archive/sveta-dorosheva-author.jpg`,
      jobTitle: 'Author and illustrator',
      description: 'Ukrainian-born, Israel-based author and illustrator creating intricate hand-drawn narrative art on paper.',
      sameAs: [
        'https://www.svetadorosheva.com/project/the-land-of-stone-flower',
        'https://so-called.me/collections/the-land-of-stone-flowers',
        'https://www.instagram.com/sveta_dorosheva_/',
        'https://www.behance.net/lattona',
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-readable site summary" />
      </head>
      <body>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
        />
        {children}
      </body>
    </html>
  );
}
