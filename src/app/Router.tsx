import { BrowserRouter, Route, Routes } from "react-router";
import { FavoriteDetailPage, MainPage, NotFoundPage } from "@/pages";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/favorite-detail/:favoriteId"
          element={<FavoriteDetailPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
