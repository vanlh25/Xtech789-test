/**
 * @file Icon.tsx
 * @layer View – Shared Component
 * @description Bộ icon SVG inline dùng chung toàn dự án.
 */

import React from 'react';

/** Tên icon hợp lệ */
export type IconName =
  | 'search'
  | 'heart'
  | 'bag'
  | 'arrow'
  | 'chevron'
  | 'truck'
  | 'return'
  | 'shield'
  | 'leaf'
  | 'close'
  | 'instagram'
  | 'award';

interface IconProps {
  /** Tên icon cần hiển thị */
  name: IconName;
  /** Kích thước (px), mặc định 20 */
  size?: number;
}

/** Map tên icon → phần tử SVG nội bộ */
const ICON_PATHS: Record<IconName, React.ReactNode> = {
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 4 4" />
    </>
  ),
  heart: (
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
  ),
  bag: (
    <>
      <path d="M5 7h14l1 14H4L5 7Z" />
      <path d="M8 8V6a4 4 0 0 1 8 0v2" />
    </>
  ),
  arrow: (
    <>
      <path d="M4 12h15m-5-5 5 5-5 5" />
    </>
  ),
  chevron: <path d="m9 5 7 7-7 7" />,
  truck: (
    <>
      <path d="M2 5h12v12H2zM14 9h4l4 5v3h-8" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
    </>
  ),
  return: (
    <>
      <path d="M4 9a8 8 0 1 1-1 7M4 3v6h6" />
    </>
  ),
  shield: (
    <>
      <path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Z" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 3C7 1 1 8 5 16s16 3 15-13Z" />
      <path d="m4 21 11-12" />
    </>
  ),
  close: <path d="m6 6 12 12M6 18 18 6" />,
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17 7h.01" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="m8 14-2 8 6-3 6 3-2-8M9 9l2 2 4-4" />
    </>
  ),
};

/**
 * Component Icon SVG inline.
 * @param name - Tên icon
 * @param size - Kích thước pixel
 */
export function Icon({ name, size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICON_PATHS[name] ?? ICON_PATHS.arrow}
    </svg>
  );
}
