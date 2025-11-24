// app.js
// 1) Navegación por cards (secciones principales)
// 2) Tabs por semanas en Cronograma
// 3) Acordeones por actividad

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.cards-menu__item');
  const sections = document.querySelectorAll('.content-section');

  // -------- 1. Cards del menú principal --------
  if (cards.length && sections.length) {
    function showSection(targetId) {
      sections.forEach(section => {
        if (section.id === targetId) {
          section.classList.add('is-active');
        } else {
          section.classList.remove('is-active');
        }
      });

      cards.forEach(card => {
        const cardTarget = card.getAttribute('data-target');
        if (cardTarget === targetId) {
          card.classList.add('is-active');
        } else {
          card.classList.remove('is-active');
        }
      });

      const firstActive = document.querySelector('.content-section.is-active');
      if (firstActive) {
        const offsetTop = firstActive.getBoundingClientRect().top + window.scrollY - 16;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }

    cards.forEach(card => {
      card.addEventListener('click', () => {
        const targetId = card.getAttribute('data-target');
        if (targetId) showSection(targetId);
      });
    });

    const initialCard = document.querySelector('.cards-menu__item.is-active');
    const initialTarget = initialCard ? initialCard.getAttribute('data-target') : null;
    if (initialTarget) {
      showSection(initialTarget);
    }
  }

  // -------- 2. Tabs de semanas en Cronograma --------
  const weekTabs = document.querySelectorAll('.schedule-tab');
  const weekPanels = document.querySelectorAll('.week-panel');

  if (weekTabs.length && weekPanels.length) {
    function activateWeek(week) {
      weekTabs.forEach(tab => {
        const tWeek = tab.getAttribute('data-week');
        tab.classList.toggle('is-active', tWeek === week);
      });

      weekPanels.forEach(panel => {
        const pWeek = panel.getAttribute('data-week-panel');
        panel.classList.toggle('is-active', pWeek === week);
      });
    }

    weekTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const week = tab.getAttribute('data-week');
        if (week) activateWeek(week);
      });
    });

    // Semana 1 por defecto
    activateWeek('1');
  }

  // -------- 3. Acordeones por actividad --------
  const activityToggles = document.querySelectorAll('.activity-toggle');

  activityToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const content = toggle.nextElementSibling;
      if (!content) return;

      const isOpen = toggle.classList.contains('is-open');
      if (isOpen) {
        toggle.classList.remove('is-open');
        content.classList.remove('is-open');
        content.style.maxHeight = null;
      } else {
        toggle.classList.add('is-open');
        content.classList.add('is-open');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
});
