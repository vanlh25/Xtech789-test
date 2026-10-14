/**
 * @file data.ts
 * @layer Model
 * @description Dữ liệu mẫu (Mock Data) cho toàn bộ ứng dụng.
 * Trong môi trường thực tế, đây sẽ được thay bằng lời gọi API.
 */

import type { NewsItem, Product } from './types';

/** Helper tạo URL Unsplash tối ưu */
const photo = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

/** Bộ ảnh sản phẩm và banner */
export const IMG = {
  hero: photo('photo-1747817330508-315506ed9487'),
  blazer: photo('photo-1747814965215-15a273e27aa6'),
  street: photo('photo-1676716184677-02c58a869b98'),
  dress: photo('photo-1696536451887-9825b5d689aa'),
  silk: photo('photo-1742794572842-6836a8d0b11b'),
  black: photo('photo-1759229874810-26aa9a3dda92'),
  detail: photo('photo-1662393504550-58b06060626a'),
  pink: photo('photo-1720088446470-9e89e26bed0e'),
};

/** Danh sách sản phẩm thời trang */
export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Silk Evening Slip Dress',
    category: 'Dresses',
    image: IMG.dress,
    price: 14,
    old: 35,
    color: 'Ivory / 3 colors',
  },
  {
    id: 2,
    name: 'The Essential Tailored Blazer',
    category: 'Blazers',
    image: IMG.blazer,
    price: 48,
    old: 80,
    color: 'Sand / 2 colors',
  },
  {
    id: 3,
    name: 'Pure Silk Everyday Shirt',
    category: 'Silk Shirts',
    image: IMG.silk,
    price: 28,
    old: 55,
    color: 'Champagne / 4 colors',
  },
  {
    id: 4,
    name: 'The City Straight-Leg Jean',
    category: 'Tailored Denim',
    image: IMG.street,
    price: 42,
    old: 70,
    color: 'Indigo / 2 colors',
  },
  {
    id: 5,
    name: 'Soft Form Cashmere Knit',
    category: 'Knitwear',
    image: IMG.detail,
    price: 64,
    old: 95,
    color: 'Oat / 3 colors',
  },
  {
    id: 6,
    name: 'Everywhere Wool Overcoat',
    category: 'Outerwear',
    image: IMG.hero,
    price: 98,
    old: 160,
    color: 'Stone / 2 colors',
  },
  {
    id: 7,
    name: 'The Everyday Leather Loafer',
    category: 'Shoes',
    image: IMG.street,
    price: 58,
    old: 90,
    color: 'Espresso / 2 colors',
  },
];

/** Danh sách danh mục sản phẩm */
export const CATEGORIES: string[] = [
  'Dresses',
  'Silk Shirts',
  'Tailored Denim',
  'Knitwear',
  'Blazers',
  'Outerwear',
  'Shoes',
];

/** Danh sách bài tin tức */
export const NEWS_ITEMS: NewsItem[] = [
  {
    title: 'The art of dressing, effortlessly.',
    image: IMG.street,
    tag: 'STYLE NOTES',
    date: 'JAN 18, 2026',
  },
  {
    title: 'Less, but better. The new essentials.',
    image: IMG.black,
    tag: 'THE EDIT',
    date: 'JAN 14, 2026',
  },
  {
    title: 'A softer side of winter.',
    image: IMG.pink,
    tag: 'IN SEASON',
    date: 'JAN 10, 2026',
  },
  {
    title: 'Made with care. Worn with love.',
    image: IMG.detail,
    tag: 'BEHIND THE SEAMS',
    date: 'JAN 06, 2026',
  },
];

/** Các slide hero */
export const HERO_SLIDES = [IMG.hero, IMG.blazer];

/** Danh sách giải thưởng */
export const AWARDS = [
  { name: 'VOGUE', sub: "EDITORS' CHOICE", year: '2025' },
  { name: 'ELLE', sub: 'STYLE AWARDS', year: '2025' },
  { name: 'Conscious', sub: 'FASHION COLLECTIVE', year: 'CERTIFIED' },
  { name: 'GOTS', sub: 'ORGANIC TEXTILES', year: 'CERTIFIED' },
  { name: 'Good On You', sub: 'ETHICAL BRAND', year: 'TOP RATED' },
  { name: "HARPER'S BAZAAR", sub: 'FASHION EXCELLENCE', year: '2025' },
];

/** Danh sách link footer */
export const FOOTER_COLUMNS = [
  {
    title: 'Explore',
    links: ['New Arrivals', 'Bestsellers', 'Winter Collection', 'The Lookbook', 'Gift Cards'],
  },
  {
    title: 'Here to Help',
    links: ['Contact Us', 'Shipping & Returns', 'Size Guide', 'FAQs', 'Track Your Order'],
  },
  {
    title: 'The World of Aura',
    links: ['Our Story', 'Our Craftsmanship', 'Sustainability', 'The Aura Journal', 'Careers'],
  },
];

/** Links kích hoạt chuyển đến shop thay vì modal */
export const SHOP_TRIGGER_LINKS = ['New Arrivals', 'Bestsellers', 'Winter Collection'];
