import { useMemo, useState, useCallback, useEffect } from "react";
import AppPc from "./AppPc";
import AppSp from "./AppSp";

const SP_MAX = 899; // ここが境界（好みで900/960/1023に変えてOK）

function useIsSp() {
  const [isSp, setIsSp] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(`(max-width:${SP_MAX}px)`).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(`(max-width:${SP_MAX}px)`);
    const onChange = (e) => setIsSp(e.matches);

    // 初期同期（端末回転や復帰でも安定）
    setIsSp(mq.matches);

    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  return isSp;
}

export default function App() {
  const isSp = useIsSp();

  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.priceValue * item.qty, 0),
    [cart]
  );

  const addToCart = useCallback((product) => {
    setCart((current) => {
      const exists = current.find((item) => item.no === product.no);
      if (exists) {
        return current.map((item) =>
          item.no === product.no ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...current, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  }, []);

  const increaseItem = useCallback((no) => {
    setCart((current) =>
      current.map((item) =>
        item.no === no ? { ...item, qty: item.qty + 1 } : item
      )
    );
  }, []);

  const decreaseItem = useCallback((no) => {
    setCart((current) =>
      current
        .map((item) =>
          item.no === no ? { ...item, qty: Math.max(0, item.qty - 1) } : item
        )
        .filter((item) => item.qty > 0)
    );
  }, []);

  const removeItem = useCallback((no) => {
    setCart((current) => current.filter((item) => item.no !== no));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    setCartOpen(false);
  }, []);

  const toggleCart = useCallback(() => {
    setCartOpen((v) => !v);
  }, []);

  const closeCart = useCallback(() => {
    setCartOpen(false);
  }, []);

  const shared = {
    cart,
    cartOpen,
    cartCount,
    cartTotal,
    onAddToCart: addToCart,
    onToggleCart: toggleCart,
    onCloseCart: closeCart,
    onIncrease: increaseItem,
    onDecrease: decreaseItem,
    onRemove: removeItem,
    onClear: clearCart,
  };

  // DOM分離：どっちか片方だけ描画（干渉ゼロ）
  return isSp ? <AppSp {...shared} /> : <AppPc {...shared} />;
}