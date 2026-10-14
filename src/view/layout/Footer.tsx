/**
 * @file Footer.tsx
 * @layer View – Layout Component
 * @description Footer cuối trang, dùng chung cho Home và Detail.
 */

import { FOOTER_COLUMNS, SHOP_TRIGGER_LINKS } from '../../model/data';
import { Icon } from '../shared/Icon';

interface FooterProps {
  onGoHome: () => void;
  onShop: () => void;
  onOpenArticle: (title: string) => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

/**
 * Footer với logo, link điều hướng, thông tin liên hệ và phương thức thanh toán.
 */
export function Footer({ onGoHome, onShop, onOpenArticle, onOpenPrivacy, onOpenTerms }: FooterProps) {
  const handleLink = (link: string) => {
    if (SHOP_TRIGGER_LINKS.includes(link)) return onShop();
    onOpenArticle(link);
  };

  return (
    <footer id="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <a
              className="logo"
              href="?view=home"
              onClick={(e) => {
                e.preventDefault();
                onGoHome();
              }}
            >
              AURA MODE<span>THE ART OF EVERYDAY</span>
            </a>
            <p>
              Modern essentials. Timeless confidence.
              <br />
              Made for the way you live.
            </p>
            <p>
              Ho Chi Minh City, Vietnam
              <br />
              <a href="mailto:contact@xtech789.com">contact@xtech789.com</a>
              <br />
              <a href="tel:+842834567890">+84 (028) 3456 7890</a>
            </p>
            <div className="footer-social">
              <Icon name="instagram" size={18} />
              <span>p</span>
              <span>f</span>
            </div>
          </div>

          {/* Columns */}
          {FOOTER_COLUMNS.map(({ title, links }) => (
            <div className="footer-links" key={title}>
              <h3>{title}</h3>
              {links.map((link) => (
                <button key={link} onClick={() => handleLink(link)}>
                  {link}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <span>© 2026 XTech789. All Rights Reserved. Developed by Le Huu Van.</span>
          <div>
            <button onClick={onOpenPrivacy}>Privacy Policy</button>
            <button onClick={onOpenTerms}>Terms of Service</button>
          </div>
          <div className="payments">
            <b>VISA</b>
            <b className="mastercard">
              <i /><i />
            </b>
            <b>AMEX</b>
            <b>PayPal</b>
          </div>
        </div>
      </div>
    </footer>
  );
}
