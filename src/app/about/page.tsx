import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-8 dark:bg-black">
      <div className="max-w-2xl text-center">
        <h1 className="mb-6 text-4xl font-bold text-zinc-900 dark:text-zinc-50">
          About 
        </h1>
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
 
 
