import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { locationSearchQueries } from "../api/query";
import type { LocationSearchFormValues } from "./types";

const PAGE_SIZE = 10;

export function useLocationSearch() {
  const form = useForm<LocationSearchFormValues>({
    defaultValues: {
      query: "",
    },
  });
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const searchQuery = useQuery({
    ...locationSearchQueries.search(submittedQuery),
    enabled: submittedQuery.trim().length > 0,
  });
  const filteredResults = searchQuery.data ?? [];
  const totalPages = Math.ceil(filteredResults.length / PAGE_SIZE);
  const currentVisiblePage =
    totalPages === 0 ? 1 : Math.min(currentPage, totalPages);
  const paginatedResults = filteredResults.slice(
    (currentVisiblePage - 1) * PAGE_SIZE,
    currentVisiblePage * PAGE_SIZE,
  );

  const onSubmit = form.handleSubmit(({ query }) => {
    setSubmittedQuery(query.trim());
    setCurrentPage(1);
  });

  const reset = () => {
    setSubmittedQuery("");
    setCurrentPage(1);
    form.resetField("query");
  };

  return {
    form,
    submittedQuery,
    searchQuery: {
      isPending: searchQuery.isPending,
      isError: searchQuery.isError,
      error: searchQuery.error,
    },
    searchResult: {
      items: paginatedResults,
      totalCount: filteredResults.length,
    },
    pagination: {
      currentPage: currentVisiblePage,
      totalPages,
      hasPreviousPage: currentVisiblePage > 1,
      hasNextPage: currentVisiblePage < totalPages,
      goToPreviousPage: () => setCurrentPage((page) => Math.max(1, page - 1)),
      goToNextPage: () =>
        setCurrentPage((page) => Math.min(totalPages, page + 1)),
    },
    onSubmit,
    reset,
  };
}
