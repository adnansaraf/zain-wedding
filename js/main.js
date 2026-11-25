/**
 * Wedding Invitation — Interactive Script
 * Dr. Sayed Zain Mashhoor & Adv. Hanna Musthafa
 * Vanilla JS · Zero Dependencies · Accessible · 60fps
 */

(function () {
  'use strict';

  const config = window.SITE_CONFIG || {};

  function setText(id, value) {
    if (value === undefined || value === null || value === '') return;
    const el = document.getElementById(id);
    const str = String(value);
    if (el && el.textContent !== str) el.textContent = str;
  }

  function setAttr(id, attr, value) {
    if (!value) return;
    const el = document.getElementById(id);
    if (el && el.getAttribute(attr) !== value) el.setAttribute(attr, value);
  }

  const BUILTIN_THEMES = {
    ivorySage: {
      bg: '#FBF9F4', bg2: '#F3EEE2', tint: '#C9D5C3', tintSoft: '#E6ECE2',
      ink: '#24402F', inkMuted: '#5F6F63', accent: '#B08D4A', line: 'rgba(176,141,74,.35)'
    },
    pearlBlue: {
      bg: '#FCFBF8', bg2: '#F1F4F6', tint: '#DCE6EC', tintSoft: '#EAF0F4',
      ink: '#2C4257', inkMuted: '#647789', accent: '#BFA46F', line: 'rgba(191,164,111,.4)'
    }
  };

  // -------------------------------------------------------------------------
  // 1. THEME PRESETS ("ivorySage" | "pearlBlue")
  // -------------------------------------------------------------------------
  function applyThemePreset() {
    const themeCfg = config.theme || {};
    const presetName = themeCfg.preset === 'pearlBlue' ? 'pearlBlue' : 'ivorySage';
    const root = document.documentElement;
    if (root.getAttribute('data-theme') !== presetName) {
      root.setAttribute('data-theme', presetName);
    }

    const tokens = (themeCfg.presets && themeCfg.presets[presetName]) || null;
    const baseline = BUILTIN_THEMES[presetName];
    if (!tokens || !baseline) return;

    // Only write inline CSS vars if config overrides built-in defaults (avoids load-time style recalc)
    if (tokens.bg && tokens.bg !== baseline.bg) root.style.setProperty('--bg', tokens.bg);
    if (tokens.bg2 && tokens.bg2 !== baseline.bg2) root.style.setProperty('--bg-2', tokens.bg2);
    if (tokens.tint && tokens.tint !== baseline.tint) root.style.setProperty('--tint', tokens.tint);
    if (tokens.tintSoft && tokens.tintSoft !== baseline.tintSoft) root.style.setProperty('--tint-soft', tokens.tintSoft);
    if (tokens.ink && tokens.ink !== baseline.ink) root.style.setProperty('--ink', tokens.ink);
    if (tokens.inkMuted && tokens.inkMuted !== baseline.inkMuted) root.style.setProperty('--ink-muted', tokens.inkMuted);
    if (tokens.accent && tokens.accent !== baseline.accent) root.style.setProperty('--accent', tokens.accent);
    if (tokens.line && tokens.line !== baseline.line) root.style.setProperty('--line', tokens.line);

    const metaTheme = document.getElementById('metaThemeColor');
    if (metaTheme && tokens.themeColor && metaTheme.getAttribute('content') !== tokens.themeColor) {
      metaTheme.setAttribute('content', tokens.themeColor);
    }
  }

  // -------------------------------------------------------------------------
  // 2. CONTENT HYDRATION FROM CONFIG
  // -------------------------------------------------------------------------
  function hydrateCover() {
    if (config.meta && config.meta.title && document.title !== config.meta.title) {
      document.title = config.meta.title;
    }
    if (config.cover) {
      setText('coverBismillah', config.cover.bismillah);
      setText('coverTagline', config.cover.tagline);
      setText('coverGroomName', config.cover.groomName);
      setText('coverWedsText', config.cover.wedsText);
      setText('coverBrideName', config.cover.brideName);
      setText('coverDateNumbers', config.cover.dateNumbers);
      setText('coverDayName', config.cover.dayName);
      setText('coverSealMonogram', config.cover.sealMonogram);
      setText('coverBtnText', config.cover.buttonText);
    }
  }

  function hydrateContent() {
    if (config.meta) {
      if (config.meta.title) {
        setText('metaTitle', config.meta.title);
        setAttr('ogTitle', 'content', config.meta.title);
        setAttr('twitterTitle', 'content', config.meta.title);
      }
      if (config.meta.description) {
        setAttr('metaDescription', 'content', config.meta.description);
        setAttr('ogDescription', 'content', config.meta.description);
        setAttr('twitterDescription', 'content', config.meta.description);
      }
      if (config.meta.ogImage) {
        setAttr('ogImage', 'content', config.meta.ogImage);
        setAttr('twitterImage', 'content', config.meta.ogImage);
      }
      if (config.meta.url) {
        setAttr('ogUrl', 'content', config.meta.url);
      }
    }

    // Navigation
    if (config.navigation) {
      setText('navMonogram', config.navigation.monogram);
      setText('desktopShareBtnLabel', config.navigation.shareButtonText);

      if (Array.isArray(config.navigation.links) && config.navigation.links.length) {
        const expected = config.navigation.links.map(i => `#${i.id}:${i.label}`).join('|');
        const desktopList = document.getElementById('desktopNavLinks');
        const mobileList = document.getElementById('mobileNavList');
        const current = desktopList
          ? [...desktopList.querySelectorAll('a')].map(a => `${a.getAttribute('href')}:${a.textContent}`).join('|')
          : '';

        if (current !== expected) {
          if (desktopList) {
            desktopList.textContent = '';
            config.navigation.links.forEach(function (item) {
              const li = document.createElement('li');
              const a = document.createElement('a');
              a.setAttribute('href', `#${item.id}`);
              a.textContent = item.label;
              li.appendChild(a);
              desktopList.appendChild(li);
            });
          }
          if (mobileList) {
            mobileList.textContent = '';
            config.navigation.links.forEach(function (item) {
              const li = document.createElement('li');
              const a = document.createElement('a');
              a.className = 'mobile-nav-link';
              a.setAttribute('href', `#${item.id}`);
              a.textContent = item.label;
              li.appendChild(a);
              mobileList.appendChild(li);
            });
          }
        }
      }
    }

    // Hero & Intro Note
    const groomHero = config.cover?.groomName || 'Zain';
    const brideHero = config.cover?.brideName || 'Hanna';
    setText('heroGroomName', groomHero);
    setText('heroBrideName', brideHero);
    setText('heroAmpersand', config.couple?.dividerText || '&');

    if (config.intro) {
      setText('introBismillah', config.intro.bismillah);
      setText('introSubKicker', config.intro.subKicker);
      setText('introKicker', config.intro.kicker);
      setText('heroMonth', config.intro.month);
      setText('heroDay', config.intro.day);
      setText('heroWeekday', config.intro.weekday);
      setText('heroYear', config.intro.year);
      setText('introLead', config.intro.lead);
    }

    // Couple (Groom First)
    if (config.couple) {
      if (config.couple.groom) {
        setText('groomRole', config.couple.groom.role);
        setText('groomName', config.couple.groom.name);
        setText('groomLineage', config.couple.groom.lineage);
      }
      setText('coupleAmpersand', config.couple.dividerText || '&');
      if (config.couple.bride) {
        setText('brideRole', config.couple.bride.role);
        setText('brideName', config.couple.bride.name);
        setText('brideLineage', config.couple.bride.lineage);
      }
    }

    // Ceremony
    if (config.ceremony) {
      setText('ceremonyHeading', config.ceremony.heading);
      if (config.ceremony.date) {
        setText('dateLabel', config.ceremony.date.label);
        setText('dateValue', config.ceremony.date.value);
        setText('dateSubtext', config.ceremony.date.subtext);
      }
      if (config.ceremony.time) {
        setText('timeLabel', config.ceremony.time.label);
        setText('timeDisplay', config.ceremony.time.value);
        setText('timeZone', config.ceremony.time.subtext);
      }
      if (config.ceremony.venue) {
        setText('venueLabel', config.ceremony.venue.label);
        setText('venueName', config.ceremony.venue.value);
        setText('venueLocation', config.ceremony.venue.subtext);
      }
    }

    // Venue Card
    if (config.venue) {
      setText('venueCardName', config.venue.name);
      setText('venueCardArea', config.venue.area);
      setText('venueCardAddress', config.venue.address);
      setText('mapBtnText', config.venue.mapsButtonText);
      setAttr('openMapsBtn', 'href', config.venue.mapsUrl);
      setText('calendarBtnText', config.venue.calendarButtonText);
      setAttr('addToCalendarBtn', 'href', config.venue.calendarUrl);
      setText('copyAddressBtnText', config.venue.copyButtonText);
    }

    // Countdown
    if (config.countdown) {
      setText('countdownHeadingPrefix', config.countdown.headingPrefix);
      setText('countdownHeadingAccent', config.countdown.headingAccent);
      setText('countdownSubtext', config.countdown.subheading);
    }

    // Wishes
    if (config.wishes) {
      setText('wishesHeading', config.wishes.heading);
      setText('wishesDesc', config.wishes.description);
      if (config.wishes.form) {
        setText('formNameLabel', config.wishes.form.nameLabel);
        setText('formMessageLabel', config.wishes.form.messageLabel);
        setText('formSubmitBtnText', config.wishes.form.submitButtonText);
        const nameInput = document.getElementById('wishNameInput');
        if (nameInput && config.wishes.form.namePlaceholder) {
          nameInput.placeholder = config.wishes.form.namePlaceholder;
        }
        const msgInput = document.getElementById('wishMessageInput');
        if (msgInput && config.wishes.form.messagePlaceholder) {
          msgInput.placeholder = config.wishes.form.messagePlaceholder;
        }
      }
      if (config.wishes.ticker) {
        setText('viewAllWishesBtnText', config.wishes.ticker.viewAllText);
      }
      if (config.wishes.modal) {
        setText('modalTitle', config.wishes.modal.title);
        setText('modalLoadMoreText', config.wishes.modal.loadMoreText);
      }
    }

    // Footer
    if (config.footer) {
      setText('footerDua', config.footer.dua);
      setText('footerGratitudeTitle', config.footer.gratitudeTitle);
      setText('footerGratitudeMsg', config.footer.gratitudeMessage);
      setText('footerGroomName', groomHero);
      setText('footerWedsText', config.footer.wedsText);
      setText('footerBrideName', brideHero);
      setText('footerDate', config.footer.dateFormatted);
      setText('footerCopyright', config.footer.copyright);
    }
  }

  // -------------------------------------------------------------------------
  // 3. TOAST NOTIFICATIONS
  // -------------------------------------------------------------------------
  let toastTimer = null;
  function showToast(message) {
    const toast = document.getElementById('toastBanner');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-active');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('is-active');
    }, 3000);
  }

  // -------------------------------------------------------------------------
  // 4. COVER GATE (DOORS OPEN IN 2.4s, IMMEDIATE SCROLL UNLOCK)
  // -------------------------------------------------------------------------
  function setupCoverGate(onOpen) {
    const doorGate = document.getElementById('doorGate');
    const openBtn = document.getElementById('openInvitationBtn');
    const pageContent = document.getElementById('pageContent');
    const heroHeading = document.querySelector('.hero-names');
    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!doorGate || !pageContent) {
      if (typeof onOpen === 'function') onOpen();
      return;
    }

    let opened = false;
    function triggerOpen() {
      if (opened) return;
      opened = true;

      // Unlock scroll & interactivity immediately on tap
      document.documentElement.classList.remove('scroll-locked');
      document.body.classList.remove('scroll-locked');
      pageContent.removeAttribute('inert');

      // Reveal page shell & trigger 2.4s door swing
      doorGate.classList.add('is-opening');
      pageContent.classList.add('is-revealed');

      // Initialize page sections cleanly as doors swing open
      if (typeof onOpen === 'function') onOpen();

      // Move focus to first hero heading cleanly without scrolling
      setTimeout(function () {
        if (heroHeading) {
          heroHeading.setAttribute('tabindex', '-1');
          try {
            heroHeading.focus({ preventScroll: true });
          } catch (err) {
            heroHeading.focus();
          }
        }
      }, reducedMotion ? 100 : 600);

      // Remove cover gate from DOM once swing completes (2.5s or 300ms)
      const removeDelay = reducedMotion ? 300 : 2500;
      setTimeout(function () {
        if (doorGate.parentNode) {
          doorGate.parentNode.removeChild(doorGate);
        }
      }, removeDelay);
    }

    if (openBtn) {
      openBtn.addEventListener('click', triggerOpen);
    }
  }

  // -------------------------------------------------------------------------
  // 5. NAVIGATION & SCROLL BLUR
  // -------------------------------------------------------------------------
  function setupNavigation() {
    const navEl = document.getElementById('siteNav');
    const overlay = document.getElementById('mobileMenuOverlay');
    const openBtn = document.getElementById('menuOpenBtn');
    const closeBtn = document.getElementById('menuCloseBtn');

    function updateNavBlur() {
      if (!navEl) return;
      if (window.scrollY > 16) {
        navEl.classList.add('is-scrolled');
      } else {
        navEl.classList.remove('is-scrolled');
      }
    }

    window.addEventListener('scroll', updateNavBlur, { passive: true });

    function openOverlay() {
      if (!overlay) return;
      overlay.hidden = false;
      overlay.classList.add('is-open');
      if (openBtn) openBtn.setAttribute('aria-expanded', 'true');
      const firstLink = overlay.querySelector('a');
      if (firstLink) firstLink.focus();
    }

    function closeOverlay() {
      if (!overlay) return;
      overlay.classList.remove('is-open');
      overlay.hidden = true;
      if (openBtn) {
        openBtn.setAttribute('aria-expanded', 'false');
        openBtn.focus();
      }
    }

    if (openBtn) openBtn.addEventListener('click', openOverlay);
    if (closeBtn) closeBtn.addEventListener('click', closeOverlay);

    if (overlay) {
      overlay.addEventListener('click', function (e) {
        if (e.target.classList && e.target.classList.contains('mobile-nav-link')) {
          overlay.classList.remove('is-open');
          overlay.hidden = true;
          if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    document.addEventListener('keydown', function (e) {
      if ((e.key === 'Escape' || e.keyCode === 27) && overlay && overlay.classList.contains('is-open')) {
        closeOverlay();
      }
    });

    const shareData = {
      title: config.meta?.title || 'Zain Weds Hanna',
      text: config.meta?.description || 'You are cordially invited to celebrate the Nikah of Dr. Sayed Zain Mashhoor & Adv. Hanna Musthafa on 26 December 2026.',
      url: window.location.href
    };

    function handleShare() {
      if (navigator.share) {
        navigator.share(shareData).catch(function () {});
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(window.location.href)
          .then(function () { showToast('Invitation link copied'); })
          .catch(function () { showToast('Ready to share: ' + window.location.href); });
      } else {
        showToast('Ready to share');
      }
    }

    const shareMobile = document.getElementById('shareBtnMobile');
    const shareDesktop = document.getElementById('shareBtnDesktop');
    if (shareMobile) shareMobile.addEventListener('click', handleShare);
    if (shareDesktop) shareDesktop.addEventListener('click', handleShare);
  }

  // -------------------------------------------------------------------------
  // 6. ONE-TIME SECTION & STAGGER REVEALS
  // -------------------------------------------------------------------------
  function setupSectionReveals() {
    const items = document.querySelectorAll('.reveal-block, .reveal-stagger');
    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px 40px 0px'
    });

    items.forEach(function (el) { observer.observe(el); });
  }

  // -------------------------------------------------------------------------
  // 7. VENUE GOOGLE MAPS EMBED, INTERACTION GUARD & COPY ADDRESS
  // -------------------------------------------------------------------------
  function setupVenueSection() {
    const copyBtn = document.getElementById('copyAddressBtn');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        const address = (config.venue && config.venue.address) || 'Presidency Convention Center, Poopalam, Perinthalmanna, Kerala 679322';
        const toastMsg = (config.venue && config.venue.copiedToast) || 'Address copied';

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(address)
            .then(function () { showToast(toastMsg); })
            .catch(function () { fallbackCopy(address, toastMsg); });
        } else {
          fallbackCopy(address, toastMsg);
        }
      });
    }

    function fallbackCopy(text, msg) {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand('copy');
        showToast(msg);
      } catch (err) {
        showToast(text);
      }
      document.body.removeChild(area);
    }

    const frame = document.getElementById('venueMapFrame');
    const iframe = document.getElementById('venueMapIframe');
    const guard = document.getElementById('venueMapGuard');
    if (!frame || !iframe) return;

    const venueName = (config.venue && config.venue.name) || 'Presidency Convention Center';
    const address = (config.venue && config.venue.address) || 'Presidency Convention Center, Poopalam, Perinthalmanna, Kerala 679322';
    const customEmbed = config.venue && config.venue.mapEmbedSrc ? String(config.venue.mapEmbedSrc).trim() : '';
    const embedSrc = customEmbed || ('https://www.google.com/maps?q=' + encodeURIComponent(address) + '&z=16&output=embed');

    iframe.setAttribute('title', 'Map showing ' + venueName + ', Poopalam');

    let iframeLoaded = false;
    let loadTimer = null;

    function showMapFallback() {
      frame.classList.add('is-fallback');
      frame.classList.remove('is-interactive');
    }

    function clearMapFallback() {
      frame.classList.remove('is-fallback');
    }

    if (guard) {
      guard.addEventListener('click', function () {
        if (frame.classList.contains('is-fallback')) return;
        frame.classList.add('is-interactive');
      });
    }

    iframe.addEventListener('load', function () {
      if (navigator.onLine === false) {
        showMapFallback();
        return;
      }
      iframeLoaded = true;
      clearTimeout(loadTimer);
      clearMapFallback();
    });

    iframe.addEventListener('error', showMapFallback);

    window.addEventListener('offline', showMapFallback);
    window.addEventListener('online', function () {
      clearMapFallback();
      iframeLoaded = false;
      iframe.src = embedSrc;
    });

    if (navigator.onLine === false) {
      showMapFallback();
      return;
    }

    iframe.src = embedSrc;

    // Start load timeout once venue section enters view so lazy loading never falsely triggers fallback
    function armFallbackTimeout() {
      if (iframeLoaded || loadTimer) return;
      loadTimer = setTimeout(function () {
        if (!iframeLoaded || navigator.onLine === false) {
          showMapFallback();
        }
      }, 12000);
    }

    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            armFallbackTimeout();
            obs.disconnect();
          }
        });
      }, { rootMargin: '200px 0px' });
      obs.observe(frame);
    } else {
      armFallbackTimeout();
    }
  }

  // -------------------------------------------------------------------------
  // 8. COUNTDOWN WITH 60S ARCH PROGRESS STROKE
  // -------------------------------------------------------------------------
  function setupCountdown() {
    const targetIso = (config.countdown && config.countdown.isoDateTime) || '2026-12-26T11:00:00+05:30';
    const targetTime = new Date(targetIso).getTime();

    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-minutes');
    const secsEl = document.getElementById('cd-seconds');
    const subtextEl = document.getElementById('countdownSubtext');
    const progressPath = document.getElementById('secondsProgressPath');
    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

    let lastSec = null;

    function rollValue(el, val, animate) {
      const nextStr = String(val).padStart(2, '0');
      if (el.textContent !== nextStr) {
        el.textContent = nextStr;
        if (animate && !reducedMotion) {
          el.classList.remove('is-rolling');
          void el.offsetWidth;
          el.classList.add('is-rolling');
        }
      }
    }

    function updateProgressRing(secs, animate) {
      if (!progressPath) return;
      if (animate && lastSec !== null && secs > lastSec) {
        progressPath.style.transition = 'none';
        progressPath.style.strokeDashoffset = '60';
        void progressPath.getBoundingClientRect();
        progressPath.style.transition = '';
      }
      progressPath.style.strokeDashoffset = String(secs);
      lastSec = secs;
    }

    function updateTimer(animate) {
      const diff = targetTime - Date.now();

      if (diff <= 0) {
        rollValue(daysEl, 0, false);
        rollValue(hoursEl, 0, false);
        rollValue(minsEl, 0, false);
        rollValue(secsEl, 0, false);
        updateProgressRing(0, false);
        if (subtextEl && config.countdown && config.countdown.completedText) {
          subtextEl.textContent = config.countdown.completedText;
        }
        return false;
      }

      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff / 3600000) % 24);
      const minutes = Math.floor((diff / 60000) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      rollValue(daysEl, days, animate);
      rollValue(hoursEl, hours, animate);
      rollValue(minsEl, minutes, animate);
      rollValue(secsEl, seconds, animate);
      updateProgressRing(seconds, animate);
      return true;
    }

    updateTimer(false);

    let intervalId = null;
    function startTicking() {
      if (intervalId) return;
      intervalId = setInterval(function () {
        if (!updateTimer(true)) {
          clearInterval(intervalId);
          intervalId = null;
        }
      }, 1000);
    }

    function stopTicking() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }

    startTicking();

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        stopTicking();
      } else {
        updateTimer(false);
        startTicking();
      }
    });
  }

  // -------------------------------------------------------------------------
  // 9. GUESTBOOK & SUPABASE WISHES
  // -------------------------------------------------------------------------
  const Guestbook = {
    wishes: [],
    totalCount: 0,
    hasMore: false,
    pageSize: 50,
    currentPage: 0,

    isSupabaseConfigured: function () {
      const gb = config.guestbook;
      if (!gb || !gb.supabaseUrl || !gb.publishableKey) return false;
      if (!gb.supabaseUrl.startsWith('https://') ||
          gb.supabaseUrl.includes('YOUR_SUPABASE_URL') ||
          gb.publishableKey.includes('YOUR_SUPABASE_PUBLISHABLE_KEY')) {
        return false;
      }
      return gb.publishableKey.startsWith('eyJ') || gb.publishableKey.startsWith('sb_publishable_');
    },

    buildHeaders: function (publishableKey, extra) {
      const headers = Object.assign({ 'apikey': publishableKey }, extra || {});
      if (publishableKey && publishableKey.startsWith('eyJ')) {
        headers['Authorization'] = `Bearer ${publishableKey}`;
      }
      return headers;
    },

    fetchWishes: async function (page = 0) {
      if (!this.isSupabaseConfigured()) {
        console.warn('[Wishes] Supabase credentials not configured in config/site.config.js.');
        if (config.guestbook && config.guestbook.isSample && Array.isArray(config.guestbook.sampleWishes)) {
          this.wishes = config.guestbook.sampleWishes.slice();
          this.totalCount = this.wishes.length;
          this.hasMore = false;
          return { wishes: this.wishes, count: this.totalCount, isSample: true };
        }
        return { wishes: [], count: 0, isSample: false };
      }

      const gb = config.guestbook;
      const table = gb.tableName || 'zain_hanna_wishes';
      const baseUrl = gb.supabaseUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
      const offset = page * this.pageSize;
      const url = `${baseUrl}/rest/v1/${table}?select=*&visible=eq.true&order=created_at.desc&offset=${offset}&limit=${this.pageSize}`;

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: this.buildHeaders(gb.publishableKey, { 'Prefer': 'count=exact' })
        });

        if (!response.ok) {
          const errDetail = await response.text().catch(function () { return ''; });
          throw new Error(`HTTP ${response.status} from Supabase (${table}): ${errDetail}`);
        }

        const data = await response.json();
        const contentRange = response.headers.get('content-range');
        let count = data.length;
        if (contentRange && contentRange.includes('/')) {
          const parts = contentRange.split('/');
          if (parts[1] && parts[1] !== '*') {
            count = parseInt(parts[1], 10);
          }
        }

        this.wishes = page === 0 ? data : this.wishes.concat(data);
        this.totalCount = count;
        this.currentPage = page;
        this.hasMore = this.wishes.length < this.totalCount;

        if (this.totalCount === 0) {
          console.info(`[Wishes] Connected cleanly to "${table}", currently 0 visible rows.`);
        }

        return { wishes: this.wishes, count: this.totalCount, isSample: false };
      } catch (err) {
        console.error('[Wishes] Failed to load wishes from Supabase:', err);
        if (config.guestbook && config.guestbook.isSample && Array.isArray(config.guestbook.sampleWishes)) {
          this.wishes = config.guestbook.sampleWishes.slice();
          this.totalCount = this.wishes.length;
          return { wishes: this.wishes, count: this.totalCount, isSample: true };
        }
        return { wishes: [], count: 0, isSample: false, error: err };
      }
    },

    submitWish: async function (name, message) {
      if (!this.isSupabaseConfigured()) {
        const newWish = {
          id: Date.now(),
          name: name.trim(),
          message: message.trim(),
          created_at: new Date().toISOString()
        };
        this.wishes.unshift(newWish);
        this.totalCount += 1;
        return { success: true, wish: newWish, isSample: true };
      }

      const gb = config.guestbook;
      const table = gb.tableName || 'zain_hanna_wishes';
      const baseUrl = gb.supabaseUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
      const url = `${baseUrl}/rest/v1/${table}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: this.buildHeaders(gb.publishableKey, {
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        }),
        body: JSON.stringify({
          name: name.trim(),
          message: message.trim(),
          visible: true
        })
      });

      if (!response.ok) {
        const errText = await response.text().catch(function () { return ''; });
        console.error(`[Wishes] Submit failed (${response.status}):`, errText);
        throw new Error(errText || `HTTP ${response.status}`);
      }

      const inserted = await response.json();
      const savedWish = Array.isArray(inserted) ? inserted[0] : inserted;
      this.wishes.unshift(savedWish);
      this.totalCount += 1;
      return { success: true, wish: savedWish, isSample: false };
    }
  };

  // -------------------------------------------------------------------------
  // 10. WISH TICKER & CONTROLS
  // -------------------------------------------------------------------------
  function setupWishTicker() {
    const tickerPanel = document.getElementById('wishTickerPanel');
    const tickerContent = document.getElementById('wishTickerContent');
    const counterBadge = document.getElementById('wishTickerCounter');
    const prevBtn = document.getElementById('wishPrevBtn');
    const nextBtn = document.getElementById('wishNextBtn');
    const pauseBtn = document.getElementById('wishPauseBtn');
    const pauseIcon = document.getElementById('pauseIcon');
    const playIcon = document.getElementById('playIcon');
    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let currentIndex = 0;
    let isPaused = false;
    let cycleTimeout = null;
    let transitionTimeout = null;
    let sectionInView = true;

    function createWishNode(wish) {
      const wrap = document.createElement('div');
      wrap.className = 'wish-item';

      const nameEl = document.createElement('h3');
      nameEl.className = 'wish-name';
      nameEl.textContent = wish.name || 'Well-wisher';

      const msgEl = document.createElement('p');
      msgEl.className = 'wish-message';
      msgEl.textContent = wish.message || '';

      wrap.appendChild(nameEl);
      wrap.appendChild(msgEl);
      return wrap;
    }

    function renderEmpty() {
      if (!tickerContent) return;
      tickerContent.textContent = '';

      const item = document.createElement('div');
      item.className = 'wish-item';
      const msg = document.createElement('p');
      msg.className = 'wish-message';
      msg.textContent = config.wishes?.ticker?.emptyStateText || 'Be the first to leave a wish.';
      item.appendChild(msg);
      tickerContent.appendChild(item);

      if (counterBadge) counterBadge.hidden = true;
    }

    function showWish(index, options) {
      if (!Guestbook.wishes.length) {
        renderEmpty();
        return;
      }

      const opts = typeof options === 'boolean' ? { immediate: options } : (options || {});
      const immediate = Boolean(opts.immediate);
      const direction = opts.direction === 'prev' ? 'prev' : 'next';

      clearTimeout(cycleTimeout);
      clearTimeout(transitionTimeout);

      currentIndex = (index + Guestbook.wishes.length) % Guestbook.wishes.length;
      const wish = Guestbook.wishes[currentIndex];
      const totalForCounter = Guestbook.totalCount > Guestbook.wishes.length
        ? Guestbook.totalCount
        : Guestbook.wishes.length;

      if (counterBadge) {
        counterBadge.hidden = false;
        counterBadge.textContent = `${currentIndex + 1} / ${totalForCounter}`;
      }

      const nextNode = createWishNode(wish);
      const enterCls = direction === 'prev' ? 'entering-down' : 'entering-up';
      const exitCls = direction === 'prev' ? 'exiting-down' : 'exiting-up';
      const prevNode = tickerContent.querySelector('.wish-item');

      if (prevNode && !immediate) {
        prevNode.classList.remove('entering-up', 'entering-down', 'exiting-up', 'exiting-down');
        prevNode.classList.add(exitCls);
        const exitMs = reducedMotion ? 220 : 520;
        transitionTimeout = setTimeout(function () {
          tickerContent.textContent = '';
          nextNode.classList.add(enterCls);
          tickerContent.appendChild(nextNode);
          scheduleNext(wish.message);
        }, exitMs);
      } else {
        tickerContent.textContent = '';
        if (!immediate) nextNode.classList.add(enterCls);
        tickerContent.appendChild(nextNode);
        scheduleNext(wish.message);
      }
    }

    function scheduleNext(message) {
      clearTimeout(cycleTimeout);
      if (isPaused || !sectionInView || document.hidden || Guestbook.wishes.length <= 1) return;

      const words = (message || '').trim().split(/\s+/).length;
      const extraMs = Math.max(0, words - 15) * 40;
      const holdMs = Math.min(6000, 2000 + extraMs);

      cycleTimeout = setTimeout(function () {
        showWish(currentIndex + 1, { direction: 'next' });
      }, holdMs);
    }

    function stepNext() {
      if (!Guestbook.wishes.length) return;
      showWish(currentIndex + 1, { direction: 'next' });
    }

    function stepPrev() {
      if (!Guestbook.wishes.length) return;
      showWish(currentIndex - 1, { direction: 'prev' });
    }

    if (pauseBtn) {
      pauseBtn.addEventListener('click', function () {
        isPaused = !isPaused;
        if (pauseIcon && playIcon) {
          pauseIcon.style.display = isPaused ? 'none' : 'block';
          playIcon.style.display = isPaused ? 'block' : 'none';
        }
        pauseBtn.setAttribute('aria-label', isPaused ? 'Resume wish ticker' : 'Pause wish ticker');
        if (isPaused) {
          clearTimeout(cycleTimeout);
        } else if (Guestbook.wishes.length) {
          stepNext();
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', stepPrev);
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', stepNext);
    }

    if (tickerPanel) {
      tickerPanel.addEventListener('mouseenter', function () { clearTimeout(cycleTimeout); });
      tickerPanel.addEventListener('mouseleave', function () {
        if (!isPaused && Guestbook.wishes.length) scheduleNext(Guestbook.wishes[currentIndex]?.message);
      });
      tickerPanel.addEventListener('focusin', function () { clearTimeout(cycleTimeout); });
      tickerPanel.addEventListener('focusout', function () {
        if (!isPaused && Guestbook.wishes.length) scheduleNext(Guestbook.wishes[currentIndex]?.message);
      });

      // Keyboard: ArrowUp = next, ArrowDown = previous
      tickerPanel.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          stepNext();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          stepPrev();
        }
      });

      // Touch swipe: vertical swipe only (swipe up = next, swipe down = previous)
      let touchStartY = 0;
      let touchStartX = 0;
      tickerPanel.addEventListener('touchstart', function (e) {
        clearTimeout(cycleTimeout);
        if (e.changedTouches && e.changedTouches[0]) {
          touchStartY = e.changedTouches[0].clientY;
          touchStartX = e.changedTouches[0].clientX;
        }
      }, { passive: true });

      tickerPanel.addEventListener('touchend', function (e) {
        if (!e.changedTouches || !e.changedTouches[0]) return;
        const deltaY = e.changedTouches[0].clientY - touchStartY;
        const deltaX = Math.abs(e.changedTouches[0].clientX - touchStartX);
        if (Math.abs(deltaY) >= 36 && Math.abs(deltaY) > deltaX) {
          if (deltaY < 0) {
            stepNext();
          } else {
            stepPrev();
          }
        } else if (!isPaused && Guestbook.wishes.length) {
          scheduleNext(Guestbook.wishes[currentIndex]?.message);
        }
      }, { passive: true });
    }

    const wishesSection = document.getElementById('wishes');
    if (wishesSection && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          sectionInView = entry.isIntersecting;
          if (sectionInView && !isPaused && !document.hidden && Guestbook.wishes.length) {
            scheduleNext(Guestbook.wishes[currentIndex]?.message);
          } else {
            clearTimeout(cycleTimeout);
          }
        });
      }, { threshold: 0.1 });
      observer.observe(wishesSection);
    }

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        clearTimeout(cycleTimeout);
      } else if (!isPaused && sectionInView && Guestbook.wishes.length) {
        scheduleNext(Guestbook.wishes[currentIndex]?.message);
      }
    });

    Guestbook.fetchWishes(0).then(function (res) {
      if (res.wishes && res.wishes.length > 0) {
        showWish(0, { immediate: true });
      } else {
        renderEmpty();
      }
    });

    return {
      onNewWishAdded: function () {
        showWish(0, { immediate: true });
      }
    };
  }

  // -------------------------------------------------------------------------
  // 11. WISH FORM & MODAL
  // -------------------------------------------------------------------------
  function setupWishForm(tickerApi) {
    const form = document.getElementById('wishForm');
    const nameInput = document.getElementById('wishNameInput');
    const msgInput = document.getElementById('wishMessageInput');
    const hpInput = document.getElementById('wishHp');
    const submitBtn = document.getElementById('wishSubmitBtn');
    const alertBox = document.getElementById('wishFormAlert');

    if (!form || !nameInput || !msgInput || !submitBtn) return;

    const cooldownKey = 'nikah_wish_cooldown_ts';
    const cooldownSecs = (config.wishes?.limits?.cooldownSeconds) || 60;

    function showAlert(text, isError) {
      if (!alertBox) return;
      alertBox.textContent = text;
      alertBox.className = isError ? 'form-alert is-error' : 'form-alert is-success';
    }

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      if (alertBox) {
        alertBox.textContent = '';
        alertBox.className = 'form-alert';
      }

      if (hpInput && hpInput.value) {
        showToast('Thank you for your wishes.');
        form.reset();
        return;
      }

      const lastSent = localStorage.getItem(cooldownKey);
      if (lastSent) {
        const diffSecs = (Date.now() - parseInt(lastSent, 10)) / 1000;
        if (diffSecs < cooldownSecs) {
          const waitSecs = Math.ceil(cooldownSecs - diffSecs);
          const msg = config.wishes?.form?.cooldownMessage || 'Please wait before sending another wish.';
          showAlert(`${msg} (${waitSecs}s)`, true);
          return;
        }
      }

      const name = nameInput.value.trim();
      const message = msgInput.value.trim();
      const maxName = config.wishes?.limits?.nameMaxLength || 60;
      const maxMsg = config.wishes?.limits?.messageMaxLength || 300;

      if (!name || name.length > maxName) {
        showAlert(`Please enter your name (up to ${maxName} characters).`, true);
        nameInput.focus();
        return;
      }

      if (!message || message.length > maxMsg) {
        showAlert(`Please enter a message (up to ${maxMsg} characters).`, true);
        msgInput.focus();
        return;
      }

      submitBtn.disabled = true;
      const btnSpan = submitBtn.querySelector('span');
      const origLabel = btnSpan ? btnSpan.textContent : 'Send your wishes';
      if (btnSpan) btnSpan.textContent = config.wishes?.form?.submittingButtonText || 'Sending...';

      try {
        await Guestbook.submitWish(name, message);
        localStorage.setItem(cooldownKey, Date.now().toString());
        form.reset();
        showAlert(config.wishes?.form?.successMessage || 'Thank you for your warm wishes & prayers!', false);
        showToast('Wish sent');
        if (tickerApi && typeof tickerApi.onNewWishAdded === 'function') {
          tickerApi.onNewWishAdded();
        }
      } catch (err) {
        showAlert(config.wishes?.form?.errorMessage || 'Could not send wish. Please try again.', true);
      } finally {
        submitBtn.disabled = false;
        if (btnSpan) btnSpan.textContent = origLabel;
      }
    });
  }

  function setupAllWishesModal() {
    const modal = document.getElementById('wishesModal');
    const openBtn = document.getElementById('viewAllWishesBtn');
    const closeBtn = document.getElementById('modalCloseBtn');
    const listContainer = document.getElementById('modalWishesList');
    const loadMoreBtn = document.getElementById('modalLoadMoreBtn');
    const loadMoreText = document.getElementById('modalLoadMoreText');
    let previousFocus = null;

    if (!modal || !openBtn || !closeBtn || !listContainer) return;

    function renderList() {
      listContainer.textContent = '';

      if (!Guestbook.wishes.length) {
        const empty = document.createElement('p');
        empty.className = 'wish-message';
        empty.style.textAlign = 'center';
        empty.style.padding = '24px 0';
        empty.textContent = config.wishes?.ticker?.emptyStateText || 'Be the first to leave a wish.';
        listContainer.appendChild(empty);
        if (loadMoreBtn) loadMoreBtn.style.display = 'none';
        return;
      }

      Guestbook.wishes.forEach(function (wish) {
        const card = document.createElement('article');
        card.className = 'modal-wish-card';

        const nameEl = document.createElement('h4');
        nameEl.className = 'wish-name';
        nameEl.textContent = wish.name || 'Well-wisher';

        const msgEl = document.createElement('p');
        msgEl.className = 'wish-message';
        msgEl.textContent = wish.message || '';

        card.appendChild(nameEl);
        card.appendChild(msgEl);
        listContainer.appendChild(card);
      });

      if (loadMoreBtn) {
        loadMoreBtn.style.display = Guestbook.hasMore ? 'inline-flex' : 'none';
      }
    }

    function openModal() {
      previousFocus = document.activeElement;
      renderList();
      modal.classList.add('is-open');
      modal.focus();
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onModalKeyDown);
    }

    function closeModal() {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onModalKeyDown);
      if (previousFocus && typeof previousFocus.focus === 'function') {
        previousFocus.focus();
      }
    }

    function onModalKeyDown(e) {
      if (e.key === 'Escape' || e.keyCode === 27) {
        closeModal();
        return;
      }
      if (e.key === 'Tab' || e.keyCode === 9) {
        const focusables = modal.querySelectorAll('button, [href], input, textarea, [tabindex]:not([tabindex="-1"])');
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }

    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });

    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', async function () {
        loadMoreBtn.disabled = true;
        if (loadMoreText) loadMoreText.textContent = 'Loading...';
        await Guestbook.fetchWishes(Guestbook.currentPage + 1);
        renderList();
        loadMoreBtn.disabled = false;
        if (loadMoreText) loadMoreText.textContent = config.wishes?.modal?.loadMoreText || 'Load more';
      });
    }
  }

  // -------------------------------------------------------------------------
  // INITIALIZE
  // -------------------------------------------------------------------------
  function initRevealedPage() {
    hydrateContent();
    setupNavigation();
    setupSectionReveals();
    setupVenueSection();
    setupCountdown();
    const tickerApi = setupWishTicker();
    setupWishForm(tickerApi);
    setupAllWishesModal();
  }

  function init() {
    applyThemePreset();
    hydrateCover();

    const bgVar = window.getComputedStyle(document.documentElement).getPropertyValue('--bg');
    if (!bgVar || !bgVar.trim()) {
      document.documentElement.classList.add('css-fallback');
      document.documentElement.classList.remove('scroll-locked');
      document.body.classList.remove('scroll-locked');
      const gate = document.getElementById('doorGate');
      const page = document.getElementById('pageContent');
      if (gate) gate.hidden = true;
      if (page) page.removeAttribute('inert');
      initRevealedPage();
      return;
    }

    setupCoverGate(initRevealedPage);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
