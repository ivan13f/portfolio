(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Flip cards: Mythos ↔ Fakt */
  document.querySelectorAll('.flip').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.setAttribute('aria-pressed', btn.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
    });
  });

  /* Spread rail controls */
  document.querySelectorAll('[data-rail]').forEach((ctrl) => {
    const rail = document.getElementById(ctrl.dataset.rail);
    if (!rail) return;
    const step = () => rail.querySelector('figure')?.getBoundingClientRect().width + 18 || 400;
    ctrl.querySelector('[data-dir="prev"]').addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: reduce ? 'auto' : 'smooth' }));
    ctrl.querySelector('[data-dir="next"]').addEventListener('click', () => rail.scrollBy({ left: step(), behavior: reduce ? 'auto' : 'smooth' }));
  });

  /* Lightbox: every img.zoom, grouped by nearest [data-group] */
  const lb = document.querySelector('.lb');
  const lbImg = document.createElement('img');
  lbImg.alt = '';
  lb.insertBefore(lbImg, lb.querySelector('.lb__next'));
  const lbCap = lb.querySelector('.lb__cap');
  let group = [];
  let idx = 0;
  let lastFocus = null;

  const show = (i) => {
    idx = (i + group.length) % group.length;
    const el = group[idx];
    lbImg.src = el.dataset.full || el.currentSrc || el.src;
    lbImg.alt = el.alt;
    const cap = el.closest('figure')?.querySelector('figcaption')?.textContent || el.alt;
    lbCap.textContent = cap;
    lb.querySelector('.lb__prev').hidden = group.length < 2;
    lb.querySelector('.lb__next').hidden = group.length < 2;
  };
  const open = (el) => {
    const scope = el.closest('[data-group]') || document;
    group = [...scope.querySelectorAll('img.zoom')];
    lastFocus = document.activeElement;
    show(group.indexOf(el));
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    lb.querySelector('.lb__close').focus();
  };
  const close = () => {
    lb.classList.remove('is-open');
    document.body.style.overflow = '';
    lbImg.removeAttribute('src');
    lastFocus?.focus();
  };
  document.querySelectorAll('img.zoom').forEach((img) => {
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.addEventListener('click', () => open(img));
    img.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(img); } });
  });
  lb.querySelector('.lb__close').addEventListener('click', close);
  lb.querySelector('.lb__prev').addEventListener('click', () => show(idx - 1));
  lb.querySelector('.lb__next').addEventListener('click', () => show(idx + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') show(idx + 1);
    if (e.key === 'ArrowLeft') show(idx - 1);
  });

  /* Active nav link */
  const links = [...document.querySelectorAll('.nav__links a')];
  const byId = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
  const navObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((l) => l.classList.remove('is-active'));
      const a = byId.get(en.target.id);
      if (a) {
        a.classList.add('is-active');
        a.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('section[id]').forEach((s) => navObs.observe(s));

  /* Reveal on scroll */
  if (!reduce && 'IntersectionObserver' in window) {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); obs.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => obs.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'));
  }
})();
