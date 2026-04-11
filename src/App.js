import { useState, useEffect, useRef } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,700;1,400&family=Jost:wght@300;400;700;900&family=Dancing+Script:wght@500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
html, body { scroll-behavior:smooth; background:#FFFFFF; color:#1A1410; font-family:'Jost',sans-serif; font-weight:300; overflow-x:hidden; }
:root { --yellow:#FDF8DC; --orange:#E8622A; --stripe:#EECDE0; --green:#4E7A6A; --ink:#1A1410; --ink-mid:#3A3530; }
.nav { position:fixed; top:0; left:0; right:0; z-index:300; height:64px; display:flex; justify-content:space-between; align-items:center; padding:0 48px; background:rgba(255,255,255,.97); backdrop-filter:blur(12px); box-shadow:0 1px 0 rgba(232,98,42,.15); }
.nav-logo { font-family:'EB Garamond',serif; font-size:1.3rem; font-weight:700; letter-spacing:.25em; text-transform:uppercase; color:#1A1410; cursor:pointer; background:none; border:none; }
.burger { width:32px; height:22px; display:flex; flex-direction:column; justify-content:space-between; cursor:pointer; background:none; border:none; padding:0; }
.burger span { display:block; width:100%; height:2px; background:#1A1410; transition:transform .35s cubic-bezier(.4,0,.2,1), opacity .2s; transform-origin:center; }
.burger.open span:nth-child(1) { transform:translateY(10px) rotate(45deg); }
.burger.open span:nth-child(2) { opacity:0; transform:scaleX(0); }
.burger.open span:nth-child(3) { transform:translateY(-10px) rotate(-45deg); }
.menu-overlay { position:fixed; inset:0; z-index:250; background:#FFFFFF; display:flex; flex-direction:column; justify-content:center; align-items:flex-start; padding:0 10vw; pointer-events:none; opacity:0; transition:opacity .5s; }
.menu-overlay.open { opacity:1; pointer-events:all; }
.menu-nav { list-style:none; width:100%; }
.menu-nav li { border-bottom:1px solid rgba(45,90,61,.15); padding:20px 0; }
.menu-nav li:first-child { border-top:1px solid rgba(45,90,61,.15); }
.menu-nav button.menu-link { font-family:'Jost',sans-serif; font-size:1.05rem; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:#1A1410; background:none; border:none; cursor:pointer; width:100%; text-align:left; padding:0; }
.menu-nav button.menu-link:hover { color:#E8622A; }
.hero { height:100vh; display:flex; flex-direction:column; overflow:hidden; position:relative; }
.stripes { display:flex; flex-direction:column; height:100%; }
.stripe { flex:1; }
.stripe:nth-child(odd) { background:#FFFFFF; }
.stripe:nth-child(even) { background:#EECDE0; }
.hero-text { position:absolute; inset:0; display:flex; flex-direction:column; justify-content:center; z-index:2; pointer-events:none; padding:0 3vw; margin-top:-10vh; }
.hero-row { display:flex; align-items:baseline; line-height:.88; }
.hl { font-family:'EB Garamond',serif; font-weight:700; color:#E8622A; font-size:clamp(14vw,19vw,23vw); display:inline-block; line-height:.88; letter-spacing:.01em; }
.hl-amp { font-family:'EB Garamond',serif; font-weight:700; color:#E8622A; font-size:clamp(14vw,19vw,23vw); display:inline-block; line-height:.88; transform:translateY(4%); }
.hero-scroll { position:absolute; bottom:32px; right:48px; display:flex; flex-direction:column; align-items:center; gap:8px; font-size:.52rem; letter-spacing:.28em; text-transform:uppercase; color:#E8622A; }
.storia-section { padding:100px 48px 120px; background:#FFFFFF; display:flex; justify-content:center; }
.storia-inner { text-align:center; max-width:680px; }
.storia-heading { font-size:1rem; font-weight:300; line-height:2; color:#3A3530; font-family:'Jost',sans-serif; }
.storia-body { font-size:1rem; line-height:2; color:#3A3530; font-weight:300; font-family:'Jost',sans-serif; }
.sposiamo { font-family:'EB Garamond',serif; font-size:2em; color:#E8622A; font-weight:700; }
.wedding-date { font-family:'EB Garamond',serif; font-size:clamp(1.8rem,5vw,3rem); font-weight:700; color:#E8622A; text-align:center; margin:32px 0 24px; line-height:1; }
.countdown-wrap { display:flex; justify-content:center; align-items:flex-start; gap:4px; margin-bottom:16px; flex-wrap:nowrap; width:100%; }
.countdown-unit { display:flex; flex-direction:column; align-items:center; gap:4px; flex:0 0 auto; }
.countdown-num { font-family:'EB Garamond',serif; font-size:clamp(1.4rem,4vw,2.8rem); font-weight:700; color:#4E7A6A; line-height:1; min-width:40px; text-align:center; }
.countdown-label { font-family:'Jost',sans-serif; font-size:.5rem; font-weight:700; letter-spacing:.15em; text-transform:uppercase; color:#3A3530; }
.countdown-sep { font-family:'EB Garamond',serif; font-size:clamp(1.4rem,4vw,2.8rem); font-weight:300; color:#EECDE0; line-height:1; padding-top:2px; flex-shrink:0; }
.wave svg { width:100%; display:block; }
.wave.wave-bottom { background:#FFFFFF; }
.wave-bar { width:100%; overflow:hidden; line-height:0; }
.wave-bar svg { width:100%; height:100px; display:block; }
.programma { background:#FDF8DC; padding:80px 48px; }
.tl-title { font-family:'EB Garamond',serif; font-size:clamp(2.4rem,4vw,4rem); font-weight:700; color:#4E7A6A; text-align:center; margin-bottom:72px; }
.tl-days { display:flex; flex-direction:column; gap:0; max-width:680px; margin:0 auto; }
.tl-day { padding:48px 0; opacity:0; transform:translateY(50px); transition:opacity .7s ease, transform .7s ease; }
.tl-day.visible { opacity:1; transform:none; }
.tl-day-label { font-family:'Jost',sans-serif; font-size:.72rem; letter-spacing:.25em; text-transform:uppercase; color:#3A3530; font-weight:300; margin-bottom:8px; }
.tl-day-title { font-family:'EB Garamond',serif; font-size:clamp(2rem,4vw,3.5rem); font-weight:700; color:#4E7A6A; text-transform:uppercase; }
.tl-day-divider { border:none; border-top:1px solid rgba(58,53,48,.18); margin:20px 0 28px; }
.tl-event-list { display:flex; flex-direction:column; gap:32px; }
.tl-item { display:flex; flex-direction:column; gap:8px; opacity:0; transform:translateY(30px); transition:opacity .6s ease, transform .6s ease; }
.tl-item.visible { opacity:1; transform:none; }
.tl-time { font-size:.72rem; letter-spacing:.2em; text-transform:uppercase; color:#3A3530; font-weight:300; font-family:'Jost',sans-serif; }
.tl-event { font-family:'EB Garamond',serif; font-size:clamp(1.8rem,3vw,2.8rem); font-weight:400; color:#1A1410; }
.tl-desc { font-size:1rem; line-height:1.9; color:#3A3530; font-family:'Jost',sans-serif; font-weight:300; }
.tl-link { font-family:'Jost',sans-serif; font-size:.72rem; font-weight:400; letter-spacing:.15em; text-transform:uppercase; color:#1A1410; background:none; border:none; cursor:pointer; margin-top:10px; display:inline-block; padding-bottom:2px; text-decoration:underline; text-underline-offset:4px; }
.tl-link:hover { color:#E8622A; }
.rsvp-section { padding:80px 48px; background:#FFFFFF; text-align:center; }
.rsvp-heading { font-family:'EB Garamond',serif; font-size:clamp(2.5rem,6vw,5rem); font-weight:400; color:#1A1410; margin-bottom:20px; }
.rsvp-body { font-family:'Jost',sans-serif; font-size:1rem; font-weight:300; color:#3A3530; margin-bottom:40px; line-height:1.7; max-width:480px; margin-left:auto; margin-right:auto; }
.rsvp-btn { display:inline-block; background:#EECDE0; color:#E8622A; padding:22px 64px; border:none; cursor:pointer; font-size:1.1rem; letter-spacing:.18em; text-transform:uppercase; font-weight:700; font-family:'Jost',sans-serif; width:100%; max-width:600px; }
.rsvp-btn:hover { background:#E8622A; color:#EECDE0; }
footer { background:#111111; padding:64px 48px; }
.footer-intro { text-align:center; margin-bottom:28px; font-family:'EB Garamond',serif; font-size:1.4rem; color:rgba(255,255,255,.9); }
.contacts-wrap { display:flex; justify-content:center; gap:16px; flex-wrap:wrap; }
.contact-acc { border-top:1px solid rgba(255,255,255,.12); width:100%; max-width:320px; }
.contact-acc-btn { width:100%; display:flex; justify-content:space-between; align-items:center; padding:18px 0; background:none; border:none; cursor:pointer; font-family:'Jost',sans-serif; font-size:.75rem; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.7); }
.contact-acc-arrow { transition:transform .35s; font-size:1rem; color:#E8622A; display:inline-block; }
.contact-acc-arrow.open { transform:rotate(180deg); }
.contact-acc-drawer { max-height:0; overflow:hidden; transition:max-height .4s; }
.contact-acc-drawer.open { max-height:120px; }
.contact-acc-inner { padding:0 0 20px; display:flex; flex-direction:column; gap:8px; }
.contact-wa { display:inline-flex; align-items:center; gap:8px; font-family:'Jost',sans-serif; font-size:.8rem; color:rgba(255,255,255,.6); text-decoration:none; }
.contact-wa:hover { color:#E8622A; }
.page-back { font-family:'Jost',sans-serif; font-size:.7rem; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:#E8622A; background:none; border:none; cursor:pointer; }
.arrivarci-page { background:#FFFFFF; min-height:100vh; }
.arrivarci-section { padding:72px 48px; position:relative; overflow:hidden; }
.arrivarci-inner { position:relative; z-index:2; }
.arrivarci-label { font-family:'Jost',sans-serif; font-size:.7rem; font-weight:700; letter-spacing:.3em; text-transform:uppercase; color:#E8622A; margin-bottom:8px; }
.arrivarci-title { font-family:'EB Garamond',serif; font-size:clamp(2rem,6vw,4.5rem); font-weight:700; color:#4E7A6A; margin-bottom:32px; line-height:1; }
.arrivarci-place { font-family:'EB Garamond',serif; font-size:1.5rem; color:#1A1410; margin-bottom:4px; }
.arrivarci-address { font-family:'Jost',sans-serif; font-size:.9rem; font-weight:300; color:#E8622A; text-decoration:underline; text-underline-offset:3px; line-height:1.9; display:inline-block; }
.arrivarci-desc { font-size:1rem; line-height:1.9; color:#3A3530; margin:20px 0 0; }
.pz-pill { background:#EECDE0; border:2px solid #EECDE0; border-radius:999px; padding:12px 24px; cursor:pointer; display:inline-flex; align-items:center; gap:10px; font-family:'EB Garamond',serif; font-size:1rem; color:#1A1410; transition:background .2s, color .2s, border-color .2s; margin:28px 0 32px; font-style:italic; }
.pz-pill:hover { background:#E8622A; color:#FFFFFF; border-color:#E8622A; }
.comic-bubble-wrap { margin-top:4px; margin-bottom:8px; position:relative; display:inline-block; max-width:560px; width:100%; }
.comic-bubble-wrap::before { content:''; position:absolute; top:-18px; left:48px; width:0; height:0; border-left:12px solid transparent; border-right:12px solid transparent; border-bottom:20px solid #1A1410; }
.comic-bubble-wrap::after { content:''; position:absolute; top:-13px; left:51px; width:0; height:0; border-left:9px solid transparent; border-right:9px solid transparent; border-bottom:16px solid #EECDE0; z-index:1; }
.comic-bubble { position:relative; background:#EECDE0; border:3px solid #1A1410; border-radius:20px; padding:16px; box-shadow:5px 5px 0 #1A1410; }
.comic-bubble iframe { width:100%; aspect-ratio:16/9; border:none; border-radius:10px; display:block; }
.strada-overlay { display:none; position:fixed; inset:0; z-index:999; background:rgba(0,0,0,0.7); align-items:center; justify-content:center; }
.strada-overlay.open { display:flex; }
.rsvp-page { min-height:100vh; background:repeating-linear-gradient(-45deg,#EECDE0 0px,#EECDE0 80px,#FDF8DC 80px,#FDF8DC 160px); padding:100px 48px 80px; display:flex; flex-direction:column; align-items:center; }
.rsvp-card { background:#fff; padding:56px 48px 48px; width:100%; max-width:620px; }
.rsvp-page-title { font-family:'EB Garamond',serif; font-size:clamp(2rem,6vw,4rem); font-weight:700; color:#4E7A6A; text-align:center; margin-bottom:16px; }
.rsvp-page-sub { font-family:'EB Garamond',serif; font-size:1.1rem; color:#3A3530; text-align:center; margin-bottom:40px; line-height:1.6; }
.rsvp-form { display:flex; flex-direction:column; gap:32px; }
.rsvp-field { display:flex; flex-direction:column; gap:10px; }
.rsvp-label { font-family:'Jost',sans-serif; font-size:.7rem; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color:#1A1410; }
.rsvp-input { border:none; border-bottom:1px solid rgba(26,20,16,.2); padding:10px 0; font-family:'Jost',sans-serif; font-size:1rem; font-weight:300; color:#1A1410; background:transparent; outline:none; width:100%; }
.rsvp-input::placeholder { color:rgba(26,20,16,.3); }
.rsvp-input:focus { border-bottom-color:#E8622A; }
.rsvp-options { display:flex; flex-direction:column; gap:12px; }
.rsvp-option { display:flex; align-items:center; gap:12px; cursor:pointer; }
.rsvp-option-dot { width:18px; height:18px; border-radius:50%; border:1.5px solid rgba(26,20,16,.3); transition:border-color .2s,background .2s; flex-shrink:0; }
.rsvp-option-dot.checked { border-color:#4E7A6A; background:#4E7A6A; }
.rsvp-option-label { font-family:'Jost',sans-serif; font-size:.95rem; font-weight:300; color:#1A1410; }
.toggle-side { display:flex; align-items:center; gap:12px; }
.toggle-side-label { font-family:'Jost',sans-serif; font-size:.85rem; font-weight:300; color:#3A3530; }
.toggle { position:relative; display:inline-block; width:44px; height:24px; }
.toggle input { opacity:0; width:0; height:0; }
.toggle-slider { position:absolute; cursor:pointer; inset:0; background:rgba(26,20,16,.15); border-radius:24px; transition:.3s; }
.toggle-slider:before { content:""; position:absolute; height:18px; width:18px; left:3px; bottom:3px; background:white; border-radius:50%; transition:.3s; }
input:checked + .toggle-slider { background:#4E7A6A; }
input:checked + .toggle-slider:before { transform:translateX(20px); }
.rsvp-submit { font-family:'Jost',sans-serif; font-size:.75rem; font-weight:900; letter-spacing:.2em; text-transform:uppercase; color:#E8622A; background:#EECDE0; border:none; padding:18px 48px; cursor:pointer; width:100%; margin-top:8px; }
.rsvp-submit:hover { background:#E8622A; color:#EECDE0; }
.rsvp-submit:disabled { opacity:.6; cursor:not-allowed; }
.rsvp-success { text-align:center; padding:40px 0; }
.rsvp-success-title { font-family:'EB Garamond',serif; font-size:2rem; color:#4E7A6A; margin-bottom:12px; }
.rsvp-success-text { font-family:'Jost',sans-serif; font-size:.9rem; font-weight:300; color:#3A3530; line-height:1.7; }
.faq-page { background:#FFFFFF; padding:100px 48px 80px; min-height:100vh; }
.faq-inner { max-width:680px; margin:0 auto; }
.faq-heading { font-family:'EB Garamond',serif; font-size:clamp(2rem,6vw,4rem); font-weight:700; color:#4E7A6A; margin-bottom:48px; }
.faq-list { display:flex; flex-direction:column; }
.faq-item { border-top:1px solid rgba(26,20,16,.12); }
.faq-item:last-child { border-bottom:1px solid rgba(26,20,16,.12); }
.faq-btn { width:100%; display:flex; justify-content:space-between; align-items:center; padding:24px 0; background:none; border:none; cursor:pointer; text-align:left; gap:16px; }
.faq-q { font-family:'EB Garamond',serif; font-size:1.15rem; color:#1A1410; flex:1; }
.faq-arrow { font-size:1.4rem; color:#E8622A; transition:transform .3s; flex-shrink:0; display:inline-block; }
.faq-item.open .faq-arrow { transform:rotate(180deg); }
.faq-answer { max-height:0; overflow:hidden; transition:max-height .4s cubic-bezier(.77,0,.175,1); }
.faq-item.open .faq-answer { max-height:600px; }
.faq-answer p { font-family:'Jost',sans-serif; font-size:.9rem; font-weight:300; color:#3A3530; line-height:1.8; padding-bottom:16px; }
@media (max-width:768px) {
  .nav, .arrivarci-section, .faq-page, .rsvp-page { padding-left:24px; padding-right:24px; }
  .programma { padding:60px 24px; }
  .rsvp-card { padding:40px 24px 32px; }
  .storia-section { padding:80px 24px 80px; }
  .rsvp-section { padding:60px 24px; }
  footer { padding:48px 24px; }
}
`;

/* ─── Constants ─── */
const RECTS = Array.from({length:24},(_,i)=>({x:i*60,fill:i%2===0?'#EECDE0':'#E8622A'}));
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzSiLgToQwLtSpPOALnbLqVTBWbQzLnuSVVRmlJV15mOIm5E73HlH7lIxXTg4HixISr/exec';

const FAQS = [
  { q:"C'è un dress code?", a:["Per la panzerottata del sabato sera, l'unico vero requisito è avere l'elastico in vita… o almeno essere pronti ad allentare la cintura senza troppi rimorsi.","Per il matrimonio non c'è alcun dress code ufficiale: niente colori obbligatori, niente regole strane. Vestitevi come vi fa sentire al meglio — eleganti, comodi e pronti a festeggiare.","Un piccolo avviso per chi ama i tacchi: cerimonia e ricevimento si terranno sul prato. Ma niente panico — per chi non vuole rinunciare a qualche centimetro in più, ci pensiamo noi: forniremo i sotto-tacchi."] },
  { q:"Vengo da fuori, dove dormo la notte del matrimonio?", a:["Per chi viene da fuori è possibile pernottare in masseria. Se ti interessa, segnalacelo nell'RSVP."] },
  { q:"È previsto un servizio navetta?", a:["No, il servizio navetta non è previsto. Vi chiediamo di organizzarvi autonomamente per gli spostamenti."] },
  { q:"I bambini sono i benvenuti?", a:["Assolutamente sì — i bambini sono i benvenuti. Indicalo nell'RSVP così possiamo organizzarci al meglio."] },
  { q:"Posso portare un +1?", a:["La festa è pensata come una grande cena tra le persone a cui vogliamo bene — un momento intimo, non un evento di massa. Per questo motivo non è previsto il +1, salvo per le coppie che ci sono già care."] },
];

/* ─── Wave decorations ─── */
function WaveTop() {
  return (
    <div className="wave-bar" style={{marginTop:'64px'}}>
      <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs><clipPath id="wClipT"><path d="M0,60 C120,100 240,20 360,60 C480,100 600,20 720,60 C840,100 960,20 1080,60 C1200,100 1320,20 1440,60 L1440,0 L0,0 Z"/></clipPath></defs>
        <g clipPath="url(#wClipT)">{RECTS.map(r=><rect key={r.x} x={r.x} width="60" height="120" fill={r.fill}/>)}</g>
      </svg>
    </div>
  );
}

function WaveBottom() {
  return (
    <div className="wave-bar" style={{background:'#FFFFFF'}}>
      <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs><clipPath id="wClipB"><path d="M0,60 C120,20 240,100 360,60 C480,20 600,100 720,60 C840,20 960,100 1080,60 C1200,20 1320,100 1440,60 L1440,120 L0,120 Z"/></clipPath></defs>
        <g clipPath="url(#wClipB)">{RECTS.map(r=><rect key={r.x} x={r.x} width="60" height="120" fill={r.fill}/>)}</g>
      </svg>
    </div>
  );
}

/* ─── Nav ─── */
function Nav({ onNavigate }) {
  const [open, setOpen] = useState(false);
  const links = [
    {label:'La nostra storia', page:'storia'},
    {label:'Programma', page:'home', anchor:'programma'},
    {label:'Come arrivarci', page:'arrivarci'},
    {label:'RSVP', page:'rsvp'},
    {label:'Lista nozze', page:'lista'},
    {label:'FAQ', page:'faq'},
  ];
  function go(page, anchor) { setOpen(false); onNavigate(page, anchor); }
  return (
    <>
      <nav className="nav">
        <button className="nav-logo" onClick={() => go('home')}>S &amp; M</button>
        <button className={"burger"+(open?" open":"")} onClick={() => setOpen(o=>!o)} aria-label="Menu">
          <span/><span/><span/>
        </button>
      </nav>
      <div className={"menu-overlay"+(open?" open":"")}>
        <ul className="menu-nav">
          {links.map(l => (
            <li key={l.label}><button className="menu-link" onClick={() => go(l.page, l.anchor)}>{l.label}</button></li>
          ))}
        </ul>
      </div>
    </>
  );
}

/* ─── Footer ─── */
function Footer() {
  const [sara, setSara] = useState(false);
  const [marco, setMarco] = useState(false);
  return (
    <footer>
      <p className="footer-intro">Hai domande? Siamo qui.</p>
      <div className="contacts-wrap">
        {[
          {name:'Sara', tel:'393895194574', open:sara, setOpen:setSara},
          {name:'Marco', tel:'393272917349', open:marco, setOpen:setMarco},
        ].map(c => (
          <div key={c.name} className="contact-acc">
            <button className="contact-acc-btn" onClick={() => c.setOpen(o=>!o)}>
              {c.name}
              <span className={"contact-acc-arrow"+(c.open?" open":"")}>⌄</span>
            </button>
            <div className={"contact-acc-drawer"+(c.open?" open":"")}>
              <div className="contact-acc-inner">
                <a className="contact-wa" href={"https://wa.me/"+c.tel} target="_blank" rel="noreferrer">
                  WhatsApp +39 {c.tel.slice(2)}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}

/* ─── Countdown ─── */
function Countdown() {
  const target = new Date('2026-07-20T18:00:00');
  const calc = () => {
    const diff = target - new Date();
    if (diff <= 0) return {d:0,h:0,m:0,s:0};
    return {
      d: Math.floor(diff/86400000),
      h: Math.floor((diff%86400000)/3600000),
      m: Math.floor((diff%3600000)/60000),
      s: Math.floor((diff%60000)/1000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  const pad = n => String(n).padStart(2,'0');
  return (
    <div>
      <p className="wedding-date">20 Luglio 2026</p>
      <div className="countdown-wrap">
        <div className="countdown-unit"><span className="countdown-num">{t.d}</span><span className="countdown-label">Giorni</span></div>
        <span className="countdown-sep">·</span>
        <div className="countdown-unit"><span className="countdown-num">{pad(t.h)}</span><span className="countdown-label">Ore</span></div>
        <span className="countdown-sep">·</span>
        <div className="countdown-unit"><span className="countdown-num">{pad(t.m)}</span><span className="countdown-label">Minuti</span></div>
        <span className="countdown-sep">·</span>
        <div className="countdown-unit"><span className="countdown-num">{pad(t.s)}</span><span className="countdown-label">Secondi</span></div>
      </div>
    </div>
  );
}

/* ─── Home ─── */
function HomePage({ onNavigate }) {
  useEffect(() => {
    const targets = document.querySelectorAll('.tl-day,.tl-item');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, {threshold:0.05});
    targets.forEach(el => obs.observe(el));
    const fallback = setTimeout(() => targets.forEach(el => el.classList.add('visible')), 2000);
    return () => { obs.disconnect(); clearTimeout(fallback); };
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="stripes">
          <div className="stripe"/><div className="stripe"/><div className="stripe"/>
          <div className="stripe"/><div className="stripe"/><div className="stripe"/>
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
        <div className="hero-scroll"><span>Scorri</span></div>
      </section>

      {/* Intro */}
      <section className="storia-section">
        <div className="storia-inner">
          <h2 className="storia-heading">Ebbene si...</h2>
          <p className="storia-body">
            Dopo 14 anni insieme abbiamo deciso che il periodo di prova è terminato.<br/><br/>
            <span className="sposiamo">Ci sposiamo!</span><br/><br/>
            E ci farebbe piacere festeggiare con te.
          </p>
          <Countdown/>
        </div>
      </section>

      {/* Wave into programma */}
      <div className="wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,70 C60,70 100,5 200,3 C300,1 340,55 440,50 C540,45 580,2 700,0 C820,0 860,48 960,45 C1060,42 1100,5 1240,3 C1340,2 1400,60 1440,65 L1440,80 L0,80 Z" fill="#FDF8DC"/>
        </svg>
      </div>

      {/* Programma */}
      <section id="programma" className="programma">
        <p className="tl-title">Programma</p>
        <div className="tl-days">
          <div className="tl-day">
            <p className="tl-day-label">Sabato - 19 Luglio</p>
            <h2 className="tl-day-title">Panzerottata</h2>
            <hr className="tl-day-divider"/>
            <div className="tl-event-list">
              <div className="tl-item">
                <p className="tl-time">Ore 20 : 00</p>
                <h3 className="tl-event">Si frigge!</h3>
                <p className="tl-desc">
                  Casa della sposa.<br/>Vi aspettiamo per una serata a base di panzerotti.<br/>
                  <span style={{fontWeight:300}}>Mangiarli è una cosa seria - preparati ad esagerare.</span>
                </p>
                <button className="tl-link" onClick={()=>onNavigate('arrivarci')}>Come arrivarci →</button>
              </div>
            </div>
          </div>
          <div className="tl-day">
            <p className="tl-day-label">Domenica - 20 Luglio</p>
            <h2 className="tl-day-title">Matrimonio</h2>
            <hr className="tl-day-divider"/>
            <div className="tl-event-list">
              <div className="tl-item">
                <p className="tl-time">Ore 18 : 00</p>
                <h3 className="tl-event">Cerimonia</h3>
                <p className="tl-desc">
                  Masseria Don Luigi.<br/>
                  <span style={{fontWeight:300}}>14 anni di attesa sono stati più che sufficienti - siate puntuali!</span>
                </p>
              </div>
              <div className="tl-item">
                <p className="tl-time">Ore 19 : 00</p>
                <h3 className="tl-event">Ricevimento</h3>
                <p className="tl-desc">Masseria Don Luigi.<br/>Si mangia, si beve - e con voi il resto viene da sé.</p>
                <button className="tl-link" onClick={()=>onNavigate('arrivarci')}>Come arrivarci →</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wave out of programma */}
      <div className="wave wave-bottom">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,10 C60,10 100,75 200,77 C300,79 340,25 440,30 C540,35 580,78 700,80 C820,80 860,32 960,35 C1060,38 1100,75 1240,77 C1340,78 1400,20 1440,15 L1440,0 L0,0 Z" fill="#FDF8DC"/>
        </svg>
      </div>

      {/* RSVP CTA */}
      <section className="rsvp-section">
        <h2 className="rsvp-heading">Ci sei?</h2>
        <p className="rsvp-body">Che tu venga per i panzerotti, per il matrimonio o per entrambi - facci sapere!</p>
        <button className="rsvp-btn" onClick={()=>onNavigate('rsvp')}>Conferma presenza</button>
      </section>

      <Footer/>
    </div>
  );
}

/* ─── Camera icon ─── */
function CameraIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{width:'22px',height:'22px',fill:'#EECDE0',stroke:'#E8622A',strokeWidth:'1.5',display:'inline-block',verticalAlign:'middle'}}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"/>
    </svg>
  );
}

/* ─── Arrivarci ─── */
function ArrivarciPage({ onNavigate }) {
  const [pzOpen, setPzOpen] = useState(false);
  const [stradaOpen, setStradaOpen] = useState(false);
  return (
    <div className="arrivarci-page">
      <WaveTop/>
      <div className="arrivarci-section">
        <div className="arrivarci-inner">
          <p className="arrivarci-label">Sabato · 19 Luglio</p>
          <h1 className="arrivarci-title">Panzerottata</h1>
          <button className="pz-pill" onClick={()=>setPzOpen(o=>!o)}>
            <span>"I panzerotti vanno mangiati caldi…non fatevi pregare"</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{width:'14px',height:'14px',flexShrink:0,transition:'transform .3s',transform:pzOpen?'rotate(90deg)':'rotate(0deg)'}}>
              <polygon points="6,4 20,12 6,20" fill="#1A1410"/>
            </svg>
          </button>
          {pzOpen && (
            <div className="comic-bubble-wrap">
              <div className="comic-bubble">
                <iframe src="https://www.youtube.com/embed/wVEDgrPbEKQ?autoplay=1" title="Panzerotti" allow="autoplay; encrypted-media"/>
              </div>
            </div>
          )}
          <p className="arrivarci-place">Casa della sposa</p>
          <a className="arrivarci-address" href="https://google.com/maps/place/40%C2%B044%2741.3%22N+17%C2%B025%2700.4%22E/@40.7448217,17.4166455,53m/" target="_blank" rel="noreferrer">Via Locorotondo 142<br/>Cisternino, Brindisi</a>
          <p className="arrivarci-desc">
            Puoi parcheggiare in due aree. La prima è accessibile direttamente da Via Locorotondo (segui il link sovrastante): è un piccolo parcheggio con pochi posti. In alternativa, c&apos;è un parcheggio più grande e comodo, che puoi raggiungere seguendo{' '}
            <a href="https://google.com/maps/place/40%C2%B044%2743.2%22N+17%C2%B024%2759.3%22E/@40.7452082,17.4163824,53m/" target="_blank" rel="noreferrer" style={{color:'#E8622A'}}>questo link</a>. Da lì prosegui a piedi: puoi affidarti al tuo olfatto e seguire l&apos;odore di fritto, oppure orientarti con questa{' '}
            <button onClick={()=>setStradaOpen(true)} style={{background:'none',border:'none',padding:'0 2px',cursor:'pointer',display:'inline-flex',alignItems:'center',verticalAlign:'middle'}}><CameraIcon/></button>.
            {' '}Poiché i posti sono limitati, ove possibile, organizzatevi per condividere le auto.
          </p>
        </div>
      </div>
      <div className="arrivarci-section">
        <div className="arrivarci-inner">
          <p className="arrivarci-label">Domenica · 20 Luglio</p>
          <h1 className="arrivarci-title">Matrimonio</h1>
          <p className="arrivarci-place">Masseria Don Luigi</p>
          <a className="arrivarci-address" href="https://google.com/maps/place/masseria+don+luigi/data=!4m2!3m1!1s0x13464bd3838aeee5:0x975ba61dde7ddb11" target="_blank" rel="noreferrer">Contrada Coccaro s.n.<br/>Fasano, Brindisi</a>
          <p className="arrivarci-desc">La masseria è facile da trovare, quindi non dovreste perdervi… almeno speriamo! In caso di emergenza chiamate Marco, perché Sara sarà impegnata ad essere in ansia e comunque non risponde mai. E mi raccomando, non fate tardi: sapete come diventa Sara quando si arrabbia!</p>
        </div>
      </div>
      <div style={{textAlign:'center',padding:'48px 0 64px'}}>
        <button className="page-back" onClick={()=>onNavigate('home')}>← Torna alla home</button>
      </div>
      <WaveBottom/>
      {stradaOpen && (
        <div className="strada-overlay open" onClick={()=>setStradaOpen(false)}>
          <div onClick={e=>e.stopPropagation()} style={{background:'#FDF8DC',borderRadius:'12px',border:'2px solid #1A1410',padding:'24px',maxWidth:'90vw',width:'340px',textAlign:'center',position:'relative'}}>
            <button onClick={()=>setStradaOpen(false)} style={{position:'absolute',top:'10px',right:'14px',background:'none',border:'none',fontFamily:"'Jost',sans-serif",fontSize:'.75rem',letterSpacing:'.1em',textTransform:'uppercase',color:'#E8622A',cursor:'pointer'}}>Chiudi ×</button>
            <div style={{width:'100%',aspectRatio:'4/3',background:'#FDF8DC',borderRadius:'6px',border:'1.5px solid rgba(0,0,0,.1)',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:'8px',color:'#3A3530',fontFamily:"'Jost',sans-serif",fontSize:'.65rem',letterSpacing:'.15em',textTransform:'uppercase'}}>
              <span style={{fontSize:'2rem'}}>🗺</span><span>Foto in arrivo</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── RSVP ─── */
function RsvpPage({ onNavigate }) {
  const [nome, setNome] = useState('');
  const [partecipa, setPartecipa] = useState('');
  const [allergie, setAllergie] = useState('');
  const [bambini, setBambini] = useState(false);
  const [allergieBambini, setAllergieBambini] = useState('');
  const [pernotto, setPernotto] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!nome.trim()) { setError('Per favore inserisci il tuo nome.'); return; }
    setLoading(true); setError('');
    try {
      const params = new URLSearchParams({ nome, partecipa, allergie, bambini: bambini?'si':'no', allergieBambini, pernotto });
      await fetch(APPS_SCRIPT_URL + '?' + params.toString(), { method:'GET', mode:'no-cors' });
      await new Promise(r => setTimeout(r, 800));
      setSubmitted(true);
    } catch {
      setError('Qualcosa è andato storto. Riprova o contattaci direttamente.');
    }
    setLoading(false);
  }

  return (
    <div className="rsvp-page">
      <div className="rsvp-card">
        {submitted ? (
          <div className="rsvp-success">
            <h2 className="rsvp-success-title">Grazie! 🎉</h2>
            <p className="rsvp-success-text">Abbiamo ricevuto la tua risposta.<br/>Non vediamo l&apos;ora di festeggiare con te!</p>
          </div>
        ) : (
          <>
            <h1 className="rsvp-page-title">RSVP</h1>
            <p className="rsvp-page-sub">Facci sapere se ci sarai — ci teniamo ad averti con noi.</p>
            <form className="rsvp-form" onSubmit={handleSubmit}>
              <div className="rsvp-field">
                <label className="rsvp-label">Nome e Cognome</label>
                <input className="rsvp-input" type="text" placeholder="Il tuo nome..." required value={nome} onChange={e=>setNome(e.target.value)}/>
              </div>
              <div className="rsvp-field">
                <label className="rsvp-label">Parteciperai?</label>
                <div className="rsvp-options">
                  {[{v:'solo_matrimonio',l:'Sì, solo il giorno del matrimonio'},{v:'entrambi',l:'Sì, entrambi i giorni'},{v:'no',l:'No, mi dispiace'}].map(o=>(
                    <div key={o.v} className="rsvp-option" onClick={()=>setPartecipa(o.v)}>
                      <div className={"rsvp-option-dot"+(partecipa===o.v?' checked':'')}/>
                      <span className="rsvp-option-label">{o.l}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rsvp-field">
                <label className="rsvp-label">Allergie, intolleranze o diete particolari?</label>
                <input className="rsvp-input" type="text" placeholder="Se non hai nessuna esigenza lascia pure vuoto..." value={allergie} onChange={e=>setAllergie(e.target.value)}/>
              </div>
              <div className="rsvp-field">
                <label className="rsvp-label">Verranno bambini con te?</label>
                <div className="toggle-side">
                  <span className="toggle-side-label">No</span>
                  <label className="toggle"><input type="checkbox" checked={bambini} onChange={e=>setBambini(e.target.checked)}/><span className="toggle-slider"/></label>
                  <span className="toggle-side-label">Sì</span>
                </div>
              </div>
              {bambini && (
                <div className="rsvp-field">
                  <label className="rsvp-label">Allergie per i bambini?</label>
                  <input className="rsvp-input" type="text" placeholder="Se non ci sono esigenze lascia pure vuoto..." value={allergieBambini} onChange={e=>setAllergieBambini(e.target.value)}/>
                </div>
              )}
              {(partecipa==='solo_matrimonio'||partecipa==='entrambi') && (
                <div className="rsvp-field">
                  <label className="rsvp-label">Avrai bisogno di pernottare in masseria?</label>
                  <div className="rsvp-options">
                    {[{v:'si',l:'Sì, mi farebbe piacere'},{v:'no',l:'No, grazie'}].map(o=>(
                      <div key={o.v} className="rsvp-option" onClick={()=>setPernotto(o.v)}>
                        <div className={"rsvp-option-dot"+(pernotto===o.v?' checked':'')}/>
                        <span className="rsvp-option-label">{o.l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {error && <p style={{fontFamily:"'Jost',sans-serif",fontSize:'.85rem',color:'#E8622A'}}>{error}</p>}
              <button type="submit" className="rsvp-submit" disabled={loading}>
                {loading ? 'Invio in corso...' : 'Invia risposta'}
              </button>
            </form>
          </>
        )}
      </div>
      <div style={{textAlign:'center',padding:'32px 0 0'}}>
        <button className="page-back" onClick={()=>onNavigate('home')}>← Torna alla home</button>
      </div>
    </div>
  );
}

/* ─── FAQ ─── */
function FaqPage({ onNavigate }) {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div className="faq-page">
      <div className="faq-inner">
        <h1 className="faq-heading">FAQ</h1>
        <div className="faq-list">
          {FAQS.map((faq,i)=>(
            <div key={i} className={"faq-item"+(openIdx===i?' open':'')}>
              <button className="faq-btn" onClick={()=>setOpenIdx(openIdx===i?null:i)}>
                <span className="faq-q">{faq.q}</span>
                <span className="faq-arrow">⌄</span>
              </button>
              <div className="faq-answer">{faq.a.map((p,j)=><p key={j}>{p}</p>)}</div>
            </div>
          ))}
        </div>
        <div style={{textAlign:'center',paddingTop:'48px'}}>
          <button className="page-back" onClick={()=>onNavigate('home')}>← Torna alla home</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Storia timeline ─── */
const STORIA_ITEMS = [
  { year:'2012', text:'Marco ci prova.<br/>Sara dice sì…<br/>non certo grazie al baffo', color:'#E8622A', faceType:'default' },
  { year:'2013 — 2016', text:'Torino–Bologna: due cuori e tre coinquilini', color:'#E8622A', faceType:'couch' },
  { year:'2017', text:'Ci lasciamo. Colpo di scena (inutile)', color:'#E8622A', faceType:'fight' },
  { year:'2020', text:'Ritorno di fiamma.<br/>Più saggi, ma con molti meno capelli', color:'#E8622A', faceType:'bald' },
  { year:'2021', text:'Andiamo a convivere.<br/>una pessima idea ben riuscita', color:'#E8622A', faceType:'duomo' },
  { year:'2022', text:'Arriva Teo: ufficialmente di Sara,<br/>sentimentalmente di Marco', color:'#E8622A', faceType:'bone' },
  { year:'2025', text:'Troppo amore. Marco fugge in Svizzera', color:'#E8622A', faceType:'swiss' },
  { year:'2026', text:'Matrimonio', color:'#4E7A6A', faceType:'card' },
];

function StoriaFace({ type }) {
  if (type === 'couch') return (
    <svg width="70" height="60" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M18,38 C18,34 20,32 182,32 C184,32 182,72 182,72 L18,72 Z" fill="none" stroke="#1A1410" strokeWidth="3" strokeLinejoin="round"/>
      <rect x="18" y="72" width="164" height="24" rx="3" fill="none" stroke="#1A1410" strokeWidth="3"/>
      <rect x="4" y="50" width="16" height="44" rx="3" fill="none" stroke="#1A1410" strokeWidth="3"/>
      <rect x="180" y="50" width="16" height="44" rx="3" fill="none" stroke="#1A1410" strokeWidth="3"/>
      <line x1="28" y1="96" x2="28" y2="112" stroke="#1A1410" strokeWidth="3" strokeLinecap="round"/>
      <line x1="172" y1="96" x2="172" y2="112" stroke="#1A1410" strokeWidth="3" strokeLinecap="round"/>
      {[36,68,100,132,164].map((cx,i) => (
        <g key={i}>
          <circle cx={cx} cy={16+(i%2)*2} r="8" fill="none" stroke="#1A1410" strokeWidth="2.5"/>
          <line x1={cx} y1={24+(i%2)*2} x2={cx} y2="66" stroke="#1A1410" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1={cx-14} y1={44+(i%2)*2} x2={cx+14} y2={42-(i%2)*2} stroke="#1A1410" strokeWidth="2.5" strokeLinecap="round"/>
        </g>
      ))}
    </svg>
  );
  if (type === 'fight') return (
    <svg width="100" height="70" viewBox="0 0 90 88" xmlns="http://www.w3.org/2000/svg">
      <circle cx="52" cy="10" r="9" fill="none" stroke="#1A1410" strokeWidth="1.5"/>
      <line x1="52" y1="19" x2="58" y2="52" stroke="#1A1410" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="58" y1="52" x2="46" y2="78" stroke="#1A1410" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="58" y1="52" x2="68" y2="76" stroke="#1A1410" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="55" y1="34" x2="68" y2="46" stroke="#1A1410" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="55" y1="34" x2="42" y2="46" stroke="#1A1410" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="20" cy="12" r="9" fill="none" stroke="#1A1410" strokeWidth="1.5"/>
      <path d="M12,6 C6,4 4,10 7,14 C5,18 7,22 5,26 C8,24 7,20 9,16 C7,12 8,8 12,8" fill="none" stroke="#1A1410" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="20" y1="21" x2="20" y2="52" stroke="#1A1410" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="20" y1="52" x2="8" y2="78" stroke="#1A1410" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="20" y1="52" x2="32" y2="78" stroke="#1A1410" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="20" y1="30" x2="48" y2="22" stroke="#1A1410" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="20" y1="30" x2="48" y2="28" stroke="#1A1410" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="48" cy="22" r="4" fill="none" stroke="#1A1410" strokeWidth="1.2"/>
      <circle cx="48" cy="28" r="4" fill="none" stroke="#1A1410" strokeWidth="1.2"/>
      <line x1="40" y1="5" x2="32" y2="1" stroke="#1A1410" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="39" y1="11" x2="30" y2="11" stroke="#1A1410" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="40" y1="17" x2="32" y2="21" stroke="#1A1410" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
  if (type === 'bald') return (
    <svg width="48" height="48" viewBox="0 0 90 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M45,14 C62,12 78,22 79,40 C80,58 68,78 50,80 C32,82 14,70 12,52 C10,34 20,16 45,14 Z" fill="none" stroke="#1A1410" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="35" y1="36" x2="35" y2="43" stroke="#1A1410" strokeWidth="3" strokeLinecap="round"/>
      <line x1="55" y1="36" x2="55" y2="43" stroke="#1A1410" strokeWidth="3" strokeLinecap="round"/>
      <path d="M24,41 C23,35 28,32 35,33 C42,34 44,39 43,44 C42,48 36,49 30,47 C25,45 24,43 24,41 Z" fill="none" stroke="#1A1410" strokeWidth="2.5"/>
      <path d="M47,41 C46,35 51,32 58,33 C65,34 67,39 66,44 C65,48 59,49 53,47 C48,45 47,43 47,41 Z" fill="none" stroke="#1A1410" strokeWidth="2.5"/>
      <line x1="43" y1="40" x2="47" y2="40" stroke="#1A1410" strokeWidth="2.5"/>
      <line x1="14" y1="41" x2="24" y2="41" stroke="#1A1410" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="66" y1="41" x2="76" y2="41" stroke="#1A1410" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M26,62 C26,57 31,55 36,58 C39,60 42,62 45,62 C48,62 51,60 54,58 C59,55 64,57 64,62 C61,59 57,58 54,61 C51,64 45,67 45,67 C45,67 39,64 36,61 C33,58 29,59 26,62 Z" fill="#1A1410"/>
      <path d="M33,72 C37,79 53,79 57,72" fill="none" stroke="#1A1410" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  );
  if (type === 'swiss') return (
    <svg width="60" height="40" viewBox="0 0 90 60" xmlns="http://www.w3.org/2000/svg">
      <path d="M4,4 L86,4 L86,56 L4,56 Z" fill="none" stroke="#1A1410" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M36,12 L54,12 L54,24 L66,24 L66,36 L54,36 L54,48 L36,48 L36,36 L24,36 L24,24 L36,24 Z" fill="none" stroke="#1A1410" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  );
  if (type === 'card') return (
    <div style={{width:'64px',height:'38px',border:'1px solid #1A1410',borderRadius:'3px',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Jost',sans-serif",fontSize:'8px',fontWeight:'400',letterSpacing:'.08em',color:'#1A1410',background:'white',transform:'rotate(-1deg)',boxSizing:'border-box',textAlign:'center',padding:'4px'}}>MI SPOSI?</div>
  );
  if (type === 'bone') return (
    <svg width="48" height="48" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="7" fill="none" stroke="#1A1410" strokeWidth="2"/>
      <circle cx="54" cy="10" r="7" fill="none" stroke="#1A1410" strokeWidth="2"/>
      <circle cx="10" cy="54" r="7" fill="none" stroke="#1A1410" strokeWidth="2"/>
      <circle cx="54" cy="54" r="7" fill="none" stroke="#1A1410" strokeWidth="2"/>
      <rect x="14" y="28" width="36" height="8" rx="4" fill="none" stroke="#1A1410" strokeWidth="2"/>
    </svg>
  );
  if (type === 'duomo') return (
    <svg width="48" height="48" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <path d="M40,5 L40,20" stroke="#1A1410" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M30,20 L50,20 L55,45 L25,45 Z" fill="none" stroke="#1A1410" strokeWidth="1.5"/>
      <rect x="15" y="45" width="50" height="20" rx="2" fill="none" stroke="#1A1410" strokeWidth="1.5"/>
      <line x1="10" y1="65" x2="70" y2="65" stroke="#1A1410" strokeWidth="1.5"/>
      <rect x="33" y="50" width="14" height="15" fill="none" stroke="#1A1410" strokeWidth="1.2"/>
    </svg>
  );
  // default — face with hair
  return (
    <svg width="48" height="48" viewBox="0 0 90 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M45,14 C62,12 78,22 79,40 C80,58 68,78 50,80 C32,82 14,70 12,52 C10,34 20,16 45,14 Z" fill="none" stroke="#1A1410" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="33" y1="16" x2="28" y2="4" stroke="#1A1410" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="39" y1="14" x2="36" y2="2" stroke="#1A1410" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="46" y1="14" x2="46" y2="2" stroke="#1A1410" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="53" y1="15" x2="56" y2="3" stroke="#1A1410" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="35" y1="36" x2="35" y2="43" stroke="#1A1410" strokeWidth="3" strokeLinecap="round"/>
      <line x1="55" y1="36" x2="55" y2="43" stroke="#1A1410" strokeWidth="3" strokeLinecap="round"/>
      <path d="M24,41 C23,35 28,32 35,33 C42,34 44,39 43,44 C42,48 36,49 30,47 C25,45 24,43 24,41 Z" fill="none" stroke="#1A1410" strokeWidth="2.5"/>
      <path d="M47,41 C46,35 51,32 58,33 C65,34 67,39 66,44 C65,48 59,49 53,47 C48,45 47,43 47,41 Z" fill="none" stroke="#1A1410" strokeWidth="2.5"/>
      <line x1="43" y1="40" x2="47" y2="40" stroke="#1A1410" strokeWidth="2.5"/>
      <line x1="14" y1="41" x2="24" y2="41" stroke="#1A1410" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="66" y1="41" x2="76" y2="41" stroke="#1A1410" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M26,62 C26,57 31,55 36,58 C39,60 42,62 45,62 C48,62 51,60 54,58 C59,55 64,57 64,62 C61,59 57,58 54,61 C51,64 45,67 45,67 C45,67 39,64 36,61 C33,58 29,59 26,62 Z" fill="#1A1410"/>
      <path d="M33,72 C37,79 53,79 57,72" fill="none" stroke="#1A1410" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  );
}

function StoriaPage({ onNavigate }) {
  const svgRef = useRef(null);
  const wrapRef = useRef(null);

  // Draw the central wavy line + dots after layout
  useEffect(() => {
    const wrap = wrapRef.current;
    const svg = svgRef.current;
    if (!wrap || !svg) return;

    const draw = () => {
      svg.innerHTML = '';
      const W = wrap.offsetWidth || 320;
      const H = wrap.offsetHeight;
      const midX = W / 2;
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
      svg.setAttribute('height', H);
      svg.style.height = H + 'px';

      // Wavy center line
      const ns = 'http://www.w3.org/2000/svg';
      const pts = [];
      for (let y = 0; y <= H; y += 6) {
        const jx = Math.sin(y * 0.15) * 4 + Math.cos(y * 0.28) * 2.5;
        pts.push(`${(midX + jx).toFixed(1)},${y}`);
      }
      const line = document.createElementNS(ns, 'polyline');
      line.setAttribute('points', pts.join(' '));
      line.setAttribute('stroke', '#1A1410');
      line.setAttribute('stroke-width', '2');
      line.setAttribute('fill', 'none');
      line.setAttribute('stroke-linecap', 'round');
      svg.appendChild(line);

      // Dots per row
      const rows = wrap.querySelectorAll('.storia-row');
      rows.forEach((row, i) => {
        const cy = row.offsetTop + 20;
        const color = STORIA_ITEMS[i]?.color || '#E8622A';
        const dot = document.createElementNS(ns, 'path');
        dot.setAttribute('d', `M ${midX-1},${cy-8} C ${midX+7},${cy-10} ${midX+11},${cy-2} ${midX+9},${cy+5} C ${midX+7},${cy+11} ${midX},${cy+10} ${midX-7},${cy+7} C ${midX-11},${cy+1} ${midX-9},${cy-6} ${midX-1},${cy-8} Z`);
        dot.setAttribute('fill', color);
        dot.setAttribute('stroke', '#FFFFFF');
        dot.setAttribute('stroke-width', '2');
        svg.appendChild(dot);
      });
    };

    // Draw after a short delay to let layout settle
    const t = setTimeout(draw, 100);
    window.addEventListener('resize', draw);
    return () => { clearTimeout(t); window.removeEventListener('resize', draw); };
  }, []);

  return (
    <div style={{
      minHeight:'100vh',
      backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='280'%3E%3Cpath d='M0,0 L1200,0 C1000,40 750,80 500,45 C250,10 100,70 0,35 Z' fill='%23FDF8DC'/%3E%3Cpath d='M0,35 C100,70 250,10 500,45 C750,80 1000,40 1200,70 C1050,95 780,112 520,88 C260,64 80,98 0,75 Z' fill='%234E7A6A'/%3E%3Cpath d='M0,75 C80,98 260,64 520,88 C780,112 1050,95 1200,118 C1020,165 760,195 490,162 C220,130 70,175 0,145 Z' fill='%23FDF8DC'/%3E%3Cpath d='M0,145 C70,175 220,130 490,162 C760,195 1020,165 1200,188 C1020,208 760,222 490,205 C220,188 70,210 0,198 Z' fill='%234E7A6A'/%3E%3Cpath d='M0,198 C70,210 220,188 490,205 C760,222 1020,208 1200,220 L1200,280 L0,280 Z' fill='%23FDF8DC'/%3E%3C/svg%3E\")",
      backgroundSize:'1200px 280px',
    }}>
      <div style={{position:'relative',zIndex:1,padding:'100px 24px 80px',maxWidth:'680px',margin:'0 auto',textAlign:'center'}}>
        <div style={{background:'white',borderRadius:'8px',padding:'40px',boxShadow:'0 4px 24px rgba(0,0,0,0.08)'}}>
          <h1 style={{fontFamily:"'EB Garamond',serif",fontSize:'clamp(2rem,6vw,4rem)',fontWeight:700,color:'#4E7A6A',marginBottom:40}}>La Nostra Storia</h1>
          <p style={{fontFamily:"'Jost',sans-serif",fontSize:'1rem',fontWeight:300,color:'#3A3530',lineHeight:2,marginBottom:48}}>
            Tranquilli, non abbiamo perso la testa.<br/><br/>
            Sappiamo già che questa sezione verrà saltata —<br/>
            però toglierla ci sarebbe costato più fatica che scriverla.<br/><br/>
            Quindi eccoci qui: la nostra storia, in breve.<br/><br/>
            Se state leggendo, sappiate che siete in minoranza.<br/><br/>
            Per farla breve: un disegnino e qualche foto nostalgica.
          </p>

          {/* Timeline */}
          <div ref={wrapRef} style={{position:'relative',width:'100%'}}>
            {/* SVG overlay */}
            <svg ref={svgRef} style={{position:'absolute',left:0,top:0,width:'100%',overflow:'visible',pointerEvents:'none',zIndex:2}} />

            {/* Rows */}
            <div style={{position:'relative',zIndex:1}}>
              {STORIA_ITEMS.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div key={i} className="storia-row" style={{display:'flex',alignItems:'flex-start',padding:'12px 0',gap:0}}>
                    {/* Left cell */}
                    <div style={{flex:1,textAlign:'right',paddingRight:32}}>
                      {isLeft && (
                        <>
                          <p style={{fontFamily:"'Jost',sans-serif",fontSize:'.6rem',fontWeight:700,letterSpacing:'.2em',textTransform:'uppercase',color:item.color,marginBottom:3}}>{item.year}</p>
                          <p style={{fontFamily:"'Jost',sans-serif",fontSize:'.85rem',fontWeight:300,color:'#1A1410',lineHeight:1.6}} dangerouslySetInnerHTML={{__html:item.text}}/>
                          <div style={{display:'flex',justifyContent:'flex-end',marginTop:10}}>
                            <StoriaFace type={item.faceType}/>
                          </div>
                        </>
                      )}
                    </div>
                    {/* Spacer (for SVG line) */}
                    <div style={{width:20,flexShrink:0}}/>
                    {/* Right cell */}
                    <div style={{flex:1,textAlign:'left',paddingLeft:32}}>
                      {!isLeft && (
                        <>
                          <p style={{fontFamily:"'Jost',sans-serif",fontSize:'.6rem',fontWeight:700,letterSpacing:'.2em',textTransform:'uppercase',color:item.color,marginBottom:3}}>{item.year}</p>
                          <p style={{fontFamily:"'Jost',sans-serif",fontSize:'.85rem',fontWeight:300,color:'#1A1410',lineHeight:1.6}} dangerouslySetInnerHTML={{__html:item.text}}/>
                          <div style={{display:'flex',justifyContent:'flex-start',marginTop:10}}>
                            <StoriaFace type={item.faceType}/>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{textAlign:'center',paddingTop:64}}>
            <button className="page-back" onClick={()=>onNavigate('home')}>← Torna alla home</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Lace drawing utility ─── */
function drawLace(svg) {
  if (!svg || svg.children.length > 0) return;
  const ns = 'http://www.w3.org/2000/svg';
  const defs = document.createElementNS(ns,'defs');
  defs.innerHTML = `<filter id="laceShadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="1" dy="1.5" stdDeviation="2" flood-color="rgba(60,40,20,0.18)"/></filter>`;
  svg.appendChild(defs);
  const W=16, R=10, STEP=17, TIP_X=190, TIP_Y=135;
  const edges=[{x1:-2,y1:0,x2:TIP_X,y2:TIP_Y,sweep:0},{x1:382,y1:0,x2:TIP_X,y2:TIP_Y,sweep:1}];
  edges.forEach(e=>{
    const dx=e.x2-e.x1,dy=e.y2-e.y1,len=Math.hypot(dx,dy);
    const ux=dx/len,uy=dy/len;
    const inx=e.sweep===0?uy:-uy,iny=e.sweep===0?-ux:ux;
    const n=Math.floor(len/STEP),off=(len-n*STEP)/2;
    const outer=[];
    for(let i=0;i<=n;i++){const t=off+i*STEP;outer.push([e.x1+ux*t,e.y1+uy*t]);}
    const[osx,osy]=outer[0],[oex,oey]=outer[n];
    const isx=osx+inx*W,isy=osy+iny*W,iex=oex+inx*W,iey=oey+iny*W;
    let d=`M ${isx.toFixed(2)} ${isy.toFixed(2)} L ${iex.toFixed(2)} ${iey.toFixed(2)} L ${oex.toFixed(2)} ${oey.toFixed(2)}`;
    const rS=e.sweep===0?1:0;
    for(let i=n-1;i>=0;i--) d+=` A ${R} ${R} 0 0 ${rS} ${outer[i][0].toFixed(2)} ${outer[i][1].toFixed(2)}`;
    d+=' Z';
    const strip=document.createElementNS(ns,'path');
    strip.setAttribute('d',d);strip.setAttribute('fill','#FEFCF6');strip.setAttribute('stroke','none');strip.setAttribute('filter','url(#laceShadow)');
    svg.appendChild(strip);
    const angle=Math.atan2(uy,ux)*180/Math.PI;
    for(let i=0;i<n;i++){
      const[ax,ay]=outer[i],[bx,by]=outer[i+1];
      [{cx:(ax+bx)/2+inx*(W*.52),cy:(ay+by)/2+iny*(W*.52),rx:3.5,ry:2.2,fill:'rgba(200,185,160,0.22)'},
       {cx:(ax+bx)/2+inx*(W*.18),cy:(ay+by)/2+iny*(W*.18),rx:2.5,ry:1.6,fill:'rgba(200,185,160,0.18)'}].forEach(h=>{
        const el=document.createElementNS(ns,'ellipse');
        el.setAttribute('cx',h.cx.toFixed(2));el.setAttribute('cy',h.cy.toFixed(2));
        el.setAttribute('rx',h.rx);el.setAttribute('ry',h.ry);
        el.setAttribute('transform',`rotate(${angle.toFixed(1)},${h.cx.toFixed(2)},${h.cy.toFixed(2)})`);
        el.setAttribute('fill',h.fill);svg.appendChild(el);
      });
    }
  });
  const lenE=Math.hypot(TIP_X,TIP_Y);
  const uxL=TIP_X/lenE,uyL=TIP_Y/lenE,uxR=-TIP_X/lenE,uyR=TIP_Y/lenE;
  const inxL=uyL,inyL=-uxL,inxR=-uyR,inyR=uxR,WW=W;
  const litx=TIP_X+inxL*WW,lity=TIP_Y+inyL*WW,ritx=TIP_X+inxR*WW,rity=TIP_Y+inyR*WW;
  const tipR=12;
  const tipPath=`M ${litx.toFixed(2)} ${lity.toFixed(2)} L ${ritx.toFixed(2)} ${rity.toFixed(2)} L ${TIP_X} ${TIP_Y} A ${tipR} ${tipR} 0 0 1 ${TIP_X} ${(TIP_Y+tipR*.8).toFixed(2)} A ${tipR} ${tipR} 0 0 1 ${TIP_X} ${TIP_Y} Z`;
  const ts=document.createElementNS(ns,'path');
  ts.setAttribute('d',tipPath);ts.setAttribute('fill','#FEFCF6');ts.setAttribute('stroke','none');ts.setAttribute('filter','url(#laceShadow)');
  svg.appendChild(ts);
}

/* ─── Lista Nozze ─── */
function ListaNozzePage({ onNavigate }) {
  const [opened, setOpened] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const laceSvgRef = useRef(null);
  const flapRef = useRef(null);
  const sheetRef = useRef(null);
  const sheetTextRef = useRef(null);
  const wrapperRef = useRef(null);
  const outerRef = useRef(null);
  const hintRef = useRef(null);
  const flapTextRef = useRef(null);

  useEffect(() => { if (laceSvgRef.current) drawLace(laceSvgRef.current); }, []);

  const openEnvelope = () => {
    if (opened) return;
    setOpened(true);
    const flap=flapRef.current,sheet=sheetRef.current,sheetText=sheetTextRef.current;
    const outer=outerRef.current,hint=hintRef.current,flapText=flapTextRef.current;
    outer.style.cursor='default';
    if (hint) { hint.style.transition='opacity 0.3s'; hint.style.opacity='0'; }
    if (flapText) flapText.style.opacity='0';
    requestAnimationFrame(()=>{
      requestAnimationFrame(()=>{
        flap.style.transition='transform 0.65s cubic-bezier(0.4,0,0.15,1)';
        flap.style.transform='rotateX(-180deg)';
      });
    });
    setTimeout(()=>{
      setOverlayVisible(true);
      setTimeout(()=>setCardVisible(true),150);
    },700);
  };

  const closeLista = () => {
    setCardVisible(false);
    setTimeout(()=>{
      setOverlayVisible(false);
      const flap=flapRef.current,sheet=sheetRef.current,sheetText=sheetTextRef.current;
      const outer=outerRef.current,hint=hintRef.current,flapText=flapTextRef.current;
      sheetText.style.transition='opacity 0.2s ease'; sheetText.style.opacity='0';
      sheet.style.transition='transform 0.7s cubic-bezier(0.4,0,0.6,1)'; sheet.style.transform='translateY(260px)';
      setTimeout(()=>{
        flap.style.transition='transform 0.6s cubic-bezier(0.4,0,0.2,1)';
        flap.style.transform='rotateX(0deg)';
      },300);
      setTimeout(()=>{
        if(hint){hint.style.transition='opacity 0.4s ease';hint.style.opacity='1';}
        if(flapText) flapText.style.opacity='1';
        outer.style.cursor='pointer';
        setOpened(false);
      },700);
    },350);
  };

  return (
    <div>
      {/* Top wave */}
      <div style={{background:'#FFFFFF',paddingTop:64}}>
        <div className="wave-bar">
          <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <rect x="0" width="1440" height="120" fill="#EECDE0"/>
            <path d="M0,60 C120,20 240,100 360,60 C480,20 600,100 720,60 C840,20 960,100 1080,60 C1200,20 1320,100 1440,60 L1440,0 L0,0 Z" fill="#FFFFFF"/>
          </svg>
        </div>
      </div>

      <div style={{minHeight:'100vh',background:'#EECDE0',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-start',paddingTop:0,paddingBottom:60,paddingLeft:24,paddingRight:24,marginTop:'-20px'}}>
        {/* Envelope wrapper */}
        <div ref={wrapperRef} style={{position:'relative',width:'min(380px,90vw)',height:'min(260px,61.5vw)',zIndex:10,perspective:'800px',marginTop:80}}>
          {/* Inner — overflow:hidden clips sheet */}
          <div ref={outerRef} onClick={openEnvelope} style={{position:'absolute',inset:0,cursor:'pointer',overflow:'hidden',borderRadius:6}}>
            {/* Sheet */}
            <div ref={sheetRef} style={{position:'absolute',left:20,right:20,top:10,height:250,zIndex:2,background:'#FFFEF9',border:'1px solid rgba(0,0,0,0.08)',borderRadius:2,transform:'translateY(260px)',boxShadow:'0 2px 8px rgba(0,0,0,0.06)',overflow:'hidden',visibility:'hidden'}}>
              <div ref={sheetTextRef} style={{padding:'24px 20px',fontFamily:"'Dancing Script',cursive",fontSize:11,color:'#1A1410',lineHeight:1.9,opacity:0}}>
                Questa è la nostra <em>non</em> lista nozze.<br/><br/>
                Non abbiamo preparato una lista nozze<br/>
                perché non sappiamo ancora dove vivere…<br/><br/>
                Qualsiasi pensiero è ovviamente ben accetto.<br/><br/>
                Se vi fa piacere, qui sotto trovate il nostro IBAN.<br/><br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Grazie, Sara e Marco ♡
              </div>
            </div>
            {/* Envelope body SVG */}
            <svg width="380" height="260" viewBox="0 0 380 260" xmlns="http://www.w3.org/2000/svg" style={{position:'absolute',top:0,left:0,zIndex:3,display:'block',width:'100%',height:'100%'}}>
              <rect x="0" y="0" width="380" height="260" rx="6" fill="#FDFAF4"/>
              <polygon points="0,0 0,260 190,140" fill="#E8E4D8"/>
              <polygon points="380,0 380,260 190,140" fill="#D8D4C8"/>
              <polygon points="0,260 380,260 190,140" fill="#EDEAE0"/>
              <line x1="0" y1="0" x2="190" y2="140" stroke="rgba(0,0,0,0.08)" strokeWidth="1"/>
              <line x1="380" y1="0" x2="190" y2="140" stroke="rgba(0,0,0,0.08)" strokeWidth="1"/>
              <line x1="0" y1="260" x2="190" y2="140" stroke="rgba(0,0,0,0.10)" strokeWidth="1"/>
              <line x1="380" y1="260" x2="190" y2="140" stroke="rgba(0,0,0,0.10)" strokeWidth="1"/>
            </svg>
          </div>

          {/* Flap — outside overflow:hidden */}
          <div ref={flapRef} style={{position:'absolute',top:0,left:0,width:'100%',height:'55%',pointerEvents:'none',transformOrigin:'top center',transform:'rotateX(0deg)',zIndex:5,overflow:'hidden',willChange:'transform'}}>
            <svg viewBox="0 0 380 143" preserveAspectRatio="none" style={{width:'100%',height:'100%',display:'block'}}>
              <polygon points="0,0 380,0 190,135" fill="#F5F2E8"/>
              <polygon points="0,0 380,0 190,135" fill="none" stroke="rgba(0,0,0,0.10)" strokeWidth="1" strokeLinejoin="round"/>
              <text ref={flapTextRef} x="190" y="52" textAnchor="middle" fontFamily="'Dancing Script',cursive" fontStyle="italic" fontSize="32" fontWeight="700" fill="#4E7A6A">La busta</text>
            </svg>
            {/* Lace overlay */}
            <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',pointerEvents:'none'}}>
              <svg ref={laceSvgRef} width="380" height="143" viewBox="0 0 380 143" xmlns="http://www.w3.org/2000/svg" overflow="visible" preserveAspectRatio="none" style={{display:'block',width:'100%',height:'100%'}}/>
            </div>
          </div>
        </div>

        <p ref={hintRef} style={{marginTop:20,fontFamily:"'Jost',sans-serif",fontSize:10,letterSpacing:'0.25em',textTransform:'uppercase',color:'rgba(58,53,48,0.35)'}}>Tocca per aprire</p>

        {/* Overlay */}
        {overlayVisible && (
          <div onClick={e=>{if(e.target===e.currentTarget)closeLista();}} style={{position:'fixed',inset:0,background:'rgba(26,20,16,0.6)',zIndex:999,display:'flex',alignItems:'flex-start',justifyContent:'center',padding:16,overflowY:'auto',opacity:1,transition:'opacity 0.4s ease'}}>
            <div onClick={e=>e.stopPropagation()} style={{background:'#FFFFFF',borderRadius:6,padding:'44px 24px 36px',maxWidth:500,width:'100%',boxShadow:'0 8px 40px rgba(0,0,0,0.18)',position:'relative',marginTop:16,marginBottom:16,opacity:cardVisible?1:0,transform:cardVisible?'translateY(0) scale(1)':'translateY(20px) scale(0.97)',transition:'opacity 0.5s ease, transform 0.55s cubic-bezier(0.16,1,0.3,1)'}}>
              <button onClick={closeLista} style={{position:'absolute',top:10,right:12,background:'none',border:'none',fontSize:22,color:'#1A1410',cursor:'pointer',lineHeight:1,padding:'4px 8px',fontWeight:700}}>×</button>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:19,fontWeight:300,fontStyle:'italic',color:'#1A1410',lineHeight:2.1}}>
                Questa è la nostra <em>non</em> lista nozze.<br/><br/>
                Non abbiamo preparato una lista nozze perché, a dire il vero, non abbiamo ancora deciso dove vivere insieme… quindi non sapremmo cosa chiedere. Qualsiasi pensiero è ovviamente ben accetto. Ma se preferite non pensarci troppo, sappiate che amiamo viaggiare, mangiare bene e vivere sempre nuove esperienze insieme, quindi, se vi fa piacere farci un regalo, qui sotto trovate il nostro IBAN. Naturalmente non sentitevi obbligati...
              </p>
              <p style={{marginTop:32,textAlign:'right',fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:300,fontStyle:'italic',color:'#1A1410',lineHeight:1.8}}>
                Grazie<br/>Sara e Marco
              </p>
              <div style={{marginTop:30,padding:'18px 22px',background:'#FDF8DC',border:'2px solid #1A1410',borderRadius:4}}>
                <p style={{fontFamily:"'Jost',sans-serif",fontSize:9,fontWeight:700,letterSpacing:'0.28em',textTransform:'uppercase',color:'#4E7A6A',marginBottom:7}}>IBAN</p>
                <p style={{fontFamily:"'Dancing Script',cursive",fontSize:'1.1rem',color:'#1A1410'}}>[CODICE IBAN]</p>
              </div>
            </div>
          </div>
        )}

        {/* Definizione */}
        <div style={{maxWidth:'380px',width:'min(380px,90vw)',marginTop:36,padding:'24px 0',borderTop:'1px solid rgba(26,20,16,0.2)'}}>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:400,color:'#1A1410',marginBottom:4}}>La busta <span style={{fontStyle:'italic',fontSize:16,fontWeight:300}}>(o semplicemente "a bbust")</span></p>
          <p style={{fontFamily:"'Jost',sans-serif",fontSize:9,fontWeight:300,letterSpacing:'0.2em',textTransform:'uppercase',color:'#4E7A6A',marginBottom:12}}>sostantivo femminile</p>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:300,fontStyle:'italic',color:'#1A1410',lineHeight:1.8}}>Somma di denaro donata agli sposi in occasione del matrimonio, generalmente inserita in una busta, quale regalo di nozze e contributo alle spese del ricevimento e all&apos;avvio della vita coniugale; per estensione, vera e propria istituzione culturale locale legata ai riti matrimoniali.</p>
        </div>

        <div style={{marginTop:48}}>
          <button className="page-back" onClick={()=>onNavigate('home')}>← Torna alla home</button>
        </div>
      </div>

      {/* Bottom wave */}
      <div style={{background:'#FFFFFF'}}>
        <div className="wave-bar">
          <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <rect x="0" width="1440" height="120" fill="#EECDE0"/>
            <path d="M0,60 C120,100 240,20 360,60 C480,100 600,20 720,60 C840,100 960,20 1080,60 C1200,100 1320,20 1440,60 L1440,120 L0,120 Z" fill="#FFFFFF"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─── Style injection ─── */
const _styleEl = document.createElement('style');
_styleEl.textContent = CSS;
document.head.appendChild(_styleEl);

/* ─── App root ─── */
export default function App() {
  const [page, setPage] = useState('home');

  function navigate(target, anchor) {
    setPage(target);
    window.scrollTo(0, 0);
    if (anchor === 'programma') {
      setTimeout(() => {
        const el = document.getElementById('programma');
        if (el) el.scrollIntoView({behavior:'smooth'});
      }, 100);
    }
  }

  return (
    <>
      <Nav onNavigate={navigate}/>
      {page==='home'      && <HomePage      onNavigate={navigate}/>}
      {page==='arrivarci' && <ArrivarciPage  onNavigate={navigate}/>}
      {page==='rsvp'      && <RsvpPage       onNavigate={navigate}/>}
      {page==='faq'       && <FaqPage        onNavigate={navigate}/>}
      {page==='lista'     && <ListaNozzePage onNavigate={navigate}/>}
      {page==='storia'    && <StoriaPage     onNavigate={navigate}/>}
    </>
  );
}
