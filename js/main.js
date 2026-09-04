// Anjos no Caminho — interações do site

document.addEventListener('DOMContentLoaded', function () {
  // Menu mobile
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
      });
    });
  }

  // Cartões de eventos "Saiba mais"
  document.querySelectorAll('.event-more').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var detail = btn.closest('.event-body').querySelector('.event-detail');
      var isOpen = detail.classList.toggle('open');
      btn.classList.toggle('open', isOpen);
      btn.querySelector('span').textContent = isOpen ? 'Ver menos' : 'Saiba mais';
    });
  });

  // Cartões de oração "Ler oração"
  document.querySelectorAll('.prayer-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var full = btn.closest('.prayer-card').querySelector('.prayer-full');
      var isOpen = full.classList.toggle('open');
      btn.querySelector('span').textContent = isOpen ? 'Fechar oração' : 'Ler oração';
    });
  });

  // Filtro da página Fotos
  var filterButtons = document.querySelectorAll('.filter-btn');
  var filterableItems = document.querySelectorAll('.photo-item');

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.dataset.filter;

      filterableItems.forEach(function (item) {
        var show = filter === 'todos' || item.dataset.group === filter;
        item.style.display = show ? '' : 'none';
      });
    });
  });

  // ---------- Galeria / lightbox com navegação ----------
  var lightbox = document.querySelector('.lightbox');

  if (lightbox) {
    var lightboxBox = lightbox.querySelector('.lightbox-box');
    var lightboxImg = lightbox.querySelector('.lightbox-box img');
    var counterEl = lightbox.querySelector('.lightbox-counter');
    var prevBtn = lightbox.querySelector('.lightbox-prev');
    var nextBtn = lightbox.querySelector('.lightbox-next');
    var currentItems = [];
    var currentIndex = 0;

    function collectGroup(groupKey) {
      var selector = groupKey
        ? '.gallery-photo[data-group="' + groupKey + '"]'
        : '.gallery-photo';
      return Array.prototype.slice.call(document.querySelectorAll(selector));
    }

    function render() {
      var el = currentItems[currentIndex];
      if (!el) return;

      // Mostra o "carregando" até a foto terminar de baixar
      lightboxBox.classList.remove('loaded');
      lightboxImg.classList.remove('loaded');

      lightboxImg.onload = function () {
        lightboxBox.classList.add('loaded');
        lightboxImg.classList.add('loaded');
      };
      lightboxImg.onerror = function () {
        lightboxBox.classList.add('loaded');
      };

      lightboxImg.src = el.dataset.full;
      lightboxImg.alt = el.dataset.alt || '';

      // Se a imagem já estiver no cache do navegador, o "onload" pode não disparar de novo
      if (lightboxImg.complete && lightboxImg.naturalWidth > 0) {
        lightboxBox.classList.add('loaded');
        lightboxImg.classList.add('loaded');
      }

      if (counterEl) {
        counterEl.textContent = (currentIndex + 1) + ' / ' + currentItems.length;
        counterEl.style.display = currentItems.length > 1 ? '' : 'none';
      }
      var showNav = currentItems.length > 1;
      if (prevBtn) prevBtn.style.display = showNav ? '' : 'none';
      if (nextBtn) nextBtn.style.display = showNav ? '' : 'none';
    }

    function openGallery(items, index) {
      if (!items.length) return;
      currentItems = items;
      currentIndex = index;
      render();
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeGallery() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    function step(delta) {
      if (!currentItems.length) return;
      currentIndex = (currentIndex + delta + currentItems.length) % currentItems.length;
      render();
    }

    // Clique em qualquer miniatura abre a galeria do respectivo grupo (mês)
    document.querySelectorAll('.gallery-photo').forEach(function (el) {
      el.addEventListener('click', function () {
        var group = el.dataset.group || '';
        var items = collectGroup(group);
        var index = items.indexOf(el);
        openGallery(items, index < 0 ? 0 : index);
      });
    });

    // Botões "Ver mais momentos" abrem a galeria completa do mês, do início
    document.querySelectorAll('[data-gallery]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var items = collectGroup(btn.dataset.gallery);
        openGallery(items, 0);
      });
    });

    if (prevBtn) prevBtn.addEventListener('click', function () { step(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { step(1); });

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.closest('.lightbox-close')) {
        closeGallery();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    });
  }

  // Formulário de contato (front-end apenas — sem envio real ainda)
  var contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = document.querySelector('.form-note-status');
      if (msg) {
        msg.textContent = 'Formulário pronto no visual. Falta apenas ligar o envio a um e-mail ou serviço (explico como no CONTEUDO-PARA-EDITAR.md).';
        msg.style.display = 'block';
      }
    });
  }

  // Marca o link do menu correspondente à página atual
  var current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === current) {
      link.classList.add('active');
    }
  });
});
