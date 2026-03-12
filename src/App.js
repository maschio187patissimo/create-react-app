<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Sara e Marco</title>
  <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,700;1,400&family=Jost:wght@200;300;400;700;900&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
    html, body { scroll-behavior:smooth; background:#FFFFFF; color:#1A1410; font-family:'Jost',sans-serif; font-weight:300; overflow-x:hidden; }
    :root { --yellow:#FDF8DC; --orange:#E8622A; --stripe:#EECDE0; --green:#4E7A6A; --ink:#1A1410; --ink-mid:#3A3530; }
    nav { position:fixed; top:0; left:0; right:0; z-index:200; height:64px; display:flex; justify-content:space-between; align-items:center; padding:0 48px; background:rgba(255,255,255,.97); backdrop-filter:blur(12px); box-shadow:0 1px 0 rgba(232,98,42,.15); }
    .nav-logo { font-family:'EB Garamond',serif; font-size:1rem; font-weight:400; letter-spacing:.4em; color:var(--ink); text-transform:uppercase; cursor:pointer; }
    .burger { width:36px; height:20px; display:flex; flex-direction:column; justify-content:space-between; cursor:pointer; background:none; border:none; padding:0; }
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
    .menu-nav a { font-family:'Jost',sans-serif; font-size:1.05rem; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:var(--ink); text-decoration:none; display:block; transform:translateY(30px); transition:transform .5s cubic-bezier(.77,0,.175,1), color .3s; cursor:pointer; }
    .menu-overlay.open .menu-nav a { transform:translateY(0); }
    .menu-nav li:nth-child(1) a { transition-delay:.05s; }
    .menu-nav li:nth-child(2) a { transition-delay:.10s; }
    .menu-nav li:nth-child(3) a { transition-delay:.15s; }
    .menu-nav li:nth-child(4) a { transition-delay:.20s; }
    .menu-nav li:nth-child(5) a { transition-delay:.25s; }
    .menu-nav li:nth-child(6) a { transition-delay:.30s; }
    .menu-nav a:hover { color:var(--orange); }
    .page { display:none; }
    .page.active { display:block; }
    #hero { height:100vh; display:flex; flex-direction:column; overflow:hidden; position:relative; }
    .stripes { display:flex; flex-direction:column; height:100%; }
    .stripe { flex:1; }
    .stripe:nth-child(odd) { background:#FFFFFF; }
    .stripe:nth-child(even) { background:var(--stripe); }
    .hero-text { position:absolute; inset:0; display:flex; flex-direction:column; justify-content:center; z-index:2; pointer-events:none; padding:0 3vw; margin-top:-10vh; }
    .hero-row { display:flex; align-items:baseline; line-height:.88; }
    .hl { font-family:'EB Garamond',serif; font-weight:700; color:var(--orange); font-size:clamp(14vw,19vw,23vw); display:inline-block; line-height:.88; letter-spacing:.01em; }
    .hl-S{transform:translateY(4%)} .hl-A1{transform:translateY(-3%)} .hl-R1{transform:translateY(5%)} .hl-A2{transform:translateY(-2%)}
    .hl-amp { font-family:'EB Garamond',serif; font-weight:700; color:var(--orange); font-size:clamp(14vw,19vw,23vw); display:inline-block; line-height:.88; transform:translateY(4%); }
    .hl-M{transform:translateY(4%)} .hl-A3{transform:translateY(-4%)} .hl-R2{transform:translateY(5%)} .hl-C{transform:translateY(-3%)} .hl-O{transform:translateY(4%)}
    .hero-scroll { position:absolute; bottom:32px; right:48px; display:flex; flex-direction:column; align-items:center; gap:8px; font-size:.52rem; letter-spacing:.28em; text-transform:uppercase; color:var(--orange); }
    .scroll-bar { width:1px; height:36px; background:var(--orange); }
    #storia-section { padding:100px 48px 120px; background:#FFFFFF; display:flex; justify-content:center; }
    .storia-inner { text-align:center; max-width:680px; }
    .storia-heading { font-size:1rem; font-weight:300; line-height:2; color:var(--ink-mid); }
    .storia-body { font-size:1rem; line-height:2; color:var(--ink-mid); font-weight:300; }
    .sposiamo { font-family:'EB Garamond',serif; font-size:2em; color:var(--orange); font-weight:700; }
    .excl { font-size:1.3em; line-height:0; vertical-align:-.1em; }
    .wave { display:block; line-height:0; margin-bottom:-2px; background:#FFFFFF; }
    .wave svg { width:100%; height:80px; display:block; }
    .wave-bottom { background:#FFFFFF; margin-top:-2px; }
    #programma { background:var(--yellow); padding:80px 48px; }
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
    .tl-desc-em { font-weight:300; }
    .tl-link { display:inline-block; margin-top:6px; font-size:.55rem; letter-spacing:.2em; text-transform:uppercase; color:var(--ink); text-decoration:underline; text-underline-offset:3px; font-weight:500; cursor:pointer; }
    #rsvp-section { padding:100px 48px; background:#FFFFFF; text-align:center; display:flex; flex-direction:column; align-items:center; gap:40px; }
    .rsvp-heading { font-family:'EB Garamond',serif; font-size:clamp(3rem,6vw,7rem); font-weight:400; line-height:1; color:var(--ink); }
    .rsvp-body { font-size:1rem; line-height:2; color:var(--ink-mid); max-width:560px; }
    .rsvp-btn { display:inline-block; background:#EECDE0; color:var(--orange); padding:22px 64px; border:none; cursor:pointer; font-size:1.1rem; letter-spacing:.18em; text-transform:uppercase; font-weight:900; font-family:'Jost',sans-serif; transition:background .3s, color .3s; -webkit-text-stroke:.5px var(--orange); }
    .rsvp-btn:hover { background:var(--orange); color:#EECDE0; -webkit-text-stroke:.5px #EECDE0; }
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
    .acc-content { padding:4px 0 20px; }
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
    .rsvp-option input[type="radio"] { display:none; }
    .rsvp-option-dot { width:18px; height:18px; border-radius:50%; border:1.5px solid rgba(26,20,16,.3); flex-shrink:0; transition:border-color .3s, background .3s; display:flex; align-items:center; justify-content:center; }
    .rsvp-option input[type="radio"]:checked ~ .rsvp-option-dot { border-color:var(--orange); background:var(--orange); }
    .rsvp-option input[type="radio"]:checked ~ .rsvp-option-dot::after { content:''; width:6px; height:6px; border-radius:50%; background:#fff; display:block; }
    .rsvp-option-label { font-family:'EB Garamond',serif; font-size:1.1rem; color:var(--ink); }
    .rsvp-submit { align-self:flex-start; background:#EECDE0; color:var(--orange); padding:20px 56px; border:none; cursor:pointer; font-size:1rem; letter-spacing:.18em; text-transform:uppercase; font-weight:900; font-family:'Jost',sans-serif; transition:background .3s, color .3s; -webkit-text-stroke:.5px var(--orange); margin-top:8px; }
    .rsvp-submit:hover { background:var(--orange); color:#EECDE0; -webkit-text-stroke:.5px #EECDE0; }
    .rsvp-success { text-align:center; font-family:'EB Garamond',serif; font-size:1.8rem; color:var(--green); }
    .toggle-wrap { display:flex; align-items:center; justify-content:space-between; padding:4px 0; }
    .toggle-side { display:flex; align-items:center; gap:12px; }
    .toggle-side-label { font-family:'EB Garamond',serif; font-size:1.1rem; color:var(--ink-mid); }
    .toggle { position:relative; width:48px; height:26px; flex-shrink:0; }
    .toggle input { opacity:0; width:0; height:0; position:absolute; }
    .toggle-slider { position:absolute; inset:0; background:rgba(26,20,16,.15); border-radius:26px; cursor:pointer; transition:background .3s; }
    .toggle-slider::before { content:''; position:absolute; width:20px; height:20px; left:3px; top:3px; background:#fff; border-radius:50%; transition:transform .3s; }
    .toggle input:checked + .toggle-slider { background:var(--orange); }
    .toggle input:checked + .toggle-slider::before { transform:translateX(22px); }
    .hidden { display:none; }
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
    .arrivarci-nunzia-wrap { width:100%; margin:32px 0; display:flex; justify-content:center; }
    .arrivarci-nunzia-wrap img { width:180px; height:180px; object-fit:cover; object-position:center top; border-radius:50%; border:3px solid var(--green); display:block; }
    .arrivarci-quote { font-family:'EB Garamond',serif; font-style:italic; font-size:1.15rem; color:var(--ink-mid); line-height:1.8; margin:20px 0 8px; }
    .arrivarci-tiktok { margin:24px 0 8px; display:flex; justify-content:center; }
    .arrivarci-tiktok blockquote { margin:0; }
    .arrivarci-divider { height:1px; background:rgba(58,53,48,.1); margin:0 48px; }
    @media(max-width:768px) {
      .arrivarci-section { padding:48px 24px; }
      .arrivarci-nunzia-wrap { width:100%; margin:32px 0; display:flex; justify-content:center; }
    .arrivarci-nunzia-wrap img { width:180px; height:180px; object-fit:cover; object-position:center top; border-radius:50%; border:3px solid var(--green); display:block; }
    .arrivarci-quote { font-family:'EB Garamond',serif; font-style:italic; font-size:1.15rem; color:var(--ink-mid); line-height:1.8; margin:20px 0 8px; }
    .arrivarci-tiktok { margin:24px 0 8px; display:flex; justify-content:center; }
    .arrivarci-tiktok blockquote { margin:0; }
    .arrivarci-divider { margin:0 24px; }
    }
    @media (max-width:768px) {
      nav { padding:0 24px; }
      .menu-close { right:24px; }
      #storia-section { padding:60px 24px 80px; }
      #programma { padding:60px 0; }
      .tl-title { padding:0 24px; }
      .tl-days { grid-template-columns:1fr; }
      .tl-day { border-left:none !important; border-right:none !important; border-top:1px solid rgba(58,53,48,.1); padding:40px 24px; }
      .tl-day:first-child { border-top:none; }
      #rsvp-section { padding:80px 24px; }
      footer { padding:48px 24px; }
      .rsvp-page { padding:100px 24px 60px; }
    }
  </style>
</head>
<body>

  <div class="menu-overlay" id="menuOverlay">
    <button class="menu-close" id="menuClose">&#x2715;</button>
    <ul class="menu-nav">
      <li><a id="mn-storia">La nostra storia</a></li>
      <li><a id="mn-programma">Programma</a></li>
      <li><a id="mn-arrivarci">Come arrivarci</a></li>
      <li><a id="mn-rsvp">RSVP</a></li>
      <li><a id="mn-lista">Lista nozze</a></li>
      <li><a id="mn-faq">FAQ</a></li>
    </ul>
  </div>

  <nav>
    <span class="nav-logo" id="navLogo">S &amp; M</span>
    <button class="burger" id="burger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </nav>

  <!-- HOME -->
  <div class="page active" id="page-home">
    <section id="hero">
      <div class="stripes">
        <div class="stripe"></div><div class="stripe"></div>
        <div class="stripe"></div><div class="stripe"></div>
        <div class="stripe"></div><div class="stripe"></div>
      </div>
      <div class="hero-text">
        <div class="hero-row">
          <span class="hl-amp">&amp;</span>
          <span class="hl hl-S">S</span><span class="hl hl-A1">A</span><span class="hl hl-R1">R</span><span class="hl hl-A2">A</span>
        </div>
        <div class="hero-row">
          <span class="hl hl-M">M</span><span class="hl hl-A3">A</span><span class="hl hl-R2">R</span><span class="hl hl-C">C</span><span class="hl hl-O">O</span>
        </div>
      </div>
      <div class="hero-scroll"><div class="scroll-bar"></div><span>Scorri</span></div>
    </section>

    <section id="storia-section">
      <div class="storia-inner">
        <h2 class="storia-heading">Ebbene si...</h2>
        <p class="storia-body">
          Dopo 14 anni insieme abbiamo deciso che il periodo di prova &egrave; terminato.<br/><br/>
          <span class="sposiamo">Ci sposiamo<span class="excl">!</span></span><br/><br/>
          E ci farebbe piacere festeggiare con te.
        </p>
      </div>
    </section>

    <div class="wave">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="#FDF8DC"/>
      </svg>
    </div>

    <section id="programma">
      <p class="tl-title">Programma</p>
      <div class="tl-days">
        <div class="tl-day">
          <p class="tl-day-label">Sabato - 19 Luglio</p>
          <h2 class="tl-day-title">Panzerottata</h2>
          <div class="tl-event-list">
            <div class="tl-item">
              <p class="tl-time">Ore 20 : 00</p>
              <h3 class="tl-event">Si frigge!</h3>
              <p class="tl-desc">Casa della sposa.<br/>Vi aspettiamo per una serata a base di panzerotti.<br/>
                <span class="tl-desc-em">Mangiarli &egrave; una cosa seria - preparati ad esagerare.</span>
              </p>
              <a class="tl-link" id="link-arrivarci-1">Come arrivarci &rarr;</a>
            </div>
          </div>
        </div>
        <div class="tl-day">
          <p class="tl-day-label">Domenica - 20 Luglio</p>
          <h2 class="tl-day-title">Matrimonio</h2>
          <div class="tl-event-list">
            <div class="tl-item">
              <p class="tl-time">Ore 18 : 00</p>
              <h3 class="tl-event">Cerimonia</h3>
              <p class="tl-desc">Masseria Don Luigi.<br/>
                <span class="tl-desc-em">14 anni di attesa sono stati piu che sufficienti - siate puntuali!</span>
              </p>
            </div>
            <div class="tl-item">
              <p class="tl-time">Ore 19 : 00</p>
              <h3 class="tl-event">Ricevimento</h3>
              <p class="tl-desc">Masseria Don Luigi.<br/>Si mangia, si beve - e con voi il resto viene da se.</p>
              <a class="tl-link" id="link-arrivarci-2">Come arrivarci &rarr;</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="wave wave-bottom">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path d="M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,0 L0,0 Z" fill="#FDF8DC"/>
      </svg>
    </div>

    <section id="rsvp-section">
      <h2 class="rsvp-heading">Ci sei?</h2>
      <p class="rsvp-body">Che tu venga per i panzerotti, per il matrimonio o per entrambi - facci sapere!</p>
      <button class="rsvp-btn" id="btn-rsvp-home">Conferma presenza</button>
    </section>

    <footer>
      <p class="footer-intro">Hai domande? Siamo qui.</p>
      <div class="contacts-wrap">
        <div class="acc-item">
          <button class="acc-btn" id="btn-sara"><span class="acc-label">Sara</span><span class="acc-arrow" id="arrow-sara">&#8595;</span></button>
          <div class="acc-drawer" id="drawer-sara">
            <div class="acc-content">
              <a href="/cdn-cgi/l/email-protection#1b687a697a787e787e697e222f5b7c767a727735787476"><span class="__cf_email__" data-cfemail="5023312231333533352235696410373d31393c7e333f3d">[email&#160;protected]</span></a>
              <a href="https://wa.me/393895194574" target="_blank">+39 389 519 4574 WhatsApp</a>
            </div>
          </div>
        </div>
        <div class="acc-item">
          <button class="acc-btn" id="btn-marco"><span class="acc-label">Marco</span><span class="acc-arrow" id="arrow-marco">&#8595;</span></button>
          <div class="acc-drawer" id="drawer-marco">
            <div class="acc-content">
              <a href="/cdn-cgi/l/email-protection#1974786b7a76377a76776f7c5971766d7478707537706d"><span class="__cf_email__" data-cfemail="dfb2beadbcb0f1bcb0b1a9ba9fb7b0abb2beb6b3f1b6ab">[email&#160;protected]</span></a>
              <a href="https://wa.me/393272917349" target="_blank">+39 327 291 7349 WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>

  <!-- RSVP PAGE -->
  <div class="page" id="page-rsvp">
    <div class="rsvp-page">
      <h1 class="rsvp-page-title">RSVP</h1>
      <p class="rsvp-page-sub">Facci sapere se ci sarai &mdash; ci teniamo ad averti con noi.</p>
      <div id="rsvp-success" class="rsvp-success hidden">Grazie! Non vediamo l'ora di festeggiare con te</div>
      <form class="rsvp-form" id="rsvpForm">
        <div class="rsvp-field">
          <label class="rsvp-label">Nome e Cognome</label>
          <input class="rsvp-input" type="text" placeholder="Il tuo nome..." required/>
        </div>
        <div class="rsvp-field">
          <label class="rsvp-label">Parteciperai?</label>
          <div class="rsvp-options">
            <label class="rsvp-option">
              <input type="radio" name="partecipa" value="solo_matrimonio" id="p1"/>
              <span class="rsvp-option-dot"></span>
              <span class="rsvp-option-label">S&igrave;, solo il giorno del matrimonio</span>
            </label>
            <label class="rsvp-option">
              <input type="radio" name="partecipa" value="entrambi" id="p2"/>
              <span class="rsvp-option-dot"></span>
              <span class="rsvp-option-label">S&igrave;, entrambi i giorni</span>
            </label>
            <label class="rsvp-option">
              <input type="radio" name="partecipa" value="no" id="p3"/>
              <span class="rsvp-option-dot"></span>
              <span class="rsvp-option-label">No, mi dispiace</span>
            </label>
          </div>
        </div>
        <div class="rsvp-field">
          <label class="rsvp-label">Allergie, intolleranze o diete particolari?</label>
          <input class="rsvp-input" type="text" id="allergie-adulti" placeholder="Se non hai nessuna esigenza lascia pure vuoto..."/>
        </div>
        <div class="rsvp-field">
          <label class="rsvp-label">Verranno bambini con te?</label>
          <div class="toggle-side">
            <span class="toggle-side-label">No</span>
            <label class="toggle">
              <input type="checkbox" id="bambini-toggle"/>
              <span class="toggle-slider"></span>
            </label>
            <span class="toggle-side-label">Si</span>
          </div>
        </div>
        <div class="rsvp-field hidden" id="allergie-bambini-field">
          <label class="rsvp-label">Allergie, intolleranze o diete particolari per i bambini?</label>
          <input class="rsvp-input" type="text" placeholder="Se non ci sono esigenze lascia pure vuoto..."/>
        </div>
        <div class="rsvp-field hidden" id="pernotto-field">
          <label class="rsvp-label">Avrai bisogno di pernottare in masseria la sera del matrimonio?</label>
          <div class="rsvp-options">
            <label class="rsvp-option">
              <input type="radio" name="pernotto" value="si"/>
              <span class="rsvp-option-dot"></span>
              <span class="rsvp-option-label">S&igrave;, mi farebbe piacere</span>
            </label>
            <label class="rsvp-option">
              <input type="radio" name="pernotto" value="no"/>
              <span class="rsvp-option-dot"></span>
              <span class="rsvp-option-label">No, grazie</span>
            </label>
          </div>
        </div>
        <button class="rsvp-submit" type="submit">Invia</button>
      </form>
    </div>
  </div>

  <!-- COME ARRIVARCI -->
  <div class="page" id="page-come-arrivarci">
    <div class="arrivarci-page">

      <div class="arrivarci-section">
        <div class="arrivarci-inner">
          <p class="arrivarci-label">Sabato &middot; 19 Luglio</p>
          <h1 class="arrivarci-title">Panzerottata</h1>
          <p class="arrivarci-quote">&ldquo;Come li farebbe la Signora Nunzia &mdash; con ancora pi&ugrave; amore e autenticit&agrave; pugliese.&rdquo;</p>
          <p class="arrivarci-location">Casa della sposa</p>
          <p class="arrivarci-address">Via Locorotondo 142<br/>Cisternino, Brindisi</p>
          <a class="arrivarci-maps" href="https://maps.google.com/?q=Via+Locorotondo+142+Cisternino+Brindisi" target="_blank">Apri in Google Maps &rarr;</a>
          <div class="arrivarci-map">
            <iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=Via+Locorotondo+142,Cisternino,Brindisi" allowfullscreen loading="lazy"></iframe>
          </div>
        </div>
      </div>

      <div class="arrivarci-divider"></div>

      <div class="arrivarci-section">
        <div class="arrivarci-inner">
          <p class="arrivarci-label">Domenica &middot; 20 Luglio</p>
          <h1 class="arrivarci-title">Matrimonio</h1>
          <p class="arrivarci-location">Masseria Don Luigi</p>
          <p class="arrivarci-address">Contrada Coccaro s.n.<br/>Fasano, Brindisi</p>
          <a class="arrivarci-maps" href="https://maps.google.com/?q=Contrada+Coccaro+Fasano+Brindisi" target="_blank">Apri in Google Maps &rarr;</a>
          <div class="arrivarci-map">
            <iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=Contrada+Coccaro,Fasano,Brindisi" allowfullscreen loading="lazy"></iframe>
          </div>
        </div>
      </div>

      <div style="text-align:center;padding:48px 0 64px;">
        <button class="page-back" id="back-arrivarci">&#8592; Torna alla home</button>
      </div>

    </div>
  </div>

  <!-- LA NOSTRA STORIA -->
  <div class="page" id="page-storia">
    <div class="page-placeholder">
      <h1>La nostra storia</h1>
      <p>Pagina in arrivo</p>
      <button class="page-back" id="back-storia">Torna alla home</button>
    </div>
  </div>

  <!-- LISTA NOZZE -->
  <div class="page" id="page-lista-nozze">
    <div class="page-placeholder">
      <h1>Lista Nozze</h1>
      <p>Pagina in arrivo</p>
      <button class="page-back" id="back-lista">Torna alla home</button>
    </div>
  </div>

  <!-- FAQ -->
  <div class="page" id="page-faq">
    <div class="page-placeholder">
      <h1>FAQ</h1>
      <p>Pagina in arrivo</p>
      <button class="page-back" id="back-faq">Torna alla home</button>
    </div>
  </div>

  <script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script><script>
    function showPage(name) {
      document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
      document.getElementById('page-' + name).classList.add('active');
      window.scrollTo(0, 0);
      closeMenu();
    }

    function scrollToSection(id) {
      setTimeout(function() {
        var el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    }

    var burger  = document.getElementById('burger');
    var overlay = document.getElementById('menuOverlay');

    function openMenu()  { burger.classList.add('open');    overlay.classList.add('open');    document.body.style.overflow = 'hidden'; }
    function closeMenu() { burger.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow = ''; }

    burger.addEventListener('click', function() {
      overlay.classList.contains('open') ? closeMenu() : openMenu();
    });
    document.getElementById('menuClose').addEventListener('click', closeMenu);

    document.getElementById('navLogo').addEventListener('click', function() { showPage('home'); });
    document.getElementById('mn-storia').addEventListener('click', function() { showPage('storia'); });
    document.getElementById('mn-programma').addEventListener('click', function() { showPage('home'); scrollToSection('programma'); });
    document.getElementById('mn-arrivarci').addEventListener('click', function() { showPage('come-arrivarci'); });
    document.getElementById('mn-rsvp').addEventListener('click', function() { showPage('rsvp'); });
    document.getElementById('mn-lista').addEventListener('click', function() { showPage('lista-nozze'); });
    document.getElementById('mn-faq').addEventListener('click', function() { showPage('faq'); });

    document.getElementById('btn-rsvp-home').addEventListener('click', function() { showPage('rsvp'); });
    document.getElementById('link-arrivarci-1').addEventListener('click', function() { showPage('come-arrivarci'); });
    document.getElementById('link-arrivarci-2').addEventListener('click', function() { showPage('come-arrivarci'); });

    document.getElementById('back-arrivarci').addEventListener('click', function() { showPage('home'); });
    document.getElementById('back-storia').addEventListener('click', function() { showPage('home'); });
    document.getElementById('back-lista').addEventListener('click', function() { showPage('home'); });
    document.getElementById('back-faq').addEventListener('click', function() { showPage('home'); });

    function initAcc(btnId, drawerId, arrowId) {
      document.getElementById(btnId).addEventListener('click', function() {
        document.getElementById(drawerId).classList.toggle('open');
        document.getElementById(arrowId).classList.toggle('open');
      });
    }
    initAcc('btn-sara',  'drawer-sara',  'arrow-sara');
    initAcc('btn-marco', 'drawer-marco', 'arrow-marco');

    var targets = document.querySelectorAll('.tl-title, .tl-day, .tl-item');
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var allDays  = Array.from(document.querySelectorAll('.tl-day'));
          var allItems = Array.from(document.querySelectorAll('.tl-item'));
          var delay = el.classList.contains('tl-title') ? 0
                    : el.classList.contains('tl-day')   ? allDays.indexOf(el) * 150
                    : allItems.indexOf(el) * 120 + 200;
          setTimeout(function() { el.classList.add('visible'); }, delay);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.05 });
    targets.forEach(function(el) { obs.observe(el); });
    setTimeout(function() { targets.forEach(function(el) { el.classList.add('visible'); }); }, 2000);

    document.querySelectorAll('input[name="partecipa"]').forEach(function(radio) {
      radio.addEventListener('change', function() {
        var field = document.getElementById('pernotto-field');
        if (this.value === 'solo_matrimonio' || this.value === 'entrambi') {
          field.classList.remove('hidden');
        } else {
          field.classList.add('hidden');
        }
      });
    });

    document.getElementById('bambini-toggle').addEventListener('change', function() {
      var field = document.getElementById('allergie-bambini-field');
      if (this.checked) {
        field.classList.remove('hidden');
      } else {
        field.classList.add('hidden');
      }
    });

    document.getElementById('rsvpForm').addEventListener('submit', function(e) {
      e.preventDefault();
      this.classList.add('hidden');
      document.getElementById('rsvp-success').classList.remove('hidden');
    });
  </script>
</body>
</html>
