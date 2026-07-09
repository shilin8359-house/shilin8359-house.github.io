/* 住商不動產 承德京站店 — 共用腳本 */

/* ---------- 手機版選單 ---------- */
function initNav() {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('nav.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }
}

/* ---------- 廣告輪播 ---------- */
function initAdCarousel() {
  var carousel = document.querySelector('.ad-carousel');
  if (!carousel) return;

  var slides = carousel.querySelectorAll('.ad-slide');
  var dotsWrap = carousel.querySelector('.ad-dots');
  var current = 0;
  var timer = null;

  slides.forEach(function (_, i) {
    var b = document.createElement('button');
    b.setAttribute('aria-label', '廣告 ' + (i + 1));
    b.addEventListener('click', function () { show(i); restart(); });
    dotsWrap.appendChild(b);
  });

  var dots = dotsWrap.querySelectorAll('button');

  function show(i) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = i;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function next() { show((current + 1) % slides.length); }
  function restart() {
    clearInterval(timer);
    timer = setInterval(next, 5000);
  }

  show(0);
  restart();
}

/* ---------- 首頁快速搜尋（導向總公司搜尋系統） ---------- */
var SEARCH_URLS = {
  buy: 'https://www.hbhousing.com.tw/buyhouse',
  rent: 'https://www.hbhousing.com.tw/renthouse',
  deal: 'https://www.hbhousing.com.tw/dealsearch'
};

function initQuickSearch() {
  var box = document.querySelector('.searchbox');
  if (!box) return;

  var tabs = box.querySelectorAll('.tabs button');
  var mode = 'buy';

  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) { x.classList.remove('active'); });
      t.classList.add('active');
      mode = t.getAttribute('data-mode');
    });
  });

  var btn = box.querySelector('.btn-search');
  btn.addEventListener('click', function () {
    window.open(SEARCH_URLS[mode] || SEARCH_URLS.buy, '_blank');
  });
}

/* ---------- 聯絡表單（組成 mailto 寄至店 Email） ---------- */
var STORE_EMAIL = 'shilin8359@gmail.com';

function initContactForm() {
  var form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = form.querySelector('[name="name"]').value.trim();
    var phone = form.querySelector('[name="phone"]').value.trim();
    var email = form.querySelector('[name="email"]').value.trim();
    var topic = form.querySelector('[name="topic"]').value;
    var message = form.querySelector('[name="message"]').value.trim();

    if (!name || !phone || !message) {
      alert('請填寫姓名、聯絡電話與詢問內容。');
      return;
    }

    var subject = '【網站來信】' + topic + ' - ' + name;
    var body =
      '姓名：' + name + '\n' +
      '電話：' + phone + '\n' +
      'Email：' + (email || '未提供') + '\n' +
      '詢問類別：' + topic + '\n' +
      '----------------------------\n' +
      message + '\n';

    window.location.href = 'mailto:' + STORE_EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initNav();
  initAdCarousel();
  initQuickSearch();
  initContactForm();
});
