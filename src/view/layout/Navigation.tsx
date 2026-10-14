/**
 * @file Navigation.tsx
 * @layer View – Layout Component
 * @description Thanh điều hướng chính (navbar) bên dưới Header.
 */

import { Icon } from '../shared/Icon';

interface NavigationProps {
  /** Đang ở trang Detail không (để active link Home) */
  isDetail: boolean;
  onGoHome: () => void;
  onShop: () => void;
  onSection: (id: string) => void;
  onOpenArticle?: (title: string) => void;
}

const NAV_ITEMS = ['Home', 'New Arrivals', 'Winter Collection', 'Lookbook', 'Contact'] as const;

/**
 * Thanh Navigation nằm dưới Header.
 */
export function Navigation({ isDetail, onGoHome, onShop, onSection }: NavigationProps) {
  const handleClick = (index: number) => {
    if (index === 0) return onGoHome();
    if (index === 1 || index === 2) return onShop();
    if (index === 3) return onSection('story');
    // Contact → cuộn xuống footer
    document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="nav-wrap">
      <div className="container nav-inner">
        <div className="nav-links">
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item}
              className={i === 0 && !isDetail ? 'active' : ''}
              onClick={() => handleClick(i)}
            >
              {item}
              {i === 1 && <span className="new-tag">NEW</span>}
            </button>
          ))}
        </div>
        <span className="nav-note">
          <Icon name="truck" size={17} /> Complimentary shipping on orders $100+
        </span>
      </div>
    </nav>
  );
}
