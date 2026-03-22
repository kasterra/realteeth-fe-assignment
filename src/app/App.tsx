import { UnexpectedErrorPage } from "@/pages";
import { queryClient } from "@/shared/queryClient";
import { ErrorBoundary } from "@suspensive/react";
import {
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { Router } from "./Router";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            fallback={({ reset: resetBoundary }) => (
              <UnexpectedErrorPage reset={resetBoundary} />
            )}
            onReset={reset}
          >
            <Router />
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </QueryClientProvider>
  );
}
