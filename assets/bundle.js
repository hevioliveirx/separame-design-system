/* @ds-bundle: {"format":4,"namespace":"SeparaMe","components":[{"name":"Button"},{"name":"TextField"},{"name":"SpaceSwitcher"},{"name":"SidebarNav"},{"name":"TabBar"},{"name":"KpiCard"},{"name":"Money"},{"name":"StatusBadge"},{"name":"SourceTag"},{"name":"TransactionTable"},{"name":"CashFlowChart"},{"name":"TaxReserveCard"},{"name":"Notice"},{"name":"Toast"},{"name":"ChatBubble"}]} */
(function () {
  var React = window.React;
  var h = React.createElement;
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(' '); }

  // Icones de traco (24x24, traco 2) no estilo Lucide. Substitutos ate a equipe adotar o Lucide no prototipo.
  var ICONS = {
    home: ['M3 10.5 12 3l9 7.5', 'M5 9.5V21h5v-6h4v6h5V9.5'],
    list: ['M8 6h13', 'M8 12h13', 'M8 18h13', 'M3 6h.01', 'M3 12h.01', 'M3 18h.01'],
    calendar: ['M4 6h16v15H4z', 'M4 10h16', 'M8 3v4', 'M16 3v4'],
    chart: ['M4 20V10', 'M10 20V4', 'M16 20v-7', 'M22 20H2'],
    trend: ['M3 17l6-6 4 4 8-8', 'M15 7h6v6'],
    tax: ['M3 21h18', 'M5 21V10', 'M10 21V10', 'M14 21V10', 'M19 21V10', 'M2 10l10-6 10 6z'],
    swap: ['M4 8h14', 'M14 4l4 4-4 4', 'M20 16H6', 'M10 12l-4 4 4 4'],
    chat: ['M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.1A8 8 0 1 1 21 12z'],
    file: ['M14 3H6v18h12V7z', 'M14 3v4h4', 'M9 13h6', 'M9 17h6'],
    upload: ['M12 15V3', 'M7 8l5-5 5 5', 'M4 15v6h16v-6'],
    pencil: ['M4 20h4L19 9l-4-4L4 16z', 'M13 7l4 4'],
    repeat: ['M17 2l4 4-4 4', 'M3 11V9a3 3 0 0 1 3-3h15', 'M7 22l-4-4 4-4', 'M21 13v2a3 3 0 0 1-3 3H3'],
    check: ['M4 12l5 5L20 6'],
    alert: ['M12 3 2 21h20z', 'M12 10v5', 'M12 18h.01'],
    info: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z', 'M12 11v6', 'M12 7h.01'],
    x: ['M6 6l12 12', 'M18 6 6 18'],
    plus: ['M12 5v14', 'M5 12h14'],
    up: ['M12 19V5', 'M6 11l6-6 6 6'],
    down: ['M12 5v14', 'M6 13l6 6 6-6'],
    users: ['M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M2 21a7 7 0 0 1 14 0', 'M17 11a3 3 0 1 0 0-6', 'M22 21a6 6 0 0 0-4-5.6'],
    settings: ['M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M19 12h2', 'M3 12h2', 'M12 3v2', 'M12 19v2', 'M17 7l1.4-1.4', 'M5.6 18.4 7 17', 'M17 17l1.4 1.4', 'M5.6 5.6 7 7'],
    more: ['M5 12h.01', 'M12 12h.01', 'M19 12h.01']
  };
  function Icon(p) {
    var d = ICONS[p.name] || [];
    return h('svg', { className: cx('sm-icon', p.className), width: p.size || 18, height: p.size || 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true', focusable: 'false' },
      d.map(function (x, i) { return h('path', { key: i, d: x }); }));
  }

  var BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  var MINUS = '−';

  // ---------------------------------------------------------------- Money
  function Money(p) {
    var v = Number(p.value || 0);
    var kind = p.kind || (v > 0 ? 'income' : v < 0 ? 'expense' : 'neutral');
    var sign = p.showSign === false ? '' : (kind === 'income' ? '+ ' : kind === 'expense' ? MINUS + ' ' : '');
    return h('span', { className: cx('sm-money', 'sm-money-' + kind, 'sm-money-' + (p.size || 'md'), p.className) },
      p.arrow && (kind === 'income' || kind === 'expense') ? h(Icon, { name: kind === 'income' ? 'up' : 'down', size: p.size === 'xl' ? 22 : 14 }) : null,
      h('span', { className: 'sm-num' }, sign + BRL.format(Math.abs(v))));
  }

  // ---------------------------------------------------------------- Button
  function Button(p) {
    var rest = Object.assign({}, p); ['variant', 'size', 'icon', 'className', 'children'].forEach(function (k) { delete rest[k]; });
    return h('button', Object.assign({ type: 'button' }, rest, { className: cx('sm-btn', 'sm-btn-' + (p.variant || 'secondary'), p.size === 'sm' && 'sm-btn-sm', p.className) }),
      p.icon ? h(Icon, { name: p.icon, size: p.size === 'sm' ? 16 : 18 }) : null, p.children);
  }

  // ---------------------------------------------------------------- TextField
  function TextField(p) {
    var id = p.id || ('f-' + String(p.label || 'campo').toLowerCase().replace(/[^a-z0-9]+/g, '-'));
    var desc = p.error ? id + '-erro' : p.hint ? id + '-dica' : undefined;
    return h('div', { className: cx('sm-field', p.error && 'sm-field-error', p.className) },
      h('label', { className: 'sm-field-label', htmlFor: id }, p.label),
      h('div', { className: 'sm-field-box' },
        p.prefix ? h('span', { className: 'sm-field-prefix' }, p.prefix) : null,
        h('input', { id: id, className: cx('sm-field-input', p.prefix === 'R$' && 'sm-num'), type: p.type || 'text', inputMode: p.inputMode, placeholder: p.placeholder, defaultValue: p.defaultValue, value: p.value, onChange: p.onChange, 'aria-invalid': p.error ? 'true' : undefined, 'aria-describedby': desc })),
      p.error ? h('p', { id: desc, className: 'sm-field-msg sm-field-msg-error' }, h(Icon, { name: 'alert', size: 14 }), p.error)
        : p.hint ? h('p', { id: desc, className: 'sm-field-msg' }, p.hint) : null);
  }

  // ---------------------------------------------------------------- SpaceSwitcher
  function SpaceSwitcher(p) {
    var st = React.useState(p.defaultValue || 'empresa');
    var value = p.value || st[0];
    function pick(v) { st[1](v); if (p.onChange) p.onChange(v); }
    var opts = [{ v: 'empresa', l: 'Empresa' }, { v: 'pessoal', l: 'Pessoal' }];
    return h('div', { className: cx('sm-space', p.className), role: 'radiogroup', 'aria-label': 'Ambiente' },
      opts.map(function (o) {
        var on = value === o.v;
        return h('button', { key: o.v, type: 'button', role: 'radio', 'aria-checked': on ? 'true' : 'false', className: cx('sm-space-opt', 'sm-space-' + o.v, on && 'is-on'), onClick: function () { pick(o.v); } },
          h('span', { className: 'sm-space-dot', 'aria-hidden': 'true' }), o.l);
      }));
  }

  // ---------------------------------------------------------------- SidebarNav
  function SidebarNav(p) {
    return h('nav', { className: cx('sm-side', p.className), 'aria-label': 'Menu principal' },
      h('div', { className: 'sm-side-brand' }, p.logoSrc ? h('img', { src: p.logoSrc, alt: 'SeparaMe', className: 'sm-side-logo' }) : h('span', { className: 'sm-side-word' }, 'Separa', h('b', null, 'Me'))),
      (p.sections || []).map(function (s, si) {
        return h('div', { key: si, className: 'sm-side-group' },
          s.title ? h('p', { className: 'sm-side-title' }, s.title) : null,
          h('ul', null, s.items.map(function (it, i) {
            return h('li', { key: i }, h('a', { href: it.href || '#', className: cx('sm-side-item', it.active && 'is-on'), 'aria-current': it.active ? 'page' : undefined },
              h(Icon, { name: it.icon }), h('span', null, it.label), it.badge ? h('span', { className: 'sm-side-badge' }, it.badge) : null));
          })));
      }),
      p.footer ? h('div', { className: 'sm-side-foot' }, p.footer) : null);
  }

  // ---------------------------------------------------------------- TabBar
  function TabBar(p) {
    return h('nav', { className: cx('sm-tabbar', p.className), 'aria-label': 'Navegação' },
      (p.items || []).map(function (it, i) {
        return h('a', { key: i, href: it.href || '#', className: cx('sm-tab', it.active && 'is-on', it.primary && 'sm-tab-primary'), 'aria-current': it.active ? 'page' : undefined },
          h('span', { className: 'sm-tab-ico' }, h(Icon, { name: it.icon, size: it.primary ? 22 : 20 })), h('span', { className: 'sm-tab-label' }, it.label));
      }));
  }

  // ---------------------------------------------------------------- KpiCard
  function KpiCard(p) {
    return h('section', { className: cx('sm-kpi', p.emphasis && 'sm-kpi-hero', p.className) },
      h('header', { className: 'sm-kpi-head' }, h('span', { className: 'sm-kpi-label' }, p.label), p.icon ? h('span', { className: 'sm-kpi-ico' }, h(Icon, { name: p.icon })) : null),
      h('div', { className: 'sm-kpi-value' }, typeof p.value === 'number' ? h(Money, { value: p.value, kind: p.kind || 'neutral', size: p.emphasis ? 'xl' : 'lg', showSign: p.showSign }) : p.value),
      p.hint ? h('p', { className: 'sm-kpi-hint' }, p.hint) : null);
  }

  // ---------------------------------------------------------------- StatusBadge
  var STATUS = {
    pago: ['Pago', 'success', 'check'], recebido: ['Recebido', 'success', 'check'], 'a-vencer': ['A vencer', 'warning', 'calendar'],
    vencido: ['Vencido', 'danger', 'alert'], previsto: ['Previsto', 'forecast', 'trend'], conciliado: ['Conciliado', 'success', 'check'],
    pendente: ['A conciliar', 'neutral', 'info'], reserva: ['Reserva', 'reserve', 'tax']
  };
  function StatusBadge(p) {
    var s = STATUS[p.status] || [p.status, 'neutral', 'info'];
    return h('span', { className: cx('sm-badge', 'sm-badge-' + s[1], p.className) }, h(Icon, { name: s[2], size: 13 }), p.children || s[0]);
  }

  // ---------------------------------------------------------------- SourceTag
  var SOURCES = { whatsapp: ['WhatsApp', 'chat'], extrato: ['Extrato', 'upload'], manual: ['Manual', 'pencil'], recorrente: ['Recorrente', 'repeat'] };
  function SourceTag(p) {
    var s = SOURCES[p.source] || [p.source, 'info'];
    return h('span', { className: cx('sm-source', 'sm-source-' + p.source, p.className), title: 'Origem do lançamento: ' + s[0] }, h(Icon, { name: s[1], size: 13 }), s[0]);
  }

  // ---------------------------------------------------------------- TransactionTable
  function TransactionTable(p) {
    return h('div', { className: cx('sm-table-wrap', p.className) },
      h('table', { className: 'sm-table' },
        p.caption ? h('caption', null, p.caption) : null,
        h('thead', null, h('tr', null, ['Data', 'Descrição', 'Categoria', 'Origem', 'Situação', 'Valor'].map(function (c, i) { return h('th', { key: i, scope: 'col', className: i === 5 ? 'sm-right' : undefined }, c); }))),
        h('tbody', null, (p.rows || []).map(function (r, i) {
          return h('tr', { key: i },
            h('td', { className: 'sm-num sm-muted' }, r.date),
            h('td', null, h('span', { className: 'sm-table-desc' }, h('span', { className: 'sm-env-dot sm-env-' + (r.space || 'empresa'), title: r.space === 'pessoal' ? 'Pessoal' : 'Empresa' }), r.description)),
            h('td', { className: 'sm-muted' }, r.category),
            h('td', null, h(SourceTag, { source: r.source })),
            h('td', null, h(StatusBadge, { status: r.status })),
            h('td', { className: 'sm-right' }, h(Money, { value: r.value, kind: r.kind, size: 'sm' })));
        }))));
  }

  // ---------------------------------------------------------------- CashFlowChart
  function CashFlowChart(p) {
    var data = p.data || [], W = 640, H = 240, L = 56, R = 16, T = 16, B = 32;
    var vals = []; data.forEach(function (d) { if (d.realized != null) vals.push(d.realized); if (d.forecast != null) vals.push(d.forecast); });
    var lo = Math.min.apply(null, vals.concat([0])), hi = Math.max.apply(null, vals);
    var step = Math.pow(10, Math.floor(Math.log10(Math.max(1, hi - lo)))); if ((hi - lo) / step < 4) step /= 2;
    lo = Math.floor(lo / step) * step; hi = Math.ceil(hi / step) * step;
    var x = function (i) { return L + (W - L - R) * (data.length < 2 ? 0 : i / (data.length - 1)); };
    var y = function (v) { return T + (H - T - B) * (1 - (v - lo) / (hi - lo || 1)); };
    var ticks = []; for (var t = lo; t <= hi + 1e-9; t += step) ticks.push(t);
    var real = data.map(function (d, i) { return d.realized == null ? null : [x(i), y(d.realized)]; }).filter(Boolean);
    var last = -1; data.forEach(function (d, i) { if (d.realized != null) last = i; });
    var fc = data.map(function (d, i) { return d.forecast == null || i < last ? null : [x(i), y(d.forecast)]; }).filter(Boolean);
    var path = function (pts) { return pts.map(function (q, i) { return (i ? 'L' : 'M') + q[0].toFixed(1) + ' ' + q[1].toFixed(1); }).join(' '); };
    var area = real.length ? path(real) + ' L' + real[real.length - 1][0].toFixed(1) + ' ' + y(lo) + ' L' + real[0][0].toFixed(1) + ' ' + y(lo) + ' Z' : '';
    var k = function (v) { return 'R$ ' + (Math.abs(v) >= 1000 ? (v / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + ' mil' : v.toLocaleString('pt-BR')); };
    return h('figure', { className: cx('sm-chart', p.className) },
      h('figcaption', { className: 'sm-chart-head' }, h('span', { className: 'sm-chart-title' }, p.title || 'Fluxo de caixa'),
        h('span', { className: 'sm-chart-legend' }, h('span', { className: 'sm-leg sm-leg-real' }, 'Realizado'), h('span', { className: 'sm-leg sm-leg-fc' }, 'Previsto'))),
      h('svg', { viewBox: '0 0 ' + W + ' ' + H, className: 'sm-chart-svg', role: 'img', 'aria-label': (p.title || 'Fluxo de caixa') + ': realizado até ' + (data[last] ? data[last].label : '') + ', previsto a seguir' },
        ticks.map(function (t, i) { return h('g', { key: 'g' + i }, h('line', { x1: L, x2: W - R, y1: y(t), y2: y(t), className: 'sm-chart-grid' }), h('text', { x: L - 8, y: y(t) + 4, className: 'sm-chart-tick', textAnchor: 'end' }, k(t))); }),
        data.map(function (d, i) { return h('text', { key: 'x' + i, x: x(i), y: H - 10, className: 'sm-chart-tick', textAnchor: 'middle' }, d.label); }),
        last >= 0 ? h('line', { x1: x(last), x2: x(last), y1: T, y2: H - B, className: 'sm-chart-today' }) : null,
        area ? h('path', { d: area, className: 'sm-chart-area' }) : null,
        real.length ? h('path', { d: path(real), className: 'sm-chart-real' }) : null,
        fc.length ? h('path', { d: path(fc), className: 'sm-chart-fc' }) : null,
        last >= 0 ? h('circle', { cx: x(last), cy: y(data[last].realized), r: 5, className: 'sm-chart-dot' }) : null));
  }

  // ---------------------------------------------------------------- TaxReserveCard
  function TaxReserveCard(p) {
    var pct = Math.max(0, Math.min(1, (p.reserved || 0) / (p.target || 1)));
    return h('section', { className: cx('sm-tax', p.className) },
      h('header', { className: 'sm-tax-head' }, h('span', { className: 'sm-tax-ico' }, h(Icon, { name: 'tax' })), h('div', null, h('h3', { className: 'sm-tax-title' }, p.title || 'Reserva tributária'), h('p', { className: 'sm-tax-sub' }, p.period))),
      h('div', { className: 'sm-tax-total' }, h(Money, { value: p.reserved || 0, kind: 'reserve', size: 'lg', showSign: false }), h('span', { className: 'sm-muted' }, ' de ', h('span', { className: 'sm-num' }, BRL.format(p.target || 0)))),
      h('div', { className: 'sm-tax-bar', role: 'progressbar', 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-valuenow': Math.round(pct * 100), 'aria-label': 'Reserva separada no planejamento' }, h('span', { style: { width: (pct * 100).toFixed(1) + '%' } })),
      h('ul', { className: 'sm-tax-items' }, (p.items || []).map(function (it, i) {
        return h('li', { key: i }, h('div', null, h('span', { className: 'sm-tax-item-label' }, it.label), h('span', { className: 'sm-tax-item-note' }, it.note)), h(Money, { value: it.value, kind: 'neutral', size: 'sm', showSign: false }));
      })),
      p.disclaimer !== false ? h('p', { className: 'sm-tax-disc' }, h(Icon, { name: 'info', size: 14 }), p.disclaimer || 'Reserva gerencial: um registro de planejamento. Não bloqueia dinheiro no banco nem substitui a guia oficial.') : null);
  }

  // ---------------------------------------------------------------- Notice
  function Notice(p) {
    var tone = p.tone || 'info'; var ico = { info: 'info', warning: 'alert', danger: 'alert', reserve: 'tax', success: 'check' }[tone];
    return h('div', { className: cx('sm-notice', 'sm-notice-' + tone, p.className), role: tone === 'danger' ? 'alert' : 'note' },
      h(Icon, { name: ico }), h('div', null, p.title ? h('p', { className: 'sm-notice-title' }, p.title) : null, h('div', { className: 'sm-notice-body' }, p.children)));
  }

  // ---------------------------------------------------------------- Toast
  function Toast(p) {
    var tone = p.tone || 'success';
    return h('div', { className: cx('sm-toast', 'sm-toast-' + tone, p.className), role: 'status' },
      h('span', { className: 'sm-toast-ico' }, h(Icon, { name: tone === 'success' ? 'check' : tone === 'danger' ? 'alert' : 'info', size: 16 })),
      h('div', { className: 'sm-toast-text' }, h('p', { className: 'sm-toast-title' }, p.title), p.message ? h('p', { className: 'sm-toast-msg' }, p.message) : null),
      p.action ? h('button', { type: 'button', className: 'sm-toast-action', onClick: p.onAction }, p.action) : null);
  }

  // ---------------------------------------------------------------- ChatBubble
  function ChatBubble(p) {
    var from = p.from || 'bot';
    return h('div', { className: cx('sm-chat', 'sm-chat-' + from, p.className) },
      h('div', { className: 'sm-chat-bubble' },
        p.title ? h('p', { className: 'sm-chat-title' }, from === 'bot' ? h(Icon, { name: 'check', size: 14 }) : null, p.title) : null,
        h('div', { className: 'sm-chat-body' }, p.children),
        h('span', { className: 'sm-chat-meta' }, p.time || '', from === 'user' ? ' ✓✓' : '')));
  }

  window.SeparaMe = Object.assign(window.SeparaMe || {}, {
    Button: Button, TextField: TextField, SpaceSwitcher: SpaceSwitcher, SidebarNav: SidebarNav, TabBar: TabBar, KpiCard: KpiCard, Money: Money,
    StatusBadge: StatusBadge, SourceTag: SourceTag, TransactionTable: TransactionTable, CashFlowChart: CashFlowChart, TaxReserveCard: TaxReserveCard,
    Notice: Notice, Toast: Toast, ChatBubble: ChatBubble, Icon: Icon
  });
})();
