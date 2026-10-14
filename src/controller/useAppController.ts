/**
 * @file useAppController.ts
 * @layer Controller
 * @description Custom hook trung tâm – đóng vai trò Controller trong mô hình MVC.
 *
 * Luồng dữ liệu:
 *   View (sự kiện người dùng)
 *   Controller (useAppController: xử lý logic, cập nhật state)
 *   Model (cartUtils, searchUtils: tính toán thuần túy)
 *   View (re-render với dữ liệu mới)
 *
 * Controller KHÔNG chứa JSX, KHÔNG biết về CSS.
 * View KHÔNG biết về logic tính toán – chỉ nhận props và gọi callback.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  addToCart,
  calcTotal,
  countItem,
  decreaseFromCart,
  removeFromCart,
  toggleWishlist,
  uniqueCartIds,
} from '../model/cartUtils';
import { filterProducts, sanitizeQuery } from '../model/searchUtils';
import type { PanelType, Product } from '../model/types';

/**
 * Đọc trạng thái isDetail và resultQuery từ URL parameters.
 * @returns Tuple [isDetail, resultQuery]
 */
function readUrlState(): [boolean, string] {
  const params = new URLSearchParams(window.location.search);
  const isDetail = params.get('view') !== 'home' && params.get('view') !== null;
  const q = params.get('q') ?? '';
  return [isDetail, q || 'Reasonable Price'];
}

/** Kiểu trả về của Controller hook */
export interface AppController {
  // State
  cart: number[];
  wishlist: number[];
  panel: PanelType;
  isDetail: boolean;
  resultQuery: string;
  query: string;
  category: string;
  search: string;
  tab: 'overview' | 'specs';
  slide: number;
  showAll: boolean;
  notice: string;
  article: string | null;
  subscribed: boolean;
  copied: boolean;
  /** Badge cart đang bật animation không */
  cartBump: boolean;

  // Dữ liệu đã xử lý 
  filteredProducts: Product[];
  cartTotal: string;
  uniqueCartIds: number[];

  // Actions 
  /** Điều hướng về trang chủ */
  goHome: () => void;
  /** Cuộn tới section trên trang chủ theo id */
  homeSection: (id: string) => void;
  /** Mở khu vực sản phẩm, tuỳ chọn lọc theo danh mục */
  shop: (cat?: string) => void;
  /** Xử lý submit form tìm kiếm */
  handleSearch: (rawQuery: string) => void;
  /** Cập nhật giá trị ô input tìm kiếm */
  setQuery: (q: string) => void;
  /** Thêm sản phẩm vào giỏ hàng */
  handleAddToCart: (productId: number, productName: string) => void;
  /** Giảm số lượng sản phẩm trong giỏ */
  handleDecreaseCart: (productId: number) => void;
  /** Xóa hoàn toàn sản phẩm khỏi giỏ */
  handleRemoveFromCart: (productId: number) => void;
  /** Chuyển đổi trạng thái wishlist */
  handleToggleWish: (productId: number) => void;
  /** Mở/đóng panel drawer */
  setPanel: (p: PanelType) => void;
  /** Chuyển tab trong khu vực sản phẩm */
  setTab: (t: 'overview' | 'specs') => void;
  /** Chuyển slide hero */
  setSlide: (s: number) => void;
  /** Bật/tắt chế độ xem tất cả sản phẩm */
  toggleShowAll: () => void;
  /** Đặt lại bộ lọc sản phẩm */
  clearFilter: () => void;
  /** Xóa thông báo toast */
  clearNotice: () => void;
  /** Mở modal bài viết */
  openArticle: (title: string) => void;
  /** Đóng modal bài viết */
  closeArticle: () => void;
  /** Đăng ký newsletter */
  handleSubscribe: () => void;
  /** Số lượng sản phẩm cụ thể trong giỏ */
  getCartQty: (productId: number) => number;
  /** Copy query sang clipboard */
  handleCopy: () => void;
}

/**
 * Controller hook chính của ứng dụng.
 * Quản lý toàn bộ state và điều phối giữa Model và View.
 * @returns AppController object chứa state và tất cả action handlers
 */
export function useAppController(): AppController {
  // Khởi tạo state từ URL (hỗ trợ deep-link)
  const [urlDetail, urlQuery] = readUrlState();

  const [cart, setCart] = useState<number[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [panel, setPanel] = useState<PanelType>(null);
  const [isDetail, setIsDetail] = useState(urlDetail);
  const [resultQuery, setResultQuery] = useState(urlQuery);
  const [query, setQuery] = useState(urlDetail ? urlQuery : '');
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<'overview' | 'specs'>('overview');
  const [slide, setSlide] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [notice, setNotice] = useState('');
  const [article, setArticle] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [cartBump, setCartBump] = useState(false);

  // Ref lưu timeout để tránh memory leak
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bumpTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Lắng nghe sự kiện back/forward của browser
  useEffect(() => {
    const onPopState = () => {
      const [detail, q] = readUrlState();
      setIsDetail(detail);
      setResultQuery(q);
      setQuery(detail ? q : '');
      setCopied(false);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Helpers nội bộ

  /** Hiển thị toast notification với auto-dismiss */
  const showNotice = useCallback((msg: string) => {
    setNotice(msg);
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(''), 3000);
  }, []);

  /** Kích hoạt animation bump cho badge giỏ hàng */
  const triggerCartBump = useCallback(() => {
    setCartBump(true);
    if (bumpTimer.current) clearTimeout(bumpTimer.current);
    bumpTimer.current = setTimeout(() => setCartBump(false), 400);
  }, []);

  // Action handlers

  /** Điều hướng về trang chủ và reset URL */
  const goHome = useCallback(() => {
    setIsDetail(false);
    setQuery('');
    window.history.pushState({}, '', '?view=home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  /**
   * Cuộn tới section trên trang chủ.
   * Nếu đang ở Detail, về Home trước rồi mới cuộn.
   * @param id - id của element cần cuộn tới
   */
  const homeSection = useCallback(
    (id: string) => {
      const scroll = () =>
        requestAnimationFrame(() =>
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        );
      if (isDetail) {
        goHome();
        setTimeout(scroll, 100);
      } else {
        scroll();
      }
    },
    [isDetail, goHome],
  );

  /**
   * Chuyển đến khu vực sản phẩm, tuỳ chọn lọc danh mục.
   * @param cat - Tên danh mục, mặc định "All"
   */
  const shop = useCallback(
    (cat = 'All') => {
      setCategory(cat);
      setSearch('');
      homeSection('products');
    },
    [homeSection],
  );

  /**
   * Xử lý submit form tìm kiếm.
   * Kiểm tra edge case: chuỗi rỗng, chỉ khoảng trắng.
   * @param rawQuery - Giá trị thô từ input
   */
  const handleSearch = useCallback((rawQuery: string) => {
    const clean = sanitizeQuery(rawQuery);
    if (!clean) return; // Bỏ qua tìm kiếm rỗng

    setResultQuery(clean);
    setIsDetail(true);
    setCopied(false);
    window.history.pushState({}, '', `?view=search&q=${encodeURIComponent(clean)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  /**
   * Thêm sản phẩm vào giỏ và kích hoạt animation + toast.
   * @param productId - Id sản phẩm
   * @param productName - Tên sản phẩm để hiển thị trong toast
   */
  const handleAddToCart = useCallback(
    (productId: number, productName: string) => {
      setCart((prev) => addToCart(prev, productId));
      triggerCartBump();
      showNotice(`${productName} added to your bag`);
    },
    [triggerCartBump, showNotice],
  );

  /**
   * Giảm số lượng sản phẩm trong giỏ đi 1.
   * @param productId - Id sản phẩm
   */
  const handleDecreaseCart = useCallback((productId: number) => {
    setCart((prev) => decreaseFromCart(prev, productId));
  }, []);

  /**
   * Xóa hoàn toàn sản phẩm khỏi giỏ hàng.
   * @param productId - Id sản phẩm
   */
  const handleRemoveFromCart = useCallback((productId: number) => {
    setCart((prev) => removeFromCart(prev, productId));
  }, []);

  /**
   * Toggle trạng thái wishlist của sản phẩm.
   * @param productId - Id sản phẩm
   */
  const handleToggleWish = useCallback((productId: number) => {
    setWishlist((prev) => toggleWishlist(prev, productId));
  }, []);

  /** Bật/tắt chế độ xem tất cả sản phẩm */
  const toggleShowAll = useCallback(() => {
    setShowAll((prev) => !prev);
    setCategory('All');
    setSearch('');
  }, []);

  /** Đặt lại bộ lọc về mặc định */
  const clearFilter = useCallback(() => {
    setCategory('All');
    setSearch('');
    setQuery('');
  }, []);

  /** Xóa thông báo toast */
  const clearNotice = useCallback(() => setNotice(''), []);

  /**
   * Mở modal bài viết.
   * @param title - Tiêu đề bài viết
   */
  const openArticle = useCallback((title: string) => setArticle(title), []);

  /** Đóng modal bài viết */
  const closeArticle = useCallback(() => setArticle(null), []);

  /** Xử lý đăng ký newsletter */
  const handleSubscribe = useCallback(() => setSubscribed(true), []);

  /**
   * Copy từ khóa tìm kiếm vào clipboard.
   * Xử lý trường hợp API clipboard không khả dụng.
   */
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(resultQuery);
      setCopied(true);
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      showNotice('Copy không khả dụng. Hãy chọn text để copy thủ công.');
    }
  }, [resultQuery, showNotice]);

  /**
   * Lấy số lượng của sản phẩm cụ thể trong giỏ.
   * @param productId - Id sản phẩm
   * @returns Số lượng
   */
  const getCartQty = useCallback(
    (productId: number) => countItem(cart, productId),
    [cart],
  );

  // Dữ liệu đã xử lý qua Model
  const filteredProducts = filterProducts(category, search, showAll);
  const cartTotal = calcTotal(cart).toFixed(2);
  const uniqueIds = uniqueCartIds(cart);

  // Trả về toàn bộ interface Controller cho View sử dụng
  return {
    // State
    cart,
    wishlist,
    panel,
    isDetail,
    resultQuery,
    query,
    category,
    search,
    tab,
    slide,
    showAll,
    notice,
    article,
    subscribed,
    copied,
    cartBump,
    // Dữ liệu đã xử lý
    filteredProducts,
    cartTotal,
    uniqueCartIds: uniqueIds,
    // Actions
    goHome,
    homeSection,
    shop,
    handleSearch,
    setQuery,
    handleAddToCart,
    handleDecreaseCart,
    handleRemoveFromCart,
    handleToggleWish,
    setPanel,
    setTab,
    setSlide,
    toggleShowAll,
    clearFilter,
    clearNotice,
    openArticle,
    closeArticle,
    handleSubscribe,
    getCartQty,
    handleCopy,
  };
}
