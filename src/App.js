import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,700;1,400&family=Jost:wght@200;300;400;700;900&display=swap');

  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior:smooth; }
  body { background:#FFFFFF; color:#1A1410; font-family:'Jost',sans-serif; font-weight:300; overflow-x:hidden; }
  :root { --yellow:#FDF8DC; --orange:#E8622A; --stripe:#EECDE0; --green:#1B4D2E; --ink:#1A1410; --ink-mid:#3A3530; }

  .sm-nav { position:fixed; top:0; left:0; right:0; z-index:200; display:flex; justify-content:space-between; align-items:center; padding:20px 48px; background:rgba(255,255,255,.97); backdrop-filter:blur(12px); box-shadow:0 1px 0 rgba(232,98,42,.15); }
  .sm-nav-logo { font-family:'EB Garamond',serif; font-size:1rem; font-weight:400; letter-spacing:.4em; color:var(--ink); text-transform:uppercase; text-decoration:none; cursor:pointer; }
  .sm-burger { width:36px; height:20px; display:flex; flex-direction:column; justify-content:space-between; cursor:pointer; background:none; border:none; padding:0; }
  .sm-burger span { display:block; width:100%; height:1px; background:var(--ink); transition:transform .5s cubic-bezier(.77,0,.175,1), opacity .4s, width .4s; transform-origin:center; }
  .sm-burger.open span:nth-child(1) { transform:translateY(9.5px) rotate(45deg); }
  .sm-burger.open span:nth-child(2) { opacity:0; width:0; }
  .sm-burger.open span:nth-child(3) { transform:translateY(-9.5px) rotate(-45deg); }

  .sm-overlay { position:fixed; inset:0; z-index:250; background:#FFFFFF; display:flex; flex-direction:column; justify-content:center; align-items:flex-start; padding:0 10vw; pointer-events:none; opacity:0; transition:opacity .5s cubic-bezier(.77,0,.175,1); }
  .sm-overlay.open { opacity:1; pointer-events:all; }
  .sm-menu-close { position:absolute; top:24px; right:48px; background:none; border:none; cursor:pointer; font-size:2rem; color:var(--ink); transition:color .3s; }
  .sm-menu-close:hover { color:var(--orange); }
  .sm-menu-nav { list-style:none; width:100%; }
  .sm-menu-nav li { overflow:hidden; border-bottom:1px solid rgba(45,90,61,.15); padding:20px 0; }
  .sm-menu-nav li:first-child { border-top:1px solid rgba(45,90,61,.15); }
  .sm-menu-nav a { font-family:'Jost',sans-serif; font-size:1.05rem; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:var(--ink); text-decoration:none; display:block; transform:translateY(30px); transition:transform .5s cubic-bezier(.77,0,.175,1), color .3s; cursor:pointer; }
  .sm-overlay.open .sm-menu-nav a { transform:translateY(0); }
  .sm-menu-nav li:nth-child(1) a { transition-delay:.05s; }
  .sm-menu-nav li:nth-child(2) a { transition-delay:.10s; }
  .sm-menu-nav li:nth-child(3) a { transition-delay:.15s; }
  .sm-menu-nav li:nth-child(4) a { transition-delay:.20s; }
  .sm-menu-nav li:nth-child(5) a { transition-delay:.25s; }
  .sm-menu-nav li:nth-child(6) a { transition-delay:.30s; }
  .sm-menu-nav a:hover { color:var(--orange); }

  .sm-hero { height:100vh; display:flex; flex-direction:column; overflow:hidden; position:relative; }
  .sm-stripes { display:flex; flex-direction:column; height:100%; }
  .sm-stripe { flex:1; }
  .sm-stripe:nth-child(odd) { background:#FFFFFF; }
  .sm-stripe:nth-child(even) { background:var(--stripe); }
  .sm-hero-text { position:absolute; inset:0; display:flex; flex-direction:column; justify-content:center; z-index:2; pointer-events:none; padding:0 3vw; margin-top:-10vh; }
  .sm-hero-row { display:flex; align-items:baseline; line-height:.88; }
  .sm-hl { font-family:'EB Garamond',serif; font-weight:700; color:var(--orange); font-size:clamp(14vw,19vw,23vw); display:inline-block; line-height:.88; letter-spacing:.01em; }
  .sm-hl-S{transform:translateY(4%)} .sm-hl-A1{transform:translateY(-3%)} .sm-hl-R1{transform:translateY(5%)} .sm-hl-A2{transform:translateY(-2%)}
  .sm-hl-amp { font-family:'EB Garamond',serif; font-weight:700; color:var(--orange); font-size:clamp(14vw,19vw,23vw); display:inline-block; line-height:.88; transform:translateY(4%); }
  .sm-hl-M{transform:translateY(4%)} .sm-hl-A3{transform:translateY(-4%)} .sm-hl-R2{transform:translateY(5%)} .sm-hl-C{transform:translateY(-3%)} .sm-hl-O{transform:translateY(4%)}
  .sm-hero-scroll { position:absolute; bottom:32px; right:48px; display:flex; flex-direction:column; align-items:center; gap:8px; font-size:.52rem; letter-spacing:.28em; text-transform:uppercase; color:var(--orange); }
  .sm-scroll-bar { width:1px; height:36px; background:var(--orange); }

  .sm-storia { padding:100px 48px 120px; background:#FFFFFF; display:flex; justify-content:center; }
  .sm-storia-inner { text-align:center; max-width:680px; }
  .sm-storia-heading { font-size:1rem; font-weight:300; line-height:2; color:var(--ink-mid); }
  .sm-storia-body { font-size:1rem; line-height:2; color:var(--ink-mid); font-weight:300; }
  .sm-sposiamo { font-family:'EB Garamond',serif; font-size:2em; color:var(--orange); font-weight:700; }
  .sm-excl { font-size:1.3em; line-height:0; vertical-align:-.1em; }

  .sm-wave { display:block; line-height:0; margin-bottom:-2px; background:#FFFFFF; }
  .sm-wave svg { width:100%; height:80px; display:block; }
  .sm-wave-bottom { background:#FFFFFF; margin-top:-2px; }

  .sm-programma { background:var(--yellow); padding:80px 48px; }
  .sm-tl-title { font-family:'EB Garamond',serif; font-size:clamp(2.4rem,4vw,4rem); font-weight:700; color:var(--green); text-align:center; margin-bottom:72px; opacity:0; transform:translateY(40px); transition:opacity .8s ease, transform .8s ease; }
  .sm-tl-title.visible { opacity:1; transform:translateY(0); }
  .sm-tl-days { display:grid; grid-template-columns:1fr 1fr; }
  .sm-tl-day { padding:48px; border-left:1px solid rgba(58,53,48,.12); opacity:0; transform:translateY(50px); transition:opacity .7s ease, transform .7s ease; }
  .sm-tl-day.visible { opacity:1; transform:translateY(0); }
  .sm-tl-day:first-child { border-left:none; border-right:1px solid rgba(58,53,48,.12); }
  .sm-tl-day-label { font-size:.72rem; letter-spacing:.25em; text-transform:uppercase; color:var(--ink); font-weight:500; margin-bottom:12px; }
  .sm-tl-day-title { font-family:'EB Garamond',serif; font-size:clamp(2.2rem,5vw,4rem); font-weight:700; color:var(--green); text-transform:uppercase; letter-spacing:.03em; line-height:1; margin-bottom:40px; padding-bottom:32px; border-bottom:1px solid rgba(58,53,48,.12); }
  .sm-tl-event-list { display:flex; flex-direction:column; gap:32px; }
  .sm-tl-item { display:flex; flex-direction:column; gap:8px; opacity:0; transform:translateY(30px); transition:opacity .6s ease, transform .6s ease; }
  .sm-tl-item.visible { opacity:1; transform:translateY(0); }
  .sm-tl-time { font-size:.72rem; letter-spacing:.2em; text-transform:uppercase; color:var(--ink-mid); font-weight:300; }
  .sm-tl-event { font-family:'EB Garamond',serif; font-size:clamp(1.8rem,3vw,2.8rem); font-weight:400; color:var(--ink); }
  .sm-tl-desc { font-size:1rem; line-height:1.9; color:var(--ink-mid); }
  .sm-tl-desc-em { font-weight:600; }
  .sm-tl-link { display:inline-block; margin-top:6px; font-size:.55rem; letter-spacing:.2em; text-transform:uppercase; color:var(--ink); text-decoration:none; font-weight:500; }

  .sm-rsvp { padding:100px 48px; background:#FFFFFF; text-align:center; display:flex; flex-direction:column; align-items:center; gap:40px; }
  .sm-rsvp-heading { font-family:'EB Garamond',serif; font-size:clamp(3rem,6vw,7rem); font-weight:400; line-height:1; color:var(--ink); }
  .sm-rsvp-body { font-size:1rem; line-height:2; color:var(--ink-mid); max-width:560px; }
  .sm-rsvp-btn { display:inline-block; background:#EECDE0; color:var(--orange); padding:22px 64px; text-decoration:none; font-size:1.1rem; letter-spacing:.18em; text-transform:uppercase; font-weight:900; font-family:'Jost',sans-serif; transition:background .3s, color .3s; -webkit-text-stroke:.5px var(--orange); }
  .sm-rsvp-btn:hover { background:var(--orange); color:#EECDE0; -webkit-text-stroke:.5px #EECDE0; }

  .sm-footer { background:#111111; padding:64px 48px; }
  .sm-footer-intro { text-align:center; margin-bottom:28px; font-family:'EB Garamond',serif; font-size:1.4rem; color:rgba(255,255,255,.9); }
  .sm-contacts-wrap { border-top:1px solid rgba(255,255,255,.12); max-width:480px; margin:0 auto; }
  .sm-acc-item { border-bottom:1px solid rgba(255,255,255,.12); }
  .sm-acc-btn { width:100%; background:none; border:none; cursor:pointer; padding:20px 4px; display:flex; justify-content:space-between; align-items:center; }
  .sm-acc-label { font-size:.52rem; letter-spacing:.3em; text-transform:uppercase; font-family:'Jost',sans-serif; color:rgba(255,255,255,.5); }
  .sm-acc-arrow { font-size:.75rem; color:var(--orange); transition:transform .35s; display:inline-block; }
  .sm-acc-arrow.open { transform:rotate(180deg); }
  .sm-acc-drawer { overflow:hidden; max-height:0; transition:max-height .45s ease; }
  .sm-acc-drawer.open { max-height:300px; }
  .sm-acc-content { padding:4px 0 20px; }
  .sm-acc-content a { display:block; font-family:'EB Garamond',serif; font-size:1rem; color:rgba(255,255,255,.8); text-decoration:none; padding:8px 0; border-bottom:1px solid rgba(255,255,255,.08); }
  .sm-acc-content a:last-child { border-bottom:none; }

  .page-placeholder { min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; font-family:'EB Garamond',serif; gap:24px; }
  .page-placeholder h1 { font-size:3rem; color:var(--green); font-weight:700; }
  .page-placeholder p { font-size:1.2rem; color:var(--ink-mid); }
  .page-back { font-family:'Jost',sans-serif; font-size:.75rem; letter-spacing:.2em; text-transform:uppercase; color:var(--orange); text-decoration:none; cursor:pointer; background:none; border:none; margin-top:16px; }

  @media (max-width:768px) {
    .sm-nav { padding:16px 24px; }
    .sm-menu-close { right:24px; }
    .sm-storia { padding:60px 24px 80px; }
    .sm-programma { padding:60px 0; }
    .sm-tl-title { padding:0 24px; }
    .sm-tl-days { grid-template-columns:1fr; }
    .sm-tl-day { border-left:none !important; border-right:none !important; border-top:1px solid rgba(58,53,48,.1); padding:40px 24px; }
    .sm-tl-day:first-child { border-top:none; }
    .sm-rsvp { padding:80px 24px; }
    .sm-footer { padding:48px 24px; }
    .sm-hero-scroll { right:24px; }
  }
`;

function Accordion({ label, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="sm-acc-item">
      <button className="sm-acc-btn" onClick={() => setOpen(o => !o)}>
        <span className="sm-acc-label">{label}</span>
        <span className={`sm-acc-arrow${open ? " open" : ""}`}>↓</span>
      </button>
      <div className={`sm-acc-drawer${open ? " open" : ""}`}>
        <div className="sm-acc-content">{children}</div>
      </div>
    </div>
  );
}

function PagePlaceholder({ title }) {
  const navigate = useNavigate();
  return (
    <>
      <NavBar />
      <div className="page-placeholder">
        <h1>{title}</h1>
        <p>Pagina in arrivo ♡</p>
        <button className="page-back" onClick={() => navigate("/")}>← Torna alla home</button>
      </div>
    </>
  );
}

const menuItems = [
  { label: "La nostra storia", href: "/storia" },
  { label: "Programma",        href: "/#programma" },
  { label: "Come arrivarci",   href: "/come-arrivarci" },
  { label: "RSVP",             href: "/rsvp" },
  { label: "Lista nozze",      href: "/lista-nozze" },
  { label: "FAQ",              href: "/faq" },
];


function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const openMenu  = () => { setMenuOpen(true);  document.body.style.overflow = "hidden"; };
  const closeMenu = () => { setMenuOpen(false); document.body.style.overflow = ""; };

  const handleLink = (e, href) => {
    e.preventDefault();
    closeMenu();
    if (href === "/#programma") {
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector("#programma");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      navigate(href);
    }
  };

  return (
    <>
      <div className={`sm-overlay${menuOpen ? " open" : ""}`}>
        <button className="sm-menu-close" onClick={closeMenu}>&#x2715;</button>
        <ul className="sm-menu-nav">
          {menuItems.map((item, i) => (
            <li key={i}>
              <a href={item.href} onClick={e => handleLink(e, item.href)}>{item.label}</a>
            </li>
          ))}
        </ul>
      </div>
      <nav className="sm-nav">
        <span className="sm-nav-logo" onClick={() => { closeMenu(); navigate("/"); }}>S & M</span>
        <button className={`sm-burger${menuOpen ? " open" : ""}`} onClick={menuOpen ? closeMenu : openMenu} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>
    </>
  );
}

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const targets = document.querySelectorAll('.sm-tl-title, .sm-tl-day, .sm-tl-item');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const days  = Array.from(document.querySelectorAll('.sm-tl-day'));
          const items = Array.from(document.querySelectorAll('.sm-tl-item'));
          const delay = el.classList.contains('sm-tl-title') ? 0
                      : el.classList.contains('sm-tl-day')  ? days.indexOf(el) * 150
                      : items.indexOf(el) * 120 + 200;
          setTimeout(() => el.classList.add('visible'), delay);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.05 });
    targets.forEach(el => obs.observe(el));
    const fallback = setTimeout(() => targets.forEach(el => el.classList.add('visible')), 2000);
    return () => { obs.disconnect(); clearTimeout(fallback); };
  }, []);

  return (
    <>
      <NavBar />

      <section className="sm-hero" id="hero">
        <div className="sm-stripes">
          {[...Array(6)].map((_, i) => <div key={i} className="sm-stripe" />)}
        </div>
        <div className="sm-hero-text">
          <div className="sm-hero-row">
            <span className="sm-hl-amp">&amp;</span>
            <span className="sm-hl sm-hl-S">S</span>
            <span className="sm-hl sm-hl-A1">A</span>
            <span className="sm-hl sm-hl-R1">R</span>
            <span className="sm-hl sm-hl-A2">A</span>
          </div>
          <div className="sm-hero-row">
            <span className="sm-hl sm-hl-M">M</span>
            <span className="sm-hl sm-hl-A3">A</span>
            <span className="sm-hl sm-hl-R2">R</span>
            <span className="sm-hl sm-hl-C">C</span>
            <span className="sm-hl sm-hl-O">O</span>
          </div>
        </div>
        <div className="sm-hero-scroll">
          <div className="sm-scroll-bar" />
          <span>Scorri</span>
        </div>
      </section>

      <section className="sm-storia" id="storia">
        <div className="sm-storia-inner">
          <h2 className="sm-storia-heading">Ebbene sì…</h2>
          <p className="sm-storia-body">
            Dopo 14 anni insieme abbiamo deciso che il periodo di prova è terminato.<br /><br />
            <span className="sm-sposiamo">Ci sposiamo<span className="sm-excl">!</span></span><br /><br />
            E ci farebbe piacere festeggiare con te.
          </p>
        </div>
      </section>

      <div className="sm-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="#FDF8DC" />
        </svg>
      </div>

      <section className="sm-programma" id="programma">
        <p className="sm-tl-title">Programma</p>
        <div className="sm-tl-days">
          <div className="sm-tl-day">
            <p className="sm-tl-day-label">Sabato · 19 Luglio</p>
            <h2 className="sm-tl-day-title">Panzerottata</h2>
            <div className="sm-tl-event-list">
              <div className="sm-tl-item">
                <p className="sm-tl-time">Ore 20 : 00</p>
                <h3 className="sm-tl-event">Si frigge!</h3>
                <p className="sm-tl-desc">
                  Vi aspettiamo per una serata a base di panzerotti — iniziamo con il piede giusto e lo stomaco pieno.<br />
                  <span className="sm-tl-desc-em">I panzerotti sono una cosa seria — vestiti comodo!</span>
                </p>
                <a className="sm-tl-link" href="/come-arrivarci" onClick={e => { e.preventDefault(); navigate("/come-arrivarci"); }}>Come arrivarci →</a>
              </div>
            </div>
          </div>
          <div className="sm-tl-day">
            <p className="sm-tl-day-label">Domenica · 20 Luglio</p>
            <h2 className="sm-tl-day-title">Matrimonio</h2>
            <div className="sm-tl-event-list">
              <div className="sm-tl-item">
                <p className="sm-tl-time">Ore 18 : 00</p>
                <h3 className="sm-tl-event">Cerimonia</h3>
                <p className="sm-tl-desc">
                  Masseria Don Luigi.<br />
                  <span className="sm-tl-desc-em">14 anni di attesa sono stati più che sufficienti — siate puntuali, mi raccomando.</span>
                </p>
              </div>
              <div className="sm-tl-item">
                <p className="sm-tl-time">Ore 19 : 00</p>
                <h3 className="sm-tl-event">Ricevimento</h3>
                <p className="sm-tl-desc">Si mangia, si beve — e con voi il resto viene da sé.</p>
                <a className="sm-tl-link" href="/come-arrivarci" onClick={e => { e.preventDefault(); navigate("/come-arrivarci"); }}>Come raggiungere la location →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="sm-wave sm-wave-bottom">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,0 L0,0 Z" fill="#FDF8DC" />
        </svg>
      </div>

      <section className="sm-rsvp" id="rsvp">
        <h2 className="sm-rsvp-heading">Ci sei?</h2>
        <p className="sm-rsvp-body">
          Che tu venga per i panzerotti, per il matrimonio o per entrambi —<br />
          facci sapere! Ci teniamo ad averti con noi.
        </p>
        <button className="sm-rsvp-btn" onClick={() => navigate("/rsvp")}>Conferma presenza</button>
      </section>

      <footer className="sm-footer">
        <p className="sm-footer-intro">Hai domande? Siamo qui.</p>
        <div className="sm-contacts-wrap">
          <Accordion label="Sara">
            <a href="mailto:saracecere94@gmail.com">saracecere94@gmail.com</a>
            <a href="https://wa.me/393895194574" target="_blank" rel="noreferrer">+39 389 519 4574 · WhatsApp</a>
          </Accordion>
          <Accordion label="Marco">
            <a href="mailto:marco.conve@hotmail.it">marco.conve@hotmail.it</a>
            <a href="https://wa.me/393272917349" target="_blank" rel="noreferrer">+39 327 291 7349 · WhatsApp</a>
          </Accordion>
        </div>
      </footer>
    </>
  );
}

const rsvpCss = `
  .rsvp-page { min-height:100vh; background:#FFFFFF; padding:120px 48px 80px; display:flex; flex-direction:column; align-items:center; }
  .rsvp-page-title { font-family:'EB Garamond',serif; font-size:clamp(3rem,6vw,5rem); font-weight:700; color:var(--green); margin-bottom:12px; text-align:center; }
  .rsvp-page-sub { font-size:1rem; color:var(--ink-mid); margin-bottom:56px; text-align:center; line-height:2; }
  .rsvp-form { width:100%; max-width:560px; display:flex; flex-direction:column; gap:36px; }
  .rsvp-field { display:flex; flex-direction:column; gap:10px; }
  .rsvp-label { font-size:.65rem; letter-spacing:.25em; text-transform:uppercase; font-family:'Jost',sans-serif; color:var(--ink); font-weight:500; }
  .rsvp-input { border:none; border-bottom:1px solid rgba(26,20,16,.25); padding:12px 0; font-family:'EB Garamond',serif; font-size:1.1rem; color:var(--ink); background:transparent; outline:none; transition:border-color .3s; }
  .rsvp-input:focus { border-bottom-color:var(--orange); }
  .rsvp-options { display:flex; flex-direction:column; gap:12px; }
  .rsvp-option { display:flex; align-items:center; gap:14px; cursor:pointer; }
  .rsvp-option input[type="radio"] { display:none; }
  .rsvp-option-dot { width:18px; height:18px; border-radius:50%; border:1.5px solid rgba(26,20,16,.3); flex-shrink:0; transition:border-color .3s, background .3s; display:flex; align-items:center; justify-content:center; }
  .rsvp-option input[type="radio"]:checked + .rsvp-option-dot { border-color:var(--orange); background:var(--orange); }
  .rsvp-option input[type="radio"]:checked + .rsvp-option-dot::after { content:''; width:6px; height:6px; border-radius:50%; background:#fff; }
  .rsvp-option-label { font-family:'EB Garamond',serif; font-size:1.1rem; color:var(--ink); }
  .rsvp-submit { align-self:flex-start; background:#EECDE0; color:var(--orange); padding:20px 56px; border:none; cursor:pointer; font-size:1rem; letter-spacing:.18em; text-transform:uppercase; font-weight:900; font-family:'Jost',sans-serif; transition:background .3s, color .3s; -webkit-text-stroke:.5px var(--orange); margin-top:8px; }
  .rsvp-submit:hover { background:var(--orange); color:#EECDE0; -webkit-text-stroke:.5px #EECDE0; }
  .rsvp-success { text-align:center; font-family:'EB Garamond',serif; font-size:1.8rem; color:var(--green); margin-top:48px; }
  .rsvp-back { font-family:'Jost',sans-serif; font-size:.65rem; letter-spacing:.2em; text-transform:uppercase; color:var(--orange); background:none; border:none; cursor:pointer; margin-bottom:40px; align-self:flex-start; }
  .rsvp-toggle-wrap { display:flex; align-items:center; justify-content:space-between; padding:4px 0; }
  .rsvp-toggle-text { font-family:'EB Garamond',serif; font-size:1.1rem; color:var(--ink); }
  .rsvp-toggle { position:relative; width:48px; height:26px; flex-shrink:0; }
  .rsvp-toggle input { opacity:0; width:0; height:0; }
  .rsvp-toggle-slider { position:absolute; inset:0; background:rgba(26,20,16,.15); border-radius:26px; cursor:pointer; transition:background .3s; }
  .rsvp-toggle-slider::before { content:''; position:absolute; width:20px; height:20px; left:3px; top:3px; background:#fff; border-radius:50%; transition:transform .3s; }
  .rsvp-toggle input:checked + .rsvp-toggle-slider { background:var(--orange); }
  .rsvp-toggle input:checked + .rsvp-toggle-slider::before { transform:translateX(22px); }
  @media(max-width:768px) { .rsvp-page { padding:100px 24px 60px; } }
`;

function RSVPPage() {
  const [nome, setNome] = useState("");
  const [partecipa, setPartecipa] = useState("");
  const [allergie, setAllergie] = useState("");
  const [pernotto, setPernotto] = useState("");
  const [inviato, setInviato] = useState(false);
  const [bambini, setBambini] = useState(false);

  const mostraPernotto = partecipa === "entrambi" || partecipa === "solo_matrimonio";

  const handleSubmit = (e) => {
    e.preventDefault();
    setInviato(true);
  };

  return (
    <>
      <style>{rsvpCss}</style>
      <NavBar />
      <div className="rsvp-page">
        <h1 className="rsvp-page-title">RSVP</h1>
        <p className="rsvp-page-sub">Facci sapere se ci sarai — ci teniamo ad averti con noi.</p>

        {inviato ? (
          <div className="rsvp-success">Grazie! Non vediamo l'ora di festeggiare con te ♡</div>
        ) : (
          <form className="rsvp-form" onSubmit={handleSubmit}>

            <div className="rsvp-field">
              <label className="rsvp-label">Nome e Cognome</label>
              <input
                className="rsvp-input"
                type="text"
                placeholder="Il tuo nome..."
                value={nome}
                onChange={e => setNome(e.target.value)}
                required
              />
            </div>

            <div className="rsvp-field">
              <label className="rsvp-label">Parteciperai?</label>
              <div className="rsvp-options">
                {[
                  { value: "solo_matrimonio", label: "Sì, solo il giorno del matrimonio" },
                  { value: "entrambi",        label: "Sì, entrambi i giorni" },
                  { value: "no",              label: "No, mi dispiace" },
                ].map(opt => (
                  <label className="rsvp-option" key={opt.value}>
                    <input type="radio" name="partecipa" value={opt.value} checked={partecipa === opt.value} onChange={e => setPartecipa(e.target.value)} required />
                    <span className="rsvp-option-dot"></span>
                    <span className="rsvp-option-label">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="rsvp-field">
              <label className="rsvp-label">Allergie, intolleranze o diete particolari?</label>
              <input
                className="rsvp-input"
                type="text"
                placeholder="Se non hai nessuna esigenza lascia pure vuoto..."
                value={allergie}
                onChange={e => setAllergie(e.target.value)}
              />
            </div>

            <div className="rsvp-field">
              <label className="rsvp-label">Verranno bambini con te?</label>
              <div className="rsvp-toggle-wrap">
                <span className="rsvp-toggle-text">{bambini ? "Sì, ci saranno bambini" : "No, solo adulti"}</span>
                <label className="rsvp-toggle">
                  <input type="checkbox" checked={bambini} onChange={e => setBambini(e.target.checked)} />
                  <span className="rsvp-toggle-slider"></span>
                </label>
              </div>
            </div>

            {mostraPernotto && (
              <div className="rsvp-field">
                <label className="rsvp-label">Avrai bisogno di pernottare in masseria la sera del matrimonio?</label>
                <div className="rsvp-options">
                  {[
                    { value: "si", label: "Sì, mi farebbe piacere" },
                    { value: "no", label: "No, grazie" },
                  ].map(opt => (
                    <label className="rsvp-option" key={opt.value}>
                      <input type="radio" name="pernotto" value={opt.value} checked={pernotto === opt.value} onChange={e => setPernotto(e.target.value)} />
                      <span className="rsvp-option-dot"></span>
                      <span className="rsvp-option-label">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <button className="rsvp-submit" type="submit">Invia</button>
          </form>
        )}
      </div>
    </>
  );
}

export default function App() {
  return (
    <>
      <style>{css}</style>
      <BrowserRouter>
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/storia"      element={<PagePlaceholder title="La nostra storia" />} />
          <Route path="/come-arrivarci" element={<PagePlaceholder title="Come arrivarci" />} />
          <Route path="/rsvp"        element={<RSVPPage />} />
          <Route path="/lista-nozze" element={<PagePlaceholder title="Lista Nozze" />} />
          <Route path="/faq"         element={<PagePlaceholder title="FAQ" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
