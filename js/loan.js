/* 住商不動產 承德京站店 — 房貸試算 */

(function () {
  var $ = function (id) { return document.getElementById(id); };

  var priceInput = $('house-price');
  var ratioInput = $('loan-ratio');
  var ratioLabel = $('ratio-label');
  var amountInput = $('loan-amount');
  var rateInput = $('loan-rate');
  var yearsSelect = $('loan-years');
  var graceSelect = $('grace-years');
  var btn = $('btn-calc');
  if (!btn) return;

  /* 總價 × 成數 → 貸款金額（雙向連動） */
  function syncAmountFromRatio() {
    var price = parseFloat(priceInput.value) || 0;
    var ratio = parseFloat(ratioInput.value) || 0;
    ratioLabel.textContent = ratio + '%';
    amountInput.value = Math.round(price * ratio) / 100;
  }
  function syncRatioFromAmount() {
    var price = parseFloat(priceInput.value) || 0;
    var amount = parseFloat(amountInput.value) || 0;
    if (price > 0) {
      var ratio = Math.min(100, Math.round(amount / price * 100));
      ratioInput.value = ratio;
      ratioLabel.textContent = ratio + '%';
    }
  }
  priceInput.addEventListener('input', syncAmountFromRatio);
  ratioInput.addEventListener('input', syncAmountFromRatio);
  amountInput.addEventListener('input', syncRatioFromAmount);

  function fmt(n) {
    return Math.round(n).toLocaleString('zh-TW');
  }
  function fmtWan(n) {
    /* n 為元，顯示為「x,xxx 萬」保留一位小數 */
    return (Math.round(n / 1000) / 10).toLocaleString('zh-TW') + ' 萬';
  }

  function calc() {
    var price = (parseFloat(priceInput.value) || 0) * 10000;      // 元
    var principal = (parseFloat(amountInput.value) || 0) * 10000; // 元
    var annualRate = (parseFloat(rateInput.value) || 0) / 100;
    var years = parseInt(yearsSelect.value, 10);
    var graceYears = parseInt(graceSelect.value, 10);
    var method = document.querySelector('input[name="method"]:checked').value;

    if (principal <= 0 || years <= 0) {
      alert('請輸入正確的貸款金額與年限。');
      return;
    }
    if (graceYears >= years) {
      alert('寬限期不可大於或等於貸款年限。');
      return;
    }

    var r = annualRate / 12;                 // 月利率
    var nTotal = years * 12;                 // 總期數
    var nGrace = graceYears * 12;            // 寬限期期數
    var nRepay = nTotal - nGrace;            // 攤還期數

    var balance = principal;
    var totalInterest = 0;
    var rows = [];                           // 每年彙總
    var firstMonthly = 0;                    // 寬限期後首月月付金

    /* 本息平均攤還每月固定月付金 */
    var annuityPay = 0;
    if (method === 'annuity') {
      if (r > 0) {
        var pow = Math.pow(1 + r, nRepay);
        annuityPay = principal * r * pow / (pow - 1);
      } else {
        annuityPay = principal / nRepay;
      }
    }
    var fixedPrincipal = principal / nRepay; // 本金平均攤還每月還本

    var yearInterest = 0, yearPrincipal = 0, yearFirstPay = 0;

    for (var m = 1; m <= nTotal; m++) {
      var interest = balance * r;
      var pay, principalPart;

      if (m <= nGrace) {
        pay = interest;               // 寬限期只繳息
        principalPart = 0;
      } else if (method === 'annuity') {
        pay = annuityPay;
        principalPart = pay - interest;
      } else {
        principalPart = fixedPrincipal;
        pay = principalPart + interest;
      }

      if (m === nGrace + 1) firstMonthly = pay;
      if ((m - 1) % 12 === 0) { yearInterest = 0; yearPrincipal = 0; yearFirstPay = pay; }

      totalInterest += interest;
      yearInterest += interest;
      yearPrincipal += principalPart;
      balance -= principalPart;

      if (m % 12 === 0 || m === nTotal) {
        rows.push({
          year: Math.ceil(m / 12),
          monthly: yearFirstPay,
          interest: yearInterest,
          principal: yearPrincipal,
          balance: Math.max(0, balance)
        });
      }
    }

    /* 摘要 */
    var payLabel = $('pay-label');
    if (nGrace > 0) {
      payLabel.textContent = '寬限期後每月月付金';
    } else {
      payLabel.textContent = method === 'annuity' ? '每月月付金' : '首月月付金';
    }
    $('monthly-pay').innerHTML = fmt(firstMonthly) + ' <small>元</small>';
    $('total-interest').innerHTML = fmtWan(totalInterest);
    $('total-pay').innerHTML = fmtWan(principal + totalInterest);
    $('down-payment').innerHTML = price >= principal ? fmtWan(price - principal) : '—';

    /* 攤還表 */
    var tbody = $('amort-body');
    tbody.innerHTML = '';
    rows.forEach(function (row) {
      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td>第 ' + row.year + ' 年</td>' +
        '<td>' + fmt(row.monthly) + '</td>' +
        '<td>' + fmt(row.interest) + '</td>' +
        '<td>' + fmt(row.principal) + '</td>' +
        '<td>' + fmt(row.balance) + '</td>';
      tbody.appendChild(tr);
    });
  }

  btn.addEventListener('click', calc);
  calc(); /* 頁面載入時以預設值先算一次 */
})();
