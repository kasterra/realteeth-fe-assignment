import type { UseFormRegister } from "react-hook-form";
import type { LocationSearchFormValues } from "../model/types";

interface LocationSearchFormProps {
  register: UseFormRegister<LocationSearchFormValues>;
  onReset: () => void;
  onSubmit: () => void;
}

export function LocationSearchForm({
  register,
  onReset,
  onSubmit,
}: LocationSearchFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-3 rounded-[2.25rem] bg-stone-100 p-4 shadow-sm sm:flex-row"
    >
      <input
        {...register("query", { required: true })}
        placeholder="지역명을 입력하세요 (대한민국 한정)"
        className="h-12 flex-1 rounded-full bg-white px-5 text-sm text-stone-900 outline-none ring-1 ring-transparent transition placeholder:text-stone-400 focus:ring-stone-300"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="h-12 rounded-full bg-stone-950 px-5 text-sm font-medium text-white transition hover:bg-stone-800"
        >
          검색
        </button>
        <button
          type="button"
          onClick={onReset}
          className="h-12 rounded-full border border-stone-300 bg-white px-5 text-sm font-medium text-stone-700 transition hover:border-stone-950 hover:text-stone-950"
        >
          초기화
        </button>
      </div>
    </form>
  );
}
