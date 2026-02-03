/**
 * SULYN 프리뷰 - 바닐라 JavaScript
 * 헤더 스크롤, 모바일 메뉴, 부드러운 앵커 이동
 */
(function () {
  'use strict';

  var header = document.getElementById('header');
  var menuToggle = document.getElementById('menuToggle');
  var mobileNav = document.getElementById('mobileNav');
  var navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  // ----- 1. 헤더 스크롤 시 스타일 변경 -----
  function updateHeaderOnScroll() {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', function () {
    requestAnimationFrame(updateHeaderOnScroll);
  });
  updateHeaderOnScroll();

  // ----- 2. 모바일 메뉴 열기/닫기 -----
  function openMobileNav() {
    if (!mobileNav || !menuToggle) return;
    mobileNav.classList.add('is-open');
    menuToggle.classList.add('active');
    menuToggle.setAttribute('aria-label', '메뉴 닫기');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (!mobileNav || !menuToggle) return;
    mobileNav.classList.remove('is-open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-label', '메뉴 열기');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function toggleMobileNav() {
    if (mobileNav.classList.contains('is-open')) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileNav);
  }

  // ----- 3. 앵커 클릭 시 부드럽게 이동 + 모바일 메뉴 닫기 -----
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        var id = href.slice(1);
        var target = document.getElementById(id);
        if (target) {
          e.preventDefault();
          closeMobileNav();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // ----- 4. ESC 키로 모바일 메뉴 닫기 -----
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('is-open')) {
      closeMobileNav();
    }
  });

  // ----- 5. 이미지 로드 실패 시 플레이스홀더만 표시 (깨진 아이콘 방지) -----
  var sectionImages = document.querySelectorAll('.hero-image img, .philosophy-image img, .preview-visual img');
  sectionImages.forEach(function (img) {
    img.addEventListener('error', function () {
      this.style.display = 'none';
    });
  });

  // ----- 6. Origin 편지 스크롤 등장 애니메이션 (스크롤 시 뷰포트 진입 시 트리거) -----
  var originLetter = document.getElementById('originLetter');
  function setupLetterObserver() {
    if (!originLetter || !('IntersectionObserver' in window)) {
      if (originLetter) originLetter.classList.add('is-visible');
      return;
    }
    var letterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          if (el.classList.contains('is-visible')) return;
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              el.classList.add('is-visible');
            });
          });
        });
      },
      { root: null, rootMargin: '0px', threshold: 0 }
    );
    letterObserver.observe(originLetter);
  }
  if (document.readyState === 'complete') {
    setTimeout(setupLetterObserver, 100);
  } else {
    window.addEventListener('load', function () {
      setTimeout(setupLetterObserver, 100);
    });
  }

  // ----- 7. 마루부리(.font-display) 내 영문만 자간 넓게: 영문 구간을 span으로 감쌈 -----
  (function wrapLatinSpacing() {
    var latinRegex = /[a-zA-Z\s.,'!?-]+/g;
    var displayElements = document.querySelectorAll('.font-display');
    displayElements.forEach(function (el) {
      var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
      var textNodes = [];
      var n;
      while ((n = walker.nextNode())) textNodes.push(n);
      textNodes.forEach(function (node) {
        if (node.parentElement.closest('.font-display') !== el) return;
        var text = node.textContent;
        if (!latinRegex.test(text)) return;
        latinRegex.lastIndex = 0;
        var parts = text.split(/([a-zA-Z\s.,'!?-]+)/);
        if (parts.length <= 1) return;
        var fragment = document.createDocumentFragment();
        parts.forEach(function (part) {
          if (/[a-zA-Z\s.,'!?-]/.test(part)) {
            var span = document.createElement('span');
            span.className = 'latin-spacing';
            span.textContent = part;
            fragment.appendChild(span);
          } else {
            fragment.appendChild(document.createTextNode(part));
          }
        });
        node.parentNode.replaceChild(fragment, node);
      });
    });
  })();
})();
