import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-8 dark:bg-black">
      <div className="max-w-2xl text-center">
        <h1 className="mb-6 text-4xl font-bold text-zinc-900 dark:text-zinc-50">
          About Us
        </h1>
        <p className="mb-8 text-lg text-zinc-600 dark:text-zinc-300">
          This page is statically generated (SSG) at build time. It serves as a
          demonstration of Next.js static site generation capabilities.
        </p>
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-4 text-xl font-semibold text-zinc-800 dark:text-zinc-100">
                Why SSG?
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
                Static Site Generation is perfect for pages where the content doesn&apos;t change often,
                like this About page, documentation, or blog posts. It offers the best performance
                because the HTML is pre-built.
            </p>
        </div>
        <div className="mt-8">
            <Link
            href="/"
            className="rounded-lg bg-black px-6 py-3 font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
            Back to Home
            </Link>
        </div>
      </div>
    </div>
  );
}
 
 
