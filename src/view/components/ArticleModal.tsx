/**
 * @file ArticleModal.tsx
 * @layer View – Overlay Component
 * @description Modal popup hiển thị nội dung bài viết, FAQs, Size Guide, v.v.
 */

import { Icon } from '../shared/Icon';

interface ArticleModalProps {
  /** Tiêu đề bài viết, null = đóng modal */
  article: string | null;
  /** Số lượng trong giỏ để hiển thị trong order preview */
  cartCount: number;
  /** Tổng tiền giỏ */
  cartTotal: string;
  onClose: () => void;
  onShop: () => void;
}

/** Nội dung bài viết theo tiêu đề */
function ArticleBody({ article, cartCount, cartTotal }: Pick<ArticleModalProps, 'article' | 'cartCount' | 'cartTotal'>) {
  if (article === 'Size Guide') {
    return (
      <>
        <p>Find your perfect fit. Measurements are in centimeters.</p>
        <table>
          <thead>
            <tr>
              <th>Size</th><th>Bust</th><th>Waist</th><th>Hip</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['XS', '80–84', '62–66', '88–92'],
              ['S', '84–88', '66–70', '92–96'],
              ['M', '88–94', '70–76', '96–102'],
              ['L', '94–100', '76–82', '102–108'],
              ['XL', '100–106', '82–88', '108–114'],
            ].map((row) => (
              <tr key={row[0]}>
                {row.map((cell) => <td key={cell}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }

  if (article === 'Your order preview') {
    return (
      <>
        <p>
          Your bag contains {cartCount} pieces, totaling ${cartTotal}.
          This concept storefront does not process payments.
        </p>
        <p>Your pieces will stay in your bag while you explore.</p>
      </>
    );
  }

  const isSupport =
    article?.includes('Support') ||
    article?.includes('Contact') ||
    article === 'FAQs' ||
    article === 'Shipping & Returns' ||
    article === 'Track Your Order';

  if (isSupport) {
    return (
      <>
        <p>
          We&apos;re here to help you find your perfect piece. Enjoy complimentary shipping on
          orders over $100 and easy returns within 30 days.
        </p>
        <p>
          For order updates, fit advice, or any other questions, contact{' '}
          <a href="mailto:hello@auramode.com">hello@auramode.com</a>. Our team is available
          Monday–Friday, 9am–6pm GMT.
        </p>
      </>
    );
  }

  return (
    <>
      <p>
        Extraordinary style begins with thoughtful choices. At Aura Mode, we believe in a wardrobe
        that feels personal: timeless silhouettes, considered fabrics, and the quiet confidence of a
        beautiful fit.
      </p>
      <p>
        Our collections celebrate the art of everyday dressing. Discover fluid silks, soft layers,
        and tailoring that moves with you — pieces to wear, love, and return to season after season.
      </p>
    </>
  );
}

/**
 * Modal overlay cho bài viết / thông tin chi tiết.
 */
export function ArticleModal({ article, cartCount, cartTotal, onClose, onShop }: ArticleModalProps) {
  if (!article) return null;

  return (
    <div className="overlay modal-overlay" onClick={onClose}>
      <section className="info-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" aria-label="Close" onClick={onClose}>
          <Icon name="close" />
        </button>
        <span className="section-kicker">THE WORLD OF AURA</span>
        <h2>{article}</h2>
        <ArticleBody article={article} cartCount={cartCount} cartTotal={cartTotal} />
        <button className="button" onClick={() => { onClose(); onShop(); }}>
          Discover Aura Mode <Icon name="arrow" size={17} />
        </button>
      </section>
    </div>
  );
}
