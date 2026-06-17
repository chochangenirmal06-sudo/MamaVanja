import Link from 'next/link';

export function BackHomeLink() {
  return (
    <div className="px-4 sm:px-10 pt-8">
      <Link
        href="/"
        className="font-sans text-brand-dark-green inline-block no-underline opacity-[0.55] hover:opacity-75 transition-opacity duration-150"
        style={{ fontSize: '0.875rem' }}
      >
        ← Back to Home
      </Link>
    </div>
  );
}
