import { useForm } from "react-hook-form";
import { useFavoriteLocationStore } from "../model/store";

interface FavoriteLocationAliasFormProps {
  id: string;
  alias: string;
  onSubmitted?: () => void;
}

interface FavoriteLocationAliasFormValues {
  alias: string;
}

export function FavoriteLocationAliasForm({
  id,
  alias,
  onSubmitted,
}: FavoriteLocationAliasFormProps) {
  const renameFavorite = useFavoriteLocationStore((state) => state.renameFavorite);
  const { register, handleSubmit } = useForm<FavoriteLocationAliasFormValues>({
    defaultValues: {
      alias,
    },
  });

  const onSubmit = handleSubmit((values) => {
    renameFavorite(id, values.alias);
    onSubmitted?.();
  });

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2">
      <input
        {...register("alias")}
        className="min-w-0 flex-1 rounded-full border border-stone-300 bg-white px-3 py-1.5 text-sm text-stone-900 outline-none transition focus:border-stone-950"
        placeholder="별칭 입력"
      />
      <button
        type="submit"
        className="rounded-full bg-stone-950 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-stone-800"
      >
        저장
      </button>
    </form>
  );
}
