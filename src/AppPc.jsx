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

export default function AppPc({
  cart,
  cartOpen,
  cartCount,
  cartTotal,
  onAddToCart,
  onToggleCart,
  onCloseCart,
  onIncrease,
  onDecrease,
  onRemove,
  onClear,
}) {
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
        onToggle={onToggleCart}
        onClose={onCloseCart}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
        onRemove={onRemove}
        onClear={onClear}
      />

      <main id="main" aria-label="HARE KARIYUSHI">
        <Hero />
        <Collection />

        <ProductsSection>
          <Concept />
          <Products onAddToCart={onAddToCart} />
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