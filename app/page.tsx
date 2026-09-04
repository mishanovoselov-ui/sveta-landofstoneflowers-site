'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

const PROJECT_URL = 'https://www.svetadorosheva.com/project/the-land-of-stone-flower';
const SHOP_URL = 'https://so-called.me/collections/sveta-dorosheva';

type AnalyticsEvent = 'page_view' | 'cta_click';

function track(event: AnalyticsEvent, location = 'page') {
  if (typeof window === 'undefined') return;
  const body = JSON.stringify({ event, location, path: `${window.location.pathname}${window.location.hash}` });
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/analytics', new Blob([body], { type: 'application/json' }));
    return;
  }
  void fetch('/api/analytics', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true });
}

const stations = [
  { number: 'I', label: 'Anatomy', title: 'The improbable human body', text: 'Keen fairy observations and wonderfully wild assumptions about the unlikely construction of human beings.', image: '/archive/anatomy.jpg', alt: 'An illustrated book spread examining what a human is', width: 1900, height: 1206 },
  { number: 'II', label: 'Rituals', title: 'Customs nobody can explain', text: 'A topsy-turvy study of human customs, rituals, languages, dwellings, and other puzzling habits.', image: '/archive/faces.jpg', alt: 'A book spread showing many illustrated types of human beings', width: 1900, height: 1217 },
  { number: 'III', label: 'Moods', title: 'The invisible hats', text: 'Invisible hats called moods cloud the way humans see themselves, one another, and the world.', image: '/archive/music.jpg', alt: 'A richly colored illustrated spread about music', width: 1900, height: 1134 },
  { number: 'IV', label: 'Belief', title: 'Evidence that people exist', text: 'Fantasy and fable become a sly mirror, revealing hidden truths about the strange human world.', image: '/archive/roses.jpg', alt: 'A hand-lettered book spread with red roses', width: 1900, height: 1139 },
];

const awards = [
  { year: '2024', mark: 'WIA', logo: '/awards/world-illustration-awards.png', name: 'World Illustration Awards', result: 'Professional Advertising Winner', href: 'https://theaoi.com/news/the-world-illustration-awards-2024-winners-are-announced-2' },
  { year: '2024', mark: 'CA', logo: '/awards/communication-arts.png', name: 'Communication Arts', result: 'Award of Excellence', href: 'https://www.commarts.com/competition/2024-illustration' },
  { year: '2024', mark: 'AI–AP', logo: '/awards/american-illustration.png', name: 'American Illustration 43', result: 'Chosen Winner', href: 'https://www.ai-ap.com/slideshow/AI/43/?status=chosen' },
  { year: '2024', mark: 'V&A', name: 'V&A Illustration Awards', result: 'Shortlist', href: 'https://www.vam.ac.uk/blog/museum-life/va-illustration-awards-2024-the-shortlists' },
  { year: '2018', mark: 'WIA', logo: '/awards/world-illustration-awards.png', name: 'World Illustration Awards', result: 'Two shortlists', href: 'https://theaoi.com/news/wia2018-shortlist-announced' },
  { year: '2017', mark: 'GIA', name: 'Global Illustration Award', result: 'Honorary Mention', href: 'https://www.svetadorosheva.com/about-me' },
  { year: '2016', mark: 'Hiii', name: 'Hiii Illustration', result: 'Best of the Best', href: 'https://www.svetadorosheva.com/about-me' },
];

const markets = [
  ['RU', 'Russia', 'Азбука'], ['US', 'United States', 'Chronicle Books'], ['JP', 'Japan', 'Maar-sha'],
  ['RO', 'Romania', 'Baroque Books'], ['CN', 'China', 'Chinese edition'], ['CZ', 'Czechia', 'Omega'],
  ['RS', 'Serbia', 'Dereta'], ['AL', 'Albania', 'Licensed territory'], ['AR', 'Arabic', 'Language rights'],
];

const products = [
  { title: 'Bike', price: '$42', image: '/products/bike.webp', width: 720, height: 720, href: 'https://so-called.me/products/bike', alt: 'White joggers featuring Sveta Dorosheva’s hand-drawn cyclist illustration' },
  { title: 'Froggish', price: '$38', image: '/products/froggish.jpg', width: 720, height: 960, href: 'https://so-called.me/products/froggish', alt: 'Peach cropped T-shirt featuring Sveta Dorosheva’s hand-painted frog' },
  { title: 'Octopus', price: '$39', image: '/products/octopus.webp', width: 720, height: 720, href: 'https://so-called.me/products/octopus', alt: 'White shorts featuring Sveta Dorosheva’s octopus and fish illustration' },
  { title: 'Merpeople', price: '$44', image: '/products/merpeople.webp', width: 720, height: 720, href: 'https://so-called.me/products/merpeople', alt: 'White swimsuit featuring Sveta Dorosheva’s merpeople illustration' },
  { title: 'Merrygoround', price: '$45', image: '/products/merrygoround.webp', width: 720, height: 720, href: 'https://so-called.me/products/merrygoround', alt: 'White joggers featuring Sveta Dorosheva’s red character illustration' },
  { title: 'Lily Pond', price: '$83', image: '/products/lily-pond.jpg', width: 720, height: 960, href: 'https://so-called.me/products/lily-pond', alt: 'Framed Lily Pond print by Sveta Dorosheva' },
];

function Lily({ small = false }: { small?: boolean }) {
  return <span className={`lily${small ? ' lily--small' : ''}`} aria-hidden="true"><i /><i /><i /><i /><i /><b /></span>;
}

function ProjectLink({ label = 'Original project' }: { label?: string }) {
  return <a className="project-link" href={PROJECT_URL} target="_blank" rel="noreferrer">{label}</a>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeStage, setActiveStage] = useState(0);
  const productRail = useRef<HTMLDivElement>(null);

  const scrollProducts = (direction: -1 | 1) => {
    const rail = productRail.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>('.product-card');
    rail.scrollBy({ left: direction * ((card?.offsetWidth ?? rail.clientWidth * 0.8) + 20), behavior: 'smooth' });
  };

  useEffect(() => {
    track('page_view');

    const click = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[data-track]');
      if (!anchor) return;
      track('cta_click', anchor.dataset.track || 'page');
    };
    document.addEventListener('click', click);

    return () => {
      document.removeEventListener('click', click);
    };
  }, []);

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('.journey__station'));
    const update = () => {
      const target = window.innerHeight * 0.52;
      let nearest = 0;
      let distance = Infinity;
      items.forEach((item, index) => {
        const d = Math.abs(item.getBoundingClientRect().top - target);
        if (d < distance) { distance = d; nearest = index; }
      });
      setActiveStage(nearest);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  return (
    <main>
      <header className="head">
        <a className="head__brand" href="#top">Land of Stone Flowers</a>
        <button className={`head__menu${menuOpen ? ' is-open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Open navigation" aria-expanded={menuOpen}><i /><i /></button>
        <nav className={`menu${menuOpen ? ' is-open' : ''}`} aria-label="Site navigation">
          <a href="#book" onClick={() => setMenuOpen(false)}>The book</a>
          <a href="#journey" onClick={() => setMenuOpen(false)}>Fairy findings</a>
          <a href="#awards" onClick={() => setMenuOpen(false)}>Awards</a>
          <a href="#editions" onClick={() => setMenuOpen(false)}>Editions</a>
          <a href="#artist" onClick={() => setMenuOpen(false)}>The artist</a>
          <a href="#shop" onClick={() => setMenuOpen(false)}>Shop</a>
          <a href={PROJECT_URL} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>Original project</a>
        </nav>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <img className="hero__image" src="/archive/header-new.jpg" width="1900" height="1254" fetchPriority="high" alt="An illustrated woman holding a red flower beneath an extraordinary tower-like headdress" />
        <div className="hero__veil" aria-hidden="true" />
        <div className="hero__copy">
          <p><a href={PROJECT_URL} target="_blank" rel="noreferrer">Sveta Dorosheva</a></p>
          <h1 id="hero-title"><span>The Land of</span><strong>Stone Flowers</strong></h1>
          <h2>A fairy guide to the mythical human being</h2>
        </div>
      </section>

      <section className="book-reveal" id="book">
        <div className="book-reveal__copy">
          <p className="eyebrow">The English edition</p>
          <h2>A book about people,<br />written by fairies.</h2>
          <p>A genre-defying artist book about humans and their world, observed by gnomes, pixies, and other fairy creatures.</p>
          <ProjectLink label="Read Sveta’s project story" />
          <dl>
            <div><dt>Published</dt><dd>Chronicle Books</dd></div>
            <div><dt>Format</dt><dd>Hardcover · 216 pages</dd></div>
            <div><dt>ISBN</dt><dd>978-1-4521-6370-3</dd></div>
          </dl>
        </div>
        <figure className="book-reveal__cover"><img src="/archive/english-cover.jpg" width="1900" height="2198" alt="The blue and gold English cover of The Land of Stone Flowers" /></figure>
      </section>

      <section className="journey" id="journey">
        <div className="journey__visual" style={{ '--journey-progress': `${18 + activeStage * 25}%` } as CSSProperties}>
          <p className="eyebrow">The fairy evidence</p>
          <div className="vine" aria-hidden="true"><span className="vine__grown" />{stations.map((_, index) => <span key={index} className={`vine__node vine__node--${index + 1}${index < activeStage ? ' is-past' : index === activeStage ? ' is-active' : ''}`}><Lily small /></span>)}</div>
          <div className="journey__index"><span>0{activeStage + 1}</span><i />04</div>
        </div>
        <div className="journey__stations">
          {stations.map((station, index) => (
            <article className={`journey__station${index === activeStage ? ' is-active' : ''}`} key={station.label}>
              <p>{station.number} · {station.label}</p><h2>{station.title}</h2><figure className="station__image"><img src={station.image} width={station.width} height={station.height} alt={station.alt} loading="lazy" decoding="async" /></figure><div className="station__lily"><Lily /></div><p>{station.text}</p><ProjectLink />
            </article>
          ))}
        </div>
      </section>

      <section className="lily-world" aria-label="The world of the water lily">
        <img src="/archive/water-lily.jpg" width="1900" height="1268" alt="A tiny fairy seated among immense pink water lilies" loading="lazy" decoding="async" />
        <p>Discovered in a water lily<br />under mysterious circumstances.</p>
      </section>

      <section className="facts" aria-label="Book facts">
        <article><span>7</span><h2>translations</h2><p>Published in seven languages for readers across cultures.</p></article>
        <article><span>216</span><h2>illustrated pages</h2><p>Dense with hand-drawn borders, evidence, specimens, and visual jokes.</p></article>
        <article><span>∞</span><h2>hidden details</h2><p>A book designed to be revisited, wandered through, and looked at twice.</p></article>
      </section>

      <section className="spreads" id="inside">
        <div className="section-head"><p className="eyebrow">Inside the book</p><h2>Every page is<br />another world.</h2></div>
        <div className="spreads__grid"><img src="/archive/types.jpg" width="1900" height="1204" alt="Types of human beings, an illustrated book spread" loading="lazy" decoding="async" /><img src="/archive/black-white.jpg" width="1900" height="1290" alt="Black-and-white illustrated book spread" loading="lazy" decoding="async" /><img src="/archive/refusal.jpg" width="1900" height="1129" alt="Colorful illustrated field notes from the book" loading="lazy" decoding="async" /><img src="/archive/wizards.jpg" width="1900" height="1158" alt="The Wizards, a blue illustrated book spread" loading="lazy" decoding="async" /></div>
        <figure className="spreads__life"><img src="/hero/images.png" width="1186" height="662" alt="Three views of a reader with The Land of Stone Flowers" loading="lazy" decoding="async" /><figcaption>Made to live with, not just to sit on a shelf.</figcaption></figure>
        <div className="spreads__action"><a href={SHOP_URL} target="_blank" rel="noreferrer" data-track="inside-shop">Shop the collection</a><p>The book is not currently for sale. Illustrated products are available at So-called.</p></div>
      </section>

      <section className="awards" id="awards">
        <div className="section-head"><p className="eyebrow">Selected recognition</p><h2>Awarded<br />imagination.</h2><p className="section-note">These distinctions recognize Sveta Dorosheva&apos;s wider illustration practice. The book itself was nominated for Russia&apos;s National Bestseller award in 2015.</p></div>
        <div className="awards__list">{awards.map(({ year, name, result, href }) => <a key={`${year}-${name}`} href={href} target="_blank" rel="noreferrer" aria-label={`${name}: ${result}`}><span className="award__year">{year}</span><h3>{name}</h3><p>{result}</p></a>)}</div>
      </section>

      <section className="press">
        <p className="eyebrow">Press &amp; readers</p>
        <div className="press__grid">
          <a href="https://geekdad.com" target="_blank" rel="noreferrer"><span>GeekDad</span><p>“In the end, all I can say is: Wow. This book is a masterpiece.”</p></a>
          <a href="https://refinery29.com" target="_blank" rel="noreferrer"><span>Refinery29</span><p>“Gorgeous art nouveau illustrations and imaginative tales.”</p></a>
          <a href="https://www.goodreads.com/book/show/41968801-the-land-of-stone-flowers" target="_blank" rel="noreferrer"><span>Goodreads</span><p>“Intricately-lined ornamentation and beautiful-on-the-verge-of-grotesque magnificence.”</p></a>
        </div>
      </section>

      <section className="editions" id="editions">
        <div className="section-head"><p className="eyebrow">Around the world</p><h2>Many covers.<br />One hidden book.</h2><p className="section-note">Most editions are now out of print. A limited number of copies may still be found in parts of Asia. The book is not currently offered for general sale.</p><p className="editions__count"><strong>7</strong><span>translations<br />worldwide</span></p><ProjectLink label="See the original book project" /></div>
        <img className="editions__image" src="/archive/editions.jpg" width="1900" height="2283" alt="Four international editions of The Land of Stone Flowers" loading="lazy" decoding="async" />
        <div className="editions__grid">{markets.map(([code, country, publisher]) => <article key={code}><span>{code}</span><h3>{country}</h3><p>{publisher}</p></article>)}</div>
      </section>

      <section className="artist" id="artist">
        <figure className="artist__portrait"><img src="/archive/sveta-dorosheva-author.jpg" width="1600" height="1129" alt="Sveta Dorosheva holding an illustrated book outdoors" loading="lazy" decoding="async" /><figcaption>Courtesy of Sveta Dorosheva</figcaption></figure>
        <div className="artist__copy"><p className="eyebrow">The artist</p><h2>Sveta<br />Dorosheva</h2><p>Ukrainian-born and based in Israel, Sveta creates intricate, hand-drawn narrative art on paper. Myth, folk tradition, medieval manuscripts, and the contradictions of human nature meet in her work.</p>
          <div className="socials"><a href={PROJECT_URL} target="_blank" rel="noreferrer">Book project</a><a href="https://www.svetadorosheva.com/" target="_blank" rel="noreferrer">Artist website</a><a href={SHOP_URL} target="_blank" rel="noreferrer" data-track="artist-shop">Shop</a><a href="https://www.instagram.com/sveta_dorosheva_/" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.behance.net/lattona" target="_blank" rel="noreferrer">Behance</a><a href="https://www.facebook.com/draw.lattona" target="_blank" rel="noreferrer">Facebook</a></div>
        </div>
      </section>

      <section className="products" id="shop" aria-labelledby="products-title">
        <div className="products__head">
          <div><p className="eyebrow">Sveta Dorosheva × So-called</p><h2 id="products-title">The drawings<br />leave the page.</h2></div>
          <p>A selection of products carrying Sveta’s original hand-drawn illustrations. Each card opens the current product page at So-called.</p>
        </div>
        <div className="products__rail" ref={productRail} role="region" aria-label="Illustrated product carousel" tabIndex={0}>
          {products.map((product) => (
            <a className="product-card" href={product.href} target="_blank" rel="noreferrer" data-track={`product-${product.title.toLowerCase().replaceAll(' ', '-')}`} key={product.href}>
              <figure><img src={product.image} width={product.width} height={product.height} alt={product.alt} loading="lazy" decoding="async" /></figure>
              <div><h3>{product.title}</h3><p>{product.price}</p></div>
            </a>
          ))}
        </div>
        <div className="products__footer"><p>Artwork © Sveta Dorosheva · Products by So-called</p><div><button type="button" onClick={() => scrollProducts(-1)}>Previous</button><button type="button" onClick={() => scrollProducts(1)}>Next</button></div></div>
      </section>

      <section className="shop">
        <div className="shop__intro"><Lily /><p className="eyebrow">Available now</p><h2>The art continues<br />beyond the book.</h2><p>The book is not currently for sale. Explore Sveta Dorosheva’s original project, or shop illustrated products at So-called.</p></div>
        <div className="shop__links"><a href={SHOP_URL} target="_blank" rel="noreferrer" data-track="shop-section">Shop the collection</a><a href={PROJECT_URL} target="_blank" rel="noreferrer">View the original book project</a></div>
      </section>
      <footer className="footer"><p className="footer__title"><a href={PROJECT_URL} target="_blank" rel="noreferrer">The Land of Stone Flowers</a></p><p>Story &amp; illustrations © <a href={PROJECT_URL} target="_blank" rel="noreferrer">Sveta Dorosheva</a><br />Published by Chronicle Books</p><div><a href={SHOP_URL} target="_blank" rel="noreferrer" data-track="footer-shop">Shop</a><a href={PROJECT_URL} target="_blank" rel="noreferrer">Original project</a><a href="/llms.txt">LLM guide</a><a href="/sitemap.xml">Sitemap</a></div></footer>
    </main>
  );
}
