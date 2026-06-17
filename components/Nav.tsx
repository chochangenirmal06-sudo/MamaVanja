import Image from 'next/image';
import Link from 'next/link';

export function Nav() {
  return (
    <nav
      className="sticky top-0 z-50 flex flex-col items-start gap-[10px] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:px-10 bg-white border-b border-gray-200"
      aria-label="Main navigation"
    >
      <Link href="/" aria-label="MamaVanja homepage">
        <Image
          src="/brand_assets/logo.png"
          alt="MamaVanja SEO & Digital Marketing Agency"
          width={1890}
          height={618}
          className="h-16 sm:h-[88px] w-auto"
          priority
        />
      </Link>
      <div className="w-full flex flex-col gap-[10px] sm:w-auto sm:flex-row sm:items-center sm:gap-3">
        <Link
          href="/book-a-call"
          className="btn btn--outline w-full justify-center text-[0.9375rem] py-[12px] sm:w-auto sm:text-[0.8rem] sm:py-[0.65rem]"
        >
          Book A Free Consultation
        </Link>
        <Link
          href="/free-audit"
          className="btn btn--primary w-full justify-center text-[0.9375rem] py-[12px] sm:w-auto sm:text-[0.8rem] sm:py-[0.65rem]"
        >
          Get My Free SEO Audit
        </Link>
      </div>
    </nav>
  );
}
