/**
 * @file types.ts
 * @layer Model
 * @description Định nghĩa toàn bộ kiểu dữ liệu dùng chung trong dự án.
 * Mọi tầng (View, Controller) đều import từ đây để đảm bảo tính nhất quán.
 */

/** Một sản phẩm thời trang */
export interface Product {
  id: number;
  /** Tên sản phẩm */
  name: string;
  /** Danh mục (Dresses, Blazers, ...) */
  category: string;
  /** Đường dẫn ảnh nội bộ (src/assets/images/) */
  image: string;
  /** Giá hiện tại (USD) */
  price: number;
  /** Giá gốc trước khi giảm (USD) */
  old: number;
  /** Màu sắc và số lượng biến thể */
  color: string;
}

/** Một bài tin tức / bài viết trên blog */
export interface NewsItem {
  title: string;
  image: string;
  tag: string;
  date: string;
}

/** Trạng thái panel drawer (giỏ hàng hoặc wishlist) */
export type PanelType = 'cart' | 'wishlist' | null;

/** Trạng thái toàn cục của ứng dụng – được Controller quản lý */
export interface AppState {
  /** Danh sách id sản phẩm trong giỏ hàng (cho phép trùng để đếm số lượng) */
  cart: number[];
  /** Danh sách id sản phẩm yêu thích */
  wishlist: number[];
  /** Panel đang mở */
  panel: PanelType;
  /** Đang ở trang Detail (true) hay trang Home (false) */
  isDetail: boolean;
  /** Từ khóa tìm kiếm đã xác nhận, hiển thị trong Detail */
  resultQuery: string;
  /** Từ khóa người dùng đang nhập trong ô search */
  query: string;
  /** Bộ lọc danh mục sản phẩm */
  category: string;
  /** Bộ lọc tìm kiếm nhanh trong product list */
  search: string;
  /** Tab đang chọn trong khu vực sản phẩm */
  tab: 'overview' | 'specs';
  /** Slide hero hiện tại */
  slide: number;
  /** Hiển thị tất cả sản phẩm */
  showAll: boolean;
  /** Thông báo toast */
  notice: string;
  /** Tiêu đề modal bài viết đang mở */
  article: string | null;
  /** Đã đăng ký newsletter chưa */
  subscribed: boolean;
  /** Trạng thái đã copy query chưa */
  copied: boolean;
}
