import type { UseQueryResult } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { LocationSearchResultItem } from "./LocationSearchResultItem";

interface LocationSearchResultListProps {
  query: string;
  result: UseQueryResult<string[], Error>;
  onSelect?: (locationName: string) => void;
  renderResultAction?: (locationName: string) => ReactNode;
}

export function LocationSearchResultList({
  query,
  result,
  onSelect,
  renderResultAction,
}: LocationSearchResultListProps) {
  if (query.length === 0) {
    return null;
  }

  if (result.isPending) {
    return (
      <section className="rounded-[2.25rem] bg-stone-100 p-6 shadow-sm">
        <p className="text-sm text-stone-500">검색 결과를 불러오는 중...</p>
      </section>
    );
  }

  if (result.isError) {
    return (
      <section className="rounded-[2.25rem] bg-rose-50 p-6 shadow-sm">
        <p className="text-sm font-medium text-rose-700">
          {result.error.message || "위치 검색에 실패했습니다."}
        </p>
      </section>
    );
  }

  if (result.data.length === 0) {
    return (
      <section className="rounded-[2.25rem] bg-stone-100 p-6 shadow-sm">
        <p className="text-sm text-stone-500">검색 결과가 없습니다.</p>
      </section>
    );
  }

  return (
    <ul className="space-y-3">
      {result.data.map((locationName) => (
        <LocationSearchResultItem
          key={locationName}
          locationName={locationName}
          onSelect={onSelect}
          renderAction={renderResultAction}
        />
      ))}
    </ul>
  );
}
