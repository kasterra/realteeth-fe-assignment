interface UnexpectedErrorPageProps {
  reset: () => void;
}

export function UnexpectedErrorPage({ reset }: UnexpectedErrorPageProps) {
  return (
    <main className="min-h-screen bg-stone-50 px-6 py-16 text-stone-900">
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-3xl flex-col justify-center">
        <div className="inline-flex w-fit rounded-full border border-rose-200 bg-white px-3 py-1 text-sm text-rose-500 shadow-sm">
          Unexpected error
        </div>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight text-stone-950 sm:text-7xl">
          Something broke.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-stone-600 sm:text-lg">
          An unexpected error occurred while rendering the page. You can try the
          request again without leaving the app.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-stone-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-stone-800"
          >
            Try again
          </button>
          <button
            type="button"
            onClick={() => window.location.assign("/")}
            className="rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-stone-700 transition hover:border-stone-400 hover:bg-stone-100"
          >
            Go home
          </button>
        </div>
      </div>
    </main>
  );
}
