/* 住商不動產 承德京站店 — 物件資料與渲染
   ※ real: true 的物件為本店實際銷售物件（有專屬介紹頁 href）。 */

var SAMPLE_LISTINGS = [
  /* ---- 精選在售物件（真實委託） ---- */
  { type: 'buy', real: true, href: 'yangsheng.html',
    title: '揚昇君苑 高樓河景美三房', area: '松山區', address: '台北市松山區松河街168號',
    size: '85.52坪', layout: '3房2廳3衛', price: 10800, priceUnit: '萬', tag: '河景第一排',
    img: 'img/揚升/S__15515765_0.jpg', lat: 25.0516, lng: 121.5734 },
  { type: 'buy', real: true, href: 'jingqi.html',
    title: '台北晶麒 西門龍山寺捷運宅', area: '萬華區', address: '台北市萬華區康定路',
    size: '依戶別而定', layout: '1~3房', price: 1395, priceUnit: '萬起', tag: '近西門捷運',
    img: 'img/晶麒/1-1.png', lat: 25.0388, lng: 121.5040 },
  { type: 'buy', real: true, href: 'jingzhan.html',
    title: '京站酒店式公寓 六鐵共構稀有案件', area: '大同區', address: '台北市大同區市民大道一段209號',
    size: '依戶別而定', layout: '1~3房', price: null, priceUnit: '', tag: '六鐵共構',
    img: 'img/京站酒店式公寓/378727_0.jpg', lat: 25.0501, lng: 121.5171 }
];

var HOUSE_SVG = '<svg viewBox="0 0 24 24" fill="#fff"><path d="M12 3 2 12h3v8h5v-6h4v6h5v-8h3z"/></svg>';

function listingCardHTML(item) {
  var thumb;
  if (item.img) {
    thumb = '<div class="thumb photo" style="background-image:url(\'' + item.img + '\')">' +
      '<span class="tag">' + item.tag + '</span>' +
      (item.real ? '<span class="tag featured">精選物件</span>' : '') +
      '</div>';
  } else {
    thumb = '<div class="thumb ' + item.thumb + '">' +
      '<span class="tag">' + item.tag + '</span>' +
      '<span class="tag sample">示意範例</span>' +
      HOUSE_SVG +
      '</div>';
  }
  var inner = thumb +
    '<div class="body">' +
      '<h3>' + (item.real ? '' : '【範例】') + item.title + '</h3>' +
      '<div class="meta">' + item.address + '｜' + item.size + '｜' + item.layout + '</div>' +
      '<div class="price">' + (item.price ? (item.price.toLocaleString('zh-TW') + '<small> ' + item.priceUnit + '</small>') : '<small>價格請洽業務</small>') + '</div>' +
    '</div>';
  if (item.href) {
    return '<a class="card" href="' + item.href + '">' + inner + '</a>';
  }
  return '<div class="card">' + inner + '</div>';
}

/* 渲染物件卡片。options: { type, area, q, limit } */
function renderListings(grid, options) {
  options = options || {};
  var list = SAMPLE_LISTINGS.filter(function (item) {
    if (options.type && item.type !== options.type) return false;
    if (options.area && options.area !== '不限' && item.area !== options.area) return false;
    if (options.q) {
      var q = options.q.trim();
      if (q && (item.title + item.address + item.tag).indexOf(q) === -1) return false;
    }
    return true;
  });
  if (options.limit) list = list.slice(0, options.limit);

  if (list.length === 0) {
    grid.innerHTML = '<p style="grid-column:1/-1; text-align:center; color:#888; padding:30px 0;">' +
      '目前沒有符合條件的物件，歡迎<a href="contact.html">聯絡我們</a>，由經紀人為您尋找。</p>';
    return;
  }
  grid.innerHTML = list.map(listingCardHTML).join('');
}

/* 物件列表頁初始化（buy.html / rent.html） */
function initListingPage(type) {
  var grid = document.getElementById('listing-grid');
  if (!grid) return;

  var params = new URLSearchParams(window.location.search);
  var areaSel = document.getElementById('f-area');
  var qInput = document.getElementById('f-q');

  if (params.get('area')) areaSel.value = params.get('area');
  if (params.get('q')) qInput.value = params.get('q');

  function apply() {
    renderListings(grid, { type: type, area: areaSel.value, q: qInput.value });
  }
  document.getElementById('f-go').addEventListener('click', apply);
  qInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') apply(); });
  areaSel.addEventListener('change', apply);
  apply();
}
