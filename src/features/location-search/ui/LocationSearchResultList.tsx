import type { ReactNode } from "react";
import type {
  LocationSearchPaginationState,
  LocationSearchQueryState,
  LocationSearchResultState,
} from "../model/types";
import { LocationSearchResultItem } from "./LocationSearchResultItem";

interface LocationSearchResultListProps {
  query: string;
  searchQuery: LocationSearchQueryState;
  searchResult: LocationSearchResultState;
  pagination: LocationSearchPaginationState;
  onSelect?: (locationName: string) => void;
  renderResultAction?: (locationName: string) => ReactNode;
}

export function LocationSearchResultList({
  query,
  searchQuery,
  searchResult,
  pagination,
  onSelect,
  renderResultAction,
}: LocationSearchResultListProps) {
  if (query.length === 0) {
    return null;
  }

  if (searchQuery.isPending) {
    return (
      <section className="rounded-[2.25rem] bg-stone-100 p-6 shadow-sm">
        <p className="text-sm text-stone-500">검색 결과를 불러오는 중...</p>
      </section>
    );
  }

  if (searchQuery.isError) {
    return (
      <section className="rounded-[2.25rem] bg-rose-50 p-6 shadow-sm">
        <p className="text-sm font-medium text-rose-700">
          {searchQuery.error?.message || "위치 검색에 실패했습니다."}
        </p>
      </section>
    );
  }

  if (searchResult.items.length === 0) {
    return (
      <section className="rounded-[2.25rem] bg-stone-100 p-6 shadow-sm">
        <p className="text-sm text-stone-500">검색 결과가 없습니다.</p>
      </section>
    );
  }

  return (
    <div className="space-y-4">
      <p className="px-1 text-sm text-stone-500">
        총 {searchResult.totalCount}건 중 {pagination.currentPage} / {pagination.totalPages}페이지
      </p>
      <ul className="space-y-3">
        {searchResult.items.map((locationName) => (
          <LocationSearchResultItem
            key={locationName}
            locationName={locationName}
            onSelect={onSelect}
            renderAction={renderResultAction}
          />
        ))}
      </ul>
      {pagination.totalPages > 1 ? (
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={pagination.goToPreviousPage}
            disabled={!pagination.hasPreviousPage}
            className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition enabled:hover:border-stone-950 enabled:hover:text-stone-950 disabled:cursor-not-allowed disabled:opacity-50"
          >
            이전
          </button>
          <button
            type="button"
            onClick={pagination.goToNextPage}
            disabled={!pagination.hasNextPage}
            className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition enabled:hover:border-stone-950 enabled:hover:text-stone-950 disabled:cursor-not-allowed disabled:opacity-50"
          >
            다음
          </button>
        </div>
      ) : null}
    </div>
  );
}
