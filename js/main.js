/**
 * WEDDING INVITATION — PRODUCTION JAVASCRIPT (LIGHT LUXURY ROYAL EDITION)
 * Dr. Sayed Zain Mashhoor & Adv. Hanna Musthafa
 * 
 * Vanilla JS • Zero Dependencies • Accessible • Zero Lag Opening
 */

(function () {
  'use strict';

  const config = window.SITE_CONFIG || {};

  // -------------------------------------------------------------------------
  // 1. CONTENT HYDRATION (Driven entirely by site.config.js)
  // -------------------------------------------------------------------------
  function applyThemeTokens() {
    if (!config.theme || !config.theme.tokens) return;
    const root = document.documentElement;
    const tokens = config.theme.tokens;

    if (tokens.bgPrimary) root.style.setProperty('--bg-primary', tokens.bgPrimary);
    if (tokens.bgSecondary) root.style.setProperty('--bg-secondary', tokens.bgSecondary);
    if (tokens.bgCard) root.style.setProperty('--bg-card', tokens.bgCard);
    if (tokens.accent) root.style.setProperty('--accent', tokens.accent);
    if (tokens.accentDeep) root.style.setProperty('--accent-deep', tokens.accentDeep);
    if (tokens.accentSoft) root.style.setProperty('--accent-soft', tokens.accentSoft);
    if (tokens.gold) root.style.setProperty('--gold', tokens.gold);
    if (tokens.goldBright) root.style.setProperty('--gold-bright', tokens.goldBright);
    if (tokens.goldDark) root.style.setProperty('--gold-dark', tokens.goldDark);
    if (tokens.textPrimary) root.style.setProperty('--text-primary', tokens.textPrimary);
    if (tokens.textDark) root.style.setProperty('--text-dark', tokens.textDark);
    if (tokens.textSecondary) root.style.setProperty('--text-secondary', tokens.textSecondary);
    if (tokens.textMuted) root.style.setProperty('--text-muted', tokens.textMuted);
    if (tokens.borderGold) root.style.setProperty('--border-gold', tokens.borderGold);
  }

  function hydrateContent() {
    // 1. Meta & Document
    if (config.meta) {
      if (config.meta.title) {
        document.title = config.meta.title;
        const el = document.getElementById('metaTitle');
        if (el) el.textContent = config.meta.title;
      }
      if (config.meta.description) {
        const descEl = document.getElementById('metaDescription');
        if (descEl) descEl.setAttribute('content', config.meta.description);
      }
      if (config.meta.ogImage) {
        const ogImg = document.getElementById('ogImage');
        if (ogImg) ogImg.setAttribute('content', config.meta.ogImage);
        const twImg = document.getElementById('twitterImage');
        if (twImg) twImg.setAttribute('content', config.meta.ogImage);
      }
      if (config.meta.url) {
        const ogUrl = document.getElementById('ogUrl');
        if (ogUrl) ogUrl.setAttribute('content', config.meta.url);
      }
    }

    // 2. Cover Gate (Stacked: Zain \n weds \n Hanna)
    if (config.cover) {
      setText('coverBismillah', config.cover.bismillah);
      setText('coverTagline', config.cover.tagline);
      setText('coverDate', config.cover.dateDisplay);
      setText('coverBtnText', config.cover.buttonText);
    }

    // 3. Navigation
    if (config.navigation) {
      setText('mobileBrandText', config.navigation.monogram);
      setText('desktopBrandText', config.navigation.monogram);
      setText('mobileShareBtnLabel', config.navigation.shareButtonText);
      setText('desktopShareBtnLabel', config.navigation.shareButtonText);
    }

    // 4. Hero & Intro (Stacked: Zain \n weds \n Hanna)
    if (config.intro) {
      setText('introBismillah', config.cover?.bismillah || "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ");
      setText('introKicker', config.intro.kicker);
      setText('introSubKicker', config.intro.subKicker);
      setText('introLead', config.intro.lead);
      setText('heroDateDisplay', config.intro.heroDate);
      setText('sideAnnotation', config.intro.sideAnnotation);
    }

    // 5. Couple (Groom First)
    if (config.couple) {
      if (config.couple.groom) {
        setText('groomRole', config.couple.groom.role);
        setText('groomName', config.couple.groom.name);
        setText('groomLineage', config.couple.groom.lineage);
        const groomShort = config.couple.groom.name.replace(/Dr\.\s*|Sayed\s*|Adv\.\s*|Mashhoor/gi, '').trim() || "Zain";
        setText('coverGroomName', groomShort);
        setText('heroGroomName', groomShort);
      }
      setText('coupleAmpersand', config.couple.dividerText || '&');
      setText('coverWedsText', 'weds');
      setText('heroWedsText', 'weds');
      if (config.couple.bride) {
        setText('brideRole', config.couple.bride.role);
        setText('brideName', config.couple.bride.name);
        setText('brideLineage', config.couple.bride.lineage);
        const brideShort = config.couple.bride.name.replace(/Adv\.\s*|Musthafa/gi, '').trim() || "Hanna";
        setText('coverBrideName', brideShort);
        setText('heroBrideName', brideShort);
      }
    }

    // 6. Ceremony
    if (config.ceremony) {
      setText('ceremonyHeading', config.ceremony.heading);
      if (config.ceremony.date) {
        setText('dateLabel', config.ceremony.date.label);
        setText('dateFull', config.ceremony.date.fullDate);
        setText('dateDayNumber', config.ceremony.date.dayNumber);
      }
      if (config.ceremony.time) {
        setText('timeLabel', config.ceremony.time.label);
        setText('timeDisplay', config.ceremony.time.displayTime);
        setText('timeZone', config.ceremony.time.timeZone);
      }
      if (config.ceremony.venue) {
        setText('venueLabel', config.ceremony.venue.label);
        setText('venueName', config.ceremony.venue.name);
        setText('venueLocation', config.ceremony.venue.location);
      }
      if (config.ceremony.mapCard) {
        setText('mapBtnText', config.ceremony.mapCard.buttonText);
        const mapBtn = document.getElementById('openMapsBtn');
        if (mapBtn && config.ceremony.mapCard.mapsUrl) {
          mapBtn.setAttribute('href', config.ceremony.mapCard.mapsUrl);
        }
        const mapFrame = document.querySelector('.map-interactive-frame');
        if (mapFrame && config.ceremony.mapCard.mapsUrl) {
          mapFrame.setAttribute('href', config.ceremony.mapCard.mapsUrl);
        }
      }
      if (config.ceremony.calendar) {
        setText('calendarBtnText', config.ceremony.calendar.buttonText);
        const calBtn = document.getElementById('addToCalendarBtn');
        if (calBtn && config.ceremony.calendar.calendarUrl) {
          calBtn.setAttribute('href', config.ceremony.calendar.calendarUrl);
        }
      }
    }

    // 7. Countdown
    if (config.countdown) {
      setText('countdownHeading', config.countdown.heading);
      setText('countdownSubtext', config.countdown.subheading);
    }

    // 8. Wishes
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

    // 9. Footer
    if (config.footer) {
      setText('footerDua', config.footer.dua);
      setText('footerGratitudeTitle', config.footer.gratitudeTitle);
      setText('footerGratitudeMsg', config.footer.gratitudeMessage);
      setText('footerDate', config.footer.dateFormatted);
      setText('footerCopyright', config.footer.copyright);
    }
  }

  function setText(id, text) {
    if (!text) return;
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  // -------------------------------------------------------------------------
  // 2. TOAST NOTIFICATIONS
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
    }, 3200);
  }

  // -------------------------------------------------------------------------
  // 3. ROYAL COVER GATE UNVEIL — FAST, FLUID, ZERO LAG
  // -------------------------------------------------------------------------
  function setupCoverGate() {
    const doorGate = document.getElementById('doorGate');
    const openBtn = document.getElementById('openInvitationBtn');
    const waxSeal = document.querySelector('.wax-seal-img');
    const pageContent = document.getElementById('pageContent');
    const introLead = document.getElementById('introLead');
    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!doorGate || !pageContent) return;

    function triggerOpen() {
      // 1. Immediately unlock scroll with ZERO delay
      document.documentElement.classList.remove('scroll-locked');
      document.body.classList.remove('scroll-locked');

      // 2. Immediately remove inert so page is fully interactive
      pageContent.removeAttribute('inert');

      // 3. Trigger smooth unveiling transition (fast 500ms)
      doorGate.classList.add('is-opening');
      pageContent.classList.add('is-revealed');

      // 4. Cleanly remove gate from DOM after leaves finish opening (680ms)
      // and gently focus heading without causing any scroll jumps or jank
      const duration = reducedMotion ? 200 : 700;
      setTimeout(function () {
        if (doorGate.parentNode) {
          doorGate.parentNode.removeChild(doorGate);
        }
        if (introLead) {
          introLead.setAttribute('tabindex', '-1');
          try {
            introLead.focus({ preventScroll: true });
          } catch (e) {
            // fallback for older browsers
          }
        }
      }, duration);
    }

    if (openBtn) openBtn.addEventListener('click', triggerOpen);
    if (waxSeal) waxSeal.addEventListener('click', triggerOpen);
  }

  // -------------------------------------------------------------------------
  // 4. SECTION FADE-UP ANIMATIONS (IntersectionObserver)
  // -------------------------------------------------------------------------
  function setupSectionReveals() {
    const sections = document.querySelectorAll('.reveal-section');
    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion || !('IntersectionObserver' in window)) {
      sections.forEach(function (sec) {
        sec.classList.add('is-visible');
      });
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
      threshold: 0.04,
      rootMargin: '0px 0px 80px 0px'
    });

    sections.forEach(function (sec) {
      observer.observe(sec);
    });
  }

  // -------------------------------------------------------------------------
  // 5. COUNTDOWN TIMER
  // -------------------------------------------------------------------------
  function setupCountdown() {
    const targetIso = (config.countdown && config.countdown.isoDateTime) || '2026-12-26T11:00:00+05:30';
    const targetTime = new Date(targetIso).getTime();

    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-minutes');
    const secsEl = document.getElementById('cd-seconds');
    const subtextEl = document.getElementById('countdownSubtext');

    if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

    function rollValue(el, val, animate) {
      const nextStr = String(val).padStart(2, '0');
      if (el.textContent !== nextStr) {
        el.textContent = nextStr;
        if (animate) {
          el.classList.remove('odometer-enter');
          void el.offsetWidth;
          el.classList.add('odometer-enter');
        }
      }
    }

    function updateTimer(animate) {
      const now = Date.now();
      const diff = targetTime - now;

      if (diff <= 0) {
        rollValue(daysEl, 0, false);
        rollValue(hoursEl, 0, false);
        rollValue(minsEl, 0, false);
        rollValue(secsEl, 0, false);
        if (subtextEl && config.countdown && config.countdown.completedText) {
          subtextEl.textContent = config.countdown.completedText;
        }
        return false;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      rollValue(daysEl, days, animate);
      rollValue(hoursEl, hours, animate);
      rollValue(minsEl, minutes, animate);
      rollValue(secsEl, seconds, animate);
      return true;
    }

    updateTimer(false);

    let intervalId = null;
    function startTicking() {
      if (intervalId) return;
      intervalId = setInterval(function () {
        const keepGoing = updateTimer(true);
        if (!keepGoing) {
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
  // 6. GUESTBOOK SERVICE
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
      if (gb.supabaseUrl.includes('YOUR_SUPABASE_URL') || gb.publishableKey.includes('YOUR_SUPABASE_PUBLISHABLE_KEY')) {
        return false;
      }
      // Accept both legacy eyJ... JWT keys and new sb_publishable_... keys
      const hasValidKey = gb.publishableKey.startsWith('eyJ') || gb.publishableKey.startsWith('sb_publishable_');
      if (!hasValidKey) return false;
      return true;
    },

    fetchWishes: async function (page = 0) {
      if (!this.isSupabaseConfigured()) {
        if (config.guestbook && config.guestbook.isSample && Array.isArray(config.guestbook.sampleWishes)) {
          this.wishes = config.guestbook.sampleWishes.slice();
          this.totalCount = this.wishes.length;
          this.hasMore = false;
          return { wishes: this.wishes, count: this.totalCount, isSample: true };
        }
        return { wishes: [], count: 0, isSample: false };
      }

      const gb = config.guestbook;
      const table = gb.tableName || 'wishes';
      const offset = page * this.pageSize;
      const limit = this.pageSize;
      const url = `${gb.supabaseUrl.replace(/\/$/, '')}/rest/v1/${table}?select=*&visible=eq.true&order=created_at.desc&offset=${offset}&limit=${limit}`;

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'apikey': gb.publishableKey,
            'Authorization': `Bearer ${gb.publishableKey}`,
            'Prefer': 'count=exact'
          }
        });

        if (!response.ok) {
          throw new Error(`Supabase request failed with status ${response.status}`);
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

        if (page === 0) {
          this.wishes = data;
        } else {
          this.wishes = this.wishes.concat(data);
        }
        this.totalCount = count;
        this.currentPage = page;
        this.hasMore = this.wishes.length < this.totalCount;

        return { wishes: this.wishes, count: this.totalCount, isSample: false };
      } catch (err) {
        console.warn('Could not fetch wishes from Supabase:', err);
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
      const table = gb.tableName || 'wishes';
      const url = `${gb.supabaseUrl.replace(/\/$/, '')}/rest/v1/${table}`;

      const payload = {
        name: name.trim(),
        message: message.trim(),
        visible: true
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'apikey': gb.publishableKey,
          'Authorization': `Bearer ${gb.publishableKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || 'Failed to submit wish');
      }

      const inserted = await response.json();
      const savedWish = Array.isArray(inserted) ? inserted[0] : inserted;
      this.wishes.unshift(savedWish);
      this.totalCount += 1;
      return { success: true, wish: savedWish, isSample: false };
    }
  };

  // -------------------------------------------------------------------------
  // 7. WISH TICKER
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
    const countChip = document.getElementById('wishCountChip');

    let currentIndex = 0;
    let isPaused = false;
    let cycleTimeout = null;
    let isTransitioning = false;
    let sectionInView = true;

    function updateCountChip() {
      if (!countChip) return;
      const total = Guestbook.totalCount;
      const suffix = (config.wishes && config.wishes.ticker && config.wishes.ticker.counterSuffix) || 'wishes';
      countChip.textContent = `${total} ${suffix}`;
    }

    function createWishElement(wish) {
      const item = document.createElement('div');
      item.className = 'wish-item';

      const authorDiv = document.createElement('div');
      authorDiv.className = 'wish-author';

      const avatar = document.createElement('div');
      avatar.className = 'wish-avatar';
      avatar.setAttribute('aria-hidden', 'true');
      const initial = (wish.name && wish.name.trim().charAt(0).toUpperCase()) || '✦';
      avatar.textContent = initial;

      const nameEl = document.createElement('h3');
      nameEl.className = 'wish-name';
      nameEl.textContent = wish.name || 'Well-wisher';

      authorDiv.appendChild(avatar);
      authorDiv.appendChild(nameEl);

      const sparkle = document.createElement('div');
      sparkle.className = 'wish-sparkle';
      sparkle.setAttribute('aria-hidden', 'true');
      sparkle.textContent = '✦';

      const messageEl = document.createElement('p');
      messageEl.className = 'wish-message';
      messageEl.textContent = wish.message || '';

      item.appendChild(authorDiv);
      item.appendChild(sparkle);
      item.appendChild(messageEl);

      return item;
    }

    function renderEmptyState() {
      if (!tickerContent) return;
      tickerContent.innerHTML = '';
      const emptyDiv = document.createElement('div');
      emptyDiv.className = 'wish-item entering';

      const msg = document.createElement('p');
      msg.className = 'wish-message';
      msg.textContent = (config.wishes && config.wishes.ticker && config.wishes.ticker.emptyStateText) || 'Be the first to leave a wish.';
      emptyDiv.appendChild(msg);
      tickerContent.appendChild(emptyDiv);

      if (counterBadge) counterBadge.textContent = '0 / 0';
    }

    function displayWishAtIndex(index, immediate = false) {
      if (!Guestbook.wishes.length) {
        renderEmptyState();
        return;
      }

      currentIndex = (index + Guestbook.wishes.length) % Guestbook.wishes.length;
      const wish = Guestbook.wishes[currentIndex];

      if (counterBadge) {
        counterBadge.textContent = `${currentIndex + 1} / ${Guestbook.wishes.length}`;
      }

      const newItem = createWishElement(wish);
      newItem.classList.add('entering');

      const oldItem = tickerContent.querySelector('.wish-item');

      if (oldItem && !immediate) {
        isTransitioning = true;
        oldItem.classList.remove('entering', 'holding');
        oldItem.classList.add('exiting');

        setTimeout(function () {
          tickerContent.innerHTML = '';
          tickerContent.appendChild(newItem);
          isTransitioning = false;
          scheduleNextCycle(wish.message);
        }, 550);
      } else {
        tickerContent.innerHTML = '';
        tickerContent.appendChild(newItem);
        scheduleNextCycle(wish.message);
      }
    }

    function scheduleNextCycle(message) {
      clearTimeout(cycleTimeout);
      if (isPaused || !sectionInView || document.hidden || Guestbook.wishes.length <= 1) {
        return;
      }

      const words = (message || '').trim().split(/\s+/).length;
      const extraTime = Math.max(0, words - 15) * 40;
      const holdTime = Math.min(6000, 2000 + extraTime);

      cycleTimeout = setTimeout(function () {
        displayWishAtIndex(currentIndex + 1);
      }, holdTime);
    }

    function togglePause() {
      isPaused = !isPaused;
      if (pauseIcon && playIcon) {
        pauseIcon.style.display = isPaused ? 'none' : 'block';
        playIcon.style.display = isPaused ? 'block' : 'none';
      }
      if (pauseBtn) {
        const ariaLabel = isPaused
          ? (config.wishes?.ticker?.playButtonAria || 'Resume wish ticker')
          : (config.wishes?.ticker?.pauseButtonAria || 'Pause wish ticker');
        pauseBtn.setAttribute('aria-label', ariaLabel);
      }
      if (!isPaused) {
        displayWishAtIndex(currentIndex + 1);
      } else {
        clearTimeout(cycleTimeout);
      }
    }

    if (pauseBtn) pauseBtn.addEventListener('click', togglePause);

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        clearTimeout(cycleTimeout);
        displayWishAtIndex(currentIndex - 1, true);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        clearTimeout(cycleTimeout);
        displayWishAtIndex(currentIndex + 1, true);
      });
    }

    if (tickerPanel) {
      tickerPanel.addEventListener('mouseenter', function () { clearTimeout(cycleTimeout); });
      tickerPanel.addEventListener('mouseleave', function () {
        if (!isPaused) scheduleNextCycle(Guestbook.wishes[currentIndex]?.message);
      });
      tickerPanel.addEventListener('focusin', function () { clearTimeout(cycleTimeout); });
      tickerPanel.addEventListener('focusout', function () {
        if (!isPaused) scheduleNextCycle(Guestbook.wishes[currentIndex]?.message);
      });
      tickerPanel.addEventListener('touchstart', function () { clearTimeout(cycleTimeout); }, { passive: true });
    }

    const wishesSection = document.getElementById('wishes');
    if (wishesSection && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          sectionInView = entry.isIntersecting;
          if (sectionInView && !isPaused && !document.hidden) {
            scheduleNextCycle(Guestbook.wishes[currentIndex]?.message);
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
      } else if (!isPaused && sectionInView) {
        scheduleNextCycle(Guestbook.wishes[currentIndex]?.message);
      }
    });

    Guestbook.fetchWishes(0).then(function (res) {
      updateCountChip();
      if (res.wishes && res.wishes.length > 0) {
        displayWishAtIndex(0, true);
      } else {
        renderEmptyState();
      }
    });

    return {
      onNewWishAdded: function () {
        updateCountChip();
        displayWishAtIndex(0, true);
      }
    };
  }

  // -------------------------------------------------------------------------
  // 8. WISH FORM SUBMISSION
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
    const cooldownSecs = (config.wishes && config.wishes.limits && config.wishes.limits.cooldownSeconds) || 60;

    function showAlert(text, isError = false) {
      if (!alertBox) return;
      alertBox.textContent = text;
      alertBox.className = isError ? 'form-alert is-error' : 'form-alert is-success';
    }

    function clearAlert() {
      if (!alertBox) return;
      alertBox.textContent = '';
      alertBox.className = 'form-alert';
    }

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      clearAlert();

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
          const cooldownMsg = (config.wishes && config.wishes.form && config.wishes.form.cooldownMessage) || 'Please wait before sending another wish.';
          showAlert(`${cooldownMsg} (${waitSecs}s remaining)`, true);
          return;
        }
      }

      const name = nameInput.value.trim();
      const message = msgInput.value.trim();
      const maxName = (config.wishes && config.wishes.limits && config.wishes.limits.nameMaxLength) || 60;
      const maxMsg = (config.wishes && config.wishes.limits && config.wishes.limits.messageMaxLength) || 300;

      if (!name || name.length > maxName) {
        showAlert(`Please enter a name up to ${maxName} characters.`, true);
        nameInput.focus();
        return;
      }

      if (!message || message.length > maxMsg) {
        showAlert(`Please enter a message up to ${maxMsg} characters.`, true);
        msgInput.focus();
        return;
      }

      submitBtn.disabled = true;
      const origText = submitBtn.querySelector('span')?.textContent || 'Send your wishes';
      if (submitBtn.querySelector('span')) {
        submitBtn.querySelector('span').textContent = (config.wishes && config.wishes.form && config.wishes.form.submittingButtonText) || 'Sending...';
      }

      try {
        await Guestbook.submitWish(name, message);
        localStorage.setItem(cooldownKey, Date.now().toString());
        form.reset();

        const successMsg = (config.wishes && config.wishes.form && config.wishes.form.successMessage) || 'Thank you for your warm wishes & prayers!';
        showAlert(successMsg, false);
        showToast('Wish sent successfully');

        if (tickerApi && typeof tickerApi.onNewWishAdded === 'function') {
          tickerApi.onNewWishAdded();
        }
      } catch (err) {
        console.error('Wish submission error:', err);
        const errMsg = (config.wishes && config.wishes.form && config.wishes.form.errorMessage) || 'Could not send wish. Please try again.';
        showAlert(errMsg, true);
      } finally {
        submitBtn.disabled = false;
        if (submitBtn.querySelector('span')) {
          submitBtn.querySelector('span').textContent = origText;
        }
      }
    });
  }

  // -------------------------------------------------------------------------
  // 9. "VIEW ALL WISHES" MODAL
  // -------------------------------------------------------------------------
  function setupAllWishesModal() {
    const modal = document.getElementById('wishesModal');
    const openBtn = document.getElementById('viewAllWishesBtn');
    const closeBtn = document.getElementById('modalCloseBtn');
    const listContainer = document.getElementById('modalWishesList');
    const loadMoreBtn = document.getElementById('modalLoadMoreBtn');
    const loadMoreText = document.getElementById('modalLoadMoreText');
    let previousActiveElement = null;

    if (!modal || !openBtn || !closeBtn || !listContainer) return;

    function renderModalList(clear = false) {
      if (clear) listContainer.innerHTML = '';

      if (!Guestbook.wishes.length) {
        const empty = document.createElement('p');
        empty.className = 'text-center text-muted';
        empty.style.padding = '32px 0';
        empty.textContent = (config.wishes && config.wishes.ticker && config.wishes.ticker.emptyStateText) || 'Be the first to leave a wish.';
        listContainer.appendChild(empty);
        if (loadMoreBtn) loadMoreBtn.style.display = 'none';
        return;
      }

      Guestbook.wishes.forEach(function (wish) {
        const card = document.createElement('article');
        card.className = 'modal-wish-card';

        const authorDiv = document.createElement('div');
        authorDiv.className = 'wish-author';

        const avatar = document.createElement('div');
        avatar.className = 'wish-avatar';
        avatar.textContent = (wish.name && wish.name.trim().charAt(0).toUpperCase()) || '✦';

        const nameEl = document.createElement('h4');
        nameEl.className = 'wish-name';
        nameEl.textContent = wish.name || 'Well-wisher';

        authorDiv.appendChild(avatar);
        authorDiv.appendChild(nameEl);

        const msgEl = document.createElement('p');
        msgEl.className = 'wish-message';
        msgEl.textContent = wish.message || '';

        card.appendChild(authorDiv);
        card.appendChild(msgEl);
        listContainer.appendChild(card);
      });

      if (loadMoreBtn) {
        loadMoreBtn.style.display = Guestbook.hasMore ? 'inline-flex' : 'none';
      }
    }

    function openModal() {
      previousActiveElement = document.activeElement;
      renderModalList(true);
      modal.classList.add('is-open');
      modal.focus();
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleTrapKey);
    }

    function closeModal() {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleTrapKey);
      if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
        previousActiveElement.focus();
      }
    }

    function handleTrapKey(e) {
      if (e.key === 'Escape' || e.keyCode === 27) {
        closeModal();
        return;
      }

      if (e.key === 'Tab' || e.keyCode === 9) {
        const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
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
        renderModalList(true);
        loadMoreBtn.disabled = false;
        if (loadMoreText) {
          loadMoreText.textContent = (config.wishes && config.wishes.modal && config.wishes.modal.loadMoreText) || 'Load more';
        }
      });
    }
  }

  // -------------------------------------------------------------------------
  // 10. NAVIGATION
  // -------------------------------------------------------------------------
  function setupNavigation() {
    const overlay = document.getElementById('mobileMenuOverlay');
    const openBtn = document.getElementById('menuOpenBtn');
    const closeBtn = document.getElementById('menuCloseBtn');
    const navLinks = document.querySelectorAll('.mobile-nav-link');

    if (openBtn && overlay) {
      openBtn.addEventListener('click', function () {
        overlay.classList.add('is-open');
        const firstLink = overlay.querySelector('a');
        if (firstLink) firstLink.focus();
      });
    }

    if (closeBtn && overlay) {
      closeBtn.addEventListener('click', function () {
        overlay.classList.remove('is-open');
        if (openBtn) openBtn.focus();
      });
    }

    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (overlay) overlay.classList.remove('is-open');
      });
    });

    document.addEventListener('keydown', function (e) {
      if ((e.key === 'Escape' || e.keyCode === 27) && overlay && overlay.classList.contains('is-open')) {
        overlay.classList.remove('is-open');
        if (openBtn) openBtn.focus();
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
      } else {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(window.location.href).then(function () {
            showToast('Invitation link copied to clipboard!');
          }).catch(function () {
            showToast('Invitation ready to share: ' + window.location.href);
          });
        } else {
          showToast('Invitation link ready to share');
        }
      }
    }

    const shareBtnMobile = document.getElementById('shareBtnMobile');
    const shareBtnDesktop = document.getElementById('shareBtnDesktop');
    if (shareBtnMobile) shareBtnMobile.addEventListener('click', handleShare);
    if (shareBtnDesktop) shareBtnDesktop.addEventListener('click', handleShare);
  }

  // -------------------------------------------------------------------------
  // 11. INITIALIZATION
  // -------------------------------------------------------------------------
  function init() {
    applyThemeTokens();
    hydrateContent();
    setupCoverGate();
    setupSectionReveals();
    setupCountdown();
    const tickerApi = setupWishTicker();
    setupWishForm(tickerApi);
    setupAllWishesModal();
    setupNavigation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
