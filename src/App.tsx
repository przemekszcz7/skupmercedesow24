import { useEffect, useState, useRef } from 'react';

interface ModelItem {
  id: string;
  name: string;
  sub: string;
}

interface ChecklistItem {
  id: string;
  text: string;
}

interface WhyItem {
  num: string;
  title: string;
  desc: string;
}

interface StepItem {
  num: string;
  name: string;
  desc: string;
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // References for smooth scrolling
  const sectionRefs = {
    home: useRef<HTMLElement>(null),
    modele: useRef<HTMLElement>(null),
    warunki: useRef<HTMLElement>(null),
    kontakt: useRef<HTMLElement>(null),
    dlaczego: useRef<HTMLElement>(null),
  };

  const scrollToSection = (sectionKey: keyof typeof sectionRefs) => {
    setMobileMenuOpen(false);
    const ref = sectionRefs[sectionKey];
    if (ref && ref.current) {
      const offset = 72; // Nav height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = ref.current.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Scroll Reveal hook using IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const models: ModelItem[] = [
    { id: 'w210', name: 'W210', sub: 'okularnik · diesel' },
    { id: 'w203', name: 'W203', sub: 'klasa c · diesel' },
    { id: 'w211', name: 'W211', sub: 'klasa e · diesel' },
    { id: 'w202', name: 'W202', sub: 'klasa c · diesel' },
    { id: 'w209', name: 'W209', sub: 'clk · diesel' },
    { id: 'ml', name: 'ML', sub: 'suv · diesel' },
    { id: 'sprinter', name: 'SPRINTER', sub: 'dostawczy · diesel' },
  ];

  const conditionsChecklist: ChecklistItem[] = [
    { id: 'cond1', text: 'Diesel — każdy stan' },
    { id: 'cond2', text: 'Rdza to nie problem' },
    { id: 'cond3', text: 'Po kolizji i dachowaniu' },
    { id: 'cond4', text: 'Nie odpala — żaden problem' },
    { id: 'cond5', text: 'Brak OC i przeglądu' },
    { id: 'cond6', text: 'Długo stał na podwórku' },
    { id: 'cond7', text: 'Wyciągnięty z rowu' },
    { id: 'cond8', text: 'Zmęczony, zniszczony, stary' },
  ];

  const whyRows: WhyItem[] = [
    {
      num: '01',
      title: 'Szybka decyzja i gotówka',
      desc: 'bez oglądania błotników i zbędnego marudzenia',
    },
    {
      num: '02',
      title: 'Własny transport',
      desc: 'przyjeżdżam z lawetą — nawet bez kół, nawet z rowu',
    },
    {
      num: '03',
      title: 'Święty spokój',
      desc: 'pozbywasz się problemu legalnie i błyskawicznie',
    },
  ];

  const steps: StepItem[] = [
    {
      num: '1',
      name: 'NAPISZ',
      desc: 'Wyślij: «Mam Mercedesa» + zdjęcie auta',
    },
    {
      num: '2',
      name: 'WYCENA',
      desc: 'Szybka decyzja — bez zbędnego gadania',
    },
    {
      num: '3',
      name: 'GOTÓWKA',
      desc: 'Przyjeżdżam, płacę, zabieram — gotowe',
    },
  ];

  return (
    <div className="font-body">
      
      {/* Sticky Navigation */}
      <nav id="nav" className="navbar">
        <a href="#home" className="nav-logo-group" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
          <img 
            src="https://i.ibb.co/nqmsFsrW/497018678-122094962966908194-7901224603509678252-n.jpg" 
            alt="Logo Skup Mercedesów 24/7" 
            className="nav-logo-img"
          />
          <div className="nav-logo-text">
            <span className="nav-brand-title">SKUP MERCEDESÓW</span>
            <span className="nav-brand-subtitle">24/7 · Łódź · Cała Polska</span>
          </div>
        </a>

        {/* Desktop Menu */}
        <ul className="nav-menu">
          <li><span onClick={() => scrollToSection('home')} className="nav-link">Skup</span></li>
          <li><span onClick={() => scrollToSection('modele')} className="nav-link">Modele</span></li>
          <li><span onClick={() => scrollToSection('warunki')} className="nav-link">Warunki</span></li>
          <li><span onClick={() => scrollToSection('kontakt')} className="nav-link">Kontakt</span></li>
        </ul>

        {/* Call CTA Pin */}
        <span onClick={() => scrollToSection('kontakt')} className="nav-cta-btn">
          <i className="fa-solid fa-phone"></i> ZADZWOŃ 24/7
        </span>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setMobileMenuOpen(true)} 
          className="hamburger-btn"
          aria-label="Menu"
          id="hamburger-trigger"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </nav>

      {/* Mobile Fullscreen Navigation Overlay */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`} id="mobile-menu-overlay">
        <button 
          onClick={() => setMobileMenuOpen(false)} 
          className="mobile-menu-close-btn"
          aria-label="Zamknij"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <span onClick={() => scrollToSection('home')} className="mobile-menu-link">SKUP</span>
        <span onClick={() => scrollToSection('modele')} className="mobile-menu-link">MODELE</span>
        <span onClick={() => scrollToSection('warunki')} className="mobile-menu-link">WARUNKI</span>
        <span onClick={() => scrollToSection('kontakt')} className="mobile-menu-link">KONTAKT</span>
        
        <span 
          onClick={() => scrollToSection('kontakt')} 
          className="nav-cta-btn" 
          style={{ marginTop: '24px', padding: '16px 36px', fontSize: '1.2rem' }}
        >
          <i className="fa-solid fa-phone"></i> ZADZWOŃ TERAZ
        </span>
      </div>

      {/* Hero Section */}
      <section id="home" className="hero-section" ref={sectionRefs.home}>
        <div className="hero-overlay"></div>
        
        {/* Right Edge Side-Text (hidden on mobile) */}
        <div className="hero-vertical-edge">
          W210 · W203 · W211 · W202 · W209 · ML · SPRINTER
        </div>

        {/* Watermark "W" */}
        <div className="hero-watermark">W</div>

        <div className="container hero-content-wrapper">
          <div className="hero-content">
            <span className="section-tag">Łódź · Cała Polska · 24h/7 dni</span>
            <div className="thick-rule"></div>
            
            <h1 className="hero-h1">
              SKUP <br />
              <span className="highlight">MERCEDESÓW</span>
              <span className="subtitle">24/7</span>
            </h1>

            <p className="hero-desc">
              Stare, pognite, powypadkowe, nieodpalające — diesel w każdym stanie. Gotówka od ręki, własny transport, decyzja od ręki.
            </p>

            {/* Badges row */}
            <div className="hero-badges-row">
              <span className="hero-badge">Gotówka od ręki</span>
              <span className="hero-badge">Dojazd na miejsce</span>
              <span className="hero-badge">Każdy stan</span>
              <span className="hero-badge">Szybka decyzja</span>
            </div>

            {/* Links row */}
            <div className="hero-links-row">
              <span 
                onClick={() => scrollToSection('kontakt')} 
                className="hero-link-primary cursor-pointer"
                style={{ cursor: 'pointer' }}
              >
                ➔ NAPISZ: Mam Mercedesa
              </span>
              <span 
                onClick={() => scrollToSection('modele')} 
                className="hero-link-secondary cursor-pointer"
                style={{ cursor: 'pointer' }}
              >
                ➔ Jakie modele skupuję
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Models Section */}
      <section id="modele" className="models-section reveal" ref={sectionRefs.modele}>
        <div className="container">
          
          <div className="section-header">
            <span className="section-tag">SKUPOWANE MODELE</span>
            <h2 className="section-h2">Które Mercedesy skupuję</h2>
            <div className="section-rule"></div>
          </div>

          {/* CSS Grid for Models */}
          <div className="models-grid">
            {models.map((model, index) => (
              <span 
                key={model.id} 
                onClick={() => {
                  scrollToSection('kontakt');
                }}
                className="model-card reveal cursor-pointer"
                style={{ transitionDelay: `${index * 50}ms`, cursor: 'pointer' }}
                title={`Wyślij zapytanie o model ${model.name}`}
              >
                <span className="model-name">{model.name}</span>
                <span className="model-sub">{model.sub}</span>
              </span>
            ))}
          </div>

          {/* Full-width orange diesel banner */}
          <div className="only-diesel-banner reveal">
            <span className="only-diesel-text">
              WYŁĄCZNIE DIESEL — BENZYNA, HYBRYDA I INNE: NIE INTERESUJĘ SIĘ
            </span>
          </div>

        </div>
      </section>

      
      {/* Conditions Section */}
      <section id="warunki" className="conditions-section reveal halftone-bg" ref={sectionRefs.warunki}>
        <div className="container">
          
          <div className="section-header">
            <span className="section-tag">STAN AUTA</span>
            <h2 className="section-h2 section-h2-light">Rdza to nie problem.</h2>
            <p className="section-subtitle-italic">Im gorszy stan — tym większa szansa, że się dogadamy.</p>
            <div className="section-rule"></div>
          </div>

          <div className="conditions-grid">
            
            {/* Left Card - What we buy */}
            <div className="conditions-card left-border reveal">
              <span className="card-label">PRZYJMUJĘ KAŻDY STAN</span>
              
              <div>
                {conditionsChecklist.map((item, idx) => (
                  <div 
                    key={item.id} 
                    className="checklist-item reveal" 
                    style={{ transitionDelay: `${idx * 35}ms` }}
                  >
                    <span className="check-icon">✓</span>
                    <span className="check-text">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Card - Engine specifications */}
            <div className="conditions-card right-border reveal">
              <span className="card-label">WYMAGANIA CO DO SILNIKA</span>

              {/* Highly paid green block */}
              <div className="engine-block-green">
                <span className="block-label-orange">DOBRZE PŁACĘ</span>
                <div className="block-title-large">2.7 / 2.9 / 3.0</div>
                <div className="block-desc-light">D · TD · CDI</div>
              </div>

              {/* Scrap paid red block */}
              <div className="engine-block-red">
                <span className="block-label-muted">TYLKO W CENIE ZŁOMU</span>
                <div className="block-title-mid">2.2 · 2.3 · 3.2 · inne</div>
                <div className="block-desc-italic">niezależnie od stanu wizualnego</div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Why Me Section */}
      <section id="dlaczego" className="why-section reveal" ref={sectionRefs.dlaczego}>
        <div className="container">
          
          <div className="section-header">
            <span className="section-tag">DLACZEGO WARTO</span>
            <h2 className="section-h2">Dlaczego zadzwonić właśnie do mnie?</h2>
            <div className="section-rule"></div>
          </div>

          {/* Rows */}
          <div className="why-rows-wrapper">
            {whyRows.map((row, index) => (
              <div 
                key={row.num} 
                onClick={() => scrollToSection('kontakt')}
                className="why-row reveal cursor-pointer"
                style={{ transitionDelay: `${index * 60}ms`, cursor: 'pointer' }}
              >
                <div className="why-num">{row.num}</div>
                <div className="why-main">
                  <div className="why-title">{row.title}</div>
                </div>
                <div className="why-desc">{row.desc}</div>
              </div>
            ))}
          </div>

          {/* Banner bottom */}
          <div className="why-bottom-banner reveal">
            <div className="why-banner-text">
              NAPISZ: „Mam Mercedesa" + ZDJĘCIE = DZIAŁAMY
            </div>
            <span onClick={() => scrollToSection('kontakt')} className="why-banner-btn cursor-pointer" style={{ cursor: 'pointer' }}>
              KONTAKT ➔
            </span>
          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section id="jak-to-dziala" className="how-section reveal">
        <div className="how-section-wrapper">
          <h2 className="how-h2">JAK TO DZIAŁA?</h2>
          
          <div className="how-steps-row">
            {steps.map((step, index) => (
              <div key={step.num} style={{ display: 'contents' }}>
                <div className="how-step">
                  <div className="how-step-num">{step.num}</div>
                  <h3 className="how-step-name">{step.name}</h3>
                  <p className="how-step-desc">{step.desc}</p>
                </div>
                {index < steps.length - 1 && <div className="how-divider"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="contact-section reveal halftone-bg" ref={sectionRefs.kontakt}>
        <div className="container">
          
          <div className="section-header">
            <span className="section-tag">KONTAKT</span>
            <h2 className="section-h2 section-h2-light">Napisz lub zadzwoń.</h2>
            <div className="section-rule"></div>
          </div>

          {/* Contact Layout Grid */}
          <div className="contact-grid">
            
            {/* Left Column (Info) */}
            <div className="contact-left">
              <p className="contact-intro">
                Działam 24h, 7 dni w tygodniu. Dojeżdżam na miejsce w całej Polsce. Napisz jedną wiadomość — reszta po mojej stronie.
              </p>

              {/* Contact rows */}
              <div className="contact-row">
                <span className="contact-row-label">E-MAIL</span>
                <a href="mailto:skupmercedes24h@gmail.com" className="contact-row-value-link">
                  skupmercedes24h@gmail.com
                </a>
              </div>

              <div className="contact-row">
                <span className="contact-row-label">LOKALIZACJA</span>
                <span className="contact-row-value">Piotrkowska, Łódź · Dojazd: cała Polska</span>
              </div>

              <div className="contact-row">
                <span className="contact-row-label">FACEBOOK</span>
                <a 
                  href="https://www.facebook.com/profile.php?id=61577245824364" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-row-value-link social"
                >
                  Skup Mercedesów 24/7 <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '0.8rem', marginLeft: '4px' }}></i>
                </a>
              </div>

              <div className="contact-row" style={{ borderBottom: 'none' }}>
                <span className="contact-row-label">TIKTOK</span>
                <a 
                  href="https://www.tiktok.com/@skup.mercedesw" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-row-value-link social"
                >
                  TikTok <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '0.8rem', marginLeft: '4px' }}></i>
                </a>
              </div>

              {/* Big Action Callout block */}
              <a href="mailto:skupmercedes24h@gmail.com" className="contact-action-card reveal">
                <div className="action-card-title">NAPISZ: „Mam Mercedesa”</div>
                <div className="action-card-desc">
                  Wyślij zdjęcie auta na email ➔ dostaniesz wycenę od ręki. Szybki dojazd lawetą.
                </div>
              </a>

            </div>

            {/* Right Column (Typographic) */}
            <div className="contact-right">
              
              <div className="typographic-fill-group">
                <span className="typographic-fill">GOTÓWKA</span>
                <span className="typographic-fill" style={{ color: 'var(--page)' }}>OD RĘKI</span>
                <span className="typographic-fill-sub">bez przelewów, bez oczekiwania, bezpośrednio do ręki</span>
              </div>

              {/* Email block card */}
              <div className="email-block-card reveal">
                <span className="email-block-title">skupmercedes24h@gmail.com</span>
                <p className="email-block-desc">
                  Odpisuję w kilka minut. Dołącz zdjęcia auta i oczekiwaną kwotę.
                </p>
              </div>

              {/* Facebook quick contact banner */}
              <div style={{ marginTop: '24px', padding: '24px', backgroundColor: '#1A1A18', borderLeft: '4px solid #E8621A' }}>
                <div style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '1.1rem', color: '#F5F5F3' }}>
                  Wolisz napisać na Facebooku?
                </div>
                <p style={{ fontFamily: 'Barlow', fontWeight: 300, fontSize: '0.85rem', color: '#8A8A84', marginTop: '4px', marginBottom: '14px' }}>
                  Napisz na Messengerze, odpisujemy natychmiast o każdej porze dnia i nocy.
                </p>
                <a 
                  href="https://www.facebook.com/profile.php?id=61577245824364" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#E8621A', fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', textTransform: 'uppercase' }}
                >
                  OTWÓRZ MESSENGERA <i className="fa-brands fa-facebook-messenger"></i>
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <div className="container">
          
          <div className="footer-top">
            <span className="footer-logo">SKUP MERCEDESÓW 24/7</span>
            <span className="footer-mid-text">Łódź · Cała Polska · diesel każdy stan</span>
            <span className="footer-copy">© 2026 skupmercedes24h</span>
          </div>

          <div className="footer-rule"></div>

          <div className="footer-bottom">
            <p className="footer-bottom-text">
              skupmercedes24h@gmail.com · Facebook · TikTok
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}

