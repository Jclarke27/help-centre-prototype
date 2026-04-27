/* =========================================================
   Mock data for the Help Centre prototype.
   In production this would come from an API / CMS.
   ========================================================= */

window.HelpCentre = window.HelpCentre || {};

/* ---------- Sidebar: Category section ----------
   Each child is either long-form (default) or short-form
   (FAQ-style, no TOC).  ~30% are marked short.
   ------------------------------------------------ */
window.HelpCentre.sidebarCategories = [
  {
    title: 'Get started',
    children: [
      { title: 'New to Equals? Start here', href: 'start-here.html' },
      { title: 'Create your account' },
      { title: 'Verify your business' },
      { title: 'Make your first payment', format: 'short' }
    ]
  },
  {
    title: 'Change your account settings',
    children: [
      { title: 'Profile details' },
      { title: 'Notifications', format: 'short' },
      { title: 'Security & 2FA' }
    ]
  },
  {
    title: 'Send and receive payments',
    children: [
      { title: 'Send a UK payment' },
      { title: 'Send an international payment' },
      { title: 'Schedule a payment', format: 'short' }
    ]
  },
  {
    title: 'Create and manage cards',
    children: [
      { title: 'Issue a virtual card' },
      { title: 'Order a physical card' },
      { title: 'Freeze or cancel a card', format: 'short' }
    ]
  },
  {
    title: 'Integrate with your stack',
    children: [
      { title: 'API keys', format: 'short' },
      { title: 'Webhooks' },
      { title: 'Accounting integrations' }
    ]
  },
  {
    title: 'Exchange and manage currencies',
    children: [
      { title: 'Hold multiple currencies' },
      { title: 'Convert at live rates' },
      { title: 'Set up an exchange order' }
    ]
  },
  {
    title: 'Organise your balances',
    children: [
      { title: 'Create a sub-balance' },
      { title: 'Move between balances' },
      { title: 'Naming conventions', format: 'short' }
    ]
  },
  {
    title: 'Report and monitor activity',
    children: [
      { title: 'Export transactions' },
      { title: 'Audit log', format: 'short' },
      { title: 'Scheduled reports' }
    ]
  },
  {
    title: 'Set up your team',
    children: [
      { title: 'Invite a team member' },
      { title: 'Roles and permissions' },
      { title: 'Approval flows' }
    ]
  }
];

/* ---------- Sidebar: Topics section ---------- */
window.HelpCentre.sidebarTopics = [
  {
    title: 'Account',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    children: [
      { title: 'Verification' },
      { title: 'Business details' },
      { title: 'Directors and owners' }
    ]
  },
  {
    title: 'Approvals',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 11l3 3L22 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    children: [
      { title: 'Setting up approvals' },
      { title: 'Approval thresholds' },
      { title: 'Review and sign off', format: 'short' }
    ]
  },
  {
    title: 'Balances',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="2"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="2"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="2"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="2"/></svg>',
    children: [
      { title: 'Opening a balance' },
      { title: 'Multi-currency balances' },
      { title: 'Statements', format: 'short' }
    ]
  },
  {
    title: 'Cards',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" stroke-width="2"/><path d="M3 10h18M7 15h4" stroke="currentColor" stroke-width="2"/></svg>',
    children: [
      { title: 'Virtual cards' },
      { title: 'Physical cards' },
      { title: 'Limits and PINs', format: 'short' }
    ]
  },
  {
    title: 'Funds requests',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M14 3v5h5" stroke="currentColor" stroke-width="2"/></svg>',
    children: [
      { title: 'Request funds' },
      { title: 'Approve a request', format: 'short' },
      { title: 'Request history', format: 'short' }
    ]
  },
  {
    title: 'Payments',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    children: [
      { title: 'UK payments' },
      { title: 'International payments' },
      { title: 'Scheduled payments', format: 'short' }
    ]
  },
  {
    title: 'People',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3" stroke="currentColor" stroke-width="2"/><circle cx="17" cy="10" r="2.5" stroke="currentColor" stroke-width="2"/><path d="M3 19c0-3 3-5 6-5s6 2 6 5M15 19c0-2 2-4 5-4" stroke="currentColor" stroke-width="2"/></svg>',
    children: [
      { title: 'Invite team' },
      { title: 'Assign roles', format: 'short' },
      { title: 'Manage permissions' }
    ]
  },
  {
    title: 'Transactions',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M12 7v10M9 10h4.5a2 2 0 010 4H9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    children: [
      { title: 'View transactions' },
      { title: 'Export history' },
      { title: 'Disputes', format: 'short' }
    ]
  }
];

/**
 * Each result represents either a standalone article or a tagged
 * section of a parent article.  Sections render with an "in-label"
 * (parent-article crumb + smooth L-with-up-arrow) and deep-link
 * straight to the parent's anchor via `href`.
 */
window.HelpCentre.results = [
  {
    id: 'freeze-card-section',
    parent: 'How to create a card and link it to a balance',
    parentHref: 'create-card.html#freeze-or-cancel',
    title: 'Freeze or cancel a card from the dashboard',
    snippet: 'Step-by-step: find the card in your Cards page, open it, and choose Freeze. The card is frozen instantly — new transactions are blocked.',
    category: 'Cards',
    readingTime: '6 min read',
    href: 'create-card.html#freeze-or-cancel'
  },
  {
    id: 'create-card',
    title: 'How to create a card and link it to a balance',
    snippet: 'Create a virtual or physical card for any team member, set limits, and link it to the balance it draws from.',
    category: 'Cards',
    readingTime: '8 min read',
    href: 'create-card.html'
  },
  {
    id: 'permissions-freeze',
    parent: 'Managing permissions and roles',
    parentHref: 'article.html#permissions-freeze',
    title: 'Who can freeze and cancel cards',
    snippet: 'Decide who can create, freeze, and cancel cards in your organisation.',
    category: 'People',
    readingTime: '5 min read',
    href: 'article.html#permissions-freeze'
  },
  {
    id: 'freeze-faq',
    title: 'How do I freeze a card?',
    snippet: 'Open the card, tap Freeze. Transactions are blocked immediately. Unfreeze the same way.',
    category: 'Cards',
    readingTime: '1 min read',
    href: 'faq.html'
  },
  {
    id: 'change-limits',
    title: 'How do I change my card limits?',
    snippet: 'Go to the card\'s detail page and edit daily, weekly, or monthly limits. Admins can set limits for others.',
    category: 'Cards',
    readingTime: '1 min read',
    href: 'faq.html'
  },
  {
    id: 'reset-pin',
    title: 'Reset your PIN',
    snippet: 'Reset a physical card\'s PIN from the card detail page. You\'ll see the new PIN once, then it\'s hidden.',
    category: 'Cards',
    readingTime: '2 min read',
    href: 'faq.html'
  },
  {
    id: 'mid-transaction',
    parent: 'How to freeze or cancel a card',
    parentHref: 'article.html#mid-transaction',
    title: 'What happens if I freeze a card mid-transaction?',
    snippet: 'In-flight authorisations complete. Any new attempts are declined until you unfreeze.',
    category: 'Cards',
    readingTime: '6 min read',
    href: 'article.html#mid-transaction'
  },
  {
    id: 'transfer-declined',
    title: 'Why was my transfer declined?',
    snippet: 'Common reasons include insufficient balance, a frozen card, or recipient details failing verification.',
    category: 'Payments',
    readingTime: '2 min read',
    href: 'faq.html'
  },
  {
    id: 'payment-failed',
    title: 'What happens when a payment fails?',
    snippet: 'Funds stay in your balance. We notify you, and you can retry from the Payments page.',
    category: 'Payments',
    readingTime: '2 min read',
    href: 'faq.html'
  },
  {
    id: 'approval-flows',
    title: 'Setting up approval flows for multi-entity businesses',
    snippet: 'Approval flows route payments to the right reviewers before money moves. Covers multi-entity and mixed-currency.',
    category: 'Approvals',
    readingTime: '12 min read',
    href: 'article.html'
  },
  {
    id: 'thresholds',
    parent: 'Setting up approval flows for multi-entity businesses',
    parentHref: 'article.html#define-thresholds',
    title: 'Define approval thresholds',
    snippet: 'Thresholds convert to each balance\'s currency using the mid-market rate at the time of initiation.',
    category: 'Approvals',
    readingTime: '12 min read',
    href: 'article.html#define-thresholds'
  },
  {
    id: 'assign-approvers',
    parent: 'Setting up approval flows for multi-entity businesses',
    parentHref: 'article.html#assign-approvers',
    title: 'Assign approvers by entity',
    snippet: 'Under each threshold, pick the people or groups who can approve. Mix named users and roles.',
    category: 'Approvals',
    readingTime: '12 min read',
    href: 'article.html#assign-approvers'
  },
  {
    id: 'fx-fees',
    title: 'Understanding fees on international transfers',
    snippet: 'How we price FX and what shows on your statement.',
    category: 'Payments',
    readingTime: '7 min read',
    href: 'faq.html'
  },
  {
    id: 'currencies',
    title: 'What currencies can I hold?',
    snippet: 'Hold 50+ currencies. Convert at live mid-market rates, with no hidden markups.',
    category: 'Balances',
    readingTime: '3 min read',
    href: 'faq.html'
  },
  {
    id: 'onboarding',
    title: 'Set up your account and verify your business',
    snippet: 'The steps for KYC/KYB, adding directors, and getting approved to transact.',
    category: 'Account',
    readingTime: '9 min read',
    href: 'article.html'
  },
  {
    id: 'export-csv',
    title: 'Export transactions as CSV',
    snippet: 'Pick a date range and filters, then export a clean CSV ready for your accounting tool.',
    category: 'Transactions',
    readingTime: '3 min read',
    href: 'subpage.html?parent=Report%20and%20monitor%20activity&title=Export%20transactions'
  },
  {
    id: 'audit-log',
    title: 'Audit log and change history',
    snippet: 'Every setting change, approval, and payment is logged. Filter by user, type, or date.',
    category: 'Transactions',
    readingTime: '3 min read',
    href: 'subpage.html?parent=Report%20and%20monitor%20activity&title=Audit%20log'
  },
  {
    id: 'view-txns',
    title: 'View transactions',
    snippet: 'Slice spend by card, cardholder, merchant category, or cost centre. Filter and save views your team uses most.',
    category: 'Transactions',
    readingTime: '5 min read',
    href: 'subpage.html?parent=Transactions&title=View%20transactions'
  }
];

window.HelpCentre.popularGuideIds = ['create-card', 'approval-flows', 'freeze-faq', 'currencies'];

/* ---------- Auto-generated subpage results -----------------------
   Every sidebar child becomes a search result, so the dialog has the
   same depth of content as the placeholder pages it links to. Short-
   format children become FAQ; long-format are Guide. Categories are
   normalised so the four pills (Cards / Payments / Balances /
   Transactions) match meaningfully.
   ---------------------------------------------------------------- */
(function () {
  var categoryMap = {
    'Create and manage cards': 'Cards',
    'Cards': 'Cards',
    'Send and receive payments': 'Payments',
    'Payments': 'Payments',
    'Organise your balances': 'Balances',
    'Exchange and manage currencies': 'Balances',
    'Balances': 'Balances',
    'Report and monitor activity': 'Transactions',
    'Transactions': 'Transactions'
  };

  function snippetFor(parent, title, format) {
    if (format === 'short') {
      return 'Quick answer about ' + title + '. Open the relevant screen and complete the action — it applies immediately.';
    }
    return 'Step-by-step guide to ' + title + ' under ' + parent + '. Walks you through prep, the main flow, edge cases and FAQs.';
  }

  function readingTimeFor(format) {
    return format === 'short' ? '1 min read' : '8 min read';
  }

  function slug(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  var sources = (window.HelpCentre.sidebarCategories || [])
    .concat(window.HelpCentre.sidebarTopics || []);

  var generated = [];
  var seenTitles = {};

  sources.forEach(function (parent) {
    (parent.children || []).forEach(function (child) {
      // The new "Start here" page already lives as its own dedicated guide,
      // and the existing window.HelpCentre.results already contains canonical
      // entries that would clash — skip if we've already minted this title.
      var titleKey = child.title.toLowerCase();
      if (seenTitles[titleKey]) return;
      seenTitles[titleKey] = true;

      // Children with an explicit href (e.g. start-here.html) link directly
      // to a real page; otherwise they're subpage placeholders.
      var href = child.href || ('subpage.html?parent=' + encodeURIComponent(parent.title) + '&title=' + encodeURIComponent(child.title));
      var format = child.format || 'long';
      var category = categoryMap[parent.title] || parent.title;

      generated.push({
        id: 'sub-' + slug(parent.title) + '-' + slug(child.title),
        title: child.title,
        snippet: snippetFor(parent.title, child.title, format),
        category: category,
        readingTime: readingTimeFor(format),
        href: href,
        type: format === 'short' ? 'FAQ' : 'Guide'
      });
    });
  });

  window.HelpCentre.results = window.HelpCentre.results.concat(generated);
})();

/* ---------- Category landing pages (hero feature pattern) ----------
   Each pill label under the hero search links to one of these.
   Landing pages have a hero image, a lede, and a longer list of
   related guides (typically 8–9) rendered with .guide-row.
   ------------------------------------------------------------------ */
window.HelpCentre.categoryPages = {
  cards: {
    title: 'Cards',
    sidebarParent: 'Cards',
    lede: 'Virtual and physical cards for your team — issue, link to a balance, set limits, and freeze in one tap. Pick a guide below to get into the detail.',
    heroLabel: 'hero image · physical + virtual card illustration',
    guides: [
      { title: 'How to create a card and link it to a balance', desc: 'Choose virtual or physical, pick which balance it draws from, set initial limits, and hand it off to a cardholder.', thumb: 'product shot · issuing a new card', tag: 'Cards', time: '8 min read', href: 'create-card.html' },
      { title: 'Virtual vs physical cards: when to use which', desc: 'A short decision guide — when instant virtual cards win and when the plastic makes sense.', thumb: 'product shot · card types comparison', tag: 'Cards', time: '5 min read', href: 'subpage.html?parent=Cards&title=Virtual%20cards' },
      { title: 'Change daily, weekly, and monthly limits', desc: 'Edit spend caps from the card detail page. Changes take effect immediately for new authorisations.', thumb: 'product shot · card limits editor', tag: 'Cards', time: '2 min read', href: 'subpage.html?parent=Cards&title=Limits%20and%20PINs' },
      { title: 'Restrict cards to merchant categories', desc: 'Block gambling, adult, or travel categories per-card. Useful for subscription-only or vendor-specific cards.', thumb: 'product shot · category restrictions', tag: 'Cards', time: '4 min read', href: 'subpage.html?parent=Create%20and%20manage%20cards&title=Issue%20a%20virtual%20card' },
      { title: 'How do I freeze a card?', desc: 'Open the card detail page and tap Freeze. All new transactions are blocked until you unfreeze it.', thumb: 'product shot · freeze toggle', tag: 'Cards', time: '1 min read', href: 'faq.html' },
      { title: 'Reporting a lost or stolen card', desc: 'Cancel the card, reissue a replacement, and see what happens to pending authorisations.', thumb: 'product shot · lost card flow', tag: 'Cards', time: '4 min read', href: 'subpage.html?parent=Create%20and%20manage%20cards&title=Freeze%20or%20cancel%20a%20card' },
      { title: 'Reset your PIN', desc: 'From the card detail page, reset the PIN. You see it once, then it is hidden for security.', thumb: 'product shot · PIN reset dialog', tag: 'Cards', time: '2 min read', href: 'subpage.html?parent=Cards&title=Limits%20and%20PINs' },
      { title: 'Why was my card declined?', desc: 'The three most common reasons — insufficient balance, limit hit, blocked category — and how to fix each.', thumb: 'product shot · decline reason panel', tag: 'Cards', time: '3 min read', href: 'faq.html' },
      { title: 'Ordering physical cards for your team', desc: 'Set the delivery address, track the order, and walk cardholders through activation.', thumb: 'product shot · physical card request', tag: 'Cards', time: '6 min read', href: 'subpage.html?parent=Cards&title=Physical%20cards' }
    ]
  },
  payments: {
    title: 'Payments',
    sidebarParent: 'Payments',
    lede: 'Send and receive money in 50+ currencies, schedule payments, route approvals, and reconcile against the audit log. Pick a guide below.',
    heroLabel: 'hero image · domestic and international payment flow',
    guides: [
      { title: 'Send a domestic payment (BACS, FPS, CHAPS)', desc: 'Pick the rail that fits your urgency and value. FPS for same-day under £1M, CHAPS for larger, BACS for scheduled.', thumb: 'product shot · new UK payment', tag: 'Payments', time: '6 min read', href: 'subpage.html?parent=Send%20and%20receive%20payments&title=Send%20a%20UK%20payment' },
      { title: 'Send an international payment', desc: 'Add a recipient, pick the currency and route, preview the FX rate, and hit send. Track status end-to-end.', thumb: 'product shot · international payment', tag: 'Payments', time: '8 min read', href: 'subpage.html?parent=Send%20and%20receive%20payments&title=Send%20an%20international%20payment' },
      { title: 'Schedule recurring payments', desc: 'Set a cadence, pick an end date, and we\'ll push each payment through approvals automatically.', thumb: 'product shot · schedule dialog', tag: 'Payments', time: '4 min read', href: 'subpage.html?parent=Send%20and%20receive%20payments&title=Schedule%20a%20payment' },
      { title: 'Batch payment uploads', desc: 'Upload a CSV to run dozens or hundreds of payments at once. Validate before you send.', thumb: 'product shot · CSV upload', tag: 'Payments', time: '5 min read', href: 'subpage.html?parent=Payments&title=UK%20payments' },
      { title: 'What happens when a payment fails?', desc: 'Funds stay in your balance. We notify you, and you can retry from the Payments page.', thumb: 'product shot · failure banner', tag: 'Payments', time: '2 min read', href: 'faq.html' },
      { title: 'Why was my transfer declined?', desc: 'Common reasons include insufficient balance, a frozen card, or recipient details failing verification.', thumb: 'product shot · decline details', tag: 'Payments', time: '2 min read', href: 'faq.html' },
      { title: 'Understanding fees on international transfers', desc: 'How we price FX, what shows on your statement, and how to minimise costs.', thumb: 'product shot · fee breakdown', tag: 'Payments', time: '7 min read', href: 'subpage.html?parent=Payments&title=International%20payments' },
      { title: 'Setting up approval flows', desc: 'Route payments to the right reviewers by threshold, entity, and currency. Covers multi-entity setups.', thumb: 'product shot · approvals builder', tag: 'Approvals', time: '12 min read', href: 'article.html' },
      { title: 'Payment status and tracking', desc: 'What each status means, when money actually moves, and how to chase a stuck payment.', thumb: 'product shot · status timeline', tag: 'Payments', time: '3 min read', href: 'subpage.html?parent=Approvals&title=Approval%20thresholds' }
    ]
  },
  balances: {
    title: 'Balances',
    sidebarParent: 'Balances',
    lede: 'Organise your cash across currencies, entities, and departments. Convert at live mid-market rates and keep a clean paper trail.',
    heroLabel: 'hero image · multi-currency balance overview',
    guides: [
      { title: 'Opening a new balance', desc: 'Pick a currency, name the balance, and choose which entity owns it. New balances are ready in under a minute.', thumb: 'product shot · new balance dialog', tag: 'Balances', time: '5 min read', href: 'subpage.html?parent=Balances&title=Opening%20a%20balance' },
      { title: 'Multi-currency balances explained', desc: 'How balances, currencies, and settlement accounts interact — and what shows up where on your statement.', thumb: 'product shot · currency pill row', tag: 'Balances', time: '7 min read', href: 'subpage.html?parent=Balances&title=Multi-currency%20balances' },
      { title: 'Move money between balances', desc: 'Instant transfers within your own balances, same or different currency. No FX markup on mid-market conversions.', thumb: 'product shot · transfer dialog', tag: 'Balances', time: '3 min read', href: 'subpage.html?parent=Organise%20your%20balances&title=Move%20between%20balances' },
      { title: 'Naming conventions and organisation', desc: 'How we recommend naming balances so finance, ops, and auditors all know what they\'re looking at.', thumb: 'product shot · balance list', tag: 'Balances', time: '3 min read', href: 'subpage.html?parent=Organise%20your%20balances&title=Naming%20conventions' },
      { title: 'Hold 50+ currencies at live rates', desc: 'Our supported currency list, how to add a new one, and which pairs settle fastest.', thumb: 'product shot · currency picker', tag: 'Balances', time: '4 min read', href: 'subpage.html?parent=Exchange%20and%20manage%20currencies&title=Hold%20multiple%20currencies' },
      { title: 'Convert at live mid-market rates', desc: 'Trigger a conversion manually, or set a rule that kicks in when a currency crosses a threshold.', thumb: 'product shot · FX conversion', tag: 'Balances', time: '5 min read', href: 'subpage.html?parent=Exchange%20and%20manage%20currencies&title=Convert%20at%20live%20rates' },
      { title: 'Set up an exchange order', desc: 'Schedule an FX trade for later in the day or when a target rate is hit. Good-till-cancelled supported.', thumb: 'product shot · exchange order form', tag: 'Balances', time: '6 min read', href: 'subpage.html?parent=Exchange%20and%20manage%20currencies&title=Set%20up%20an%20exchange%20order' },
      { title: 'Sub-balances for departments', desc: 'Carve a balance into virtual sub-balances for different teams, cost centres, or projects — with independent reporting.', thumb: 'product shot · sub-balance tree', tag: 'Balances', time: '4 min read', href: 'subpage.html?parent=Organise%20your%20balances&title=Create%20a%20sub-balance' },
      { title: 'Balance statements and exports', desc: 'Download per-balance statements as PDF or CSV for any date range. Great for month-end.', thumb: 'product shot · statement export', tag: 'Balances', time: '2 min read', href: 'subpage.html?parent=Balances&title=Statements' }
    ]
  },
  transactions: {
    title: 'Transactions',
    sidebarParent: 'Transactions',
    lede: 'Export, reconcile, and audit. Match transactions to your accounting tool and prove what happened, when, and by whom.',
    heroLabel: 'hero image · transaction export dashboard',
    guides: [
      { title: 'Export transactions as CSV', desc: 'Pick a date range and filters, then export a clean CSV ready for your accounting tool.', thumb: 'product shot · export dialog', tag: 'Transactions', time: '3 min read', href: 'subpage.html?parent=Report%20and%20monitor%20activity&title=Export%20transactions' },
      { title: 'Reconcile with accounting tools', desc: 'Connect Xero, QuickBooks, or NetSuite and push transactions through automatically each night.', thumb: 'product shot · accounting sync', tag: 'Transactions', time: '6 min read', href: 'subpage.html?parent=Integrate%20with%20your%20stack&title=Accounting%20integrations' },
      { title: 'Audit log and change history', desc: 'Every setting change, approval, and payment is logged. Filter by user, type, or date.', thumb: 'product shot · audit log', tag: 'Transactions', time: '3 min read', href: 'subpage.html?parent=Report%20and%20monitor%20activity&title=Audit%20log' },
      { title: 'Scheduled reports by email', desc: 'Get a daily, weekly, or monthly report emailed to whoever owns finance. Includes custom filters.', thumb: 'product shot · report schedule', tag: 'Transactions', time: '4 min read', href: 'subpage.html?parent=Report%20and%20monitor%20activity&title=Scheduled%20reports' },
      { title: 'View card-level spend reports', desc: 'Slice spend by card, cardholder, merchant category, or cost centre.', thumb: 'product shot · card spend breakdown', tag: 'Transactions', time: '5 min read', href: 'subpage.html?parent=Transactions&title=View%20transactions' },
      { title: 'Approval trail for payments', desc: 'Who approved what, when, and under which rule. Exportable as part of your audit pack.', thumb: 'product shot · approval trail', tag: 'Transactions', time: '4 min read', href: 'subpage.html?parent=Approvals&title=Review%20and%20sign%20off' },
      { title: 'Filter by entity, user, or currency', desc: 'Saved views for the filters your team uses most. Share them across the organisation.', thumb: 'product shot · saved filters', tag: 'Transactions', time: '3 min read', href: 'subpage.html?parent=Transactions&title=Export%20history' },
      { title: 'Integrate with Xero and QuickBooks', desc: 'Auth, map accounts, and pick the sync cadence. We handle retries and reconciliation breaks.', thumb: 'product shot · integration setup', tag: 'Transactions', time: '8 min read', href: 'subpage.html?parent=Integrate%20with%20your%20stack&title=Webhooks' },
      { title: 'Custom report builder', desc: 'Pick dimensions, pick measures, save and share. Everything your finance team needs without a BI tool.', thumb: 'product shot · report builder', tag: 'Transactions', time: '10 min read', href: 'subpage.html?parent=Report%20and%20monitor%20activity&title=Scheduled%20reports' }
    ]
  }
};

window.HelpCentre.popularGuides = [
  {
    key: 'get-started',
    title: 'Get started',
    desc: 'Set up your account and make your first transfer.',
    href: 'article.html'
  },
  {
    key: 'send-receive',
    title: 'Send and receive payments',
    desc: 'Move money in and out of your accounts.',
    href: 'article.html'
  },
  {
    key: 'cards',
    title: 'Create and manage cards',
    desc: 'Issue cards, set limits, freeze or cancel.',
    href: 'article.html'
  }
];
