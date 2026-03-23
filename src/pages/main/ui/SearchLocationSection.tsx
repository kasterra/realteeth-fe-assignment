import {
  LocationSearchForm,
  LocationSearchResultList,
  useLocationSearch,
} from "@/features/location-search";
import { SearchLocationResultAction } from "./SearchLocationResultAction";

export function SearchLocationSection() {
  const { form, submittedQuery, searchQuery, onSubmit, reset } =
    useLocationSearch();

  return (
    <section className="space-y-4">
      <div className="space-y-1 px-1">
        <h2 className="text-xl font-semibold tracking-tight text-stone-950">
          위치 검색
        </h2>
        <p className="text-sm text-stone-500">
          원하는 지역을 검색하고 즐겨찾기에 추가할 수 있습니다.
        </p>
      </div>

      <LocationSearchForm
        register={form.register}
        onReset={reset}
        onSubmit={onSubmit}
      />
      <LocationSearchResultList
        query={submittedQuery}
        result={searchQuery}
        renderResultAction={(locationName) => (
          <SearchLocationResultAction locationName={locationName} />
        )}
      />
    </section>
  );
}
