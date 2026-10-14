/**
 * @file DrawerPanel.tsx
 * @layer View – Overlay Component
 * @description Panel drawer trượt từ phải: hiển thị giỏ hàng hoặc wishlist.
 */

import { PRODUCTS } from '../../model/data';
import type { PanelType } from '../../model/types';
import { Icon } from '../shared/Icon';

interface DrawerPanelProps {
  panel: PanelType;
  cart: number[];
  wishlist: number[];
  uniqueCartIds: number[];
  cartTotal: string;
  onClose: () => void;
  onDecreaseCart: (id: number) => void;
  onIncreaseCart: (id: number, name: string) => void;
  onRemoveFromCart: (id: number) => void;
  onMoveToCart: (id: number) => void;
  onRemoveWish: (id: number) => void;
  onShop: () => void;
  onCheckout: () => void;
  getCartQty: (id: number) => number;
}

/** Panel drawer giỏ hàng / wishlist */
export function DrawerPanel({
  panel,
  cart,
  wishlist,
  uniqueCartIds,
  cartTotal,
  onClose,
  onDecreaseCart,
  onIncreaseCart,
  onRemoveFromCart,
  onMoveToCart,
  onRemoveWish,
  onShop,
  onCheckout,
  getCartQty,
}: DrawerPanelProps) {
  if (!panel) return null;

  const isCart = panel === 'cart';
  const displayIds = isCart ? uniqueCartIds : wishlist;
  const isEmpty = (isCart ? cart : wishlist).length === 0;

  return (
    <div className="overlay" onClick={onClose}>
      <aside className="drawer" onClick={(e) => e.stopPropagation()}>
        {/* Tiêu đề */}
        <div className="drawer-heading">
          <h2>{isCart ? 'Your shopping bag' : 'Your wishlist'}</h2>
          <button aria-label="Close panel" onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>
        <p className="drawer-note">
          {isCart
            ? 'A few things to make your everyday extraordinary.'
            : 'Your favorites, saved for a little later.'}
        </p>

        {/* Danh sách sản phẩm */}
        {displayIds.map((id) => {
          const product = PRODUCTS.find((p) => p.id === id);
          if (!product) return null;
          const qty = getCartQty(id);

          return (
            <div className="bag-item" key={id}>
              {/* Ảnh với fallback */}
              <div className="bag-item-image">
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <div>
                <span className="product-brand">AURA MODE</span>
                <h3>{product.name}</h3>
                <p>
                  ${product.price.toFixed(2)}
                  {isCart && ` · Qty ${qty}`}
                </p>

                {/* Wishlist: nút chuyển sang giỏ */}
                {!isCart ? (
                  <button className="text-link" onClick={() => onMoveToCart(id)}>
                    Add to bag →
                  </button>
                ) : (
                  /* Cart: điều chỉnh số lượng */
                  <div className="quantity">
                    <button
                      aria-label={`Decrease ${product.name} quantity`}
                      onClick={() => onDecreaseCart(id)}
                    >
                      −
                    </button>
                    <span>{qty}</span>
                    <button
                      aria-label={`Increase ${product.name} quantity`}
                      onClick={() => onIncreaseCart(id, product.name)}
                    >
                      +
                    </button>
                  </div>
                )}

                <button
                  className="remove-item"
                  onClick={() => (isCart ? onRemoveFromCart(id) : onRemoveWish(id))}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}

        {/* Trạng thái rỗng */}
        {isEmpty && (
          <div className="empty-bag">
            <Icon name={isCart ? 'bag' : 'heart'} size={48} />
            <h3>A little room for something lovely.</h3>
            <p>Your {isCart ? 'bag' : 'wishlist'} is empty. Find your new favorite.</p>
            <button className="button" onClick={() => { onClose(); onShop(); }}>
              Explore the collection <Icon name="arrow" />
            </button>
          </div>
        )}

        {/* Tổng tiền và checkout */}
        {isCart && cart.length > 0 && (
          <div className="bag-total">
            <div>
              <span>Subtotal</span>
              <strong>${cartTotal}</strong>
            </div>
            <p>Shipping calculated at checkout. This is a preview storefront.</p>
            <button className="button" onClick={onCheckout}>
              Review order <Icon name="arrow" />
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
