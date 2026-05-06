import HeroSp from "./sections-sp/HeroSp";
import CollectionSp from "./sections-sp/CollectionSp";
import ProductsSectionSp from "./sections-sp/ProductsSectionSp";
import ConceptSp from "./sections-sp/ConceptSp";
import ProductsSp from "./sections-sp/ProductsSp";
import VoicesSp from "./sections-sp/VoicesSp";
import GuideSectionSp from "./sections-sp/GuideSectionSp";
import GuideSp from "./sections-sp/GuideSp";
import StockistsSp from "./sections-sp/StockistsSp";
import InquirySp from "./sections-sp/InquirySp";
import FooterSp from "./sections-sp/FooterSp";

import SectionRailSp from "./components/SectionRailSp";
import RightMenuSp from "./components/RightMenuSp";
import CartWidget from "./components/CartWidget";

export default function AppSp({
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
      {/* UIレイヤー：mainの外に隔離（SP） */}
      <SectionRailSp forceHidden={cartOpen} />
      <RightMenuSp forceHidden={cartOpen} />

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

      <main id="main" aria-label="HARE KARIYUSHI (SP)">
        {/* NOTE: RightMenuSpのリンク先idが各セクションに存在すること（collection / catalog / guide / stockists / inquiry / footer） */}
        <HeroSp />
        <CollectionSp />

        <ProductsSectionSp>
          <ConceptSp />
          <ProductsSp onAddToCart={onAddToCart} />
          <VoicesSp />
        </ProductsSectionSp>

        <GuideSectionSp>
          <GuideSp />
        </GuideSectionSp>

        <StockistsSp />
        <InquirySp />
        <FooterSp />
      </main>
    </>
  );
}