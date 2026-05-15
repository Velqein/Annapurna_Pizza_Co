import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(2);
  const [toast, setToast]         = useState(false);

  function addToCart() {
    setCartCount(n => n + 1);
    setToast(true);
    setTimeout(() => setToast(false), 1800);
  }

  return (
    <CartContext.Provider value={{ cartCount, toast, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
