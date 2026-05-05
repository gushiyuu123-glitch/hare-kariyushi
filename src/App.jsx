import { useMemo, useState, useCallback } from "react";

import Hero from "./sections/Hero";
import Collection from "./sections/Collection";

import ProductsSection from "./sections/ProductsSection";
import Concept from "./sections/Concept";
import Products from "./sections/Products";
import Voices from "./sections/Voices";

import GuideSection from "./sections/GuideSection";
import Guide from "./sections/Guide";

import Stockists from "./sections/Stockists";
import Inquiry from "./sections/Inquiry";
import Footer from "./sections/Footer";

import SectionRail from "./components/SectionRail";
import RightMenu from "./components/RightMenu";
import CartWidget from "./components/CartWidget";

export default function App() {
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

  return (
    <>
      {/* UIレイヤー：mainの外に隔離 */}
      <SectionRail />
      <RightMenu forceHidden={cartOpen} />

      <CartWidget
        cart={cart}
        open={cartOpen}
        count={cartCount}
        total={cartTotal}
        onToggle={() => setCartOpen((value) => !value)}
        onClose={() => setCartOpen(false)}
        onIncrease={increaseItem}
        onDecrease={decreaseItem}
        onRemove={removeItem}
        onClear={clearCart}
      />

      <main id="main" aria-label="HARE KARIYUSHI">
        <Hero />

        <Collection />

        <ProductsSection>
          <Concept />
          <Products onAddToCart={addToCart} />
          <Voices />
        </ProductsSection>

        <GuideSection>
          <Guide />
        </GuideSection>

        <Stockists />

        <Inquiry />

        <Footer />
      </main>
    </>
  );
}