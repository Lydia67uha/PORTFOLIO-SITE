const pageName = document.body.dataset.page;

document.querySelectorAll('[data-page-link]').forEach((link) => {
  link.classList.toggle('active', link.dataset.pageLink === pageName);
});

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

/* Popups projets */
const modalButtons = document.querySelectorAll('[data-modal-open]');
const modalCloseButtons = document.querySelectorAll('[data-modal-close]');
const modals = document.querySelectorAll('.modal');

modalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modalId = button.dataset.modalOpen;
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('active');
    document.body.classList.add('modal-open');
  });
});

modalCloseButtons.forEach((button) => {
  button.addEventListener('click', () => {
    button.closest('.modal').classList.remove('active');
    document.body.classList.remove('modal-open');
  });
});

modals.forEach((modal) => {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.remove('active');
      document.body.classList.remove('modal-open');
    }
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  modals.forEach((modal) => modal.classList.remove('active'));
  document.body.classList.remove('modal-open');
});
