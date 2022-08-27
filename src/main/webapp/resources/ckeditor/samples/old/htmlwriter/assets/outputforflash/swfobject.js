var swfobject = (function () {
  function w () { if (!u) { try { var a = d.getElementsByTagName('body')[0].appendChild(d.createElement('span')); a.parentNode.removeChild(a) } catch (b) { return }u = !0; for (var a = z.length, c = 0; c < a; c++)z[c]() } } function M (a) { u ? a() : z[z.length] = a } function N (a) {
    if (typeof n.addEventListener !== 'undefined')n.addEventListener('load', a, !1); else if (typeof d.addEventListener !== 'undefined')d.addEventListener('load', a, !1); else if (typeof n.attachEvent !== 'undefined')U(n, 'onload', a); else if (typeof n.onload === 'function') {
      const b =
n.onload; n.onload = function () { b(); a() }
    } else n.onload = a
  } function V () { const a = d.getElementsByTagName('body')[0]; const b = d.createElement('object'); b.setAttribute('type', 'application/x-shockwave-flash'); let c = a.appendChild(b); if (c) { let f = 0; (function () { if (typeof c.GetVariable !== 'undefined') { let g = c.GetVariable('$version'); g && (g = g.split(' ')[1].split(','), e.pv = [parseInt(g[0], 10), parseInt(g[1], 10), parseInt(g[2], 10)]) } else if (f < 10) { f++; setTimeout(arguments.callee, 10); return }a.removeChild(b); c = null; E() })() } else E() }
  function E () {
    const a = r.length; if (a > 0) {
      for (let b = 0; b < a; b++) {
        let c = r[b].id; const f = r[b].callbackFn; let g = { success: !1, id: c }; if (e.pv[0] > 0) {
          var d = p(c); if (d) {
            if (!A(r[b].swfVersion) || e.wk && e.wk < 312) {
              if (r[b].expressInstall && F()) {
                g = {}; g.data = r[b].expressInstall; g.width = d.getAttribute('width') || '0'; g.height = d.getAttribute('height') || '0'; d.getAttribute('class') && (g.styleclass = d.getAttribute('class')); d.getAttribute('align') && (g.align = d.getAttribute('align')); for (var h = {}, d = d.getElementsByTagName('param'), k = d.length, l = 0; l <
k; l++)d[l].getAttribute('name').toLowerCase() != 'movie' && (h[d[l].getAttribute('name')] = d[l].getAttribute('value')); G(g, h, c, f)
              } else W(d), f && f(g)
            } else v(c, !0), f && (g.success = !0, g.ref = H(c), f(g))
          }
        } else v(c, !0), f && ((c = H(c)) && typeof c.SetVariable !== 'undefined' && (g.success = !0, g.ref = c), f(g))
      }
    }
  } function H (a) { let b = null; (a = p(a)) && a.nodeName == 'OBJECT' && (typeof a.SetVariable !== 'undefined' ? b = a : (a = a.getElementsByTagName('object')[0]) && (b = a)); return b } function F () { return !B && A('6.0.65') && (e.win || e.mac) && !(e.wk && e.wk < 312) }
  function G (a, b, c, f) {
    B = !0; I = f || null; O = { success: !1, id: c }; const g = p(c); if (g) {
      g.nodeName == 'OBJECT' ? (y = J(g), C = null) : (y = g, C = c); a.id = 'SWFObjectExprInst'; if (typeof a.width === 'undefined' || !/%$/.test(a.width) && parseInt(a.width, 10) < 310)a.width = '310'; if (typeof a.height === 'undefined' || !/%$/.test(a.height) && parseInt(a.height, 10) < 137)a.height = '137'; d.title = d.title.slice(0, 47) + ' - Flash Player Installation'; f = e.ie && e.win ? 'ActiveX' : 'PlugIn'; f = 'MMredirectURL\x3d' + n.location.toString().replace(/&/g, '%26') + '\x26MMplayerType\x3d' +
f + '\x26MMdoctitle\x3d' + d.title; b.flashvars = typeof b.flashvars !== 'undefined' ? b.flashvars + ('\x26' + f) : f; e.ie && e.win && g.readyState != 4 && (f = d.createElement('div'), c += 'SWFObjectNew', f.setAttribute('id', c), g.parentNode.insertBefore(f, g), g.style.display = 'none', (function () { g.readyState == 4 ? g.parentNode.removeChild(g) : setTimeout(arguments.callee, 10) }())); K(a, b, c)
    }
  } function W (a) {
    if (e.ie && e.win && a.readyState != 4) {
      const b = d.createElement('div'); a.parentNode.insertBefore(b, a); b.parentNode.replaceChild(J(a), b); a.style.display =
'none'; (function () { a.readyState == 4 ? a.parentNode.removeChild(a) : setTimeout(arguments.callee, 10) })()
    } else a.parentNode.replaceChild(J(a), a)
  } function J (a) { const b = d.createElement('div'); if (e.win && e.ie)b.innerHTML = a.innerHTML; else if (a = a.getElementsByTagName('object')[0]) if (a = a.childNodes) for (let c = a.length, f = 0; f < c; f++)a[f].nodeType == 1 && a[f].nodeName == 'PARAM' || a[f].nodeType == 8 || b.appendChild(a[f].cloneNode(!0)); return b } function K (a, b, c) {
    let f; const g = p(c); if (e.wk && e.wk < 312) return f; if (g) {
      if (typeof a.id === 'undefined' &&
(a.id = c), e.ie && e.win) { var q = ''; var h; for (h in a)a[h] != Object.prototype[h] && (h.toLowerCase() == 'data' ? b.movie = a[h] : h.toLowerCase() == 'styleclass' ? q += ' class\x3d"' + a[h] + '"' : h.toLowerCase() != 'classid' && (q += ' ' + h + '\x3d"' + a[h] + '"')); h = ''; for (var k in b)b[k] != Object.prototype[k] && (h += '\x3cparam name\x3d"' + k + '" value\x3d"' + b[k] + '" /\x3e'); g.outerHTML = '\x3cobject classid\x3d"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + q + '\x3e' + h + '\x3c/object\x3e'; D[D.length] = a.id; f = p(a.id) } else {
        k = d.createElement('object'); k.setAttribute('type',
          'application/x-shockwave-flash'); for (var l in a)a[l] != Object.prototype[l] && (l.toLowerCase() == 'styleclass' ? k.setAttribute('class', a[l]) : l.toLowerCase() != 'classid' && k.setAttribute(l, a[l])); for (q in b)b[q] != Object.prototype[q] && q.toLowerCase() != 'movie' && (a = k, h = q, l = b[q], c = d.createElement('param'), c.setAttribute('name', h), c.setAttribute('value', l), a.appendChild(c)); g.parentNode.replaceChild(k, g); f = k
      }
    } return f
  } function P (a) {
    const b = p(a); b && b.nodeName == 'OBJECT' && (e.ie && e.win
      ? (b.style.display = 'none', (function () {
          if (b.readyState ==
4) { const c = p(a); if (c) { for (const f in c) typeof c[f] === 'function' && (c[f] = null); c.parentNode.removeChild(c) } } else setTimeout(arguments.callee, 10)
        }()))
      : b.parentNode.removeChild(b))
  } function p (a) { let b = null; try { b = d.getElementById(a) } catch (c) {} return b } function U (a, b, c) { a.attachEvent(b, c); x[x.length] = [a, b, c] } function A (a) {
    const b = e.pv; a = a.split('.'); a[0] = parseInt(a[0], 10); a[1] = parseInt(a[1], 10) || 0; a[2] = parseInt(a[2], 10) || 0; return b[0] > a[0] || b[0] == a[0] && b[1] > a[1] || b[0] == a[0] && b[1] == a[1] && b[2] >= a[2]
      ? !0
      : !1
  } function Q (a, b, c, f) {
    if (!e.ie || !e.mac) {
      const g = d.getElementsByTagName('head')[0]; g && (c = c && typeof c === 'string' ? c : 'screen', f && (L = m = null), m && L == c || (f = d.createElement('style'), f.setAttribute('type', 'text/css'), f.setAttribute('media', c), m = g.appendChild(f), e.ie && e.win && typeof d.styleSheets !== 'undefined' && d.styleSheets.length > 0 && (m = d.styleSheets[d.styleSheets.length - 1]), L = c), e.ie && e.win
        ? m && typeof m.addRule === 'object' && m.addRule(a, b)
        : m && typeof d.createTextNode !== 'undefined' && m.appendChild(d.createTextNode(a +
' {' + b + '}')))
    }
  } function v (a, b) { if (R) { const c = b ? 'visible' : 'hidden'; u && p(a) ? p(a).style.visibility = c : Q('#' + a, 'visibility:' + c) } } function S (a) { return /[\\\"<>\.;]/.exec(a) != null && typeof encodeURIComponent !== 'undefined' ? encodeURIComponent(a) : a } var n = window; var d = document; const t = navigator; let T = !1; var z = [function () { T ? V() : E() }]; var r = []; var D = []; var x = []; let y; let C; let I; let O; var u = !1; var B = !1; let m; let L; var R = !0; var e = (function () {
    const a = typeof d.getElementById !== 'undefined' && typeof d.getElementsByTagName !== 'undefined' && typeof d.createElement !== 'undefined'; var b = t.userAgent.toLowerCase()
    var c = t.platform.toLowerCase(); const f = c ? /win/.test(c) : /win/.test(b); var c = c ? /mac/.test(c) : /mac/.test(b); var b = /webkit/.test(b) ? parseFloat(b.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, '$1')) : !1; let g = !+'\v1'; let e = [0, 0, 0]; let h = null; if (typeof t.plugins !== 'undefined' && typeof t.plugins['Shockwave Flash'] === 'object') {
      !(h = t.plugins['Shockwave Flash'].description) || typeof t.mimeTypes !== 'undefined' && t.mimeTypes['application/x-shockwave-flash'] && !t.mimeTypes['application/x-shockwave-flash'].enabledPlugin || (T = !0, g = !1, h = h.replace(/^.*\s+(\S+\s+\S+$)/,
        '$1'), e[0] = parseInt(h.replace(/^(.*)\..*$/, '$1'), 10), e[1] = parseInt(h.replace(/^.*\.(.*)\s.*$/, '$1'), 10), e[2] = /[a-zA-Z]/.test(h) ? parseInt(h.replace(/^.*[a-zA-Z]+(.*)$/, '$1'), 10) : 0)
    } else if (typeof n.ActiveXObject !== 'undefined') try { const k = new ActiveXObject('ShockwaveFlash.ShockwaveFlash'); k && (h = k.GetVariable('$version')) && (g = !0, h = h.split(' ')[1].split(','), e = [parseInt(h[0], 10), parseInt(h[1], 10), parseInt(h[2], 10)]) } catch (l) {} return { w3: a, pv: e, wk: b, ie: g, win: f, mac: c }
  }()); (function () {
    e.w3 && ((typeof d.readyState !== 'undefined' &&
d.readyState == 'complete' || typeof d.readyState === 'undefined' && (d.getElementsByTagName('body')[0] || d.body)) && w(), u || (typeof d.addEventListener !== 'undefined' && d.addEventListener('DOMContentLoaded', w, !1), e.ie && e.win && (d.attachEvent('onreadystatechange', function () { d.readyState == 'complete' && (d.detachEvent('onreadystatechange', arguments.callee), w()) }), n == top && (function () { if (!u) { try { d.documentElement.doScroll('left') } catch (a) { setTimeout(arguments.callee, 0); return }w() } }())), e.wk && (function () {
      u || (/loaded|complete/.test(d.readyState)
        ? w()
        : setTimeout(arguments.callee, 0))
    }()), N(w)))
  })(); (function () { e.ie && e.win && window.attachEvent('onunload', function () { for (var a = x.length, b = 0; b < a; b++)x[b][0].detachEvent(x[b][1], x[b][2]); a = D.length; for (b = 0; b < a; b++)P(D[b]); for (const c in e)e[c] = null; e = null; for (const f in swfobject)swfobject[f] = null; swfobject = null }) })(); return {
    registerObject: function (a, b, c, f) { if (e.w3 && a && b) { const d = {}; d.id = a; d.swfVersion = b; d.expressInstall = c; d.callbackFn = f; r[r.length] = d; v(a, !1) } else f && f({ success: !1, id: a }) },
    getObjectById: function (a) { if (e.w3) return H(a) },
    embedSWF: function (a, b, c, d, g, q, h, k, l, n) {
      const p = { success: !1, id: b }; e.w3 && !(e.wk && e.wk < 312) && a && b && c && d && g
        ? (v(b, !1), M(function () {
            c += ''; d += ''; const e = {}; if (l && typeof l === 'object') for (var m in l)e[m] = l[m]; e.data = a; e.width = c; e.height = d; m = {}; if (k && typeof k === 'object') for (var r in k)m[r] = k[r]; if (h && typeof h === 'object') for (const t in h)m.flashvars = typeof m.flashvars !== 'undefined' ? m.flashvars + ('\x26' + t + '\x3d' + h[t]) : t + '\x3d' + h[t]; if (A(g))r = K(e, m, b), e.id == b && v(b, !0), p.success = !0, p.ref = r; else {
              if (q && F()) {
                e.data = q; G(e,
                  m, b, n); return
              }v(b, !0)
            }n && n(p)
          }))
        : n && n(p)
    },
    switchOffAutoHideShow: function () { R = !1 },
    ua: e,
    getFlashPlayerVersion: function () { return { major: e.pv[0], minor: e.pv[1], release: e.pv[2] } },
    hasFlashPlayerVersion: A,
    createSWF: function (a, b, c) { if (e.w3) return K(a, b, c) },
    showExpressInstall: function (a, b, c, d) { e.w3 && F() && G(a, b, c, d) },
    removeSWF: function (a) { e.w3 && P(a) },
    createCSS: function (a, b, c, d) { e.w3 && Q(a, b, c, d) },
    addDomLoadEvent: M,
    addLoadEvent: N,
    getQueryParamValue: function (a) {
      var b = d.location.search || d.location.hash; if (b) {
        /\?/.test(b) &&
(b = b.split('?')[1]); if (a == null) return S(b); for (var b = b.split('\x26'), c = 0; c < b.length; c++) if (b[c].substring(0, b[c].indexOf('\x3d')) == a) return S(b[c].substring(b[c].indexOf('\x3d') + 1))
      } return ''
    },
    expressInstallCallback: function () { if (B) { const a = p('SWFObjectExprInst'); a && y && (a.parentNode.replaceChild(y, a), C && (v(C, !0), e.ie && e.win && (y.style.display = 'block')), I && I(O)); B = !1 } }
  }
}())
