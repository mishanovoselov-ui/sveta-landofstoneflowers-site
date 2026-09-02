'use client';

import { useEffect, useState, type CSSProperties } from 'react';

const BUY_URL = 'https://www.amazon.com/dp/1452163707';

const stations = [
  { number: 'I', label: 'Anatomy', title: 'The improbable human body', text: 'A field guide to the odd construction, habits, and vulnerabilities of the mythical human being.', image: '/archive/anatomy.jpg', alt: 'An illustrated book spread examining what a human is' },
  { number: 'II', label: 'Rituals', title: 'Customs nobody can explain', text: 'Why humans gather, celebrate, work, worry, dance, and repeat the same mysterious ceremonies.', image: '/archive/faces.jpg', alt: 'A book spread showing many illustrated types of human beings' },
  { number: 'III', label: 'Moods', title: 'The invisible hats', text: 'Fairy observers conclude that every human wears an unseen hat that changes the world beneath it.', image: '/archive/music.jpg', alt: 'A richly colored illustrated spread about music' },
  { number: 'IV', label: 'Belief', title: 'Evidence that people exist', text: 'A playful archive of clues assembled by creatures who remain understandably skeptical about us.', image: '/archive/roses.jpg', alt: 'A hand-lettered book spread with red roses' },
];

const awards = [
  ['2024', 'World Illustration Awards', 'Winner · Professional Category'],
  ['2024', 'Communication Arts', 'Award of Excellence'],
  ['2024', 'American Illustration 43', 'Chosen Winner'],
  ['2024', 'V&A Illustration Awards', 'Shortlist'],
  ['2018', 'World Illustration Awards', 'Two shortlists'],
  ['2017', 'Global Illustration Award', 'Honorary Mention'],
  ['2016', 'Hiii Illustration', 'Best of the Best'],
];

const markets = [
  ['RU', 'Russia', 'Азбука'], ['US', 'United States', 'Chronicle Books'], ['JP', 'Japan', 'Maar-sha'],
  ['RO', 'Romania', 'Baroque Books'], ['CN', 'China', 'Chinese edition'], ['CZ', 'Czechia', 'Omega'],
  ['RS', 'Serbia', 'Dereta'], ['AL', 'Albania', 'Licensed territory'], ['AR', 'Arabic', 'Language rights'],
];

function Lily({ small = false }: { small?: boolean }) {
  return <span className={`lily${small ? ' lily--small' : ''}`} aria-hidden="true"><i /><i /><i /><i /><i /><b /></span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeStage, setActiveStage] = useState(0);

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
        <a className="head__brand" href="#top"><span aria-hidden="true">✦</span> Land of Stone Flowers</a>
        <a className="head__buy" href={BUY_URL} target="_blank" rel="noreferrer">Where to buy</a>
        <button className={`head__menu${menuOpen ? ' is-open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Open navigation" aria-expanded={menuOpen}><i /><i /></button>
        <nav className={`menu${menuOpen ? ' is-open' : ''}`} aria-label="Site navigation">
          <a href="#book" onClick={() => setMenuOpen(false)}>The book</a>
          <a href="#journey" onClick={() => setMenuOpen(false)}>Fairy findings</a>
          <a href="#awards" onClick={() => setMenuOpen(false)}>Awards</a>
          <a href="#editions" onClick={() => setMenuOpen(false)}>Editions</a>
          <a href="#artist" onClick={() => setMenuOpen(false)}>The artist</a>
        </nav>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <img className="hero__image" src="/archive/header-new.jpg" alt="An illustrated woman holding a red flower beneath an extraordinary tower-like headdress" />
        <div className="hero__veil" aria-hidden="true" />
        <div className="hero__copy">
          <p>Sveta Dorosheva</p>
          <h1 id="hero-title"><span>The Land of</span>Stone Flowers</h1>
          <h2>A fairy guide to the mythical human being</h2>
        </div>
        <div className="hero__garland" aria-hidden="true">
          <span className="garland__line" />
          <span className="garland__leaf garland__leaf--one" />
          <Lily small /><Lily /><Lily small />
          <span className="garland__leaf garland__leaf--two" />
        </div>
        <a className="hero__scroll" href="#book">Open the book <span aria-hidden="true">↓</span></a>
      </section>

      <section className="book-reveal" id="book">
        <div className="book-reveal__copy">
          <p className="eyebrow">The English edition</p>
          <h2>A book about people,<br />written by fairies.</h2>
          <p>Discovered in a water lily under mysterious circumstances, this illustrated field guide gathers fairy evidence that humans really do exist.</p>
          <dl>
            <div><dt>Published</dt><dd>Chronicle Books</dd></div>
            <div><dt>Format</dt><dd>Hardcover · 216 pages</dd></div>
            <div><dt>ISBN</dt><dd>978-1-4521-6370-3</dd></div>
          </dl>
        </div>
        <figure className="book-reveal__cover"><span className="book-reveal__halo" /><img src="/archive/english-cover.jpg" alt="The blue and gold English cover of The Land of Stone Flowers" /></figure>
      </section>

      <section className="journey" id="journey">
        <div className="journey__visual" style={{ '--journey-progress': `${(activeStage + 1) * 25}%` } as CSSProperties}>
          <p className="eyebrow">The fairy evidence</p>
          <div className="vine" aria-hidden="true"><span className="vine__grown" />{stations.map((_, index) => <span key={index} className={`vine__node vine__node--${index + 1}${index <= activeStage ? ' is-grown' : ''}`}><Lily small /></span>)}</div>
          <div className="journey__index"><span>0{activeStage + 1}</span><i />04</div>
        </div>
        <div className="journey__stations">
          {stations.map((station, index) => (
            <article className={`journey__station${index === activeStage ? ' is-active' : ''}`} key={station.label}>
              <p>{station.number} · {station.label}</p><h2>{station.title}</h2><figure className="station__image"><img src={station.image} alt={station.alt} loading="lazy" /></figure><div className="station__lily"><Lily /></div><p>{station.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="lily-world" aria-label="The world of the water lily">
        <img src="/archive/water-lily.jpg" alt="A tiny fairy seated among immense pink water lilies" loading="lazy" />
        <p>Discovered in a water lily<br />under mysterious circumstances.</p>
      </section>

      <section className="facts" aria-label="Book facts">
        <article><span>7</span><h2>languages</h2><p>One strange human world, translated for readers across cultures.</p></article>
        <article><span>216</span><h2>illustrated pages</h2><p>Dense with hand-drawn borders, evidence, specimens, and visual jokes.</p></article>
        <article><span>∞</span><h2>hidden details</h2><p>A book designed to be revisited, wandered through, and looked at twice.</p></article>
      </section>

      <section className="spreads" id="inside">
        <div className="section-head"><p className="eyebrow">Inside the book</p><h2>Every page is<br />another world.</h2></div>
        <div className="spreads__grid"><img src="/archive/types.jpg" alt="Types of human beings, an illustrated book spread" loading="lazy" /><img src="/archive/black-white.jpg" alt="Black-and-white illustrated book spread" loading="lazy" /><img src="/archive/refusal.jpg" alt="Colorful illustrated field notes from the book" loading="lazy" /><img src="/archive/wizards.jpg" alt="The Wizards, a blue illustrated book spread" loading="lazy" /></div>
        <figure className="spreads__life"><img src="/hero/images.png" alt="Three views of a reader with The Land of Stone Flowers" loading="lazy" /><figcaption>Made to live with, not just to sit on a shelf.</figcaption></figure>
      </section>

      <section className="awards" id="awards">
        <div className="section-head"><p className="eyebrow">Selected recognition</p><h2>Awarded<br />imagination.</h2><p className="section-note">These distinctions recognize Sveta Dorosheva&apos;s wider illustration practice. The book itself was nominated for Russia&apos;s National Bestseller award in 2015.</p></div>
        <div className="awards__list">{awards.map(([year, name, result]) => <div key={`${year}-${name}`}><span>{year}</span><h3>{name}</h3><p>{result}</p></div>)}</div>
      </section>

      <section className="press">
        <p className="eyebrow">Press &amp; readers</p>
        <div className="press__grid">
          <a href="https://geekdad.com" target="_blank" rel="noreferrer"><span>GeekDad</span><p>“In the end, all I can say is: Wow. This book is a masterpiece.”</p><i>↗</i></a>
          <a href="https://refinery29.com" target="_blank" rel="noreferrer"><span>Refinery29</span><p>“Gorgeous art nouveau illustrations and imaginative tales.”</p><i>↗</i></a>
          <a href="https://www.goodreads.com/book/show/41968801-the-land-of-stone-flowers" target="_blank" rel="noreferrer"><span>Goodreads</span><p>“Intricately-lined ornamentation and beautiful-on-the-verge-of-grotesque magnificence.”</p><i>↗</i></a>
        </div>
      </section>

      <section className="editions" id="editions">
        <div className="section-head"><p className="eyebrow">Around the world</p><h2>Many covers.<br />One hidden book.</h2><p className="section-note">Published editions and licensed territories. Availability and imprint vary by market.</p></div>
        <img className="editions__image" src="/archive/editions.jpg" alt="Four international editions of The Land of Stone Flowers" loading="lazy" />
        <div className="editions__grid">{markets.map(([code, country, publisher]) => <article key={code}><span>{code}</span><h3>{country}</h3><p>{publisher}</p></article>)}</div>
      </section>

      <section className="artist" id="artist">
        <img src="/hero/hero1.png" alt="A reader holding the blue and gold edition of The Land of Stone Flowers" loading="lazy" />
        <div className="artist__copy"><p className="eyebrow">The artist</p><h2>Sveta<br />Dorosheva</h2><p>Ukrainian-born and based in Israel, Sveta creates intricate, hand-drawn narrative art on paper. Myth, folk tradition, medieval manuscripts, and the contradictions of human nature meet in her work.</p>
          <div className="socials"><a href="https://svetadorosheva.com" target="_blank" rel="noreferrer">Portfolio ↗</a><a href="https://www.instagram.com/sveta_dorosheva_/" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://www.behance.net/lattona" target="_blank" rel="noreferrer">Behance ↗</a><a href="https://www.facebook.com/draw.lattona" target="_blank" rel="noreferrer">Facebook ↗</a></div>
        </div>
      </section>

      <section className="buy"><Lily /><p className="eyebrow">Bring the story home</p><h2>The door to the fairy realm<br />is already open.</h2><a href={BUY_URL} target="_blank" rel="noreferrer">Get the book <span>↗</span></a></section>
      <footer className="footer"><p className="footer__title">The Land of Stone Flowers</p><p>Illustrations © Sveta Dorosheva<br />Published by Chronicle Books</p><div><a href="https://landofstoneflowers.com/">EN</a><a href="https://landofstoneflowers.com/ru/">RU</a><a href="https://landofstoneflowers.com/ja/">JP</a></div></footer>
    </main>
  );
}
