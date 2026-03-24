import type { ReactNode } from "react";

export interface LocationSearchFormValues {
  query: string;
}

export interface LocationSearchResultState {
  items: string[];
  totalCount: number;
}

export interface LocationSearchPaginationState {
  currentPage: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
}

export interface LocationSearchQueryState {
  isPending: boolean;
  isError: boolean;
  error: Error | null;
}

export interface LocationSearchFeatureProps {
  onSelect?: (locationName: string) => void;
  renderResultAction?: (locationName: string) => ReactNode;
}
