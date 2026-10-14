# AURA MODE — Luxury Fashion E-Commerce

> Dự án bài test kỹ thuật Frontend: Tái cấu trúc (Refactor) và hoàn thiện ứng dụng thời trang cao cấp từ Figma prototype sang chuẩn **Client-side MVC**, sử dụng **React + TypeScript + Pure CSS**.

[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Pure CSS](https://img.shields.io/badge/Styling-Pure_CSS-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

---

## 📌 Thông Tin Ứng Viên & Bài Test

- **Người thực hiện:** Lê Hữu Vạn (Le Huu Van)
- **Đơn vị ứng tuyển / Doanh nghiệp:** Công ty Cổ phần XTech789
- **Địa chỉ:** TP. Hồ Chí Minh, Việt Nam
- **Email:** contact@xtech789.com | tuyendung@xtech789.vn
- **Bản quyền:** `© 2026 XTech789. All Rights Reserved. Developed by Le Huu Van.`

---

## 🎯 Mục Tiêu & Yêu Cầu Đã Đạt Được

1. **Chuẩn kiến trúc MVC phía Client (Client-Side MVC)**:
   - Tách biệt hoàn toàn tầng Dữ liệu (`Model`), Xử lý nghiệp vụ & State (`Controller`), và Giao diện hiển thị (`View`).
   - `App.tsx` đóng vai trò kết nối mỏng (Thin Root Wireframe), không chứa logic tính toán dồn cục.
2. **Độ tương thích & Responsive Đa Thiết Bị**:
   - **Desktop (> 1100px):** Chuẩn bố cục pixel-perfect theo Figma prototype.
   - **Tablet (768px – 1100px):** Tối ưu sidebar và grid sản phẩm linh hoạt.
   - **Mobile (< 768px):** Thanh tìm kiếm full-width, thanh điều hướng cuộn ngang mượt mà, lưới sản phẩm 2 cột tối ưu cho trải nghiệm chạm/vuốt.
3. **Trang Search Keyword Result (DetailView)**:
   - Truyền từ khóa tìm kiếm an toàn từ Home sang trang Detail qua MVC state & URL Search Params.
   - Hiển thị từ khóa trong trường `<textarea readOnly>`.
   - Nút **Copy to Clipboard** kèm phản hồi trực quan.
   - Đồng bộ trạng thái Header (Cart, Wishlist) và Footer xuyên suốt giữa Home và Detail.

---

## 🏗️ Cấu Trúc Thư Mục (Architecture)

```text
src/
├── model/                     # TẦNG DỮ LIỆU (DATA LAYER)
│   ├── types.ts               # Định nghĩa interface Product, NewsItem, PanelType,...
│   ├── data.ts                # Mock data & tập hợp URL ảnh chất lượng cao
│   ├── cartUtils.ts           # Pure functions xử lý giỏ hàng & tính toán tiền
│   └── searchUtils.ts         # Pure functions tìm kiếm & lọc sản phẩm an toàn
│
├── controller/                # TẦNG ĐIỀU KHIỂN (BUSINESS LOGIC & STATE)
│   └── useAppController.ts    # Custom hook quản lý toàn bộ state, URL sync, event handlers
│
├── view/                      # TẦNG HIỂN THỊ (PRESENTATIONAL UI)
│   ├── components/            # Các component tái sử dụng
│   │   ├── ProductCard.tsx    # Card sản phẩm (ảnh, giá, sale tag, wishlist, add to cart)
│   │   ├── DrawerPanel.tsx    # Panel trượt từ phải (Giỏ hàng & Wishlist)
│   │   └── ArticleModal.tsx   # Modal nội dung thông tin (Size guide, Story, FAQs)
│   ├── layout/                # Khung trang chung
│   │   ├── Header.tsx         # Top bar, Logo, Search bar, Badges (Cart & Wishlist)
│   │   ├── Navigation.tsx     # Thanh menu điều hướng chính
│   │   └── Footer.tsx         # Chân trang thông tin doanh nghiệp & bản quyền
│   ├── pages/                 # Trang ứng dụng
│   │   ├── HomeView.tsx       # Trang chủ (Hero, Promos, Products, Awards, News, Newsletter)
│   │   └── DetailView.tsx     # Trang kết quả tìm kiếm (Textarea read-only, Copy button)
│   └── shared/                # Thành phần dùng chung
│       └── Icon.tsx           # Hệ thống SVG Icons nội bộ (không phụ thuộc thư viện ngoài)
│
├── index.css                  # Toàn bộ CSS thuần theo Design Tokens & Media Queries
├── App.tsx                    # Root Component gắn kết Controller & View
└── main.tsx                   # Điểm khởi chạy ứng dụng React DOM
```

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Ứng Dụng

### 1. Yêu cầu môi trường
- **Node.js**: phiên bản `>= 18.0.0`
- **npm** (hoặc `yarn`, `pnpm`)

### 2. Cài đặt các gói phụ thuộc
```bash
npm install
```

### 3. Chạy môi trường phát triển (Dev Server)
```bash
npm run dev
```
Mở trình duyệt tại đường dẫn: `http://localhost:5173/`

### 4. Kiểm tra TypeScript & Đóng gói sản phẩm (Production Build)
```bash
npm run build
```

### 5. Xem trước bản build sản phẩm
```bash
npm run preview
```

---

## 🎨 Điểm Nhấn Kỹ Thuật (Key Features & Highlights)

- **Pure CSS Design System**: Tận dụng CSS Custom Properties (`--clr-primary`, `--font-serif`, v.v.) và CSS Grid/Flexbox hiện đại.
- **Micro-interactions & UX**:
  - Animation `badge-bump` khi nhấn "Add to cart".
  - Toast thông báo xác nhận thao tác ngắn gọn, tự động ẩn.
  - Tải ảnh lười (`loading="lazy"`) và cơ chế fallback ảnh mượt mà khi mất mạng.
- **Accessibility & Web Standards**:
  - Sử dụng thẻ ngữ nghĩa HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
  - Đầy đủ thuộc tính `aria-label`, `aria-hidden`, và hỗ trợ `prefers-reduced-motion`.
- **Zero Heavy External UI Libs**: Không sử dụng Tailwind, Bootstrap, hay Material UI nhằm tối đa hóa tốc độ tải trang.

---
