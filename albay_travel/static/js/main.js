/* ============================================================
   ALBAY TRAVEL - Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const contactLinks = Array.from(document.querySelectorAll('a[href="contact.html"]'));
  let contactModal = null;
  let previousActiveElement = null;
  const whatsappNumber = '355686033460';

  const getContactModal = () => {
    if (contactModal) return contactModal;

    const wrapper = document.createElement('div');
    wrapper.className = 'contact-modal';
    wrapper.setAttribute('aria-hidden', 'true');
    wrapper.innerHTML = `
      <div class="contact-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
        <button class="contact-modal__close" type="button" aria-label="Close contact details">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
        <h2 id="contact-modal-title" class="sr-only">Contact details</h2>
        <div class="contact-modal__content">
          <div class="contact-modal__item">
            <div class="contact-modal__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div>
              <span class="contact-modal__label">Phone / Whatsapp</span>
              <div class="contact-modal__value"><a href="https://wa.me/355686033460" target="_blank" rel="noopener noreferrer">+355 68 603 3460</a></div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(wrapper);
    contactModal = wrapper;
    return contactModal;
  };

  const closeContactModal = () => {
    if (!contactModal) return;
    contactModal.classList.remove('is-open');
    contactModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');

    if (previousActiveElement instanceof HTMLElement) {
      previousActiveElement.focus();
    }
  };

  const openContactModal = (trigger) => {
    const modal = getContactModal();
    previousActiveElement = trigger instanceof HTMLElement ? trigger : document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    modal.querySelector('.contact-modal__close')?.focus();
  };

  const createFloatingWhatsapp = () => {
    if (document.querySelector('.floating-whatsapp')) return;

    const link = document.createElement('a');
    link.className = 'floating-whatsapp';
    link.href = `https://wa.me/${whatsappNumber}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', 'Chat with us on WhatsApp');
    link.innerHTML = `
      <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M19.11 17.36c-.27-.14-1.58-.78-1.82-.87-.24-.09-.42-.14-.59.14-.17.27-.68.87-.83 1.05-.15.18-.3.2-.56.07-.27-.14-1.12-.41-2.13-1.31-.79-.7-1.32-1.57-1.47-1.83-.15-.27-.02-.41.11-.55.12-.12.27-.3.41-.45.14-.15.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.59-1.42-.81-1.94-.21-.5-.43-.43-.59-.44h-.5c-.18 0-.48.07-.73.34-.24.27-.93.91-.93 2.23s.95 2.59 1.08 2.77c.14.18 1.86 2.84 4.51 3.98.63.27 1.12.43 1.5.54.63.2 1.2.17 1.65.1.5-.07 1.58-.65 1.8-1.28.23-.63.23-1.17.16-1.28-.07-.11-.24-.18-.51-.32Z"/>
        <path d="M16.02 3.2c-7.05 0-12.78 5.72-12.78 12.76 0 2.25.59 4.45 1.7 6.39L3.14 28.8l6.63-1.74a12.8 12.8 0 0 0 6.25 1.61h.01c7.04 0 12.77-5.73 12.77-12.77A12.74 12.74 0 0 0 16.02 3.2Zm0 23.29h-.01a10.64 10.64 0 0 1-5.42-1.48l-.39-.23-3.93 1.03 1.05-3.83-.25-.4a10.56 10.56 0 0 1-1.62-5.65c0-5.84 4.75-10.59 10.59-10.59 2.83 0 5.48 1.1 7.48 3.1a10.5 10.5 0 0 1 3.1 7.48c0 5.84-4.75 10.58-10.6 10.58Z"/>
      </svg>
    `;

    document.body.appendChild(link);
  };

  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.navbar__hamburger');
  const mobileNav = document.querySelector('.navbar__mobile');

  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('.navbar__link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  contactLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        link.hasAttribute('download') ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      event.preventDefault();
      openContactModal(link);
    });
  });

  document.addEventListener('click', (event) => {
    if (!contactModal?.classList.contains('is-open')) return;

    if (event.target.closest('.contact-modal__close')) {
      closeContactModal();
      return;
    }

    if (event.target === contactModal) {
      closeContactModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && contactModal?.classList.contains('is-open')) {
      closeContactModal();
    }
  });

  createFloatingWhatsapp();

  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__link, .navbar__mobile .navbar__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  const heroBg = document.querySelector('.hero__bg');
  if (heroBg) {
    setTimeout(() => heroBg.classList.add('loaded'), 100);
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroBg.style.transform = `translateY(${y * 0.3}px) scale(1)`;
    }, { passive: true });
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      const duration = 1800;
      const start = performance.now();
      const animate = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(animate);
        else el.textContent = target + suffix;
      };
      requestAnimationFrame(animate);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  const track = document.querySelector('.testimonials__track');
  const dots = document.querySelectorAll('.testimonials__dot');
  let current = 0;
  let autoSlide;

  const goTo = (idx) => {
    const cards = track?.querySelectorAll('.testimonial-card');
    const total = Math.ceil((cards?.length || 3) / 3);
    current = (idx + total) % total;

    if (track) {
      const cardWidth = track.querySelector('.testimonial-card')?.offsetWidth || 0;
      const gap = 28;
      track.style.transform = `translateX(-${current * (cardWidth + gap) * (window.innerWidth > 640 ? 3 : 1)}px)`;
    }

    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  };

  dots.forEach((dot, i) => dot.addEventListener('click', () => {
    clearInterval(autoSlide);
    goTo(i);
    startAuto();
  }));

  const startAuto = () => {
    autoSlide = setInterval(() => goTo(current + 1), 5000);
  };

  if (track) {
    goTo(0);
    startAuto();
  }

  const filterBtns = document.querySelectorAll('.filter-btn');
  const tourCards = document.querySelectorAll('.tour-card[data-category]');

  const applyTourFilter = (cat) => {
    filterBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === cat);
    });

    tourCards.forEach(card => {
      const categories = (card.dataset.category || '').split(' ');
      const match = cat === 'all' || categories.includes(cat);
      card.style.display = match ? '' : 'none';
      if (match) {
        card.style.animation = 'fadeUp 0.4s ease both';
        setTimeout(() => {
          card.style.animation = '';
        }, 400);
      }
    });
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.filter || 'all';
      applyTourFilter(cat);
    });
  });

  if (filterBtns.length && tourCards.length) {
    const params = new URLSearchParams(window.location.search);
    const requestedFilter = params.get('filter');
    const validFilters = new Set(['all', ...Array.from(filterBtns, btn => btn.dataset.filter).filter(Boolean)]);
    applyTourFilter(validFilters.has(requestedFilter) ? requestedFilter : 'all');
  }

  const galleries = document.querySelectorAll('.tour-gallery');
  galleries.forEach(gallery => {
    const thumbs = Array.from(gallery.querySelectorAll('.tour-gallery__thumb'));
    const mainImg = gallery.querySelector('.tour-gallery__main img');
    const prevBtn = gallery.querySelector('.tour-gallery__nav--prev');
    const nextBtn = gallery.querySelector('.tour-gallery__nav--next');
    const prevThumbBtn = gallery.querySelector('.tour-gallery__thumb-nav--prev');
    const nextThumbBtn = gallery.querySelector('.tour-gallery__thumb-nav--next');
    const visibleThumbs = Number(gallery.dataset.visibleThumbs || 4);
    let currentIndex = thumbs.findIndex(thumb => thumb.classList.contains('active'));
    let thumbStart = 0;

    if (currentIndex < 0) currentIndex = 0;

    const updateMainImage = () => {
      const activeThumb = thumbs[currentIndex];
      const activeThumbImg = activeThumb?.querySelector('img');
      if (!mainImg || !activeThumbImg) return;
      mainImg.style.opacity = '0';
      setTimeout(() => {
        mainImg.src = activeThumbImg.src;
        mainImg.alt = activeThumbImg.alt;
        mainImg.style.opacity = '1';
      }, 180);
      mainImg.style.transition = 'opacity 0.2s';
    };

    const updateThumbWindow = () => {
      thumbs.forEach((thumb, index) => {
        const isVisible = index >= thumbStart && index < thumbStart + visibleThumbs;
        thumb.classList.toggle('is-hidden', !isVisible);
        thumb.classList.toggle('active', index === currentIndex);
      });
    };

    const syncGallery = () => {
      if (currentIndex < thumbStart) thumbStart = currentIndex;
      if (currentIndex >= thumbStart + visibleThumbs) thumbStart = currentIndex - visibleThumbs + 1;
      thumbStart = Math.max(0, Math.min(thumbStart, Math.max(0, thumbs.length - visibleThumbs)));
      updateMainImage();
      updateThumbWindow();
    };

    thumbs.forEach((thumb, index) => {
      thumb.addEventListener('click', () => {
        currentIndex = index;
        syncGallery();
      });
    });

    prevBtn?.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + thumbs.length) % thumbs.length;
      syncGallery();
    });

    nextBtn?.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % thumbs.length;
      syncGallery();
    });

    prevThumbBtn?.addEventListener('click', () => {
      if (thumbStart > 0) {
        thumbStart -= 1;
        updateThumbWindow();
      }
    });

    nextThumbBtn?.addEventListener('click', () => {
      if (thumbStart < thumbs.length - visibleThumbs) {
        thumbStart += 1;
        updateThumbWindow();
      }
    });

    syncGallery();
  });

  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      const submitter = e.submitter;
      const submitMode = submitter?.dataset.submitMode || 'whatsapp';

      contactForm.querySelectorAll('.form-error').forEach(el => el.classList.remove('show'));
      contactForm.querySelectorAll('.form-input').forEach(el => el.classList.remove('error'));

      const name = contactForm.querySelector('#name');
      const phone = contactForm.querySelector('#phone');
      const email = contactForm.querySelector('#email');
      const subject = contactForm.querySelector('#subject');
      const message = contactForm.querySelector('#message');
      const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name?.value.trim()) {
        showError(name, 'Please enter your full name.');
        valid = false;
      }

      if (!phone?.value.trim()) {
        showError(phone, 'Please enter a phone number.');
        valid = false;
      }

      if (!email?.value.trim() || !emailRx.test(email.value)) {
        showError(email, 'Please enter a valid email address.');
        valid = false;
      }

      if (subject && !subject.value.trim()) {
        showError(subject, 'Please enter a subject.');
        valid = false;
      }

      if (!message?.value.trim() || message.value.trim().length < 20) {
        showError(message, 'Message must be at least 20 characters.');
        valid = false;
      }

      if (valid) {
        const whatsappNumber = contactForm.dataset.whatsapp || '';
        const targetEmail = contactForm.dataset.email || '';
        const subjectText = subject?.value.trim();
        const composedMessage = [
          'New inquiry from ALBAY TRAVEL website',
          '',
          `Name: ${name.value.trim()}`,
          `Phone: ${phone.value.trim()}`,
          `Email: ${email.value.trim()}`,
          `Interest: ${subjectText}`,
          '',
          'Message:',
          message.value.trim()
        ].join('\n');

        if (submitMode === 'email' && targetEmail) {
          const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(`New inquiry - ${subjectText}`)}&body=${encodeURIComponent(composedMessage)}`;
          window.location.href = mailtoUrl;
        } else if (whatsappNumber) {
          const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(composedMessage)}`;
          window.location.href = whatsappUrl;
        }

        const success = document.querySelector('.form-success');
        if (success) {
          success.classList.add('show');
          setTimeout(() => success.classList.remove('show'), 5000);
        }
      }
    });
  }

  function showError(input, msg) {
    if (!input) return;
    input.classList.add('error');
    const err = input.closest('.form-group')?.querySelector('.form-error');
    if (err) {
      err.textContent = msg;
      err.classList.add('show');
    }
  }

  const bookingForm = document.querySelector('#booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = bookingForm.querySelector('[type="submit"]');
      btn.textContent = 'Processing...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Request Sent!';
        btn.style.background = '#4fa058';
        setTimeout(() => {
          btn.textContent = 'Book This Tour';
          btn.disabled = false;
          btn.style.background = '';
        }, 3000);
      }, 1400);
    });
  }

  const bookingForms = document.querySelectorAll('.booking-form');
  bookingForms.forEach(form => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const dateInput = form.querySelector('input[type="date"]');
      const guestsInput = form.querySelector('select');
      const tourName = form.dataset.tour || document.querySelector('.page-hero__title')?.textContent?.trim() || 'Tour booking';
      const selectedDate = dateInput?.value || '';
      const guests = guestsInput?.value || '';

      if (!selectedDate) {
        dateInput?.focus();
        return;
      }

      const formattedDate = new Date(`${selectedDate}T00:00:00`).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });

      const message = [
        'New booking request from ALBAY TRAVEL website',
        '',
        `Tour: ${tourName}`,
        `Preferred date: ${formattedDate}`,
        `Guests: ${guests}`
      ].join('\n');

      window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    });
  });

  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (navbar && y > 200) {
      navbar.style.transform = y > lastY ? 'translateY(-100%)' : 'translateY(0)';
    } else if (navbar) {
      navbar.style.transform = 'translateY(0)';
    }
    lastY = y;
  }, { passive: true });
});
