import type { Metadata } from 'next';
import { ebGaramond, jost, jetbrainsMono } from '@/lib/fonts';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'MamaVanja: SEO & Digital Marketing Agency',
  description:
    'We help local businesses generate predictable inbound leads through SEO ' +
    'without relying on expensive ads, cold outreach, or referrals.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${ebGaramond.variable} ${jost.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
