import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'Google Cloud ACE Study Guide — Interactive Exam Prep',
  description: 'Interactive study guide and exam prep web application for the Google Cloud Associate Cloud Engineer (ACE) certification. Featuring gcloud syntax quiz, decision trees, and exam traps.',
  keywords: ['Google Cloud', 'GCP', 'Associate Cloud Engineer', 'ACE Certification', 'gcloud', 'Compute Engine', 'GKE', 'Cloud Run', 'IAM'],
  authors: [
    { name: 'Lenin Meza', url: 'https://merolhack.github.io/' },
    { name: 'MACH Playbook', url: 'https://mach-playbook.github.io/' },
  ],
  metadataBase: new URL('https://mach-playbook.github.io/gcp-ace-interactive-study-guide/'),
  alternates: {
    canonical: 'https://mach-playbook.github.io/gcp-ace-interactive-study-guide/',
  },
  verification: {
    google: 'google7d4ec8c5344a17de',
    other: {
      'msvalidate.01': ['856757614FFC2C5582FBCB81B1B4E4CA'],
    },
  },
  openGraph: {
    title: 'Google Cloud ACE Interactive Study Guide',
    description: 'Master the Google Cloud Associate Cloud Engineer (ACE) certification with scenario-based decision trees, CLI grammar training, and readiness tracking.',
    url: 'https://mach-playbook.github.io/gcp-ace-interactive-study-guide/',
    siteName: 'MACH Playbook',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Cloud ACE Interactive Study Guide',
    description: 'Interactive study guide and exam prep for Google Cloud Associate Cloud Engineer (ACE).',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <meta name="google-site-verification" content="google7d4ec8c5344a17de" />
        <meta name="msvalidate.01" content="856757614FFC2C5582FBCB81B1B4E4CA" />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-blue-500 selection:text-white">
        {/* Google Analytics 4 (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9GESMZMDPB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9GESMZMDPB', {
              anonymize_ip: true,
              page_path: window.location.pathname,
            });
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}

