import { Link, useNavigate } from "react-router";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-16 text-stone-900">
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-3xl flex-col justify-center">
        <div className="inline-flex w-fit rounded-full border border-stone-200 bg-white px-3 py-1 text-sm text-stone-500 shadow-sm">
          Error 404
        </div>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight text-stone-950 sm:text-7xl">
          Page not found.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-stone-600 sm:text-lg">
          The address is invalid, or the page has already been moved. Go back to
          the main page and continue from a known route.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/"
            className="rounded-full bg-stone-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-stone-800"
          >
            Back to home
          </Link>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-stone-700 transition hover:border-stone-400 hover:bg-stone-100"
          >
            Go back
          </button>
        </div>
      </div>
    </main>
  );
}
