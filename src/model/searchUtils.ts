/**
 * @file searchUtils.ts
 * @layer Model
 * @description Logic xử lý tìm kiếm và lọc sản phẩm.
 * Tách biệt hoàn toàn khỏi UI để dễ test và tái sử dụng.
 */

import { PRODUCTS } from './data';
import type { Product } from './types';

/**
 * Làm sạch và kiểm tra chuỗi tìm kiếm.
 * Xử lý edge case: chuỗi rỗng, chỉ chứa khoảng trắng, ký tự đặc biệt.
 * @param raw - Chuỗi thô từ input người dùng
 * @returns Chuỗi đã trim, hoặc null nếu không hợp lệ
 */
export function sanitizeQuery(raw: string): string | null {
  const trimmed = raw.trim();
  // Loại bỏ chuỗi rỗng hoặc chỉ có khoảng trắng
  if (!trimmed) return null;
  // Giới hạn độ dài để tránh DoS
  return trimmed.slice(0, 200);
}

/**
 * Lọc sản phẩm theo danh mục và từ khóa tìm kiếm.
 * @param category - Tên danh mục ("All" = không lọc theo danh mục)
 * @param search - Từ khóa tìm kiếm nhanh (tìm trong tên sản phẩm)
 * @param showAll - Có hiển thị tất cả hay chỉ 3 sản phẩm đầu
 * @returns Danh sách sản phẩm đã lọc
 */
export function filterProducts(
  category: string,
  search: string,
  showAll: boolean,
): Product[] {
  const result = PRODUCTS.filter((p) => {
    const matchCategory = category === 'All' || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Chỉ hiển thị 3 sản phẩm đầu nếu ở chế độ xem mặc định (home, all, no filter)
  const isDefaultView = !showAll && category === 'All' && !search;
  return isDefaultView ? result.slice(0, 3) : result;
}
