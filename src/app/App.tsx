import { queryClient } from "@/shared/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </QueryClientProvider>
  );
}
