/**
 * @file Header.tsx
 * @layer View – Layout Component
 * @description Header chính của trang: logo, ô tìm kiếm, wishlist và giỏ hàng.
 * Được dùng chung cho cả HomeView và DetailView để giữ số đếm giỏ hàng đồng bộ.
 *
 * Props nhận từ Controller, không có logic nội tại.
 */

import { Icon } from '../shared/Icon';

interface HeaderProps {
  /** Từ khóa đang nhập trong ô tìm kiếm */
  query: string;
  /** Số lượng sản phẩm trong giỏ hàng */
  cartCount: number;
  /** Số lượng sản phẩm trong wishlist */
  wishlistCount: number;
  /** Tổng tiền giỏ hàng (dạng string đã format) */
  cartTotal: string;
  /** Badge đang chạy animation không */
  cartBump: boolean;
  /** Callback khi thay đổi nội dung ô search */
  onQueryChange: (q: string) => void;
  /** Callback khi submit form tìm kiếm */
  onSearch: (q: string) => void;
  /** Callback khi click logo/Home */
  onGoHome: () => void;
  /** Callback khi click wishlist */
  onOpenWishlist: () => void;
  /** Callback khi click giỏ hàng */
  onOpenCart: () => void;
  /** Callback khi click FAQs/SizeGuide/Support */
  onOpenArticle: (title: string) => void;
}

/**
 * Header component – thanh điều hướng trên cùng của ứng dụng.
 */
export function Header({
  query,
  cartCount,
  wishlistCount,
  cartTotal,
  cartBump,
  onQueryChange,
  onSearch,
  onGoHome,
  onOpenWishlist,
  onOpenCart,
  onOpenArticle,
}: HeaderProps) {
  return (
    <>
      {/* Topbar */}
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="utility">
            {['FAQs', 'Size Guide', 'Support'].map((t) => (
              <button key={t} onClick={() => onOpenArticle(t)}>
                {t}
              </button>
            ))}
          </div>
          <span className="top-message">Considered style. Everyday elegance.</span>
          <div className="social">
            <button aria-label="Instagram" onClick={() => onOpenArticle('The Aura community')}>
              <Icon name="instagram" size={14} />
            </button>
            <span>p</span>
            <span>f</span>
            <span className="social-divider" />
            <span>United States · USD $</span>
          </div>
        </div>
      </div>

      {/* Header chính */}
      <header className="container main-header">
        {/* Logo */}
        <a
          href="?view=home"
          className="logo"
          onClick={(e) => {
            e.preventDefault();
            onGoHome();
          }}
        >
          AURA MODE<span>THE ART OF EVERYDAY</span>
        </a>

        {/* Form tìm kiếm */}
        <form
          className="search"
          onSubmit={(e) => {
            e.preventDefault();
            onSearch(query);
          }}
        >
          <input
            aria-label="Search products"
            placeholder="Search fashion, dresses, shirts..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
          <button type="submit" aria-label="Search">
            <Icon name="search" />
          </button>
        </form>

        {/* Actions: Wishlist + Cart */}
        <div className="header-actions">
          {/* Wishlist */}
          <button onClick={onOpenWishlist} className="header-action">
            <span className="icon-badge">
              <Icon name="heart" size={23} />
              <b>{wishlistCount}</b>
            </span>
            <span>Wishlist</span>
          </button>

          <div className="header-separator" />

          {/* Cart – badge có animation bump khi thêm sản phẩm */}
          <button onClick={onOpenCart} className="header-action">
            <span className="icon-badge cart-badge">
              <Icon name="bag" size={23} />
              <b className={cartBump ? 'badge-bump' : ''}>{cartCount}</b>
            </span>
            <span>
              Shopping bag
              <strong>${cartTotal}</strong>
            </span>
          </button>
        </div>
      </header>
    </>
  );
}
