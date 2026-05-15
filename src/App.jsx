import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import HomePage        from "./pages/HomePage";
import MenuPage        from "./pages/MenuPage";
import GameSelectPage  from "./pages/GameSelectPage";
import DotsBoxesPage from "./pages/DotsBoxesPage";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"           element={<HomePage />}       />
          <Route path="/menu"       element={<MenuPage />}       />
          <Route path="/games"      element={<GameSelectPage />} />
          <Route path="/dots-boxes" element={<DotsBoxesPage />}  />
          <Route path="*"           element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
