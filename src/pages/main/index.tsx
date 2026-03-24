import { CurrentLocationWeatherSection } from "./ui/CurrentLocationWeatherSection";
import { FavoriteLocationCardsSection } from "./ui/FavoriteLocationCardsSection";
import { SearchLocationSection } from "./ui/SearchLocationSection";

export function MainPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">날씨앱 메인 화면</h1>
      <div className="mt-8 space-y-10">
        <CurrentLocationWeatherSection />
        <SearchLocationSection />
        <FavoriteLocationCardsSection />
      </div>
    </main>
  );
}
