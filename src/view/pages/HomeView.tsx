/**
 * @file HomeView.tsx
 * @layer View – Page
 * @description Trang chủ: Hero, Category Sidebar, Products, Brand Story, News, Newsletter.
 * Component này chỉ render UI, toàn bộ data và handlers đến từ Controller qua props.
 */

import React, { useState } from 'react';
import { AWARDS, CATEGORIES, HERO_SLIDES, IMG, NEWS_ITEMS } from '../../model/data';
import type { Product } from '../../model/types';
import { ProductCard } from '../components/ProductCard';
import { Icon } from '../shared/Icon';

interface HomeViewProps {
  filteredProducts: Product[];
  wishlist: number[];
  category: string;
  search: string;
  tab: 'overview' | 'specs';
  slide: number;
  showAll: boolean;
  subscribed: boolean;
  onShop: (cat?: string) => void;
  onAddToCart: (id: number, name: string) => void;
  onToggleWish: (id: number) => void;
  onSetTab: (t: 'overview' | 'specs') => void;
  onSetSlide: (s: number) => void;
  onToggleShowAll: () => void;
  onClearFilter: () => void;
  onOpenArticle: (title: string) => void;
  onSubscribe: () => void;
  onSection: (id: string) => void;
}

/** Fallback ảnh hero khi file local chưa có */
function HeroImage({ src, alt, style }: { src: string; alt: string; style?: React.CSSProperties }) {
  const [err, setErr] = useState(false);
  if (err) {
    return <div className="hero-img-fallback" style={style} />;
  }
  return <img src={src} alt={alt} style={style} onError={() => setErr(true)} />;
}

/**
 * Trang chủ đầy đủ – bao gồm tất cả các section.
 */
export function HomeView({
  filteredProducts,
  wishlist,
  category,
  search,
  tab,
  slide,
  showAll,
  subscribed,
  onShop,
  onAddToCart,
  onToggleWish,
  onSetTab,
  onSetSlide,
  onToggleShowAll,
  onClearFilter,
  onOpenArticle,
  onSubscribe,
  onSection,
}: HomeViewProps) {
  return (
    <>
      <main className="container">
        {/* Hero Layout */}
        <section className="hero-layout">
          {/* Category Sidebar */}
          <aside className="category-sidebar">
            <div className="category-heading">
              <span className="menu-lines">☰</span> Shop by category
            </div>
            <div className="category-links">
              {CATEGORIES.map((c, i) => (
                <button key={c} onClick={() => onShop(c)}>
                  <span className="category-number">0{i + 1}</span>
                  {c}
                  <Icon name="chevron" size={14} />
                </button>
              ))}
            </div>
            <div className="sidebar-note">
              <Icon name="leaf" size={21} />
              <div>
                Thoughtfully made.<br />
                <span>Beautifully worn.</span>
              </div>
            </div>
          </aside>

          {/* Hero Slider */}
          <div className={`hero slide-${slide}`}>
            <HeroImage
              src={HERO_SLIDES[slide]}
              alt="Editorial fashion model in a luxury coat"
              style={{ position: 'absolute', inset: 0, objectPosition: '70% 48%' }}
            />
            <div className="hero-content">
              <span className="eyebrow">THE NEW SEASON, REIMAGINED</span>
              <h1>
                Everyday,<br />
                but <em>extraordinary.</em>
              </h1>
              <p>
                Considered pieces. Endless possibilities.<br />
                Meet your new forever favorites.
              </p>
              <div className="hero-offer">
                <strong>10% OFF</strong>
                <span>
                  YOUR FIRST ORDER<br />
                  <small>Extraordinary style. Reasonable price.</small>
                </span>
              </div>
              <button className="button dark" onClick={() => onShop()}>
                Shop Now <Icon name="arrow" size={17} />
              </button>
            </div>
            <div className="hero-bottom">
              <div className="slide-dots">
                {[0, 1].map((i) => (
                  <button
                    key={i}
                    aria-label={`Show slide ${i + 1}`}
                    className={slide === i ? 'selected' : ''}
                    onClick={() => onSetSlide(i)}
                  />
                ))}
              </div>
              <span>THE WINTER EDIT — 2026</span>
              <div className="slide-controls">
                <button aria-label="Previous slide" onClick={() => onSetSlide(slide ? 0 : 1)}>←</button>
                <button aria-label="Next slide" onClick={() => onSetSlide(slide ? 0 : 1)}>→</button>
              </div>
            </div>
          </div>
        </section>

        {/* Promo Grid */}
        <section className="promo-grid">
          <div className="promo-card winter">
            <div>
              <span className="eyebrow">A SEASON OF POSSIBILITIES</span>
              <h2>Winter Collection <em>2026</em></h2>
              <p>Warm layers. A fresh perspective.</p>
              <button className="text-link" onClick={() => onShop('Outerwear')}>
                Explore the collection <Icon name="arrow" size={17} />
              </button>
            </div>
            <HeroImage src={IMG.street} alt="Winter street style" />
          </div>
          <div className="promo-card member">
            <div>
              <span className="eyebrow">A LITTLE SOMETHING, JUST FOR YOU</span>
              <h2>Good style.<br /><em>Better privileges.</em></h2>
              <p>Preferred member access starts here.</p>
              <button className="text-link" onClick={() => onSection('newsletter')}>
                Become a member <Icon name="arrow" size={17} />
              </button>
            </div>
            <HeroImage src={IMG.detail} alt="Fashion editorial" />
          </div>
        </section>

        {/* Benefits Bar */}
        <section className="benefits">
          {[
            ['truck', 'A little luxury, delivered', 'Free shipping on orders $100+'],
            ['return', 'Find your perfect fit', 'Easy 30-day returns'],
            ['shield', 'Shop with confidence', 'Safe & secure checkout'],
            ['leaf', 'Better by design', 'Mindfully sourced materials'],
          ].map(([icon, title, sub]) => (
            <div key={title}>
              <Icon name={icon as 'truck' | 'return' | 'shield' | 'leaf'} size={26} />
              <div>
                <strong>{title}</strong>
                <span>{sub}</span>
              </div>
            </div>
          ))}
        </section>

        {/* Products Section */}
        <section id="products" className="products-section">
          <div className="section-heading">
            <div>
              <span className="section-kicker"><i /> THE PIECES YOU LOVE</span>
              <h2>Most Popular Products<span className="purple-dot">.</span></h2>
            </div>
            <button className="text-link muted-link" onClick={onToggleShowAll}>
              {showAll ? 'Show favorites' : 'View all products'} <Icon name="arrow" size={17} />
            </button>
          </div>

          <div className="popular-layout">
            {/* Promo cột trái */}
            <div className="popular-promo">
              <HeroImage src={IMG.black} alt="Black silk dress" style={{ position: 'absolute', inset: 0, objectPosition: '45% center' }} />
              <div>
                <span className="eyebrow">THE CULT FAVORITES</span>
                <h3>
                  Find out what<br />everyone&apos;s<br /><em>talking about.</em>
                </h3>
                <button className="round-link" aria-label="Explore all favorites" onClick={() => { onToggleShowAll(); }}>
                  <Icon name="arrow" />
                </button>
              </div>
            </div>

            {/* Lưới sản phẩm */}
            <div className="product-content">
              <div className="product-tabs">
                <button className={tab === 'overview' ? 'selected' : ''} onClick={() => onSetTab('overview')}>
                  COLLECTION OVERVIEW
                </button>
                <button className={tab === 'specs' ? 'selected' : ''} onClick={() => onSetTab('specs')}>
                  FABRIC & SPECS
                </button>
                <span>CURATED FOR YOU</span>
              </div>

              {/* Bộ lọc đang active */}
              {(category !== 'All' || search) && (
                <div className="filter-label">
                  {search ? `Results for "${search}"` : category}
                  <button onClick={onClearFilter}>Clear ×</button>
                </div>
              )}

              {/* Tab Specs */}
              {tab === 'specs' ? (
                <div className="fabric-panel">
                  <Icon name="leaf" size={40} />
                  <h3>Good on you. Kinder to the planet.</h3>
                  <p>
                    Our collection brings together fluid mulberry silk, breathable organic cotton,
                    and responsibly sourced wool. Beautifully finished with considered details,
                    made to stay in your wardrobe.
                  </p>
                  <div>
                    <span>Natural fibers</span>
                    <span>Thoughtful tailoring</span>
                    <span>Made to last</span>
                  </div>
                  <button className="text-link" onClick={() => onSetTab('overview')}>
                    Explore the pieces <Icon name="arrow" />
                  </button>
                </div>
              ) : (
                /* Tab Overview: danh sách sản phẩm */
                <div className="product-grid">
                  {filteredProducts.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      isWished={wishlist.includes(p.id)}
                      onAddToCart={onAddToCart}
                      onToggleWish={onToggleWish}
                    />
                  ))}
                  {filteredProducts.length === 0 && (
                    <p className="no-results">
                      No pieces found. Try searching &quot;silk&quot; or explore another category.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Feature Banner */}
        <section className="feature-banner">
          <div className="feature-image">
            <HeroImage src={IMG.blazer} alt="Modern relaxed tailoring in a sand-colored blazer" />
            <span>THE SIGNATURE SERIES / NO. 01</span>
          </div>
          <div className="feature-copy">
            <span className="eyebrow">CONFIDENCE, BEAUTIFULLY TAILORED</span>
            <h2>A little structure.<br /><em>A lot of presence.</em></h2>
            <p>
              Meet the blazer that moves with you. Impeccably cut,
              effortlessly versatile, and entirely your own.
            </p>
            <button className="button" onClick={() => onShop('Blazers')}>
              Discover Collection <Icon name="arrow" size={17} />
            </button>
            <span className="feature-footnote">TIMELESS BY DESIGN. EXTRAORDINARY BY NATURE.</span>
          </div>
        </section>

        {/* Awards */}
        <section className="awards">
          <span className="section-kicker">A STANDARD WORTH RECOGNIZING</span>
          <h2>Award & Recognition</h2>
          <div className="award-grid">
            {AWARDS.map(({ name, sub, year }) => (
              <div className="award" key={name}>
                <Icon name="award" size={32} />
                <strong>{name}</strong>
                <span>{sub}</span>
                <small>{year}</small>
              </div>
            ))}
          </div>
        </section>

        {/* Brand Story */}
        <section id="story" className="story-section">
          <div className="story-intro">
            <div>
              <span className="section-kicker"><i /> MORE THAN WHAT YOU WEAR</span>
              <h2>The Aura Way<span className="purple-dot">.</span></h2>
            </div>
            <p>
              We believe the best things in life aren&apos;t more things.<br />
              They&apos;re the right things, made the right way.
            </p>
          </div>
          <div className="stats">
            <div><strong>25<span>+</span></strong><p>Years of Tailoring</p></div>
            <div><strong>850M<span>+</span></strong><p>Pieces Crafted with Care</p></div>
            <div><strong>40<span>+</span></strong><p>Countries, One Shared Vision</p></div>
          </div>
          <div className="story-row">
            <HeroImage src={IMG.silk} alt="Aura silk piece craftsmanship" />
            <div className="story-copy">
              <span className="eyebrow">01 / CRAFTED WITH INTENTION</span>
              <h2>Not just made.<br /><em>Thoughtfully made.</em></h2>
              <p>
                It starts with a feeling. The drape of silk, the warmth of wool, the perfect line
                of a seam. We bring thoughtful design and exceptional craftsmanship together.
              </p>
              <button className="text-link" onClick={() => onOpenArticle('Our craftsmanship')}>
                The story behind the seams <Icon name="arrow" size={17} />
              </button>
            </div>
          </div>
          <div className="story-row reverse">
            <HeroImage src={IMG.street} alt="Timeless everyday style" />
            <div className="story-copy">
              <span className="eyebrow">02 / A LIGHTER FOOTPRINT</span>
              <h2>For your wardrobe.<br /><em>For our world.</em></h2>
              <p>
                Style should leave an impression, not a footprint. From responsibly sourced fabrics
                to mindful production, we&apos;re on a journey to do better.
              </p>
              <button className="text-link" onClick={() => onOpenArticle('Our sustainability journey')}>
                Explore our commitments <Icon name="arrow" size={17} />
              </button>
            </div>
          </div>
        </section>

        {/* News Section */}
        <section className="news-section">
          <div className="section-heading">
            <div>
              <span className="section-kicker"><i /> STORIES, STYLE & EVERYTHING BETWEEN</span>
              <h2>Aura In The News<span className="purple-dot">.</span></h2>
            </div>
            <button className="text-link muted-link" onClick={() => onOpenArticle('The Aura Journal')}>
              Visit the journal <Icon name="arrow" size={17} />
            </button>
          </div>
          <div className="news-grid">
            {NEWS_ITEMS.map(({ title, image, tag, date }) => (
              <button className="news-card" key={title} onClick={() => onOpenArticle(title)}>
                <div className="news-image">
                  <HeroImage src={image} alt={title} />
                  <span><Icon name="arrow" size={18} /></span>
                </div>
                <div className="news-meta">
                  <span>{tag}</span>
                  <span>{date}</span>
                </div>
                <h3>{title}</h3>
                <span className="read-story">Read the story <Icon name="arrow" size={14} /></span>
              </button>
            ))}
          </div>
        </section>
      </main>

      {/* Newsletter */}
      <section className="newsletter-band" id="newsletter">
        <div className="container newsletter-inner">
          <div>
            <span className="eyebrow">A LITTLE AURA IN YOUR INBOX</span>
            <h2>Your next favorite thing starts here.</h2>
            <p>Join our world for new collections, style stories, and 10% off your first order.</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); onSubscribe(); }}>
            <div className="email-input">
              <input
                type="email"
                required
                placeholder="Your email address"
                aria-label="Email address"
                disabled={subscribed}
              />
              <button aria-label="Subscribe to newsletter" disabled={subscribed}>
                <Icon name="arrow" />
              </button>
            </div>
            <span>
              {subscribed
                ? 'Welcome to Aura. Your code is AURA10 — enjoy 10% off.'
                : 'Just the good things. Unsubscribe whenever you like.'}
            </span>
          </form>
        </div>
      </section>
    </>
  );
}
