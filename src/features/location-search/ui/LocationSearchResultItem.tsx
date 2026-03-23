import type { ReactNode } from "react";

interface LocationSearchResultItemProps {
  locationName: string;
  onSelect?: (locationName: string) => void;
  renderAction?: (locationName: string) => ReactNode;
}

export function LocationSearchResultItem({
  locationName,
  onSelect,
  renderAction,
}: LocationSearchResultItemProps) {
  return (
    <li className="rounded-4xl bg-stone-100 p-3 shadow-sm">
      <div className="flex flex-col gap-3 rounded-3xl bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="break-keep text-base font-semibold text-stone-950">
            {locationName}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {renderAction?.(locationName)}
          {onSelect ? (
            <button
              type="button"
              onClick={() => onSelect(locationName)}
              className="rounded-full bg-stone-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-800"
            >
              상세 보기
            </button>
          ) : null}
        </div>
      </div>
    </li>
  );
}
