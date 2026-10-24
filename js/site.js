/*
  Shared behaviour for every page.

  Each page declares what it is on <body>:
    data-page="home | about | works | project | imprint"
    data-project="<slug>"      (project pages only — must match an entry in projects.js)
    data-nav-appear            (optional — nav slides in on load, as on Home and About)

  and leaves empty mount points that this script fills in:
    <div data-nav></div>            → the fixed two-level nav
    <div data-project-list></div>   → project cards (Home, Works)
    <aside data-case-side></aside>  → case-study sidebar (card, section index, live link)
    <section data-more-projects>    → "More projects" carousel
    <div data-footer></div>         → footer
*/
(function () {
  "use strict";

  var SITE = window.SITE;
  var PROJECTS = window.PROJECTS || [];
  var body = document.body;
  var page = body.dataset.page;
  var currentSlug = body.dataset.project;
  var current = PROJECTS.filter(function (p) { return p.slug === currentSlug; })[0];
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover = window.matchMedia("(hover: hover) and (pointer: fine)");

  var icons = {
    chevron:
      '<svg viewBox="0 0 20 20" fill="none"><path d="M5 7.5 10 12.5 15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    arrowRight:
      '<svg class="icon" viewBox="0 0 24 24" fill="none"><path d="M6 12h12.5m0 0-6-6m6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    arrowLeft:
      '<svg class="icon" viewBox="0 0 24 24" fill="none"><path d="M18 12H5.5m0 0 6-6m-6 6 6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    plus:
      '<svg viewBox="0 0 24 24" fill="none"><path d="M6 12h12M12 6v12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  };

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function projectHref(p) { return p.slug + ".html"; }
  function chips(tags) {
    return '<div class="chips">' + tags.map(function (t) { return '<span class="chip">' + esc(t) + "</span>"; }).join("") + "</div>";
  }

  /* ------------------------------------------------------------------
     NAV  — level 1: Home · About · Selected Works
            level 2: the project list, shown once you're inside a project
     ------------------------------------------------------------------ */
  function dropdown(kind, label, itemsHtml) {
    var id = "dd-" + kind;
    return (
      '<div class="dd dd--' + kind + '" data-dd>' +
      '<button class="dd__trigger" type="button" aria-haspopup="true" aria-expanded="false" aria-controls="' + id + '">' +
      '<span class="dd__label">' + esc(label) + '</span><span class="dd__chev" aria-hidden="true">' + icons.chevron + "</span>" +
      "</button>" +
      '<div class="dd__panel" id="' + id + '"><div class="dd__menu">' + itemsHtml + "</div></div>" +
      "</div>"
    );
  }

  function renderNav() {
    var mount = document.querySelector("[data-nav]");
    if (!mount) return;
    var section = SITE.pages.filter(function (p) { return p.match.indexOf(page) !== -1; })[0] || SITE.pages[0];

    var mainItems = SITE.pages.map(function (p) {
      var isCurrent = p.key === page;
      return '<a class="dd__item" href="' + p.href + '"' + (isCurrent ? ' aria-current="page"' : "") + ">" + esc(p.label) + "</a>";
    }).join("");

    var projectItems = PROJECTS.map(function (p) {
      return '<a class="dd__item" href="' + projectHref(p) + '"' + (p.slug === currentSlug ? ' aria-current="page"' : "") + ">" + esc(p.title) + "</a>";
    }).join("");

    // On phones the second level folds into the first dropdown (see .dd__sub in the CSS).
    var showSub = page === "works" || page === "project";
    var level1 = dropdown("main", section.label, mainItems + (showSub ? '<div class="dd__sub">' + projectItems + "</div>" : ""));
    var level2 = current
      ? '<span class="crumb-sep" aria-hidden="true">' + icons.chevron + "</span>" + dropdown("project", current.title, projectItems)
      : "";

    var header = document.createElement("header");
    header.className = "nav";
    if (body.hasAttribute("data-nav-appear")) header.setAttribute("data-appear", "down");
    header.innerHTML =
      '<div class="nav__inner">' +
      '<div class="nav__left">' +
      '<a class="logo" href="index.html" aria-label="' + esc(SITE.name) + ' — home">' + esc(SITE.name) + "</a>" +
      '<nav class="crumbs" aria-label="Main">' + level1 + level2 + "</nav>" +
      "</div>" +
      '<a class="btn btn--dark nav__cta" href="mailto:' + SITE.email + '">Get in touch ↗︎</a>' +
      "</div>";
    mount.replaceWith(header);
  }

  function initDropdowns() {
    var dds = [].slice.call(document.querySelectorAll("[data-dd]"));
    function setOpen(dd, open) {
      dd.classList.toggle("is-open", open);
      dd.querySelector(".dd__trigger").setAttribute("aria-expanded", String(open));
    }
    function closeAll(except) {
      dds.forEach(function (d) { if (d !== except) setOpen(d, false); });
    }

    dds.forEach(function (dd) {
      var trigger = dd.querySelector(".dd__trigger");
      var closeTimer;

      // Desktop: open on hover, like the Framer site.
      dd.addEventListener("mouseenter", function () {
        if (!canHover.matches) return;
        clearTimeout(closeTimer);
        closeAll(dd);
        setOpen(dd, true);
      });
      dd.addEventListener("mouseleave", function () {
        if (!canHover.matches) return;
        closeTimer = setTimeout(function () { setOpen(dd, false); }, 140);
      });

      // Touch + keyboard: tap/Enter toggles. A mouse click on an already hover-opened menu keeps it open.
      trigger.addEventListener("click", function (e) {
        e.stopPropagation();
        var open = dd.classList.contains("is-open");
        var mouseOnHoverDevice = canHover.matches && e.detail > 0;
        closeAll(dd);
        setOpen(dd, mouseOnHoverDevice ? true : !open);
      });

      dd.addEventListener("keydown", function (e) {
        var items = [].slice.call(dd.querySelectorAll(".dd__item")).filter(function (a) { return a.offsetParent !== null; });
        var i = items.indexOf(document.activeElement);
        if (e.key === "Escape") { setOpen(dd, false); trigger.focus(); }
        else if (e.key === "ArrowDown") { e.preventDefault(); setOpen(dd, true); (items[i + 1] || items[0]).focus(); }
        else if (e.key === "ArrowUp") { e.preventDefault(); setOpen(dd, true); (items[i - 1] || items[items.length - 1]).focus(); }
      });
      dd.addEventListener("focusout", function (e) {
        if (!dd.contains(e.relatedTarget)) setOpen(dd, false);
      });
    });

    document.addEventListener("click", function (e) {
      if (!e.target.closest("[data-dd]")) closeAll();
    });
  }

  /* ------------------------------------------------------------------
     Project lists, case-study sidebar, "More projects"
     ------------------------------------------------------------------ */
  function projectCard(p) {
    return (
      '<a class="pcard" href="' + projectHref(p) + '" data-reveal style="--accent:' + p.accent + '">' +
      '<div class="pcard__box">' +
      '<div class="pcard__info">' +
      '<div class="pcard__head"><h3 class="t-h2">' + esc(p.title) + '</h3><p class="pcard__desc">' + esc(p.summary) + "</p></div>" +
      chips(p.tags) +
      "</div>" +
      '<div class="pcard__media"><img src="' + p.cover + '" alt="" loading="lazy" decoding="async"><span class="plus" aria-hidden="true">' + icons.plus + "</span></div>" +
      "</div>" +
      "</a>"
    );
  }

  function renderProjectLists() {
    [].forEach.call(document.querySelectorAll("[data-project-list]"), function (mount) {
      var limit = parseInt(mount.dataset.limit, 10) || PROJECTS.length;
      mount.innerHTML = PROJECTS.slice(0, limit).map(projectCard).join("");
    });
  }

  function renderCaseSide() {
    var mount = document.querySelector("[data-case-side]");
    if (!mount || !current) return;
    body.style.setProperty("--accent", current.accent);
    var sections = [].slice.call(document.querySelectorAll("[data-toc]"));
    mount.innerHTML =
      '<div class="case-card"><div><h1>' + esc(current.title) + "</h1><p>" + esc(current.summary) + "</p></div>" +
      chips(current.pageTags || current.tags) + "</div>" +
      (sections.length
        ? '<nav class="toc" aria-label="On this page">' +
          sections.map(function (s) { return '<a href="#' + s.id + '">' + esc(s.dataset.toc) + "</a>"; }).join("") +
          "</nav>"
        : "") +
      (current.live
        ? '<a class="live-btn" href="' + current.live + '" target="_blank" rel="noopener">' + esc(current.liveLabel || "See live project ↗︎") + "</a>"
        : "");
  }

  function renderMore() {
    var mount = document.querySelector("[data-more-projects]");
    if (!mount) return;
    var others = PROJECTS.filter(function (p) { return p.slug !== currentSlug; });
    if (!others.length) { mount.remove(); return; }
    mount.classList.add("more");
    mount.setAttribute("aria-label", "More projects");
    mount.innerHTML =
      '<div class="more__head">' +
      '<a class="btn btn--outline btn--lg" href="works.html">More projects →</a>' +
      '<div class="more__arrows" hidden>' +
      '<button type="button" data-dir="-1" aria-label="Previous project">' + icons.arrowLeft + "</button>" +
      '<button type="button" data-dir="1" aria-label="Next project">' + icons.arrowRight + "</button>" +
      "</div></div>" +
      '<div class="more__track">' +
      others.map(function (p) {
        return (
          '<a class="mcard" href="' + projectHref(p) + '">' +
          '<div class="mcard__media"><img src="' + (p.card || p.cover) + '" alt="" loading="lazy" decoding="async"></div>' +
          '<div class="mcard__info"><h3>' + esc(p.title) + "</h3><p>" + esc(p.summary) + "</p></div>" +
          "</a>"
        );
      }).join("") +
      "</div>";

    var track = mount.querySelector(".more__track");
    var arrows = mount.querySelector(".more__arrows");
    var buttons = arrows.querySelectorAll("button");
    function sync() {
      arrows.hidden = track.scrollWidth <= track.clientWidth + 2;
      buttons[0].disabled = track.scrollLeft <= 2;
      buttons[1].disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    }
    arrows.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      var step = track.querySelector(".mcard").offsetWidth + 40;
      track.scrollBy({ left: Number(b.dataset.dir) * step, behavior: reducedMotion ? "auto" : "smooth" });
    });
    track.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    sync();
  }

  /* ------------------------------------------------------------------
     Footer
     ------------------------------------------------------------------ */
  function renderFooter() {
    var mount = document.querySelector("[data-footer]");
    if (!mount) return;
    var footer = document.createElement("footer");
    footer.className = "footer";
    footer.innerHTML =
      '<div class="footer__inner">' +
      '<div class="footer__hello">' +
      '<h2 class="t-page">Say Hello</h2>' +
      '<p class="t-small"><a href="mailto:' + SITE.email + '">Get in touch↗</a> to discuss how I could be a great addition to your team.</p>' +
      "</div>" +
      '<div class="footer__contact">' +
      '<div><p class="t-small">Send me a Message</p><p class="t-lead"><a href="mailto:' + SITE.email + '">' + esc(SITE.email) + "</a></p></div>" +
      '<div><p class="t-small">Or connect with me on Socials</p>' +
      SITE.socials.map(function (s) {
        return '<p class="t-lead"><a href="' + s.href + '" target="_blank" rel="noopener">' + esc(s.label) + "</a></p>";
      }).join("") +
      "</div>" +
      "</div>" +
      '<p class="footer__meta">© <span data-year></span> Iván Alfonso Burgos</p>' +
      '<p class="footer__meta footer__meta--city"><span>' + esc(SITE.city) + '</span><time data-clock>--:--</time></p>' +
      '<p class="footer__meta">Made with ♡︎︎ from scratch</p>' +
      '<p class="footer__meta footer__meta--right"><a href="imprint.html">Imprint↗</a></p>' +
      "</div>";
    mount.replaceWith(footer);

    [].forEach.call(document.querySelectorAll("[data-year]"), function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  // Live local time next to "Berlin" in the footer
  function initClock() {
    var el = document.querySelector("[data-clock]");
    if (!el) return;
    var fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: SITE.timeZone });
    function tick() { el.textContent = fmt.format(new Date()); }
    tick();
    setInterval(tick, 15000);
  }

  /* ------------------------------------------------------------------
     Animations
     ------------------------------------------------------------------ */

  // Page-load slide-ins (Framer "appear" effects): 0.6s, ease [.44,0,.56,1]
  function initAppear() {
    var els = document.querySelectorAll("[data-appear]");
    if (!els.length) return;
    void body.offsetHeight; // commit the start state so the transition runs
    setTimeout(function () {
      [].forEach.call(els, function (el) { el.classList.add("is-in"); });
    }, 30);
  }

  // Scroll reveals (Framer "while in view, once"): rise 150px + fade, 0.8s
  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      [].forEach.call(els, function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0 });
    [].forEach.call(els, function (el) { io.observe(el); });
  }

  // Hero tagline: every 4s the next line springs up while the old one lifts away
  function initTicker() {
    [].forEach.call(document.querySelectorAll("[data-ticker]"), function (ticker) {
      var lines = [].slice.call(ticker.querySelectorAll(".ticker__line"));
      if (lines.length < 2) return;
      var i = 0;
      lines[0].classList.add("is-active");

      function fit() {
        var h = 0;
        lines.forEach(function (l) { h = Math.max(h, l.offsetHeight); });
        ticker.style.height = h + "px";
      }
      fit();
      window.addEventListener("resize", fit);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);

      setInterval(function () {
        if (document.hidden) return;
        var prev = lines[i];
        i = (i + 1) % lines.length;
        var next = lines[i];
        prev.classList.remove("is-active");
        prev.classList.add("is-leaving");
        next.classList.add("is-active");
        // Once the old line has faded out, park it below again without animating.
        setTimeout(function () {
          prev.classList.add("no-anim");
          prev.classList.remove("is-leaving");
          void prev.offsetHeight;
          prev.classList.remove("no-anim");
        }, 600);
      }, 4000);
    });
  }

  /* ------------------------------------------------------------------
     Interactive bits
     ------------------------------------------------------------------ */
  function initAccordions() {
    [].forEach.call(document.querySelectorAll("[data-acc]"), function (acc) {
      var head = acc.querySelector(".acc__head");
      head.addEventListener("click", function () {
        var open = !acc.classList.contains("is-open");
        acc.classList.toggle("is-open", open);
        head.setAttribute("aria-expanded", String(open));
      });
    });
  }

  // Case studies: the sidebar and the hero always share one height. CSS sizes the sidebar from
  // the hero's ratio; when the sidebar's content needs more room (narrower desktops), the hero
  // grows to match instead (its image/video is cropped with object-fit: cover).
  function initCaseHeights() {
    var kase = document.querySelector(".case");
    var side = document.querySelector(".case-side");
    var hero = document.querySelector(".cs-hero");
    if (!kase || !side || !hero) return;
    var queued = false;
    function sync() {
      queued = false;
      kase.style.removeProperty("--case-h");
      if (getComputedStyle(side).position !== "sticky") return; // stacked layout below 1024px
      side.style.minHeight = "0px";
      var natural = side.offsetHeight;
      side.style.minHeight = "";
      if (natural > hero.offsetHeight + 1) kase.style.setProperty("--case-h", natural + "px");
    }
    function schedule() {
      if (!queued) { queued = true; requestAnimationFrame(sync); }
    }
    sync();
    window.addEventListener("resize", schedule);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
  }

  // Highlights the section you're reading in the case-study sidebar
  function initScrollSpy() {
    var links = [].slice.call(document.querySelectorAll(".toc a"));
    if (!links.length) return;
    var targets = links.map(function (a) { return document.getElementById(a.hash.slice(1)); });
    var queued = false;
    function update() {
      queued = false;
      var line = window.innerHeight * 0.35;
      var idx = -1;
      targets.forEach(function (t, i) { if (t && t.getBoundingClientRect().top <= line) idx = i; });
      links.forEach(function (a, i) {
        a.classList.toggle("is-active", i === idx);
        if (i === idx) a.setAttribute("aria-current", "location");
        else a.removeAttribute("aria-current");
      });
    }
    window.addEventListener("scroll", function () {
      if (!queued) { queued = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  // Click-to-enlarge for images marked data-zoom (e.g. the dbt DAG)
  function initLightbox() {
    var imgs = document.querySelectorAll("img[data-zoom]");
    if (!imgs.length) return;
    var box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Enlarged image");
    box.tabIndex = -1;
    box.innerHTML = "<img alt=\"\">";
    body.appendChild(box);
    var big = box.querySelector("img");
    var opener = null;

    function close() {
      box.classList.remove("is-open");
      if (opener) opener.focus();
    }
    [].forEach.call(imgs, function (img) {
      img.classList.add("zoomable");
      img.tabIndex = 0;
      img.setAttribute("role", "button");
      img.setAttribute("aria-label", (img.alt || "Image") + " (enlarge)");
      function open() {
        opener = img;
        big.src = img.dataset.zoom || img.currentSrc || img.src;
        big.alt = img.alt;
        box.classList.add("is-open");
        box.focus();
      }
      img.addEventListener("click", open);
      img.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
      });
    });
    box.addEventListener("click", close);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && box.classList.contains("is-open")) close();
    });
  }

  // Muted looping videos play only while on screen
  function initVideos() {
    var vids = document.querySelectorAll("video[data-autoplay]");
    if (!vids.length) return;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      [].forEach.call(vids, function (v) { v.controls = true; });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var p = en.target.play();
          if (p && p.catch) p.catch(function () {});
        } else {
          en.target.pause();
        }
      });
    }, { threshold: 0.2 });
    [].forEach.call(vids, function (v) {
      v.muted = true;
      io.observe(v);
    });
  }

  /* ------------------------------------------------------------------ */
  renderNav();
  renderProjectLists();
  renderCaseSide();
  renderMore();
  renderFooter();

  initDropdowns();
  initTicker();
  initAccordions();
  initCaseHeights();
  initScrollSpy();
  initLightbox();
  initVideos();
  initClock();

  initAppear();
  initReveal();
})();
