// ==============================================
// 1. Reviews Carousel
// ==============================================
let slides = document.querySelectorAll('.slide');
let current = 0;

function showSlide(idx) {
  slides.forEach(s => {
    s.classList.remove('active');
  });
  slides[idx].classList.add('active');
}

function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}

if (slides.length) {
  showSlide(0);
  setInterval(nextSlide, 5000);
}

// ==============================================
// 2. Tours Filter (tours.html)
// ==============================================
document.addEventListener('DOMContentLoaded', () => {
  let filters = document.querySelectorAll('.filter-bar select');
  let grid = document.querySelector('.tour-grid');
  if (grid) {
    filters.forEach(sel => {
      sel.addEventListener('change', () => {
        let values = Array.from(filters).map(f => f.value);
        grid.querySelectorAll('.tour-card').forEach(card => {
          let match = values.every((v, i) => {
            return v === 'all' || card.dataset[filters[i].name] === v;
          });
          card.style.display = match ? 'block' : 'none';
        });
      });
    });
  }
});

// ==============================================
// 3. Scroll-reveal (fade-in sections)
// ==============================================
const faders = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

faders.forEach(el => observer.observe(el));

// ==============================================
// 4. Button Ripple Effect
// ==============================================
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('pointerdown', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - 50;
    const y = e.clientY - rect.top - 50;
    btn.style.setProperty('--ripple-x', `${x}px`);
    btn.style.setProperty('--ripple-y', `${y}px`);
  });
});

// ==============================================
// 5. Mobile Hamburger Toggle
// ==============================================
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}


window.addEventListener("load", () => {
  if (!location.hash) return;
  const el = document.querySelector(location.hash);
  if (!el) return;
  const offset = parseInt(getComputedStyle(document.documentElement)
                   .getPropertyValue("--header-height")) 
               + parseInt(getComputedStyle(document.documentElement)
                   .getPropertyValue("--header-gap"));
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.pageYOffset - offset,
    behavior: "smooth"
  });
});


// Hàm cuộn đến element dựa trên hash, cộng offset header + gap
function scrollToHashTarget() {
  const { hash } = location;
  if (!hash) return;

  const el = document.querySelector(hash);
  if (!el) return;

  // Lấy CSS var header-height và header-gap
  const rootStyles = getComputedStyle(document.documentElement);
  const headerHeight = parseInt(rootStyles.getPropertyValue("--header-height"));
  const headerGap    = parseInt(rootStyles.getPropertyValue("--header-gap"));
  const offset = headerHeight + headerGap;

  // Tính vị trí scroll và cuộn mượt
  const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

// Chạy khi load trang có hash (như tour-detail.html#tour-cuchi)
window.addEventListener("load", scrollToHashTarget);

// Chạy khi hash trong URL thay đổi (khi click link nội bộ)
window.addEventListener("hashchange", scrollToHashTarget);
