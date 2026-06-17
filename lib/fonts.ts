import { EB_Garamond, Jost, JetBrains_Mono } from 'next/font/google';

// Stand-in for itcGaramondStd — swap for the licensed font file via next/font/local once purchased
export const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-display',
  display: 'swap',
});

// Stand-in for Fellix — swap for the licensed font file via next/font/local once purchased
export const jost = Jost({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-sans',
  display: 'swap',
});

// JetBrains Mono — free, used for nav links, buttons, labels, and secondary headings
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});
