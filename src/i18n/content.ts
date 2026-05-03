export type Locale = 'en' | 'ru' | 'ja';

export interface Review {
  quote: string;
  source: string;
  url: string;
  wide?: boolean;
  stars?: string;
}

export interface BuyLink {
  name: string;
  url: string;
  region: string;
  badge?: string;
  featured?: boolean;
  accent?: boolean;
}

export interface SiteContent {
  meta: {
    title: string;
    description: string;
    lang: string;
  };
  nav: {
    label: string;
  };
  hero: {
    eyebrow: string;
    title: string[];      // line breaks
    subtitle: string[];
    metaPublisher: string;
    metaExtra: string;
    ctaBuy: string;
    ctaAbout: string;
    coverAlt: string;
    coverPlaceholder: string;
  };
  pullquote: string;
  about: {
    eyebrow: string;
    title: string[];
    body: string[];       // paragraphs, supports <em> markers via ** **
    factLangs: string;
    factPages: string;
    factDetails: string;
    imgLabels: [string, string, string];
  };
  press: {
    eyebrow: string;
    title: string;
    reviews: Review[];
  };
  gallery: {
    eyebrow: string;
    title: string;
  };
  artist: {
    eyebrow: string;
    name: string;
    bio: string[];
    cta: string;
    portraitAlt: string;
    portraitPlaceholder: string;
  };
  buy: {
    eyebrow: string;
    title: string;
    links: BuyLink[];
  };
  footer: {
    title: string;
    copyright: string;
  };
}

// ─────────────────────────────────────────────
// ENGLISH
// ─────────────────────────────────────────────
const en: SiteContent = {
  meta: {
    title: 'The Land of Stone Flowers — An Illustrated Book by Sveta Dorosheva',
    description: 'A fairy guide to the mythical human being. Hand-drawn illustrations by Sveta Dorosheva. Published by Chronicle Books. Available worldwide.',
    lang: 'en',
  },
  nav: { label: 'EN' },
  hero: {
    eyebrow: 'Sveta Dorosheva',
    title: ['The Land', 'of Stone', 'Flowers'],
    subtitle: ['A Fairy Guide to the', 'Mythical Human Being'],
    metaPublisher: 'Chronicle Books',
    metaExtra: 'ISBN 978-1-4521-6370-3',
    ctaBuy: 'Where to Buy',
    ctaAbout: 'About the Book',
    coverAlt: 'The Land of Stone Flowers — book cover by Sveta Dorosheva',
    coverPlaceholder: 'Cover Image',
  },
  pullquote: '"Bursting with intricate and evocative illustrations — a world of fantasy and fable that slyly reveals many hidden truths about human existence."',
  about: {
    eyebrow: 'About the Book',
    title: ['What do fairies think', 'of humankind?'],
    body: [
      'In the Land of Stone Flowers, gnomes, pixies, and all manner of fairy folk have long observed the peculiar creatures known as humans — and they have **opinions**.',
      'Through a series of illustrated fables told from the fairy-folk\'s perspective, Sveta Dorosheva turns the mirror on us: our rituals, our contradictions, our surprising capacity for wonder. Classic fairy-tale logic meets sharp, tender wit — and every page is alive with hand-drawn ornament that rewards a second look.',
      'Translated into seven languages. Originally published in Russian as **«Книга, найденная в кувшинке»**.',
    ],
    factLangs: 'languages',
    factPages: 'pages',
    factDetails: 'hidden details',
    imgLabels: ['Spread 1', 'Spread 2', 'Spread 3'],
  },
  press: {
    eyebrow: 'Press & Reviews',
    title: 'What readers are saying',
    reviews: [
      {
        quote: 'Magic that touches even people strongly rooted in logic and objective truth… In the end, all I can say is: Wow. This book is a masterpiece.',
        source: 'GeekDad',
        url: 'https://geekdad.com',
      },
      {
        quote: 'Gorgeous art nouveau illustrations and imaginative tales. You\'ll savor each page.',
        source: 'Refinery29',
        url: 'https://refinery29.com',
      },
      {
        quote: 'The illustrations are hands-down the best part — very detailed and stunning. Sveta Dorosheva has such a great talent in mixing illustrations with the story.',
        source: 'The Cursed Books',
        url: 'https://thecursedbooks.wordpress.com/2018/10/06/book-review-the-land-of-stone-flowers/',
      },
      {
        quote: 'Lush and reminiscent of Aubrey Beardsley — the intricately-lined ornamentation, the luxurious art deco magnificence, beautiful-on-the-verge-of-grotesque.',
        source: 'Goodreads reader',
        url: 'https://www.goodreads.com/book/show/41968801-the-land-of-stone-flowers',
      },
      {
        quote: 'Bursting with intricate and evocative illustrations that draw readers into a world of fantasy and fable — one that slyly reveals many hidden truths about human existence.',
        source: 'Amazon editorial',
        url: 'https://www.amazon.com/dp/1452163707',
        wide: true,
        stars: '★★★★½',
      },
    ],
  },
  gallery: {
    eyebrow: 'Inside the Book',
    title: 'Pages that breathe',
  },
  artist: {
    eyebrow: 'The Artist',
    name: 'Sveta Dorosheva',
    bio: [
      'Sveta Dorosheva is a Ukrainian-Israeli illustrator whose intricate, hand-drawn work draws on Eastern European folk traditions, medieval manuscript art, and a lifelong fascination with the boundary between the seen and unseen world.',
      'Her illustrations have been described as reminiscent of Aubrey Beardsley — dense with ornament, alive with narrative, impossible to take in all at once. She lives and works in Israel.',
    ],
    cta: 'Full Portfolio →',
    portraitAlt: 'Sveta Dorosheva, illustrator',
    portraitPlaceholder: 'Artist\nPortrait',
  },
  buy: {
    eyebrow: 'Get the Book',
    title: 'Available worldwide',
    links: [
      { name: 'Chronicle Books', url: 'https://www.chroniclebooks.com/products/the-land-of-stone-flowers', region: 'United States', badge: 'Publisher', featured: true },
      { name: 'Amazon', url: 'https://www.amazon.com/dp/1452163707', region: 'Worldwide' },
      { name: 'Book Depository', url: 'https://www.bookdepository.com', region: 'Free worldwide shipping' },
      { name: 'Art Prints', url: 'https://www.svetadorosheva.com/prints', region: 'Museum-quality giclée', badge: 'New', accent: true },
    ],
  },
  footer: {
    title: 'The Land of Stone Flowers',
    copyright: 'Illustrations © Sveta Dorosheva. Published by Chronicle Books (USA), Азбука (RU), マール社 (JP).',
  },
};

// ─────────────────────────────────────────────
// RUSSIAN
// ─────────────────────────────────────────────
const ru: SiteContent = {
  meta: {
    title: 'Книга, найденная в кувшинке — Света Дорошева',
    description: 'Сказочный путеводитель по мифическому человеческому существу. Иллюстрированная книга Светы Дорошевой. Издательство Азбука. Доступна на семи языках.',
    lang: 'ru',
  },
  nav: { label: 'РУ' },
  hero: {
    eyebrow: 'Света Дорошева',
    title: ['Книга,', 'найденная', 'в кувшинке'],
    subtitle: ['Сказочный путеводитель', 'по мифическому человеческому существу'],
    metaPublisher: 'Издательство Азбука',
    metaExtra: '7 языков',
    ctaBuy: 'Где купить',
    ctaAbout: 'О книге',
    coverAlt: 'Книга найденная в кувшинке — обложка книги Светы Дорошевой',
    coverPlaceholder: 'Обложка',
  },
  pullquote: '«Интригующие и выразительные иллюстрации — мир фантазии и притчи, в котором скрыты неожиданные истины о человеческом существовании.»',
  about: {
    eyebrow: 'О книге',
    title: ['Что думают эльфы', 'о людях?'],
    body: [
      'В Земле каменных цветов гномы, пикси и все лесные существа давно наблюдают за странными созданиями, которых называют людьми — и у них есть **мнение**.',
      'Через серию сказочных историй Света Дорошева переворачивает зеркало: наши ритуалы, наши противоречия, наша удивительная способность удивляться. Логика народной сказки встречается с тонким остроумием — и каждая страница живёт в мельчайших деталях.',
      'Переведена на семь языков. Оригинальное название — **«Книга, найденная в кувшинке»**.',
    ],
    factLangs: 'языков',
    factPages: 'страниц',
    factDetails: 'деталей',
    imgLabels: ['Разворот 1', 'Разворот 2', 'Разворот 3'],
  },
  press: {
    eyebrow: 'Рецензии',
    title: 'Что говорят читатели',
    reviews: [
      {
        quote: 'Магия, которая трогает даже людей, крепко укоренённых в логике и объективной реальности… В итоге я могу сказать только одно: «Вау». Эта книга — шедевр.',
        source: 'GeekDad',
        url: 'https://geekdad.com',
      },
      {
        quote: 'Потрясающие иллюстрации в стиле ар-нуво и изобретательные истории. Каждую страницу хочется смаковать.',
        source: 'Refinery29',
        url: 'https://refinery29.com',
      },
      {
        quote: 'Иллюстрации — безусловно лучшая часть книги. Очень детальные и поразительные. У Светы Дорошевой удивительный талант сплетать рисунок с историей.',
        source: 'The Cursed Books',
        url: 'https://thecursedbooks.wordpress.com/2018/10/06/book-review-the-land-of-stone-flowers/',
      },
      {
        quote: 'Пышные, напоминающие Обри Бёрдслея — витиеватая орнаментика, роскошное великолепие ар-деко, прекрасное на грани гротескного.',
        source: 'Читатель Goodreads',
        url: 'https://www.goodreads.com/book/show/41968801-the-land-of-stone-flowers',
      },
      {
        quote: 'Изобилует замысловатыми и выразительными иллюстрациями, погружающими читателя в мир фантазии и притчи — мир, который тонко раскрывает скрытые истины о человеческом существовании.',
        source: 'Amazon',
        url: 'https://www.amazon.com/dp/1452163707',
        wide: true,
        stars: '★★★★½',
      },
    ],
  },
  gallery: {
    eyebrow: 'Внутри книги',
    title: 'Страницы, которые дышат',
  },
  artist: {
    eyebrow: 'Художник',
    name: 'Света Дорошева',
    bio: [
      'Света Дорошева — украинско-израильская художница-иллюстратор, чьи детальные рисунки опираются на традиции восточноевропейского фольклора, средневековую книжную иллюминацию и многолетний интерес к границе между видимым и невидимым.',
      'Её иллюстрации сравнивают с Обри Бёрдслеем — плотный орнамент, живое повествование, детали, которые невозможно охватить с первого взгляда. Живёт и работает в Израиле.',
    ],
    cta: 'Полное портфолио →',
    portraitAlt: 'Света Дорошева, художник-иллюстратор',
    portraitPlaceholder: 'Фото\nхудожника',
  },
  buy: {
    eyebrow: 'Купить книгу',
    title: 'Доступна в России и СНГ',
    links: [
      { name: 'Издательство Азбука', url: 'https://www.azbooka.ru', region: 'Россия', badge: 'Издатель', featured: true },
      { name: 'Ozon', url: 'https://www.ozon.ru', region: 'Россия и СНГ' },
      { name: 'Лабиринт', url: 'https://www.labirint.ru', region: 'Бесплатная доставка' },
      { name: 'Художественные принты', url: 'https://www.svetadorosheva.com/prints', region: 'Музейная печать giclée', badge: 'Новинка', accent: true },
    ],
  },
  footer: {
    title: 'Книга, найденная в кувшинке',
    copyright: 'Иллюстрации © Света Дорошева. Издано: Chronicle Books (США), Азбука (РУ), マール社 (ЯП).',
  },
};

// ─────────────────────────────────────────────
// JAPANESE
// ─────────────────────────────────────────────
const ja: SiteContent = {
  meta: {
    title: '石の花の国 — スヴェタ・ドロシェヴァ',
    description: '妖精による人間観察記。スヴェタ・ドロシェヴァの手描きイラスト。マール社より発売。7言語で出版。',
    lang: 'ja',
  },
  nav: { label: '日' },
  hero: {
    eyebrow: 'スヴェタ・ドロシェヴァ',
    title: ['石の花', 'の国'],
    subtitle: ['伝説の人間存在への', '妖精ガイド'],
    metaPublisher: 'マール社',
    metaExtra: '7言語',
    ctaBuy: '購入する',
    ctaAbout: '本について',
    coverAlt: '石の花の国 — スヴェタ・ドロシェヴァの絵本',
    coverPlaceholder: '表紙',
  },
  pullquote: '「精緻で幻想的なイラストの世界 —— 人間存在に関する多くの隠れた真実を巧みに明かすファンタジーと寓話の世界。」',
  about: {
    eyebrow: '本について',
    title: ['妖精は人間を', 'どう見ているか？'],
    body: [
      '石の花の国では、小人、ピクシー、あらゆる妖精たちが「人間」と呼ばれる不思議な生き物を長年観察してきました。そして彼らには、**意見**があります。',
      '妖精の視点から語られる寓話を通じて、スヴェタ・ドロシェヴァは私たちに鏡を向けます。私たちの習慣、矛盾、そして驚く能力。昔話の論理と鋭い機知が出会い、すべてのページが細部に命を宿しています。',
      '7言語に翻訳。ロシア語版のタイトルは**«Книга, найденная в кувшинке»**。',
    ],
    factLangs: '言語',
    factPages: 'ページ',
    factDetails: '細部',
    imgLabels: ['見開き 1', '見開き 2', '見開き 3'],
  },
  press: {
    eyebrow: 'レビュー',
    title: '読者の声',
    reviews: [
      {
        quote: '論理と客観的真実に根ざした人々さえも触れる魔法…最終的に言えるのはただ一つ：「すごい」。この本は傑作です。',
        source: 'GeekDad',
        url: 'https://geekdad.com',
      },
      {
        quote: '美しいアール・ヌーヴォーのイラストと想像力豊かな物語。一ページ一ページを味わいたくなる。',
        source: 'Refinery29',
        url: 'https://refinery29.com',
      },
      {
        quote: 'イラストは間違いなく本の最高の部分——非常に細かく美しい。ドロシェヴァは物語とイラストを融合させる素晴らしい才能を持っています。',
        source: 'The Cursed Books',
        url: 'https://thecursedbooks.wordpress.com/2018/10/06/book-review-the-land-of-stone-flowers/',
      },
      {
        quote: 'オーブリー・ビアズリーを彷彿とさせる繊細な装飾、豪華なアール・デコの壮麗さ、美しくもグロテスクな境界線上にある表現。',
        source: 'Goodreads レビュアー',
        url: 'https://www.goodreads.com/book/show/41968801-the-land-of-stone-flowers',
      },
      {
        quote: '読者をファンタジーと寓話の世界へと引き込む精緻で印象的なイラストに満ちあふれており、人間の存在に関する多くの隠れた真実を巧みに明かしています。',
        source: 'Amazon 編集部',
        url: 'https://www.amazon.co.jp',
        wide: true,
        stars: '★★★★½',
      },
    ],
  },
  gallery: {
    eyebrow: '本の中へ',
    title: '息づくページ',
  },
  artist: {
    eyebrow: 'アーティスト',
    name: 'スヴェタ・ドロシェヴァ',
    bio: [
      'スヴェタ・ドロシェヴァはウクライナ系イスラエル人のイラストレーター。その緻密な手描きの作品は、東欧の民俗芸術の伝統、中世の写本装飾、そして見えるものと見えないものの境界への長年の探求に根ざしています。',
      'そのイラストはオーブリー・ビアズリーに例えられることが多い——装飾が密で、物語に満ち、一度では到底すべてを把握できない。イスラエルを拠点に活動。',
    ],
    cta: 'ポートフォリオを見る →',
    portraitAlt: 'スヴェタ・ドロシェヴァ、イラストレーター',
    portraitPlaceholder: 'アーティスト\n写真',
  },
  buy: {
    eyebrow: '購入する',
    title: '日本全国でお求めいただけます',
    links: [
      { name: 'マール社', url: 'https://www.maar.com', region: '日本', badge: '出版社', featured: true },
      { name: 'Amazon.co.jp', url: 'https://www.amazon.co.jp', region: '日本全国' },
      { name: 'honto', url: 'https://honto.jp', region: '電子書籍・紙' },
      { name: 'アートプリント', url: 'https://www.svetadorosheva.com/prints', region: '美術館品質ジクレー', badge: '新発売', accent: true },
    ],
  },
  footer: {
    title: '石の花の国',
    copyright: 'イラスト © スヴェタ・ドロシェヴァ。出版：Chronicle Books（米）、Азбука（露）、マール社（日）。',
  },
};

export const content: Record<Locale, SiteContent> = { en, ru, ja };
