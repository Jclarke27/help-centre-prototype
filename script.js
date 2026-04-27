/* =========================================================
   Shared behaviour for the Help Centre.
   - Sidebar accordion rendering + toggle
   - In-page search on the hub (index.html)
   - Table-of-contents scrollspy on articles
   - Feedback thumbs, clear button, persona pill filtering
   - Subpage (placeholder) hydration from URL
   ========================================================= */

(function () {
  'use strict';

  var Data = (window.HelpCentre && window.HelpCentre.results) || [];

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[c];
    });
  }

  function highlight(text, query) {
    if (!query) return escapeHtml(text);
    var escaped = escapeHtml(text);
    var re = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').split(/\s+/).filter(Boolean).join('|') + ')', 'gi');
    return escaped.replace(re, '<mark>$1</mark>');
  }

  function rankResults(query) {
    if (!query) return [];
    var terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];

    return Data
      .map(function (r) {
        var haystack = (r.title + ' ' + r.snippet + ' ' + r.category).toLowerCase();
        var score = 0;
        terms.forEach(function (t) {
          var titleHits = (r.title.toLowerCase().match(new RegExp(t, 'g')) || []).length;
          var bodyHits = (haystack.match(new RegExp(t, 'g')) || []).length;
          score += titleHits * 3 + bodyHits;
        });
        return { result: r, score: score };
      })
      .filter(function (x) { return x.score > 0; })
      .sort(function (a, b) { return b.score - a.score; })
      .map(function (x) { return x.result; });
  }

  var LOOP_SVG = '<svg class="loop" viewBox="0 0 16 16" aria-hidden="true"><path d="M5.3 12 L11 12 Q13 12 13 10 L13 4 M10 7 L13 4 L16 7"/></svg>';

  function renderResultCard(r, query) {
    var inLabel = r.parent
      ? '<div class="in-label"><span class="title">' + escapeHtml(r.parent) + '</span>' + LOOP_SVG + '</div>'
      : '';
    return (
      '<a class="result-card" href="' + escapeHtml(r.href) + '">' +
      inLabel +
      '<h3>' + highlight(r.title, query) + '</h3>' +
      '<p class="snippet">' + highlight(r.snippet, query) + '</p>' +
      '<div class="row2">' +
      '<span class="tag category">' + escapeHtml(r.category) + '</span>' +
      '<span class="tag faq">' + escapeHtml(r.readingTime) + '</span>' +
      '</div>' +
      '</a>'
    );
  }

  function renderSkeleton() {
    var card = function () {
      return (
        '<div class="skeleton-card">' +
        '<div style="display:flex; gap:8px; margin-bottom:12px;">' +
        '<div class="skel-line" style="width:90px; height:22px; border-radius:8px;"></div>' +
        '<div class="skel-line" style="width:80px; height:22px; border-radius:8px;"></div>' +
        '</div>' +
        '<div class="skel-line" style="width:65%; height:18px; margin-bottom:12px;"></div>' +
        '<div class="skel-line" style="width:90%; margin-bottom:6px;"></div>' +
        '<div class="skel-line" style="width:60%;"></div>' +
        '</div>'
      );
    };
    return card() + card() + card();
  }

  /* ---------- Sidebar renderer ---------- */
  function subpageHref(parentTitle, childTitle) {
    return 'subpage.html?parent=' + encodeURIComponent(parentTitle) + '&title=' + encodeURIComponent(childTitle);
  }

  function renderAccordion(item, options) {
    var withIcon = options && options.withIcon;
    var currentParent = options && options.currentParent;
    var currentChild = options && options.currentChild;
    var isOpen = currentParent === item.title;

    var iconHtml = (withIcon && item.icon) ? '<span class="ic" aria-hidden="true">' + item.icon + '</span>' : '';
    var children = (item.children || []).map(function (c) {
      var isCurrentChild = isOpen && currentChild === c.title;
      var href = c.href || subpageHref(item.title, c.title);
      return '<a class="accordion-link' + (isCurrentChild ? ' current' : '') + '" href="' + escapeHtml(href) + '">' + escapeHtml(c.title) + '</a>';
    }).join('');

    return (
      '<div class="accordion' + (isOpen ? ' open' : '') + '">' +
        '<button class="accordion-head' + (isOpen ? ' current' : '') + '" type="button" aria-expanded="' + (isOpen ? 'true' : 'false') + '">' +
          iconHtml +
          '<span class="label">' + escapeHtml(item.title) + '</span>' +
        '</button>' +
        '<div class="accordion-body"' + (isOpen ? '' : ' hidden') + '>' + children + '</div>' +
      '</div>'
    );
  }

  function renderSidebar(host) {
    if (!host) return;
    var categories = (window.HelpCentre && window.HelpCentre.sidebarCategories) || [];
    var topics = (window.HelpCentre && window.HelpCentre.sidebarTopics) || [];
    var showMiniSearch = host.dataset.miniSearch === 'true';
    var currentParent = host.dataset.currentParent || '';
    var currentChild = host.dataset.currentChild || '';

    var miniSearch = showMiniSearch
      ? '<div class="hub-side-group">' +
          '<a class="hub-side-search" href="index.html" aria-label="Search the help centre">' +
            '<svg class="icon" width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><path d="M20 20l-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' +
            '<span class="ph">Search</span>' +
          '</a>' +
        '</div>'
      : '';

    var categorySection =
      '<div class="hub-side-group">' +
        '<h4>Category</h4>' +
        '<div class="hub-side-list">' +
          categories.map(function (c) { return renderAccordion(c, { currentParent: currentParent, currentChild: currentChild }); }).join('') +
        '</div>' +
      '</div>';

    var topicSection =
      '<div class="hub-side-group">' +
        '<h4>Topics</h4>' +
        '<div class="hub-side-list with-icons">' +
          topics.map(function (t) { return renderAccordion(t, { withIcon: true, currentParent: currentParent, currentChild: currentChild }); }).join('') +
        '</div>' +
      '</div>';

    host.innerHTML = miniSearch + categorySection + topicSection;
  }

  function initSidebarAccordions() {
    document.querySelectorAll('.hub-side-list .accordion-head').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        var body = btn.nextElementSibling;
        if (body) body.hidden = expanded;
        btn.parentElement.classList.toggle('open', !expanded);
      });
    });
  }

  /* ---------- Hub (index.html) in-page search ---------- */
  function initHubSearch() {
    var input = document.querySelector('#hub-search');
    if (!input) return;

    var popular = document.querySelector('#popular-guides');
    var resultsWrap = document.querySelector('#search-results');
    var resultsHead = document.querySelector('#results-head');
    var resultsList = document.querySelector('#results-list');
    var relatedWrap = document.querySelector('#related-section');
    var relatedHeading = document.querySelector('#related-heading');
    var relatedGrid = document.querySelector('#related-grid');
    var emptyState = document.querySelector('#empty-state');
    var emptyQuery = document.querySelector('#empty-state-query');
    var clearBtn = document.querySelector('#hub-search-clear');

    var debounce;

    function setBusy() {
      resultsList.innerHTML = renderSkeleton();
    }

    function render(query) {
      var hasQuery = !!query;
      var results = hasQuery ? rankResults(query) : [];

      if (!hasQuery) {
        popular.hidden = false;
        resultsWrap.hidden = true;
        relatedWrap.hidden = true;
        emptyState.hidden = true;
        clearBtn.classList.remove('visible');
        return;
      }

      popular.hidden = true;
      clearBtn.classList.add('visible');

      if (results.length === 0) {
        resultsWrap.hidden = true;
        relatedWrap.hidden = true;
        emptyState.hidden = false;
        emptyQuery.textContent = query;
        return;
      }

      emptyState.hidden = true;
      resultsWrap.hidden = false;

      resultsHead.innerHTML =
        '<div class="count"><strong>' + results.length + ' result' + (results.length === 1 ? '' : 's') + '</strong> for "' + escapeHtml(query) + '"</div>';

      resultsList.innerHTML = results.map(function (r) { return renderResultCard(r, query); }).join('');

      var catCounts = {};
      results.forEach(function (r) { catCounts[r.category] = (catCounts[r.category] || 0) + 1; });
      var dominantCategory = Object.keys(catCounts).sort(function (a, b) {
        return catCounts[b] - catCounts[a];
      })[0];

      var related = Data
        .filter(function (r) { return r.category === dominantCategory && !results.some(function (x) { return x.id === r.id; }); })
        .slice(0, 3);

      if (related.length > 0) {
        relatedWrap.hidden = false;
        relatedHeading.textContent = 'Related guides';
        relatedGrid.innerHTML = related.map(function (r) { return renderResultCard(r, ''); }).join('');
      } else {
        relatedWrap.hidden = true;
      }
    }

    input.addEventListener('input', function () {
      var query = input.value.trim();
      clearTimeout(debounce);
      if (!query) {
        render('');
        return;
      }
      setBusy();
      resultsWrap.hidden = false;
      popular.hidden = true;
      resultsHead.innerHTML = '<div class="count">Searching for "' + escapeHtml(query) + '"…</div>';
      debounce = setTimeout(function () { render(query); }, 220);
    });

    clearBtn.addEventListener('click', function () {
      input.value = '';
      render('');
      input.focus();
    });

    try {
      var params = new URLSearchParams(window.location.search);
      var initial = params.get('q');
      if (initial) {
        input.value = initial;
        input.dispatchEvent(new Event('input'));
      }
    } catch (_) { /* ignore */ }
  }

  /* ---------- Category landing (category.html?slug=X) ---------- */
  function initCategory() {
    var catMain = document.querySelector('#cat-main');
    if (!catMain) return;

    var params = new URLSearchParams(window.location.search);
    var slug = (params.get('slug') || '').toLowerCase();
    var pages = (window.HelpCentre && window.HelpCentre.categoryPages) || {};
    var page = pages[slug] || pages.cards;
    if (!page) return;

    document.title = page.title + ' — Equals Money Help Centre';

    // Hydrate sidebar with current parent highlight + expanded
    var host = document.querySelector('#side-nav');
    if (host) {
      host.dataset.currentParent = page.sidebarParent || '';
      host.dataset.currentChild = page.sidebarChild || '';
    }

    // Breadcrumb
    var crumb = document.querySelector('#cat-breadcrumb');
    if (crumb) crumb.textContent = page.title;

    // Main content
    var guidesHtml = page.guides.map(function (g) {
      return (
        '<a class="guide-row" href="' + escapeHtml(g.href) + '">' +
          '<div class="thumb" role="img" aria-label="' + escapeHtml(g.thumb) + '">' + escapeHtml(g.thumb) + '</div>' +
          '<div class="text">' +
            '<h3>' + escapeHtml(g.title) + '</h3>' +
            '<p>' + escapeHtml(g.desc) + '</p>' +
            '<div class="row2">' +
              '<span class="tag category">' + escapeHtml(g.tag) + '</span>' +
              '<span class="tag faq">' + escapeHtml(g.time) + '</span>' +
            '</div>' +
          '</div>' +
        '</a>'
      );
    }).join('');

    catMain.innerHTML =
      '<h1>' + escapeHtml(page.title) + '</h1>' +
      '<div class="cat-hero-image" role="img" aria-label="' + escapeHtml(page.heroLabel) + '">[ ' + escapeHtml(page.heroLabel) + ' ]</div>' +
      '<p class="lede">' + escapeHtml(page.lede) + '</p>' +
      '<hr class="cat-divider" />' +
      '<h2 class="related-heading">Related guides</h2>' +
      '<div class="guide-stack">' + guidesHtml + '</div>';
  }

  /* ---------- Feedback thumbs (article + FAQ) ---------- */
  function initFeedback() {
    var group = document.querySelector('.feedback');
    if (!group) return;
    var note = group.querySelector('.note');
    group.querySelectorAll('.thumb').forEach(function (btn) {
      btn.addEventListener('click', function () {
        group.querySelectorAll('.thumb').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        if (note) note.textContent = 'Thanks — your feedback improves this guide.';
      });
    });
  }

  /* ---------- TOC scrollspy (long-form article) ---------- */
  function initScrollspy() {
    var toc = document.querySelector('.article-side .toc');
    if (!toc) return;
    var links = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'));
    if (!links.length) return;
    var sections = links
      .map(function (a) {
        var id = a.getAttribute('href').slice(1);
        var el = document.getElementById(id);
        return el ? { link: a, el: el } : null;
      })
      .filter(Boolean);

    function update() {
      var top = window.scrollY + 96;
      var current = sections[0];
      sections.forEach(function (s) {
        if (s.el.offsetTop <= top) current = s;
      });
      links.forEach(function (a) { a.classList.remove('current'); });
      if (current) current.link.classList.add('current');
    }

    window.addEventListener('scroll', update, { passive: true });
    update();

    if (window.location.hash) {
      var target = document.getElementById(window.location.hash.slice(1));
      if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  }

  /* ---------- Subpage placeholder content ----------
     Looks up the child in the sidebar data to decide long vs
     short form, then renders a credible-looking placeholder.
     ----------------------------------------------------------*/
  function findChildByTitle(parent, childTitle) {
    var all = [].concat(
      (window.HelpCentre && window.HelpCentre.sidebarCategories) || [],
      (window.HelpCentre && window.HelpCentre.sidebarTopics) || []
    );
    for (var i = 0; i < all.length; i++) {
      if (all[i].title === parent) {
        var kids = all[i].children || [];
        for (var j = 0; j < kids.length; j++) {
          if (kids[j].title === childTitle) return kids[j];
        }
      }
    }
    return null;
  }

  function slugify(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function longFormSections(title, parent) {
    var t = escapeHtml(title);
    var p = escapeHtml(parent || 'your account');
    return [
      {
        id: 'overview',
        heading: 'Overview',
        body:
          '<p>This guide covers <strong>' + t + '</strong> — what it is, when you\'d use it, and how to do it end-to-end. Skim the section labels on the right to jump to any step.</p>' +
          '<p>If you only need the one-minute version, start with <em>Before you start</em> and the first step below.</p>'
      },
      {
        id: 'before-you-start',
        heading: 'Before you start',
        body:
          '<p>You\'ll need admin access to your Equals Money account. If you\'re not sure whether you have the right permissions, ask whoever owns the account or check your role under Settings → Team.</p>' +
          '<div class="callout"><strong>Note.</strong> Changes made in ' + p + ' apply to the whole organisation. Test on a non-production flow first if you\'re unsure.</div>'
      },
      {
        id: 'walkthrough',
        heading: 'Walk through the steps',
        body:
          '<p>From the dashboard, follow the flow below. Each step takes under a minute.</p>' +
          '<ol>' +
            '<li>Open <strong>Settings</strong> and choose <strong>' + p + '</strong>.</li>' +
            '<li>Click <strong>New ' + t.toLowerCase() + '</strong>.</li>' +
            '<li>Fill in the details and press <strong>Save</strong>.</li>' +
          '</ol>' +
          '<div class="img-ph" role="img" aria-label="Screenshot: ' + t + ' screen">[ product shot · ' + t + ' ]</div>' +
          '<p>You\'ll see a confirmation and the new entry appears at the top of the list.</p>'
      },
      {
        id: 'tips',
        heading: 'Tips and edge cases',
        body:
          '<ul>' +
            '<li>Changes are applied immediately — there\'s no scheduled deploy window.</li>' +
            '<li>If something looks wrong, check the activity log under Reports for a full audit trail.</li>' +
            '<li>Most settings can be reverted from the same screen. Some, like destructive actions, prompt a second confirmation.</li>' +
          '</ul>'
      },
      {
        id: 'faq',
        heading: 'Frequently asked questions',
        body:
          '<p><strong>Who can do this?</strong> Anyone with the Admin or Owner role. Members see a read-only view.</p>' +
          '<p><strong>Is there an API?</strong> Yes — see the <a href="subpage.html?parent=Integrate%20with%20your%20stack&title=API%20keys">API keys guide</a> for how to authenticate and call the relevant endpoint.</p>' +
          '<p><strong>What if I get stuck?</strong> Tap the support button below and our team will reply inside three minutes during business hours.</p>'
      }
    ];
  }

  function renderSubpageLong(title, parent) {
    var sections = longFormSections(title, parent);
    var bodyHtml = sections.map(function (s) {
      return '<h2 id="' + s.id + '">' + escapeHtml(s.heading) + '</h2>' + s.body;
    }).join('');

    var tocHtml =
      '<div class="card">' +
        '<h4>In this guide</h4>' +
        '<nav class="toc">' +
          sections.map(function (s, i) {
            return '<a href="#' + s.id + '"' + (i === 0 ? ' class="current"' : '') + '>' + escapeHtml(s.heading) + '</a>';
          }).join('') +
        '</nav>' +
      '</div>';

    return {
      layoutClass: '',
      readingTime: '10 min read',
      lede: 'A step-by-step guide. Follow it in order the first time, then use the on-page nav to jump back to the part you need.',
      body: bodyHtml,
      toc: tocHtml
    };
  }

  function renderSubpageShort(title, parent) {
    var t = escapeHtml(title);
    var body =
      '<p>Quick answer about <strong>' + t + '</strong>. Open the relevant screen and complete the action — it applies immediately.</p>' +
      '<p>If you need more detail, check the related guides below.</p>' +
      '<div class="callout"><strong>Good to know.</strong> This action is reversible. You can undo or change it at any time from the same screen.</div>';

    return {
      layoutClass: 'no-toc',
      readingTime: '1 min read',
      lede: '',
      body: body,
      toc: ''
    };
  }

  function initSubpage() {
    var main = document.querySelector('#subpage-main');
    if (!main) return;

    var params = new URLSearchParams(window.location.search);
    var parent = params.get('parent') || '';
    var title = params.get('title') || 'Subpage';

    document.title = title + ' — Equals Money Help Centre';

    var child = findChildByTitle(parent, title);
    var format = (child && child.format) || 'long';
    var rendered = format === 'short' ? renderSubpageShort(title, parent) : renderSubpageLong(title, parent);

    var layout = document.querySelector('#subpage-layout');
    if (layout) {
      layout.classList.remove('no-toc');
      if (rendered.layoutClass) layout.classList.add(rendered.layoutClass);
    }

    var h1style = format === 'short' ? ' style="font-size:32px;"' : '';
    var lede = rendered.lede ? '<p class="lede">' + escapeHtml(rendered.lede) + '</p>' : '';

    // Body column only — breadcrumb, meta, title, lede, body.
    main.innerHTML =
      '<nav class="breadcrumb" aria-label="Breadcrumb">' +
        '<a href="index.html">Help Centre</a><span class="sep">›</span>' +
        '<a href="#">' + escapeHtml(parent || 'Help') + '</a>' +
      '</nav>' +
      '<h1' + h1style + '>' + escapeHtml(title) + '</h1>' +
      lede +
      '<div class="body">' + rendered.body + '</div>';

    // Below-body column — feedback, related placeholder, support CTA (in that order).
    var below = document.querySelector('#subpage-below');
    if (below) {
      below.innerHTML =
        '<div class="feedback" role="group" aria-label="Was this helpful?">' +
          '<span class="q">Was this helpful?</span>' +
          '<div class="thumbs">' +
            '<button class="thumb" type="button" aria-label="Yes, this was helpful"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M7 11v9H4v-9h3zM7 11l4-7a2 2 0 013 2v4h5a2 2 0 012 2l-2 7a2 2 0 01-2 1H7" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg></button>' +
            '<button class="thumb" type="button" aria-label="No, this was not helpful"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="transform: rotate(180deg);"><path d="M7 11v9H4v-9h3zM7 11l4-7a2 2 0 013 2v4h5a2 2 0 012 2l-2 7a2 2 0 01-2 1H7" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg></button>' +
          '</div>' +
          '<span class="note">Your feedback improves this guide.</span>' +
        '</div>' +
        '<div class="related" id="subpage-related" hidden>' +
          '<h2>Related guides</h2>' +
          '<div class="related-grid" id="subpage-related-grid"></div>' +
        '</div>' +
        '<div class="support-cta">' +
          '<div>' +
            '<div class="t">Can\'t find what you need?</div>' +
            '<div class="s">Talk to support. Average reply time under 3 minutes during business hours.</div>' +
          '</div>' +
          '<a class="btn btn-on-dark" href="#">Contact support <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>' +
        '</div>';
    }

    var side = document.querySelector('#subpage-side');
    if (side) side.innerHTML = rendered.toc;

    // Hide the side element if short-form, to avoid empty column
    if (side) side.hidden = format === 'short';

    // Hydrate sidebar to reflect the current parent/child
    var host = document.querySelector('#side-nav');
    if (host) {
      host.dataset.currentParent = parent;
      host.dataset.currentChild = title;
    }

    // Render the "Related guides" stack (shared with article.html / faq.html)
    renderSubpageRelated(parent, title);
  }

  function relatedForSubpage(parent, excludeTitle) {
    // Sidebar parents aren't always identical to result categories; map the obvious ones.
    var categoryMap = {
      'Create and manage cards': 'Cards',
      'Send and receive payments': 'Payments',
      'Set up your team': 'People',
      'Organise your balances': 'Balances',
      'Report and monitor activity': 'Transactions',
      'Exchange and manage currencies': 'Balances'
    };
    var cat = categoryMap[parent] || parent;
    var primary = Data.filter(function (r) {
      return r.category === cat && r.title !== excludeTitle;
    });
    var fallback = Data.filter(function (r) {
      return r.category !== cat && r.title !== excludeTitle;
    });
    return primary.concat(fallback).slice(0, 3);
  }

  function renderSubpageRelated(parent, excludeTitle) {
    var wrap = document.querySelector('#subpage-related');
    var grid = document.querySelector('#subpage-related-grid');
    if (!wrap || !grid) return;
    var guides = relatedForSubpage(parent, excludeTitle);
    if (!guides.length) {
      wrap.hidden = true;
      return;
    }
    grid.innerHTML = guides.map(function (g) {
      return (
        '<a class="result-card" href="' + escapeHtml(g.href) + '">' +
          '<h3>' + escapeHtml(g.title) + '</h3>' +
          '<p class="snippet">' + escapeHtml(g.snippet) + '</p>' +
          '<div class="row2">' +
            '<span class="tag category">' + escapeHtml(g.category) + '</span>' +
            '<span class="tag faq">' + escapeHtml(g.readingTime) + '</span>' +
          '</div>' +
        '</a>'
      );
    }).join('');
    wrap.hidden = false;
  }

  /* ---------- Search dialog (sidebar mini-search → modal) ----------
     Click the .hub-side-search element to open. Click backdrop or
     press Esc to close. No keyboard shortcut. The home-page hero
     search is unaffected. */
  function initSearchDialog() {
    var triggers = document.querySelectorAll('.hub-side-search');
    if (!triggers.length) return;

    if (!document.getElementById('sd-root')) {
      var shell = document.createElement('div');
      shell.id = 'sd-root';
      shell.className = 'sd-root';
      shell.innerHTML =
        '<div class="sd-backdrop"></div>' +
        '<div class="sd-panel" role="dialog" aria-modal="true" aria-label="Search the help centre">' +
          '<div class="sd-input-wrap">' +
            '<svg class="sd-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
              '<circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/>' +
              '<path d="M20 20l-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
            '</svg>' +
            '<input id="sd-input" class="sd-input" type="text" placeholder="Search" autocomplete="off" />' +
          '</div>' +
          '<div class="sd-pills" role="group" aria-label="Browse by category">' +
            '<a class="sd-pill sd-pill--cards" href="category.html?slug=cards">Cards</a>' +
            '<a class="sd-pill sd-pill--payments" href="category.html?slug=payments">Payments</a>' +
            '<a class="sd-pill sd-pill--balances" href="category.html?slug=balances">Balances</a>' +
            '<a class="sd-pill sd-pill--transactions" href="category.html?slug=transactions">Transactions</a>' +
          '</div>' +
          '<div class="sd-meta">' +
            '<div class="sd-count" aria-live="polite"></div>' +
            '<div class="sd-filter">' +
              '<button type="button" class="sd-filter-btn" aria-haspopup="true" aria-expanded="false">' +
                '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 6h18M6 12h12M9 18h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' +
                '<span class="sd-filter-label">Filter</span>' +
                '<span class="sd-filter-count" hidden></span>' +
              '</button>' +
              '<div class="sd-filter-pop" hidden>' +
                '<h4>Type</h4>' +
                '<label><input type="checkbox" data-type="Guide" checked /> Guide</label>' +
                '<label><input type="checkbox" data-type="FAQ" checked /> FAQ</label>' +
                '<label><input type="checkbox" data-type="Reference" checked /> Reference</label>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div id="sd-list" class="sd-list"></div>' +
        '</div>';
      document.body.appendChild(shell);
    }

    var state = {
      open: false,
      query: '',
      activeTypes: { Guide: true, FAQ: true, Reference: true },
      filterOpen: false,
      lastFocused: null,
      didFirstRender: false
    };

    var root = document.getElementById('sd-root');
    var panel = root.querySelector('.sd-panel');
    var input = document.getElementById('sd-input');
    var list = document.getElementById('sd-list');
    var countEl = root.querySelector('.sd-count');
    var filterBtn = root.querySelector('.sd-filter-btn');
    var filterPop = root.querySelector('.sd-filter-pop');
    var filterCount = root.querySelector('.sd-filter-count');
    var backdrop = root.querySelector('.sd-backdrop');
    var debounce;

    /* Honour an explicit r.type if set (used by auto-generated subpage
       entries). Otherwise: Reference wins over FAQ if both could apply. */
    function getResultType(r) {
      if (r.type) return r.type;
      if (r.parent) return 'Reference';
      if (/faq\.html(\?|$|#)/.test(r.href)) return 'FAQ';
      return 'Guide';
    }

    function applyFilters(rs) {
      return rs.filter(function (r) {
        if (!state.activeTypes[getResultType(r)]) return false;
        return true;
      });
    }

    function renderRow(r, query) {
      var type = getResultType(r);
      var typeClass = 'sd-row__type sd-row__type--' + type.toLowerCase();
      return (
        '<a class="sd-row" href="' + escapeHtml(r.href) + '">' +
          '<div class="sd-row__main">' +
            '<div class="sd-row__title">' + highlight(r.title, query) + '</div>' +
            '<div class="sd-row__snippet">' + highlight(r.snippet, query) + '</div>' +
          '</div>' +
          '<span class="' + typeClass + '">' + escapeHtml(type) + '</span>' +
        '</a>'
      );
    }

    function paint() {
      var hasQuery = !!state.query;
      var rs = hasQuery ? rankResults(state.query) : Data;
      rs = applyFilters(rs);

      if (rs.length === 0) {
        countEl.textContent = hasQuery ? 'No results for "' + state.query + '"' : '0 results';
      } else {
        countEl.textContent = rs.length + ' result' + (rs.length === 1 ? '' : 's');
      }

      if (rs.length === 0) {
        list.innerHTML = '<div class="sd-empty">No matching guides. Try a different keyword or clear filters.</div>';
      } else {
        list.innerHTML = rs.map(function (r) { return renderRow(r, state.query); }).join('');
      }

      var typesOn = (state.activeTypes.Guide ? 1 : 0) +
                    (state.activeTypes.FAQ ? 1 : 0) +
                    (state.activeTypes.Reference ? 1 : 0);
      if (typesOn < 3) {
        filterCount.hidden = false;
        filterCount.textContent = '(' + typesOn + ')';
      } else {
        filterCount.hidden = true;
        filterCount.textContent = '';
      }
    }

    /* Smoothly animate the panel's height between renders so the dialog
       grows / shrinks delicately instead of snapping. The first render
       (initial open) skips the animation — the slide-in handles entry. */
    function render() {
      if (!state.open || !state.didFirstRender) {
        paint();
        state.didFirstRender = true;
        return;
      }
      var startH = panel.offsetHeight;
      paint();
      var endH = panel.offsetHeight;
      if (Math.abs(startH - endH) < 4) return;
      panel.style.transition = 'none';
      panel.style.height = startH + 'px';
      panel.offsetHeight; // force reflow
      requestAnimationFrame(function () {
        panel.style.transition = 'height 220ms ease-out';
        panel.style.height = endH + 'px';
        setTimeout(function () {
          panel.style.transition = '';
          panel.style.height = '';
        }, 240);
      });
    }

    function openDialog() {
      state.open = true;
      state.didFirstRender = false;
      state.lastFocused = document.activeElement;
      root.classList.add('is-open');
      document.body.classList.add('sd-scroll-locked');
      setTimeout(function () { input.focus(); }, 10);
      render();
    }

    function closeDialog() {
      state.open = false;
      root.classList.remove('is-open');
      document.body.classList.remove('sd-scroll-locked');
      if (state.filterOpen) {
        filterPop.hidden = true;
        filterBtn.setAttribute('aria-expanded', 'false');
        state.filterOpen = false;
      }
      if (state.lastFocused && state.lastFocused.focus) {
        try { state.lastFocused.focus(); } catch (_) { /* ignore */ }
      }
    }

    /* preventDefault is critical: the trigger is an <a href="index.html">
       so we have to stop the navigation before we can show the dialog. */
    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        openDialog();
      });
    });

    document.addEventListener('keydown', function (e) {
      if (state.open && e.key === 'Escape') {
        e.preventDefault();
        closeDialog();
      }
    });

    input.addEventListener('input', function () {
      var q = input.value.trim();
      clearTimeout(debounce);
      debounce = setTimeout(function () {
        state.query = q;
        render();
      }, 220);
    });

    filterBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      state.filterOpen = !state.filterOpen;
      filterPop.hidden = !state.filterOpen;
      filterBtn.setAttribute('aria-expanded', state.filterOpen ? 'true' : 'false');
    });

    document.addEventListener('click', function (e) {
      if (!state.filterOpen) return;
      if (filterPop.contains(e.target) || filterBtn.contains(e.target)) return;
      state.filterOpen = false;
      filterPop.hidden = true;
      filterBtn.setAttribute('aria-expanded', 'false');
    });

    filterPop.addEventListener('change', function (e) {
      var cb = e.target;
      if (!cb.matches('input[type="checkbox"]')) return;
      var type = cb.getAttribute('data-type');
      state.activeTypes[type] = cb.checked;
      render();
    });

    backdrop.addEventListener('click', closeDialog);

    /* Result rows are anchors — clicking navigates natively. But same-page
       hash links (e.g. clicking a Reference to a section of the page you're
       already on) won't unmount the dialog, so close it explicitly. Also
       runs for cross-page links — harmless there because the new page
       starts fresh. */
    list.addEventListener('click', function (e) {
      if (e.target.closest('.sd-row')) {
        closeDialog();
      }
    });
  }

  /* ---------- Generic clear-button wiring ---------- */
  function initMainClear() {
    document.querySelectorAll('.search-input').forEach(function (wrap) {
      var input = wrap.querySelector('input');
      var clear = wrap.querySelector('.clear');
      if (!input || !clear) return;
      if (input.id === 'hub-search') return;
      input.addEventListener('input', function () {
        clear.classList.toggle('visible', !!input.value);
      });
      clear.addEventListener('click', function () {
        input.value = '';
        clear.classList.remove('visible');
        input.focus();
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Subpage / category must hydrate host attrs before sidebar render reads them
    initSubpage();
    initCategory();
    document.querySelectorAll('#side-nav').forEach(renderSidebar);
    initSidebarAccordions();
    initHubSearch();
    initFeedback();
    initScrollspy();
    initMainClear();
    initSearchDialog();
  });
})();
