import { useState, useEffect, useRef, useCallback } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,700;1,400&family=Jost:wght@200;300;400;700;900&display=swap');
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html, body { scroll-behavior:smooth; background:#FFFFFF; color:#1A1410; font-family:'Jost',sans-serif; font-weight:300; overflow-x:hidden; }
  :root { --yellow:#FDF8DC; --orange:#E8622A; --stripe:#EECDE0; --green:#4E7A6A; --ink:#1A1410; --ink-mid:#3A3530; }

  .nav { position:fixed; top:0; left:0; right:0; z-index:200; height:64px; display:flex; justify-content:space-between; align-items:center; padding:0 48px; background:rgba(255,255,255,.97); backdrop-filter:blur(12px); box-shadow:0 1px 0 rgba(232,98,42,.15); }
  .nav-logo { font-family:'EB Garamond',serif; font-size:1rem; font-weight:400; letter-spacing:.4em; color:var(--ink); text-transform:uppercase; cursor:pointer; background:none; border:none; }
  .burger { width:36px; height:20px; display:flex; flex-direction:column; justify-content:space-between; cursor:pointer; background:none; border:none; padding:0; position:relative; z-index:300; }
  .burger span { display:block; width:100%; height:1px; background:var(--ink); transition:transform .5s cubic-bezier(.77,0,.175,1), opacity .4s, width .4s; transform-origin:center; }
  .burger.open span:nth-child(1) { transform:translateY(9.5px) rotate(45deg); }
  .burger.open span:nth-child(2) { opacity:0; width:0; }
  .burger.open span:nth-child(3) { transform:translateY(-9.5px) rotate(-45deg); }
  .menu-overlay { position:fixed; inset:0; z-index:250; background:#FFFFFF; display:flex; flex-direction:column; justify-content:center; align-items:flex-start; padding:0 10vw; pointer-events:none; opacity:0; transition:opacity .5s cubic-bezier(.77,0,.175,1); }
  .menu-overlay.open { opacity:1; pointer-events:all; }
  .menu-close { position:absolute; top:0; right:48px; height:64px; display:flex; align-items:center; background:none; border:none; cursor:pointer; font-size:2rem; color:var(--ink); transition:color .3s; padding:0; line-height:1; }
  .menu-close:hover { color:var(--orange); }
  .menu-nav { list-style:none; width:100%; }
  .menu-nav li { overflow:hidden; border-bottom:1px solid rgba(45,90,61,.15); padding:20px 0; }
  .menu-nav li:first-child { border-top:1px solid rgba(45,90,61,.15); }
  .menu-nav button.menu-link { font-family:'Jost',sans-serif; font-size:1.05rem; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:var(--ink); background:none; border:none; display:block; transform:translateY(30px); transition:transform .5s cubic-bezier(.77,0,.175,1), color .3s; cursor:pointer; width:100%; text-align:left; padding:0; }
  .menu-overlay.open .menu-nav button.menu-link { transform:translateY(0); }
  .menu-nav li:nth-child(1) button { transition-delay:.05s; }
  .menu-nav li:nth-child(2) button { transition-delay:.10s; }
  .menu-nav li:nth-child(3) button { transition-delay:.15s; }
  .menu-nav li:nth-child(4) button { transition-delay:.20s; }
  .menu-nav li:nth-child(5) button { transition-delay:.25s; }
  .menu-nav li:nth-child(6) button { transition-delay:.30s; }
  .menu-nav button.menu-link:hover { color:var(--orange); }

  .hero { height:100vh; display:flex; flex-direction:column; overflow:hidden; position:relative; }
  .stripes { display:flex; flex-direction:column; height:100%; }
  .stripe { flex:1; }
  .stripe:nth-child(odd) { background:#FFFFFF; }
  .stripe:nth-child(even) { background:var(--stripe); }
  .hero-text { position:absolute; inset:0; display:flex; flex-direction:column; justify-content:center; z-index:2; pointer-events:none; padding:0 3vw; margin-top:-10vh; }
  .hero-row { display:flex; align-items:baseline; line-height:.88; }
  .hl { font-family:'EB Garamond',serif; font-weight:700; color:var(--orange); font-size:clamp(14vw,19vw,23vw); display:inline-block; line-height:.88; letter-spacing:.01em; }
  .hl-amp { font-family:'EB Garamond',serif; font-weight:700; color:var(--orange); font-size:clamp(14vw,19vw,23vw); display:inline-block; line-height:.88; transform:translateY(4%); }
  .hero-scroll { position:absolute; bottom:32px; right:48px; display:flex; flex-direction:column; align-items:center; gap:8px; font-size:.52rem; letter-spacing:.28em; text-transform:uppercase; color:var(--orange); }
  .scroll-bar { width:1px; height:36px; background:var(--orange); }

  .storia-section { padding:100px 48px 120px; background:#FFFFFF; display:flex; justify-content:center; }
  .storia-inner { text-align:center; max-width:680px; }
  .storia-heading { font-size:1rem; font-weight:300; line-height:2; color:var(--ink-mid); }
  .storia-body { font-size:1rem; line-height:2; color:var(--ink-mid); font-weight:300; }
  .sposiamo { font-family:'EB Garamond',serif; font-size:2em; color:var(--orange); font-weight:700; }

  .wave { display:block; line-height:0; margin-bottom:-2px; background:#FFFFFF; }
  .wave svg { width:100%; height:80px; display:block; }
  .wave-bottom { background:#FFFFFF; margin-top:-2px; }

  .programma { background:var(--yellow); padding:80px 48px; }
  .tl-title { font-family:'EB Garamond',serif; font-size:clamp(2.4rem,4vw,4rem); font-weight:700; color:var(--green); text-align:center; margin-bottom:72px; opacity:0; transform:translateY(40px); transition:opacity .8s ease, transform .8s ease; }
  .tl-title.visible { opacity:1; transform:translateY(0); }
  .tl-days { display:grid; grid-template-columns:1fr 1fr; }
  .tl-day { padding:48px; border-left:1px solid rgba(58,53,48,.12); opacity:0; transform:translateY(50px); transition:opacity .7s ease, transform .7s ease; }
  .tl-day.visible { opacity:1; transform:translateY(0); }
  .tl-day:first-child { border-left:none; border-right:1px solid rgba(58,53,48,.12); }
  .tl-day-label { font-size:.72rem; letter-spacing:.25em; text-transform:uppercase; color:var(--ink); font-weight:500; margin-bottom:12px; }
  .tl-day-title { font-family:'EB Garamond',serif; font-size:clamp(2.2rem,5vw,4rem); font-weight:700; color:var(--green); text-transform:uppercase; letter-spacing:.03em; line-height:1; margin-bottom:40px; padding-bottom:32px; border-bottom:1px solid rgba(58,53,48,.12); }
  .tl-event-list { display:flex; flex-direction:column; gap:32px; }
  .tl-item { display:flex; flex-direction:column; gap:8px; opacity:0; transform:translateY(30px); transition:opacity .6s ease, transform .6s ease; }
  .tl-item.visible { opacity:1; transform:translateY(0); }
  .tl-time { font-size:.72rem; letter-spacing:.2em; text-transform:uppercase; color:var(--ink-mid); font-weight:300; }
  .tl-event { font-family:'EB Garamond',serif; font-size:clamp(1.8rem,3vw,2.8rem); font-weight:400; color:var(--ink); }
  .tl-desc { font-size:1rem; line-height:1.9; color:var(--ink-mid); }
  .tl-link { display:inline-block; margin-top:6px; font-size:.55rem; letter-spacing:.2em; text-transform:uppercase; color:var(--ink); text-decoration:underline; text-underline-offset:3px; font-weight:500; cursor:pointer; background:none; border:none; padding:0; }

  .rsvp-section { padding:100px 48px; background:#FFFFFF; text-align:center; display:flex; flex-direction:column; align-items:center; gap:40px; }
  .rsvp-heading { font-family:'EB Garamond',serif; font-size:clamp(3rem,6vw,7rem); font-weight:400; line-height:1; color:var(--ink); }
  .rsvp-body { font-size:1rem; line-height:2; color:var(--ink-mid); max-width:560px; }
  .rsvp-btn { display:inline-block; background:#EECDE0; color:var(--orange); padding:22px 64px; border:none; cursor:pointer; font-size:1.1rem; letter-spacing:.18em; text-transform:uppercase; font-weight:900; font-family:'Jost',sans-serif; transition:background .3s, color .3s; -webkit-text-stroke:.5px var(--orange); }
  .rsvp-btn:hover { background:var(--orange); color:#EECDE0; }

  footer { background:#111111; padding:64px 48px; }
  .footer-intro { text-align:center; margin-bottom:28px; font-family:'EB Garamond',serif; font-size:1.4rem; color:rgba(255,255,255,.9); }
  .contacts-wrap { border-top:1px solid rgba(255,255,255,.12); max-width:480px; margin:0 auto; }
  .acc-item { border-bottom:1px solid rgba(255,255,255,.12); }
  .acc-btn { width:100%; background:none; border:none; cursor:pointer; padding:20px 4px; display:flex; justify-content:space-between; align-items:center; }
  .acc-label { font-size:.52rem; letter-spacing:.3em; text-transform:uppercase; font-family:'Jost',sans-serif; color:rgba(255,255,255,.5); }
  .acc-arrow { font-size:.75rem; color:var(--orange); transition:transform .35s; display:inline-block; }
  .acc-arrow.open { transform:rotate(180deg); }
  .acc-drawer { overflow:hidden; max-height:0; transition:max-height .45s ease; }
  .acc-drawer.open { max-height:300px; }
  .acc-content a { display:block; font-family:'EB Garamond',serif; font-size:1rem; color:rgba(255,255,255,.8); text-decoration:none; padding:8px 0; border-bottom:1px solid rgba(255,255,255,.08); }
  .acc-content a:last-child { border-bottom:none; }

  .page-placeholder { min-height:100vh; padding-top:64px; display:flex; flex-direction:column; align-items:center; justify-content:center; font-family:'EB Garamond',serif; gap:24px; }
  .page-placeholder h1 { font-size:3rem; color:var(--green); font-weight:700; }
  .page-placeholder p { font-size:1.2rem; color:var(--ink-mid); }
  .page-back { font-family:'Jost',sans-serif; font-size:.65rem; letter-spacing:.2em; text-transform:uppercase; color:var(--orange); cursor:pointer; background:none; border:none; margin-top:16px; }

  .rsvp-page { min-height:100vh; background:#FFFFFF; padding:100px 48px 80px; display:flex; flex-direction:column; align-items:center; }
  .rsvp-page-title { font-family:'EB Garamond',serif; font-size:clamp(3rem,6vw,5rem); font-weight:700; color:var(--green); margin-bottom:12px; text-align:center; }
  .rsvp-page-sub { font-size:1rem; color:var(--ink-mid); margin-bottom:56px; text-align:center; line-height:2; }
  .rsvp-form { width:100%; max-width:560px; display:flex; flex-direction:column; gap:36px; }
  .rsvp-field { display:flex; flex-direction:column; gap:10px; }
  .rsvp-label { font-size:.65rem; letter-spacing:.25em; text-transform:uppercase; font-family:'Jost',sans-serif; color:var(--ink); font-weight:500; }
  .rsvp-input { border:none; border-bottom:1px solid rgba(26,20,16,.25); padding:12px 0; font-family:'EB Garamond',serif; font-size:1.1rem; color:var(--ink); background:transparent; outline:none; transition:border-color .3s; }
  .rsvp-input:focus { border-bottom-color:var(--orange); }
  .rsvp-options { display:flex; flex-direction:column; gap:12px; }
  .rsvp-option { display:flex; align-items:center; gap:14px; cursor:pointer; }
  .rsvp-option-dot { width:18px; height:18px; border-radius:50%; border:1.5px solid rgba(26,20,16,.3); flex-shrink:0; transition:border-color .3s, background .3s; display:flex; align-items:center; justify-content:center; }
  .rsvp-option-dot.checked { border-color:var(--orange); background:var(--orange); }
  .rsvp-option-dot.checked::after { content:''; width:6px; height:6px; border-radius:50%; background:#fff; display:block; }
  .rsvp-option-label { font-family:'EB Garamond',serif; font-size:1.1rem; color:var(--ink); }
  .rsvp-submit { align-self:flex-start; background:#EECDE0; color:var(--orange); padding:20px 56px; border:none; cursor:pointer; font-size:1rem; letter-spacing:.18em; text-transform:uppercase; font-weight:900; font-family:'Jost',sans-serif; transition:background .3s, color .3s; -webkit-text-stroke:.5px var(--orange); margin-top:8px; }
  .rsvp-submit:hover { background:var(--orange); color:#EECDE0; }
  .rsvp-success { text-align:center; font-family:'EB Garamond',serif; font-size:1.8rem; color:var(--green); padding:40px 0; }
  .toggle-side { display:flex; align-items:center; gap:12px; }
  .toggle-side-label { font-family:'EB Garamond',serif; font-size:1.1rem; color:var(--ink-mid); }
  .toggle { position:relative; width:48px; height:26px; flex-shrink:0; }
  .toggle input { opacity:0; width:0; height:0; position:absolute; }
  .toggle-slider { position:absolute; inset:0; background:rgba(26,20,16,.15); border-radius:26px; cursor:pointer; transition:background .3s; }
  .toggle-slider::before { content:''; position:absolute; width:20px; height:20px; left:3px; top:3px; background:#fff; border-radius:50%; transition:transform .3s; }
  .toggle input:checked + .toggle-slider { background:var(--orange); }
  .toggle input:checked + .toggle-slider::before { transform:translateX(22px); }

  .arrivarci-page { background:#FFFFFF; padding-top:64px; }
  .arrivarci-section { padding:72px 48px; }
  .arrivarci-inner { max-width:680px; margin:0 auto; }
  .arrivarci-label { font-size:.72rem; letter-spacing:.25em; text-transform:uppercase; color:var(--ink-mid); font-weight:500; margin-bottom:12px; }
  .arrivarci-title { font-family:'EB Garamond',serif; font-size:clamp(2.4rem,5vw,4rem); font-weight:700; color:var(--green); margin-bottom:16px; }
  .arrivarci-location { font-family:'EB Garamond',serif; font-size:1.4rem; color:var(--ink); margin-bottom:6px; }
  .arrivarci-address { font-size:1rem; color:var(--ink-mid); line-height:1.8; margin-bottom:24px; }
  .arrivarci-maps { display:inline-block; font-size:.6rem; letter-spacing:.2em; text-transform:uppercase; font-weight:500; color:var(--orange); text-decoration:underline; text-underline-offset:3px; margin-bottom:24px; }
  .arrivarci-map { width:100%; height:300px; border-radius:2px; overflow:hidden; }
  .arrivarci-map iframe { width:100%; height:100%; border:0; }
  .arrivarci-quote { font-family:'EB Garamond',serif; font-style:italic; font-size:1.15rem; color:var(--ink-mid); line-height:1.8; margin:20px 0 8px; }
  .arrivarci-divider { height:1px; background:rgba(58,53,48,.1); margin:0 48px; }

  @media (max-width:768px) {
    .nav { padding:0 24px; }
    .storia-section { padding:60px 24px 80px; }
    .programma { padding:60px 0; }
    .tl-title { padding:0 24px; }
    .tl-days { grid-template-columns:1fr; }
    .tl-day { border-left:none !important; border-right:none !important; border-top:1px solid rgba(58,53,48,.1); padding:40px 24px; }
    .tl-day:first-child { border-top:none; }
    .rsvp-section { padding:80px 24px; }
    footer { padding:48px 24px; }
    .rsvp-page { padding:100px 24px 60px; }
    .arrivarci-section { padding:48px 24px; }
    .arrivarci-divider { margin:0 24px; }
    .menu-close { right:24px; }
  }
`;

function useIntersection(ref) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); obs.disconnect(); }
    }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return isVisible;
}

function AnimatedEl({ className, delay = 0, children, tag: Tag = 'div' }) {
  const ref = useRef(null);
  const visible = useIntersection(ref);
  useEffect(() => {
    if (visible && ref.current) {
      const t = setTimeout(() => { if (ref.current) ref.current.classList.add('visible'); }, delay);
      return () => clearTimeout(t);
    }
  }, [visible, delay]);
  return <Tag ref={ref} className={className}>{children}</Tag>;
}

function Nav({ onNav, menuOpen, setMenuOpen }) {
  const goTo = useCallback((page) => { onNav(page); setMenuOpen(false); }, [onNav, setMenuOpen]);
  const goToProgramma = useCallback(() => {
    onNav('home');
    setMenuOpen(false);
    setTimeout(() => { const el = document.getElementById('programma'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 100);
  }, [onNav, setMenuOpen]);

  return (
    <>
      <nav className="nav">
        <button className="nav-logo" onClick={() => goTo('home')}>S &amp; M</button>
        <button className={`burger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>
      <div className={`menu-overlay${menuOpen ? ' open' : ''}`}>
        <button className="menu-close" onClick={() => setMenuOpen(false)}>&#x2715;</button>
        <ul className="menu-nav">
          <li><button className="menu-link" onClick={() => goTo('storia')}>La nostra storia</button></li>
          <li><button className="menu-link" onClick={goToProgramma}>Programma</button></li>
          <li><button className="menu-link" onClick={() => goTo('arrivarci')}>Come arrivarci</button></li>
          <li><button className="menu-link" onClick={() => goTo('rsvp')}>RSVP</button></li>
          <li><button className="menu-link" onClick={() => goTo('lista')}>Lista nozze</button></li>
          <li><button className="menu-link" onClick={() => goTo('faq')}>FAQ</button></li>
        </ul>
      </div>
    </>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="stripes">
        {[1,2,3,4,5,6].map(i => <div key={i} className="stripe" />)}
      </div>
      <div className="hero-text">
        <div className="hero-row">
          <span className="hl-amp">&amp;</span>
          <span className="hl" style={{transform:'translateY(4%)'}}>S</span>
          <span className="hl" style={{transform:'translateY(-3%)'}}>A</span>
          <span className="hl" style={{transform:'translateY(5%)'}}>R</span>
          <span className="hl" style={{transform:'translateY(-2%)'}}>A</span>
        </div>
        <div className="hero-row">
          <span className="hl" style={{transform:'translateY(4%)'}}>M</span>
          <span className="hl" style={{transform:'translateY(-4%)'}}>A</span>
          <span className="hl" style={{transform:'translateY(5%)'}}>R</span>
          <span className="hl" style={{transform:'translateY(-3%)'}}>C</span>
          <span className="hl" style={{transform:'translateY(4%)'}}>O</span>
        </div>
      </div>
      <div className="hero-scroll"><div className="scroll-bar" /><span>Scorri</span></div>
    </section>
  );
}

function Storia() {
  return (
    <section className="storia-section">
      <div className="storia-inner">
        <h2 className="storia-heading">Ebbene si...</h2>
        <p className="storia-body">
          Dopo 14 anni insieme abbiamo deciso che il periodo di prova è terminato.<br /><br />
          <span className="sposiamo">Ci sposiamo!</span><br /><br />
          E ci farebbe piacere festeggiare con te.
        </p>
      </div>
    </section>
  );
}

function Programma({ onNav }) {
  return (
    <section id="programma" className="programma">
      <AnimatedEl className="tl-title" tag="p">Programma</AnimatedEl>
      <div className="tl-days">
        <AnimatedEl className="tl-day" delay={0}>
          <p className="tl-day-label">Sabato - 19 Luglio</p>
          <h2 className="tl-day-title">Panzerottata</h2>
          <div className="tl-event-list">
            <AnimatedEl className="tl-item" delay={200}>
              <p className="tl-time">Ore 20 : 00</p>
              <h3 className="tl-event">Si frigge!</h3>
              <p className="tl-desc">Casa della sposa.<br />Vi aspettiamo per una serata a base di panzerotti.<br />
                <span style={{fontWeight:300}}>Mangiarli è una cosa seria - preparati ad esagerare.</span>
              </p>
              <button className="tl-link" onClick={() => onNav('arrivarci')}>Come arrivarci →</button>
            </AnimatedEl>
          </div>
        </AnimatedEl>
        <AnimatedEl className="tl-day" delay={150}>
          <p className="tl-day-label">Domenica - 20 Luglio</p>
          <h2 className="tl-day-title">Matrimonio</h2>
          <div className="tl-event-list">
            <AnimatedEl className="tl-item" delay={320}>
              <p className="tl-time">Ore 18 : 00</p>
              <h3 className="tl-event">Cerimonia</h3>
              <p className="tl-desc">Masseria Don Luigi.<br />
                <span style={{fontWeight:300}}>14 anni di attesa sono stati più che sufficienti - siate puntuali!</span>
              </p>
            </AnimatedEl>
            <AnimatedEl className="tl-item" delay={440}>
              <p className="tl-time">Ore 19 : 00</p>
              <h3 className="tl-event">Ricevimento</h3>
              <p className="tl-desc">Masseria Don Luigi.<br />Si mangia, si beve - e con voi il resto viene da sé.</p>
              <button className="tl-link" onClick={() => onNav('arrivarci')}>Come arrivarci →</button>
            </AnimatedEl>
          </div>
        </AnimatedEl>
      </div>
    </section>
  );
}

function RsvpBanner({ onNav }) {
  return (
    <section className="rsvp-section">
      <h2 className="rsvp-heading">Ci sei?</h2>
      <p className="rsvp-body">Che tu venga per i panzerotti, per il matrimonio o per entrambi - facci sapere!</p>
      <button className="rsvp-btn" onClick={() => onNav('rsvp')}>Conferma presenza</button>
    </section>
  );
}

function AccordionItem({ label, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="acc-item">
      <button className="acc-btn" onClick={() => setOpen(o => !o)}>
        <span className="acc-label">{label}</span>
        <span className={`acc-arrow${open ? ' open' : ''}`}>↓</span>
      </button>
      <div className={`acc-drawer${open ? ' open' : ''}`}>
        <div className="acc-content">{children}</div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <p className="footer-intro">Hai domande? Siamo qui.</p>
      <div className="contacts-wrap">
        <AccordionItem label="Sara">
          <a href="mailto:sara.cecere@email.com">sara.cecere@email.com</a>
          <a href="https://wa.me/393895194574" target="_blank" rel="noreferrer">+39 389 519 4574 WhatsApp</a>
        </AccordionItem>
        <AccordionItem label="Marco">
          <a href="mailto:marco@email.com">marco@email.com</a>
          <a href="https://wa.me/393272917349" target="_blank" rel="noreferrer">+39 327 291 7349 WhatsApp</a>
        </AccordionItem>
      </div>
    </footer>
  );
}

function PageHome({ onNav }) {
  return (
    <div>
      <Hero />
      <Storia />
      <div className="wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="#FDF8DC"/>
        </svg>
      </div>
      <Programma onNav={onNav} />
      <div className="wave wave-bottom">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,0 L0,0 Z" fill="#FDF8DC"/>
        </svg>
      </div>
      <RsvpBanner onNav={onNav} />
      <Footer />
    </div>
  );
}

function ParcheggiStrada() {
  const [open, setOpen] = useState(false);
  return (
    <span style={{position:'relative', display:'inline-block', verticalAlign:'middle', margin:'0 4px'}}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          background:'var(--stripe)',
          border:'2.5px solid var(--ink)',
          borderRadius:'12px',
          padding:'3px 12px',
          fontFamily:"'EB Garamond', serif",
          fontStyle:'italic',
          fontSize:'1rem',
          color:'var(--ink)',
          cursor:'pointer',
          boxShadow:'2px 2px 0 var(--ink)',
          transition:'transform .15s, box-shadow .15s',
          display:'inline-block',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform='translate(-1px,-1px)'; e.currentTarget.style.boxShadow='4px 4px 0 var(--ink)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='2px 2px 0 var(--ink)'; }}
      >
        lungo questa strada 📸
      </button>
      {open && (
        <span style={{
          position:'absolute',
          top:'calc(100% + 14px)',
          left:'50%',
          transform:'translateX(-50%)',
          zIndex:10,
          display:'block',
        }}>
          {/* Punta fumetto */}
          <span style={{
            display:'block',
            width:0, height:0,
            borderLeft:'8px solid transparent',
            borderRight:'8px solid transparent',
            borderBottom:'14px solid var(--ink)',
            margin:'0 auto',
          }} />
          <span style={{
            display:'block',
            width:0, height:0,
            borderLeft:'6px solid transparent',
            borderRight:'6px solid transparent',
            borderBottom:'12px solid #fff',
            margin:'-12px auto 0',
          }} />
          <span style={{
            display:'block',
            background:'#fff',
            border:'2.5px solid var(--ink)',
            borderRadius:'12px',
            padding:'10px',
            boxShadow:'4px 4px 0 var(--ink)',
            width:'240px',
          }}>
            {/* Placeholder foto */}
            <span style={{
              width:'100%',
              aspectRatio:'4/3',
              background:'var(--yellow)',
              borderRadius:'6px',
              border:'1.5px solid rgba(0,0,0,.1)',
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              flexDirection:'column',
              gap:'8px',
              color:'var(--ink-mid)',
              fontFamily:"'Jost', sans-serif",
              fontSize:'.65rem',
              letterSpacing:'.15em',
              textTransform:'uppercase',
            }}>
              <span style={{fontSize:'2rem'}}>🗺️</span>
              <span>Foto in arrivo</span>
            </span>
            <span style={{
              display:'block',
              marginTop:'8px',
              fontSize:'.55rem',
              letterSpacing:'.15em',
              textTransform:'uppercase',
              color:'var(--orange)',
              fontFamily:"'Jost', sans-serif",
              textAlign:'center',
              cursor:'pointer',
            }} onClick={() => setOpen(false)}>
              chiudi ✕
            </span>
          </span>
        </span>
      )}
    </span>
  );
}

function PanzerottiQuote() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{position:'relative', margin:'24px 0 32px', display:'inline-block'}}>
      {/* Fumetto */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position:'relative',
          background:'var(--yellow)',
          border:'2.5px solid var(--ink)',
          borderRadius:'18px',
          padding:'14px 22px',
          fontFamily:"'EB Garamond', serif",
          fontStyle:'italic',
          fontSize:'1.1rem',
          color:'var(--ink)',
          cursor:'pointer',
          boxShadow:'3px 3px 0 var(--ink)',
          transition:'transform .15s, box-shadow .15s',
          display:'block',
          textAlign:'left',
          maxWidth:'320px',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform='translate(-2px,-2px)'; e.currentTarget.style.boxShadow='5px 5px 0 var(--ink)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='3px 3px 0 var(--ink)'; }}
      >
        "I panzerotti vanno mangiati caldi..."
        {/* Codina del fumetto */}
        <span style={{
          position:'absolute',
          bottom:'-14px',
          left:'28px',
          width:0,
          height:0,
          borderLeft:'10px solid transparent',
          borderRight:'6px solid transparent',
          borderTop:'14px solid var(--ink)',
        }} />
        <span style={{
          position:'absolute',
          bottom:'-11px',
          left:'30px',
          width:0,
          height:0,
          borderLeft:'8px solid transparent',
          borderRight:'5px solid transparent',
          borderTop:'12px solid var(--yellow)',
        }} />
        {/* Hint click */}
        <span style={{
          display:'block',
          marginTop:'6px',
          fontSize:'.55rem',
          letterSpacing:'.18em',
          textTransform:'uppercase',
          color:'var(--orange)',
          fontStyle:'normal',
          fontFamily:"'Jost', sans-serif",
        }}>
          {open ? 'chiudi ↑' : 'guarda il video ↓'}
        </span>
      </button>

      {/* Video in stile fumetto */}
      {open && (
        <div style={{
          position:'relative',
          marginTop:'20px',
          background:'#fff',
          border:'2.5px solid var(--ink)',
          borderRadius:'12px',
          padding:'10px',
          boxShadow:'4px 4px 0 var(--ink)',
          width:'220px',
        }}>
          {/* Angolino fumetto in alto */}
          <span style={{
            position:'absolute',
            top:'-14px',
            left:'32px',
            width:0,
            height:0,
            borderLeft:'8px solid transparent',
            borderRight:'8px solid transparent',
            borderBottom:'14px solid var(--ink)',
          }} />
          <span style={{
            position:'absolute',
            top:'-11px',
            left:'34px',
            width:0,
            height:0,
            borderLeft:'6px solid transparent',
            borderRight:'6px solid transparent',
            borderBottom:'12px solid #fff',
          }} />
          <div style={{aspectRatio:'9/16', borderRadius:'6px', overflow:'hidden', border:'1.5px solid rgba(0,0,0,.1)'}}>
            <iframe
              src="https://www.youtube.com/embed/wVEDgrPbEKQ?autoplay=1"
              title="Panzerotti video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{width:'100%', height:'100%', border:0, display:'block'}}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function PageArrivarci({ onNav }) {
  return (
    <div className="arrivarci-page">
      <div className="arrivarci-section">
        <div className="arrivarci-inner">
          <p className="arrivarci-label">Sabato · 19 Luglio</p>
          <h1 className="arrivarci-title">Panzerottata</h1>
          <PanzerottiQuote />
          <p className="arrivarci-location">Casa della sposa</p>
          <a className="arrivarci-address" href="https://google.com/maps/place/40°44'41.3%22N+17°25'00.4%22E/@40.7448217,17.4166455,53m/data=!3m1!1e3!4m4!3m3!8m2!3d40.744801!4d17.416768?entry=ttu&g_ep=EgoyMDI2MDMxMC4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer" style={{color:'var(--ink)', textDecoration:'underline', textUnderlineOffset:'3px'}}>Via Locorotondo 142<br />Cisternino, Brindisi</a>
          <p style={{fontSize:'1rem', lineHeight:1.9, color:'var(--ink-mid)', margin:'20px 0 0'}}>
            Ci sono due parcheggi. Per il primo ti basta seguire le indicazioni al link qui sopra su Via Locorotondo. È piccolo e con posti limitati. Il secondo parcheggio è più spazioso e capiente. Segui <a href="https://google.com/maps/place/40°44'43.2%22N+17°24'59.3%22E/@40.7452082,17.4163824,53m/data=!3m1!1e3!4m4!3m3!8m2!3d40.745342!4d17.416472?entry=ttu&g_ep=EgoyMDI2MDMxMC4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer" style={{color:'var(--orange)', textDecoration:'underline', textUnderlineOffset:'3px'}}>questo link</a> per arrivarci. Una volta parcheggiato ti basta scendere a piedi <ParcheggiStrada />.
          </p>
          <div className="arrivarci-map">
            <iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=Via+Locorotondo+142,Cisternino,Brindisi" allowFullScreen loading="lazy" title="Mappa Panzerottata" />
          </div>
        </div>
      </div>
      <div className="arrivarci-divider" />
      <div className="arrivarci-section">
        <div className="arrivarci-inner">
          <p className="arrivarci-label">Domenica · 20 Luglio</p>
          <h1 className="arrivarci-title">Matrimonio</h1>
          <p className="arrivarci-location">Masseria Don Luigi</p>
          <p className="arrivarci-address">Contrada Coccaro s.n.<br />Fasano, Brindisi</p>
          <div className="arrivarci-map">
            <iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=Contrada+Coccaro,Fasano,Brindisi" allowFullScreen loading="lazy" title="Mappa Matrimonio" />
          </div>
        </div>
      </div>
      <div style={{textAlign:'center', padding:'48px 0 64px'}}>
        <button className="page-back" onClick={() => onNav('home')}>← Torna alla home</button>
      </div>
    </div>
  );
}

function PageRsvp() {
  const [partecipa, setPartecipa] = useState('');
  const [pernotto, setPernotto] = useState('');
  const [bambini, setBambini] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="rsvp-page">
        <div className="rsvp-success">Grazie! Non vediamo l'ora di festeggiare con te 🥂</div>
      </div>
    );
  }

  return (
    <div className="rsvp-page">
      <h1 className="rsvp-page-title">RSVP</h1>
      <p className="rsvp-page-sub">Facci sapere se ci sarai — ci teniamo ad averti con noi.</p>
      <form className="rsvp-form" onSubmit={handleSubmit}>
        <div className="rsvp-field">
          <label className="rsvp-label">Nome e Cognome</label>
          <input className="rsvp-input" type="text" placeholder="Il tuo nome..." required />
        </div>
        <div className="rsvp-field">
          <label className="rsvp-label">Parteciperai?</label>
          <div className="rsvp-options">
            {[
              { val: 'solo_matrimonio', label: 'Sì, solo il giorno del matrimonio' },
              { val: 'entrambi', label: 'Sì, entrambi i giorni' },
              { val: 'no', label: 'No, mi dispiace' },
            ].map(opt => (
              <div key={opt.val} className="rsvp-option" onClick={() => setPartecipa(opt.val)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && setPartecipa(opt.val)}>
                <div className={`rsvp-option-dot${partecipa === opt.val ? ' checked' : ''}`} />
                <span className="rsvp-option-label">{opt.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rsvp-field">
          <label className="rsvp-label">Allergie, intolleranze o diete particolari?</label>
          <input className="rsvp-input" type="text" placeholder="Se non hai nessuna esigenza lascia pure vuoto..." />
        </div>
        <div className="rsvp-field">
          <label className="rsvp-label">Verranno bambini con te?</label>
          <div className="toggle-side">
            <span className="toggle-side-label">No</span>
            <label className="toggle">
              <input type="checkbox" checked={bambini} onChange={e => setBambini(e.target.checked)} />
              <span className="toggle-slider" />
            </label>
            <span className="toggle-side-label">Sì</span>
          </div>
        </div>
        {bambini && (
          <div className="rsvp-field">
            <label className="rsvp-label">Allergie per i bambini?</label>
            <input className="rsvp-input" type="text" placeholder="Se non ci sono esigenze lascia pure vuoto..." />
          </div>
        )}
        {(partecipa === 'solo_matrimonio' || partecipa === 'entrambi') && (
          <div className="rsvp-field">
            <label className="rsvp-label">Avrai bisogno di pernottare in masseria?</label>
            <div className="rsvp-options">
              {[
                { val: 'si', label: 'Sì, mi farebbe piacere' },
                { val: 'no', label: 'No, grazie' },
              ].map(opt => (
                <div key={opt.val} className="rsvp-option" onClick={() => setPernotto(opt.val)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && setPernotto(opt.val)}>
                  <div className={`rsvp-option-dot${pernotto === opt.val ? ' checked' : ''}`} />
                  <span className="rsvp-option-label">{opt.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <button className="rsvp-submit" type="submit">Invia</button>
      </form>
    </div>
  );
}

function PagePlaceholder({ title, onNav }) {
  return (
    <div className="page-placeholder">
      <h1>{title}</h1>
      <p>Pagina in arrivo</p>
      <button className="page-back" onClick={() => onNav('home')}>Torna alla home</button>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  const onNav = useCallback((p) => {
    setPage(p);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <style>{styles}</style>
      <Nav onNav={onNav} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {page === 'home'      && <PageHome onNav={onNav} />}
      {page === 'arrivarci' && <PageArrivarci onNav={onNav} />}
      {page === 'rsvp'      && <PageRsvp />}
      {page === 'storia'    && <PagePlaceholder title="La nostra storia" onNav={onNav} />}
      {page === 'lista'     && <PagePlaceholder title="Lista Nozze" onNav={onNav} />}
      {page === 'faq'       && <PagePlaceholder title="FAQ" onNav={onNav} />}
    </>
  );
}
