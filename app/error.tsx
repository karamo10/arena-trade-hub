'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex items-center justify-center flex-col min-h-screen">
      <h2 className="text-center text-lg font-medium">
        Whoops! Something went wrong.
      </h2>
      <p className="text-center text-sm">{error.message}</p>
      <button
        className="bg-blue-950 text-white text-xs px-2 md:text-sm font-medium md:px-4 py-1 rounded active:bg-blue-950/90 cursor-pointer mt-1"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </main>
  );
}
