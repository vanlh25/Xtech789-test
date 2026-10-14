/**
 * @file ProductCard.tsx
 * @layer View – Presentational Component
 * @description Thẻ sản phẩm đơn lẻ. Nhận dữ liệu qua props, phát sự kiện lên Controller.
 *
 * Fallback ảnh: nếu file ảnh nội bộ không tìm thấy (lỗi 404), dùng gradient CSS.
 */

import { useState } from 'react';
import type { Product } from '../../model/types';
import { Icon } from '../shared/Icon';

interface ProductCardProps {
  /** Dữ liệu sản phẩm */
  product: Product;
  /** Sản phẩm có trong wishlist không */
  isWished: boolean;
  /** Callback khi bấm "Add to cart" */
  onAddToCart: (id: number, name: string) => void;
  /** Callback khi bấm nút wishlist */
  onToggleWish: (id: number) => void;
}

/**
 * Thẻ sản phẩm với ảnh, tên, giá, và các nút tương tác.
 * Có fallback gradient khi ảnh không load được.
 */
export function ProductCard({ product, isWished, onAddToCart, onToggleWish }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="product-card">
      <div className="product-image">
        {imgError ? (
          /* Fallback gradient SVG khi ảnh nội bộ chưa có */
          <div className="product-image-fallback" aria-label={product.name} />
        ) : (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        )}
        <span className="sale-tag">SALE</span>
        <button
          className={`wish-button${isWished ? ' wished' : ''}`}
          aria-label={`${isWished ? 'Remove' : 'Add'} ${product.name} ${isWished ? 'from' : 'to'} wishlist`}
          onClick={() => onToggleWish(product.id)}
        >
          <Icon name="heart" size={17} />
        </button>
        <span className="quick-size">XS &nbsp; S &nbsp; M &nbsp; L &nbsp; XL</span>
      </div>

      <div className="product-info">
        <span className="product-brand">AURA MODE</span>
        <h3>{product.name}</h3>
        <p>{product.color}</p>
        <div className="price">
          ${product.price.toFixed(2)} <del>${product.old.toFixed(2)}</del>
          <span>★★★★★</span>
        </div>
        <button
          className="button add-button"
          onClick={() => onAddToCart(product.id, product.name)}
        >
          <Icon name="bag" size={15} /> Add to cart <span>+</span>
        </button>
      </div>
    </article>
  );
}
