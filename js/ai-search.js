/* 住商不動產 承德京站店 — AI 智慧尋屋助理
   於瀏覽器端解析使用者的自然語言需求（區域／預算／房數／關鍵字），
   即時比對站內物件（SAMPLE_LISTINGS，定義於 listings.js）。 */

(function () {
  'use strict';

  var AREAS = ['松山', '大同', '中山', '中正', '士林'];
  var KEYWORDS = ['捷運', '店面', '套房', '車位', '電梯', '學區', '景觀', '河景', '裝潢', '辦公'];

  var CN_NUM = { '一': 1, '兩': 2, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8, '九': 9 };

  /* ---------- 條件解析 ---------- */
  function parseQuery(text) {
    var cond = { mode: null, area: null, budget: null, rooms: null, keywords: [] };

    if (/租|出租|租屋|租房/.test(text)) cond.mode = 'rent';
    if (/買|購|售|銷售/.test(text)) cond.mode = 'buy';

    AREAS.forEach(function (a) {
      if (text.indexOf(a) !== -1) cond.area = a + '區';
    });

    /* 預算：例「2000萬以內」「2千萬」「兩千萬」「3萬/月」「25000元」
       由大單位往小單位嘗試，避免「2千萬」被誤判成 2 千元 */
    var m;
    if ((m = text.match(/([0-9]+(?:\.[0-9]+)?)\s*千萬/))) {
      cond.budget = { value: parseFloat(m[1]) * 1000, unit: '萬' };
    } else if ((m = text.match(/([一兩二三四五六七八九])千萬/))) {
      cond.budget = { value: CN_NUM[m[1]] * 1000, unit: '萬' };
    } else if ((m = text.match(/([0-9]+(?:\.[0-9]+)?)\s*億/))) {
      cond.budget = { value: parseFloat(m[1]) * 10000, unit: '萬' };
    } else if ((m = text.match(/([0-9]+(?:\.[0-9]+)?)\s*萬/))) {
      cond.budget = { value: parseFloat(m[1]), unit: '萬' };
    } else if ((m = text.match(/([0-9]+(?:\.[0-9]+)?)\s*千/))) {
      cond.budget = { value: parseFloat(m[1]) * 1000, unit: '元' };
    } else if ((m = text.match(/([0-9]+(?:\.[0-9]+)?)\s*元/))) {
      cond.budget = { value: parseFloat(m[1]), unit: '元' };
    } else if ((m = text.match(/([0-9]{3,})/))) {
      var n = parseFloat(m[1]);
      cond.budget = { value: n, unit: n >= 5000 ? '元' : '萬' };
    }

    /* 房數：三房 / 3房 / 兩房 */
    var r = text.match(/([一兩二三四五1-5])\s*房/);
    if (r) cond.rooms = CN_NUM[r[1]] || parseInt(r[1], 10);

    KEYWORDS.forEach(function (k) {
      if (text.indexOf(k) !== -1) cond.keywords.push(k);
    });
    if (/京站|台北車站|北車/.test(text)) cond.keywords.push('京站');

    /* 是否有解析到任何具體條件（用於引導回覆） */
    cond.recognized = !!(cond.mode || cond.area || cond.budget ||
      cond.rooms || cond.keywords.length);

    /* 若預算單位可判斷模式：元/月 → 租 */
    if (!cond.mode && cond.budget) {
      cond.mode = cond.budget.unit === '元' ? 'rent' : 'buy';
    }
    if (!cond.mode && cond.keywords.indexOf('套房') !== -1) cond.mode = 'rent';
    if (!cond.mode) cond.mode = 'buy';

    /* 租屋預算若寫「3萬」→ 換算成元 */
    if (cond.mode === 'rent' && cond.budget && cond.budget.unit === '萬') {
      cond.budget = { value: cond.budget.value * 10000, unit: '元' };
    }
    return cond;
  }

  /* ---------- 物件比對與計分 ---------- */
  function matchListings(cond) {
    var list = SAMPLE_LISTINGS.filter(function (item) {
      return item.type === cond.mode;
    });

    var scored = list.map(function (item) {
      var score = 0;
      var text = item.title + item.address + item.tag + item.layout;

      if (cond.area) {
        if (item.area === cond.area) score += 3;
        else return null; /* 指定區域則嚴格過濾 */
      }
      if (cond.budget && item.price > cond.budget.value) return null;
      if (cond.rooms) {
        if (item.layout.indexOf(cond.rooms + '房') !== -1) score += 3;
        else score -= 1;
      }
      cond.keywords.forEach(function (k) {
        if (k === '京站') {
          if (/京站|台北車站|承德/.test(text)) score += 2;
        } else if (text.indexOf(k) !== -1) {
          score += 2;
        }
      });
      if (cond.budget) score += 1;
      return { item: item, score: score };
    }).filter(function (s) { return s && s.score >= 0; });

    scored.sort(function (a, b) { return b.score - a.score; });
    return scored.map(function (s) { return s.item; });
  }

  /* ---------- 回覆文字 ---------- */
  function describeCond(cond) {
    var parts = [];
    parts.push(cond.mode === 'rent' ? '租屋' : '買屋');
    if (cond.area) parts.push(cond.area);
    if (cond.budget) {
      parts.push('預算 ' + cond.budget.value.toLocaleString('zh-TW') +
        (cond.mode === 'rent' ? ' 元/月內' : ' 萬內'));
    }
    if (cond.rooms) parts.push(cond.rooms + ' 房');
    if (cond.keywords.length) parts.push(cond.keywords.join('、'));
    return parts.join('｜');
  }

  /* ---------- DOM ---------- */
  var log, input;

  function el(tag, cls, html) {
    var d = document.createElement(tag);
    if (cls) d.className = cls;
    if (html !== undefined) d.innerHTML = html;
    return d;
  }

  function scrollLog() { log.scrollTop = log.scrollHeight; }

  function addMsg(cls, html) {
    var m = el('div', 'ai-msg ' + cls, html);
    log.appendChild(m);
    scrollLog();
    return m;
  }

  function addTyping() {
    var t = el('div', 'ai-msg bot typing', '<i></i><i></i><i></i>');
    log.appendChild(t);
    scrollLog();
    return t;
  }

  function escapeHTML(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function resultCardHTML(item) {
    var href = item.href || ((item.type === 'rent' ? 'rent.html' : 'buy.html') +
      '?area=' + encodeURIComponent(item.area));
    var badge = item.real
      ? '<span class="r-sample" style="color:#5ee8ae; border-color:rgba(0,214,156,.6);">精選物件</span>'
      : '<span class="r-sample">示意範例</span>';
    return '<a class="ai-result" href="' + href + '">' +
      '<div class="r-title">' + item.title + badge + '</div>' +
      '<div class="r-meta">' + item.area + '｜' + item.size + '｜' + item.layout + '</div>' +
      '<div class="r-price">' + item.price.toLocaleString('zh-TW') +
      '<small> ' + item.priceUnit + '</small></div>' +
      '</a>';
  }

  function respond(text) {
    var typing = addTyping();
    setTimeout(function () {
      typing.remove();

      var cond = parseQuery(text);

      if (!cond.recognized) {
        addMsg('bot', '想更精準幫你找房，可以告訴我<strong>區域、預算、房數</strong>或' +
          '<strong>關鍵字</strong>（捷運、車位、河景…），例如：' +
          '「<em>松山區 河景 三房</em>」。');
        return;
      }

      var results = matchListings(cond);

      addMsg('bot',
        '我理解的條件是：<strong>' + describeCond(cond) + '</strong>' +
        (results.length
          ? '，為你找到 <strong>' + results.length + '</strong> 筆符合的物件 👇'
          : '。'));

      if (results.length) {
        var wrap = el('div', 'ai-results',
          results.slice(0, 4).map(resultCardHTML).join(''));
        log.appendChild(wrap);
        var more = cond.mode === 'rent' ? 'rent.html' : 'buy.html';
        addMsg('bot', '想看完整列表可以到' +
          '<a href="' + more + '" style="color:#4ef0b6; font-weight:700;">' +
          (cond.mode === 'rent' ? '租屋頁' : '買屋頁') + '</a>，' +
          '或直接來電 <strong>0911-107-769</strong>，由在地經紀人為你服務！');
      } else {
        addMsg('bot', '目前站上沒有完全符合的物件，' +
          '但我們的經紀人手上物件更多！歡迎<a href="contact.html" style="color:#4ef0b6; font-weight:700;">留下需求</a>' +
          '或來電 <strong>0911-107-769</strong>，讓專人為你配對。');
      }
      scrollLog();
    }, 700 + Math.random() * 400);
  }

  function send(text) {
    text = text.trim();
    if (!text) return;
    addMsg('user', escapeHTML(text));
    input.value = '';
    respond(text);
  }

  function init() {
    var panel = document.getElementById('ai-search');
    if (!panel || typeof SAMPLE_LISTINGS === 'undefined') return;

    log = document.getElementById('ai-log');
    input = document.getElementById('ai-input');
    var sendBtn = document.getElementById('ai-send');
    var chips = document.getElementById('ai-chips');

    sendBtn.addEventListener('click', function () { send(input.value); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') send(input.value);
    });
    chips.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () { send(b.textContent); });
    });

    /* 開場訊息 */
    setTimeout(function () {
      addMsg('bot', '你好！我是承德京站店的 <strong>AI 尋屋助理</strong> 🤖<br>' +
        '用一句話描述需求，例如「<em>松山區 河景三房</em>」，我立刻為你比對站內物件。');
    }, 400);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
