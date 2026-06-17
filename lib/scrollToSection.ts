'use client';
import { usePathname, useRouter } from 'next/navigation';

export function useScrollToSection(sectionId: string) {
  const pathname = usePathname();
  const router   = useRouter();

  return function () {
    if (pathname === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/#${sectionId}`);
    }
  };
}
