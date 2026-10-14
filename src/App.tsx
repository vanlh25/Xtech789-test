/**
 * @file App.tsx
 * @description Root component – điểm kết nối giữa Controller và View.
 *
 * App.tsx chỉ:
 *   1. Gọi Controller hook để lấy state và handlers
 *   2. Phân phối state/handlers xuống các View component qua props
 *   3. Không chứa logic tính toán hay JSX phức tạp
 */

import { useAppController } from './controller/useAppController';
import { ArticleModal } from './view/components/ArticleModal';
import { DrawerPanel } from './view/components/DrawerPanel';
import { Footer } from './view/layout/Footer';
import { Header } from './view/layout/Header';
import { Navigation } from './view/layout/Navigation';
import { DetailView } from './view/pages/DetailView';
import { HomeView } from './view/pages/HomeView';

export default function App() {
  // Lấy toàn bộ state và handlers từ Controller
  const ctrl = useAppController();

  return (
    <div>
      {/* Layout chung: Header + Navigation (dùng cho cả Home và Detail) */}
      <Header
        query={ctrl.query}
        cartCount={ctrl.cart.length}
        wishlistCount={ctrl.wishlist.length}
        cartTotal={ctrl.cartTotal}
        cartBump={ctrl.cartBump}
        onQueryChange={ctrl.setQuery}
        onSearch={ctrl.handleSearch}
        onGoHome={ctrl.goHome}
        onOpenWishlist={() => ctrl.setPanel('wishlist')}
        onOpenCart={() => ctrl.setPanel('cart')}
        onOpenArticle={ctrl.openArticle}
      />

      <Navigation
        isDetail={ctrl.isDetail}
        onGoHome={ctrl.goHome}
        onShop={ctrl.shop}
        onSection={ctrl.homeSection}
        onOpenArticle={ctrl.openArticle}
      />

      {/* Router: Detail vs Home */}
      {ctrl.isDetail ? (
        <DetailView
          resultQuery={ctrl.resultQuery}
          copied={ctrl.copied}
          onGoHome={ctrl.goHome}
          onCopy={ctrl.handleCopy}
        />
      ) : (
        <HomeView
          filteredProducts={ctrl.filteredProducts}
          wishlist={ctrl.wishlist}
          category={ctrl.category}
          search={ctrl.search}
          tab={ctrl.tab}
          slide={ctrl.slide}
          showAll={ctrl.showAll}
          subscribed={ctrl.subscribed}
          onShop={ctrl.shop}
          onAddToCart={ctrl.handleAddToCart}
          onToggleWish={ctrl.handleToggleWish}
          onSetTab={ctrl.setTab}
          onSetSlide={ctrl.setSlide}
          onToggleShowAll={ctrl.toggleShowAll}
          onClearFilter={ctrl.clearFilter}
          onOpenArticle={ctrl.openArticle}
          onSubscribe={ctrl.handleSubscribe}
          onSection={ctrl.homeSection}
        />
      )}

      {/* Layout chung: Footer*/}
      <Footer
        onGoHome={ctrl.goHome}
        onShop={ctrl.shop}
        onOpenArticle={ctrl.openArticle}
        onOpenPrivacy={() => ctrl.openArticle('Privacy Policy')}
        onOpenTerms={() => ctrl.openArticle('Terms of Service')}
      />

      {/* Toast Notification */}
      {ctrl.notice && (
        <div className="toast" role="status">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M5 7h14l1 14H4L5 7Z" /><path d="M8 8V6a4 4 0 0 1 8 0v2" />
          </svg>
          {ctrl.notice}
          <button onClick={() => { ctrl.setPanel('cart'); ctrl.clearNotice(); }}>
            View bag →
          </button>
        </div>
      )}

      {/* Drawer Panel: Giỏ hàng / Wishlist */}
      <DrawerPanel
        panel={ctrl.panel}
        cart={ctrl.cart}
        wishlist={ctrl.wishlist}
        uniqueCartIds={ctrl.uniqueCartIds}
        cartTotal={ctrl.cartTotal}
        onClose={() => ctrl.setPanel(null)}
        onDecreaseCart={ctrl.handleDecreaseCart}
        onIncreaseCart={ctrl.handleAddToCart}
        onRemoveFromCart={ctrl.handleRemoveFromCart}
        onMoveToCart={(id) => { ctrl.handleAddToCart(id, ''); ctrl.setPanel('cart'); }}
        onRemoveWish={ctrl.handleToggleWish}
        onShop={ctrl.shop}
        onCheckout={() => { ctrl.setPanel(null); ctrl.openArticle('Your order preview'); }}
        getCartQty={ctrl.getCartQty}
      />

      {/* Article Modal */}
      <ArticleModal
        article={ctrl.article}
        cartCount={ctrl.cart.length}
        cartTotal={ctrl.cartTotal}
        onClose={ctrl.closeArticle}
        onShop={ctrl.shop}
      />
    </div>
  );
}
