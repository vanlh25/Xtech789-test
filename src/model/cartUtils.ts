/**
 * @file cartUtils.ts
 * @layer Model
 * @description Logic nghiệp vụ thuần túy liên quan đến giỏ hàng.
 * Các hàm này không có side-effect, dễ test độc lập.
 */

import { PRODUCTS } from './data';

/**
 * Tính tổng tiền giỏ hàng từ mảng id sản phẩm.
 * @param cart - Mảng id (có thể trùng để biểu thị số lượng)
 * @returns Tổng tiền dưới dạng số thực
 */
export function calcTotal(cart: number[]): number {
  return cart.reduce((sum, id) => {
    const product = PRODUCTS.find((p) => p.id === id);
    return sum + (product?.price ?? 0);
  }, 0);
}

/**
 * Đếm số lượng của một sản phẩm trong giỏ hàng.
 * @param cart - Mảng id
 * @param productId - Id sản phẩm cần đếm
 * @returns Số lượng
 */
export function countItem(cart: number[], productId: number): number {
  return cart.filter((id) => id === productId).length;
}

/**
 * Thêm 1 đơn vị sản phẩm vào giỏ hàng.
 * @param cart - Mảng id hiện tại
 * @param productId - Id sản phẩm cần thêm
 * @returns Mảng id mới (immutable)
 */
export function addToCart(cart: number[], productId: number): number[] {
  return [...cart, productId];
}

/**
 * Xóa 1 đơn vị sản phẩm khỏi giỏ hàng (giảm qty đi 1).
 * @param cart - Mảng id hiện tại
 * @param productId - Id sản phẩm cần giảm
 * @returns Mảng id mới
 */
export function decreaseFromCart(cart: number[], productId: number): number[] {
  const idx = cart.indexOf(productId);
  if (idx === -1) return cart;
  const copy = [...cart];
  copy.splice(idx, 1);
  return copy;
}

/**
 * Xóa hoàn toàn sản phẩm khỏi giỏ hàng (mọi số lượng).
 * @param cart - Mảng id hiện tại
 * @param productId - Id sản phẩm cần xóa
 * @returns Mảng id mới
 */
export function removeFromCart(cart: number[], productId: number): number[] {
  return cart.filter((id) => id !== productId);
}

/**
 * Toggle wishlist: thêm nếu chưa có, xóa nếu đã có.
 * @param wishlist - Mảng id wishlist hiện tại
 * @param productId - Id sản phẩm
 * @returns Mảng id mới
 */
export function toggleWishlist(wishlist: number[], productId: number): number[] {
  return wishlist.includes(productId)
    ? wishlist.filter((id) => id !== productId)
    : [...wishlist, productId];
}

/**
 * Lấy danh sách id duy nhất trong giỏ hàng (để render drawer).
 * @param cart - Mảng id (có thể trùng)
 * @returns Mảng id không trùng
 */
export function uniqueCartIds(cart: number[]): number[] {
  return [...new Set(cart)];
}
