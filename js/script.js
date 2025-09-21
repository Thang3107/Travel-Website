// ========== Reviews Carousel ==========
let slides = document.querySelectorAll('.slide');
let current = 0;
function showSlide(idx) {
  slides.forEach(s => s.classList.remove('active'));
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

// ========== Tours Filter (tours.html) ==========
document.addEventListener('DOMContentLoaded', () => {
  let filters = document.querySelectorAll('.filter-bar select');
  let grid = document.querySelector('.tour-grid');
  if (!grid) return;
  filters.forEach(sel => sel.addEventListener('change', () => {
    let vals = Array.from(filters).map(f => f.value);
    grid.querySelectorAll('.tour-card').forEach(card => {
      let match = vals.every((v,i) => v === 'all' || card.dataset[filters[i].name] === v);
      card.style.display = match ? 'block' : 'none';
    });
  }));
});
