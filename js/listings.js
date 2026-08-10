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
    img: 'img/京站酒店式公寓/378727_0.jpg', lat: 25.0501, lng: 121.5171 },

  /* ---- 比房網店鋪同步物件（連結回比房網詳情頁） ---- */
  { type: 'buy', real: true, href: 'https://www.ibigfun.com/pages/house/0986292489/f95f15a1-087f-11f1-8a2b-0a84bab091bd',
    title: '永田町-日新國小', area: '大同區', address: '台北市大同區太原路',
    size: '47.22坪', layout: '2房1廳1衛', price: 5350, priceUnit: '萬', tag: '近中山站',
    img: 'https://cdn.ibigfun.com/house/img/3307375/698e855e263c0.png', lat: 25.0550747, lng: 121.5163854 },
  { type: 'buy', real: true, href: 'https://www.ibigfun.com/pages/house/0986292489/fd16238e-0879-11f1-8a2b-0a84bab091bd',
    title: '士林捷運口-獨棟透天', area: '士林區', address: '台北市士林區中正路',
    size: '64.1坪', layout: '開放空間', price: 22000, priceUnit: '萬', tag: '近士林站',
    img: 'https://cdn.ibigfun.com/house/img/3307095/698e7ef7e7a72.jpg', lat: 25.095372, lng: 121.5257027 },
  { type: 'buy', real: true, href: 'https://www.ibigfun.com/pages/house/0986292489/89d271fc-07e2-11f1-8a2b-0a84bab091bd',
    title: '南西商圈３+１房', area: '大同區', address: '台北市大同區太原路',
    size: '74.31坪', layout: '3房', price: 8588, priceUnit: '萬', tag: '近中山站',
    img: 'https://cdn.ibigfun.com/house/img/3306730/698d7e45380ae.png', lat: 25.0550747, lng: 121.5163854 },
  { type: 'buy', real: true, href: 'https://www.ibigfun.com/pages/house/0986292489/1c4d1f51-07df-11f1-8a2b-0a84bab091bd',
    title: '貴族大廈捷運高樓', area: '大同區', address: '台北市大同區承德路一段',
    size: '23.11坪', layout: '開放空間', price: 2300, priceUnit: '萬', tag: '近中山站',
    img: 'https://cdn.ibigfun.com/house/img/3306636/698e80e10465e.jpeg', lat: 25.0528455, lng: 121.5178032 },
  { type: 'buy', real: true, href: 'https://www.ibigfun.com/pages/house/0986292489/09fe2f2d-0715-11f1-8a2b-0a84bab091bd',
    title: '西門捷運. 二房雙衛', area: '萬華區', address: '台北市萬華區漢中街',
    size: '33.66坪', layout: '2房2廳2衛', price: 3770, priceUnit: '萬', tag: '近西門站',
    img: 'https://cdn.ibigfun.com/house/img/3305826/698c25ebd777f.png', lat: 25.0435275, lng: 121.5072112 },
  { type: 'buy', real: true, href: 'https://www.ibigfun.com/pages/house/0986292489/316bbf89-e692-11ee-99c0-0a84bab091bd',
    title: '台北之星', area: '大安區', address: '台北市大安區忠孝東路三段',
    size: '180坪', layout: '開放空間', price: 33200, priceUnit: '萬', tag: '近忠孝復興站',
    img: 'https://cdn.ibigfun.com/house/img/2452274/65fd1c33bc9a2.png', lat: 25.0417673, lng: 121.5381808 },
  { type: 'buy', real: true, href: 'https://www.ibigfun.com/pages/house/0986292489/0cf22177-908b-11f1-8158-0a84bab091bd',
    title: '京站~最有質感的貴族空間', area: '大同區', address: '台北市大同區市民大道一段',
    size: '30.4坪', layout: '1房2廳1衛', price: 1528, priceUnit: '萬', tag: '近台北車站',
    img: 'https://img.hbhousing.com.tw/pictures/A748%2fA748WS83465a.jpg?1786301867', lat: 25.0489171, lng: 121.517822 },
  { type: 'buy', real: true, href: 'https://www.ibigfun.com/pages/house/0986292489/ebae7704-8d3c-11f1-b7b8-0a84bab091bd',
    title: '京站花園成家兩房', area: '大同區', address: '台北市大同區市民大道一段',
    size: '27.97坪', layout: '2房2廳1衛', price: 1358, priceUnit: '萬', tag: '近台北車站',
    img: 'https://img.hbhousing.com.tw/pictures/A748%2fA748WS83262a.jpg?1786301866', lat: 25.0489702, lng: 121.517831 },
  { type: 'buy', real: true, href: 'https://www.ibigfun.com/pages/house/0986292489/138a24b0-87bc-11f1-a7b7-0a84bab091bd',
    title: '都廳大院二房車', area: '三重區', address: '新北市三重區重新路五段',
    size: '27.4坪', layout: '2房1廳1衛', price: 1850, priceUnit: '萬', tag: '近先嗇宮站',
    img: 'https://img.hbhousing.com.tw/pictures/A748%2fA748WS82531a.jpg?1786315535', lat: 25.045961, lng: 121.471622 },
  { type: 'buy', real: true, href: 'https://www.ibigfun.com/pages/house/0986292489/e9fb5ab9-5d66-11f1-be8e-0a84bab091bd',
    title: '當代１號院２房(預售屋)', area: '大同區', address: '台北市大同區重慶北路三段',
    size: '24.77坪', layout: '2房2廳1衛', price: 2758, priceUnit: '萬', tag: '預售新案',
    img: 'https://img.hbhousing.com.tw/pictures/A748%2fA748WS49925a.jpg?1786301890', lat: 25.0696594, lng: 121.5135373 },
  { type: 'buy', real: true, href: 'https://www.ibigfun.com/pages/house/0986292489/e9cf2553-5d66-11f1-be8e-0a84bab091bd',
    title: '內湖捷運△店面', area: '內湖區', address: '台北市內湖區內湖路二段',
    size: '89.99坪', layout: '2房2廳1衛', price: 5988, priceUnit: '萬', tag: '近內湖站',
    img: 'https://img.hbhousing.com.tw/pictures/A748%2fA748WS56923a.jpg?1786302591', lat: 25.0841239, lng: 121.5928546 },
  { type: 'buy', real: true, href: 'https://www.ibigfun.com/pages/house/0986292489/e9c36826-5d66-11f1-be8e-0a84bab091bd',
    title: '北醫低公設電梯', area: '信義區', address: '台北市信義區莊敬路',
    size: '55.57坪', layout: '5房2廳2衛', price: 5980, priceUnit: '萬', tag: '近台北101/世貿站',
    img: 'https://img.hbhousing.com.tw/pictures/A748%2fA748WS56954a.jpg?1786302383', lat: 25.0291436, lng: 121.5627644 },
  { type: 'buy', real: true, href: 'https://www.ibigfun.com/pages/house/0986292489/e93a332a-5d66-11f1-be8e-0a84bab091bd',
    title: '中正杭州豪邸景觀頂樓', area: '中正區', address: '台北市中正區杭州南路一段',
    size: '106.18坪', layout: '5房2廳3衛', price: 11800, priceUnit: '萬', tag: '近善導寺站',
    img: 'https://img.hbhousing.com.tw/pictures/A748%2fA748WS67307a.jpg?1786301821', lat: 25.0417336, lng: 121.5262996 },
  { type: 'buy', real: true, href: 'https://www.ibigfun.com/pages/house/0986292489/e8e0f652-5d66-11f1-be8e-0a84bab091bd',
    title: '富享京王景觀名邸', area: '大同區', address: '台北市大同區承德路一段',
    size: '83.04坪', layout: '3房2廳4衛', price: 9980, priceUnit: '萬', tag: '近台北車站',
    img: 'https://img.hbhousing.com.tw/pictures/A748%2fA748WS70939a.jpg?1786301899', lat: 25.0506152, lng: 121.5172145 },
  { type: 'buy', real: true, href: 'https://www.ibigfun.com/pages/house/0986292489/e8bf2c96-5d66-11f1-be8e-0a84bab091bd',
    title: '大直艾菲爾商辦', area: '中山區', address: '台北市中山區敬業一路',
    size: '116.68坪', layout: '開放空間', price: 11370, priceUnit: '萬', tag: '近劍南路站',
    img: 'https://img.hbhousing.com.tw/pictures/A748%2fA748WS71615a.jpg?1786302017', lat: 25.08327, lng: 121.5528935 },
  { type: 'buy', real: true, href: 'https://www.ibigfun.com/pages/house/0986292489/e829d337-5d66-11f1-be8e-0a84bab091bd',
    title: '條通商圈1+2樓店面', area: '中山區', address: '台北市中山區南京東路一段',
    size: '40.48坪', layout: '1衛', price: 4980, priceUnit: '萬', tag: '條通商圈',
    img: 'https://img.hbhousing.com.tw/pictures/A748%2fA748WS76507a.jpg?1786302084', lat: 25.0509958, lng: 121.5269649 }
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
    var external = /^https?:\/\//.test(item.href);
    var attrs = external ? ' target="_blank" rel="noopener"' : '';
    return '<a class="card" href="' + item.href + '"' + attrs + '>' + inner + '</a>';
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
