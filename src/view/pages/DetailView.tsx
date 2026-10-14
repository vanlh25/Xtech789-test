/**
 * @file DetailView.tsx
 * @layer View – Page
 * @description Trang Detail: hiển thị kết quả tìm kiếm với textarea readonly.
 *
 * Yêu cầu nghiệp vụ:
 * - Nhận từ khóa tìm kiếm từ Controller qua props
 * - Hiển thị trong <textarea readOnly>
 * - Nút Copy to clipboard
 * - Nút quay về trang chủ
 * - Header và Footer được kế thừa từ App.tsx (đảm bảo cart count đồng bộ)
 */

interface DetailViewProps {
  /** Từ khóa tìm kiếm đã xác nhận */
  resultQuery: string;
  /** Đã copy chưa */
  copied: boolean;
  onGoHome: () => void;
  onCopy: () => void;
}

/**
 * Trang Detail – hiển thị từ khóa tìm kiếm trong textarea readonly.
 */
export function DetailView({ resultQuery, copied, onGoHome, onCopy }: DetailViewProps) {
  return (
    <main className="search-detail">
      {/* Breadcrumb */}
      <nav className="detail-breadcrumb" aria-label="Breadcrumb">
        <a href="?view=home" onClick={(e) => { e.preventDefault(); onGoHome(); }}>
          Home
        </a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Search Results</span>
      </nav>

      {/* Tiêu đề section */}
      <div className="detail-heading">
        <span className="section-kicker">
          <i /> YOUR SEARCH, SIMPLIFIED
        </span>
        <h1>
          Search Keyword Result<span className="purple-dot">.</span>
        </h1>
        <p>Dữ liệu được truyền từ thanh tìm kiếm trang Home qua kiến trúc MVC.</p>
      </div>

      {/* Card chứa từ khóa tìm kiếm */}
      <div className="query-card">
        <div className="query-card-toolbar">
          <label htmlFor="search-query">SEARCH QUERY</label>
          <div className="query-card-actions">
            <span className="readonly-label">Read only</span>
            <button
              aria-label="Copy search query to clipboard"
              title="Copy to clipboard"
              onClick={onCopy}
            >
              {/* Icon copy SVG inline */}
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <rect x="8" y="8" width="12" height="13" rx="2" />
                <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
              </svg>
              <span aria-live="polite">{copied ? 'Copied ✓' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Textarea  – readonly */}
        <textarea
          id="search-query"
          rows={6}
          readOnly
          value={resultQuery}
          spellCheck={false}
          aria-label="Search query result"
        />

        <div className="query-card-footnote">
          <span className="query-status-dot" />
          Passed securely from your search
        </div>
      </div>

      {/* Nút quay về */}
      <a
        className="detail-back-link"
        href="?view=home"
        onClick={(e) => { e.preventDefault(); onGoHome(); }}
      >
        <span aria-hidden="true">←</span> Back to home
      </a>
    </main>
  );
}
