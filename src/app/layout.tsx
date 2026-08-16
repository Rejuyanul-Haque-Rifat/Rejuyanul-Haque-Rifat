import { ReactNode } from 'react';
import './globals.css';
import Script from 'next/script';

export const viewport = {
  themeColor: '#020617',
};

export const metadata = {
  title: 'Rejuyanul Haque Rifat | Full-Stack Developer & IoT Innovator',
  description: 'Portfolio of Rejuyanul Haque Rifat, a Full-Stack Developer and IoT Innovator based in Bogura, Bangladesh, specializing in Embedded Systems, PWA, and Smart Automation.',
  keywords: 'Rejuyanul Haque Rifat, Web Developer Bogura, Full-Stack Developer Bangladesh, IoT Innovator, Embedded Systems, Robotics, PWA, Portfolio',
  authors: [{ name: 'Rejuyanul Haque Rifat' }],
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://www.rejuyanul-haque-rifat.bro.bd/',
  },
  openGraph: {
    title: 'Rejuyanul Haque Rifat | Full-Stack Developer & IoT Innovator',
    description: 'Portfolio of Rejuyanul Haque Rifat, a Full-Stack Developer and IoT Innovator based in Bogura, Bangladesh, specializing in Embedded Systems, PWA, and Smart Automation.',
    url: 'https://www.rejuyanul-haque-rifat.bro.bd/',
    siteName: 'Rejuyanul Haque Rifat Portfolio',
    images: [
      {
        url: 'https://i.ibb.co.com/Q7mHDNC6/IMG-20260427-163628.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'bn_BD',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rejuyanul Haque Rifat | Full-Stack Developer & IoT Innovator',
    description: 'Portfolio of Rejuyanul Haque Rifat, a Full-Stack Developer and IoT Innovator based in Bogura, Bangladesh, specializing in Embedded Systems, PWA, and Smart Automation.',
    images: ['https://i.ibb.co.com/Q7mHDNC6/IMG-20260427-163628.jpg'],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="bn" dir="ltr" className="dark scroll-smooth">
      <head>
        <meta name="google-site-verification" content="ISyCx1WlVgg780N2ixKIof2gfRdD5zyUWHZjkxeG7eM" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Rejuyanul Haque Rifat",
              "url": "https://www.rejuyanul-haque-rifat.bro.bd/",
              "image": "https://i.ibb.co.com/Q7mHDNC6/IMG-20260427-163628.jpg",
              "jobTitle": "Full-Stack Developer & IoT Innovator",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Bogura",
                "addressCountry": "Bangladesh"
              },
              "alumniOf": "Bogura Polytechnic Institute",
              "sameAs": [
                "https://github.com/rejuyanul-haque-rifat",
                "https://facebook.com/rejuyanul.haque.rifat.r"
              ]
            })
          }}
        />
      </head>
      <body className="bg-slate-50 dark:bg-[#00020a] text-slate-900 dark:text-slate-100 antialiased selection:bg-neon selection:text-white dark:selection:text-black font-sans overflow-x-hidden transition-colors duration-500">
        {children}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" strategy="beforeInteractive" />
        <Script src="https://unpkg.com/typed.js@2.0.16/dist/typed.umd.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
