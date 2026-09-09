// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');

if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Scroll-spy: highlight exactly one nav link — a section link, or the
// logo ("Ramin Partovi") when scrolled above the first section.
const navAnchors = document.querySelectorAll('.nav-links a, .mobile-nav a');
const logoLinks = document.querySelectorAll('.logo');
const spySections = [...document.querySelectorAll('main > section[id]')];
const siteHeader = document.querySelector('.site-header');

// Hide the floating header while scrolling down, reveal it again on the way
// back up. Ignored near the very top so the header doesn't hide before
// there's anything to scroll past.
let lastScrollY = window.scrollY;
const HEADER_REVEAL_THRESHOLD = 80;

const updateHeaderVisibility = () => {
  if (!siteHeader) return;
  const currentY = window.scrollY;
  if (currentY <= HEADER_REVEAL_THRESHOLD) {
    siteHeader.classList.remove('is-hidden');
  } else if (currentY > lastScrollY) {
    siteHeader.classList.add('is-hidden');
  } else if (currentY < lastScrollY) {
    siteHeader.classList.remove('is-hidden');
  }
  lastScrollY = currentY;
};

if (navAnchors.length && spySections.length) {
  const TRIGGER_OFFSET = 120; // px from viewport top, just below the floating header

  const updateActiveLink = () => {
    const triggerY = TRIGGER_OFFSET;
    const current = spySections.find((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top <= triggerY && rect.bottom > triggerY;
    });

    navAnchors.forEach((link) => {
      link.classList.toggle('active', !!current && link.getAttribute('href') === `#${current.id}`);
    });

    // Above the first section (i.e. still in the hero) — the logo stands in
    // for "top of page" so only one nav item is ever active at once.
    const atTop = !current && spySections[0].getBoundingClientRect().top > triggerY;
    logoLinks.forEach((link) => link.classList.toggle('active', atTop));
  };

  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateActiveLink();
        updateHeaderVisibility();
        ticking = false;
      });
    },
    { passive: true }
  );

  updateActiveLink();
} else if (siteHeader) {
  // Pages without scroll-spy sections (e.g. case studies) still get the
  // hide/reveal header behavior on its own scroll listener.
  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateHeaderVisibility();
        ticking = false;
      });
    },
    { passive: true }
  );
}

// Card build-animations (workflow diagram, plant growth, ...): each plays
// once when scrolled into view, and replays from the start on card hover.
function setupBuildAnimation(diagramSelector) {
  const diagram = document.querySelector(diagramSelector);
  const card = diagram && diagram.closest('a');
  if (!diagram || !card) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            diagram.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(diagram);
  } else {
    diagram.classList.add('is-visible');
  }

  card.addEventListener('mouseenter', () => {
    // Transitions animate from their current value, so simply toggling the
    // class again wouldn't visibly reset anything already mid/fully shown.
    // Disable transitions, snap back to the hidden state, then re-enable
    // them before replaying so the whole sequence actually restarts.
    diagram.classList.add('resetting');
    diagram.classList.remove('is-visible');
    void diagram.offsetWidth; // force reflow to apply the snap-back
    diagram.classList.remove('resetting');
    void diagram.offsetWidth; // force reflow so the next class change starts a fresh transition
    diagram.classList.add('is-visible');
  });
}

setupBuildAnimation('.workflow-diagram');
setupBuildAnimation('.plant-diagram');
setupBuildAnimation('.pulse-bars');

// "What I was up against" staircase: draws the connecting line between the
// numbered nodes and fades in each step in sequence, once, on scroll into view.
document.querySelectorAll('.cs-challenge-steps').forEach((group) => {
  const svg = group.querySelector('.cs-challenge-line');
  const path = svg && svg.querySelector('path');
  const circles = [...group.querySelectorAll('.cs-step-number')];
  if (!svg || !path || circles.length < 2) return;

  const measurePath = () => {
    const containerRect = group.getBoundingClientRect();
    const points = circles.map((circle) => {
      const r = circle.getBoundingClientRect();
      return {
        x: r.left + r.width / 2 - containerRect.left,
        y: r.top + r.height / 2 - containerRect.top,
        r: r.width / 2,
      };
    });
    // Draw only the segments between circle edges, so the line is centered
    // in the gap between nodes instead of running underneath them.
    const segments = [];
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i];
      const b = points[i + 1];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const ux = dx / dist;
      const uy = dy / dist;
      const startX = a.x + ux * a.r;
      const startY = a.y + uy * a.r;
      const endX = b.x - ux * b.r;
      const endY = b.y - uy * b.r;
      segments.push(`M ${startX} ${startY} L ${endX} ${endY}`);
    }
    path.setAttribute('d', segments.join(' '));
    const length = path.getTotalLength();
    path.style.strokeDasharray = String(length);
    if (!svg.classList.contains('is-drawing')) {
      path.style.strokeDashoffset = String(length);
    }
    return length;
  };

  measurePath();
  window.addEventListener('resize', measurePath);

  const reveal = () => {
    measurePath();
    requestAnimationFrame(() => {
      group.classList.add('is-visible');
      svg.classList.add('is-drawing');
      path.style.strokeDashoffset = '0';
    });
    // Steps slide up into place as they fade in (see .cs-challenge-step
    // transform transition, up to 0.7s delay + 0.5s duration) — re-measure
    // once they've settled so the line lands on the circles' final position
    // instead of where they started.
    setTimeout(measurePath, 1300);
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal();
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(group);
  } else {
    reveal();
  }
});

// "What I was up against" cards: fade up into place in sequence, once, on
// scroll into view (same reveal pattern as the staircase it replaced).
document.querySelectorAll('.cs-against-grid').forEach((group) => {
  const reveal = () => group.classList.add('is-visible');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal();
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(group);
  } else {
    reveal();
  }
});

// Auto-scrolling phone mockup: pause the pan animation while off-screen.
document.querySelectorAll('.cs-scroll-phone-screen').forEach((screen) => {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          screen.classList.toggle('is-visible', entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(screen);
  } else {
    screen.classList.add('is-visible');
  }
});

// Brand Management showcase: a small carousel — three desktop screens plus
// the mobile screen — that auto-advances but can also be jumped to directly
// via the dots, so the user isn't stuck waiting on the animation.
document.querySelectorAll('.cs-brand-showcase').forEach((showcase) => {
  const browserStage = showcase.querySelector('.cs-browser-mockup');
  const phoneStage = showcase.querySelector('.cs-scroll-phone');
  const browserSlides = Array.from(showcase.querySelectorAll('.cs-browser-slide'));
  const dotsWrap = showcase.querySelector('.cs-brand-dots');
  const dots = dotsWrap ? Array.from(dotsWrap.querySelectorAll('.cs-brand-dot')) : [];
  const prevBtn = showcase.querySelector('.cs-brand-arrow-prev');
  const nextBtn = showcase.querySelector('.cs-brand-arrow-next');
  if (!browserStage || !phoneStage || !dots.length) return;

  const total = browserSlides.length + 1;
  const AUTO_MS = 5000;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const phoneContent = phoneStage.querySelector('.cs-scroll-phone-content');
  let current = 0;
  let phoneWasActive = false;

  let timer = null;

  function render(index) {
    current = index;
    const showingPhone = index === browserSlides.length;
    browserStage.classList.toggle('is-active', !showingPhone);
    phoneStage.classList.toggle('is-active', showingPhone);
    browserSlides.forEach((slide, i) => slide.classList.toggle('is-active', !showingPhone && i === index));
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === index);
      dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });

    // Restart the phone's scroll-pan from the top each time it becomes the
    // active slide, so it never resumes mid-scroll from wherever it happened
    // to be paused while showing a different slide.
    if (showingPhone && !phoneWasActive && phoneContent) {
      phoneContent.style.animation = 'none';
      void phoneContent.offsetHeight;
      phoneContent.style.animation = '';
    }
    phoneWasActive = showingPhone;
  }

  function stopAuto() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  function startAuto() {
    stopAuto();
    if (reduceMotion) return;
    timer = setInterval(() => render((current + 1) % total), AUTO_MS);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      render(i);
      startAuto();
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      render((current - 1 + total) % total);
      startAuto();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      render((current + 1) % total);
      startAuto();
    });
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) startAuto();
          else stopAuto();
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(showcase);
  } else {
    startAuto();
  }
});

// Shared desktop-mockup showcase (Recall Management, Label Management, ...):
// same dot/arrow-driven carousel pattern as the Brand Management showcase
// above, but simpler — a single browser-mockup frame cross-fading through
// its slides, with no browser/phone dichotomy to manage.
document.querySelectorAll('.cs-mockup-showcase').forEach((showcase) => {
  const slides = Array.from(showcase.querySelectorAll('.cs-browser-slide'));
  const dotsWrap = showcase.querySelector('.cs-brand-dots');
  const dots = dotsWrap ? Array.from(dotsWrap.querySelectorAll('.cs-brand-dot')) : [];
  const prevBtn = showcase.querySelector('.cs-brand-arrow-prev');
  const nextBtn = showcase.querySelector('.cs-brand-arrow-next');
  if (!slides.length || !dots.length) return;

  const AUTO_MS = 3500;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0;
  let timer = null;

  function render(index) {
    current = index;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === index);
      dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });
  }

  function stopAuto() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  function startAuto() {
    stopAuto();
    if (reduceMotion) return;
    timer = setInterval(() => render((current + 1) % slides.length), AUTO_MS);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      render(i);
      startAuto();
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      render((current - 1 + slides.length) % slides.length);
      startAuto();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      render((current + 1) % slides.length);
      startAuto();
    });
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) startAuto();
          else stopAuto();
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(showcase);
  } else {
    startAuto();
  }
});

// Image reveal thumbnails: click opens the full-size image in a lightbox.
const lightbox = document.querySelector('.cs-lightbox');

if (lightbox) {
  const lightboxImg = lightbox.querySelector('img');
  const lightboxCaption = lightbox.querySelector('.cs-lightbox-caption');
  const closeBtn = lightbox.querySelector('.cs-lightbox-close');
  let lastFocused = null;

  const openLightbox = (trigger) => {
    const img = trigger.querySelector('img');
    const caption = trigger.querySelector('.cs-image-reveal-text');
    const isLarge = !!trigger.closest('.cs-image-reveal-lg');
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption ? caption.textContent : '';
    lastFocused = trigger;
    lightbox.classList.toggle('cs-lightbox-lg', isLarge);
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

  const openGallery = (trigger) => {
    lastFocused = trigger;
    lightbox.classList.remove('cs-lightbox-lg');
    lightbox.classList.add('cs-lightbox--gallery');
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    lightbox.classList.remove('cs-lightbox--gallery');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  };

  document.querySelectorAll('.cs-image-reveal-trigger:not(.cs-benchmark-pile)').forEach((trigger) => {
    trigger.addEventListener('click', () => openLightbox(trigger));
  });

  document.querySelectorAll('.cs-benchmark-pile').forEach((pile) => {
    pile.addEventListener('click', () => openGallery(pile));
  });

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
  });
}

// Copy email address
const copyBtn = document.getElementById('copyEmail');

if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    const email = copyBtn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      const original = copyBtn.textContent;
      copyBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyBtn.textContent = original;
      }, 1800);
    } catch (err) {
      window.prompt('Copy this email address:', email);
    }
  });
}

// Illustration cards: "Read more" pins the reveal open (independent of hover)
document.querySelectorAll('.cs-illustration-toggle').forEach((toggle) => {
  const card = toggle.closest('.cs-illustration-card');
  toggle.addEventListener('click', () => {
    const expanded = card.classList.toggle('is-expanded');
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.textContent = expanded ? 'Show less' : 'Read more';
  });
});

// Problem cards: "Read more" pins the reveal open (independent of hover)
document.querySelectorAll('.cs-card-toggle').forEach((toggle) => {
  const card = toggle.closest('.cs-card');
  toggle.addEventListener('click', () => {
    const expanded = card.classList.toggle('is-expanded');
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.textContent = expanded ? 'Show less' : 'Read more';
  });
});

// Feature cards: "Read more" pins the reveal open (independent of hover)
document.querySelectorAll('.cs-feature-toggle').forEach((toggle) => {
  const card = toggle.closest('.cs-feature-card');
  toggle.addEventListener('click', () => {
    const expanded = card.classList.toggle('is-expanded');
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.textContent = expanded ? 'Show less' : 'Read more';
  });
});

