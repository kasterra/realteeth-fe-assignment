import { queryClient } from "@/shared/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Router } from "./Router";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}
