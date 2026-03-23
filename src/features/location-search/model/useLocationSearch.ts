import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { locationSearchQueries } from "../api/query";
import type { LocationSearchFormValues } from "./types";

export function useLocationSearch() {
  const form = useForm<LocationSearchFormValues>({
    defaultValues: {
      query: "",
    },
  });
  const [submittedQuery, setSubmittedQuery] = useState("");
  const searchQuery = useQuery({
    ...locationSearchQueries.search(submittedQuery),
    enabled: submittedQuery.trim().length > 0,
  });

  const onSubmit = form.handleSubmit(({ query }) => {
    setSubmittedQuery(query.trim());
  });

  const reset = () => {
    setSubmittedQuery("");
    form.resetField("query");
  };

  return {
    form,
    submittedQuery,
    searchQuery,
    onSubmit,
    reset,
  };
}
