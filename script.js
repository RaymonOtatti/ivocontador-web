/* ==========================================================================
   ivocontador // ESTUDIO CONTABLE & ASESORÍA FISCAL
   Interactive Engine & Realtime Features (Inspired by Old Tom Capital)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initNavbar();
  initIndexCoverParallax();
  initCalendarFilters();
  initDiagnosticTool();
  initPracticeToggles();
  initSmoothScroll();
  initBackToTop();

  // Instant anchor/param jump support
  const targetId = window.location.hash.substring(1) || new URLSearchParams(window.location.search).get('scroll');
  if (targetId) {
    const el = document.getElementById(targetId);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'instant', block: 'start' });
        const coverSection = document.getElementById('hero');
        if (coverSection && window.scrollY > 300) {
          coverSection.style.visibility = 'hidden';
        }
      }, 50);
    }
  }
});

/* --------------------------------------------------------------------------
   1. CUSTOM ORANGE SQUARE CURSOR (OTC EDITORIAL STYLE)
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  const cursor = document.getElementById('customCursor');
  if (!cursor) return;

  // Don't run on touch-only devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = -100;
  let mouseY = -100;
  let cursorX = -100;
  let cursorY = -100;
  let isVisible = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isVisible) {
      isVisible = true;
      cursor.classList.add('is-active');
    }
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    cursor.classList.remove('is-active');
    isVisible = false;
  });

  window.addEventListener('mouseenter', () => {
    cursor.classList.add('is-active');
    isVisible = true;
  });

  window.addEventListener('mousedown', () => {
    cursor.classList.add('is-down');
  });

  window.addEventListener('mouseup', () => {
    cursor.classList.remove('is-down');
  });

  // Snappy, silky follow loop (0.75 lerp for crisp, immediate feel)
  function renderCursor() {
    cursorX += (mouseX - cursorX) * 0.75;
    cursorY += (mouseY - cursorY) * 0.75;
    cursor.style.left = `${cursorX.toFixed(1)}px`;
    cursor.style.top = `${cursorY.toFixed(1)}px`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Expansion on hoverable interactive elements
  const hoverSelector = 'a, button, input, select, textarea, label, [role="button"], .practice-card, .cal-filter-btn, .radio-pill';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverSelector)) {
      cursor.classList.add('is-hovering');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverSelector)) {
      cursor.classList.remove('is-hovering');
    }
  });
}

/* --------------------------------------------------------------------------
   2. NAVBAR SCROLL INTERACTION & MOBILE DRAWER
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbarMain');
  const burgerBtn = document.getElementById('burgerBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerLinks = document.querySelectorAll('.mobile-nav-item');

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 80) {
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
      navbar.style.backgroundColor = 'rgba(239, 237, 231, 0.98)';
    } else {
      navbar.style.boxShadow = 'none';
      navbar.style.backgroundColor = 'rgba(239, 237, 231, 0.92)';
    }
    lastScroll = currentScroll;
  });

  // Mobile Drawer Toggle
  if (burgerBtn && mobileDrawer) {
    burgerBtn.addEventListener('click', () => {
      mobileDrawer.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeDrawerBtn && mobileDrawer) {
    closeDrawerBtn.addEventListener('click', () => {
      mobileDrawer.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });
}

/* --------------------------------------------------------------------------
   3. ARGENTINA FISCAL CALENDAR FILTER
   -------------------------------------------------------------------------- */
function initCalendarFilters() {
  const filterBtns = document.querySelectorAll('.cal-filter-btn');
  const rows = document.querySelectorAll('.calendar-row, .calendar-mobile-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => {
        if (b.getAttribute('data-filter') === filter) {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });

      rows.forEach(row => {
        const cat = row.getAttribute('data-cat');
        if (filter === 'all' || cat === filter) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. INTERACTIVE TAX DIAGNOSTIC CALCULATOR (SIMULADOR FISCAL)
   -------------------------------------------------------------------------- */
function initDiagnosticTool() {
  const formDesktop = document.getElementById('taxDiagnosticForm');
  const formMobile = document.getElementById('taxDiagnosticFormMobile');

  const resultTitleDesktop = document.getElementById('diagResultTitle');
  const resultDescDesktop = document.getElementById('diagResultDesc');
  const whatsappBtnDesktop = document.getElementById('diagWhatsappBtn');

  const resultTitleMobile = document.getElementById('diagResultTitleMobile');
  const resultDescMobile = document.getElementById('diagResultDescMobile');
  const whatsappBtnMobile = document.getElementById('diagWhatsappBtnMobile');

  const profiles = {
    monotributo: {
      title: "Régimen Simplificado (Monotributo)",
      desc: "Ideal para profesionales y comerciantes con facturación individual. Es clave monitorear topes de facturación, gastos con tarjeta y compatibilidad en caso de relación de dependencia simultánea para evitar exclusiones de oficio de ARCA.",
      ctaMessage: "Hola Ivo! Hice el test en tu web. Soy Monotributista y busco asesoramiento para categorización / gestión impositiva."
    },
    dependencia_plus: {
      title: "Relación de Dependencia + Actividad Independiente",
      desc: "Excelente noticia: podés tener ambos en blanco. Al tener tus aportes jubilatorios y obra social cubiertos por tu empleo formal, en el Monotributo abonás únicamente el componente impositivo, optimizando notablemente tu costo mensual.",
      ctaMessage: "Hola Ivo! Trabajo en relación de dependencia y tengo un emprendimiento/ingresos extra. Quiero estructurar mi facturación correctamente."
    },
    inscripto: {
      title: "Responsable Inscripto (Régimen General)",
      desc: "Requiere liquidación mensual de IVA, retenciones, Libro de Sueldos Digital (si tenés nómina), y presentaciones anuales de Ganancias y Bienes Personales. Una planificación anticipada de compras y deducciones reduce drásticamente el impacto fiscal.",
      ctaMessage: "Hola Ivo! Soy Responsable Inscripto y necesito una gestión contable e impositiva integral de IVA, Ganancias y DDJJ."
    },
    sociedad: {
      title: "Sociedad Comercial (SRL / SAS / SA)",
      desc: "Estructura societaria completa. Comprende confección de estados contables anuales, auditoría, libros societarios digitales, ajuste por inflación impositivo, retenciones bancarias (SIRCREB) y distribución eficiente de dividendos.",
      ctaMessage: "Hola Ivo! Tenemos una PyME / Sociedad comercial y precisamos auditoría, balances y planificación fiscal periódica."
    },
    exportador: {
      title: "Exportador de Servicios / Freelancer Tech / USD",
      desc: "Encuadre de Factura E de exportación ante ARCA, cumplimiento del régimen cambiario del BCRA para ingreso en moneda extranjera, y evaluación de sinergias con estructuras internacionales (LLC en EE.UU.) para cobros globales.",
      ctaMessage: "Hola Ivo! Exporto servicios al exterior (tech / diseño / consultoría) y quiero ordenar mi facturación en USD y encuadre impositivo."
    }
  };

  function updateDiagnostic(selectedProfile, selectedGoal) {
    const data = profiles[selectedProfile] || profiles.monotributo;
    const textEncoded = encodeURIComponent(`${data.ctaMessage} (Objetivo seleccionado: ${selectedGoal.toUpperCase()})`);
    const waUrl = `https://wa.me/?text=${textEncoded}`;

    // Update Desktop elements
    if (resultTitleDesktop) resultTitleDesktop.textContent = data.title;
    if (resultDescDesktop) resultDescDesktop.textContent = data.desc;
    if (whatsappBtnDesktop) whatsappBtnDesktop.href = waUrl;

    // Update Mobile elements
    if (resultTitleMobile) resultTitleMobile.textContent = data.title;
    if (resultDescMobile) resultDescMobile.textContent = data.desc;
    if (whatsappBtnMobile) whatsappBtnMobile.href = waUrl;
  }

  // Desktop form listener
  if (formDesktop) {
    formDesktop.querySelectorAll('input').forEach(input => {
      input.addEventListener('change', () => {
        const p = formDesktop.querySelector('input[name="profile"]:checked')?.value || 'monotributo';
        const g = formDesktop.querySelector('input[name="goal"]:checked')?.value || 'alta';
        updateDiagnostic(p, g);
      });
    });
  }

  // Mobile form listener
  if (formMobile) {
    formMobile.querySelectorAll('input').forEach(input => {
      input.addEventListener('change', () => {
        const p = formMobile.querySelector('input[name="profile_m"]:checked')?.value || 'monotributo';
        const g = formMobile.querySelector('input[name="goal_m"]:checked')?.value || 'alta';
        updateDiagnostic(p, g);
      });
    });
  }

  // Initial trigger
  updateDiagnostic('monotributo', 'alta');
}

/* --------------------------------------------------------------------------
   5. PRACTICE CARDS TOGGLE (SABER MÁS)
   -------------------------------------------------------------------------- */
function initPracticeToggles() {
  const toggleBtns = document.querySelectorAll('.practice-toggle-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.practice-card');
      if (!card) return;

      const isExpanded = card.classList.contains('is-expanded');
      card.classList.toggle('is-expanded');

      const label = btn.querySelector('.toggle-label');
      if (label) {
        label.textContent = isExpanded ? 'Saber más' : 'Cerrar info';
      }
      btn.setAttribute('aria-expanded', !isExpanded);
    });
  });
}

/* --------------------------------------------------------------------------
   6. SMOOTH SCROLL WITH VERTICAL CENTERING
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  const anchors = document.querySelectorAll('a[href^="#"]');

  function scrollToSection(targetId) {
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;

    if (targetId === '#hero') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      updateActiveNav(targetId);
      return;
    }

    const navbar = document.getElementById('navbarMain');
    const headerHeight = navbar ? navbar.offsetHeight : 72;
    const viewportHeight = window.innerHeight;
    const availableHeight = viewportHeight - headerHeight;

    // Use inner container (.container-firm) for accurate visual centering
    const innerContent = target.querySelector('.container-firm') || target;
    const contentRect = innerContent.getBoundingClientRect();
    const contentTop = contentRect.top + window.pageYOffset;
    const contentHeight = innerContent.offsetHeight;

    let offsetPosition;

    // If the content fits comfortably within the visible viewport,
    // center it right in the middle between navbar and viewport bottom
    if (contentHeight <= availableHeight) {
      const remainingSpace = availableHeight - contentHeight;
      offsetPosition = contentTop - headerHeight - (remainingSpace / 2);
    } else {
      // If content is taller than viewport (e.g. on mobile or very tall sections),
      // position near top under header with comfortable breathing room so titles aren't cut off
      offsetPosition = contentTop - headerHeight - 20;
    }

    const maxScroll = Math.max(0, document.documentElement.scrollHeight - viewportHeight);
    offsetPosition = Math.max(0, Math.min(offsetPosition, maxScroll));

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    updateActiveNav(targetId);
  }

  anchors.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#' || !targetId.startsWith('#')) return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();

        // If mobile drawer is open, close it first and let body unfreeze
        const mobileDrawer = document.getElementById('mobileDrawer');
        if (mobileDrawer && mobileDrawer.classList.contains('is-open')) {
          mobileDrawer.classList.remove('is-open');
          document.body.style.overflow = '';
          setTimeout(() => {
            scrollToSection(targetId);
          }, 80);
        } else {
          scrollToSection(targetId);
        }
      }
    });
  });

  function updateActiveNav(activeId) {
    document.querySelectorAll('.nav-links .nav-item').forEach(link => {
      if (link.getAttribute('href') === activeId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // ScrollSpy to keep current section active in nav as user scrolls
  const sections = document.querySelectorAll('section[id]');
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateActiveNav('#' + entry.target.id);
        }
      });
    }, {
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0
    });

    sections.forEach(sec => observer.observe(sec));
  }
}

/* --------------------------------------------------------------------------
   7. FLOATING BACK TO TOP BUTTON WITH ADAPTIVE COLOR SWAP
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  const targetDarkSections = document.querySelectorAll('.statement-section, .cta-section, .footer-section');

  const updateState = () => {
    const scrollY = window.pageYOffset;

    // Show/hide based on scroll distance
    if (scrollY > 380) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }

    // Dynamic contrast check: If button overlaps with the green statement section
    // (exact same color) or dark sections, switch background to brand orange
    const btnRect = btn.getBoundingClientRect();
    let isOverlapping = false;

    for (let i = 0; i < targetDarkSections.length; i++) {
      const secRect = targetDarkSections[i].getBoundingClientRect();
      const overlapsVertically = (btnRect.bottom >= secRect.top) && (btnRect.top <= secRect.bottom);
      const overlapsHorizontally = (btnRect.right >= secRect.left) && (btnRect.left <= secRect.right);

      if (overlapsVertically && overlapsHorizontally) {
        isOverlapping = true;
        break;
      }
    }

    if (isOverlapping) {
      btn.classList.add('is-orange');
    } else {
      btn.classList.remove('is-orange');
    }
  };

  window.addEventListener('scroll', updateState, { passive: true });
  window.addEventListener('resize', updateState, { passive: true });
  updateState();

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   8. INDEX COVER MULTI-LAYER PARALLAX ENGINE
   -------------------------------------------------------------------------- */
function initIndexCoverParallax() {
  const coverSection = document.getElementById('hero');
  if (!coverSection) return;

  const brandStage = coverSection.querySelector('.index-brand-stage');
  const bottomBar = coverSection.querySelector('.index-cover-bottom');
  const gridLines = coverSection.querySelector('.hero-universe-lines');
  const scrollCue = document.getElementById('indexScrollCue');

  if (scrollCue) {
    scrollCue.addEventListener('click', () => {
      const overview = document.getElementById('overview');
      if (overview) {
        const navbar = document.getElementById('navbarMain');
        const headerHeight = navbar ? navbar.offsetHeight : 72;
        const top = overview.offsetTop - headerHeight;
        window.scrollTo({
          top: Math.max(0, top),
          behavior: 'smooth'
        });
      }
    });
  }

  let ticking = false;

  function updateParallax() {
    const scrolled = window.pageYOffset;
    const coverHeight = coverSection.offsetHeight || window.innerHeight;

    if (scrolled <= coverHeight + 60) {
      if (coverSection.style.visibility === 'hidden') {
        coverSection.style.visibility = 'visible';
      }

      const progress = Math.min(Math.max(scrolled / coverHeight, 0), 1);

      // Kinetic depth: brand stage glides down at ~40% speed and scales gently
      if (brandStage) {
        const translateY = (scrolled * 0.40).toFixed(1);
        const scale = (1 - progress * 0.08).toFixed(3);
        const opacity = Math.max(0, 1 - progress * 0.95).toFixed(3);
        brandStage.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
        brandStage.style.opacity = opacity;
      }

      // Grid lines drift subtly at 15% speed
      if (gridLines) {
        const linesY = (scrolled * 0.15).toFixed(1);
        gridLines.style.transform = `translate3d(0, ${linesY}px, 0)`;
      }

      // Bottom bar / scroll cue fades out in first 25% of scroll
      if (bottomBar) {
        const bOpacity = Math.max(0, 1 - progress * 3.5).toFixed(3);
        const bY = (scrolled * 0.25).toFixed(1);
        bottomBar.style.opacity = bOpacity;
        bottomBar.style.transform = `translate3d(0, ${bY}px, 0)`;
      }
    } else {
      // Put to sleep when entirely concealed behind the curtain
      if (coverSection.style.visibility !== 'hidden') {
        coverSection.style.visibility = 'hidden';
      }
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', updateParallax, { passive: true });
  updateParallax();
}

/* --------------------------------------------------------------------------
   8. SERVICE WORKER REGISTRATION (INSTANT REPEAT LOADS)
   -------------------------------------------------------------------------- */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((err) => {
      console.debug('ServiceWorker registration skipped:', err);
    });
  });
}

