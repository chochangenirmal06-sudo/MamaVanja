import { Hero } from '@/components/Hero';
import { TrustBar } from '@/components/TrustBar';
import { ProblemSolution } from '@/components/ProblemSolution';
import { Founder } from '@/components/Founder';
import { Faq } from '@/components/Faq';
import { HashScrollHandler } from '@/components/HashScrollHandler';

export default function Home() {
  return (
    <main>
      <HashScrollHandler />
      <Hero />
      <TrustBar />
      <ProblemSolution />
      <Founder />
      <Faq />
    </main>
  );
}
