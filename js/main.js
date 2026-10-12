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

  // ---------- Fotos por mês (Home: 2 mais recentes; Fotos: todos) ----------
  var meses = (window.MESES_FOTOS || []).slice().sort(function (a, b) {
    return (b.ano * 100 + b.mes) - (a.ano * 100 + a.mes);
  });

  function thumbsHtml(m, classeExtra) {
    var html = '';
    for (var i = 1; i <= m.total; i++) {
      var n = (i < 10 ? '0' : '') + i;
      var alt = 'Peregrinos no Caminho da Fé - ' + m.nome + ' ' + m.ano;
      html += '<button type="button" class="' + (classeExtra || '') + ' photo-thumb gallery-photo" data-group="' + m.id +
        '" data-full="' + m.pasta + '/full/foto-' + n + '.webp" data-alt="' + alt + '">' +
        '<img src="' + m.pasta + '/thumb/foto-' + n + '.webp" alt="' + alt + '" loading="lazy"></button>';
    }
    return html;
  }

  var homeMomentos = document.getElementById('momentos-home');
  if (homeMomentos) {
    homeMomentos.innerHTML = meses.slice(0, 2).map(function (m, idx) {
      return '<section' + (idx % 2 === 1 ? ' class="section-alt"' : '') + '><div class="container">' +
        '<div class="section-head"><h2>Momentos de ' + m.nome + ' ' + m.ano + '</h2><div class="underline"></div></div>' +
        '<div class="photo-grid month-grid">' + thumbsHtml(m) + '</div>' +
        '<div class="center-btn"><button type="button" class="btn btn-navy" data-gallery="' + m.id + '">Ver mais momentos</button></div>' +
        '</div></section>';
    }).join('');
  }

  var fotosGrid = document.getElementById('fotos-grid');
  if (fotosGrid) {
    var bar = document.getElementById('fotos-filtros');
    if (bar) {
      bar.innerHTML = '<button type="button" class="filter-btn active" data-filter="todos">Todos</button>' +
        meses.map(function (m) {
          return '<button type="button" class="filter-btn" data-filter="' + m.id + '">' + m.nome + ' ' + m.ano + '</button>';
        }).join('');
    }
    fotosGrid.innerHTML = meses.map(function (m) { return thumbsHtml(m, 'photo-item'); }).join('');
  }

  // ---------- Orações: "Ler oração" abre um modal com o texto completo ----------
  var prayerButtons = document.querySelectorAll('.prayer-toggle');
  if (prayerButtons.length) {
    var prayerModal = document.createElement('div');
    prayerModal.className = 'prayer-modal';
    prayerModal.setAttribute('role', 'dialog');
    prayerModal.setAttribute('aria-modal', 'true');
    prayerModal.setAttribute('aria-labelledby', 'prayer-modal-title');
    prayerModal.innerHTML = '<div class="prayer-modal-box">' +
      '<button type="button" class="prayer-modal-close" aria-label="Fechar">&times;</button>' +
      '<h3 id="prayer-modal-title"></h3><div class="prayer-modal-text"></div></div>';
    document.body.appendChild(prayerModal);

    var prayerTitle = prayerModal.querySelector('#prayer-modal-title');
    var prayerText = prayerModal.querySelector('.prayer-modal-text');

    function closePrayer() {
      prayerModal.classList.remove('open');
      document.body.style.overflow = '';
    }

    prayerButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var card = btn.closest('.prayer-card');
        prayerTitle.textContent = card.querySelector('h3').textContent;
        prayerText.textContent = card.querySelector('.prayer-full').textContent.trim();
        prayerModal.classList.add('open');
        document.body.style.overflow = 'hidden';
        prayerModal.querySelector('.prayer-modal-close').focus();
      });
    });

    prayerModal.addEventListener('click', function (e) {
      if (e.target === prayerModal || e.target.closest('.prayer-modal-close')) closePrayer();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && prayerModal.classList.contains('open')) closePrayer();
    });
  }

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
        msg.textContent = 'O envio de mensagens será ativado após a contratação da hospedagem. Por enquanto, fale conosco pelo WhatsApp ou e-mail.';
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
