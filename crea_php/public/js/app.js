document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('[data-toggle="mobile-nav"]');
  const nav = document.querySelector('[data-mobile-nav]');
  const navContainer = document.querySelector('.primary-nav');
  const panelLinks = document.querySelectorAll('.mega-panel__column');
  const navLinks = document.querySelectorAll('.primary-nav .nav-link');
  const siteHeader = document.querySelector('.site-header');
  const logo = siteHeader ? siteHeader.querySelector('.logo') : null;
  const logoMark = logo ? logo.querySelector('.logo-mark') : null;
  const logoText = logo ? logo.querySelector('.logo-text') : null;
  const desktopMedia = window.matchMedia('(min-width: 1180px)');
  const reduceMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
  const isDesktop = () => desktopMedia.matches;
  const allowMotion = () => !reduceMotionMedia.matches;
  let resetLogoMotion = null;
  let refreshHeaderGlass = null;

  const addMediaListener = (mediaQueryList, handler) => {
    if (!mediaQueryList || typeof handler !== 'function') {
      return;
    }

    if (typeof mediaQueryList.addEventListener === 'function') {
      mediaQueryList.addEventListener('change', handler);
    } else if (typeof mediaQueryList.addListener === 'function') {
      mediaQueryList.addListener(handler);
    }
  };

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('is-open');
    });
  }

  if (siteHeader && logo) {
    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    let rafId = null;

    const resetLogo = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      logo.style.setProperty('--logo-shift-x', '0px');
      logo.style.setProperty('--logo-shift-y', '0px');
      logo.style.setProperty('--logo-tilt-x', '0deg');
      logo.style.setProperty('--logo-tilt-y', '0deg');
      logo.style.setProperty('--logo-scale', '1');
      if (logoMark) {
        logoMark.style.setProperty('--logo-mark-shift-x', '0px');
        logoMark.style.setProperty('--logo-mark-shift-y', '0px');
        logoMark.style.setProperty('--logo-mark-depth', '0px');
      }
      if (logoText) {
        logoText.style.setProperty('--logo-text-shift-x', '0px');
        logoText.style.setProperty('--logo-text-shift-y', '0px');
        logoText.style.setProperty('--logo-text-depth', '0px');
      }
    };

    const setLogoPerspective = (clientX, clientY) => {
      const headerRect = siteHeader.getBoundingClientRect();
      if (!headerRect.width || !headerRect.height) {
        return;
      }

      const relX = clamp(((clientX - headerRect.left) / headerRect.width) - 0.5, -0.75, 0.75);
      const relY = clamp(((clientY - headerRect.top) / headerRect.height) - 0.5, -0.75, 0.75);
      const shiftX = clamp(relX * 22, -14, 14);
      const shiftY = clamp(relY * 18, -12, 12);
      const tiltX = clamp(relX * -10, -8, 8);
      const tiltY = clamp(relY * 8, -6, 6);
      const scale = 1 + Math.min(Math.hypot(relX, relY) * 0.08, 0.08);

      logo.style.setProperty('--logo-shift-x', `${shiftX.toFixed(2)}px`);
      logo.style.setProperty('--logo-shift-y', `${shiftY.toFixed(2)}px`);
      logo.style.setProperty('--logo-tilt-x', `${tiltX.toFixed(2)}deg`);
      logo.style.setProperty('--logo-tilt-y', `${tiltY.toFixed(2)}deg`);
      logo.style.setProperty('--logo-scale', scale.toFixed(3));

      if (logoMark) {
        logoMark.style.setProperty('--logo-mark-shift-x', `${(shiftX * 0.45).toFixed(2)}px`);
        logoMark.style.setProperty('--logo-mark-shift-y', `${(shiftY * 0.45).toFixed(2)}px`);
        logoMark.style.setProperty('--logo-mark-depth', `${(16 + Math.abs(relX) * 10).toFixed(2)}px`);
      }

      if (logoText) {
        logoText.style.setProperty('--logo-text-shift-x', `${(shiftX * 0.28).toFixed(2)}px`);
        logoText.style.setProperty('--logo-text-shift-y', `${(shiftY * 0.28).toFixed(2)}px`);
        logoText.style.setProperty('--logo-text-depth', `${(6 + Math.abs(relX) * 7).toFixed(2)}px`);
      }
    };

    const shouldAnimateLogo = () => isDesktop() && allowMotion();

    const handlePointer = event => {
      if (!shouldAnimateLogo()) {
        resetLogo();
        return;
      }

      const { clientX, clientY } = event;
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(() => setLogoPerspective(clientX, clientY));
    };

    siteHeader.addEventListener('pointermove', handlePointer, { passive: true });
    siteHeader.addEventListener('pointerdown', handlePointer, { passive: true });
    siteHeader.addEventListener('pointerleave', resetLogo);

    addMediaListener(desktopMedia, event => {
      if (!event.matches) {
        resetLogo();
      }
    });

    addMediaListener(reduceMotionMedia, event => {
      if (event.matches) {
        resetLogo();
      }
    });

    resetLogoMotion = resetLogo;
  }

  if (siteHeader) {
    const updateHeaderGlass = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / 280, 1);
      const baseOpacity = 0.76;
      const opacity = baseOpacity + progress * 0.18;
      const borderAlpha = 0.08 + progress * 0.14;
      const blur = 14 + progress * 5;
      const auroraOpacity = 1 - progress * 0.3;

      siteHeader.style.setProperty('--header-opacity', opacity.toFixed(3));
      siteHeader.style.setProperty('--header-border-alpha', borderAlpha.toFixed(3));
      siteHeader.style.setProperty('--header-blur', `${blur.toFixed(2)}px`);
      siteHeader.style.setProperty('--header-aurora-opacity', auroraOpacity.toFixed(3));
    };

    refreshHeaderGlass = updateHeaderGlass;
    updateHeaderGlass();
    window.addEventListener('scroll', updateHeaderGlass, { passive: true });
    addMediaListener(desktopMedia, updateHeaderGlass);
    addMediaListener(reduceMotionMedia, updateHeaderGlass);
  }

  const navItems = document.querySelectorAll('.primary-nav .nav-item');
  const closeTimers = new WeakMap();
  const PANEL_MARGIN = 24;

  const adjustPanelPosition = (item, panel) => {
    if (!panel) {
      return;
    }

    panel.style.setProperty('--panel-shift', '-50%');
    const rect = panel.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    let shift = '-50%';
    if (rect.left < PANEL_MARGIN) {
      const delta = PANEL_MARGIN - rect.left;
      shift = `calc(-50% + ${delta}px)`;
    } else if (rect.right > viewportWidth - PANEL_MARGIN) {
      const delta = rect.right - (viewportWidth - PANEL_MARGIN);
      shift = `calc(-50% - ${delta}px)`;
    }

    panel.style.setProperty('--panel-shift', shift);
  };

  const resetPanel = panel => {
    if (panel) {
      panel.classList.remove('is-active');
      panel.style.removeProperty('--panel-shift');
    }
  };

  const clearCloseTimer = item => {
    const timerId = closeTimers.get(item);
    if (timerId) {
      clearTimeout(timerId);
      closeTimers.delete(item);
    }
  };

  const scheduleClose = (item, panel) => {
    clearCloseTimer(item);
    const timeoutId = setTimeout(() => {
      item.classList.remove('is-hovering');
      resetPanel(panel);
      closeTimers.delete(item);
    }, 400);
    closeTimers.set(item, timeoutId);
  };

  const closeAllPanels = (excludeItem = null) => {
    navItems.forEach(otherItem => {
      if (excludeItem && otherItem === excludeItem) {
        return;
      }
      const otherPanel = otherItem.querySelector('.mega-panel');
      clearCloseTimer(otherItem);
      otherItem.classList.remove('is-hovering');
      resetPanel(otherPanel);
    });
  };

  navItems.forEach(item => {
    const panel = item.querySelector('.mega-panel');
    if (!panel) {
      return;
    }

    const open = () => {
      closeAllPanels(item);
      clearCloseTimer(item);
      item.classList.add('is-hovering');
      panel.classList.add('is-active');
      requestAnimationFrame(() => adjustPanelPosition(item, panel));
    };

    item.addEventListener('mouseenter', open);
    item.addEventListener('focusin', open);
    item.addEventListener('mouseleave', () => scheduleClose(item, panel));
    item.addEventListener('focusout', event => {
      if (!item.contains(event.relatedTarget)) {
        scheduleClose(item, panel);
      }
    });
  });

  if (navContainer) {
    const setHighlightFromRect = rect => {
      if (!isDesktop()) {
        navContainer.style.setProperty('--focus-visible', '0');
        return;
      }

      const centerX = (rect.left + rect.width / 2);
      const centerY = (rect.top + rect.height / 2);
      const navRect = navContainer.getBoundingClientRect();
      if (!navRect.width || !navRect.height) {
        return;
      }
      const relativeX = ((centerX - navRect.left) / navRect.width) * 100;
      const relativeY = ((centerY - navRect.top) / navRect.height) * 100;
      navContainer.style.setProperty('--focus-x', `${relativeX}%`);
      navContainer.style.setProperty('--focus-y', `${relativeY}%`);
    };

    navContainer.addEventListener('pointermove', event => {
      if (!isDesktop()) {
        navContainer.style.setProperty('--focus-visible', '0');
        return;
      }

      const navRect = navContainer.getBoundingClientRect();
      if (!navRect.width || !navRect.height) {
        return;
      }
      const relativeX = ((event.clientX - navRect.left) / navRect.width) * 100;
      const relativeY = ((event.clientY - navRect.top) / navRect.height) * 100;
      navContainer.style.setProperty('--focus-x', `${relativeX}%`);
      navContainer.style.setProperty('--focus-y', `${relativeY}%`);
      navContainer.style.setProperty('--focus-visible', '1');
    }, { passive: true });

    navContainer.addEventListener('pointerleave', () => {
      navContainer.style.setProperty('--focus-visible', '0');
    });

    navContainer.addEventListener('mouseleave', () => {
      navItems.forEach(item => {
        const panel = item.querySelector('.mega-panel');
        if (!panel || !item.classList.contains('is-hovering')) {
          return;
        }
        scheduleClose(item, panel);
      });
    });

    navLinks.forEach(link => {
      link.addEventListener('focus', () => {
        const rect = link.getBoundingClientRect();
        setHighlightFromRect(rect);
        navContainer.style.setProperty('--focus-visible', '1');
      });

      link.addEventListener('blur', () => {
        navContainer.style.setProperty('--focus-visible', '0');
      });
    });

    addMediaListener(desktopMedia, event => {
      if (!event.matches) {
        navContainer.style.setProperty('--focus-visible', '0');
      }
    });
  }

  const spawnButtonWave = (button, x, y, size) => {
    if (!button) {
      return;
    }

    const wave = document.createElement('span');
    wave.className = 'button-wave';
    const diameter = Math.max(size, 12);
    wave.style.setProperty('--wave-size', `${diameter}px`);
    wave.style.width = `${diameter}px`;
    wave.style.height = `${diameter}px`;
    wave.style.left = `${x}px`;
    wave.style.top = `${y}px`;

    const prune = () => {
      wave.remove();
    };

    wave.addEventListener('animationend', prune, { once: true });
    wave.addEventListener('animationcancel', prune, { once: true });

    const existing = button.querySelectorAll('.button-wave');
    if (existing.length > 4) {
      existing[0].remove();
    }

    button.appendChild(wave);
  };

  const authButtons = document.querySelectorAll('.auth-links .button');

  authButtons.forEach(button => {
    button.addEventListener('pointerdown', event => {
      if (!allowMotion()) {
        return;
      }

      if (typeof event.button === 'number' && event.button !== 0) {
        return;
      }

      const rect = button.getBoundingClientRect();
      const maxDimension = Math.max(rect.width, rect.height) * 1.6;
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      spawnButtonWave(button, x, y, maxDimension);
    });

    button.addEventListener('keydown', event => {
      if (event.repeat) {
        return;
      }

      if (!allowMotion()) {
        return;
      }

      if (event.code === 'Enter' || event.code === 'Space' || event.key === 'Enter' || event.key === ' ') {
        const rect = button.getBoundingClientRect();
        const maxDimension = Math.max(rect.width, rect.height) * 1.4;
        spawnButtonWave(button, rect.width / 2, rect.height / 2, maxDimension);
      }
    });
  });

  const handleLinkClick = () => {
    closeAllPanels();
    if (navContainer) {
      navContainer.classList.add('is-forced-close');

      const release = () => {
        navContainer.classList.remove('is-forced-close');
        navContainer.removeEventListener('pointermove', onMove);
      };

      function onMove() {
        release();
      }

      navContainer.addEventListener('pointermove', onMove);
      setTimeout(release, 350);
    }
  };

  panelLinks.forEach(link => {
    link.addEventListener('click', handleLinkClick, { passive: true });
  });

  navLinks.forEach(link => {
    link.addEventListener('click', handleLinkClick, { passive: true });
  });

  window.addEventListener('resize', () => {
    navItems.forEach(item => {
      const panel = item.querySelector('.mega-panel');
      if (!panel) {
        return;
      }

      if (item.classList.contains('is-hovering')) {
        requestAnimationFrame(() => adjustPanelPosition(item, panel));
      } else {
        clearCloseTimer(item);
        resetPanel(panel);
      }
    });
  });

  window.addEventListener('resize', () => {
    if (resetLogoMotion) {
      resetLogoMotion();
    }

    if (refreshHeaderGlass) {
      refreshHeaderGlass();
    }
  });
});
