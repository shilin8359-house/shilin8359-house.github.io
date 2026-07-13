/* 住商不動產 承德京站店 — 物件資料與渲染
   ※ real: true 的物件為本店實際銷售物件（有專屬介紹頁 href）；
     其餘為網站示意範例（非實際銷售/出租物件）。 */

var SAMPLE_LISTINGS = [
  /* ---- 精選在售物件（真實委託） ---- */
  { type: 'buy', real: true, href: 'yangsheng.html',
    title: '揚昇君苑 高樓河景美三房', area: '松山區', address: '台北市松山區松河街168號',
    size: '85.52坪', layout: '3房2廳3衛', price: 10800, priceUnit: '萬', tag: '河景第一排',
    img: 'img/揚升/S__15515759.jpg', lat: 25.0516, lng: 121.5734 },

  /* ---- 買屋範例 ---- */
  { type: 'buy', title: '京站商圈 高樓景觀三房', area: '大同區', address: '台北市大同區承德路一段', size: '34.5坪', layout: '3房2廳2衛', price: 2980, priceUnit: '萬', tag: '電梯大樓', thumb: 'thumb-a', lat: 25.0498, lng: 121.5170 },
  { type: 'buy', title: '台北車站 溫馨兩房', area: '中正區', address: '台北市中正區市民大道一段', size: '22.1坪', layout: '2房2廳1衛', price: 1880, priceUnit: '萬', tag: '捷運宅', thumb: 'thumb-b', lat: 25.0468, lng: 121.5140 },
  { type: 'buy', title: '承德路 金店面', area: '大同區', address: '台北市大同區承德路一段', size: '28.7坪', layout: '臨路寬店面', price: 4500, priceUnit: '萬', tag: '店面', thumb: 'thumb-c', lat: 25.0530, lng: 121.5165 },
  { type: 'buy', title: '中山雙連 精緻套房', area: '中山區', address: '台北市中山區民生西路', size: '12.3坪', layout: '1房1廳1衛', price: 980, priceUnit: '萬', tag: '小資首選', thumb: 'thumb-d', lat: 25.0578, lng: 121.5205 },
  { type: 'buy', title: '大稻埕 電梯華廈三房', area: '大同區', address: '台北市大同區迪化街一段', size: '31.2坪', layout: '3房2廳2衛', price: 2380, priceUnit: '萬', tag: '電梯華廈', thumb: 'thumb-e', lat: 25.0555, lng: 121.5100 },
  { type: 'buy', title: '中山國小站 兩房含車位', area: '中山區', address: '台北市中山區新生北路二段', size: '25.8坪', layout: '2房2廳1衛', price: 2150, priceUnit: '萬', tag: '含車位', thumb: 'thumb-f', lat: 25.0605, lng: 121.5265 },

  /* ---- 租屋範例 ---- */
  { type: 'rent', title: '京站旁 全新裝潢套房', area: '大同區', address: '台北市大同區承德路一段', size: '8.5坪', layout: '獨立套房', price: 18000, priceUnit: '元/月', tag: '拎包入住', thumb: 'thumb-b', lat: 25.0505, lng: 121.5182 },
  { type: 'rent', title: '雙連捷運 兩房家庭房', area: '中山區', address: '台北市中山區民生西路', size: '20.3坪', layout: '2房1廳1衛', price: 32000, priceUnit: '元/月', tag: '近捷運', thumb: 'thumb-c', lat: 25.0585, lng: 121.5195 },
  { type: 'rent', title: '大同大學旁 學生套房', area: '大同區', address: '台北市大同區中山北路三段', size: '7.2坪', layout: '獨立套房', price: 13500, priceUnit: '元/月', tag: '學區', thumb: 'thumb-d', lat: 25.0640, lng: 121.5225 },
  { type: 'rent', title: '承德路 辦公店面出租', area: '大同區', address: '台北市大同區承德路二段', size: '45坪', layout: '辦公/店面', price: 88000, priceUnit: '元/月', tag: '店面', thumb: 'thumb-a', lat: 25.0570, lng: 121.5155 }
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
      '<div class="price">' + item.price.toLocaleString('zh-TW') + '<small> ' + item.priceUnit + '</small></div>' +
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
      '目前沒有符合條件的範例物件，歡迎<a href="contact.html">聯絡我們</a>，由經紀人為您尋找。</p>';
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
