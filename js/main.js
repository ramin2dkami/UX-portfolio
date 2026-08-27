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
        ticking = false;
      });
    },
    { passive: true }
  );

  updateActiveLink();
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
