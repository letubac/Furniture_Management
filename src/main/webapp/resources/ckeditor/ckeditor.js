/*
Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md or http://ckeditor.com/license
*/
(function () {
  if (window.CKEDITOR && window.CKEDITOR.dom) return; window.CKEDITOR || (window.CKEDITOR = (function () {
    const a = /(^|.*[\\\/])ckeditor\.js(?:\?.*|;.*)?$/i; const d = {
      timestamp: 'GB8C',
      version: '4.6.1',
      revision: '580bcaf',
      rnd: Math.floor(900 * Math.random()) + 100,
      _: { pending: [], basePathSrcPattern: a },
      status: 'unloaded',
      basePath: (function () {
        let b = window.CKEDITOR_BASEPATH || ''; if (!b) for (let c = document.getElementsByTagName('script'), d = 0; d < c.length; d++) { const l = c[d].src.match(a); if (l) { b = l[1]; break } }b.indexOf(':/') == -1 && b.slice(0, 2) != '//' && (b = b.indexOf('/') === 0
          ? location.href.match(/^.*?:\/\/[^\/]*/)[0] +
b
          : location.href.match(/^[^\?]*\/(?:)/)[0] + b); if (!b) throw 'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.'; return b
      }()),
      getUrl: function (a) { a.indexOf(':/') == -1 && a.indexOf('/') !== 0 && (a = this.basePath + a); this.timestamp && a.charAt(a.length - 1) != '/' && !/[&?]t=/.test(a) && (a += (a.indexOf('?') >= 0 ? '\x26' : '?') + 't\x3d' + this.timestamp); return a },
      domReady: (function () {
        function a () {
          try {
            document.addEventListener
              ? (document.removeEventListener('DOMContentLoaded',
                  a, !1), b())
              : document.attachEvent && document.readyState === 'complete' && (document.detachEvent('onreadystatechange', a), b())
          } catch (c) {}
        } function b () { for (var a; a = c.shift();)a() } var c = []; return function (b) {
          function d () { try { document.documentElement.doScroll('left') } catch (f) { setTimeout(d, 1); return }a() }c.push(b); document.readyState === 'complete' && setTimeout(a, 1); if (c.length == 1) {
            if (document.addEventListener)document.addEventListener('DOMContentLoaded', a, !1), window.addEventListener('load', a, !1); else if (document.attachEvent) {
              document.attachEvent('onreadystatechange',
                a); window.attachEvent('onload', a); b = !1; try { b = !window.frameElement } catch (r) {}document.documentElement.doScroll && b && d()
            }
          }
        }
      }())
    }; const b = window.CKEDITOR_GETURL; if (b) { const c = d.getUrl; d.getUrl = function (a) { return b.call(d, a) || c.call(d, a) } } return d
  }()))
  CKEDITOR.event || (CKEDITOR.event = function () {}, CKEDITOR.event.implementOn = function (a) { const d = CKEDITOR.event.prototype; let b; for (b in d)a[b] == null && (a[b] = d[b]) }, CKEDITOR.event.prototype = (function () {
    function a (a) { const e = d(this); return e[a] || (e[a] = new b(a)) } var d = function (a) { a = a.getPrivate && a.getPrivate() || a._ || (a._ = {}); return a.events || (a.events = {}) }; var b = function (a) { this.name = a; this.listeners = [] }; b.prototype = { getListenerIndex: function (a) { for (let b = 0, d = this.listeners; b < d.length; b++) if (d[b].fn == a) return b; return -1 } }
    return {
      define: function (b, d) { const g = a.call(this, b); CKEDITOR.tools.extend(g, d, !0) },
      on: function (b, d, g, h, l) { function m (a, f, C, l) { a = { name: b, sender: this, editor: a, data: f, listenerData: h, stop: C, cancel: l, removeListener: r }; return !1 === d.call(g, a) ? !1 : a.data } function r () { C.removeListener(b, d) } let f = a.call(this, b); if (f.getListenerIndex(d) < 0) { f = f.listeners; g || (g = this); isNaN(l) && (l = 10); var C = this; m.fn = d; m.priority = l; for (let u = f.length - 1; u >= 0; u--) if (f[u].priority <= l) return f.splice(u + 1, 0, m), { removeListener: r }; f.unshift(m) } return { removeListener: r } },
      once: function () { const a = Array.prototype.slice.call(arguments); const b = a[1]; a[1] = function (a) { a.removeListener(); return b.apply(this, arguments) }; return this.on.apply(this, a) },
      capture: function () { CKEDITOR.event.useCapture = 1; const a = this.on.apply(this, arguments); CKEDITOR.event.useCapture = 0; return a },
      fire: (function () {
        let a = 0; const b = function () { a = 1 }; let g = 0; const h = function () { g = 1 }; return function (l, m, r) {
          const f = d(this)[l]; l = a; const C = g; a = g = 0; if (f) {
            var u = f.listeners; if (u.length) {
              for (var u = u.slice(0), A, y = 0; y < u.length; y++) {
                if (f.errorProof) {
                  try {
                    A =
u[y].call(this, r, m, b, h)
                  } catch (q) {}
                } else A = u[y].call(this, r, m, b, h); !1 === A ? g = 1 : typeof A !== 'undefined' && (m = A); if (a || g) break
              }
            }
          }m = g ? !1 : typeof m === 'undefined' ? !0 : m; a = l; g = C; return m
        }
      }()),
      fireOnce: function (a, b, g) { b = this.fire(a, b, g); delete d(this)[a]; return b },
      removeListener: function (a, b) { const g = d(this)[a]; if (g) { const h = g.getListenerIndex(b); h >= 0 && g.listeners.splice(h, 1) } },
      removeAllListeners: function () { const a = d(this); let b; for (b in a) delete a[b] },
      hasListeners: function (a) { return (a = d(this)[a]) && a.listeners.length > 0 }
    }
  }()))
  CKEDITOR.editor || (CKEDITOR.editor = function () { CKEDITOR._.pending.push([this, arguments]); CKEDITOR.event.call(this) }, CKEDITOR.editor.prototype.fire = function (a, d) { a in { instanceReady: 1, loaded: 1 } && (this[a] = !0); return CKEDITOR.event.prototype.fire.call(this, a, d, this) }, CKEDITOR.editor.prototype.fireOnce = function (a, d) { a in { instanceReady: 1, loaded: 1 } && (this[a] = !0); return CKEDITOR.event.prototype.fireOnce.call(this, a, d, this) }, CKEDITOR.event.implementOn(CKEDITOR.editor.prototype))
  CKEDITOR.env || (CKEDITOR.env = (function () {
    const a = navigator.userAgent.toLowerCase(); let d = a.match(/edge[ \/](\d+.?\d*)/); var b = a.indexOf('trident/') > -1; var b = !(!d && !b); var b = {
      ie: b,
      edge: !!d,
      webkit: !b && a.indexOf(' applewebkit/') > -1,
      air: a.indexOf(' adobeair/') > -1,
      mac: a.indexOf('macintosh') > -1,
      quirks: document.compatMode == 'BackCompat' && (!document.documentMode || document.documentMode < 10),
      mobile: a.indexOf('mobile') > -1,
      iOS: /(ipad|iphone|ipod)/.test(a),
      isCustomDomain: function () {
        if (!this.ie) return !1; const a = document.domain; const b = window.location.hostname
        return a != b && a != '[' + b + ']'
      },
      secure: location.protocol == 'https:'
    }; b.gecko = navigator.product == 'Gecko' && !b.webkit && !b.ie; b.webkit && (a.indexOf('chrome') > -1 ? b.chrome = !0 : b.safari = !0); let c = 0; b.ie && (c = d ? parseFloat(d[1]) : b.quirks || !document.documentMode ? parseFloat(a.match(/msie (\d+)/)[1]) : document.documentMode, b.ie9Compat = c == 9, b.ie8Compat = c == 8, b.ie7Compat = c == 7, b.ie6Compat = c < 7 || b.quirks); b.gecko && (d = a.match(/rv:([\d\.]+)/)) && (d = d[1].split('.'), c = 1E4 * d[0] + 100 * (d[1] || 0) + 1 * (d[2] || 0)); b.air && (c = parseFloat(a.match(/ adobeair\/(\d+)/)[1]))
    b.webkit && (c = parseFloat(a.match(/ applewebkit\/(\d+)/)[1])); b.version = c; b.isCompatible = !(b.ie && c < 7) && !(b.gecko && c < 4E4) && !(b.webkit && c < 534); b.hidpi = window.devicePixelRatio >= 2; b.needsBrFiller = b.gecko || b.webkit || b.ie && c > 10; b.needsNbspFiller = b.ie && c < 11; b.cssClass = 'cke_browser_' + (b.ie ? 'ie' : b.gecko ? 'gecko' : b.webkit ? 'webkit' : 'unknown'); b.quirks && (b.cssClass += ' cke_browser_quirks'); b.ie && (b.cssClass += ' cke_browser_ie' + (b.quirks ? '6 cke_browser_iequirks' : b.version)); b.air && (b.cssClass += ' cke_browser_air')
    b.iOS && (b.cssClass += ' cke_browser_ios'); b.hidpi && (b.cssClass += ' cke_hidpi'); return b
  }()))
  CKEDITOR.status == 'unloaded' && (function () {
    CKEDITOR.event.implementOn(CKEDITOR); CKEDITOR.loadFullCore = function () { if (CKEDITOR.status != 'basic_ready')CKEDITOR.loadFullCore._load = 1; else { delete CKEDITOR.loadFullCore; const a = document.createElement('script'); a.type = 'text/javascript'; a.src = CKEDITOR.basePath + 'ckeditor.js'; document.getElementsByTagName('head')[0].appendChild(a) } }; CKEDITOR.loadFullCoreTimeout = 0; CKEDITOR.add = function (a) { (this._.pending || (this._.pending = [])).push(a) }; (function () {
      CKEDITOR.domReady(function () {
        const a =
CKEDITOR.loadFullCore; const d = CKEDITOR.loadFullCoreTimeout; a && (CKEDITOR.status = 'basic_ready', a && a._load ? a() : d && setTimeout(function () { CKEDITOR.loadFullCore && CKEDITOR.loadFullCore() }, 1E3 * d))
      })
    })(); CKEDITOR.status = 'basic_loaded'
  }()); 'use strict'; CKEDITOR.VERBOSITY_WARN = 1; CKEDITOR.VERBOSITY_ERROR = 2; CKEDITOR.verbosity = CKEDITOR.VERBOSITY_WARN | CKEDITOR.VERBOSITY_ERROR; CKEDITOR.warn = function (a, d) { CKEDITOR.verbosity & CKEDITOR.VERBOSITY_WARN && CKEDITOR.fire('log', { type: 'warn', errorCode: a, additionalData: d }) }
  CKEDITOR.error = function (a, d) { CKEDITOR.verbosity & CKEDITOR.VERBOSITY_ERROR && CKEDITOR.fire('log', { type: 'error', errorCode: a, additionalData: d }) }
  CKEDITOR.on('log', function (a) { if (window.console && window.console.log) { const d = console[a.data.type] ? a.data.type : 'log'; const b = a.data.errorCode; if (a = a.data.additionalData)console[d]('[CKEDITOR] Error code: ' + b + '.', a); else console[d]('[CKEDITOR] Error code: ' + b + '.'); console[d]('[CKEDITOR] For more information about this error go to http://docs.ckeditor.com/#!/guide/dev_errors-section-' + b) } }, null, null, 999); CKEDITOR.dom = {};
  (function () {
    let a = []; const d = CKEDITOR.env.gecko ? '-moz-' : CKEDITOR.env.webkit ? '-webkit-' : CKEDITOR.env.ie ? '-ms-' : ''; const b = /&/g; const c = />/g; const e = /</g; const g = /"/g; const h = /&(lt|gt|amp|quot|nbsp|shy|#\d{1,5});/g; const l = { lt: '\x3c', gt: '\x3e', amp: '\x26', quot: '"', nbsp: ' ', shy: '­' }; const m = function (a, f) { return f[0] == '#' ? String.fromCharCode(parseInt(f.slice(1), 10)) : l[f] }; CKEDITOR.on('reset', function () { a = [] }); CKEDITOR.tools = {
      arrayCompare: function (a, f) {
        if (!a && !f) return !0; if (!a || !f || a.length != f.length) return !1; for (let b = 0; b < a.length; b++) if (a[b] != f[b]) return !1
        return !0
      },
      getIndex: function (a, f) { for (let b = 0; b < a.length; ++b) if (f(a[b])) return b; return -1 },
      clone: function (a) { let f; if (a && a instanceof Array) { f = []; for (var b = 0; b < a.length; b++)f[b] = CKEDITOR.tools.clone(a[b]); return f } if (a === null || typeof a !== 'object' || a instanceof String || a instanceof Number || a instanceof Boolean || a instanceof Date || a instanceof RegExp || a.nodeType || a.window === a) return a; f = new a.constructor(); for (b in a)f[b] = CKEDITOR.tools.clone(a[b]); return f },
      capitalize: function (a, f) {
        return a.charAt(0).toUpperCase() +
(f ? a.slice(1) : a.slice(1).toLowerCase())
      },
      extend: function (a) { let f = arguments.length; let b; let c; typeof (b = arguments[f - 1]) === 'boolean' ? f-- : typeof (b = arguments[f - 2]) === 'boolean' && (c = arguments[f - 1], f -= 2); for (let l = 1; l < f; l++) { const d = arguments[l]; var q; for (q in d) if (!0 === b || a[q] == null) if (!c || q in c)a[q] = d[q] } return a },
      prototypedCopy: function (a) { const f = function () {}; f.prototype = a; return new f() },
      copy: function (a) { const f = {}; let b; for (b in a)f[b] = a[b]; return f },
      isArray: function (a) { return Object.prototype.toString.call(a) == '[object Array]' },
      isEmpty: function (a) { for (const f in a) if (a.hasOwnProperty(f)) return !1; return !0 },
      cssVendorPrefix: function (a, f, b) { if (b) return d + a + ':' + f + ';' + a + ':' + f; b = {}; b[a] = f; b[d + a] = f; return b },
      cssStyleToDomStyle: (function () { const a = document.createElement('div').style; const f = typeof a.cssFloat !== 'undefined' ? 'cssFloat' : typeof a.styleFloat !== 'undefined' ? 'styleFloat' : 'float'; return function (a) { return a == 'float' ? f : a.replace(/-./g, function (a) { return a.substr(1).toUpperCase() }) } }()),
      buildStyleHtml: function (a) {
        a = [].concat(a); for (var f,
          b = [], c = 0; c < a.length; c++) if (f = a[c])/@import|[{}]/.test(f) ? b.push('\x3cstyle\x3e' + f + '\x3c/style\x3e') : b.push('\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"' + f + '"\x3e'); return b.join('')
      },
      htmlEncode: function (a) { return void 0 === a || a === null ? '' : String(a).replace(b, '\x26amp;').replace(c, '\x26gt;').replace(e, '\x26lt;') },
      htmlDecode: function (a) { return a.replace(h, m) },
      htmlEncodeAttr: function (a) { return CKEDITOR.tools.htmlEncode(a).replace(g, '\x26quot;') },
      htmlDecodeAttr: function (a) { return CKEDITOR.tools.htmlDecode(a) },
      transformPlainTextToHtml: function (a, f) {
        const b = f == CKEDITOR.ENTER_BR; var c = this.htmlEncode(a.replace(/\r\n/g, '\n')); var c = c.replace(/\t/g, '\x26nbsp;\x26nbsp; \x26nbsp;'); const l = f == CKEDITOR.ENTER_P ? 'p' : 'div'; if (!b) { const d = /\n{2}/g; if (d.test(c)) var q = '\x3c' + l + '\x3e', m = '\x3c/' + l + '\x3e', c = q + c.replace(d, function () { return m + q }) + m }c = c.replace(/\n/g, '\x3cbr\x3e'); b || (c = c.replace(new RegExp('\x3cbr\x3e(?\x3d\x3c/' + l + '\x3e)'), function (a) { return CKEDITOR.tools.repeat(a, 2) })); c = c.replace(/^ | $/g, '\x26nbsp;'); return c = c.replace(/(>|\s) /g,
          function (a, f) { return f + '\x26nbsp;' }).replace(/ (?=<)/g, '\x26nbsp;')
      },
      getNextNumber: (function () { let a = 0; return function () { return ++a } }()),
      getNextId: function () { return 'cke_' + this.getNextNumber() },
      getUniqueId: function () { for (var a = 'e', f = 0; f < 8; f++)a += Math.floor(65536 * (1 + Math.random())).toString(16).substring(1); return a },
      override: function (a, f) { const b = f(a); b.prototype = a.prototype; return b },
      setTimeout: function (a, f, b, c, l) {
        l || (l = window); b || (b = l); return l.setTimeout(function () { c ? a.apply(b, [].concat(c)) : a.apply(b) },
          f || 0)
      },
      trim: (function () { const a = /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g; return function (f) { return f.replace(a, '') } }()),
      ltrim: (function () { const a = /^[ \t\n\r]+/g; return function (f) { return f.replace(a, '') } }()),
      rtrim: (function () { const a = /[ \t\n\r]+$/g; return function (f) { return f.replace(a, '') } }()),
      indexOf: function (a, f) { if (typeof f === 'function') for (var b = 0, c = a.length; b < c; b++) { if (f(a[b])) return b } else { if (a.indexOf) return a.indexOf(f); b = 0; for (c = a.length; b < c; b++) if (a[b] === f) return b } return -1 },
      search: function (a, f) {
        const b = CKEDITOR.tools.indexOf(a,
          f); return b >= 0 ? a[b] : null
      },
      bind: function (a, f) { return function () { return a.apply(f, arguments) } },
      createClass: function (a) {
        var f = a.$; const b = a.base; const c = a.privates || a._; const l = a.proto; a = a.statics; !f && (f = function () { b && this.base.apply(this, arguments) }); if (c) var d = f, f = function () { const a = this._ || (this._ = {}); let f; for (f in c) { const b = c[f]; a[f] = typeof b === 'function' ? CKEDITOR.tools.bind(b, this) : b }d.apply(this, arguments) }; b && (f.prototype = this.prototypedCopy(b.prototype), f.prototype.constructor = f, f.base = b, f.baseProto = b.prototype, f.prototype.base =
function () { this.base = b.prototype.base; b.apply(this, arguments); this.base = arguments.callee }); l && this.extend(f.prototype, l, !0); a && this.extend(f, a, !0); return f
      },
      addFunction: function (b, f) { return a.push(function () { return b.apply(f || this, arguments) }) - 1 },
      removeFunction: function (b) { a[b] = null },
      callFunction: function (b) { const f = a[b]; return f && f.apply(window, Array.prototype.slice.call(arguments, 1)) },
      cssLength: (function () {
        const a = /^-?\d+\.?\d*px$/; let f; return function (b) {
          f = CKEDITOR.tools.trim(b + '') + 'px'; return a.test(f)
            ? f
            : b || ''
        }
      }()),
      convertToPx: (function () { let a; return function (f) { a || (a = CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"\x3e\x3c/div\x3e', CKEDITOR.document), CKEDITOR.document.getBody().append(a)); return /%$/.test(f) ? f : (a.setStyle('width', f), a.$.clientWidth) } }()),
      repeat: function (a, f) { return Array(f + 1).join(a) },
      tryThese: function () { for (var a, f = 0, b = arguments.length; f < b; f++) { const c = arguments[f]; try { a = c(); break } catch (l) {} } return a },
      genKey: function () { return Array.prototype.slice.call(arguments).join('-') },
      defer: function (a) { return function () { const f = arguments; const b = this; window.setTimeout(function () { a.apply(b, f) }, 0) } },
      normalizeCssText: function (a, f) { const b = []; let c; const l = CKEDITOR.tools.parseCssText(a, !0, f); for (c in l)b.push(c + ':' + l[c]); b.sort(); return b.length ? b.join(';') + ';' : '' },
      convertRgbToHex: function (a) {
        return a.replace(/(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi, function (a, b, c, l) {
          a = [b, c, l]; for (b = 0; b < 3; b++)a[b] = ('0' + parseInt(a[b], 10).toString(16)).slice(-2)
          return '#' + a.join('')
        })
      },
      normalizeHex: function (a) { return a.replace(/#(([0-9a-f]{3}){1,2})($|;|\s+)/gi, function (a, b, c, l) { a = b.toLowerCase(); a.length == 3 && (a = a.split(''), a = [a[0], a[0], a[1], a[1], a[2], a[2]].join('')); return '#' + a + l }) },
      parseCssText: function (a, b, c) {
        const l = {}; c && (a = (new CKEDITOR.dom.element('span')).setAttribute('style', a).getAttribute('style') || ''); a && (a = CKEDITOR.tools.normalizeHex(CKEDITOR.tools.convertRgbToHex(a))); if (!a || a == ';') return l; a.replace(/&quot;/g, '"').replace(/\s*([^:;\s]+)\s*:\s*([^;]+)\s*(?=;|$)/g,
          function (a, c, q) { b && (c = c.toLowerCase(), c == 'font-family' && (q = q.replace(/\s*,\s*/g, ',')), q = CKEDITOR.tools.trim(q)); l[c] = q }); return l
      },
      writeCssText: function (a, b) { let c; const l = []; for (c in a)l.push(c + ':' + a[c]); b && l.sort(); return l.join('; ') },
      objectCompare: function (a, b, c) { let l; if (!a && !b) return !0; if (!a || !b) return !1; for (l in a) if (a[l] != b[l]) return !1; if (!c) for (l in b) if (a[l] != b[l]) return !1; return !0 },
      objectKeys: function (a) { const b = []; let c; for (c in a)b.push(c); return b },
      convertArrayToObject: function (a, b) {
        const c = {}; arguments.length ==
1 && (b = !0); for (let l = 0, d = a.length; l < d; ++l)c[a[l]] = b; return c
      },
      fixDomain: function () { for (var a; ;) try { a = window.parent.document.domain; break } catch (b) { a = a ? a.replace(/.+?(?:\.|$)/, '') : document.domain; if (!a) break; document.domain = a } return !!a },
      eventsBuffer: function (a, b, c) { function l () { m = (new Date()).getTime(); d = !1; c ? b.call(c) : b() } let d; var m = 0; return { input: function () { if (!d) { const b = (new Date()).getTime() - m; b < a ? d = setTimeout(l, a - b) : l() } }, reset: function () { d && clearTimeout(d); d = m = 0 } } },
      enableHtml5Elements: function (a,
        b) { for (var c = 'abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup main mark meter nav output progress section summary time video'.split(' '), l = c.length, d; l--;)d = a.createElement(c[l]), b && a.appendChild(d) },
      checkIfAnyArrayItemMatches: function (a, b) { for (let c = 0, l = a.length; c < l; ++c) if (a[c].match(b)) return !0; return !1 },
      checkIfAnyObjectPropertyMatches: function (a, b) { for (const c in a) if (c.match(b)) return !0; return !1 },
      keystrokeToString: function (a, b) {
        const c = b & 16711680; const l =
b & 65535; const d = CKEDITOR.env.mac; const m = []; const q = []; c & CKEDITOR.CTRL && (m.push(d ? '⌘' : a[17]), q.push(d ? a[224] : a[17])); c & CKEDITOR.ALT && (m.push(d ? '⌥' : a[18]), q.push(a[18])); c & CKEDITOR.SHIFT && (m.push(d ? '⇧' : a[16]), q.push(a[16])); l && (a[l] ? (m.push(a[l]), q.push(a[l])) : (m.push(String.fromCharCode(l)), q.push(String.fromCharCode(l)))); return { display: m.join('+'), aria: q.join('+') }
      },
      transparentImageData: 'data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw\x3d\x3d',
      getCookie: function (a) {
        a = a.toLowerCase()
        for (var b = document.cookie.split(';'), c, l, d = 0; d < b.length; d++) if (c = b[d].split('\x3d'), l = decodeURIComponent(CKEDITOR.tools.trim(c[0]).toLowerCase()), l === a) return decodeURIComponent(c.length > 1 ? c[1] : ''); return null
      },
      setCookie: function (a, b) { document.cookie = encodeURIComponent(a) + '\x3d' + encodeURIComponent(b) + ';path\x3d/' },
      getCsrfToken: function () {
        var a = CKEDITOR.tools.getCookie('ckCsrfToken'); if (!a || a.length != 40) {
          var a = []; var b = ''; if (window.crypto && window.crypto.getRandomValues)a = new Uint8Array(40), window.crypto.getRandomValues(a)
          else for (var c = 0; c < 40; c++)a.push(Math.floor(256 * Math.random())); for (c = 0; c < a.length; c++) var l = 'abcdefghijklmnopqrstuvwxyz0123456789'.charAt(a[c] % 36), b = b + (Math.random() > 0.5 ? l.toUpperCase() : l); a = b; CKEDITOR.tools.setCookie('ckCsrfToken', a)
        } return a
      },
      escapeCss: function (a) { return a ? window.CSS && CSS.escape ? CSS.escape(a) : isNaN(parseInt(a.charAt(0), 10)) ? a : '\\3' + a.charAt(0) + ' ' + a.substring(1, a.length) : '' },
      style: {
        parse: {
          _colors: {
            aliceblue: '#F0F8FF',
            antiquewhite: '#FAEBD7',
            aqua: '#00FFFF',
            aquamarine: '#7FFFD4',
            azure: '#F0FFFF',
            beige: '#F5F5DC',
            bisque: '#FFE4C4',
            black: '#000000',
            blanchedalmond: '#FFEBCD',
            blue: '#0000FF',
            blueviolet: '#8A2BE2',
            brown: '#A52A2A',
            burlywood: '#DEB887',
            cadetblue: '#5F9EA0',
            chartreuse: '#7FFF00',
            chocolate: '#D2691E',
            coral: '#FF7F50',
            cornflowerblue: '#6495ED',
            cornsilk: '#FFF8DC',
            crimson: '#DC143C',
            cyan: '#00FFFF',
            darkblue: '#00008B',
            darkcyan: '#008B8B',
            darkgoldenrod: '#B8860B',
            darkgray: '#A9A9A9',
            darkgreen: '#006400',
            darkgrey: '#A9A9A9',
            darkkhaki: '#BDB76B',
            darkmagenta: '#8B008B',
            darkolivegreen: '#556B2F',
            darkorange: '#FF8C00',
            darkorchid: '#9932CC',
            darkred: '#8B0000',
            darksalmon: '#E9967A',
            darkseagreen: '#8FBC8F',
            darkslateblue: '#483D8B',
            darkslategray: '#2F4F4F',
            darkslategrey: '#2F4F4F',
            darkturquoise: '#00CED1',
            darkviolet: '#9400D3',
            deeppink: '#FF1493',
            deepskyblue: '#00BFFF',
            dimgray: '#696969',
            dimgrey: '#696969',
            dodgerblue: '#1E90FF',
            firebrick: '#B22222',
            floralwhite: '#FFFAF0',
            forestgreen: '#228B22',
            fuchsia: '#FF00FF',
            gainsboro: '#DCDCDC',
            ghostwhite: '#F8F8FF',
            gold: '#FFD700',
            goldenrod: '#DAA520',
            gray: '#808080',
            green: '#008000',
            greenyellow: '#ADFF2F',
            grey: '#808080',
            honeydew: '#F0FFF0',
            hotpink: '#FF69B4',
            indianred: '#CD5C5C',
            indigo: '#4B0082',
            ivory: '#FFFFF0',
            khaki: '#F0E68C',
            lavender: '#E6E6FA',
            lavenderblush: '#FFF0F5',
            lawngreen: '#7CFC00',
            lemonchiffon: '#FFFACD',
            lightblue: '#ADD8E6',
            lightcoral: '#F08080',
            lightcyan: '#E0FFFF',
            lightgoldenrodyellow: '#FAFAD2',
            lightgray: '#D3D3D3',
            lightgreen: '#90EE90',
            lightgrey: '#D3D3D3',
            lightpink: '#FFB6C1',
            lightsalmon: '#FFA07A',
            lightseagreen: '#20B2AA',
            lightskyblue: '#87CEFA',
            lightslategray: '#778899',
            lightslategrey: '#778899',
            lightsteelblue: '#B0C4DE',
            lightyellow: '#FFFFE0',
            lime: '#00FF00',
            limegreen: '#32CD32',
            linen: '#FAF0E6',
            magenta: '#FF00FF',
            maroon: '#800000',
            mediumaquamarine: '#66CDAA',
            mediumblue: '#0000CD',
            mediumorchid: '#BA55D3',
            mediumpurple: '#9370DB',
            mediumseagreen: '#3CB371',
            mediumslateblue: '#7B68EE',
            mediumspringgreen: '#00FA9A',
            mediumturquoise: '#48D1CC',
            mediumvioletred: '#C71585',
            midnightblue: '#191970',
            mintcream: '#F5FFFA',
            mistyrose: '#FFE4E1',
            moccasin: '#FFE4B5',
            navajowhite: '#FFDEAD',
            navy: '#000080',
            oldlace: '#FDF5E6',
            olive: '#808000',
            olivedrab: '#6B8E23',
            orange: '#FFA500',
            orangered: '#FF4500',
            orchid: '#DA70D6',
            palegoldenrod: '#EEE8AA',
            palegreen: '#98FB98',
            paleturquoise: '#AFEEEE',
            palevioletred: '#DB7093',
            papayawhip: '#FFEFD5',
            peachpuff: '#FFDAB9',
            peru: '#CD853F',
            pink: '#FFC0CB',
            plum: '#DDA0DD',
            powderblue: '#B0E0E6',
            purple: '#800080',
            rebeccapurple: '#663399',
            red: '#FF0000',
            rosybrown: '#BC8F8F',
            royalblue: '#4169E1',
            saddlebrown: '#8B4513',
            salmon: '#FA8072',
            sandybrown: '#F4A460',
            seagreen: '#2E8B57',
            seashell: '#FFF5EE',
            sienna: '#A0522D',
            silver: '#C0C0C0',
            skyblue: '#87CEEB',
            slateblue: '#6A5ACD',
            slategray: '#708090',
            slategrey: '#708090',
            snow: '#FFFAFA',
            springgreen: '#00FF7F',
            steelblue: '#4682B4',
            tan: '#D2B48C',
            teal: '#008080',
            thistle: '#D8BFD8',
            tomato: '#FF6347',
            turquoise: '#40E0D0',
            violet: '#EE82EE',
            wheat: '#F5DEB3',
            white: '#FFFFFF',
            whitesmoke: '#F5F5F5',
            yellow: '#FFFF00',
            yellowgreen: '#9ACD32'
          },
          _rgbaRegExp: /rgba?\(\s*\d+%?\s*,\s*\d+%?\s*,\s*\d+%?\s*(?:,\s*[0-9.]+\s*)?\)/gi,
          _hslaRegExp: /hsla?\(\s*[0-9.]+\s*,\s*\d+%\s*,\s*\d+%\s*(?:,\s*[0-9.]+\s*)?\)/gi,
          background: function (a) {
            const b = []; var c = []; var c = this._findColor(a)
            c.length && (b.color = c[0], CKEDITOR.tools.array.forEach(c, function (b) { a = a.replace(b, '') })); if (a = CKEDITOR.tools.trim(a))b.unprocessed = a; return b
          },
          margin: function (a) { function b (a) { c.top = l[a[0]]; c.right = l[a[1]]; c.bottom = l[a[2]]; c.left = l[a[3]] } var c = {}; var l = a.match(/(?:\-?[\.\d]+(?:%|\w*)|auto|inherit|initial|unset)/g) || ['0px']; switch (l.length) { case 1:b([0, 0, 0, 0]); break; case 2:b([0, 1, 0, 1]); break; case 3:b([0, 1, 2, 1]); break; case 4:b([0, 1, 2, 3]) } return c },
          _findColor: function (a) {
            var b = []; const c = CKEDITOR.tools.array; var b =
b.concat(a.match(this._rgbaRegExp) || []); var b = b.concat(a.match(this._hslaRegExp) || []); return b = b.concat(c.filter(a.split(/\s+/), function (a) { return a.match(/^\#[a-f0-9]{3}(?:[a-f0-9]{3})?$/gi) ? !0 : a.toLowerCase() in CKEDITOR.tools.style.parse._colors }))
          }
        }
      },
      array: { filter: function (a, b, c) { const l = []; this.forEach(a, function (d, m) { b.call(c, d, m, a) && l.push(d) }); return l }, forEach: function (a, b, c) { const l = a.length; let d; for (d = 0; d < l; d++)b.call(c, a[d], d, a) } }
    }; CKEDITOR.tools.array.indexOf = CKEDITOR.tools.indexOf; CKEDITOR.tools.array.isArray =
CKEDITOR.tools.isArray
  })()
  CKEDITOR.dtd = (function () {
    const a = CKEDITOR.tools.extend; let d = function (a, b) { for (var c = CKEDITOR.tools.clone(a), l = 1; l < arguments.length; l++) { b = arguments[l]; for (const d in b) delete c[d] } return c }; const b = {}; const c = {}; const e = { address: 1, article: 1, aside: 1, blockquote: 1, details: 1, div: 1, dl: 1, fieldset: 1, figure: 1, footer: 1, form: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, header: 1, hgroup: 1, hr: 1, main: 1, menu: 1, nav: 1, ol: 1, p: 1, pre: 1, section: 1, table: 1, ul: 1 }; const g = { command: 1, link: 1, meta: 1, noscript: 1, script: 1, style: 1 }; const h = {}; const l = { '#': 1 }; const m = { center: 1, dir: 1, noframes: 1 }
    a(b, { a: 1, abbr: 1, area: 1, audio: 1, b: 1, bdi: 1, bdo: 1, br: 1, button: 1, canvas: 1, cite: 1, code: 1, command: 1, datalist: 1, del: 1, dfn: 1, em: 1, embed: 1, i: 1, iframe: 1, img: 1, input: 1, ins: 1, kbd: 1, keygen: 1, label: 1, map: 1, mark: 1, meter: 1, noscript: 1, object: 1, output: 1, progress: 1, q: 1, ruby: 1, s: 1, samp: 1, script: 1, select: 1, small: 1, span: 1, strong: 1, sub: 1, sup: 1, textarea: 1, time: 1, u: 1, var: 1, video: 1, wbr: 1 }, l, { acronym: 1, applet: 1, basefont: 1, big: 1, font: 1, isindex: 1, strike: 1, style: 1, tt: 1 }); a(c, e, b, m); d = {
      a: d(b, { a: 1, button: 1 }),
      abbr: b,
      address: c,
      area: h,
      article: c,
      aside: c,
      audio: a({ source: 1, track: 1 }, c),
      b,
      base: h,
      bdi: b,
      bdo: b,
      blockquote: c,
      body: c,
      br: h,
      button: d(b, { a: 1, button: 1 }),
      canvas: b,
      caption: c,
      cite: b,
      code: b,
      col: h,
      colgroup: { col: 1 },
      command: h,
      datalist: a({ option: 1 }, b),
      dd: c,
      del: b,
      details: a({ summary: 1 }, c),
      dfn: b,
      div: c,
      dl: { dt: 1, dd: 1 },
      dt: c,
      em: b,
      embed: h,
      fieldset: a({ legend: 1 }, c),
      figcaption: c,
      figure: a({ figcaption: 1 }, c),
      footer: c,
      form: c,
      h1: b,
      h2: b,
      h3: b,
      h4: b,
      h5: b,
      h6: b,
      head: a({ title: 1, base: 1 }, g),
      header: c,
      hgroup: { h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1 },
      hr: h,
      html: a({
        head: 1,
        body: 1
      }, c, g),
      i: b,
      iframe: l,
      img: h,
      input: h,
      ins: b,
      kbd: b,
      keygen: h,
      label: b,
      legend: b,
      li: c,
      link: h,
      main: c,
      map: c,
      mark: b,
      menu: a({ li: 1 }, c),
      meta: h,
      meter: d(b, { meter: 1 }),
      nav: c,
      noscript: a({ link: 1, meta: 1, style: 1 }, b),
      object: a({ param: 1 }, b),
      ol: { li: 1 },
      optgroup: { option: 1 },
      option: l,
      output: b,
      p: b,
      param: h,
      pre: b,
      progress: d(b, { progress: 1 }),
      q: b,
      rp: b,
      rt: b,
      ruby: a({ rp: 1, rt: 1 }, b),
      s: b,
      samp: b,
      script: l,
      section: c,
      select: { optgroup: 1, option: 1 },
      small: b,
      source: h,
      span: b,
      strong: b,
      style: l,
      sub: b,
      summary: a({ h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1 }, b),
      sup: b,
      table: { caption: 1, colgroup: 1, thead: 1, tfoot: 1, tbody: 1, tr: 1 },
      tbody: { tr: 1 },
      td: c,
      textarea: l,
      tfoot: { tr: 1 },
      th: c,
      thead: { tr: 1 },
      time: d(b, { time: 1 }),
      title: l,
      tr: { th: 1, td: 1 },
      track: h,
      u: b,
      ul: { li: 1 },
      var: b,
      video: a({ source: 1, track: 1 }, c),
      wbr: h,
      acronym: b,
      applet: a({ param: 1 }, c),
      basefont: h,
      big: b,
      center: c,
      dialog: h,
      dir: { li: 1 },
      font: b,
      isindex: h,
      noframes: c,
      strike: b,
      tt: b
    }; a(d, {
      $block: a({ audio: 1, dd: 1, dt: 1, figcaption: 1, li: 1, video: 1 }, e, m),
      $blockLimit: {
        article: 1,
        aside: 1,
        audio: 1,
        body: 1,
        caption: 1,
        details: 1,
        dir: 1,
        div: 1,
        dl: 1,
        fieldset: 1,
        figcaption: 1,
        figure: 1,
        footer: 1,
        form: 1,
        header: 1,
        hgroup: 1,
        main: 1,
        menu: 1,
        nav: 1,
        ol: 1,
        section: 1,
        table: 1,
        td: 1,
        th: 1,
        tr: 1,
        ul: 1,
        video: 1
      },
      $cdata: { script: 1, style: 1 },
      $editable: { address: 1, article: 1, aside: 1, blockquote: 1, body: 1, details: 1, div: 1, fieldset: 1, figcaption: 1, footer: 1, form: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, header: 1, hgroup: 1, main: 1, nav: 1, p: 1, pre: 1, section: 1 },
      $empty: {
        area: 1,
        base: 1,
        basefont: 1,
        br: 1,
        col: 1,
        command: 1,
        dialog: 1,
        embed: 1,
        hr: 1,
        img: 1,
        input: 1,
        isindex: 1,
        keygen: 1,
        link: 1,
        meta: 1,
        param: 1,
        source: 1,
        track: 1,
        wbr: 1
      },
      $inline: b,
      $list: { dl: 1, ol: 1, ul: 1 },
      $listItem: { dd: 1, dt: 1, li: 1 },
      $nonBodyContent: a({ body: 1, head: 1, html: 1 }, d.head),
      $nonEditable: { applet: 1, audio: 1, button: 1, embed: 1, iframe: 1, map: 1, object: 1, option: 1, param: 1, script: 1, textarea: 1, video: 1 },
      $object: { applet: 1, audio: 1, button: 1, hr: 1, iframe: 1, img: 1, input: 1, object: 1, select: 1, table: 1, textarea: 1, video: 1 },
      $removeEmpty: {
        abbr: 1,
        acronym: 1,
        b: 1,
        bdi: 1,
        bdo: 1,
        big: 1,
        cite: 1,
        code: 1,
        del: 1,
        dfn: 1,
        em: 1,
        font: 1,
        i: 1,
        ins: 1,
        label: 1,
        kbd: 1,
        mark: 1,
        meter: 1,
        output: 1,
        q: 1,
        ruby: 1,
        s: 1,
        samp: 1,
        small: 1,
        span: 1,
        strike: 1,
        strong: 1,
        sub: 1,
        sup: 1,
        time: 1,
        tt: 1,
        u: 1,
        var: 1
      },
      $tabIndex: { a: 1, area: 1, button: 1, input: 1, object: 1, select: 1, textarea: 1 },
      $tableContent: { caption: 1, col: 1, colgroup: 1, tbody: 1, td: 1, tfoot: 1, th: 1, thead: 1, tr: 1 },
      $transparent: { a: 1, audio: 1, canvas: 1, del: 1, ins: 1, map: 1, noscript: 1, object: 1, video: 1 },
      $intermediate: { caption: 1, colgroup: 1, dd: 1, dt: 1, figcaption: 1, legend: 1, li: 1, optgroup: 1, option: 1, rp: 1, rt: 1, summary: 1, tbody: 1, td: 1, tfoot: 1, th: 1, thead: 1, tr: 1 }
    }); return d
  }())
  CKEDITOR.dom.event = function (a) { this.$ = a }
  CKEDITOR.dom.event.prototype = {
    getKey: function () { return this.$.keyCode || this.$.which },
    getKeystroke: function () { let a = this.getKey(); if (this.$.ctrlKey || this.$.metaKey)a += CKEDITOR.CTRL; this.$.shiftKey && (a += CKEDITOR.SHIFT); this.$.altKey && (a += CKEDITOR.ALT); return a },
    preventDefault: function (a) { const d = this.$; d.preventDefault ? d.preventDefault() : d.returnValue = !1; a && this.stopPropagation() },
    stopPropagation: function () { const a = this.$; a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0 },
    getTarget: function () {
      const a =
this.$.target || this.$.srcElement; return a ? new CKEDITOR.dom.node(a) : null
    },
    getPhase: function () { return this.$.eventPhase || 2 },
    getPageOffset: function () { const a = this.getTarget().getDocument().$; return { x: this.$.pageX || this.$.clientX + (a.documentElement.scrollLeft || a.body.scrollLeft), y: this.$.pageY || this.$.clientY + (a.documentElement.scrollTop || a.body.scrollTop) } }
  }; CKEDITOR.CTRL = 1114112; CKEDITOR.SHIFT = 2228224; CKEDITOR.ALT = 4456448; CKEDITOR.EVENT_PHASE_CAPTURING = 1; CKEDITOR.EVENT_PHASE_AT_TARGET = 2
  CKEDITOR.EVENT_PHASE_BUBBLING = 3; CKEDITOR.dom.domObject = function (a) { a && (this.$ = a) }
  CKEDITOR.dom.domObject.prototype = (function () {
    const a = function (a, b) { return function (c) { typeof CKEDITOR !== 'undefined' && a.fire(b, new CKEDITOR.dom.event(c)) } }; return {
      getPrivate: function () { let a; (a = this.getCustomData('_')) || this.setCustomData('_', a = {}); return a },
      on: function (d) {
        let b = this.getCustomData('_cke_nativeListeners'); b || (b = {}, this.setCustomData('_cke_nativeListeners', b)); b[d] || (b = b[d] = a(this, d), this.$.addEventListener
          ? this.$.addEventListener(d, b, !!CKEDITOR.event.useCapture)
          : this.$.attachEvent && this.$.attachEvent('on' +
d, b)); return CKEDITOR.event.prototype.on.apply(this, arguments)
      },
      removeListener: function (a) { CKEDITOR.event.prototype.removeListener.apply(this, arguments); if (!this.hasListeners(a)) { const b = this.getCustomData('_cke_nativeListeners'); const c = b && b[a]; c && (this.$.removeEventListener ? this.$.removeEventListener(a, c, !1) : this.$.detachEvent && this.$.detachEvent('on' + a, c), delete b[a]) } },
      removeAllListeners: function () {
        const a = this.getCustomData('_cke_nativeListeners'); let b; for (b in a) {
          const c = a[b]; this.$.detachEvent
            ? this.$.detachEvent('on' +
b, c)
            : this.$.removeEventListener && this.$.removeEventListener(b, c, !1); delete a[b]
        }CKEDITOR.event.prototype.removeAllListeners.call(this)
      }
    }
  }());
  (function (a) {
    let d = {}; CKEDITOR.on('reset', function () { d = {} }); a.equals = function (a) { try { return a && a.$ === this.$ } catch (c) { return !1 } }; a.setCustomData = function (a, c) { const e = this.getUniqueId(); (d[e] || (d[e] = {}))[a] = c; return this }; a.getCustomData = function (a) { let c = this.$['data-cke-expando']; return (c = c && d[c]) && a in c ? c[a] : null }; a.removeCustomData = function (a) { var c = this.$['data-cke-expando']; var c = c && d[c]; let e; let g; c && (e = c[a], g = a in c, delete c[a]); return g ? e : null }; a.clearCustomData = function () {
      this.removeAllListeners(); const a =
this.$['data-cke-expando']; a && delete d[a]
    }; a.getUniqueId = function () { return this.$['data-cke-expando'] || (this.$['data-cke-expando'] = CKEDITOR.tools.getNextNumber()) }; CKEDITOR.event.implementOn(a)
  })(CKEDITOR.dom.domObject.prototype)
  CKEDITOR.dom.node = function (a) { return a ? new CKEDITOR.dom[a.nodeType == CKEDITOR.NODE_DOCUMENT ? 'document' : a.nodeType == CKEDITOR.NODE_ELEMENT ? 'element' : a.nodeType == CKEDITOR.NODE_TEXT ? 'text' : a.nodeType == CKEDITOR.NODE_COMMENT ? 'comment' : a.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT ? 'documentFragment' : 'domObject'](a) : this }; CKEDITOR.dom.node.prototype = new CKEDITOR.dom.domObject(); CKEDITOR.NODE_ELEMENT = 1; CKEDITOR.NODE_DOCUMENT = 9; CKEDITOR.NODE_TEXT = 3; CKEDITOR.NODE_COMMENT = 8; CKEDITOR.NODE_DOCUMENT_FRAGMENT = 11
  CKEDITOR.POSITION_IDENTICAL = 0; CKEDITOR.POSITION_DISCONNECTED = 1; CKEDITOR.POSITION_FOLLOWING = 2; CKEDITOR.POSITION_PRECEDING = 4; CKEDITOR.POSITION_IS_CONTAINED = 8; CKEDITOR.POSITION_CONTAINS = 16
  CKEDITOR.tools.extend(CKEDITOR.dom.node.prototype, {
    appendTo: function (a, d) { a.append(this, d); return a },
    clone: function (a, d) {
      function b (c) { c['data-cke-expando'] && (c['data-cke-expando'] = !1); if (c.nodeType == CKEDITOR.NODE_ELEMENT || c.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT) if (d || c.nodeType != CKEDITOR.NODE_ELEMENT || c.removeAttribute('id', !1), a) { c = c.childNodes; for (let e = 0; e < c.length; e++)b(c[e]) } } function c (b) {
        if (b.type == CKEDITOR.NODE_ELEMENT || b.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
          if (b.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
            var d =
b.getName(); d[0] == ':' && b.renameNode(d.substring(1))
          } if (a) for (d = 0; d < b.getChildCount(); d++)c(b.getChild(d))
        }
      } let e = this.$.cloneNode(a); b(e); e = new CKEDITOR.dom.node(e); CKEDITOR.env.ie && CKEDITOR.env.version < 9 && (this.type == CKEDITOR.NODE_ELEMENT || this.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) && c(e); return e
    },
    hasPrevious: function () { return !!this.$.previousSibling },
    hasNext: function () { return !!this.$.nextSibling },
    insertAfter: function (a) { a.$.parentNode.insertBefore(this.$, a.$.nextSibling); return a },
    insertBefore: function (a) {
      a.$.parentNode.insertBefore(this.$,
        a.$); return a
    },
    insertBeforeMe: function (a) { this.$.parentNode.insertBefore(a.$, this.$); return a },
    getAddress: function (a) { for (var d = [], b = this.getDocument().$.documentElement, c = this.$; c && c != b;) { const e = c.parentNode; e && d.unshift(this.getIndex.call({ $: c }, a)); c = e } return d },
    getDocument: function () { return new CKEDITOR.dom.document(this.$.ownerDocument || this.$.parentNode.ownerDocument) },
    getIndex: function (a) {
      function d (a, c) {
        const m = c ? a.nextSibling : a.previousSibling; return m && m.nodeType == CKEDITOR.NODE_TEXT
          ? b(m)
            ? d(m,
              c)
            : m
          : null
      } function b (a) { return !a.nodeValue || a.nodeValue == CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE } let c = this.$; let e = -1; let g; if (!this.$.parentNode || a && c.nodeType == CKEDITOR.NODE_TEXT && b(c) && !d(c) && !d(c, !0)) return -1; do a && c != this.$ && c.nodeType == CKEDITOR.NODE_TEXT && (g || b(c)) || (e++, g = c.nodeType == CKEDITOR.NODE_TEXT); while (c = c.previousSibling); return e
    },
    getNextSourceNode: function (a, d, b) {
      if (b && !b.call) { const c = b; b = function (a) { return !a.equals(c) } }a = !a && this.getFirst && this.getFirst(); let e; if (!a) {
        if (this.type ==
CKEDITOR.NODE_ELEMENT && b && !1 === b(this, !0)) return null; a = this.getNext()
      } for (;!a && (e = (e || this).getParent());) { if (b && !1 === b(e, !0)) return null; a = e.getNext() } return !a || b && !1 === b(a) ? null : d && d != a.type ? a.getNextSourceNode(!1, d, b) : a
    },
    getPreviousSourceNode: function (a, d, b) {
      if (b && !b.call) { const c = b; b = function (a) { return !a.equals(c) } }a = !a && this.getLast && this.getLast(); let e; if (!a) { if (this.type == CKEDITOR.NODE_ELEMENT && b && !1 === b(this, !0)) return null; a = this.getPrevious() } for (;!a && (e = (e || this).getParent());) {
        if (b && !1 ===
b(e, !0)) return null; a = e.getPrevious()
      } return !a || b && !1 === b(a) ? null : d && a.type != d ? a.getPreviousSourceNode(!1, d, b) : a
    },
    getPrevious: function (a) { let d = this.$; let b; do b = (d = d.previousSibling) && d.nodeType != 10 && new CKEDITOR.dom.node(d); while (b && a && !a(b)); return b },
    getNext: function (a) { let d = this.$; let b; do b = (d = d.nextSibling) && new CKEDITOR.dom.node(d); while (b && a && !a(b)); return b },
    getParent: function (a) {
      const d = this.$.parentNode; return d && (d.nodeType == CKEDITOR.NODE_ELEMENT || a && d.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT)
        ? new CKEDITOR.dom.node(d)
        : null
    },
    getParents: function (a) { let d = this; const b = []; do b[a ? 'push' : 'unshift'](d); while (d = d.getParent()); return b },
    getCommonAncestor: function (a) { if (a.equals(this)) return this; if (a.contains && a.contains(this)) return a; let d = this.contains ? this : this.getParent(); do if (d.contains(a)) return d; while (d = d.getParent()); return null },
    getPosition: function (a) {
      let d = this.$; var b = a.$; if (d.compareDocumentPosition) return d.compareDocumentPosition(b); if (d == b) return CKEDITOR.POSITION_IDENTICAL; if (this.type ==
CKEDITOR.NODE_ELEMENT && a.type == CKEDITOR.NODE_ELEMENT) { if (d.contains) { if (d.contains(b)) return CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING; if (b.contains(d)) return CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING } if ('sourceIndex' in d) return d.sourceIndex < 0 || b.sourceIndex < 0 ? CKEDITOR.POSITION_DISCONNECTED : d.sourceIndex < b.sourceIndex ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING }d = this.getAddress(); a = a.getAddress(); for (var b = Math.min(d.length, a.length), c = 0; c < b; c++) {
        if (d[c] !=
a[c]) return d[c] < a[c] ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING
      } return d.length < a.length ? CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
    },
    getAscendant: function (a, d) {
      let b = this.$; let c; let e; d || (b = b.parentNode); typeof a === 'function' ? (e = !0, c = a) : (e = !1, c = function (b) { b = typeof b.nodeName === 'string' ? b.nodeName.toLowerCase() : ''; return typeof a === 'string' ? b == a : b in a }); for (;b;) {
        if (c(e ? new CKEDITOR.dom.node(b) : b)) return new CKEDITOR.dom.node(b)
        try { b = b.parentNode } catch (g) { b = null }
      } return null
    },
    hasAscendant: function (a, d) { let b = this.$; d || (b = b.parentNode); for (;b;) { if (b.nodeName && b.nodeName.toLowerCase() == a) return !0; b = b.parentNode } return !1 },
    move: function (a, d) { a.append(this.remove(), d) },
    remove: function (a) { const d = this.$; const b = d.parentNode; if (b) { if (a) for (;a = d.firstChild;)b.insertBefore(d.removeChild(a), d); b.removeChild(d) } return this },
    replace: function (a) { this.insertBefore(a); a.remove() },
    trim: function () { this.ltrim(); this.rtrim() },
    ltrim: function () {
      for (var a; this.getFirst &&
(a = this.getFirst());) { if (a.type == CKEDITOR.NODE_TEXT) { const d = CKEDITOR.tools.ltrim(a.getText()); const b = a.getLength(); if (d)d.length < b && (a.split(b - d.length), this.$.removeChild(this.$.firstChild)); else { a.remove(); continue } } break }
    },
    rtrim: function () {
      for (var a; this.getLast && (a = this.getLast());) { if (a.type == CKEDITOR.NODE_TEXT) { const d = CKEDITOR.tools.rtrim(a.getText()); const b = a.getLength(); if (d)d.length < b && (a.split(d.length), this.$.lastChild.parentNode.removeChild(this.$.lastChild)); else { a.remove(); continue } } break }CKEDITOR.env.needsBrFiller &&
(a = this.$.lastChild) && a.type == 1 && a.nodeName.toLowerCase() == 'br' && a.parentNode.removeChild(a)
    },
    isReadOnly: function (a) { let d = this; this.type != CKEDITOR.NODE_ELEMENT && (d = this.getParent()); CKEDITOR.env.edge && d && d.is('textarea', 'input') && (a = !0); if (!a && d && typeof d.$.isContentEditable !== 'undefined') return !(d.$.isContentEditable || d.data('cke-editable')); for (;d;) { if (d.data('cke-editable')) return !1; if (d.hasAttribute('contenteditable')) return d.getAttribute('contenteditable') == 'false'; d = d.getParent() } return !0 }
  })
  CKEDITOR.dom.window = function (a) { CKEDITOR.dom.domObject.call(this, a) }; CKEDITOR.dom.window.prototype = new CKEDITOR.dom.domObject()
  CKEDITOR.tools.extend(CKEDITOR.dom.window.prototype, {
    focus: function () { this.$.focus() },
    getViewPaneSize: function () { const a = this.$.document; const d = a.compatMode == 'CSS1Compat'; return { width: (d ? a.documentElement.clientWidth : a.body.clientWidth) || 0, height: (d ? a.documentElement.clientHeight : a.body.clientHeight) || 0 } },
    getScrollPosition: function () {
      let a = this.$; if ('pageXOffset' in a) return { x: a.pageXOffset || 0, y: a.pageYOffset || 0 }; a = a.document; return {
        x: a.documentElement.scrollLeft || a.body.scrollLeft || 0,
        y: a.documentElement.scrollTop ||
a.body.scrollTop || 0
      }
    },
    getFrame: function () { const a = this.$.frameElement; return a ? new CKEDITOR.dom.element.get(a) : null }
  }); CKEDITOR.dom.document = function (a) { CKEDITOR.dom.domObject.call(this, a) }; CKEDITOR.dom.document.prototype = new CKEDITOR.dom.domObject()
  CKEDITOR.tools.extend(CKEDITOR.dom.document.prototype, {
    type: CKEDITOR.NODE_DOCUMENT,
    appendStyleSheet: function (a) { if (this.$.createStyleSheet) this.$.createStyleSheet(a); else { const d = new CKEDITOR.dom.element('link'); d.setAttributes({ rel: 'stylesheet', type: 'text/css', href: a }); this.getHead().append(d) } },
    appendStyleText: function (a) {
      if (this.$.createStyleSheet) { var d = this.$.createStyleSheet(''); d.cssText = a } else { var b = new CKEDITOR.dom.element('style', this); b.append(new CKEDITOR.dom.text(a, this)); this.getHead().append(b) } return d ||
b.$.sheet
    },
    createElement: function (a, d) { const b = new CKEDITOR.dom.element(a, this); d && (d.attributes && b.setAttributes(d.attributes), d.styles && b.setStyles(d.styles)); return b },
    createText: function (a) { return new CKEDITOR.dom.text(a, this) },
    focus: function () { this.getWindow().focus() },
    getActive: function () { let a; try { a = this.$.activeElement } catch (d) { return null } return new CKEDITOR.dom.element(a) },
    getById: function (a) { return (a = this.$.getElementById(a)) ? new CKEDITOR.dom.element(a) : null },
    getByAddress: function (a, d) {
      for (var b =
this.$.documentElement, c = 0; b && c < a.length; c++) { const e = a[c]; if (d) for (let g = -1, h = 0; h < b.childNodes.length; h++) { const l = b.childNodes[h]; if (!0 !== d || l.nodeType != 3 || !l.previousSibling || l.previousSibling.nodeType != 3) if (g++, g == e) { b = l; break } } else b = b.childNodes[e] } return b ? new CKEDITOR.dom.node(b) : null
    },
    getElementsByTag: function (a, d) { CKEDITOR.env.ie && document.documentMode <= 8 || !d || (a = d + ':' + a); return new CKEDITOR.dom.nodeList(this.$.getElementsByTagName(a)) },
    getHead: function () {
      let a = this.$.getElementsByTagName('head')[0]
      return a = a ? new CKEDITOR.dom.element(a) : this.getDocumentElement().append(new CKEDITOR.dom.element('head'), !0)
    },
    getBody: function () { return new CKEDITOR.dom.element(this.$.body) },
    getDocumentElement: function () { return new CKEDITOR.dom.element(this.$.documentElement) },
    getWindow: function () { return new CKEDITOR.dom.window(this.$.parentWindow || this.$.defaultView) },
    write: function (a) {
      this.$.open('text/html', 'replace'); CKEDITOR.env.ie && (a = a.replace(/(?:^\s*<!DOCTYPE[^>]*?>)|^/i, '$\x26\n\x3cscript data-cke-temp\x3d"1"\x3e(' +
CKEDITOR.tools.fixDomain + ')();\x3c/script\x3e')); this.$.write(a); this.$.close()
    },
    find: function (a) { return new CKEDITOR.dom.nodeList(this.$.querySelectorAll(a)) },
    findOne: function (a) { return (a = this.$.querySelector(a)) ? new CKEDITOR.dom.element(a) : null },
    _getHtml5ShivFrag: function () { let a = this.getCustomData('html5ShivFrag'); a || (a = this.$.createDocumentFragment(), CKEDITOR.tools.enableHtml5Elements(a, !0), this.setCustomData('html5ShivFrag', a)); return a }
  }); CKEDITOR.dom.nodeList = function (a) { this.$ = a }
  CKEDITOR.dom.nodeList.prototype = { count: function () { return this.$.length }, getItem: function (a) { return a < 0 || a >= this.$.length ? null : (a = this.$[a]) ? new CKEDITOR.dom.node(a) : null } }; CKEDITOR.dom.element = function (a, d) { typeof a === 'string' && (a = (d ? d.$ : document).createElement(a)); CKEDITOR.dom.domObject.call(this, a) }; CKEDITOR.dom.element.get = function (a) { return (a = typeof a === 'string' ? document.getElementById(a) || document.getElementsByName(a)[0] : a) && (a.$ ? a : new CKEDITOR.dom.element(a)) }; CKEDITOR.dom.element.prototype = new CKEDITOR.dom.node()
  CKEDITOR.dom.element.createFromHtml = function (a, d) { const b = new CKEDITOR.dom.element('div', d); b.setHtml(a); return b.getFirst().remove() }; CKEDITOR.dom.element.setMarker = function (a, d, b, c) { const e = d.getCustomData('list_marker_id') || d.setCustomData('list_marker_id', CKEDITOR.tools.getNextNumber()).getCustomData('list_marker_id'); const g = d.getCustomData('list_marker_names') || d.setCustomData('list_marker_names', {}).getCustomData('list_marker_names'); a[e] = d; g[b] = 1; return d.setCustomData(b, c) }
  CKEDITOR.dom.element.clearAllMarkers = function (a) { for (const d in a)CKEDITOR.dom.element.clearMarkers(a, a[d], 1) }; CKEDITOR.dom.element.clearMarkers = function (a, d, b) { const c = d.getCustomData('list_marker_names'); const e = d.getCustomData('list_marker_id'); let g; for (g in c)d.removeCustomData(g); d.removeCustomData('list_marker_names'); b && (d.removeCustomData('list_marker_id'), delete a[e]) };
  (function () {
    function a (a, b) { return (' ' + a + ' ').replace(g, ' ').indexOf(' ' + b + ' ') > -1 } function d (a) { let b = !0; a.$.id || (a.$.id = 'cke_tmp_' + CKEDITOR.tools.getNextNumber(), b = !1); return function () { b || a.removeAttribute('id') } } function b (a, b) { const c = CKEDITOR.tools.escapeCss(a.$.id); return '#' + c + ' ' + b.split(/,\s*/).join(', #' + c + ' ') } function c (a) { for (var b = 0, c = 0, f = h[a].length; c < f; c++)b += parseInt(this.getComputedStyle(h[a][c]) || 0, 10) || 0; return b } var e = document.createElement('_').classList; var e = typeof e !== 'undefined' &&
String(e.add).match(/\[Native code\]/gi) !== null; var g = /[\n\t\r]/g; CKEDITOR.tools.extend(CKEDITOR.dom.element.prototype, {
      type: CKEDITOR.NODE_ELEMENT,
      addClass: e ? function (a) { this.$.classList.add(a); return this } : function (b) { let c = this.$.className; c && (a(c, b) || (c += ' ' + b)); this.$.className = c || b; return this },
      removeClass: e
        ? function (a) { const b = this.$; b.classList.remove(a); b.className || b.removeAttribute('class'); return this }
        : function (b) {
          let c = this.getAttribute('class'); c && a(c, b) && ((c = c.replace(new RegExp('(?:^|\\s+)' +
b + '(?\x3d\\s|$)'), '').replace(/^\s+/, ''))
            ? this.setAttribute('class', c)
            : this.removeAttribute('class')); return this
        },
      hasClass: function (b) { return a(this.$.className, b) },
      append: function (a, b) { typeof a === 'string' && (a = this.getDocument().createElement(a)); b ? this.$.insertBefore(a.$, this.$.firstChild) : this.$.appendChild(a.$); return a },
      appendHtml: function (a) { if (this.$.childNodes.length) { const b = new CKEDITOR.dom.element('div', this.getDocument()); b.setHtml(a); b.moveChildren(this) } else this.setHtml(a) },
      appendText: function (a) {
        this.$.text !=
null && CKEDITOR.env.ie && CKEDITOR.env.version < 9
          ? this.$.text += a
          : this.append(new CKEDITOR.dom.text(a))
      },
      appendBogus: function (a) { if (a || CKEDITOR.env.needsBrFiller) { for (a = this.getLast(); a && a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.rtrim(a.getText());)a = a.getPrevious(); a && a.is && a.is('br') || (a = this.getDocument().createElement('br'), CKEDITOR.env.gecko && a.setAttribute('type', '_moz'), this.append(a)) } },
      breakParent: function (a, b) {
        let c = new CKEDITOR.dom.range(this.getDocument()); c.setStartAfter(this); c.setEndAfter(a)
        const f = c.extractContents(!1, b || !1); let d; c.insertNode(this.remove()); if (CKEDITOR.env.ie && !CKEDITOR.env.edge) { for (c = new CKEDITOR.dom.element('div'); d = f.getFirst();)d.$.style.backgroundColor && (d.$.style.backgroundColor = d.$.style.backgroundColor), c.append(d); c.insertAfter(this); c.remove(!0) } else f.insertAfterNode(this)
      },
      contains: document.compareDocumentPosition
        ? function (a) { return !!(this.$.compareDocumentPosition(a.$) & 16) }
        : function (a) {
          const b = this.$; return a.type != CKEDITOR.NODE_ELEMENT
            ? b.contains(a.getParent().$)
            : b != a.$ && b.contains(a.$)
        },
      focus: (function () { function a () { try { this.$.focus() } catch (b) {} } return function (b) { b ? CKEDITOR.tools.setTimeout(a, 100, this) : a.call(this) } }()),
      getHtml: function () { const a = this.$.innerHTML; return CKEDITOR.env.ie ? a.replace(/<\?[^>]*>/g, '') : a },
      getOuterHtml: function () { if (this.$.outerHTML) return this.$.outerHTML.replace(/<\?[^>]*>/, ''); const a = this.$.ownerDocument.createElement('div'); a.appendChild(this.$.cloneNode(!0)); return a.innerHTML },
      getClientRect: function () {
        const a = CKEDITOR.tools.extend({},
          this.$.getBoundingClientRect()); !a.width && (a.width = a.right - a.left); !a.height && (a.height = a.bottom - a.top); return a
      },
      setHtml: CKEDITOR.env.ie && CKEDITOR.env.version < 9
        ? function (a) { try { var b = this.$; if (this.getParent()) return b.innerHTML = a; const c = this.getDocument()._getHtml5ShivFrag(); c.appendChild(b); b.innerHTML = a; c.removeChild(b); return a } catch (f) { this.$.innerHTML = ''; b = new CKEDITOR.dom.element('body', this.getDocument()); b.$.innerHTML = a; for (b = b.getChildren(); b.count();) this.append(b.getItem(0)); return a } }
        : function (a) { return this.$.innerHTML = a },
      setText: (function () { let a = document.createElement('p'); a.innerHTML = 'x'; a = a.textContent; return function (b) { this.$[a ? 'textContent' : 'innerText'] = b } }()),
      getAttribute: (function () {
        const a = function (a) { return this.$.getAttribute(a, 2) }; return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks)
          ? function (a) {
            switch (a) {
              case 'class':a = 'className'; break; case 'http-equiv':a = 'httpEquiv'; break; case 'name':return this.$.name; case 'tabindex':return a = this.$.getAttribute(a,
                2), a !== 0 && this.$.tabIndex === 0 && (a = null), a; case 'checked':return a = this.$.attributes.getNamedItem(a), (a.specified ? a.nodeValue : this.$.checked) ? 'checked' : null; case 'hspace':case 'value':return this.$[a]; case 'style':return this.$.style.cssText; case 'contenteditable':case 'contentEditable':return this.$.attributes.getNamedItem('contentEditable').specified ? this.$.getAttribute('contentEditable') : null
            } return this.$.getAttribute(a, 2)
          }
          : a
      }()),
      getAttributes: function (a) {
        const b = {}; const c = this.$.attributes; let f; a = CKEDITOR.tools.isArray(a)
          ? a
          : []; for (f = 0; f < c.length; f++)CKEDITOR.tools.indexOf(a, c[f].name) === -1 && (b[c[f].name] = c[f].value); return b
      },
      getChildren: function () { return new CKEDITOR.dom.nodeList(this.$.childNodes) },
      getComputedStyle: document.defaultView && document.defaultView.getComputedStyle ? function (a) { const b = this.getWindow().$.getComputedStyle(this.$, null); return b ? b.getPropertyValue(a) : '' } : function (a) { return this.$.currentStyle[CKEDITOR.tools.cssStyleToDomStyle(a)] },
      getDtd: function () {
        const a = CKEDITOR.dtd[this.getName()]; this.getDtd =
function () { return a }; return a
      },
      getElementsByTag: CKEDITOR.dom.document.prototype.getElementsByTag,
      getTabIndex: function () { const a = this.$.tabIndex; return a !== 0 || CKEDITOR.dtd.$tabIndex[this.getName()] || parseInt(this.getAttribute('tabindex'), 10) === 0 ? a : -1 },
      getText: function () { return this.$.textContent || this.$.innerText || '' },
      getWindow: function () { return this.getDocument().getWindow() },
      getId: function () { return this.$.id || null },
      getNameAtt: function () { return this.$.name || null },
      getName: function () {
        let a = this.$.nodeName.toLowerCase()
        if (CKEDITOR.env.ie && document.documentMode <= 8) { const b = this.$.scopeName; b != 'HTML' && (a = b.toLowerCase() + ':' + a) } this.getName = function () { return a }; return this.getName()
      },
      getValue: function () { return this.$.value },
      getFirst: function (a) { let b = this.$.firstChild; (b = b && new CKEDITOR.dom.node(b)) && a && !a(b) && (b = b.getNext(a)); return b },
      getLast: function (a) { let b = this.$.lastChild; (b = b && new CKEDITOR.dom.node(b)) && a && !a(b) && (b = b.getPrevious(a)); return b },
      getStyle: function (a) { return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)] },
      is: function () { const a = this.getName(); if (typeof arguments[0] === 'object') return !!arguments[0][a]; for (let b = 0; b < arguments.length; b++) if (arguments[b] == a) return !0; return !1 },
      isEditable: function (a) {
        const b = this.getName(); return this.isReadOnly() || this.getComputedStyle('display') == 'none' || this.getComputedStyle('visibility') == 'hidden' || CKEDITOR.dtd.$nonEditable[b] || CKEDITOR.dtd.$empty[b] || this.is('a') && (this.data('cke-saved-name') || this.hasAttribute('name')) && !this.getChildCount()
          ? !1
          : !1 !== a
              ? (a = CKEDITOR.dtd[b] ||
CKEDITOR.dtd.span, !(!a || !a['#']))
              : !0
      },
      isIdentical: function (a) {
        let b = this.clone(0, 1); a = a.clone(0, 1); b.removeAttributes(['_moz_dirty', 'data-cke-expando', 'data-cke-saved-href', 'data-cke-saved-name']); a.removeAttributes(['_moz_dirty', 'data-cke-expando', 'data-cke-saved-href', 'data-cke-saved-name']); if (b.$.isEqualNode) return b.$.style.cssText = CKEDITOR.tools.normalizeCssText(b.$.style.cssText), a.$.style.cssText = CKEDITOR.tools.normalizeCssText(a.$.style.cssText), b.$.isEqualNode(a.$); b = b.getOuterHtml(); a =
a.getOuterHtml(); if (CKEDITOR.env.ie && CKEDITOR.env.version < 9 && this.is('a')) { let c = this.getParent(); c.type == CKEDITOR.NODE_ELEMENT && (c = c.clone(), c.setHtml(b), b = c.getHtml(), c.setHtml(a), a = c.getHtml()) } return b == a
      },
      isVisible: function () { let a = (this.$.offsetHeight || this.$.offsetWidth) && this.getComputedStyle('visibility') != 'hidden'; let b; let c; a && CKEDITOR.env.webkit && (b = this.getWindow(), !b.equals(CKEDITOR.document.getWindow()) && (c = b.$.frameElement) && (a = (new CKEDITOR.dom.element(c)).isVisible())); return !!a },
      isEmptyInlineRemoveable: function () {
        if (!CKEDITOR.dtd.$removeEmpty[this.getName()]) return !1
        for (let a = this.getChildren(), b = 0, c = a.count(); b < c; b++) { const f = a.getItem(b); if (f.type != CKEDITOR.NODE_ELEMENT || !f.data('cke-bookmark')) if (f.type == CKEDITOR.NODE_ELEMENT && !f.isEmptyInlineRemoveable() || f.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(f.getText())) return !1 } return !0
      },
      hasAttributes: CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks)
        ? function () {
          for (let a = this.$.attributes, b = 0; b < a.length; b++) {
            const c = a[b]; switch (c.nodeName) {
              case 'class':if (this.getAttribute('class')) return !0; case 'data-cke-expando':continue
              default:if (c.specified) return !0
            }
          } return !1
        }
        : function () { const a = this.$.attributes; const b = a.length; const c = { 'data-cke-expando': 1, _moz_dirty: 1 }; return b > 0 && (b > 2 || !c[a[0].nodeName] || b == 2 && !c[a[1].nodeName]) },
      hasAttribute: (function () {
        function a (b) {
          const c = this.$.attributes.getNamedItem(b); if (this.getName() == 'input') switch (b) { case 'class':return this.$.className.length > 0; case 'checked':return !!this.$.checked; case 'value':return b = this.getAttribute('type'), b == 'checkbox' || b == 'radio' ? this.$.value != 'on' : !!this.$.value } return c
            ? c.specified
            : !1
        } return CKEDITOR.env.ie ? CKEDITOR.env.version < 8 ? function (b) { return b == 'name' ? !!this.$.name : a.call(this, b) } : a : function (a) { return !!this.$.attributes.getNamedItem(a) }
      }()),
      hide: function () { this.setStyle('display', 'none') },
      moveChildren: function (a, b) { const c = this.$; a = a.$; if (c != a) { let f; if (b) for (;f = c.lastChild;)a.insertBefore(c.removeChild(f), a.firstChild); else for (;f = c.firstChild;)a.appendChild(c.removeChild(f)) } },
      mergeSiblings: (function () {
        function a (b, c, f) {
          if (c && c.type == CKEDITOR.NODE_ELEMENT) {
            for (var d =
[]; c.data('cke-bookmark') || c.isEmptyInlineRemoveable();) if (d.push(c), c = f ? c.getNext() : c.getPrevious(), !c || c.type != CKEDITOR.NODE_ELEMENT) return; if (b.isIdentical(c)) { for (var l = f ? b.getLast() : b.getFirst(); d.length;)d.shift().move(b, !f); c.moveChildren(b, !f); c.remove(); l && l.type == CKEDITOR.NODE_ELEMENT && l.mergeSiblings() }
          }
        } return function (b) { if (!1 === b || CKEDITOR.dtd.$removeEmpty[this.getName()] || this.is('a'))a(this, this.getNext(), !0), a(this, this.getPrevious()) }
      }()),
      show: function () {
        this.setStyles({
          display: '',
          visibility: ''
        })
      },
      setAttribute: (function () {
        const a = function (a, b) { this.$.setAttribute(a, b); return this }; return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks)
          ? function (b, c) { b == 'class' ? this.$.className = c : b == 'style' ? this.$.style.cssText = c : b == 'tabindex' ? this.$.tabIndex = c : b == 'checked' ? this.$.checked = c : b == 'contenteditable' ? a.call(this, 'contentEditable', c) : a.apply(this, arguments); return this }
          : CKEDITOR.env.ie8Compat && CKEDITOR.env.secure
            ? function (b, c) {
              if (b == 'src' && c.match(/^http:\/\//)) {
                try {
                  a.apply(this,
                    arguments)
                } catch (f) {}
              } else a.apply(this, arguments); return this
            }
            : a
      }()),
      setAttributes: function (a) { for (const b in a) this.setAttribute(b, a[b]); return this },
      setValue: function (a) { this.$.value = a; return this },
      removeAttribute: (function () { const a = function (a) { this.$.removeAttribute(a) }; return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function (a) { a == 'class' ? a = 'className' : a == 'tabindex' ? a = 'tabIndex' : a == 'contenteditable' && (a = 'contentEditable'); this.$.removeAttribute(a) } : a }()),
      removeAttributes: function (a) {
        if (CKEDITOR.tools.isArray(a)) {
          for (var b =
0; b < a.length; b++) this.removeAttribute(a[b])
        } else for (b in a = a || this.getAttributes(), a)a.hasOwnProperty(b) && this.removeAttribute(b)
      },
      removeStyle: function (a) {
        var b = this.$.style; if (b.removeProperty || a != 'border' && a != 'margin' && a != 'padding')b.removeProperty ? b.removeProperty(a) : b.removeAttribute(CKEDITOR.tools.cssStyleToDomStyle(a)), this.$.style.cssText || this.removeAttribute('style'); else {
          const c = ['top', 'left', 'right', 'bottom']; let f; a == 'border' && (f = ['color', 'style', 'width']); for (var b = [], d = 0; d < c.length; d++) {
            if (f) {
              for (let u =
0; u < f.length; u++)b.push([a, c[d], f[u]].join('-'))
            } else b.push([a, c[d]].join('-'))
          } for (a = 0; a < b.length; a++) this.removeStyle(b[a])
        }
      },
      setStyle: function (a, b) { this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)] = b; return this },
      setStyles: function (a) { for (const b in a) this.setStyle(b, a[b]); return this },
      setOpacity: function (a) { CKEDITOR.env.ie && CKEDITOR.env.version < 9 ? (a = Math.round(100 * a), this.setStyle('filter', a >= 100 ? '' : 'progid:DXImageTransform.Microsoft.Alpha(opacity\x3d' + a + ')')) : this.setStyle('opacity', a) },
      unselectable: function () {
        this.setStyles(CKEDITOR.tools.cssVendorPrefix('user-select',
          'none')); if (CKEDITOR.env.ie) { this.setAttribute('unselectable', 'on'); for (var a, b = this.getElementsByTag('*'), c = 0, f = b.count(); c < f; c++)a = b.getItem(c), a.setAttribute('unselectable', 'on') }
      },
      getPositionedAncestor: function () { for (let a = this; a.getName() != 'html';) { if (a.getComputedStyle('position') != 'static') return a; a = a.getParent() } return null },
      getDocumentPosition: function (a) {
        let b = 0; let c = 0; let f = this.getDocument(); const d = f.getBody(); const u = f.$.compatMode == 'BackCompat'; if (document.documentElement.getBoundingClientRect && (CKEDITOR.env.ie
          ? CKEDITOR.env.version !== 8
          : 1)) { var e = this.$.getBoundingClientRect(); const g = f.$.documentElement; var q = g.clientTop || d.$.clientTop || 0; var x = g.clientLeft || d.$.clientLeft || 0; let h = !0; CKEDITOR.env.ie && (h = f.getDocumentElement().contains(this), f = f.getBody().contains(this), h = u && f || !u && h); h && (CKEDITOR.env.webkit || CKEDITOR.env.ie && CKEDITOR.env.version >= 12 ? (b = d.$.scrollLeft || g.scrollLeft, c = d.$.scrollTop || g.scrollTop) : (c = u ? d.$ : g, b = c.scrollLeft, c = c.scrollTop), b = e.left + b - x, c = e.top + c - q) } else {
          for (q = this, x = null; q && q.getName() != 'body' &&
q.getName() != 'html';) { b += q.$.offsetLeft - q.$.scrollLeft; c += q.$.offsetTop - q.$.scrollTop; q.equals(this) || (b += q.$.clientLeft || 0, c += q.$.clientTop || 0); for (;x && !x.equals(q);)b -= x.$.scrollLeft, c -= x.$.scrollTop, x = x.getParent(); x = q; q = (e = q.$.offsetParent) ? new CKEDITOR.dom.element(e) : null }
        }a && (e = this.getWindow(), q = a.getWindow(), !e.equals(q) && e.$.frameElement && (a = (new CKEDITOR.dom.element(e.$.frameElement)).getDocumentPosition(a), b += a.x, c += a.y)); document.documentElement.getBoundingClientRect || !CKEDITOR.env.gecko ||
u || (b += this.$.clientLeft ? 1 : 0, c += this.$.clientTop ? 1 : 0); return { x: b, y: c }
      },
      scrollIntoView: function (a) { let b = this.getParent(); if (b) { do if ((b.$.clientWidth && b.$.clientWidth < b.$.scrollWidth || b.$.clientHeight && b.$.clientHeight < b.$.scrollHeight) && !b.is('body') && this.scrollIntoParent(b, a, 1), b.is('html')) { const c = b.getWindow(); try { const f = c.$.frameElement; f && (b = new CKEDITOR.dom.element(f)) } catch (d) {} } while (b = b.getParent()) } },
      scrollIntoParent: function (a, b, c) {
        let f, d, e, A; function g (b, c) {
          /body|html/.test(a.getName())
            ? a.getWindow().$.scrollBy(b, c)
            : (a.$.scrollLeft += b, a.$.scrollTop += c)
        } function q (a, b) { const c = { x: 0, y: 0 }; if (!a.is(h ? 'body' : 'html')) { var f = a.$.getBoundingClientRect(); c.x = f.left; c.y = f.top }f = a.getWindow(); f.equals(b) || (f = q(CKEDITOR.dom.element.get(f.$.frameElement), b), c.x += f.x, c.y += f.y); return c } function x (a, b) { return parseInt(a.getComputedStyle('margin-' + b) || 0, 10) || 0 }!a && (a = this.getWindow()); e = a.getDocument(); var h = e.$.compatMode == 'BackCompat'; a instanceof CKEDITOR.dom.window && (a = h ? e.getBody() : e.getDocumentElement())
        CKEDITOR.env.webkit && (e = this.getEditor(!1)) && (e._.previousScrollTop = null); e = a.getWindow(); d = q(this, e); const w = q(a, e); const E = this.$.offsetHeight; f = this.$.offsetWidth; const k = a.$.clientHeight; const p = a.$.clientWidth; e = d.x - x(this, 'left') - w.x || 0; A = d.y - x(this, 'top') - w.y || 0; f = d.x + f + x(this, 'right') - (w.x + p) || 0; d = d.y + E + x(this, 'bottom') - (w.y + k) || 0; (A < 0 || d > 0) && g(0, !0 === b ? A : !1 === b ? d : A < 0 ? A : d); c && (e < 0 || f > 0) && g(e < 0 ? e : f, 0)
      },
      setState: function (a, b, c) {
        b = b || 'cke'; switch (a) {
          case CKEDITOR.TRISTATE_ON:this.addClass(b + '_on'); this.removeClass(b +
'_off'); this.removeClass(b + '_disabled'); c && this.setAttribute('aria-pressed', !0); c && this.removeAttribute('aria-disabled'); break; case CKEDITOR.TRISTATE_DISABLED:this.addClass(b + '_disabled'); this.removeClass(b + '_off'); this.removeClass(b + '_on'); c && this.setAttribute('aria-disabled', !0); c && this.removeAttribute('aria-pressed'); break; default:this.addClass(b + '_off'), this.removeClass(b + '_on'), this.removeClass(b + '_disabled'), c && this.removeAttribute('aria-pressed'), c && this.removeAttribute('aria-disabled')
        }
      },
      getFrameDocument: function () { const a = this.$; try { a.contentWindow.document } catch (b) { a.src = a.src } return a && new CKEDITOR.dom.document(a.contentWindow.document) },
      copyAttributes: function (a, b) {
        const c = this.$.attributes; b = b || {}; for (let f = 0; f < c.length; f++) { const d = c[f]; const e = d.nodeName.toLowerCase(); var g; if (!(e in b)) if (e == 'checked' && (g = this.getAttribute(e)))a.setAttribute(e, g); else if (!CKEDITOR.env.ie || this.hasAttribute(e))g = this.getAttribute(e), g === null && (g = d.nodeValue), a.setAttribute(e, g) } this.$.style.cssText !== '' &&
(a.$.style.cssText = this.$.style.cssText)
      },
      renameNode: function (a) { if (this.getName() != a) { const b = this.getDocument(); a = new CKEDITOR.dom.element(a, b); this.copyAttributes(a); this.moveChildren(a); this.getParent(!0) && this.$.parentNode.replaceChild(a.$, this.$); a.$['data-cke-expando'] = this.$['data-cke-expando']; this.$ = a.$; delete this.getName } },
      getChild: (function () {
        function a (b, c) { const f = b.childNodes; if (c >= 0 && c < f.length) return f[c] } return function (b) {
          let c = this.$; if (b.slice) {
            for (b = b.slice(); b.length > 0 && c;) {
              c = a(c,
                b.shift())
            }
          } else c = a(c, b); return c ? new CKEDITOR.dom.node(c) : null
        }
      }()),
      getChildCount: function () { return this.$.childNodes.length },
      disableContextMenu: function () { function a (b) { return b.type == CKEDITOR.NODE_ELEMENT && b.hasClass('cke_enable_context_menu') } this.on('contextmenu', function (b) { b.data.getTarget().getAscendant(a, !0) || b.data.preventDefault() }) },
      getDirection: function (a) {
        return a
          ? this.getComputedStyle('direction') || this.getDirection() || this.getParent() && this.getParent().getDirection(1) || this.getDocument().$.dir ||
'ltr'
          : this.getStyle('direction') || this.getAttribute('dir')
      },
      data: function (a, b) { a = 'data-' + a; if (void 0 === b) return this.getAttribute(a); !1 === b ? this.removeAttribute(a) : this.setAttribute(a, b); return null },
      getEditor: function (a) { const b = CKEDITOR.instances; let c; let f; let d; a = a || void 0 === a; for (c in b) if (f = b[c], f.element.equals(this) && f.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO || !a && (d = f.editable()) && (d.equals(this) || d.contains(this))) return f; return null },
      find: function (a) {
        const c = d(this); a = new CKEDITOR.dom.nodeList(this.$.querySelectorAll(b(this,
          a))); c(); return a
      },
      findOne: function (a) { const c = d(this); a = this.$.querySelector(b(this, a)); c(); return a ? new CKEDITOR.dom.element(a) : null },
      forEach: function (a, b, c) { if (!(c || b && this.type != b)) var f = a(this); if (!1 !== f) { c = this.getChildren(); for (let d = 0; d < c.count(); d++)f = c.getItem(d), f.type == CKEDITOR.NODE_ELEMENT ? f.forEach(a, b) : b && f.type != b || a(f) } }
    }); var h = { width: ['border-left-width', 'border-right-width', 'padding-left', 'padding-right'], height: ['border-top-width', 'border-bottom-width', 'padding-top', 'padding-bottom'] }
    CKEDITOR.dom.element.prototype.setSize = function (a, b, d) { typeof b === 'number' && (!d || CKEDITOR.env.ie && CKEDITOR.env.quirks || (b -= c.call(this, a)), this.setStyle(a, b + 'px')) }; CKEDITOR.dom.element.prototype.getSize = function (a, b) { let d = Math.max(this.$['offset' + CKEDITOR.tools.capitalize(a)], this.$['client' + CKEDITOR.tools.capitalize(a)]) || 0; b && (d -= c.call(this, a)); return d }
  })(); CKEDITOR.dom.documentFragment = function (a) { a = a || CKEDITOR.document; this.$ = a.type == CKEDITOR.NODE_DOCUMENT ? a.$.createDocumentFragment() : a }
  CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype, CKEDITOR.dom.element.prototype, { type: CKEDITOR.NODE_DOCUMENT_FRAGMENT, insertAfterNode: function (a) { a = a.$; a.parentNode.insertBefore(this.$, a.nextSibling) }, getHtml: function () { const a = new CKEDITOR.dom.element('div'); this.clone(1, 1).appendTo(a); return a.getHtml().replace(/\s*data-cke-expando=".*?"/g, '') } }, !0, {
    append: 1,
    appendBogus: 1,
    clone: 1,
    getFirst: 1,
    getHtml: 1,
    getLast: 1,
    getParent: 1,
    getNext: 1,
    getPrevious: 1,
    appendTo: 1,
    moveChildren: 1,
    insertBefore: 1,
    insertAfterNode: 1,
    replace: 1,
    trim: 1,
    type: 1,
    ltrim: 1,
    rtrim: 1,
    getDocument: 1,
    getChildCount: 1,
    getChild: 1,
    getChildren: 1
  });
  (function () {
    function a (a, b) {
      const c = this.range; if (this._.end) return null; if (!this._.start) { this._.start = 1; if (c.collapsed) return this.end(), null; c.optimize() } let f; const d = c.startContainer; f = c.endContainer; const e = c.startOffset; const C = c.endOffset; let g; const k = this.guard; const p = this.type; const n = a ? 'getPreviousSourceNode' : 'getNextSourceNode'; if (!a && !this._.guardLTR) {
        const t = f.type == CKEDITOR.NODE_ELEMENT ? f : f.getParent(); const z = f.type == CKEDITOR.NODE_ELEMENT ? f.getChild(C) : f.getNext(); this._.guardLTR = function (a, b) {
          return (!b || !t.equals(a)) && (!z ||
!a.equals(z)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(c.root))
        }
      } if (a && !this._.guardRTL) { const B = d.type == CKEDITOR.NODE_ELEMENT ? d : d.getParent(); const h = d.type == CKEDITOR.NODE_ELEMENT ? e ? d.getChild(e - 1) : null : d.getPrevious(); this._.guardRTL = function (a, b) { return (!b || !B.equals(a)) && (!h || !a.equals(h)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(c.root)) } } const L = a ? this._.guardRTL : this._.guardLTR; g = k ? function (a, b) { return !1 === L(a, b) ? !1 : k(a, b) } : L; this.current
        ? f = this.current[n](!1, p, g)
        : (a
            ? f.type == CKEDITOR.NODE_ELEMENT &&
(f = C > 0 ? f.getChild(C - 1) : !1 === g(f, !0) ? null : f.getPreviousSourceNode(!0, p, g))
            : (f = d, f.type == CKEDITOR.NODE_ELEMENT && ((f = f.getChild(e)) || (f = !1 === g(d, !0) ? null : d.getNextSourceNode(!0, p, g)))), f && !1 === g(f) && (f = null)); for (;f && !this._.end;) { this.current = f; if (!this.evaluator || !1 !== this.evaluator(f)) { if (!b) return f } else if (b && this.evaluator) return !1; f = f[n](!1, p, g) } this.end(); return this.current = null
    } function d (b) { for (var c, f = null; c = a.call(this, b);)f = c; return f }CKEDITOR.dom.walker = CKEDITOR.tools.createClass({
      $: function (a) {
        this.range =
a; this._ = {}
      },
      proto: { end: function () { this._.end = 1 }, next: function () { return a.call(this) }, previous: function () { return a.call(this, 1) }, checkForward: function () { return !1 !== a.call(this, 0, 1) }, checkBackward: function () { return !1 !== a.call(this, 1, 1) }, lastForward: function () { return d.call(this) }, lastBackward: function () { return d.call(this, 1) }, reset: function () { delete this.current; this._ = {} } }
    }); const b = {
      block: 1,
      'list-item': 1,
      table: 1,
      'table-row-group': 1,
      'table-header-group': 1,
      'table-footer-group': 1,
      'table-row': 1,
      'table-column-group': 1,
      'table-column': 1,
      'table-cell': 1,
      'table-caption': 1
    }; const c = { absolute: 1, fixed: 1 }; CKEDITOR.dom.element.prototype.isBlockBoundary = function (a) { return this.getComputedStyle('float') != 'none' || this.getComputedStyle('position') in c || !b[this.getComputedStyle('display')] ? !!(this.is(CKEDITOR.dtd.$block) || a && this.is(a)) : !0 }; CKEDITOR.dom.walker.blockBoundary = function (a) { return function (b) { return !(b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary(a)) } }; CKEDITOR.dom.walker.listItemBoundary = function () { return this.blockBoundary({ br: 1 }) }
    CKEDITOR.dom.walker.bookmark = function (a, b) { function c (a) { return a && a.getName && a.getName() == 'span' && a.data('cke-bookmark') } return function (f) { let d, e; d = f && f.type != CKEDITOR.NODE_ELEMENT && (e = f.getParent()) && c(e); d = a ? d : d || c(f); return !!(b ^ d) } }; CKEDITOR.dom.walker.whitespaces = function (a) { return function (b) { let c; b && b.type == CKEDITOR.NODE_TEXT && (c = !CKEDITOR.tools.trim(b.getText()) || CKEDITOR.env.webkit && b.getText() == CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE); return !!(a ^ c) } }; CKEDITOR.dom.walker.invisible =
function (a) { const b = CKEDITOR.dom.walker.whitespaces(); const c = CKEDITOR.env.webkit ? 1 : 0; return function (f) { b(f) ? f = 1 : (f.type == CKEDITOR.NODE_TEXT && (f = f.getParent()), f = f.$.offsetWidth <= c); return !!(a ^ f) } }; CKEDITOR.dom.walker.nodeType = function (a, b) { return function (c) { return !!(b ^ c.type == a) } }; CKEDITOR.dom.walker.bogus = function (a) {
      function b (a) { return !g(a) && !h(a) } return function (c) {
        let f = CKEDITOR.env.needsBrFiller ? c.is && c.is('br') : c.getText && e.test(c.getText()); f && (f = c.getParent(), c = c.getNext(b), f = f.isBlockBoundary() &&
(!c || c.type == CKEDITOR.NODE_ELEMENT && c.isBlockBoundary())); return !!(a ^ f)
      }
    }; CKEDITOR.dom.walker.temp = function (a) { return function (b) { b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent()); b = b && b.hasAttribute('data-cke-temp'); return !!(a ^ b) } }; var e = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/; var g = CKEDITOR.dom.walker.whitespaces(); var h = CKEDITOR.dom.walker.bookmark(); const l = CKEDITOR.dom.walker.temp(); const m = function (a) { return h(a) || g(a) || a.type == CKEDITOR.NODE_ELEMENT && a.is(CKEDITOR.dtd.$inline) && !a.is(CKEDITOR.dtd.$empty) }; CKEDITOR.dom.walker.ignored =
function (a) { return function (b) { b = g(b) || h(b) || l(b); return !!(a ^ b) } }; const r = CKEDITOR.dom.walker.ignored(); CKEDITOR.dom.walker.empty = function (a) { return function (b) { for (let c = 0, f = b.getChildCount(); c < f; ++c) if (!r(b.getChild(c))) return !!a; return !a } }; const f = CKEDITOR.dom.walker.empty(); const C = CKEDITOR.dom.walker.validEmptyBlockContainers = CKEDITOR.tools.extend((function (a) { const b = {}; let c; for (c in a)CKEDITOR.dtd[c]['#'] && (b[c] = 1); return b }(CKEDITOR.dtd.$block)), { caption: 1, td: 1, th: 1 }); CKEDITOR.dom.walker.editable = function (a) {
      return function (b) {
        b =
r(b) ? !1 : b.type == CKEDITOR.NODE_TEXT || b.type == CKEDITOR.NODE_ELEMENT && (b.is(CKEDITOR.dtd.$inline) || b.is('hr') || b.getAttribute('contenteditable') == 'false' || !CKEDITOR.env.needsBrFiller && b.is(C) && f(b)) ? !0 : !1; return !!(a ^ b)
      }
    }; CKEDITOR.dom.element.prototype.getBogus = function () { let a = this; do a = a.getPreviousSourceNode(); while (m(a)); return a && (CKEDITOR.env.needsBrFiller ? a.is && a.is('br') : a.getText && e.test(a.getText())) ? a : !1 }
  })()
  CKEDITOR.dom.range = function (a) { this.endOffset = this.endContainer = this.startOffset = this.startContainer = null; this.collapsed = !0; const d = a instanceof CKEDITOR.dom.document; this.document = d ? a : a.getDocument(); this.root = d ? a.getBody() : a };
  (function () {
    function a (a) { a.collapsed = a.startContainer && a.endContainer && a.startContainer.equals(a.endContainer) && a.startOffset == a.endOffset } function d (a, b, c, d, e) {
      function q (a, b, c, f) { const d = c ? a.getPrevious() : a.getNext(); if (f && l) return d; k || f ? b.append(a.clone(!0, e), c) : (a.remove(), r && b.append(a)); return d } function g () { let a; let b; let c; const f = Math.min(P.length, v.length); for (a = 0; a < f; a++) if (b = P[a], c = v[a], !b.equals(c)) return a; return a - 1 } function h () {
        let b = G - 1; let c = L && H && !p.equals(n); b < D - 1 || b < I - 1 || c
          ? (c
              ? a.moveToPosition(n,
                CKEDITOR.POSITION_BEFORE_START)
              : I == b + 1 && F ? a.moveToPosition(v[b], CKEDITOR.POSITION_BEFORE_END) : a.moveToPosition(v[b + 1], CKEDITOR.POSITION_BEFORE_START), d && (b = P[b + 1]) && b.type == CKEDITOR.NODE_ELEMENT && (c = CKEDITOR.dom.element.createFromHtml('\x3cspan data-cke-bookmark\x3d"1" style\x3d"display:none"\x3e\x26nbsp;\x3c/span\x3e', a.document), c.insertAfter(b), b.mergeSiblings(!1), a.moveToBookmark({ startNode: c })))
          : a.collapse(!0)
      }a.optimizeBookmark(); var l = b === 0; var r = b == 1; var k = b == 2; b = k || r; var p = a.startContainer; var n = a.endContainer
      const t = a.startOffset; const z = a.endOffset; let B; let F; let L; let H; let m; let Q; if (k && n.type == CKEDITOR.NODE_TEXT && p.equals(n))p = a.document.createText(p.substring(t, z)), c.append(p); else {
        n.type == CKEDITOR.NODE_TEXT ? k ? Q = !0 : n = n.split(z) : n.getChildCount() > 0 ? z >= n.getChildCount() ? (n = n.getChild(z - 1), F = !0) : n = n.getChild(z) : H = F = !0; p.type == CKEDITOR.NODE_TEXT ? k ? m = !0 : p.split(t) : p.getChildCount() > 0 ? t === 0 ? (p = p.getChild(t), B = !0) : p = p.getChild(t - 1) : L = B = !0; for (var P = p.getParents(), v = n.getParents(), G = g(), D = P.length - 1, I = v.length - 1, K = c, M, Z, X, fa = -1, S = G; S <= D; S++) {
          Z =
P[S]; X = Z.getNext(); for (S != D || Z.equals(v[S]) && D < I ? b && (M = K.append(Z.clone(0, e))) : B ? q(Z, K, !1, L) : m && K.append(a.document.createText(Z.substring(t))); X;) { if (X.equals(v[S])) { fa = S; break }X = q(X, K) }K = M
        }K = c; for (S = G; S <= I; S++) if (c = v[S], X = c.getPrevious(), c.equals(P[S]))b && (K = K.getChild(0)); else { S != I || c.equals(P[S]) && I < D ? b && (M = K.append(c.clone(0, e))) : F ? q(c, K, !1, H) : Q && K.append(a.document.createText(c.substring(0, z))); if (S > fa) for (;X;)X = q(X, K, !0); K = M }k || h()
      }
    } function b () {
      let a = !1; const b = CKEDITOR.dom.walker.whitespaces()
      const c = CKEDITOR.dom.walker.bookmark(!0); const d = CKEDITOR.dom.walker.bogus(); return function (e) { return c(e) || b(e) ? !0 : d(e) && !a ? a = !0 : e.type == CKEDITOR.NODE_TEXT && (e.hasAscendant('pre') || CKEDITOR.tools.trim(e.getText()).length) || e.type == CKEDITOR.NODE_ELEMENT && !e.is(g) ? !1 : !0 }
    } function c (a) { const b = CKEDITOR.dom.walker.whitespaces(); const c = CKEDITOR.dom.walker.bookmark(1); return function (d) { return c(d) || b(d) ? !0 : !a && h(d) || d.type == CKEDITOR.NODE_ELEMENT && d.is(CKEDITOR.dtd.$removeEmpty) } } function e (a) {
      return function () {
        let b; return this[a
          ? 'getPreviousNode'
          : 'getNextNode'](function (a) { !b && r(a) && (b = a); return m(a) && !(h(a) && a.equals(b)) })
      }
    } var g = { abbr: 1, acronym: 1, b: 1, bdo: 1, big: 1, cite: 1, code: 1, del: 1, dfn: 1, em: 1, font: 1, i: 1, ins: 1, label: 1, kbd: 1, q: 1, samp: 1, small: 1, span: 1, strike: 1, strong: 1, sub: 1, sup: 1, tt: 1, u: 1, var: 1 }; var h = CKEDITOR.dom.walker.bogus(); const l = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/; var m = CKEDITOR.dom.walker.editable(); var r = CKEDITOR.dom.walker.ignored(!0); CKEDITOR.dom.range.prototype = {
      clone: function () {
        const a = new CKEDITOR.dom.range(this.root); a._setStartContainer(this.startContainer)
        a.startOffset = this.startOffset; a._setEndContainer(this.endContainer); a.endOffset = this.endOffset; a.collapsed = this.collapsed; return a
      },
      collapse: function (a) { a ? (this._setEndContainer(this.startContainer), this.endOffset = this.startOffset) : (this._setStartContainer(this.endContainer), this.startOffset = this.endOffset); this.collapsed = !0 },
      cloneContents: function (a) { const b = new CKEDITOR.dom.documentFragment(this.document); this.collapsed || d(this, 2, b, !1, typeof a === 'undefined' ? !0 : a); return b },
      deleteContents: function (a) {
        this.collapsed ||
d(this, 0, null, a)
      },
      extractContents: function (a, b) { const c = new CKEDITOR.dom.documentFragment(this.document); this.collapsed || d(this, 1, c, a, typeof b === 'undefined' ? !0 : b); return c },
      createBookmark: function (a) {
        let b; let c; let d; let e; const q = this.collapsed; b = this.document.createElement('span'); b.data('cke-bookmark', 1); b.setStyle('display', 'none'); b.setHtml('\x26nbsp;'); a && (d = 'cke_bm_' + CKEDITOR.tools.getNextNumber(), b.setAttribute('id', d + (q ? 'C' : 'S'))); q || (c = b.clone(), c.setHtml('\x26nbsp;'), a && c.setAttribute('id', d + 'E'), e = this.clone(),
        e.collapse(), e.insertNode(c)); e = this.clone(); e.collapse(!0); e.insertNode(b); c ? (this.setStartAfter(b), this.setEndBefore(c)) : this.moveToPosition(b, CKEDITOR.POSITION_AFTER_END); return { startNode: a ? d + (q ? 'C' : 'S') : b, endNode: a ? d + 'E' : c, serializable: a, collapsed: q }
      },
      createBookmark2: (function () {
        function a (b) {
          let f = b.container; let d = b.offset; let e; e = f; let g = d; e = e.type != CKEDITOR.NODE_ELEMENT || g === 0 || g == e.getChildCount() ? 0 : e.getChild(g - 1).type == CKEDITOR.NODE_TEXT && e.getChild(g).type == CKEDITOR.NODE_TEXT; e && (f = f.getChild(d -
1), d = f.getLength()); if (f.type == CKEDITOR.NODE_ELEMENT && d > 0) { a: { for (e = f; d--;) if (g = e.getChild(d).getIndex(!0), g >= 0) { d = g; break a }d = -1 }d += 1 } if (f.type == CKEDITOR.NODE_TEXT) { e = f; for (g = 0; (e = e.getPrevious()) && e.type == CKEDITOR.NODE_TEXT;)g += e.getText().replace(CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE, '').length; e = g; f.getText() ? d += e : (g = f.getPrevious(c), e ? (d = e, f = g ? g.getNext() : f.getParent().getFirst()) : (f = f.getParent(), d = g ? g.getIndex(!0) + 1 : 0)) }b.container = f; b.offset = d
        } function b (a, c) {
          const f = c.getCustomData('cke-fillingChar')
          if (f) { const d = a.container; f.equals(d) && (a.offset -= CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE.length, a.offset <= 0 && (a.offset = d.getIndex(), a.container = d.getParent())) }
        } var c = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_TEXT, !0); return function (c) {
          const d = this.collapsed; const e = { container: this.startContainer, offset: this.startOffset }; const g = { container: this.endContainer, offset: this.endOffset }; c && (a(e), b(e, this.root), d || (a(g), b(g, this.root))); return {
            start: e.container.getAddress(c),
            end: d ? null : g.container.getAddress(c),
            startOffset: e.offset,
            endOffset: g.offset,
            normalized: c,
            collapsed: d,
            is2: !0
          }
        }
      }()),
      moveToBookmark: function (a) {
        if (a.is2) { var b = this.document.getByAddress(a.start, a.normalized); var c = a.startOffset; const d = a.end && this.document.getByAddress(a.end, a.normalized); a = a.endOffset; this.setStart(b, c); d ? this.setEnd(d, a) : this.collapse(!0) } else {
          b = (c = a.serializable) ? this.document.getById(a.startNode) : a.startNode, a = c ? this.document.getById(a.endNode) : a.endNode, this.setStartBefore(b), b.remove(), a
            ? (this.setEndBefore(a), a.remove())
            : this.collapse(!0)
        }
      },
      getBoundaryNodes: function () {
        let a = this.startContainer; let b = this.endContainer; const c = this.startOffset; const d = this.endOffset; let e; if (a.type == CKEDITOR.NODE_ELEMENT) if (e = a.getChildCount(), e > c)a = a.getChild(c); else if (e < 1)a = a.getPreviousSourceNode(); else { for (a = a.$; a.lastChild;)a = a.lastChild; a = new CKEDITOR.dom.node(a); a = a.getNextSourceNode() || a } if (b.type == CKEDITOR.NODE_ELEMENT) {
          if (e = b.getChildCount(), e > d)b = b.getChild(d).getPreviousSourceNode(!0); else if (e < 1)b = b.getPreviousSourceNode(); else {
            for (b = b.$; b.lastChild;) {
              b =
b.lastChild
            }b = new CKEDITOR.dom.node(b)
          }
        }a.getPosition(b) & CKEDITOR.POSITION_FOLLOWING && (a = b); return { startNode: a, endNode: b }
      },
      getCommonAncestor: function (a, b) { var c = this.startContainer; const d = this.endContainer; var c = c.equals(d) ? a && c.type == CKEDITOR.NODE_ELEMENT && this.startOffset == this.endOffset - 1 ? c.getChild(this.startOffset) : c : c.getCommonAncestor(d); return b && !c.is ? c.getParent() : c },
      optimize: function () {
        let a = this.startContainer; let b = this.startOffset; a.type != CKEDITOR.NODE_ELEMENT && (b
          ? b >= a.getLength() && this.setStartAfter(a)
          : this.setStartBefore(a)); a = this.endContainer; b = this.endOffset; a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setEndAfter(a) : this.setEndBefore(a))
      },
      optimizeBookmark: function () { const a = this.startContainer; const b = this.endContainer; a.is && a.is('span') && a.data('cke-bookmark') && this.setStartAt(a, CKEDITOR.POSITION_BEFORE_START); b && b.is && b.is('span') && b.data('cke-bookmark') && this.setEndAt(b, CKEDITOR.POSITION_AFTER_END) },
      trim: function (a, b) {
        var c = this.startContainer; var d = this.startOffset; const e = this.collapsed; if ((!a ||
e) && c && c.type == CKEDITOR.NODE_TEXT) { if (d) if (d >= c.getLength())d = c.getIndex() + 1, c = c.getParent(); else { const q = c.split(d); var d = c.getIndex() + 1; var c = c.getParent(); this.startContainer.equals(this.endContainer) ? this.setEnd(q, this.endOffset - this.startOffset) : c.equals(this.endContainer) && (this.endOffset += 1) } else d = c.getIndex(), c = c.getParent(); this.setStart(c, d); if (e) { this.collapse(!0); return } }c = this.endContainer; d = this.endOffset; b || e || !c || c.type != CKEDITOR.NODE_TEXT || (d
          ? (d >= c.getLength() || c.split(d), d = c.getIndex() + 1)
          : d = c.getIndex(), c = c.getParent(), this.setEnd(c, d))
      },
      enlarge: function (a, b) {
        function c (a) { return a && a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute('contenteditable') ? null : a } const d = new RegExp(/[^\s\ufeff]/); switch (a) {
          case CKEDITOR.ENLARGE_INLINE:var e = 1; case CKEDITOR.ENLARGE_ELEMENT:var q = function (a, b) {
            var c = new CKEDITOR.dom.range(h); c.setStart(a, b); c.setEndAt(h, CKEDITOR.POSITION_BEFORE_END); var c = new CKEDITOR.dom.walker(c); let f; for (c.guard = function (a) { return !(a.type == CKEDITOR.NODE_ELEMENT && a.isBlockBoundary()) }; f =
c.next();) { if (f.type != CKEDITOR.NODE_TEXT) return !1; B = f != a ? f.getText() : f.substring(b); if (d.test(B)) return !1 } return !0
          }; if (this.collapsed) break; var g = this.getCommonAncestor(); var h = this.root; var l; var r; var k; var p; var n; var t = !1; var z; var B; z = this.startContainer; var F = this.startOffset; z.type == CKEDITOR.NODE_TEXT ? (F && (z = !CKEDITOR.tools.trim(z.substring(0, F)).length && z, t = !!z), z && ((p = z.getPrevious()) || (k = z.getParent()))) : (F && (p = z.getChild(F - 1) || z.getLast()), p || (k = z)); for (k = c(k); k || p;) {
              if (k && !p) {
                !n && k.equals(g) && (n = !0); if (e
                  ? k.isBlockBoundary()
                  : !h.contains(k)) break; t && k.getComputedStyle('display') == 'inline' || (t = !1, n ? l = k : this.setStartBefore(k)); p = k.getPrevious()
              } for (;p;) {
                if (z = !1, p.type == CKEDITOR.NODE_COMMENT)p = p.getPrevious(); else {
                  if (p.type == CKEDITOR.NODE_TEXT)B = p.getText(), d.test(B) && (p = null), z = /[\s\ufeff]$/.test(B); else if ((p.$.offsetWidth > (CKEDITOR.env.webkit ? 1 : 0) || b && p.is('br')) && !p.data('cke-bookmark')) {
                    if (t && CKEDITOR.dtd.$removeEmpty[p.getName()]) {
                      B = p.getText(); if (d.test(B))p = null; else {
                        for (var F = p.$.getElementsByTagName('*'), L = 0, H; H =
F[L++];) if (!CKEDITOR.dtd.$removeEmpty[H.nodeName.toLowerCase()]) { p = null; break }
                      }p && (z = !!B.length)
                    } else p = null
                  } z && (t ? n ? l = k : k && this.setStartBefore(k) : t = !0); if (p) { z = p.getPrevious(); if (!k && !z) { k = p; p = null; break }p = z } else k = null
                }
              }k && (k = c(k.getParent()))
            }z = this.endContainer; F = this.endOffset; k = p = null; n = t = !1; z.type == CKEDITOR.NODE_TEXT ? CKEDITOR.tools.trim(z.substring(F)).length ? t = !0 : (t = !z.getLength(), F == z.getLength() ? (p = z.getNext()) || (k = z.getParent()) : q(z, F) && (k = z.getParent())) : (p = z.getChild(F)) || (k = z); for (;k ||
p;) {
              if (k && !p) { !n && k.equals(g) && (n = !0); if (e ? k.isBlockBoundary() : !h.contains(k)) break; t && k.getComputedStyle('display') == 'inline' || (t = !1, n ? r = k : k && this.setEndAfter(k)); p = k.getNext() } for (;p;) {
                z = !1; if (p.type == CKEDITOR.NODE_TEXT)B = p.getText(), q(p, 0) || (p = null), z = /^[\s\ufeff]/.test(B); else if (p.type == CKEDITOR.NODE_ELEMENT) {
                  if ((p.$.offsetWidth > 0 || b && p.is('br')) && !p.data('cke-bookmark')) {
                    if (t && CKEDITOR.dtd.$removeEmpty[p.getName()]) {
                      B = p.getText(); if (d.test(B))p = null; else {
                        for (F = p.$.getElementsByTagName('*'), L =
0; H = F[L++];) if (!CKEDITOR.dtd.$removeEmpty[H.nodeName.toLowerCase()]) { p = null; break }
                      }p && (z = !!B.length)
                    } else p = null
                  }
                } else z = 1; z && t && (n ? r = k : this.setEndAfter(k)); if (p) { z = p.getNext(); if (!k && !z) { k = p; p = null; break }p = z } else k = null
              }k && (k = c(k.getParent()))
            }l && r && (g = l.contains(r) ? r : l, this.setStartBefore(g), this.setEndAfter(g)); break; case CKEDITOR.ENLARGE_BLOCK_CONTENTS:case CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:k = new CKEDITOR.dom.range(this.root); h = this.root; k.setStartAt(h, CKEDITOR.POSITION_AFTER_START); k.setEnd(this.startContainer,
            this.startOffset); k = new CKEDITOR.dom.walker(k); var m; var Q; var P = CKEDITOR.dom.walker.blockBoundary(a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? { br: 1 } : null); var v = null; var G = function (a) { if (a.type == CKEDITOR.NODE_ELEMENT && a.getAttribute('contenteditable') == 'false') if (v) { if (v.equals(a)) { v = null; return } } else v = a; else if (v) return; const b = P(a); b || (m = a); return b }; var e = function (a) { const b = G(a); !b && a.is && a.is('br') && (Q = a); return b }; k.guard = G; k = k.lastBackward(); m = m || h; this.setStartAt(m, !m.is('br') && (!k && this.checkStartOfBlock() || k && m.contains(k))
              ? CKEDITOR.POSITION_AFTER_START
              : CKEDITOR.POSITION_AFTER_END); if (a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS) { k = this.clone(); k = new CKEDITOR.dom.walker(k); const D = CKEDITOR.dom.walker.whitespaces(); const I = CKEDITOR.dom.walker.bookmark(); k.evaluator = function (a) { return !D(a) && !I(a) }; if ((k = k.previous()) && k.type == CKEDITOR.NODE_ELEMENT && k.is('br')) break }k = this.clone(); k.collapse(); k.setEndAt(h, CKEDITOR.POSITION_BEFORE_END); k = new CKEDITOR.dom.walker(k); k.guard = a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? e : G; m = v = Q = null; k = k.lastForward()
            m = m || h; this.setEndAt(m, !k && this.checkEndOfBlock() || k && m.contains(k) ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_BEFORE_START); Q && this.setEndAfter(Q)
        }
      },
      shrink: function (a, b, c) {
        if (!this.collapsed) {
          a = a || CKEDITOR.SHRINK_TEXT; var d = this.clone(); let e = this.startContainer; const q = this.endContainer; const g = this.startOffset; const h = this.endOffset; let l = 1; let r = 1; e && e.type == CKEDITOR.NODE_TEXT && (g ? g >= e.getLength() ? d.setStartAfter(e) : (d.setStartBefore(e), l = 0) : d.setStartBefore(e)); q && q.type == CKEDITOR.NODE_TEXT && (h
            ? h >= q.getLength()
              ? d.setEndAfter(q)
              : (d.setEndAfter(q), r = 0)
            : d.setEndBefore(q)); var d = new CKEDITOR.dom.walker(d); const k = CKEDITOR.dom.walker.bookmark(); d.evaluator = function (b) { return b.type == (a == CKEDITOR.SHRINK_ELEMENT ? CKEDITOR.NODE_ELEMENT : CKEDITOR.NODE_TEXT) }; let p; d.guard = function (b, d) {
            if (k(b)) return !0; if (a == CKEDITOR.SHRINK_ELEMENT && b.type == CKEDITOR.NODE_TEXT || d && b.equals(p) || !1 === c && b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary() || b.type == CKEDITOR.NODE_ELEMENT && b.hasAttribute('contenteditable')) return !1; d || b.type != CKEDITOR.NODE_ELEMENT ||
(p = b); return !0
          }; l && (e = d[a == CKEDITOR.SHRINK_ELEMENT ? 'lastForward' : 'next']()) && this.setStartAt(e, b ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_START); r && (d.reset(), (d = d[a == CKEDITOR.SHRINK_ELEMENT ? 'lastBackward' : 'previous']()) && this.setEndAt(d, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_END)); return !(!l && !r)
        }
      },
      insertNode: function (a) {
        this.optimizeBookmark(); this.trim(!1, !0); const b = this.startContainer; const c = b.getChild(this.startOffset); c ? a.insertBefore(c) : b.append(a); a.getParent() && a.getParent().equals(this.endContainer) &&
this.endOffset++; this.setStartBefore(a)
      },
      moveToPosition: function (a, b) { this.setStartAt(a, b); this.collapse(!0) },
      moveToRange: function (a) { this.setStart(a.startContainer, a.startOffset); this.setEnd(a.endContainer, a.endOffset) },
      selectNodeContents: function (a) { this.setStart(a, 0); this.setEnd(a, a.type == CKEDITOR.NODE_TEXT ? a.getLength() : a.getChildCount()) },
      setStart: function (b, c) {
        b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()] && (c = b.getIndex(), b = b.getParent()); this._setStartContainer(b); this.startOffset =
c; this.endContainer || (this._setEndContainer(b), this.endOffset = c); a(this)
      },
      setEnd: function (b, c) { b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()] && (c = b.getIndex() + 1, b = b.getParent()); this._setEndContainer(b); this.endOffset = c; this.startContainer || (this._setStartContainer(b), this.startOffset = c); a(this) },
      setStartAfter: function (a) { this.setStart(a.getParent(), a.getIndex() + 1) },
      setStartBefore: function (a) { this.setStart(a.getParent(), a.getIndex()) },
      setEndAfter: function (a) {
        this.setEnd(a.getParent(),
          a.getIndex() + 1)
      },
      setEndBefore: function (a) { this.setEnd(a.getParent(), a.getIndex()) },
      setStartAt: function (b, c) { switch (c) { case CKEDITOR.POSITION_AFTER_START:this.setStart(b, 0); break; case CKEDITOR.POSITION_BEFORE_END:b.type == CKEDITOR.NODE_TEXT ? this.setStart(b, b.getLength()) : this.setStart(b, b.getChildCount()); break; case CKEDITOR.POSITION_BEFORE_START:this.setStartBefore(b); break; case CKEDITOR.POSITION_AFTER_END:this.setStartAfter(b) }a(this) },
      setEndAt: function (b, c) {
        switch (c) {
          case CKEDITOR.POSITION_AFTER_START:this.setEnd(b,
            0); break; case CKEDITOR.POSITION_BEFORE_END:b.type == CKEDITOR.NODE_TEXT ? this.setEnd(b, b.getLength()) : this.setEnd(b, b.getChildCount()); break; case CKEDITOR.POSITION_BEFORE_START:this.setEndBefore(b); break; case CKEDITOR.POSITION_AFTER_END:this.setEndAfter(b)
        }a(this)
      },
      fixBlock: function (a, b) {
        const c = this.createBookmark(); const d = this.document.createElement(b); this.collapse(a); this.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS); this.extractContents().appendTo(d); d.trim(); this.insertNode(d); const e = d.getBogus(); e && e.remove()
        d.appendBogus(); this.moveToBookmark(c); return d
      },
      splitBlock: function (a, b) {
        let c = new CKEDITOR.dom.elementPath(this.startContainer, this.root); let d = new CKEDITOR.dom.elementPath(this.endContainer, this.root); let e = c.block; let q = d.block; let g = null; if (!c.blockLimit.equals(d.blockLimit)) return null; a != 'br' && (e || (e = this.fixBlock(!0, a), q = (new CKEDITOR.dom.elementPath(this.endContainer, this.root)).block), q || (q = this.fixBlock(!1, a))); c = e && this.checkStartOfBlock(); d = q && this.checkEndOfBlock(); this.deleteContents(); e && e.equals(q) &&
(d ? (g = new CKEDITOR.dom.elementPath(this.startContainer, this.root), this.moveToPosition(q, CKEDITOR.POSITION_AFTER_END), q = null) : c ? (g = new CKEDITOR.dom.elementPath(this.startContainer, this.root), this.moveToPosition(e, CKEDITOR.POSITION_BEFORE_START), e = null) : (q = this.splitElement(e, b || !1), e.is('ul', 'ol') || e.appendBogus())); return { previousBlock: e, nextBlock: q, wasStartOfBlock: c, wasEndOfBlock: d, elementPath: g }
      },
      splitElement: function (a, b) {
        if (!this.collapsed) return null; this.setEndAt(a, CKEDITOR.POSITION_BEFORE_END)
        const c = this.extractContents(!1, b || !1); const d = a.clone(!1, b || !1); c.appendTo(d); d.insertAfter(a); this.moveToPosition(a, CKEDITOR.POSITION_AFTER_END); return d
      },
      removeEmptyBlocksAtEnd: (function () {
        function a (d) { return function (a) { return b(a) || c(a) || a.type == CKEDITOR.NODE_ELEMENT && a.isEmptyInlineRemoveable() || d.is('table') && a.is('caption') ? !1 : !0 } } var b = CKEDITOR.dom.walker.whitespaces(); var c = CKEDITOR.dom.walker.bookmark(!1); return function (b) {
          for (var c = this.createBookmark(), d = this[b ? 'endPath' : 'startPath'](), e = d.block ||
d.blockLimit, g; e && !e.equals(d.root) && !e.getFirst(a(e));)g = e.getParent(), this[b ? 'setEndAt' : 'setStartAt'](e, CKEDITOR.POSITION_AFTER_END), e.remove(1), e = g; this.moveToBookmark(c)
        }
      }()),
      startPath: function () { return new CKEDITOR.dom.elementPath(this.startContainer, this.root) },
      endPath: function () { return new CKEDITOR.dom.elementPath(this.endContainer, this.root) },
      checkBoundaryOfElement: function (a, b) {
        const d = b == CKEDITOR.START; let e = this.clone(); e.collapse(d); e[d ? 'setStartAt' : 'setEndAt'](a, d
          ? CKEDITOR.POSITION_AFTER_START
          : CKEDITOR.POSITION_BEFORE_END); e = new CKEDITOR.dom.walker(e); e.evaluator = c(d); return e[d ? 'checkBackward' : 'checkForward']()
      },
      checkStartOfBlock: function () {
        let a = this.startContainer; let c = this.startOffset; CKEDITOR.env.ie && c && a.type == CKEDITOR.NODE_TEXT && (a = CKEDITOR.tools.ltrim(a.substring(0, c)), l.test(a) && this.trim(0, 1)); this.trim(); a = new CKEDITOR.dom.elementPath(this.startContainer, this.root); c = this.clone(); c.collapse(!0); c.setStartAt(a.block || a.blockLimit, CKEDITOR.POSITION_AFTER_START); a = new CKEDITOR.dom.walker(c)
        a.evaluator = b(); return a.checkBackward()
      },
      checkEndOfBlock: function () { let a = this.endContainer; let c = this.endOffset; CKEDITOR.env.ie && a.type == CKEDITOR.NODE_TEXT && (a = CKEDITOR.tools.rtrim(a.substring(c)), l.test(a) && this.trim(1, 0)); this.trim(); a = new CKEDITOR.dom.elementPath(this.endContainer, this.root); c = this.clone(); c.collapse(!1); c.setEndAt(a.block || a.blockLimit, CKEDITOR.POSITION_BEFORE_END); a = new CKEDITOR.dom.walker(c); a.evaluator = b(); return a.checkForward() },
      getPreviousNode: function (a, b, c) {
        const d = this.clone()
        d.collapse(1); d.setStartAt(c || this.root, CKEDITOR.POSITION_AFTER_START); c = new CKEDITOR.dom.walker(d); c.evaluator = a; c.guard = b; return c.previous()
      },
      getNextNode: function (a, b, c) { const d = this.clone(); d.collapse(); d.setEndAt(c || this.root, CKEDITOR.POSITION_BEFORE_END); c = new CKEDITOR.dom.walker(d); c.evaluator = a; c.guard = b; return c.next() },
      checkReadOnly: (function () {
        function a (b, c) {
          for (;b;) {
            if (b.type == CKEDITOR.NODE_ELEMENT) {
              if (b.getAttribute('contentEditable') == 'false' && !b.data('cke-editable')) return 0; if (b.is('html') ||
b.getAttribute('contentEditable') == 'true' && (b.contains(c) || b.equals(c))) break
            }b = b.getParent()
          } return 1
        } return function () { const b = this.startContainer; const c = this.endContainer; return !(a(b, c) && a(c, b)) }
      }()),
      moveToElementEditablePosition: function (a, b) {
        if (a.type == CKEDITOR.NODE_ELEMENT && !a.isEditable(!1)) return this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START), !0; for (var c = 0; a;) {
          if (a.type == CKEDITOR.NODE_TEXT) {
            b && this.endContainer && this.checkEndOfBlock() && l.test(a.getText())
              ? this.moveToPosition(a,
                CKEDITOR.POSITION_BEFORE_START)
              : this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START); c = 1; break
          } if (a.type == CKEDITOR.NODE_ELEMENT) {
            if (a.isEditable()) this.moveToPosition(a, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_START), c = 1; else if (b && a.is('br') && this.endContainer && this.checkEndOfBlock()) this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START); else if (a.getAttribute('contenteditable') == 'false' && a.is(CKEDITOR.dtd.$block)) {
              return this.setStartBefore(a), this.setEndAfter(a),
              !0
            }
          } const d = a; const e = c; let q = void 0; d.type == CKEDITOR.NODE_ELEMENT && d.isEditable(!1) && (q = d[b ? 'getLast' : 'getFirst'](r)); e || q || (q = d[b ? 'getPrevious' : 'getNext'](r)); a = q
        } return !!c
      },
      moveToClosestEditablePosition: function (a, b) {
        let c; let d = 0; let e; let q; const g = [CKEDITOR.POSITION_AFTER_END, CKEDITOR.POSITION_BEFORE_START]; a ? (c = new CKEDITOR.dom.range(this.root), c.moveToPosition(a, g[b ? 0 : 1])) : c = this.clone(); if (a && !a.is(CKEDITOR.dtd.$block))d = 1; else if (e = c[b ? 'getNextEditableNode' : 'getPreviousEditableNode']()) {
          d = 1, (q = e.type == CKEDITOR.NODE_ELEMENT) &&
e.is(CKEDITOR.dtd.$block) && e.getAttribute('contenteditable') == 'false'
            ? (c.setStartAt(e, CKEDITOR.POSITION_BEFORE_START), c.setEndAt(e, CKEDITOR.POSITION_AFTER_END))
            : !CKEDITOR.env.needsBrFiller && q && e.is(CKEDITOR.dom.walker.validEmptyBlockContainers) ? (c.setEnd(e, 0), c.collapse()) : c.moveToPosition(e, g[b ? 1 : 0])
        }d && this.moveToRange(c); return !!d
      },
      moveToElementEditStart: function (a) { return this.moveToElementEditablePosition(a) },
      moveToElementEditEnd: function (a) { return this.moveToElementEditablePosition(a, !0) },
      getEnclosedNode: function () {
        var a =
this.clone(); a.optimize(); if (a.startContainer.type != CKEDITOR.NODE_ELEMENT || a.endContainer.type != CKEDITOR.NODE_ELEMENT) return null; var a = new CKEDITOR.dom.walker(a); const b = CKEDITOR.dom.walker.bookmark(!1, !0); const c = CKEDITOR.dom.walker.whitespaces(!0); a.evaluator = function (a) { return c(a) && b(a) }; const d = a.next(); a.reset(); return d && d.equals(a.previous()) ? d : null
      },
      getTouchedStartNode: function () { const a = this.startContainer; return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.startOffset) || a },
      getTouchedEndNode: function () {
        const a =
this.endContainer; return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.endOffset - 1) || a
      },
      getNextEditableNode: e(),
      getPreviousEditableNode: e(1),
      scrollIntoView: function () {
        const a = new CKEDITOR.dom.element.createFromHtml('\x3cspan\x3e\x26nbsp;\x3c/span\x3e', this.document); let b; let c; let d; const e = this.clone(); e.optimize(); (d = e.startContainer.type == CKEDITOR.NODE_TEXT) ? (c = e.startContainer.getText(), b = e.startContainer.split(e.startOffset), a.insertAfter(e.startContainer)) : e.insertNode(a); a.scrollIntoView()
        d && (e.startContainer.setText(c), b.remove()); a.remove()
      },
      _setStartContainer: function (a) { this.startContainer = a },
      _setEndContainer: function (a) { this.endContainer = a },
      _find: function (a, b) {
        let c = this.getCommonAncestor(); const d = this.getBoundaryNodes(); const e = []; let q; let g; let h; let l; if (c && c.find) {
          for (g = c.find(a), q = 0; q < g.count(); q++) {
            if (c = g.getItem(q), b || !c.isReadOnly()) {
              h = c.getPosition(d.startNode) & CKEDITOR.POSITION_FOLLOWING || d.startNode.equals(c), l = c.getPosition(d.endNode) & CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_IS_CONTAINED,
              h && l && e.push(c)
            }
          }
        } return e
      }
    }
  })(); CKEDITOR.POSITION_AFTER_START = 1; CKEDITOR.POSITION_BEFORE_END = 2; CKEDITOR.POSITION_BEFORE_START = 3; CKEDITOR.POSITION_AFTER_END = 4; CKEDITOR.ENLARGE_ELEMENT = 1; CKEDITOR.ENLARGE_BLOCK_CONTENTS = 2; CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS = 3; CKEDITOR.ENLARGE_INLINE = 4; CKEDITOR.START = 1; CKEDITOR.END = 2; CKEDITOR.SHRINK_ELEMENT = 1; CKEDITOR.SHRINK_TEXT = 2; 'use strict';
  (function () {
    function a (a) { arguments.length < 1 || (this.range = a, this.forceBrBreak = 0, this.enlargeBr = 1, this.enforceRealBlocks = 0, this._ || (this._ = {})) } function d (a) { const b = []; a.forEach(function (a) { if (a.getAttribute('contenteditable') == 'true') return b.push(a), !1 }, CKEDITOR.NODE_ELEMENT, !0); return b } function b (a, c, e, g) {
      a: { g == null && (g = d(e)); for (var h; h = g.shift();) if (h.getDtd().p) { g = { element: h, remaining: g }; break a }g = null } if (!g) return 0; if ((h = CKEDITOR.filter.instances[g.element.data('cke-filter')]) && !h.check(c)) {
        return b(a,
          c, e, g.remaining)
      } c = new CKEDITOR.dom.range(g.element); c.selectNodeContents(g.element); c = c.createIterator(); c.enlargeBr = a.enlargeBr; c.enforceRealBlocks = a.enforceRealBlocks; c.activeFilter = c.filter = h; a._.nestedEditable = { element: g.element, container: e, remaining: g.remaining, iterator: c }; return 1
    } function c (a, b, c) { if (!b) return !1; a = a.clone(); a.collapse(!c); return a.checkBoundaryOfElement(b, c ? CKEDITOR.START : CKEDITOR.END) } const e = /^[\r\n\t ]+$/; const g = CKEDITOR.dom.walker.bookmark(!1, !0); const h = CKEDITOR.dom.walker.whitespaces(!0)
    const l = function (a) { return g(a) && h(a) }; const m = { dd: 1, dt: 1, li: 1 }; a.prototype = {
      getNextParagraph: function (a) {
        let d, h, u, A, y; a = a || 'p'; if (this._.nestedEditable) {
          if (d = this._.nestedEditable.iterator.getNextParagraph(a)) return this.activeFilter = this._.nestedEditable.iterator.activeFilter, d; this.activeFilter = this.filter; if (b(this, a, this._.nestedEditable.container, this._.nestedEditable.remaining)) return this.activeFilter = this._.nestedEditable.iterator.activeFilter, this._.nestedEditable.iterator.getNextParagraph(a); this._.nestedEditable =
null
        } if (!this.range.root.getDtd()[a]) return null; if (!this._.started) {
          var q = this.range.clone(); h = q.startPath(); var x = q.endPath(); var J = !q.collapsed && c(q, h.block); var w = !q.collapsed && c(q, x.block, 1); q.shrink(CKEDITOR.SHRINK_ELEMENT, !0); J && q.setStartAt(h.block, CKEDITOR.POSITION_BEFORE_END); w && q.setEndAt(x.block, CKEDITOR.POSITION_AFTER_START); h = q.endContainer.hasAscendant('pre', !0) || q.startContainer.hasAscendant('pre', !0); q.enlarge(this.forceBrBreak && !h || !this.enlargeBr ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS)
          q.collapsed || (h = new CKEDITOR.dom.walker(q.clone()), x = CKEDITOR.dom.walker.bookmark(!0, !0), h.evaluator = x, this._.nextNode = h.next(), h = new CKEDITOR.dom.walker(q.clone()), h.evaluator = x, h = h.previous(), this._.lastNode = h.getNextSourceNode(!0, null, q.root), this._.lastNode && this._.lastNode.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(this._.lastNode.getText()) && this._.lastNode.getParent().isBlockBoundary() && (x = this.range.clone(), x.moveToPosition(this._.lastNode, CKEDITOR.POSITION_AFTER_END), x.checkEndOfBlock() &&
(x = new CKEDITOR.dom.elementPath(x.endContainer, x.root), this._.lastNode = (x.block || x.blockLimit).getNextSourceNode(!0))), this._.lastNode && q.root.contains(this._.lastNode) || (this._.lastNode = this._.docEndMarker = q.document.createText(''), this._.lastNode.insertAfter(h)), q = null); this._.started = 1; h = q
        }x = this._.nextNode; q = this._.lastNode; for (this._.nextNode = null; x;) {
          var J = 0; var w = x.hasAscendant('pre'); let E = x.type != CKEDITOR.NODE_ELEMENT; let k = 0; if (E)x.type == CKEDITOR.NODE_TEXT && e.test(x.getText()) && (E = 0); else {
            var p = x.getName()
            if (CKEDITOR.dtd.$block[p] && x.getAttribute('contenteditable') == 'false') { d = x; b(this, a, d); break } else if (x.isBlockBoundary(this.forceBrBreak && !w && { br: 1 })) { if (p == 'br')E = 1; else if (!h && !x.getChildCount() && p != 'hr') { d = x; u = x.equals(q); break }h && (h.setEndAt(x, CKEDITOR.POSITION_BEFORE_START), p != 'br' && (this._.nextNode = x)); J = 1 } else { if (x.getFirst()) { h || (h = this.range.clone(), h.setStartAt(x, CKEDITOR.POSITION_BEFORE_START)); x = x.getFirst(); continue }E = 1 }
          }E && !h && (h = this.range.clone(), h.setStartAt(x, CKEDITOR.POSITION_BEFORE_START))
          u = (!J || E) && x.equals(q); if (h && !J) for (;!x.getNext(l) && !u;) { p = x.getParent(); if (p.isBlockBoundary(this.forceBrBreak && !w && { br: 1 })) { J = 1; E = 0; u || p.equals(q); h.setEndAt(p, CKEDITOR.POSITION_BEFORE_END); break }x = p; E = 1; u = x.equals(q); k = 1 }E && h.setEndAt(x, CKEDITOR.POSITION_AFTER_END); x = this._getNextSourceNode(x, k, q); if ((u = !x) || J && h) break
        } if (!d) {
          if (!h) return this._.docEndMarker && this._.docEndMarker.remove(), this._.nextNode = null; d = new CKEDITOR.dom.elementPath(h.startContainer, h.root); x = d.blockLimit; J = { div: 1, th: 1, td: 1 }
          d = d.block; !d && x && !this.enforceRealBlocks && J[x.getName()] && h.checkStartOfBlock() && h.checkEndOfBlock() && !x.equals(h.root)
            ? d = x
            : !d || this.enforceRealBlocks && d.is(m)
                ? (d = this.range.document.createElement(a), h.extractContents().appendTo(d), d.trim(), h.insertNode(d), A = y = !0)
                : d.getName() != 'li'
                  ? h.checkStartOfBlock() && h.checkEndOfBlock() || (d = d.clone(!1), h.extractContents().appendTo(d), d.trim(), y = h.splitBlock(), A = !y.wasStartOfBlock, y = !y.wasEndOfBlock, h.insertNode(d))
                  : u || (this._.nextNode = d.equals(q)
                    ? null
                    : this._getNextSourceNode(h.getBoundaryNodes().endNode,
                      1, q))
        }A && (A = d.getPrevious()) && A.type == CKEDITOR.NODE_ELEMENT && (A.getName() == 'br' ? A.remove() : A.getLast() && A.getLast().$.nodeName.toLowerCase() == 'br' && A.getLast().remove()); y && (A = d.getLast()) && A.type == CKEDITOR.NODE_ELEMENT && A.getName() == 'br' && (!CKEDITOR.env.needsBrFiller || A.getPrevious(g) || A.getNext(g)) && A.remove(); this._.nextNode || (this._.nextNode = u || d.equals(q) || !q ? null : this._getNextSourceNode(d, 1, q)); return d
      },
      _getNextSourceNode: function (a, b, c) {
        function d (a) { return !(a.equals(c) || a.equals(e)) } var e =
this.range.root; for (a = a.getNextSourceNode(b, null, d); !g(a);)a = a.getNextSourceNode(b, null, d); return a
      }
    }; CKEDITOR.dom.range.prototype.createIterator = function () { return new a(this) }
  })()
  CKEDITOR.command = function (a, d) {
    this.uiItems = []; this.exec = function (b) { if (this.state == CKEDITOR.TRISTATE_DISABLED || !this.checkAllowed()) return !1; this.editorFocus && a.focus(); return !1 === this.fire('exec') ? !0 : !1 !== d.exec.call(this, a, b) }; this.refresh = function (a, b) {
      if (!this.readOnly && a.readOnly) return !0; if (this.context && !b.isContextFor(this.context) || !this.checkAllowed(!0)) return this.disable(), !0; this.startDisabled || this.enable(); this.modes && !this.modes[a.mode] && this.disable(); return !1 === this.fire('refresh',
        { editor: a, path: b })
        ? !0
        : d.refresh && !1 !== d.refresh.apply(this, arguments)
    }; let b; this.checkAllowed = function (c) { return c || typeof b !== 'boolean' ? b = a.activeFilter.checkFeature(this) : b }; CKEDITOR.tools.extend(this, d, { modes: { wysiwyg: 1 }, editorFocus: 1, contextSensitive: !!d.context, state: CKEDITOR.TRISTATE_DISABLED }); CKEDITOR.event.call(this)
  }
  CKEDITOR.command.prototype = {
    enable: function () { this.state == CKEDITOR.TRISTATE_DISABLED && this.checkAllowed() && this.setState(this.preserveState && typeof this.previousState !== 'undefined' ? this.previousState : CKEDITOR.TRISTATE_OFF) },
    disable: function () { this.setState(CKEDITOR.TRISTATE_DISABLED) },
    setState: function (a) { if (this.state == a || a != CKEDITOR.TRISTATE_DISABLED && !this.checkAllowed()) return !1; this.previousState = this.state; this.state = a; this.fire('state'); return !0 },
    toggleState: function () {
      this.state == CKEDITOR.TRISTATE_OFF
        ? this.setState(CKEDITOR.TRISTATE_ON)
        : this.state == CKEDITOR.TRISTATE_ON && this.setState(CKEDITOR.TRISTATE_OFF)
    }
  }; CKEDITOR.event.implementOn(CKEDITOR.command.prototype); CKEDITOR.ENTER_P = 1; CKEDITOR.ENTER_BR = 2; CKEDITOR.ENTER_DIV = 3
  CKEDITOR.config = { customConfig: 'config.js', autoUpdateElement: !0, language: '', defaultLanguage: 'en', contentsLangDirection: '', enterMode: CKEDITOR.ENTER_P, forceEnterMode: !1, shiftEnterMode: CKEDITOR.ENTER_BR, docType: '\x3c!DOCTYPE html\x3e', bodyId: '', bodyClass: '', fullPage: !1, height: 200, contentsCss: CKEDITOR.getUrl('contents.css'), extraPlugins: '', removePlugins: '', protectedSource: [], tabIndex: 0, width: '', baseFloatZIndex: 1E4, blockedKeystrokes: [CKEDITOR.CTRL + 66, CKEDITOR.CTRL + 73, CKEDITOR.CTRL + 85] };
  (function () {
    function a (a, b, c, d, k) {
      let e, p; a = []; for (e in b) {
        p = b[e]; p = typeof p === 'boolean' ? {} : typeof p === 'function' ? { match: p } : L(p); e.charAt(0) != '$' && (p.elements = e); c && (p.featureName = c.toLowerCase()); var n = p; n.elements = h(n.elements, /\s+/) || null; n.propertiesOnly = n.propertiesOnly || !0 === n.elements; var f = /\s*,\s*/; var t = void 0; for (t in Q) {
          n[t] = h(n[t], f) || null; var q = n; var g = P[t]; var D = h(n[P[t]], f); var v = n[t]; const z = []; let I = !0; let B = void 0; D ? I = !1 : D = {}; for (B in v)B.charAt(0) == '!' && (B = B.slice(1), z.push(B), D[B] = !0, I = !1); for (;B = z.pop();) {
            v[B] =
v['!' + B], delete v['!' + B]
          }q[g] = (I ? !1 : D) || null
        }n.match = n.match || null; d.push(p); a.push(p)
      }b = k.elements; k = k.generic; let l; c = 0; for (d = a.length; c < d; ++c) {
        e = L(a[c]); p = !0 === e.classes || !0 === e.styles || !0 === e.attributes; n = e; t = g = f = void 0; for (f in Q)n[f] = J(n[f]); q = !0; for (t in P) { f = P[t]; g = n[f]; D = []; v = void 0; for (v in g)v.indexOf('*') > -1 ? D.push(new RegExp('^' + v.replace(/\*/g, '.*') + '$')) : D.push(v); g = D; g.length && (n[f] = g, q = !1) }n.nothingRequired = q; n.noProperties = !(n.attributes || n.classes || n.styles); if (!0 === e.elements ||
e.elements === null)k[p ? 'unshift' : 'push'](e); else for (l in n = e.elements, delete e.elements, n) if (b[l])b[l][p ? 'unshift' : 'push'](e); else b[l] = [e]
      }
    } function d (a, c, d, k) {
      if (!a.match || a.match(c)) {
        if (k || l(a, c)) {
          if (a.propertiesOnly || (d.valid = !0), d.allAttributes || (d.allAttributes = b(a.attributes, c.attributes, d.validAttributes)), d.allStyles || (d.allStyles = b(a.styles, c.styles, d.validStyles)), !d.allClasses) {
            a = a.classes; c = c.classes; k = d.validClasses; if (a) {
              if (!0 === a)a = !0; else {
                for (var e = 0, p = c.length, n; e < p; ++e) {
                  n = c[e], k[n] ||
(k[n] = a(n))
                }a = !1
              }
            } else a = !1; d.allClasses = a
          }
        }
      }
    } function b (a, b, c) { if (!a) return !1; if (!0 === a) return !0; for (const d in b)c[d] || (c[d] = a(d)); return !1 } function c (a, b, c) { if (!a.match || a.match(b)) { if (a.noProperties) return !1; c.hadInvalidAttribute = e(a.attributes, b.attributes) || c.hadInvalidAttribute; c.hadInvalidStyle = e(a.styles, b.styles) || c.hadInvalidStyle; a = a.classes; b = b.classes; if (a) { for (var d = !1, k = !0 === a, p = b.length; p--;) if (k || a(b[p]))b.splice(p, 1), d = !0; a = d } else a = !1; c.hadInvalidClass = a || c.hadInvalidClass } } function e (a,
      b) { if (!a) return !1; let c = !1; const d = !0 === a; let k; for (k in b) if (d || a(k)) delete b[k], c = !0; return c } function g (a, b, c) { if (a.disabled || a.customConfig && !c || !b) return !1; a._.cachedChecks = {}; return !0 } function h (a, b) { if (!a) return !1; if (!0 === a) return a; if (typeof a === 'string') return a = H(a), a == '*' ? !0 : CKEDITOR.tools.convertArrayToObject(a.split(b)); if (CKEDITOR.tools.isArray(a)) return a.length ? CKEDITOR.tools.convertArrayToObject(a) : !1; const c = {}; let d = 0; let k; for (k in a)c[k] = a[k], d++; return d ? c : !1 } function l (a, b) {
      if (a.nothingRequired) return !0
      let c, d, k, e; if (k = a.requiredClasses) for (e = b.classes, c = 0; c < k.length; ++c) if (d = k[c], typeof d === 'string') { if (CKEDITOR.tools.indexOf(e, d) == -1) return !1 } else if (!CKEDITOR.tools.checkIfAnyArrayItemMatches(e, d)) return !1; return m(b.styles, a.requiredStyles) && m(b.attributes, a.requiredAttributes)
    } function m (a, b) { if (!b) return !0; for (var c = 0, d; c < b.length; ++c) if (d = b[c], typeof d === 'string') { if (!(d in a)) return !1 } else if (!CKEDITOR.tools.checkIfAnyObjectPropertyMatches(a, d)) return !1; return !0 } function r (a) {
      if (!a) return {}
      a = a.split(/\s*,\s*/).sort(); for (var b = {}; a.length;)b[a.shift()] = 'cke-test'; return b
    } function f (a) { let b; let c; let d; let k; const e = {}; let p = 1; for (a = H(a); b = a.match(v);)(c = b[2]) ? (d = C(c, 'styles'), k = C(c, 'attrs'), c = C(c, 'classes')) : d = k = c = null, e['$' + p++] = { elements: b[1], classes: c, styles: d, attributes: k }, a = a.slice(b[0].length); return e } function C (a, b) { const c = a.match(G[b]); return c ? H(c[1]) : null } function u (a) {
      const b = a.styleBackup = a.attributes.style; const c = a.classBackup = a.attributes.class; a.styles || (a.styles = CKEDITOR.tools.parseCssText(b ||
'', 1)); a.classes || (a.classes = c ? c.split(/\s+/) : [])
    } function A (a, b, k, e) {
      let n = 0; let f; e.toHtml && (b.name = b.name.replace(D, '$1')); if (e.doCallbacks && a.elementCallbacks) { a: { f = a.elementCallbacks; for (var t = 0, g = f.length, v; t < g; ++t) if (v = f[t](b)) { f = v; break a }f = void 0 } if (f) return f } if (e.doTransform && (f = a._.transformations[b.name])) { u(b); for (t = 0; t < f.length; ++t)p(a, b, f[t]); q(b) } if (e.doFilter) {
        a: {
          t = b.name; g = a._; a = g.allowedRules.elements[t]; f = g.allowedRules.generic; t = g.disallowedRules.elements[t]; g = g.disallowedRules.generic
          v = e.skipRequired; var h = { valid: !1, validAttributes: {}, validClasses: {}, validStyles: {}, allAttributes: !1, allClasses: !1, allStyles: !1, hadInvalidAttribute: !1, hadInvalidClass: !1, hadInvalidStyle: !1 }; var z; var B; if (a || f) { u(b); if (t) for (z = 0, B = t.length; z < B; ++z) if (!1 === c(t[z], b, h)) { a = null; break a } if (g) for (z = 0, B = g.length; z < B; ++z)c(g[z], b, h); if (a) for (z = 0, B = a.length; z < B; ++z)d(a[z], b, h, v); if (f) for (z = 0, B = f.length; z < B; ++z)d(f[z], b, h, v); a = h } else a = null
        } if (!a || !a.valid) return k.push(b), 1; B = a.validAttributes; const l = a.validStyles
        f = a.validClasses; var t = b.attributes; const L = b.styles; var g = b.classes; v = b.classBackup; const K = b.styleBackup; let G; let F; const m = []; var h = []; const H = /^data-cke-/; z = !1; delete t.style; delete t.class; delete b.classBackup; delete b.styleBackup; if (!a.allAttributes) for (G in t)B[G] || (H.test(G) ? G == (F = G.replace(/^data-cke-saved-/, '')) || B[F] || (delete t[G], z = !0) : (delete t[G], z = !0)); if (!a.allStyles || a.hadInvalidStyle) { for (G in L)a.allStyles || l[G] ? m.push(G + ':' + L[G]) : z = !0; m.length && (t.style = m.sort().join('; ')) } else K && (t.style = K); if (!a.allClasses ||
a.hadInvalidClass) { for (G = 0; G < g.length; ++G)(a.allClasses || f[g[G]]) && h.push(g[G]); h.length && (t.class = h.sort().join(' ')); v && h.length < v.split(/\s+/).length && (z = !0) } else v && (t.class = v); z && (n = 1); if (!e.skipFinalValidation && !x(b)) return k.push(b), 1
      }e.toHtml && (b.name = b.name.replace(I, 'cke:$1')); return n
    } function y (a) { const b = []; let c; for (c in a)c.indexOf('*') > -1 && b.push(c.replace(/\*/g, '.*')); return b.length ? new RegExp('^(?:' + b.join('|') + ')$') : null } function q (a) {
      const b = a.attributes; let c; delete b.style; delete b.class
      if (c = CKEDITOR.tools.writeCssText(a.styles, !0))b.style = c; a.classes.length && (b.class = a.classes.sort().join(' '))
    } function x (a) { switch (a.name) { case 'a':if (!(a.children.length || a.attributes.name || a.attributes.id)) return !1; break; case 'img':if (!a.attributes.src) return !1 } return !0 } function J (a) { if (!a) return !1; if (!0 === a) return !0; const b = y(a); return function (c) { return c in a || b && c.match(b) } } function w () { return new CKEDITOR.htmlParser.element('br') } function E (a) {
      return a.type == CKEDITOR.NODE_ELEMENT && (a.name ==
'br' || F.$block[a.name])
    } function k (a, b, c) {
      var d = a.name; if (F.$empty[d] || !a.children.length)d == 'hr' && b == 'br' ? a.replaceWith(w()) : (a.parent && c.push({ check: 'it', el: a.parent }), a.remove()); else if (F.$block[d] || d == 'tr') {
        if (b == 'br')a.previous && !E(a.previous) && (b = w(), b.insertBefore(a)), a.next && !E(a.next) && (b = w(), b.insertAfter(a)), a.replaceWithChildren(); else {
          var d = a.children; let k; b: { k = F[b]; for (var e = 0, p = d.length, n; e < p; ++e) if (n = d[e], n.type == CKEDITOR.NODE_ELEMENT && !k[n.name]) { k = !1; break b }k = !0 } if (k) {
            a.name = b, a.attributes =
{}, c.push({ check: 'parent-down', el: a })
          } else { k = a.parent; for (var e = k.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || k.name == 'body', t, f, p = d.length; p > 0;)n = d[--p], e && (n.type == CKEDITOR.NODE_TEXT || n.type == CKEDITOR.NODE_ELEMENT && F.$inline[n.name]) ? (t || (t = new CKEDITOR.htmlParser.element(b), t.insertAfter(a), c.push({ check: 'parent-down', el: t })), t.add(n, 0)) : (t = null, f = F[k.name] || F.span, n.insertAfter(a), k.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || n.type != CKEDITOR.NODE_ELEMENT || f[n.name] || c.push({ check: 'el-up', el: n })); a.remove() }
        }
      } else {
        d in
{ style: 1, script: 1 }
          ? a.remove()
          : (a.parent && c.push({ check: 'it', el: a.parent }), a.replaceWithChildren())
      }
    } function p (a, b, c) { let d, k; for (d = 0; d < c.length; ++d) if (k = c[d], !(k.check && !a.check(k.check, !1) || k.left && !k.left(b))) { k.right(b, K); break } } function n (a, b) {
      let c = b.getDefinition(); const d = c.attributes; const k = c.styles; let e; let p; let n; let t; if (a.name != c.element) return !1; for (e in d) if (e == 'class') for (c = d[e].split(/\s+/), n = a.classes.join('|'); t = c.pop();) { if (n.indexOf(t) == -1) return !1 } else if (a.attributes[e] != d[e]) return !1; for (p in k) {
        if (a.styles[p] !=
k[p]) return !1
      } return !0
    } function t (a, b) { let c, d; typeof a === 'string' ? c = a : a instanceof CKEDITOR.style ? d = a : (c = a[0], d = a[1]); return [{ element: c, left: d, right: function (a, c) { c.transform(a, b) } }] } function z (a) { return function (b) { return n(b, a) } } function B (a) { return function (b, c) { c[a](b) } } var F = CKEDITOR.dtd; var L = CKEDITOR.tools.copy; var H = CKEDITOR.tools.trim; const R = ['', 'p', 'br', 'div']; CKEDITOR.FILTER_SKIP_TREE = 2; CKEDITOR.filter = function (a) {
      this.allowedContent = []; this.disallowedContent = []; this.elementCallbacks = null; this.disabled =
!1; this.editor = null; this.id = CKEDITOR.tools.getNextNumber(); this._ = { allowedRules: { elements: {}, generic: [] }, disallowedRules: { elements: {}, generic: [] }, transformations: {}, cachedTests: {} }; CKEDITOR.filter.instances[this.id] = this; if (a instanceof CKEDITOR.editor) {
        a = this.editor = a; this.customConfig = !0; const b = a.config.allowedContent; !0 === b
          ? this.disabled = !0
          : (b || (this.customConfig = !1), this.allow(b, 'config', 1), this.allow(a.config.extraAllowedContent, 'extra', 1), this.allow(R[a.enterMode] + ' ' + R[a.shiftEnterMode], 'default',
              1), this.disallow(a.config.disallowedContent))
      } else this.customConfig = !1, this.allow(a, 'default', 1)
    }; CKEDITOR.filter.instances = {}; CKEDITOR.filter.prototype = {
      allow: function (b, c, d) {
        if (!g(this, b, d)) return !1; let k, e; if (typeof b === 'string')b = f(b); else if (b instanceof CKEDITOR.style) {
          if (b.toAllowedContentRules) return this.allow(b.toAllowedContentRules(this.editor), c, d); k = b.getDefinition(); b = {}; d = k.attributes; b[k.element] = k = { styles: k.styles, requiredStyles: k.styles && CKEDITOR.tools.objectKeys(k.styles) }; d && (d =
L(d), k.classes = d.class ? d.class.split(/\s+/) : null, k.requiredClasses = k.classes, delete d.class, k.attributes = d, k.requiredAttributes = d && CKEDITOR.tools.objectKeys(d))
        } else if (CKEDITOR.tools.isArray(b)) { for (k = 0; k < b.length; ++k)e = this.allow(b[k], c, d); return e }a(this, b, c, this.allowedContent, this._.allowedRules); return !0
      },
      applyTo: function (a, b, c, d) {
        if (this.disabled) return !1; const e = this; const p = []; const n = this.editor && this.editor.config.protectedSource; let t; let f = !1; const g = { doFilter: !c, doTransform: !0, doCallbacks: !0, toHtml: b }
        a.forEach(function (a) {
          if (a.type == CKEDITOR.NODE_ELEMENT) { if (a.attributes['data-cke-filter'] == 'off') return !1; if (!b || a.name != 'span' || !~CKEDITOR.tools.objectKeys(a.attributes).join('|').indexOf('data-cke-')) if (t = A(e, a, p, g), t & 1)f = !0; else if (t & 2) return !1 } else if (a.type == CKEDITOR.NODE_COMMENT && a.value.match(/^\{cke_protected\}(?!\{C\})/)) {
            let c; a: {
              let d = decodeURIComponent(a.value.replace(/^\{cke_protected\}/, '')); c = []; let k, q, D; if (n) {
                for (q = 0; q < n.length; ++q) {
                  if ((D = d.match(n[q])) && D[0].length == d.length) {
                    c = !0
                    break a
                  }
                }
              }d = CKEDITOR.htmlParser.fragment.fromHtml(d); d.children.length == 1 && (k = d.children[0]).type == CKEDITOR.NODE_ELEMENT && A(e, k, c, g); c = !c.length
            }c || p.push(a)
          }
        }, null, !0); p.length && (f = !0); let q; a = []; d = R[d || (this.editor ? this.editor.enterMode : CKEDITOR.ENTER_P)]; for (var D; c = p.pop();)c.type == CKEDITOR.NODE_ELEMENT ? k(c, d, a) : c.remove(); for (;q = a.pop();) {
          if (c = q.el, c.parent) {
            switch (D = F[c.parent.name] || F.span, q.check) {
              case 'it':F.$removeEmpty[c.name] && !c.children.length ? k(c, d, a) : x(c) || k(c, d, a); break; case 'el-up':c.parent.type ==
CKEDITOR.NODE_DOCUMENT_FRAGMENT || D[c.name] || k(c, d, a); break; case 'parent-down':c.parent.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || D[c.name] || k(c.parent, d, a)
            }
          }
        } return f
      },
      checkFeature: function (a) { if (this.disabled || !a) return !0; a.toFeature && (a = a.toFeature(this.editor)); return !a.requiredContent || this.check(a.requiredContent) },
      disable: function () { this.disabled = !0 },
      disallow: function (b) { if (!g(this, b, !0)) return !1; typeof b === 'string' && (b = f(b)); a(this, b, null, this.disallowedContent, this._.disallowedRules); return !0 },
      addContentForms: function (a) { if (!this.disabled && a) { let b; let c; const d = []; let k; for (b = 0; b < a.length && !k; ++b)c = a[b], (typeof c === 'string' || c instanceof CKEDITOR.style) && this.check(c) && (k = c); if (k) { for (b = 0; b < a.length; ++b)d.push(t(a[b], k)); this.addTransformations(d) } } },
      addElementCallback: function (a) { this.elementCallbacks || (this.elementCallbacks = []); this.elementCallbacks.push(a) },
      addFeature: function (a) {
        if (this.disabled || !a) return !0; a.toFeature && (a = a.toFeature(this.editor)); this.allow(a.allowedContent, a.name); this.addTransformations(a.contentTransformations)
        this.addContentForms(a.contentForms); return a.requiredContent && (this.customConfig || this.disallowedContent.length) ? this.check(a.requiredContent) : !0
      },
      addTransformations: function (a) {
        let b, c; if (!this.disabled && a) {
          const d = this._.transformations; let k; for (k = 0; k < a.length; ++k) {
            b = a[k]; let e = void 0; let p = void 0; let n = void 0; let t = void 0; let f = void 0; let g = void 0; c = []; for (p = 0; p < b.length; ++p) {
              n = b[p], typeof n === 'string' ? (n = n.split(/\s*:\s*/), t = n[0], f = null, g = n[1]) : (t = n.check, f = n.left, g = n.right), e || (e = n, e = e.element
                ? e.element
                : t
                  ? t.match(/^([a-z0-9]+)/i)[0]
                  : e.left.getDefinition().element), f instanceof CKEDITOR.style && (f = z(f)), c.push({ check: t == e ? null : t, left: f, right: typeof g === 'string' ? B(g) : g })
            }b = e; d[b] || (d[b] = []); d[b].push(c)
          }
        }
      },
      check: function (a, b, c) {
        if (this.disabled) return !0; if (CKEDITOR.tools.isArray(a)) { for (var d = a.length; d--;) if (this.check(a[d], b, c)) return !0; return !1 } let k, e; if (typeof a === 'string') {
          e = a + '\x3c' + (!1 === b ? '0' : '1') + (c ? '1' : '0') + '\x3e'; if (e in this._.cachedChecks) return this._.cachedChecks[e]; d = f(a).$1; k = d.styles; var n = d.classes; d.name = d.elements
          d.classes = n = n ? n.split(/\s*,\s*/) : []; d.styles = r(k); d.attributes = r(d.attributes); d.children = []; n.length && (d.attributes.class = n.join(' ')); k && (d.attributes.style = CKEDITOR.tools.writeCssText(d.styles)); k = d
        } else d = a.getDefinition(), k = d.styles, n = d.attributes || {}, k && !CKEDITOR.tools.isEmpty(k) ? (k = L(k), n.style = CKEDITOR.tools.writeCssText(k, !0)) : k = {}, k = { name: d.element, attributes: n, classes: n.class ? n.class.split(/\s+/) : [], styles: k, children: [] }; var n = CKEDITOR.tools.clone(k); const t = []; let g; if (!1 !== b && (g = this._.transformations[k.name])) {
          for (d =
0; d < g.length; ++d)p(this, k, g[d]); q(k)
        }A(this, n, t, { doFilter: !0, doTransform: !1 !== b, skipRequired: !c, skipFinalValidation: !c }); b = t.length > 0 ? !1 : CKEDITOR.tools.objectCompare(k.attributes, n.attributes, !0) ? !0 : !1; typeof a === 'string' && (this._.cachedChecks[e] = b); return b
      },
      getAllowedEnterMode: (function () {
        const a = ['p', 'div', 'br']; const b = { p: CKEDITOR.ENTER_P, div: CKEDITOR.ENTER_DIV, br: CKEDITOR.ENTER_BR }; return function (c, d) {
          let k = a.slice(); let e; if (this.check(R[c])) return c; for (d || (k = k.reverse()); e = k.pop();) if (this.check(e)) return b[e]
          return CKEDITOR.ENTER_BR
        }
      }()),
      destroy: function () { delete CKEDITOR.filter.instances[this.id]; delete this._; delete this.allowedContent; delete this.disallowedContent }
    }; var Q = { styles: 1, attributes: 1, classes: 1 }; var P = { styles: 'requiredStyles', attributes: 'requiredAttributes', classes: 'requiredClasses' }; var v = /^([a-z0-9\-*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i; var G = { styles: /{([^}]+)}/, attrs: /\[([^\]]+)\]/, classes: /\(([^\)]+)\)/ }; var D = /^cke:(object|embed|param)$/
    var I = /^(object|embed|param)$/; let K; K = CKEDITOR.filter.transformationsTools = {
      sizeToStyle: function (a) { this.lengthToStyle(a, 'width'); this.lengthToStyle(a, 'height') },
      sizeToAttribute: function (a) { this.lengthToAttribute(a, 'width'); this.lengthToAttribute(a, 'height') },
      lengthToStyle: function (a, b, c) { c = c || b; if (!(c in a.styles)) { let d = a.attributes[b]; d && (/^\d+$/.test(d) && (d += 'px'), a.styles[c] = d) } delete a.attributes[b] },
      lengthToAttribute: function (a, b, c) {
        c = c || b; if (!(c in a.attributes)) {
          const d = a.styles[b]; const k = d && d.match(/^(\d+)(?:\.\d*)?px$/)
          k ? a.attributes[c] = k[1] : d == 'cke-test' && (a.attributes[c] = 'cke-test')
        } delete a.styles[b]
      },
      alignmentToStyle: function (a) { if (!('float' in a.styles)) { const b = a.attributes.align; if (b == 'left' || b == 'right')a.styles.float = b } delete a.attributes.align },
      alignmentToAttribute: function (a) { if (!('align' in a.attributes)) { const b = a.styles.float; if (b == 'left' || b == 'right')a.attributes.align = b } delete a.styles.float },
      splitBorderShorthand: function (a) {
        function b (d) {
          a.styles['border-top-width'] = c[d[0]]; a.styles['border-right-width'] =
c[d[1]]; a.styles['border-bottom-width'] = c[d[2]]; a.styles['border-left-width'] = c[d[3]]
        } if (a.styles.border) {
          var c = a.styles.border.match(/([\.\d]+\w+)/g) || ['0px']; switch (c.length) { case 1:a.styles['border-width'] = c[0]; break; case 2:b([0, 1, 0, 1]); break; case 3:b([0, 1, 2, 1]); break; case 4:b([0, 1, 2, 3]) }a.styles['border-style'] = a.styles['border-style'] || (a.styles.border.match(/(none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset|initial|inherit)/) || [])[0]; a.styles['border-style'] || delete a.styles['border-style']
          delete a.styles.border
        }
      },
      listTypeToStyle: function (a) { if (a.attributes.type) switch (a.attributes.type) { case 'a':a.styles['list-style-type'] = 'lower-alpha'; break; case 'A':a.styles['list-style-type'] = 'upper-alpha'; break; case 'i':a.styles['list-style-type'] = 'lower-roman'; break; case 'I':a.styles['list-style-type'] = 'upper-roman'; break; case '1':a.styles['list-style-type'] = 'decimal'; break; default:a.styles['list-style-type'] = a.attributes.type } },
      splitMarginShorthand: function (a) {
        function b (d) {
          a.styles['margin-top'] =
c[d[0]]; a.styles['margin-right'] = c[d[1]]; a.styles['margin-bottom'] = c[d[2]]; a.styles['margin-left'] = c[d[3]]
        } if (a.styles.margin) { var c = a.styles.margin.match(/(\-?[\.\d]+\w+)/g) || ['0px']; switch (c.length) { case 1:a.styles.margin = c[0]; break; case 2:b([0, 1, 0, 1]); break; case 3:b([0, 1, 2, 1]); break; case 4:b([0, 1, 2, 3]) } delete a.styles.margin }
      },
      matchesStyle: n,
      transform: function (a, b) {
        if (typeof b === 'string')a.name = b; else {
          let c = b.getDefinition(); const d = c.styles; const k = c.attributes; let e; let p; let n; let t; a.name = c.element; for (e in k) {
            if (e ==
'class') for (c = a.classes.join('|'), n = k[e].split(/\s+/); t = n.pop();)c.indexOf(t) == -1 && a.classes.push(t); else a.attributes[e] = k[e]
          } for (p in d)a.styles[p] = d[p]
        }
      }
    }
  })();
  (function () {
    CKEDITOR.focusManager = function (a) { if (a.focusManager) return a.focusManager; this.hasFocus = !1; this.currentActive = null; this._ = { editor: a }; return this }; CKEDITOR.focusManager._ = { blurDelay: 200 }; CKEDITOR.focusManager.prototype = {
      focus: function (a) { this._.timer && clearTimeout(this._.timer); a && (this.currentActive = a); this.hasFocus || this._.locked || ((a = CKEDITOR.currentInstance) && a.focusManager.blur(1), this.hasFocus = !0, (a = this._.editor.container) && a.addClass('cke_focus'), this._.editor.fire('focus')) },
      lock: function () {
        this._.locked =
1
      },
      unlock: function () { delete this._.locked },
      blur: function (a) { function d () { if (this.hasFocus) { this.hasFocus = !1; const a = this._.editor.container; a && a.removeClass('cke_focus'); this._.editor.fire('blur') } } if (!this._.locked) { this._.timer && clearTimeout(this._.timer); const b = CKEDITOR.focusManager._.blurDelay; a || !b ? d.call(this) : this._.timer = CKEDITOR.tools.setTimeout(function () { delete this._.timer; d.call(this) }, b, this) } },
      add: function (a, d) {
        var b = a.getCustomData('focusmanager'); if (!b || b != this) {
          b && b.remove(a); var b =
'focus'; let c = 'blur'; d && (CKEDITOR.env.ie ? (b = 'focusin', c = 'focusout') : CKEDITOR.event.useCapture = 1); const e = { blur: function () { a.equals(this.currentActive) && this.blur() }, focus: function () { this.focus(a) } }; a.on(b, e.focus, this); a.on(c, e.blur, this); d && (CKEDITOR.event.useCapture = 0); a.setCustomData('focusmanager', this); a.setCustomData('focusmanager_handlers', e)
        }
      },
      remove: function (a) {
        a.removeCustomData('focusmanager'); const d = a.removeCustomData('focusmanager_handlers'); a.removeListener('blur', d.blur); a.removeListener('focus',
          d.focus)
      }
    }
  })(); CKEDITOR.keystrokeHandler = function (a) { if (a.keystrokeHandler) return a.keystrokeHandler; this.keystrokes = {}; this.blockedKeystrokes = {}; this._ = { editor: a }; return this };
  (function () { let a; const d = function (b) { b = b.data; const d = b.getKeystroke(); const g = this.keystrokes[d]; const h = this._.editor; a = !1 === h.fire('key', { keyCode: d, domEvent: b }); a || (g && (a = !1 !== h.execCommand(g, { from: 'keystrokeHandler' })), a || (a = !!this.blockedKeystrokes[d])); a && b.preventDefault(!0); return !a }; const b = function (b) { a && (a = !1, b.data.preventDefault(!0)) }; CKEDITOR.keystrokeHandler.prototype = { attach: function (a) { a.on('keydown', d, this); if (CKEDITOR.env.gecko && CKEDITOR.env.mac)a.on('keypress', b, this) } } })();
  (function () {
    CKEDITOR.lang = {
      languages: { af: 1, ar: 1, bg: 1, bn: 1, bs: 1, ca: 1, cs: 1, cy: 1, da: 1, de: 1, 'de-ch': 1, el: 1, 'en-au': 1, 'en-ca': 1, 'en-gb': 1, en: 1, eo: 1, es: 1, et: 1, eu: 1, fa: 1, fi: 1, fo: 1, 'fr-ca': 1, fr: 1, gl: 1, gu: 1, he: 1, hi: 1, hr: 1, hu: 1, id: 1, is: 1, it: 1, ja: 1, ka: 1, km: 1, ko: 1, ku: 1, lt: 1, lv: 1, mk: 1, mn: 1, ms: 1, nb: 1, nl: 1, no: 1, oc: 1, pl: 1, 'pt-br': 1, pt: 1, ro: 1, ru: 1, si: 1, sk: 1, sl: 1, sq: 1, 'sr-latn': 1, sr: 1, sv: 1, th: 1, tr: 1, tt: 1, ug: 1, uk: 1, vi: 1, 'zh-cn': 1, zh: 1 },
      rtl: { ar: 1, fa: 1, he: 1, ku: 1, ug: 1 },
      load: function (a, d, b) {
        a && CKEDITOR.lang.languages[a] ||
(a = this.detect(d, a)); const c = this; d = function () { c[a].dir = c.rtl[a] ? 'rtl' : 'ltr'; b(a, c[a]) }; this[a] ? d() : CKEDITOR.scriptLoader.load(CKEDITOR.getUrl('lang/' + a + '.js'), d, this)
      },
      detect: function (a, d) { const b = this.languages; d = d || navigator.userLanguage || navigator.language || a; var c = d.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/); let e = c[1]; var c = c[2]; b[e + '-' + c] ? e = e + '-' + c : b[e] || (e = null); CKEDITOR.lang.detect = e ? function () { return e } : function (a) { return a }; return e || a }
    }
  })()
  CKEDITOR.scriptLoader = (function () {
    const a = {}; const d = {}; return {
      load: function (b, c, e, g) {
        const h = typeof b === 'string'; h && (b = [b]); e || (e = CKEDITOR); let l = b.length; const m = []; const r = []; const f = function (a) { c && (h ? c.call(e, a) : c.call(e, m, r)) }; if (l === 0)f(!0); else {
          const C = function (a, b) { (b ? m : r).push(a); --l <= 0 && (g && CKEDITOR.document.getDocumentElement().removeStyle('cursor'), f(b)) }; const u = function (b, c) { a[b] = 1; const e = d[b]; delete d[b]; for (let f = 0; f < e.length; f++)e[f](b, c) }; const A = function (b) {
            if (a[b])C(b, !0); else {
              const e = d[b] || (d[b] = []); e.push(C); if (!(e.length > 1)) {
                const f =
new CKEDITOR.dom.element('script'); f.setAttributes({ type: 'text/javascript', src: b }); c && (CKEDITOR.env.ie && (CKEDITOR.env.version <= 8 || CKEDITOR.env.ie9Compat) ? f.$.onreadystatechange = function () { if (f.$.readyState == 'loaded' || f.$.readyState == 'complete')f.$.onreadystatechange = null, u(b, !0) } : (f.$.onload = function () { setTimeout(function () { u(b, !0) }, 0) }, f.$.onerror = function () { u(b, !1) })); f.appendTo(CKEDITOR.document.getHead())
              }
            }
          }; g && CKEDITOR.document.getDocumentElement().setStyle('cursor', 'wait'); for (let y = 0; y < l; y++)A(b[y])
        }
      },
      queue: (function () { function a () { let b; (b = c[0]) && this.load(b.scriptUrl, b.callback, CKEDITOR, 0) } var c = []; return function (d, g) { const h = this; c.push({ scriptUrl: d, callback: function () { g && g.apply(this, arguments); c.shift(); a.call(h) } }); c.length == 1 && a.call(this) } }())
    }
  }()); CKEDITOR.resourceManager = function (a, d) { this.basePath = a; this.fileName = d; this.registered = {}; this.loaded = {}; this.externals = {}; this._ = { waitingList: {} } }
  CKEDITOR.resourceManager.prototype = {
    add: function (a, d) { if (this.registered[a]) throw Error('[CKEDITOR.resourceManager.add] The resource name "' + a + '" is already registered.'); const b = this.registered[a] = d || {}; b.name = a; b.path = this.getPath(a); CKEDITOR.fire(a + CKEDITOR.tools.capitalize(this.fileName) + 'Ready', b); return this.get(a) },
    get: function (a) { return this.registered[a] || null },
    getPath: function (a) { const d = this.externals[a]; return CKEDITOR.getUrl(d && d.dir || this.basePath + a + '/') },
    getFilePath: function (a) {
      const d = this.externals[a]
      return CKEDITOR.getUrl(this.getPath(a) + (d ? d.file : this.fileName + '.js'))
    },
    addExternal: function (a, d, b) { a = a.split(','); for (let c = 0; c < a.length; c++) { const e = a[c]; b || (d = d.replace(/[^\/]+$/, function (a) { b = a; return '' })); this.externals[e] = { dir: d, file: b || this.fileName + '.js' } } },
    load: function (a, d, b) {
      CKEDITOR.tools.isArray(a) || (a = a ? [a] : []); for (var c = this.loaded, e = this.registered, g = [], h = {}, l = {}, m = 0; m < a.length; m++) {
        const r = a[m]; if (r) {
          if (c[r] || e[r])l[r] = this.get(r); else {
            const f = this.getFilePath(r); g.push(f); f in h || (h[f] =
[]); h[f].push(r)
          }
        }
      }CKEDITOR.scriptLoader.load(g, function (a, e) { if (e.length) throw Error('[CKEDITOR.resourceManager.load] Resource name "' + h[e[0]].join(',') + '" was not found at "' + e[0] + '".'); for (let f = 0; f < a.length; f++) for (let g = h[a[f]], q = 0; q < g.length; q++) { const x = g[q]; l[x] = this.get(x); c[x] = 1 }d.call(b, l) }, this)
    }
  }; CKEDITOR.plugins = new CKEDITOR.resourceManager('plugins/', 'plugin')
  CKEDITOR.plugins.load = CKEDITOR.tools.override(CKEDITOR.plugins.load, function (a) {
    const d = {}; return function (b, c, e) {
      const g = {}; var h = function (b) {
        a.call(this, b, function (a) {
          CKEDITOR.tools.extend(g, a); const b = []; let f; for (f in a) { var l = a[f]; let u = l && l.requires; if (!d[f]) { if (l.icons) for (let A = l.icons.split(','), y = A.length; y--;)CKEDITOR.skin.addIcon(A[y], l.path + 'icons/' + (CKEDITOR.env.hidpi && l.hidpi ? 'hidpi/' : '') + A[y] + '.png'); d[f] = 1 } if (u) for (u.split && (u = u.split(',')), l = 0; l < u.length; l++)g[u[l]] || b.push(u[l]) } if (b.length) {
            h.call(this,
              b)
          } else { for (f in g)l = g[f], l.onLoad && !l.onLoad._called && (!1 === l.onLoad() && delete g[f], l.onLoad._called = 1); c && c.call(e || window, g) }
        }, this)
      }; h.call(this, b)
    }
  }); CKEDITOR.plugins.setLang = function (a, d, b) { let c = this.get(a); a = c.langEntries || (c.langEntries = {}); c = c.lang || (c.lang = []); c.split && (c = c.split(',')); CKEDITOR.tools.indexOf(c, d) == -1 && c.push(d); a[d] = b }; CKEDITOR.ui = function (a) { if (a.ui) return a.ui; this.items = {}; this.instances = {}; this.editor = a; this._ = { handlers: {} }; return this }
  CKEDITOR.ui.prototype = {
    add: function (a, d, b) { b.name = a.toLowerCase(); const c = this.items[a] = { type: d, command: b.command || null, args: Array.prototype.slice.call(arguments, 2) }; CKEDITOR.tools.extend(c, b) },
    get: function (a) { return this.instances[a] },
    create: function (a) { const d = this.items[a]; var b = d && this._.handlers[d.type]; const c = d && d.command && this.editor.getCommand(d.command); var b = b && b.create.apply(this, d.args); this.instances[a] = b; c && c.uiItems.push(b); b && !b.type && (b.type = d.type); return b },
    addHandler: function (a, d) {
      this._.handlers[a] =
d
    },
    space: function (a) { return CKEDITOR.document.getById(this.spaceId(a)) },
    spaceId: function (a) { return this.editor.id + '_' + a }
  }; CKEDITOR.event.implementOn(CKEDITOR.ui);
  (function () {
    function a (a, e, f) {
      CKEDITOR.event.call(this); a = a && CKEDITOR.tools.clone(a); if (void 0 !== e) {
        if (!(e instanceof CKEDITOR.dom.element)) throw Error('Expect element of type CKEDITOR.dom.element.'); if (!f) throw Error('One of the element modes must be specified.'); if (CKEDITOR.env.ie && CKEDITOR.env.quirks && f == CKEDITOR.ELEMENT_MODE_INLINE) throw Error('Inline element mode is not supported on IE quirks.'); if (!b(e, f)) throw Error('The specified element mode is not supported on element: "' + e.getName() + '".')
        this.element = e; this.elementMode = f; this.name = this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO && (e.getId() || e.getNameAtt())
      } else this.elementMode = CKEDITOR.ELEMENT_MODE_NONE; this._ = {}; this.commands = {}; this.templates = {}; this.name = this.name || d(); this.id = CKEDITOR.tools.getNextId(); this.status = 'unloaded'; this.config = CKEDITOR.tools.prototypedCopy(CKEDITOR.config); this.ui = new CKEDITOR.ui(this); this.focusManager = new CKEDITOR.focusManager(this); this.keystrokeHandler = new CKEDITOR.keystrokeHandler(this); this.on('readOnly',
        c); this.on('selectionChange', function (a) { g(this, a.data.path) }); this.on('activeFilterChange', function () { g(this, this.elementPath(), !0) }); this.on('mode', c); this.on('instanceReady', function () { this.config.startupFocus && this.focus() }); CKEDITOR.fire('instanceCreated', null, this); CKEDITOR.add(this); CKEDITOR.tools.setTimeout(function () { this.status !== 'destroyed' ? l(this, a) : CKEDITOR.warn('editor-incorrect-destroy') }, 0, this)
    } function d () { do var a = 'editor' + ++A; while (CKEDITOR.instances[a]); return a } function b (a,
      b) { return b == CKEDITOR.ELEMENT_MODE_INLINE ? a.is(CKEDITOR.dtd.$editable) || a.is('textarea') : b == CKEDITOR.ELEMENT_MODE_REPLACE ? !a.is(CKEDITOR.dtd.$nonBodyContent) : 1 } function c () { const a = this.commands; let b; for (b in a)e(this, a[b]) } function e (a, b) { b[b.startDisabled ? 'disable' : a.readOnly && !b.readOnly ? 'disable' : b.modes[a.mode] ? 'enable' : 'disable']() } function g (a, b, c) { if (b) { let d; let e; const k = a.commands; for (e in k)d = k[e], (c || d.contextSensitive) && d.refresh(a, b) } } function h (a) {
      var b = a.config.customConfig; if (!b) return !1; var b =
CKEDITOR.getUrl(b); const c = y[b] || (y[b] = {}); c.fn ? (c.fn.call(a, a.config), CKEDITOR.getUrl(a.config.customConfig) != b && h(a) || a.fireOnce('customConfigLoaded')) : CKEDITOR.scriptLoader.queue(b, function () { c.fn = CKEDITOR.editorConfig ? CKEDITOR.editorConfig : function () {}; h(a) }); return !0
    } function l (a, b) {
      a.on('customConfigLoaded', function () {
        if (b) { if (b.on) for (var c in b.on)a.on(c, b.on[c]); CKEDITOR.tools.extend(a.config, b, !0); delete a.config.on }c = a.config; a.readOnly = c.readOnly
          ? !0
          : a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE
            ? a.element.is('textarea') ? a.element.hasAttribute('disabled') || a.element.hasAttribute('readonly') : a.element.isReadOnly()
            : a.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? a.element.hasAttribute('disabled') || a.element.hasAttribute('readonly') : !1; a.blockless = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? !(a.element.is('textarea') || CKEDITOR.dtd[a.element.getName()].p) : !1; a.tabIndex = c.tabIndex || a.element && a.element.getAttribute('tabindex') || 0; a.activeEnterMode = a.enterMode = a.blockless ? CKEDITOR.ENTER_BR : c.enterMode
        a.activeShiftEnterMode = a.shiftEnterMode = a.blockless ? CKEDITOR.ENTER_BR : c.shiftEnterMode; c.skin && (CKEDITOR.skinName = c.skin); a.fireOnce('configLoaded'); a.dataProcessor = new CKEDITOR.htmlDataProcessor(a); a.filter = a.activeFilter = new CKEDITOR.filter(a); m(a)
      }); b && b.customConfig != null && (a.config.customConfig = b.customConfig); h(a) || a.fireOnce('customConfigLoaded')
    } function m (a) { CKEDITOR.skin.loadPart('editor', function () { r(a) }) } function r (a) {
      CKEDITOR.lang.load(a.config.language, a.config.defaultLanguage, function (b,
        c) { const d = a.config.title; a.langCode = b; a.lang = CKEDITOR.tools.prototypedCopy(c); a.title = typeof d === 'string' || !1 === d ? d : [a.lang.editor, a.name].join(', '); a.config.contentsLangDirection || (a.config.contentsLangDirection = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.getDirection(1) : a.lang.dir); a.fire('langLoaded'); f(a) })
    } function f (a) { a.getStylesSet(function (b) { a.once('loaded', function () { a.fire('stylesSet', { styles: b }) }, null, null, 1); C(a) }) } function C (a) {
      const b = a.config; var c = b.plugins; const d = b.extraPlugins; const e =
b.removePlugins; if (d) var k = new RegExp('(?:^|,)(?:' + d.replace(/\s*,\s*/g, '|') + ')(?\x3d,|$)', 'g'), c = c.replace(k, ''), c = c + (',' + d); if (e) var p = new RegExp('(?:^|,)(?:' + e.replace(/\s*,\s*/g, '|') + ')(?\x3d,|$)', 'g'), c = c.replace(p, ''); CKEDITOR.env.air && (c += ',adobeair'); CKEDITOR.plugins.load(c.split(','), function (c) {
        const d = []; const k = []; const e = []; a.plugins = c; for (const f in c) {
          const g = c[f]; let h = g.lang; let l = null; let m = g.requires; var r; CKEDITOR.tools.isArray(m) && (m = m.join(',')); if (m && (r = m.match(p))) {
            for (;m = r.pop();) {
              CKEDITOR.error('editor-plugin-required',
                { plugin: m.replace(',', ''), requiredBy: f })
            }
          }h && !a.lang[f] && (h.split && (h = h.split(',')), CKEDITOR.tools.indexOf(h, a.langCode) >= 0 ? l = a.langCode : (l = a.langCode.replace(/-.*/, ''), l = l != a.langCode && CKEDITOR.tools.indexOf(h, l) >= 0 ? l : CKEDITOR.tools.indexOf(h, 'en') >= 0 ? 'en' : h[0]), g.langEntries && g.langEntries[l] ? (a.lang[f] = g.langEntries[l], l = null) : e.push(CKEDITOR.getUrl(g.path + 'lang/' + l + '.js'))); k.push(l); d.push(g)
        }CKEDITOR.scriptLoader.load(e, function () {
          for (let c = ['beforeInit', 'init', 'afterInit'], e = 0; e < c.length; e++) {
            for (var p =
0; p < d.length; p++) { const n = d[p]; e === 0 && k[p] && n.lang && n.langEntries && (a.lang[n.name] = n.langEntries[k[p]]); if (n[c[e]])n[c[e]](a) }
          }a.fireOnce('pluginsLoaded'); b.keystrokes && a.setKeystroke(a.config.keystrokes); for (p = 0; p < a.config.blockedKeystrokes.length; p++)a.keystrokeHandler.blockedKeystrokes[a.config.blockedKeystrokes[p]] = 1; a.status = 'loaded'; a.fireOnce('loaded'); CKEDITOR.fire('instanceLoaded', null, a)
        })
      })
    } function u () {
      const a = this.element; if (a && this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO) {
        let b = this.getData()
        this.config.htmlEncodeOutput && (b = CKEDITOR.tools.htmlEncode(b)); a.is('textarea') ? a.setValue(b) : a.setHtml(b); return !0
      } return !1
    }a.prototype = CKEDITOR.editor.prototype; CKEDITOR.editor = a; var A = 0; var y = {}; CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
      addCommand: function (a, b) { b.name = a.toLowerCase(); const c = new CKEDITOR.command(this, b); this.mode && e(this, c); return this.commands[a] = c },
      _attachToForm: function () {
        function a (b) { c.updateElement(); c._.required && !d.getValue() && !1 === c.fire('required') && b.data.preventDefault() }
        function b (a) { return !!(a && a.call && a.apply) } var c = this; var d = c.element; const e = new CKEDITOR.dom.element(d.$.form); d.is('textarea') && e && (e.on('submit', a), b(e.$.submit) && (e.$.submit = CKEDITOR.tools.override(e.$.submit, function (b) { return function () { a(); b.apply ? b.apply(this) : b() } })), c.on('destroy', function () { e.removeListener('submit', a) }))
      },
      destroy: function (a) {
        this.fire('beforeDestroy'); !a && u.call(this); this.editable(null); this.filter && (this.filter.destroy(), delete this.filter); delete this.activeFilter; this.status =
'destroyed'; this.fire('destroy'); this.removeAllListeners(); CKEDITOR.remove(this); CKEDITOR.fire('instanceDestroyed', null, this)
      },
      elementPath: function (a) { if (!a) { a = this.getSelection(); if (!a) return null; a = a.getStartElement() } return a ? new CKEDITOR.dom.elementPath(a, this.editable()) : null },
      createRange: function () { const a = this.editable(); return a ? new CKEDITOR.dom.range(a) : null },
      execCommand: function (a, b) {
        const c = this.getCommand(a); const d = { name: a, commandData: b, command: c }; return c && c.state != CKEDITOR.TRISTATE_DISABLED &&
!1 !== this.fire('beforeCommandExec', d) && (d.returnValue = c.exec(d.commandData), !c.async && !1 !== this.fire('afterCommandExec', d))
          ? d.returnValue
          : !1
      },
      getCommand: function (a) { return this.commands[a] },
      getData: function (a) { !a && this.fire('beforeGetData'); let b = this._.data; typeof b !== 'string' && (b = (b = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? b.is('textarea') ? b.getValue() : b.getHtml() : ''); b = { dataValue: b }; !a && this.fire('getData', b); return b.dataValue },
      getSnapshot: function () {
        let a = this.fire('getSnapshot')
        typeof a !== 'string' && (a = (a = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? a.is('textarea') ? a.getValue() : a.getHtml() : ''); return a
      },
      loadSnapshot: function (a) { this.fire('loadSnapshot', a) },
      setData: function (a, b, c) {
        let d = !0; let e = b; b && typeof b === 'object' && (c = b.internal, e = b.callback, d = !b.noSnapshot); !c && d && this.fire('saveSnapshot'); if (e || !c) this.once('dataReady', function (a) { !c && d && this.fire('saveSnapshot'); e && e.call(a.editor) }); a = { dataValue: a }; !c && this.fire('setData', a); this._.data = a.dataValue
        !c && this.fire('afterSetData', a)
      },
      setReadOnly: function (a) { a = a == null || a; this.readOnly != a && (this.readOnly = a, this.keystrokeHandler.blockedKeystrokes[8] = +a, this.editable().setReadOnly(a), this.fire('readOnly')) },
      insertHtml: function (a, b, c) { this.fire('insertHtml', { dataValue: a, mode: b, range: c }) },
      insertText: function (a) { this.fire('insertText', a) },
      insertElement: function (a) { this.fire('insertElement', a) },
      getSelectedHtml: function (a) {
        let b = this.editable(); var c = this.getSelection(); var c = c && c.getRanges(); if (!b || !c || c.length === 0) return null
        for (var d = new CKEDITOR.dom.documentFragment(), e, k, p, n = 0; n < c.length; n++) { const f = c[n]; const g = f.startContainer; g.getName && g.getName() == 'tr' ? (e || (e = g.getAscendant('table').clone(), e.append(g.getAscendant('tbody').clone()), d.append(e), e = e.findOne('tbody')), k && k.equals(g) || (k = g, p = g.clone(), e.append(p)), p.append(f.cloneContents())) : d.append(f.cloneContents()) }b = e ? d : b.getHtmlFromRange(c[0]); return a ? b.getHtml() : b
      },
      extractSelectedHtml: function (a, b) {
        let c = this.editable(); let d = this.getSelection().getRanges(); if (!c || d.length ===
0) return null; d = d[0]; c = c.extractHtmlFromRange(d, b); b || this.getSelection().selectRanges([d]); return a ? c.getHtml() : c
      },
      focus: function () { this.fire('beforeFocus') },
      checkDirty: function () { return this.status == 'ready' && this._.previousValue !== this.getSnapshot() },
      resetDirty: function () { this._.previousValue = this.getSnapshot() },
      updateElement: function () { return u.call(this) },
      setKeystroke: function () {
        for (var a = this.keystrokeHandler.keystrokes, b = CKEDITOR.tools.isArray(arguments[0])
            ? arguments[0]
            : [[].slice.call(arguments,
                0)], c, d, e = b.length; e--;)c = b[e], d = 0, CKEDITOR.tools.isArray(c) && (d = c[1], c = c[0]), d ? a[c] = d : delete a[c]
      },
      getCommandKeystroke: function (a) { const b = a.name; const c = this.keystrokeHandler.keystrokes; let d; if (a.fakeKeystroke) return a.fakeKeystroke; for (d in c) if (c.hasOwnProperty(d) && c[d] == b) return d; return null },
      addFeature: function (a) { return this.filter.addFeature(a) },
      setActiveFilter: function (a) {
        a || (a = this.filter); this.activeFilter !== a && (this.activeFilter = a, this.fire('activeFilterChange'), a === this.filter
          ? this.setActiveEnterMode(null,
            null)
          : this.setActiveEnterMode(a.getAllowedEnterMode(this.enterMode), a.getAllowedEnterMode(this.shiftEnterMode, !0)))
      },
      setActiveEnterMode: function (a, b) { a = a ? this.blockless ? CKEDITOR.ENTER_BR : a : this.enterMode; b = b ? this.blockless ? CKEDITOR.ENTER_BR : b : this.shiftEnterMode; if (this.activeEnterMode != a || this.activeShiftEnterMode != b) this.activeEnterMode = a, this.activeShiftEnterMode = b, this.fire('activeEnterModeChange') },
      showNotification: function (a) { alert(a) }
    })
  })(); CKEDITOR.ELEMENT_MODE_NONE = 0
  CKEDITOR.ELEMENT_MODE_REPLACE = 1; CKEDITOR.ELEMENT_MODE_APPENDTO = 2; CKEDITOR.ELEMENT_MODE_INLINE = 3; CKEDITOR.htmlParser = function () { this._ = { htmlPartsRegex: /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)--\x3e)|(?:([^\/\s>]+)((?:\s+[\w\-:.]+(?:\s*=\s*?(?:(?:"[^"]*")|(?:'[^']*')|[^\s"'\/>]+))?)*)[\S\s]*?(\/?)>))/g } };
  (function () {
    const a = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g; const d = { checked: 1, compact: 1, declare: 1, defer: 1, disabled: 1, ismap: 1, multiple: 1, nohref: 1, noresize: 1, noshade: 1, nowrap: 1, readonly: 1, selected: 1 }; CKEDITOR.htmlParser.prototype = {
      onTagOpen: function () {},
      onTagClose: function () {},
      onText: function () {},
      onCDATA: function () {},
      onComment: function () {},
      parse: function (b) {
        for (var c, e, g = 0, h; c = this._.htmlPartsRegex.exec(b);) {
          e = c.index; if (e > g) if (g = b.substring(g, e), h)h.push(g); else this.onText(g)
          g = this._.htmlPartsRegex.lastIndex; if (e = c[1]) if (e = e.toLowerCase(), h && CKEDITOR.dtd.$cdata[e] && (this.onCDATA(h.join('')), h = null), !h) { this.onTagClose(e); continue } if (h)h.push(c[0]); else if (e = c[3]) { if (e = e.toLowerCase(), !/="/.test(e)) { const l = {}; var m; const r = c[4]; c = !!c[5]; if (r) for (;m = a.exec(r);) { const f = m[1].toLowerCase(); m = m[2] || m[3] || m[4] || ''; l[f] = !m && d[f] ? f : CKEDITOR.tools.htmlDecodeAttr(m) } this.onTagOpen(e, l, c); !h && CKEDITOR.dtd.$cdata[e] && (h = []) } } else if (e = c[2]) this.onComment(e)
        } if (b.length > g) {
          this.onText(b.substring(g,
            b.length))
        }
      }
    }
  })()
  CKEDITOR.htmlParser.basicWriter = CKEDITOR.tools.createClass({
    $: function () { this._ = { output: [] } },
    proto: {
      openTag: function (a) { this._.output.push('\x3c', a) },
      openTagClose: function (a, d) { d ? this._.output.push(' /\x3e') : this._.output.push('\x3e') },
      attribute: function (a, d) { typeof d === 'string' && (d = CKEDITOR.tools.htmlEncodeAttr(d)); this._.output.push(' ', a, '\x3d"', d, '"') },
      closeTag: function (a) { this._.output.push('\x3c/', a, '\x3e') },
      text: function (a) { this._.output.push(a) },
      comment: function (a) {
        this._.output.push('\x3c!--', a,
          '--\x3e')
      },
      write: function (a) { this._.output.push(a) },
      reset: function () { this._.output = []; this._.indent = !1 },
      getHtml: function (a) { const d = this._.output.join(''); a && this.reset(); return d }
    }
  }); 'use strict';
  (function () {
    CKEDITOR.htmlParser.node = function () {}; CKEDITOR.htmlParser.node.prototype = {
      remove: function () { const a = this.parent.children; const d = CKEDITOR.tools.indexOf(a, this); const b = this.previous; const c = this.next; b && (b.next = c); c && (c.previous = b); a.splice(d, 1); this.parent = null },
      replaceWith: function (a) { const d = this.parent.children; const b = CKEDITOR.tools.indexOf(d, this); const c = a.previous = this.previous; const e = a.next = this.next; c && (c.next = a); e && (e.previous = a); d[b] = a; a.parent = this.parent; this.parent = null },
      insertAfter: function (a) {
        const d = a.parent.children
        const b = CKEDITOR.tools.indexOf(d, a); const c = a.next; d.splice(b + 1, 0, this); this.next = a.next; this.previous = a; a.next = this; c && (c.previous = this); this.parent = a.parent
      },
      insertBefore: function (a) { const d = a.parent.children; const b = CKEDITOR.tools.indexOf(d, a); d.splice(b, 0, this); this.next = a; (this.previous = a.previous) && (a.previous.next = this); a.previous = this; this.parent = a.parent },
      getAscendant: function (a) {
        const d = typeof a === 'function' ? a : typeof a === 'string' ? function (b) { return b.name == a } : function (b) { return b.name in a }; let b = this.parent; for (;b &&
b.type == CKEDITOR.NODE_ELEMENT;) { if (d(b)) return b; b = b.parent } return null
      },
      wrapWith: function (a) { this.replaceWith(a); a.add(this); return a },
      getIndex: function () { return CKEDITOR.tools.indexOf(this.parent.children, this) },
      getFilterContext: function (a) { return a || {} }
    }
  })(); 'use strict'; CKEDITOR.htmlParser.comment = function (a) { this.value = a; this._ = { isBlockLike: !1 } }
  CKEDITOR.htmlParser.comment.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node(), { type: CKEDITOR.NODE_COMMENT, filter: function (a, d) { let b = this.value; if (!(b = a.onComment(d, b, this))) return this.remove(), !1; if (typeof b !== 'string') return this.replaceWith(b), !1; this.value = b; return !0 }, writeHtml: function (a, d) { d && this.filter(d); a.comment(this.value) } }); 'use strict';
  (function () { CKEDITOR.htmlParser.text = function (a) { this.value = a; this._ = { isBlockLike: !1 } }; CKEDITOR.htmlParser.text.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node(), { type: CKEDITOR.NODE_TEXT, filter: function (a, d) { if (!(this.value = a.onText(d, this.value, this))) return this.remove(), !1 }, writeHtml: function (a, d) { d && this.filter(d); a.text(this.value) } }) })(); 'use strict';
  (function () { CKEDITOR.htmlParser.cdata = function (a) { this.value = a }; CKEDITOR.htmlParser.cdata.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node(), { type: CKEDITOR.NODE_TEXT, filter: function () {}, writeHtml: function (a) { a.write(this.value) } }) })(); 'use strict'; CKEDITOR.htmlParser.fragment = function () { this.children = []; this.parent = null; this._ = { isBlockLike: !0, hasInlineStarted: !1 } };
  (function () {
    function a (a) { return a.attributes['data-cke-survive'] ? !1 : a.name == 'a' && a.attributes.href || CKEDITOR.dtd.$removeEmpty[a.name] } const d = CKEDITOR.tools.extend({ table: 1, ul: 1, ol: 1, dl: 1 }, CKEDITOR.dtd.table, CKEDITOR.dtd.ul, CKEDITOR.dtd.ol, CKEDITOR.dtd.dl); const b = { ol: 1, ul: 1 }; const c = CKEDITOR.tools.extend({}, { html: 1 }, CKEDITOR.dtd.html, CKEDITOR.dtd.body, CKEDITOR.dtd.head, { style: 1, script: 1 }); const e = { ul: 'li', ol: 'li', dl: 'dd', table: 'tbody', tbody: 'tr', thead: 'tr', tfoot: 'tr', tr: 'td' }; CKEDITOR.htmlParser.fragment.fromHtml =
function (g, h, l) {
  function m (a) { let b; if (x.length > 0) for (let c = 0; c < x.length; c++) { let d = x[c]; const k = d.name; const e = CKEDITOR.dtd[k]; const f = w.name && CKEDITOR.dtd[w.name]; f && !f[k] || a && e && !e[a] && CKEDITOR.dtd[a] ? k == w.name && (C(w, w.parent, 1), c--) : (b || (r(), b = 1), d = d.clone(), d.parent = w, w = d, x.splice(c, 1), c--) } } function r () { for (;J.length;)C(J.shift(), w) } function f (a) {
    if (a._.isBlockLike && a.name != 'pre' && a.name != 'textarea') {
      const b = a.children.length; const c = a.children[b - 1]; let d; c && c.type == CKEDITOR.NODE_TEXT && ((d = CKEDITOR.tools.rtrim(c.value))
        ? c.value = d
        : a.children.length = b - 1)
    }
  } function C (b, c, d) { c = c || w || q; const e = w; void 0 === b.previous && (u(c, b) && (w = c, y.onTagOpen(l, {}), b.returnPoint = c = w), f(b), a(b) && !b.children.length || c.add(b), b.name == 'pre' && (k = !1), b.name == 'textarea' && (E = !1)); b.returnPoint ? (w = b.returnPoint, delete b.returnPoint) : w = d ? c : e } function u (a, b) {
    if ((a == q || a.name == 'body') && l && (!a.name || CKEDITOR.dtd[a.name][l])) {
      let c, d; return (c = b.attributes && (d = b.attributes['data-cke-real-element-type']) ? d : b.name) && c in CKEDITOR.dtd.$inline && !(c in CKEDITOR.dtd.head) &&
!b.isOrphan || b.type == CKEDITOR.NODE_TEXT
    }
  } function A (a, b) { return a in CKEDITOR.dtd.$listItem || a in CKEDITOR.dtd.$tableContent ? a == b || a == 'dt' && b == 'dd' || a == 'dd' && b == 'dt' : !1 } var y = new CKEDITOR.htmlParser(); var q = h instanceof CKEDITOR.htmlParser.element ? h : typeof h === 'string' ? new CKEDITOR.htmlParser.element(h) : new CKEDITOR.htmlParser.fragment(); var x = []; var J = []; var w = q; var E = q.name == 'textarea'; var k = q.name == 'pre'; y.onTagOpen = function (e, n, f, g) {
    n = new CKEDITOR.htmlParser.element(e, n); n.isUnknown && f && (n.isEmpty = !0); n.isOptionalClose = g
    if (a(n))x.push(n); else {
      if (e == 'pre')k = !0; else { if (e == 'br' && k) { w.add(new CKEDITOR.htmlParser.text('\n')); return }e == 'textarea' && (E = !0) } if (e == 'br')J.push(n); else {
        for (;!(g = (f = w.name) ? CKEDITOR.dtd[f] || (w._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : c, n.isUnknown || w.isUnknown || g[e]);) {
          if (w.isOptionalClose)y.onTagClose(f); else if (e in b && f in b)f = w.children, (f = f[f.length - 1]) && f.name == 'li' || C(f = new CKEDITOR.htmlParser.element('li'), w), !n.returnPoint && (n.returnPoint = w), w = f; else if (e in CKEDITOR.dtd.$listItem &&
!A(e, f))y.onTagOpen(e == 'li' ? 'ul' : 'dl', {}, 0, 1); else if (f in d && !A(e, f))!n.returnPoint && (n.returnPoint = w), w = w.parent; else if (f in CKEDITOR.dtd.$inline && x.unshift(w), w.parent)C(w, w.parent, 1); else { n.isOrphan = 1; break }
        }m(e); r(); n.parent = w; n.isEmpty ? C(n) : w = n
      }
    }
  }; y.onTagClose = function (a) {
    for (var b = x.length - 1; b >= 0; b--) if (a == x[b].name) { x.splice(b, 1); return } for (var c = [], d = [], k = w; k != q && k.name != a;)k._.isBlockLike || d.unshift(k), c.push(k), k = k.returnPoint || k.parent; if (k != q) {
      for (b = 0; b < c.length; b++) { const e = c[b]; C(e, e.parent) }w =
k; k._.isBlockLike && r(); C(k, k.parent); k == w && (w = w.parent); x = x.concat(d)
    }a == 'body' && (l = !1)
  }; y.onText = function (a) { if (!(w._.hasInlineStarted && !J.length || k || E) && (a = CKEDITOR.tools.ltrim(a), a.length === 0)) return; const b = w.name; const f = b ? CKEDITOR.dtd[b] || (w._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : c; if (!E && !f['#'] && b in d)y.onTagOpen(e[b] || ''), y.onText(a); else { r(); m(); k || E || (a = a.replace(/[\t\r\n ]{2,}|[\t\r\n]/g, ' ')); a = new CKEDITOR.htmlParser.text(a); if (u(w, a)) this.onTagOpen(l, {}, 0, 1); w.add(a) } }; y.onCDATA =
function (a) { w.add(new CKEDITOR.htmlParser.cdata(a)) }; y.onComment = function (a) { r(); m(); w.add(new CKEDITOR.htmlParser.comment(a)) }; y.parse(g); for (r(); w != q;)C(w, w.parent, 1); f(q); return q
}; CKEDITOR.htmlParser.fragment.prototype = {
      type: CKEDITOR.NODE_DOCUMENT_FRAGMENT,
      add: function (a, b) {
        isNaN(b) && (b = this.children.length); const c = b > 0 ? this.children[b - 1] : null; if (c) {
          if (a._.isBlockLike && c.type == CKEDITOR.NODE_TEXT && (c.value = CKEDITOR.tools.rtrim(c.value), c.value.length === 0)) { this.children.pop(); this.add(a); return }c.next =
a
        }a.previous = c; a.parent = this; this.children.splice(b, 0, a); this._.hasInlineStarted || (this._.hasInlineStarted = a.type == CKEDITOR.NODE_TEXT || a.type == CKEDITOR.NODE_ELEMENT && !a._.isBlockLike)
      },
      filter: function (a, b) { b = this.getFilterContext(b); a.onRoot(b, this); this.filterChildren(a, !1, b) },
      filterChildren: function (a, b, c) {
        if (this.childrenFilteredBy != a.id) {
          c = this.getFilterContext(c); if (b && !this.parent)a.onRoot(c, this); this.childrenFilteredBy = a.id; for (b = 0; b < this.children.length; b++) {
            !1 === this.children[b].filter(a,
              c) && b--
          }
        }
      },
      writeHtml: function (a, b) { b && this.filter(b); this.writeChildrenHtml(a) },
      writeChildrenHtml: function (a, b, c) { let d = this.getFilterContext(); if (c && !this.parent && b)b.onRoot(d, this); b && this.filterChildren(b, !1, d); b = 0; c = this.children; for (d = c.length; b < d; b++)c[b].writeHtml(a) },
      forEach: function (a, b, c) { if (!(c || b && this.type != b)) var d = a(this); if (!1 !== d) { c = this.children; for (let e = 0; e < c.length; e++)d = c[e], d.type == CKEDITOR.NODE_ELEMENT ? d.forEach(a, b) : b && d.type != b || a(d) } },
      getFilterContext: function (a) {
        return a ||
{}
      }
    }
  })(); 'use strict';
  (function () {
    function a () { this.rules = [] } function d (b, c, d, g) { let h, l; for (h in c)(l = b[h]) || (l = b[h] = new a()), l.add(c[h], d, g) }CKEDITOR.htmlParser.filter = CKEDITOR.tools.createClass({
      $: function (b) { this.id = CKEDITOR.tools.getNextNumber(); this.elementNameRules = new a(); this.attributeNameRules = new a(); this.elementsRules = {}; this.attributesRules = {}; this.textRules = new a(); this.commentRules = new a(); this.rootRules = new a(); b && this.addRules(b, 10) },
      proto: {
        addRules: function (a, c) {
          let e; typeof c === 'number'
            ? e = c
            : c && 'priority' in c && (e =
c.priority); typeof e !== 'number' && (e = 10); typeof c !== 'object' && (c = {}); a.elementNames && this.elementNameRules.addMany(a.elementNames, e, c); a.attributeNames && this.attributeNameRules.addMany(a.attributeNames, e, c); a.elements && d(this.elementsRules, a.elements, e, c); a.attributes && d(this.attributesRules, a.attributes, e, c); a.text && this.textRules.add(a.text, e, c); a.comment && this.commentRules.add(a.comment, e, c); a.root && this.rootRules.add(a.root, e, c)
        },
        applyTo: function (a) { a.filter(this) },
        onElementName: function (a, c) {
          return this.elementNameRules.execOnName(a,
            c)
        },
        onAttributeName: function (a, c) { return this.attributeNameRules.execOnName(a, c) },
        onText: function (a, c, d) { return this.textRules.exec(a, c, d) },
        onComment: function (a, c, d) { return this.commentRules.exec(a, c, d) },
        onRoot: function (a, c) { return this.rootRules.exec(a, c) },
        onElement: function (a, c) { for (var d = [this.elementsRules['^'], this.elementsRules[c.name], this.elementsRules.$], g, h = 0; h < 3; h++) if (g = d[h]) { g = g.exec(a, c, this); if (!1 === g) return null; if (g && g != c) return this.onNode(a, g); if (c.parent && !c.name) break } return c },
        onNode: function (a, c) { const d = c.type; return d == CKEDITOR.NODE_ELEMENT ? this.onElement(a, c) : d == CKEDITOR.NODE_TEXT ? new CKEDITOR.htmlParser.text(this.onText(a, c.value)) : d == CKEDITOR.NODE_COMMENT ? new CKEDITOR.htmlParser.comment(this.onComment(a, c.value)) : null },
        onAttribute: function (a, c, d, g) { return (d = this.attributesRules[d]) ? d.exec(a, g, c, this) : g }
      }
    }); CKEDITOR.htmlParser.filterRulesGroup = a; a.prototype = {
      add: function (a, c, d) { this.rules.splice(this.findIndex(c), 0, { value: a, priority: c, options: d }) },
      addMany: function (a,
        c, d) { for (var g = [this.findIndex(c), 0], h = 0, l = a.length; h < l; h++)g.push({ value: a[h], priority: c, options: d }); this.rules.splice.apply(this.rules, g) },
      findIndex: function (a) { for (var c = this.rules, d = c.length - 1; d >= 0 && a < c[d].priority;)d--; return d + 1 },
      exec: function (a, c) {
        const d = c instanceof CKEDITOR.htmlParser.node || c instanceof CKEDITOR.htmlParser.fragment; const g = Array.prototype.slice.call(arguments, 1); const h = this.rules; const l = h.length; let m; let r; let f; let C; for (C = 0; C < l; C++) {
          if (d && (m = c.type, r = c.name), f = h[C], !(a.nonEditable && !f.options.applyToAll ||
a.nestedEditable && f.options.excludeNestedEditable)) { f = f.value.apply(null, g); if (!1 === f || d && f && (f.name != r || f.type != m)) return f; f != null && (g[0] = c = f) }
        } return c
      },
      execOnName: function (a, c) { for (var d = 0, g = this.rules, h = g.length, l; c && d < h; d++)l = g[d], a.nonEditable && !l.options.applyToAll || a.nestedEditable && l.options.excludeNestedEditable || (c = c.replace(l.value[0], l.value[1])); return c }
    }
  })();
  (function () {
    function a (a, d) {
      function f (a) { return a || CKEDITOR.env.needsNbspFiller ? new CKEDITOR.htmlParser.text(' ') : new CKEDITOR.htmlParser.element('br', { 'data-cke-bogus': 1 }) } function n (a, d) {
        return function (k) {
          if (k.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
            let e = []; let n = b(k); let t; let D; if (n) for (p(n, 1) && e.push(n); n;)g(n) && (t = c(n)) && p(t) && ((D = c(t)) && !g(D) ? e.push(t) : (f(v).insertAfter(t), t.remove())), n = n.previous; for (n = 0; n < e.length; n++)e[n].remove(); if (e = !a || !1 !== (typeof d === 'function' ? d(k) : d)) {
              v || CKEDITOR.env.needsBrFiller ||
k.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT
                ? v || CKEDITOR.env.needsBrFiller || !(document.documentMode > 7 || k.name in CKEDITOR.dtd.tr || k.name in CKEDITOR.dtd.$listItem) ? (e = b(k), e = !e || k.name == 'form' && e.name == 'input') : e = !1
                : e = !1
            }e && k.add(f(a))
          }
        }
      } function p (a, b) {
        if ((!v || CKEDITOR.env.needsBrFiller) && a.type == CKEDITOR.NODE_ELEMENT && a.name == 'br' && !a.attributes['data-cke-eol']) return !0; let c; return a.type == CKEDITOR.NODE_TEXT && (c = a.value.match(x)) && (c.index && ((new CKEDITOR.htmlParser.text(a.value.substring(0, c.index))).insertBefore(a),
        a.value = c[0]), !CKEDITOR.env.needsBrFiller && v && (!b || a.parent.name in z) || !v && ((c = a.previous) && c.name == 'br' || !c || g(c)))
          ? !0
          : !1
      } const t = { elements: {} }; var v = d == 'html'; var z = CKEDITOR.tools.extend({}, k); let B; for (B in z)'#' in w[B] || delete z[B]; for (B in z)t.elements[B] = n(v, a.config.fillEmptyBlocks); t.root = n(v, !1); t.elements.br = (function (a) {
        return function (b) {
          if (b.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
            let d = b.attributes; if ('data-cke-bogus' in d || 'data-cke-eol' in d) delete d['data-cke-bogus']; else {
              for (d = b.next; d && e(d);) {
                d =
d.next
              } const k = c(b); !d && g(b.parent) ? h(b.parent, f(a)) : g(d) && k && !g(k) && f(a).insertBefore(d)
            }
          }
        }
      }(v)); return t
    } function d (a, b) { return a != CKEDITOR.ENTER_BR && !1 !== b ? a == CKEDITOR.ENTER_DIV ? 'div' : 'p' : !1 } function b (a) { for (a = a.children[a.children.length - 1]; a && e(a);)a = a.previous; return a } function c (a) { for (a = a.previous; a && e(a);)a = a.previous; return a } function e (a) { return a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(a.value) || a.type == CKEDITOR.NODE_ELEMENT && a.attributes['data-cke-bookmark'] } function g (a) {
      return a &&
(a.type == CKEDITOR.NODE_ELEMENT && a.name in k || a.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT)
    } function h (a, b) { const c = a.children[a.children.length - 1]; a.children.push(b); b.parent = a; c && (c.next = b, b.previous = c) } function l (a) { a = a.attributes; a.contenteditable != 'false' && (a['data-cke-editable'] = a.contenteditable ? 'true' : 1); a.contenteditable = 'false' } function m (a) { a = a.attributes; switch (a['data-cke-editable']) { case 'true':a.contenteditable = 'true'; break; case '1':delete a.contenteditable } } function r (a) {
      return a.replace(B,
        function (a, b, c) { return '\x3c' + b + c.replace(F, function (a, b) { return L.test(b) && c.indexOf('data-cke-saved-' + b) == -1 ? ' data-cke-saved-' + a + ' data-cke-' + CKEDITOR.rnd + '-' + a : a }) + '\x3e' })
    } function f (a, b) { return a.replace(b, function (a, b, c) { a.indexOf('\x3ctextarea') === 0 && (a = b + A(c).replace(/</g, '\x26lt;').replace(/>/g, '\x26gt;') + '\x3c/textarea\x3e'); return '\x3ccke:encoded\x3e' + encodeURIComponent(a) + '\x3c/cke:encoded\x3e' }) } function C (a) { return a.replace(Q, function (a, b) { return decodeURIComponent(b) }) } function u (a) {
      return a.replace(/\x3c!--(?!{cke_protected})[\s\S]+?--\x3e/g,
        function (a) { return '\x3c!--' + J + '{C}' + encodeURIComponent(a).replace(/--/g, '%2D%2D') + '--\x3e' })
    } function A (a) { return a.replace(/\x3c!--\{cke_protected\}\{C\}([\s\S]+?)--\x3e/g, function (a, b) { return decodeURIComponent(b) }) } function y (a, b) { const c = b._.dataStore; return a.replace(/\x3c!--\{cke_protected\}([\s\S]+?)--\x3e/g, function (a, b) { return decodeURIComponent(b) }).replace(/\{cke_protected_(\d+)\}/g, function (a, b) { return c && c[b] || '' }) } function q (a, b) {
      const c = []; var d = b.config.protectedSource; const k = b._.dataStore || (b._.dataStore =
{ id: 1 }); const e = /<\!--\{cke_temp(comment)?\}(\d*?)--\x3e/g; var d = [/<script[\s\S]*?(<\/script>|$)/gi, /<noscript[\s\S]*?<\/noscript>/gi, /<meta[\s\S]*?\/?>/gi].concat(d); a = a.replace(/\x3c!--[\s\S]*?--\x3e/g, function (a) { return '\x3c!--{cke_tempcomment}' + (c.push(a) - 1) + '--\x3e' }); for (let f = 0; f < d.length; f++)a = a.replace(d[f], function (a) { a = a.replace(e, function (a, b, d) { return c[d] }); return /cke_temp(comment)?/.test(a) ? a : '\x3c!--{cke_temp}' + (c.push(a) - 1) + '--\x3e' }); a = a.replace(e, function (a, b, d) {
        return '\x3c!--' + J + (b
          ? '{C}'
          : '') + encodeURIComponent(c[d]).replace(/--/g, '%2D%2D') + '--\x3e'
      }); a = a.replace(/<\w+(?:\s+(?:(?:[^\s=>]+\s*=\s*(?:[^'"\s>]+|'[^']*'|"[^"]*"))|[^\s=\/>]+))+\s*\/?>/g, function (a) { return a.replace(/\x3c!--\{cke_protected\}([^>]*)--\x3e/g, function (a, b) { k[k.id] = decodeURIComponent(b); return '{cke_protected_' + k.id++ + '}' }) }); return a = a.replace(/<(title|iframe|textarea)([^>]*)>([\s\S]*?)<\/\1>/g, function (a, c, d, k) { return '\x3c' + c + d + '\x3e' + y(A(k), b) + '\x3c/' + c + '\x3e' })
    }CKEDITOR.htmlDataProcessor = function (b) {
      let c
      let k; const e = this; this.editor = b; this.dataFilter = c = new CKEDITOR.htmlParser.filter(); this.htmlFilter = k = new CKEDITOR.htmlParser.filter(); this.writer = new CKEDITOR.htmlParser.basicWriter(); c.addRules(p); c.addRules(n, { applyToAll: !0 }); c.addRules(a(b, 'data'), { applyToAll: !0 }); k.addRules(t); k.addRules(z, { applyToAll: !0 }); k.addRules(a(b, 'html'), { applyToAll: !0 }); b.on('toHtml', function (a) {
        a = a.data; var c = a.dataValue; let k; var c = q(c, b); var c = f(c, R); var c = r(c); var c = f(c, H); var c = c.replace(P, '$1cke:$2'); var c = c.replace(G, '\x3ccke:$1$2\x3e\x3c/cke:$1\x3e')
        var c = c.replace(/(<pre\b[^>]*>)(\r\n|\n)/g, '$1$2$2'); var c = c.replace(/([^a-z0-9<\-])(on\w{3,})(?!>)/gi, '$1data-cke-' + CKEDITOR.rnd + '-$2'); k = a.context || b.editable().getName(); let e; CKEDITOR.env.ie && CKEDITOR.env.version < 9 && k == 'pre' && (k = 'div', c = '\x3cpre\x3e' + c + '\x3c/pre\x3e', e = 1); k = b.document.createElement(k); k.setHtml('a' + c); c = k.getHtml().substr(1); c = c.replace(new RegExp('data-cke-' + CKEDITOR.rnd + '-', 'ig'), ''); e && (c = c.replace(/^<pre>|<\/pre>$/gi, '')); c = c.replace(v, '$1$2'); c = C(c); c = A(c); k = !1 === a.fixForBody
          ? !1
          : d(a.enterMode, b.config.autoParagraph); c = CKEDITOR.htmlParser.fragment.fromHtml(c, a.context, k); k && (e = c, !e.children.length && CKEDITOR.dtd[e.name][k] && (k = new CKEDITOR.htmlParser.element(k), e.add(k))); a.dataValue = c
      }, null, null, 5); b.on('toHtml', function (a) { a.data.filter.applyTo(a.data.dataValue, !0, a.data.dontFilter, a.data.enterMode) && b.fire('dataFiltered') }, null, null, 6); b.on('toHtml', function (a) { a.data.dataValue.filterChildren(e.dataFilter, !0) }, null, null, 10); b.on('toHtml', function (a) {
        a = a.data; let b = a.dataValue
        const c = new CKEDITOR.htmlParser.basicWriter(); b.writeChildrenHtml(c); b = c.getHtml(!0); a.dataValue = u(b)
      }, null, null, 15); b.on('toDataFormat', function (a) { let c = a.data.dataValue; a.data.enterMode != CKEDITOR.ENTER_BR && (c = c.replace(/^<br *\/?>/i, '')); a.data.dataValue = CKEDITOR.htmlParser.fragment.fromHtml(c, a.data.context, d(a.data.enterMode, b.config.autoParagraph)) }, null, null, 5); b.on('toDataFormat', function (a) { a.data.dataValue.filterChildren(e.htmlFilter, !0) }, null, null, 10); b.on('toDataFormat', function (a) {
        a.data.filter.applyTo(a.data.dataValue,
          !1, !0)
      }, null, null, 11); b.on('toDataFormat', function (a) { let c = a.data.dataValue; const d = e.writer; d.reset(); c.writeChildrenHtml(d); c = d.getHtml(!0); c = A(c); c = y(c, b); a.data.dataValue = c }, null, null, 15)
    }; CKEDITOR.htmlDataProcessor.prototype = {
      toHtml: function (a, b, c, d) {
        const k = this.editor; let e; let f; let n; let p; b && typeof b === 'object' ? (e = b.context, c = b.fixForBody, d = b.dontFilter, f = b.filter, n = b.enterMode, p = b.protectedWhitespaces) : e = b; e || e === null || (e = k.editable().getName()); return k.fire('toHtml', {
          dataValue: a,
          context: e,
          fixForBody: c,
          dontFilter: d,
          filter: f || k.filter,
          enterMode: n || k.enterMode,
          protectedWhitespaces: p
        }).dataValue
      },
      toDataFormat: function (a, b) { let c, d, k; b && (c = b.context, d = b.filter, k = b.enterMode); c || c === null || (c = this.editor.editable().getName()); return this.editor.fire('toDataFormat', { dataValue: a, filter: d || this.editor.filter, context: c, enterMode: k || this.editor.enterMode }).dataValue }
    }; var x = /(?:&nbsp;|\xa0)$/; var J = '{cke_protected}'; var w = CKEDITOR.dtd; const E = 'caption colgroup col thead tfoot tbody'.split(' '); var k = CKEDITOR.tools.extend({}, w.$blockLimit,
      w.$block); var p = { elements: { input: l, textarea: l } }; var n = { attributeNames: [[/^on/, 'data-cke-pa-on'], [/^data-cke-expando$/, '']] }; var t = { elements: { embed: function (a) { var b = a.parent; if (b && b.name == 'object') { const c = b.attributes.width; var b = b.attributes.height; c && (a.attributes.width = c); b && (a.attributes.height = b) } }, a: function (a) { const b = a.attributes; if (!(a.children.length || b.name || b.id || a.attributes['data-cke-saved-name'])) return !1 } } }; var z = {
      elementNames: [[/^cke:/, ''], [/^\?xml:namespace$/, '']],
      attributeNames: [[/^data-cke-(saved|pa)-/,
        ''], [/^data-cke-.*/, ''], ['hidefocus', '']],
      elements: {
        $: function (a) { const b = a.attributes; if (b) { if (b['data-cke-temp']) return !1; for (var c = ['name', 'href', 'src'], d, k = 0; k < c.length; k++)d = 'data-cke-saved-' + c[k], d in b && delete b[c[k]] } return a },
        table: function (a) {
          a.children.slice(0).sort(function (a, b) {
            let c, d; a.type == CKEDITOR.NODE_ELEMENT && b.type == a.type && (c = CKEDITOR.tools.indexOf(E, a.name), d = CKEDITOR.tools.indexOf(E, b.name)); c > -1 && d > -1 && c != d || (c = a.parent ? a.getIndex() : -1, d = b.parent ? b.getIndex() : -1); return c > d
              ? 1
              : -1
          })
        },
        param: function (a) { a.children = []; a.isEmpty = !0; return a },
        span: function (a) { a.attributes.class == 'Apple-style-span' && delete a.name },
        html: function (a) { delete a.attributes.contenteditable; delete a.attributes.class },
        body: function (a) { delete a.attributes.spellcheck; delete a.attributes.contenteditable },
        style: function (a) { const b = a.children[0]; b && b.value && (b.value = CKEDITOR.tools.trim(b.value)); a.attributes.type || (a.attributes.type = 'text/css') },
        title: function (a) {
          let b = a.children[0]; !b && h(a, b = new CKEDITOR.htmlParser.text())
          b.value = a.attributes['data-cke-title'] || ''
        },
        input: m,
        textarea: m
      },
      attributes: { class: function (a) { return CKEDITOR.tools.ltrim(a.replace(/(?:^|\s+)cke_[^\s]*/g, '')) || !1 } }
    }; CKEDITOR.env.ie && (z.attributes.style = function (a) { return a.replace(/(^|;)([^\:]+)/g, function (a) { return a.toLowerCase() }) }); var B = /<(a|area|img|input|source)\b([^>]*)>/gi; var F = /([\w-:]+)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi; var L = /^(href|src|name)$/i; var H = /(?:<style(?=[ >])[^>]*>[\s\S]*?<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi
    var R = /(<textarea(?=[ >])[^>]*>)([\s\S]*?)(?:<\/textarea>)/gi; var Q = /<cke:encoded>([^<]*)<\/cke:encoded>/gi; var P = /(<\/?)((?:object|embed|param|html|body|head|title)[^>]*>)/gi; var v = /(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi; var G = /<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi
  })(); 'use strict'
  CKEDITOR.htmlParser.element = function (a, d) { this.name = a; this.attributes = d || {}; this.children = []; let b = a || ''; const c = b.match(/^cke:(.*)/); c && (b = c[1]); b = !!(CKEDITOR.dtd.$nonBodyContent[b] || CKEDITOR.dtd.$block[b] || CKEDITOR.dtd.$listItem[b] || CKEDITOR.dtd.$tableContent[b] || CKEDITOR.dtd.$nonEditable[b] || b == 'br'); this.isEmpty = !!CKEDITOR.dtd.$empty[a]; this.isUnknown = !CKEDITOR.dtd[a]; this._ = { isBlockLike: b, hasInlineStarted: this.isEmpty || !b } }
  CKEDITOR.htmlParser.cssStyle = function (a) {
    const d = {}; ((a instanceof CKEDITOR.htmlParser.element ? a.attributes.style : a) || '').replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function (a, c, e) { c == 'font-family' && (e = e.replace(/["']/g, '')); d[c.toLowerCase()] = e }); return {
      rules: d,
      populate: function (a) { const c = this.toString(); c && (a instanceof CKEDITOR.dom.element ? a.setAttribute('style', c) : a instanceof CKEDITOR.htmlParser.element ? a.attributes.style = c : a.style = c) },
      toString: function () {
        const a = []; let c
        for (c in d)d[c] && a.push(c, ':', d[c], ';'); return a.join('')
      }
    }
  };
  (function () {
    function a (a) { return function (b) { return b.type == CKEDITOR.NODE_ELEMENT && (typeof a === 'string' ? b.name == a : b.name in a) } } const d = function (a, b) { a = a[0]; b = b[0]; return a < b ? -1 : a > b ? 1 : 0 }; const b = CKEDITOR.htmlParser.fragment.prototype; CKEDITOR.htmlParser.element.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node(), {
      type: CKEDITOR.NODE_ELEMENT,
      add: b.add,
      clone: function () { return new CKEDITOR.htmlParser.element(this.name, this.attributes) },
      filter: function (a, b) {
        let d = this; let h; let l; b = d.getFilterContext(b); if (b.off) return !0
        if (!d.parent)a.onRoot(b, d); for (;;) { h = d.name; if (!(l = a.onElementName(b, h))) return this.remove(), !1; d.name = l; if (!(d = a.onElement(b, d))) return this.remove(), !1; if (d !== this) return this.replaceWith(d), !1; if (d.name == h) break; if (d.type != CKEDITOR.NODE_ELEMENT) return this.replaceWith(d), !1; if (!d.name) return this.replaceWithChildren(), !1 }h = d.attributes; let m, r; for (m in h) {
          for (l = h[m]; ;) if (r = a.onAttributeName(b, m)) if (r != m) delete h[m], m = r; else break; else { delete h[m]; break }r && (!1 === (l = a.onAttribute(b, d, r, l))
            ? delete h[r]
            : h[r] = l)
        }d.isEmpty || this.filterChildren(a, !1, b); return !0
      },
      filterChildren: b.filterChildren,
      writeHtml: function (a, b) { b && this.filter(b); const g = this.name; const h = []; let l = this.attributes; let m; let r; a.openTag(g, l); for (m in l)h.push([m, l[m]]); a.sortAttributes && h.sort(d); m = 0; for (r = h.length; m < r; m++)l = h[m], a.attribute(l[0], l[1]); a.openTagClose(g, this.isEmpty); this.writeChildrenHtml(a); this.isEmpty || a.closeTag(g) },
      writeChildrenHtml: b.writeChildrenHtml,
      replaceWithChildren: function () {
        for (let a = this.children, b = a.length; b;)a[--b].insertAfter(this)
        this.remove()
      },
      forEach: b.forEach,
      getFirst: function (b) { if (!b) return this.children.length ? this.children[0] : null; typeof b !== 'function' && (b = a(b)); for (let d = 0, g = this.children.length; d < g; ++d) if (b(this.children[d])) return this.children[d]; return null },
      getHtml: function () { const a = new CKEDITOR.htmlParser.basicWriter(); this.writeChildrenHtml(a); return a.getHtml() },
      setHtml: function (a) { a = this.children = CKEDITOR.htmlParser.fragment.fromHtml(a).children; for (let b = 0, d = a.length; b < d; ++b)a[b].parent = this },
      getOuterHtml: function () {
        const a =
new CKEDITOR.htmlParser.basicWriter(); this.writeHtml(a); return a.getHtml()
      },
      split: function (a) { for (var b = this.children.splice(a, this.children.length - a), d = this.clone(), h = 0; h < b.length; ++h)b[h].parent = d; d.children = b; b[0] && (b[0].previous = null); a > 0 && (this.children[a - 1].next = null); this.parent.add(d, this.getIndex() + 1); return d },
      find: function (a, b) {
        void 0 === b && (b = !1); let d = []; let h; for (h = 0; h < this.children.length; h++) {
          const l = this.children[h]; typeof a === 'function' && a(l) ? d.push(l) : typeof a === 'string' && l.name === a && d.push(l)
          b && l.find && (d = d.concat(l.find(a, b)))
        } return d
      },
      addClass: function (a) { if (!this.hasClass(a)) { const b = this.attributes.class || ''; this.attributes.class = b + (b ? ' ' : '') + a } },
      removeClass: function (a) { let b = this.attributes.class; b && ((b = CKEDITOR.tools.trim(b.replace(new RegExp('(?:\\s+|^)' + a + '(?:\\s+|$)'), ' '))) ? this.attributes.class = b : delete this.attributes.class) },
      hasClass: function (a) { const b = this.attributes.class; return b ? (new RegExp('(?:^|\\s)' + a + '(?\x3d\\s|$)')).test(b) : !1 },
      getFilterContext: function (a) {
        const b =
[]; a || (a = { off: !1, nonEditable: !1, nestedEditable: !1 }); a.off || this.attributes['data-cke-processor'] != 'off' || b.push('off', !0); a.nonEditable || this.attributes.contenteditable != 'false' ? a.nonEditable && !a.nestedEditable && this.attributes.contenteditable == 'true' && b.push('nestedEditable', !0) : b.push('nonEditable', !0); if (b.length) { a = CKEDITOR.tools.copy(a); for (let d = 0; d < b.length; d += 2)a[b[d]] = b[d + 1] } return a
      }
    }, !0)
  })();
  (function () { const a = {}; const d = /{([^}]+)}/g; const b = /([\\'])/g; const c = /\n/g; const e = /\r/g; CKEDITOR.template = function (g) { if (a[g]) this.output = a[g]; else { const h = g.replace(b, '\\$1').replace(c, '\\n').replace(e, '\\r').replace(d, function (a, b) { return "',data['" + b + "']\x3d\x3dundefined?'{" + b + "}':data['" + b + "'],'" }); this.output = a[g] = Function('data', 'buffer', "return buffer?buffer.push('" + h + "'):['" + h + "'].join('');") } } })(); delete CKEDITOR.loadFullCore; CKEDITOR.instances = {}; CKEDITOR.document = new CKEDITOR.dom.document(document)
  CKEDITOR.add = function (a) { CKEDITOR.instances[a.name] = a; a.on('focus', function () { CKEDITOR.currentInstance != a && (CKEDITOR.currentInstance = a, CKEDITOR.fire('currentInstance')) }); a.on('blur', function () { CKEDITOR.currentInstance == a && (CKEDITOR.currentInstance = null, CKEDITOR.fire('currentInstance')) }); CKEDITOR.fire('instance', null, a) }; CKEDITOR.remove = function (a) { delete CKEDITOR.instances[a.name] };
  (function () { const a = {}; CKEDITOR.addTemplate = function (d, b) { let c = a[d]; if (c) return c; c = { name: d, source: b }; CKEDITOR.fire('template', c); return a[d] = new CKEDITOR.template(c.source) }; CKEDITOR.getTemplate = function (d) { return a[d] } })(); (function () { const a = []; CKEDITOR.addCss = function (d) { a.push(d) }; CKEDITOR.getCss = function () { return a.join('\n') } })(); CKEDITOR.on('instanceDestroyed', function () { CKEDITOR.tools.isEmpty(this.instances) && CKEDITOR.fire('reset') }); CKEDITOR.TRISTATE_ON = 1; CKEDITOR.TRISTATE_OFF = 2
  CKEDITOR.TRISTATE_DISABLED = 0;
  (function () {
    CKEDITOR.inline = function (a, d) {
      if (!CKEDITOR.env.isCompatible) return null; a = CKEDITOR.dom.element.get(a); if (a.getEditor()) throw 'The editor instance "' + a.getEditor().name + '" is already attached to the provided element.'; const b = new CKEDITOR.editor(d, a, CKEDITOR.ELEMENT_MODE_INLINE); const c = a.is('textarea') ? a : null; c
        ? (b.setData(c.getValue(), null, !0), a = CKEDITOR.dom.element.createFromHtml('\x3cdiv contenteditable\x3d"' + !!b.readOnly + '" class\x3d"cke_textarea_inline"\x3e' + c.getValue() + '\x3c/div\x3e', CKEDITOR.document),
          a.insertAfter(c), c.hide(), c.$.form && b._attachToForm())
        : b.setData(a.getHtml(), null, !0); b.on('loaded', function () { b.fire('uiReady'); b.editable(a); b.container = a; b.ui.contentsElement = a; b.setData(b.getData(1)); b.resetDirty(); b.fire('contentDom'); b.mode = 'wysiwyg'; b.fire('mode'); b.status = 'ready'; b.fireOnce('instanceReady'); CKEDITOR.fire('instanceReady', null, b) }, null, null, 1E4); b.on('destroy', function () { c && (b.container.clearCustomData(), b.container.remove(), c.show()); b.element.clearCustomData(); delete b.element })
      return b
    }; CKEDITOR.inlineAll = function () { let a, d, b; for (b in CKEDITOR.dtd.$editable) for (let c = CKEDITOR.document.getElementsByTag(b), e = 0, g = c.count(); e < g; e++)a = c.getItem(e), a.getAttribute('contenteditable') == 'true' && (d = { element: a, config: {} }, !1 !== CKEDITOR.fire('inline', d) && CKEDITOR.inline(a, d.config)) }; CKEDITOR.domReady(function () { !CKEDITOR.disableAutoInline && CKEDITOR.inlineAll() })
  })(); CKEDITOR.replaceClass = 'ckeditor';
  (function () {
    function a (a, e, g, h) {
      if (!CKEDITOR.env.isCompatible) return null; a = CKEDITOR.dom.element.get(a); if (a.getEditor()) throw 'The editor instance "' + a.getEditor().name + '" is already attached to the provided element.'; const l = new CKEDITOR.editor(e, a, h); h == CKEDITOR.ELEMENT_MODE_REPLACE && (a.setStyle('visibility', 'hidden'), l._.required = a.hasAttribute('required'), a.removeAttribute('required')); g && l.setData(g, null, !0); l.on('loaded', function () {
        b(l); h == CKEDITOR.ELEMENT_MODE_REPLACE && l.config.autoUpdateElement &&
a.$.form && l._attachToForm(); l.setMode(l.config.startupMode, function () { l.resetDirty(); l.status = 'ready'; l.fireOnce('instanceReady'); CKEDITOR.fire('instanceReady', null, l) })
      }); l.on('destroy', d); return l
    } function d () { const a = this.container; const b = this.element; a && (a.clearCustomData(), a.remove()); b && (b.clearCustomData(), this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (b.show(), this._.required && b.setAttribute('required', 'required')), delete this.element) } function b (a) {
      var b = a.name; let d = a.element; let h = a.elementMode; const l =
a.fire('uiSpace', { space: 'top', html: '' }).html; const m = a.fire('uiSpace', { space: 'bottom', html: '' }).html; const r = new CKEDITOR.template('\x3c{outerEl} id\x3d"cke_{name}" class\x3d"{id} cke cke_reset cke_chrome cke_editor_{name} cke_{langDir} ' + CKEDITOR.env.cssClass + '"  dir\x3d"{langDir}" lang\x3d"{langCode}" role\x3d"application"' + (a.title ? ' aria-labelledby\x3d"cke_{name}_arialbl"' : '') + '\x3e' + (a.title ? '\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e' : '') + '\x3c{outerEl} class\x3d"cke_inner cke_reset" role\x3d"presentation"\x3e{topHtml}\x3c{outerEl} id\x3d"{contentId}" class\x3d"cke_contents cke_reset" role\x3d"presentation"\x3e\x3c/{outerEl}\x3e{bottomHtml}\x3c/{outerEl}\x3e\x3c/{outerEl}\x3e')
      var b = CKEDITOR.dom.element.createFromHtml(r.output({ id: a.id, name: b, langDir: a.lang.dir, langCode: a.langCode, voiceLabel: a.title, topHtml: l ? '\x3cspan id\x3d"' + a.ui.spaceId('top') + '" class\x3d"cke_top cke_reset_all" role\x3d"presentation" style\x3d"height:auto"\x3e' + l + '\x3c/span\x3e' : '', contentId: a.ui.spaceId('contents'), bottomHtml: m ? '\x3cspan id\x3d"' + a.ui.spaceId('bottom') + '" class\x3d"cke_bottom cke_reset_all" role\x3d"presentation"\x3e' + m + '\x3c/span\x3e' : '', outerEl: CKEDITOR.env.ie ? 'span' : 'div' })); h == CKEDITOR.ELEMENT_MODE_REPLACE
        ? (d.hide(), b.insertAfter(d))
        : d.append(b); a.container = b; a.ui.contentsElement = a.ui.space('contents'); l && a.ui.space('top').unselectable(); m && a.ui.space('bottom').unselectable(); d = a.config.width; h = a.config.height; d && b.setStyle('width', CKEDITOR.tools.cssLength(d)); h && a.ui.space('contents').setStyle('height', CKEDITOR.tools.cssLength(h)); b.disableContextMenu(); CKEDITOR.env.webkit && b.on('focus', function () { a.focus() }); a.fireOnce('uiReady')
    }CKEDITOR.replace = function (b, d) { return a(b, d, null, CKEDITOR.ELEMENT_MODE_REPLACE) }
    CKEDITOR.appendTo = function (b, d, g) { return a(b, d, g, CKEDITOR.ELEMENT_MODE_APPENDTO) }; CKEDITOR.replaceAll = function () { for (let a = document.getElementsByTagName('textarea'), b = 0; b < a.length; b++) { let d = null; const h = a[b]; if (h.name || h.id) { if (typeof arguments[0] === 'string') { if (!(new RegExp('(?:^|\\s)' + arguments[0] + '(?:$|\\s)')).test(h.className)) continue } else if (typeof arguments[0] === 'function' && (d = {}, !1 === arguments[0](h, d))) continue; this.replace(h, d) } } }; CKEDITOR.editor.prototype.addMode = function (a, b) {
      (this._.modes || (this._.modes =
{}))[a] = b
    }; CKEDITOR.editor.prototype.setMode = function (a, b) {
      const d = this; var h = this._.modes; if (a != d.mode && h && h[a]) {
        d.fire('beforeSetMode', a); if (d.mode) { var l = d.checkDirty(); var h = d._.previousModeData; let m; var r = 0; d.fire('beforeModeUnload'); d.editable(0); d._.previousMode = d.mode; d._.previousModeData = m = d.getData(1); d.mode == 'source' && h == m && (d.fire('lockSnapshot', { forceUpdate: !0 }), r = 1); d.ui.space('contents').setHtml(''); d.mode = '' } else d._.previousModeData = d.getData(1); this._.modes[a](function () {
          d.mode = a; void 0 !== l && !l &&
d.resetDirty(); r ? d.fire('unlockSnapshot') : a == 'wysiwyg' && d.fire('saveSnapshot'); setTimeout(function () { d.fire('mode'); b && b.call(d) }, 0)
        })
      }
    }; CKEDITOR.editor.prototype.resize = function (a, b, d, h) {
      var l = this.container; const m = this.ui.space('contents'); const r = CKEDITOR.env.webkit && this.document && this.document.getWindow().$.frameElement; h = h ? this.container.getFirst(function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass('cke_inner') }) : l; h.setSize('width', a, !0); r && (r.style.width = '1%'); const f = (h.$.offsetHeight || 0) - (m.$.clientHeight ||
0); var l = Math.max(b - (d ? 0 : f), 0); b = d ? b + f : b; m.setStyle('height', l + 'px'); r && (r.style.width = '100%'); this.fire('resize', { outerHeight: b, contentsHeight: l, outerWidth: a || h.getSize('width') })
    }; CKEDITOR.editor.prototype.getResizable = function (a) { return a ? this.ui.space('contents') : this.container }; CKEDITOR.domReady(function () { CKEDITOR.replaceClass && CKEDITOR.replaceAll(CKEDITOR.replaceClass) })
  })(); CKEDITOR.config.startupMode = 'wysiwyg';
  (function () {
    function a (a) {
      let b = a.editor; let e = a.data.path; let f = e.blockLimit; let g = a.data.selection; const B = g.getRanges()[0]; let l; if (CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller) if (g = d(g, e))g.appendBogus(), l = CKEDITOR.env.ie; h(b, e.block, f) && B.collapsed && !B.getCommonAncestor().isReadOnly() && (e = B.clone(), e.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS), f = new CKEDITOR.dom.walker(e), f.guard = function (a) { return !c(a) || a.type == CKEDITOR.NODE_COMMENT || a.isReadOnly() }, !f.checkForward() || e.checkStartOfBlock() && e.checkEndOfBlock()) &&
(b = B.fixBlock(!0, b.activeEnterMode == CKEDITOR.ENTER_DIV ? 'div' : 'p'), CKEDITOR.env.needsBrFiller || (b = b.getFirst(c)) && b.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(b.getText()).match(/^(?:&nbsp;|\xa0)$/) && b.remove(), l = 1, a.cancel()); l && B.select()
    } function d (a, b) { if (a.isFake) return 0; const d = b.block || b.blockLimit; const e = d && d.getLast(c); if (!(!d || !d.isBlockBoundary() || e && e.type == CKEDITOR.NODE_ELEMENT && e.isBlockBoundary() || d.is('pre') || d.getBogus())) return d } function b (a) {
      let b = a.data.getTarget(); b.is('input') &&
(b = b.getAttribute('type'), b != 'submit' && b != 'reset' || a.data.preventDefault())
    } function c (a) { return f(a) && C(a) } function e (a, b) { return function (c) { let d = c.data.$.toElement || c.data.$.fromElement || c.data.$.relatedTarget; (d = d && d.nodeType == CKEDITOR.NODE_ELEMENT ? new CKEDITOR.dom.element(d) : null) && (b.equals(d) || b.contains(d)) || a.call(this, c) } } function g (a) {
      function b (a) { return function (b, k) { k && b.type == CKEDITOR.NODE_ELEMENT && b.is(f) && (d = b); if (!(k || !c(b) || a && A(b))) return !1 } } let d; const e = a.getRanges()[0]; a = a.root
      var f = { table: 1, ul: 1, ol: 1, dl: 1 }; if (e.startPath().contains(f)) { let g = e.clone(); g.collapse(1); g.setStartAt(a, CKEDITOR.POSITION_AFTER_START); a = new CKEDITOR.dom.walker(g); a.guard = b(); a.checkBackward(); if (d) return g = e.clone(), g.collapse(), g.setEndAt(d, CKEDITOR.POSITION_AFTER_END), a = new CKEDITOR.dom.walker(g), a.guard = b(!0), d = !1, a.checkForward(), d } return null
    } function h (a, b, c) { return !1 !== a.config.autoParagraph && a.activeEnterMode != CKEDITOR.ENTER_BR && (a.editable().equals(c) && !b || b && b.getAttribute('contenteditable') == 'true') }
    function l (a) { return a.activeEnterMode != CKEDITOR.ENTER_BR && !1 !== a.config.autoParagraph ? a.activeEnterMode == CKEDITOR.ENTER_DIV ? 'div' : 'p' : !1 } function m (a) { const b = a.editor; b.getSelection().scrollIntoView(); setTimeout(function () { b.fire('saveSnapshot') }, 0) } function r (a, b, c) { const d = a.getCommonAncestor(b); for (b = a = c ? b : a; (a = a.getParent()) && !d.equals(a) && a.getChildCount() == 1;)b = a; b.remove() } let f, C, u, A, y, q, x, J, w, E; CKEDITOR.editable = CKEDITOR.tools.createClass({
      base: CKEDITOR.dom.element,
      $: function (a, b) {
        this.base(b.$ ||
b); this.editor = a; this.status = 'unloaded'; this.hasFocus = !1; this.setup()
      },
      proto: {
        focus: function () {
          let a; if (CKEDITOR.env.webkit && !this.hasFocus && (a = this.editor._.previousActive || this.getDocument().getActive(), this.contains(a))) { a.focus(); return }CKEDITOR.env.edge && CKEDITOR.env.version > 14 && !this.hasFocus && this.getDocument().equals(CKEDITOR.document) && (this.editor._.previousScrollTop = this.$.scrollTop); try {
            !CKEDITOR.env.ie || CKEDITOR.env.edge && CKEDITOR.env.version > 14 || !this.getDocument().equals(CKEDITOR.document)
              ? this.$.focus()
              : this.$.setActive()
          } catch (b) { if (!CKEDITOR.env.ie) throw b }CKEDITOR.env.safari && !this.isInline() && (a = CKEDITOR.document.getActive(), a.equals(this.getWindow().getFrame()) || this.getWindow().focus())
        },
        on: function (a, b) { const c = Array.prototype.slice.call(arguments, 0); CKEDITOR.env.ie && /^focus|blur$/.exec(a) && (a = a == 'focus' ? 'focusin' : 'focusout', b = e(b, this), c[0] = a, c[1] = b); return CKEDITOR.dom.element.prototype.on.apply(this, c) },
        attachListener: function (a) {
          !this._.listeners && (this._.listeners = []); var b =
Array.prototype.slice.call(arguments, 1); var b = a.on.apply(a, b); this._.listeners.push(b); return b
        },
        clearListeners: function () { const a = this._.listeners; try { for (;a.length;)a.pop().removeListener() } catch (b) {} },
        restoreAttrs: function () { const a = this._.attrChanges; let b; let c; for (c in a)a.hasOwnProperty(c) && (b = a[c], b !== null ? this.setAttribute(c, b) : this.removeAttribute(c)) },
        attachClass: function (a) { let b = this.getCustomData('classes'); this.hasClass(a) || (!b && (b = []), b.push(a), this.setCustomData('classes', b), this.addClass(a)) },
        changeAttr: function (a,
          b) { const c = this.getAttribute(a); b !== c && (!this._.attrChanges && (this._.attrChanges = {}), a in this._.attrChanges || (this._.attrChanges[a] = c), this.setAttribute(a, b)) },
        insertText: function (a) { this.editor.focus(); this.insertHtml(this.transformPlainTextToHtml(a), 'text') },
        transformPlainTextToHtml: function (a) { const b = this.editor.getSelection().getStartElement().hasAscendant('pre', !0) ? CKEDITOR.ENTER_BR : this.editor.activeEnterMode; return CKEDITOR.tools.transformPlainTextToHtml(a, b) },
        insertHtml: function (a, b, c) {
          const d =
this.editor; d.focus(); d.fire('saveSnapshot'); c || (c = d.getSelection().getRanges()[0]); q(this, b || 'html', a, c); c.select(); m(this); this.editor.fire('afterInsertHtml', {})
        },
        insertHtmlIntoRange: function (a, b, c) { q(this, c || 'html', a, b); this.editor.fire('afterInsertHtml', { intoRange: b }) },
        insertElement: function (a, b) {
          var d = this.editor; d.focus(); d.fire('saveSnapshot'); const e = d.activeEnterMode; var d = d.getSelection(); var f = a.getName(); var f = CKEDITOR.dtd.$block[f]; b || (b = d.getRanges()[0]); this.insertElementIntoRange(a, b) && (b.moveToPosition(a,
            CKEDITOR.POSITION_AFTER_END), f && ((f = a.getNext(function (a) { return c(a) && !A(a) })) && f.type == CKEDITOR.NODE_ELEMENT && f.is(CKEDITOR.dtd.$block) ? f.getDtd()['#'] ? b.moveToElementEditStart(f) : b.moveToElementEditEnd(a) : f || e == CKEDITOR.ENTER_BR || (f = b.fixBlock(!0, e == CKEDITOR.ENTER_DIV ? 'div' : 'p'), b.moveToElementEditStart(f)))); d.selectRanges([b]); m(this)
        },
        insertElementIntoSelection: function (a) { this.insertElement(a) },
        insertElementIntoRange: function (a, b) {
          const c = this.editor; const d = c.config.enterMode; const e = a.getName(); const f = CKEDITOR.dtd.$block[e]
          if (b.checkReadOnly()) return !1; b.deleteContents(1); b.startContainer.type == CKEDITOR.NODE_ELEMENT && (b.startContainer.is({ tr: 1, table: 1, tbody: 1, thead: 1, tfoot: 1 }) ? x(b) : b.startContainer.is(CKEDITOR.dtd.$list) && J(b)); let g, h; if (f) for (;(g = b.getCommonAncestor(0, 1)) && (h = CKEDITOR.dtd[g.getName()]) && (!h || !h[e]);)g.getName() in CKEDITOR.dtd.span ? b.splitElement(g) : b.checkStartOfBlock() && b.checkEndOfBlock() ? (b.setStartBefore(g), b.collapse(!0), g.remove()) : b.splitBlock(d == CKEDITOR.ENTER_DIV ? 'div' : 'p', c.editable())
          b.insertNode(a); return !0
        },
        setData: function (a, b) { b || (a = this.editor.dataProcessor.toHtml(a)); this.setHtml(a); this.fixInitialSelection(); this.status == 'unloaded' && (this.status = 'ready'); this.editor.fire('dataReady') },
        getData: function (a) { let b = this.getHtml(); a || (b = this.editor.dataProcessor.toDataFormat(b)); return b },
        setReadOnly: function (a) { this.setAttribute('contenteditable', !a) },
        detach: function () {
          this.removeClass('cke_editable'); this.status = 'detached'; const a = this.editor; this._.detach(); delete a.document
          delete a.window
        },
        isInline: function () { return this.getDocument().equals(CKEDITOR.document) },
        fixInitialSelection: function () {
          function a () { let b = c.getDocument().$; const d = b.getSelection(); let k; a:if (d.anchorNode && d.anchorNode == c.$)k = !0; else { if (CKEDITOR.env.webkit && (k = c.getDocument().getActive()) && k.equals(c) && !d.anchorNode) { k = !0; break a }k = void 0 }k && (k = new CKEDITOR.dom.range(c), k.moveToElementEditStart(c), b = b.createRange(), b.setStart(k.startContainer.$, k.startOffset), b.collapse(!0), d.removeAllRanges(), d.addRange(b)) }
          function b () { let a = c.getDocument().$; let d = a.selection; const k = c.getDocument().getActive(); d.type == 'None' && k.equals(c) && (d = new CKEDITOR.dom.range(c), a = a.body.createTextRange(), d.moveToElementEditStart(c), d = d.startContainer, d.type != CKEDITOR.NODE_ELEMENT && (d = d.getParent()), a.moveToElementText(d.$), a.collapse(!0), a.select()) } var c = this; if (CKEDITOR.env.ie && (CKEDITOR.env.version < 9 || CKEDITOR.env.quirks)) this.hasFocus && (this.focus(), b()); else if (this.hasFocus) this.focus(), a(); else {
            this.once('focus', function () { a() },
              null, null, -999)
          }
        },
        getHtmlFromRange: function (a) { if (a.collapsed) return new CKEDITOR.dom.documentFragment(a.document); a = { doc: this.getDocument(), range: a.clone() }; w.eol.detect(a, this); w.bogus.exclude(a); w.cell.shrink(a); a.fragment = a.range.cloneContents(); w.tree.rebuild(a, this); w.eol.fix(a, this); return new CKEDITOR.dom.documentFragment(a.fragment.$) },
        extractHtmlFromRange: function (a, b) {
          let c = E; var d = { range: a, doc: a.document }; const e = this.getHtmlFromRange(a); if (a.collapsed) return a.optimize(), e; a.enlarge(CKEDITOR.ENLARGE_INLINE,
            1); c.table.detectPurge(d); d.bookmark = a.createBookmark(); delete d.range; var f = this.editor.createRange(); f.moveToPosition(d.bookmark.startNode, CKEDITOR.POSITION_BEFORE_START); d.targetBookmark = f.createBookmark(); c.list.detectMerge(d, this); c.table.detectRanges(d, this); c.block.detectMerge(d, this); d.tableContentsRanges ? (c.table.deleteRanges(d), a.moveToBookmark(d.bookmark), d.range = a) : (a.moveToBookmark(d.bookmark), d.range = a, a.extractContents(c.detectExtractMerge(d))); a.moveToBookmark(d.targetBookmark); a.optimize()
          c.fixUneditableRangePosition(a); c.list.merge(d, this); c.table.purge(d, this); c.block.merge(d, this); if (b) { c = a.startPath(); if (d = a.checkStartOfBlock() && a.checkEndOfBlock() && c.block && !a.root.equals(c.block)) { a: { var d = c.block.getElementsByTag('span'); var f = 0; let g; if (d) for (;g = d.getItem(f++);) if (!C(g)) { d = !0; break a }d = !1 }d = !d }d && (a.moveToPosition(c.block, CKEDITOR.POSITION_BEFORE_START), c.block.remove()) } else c.autoParagraph(this.editor, a), u(a.startContainer) && a.startContainer.appendBogus(); a.startContainer.mergeSiblings()
          return e
        },
        setup: function () {
          const a = this.editor; this.attachListener(a, 'beforeGetData', function () { let b = this.getData(); this.is('textarea') || !1 !== a.config.ignoreEmptyParagraph && (b = b.replace(y, function (a, b) { return b })); a.setData(b, null, 1) }, this); this.attachListener(a, 'getSnapshot', function (a) { a.data = this.getData(1) }, this); this.attachListener(a, 'afterSetData', function () { this.setData(a.getData(1)) }, this); this.attachListener(a, 'loadSnapshot', function (a) { this.setData(a.data, 1) }, this); this.attachListener(a,
            'beforeFocus', function () { let b = a.getSelection(); (b = b && b.getNative()) && b.type == 'Control' || this.focus() }, this); this.attachListener(a, 'insertHtml', function (a) { this.insertHtml(a.data.dataValue, a.data.mode, a.data.range) }, this); this.attachListener(a, 'insertElement', function (a) { this.insertElement(a.data) }, this); this.attachListener(a, 'insertText', function (a) { this.insertText(a.data) }, this); this.setReadOnly(a.readOnly); this.attachClass('cke_editable'); a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE
            ? this.attachClass('cke_editable_inline')
            : a.elementMode != CKEDITOR.ELEMENT_MODE_REPLACE && a.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO || this.attachClass('cke_editable_themed'); this.attachClass('cke_contents_' + a.config.contentsLangDirection); a.keystrokeHandler.blockedKeystrokes[8] = +a.readOnly; a.keystrokeHandler.attach(this); this.on('blur', function () { this.hasFocus = !1 }, null, null, -1); this.on('focus', function () { this.hasFocus = !0 }, null, null, -1); if (CKEDITOR.env.webkit) {
            this.on('scroll', function () { a._.previousScrollTop = a.editable().$.scrollTop }, null,
              null, -1)
          } if (CKEDITOR.env.edge && CKEDITOR.env.version > 14) { var d = function () { const b = a.editable(); a._.previousScrollTop != null && b.getDocument().equals(CKEDITOR.document) && (b.$.scrollTop = a._.previousScrollTop, a._.previousScrollTop = null, this.removeListener('scroll', d)) }; this.on('scroll', d) }a.focusManager.add(this); this.equals(CKEDITOR.document.getActive()) && (this.hasFocus = !0, a.once('contentDom', function () { a.focusManager.focus(this) }, this)); this.isInline() && this.changeAttr('tabindex', a.tabIndex); if (!this.is('textarea')) {
            a.document =
this.getDocument(); a.window = this.getWindow(); const e = a.document; this.changeAttr('spellcheck', !a.config.disableNativeSpellChecker); var t = a.config.contentsLangDirection; this.getDirection(1) != t && this.changeAttr('dir', t); let h = CKEDITOR.getCss(); if (h) {
              var t = e.getHead(); const l = t.getCustomData('stylesheet'); l
                ? h != l.getText() && (CKEDITOR.env.ie && CKEDITOR.env.version < 9 ? l.$.styleSheet.cssText = h : l.setText(h))
                : (h = e.appendStyleText(h), h = new CKEDITOR.dom.element(h.ownerNode || h.owningElement), t.setCustomData('stylesheet',
                    h), h.data('cke-temp', 1))
            }t = e.getCustomData('stylesheet_ref') || 0; e.setCustomData('stylesheet_ref', t + 1); this.setCustomData('cke_includeReadonly', !a.config.disableReadonlyStyling); this.attachListener(this, 'click', function (a) { a = a.data; const b = (new CKEDITOR.dom.elementPath(a.getTarget(), this)).contains('a'); b && a.$.button != 2 && b.isReadOnly() && a.preventDefault() }); const F = { 8: 1, 46: 1 }; this.attachListener(a, 'key', function (b) {
              if (a.readOnly) return !0; var c = b.data.domEvent.getKey(); let d; if (c in F) {
                b = a.getSelection(); let e
                const n = b.getRanges()[0]; const p = n.startPath(); let t; let h; let l; var c = c == 8; CKEDITOR.env.ie && CKEDITOR.env.version < 11 && (e = b.getSelectedElement()) || (e = g(b))
                  ? (a.fire('saveSnapshot'), n.moveToPosition(e, CKEDITOR.POSITION_BEFORE_START), e.remove(), n.select(), a.fire('saveSnapshot'), d = 1)
                  : n.collapsed && ((t = p.block) && (l = t[c ? 'getPrevious' : 'getNext'](f)) && l.type == CKEDITOR.NODE_ELEMENT && l.is('table') && n[c ? 'checkStartOfBlock' : 'checkEndOfBlock']()
                    ? (a.fire('saveSnapshot'), n[c ? 'checkEndOfBlock' : 'checkStartOfBlock']() && t.remove(), n['moveToElementEdit' +
(c ? 'End' : 'Start')](l), n.select(), a.fire('saveSnapshot'), d = 1)
                    : p.blockLimit && p.blockLimit.is('td') && (h = p.blockLimit.getAscendant('table')) && n.checkBoundaryOfElement(h, c ? CKEDITOR.START : CKEDITOR.END) && (l = h[c ? 'getPrevious' : 'getNext'](f)) ? (a.fire('saveSnapshot'), n['moveToElementEdit' + (c ? 'End' : 'Start')](l), n.checkStartOfBlock() && n.checkEndOfBlock() ? l.remove() : n.select(), a.fire('saveSnapshot'), d = 1) : (h = p.contains(['td', 'th', 'caption'])) && n.checkBoundaryOfElement(h, c ? CKEDITOR.START : CKEDITOR.END) && (d = 1))
              } return !d
            })
            a.blockless && CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller && this.attachListener(this, 'keyup', function (b) { b.data.getKeystroke() in F && !this.getFirst(c) && (this.appendBogus(), b = a.createRange(), b.moveToPosition(this, CKEDITOR.POSITION_AFTER_START), b.select()) }); this.attachListener(this, 'dblclick', function (b) { if (a.readOnly) return !1; b = { element: b.data.getTarget() }; a.fire('doubleclick', b) }); CKEDITOR.env.ie && this.attachListener(this, 'click', b); CKEDITOR.env.ie && !CKEDITOR.env.edge || this.attachListener(this, 'mousedown',
              function (b) { const c = b.data.getTarget(); c.is('img', 'hr', 'input', 'textarea', 'select') && !c.isReadOnly() && (a.getSelection().selectElement(c), c.is('input', 'textarea', 'select') && b.data.preventDefault()) }); CKEDITOR.env.edge && this.attachListener(this, 'mouseup', function (b) { (b = b.data.getTarget()) && b.is('img') && a.getSelection().selectElement(b) }); CKEDITOR.env.gecko && this.attachListener(this, 'mouseup', function (b) {
              if (b.data.$.button == 2 && (b = b.data.getTarget(), !b.getOuterHtml().replace(y, ''))) {
                const c = a.createRange()
                c.moveToElementEditStart(b); c.select(!0)
              }
            }); CKEDITOR.env.webkit && (this.attachListener(this, 'click', function (a) { a.data.getTarget().is('input', 'select') && a.data.preventDefault() }), this.attachListener(this, 'mouseup', function (a) { a.data.getTarget().is('input', 'textarea') && a.data.preventDefault() })); CKEDITOR.env.webkit && this.attachListener(a, 'key', function (b) {
              if (a.readOnly) return !0; b = b.data.domEvent.getKey(); if (b in F) {
                let c = b == 8; let d = a.getSelection().getRanges()[0]; b = d.startPath(); if (d.collapsed) {
                  a: {
                    var e =
b.block; if (e && d[c ? 'checkStartOfBlock' : 'checkEndOfBlock']() && d.moveToClosestEditablePosition(e, !c) && d.collapsed) {
                      if (d.startContainer.type == CKEDITOR.NODE_ELEMENT) { var f = d.startContainer.getChild(d.startOffset - (c ? 1 : 0)); if (f && f.type == CKEDITOR.NODE_ELEMENT && f.is('hr')) { a.fire('saveSnapshot'); f.remove(); b = !0; break a } }d = d.startPath().block; if (!d || d && d.contains(e))b = void 0; else {
                        a.fire('saveSnapshot'); var n; (n = (c ? d : e).getBogus()) && n.remove(); n = a.getSelection(); f = n.createBookmarks(); (c ? e : d).moveChildren(c
                          ? d
                          : e, !1); b.lastElement.mergeSiblings(); r(e, d, !c); n.selectBookmarks(f); b = !0
                      }
                    } else b = !1
                  }
                } else c = d, n = b.block, d = c.endPath().block, n && d && !n.equals(d) ? (a.fire('saveSnapshot'), (e = n.getBogus()) && e.remove(), c.enlarge(CKEDITOR.ENLARGE_INLINE), c.deleteContents(), d.getParent() && (d.moveChildren(n, !1), b.lastElement.mergeSiblings(), r(n, d, !0)), c = a.getSelection().getRanges()[0], c.collapse(1), c.optimize(), c.startContainer.getHtml() === '' && c.startContainer.appendBogus(), c.select(), b = !0) : b = !1; if (!b) return; a.getSelection().scrollIntoView()
                a.fire('saveSnapshot'); return !1
              }
            }, this, null, 100)
          }
        }
      },
      _: {
        detach: function () {
          this.editor.setData(this.editor.getData(), 0, 1); this.clearListeners(); this.restoreAttrs(); let a; if (a = this.removeCustomData('classes')) for (;a.length;) this.removeClass(a.pop()); if (!this.is('textarea')) { a = this.getDocument(); const b = a.getHead(); if (b.getCustomData('stylesheet')) { let c = a.getCustomData('stylesheet_ref'); --c ? a.setCustomData('stylesheet_ref', c) : (a.removeCustomData('stylesheet_ref'), b.removeCustomData('stylesheet').remove()) } } this.editor.fire('contentDomUnload')
          delete this.editor
        }
      }
    }); CKEDITOR.editor.prototype.editable = function (a) { let b = this._.editable; if (b && a) return 0; arguments.length && (b = this._.editable = a ? a instanceof CKEDITOR.editable ? a : new CKEDITOR.editable(this, a) : (b && b.detach(), null)); return b }; CKEDITOR.on('instanceLoaded', function (b) {
      const c = b.editor; c.on('insertElement', function (a) {
        a = a.data; a.type == CKEDITOR.NODE_ELEMENT && (a.is('input') || a.is('textarea')) && (a.getAttribute('contentEditable') != 'false' && a.data('cke-editable', a.hasAttribute('contenteditable')
          ? 'true'
          : '1'), a.setAttribute('contentEditable', !1))
      }); c.on('selectionChange', function (b) { if (!c.readOnly) { let d = c.getSelection(); d && !d.isLocked && (d = c.checkDirty(), c.fire('lockSnapshot'), a(b), c.fire('unlockSnapshot'), !d && c.resetDirty()) } })
    }); CKEDITOR.on('instanceCreated', function (a) {
      const b = a.editor; b.on('mode', function () {
        const a = b.editable(); if (a && a.isInline()) {
          let c = b.title; a.changeAttr('role', 'textbox'); a.changeAttr('aria-label', c); c && a.changeAttr('title', c); var d = b.fire('ariaEditorHelpLabel', {}).label
          if (d && (c = this.ui.space(this.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? 'top' : 'contents'))) { const e = CKEDITOR.tools.getNextId(); var d = CKEDITOR.dom.element.createFromHtml('\x3cspan id\x3d"' + e + '" class\x3d"cke_voice_label"\x3e' + d + '\x3c/span\x3e'); c.append(d); a.changeAttr('aria-describedby', e) }
        }
      })
    }); CKEDITOR.addCss('.cke_editable{cursor:text}.cke_editable img,.cke_editable input,.cke_editable textarea{cursor:default}'); f = CKEDITOR.dom.walker.whitespaces(!0); C = CKEDITOR.dom.walker.bookmark(!1, !0); u = CKEDITOR.dom.walker.empty()
    A = CKEDITOR.dom.walker.bogus(); y = /(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi; q = (function () {
      function a (b) { return b.type == CKEDITOR.NODE_ELEMENT } function b (c, d) {
        let e; let f; let n; let t; let g = []; var h = d.range.startContainer; e = d.range.startPath(); for (var h = q[h.getName()], l = 0, B = c.getChildren(), z = B.count(), F = -1, m = -1, r = 0, H = e.contains(q.$list); l < z; ++l) {
          e = B.getItem(l), a(e)
            ? (n = e.getName(), H && n in CKEDITOR.dtd.$list
                ? g = g.concat(b(e, d))
                : (t = !!h[n],
                  n != 'br' || !e.data('cke-eol') || l && l != z - 1 || (r = (f = l ? g[l - 1].node : B.getItem(l + 1)) && (!a(f) || !f.is('br')), f = f && a(f) && q.$block[f.getName()]), F != -1 || t || (F = l), t || (m = l), g.push({ isElement: 1, isLineBreak: r, isBlock: e.isBlockBoundary(), hasBlockSibling: f, node: e, name: n, allowed: t }), f = r = 0))
            : g.push({ isElement: 0, node: e, allowed: 1 })
        }F > -1 && (g[F].firstNotAllowed = 1); m > -1 && (g[m].lastNotAllowed = 1); return g
      } function d (b, c) {
        let e = []; const f = b.getChildren(); const p = f.count(); let g; let t = 0; const h = q[c]; const l = !b.is(q.$inline) || b.is('br'); for (l && e.push(' '); t < p; t++) {
          g =
f.getItem(t), a(g) && !g.is(h) ? e = e.concat(d(g, c)) : e.push(g)
        }l && e.push(' '); return e
      } function e (b) { return a(b.startContainer) && b.startContainer.getChild(b.startOffset - 1) } function f (b) { return b && a(b) && (b.is(q.$removeEmpty) || b.is('a') && !b.isBlockBoundary()) } function g (b, c, d, e) {
        const f = b.clone(); let n; let p; f.setEndAt(c, CKEDITOR.POSITION_BEFORE_END); (n = (new CKEDITOR.dom.walker(f)).next()) && a(n) && m[n.getName()] && (p = n.getPrevious()) && a(p) && !p.getParent().equals(b.startContainer) && d.contains(p) && e.contains(n) && n.isIdentical(p) &&
(n.moveChildren(p), n.remove(), g(b, c, d, e))
      } function F (b, c) { function d (b, c) { if (c.isBlock && c.isElement && !c.node.is('br') && a(b) && b.is('br')) return b.remove(), 1 } const e = c.endContainer.getChild(c.endOffset); const f = c.endContainer.getChild(c.endOffset - 1); e && d(e, b[b.length - 1]); f && d(f, b[0]) && (c.setEnd(c.endContainer, c.endOffset - 1), c.collapse()) } var q = CKEDITOR.dtd; var m = { p: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, ul: 1, ol: 1, li: 1, pre: 1, dl: 1, blockquote: 1 }; const r = { p: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1 }; const x = CKEDITOR.tools.extend({},
        q.$inline); delete x.br; return function (m, v, G, D) {
        var I = m.editor; var K = !1; v == 'unfiltered_html' && (v = 'html', K = !0); if (!D.checkReadOnly()) {
          var M = (new CKEDITOR.dom.elementPath(D.startContainer, D.root)).blockLimit || D.root; m = { type: v, dontFilter: K, editable: m, editor: I, range: D, blockLimit: M, mergeCandidates: [], zombies: [] }; v = m.range; D = m.mergeCandidates; let H, u; m.type == 'text' && v.shrink(CKEDITOR.SHRINK_ELEMENT, !0, !1) && (H = CKEDITOR.dom.element.createFromHtml('\x3cspan\x3e\x26nbsp;\x3c/span\x3e', v.document), v.insertNode(H),
          v.setStartAfter(H)); K = new CKEDITOR.dom.elementPath(v.startContainer); m.endPath = M = new CKEDITOR.dom.elementPath(v.endContainer); if (!v.collapsed) { var I = M.block || M.blockLimit; var C = v.getCommonAncestor(); I && !I.equals(C) && !I.contains(C) && v.checkEndOfBlock() && m.zombies.push(I); v.deleteContents() } for (;(u = e(v)) && a(u) && u.isBlockBoundary() && K.contains(u);)v.moveToPosition(u, CKEDITOR.POSITION_BEFORE_END); g(v, m.blockLimit, K, M); H && (v.setEndBefore(H), v.collapse(), H.remove()); H = v.startPath(); if (I = H.contains(f, !1, 1)) {
            v.splitElement(I),
            m.inlineStylesRoot = I, m.inlineStylesPeak = H.lastElement
          }H = v.createBookmark(); (I = H.startNode.getPrevious(c)) && a(I) && f(I) && D.push(I); (I = H.startNode.getNext(c)) && a(I) && f(I) && D.push(I); for (I = H.startNode; (I = I.getParent()) && f(I);)D.push(I); v.moveToBookmark(H); if (H = G) {
            H = m.range; if (m.type == 'text' && m.inlineStylesRoot) { u = m.inlineStylesPeak; v = u.getDocument().createText('{cke-peak}'); for (D = m.inlineStylesRoot.getParent(); !u.equals(D);)v = v.appendTo(u.clone()), u = u.getParent(); G = v.getOuterHtml().split('{cke-peak}').join(G) }u =
m.blockLimit.getName(); if (/^\s+|\s+$/.test(G) && 'span' in CKEDITOR.dtd[u]) { var A = '\x3cspan data-cke-marker\x3d"1"\x3e\x26nbsp;\x3c/span\x3e'; G = A + G + A }G = m.editor.dataProcessor.toHtml(G, { context: null, fixForBody: !1, protectedWhitespaces: !!A, dontFilter: m.dontFilter, filter: m.editor.activeFilter, enterMode: m.editor.activeEnterMode }); u = H.document.createElement('body'); u.setHtml(G); A && (u.getFirst().remove(), u.getLast().remove()); if ((A = H.startPath().block) && (A.getChildCount() != 1 || !A.getBogus())) {
              a: {
                var w; if (u.getChildCount() ==
1 && a(w = u.getFirst()) && w.is(r) && !w.hasAttribute('contenteditable')) { A = w.getElementsByTag('*'); H = 0; for (D = A.count(); H < D; H++) if (v = A.getItem(H), !v.is(x)) break a; w.moveChildren(w.getParent(1)); w.remove() }
              }
            }m.dataWrapper = u; H = G
          } if (H) {
            w = m.range; H = w.document; let y; u = m.blockLimit; D = 0; var O; var A = []; var N; var V; G = I = 0; var E, J; v = w.startContainer; var K = m.endPath.elements[0]; var Y; var M = K.getPosition(v); var C = !!K.getCommonAncestor(v) && M != CKEDITOR.POSITION_IDENTICAL && !(M & CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED)
            v = b(m.dataWrapper, m); for (F(v, w); D < v.length; D++) {
              M = v[D]; if (y = M.isLineBreak) { y = w; E = u; var U = void 0; var aa = void 0; M.hasBlockSibling ? y = 1 : (U = y.startContainer.getAscendant(q.$block, 1)) && U.is({ div: 1, p: 1 }) ? (aa = U.getPosition(E), aa == CKEDITOR.POSITION_IDENTICAL || aa == CKEDITOR.POSITION_CONTAINS ? y = 0 : (E = y.splitElement(U), y.moveToPosition(E, CKEDITOR.POSITION_AFTER_START), y = 1)) : y = 0 } if (y)G = D > 0; else {
                y = w.startPath(); !M.isBlock && h(m.editor, y.block, y.blockLimit) && (V = l(m.editor)) && (V = H.createElement(V), V.appendBogus(), w.insertNode(V),
                CKEDITOR.env.needsBrFiller && (O = V.getBogus()) && O.remove(), w.moveToPosition(V, CKEDITOR.POSITION_BEFORE_END)); if ((y = w.startPath().block) && !y.equals(N)) { if (O = y.getBogus())O.remove(), A.push(y); N = y }M.firstNotAllowed && (I = 1); if (I && M.isElement) {
                  y = w.startContainer; for (E = null; y && !q[y.getName()][M.name];) { if (y.equals(u)) { y = null; break }E = y; y = y.getParent() } if (y)E && (J = w.splitElement(E), m.zombies.push(J), m.zombies.push(E)); else {
                    E = u.getName(); Y = !D; y = D == v.length - 1; E = d(M.node, E); for (var U = [], aa = E.length, ba = 0, da = void 0,
                      ea = 0, W = -1; ba < aa; ba++)da = E[ba], da == ' ' ? (ea || Y && !ba || (U.push(new CKEDITOR.dom.text(' ')), W = U.length), ea = 1) : (U.push(da), ea = 0); y && W == U.length && U.pop(); Y = U
                  }
                } if (Y) { for (;y = Y.pop();)w.insertNode(y); Y = 0 } else w.insertNode(M.node); M.lastNotAllowed && D < v.length - 1 && ((J = C ? K : J) && w.setEndAt(J, CKEDITOR.POSITION_AFTER_START), I = 0); w.collapse()
              }
            }v.length != 1 ? O = !1 : (O = v[0], O = O.isElement && O.node.getAttribute('contenteditable') == 'false'); O && (G = !0, y = v[0].node, w.setStartAt(y, CKEDITOR.POSITION_BEFORE_START), w.setEndAt(y, CKEDITOR.POSITION_AFTER_END))
            m.dontMoveCaret = G; m.bogusNeededBlocks = A
          }O = m.range; let T; J = m.bogusNeededBlocks; for (Y = O.createBookmark(); N = m.zombies.pop();)N.getParent() && (V = O.clone(), V.moveToElementEditStart(N), V.removeEmptyBlocksAtEnd()); if (J) for (;N = J.pop();)CKEDITOR.env.needsBrFiller ? N.appendBogus() : N.append(O.document.createText(' ')); for (;N = m.mergeCandidates.pop();)N.mergeSiblings(); O.moveToBookmark(Y); if (!m.dontMoveCaret) {
            for (N = e(O); N && a(N) && !N.is(q.$empty);) {
              if (N.isBlockBoundary())O.moveToPosition(N, CKEDITOR.POSITION_BEFORE_END)
              else { if (f(N) && N.getHtml().match(/(\s|&nbsp;)$/g)) { T = null; break }T = O.clone(); T.moveToPosition(N, CKEDITOR.POSITION_BEFORE_END) }N = N.getLast(c)
            }T && O.moveToRange(T)
          }
        }
      }
    }()); x = (function () {
      function a (b) { b = new CKEDITOR.dom.walker(b); b.guard = function (a, b) { if (b) return !1; if (a.type == CKEDITOR.NODE_ELEMENT) return a.is(CKEDITOR.dtd.$tableContent) }; b.evaluator = function (a) { return a.type == CKEDITOR.NODE_ELEMENT }; return b } function b (a, c, d) { c = a.getDocument().createElement(c); a.append(c, d); return c } function c (a) {
        let b = a.count()
        let d; for (b; b-- > 0;)d = a.getItem(b), CKEDITOR.tools.trim(d.getHtml()) || (d.appendBogus(), CKEDITOR.env.ie && CKEDITOR.env.version < 9 && d.getChildCount() && d.getFirst().remove())
      } return function (d) {
        let e = d.startContainer; let f = e.getAscendant('table', 1); let g = !1; c(f.getElementsByTag('td')); c(f.getElementsByTag('th')); f = d.clone(); f.setStart(e, 0); f = a(f).lastBackward(); f || (f = d.clone(), f.setEndAt(e, CKEDITOR.POSITION_BEFORE_END), f = a(f).lastForward(), g = !0); f || (f = e); f.is('table')
          ? (d.setStartAt(f, CKEDITOR.POSITION_BEFORE_START),
            d.collapse(!0), f.remove())
          : (f.is({ tbody: 1, thead: 1, tfoot: 1 }) && (f = b(f, 'tr', g)), f.is('tr') && (f = b(f, f.getParent().is('thead') ? 'th' : 'td', g)), (e = f.getBogus()) && e.remove(), d.moveToPosition(f, g ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END))
      }
    }()); J = (function () {
      function a (b) {
        b = new CKEDITOR.dom.walker(b); b.guard = function (a, b) { if (b) return !1; if (a.type == CKEDITOR.NODE_ELEMENT) return a.is(CKEDITOR.dtd.$list) || a.is(CKEDITOR.dtd.$listItem) }; b.evaluator = function (a) {
          return a.type == CKEDITOR.NODE_ELEMENT &&
a.is(CKEDITOR.dtd.$listItem)
        }; return b
      } return function (b) { let c = b.startContainer; let d = !1; let e; e = b.clone(); e.setStart(c, 0); e = a(e).lastBackward(); e || (e = b.clone(), e.setEndAt(c, CKEDITOR.POSITION_BEFORE_END), e = a(e).lastForward(), d = !0); e || (e = c); e.is(CKEDITOR.dtd.$list) ? (b.setStartAt(e, CKEDITOR.POSITION_BEFORE_START), b.collapse(!0), e.remove()) : ((c = e.getBogus()) && c.remove(), b.moveToPosition(e, d ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END), b.select()) }
    }()); w = {
      eol: {
        detect: function (a, b) {
          const c = a.range
          const d = c.clone(); const e = c.clone(); const f = new CKEDITOR.dom.elementPath(c.startContainer, b); const g = new CKEDITOR.dom.elementPath(c.endContainer, b); d.collapse(1); e.collapse(); f.block && d.checkBoundaryOfElement(f.block, CKEDITOR.END) && (c.setStartAfter(f.block), a.prependEolBr = 1); g.block && e.checkBoundaryOfElement(g.block, CKEDITOR.START) && (c.setEndBefore(g.block), a.appendEolBr = 1)
        },
        fix: function (a, b) {
          const c = b.getDocument(); let d; a.appendEolBr && (d = this.createEolBr(c), a.fragment.append(d)); !a.prependEolBr || d && !d.getPrevious() || a.fragment.append(this.createEolBr(c),
            1)
        },
        createEolBr: function (a) { return a.createElement('br', { attributes: { 'data-cke-eol': 1 } }) }
      },
      bogus: { exclude: function (a) { var b = a.range.getBoundaryNodes(); const c = b.startNode; var b = b.endNode; !b || !A(b) || c && c.equals(b) || a.range.setEndBefore(b) } },
      tree: {
        rebuild: function (a, b) {
          var c = a.range; let d = c.getCommonAncestor(); const e = new CKEDITOR.dom.elementPath(d, b); let f = new CKEDITOR.dom.elementPath(c.startContainer, b); var c = new CKEDITOR.dom.elementPath(c.endContainer, b); let g; d.type == CKEDITOR.NODE_TEXT && (d = d.getParent()); if (e.blockLimit.is({
            tr: 1,
            table: 1
          })) { const h = e.contains('table').getParent(); g = function (a) { return !a.equals(h) } } else if (e.block && e.block.is(CKEDITOR.dtd.$listItem) && (f = f.contains(CKEDITOR.dtd.$list), c = c.contains(CKEDITOR.dtd.$list), !f.equals(c))) { const l = e.contains(CKEDITOR.dtd.$list).getParent(); g = function (a) { return !a.equals(l) } }g || (g = function (a) { return !a.equals(e.block) && !a.equals(e.blockLimit) }); this.rebuildFragment(a, b, d, g)
        },
        rebuildFragment: function (a, b, c, d) {
          for (var e; c && !c.equals(b) && d(c);) {
            e = c.clone(0, 1), a.fragment.appendTo(e),
            a.fragment = e, c = c.getParent()
          }
        }
      },
      cell: { shrink: function (a) { a = a.range; const b = a.startContainer; const c = a.endContainer; let d = a.startOffset; const e = a.endOffset; b.type == CKEDITOR.NODE_ELEMENT && b.equals(c) && b.is('tr') && ++d == e && a.shrink(CKEDITOR.SHRINK_TEXT) } }
    }; E = (function () {
      function a (b, c) { const d = b.getParent(); if (d.is(CKEDITOR.dtd.$inline))b[c ? 'insertBefore' : 'insertAfter'](d) } function b (c, d, e) { a(d); a(e, 1); for (var f; f = e.getNext();)f.insertAfter(d), d = f; u(c) && c.remove() } function c (a, b) {
        const d = new CKEDITOR.dom.range(a); d.setStartAfter(b.startNode)
        d.setEndBefore(b.endNode); return d
      } return {
        list: {
          detectMerge: function (a, b) {
            let d = c(b, a.bookmark); const e = d.startPath(); const f = d.endPath(); const k = e.contains(CKEDITOR.dtd.$list); const g = f.contains(CKEDITOR.dtd.$list); a.mergeList = k && g && k.getParent().equals(g.getParent()) && !k.equals(g); a.mergeListItems = e.block && f.block && e.block.is(CKEDITOR.dtd.$listItem) && f.block.is(CKEDITOR.dtd.$listItem); if (a.mergeList || a.mergeListItems) {
              d = d.clone(), d.setStartBefore(a.bookmark.startNode), d.setEndAfter(a.bookmark.endNode), a.mergeListBookmark =
d.createBookmark()
            }
          },
          merge: function (a, c) { if (a.mergeListBookmark) { const d = a.mergeListBookmark.startNode; const e = a.mergeListBookmark.endNode; let f = new CKEDITOR.dom.elementPath(d, c); let k = new CKEDITOR.dom.elementPath(e, c); if (a.mergeList) { const g = f.contains(CKEDITOR.dtd.$list); const n = k.contains(CKEDITOR.dtd.$list); g.equals(n) || (n.moveChildren(g), n.remove()) }a.mergeListItems && (f = f.contains(CKEDITOR.dtd.$listItem), k = k.contains(CKEDITOR.dtd.$listItem), f.equals(k) || b(k, d, e)); d.remove(); e.remove() } }
        },
        block: {
          detectMerge: function (a,
            b) { if (!a.tableContentsRanges && !a.mergeListBookmark) { const c = new CKEDITOR.dom.range(b); c.setStartBefore(a.bookmark.startNode); c.setEndAfter(a.bookmark.endNode); a.mergeBlockBookmark = c.createBookmark() } },
          merge: function (a, c) { if (a.mergeBlockBookmark && !a.purgeTableBookmark) { const d = a.mergeBlockBookmark.startNode; const e = a.mergeBlockBookmark.endNode; var f = new CKEDITOR.dom.elementPath(d, c); var k = new CKEDITOR.dom.elementPath(e, c); var f = f.block; var k = k.block; f && k && !f.equals(k) && b(k, d, e); d.remove(); e.remove() } }
        },
        table: (function () {
          function a (c) {
            const e =
[]; let f; const k = new CKEDITOR.dom.walker(c); const g = c.startPath().contains(d); const n = c.endPath().contains(d); const h = {}; k.guard = function (a, k) {
              if (a.type == CKEDITOR.NODE_ELEMENT) { var p = 'visited_' + (k ? 'out' : 'in'); if (a.getCustomData(p)) return; CKEDITOR.dom.element.setMarker(h, a, p, 1) } if (k && g && a.equals(g))f = c.clone(), f.setEndAt(g, CKEDITOR.POSITION_BEFORE_END), e.push(f); else if (!k && n && a.equals(n))f = c.clone(), f.setStartAt(n, CKEDITOR.POSITION_AFTER_START), e.push(f); else {
                if (p = !k) {
                  p = a.type == CKEDITOR.NODE_ELEMENT && a.is(d) && (!g || b(a, g)) && (!n ||
b(a, n))
                }p && (f = c.clone(), f.selectNodeContents(a), e.push(f))
              }
            }; k.lastForward(); CKEDITOR.dom.element.clearAllMarkers(h); return e
          } function b (a, c) { const d = CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED; const e = a.getPosition(c); return e === CKEDITOR.POSITION_IDENTICAL ? !1 : (e & d) === 0 } var d = { td: 1, th: 1, caption: 1 }; return {
            detectPurge: function (a) {
              let b = a.range; var c = b.clone(); c.enlarge(CKEDITOR.ENLARGE_ELEMENT); var c = new CKEDITOR.dom.walker(c); let e = 0; c.evaluator = function (a) { a.type == CKEDITOR.NODE_ELEMENT && a.is(d) && ++e }
              c.checkForward(); if (e > 1) { var c = b.startPath().contains('table'); const f = b.endPath().contains('table'); c && f && b.checkBoundaryOfElement(c, CKEDITOR.START) && b.checkBoundaryOfElement(f, CKEDITOR.END) && (b = a.range.clone(), b.setStartBefore(c), b.setEndAfter(f), a.purgeTableBookmark = b.createBookmark()) }
            },
            detectRanges: function (e, f) {
              const k = c(f, e.bookmark); let g = k.clone(); let h; let p; let v = k.getCommonAncestor(); v.is(CKEDITOR.dtd.$tableContent) && !v.is(d) && (v = v.getAscendant('table', !0)); p = v; v = new CKEDITOR.dom.elementPath(k.startContainer,
                p); p = new CKEDITOR.dom.elementPath(k.endContainer, p); v = v.contains('table'); p = p.contains('table'); if (v || p) {
                v && p && b(v, p)
                  ? (e.tableSurroundingRange = g, g.setStartAt(v, CKEDITOR.POSITION_AFTER_END), g.setEndAt(p, CKEDITOR.POSITION_BEFORE_START), g = k.clone(), g.setEndAt(v, CKEDITOR.POSITION_AFTER_END), h = k.clone(), h.setStartAt(p, CKEDITOR.POSITION_BEFORE_START), h = a(g).concat(a(h)))
                  : v
                    ? p || (e.tableSurroundingRange = g, g.setStartAt(v, CKEDITOR.POSITION_AFTER_END), k.setEndAt(v, CKEDITOR.POSITION_AFTER_END))
                    : (e.tableSurroundingRange =
g, g.setEndAt(p, CKEDITOR.POSITION_BEFORE_START), k.setStartAt(p, CKEDITOR.POSITION_AFTER_START)), e.tableContentsRanges = h || a(k)
              }
            },
            deleteRanges: function (a) { for (var b; b = a.tableContentsRanges.pop();)b.extractContents(), u(b.startContainer) && b.startContainer.appendBogus(); a.tableSurroundingRange && a.tableSurroundingRange.extractContents() },
            purge: function (a) {
              if (a.purgeTableBookmark) {
                var b = a.doc; const c = a.range.clone(); var b = b.createElement('p'); b.insertBefore(a.purgeTableBookmark.startNode); c.moveToBookmark(a.purgeTableBookmark)
                c.deleteContents(); a.range.moveToPosition(b, CKEDITOR.POSITION_AFTER_START)
              }
            }
          }
        }()),
        detectExtractMerge: function (a) { return !(a.range.startPath().contains(CKEDITOR.dtd.$listItem) && a.range.endPath().contains(CKEDITOR.dtd.$listItem)) },
        fixUneditableRangePosition: function (a) { a.startContainer.getDtd()['#'] || a.moveToClosestEditablePosition(null, !0) },
        autoParagraph: function (a, b) {
          const c = b.startPath(); let d; h(a, c.block, c.blockLimit) && (d = l(a)) && (d = b.document.createElement(d), d.appendBogus(), b.insertNode(d), b.moveToPosition(d,
            CKEDITOR.POSITION_AFTER_START))
        }
      }
    }())
  })();
  (function () {
    function a () {
      let a = this._.fakeSelection; let b; a && (b = this.getSelection(1), b && b.isHidden() || (a.reset(), a = 0)); if (!a && (a = b || this.getSelection(1), !a || a.getType() == CKEDITOR.SELECTION_NONE)) return; this.fire('selectionCheck', a); b = this.elementPath(); if (!b.compare(this._.selectionPreviousPath)) {
        const c = this._.selectionPreviousPath && this._.selectionPreviousPath.blockLimit.equals(b.blockLimit); CKEDITOR.env.webkit && !c && (this._.previousActive = this.document.getActive()); this._.selectionPreviousPath = b; this.fire('selectionChange',
          { selection: a, path: b })
      }
    } function d () { x = !0; q || (b.call(this), q = CKEDITOR.tools.setTimeout(b, 200, this)) } function b () { q = null; x && (CKEDITOR.tools.setTimeout(a, 0, this), x = !1) } function c (a) { return J(a) || a.type == CKEDITOR.NODE_ELEMENT && !a.is(CKEDITOR.dtd.$empty) ? !0 : !1 } function e (a) {
      function b (c, d) { return c && c.type != CKEDITOR.NODE_TEXT ? a.clone()['moveToElementEdit' + (d ? 'End' : 'Start')](c) : !1 } if (!(a.root instanceof CKEDITOR.editable)) return !1; const d = a.startContainer; const e = a.getPreviousNode(c, null, d); const f = a.getNextNode(c, null,
        d); return b(e) || b(f, 1) || !(e || f || d.type == CKEDITOR.NODE_ELEMENT && d.isBlockBoundary() && d.getBogus()) ? !0 : !1
    } function g (a) { h(a, !1); const b = a.getDocument().createText(A); a.setCustomData('cke-fillingChar', b); return b } function h (a, b) {
      let c = a && a.removeCustomData('cke-fillingChar'); if (c) {
        if (!1 !== b) {
          var d = a.getDocument().getSelection().getNative(); const e = d && d.type != 'None' && d.getRangeAt(0); const f = A.length; if (c.getLength() > f && e && e.intersectsNode(c.$)) {
            var g = [{ node: d.anchorNode, offset: d.anchorOffset }, { node: d.focusNode, offset: d.focusOffset }]
            d.anchorNode == c.$ && d.anchorOffset > f && (g[0].offset -= f); d.focusNode == c.$ && d.focusOffset > f && (g[1].offset -= f)
          }
        }c.setText(l(c.getText(), 1)); g && (c = a.getDocument().$, d = c.getSelection(), c = c.createRange(), c.setStart(g[0].node, g[0].offset), c.collapse(!0), d.removeAllRanges(), d.addRange(c), d.extend(g[1].node, g[1].offset))
      }
    } function l (a, b) { return b ? a.replace(y, function (a, b) { return b ? ' ' : '' }) : a.replace(A, '') } function m (a, b) {
      const c = CKEDITOR.dom.element.createFromHtml('\x3cdiv data-cke-hidden-sel\x3d"1" data-cke-temp\x3d"1" style\x3d"' +
(CKEDITOR.env.ie && CKEDITOR.env.version < 14 ? 'display:none' : 'position:fixed;top:0;left:-1000px') + '"\x3e' + (b || '\x26nbsp;') + '\x3c/div\x3e', a.document); a.fire('lockSnapshot'); a.editable().append(c); const d = a.getSelection(1); const e = a.createRange(); const f = d.root.on('selectionchange', function (a) { a.cancel() }, null, null, 0); e.setStartAt(c, CKEDITOR.POSITION_AFTER_START); e.setEndAt(c, CKEDITOR.POSITION_BEFORE_END); d.selectRanges([e]); f.removeListener(); a.fire('unlockSnapshot'); a._.hiddenSelectionContainer = c
    } function r (a) {
      const b =
{ 37: 1, 39: 1, 8: 1, 46: 1 }; return function (c) { let d = c.data.getKeystroke(); if (b[d]) { const e = a.getSelection().getRanges(); const f = e[0]; e.length == 1 && f.collapsed && (d = f[d < 38 ? 'getPreviousEditableNode' : 'getNextEditableNode']()) && d.type == CKEDITOR.NODE_ELEMENT && d.getAttribute('contenteditable') == 'false' && (a.getSelection().fake(d), c.data.preventDefault(), c.cancel()) } }
    } function f (a) {
      for (var b = 0; b < a.length; b++) {
        var c = a[b]; c.getCommonAncestor().isReadOnly() && a.splice(b, 1); if (!c.collapsed) {
          if (c.startContainer.isReadOnly()) {
            for (var d =
c.startContainer, e; d && !((e = d.type == CKEDITOR.NODE_ELEMENT) && d.is('body') || !d.isReadOnly());)e && d.getAttribute('contentEditable') == 'false' && c.setStartAfter(d), d = d.getParent()
          } d = c.startContainer; e = c.endContainer; const f = c.startOffset; const g = c.endOffset; var h = c.clone(); d && d.type == CKEDITOR.NODE_TEXT && (f >= d.getLength() ? h.setStartAfter(d) : h.setStartBefore(d)); e && e.type == CKEDITOR.NODE_TEXT && (g ? h.setEndAfter(e) : h.setEndBefore(e)); d = new CKEDITOR.dom.walker(h); d.evaluator = function (d) {
            if (d.type == CKEDITOR.NODE_ELEMENT &&
d.isReadOnly()) { const e = c.clone(); c.setEndBefore(d); c.collapsed && a.splice(b--, 1); d.getPosition(h.endContainer) & CKEDITOR.POSITION_CONTAINS || (e.setStartAfter(d), e.collapsed || a.splice(b + 1, 0, e)); return !0 } return !1
          }; d.next()
        }
      } return a
    } const C = typeof window.getSelection !== 'function'; let u = 1; var A = CKEDITOR.tools.repeat('​', 7); var y = new RegExp(A + '( )?', 'g'); let q; let x; var J = CKEDITOR.dom.walker.invisible(1); const w = (function () {
      function a (b) {
        return function (a) {
          const c = a.editor.createRange(); c.moveToClosestEditablePosition(a.selected, b) && a.editor.getSelection().selectRanges([c])
          return !1
        }
      } function b (a) { return function (b) { const c = b.editor; const d = c.createRange(); let e; (e = d.moveToClosestEditablePosition(b.selected, a)) || (e = d.moveToClosestEditablePosition(b.selected, !a)); e && c.getSelection().selectRanges([d]); c.fire('saveSnapshot'); b.selected.remove(); e || (d.moveToElementEditablePosition(c.editable()), c.getSelection().selectRanges([d])); c.fire('saveSnapshot'); return !1 } } const c = a(); const d = a(1); return { 37: c, 38: c, 39: d, 40: d, 8: b(), 46: b(1) }
    }()); CKEDITOR.on('instanceCreated', function (b) {
      function c () {
        const a =
e.getSelection(); a && a.removeAllRanges()
      } var e = b.editor; e.on('contentDom', function () {
        function b () { v = new CKEDITOR.dom.selection(e.getSelection()); v.lock() } function c () { k.removeListener('mouseup', c); l.removeListener('mouseup', c); const a = CKEDITOR.document.$.selection; const b = a.createRange(); a.type != 'None' && b.parentElement().ownerDocument == f.$ && b.select() } var f = e.document; var k = CKEDITOR.document; const g = e.editable(); const p = f.getBody(); var l = f.getDocumentElement(); const m = g.isInline(); let q; let v; CKEDITOR.env.gecko && g.attachListener(g, 'focus',
          function (a) { a.removeListener(); q !== 0 && (a = e.getSelection().getNative()) && a.isCollapsed && a.anchorNode == g.$ && (a = e.createRange(), a.moveToElementEditStart(g), a.select()) }, null, null, -2); g.attachListener(g, CKEDITOR.env.webkit ? 'DOMFocusIn' : 'focus', function () { q && CKEDITOR.env.webkit && (q = e._.previousActive && e._.previousActive.equals(f.getActive())) && e._.previousScrollTop != null && e._.previousScrollTop != g.$.scrollTop && (g.$.scrollTop = e._.previousScrollTop); e.unlockSelection(q); q = 0 }, null, null, -1); g.attachListener(g,
          'mousedown', function () { q = 0 }); if (CKEDITOR.env.ie || m)C ? g.attachListener(g, 'beforedeactivate', b, null, null, -1) : g.attachListener(e, 'selectionCheck', b, null, null, -1), g.attachListener(g, CKEDITOR.env.webkit ? 'DOMFocusOut' : 'blur', function () { e.lockSelection(v); q = 1 }, null, null, -1), g.attachListener(g, 'mousedown', function () { q = 0 }); if (CKEDITOR.env.ie && !m) {
          let G; g.attachListener(g, 'mousedown', function (a) { a.data.$.button == 2 && ((a = e.document.getSelection()) && a.getType() != CKEDITOR.SELECTION_NONE || (G = e.window.getScrollPosition())) })
          g.attachListener(g, 'mouseup', function (a) { a.data.$.button == 2 && G && (e.document.$.documentElement.scrollLeft = G.x, e.document.$.documentElement.scrollTop = G.y); G = null }); if (f.$.compatMode != 'BackCompat') {
            if (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) {
              let D, I; l.on('mousedown', function (a) {
                function b (a) { a = a.data.$; if (D) { const c = p.$.createTextRange(); try { c.moveToPoint(a.clientX, a.clientY) } catch (d) {}D.setEndPoint(I.compareEndPoints('StartToStart', c) < 0 ? 'EndToEnd' : 'StartToStart', c); D.select() } } function c () {
                  l.removeListener('mousemove',
                    b); k.removeListener('mouseup', c); l.removeListener('mouseup', c); D.select()
                }a = a.data; if (a.getTarget().is('html') && a.$.y < l.$.clientHeight && a.$.x < l.$.clientWidth) { D = p.$.createTextRange(); try { D.moveToPoint(a.$.clientX, a.$.clientY) } catch (d) {}I = D.duplicate(); l.on('mousemove', b); k.on('mouseup', c); l.on('mouseup', c) }
              })
            } if (CKEDITOR.env.version > 7 && CKEDITOR.env.version < 11)l.on('mousedown', function (a) { a.data.getTarget().is('html') && (k.on('mouseup', c), l.on('mouseup', c)) })
          }
        }g.attachListener(g, 'selectionchange', a,
          e); g.attachListener(g, 'keyup', d, e); g.attachListener(g, CKEDITOR.env.webkit ? 'DOMFocusIn' : 'focus', function () { e.forceNextSelectionCheck(); e.selectionChange(1) }); if (m && (CKEDITOR.env.webkit || CKEDITOR.env.gecko)) { let K; g.attachListener(g, 'mousedown', function () { K = 1 }); g.attachListener(f.getDocumentElement(), 'mouseup', function () { K && d.call(e); K = 0 }) } else g.attachListener(CKEDITOR.env.ie ? g : f.getDocumentElement(), 'mouseup', d, e); CKEDITOR.env.webkit && g.attachListener(f, 'keydown', function (a) { switch (a.data.getKey()) { case 13:case 33:case 34:case 35:case 36:case 37:case 39:case 8:case 45:case 46:h(g) } },
          null, null, -1); g.attachListener(g, 'keydown', r(e), null, null, -1)
      }); e.on('setData', function () { e.unlockSelection(); CKEDITOR.env.webkit && c() }); e.on('contentDomUnload', function () { e.unlockSelection() }); if (CKEDITOR.env.ie9Compat)e.on('beforeDestroy', c, null, null, 9); e.on('dataReady', function () { delete e._.fakeSelection; delete e._.hiddenSelectionContainer; e.selectionChange(1) }); e.on('loadSnapshot', function () {
        let a = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT); const b = e.editable().getLast(a); b && b.hasAttribute('data-cke-hidden-sel') &&
(b.remove(), CKEDITOR.env.gecko && (a = e.editable().getFirst(a)) && a.is('br') && a.getAttribute('_moz_editor_bogus_node') && a.remove())
      }, null, null, 100); e.on('key', function (a) { if (e.mode == 'wysiwyg') { const b = e.getSelection(); if (b.isFake) { const c = w[a.data.keyCode]; if (c) return c({ editor: e, selected: b.getSelectedElement(), selection: b, keyEvent: a }) } } })
    }); if (CKEDITOR.env.webkit) {
      CKEDITOR.on('instanceReady', function (a) {
        const b = a.editor; b.on('selectionChange', function () {
          const a = b.editable(); const c = a.getCustomData('cke-fillingChar')
          c && (c.getCustomData('ready') ? h(a) : c.setCustomData('ready', 1))
        }, null, null, -1); b.on('beforeSetMode', function () { h(b.editable()) }, null, null, -1); b.on('getSnapshot', function (a) { a.data && (a.data = l(a.data)) }, b, null, 20); b.on('toDataFormat', function (a) { a.data.dataValue = l(a.data.dataValue) }, null, null, 0)
      })
    }CKEDITOR.editor.prototype.selectionChange = function (b) { (b ? a : d).call(this) }; CKEDITOR.editor.prototype.getSelection = function (a) {
      return !this._.savedSelection && !this._.fakeSelection || a
        ? (a = this.editable()) && this.mode ==
'wysiwyg'
            ? new CKEDITOR.dom.selection(a)
            : null
        : this._.savedSelection || this._.fakeSelection
    }; CKEDITOR.editor.prototype.lockSelection = function (a) { a = a || this.getSelection(1); return a.getType() != CKEDITOR.SELECTION_NONE ? (!a.isLocked && a.lock(), this._.savedSelection = a, !0) : !1 }; CKEDITOR.editor.prototype.unlockSelection = function (a) { const b = this._.savedSelection; return b ? (b.unlock(a), delete this._.savedSelection, !0) : !1 }; CKEDITOR.editor.prototype.forceNextSelectionCheck = function () { delete this._.selectionPreviousPath }
    CKEDITOR.dom.document.prototype.getSelection = function () { return new CKEDITOR.dom.selection(this) }; CKEDITOR.dom.range.prototype.select = function () { const a = this.root instanceof CKEDITOR.editable ? this.root.editor.getSelection() : new CKEDITOR.dom.selection(this.root); a.selectRanges([this]); return a }; CKEDITOR.SELECTION_NONE = 1; CKEDITOR.SELECTION_TEXT = 2; CKEDITOR.SELECTION_ELEMENT = 3; CKEDITOR.dom.selection = function (a) {
      if (a instanceof CKEDITOR.dom.selection) { var b = a; a = a.root } const c = a instanceof CKEDITOR.dom.element
      this.rev = b ? b.rev : u++; this.document = a instanceof CKEDITOR.dom.document ? a : a.getDocument(); this.root = c ? a : this.document.getBody(); this.isLocked = 0; this._ = { cache: {} }; if (b) return CKEDITOR.tools.extend(this._.cache, b._.cache), this.isFake = b.isFake, this.isLocked = b.isLocked, this; a = this.getNative(); let d, e; if (a) if (a.getRangeAt)d = (e = a.rangeCount && a.getRangeAt(0)) && new CKEDITOR.dom.node(e.commonAncestorContainer); else { try { e = a.createRange() } catch (f) {}d = e && CKEDITOR.dom.element.get(e.item && e.item(0) || e.parentElement()) } if (!d ||
d.type != CKEDITOR.NODE_ELEMENT && d.type != CKEDITOR.NODE_TEXT || !this.root.equals(d) && !this.root.contains(d)) this._.cache.type = CKEDITOR.SELECTION_NONE, this._.cache.startElement = null, this._.cache.selectedElement = null, this._.cache.selectedText = '', this._.cache.ranges = new CKEDITOR.dom.rangeList(); return this
    }; const E = { img: 1, hr: 1, li: 1, table: 1, tr: 1, td: 1, th: 1, embed: 1, object: 1, ol: 1, ul: 1, a: 1, input: 1, form: 1, select: 1, textarea: 1, button: 1, fieldset: 1, thead: 1, tfoot: 1 }; CKEDITOR.tools.extend(CKEDITOR.dom.selection, {
      _removeFillingCharSequenceString: l,
      _createFillingCharSequenceNode: g,
      FILLING_CHAR_SEQUENCE: A
    }); CKEDITOR.dom.selection.prototype = {
      getNative: function () { return void 0 !== this._.cache.nativeSel ? this._.cache.nativeSel : this._.cache.nativeSel = C ? this.document.$.selection : this.document.getWindow().$.getSelection() },
      getType: C
        ? function () {
          const a = this._.cache; if (a.type) return a.type; let b = CKEDITOR.SELECTION_NONE; try {
            const c = this.getNative(); const d = c.type; d == 'Text' && (b = CKEDITOR.SELECTION_TEXT); d == 'Control' && (b = CKEDITOR.SELECTION_ELEMENT); c.createRange().parentElement() &&
(b = CKEDITOR.SELECTION_TEXT)
          } catch (e) {} return a.type = b
        }
        : function () { const a = this._.cache; if (a.type) return a.type; let b = CKEDITOR.SELECTION_TEXT; var c = this.getNative(); if (!c || !c.rangeCount)b = CKEDITOR.SELECTION_NONE; else if (c.rangeCount == 1) { var c = c.getRangeAt(0); const d = c.startContainer; d == c.endContainer && d.nodeType == 1 && c.endOffset - c.startOffset == 1 && E[d.childNodes[c.startOffset].nodeName.toLowerCase()] && (b = CKEDITOR.SELECTION_ELEMENT) } return a.type = b },
      getRanges: (function () {
        const a = C
          ? (function () {
              function a (b) { return (new CKEDITOR.dom.node(b)).getIndex() }
              const b = function (b, c) {
                b = b.duplicate(); b.collapse(c); let d = b.parentElement(); if (!d.hasChildNodes()) return { container: d, offset: 0 }; for (var e = d.children, f, k, g = b.duplicate(), h = 0, l = e.length - 1, v = -1, n, m; h <= l;) if (v = Math.floor((h + l) / 2), f = e[v], g.moveToElementText(f), n = g.compareEndPoints('StartToStart', b), n > 0)l = v - 1; else if (n < 0)h = v + 1; else return { container: d, offset: a(f) }; if (v == -1 || v == e.length - 1 && n < 0) {
                  g.moveToElementText(d); g.setEndPoint('StartToStart', b); g = g.text.replace(/(\r\n|\r)/g, '\n').length; e = d.childNodes; if (!g) {
                    return f =
e[e.length - 1], f.nodeType != CKEDITOR.NODE_TEXT ? { container: d, offset: e.length } : { container: f, offset: f.nodeValue.length }
                  } for (d = e.length; g > 0 && d > 0;)k = e[--d], k.nodeType == CKEDITOR.NODE_TEXT && (m = k, g -= k.nodeValue.length); return { container: m, offset: -g }
                }g.collapse(n > 0 ? !0 : !1); g.setEndPoint(n > 0 ? 'StartToStart' : 'EndToStart', b); g = g.text.replace(/(\r\n|\r)/g, '\n').length; if (!g) return { container: d, offset: a(f) + (n > 0 ? 0 : 1) }; for (;g > 0;) {
                  try {
                    k = f[n > 0 ? 'previousSibling' : 'nextSibling'], k.nodeType == CKEDITOR.NODE_TEXT && (g -= k.nodeValue.length,
                    m = k), f = k
                  } catch (q) { return { container: d, offset: a(f) } }
                } return { container: m, offset: n > 0 ? -g : m.nodeValue.length + g }
              }; return function () {
                var a = this.getNative(); const c = a && a.createRange(); var d = this.getType(); if (!a) return []; if (d == CKEDITOR.SELECTION_TEXT) {
                  return a = new CKEDITOR.dom.range(this.root), d = b(c, !0), a.setStart(new CKEDITOR.dom.node(d.container), d.offset), d = b(c), a.setEnd(new CKEDITOR.dom.node(d.container), d.offset), a.endContainer.getPosition(a.startContainer) & CKEDITOR.POSITION_PRECEDING && a.endOffset <= a.startContainer.getIndex() &&
a.collapse(), [a]
                } if (d == CKEDITOR.SELECTION_ELEMENT) { for (var d = [], e = 0; e < c.length; e++) { for (var f = c.item(e), g = f.parentNode, k = 0, a = new CKEDITOR.dom.range(this.root); k < g.childNodes.length && g.childNodes[k] != f; k++);a.setStart(new CKEDITOR.dom.node(g), k); a.setEnd(new CKEDITOR.dom.node(g), k + 1); d.push(a) } return d } return []
              }
            }())
          : function () {
            const a = []; let b; const c = this.getNative(); if (!c) return a; for (let d = 0; d < c.rangeCount; d++) {
              const e = c.getRangeAt(d); b = new CKEDITOR.dom.range(this.root); b.setStart(new CKEDITOR.dom.node(e.startContainer),
                e.startOffset); b.setEnd(new CKEDITOR.dom.node(e.endContainer), e.endOffset); a.push(b)
            } return a
          }; return function (b) { const c = this._.cache; let d = c.ranges; d || (c.ranges = d = new CKEDITOR.dom.rangeList(a.call(this))); return b ? f(new CKEDITOR.dom.rangeList(d.slice())) : d }
      }()),
      getStartElement: function () {
        const a = this._.cache; if (void 0 !== a.startElement) return a.startElement; let b; switch (this.getType()) {
          case CKEDITOR.SELECTION_ELEMENT:return this.getSelectedElement(); case CKEDITOR.SELECTION_TEXT:var c = this.getRanges()[0]
            if (c) { if (c.collapsed)b = c.startContainer, b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent()); else { for (c.optimize(); b = c.startContainer, c.startOffset == (b.getChildCount ? b.getChildCount() : b.getLength()) && !b.isBlockBoundary();)c.setStartAfter(b); b = c.startContainer; if (b.type != CKEDITOR.NODE_ELEMENT) return b.getParent(); if ((b = b.getChild(c.startOffset)) && b.type == CKEDITOR.NODE_ELEMENT) for (c = b.getFirst(); c && c.type == CKEDITOR.NODE_ELEMENT;)b = c, c = c.getFirst(); else b = c.startContainer }b = b.$ }
        } return a.startElement = b
          ? new CKEDITOR.dom.element(b)
          : null
      },
      getSelectedElement: function () { const a = this._.cache; if (void 0 !== a.selectedElement) return a.selectedElement; const b = this; const c = CKEDITOR.tools.tryThese(function () { return b.getNative().createRange().item(0) }, function () { for (var a = b.getRanges()[0].clone(), c, d, e = 2; e && !((c = a.getEnclosedNode()) && c.type == CKEDITOR.NODE_ELEMENT && E[c.getName()] && (d = c)); e--)a.shrink(CKEDITOR.SHRINK_ELEMENT); return d && d.$ }); return a.selectedElement = c ? new CKEDITOR.dom.element(c) : null },
      getSelectedText: function () {
        const a =
this._.cache; if (void 0 !== a.selectedText) return a.selectedText; var b = this.getNative(); var b = C ? b.type == 'Control' ? '' : b.createRange().text : b.toString(); return a.selectedText = b
      },
      lock: function () { this.getRanges(); this.getStartElement(); this.getSelectedElement(); this.getSelectedText(); this._.cache.nativeSel = null; this.isLocked = 1 },
      unlock: function (a) {
        if (this.isLocked) {
          if (a) var b = this.getSelectedElement(), c = !b && this.getRanges(), d = this.isFake; this.isLocked = 0; this.reset(); a && (a = b || c[0] && c[0].getCommonAncestor()) &&
a.getAscendant('body', 1) && (d ? this.fake(b) : b ? this.selectElement(b) : this.selectRanges(c))
        }
      },
      reset: function () { this._.cache = {}; this.isFake = 0; const a = this.root.editor; if (a && a._.fakeSelection) if (this.rev == a._.fakeSelection.rev) { delete a._.fakeSelection; const b = a._.hiddenSelectionContainer; if (b) { const c = a.checkDirty(); a.fire('lockSnapshot'); b.remove(); a.fire('unlockSnapshot'); !c && a.resetDirty() } delete a._.hiddenSelectionContainer } else CKEDITOR.warn('selection-fake-reset'); this.rev = u++ },
      selectElement: function (a) {
        const b =
new CKEDITOR.dom.range(this.root); b.setStartBefore(a); b.setEndAfter(a); this.selectRanges([b])
      },
      selectRanges: function (a) {
        var b = this.root.editor; var b = b && b._.hiddenSelectionContainer; this.reset(); if (b) for (var b = this.root, c, d = 0; d < a.length; ++d)c = a[d], c.endContainer.equals(b) && (c.endOffset = Math.min(c.endOffset, b.getChildCount())); if (a.length) {
          if (this.isLocked) { var f = CKEDITOR.document.getActive(); this.unlock(); this.selectRanges(a); this.lock(); f && !f.equals(this.root) && f.focus() } else {
            let l; a: {
              var m, q; if (a.length == 1 &&
!(q = a[0]).collapsed && (l = q.getEnclosedNode()) && l.type == CKEDITOR.NODE_ELEMENT && (q = q.clone(), q.shrink(CKEDITOR.SHRINK_ELEMENT, !0), (m = q.getEnclosedNode()) && m.type == CKEDITOR.NODE_ELEMENT && (l = m), l.getAttribute('contenteditable') == 'false')) break a; l = void 0
            } if (l) this.fake(l); else {
              if (C) {
                q = CKEDITOR.dom.walker.whitespaces(!0); m = /\ufeff|\u00a0/; b = { table: 1, tbody: 1, tr: 1 }; a.length > 1 && (l = a[a.length - 1], a[0].setEnd(l.endContainer, l.endOffset)); l = a[0]; a = l.collapsed; var r, u, y; if ((c = l.getEnclosedNode()) && c.type == CKEDITOR.NODE_ELEMENT &&
c.getName() in E && (!c.is('a') || !c.getText())) try { y = c.$.createControlRange(); y.addElement(c.$); y.select(); return } catch (w) {} if (l.startContainer.type == CKEDITOR.NODE_ELEMENT && l.startContainer.getName() in b || l.endContainer.type == CKEDITOR.NODE_ELEMENT && l.endContainer.getName() in b)l.shrink(CKEDITOR.NODE_ELEMENT, !0), a = l.collapsed; y = l.createBookmark(); b = y.startNode; a || (f = y.endNode); y = l.document.$.body.createTextRange(); y.moveToElementText(b.$); y.moveStart('character', 1); f
                  ? (m = l.document.$.body.createTextRange(),
                    m.moveToElementText(f.$), y.setEndPoint('EndToEnd', m), y.moveEnd('character', -1))
                  : (r = b.getNext(q), u = b.hasAscendant('pre'), r = !(r && r.getText && r.getText().match(m)) && (u || !b.hasPrevious() || b.getPrevious().is && b.getPrevious().is('br')), u = l.document.createElement('span'), u.setHtml('\x26#65279;'), u.insertBefore(b), r && l.document.createText('﻿').insertBefore(b)); l.setStartBefore(b); b.remove(); a
                  ? (r ? (y.moveStart('character', -1), y.select(), l.document.$.selection.clear()) : y.select(), l.moveToPosition(u, CKEDITOR.POSITION_BEFORE_START),
                    u.remove())
                  : (l.setEndBefore(f), f.remove(), y.select())
              } else {
                f = this.getNative(); if (!f) return; this.removeAllRanges(); for (y = 0; y < a.length; y++) {
                  if (y < a.length - 1 && (r = a[y], u = a[y + 1], m = r.clone(), m.setStart(r.endContainer, r.endOffset), m.setEnd(u.startContainer, u.startOffset), !m.collapsed && (m.shrink(CKEDITOR.NODE_ELEMENT, !0), l = m.getCommonAncestor(), m = m.getEnclosedNode(), l.isReadOnly() || m && m.isReadOnly()))) { u.setStart(r.startContainer, r.startOffset); a.splice(y--, 1); continue }l = a[y]; u = this.document.$.createRange()
                  l.collapsed && CKEDITOR.env.webkit && e(l) && (m = g(this.root), l.insertNode(m), (r = m.getNext()) && !m.getPrevious() && r.type == CKEDITOR.NODE_ELEMENT && r.getName() == 'br' ? (h(this.root), l.moveToPosition(r, CKEDITOR.POSITION_BEFORE_START)) : l.moveToPosition(m, CKEDITOR.POSITION_AFTER_END)); u.setStart(l.startContainer.$, l.startOffset); try { u.setEnd(l.endContainer.$, l.endOffset) } catch (v) { if (v.toString().indexOf('NS_ERROR_ILLEGAL_VALUE') >= 0)l.collapse(1), u.setEnd(l.endContainer.$, l.endOffset); else throw v }f.addRange(u)
                }
              } this.reset()
              this.root.fire('selectionchange')
            }
          }
        }
      },
      fake: function (a, b) { const c = this.root.editor; void 0 === b && a.hasAttribute('aria-label') && (b = a.getAttribute('aria-label')); this.reset(); m(c, b); const d = this._.cache; const e = new CKEDITOR.dom.range(this.root); e.setStartBefore(a); e.setEndAfter(a); d.ranges = new CKEDITOR.dom.rangeList(e); d.selectedElement = d.startElement = a; d.type = CKEDITOR.SELECTION_ELEMENT; d.selectedText = d.nativeSel = null; this.isFake = 1; this.rev = u++; c._.fakeSelection = this; this.root.fire('selectionchange') },
      isHidden: function () {
        let a =
this.getCommonAncestor(); a && a.type == CKEDITOR.NODE_TEXT && (a = a.getParent()); return !(!a || !a.data('cke-hidden-sel'))
      },
      createBookmarks: function (a) { a = this.getRanges().createBookmarks(a); this.isFake && (a.isFake = 1); return a },
      createBookmarks2: function (a) { a = this.getRanges().createBookmarks2(a); this.isFake && (a.isFake = 1); return a },
      selectBookmarks: function (a) {
        for (var b = [], c, d = 0; d < a.length; d++) { const e = new CKEDITOR.dom.range(this.root); e.moveToBookmark(a[d]); b.push(e) }a.isFake && (c = b[0].getEnclosedNode(), c && c.type ==
CKEDITOR.NODE_ELEMENT || (CKEDITOR.warn('selection-not-fake'), a.isFake = 0)); a.isFake ? this.fake(c) : this.selectRanges(b); return this
      },
      getCommonAncestor: function () { const a = this.getRanges(); return a.length ? a[0].startContainer.getCommonAncestor(a[a.length - 1].endContainer) : null },
      scrollIntoView: function () { this.type != CKEDITOR.SELECTION_NONE && this.getRanges()[0].scrollIntoView() },
      removeAllRanges: function () { if (this.getType() != CKEDITOR.SELECTION_NONE) { const a = this.getNative(); try { a && a[C ? 'empty' : 'removeAllRanges']() } catch (b) {} this.reset() } }
    }
  })()
  'use strict'; CKEDITOR.STYLE_BLOCK = 1; CKEDITOR.STYLE_INLINE = 2; CKEDITOR.STYLE_OBJECT = 3;
  (function () {
    function a (a, b) { for (var c, d; (a = a.getParent()) && !a.equals(b);) if (a.getAttribute('data-nostyle'))c = a; else if (!d) { const e = a.getAttribute('contentEditable'); e == 'false' ? c = a : e == 'true' && (d = 1) } return c } function d (a, b, c, d) { return (a.getPosition(b) | d) == d && (!c.childRule || c.childRule(a)) } function b (c) {
      let f = c.document; if (c.collapsed)f = J(this, f), c.insertNode(f), c.moveToPosition(f, CKEDITOR.POSITION_BEFORE_END); else {
        const g = this.element; const k = this._.definition; let l; var h = k.ignoreReadonly; let m = h || k.includeReadonly; m ==
null && (m = c.root.getCustomData('cke_includeReadonly')); let n = CKEDITOR.dtd[g]; n || (l = !0, n = CKEDITOR.dtd.span); c.enlarge(CKEDITOR.ENLARGE_INLINE, 1); c.trim(); const q = c.createBookmark(); const p = q.startNode; let r = q.endNode; let u = p; let t; if (!h) { var w = c.getCommonAncestor(); var h = a(p, w); var w = a(r, w); h && (u = h.getNextSourceNode(!0)); w && (r = w) } for (u.getPosition(r) == CKEDITOR.POSITION_FOLLOWING && (u = 0); u;) {
          h = !1; if (u.equals(r))u = null, h = !0; else {
            var A = u.type == CKEDITOR.NODE_ELEMENT ? u.getName() : null; var w = A && u.getAttribute('contentEditable') == 'false'; var x = A &&
u.getAttribute('data-nostyle'); if (A && u.data('cke-bookmark')) { u = u.getNextSourceNode(!0); continue } if (w && m && CKEDITOR.dtd.$block[A]) for (var C = u, z = e(C), B = void 0, E = z.length, F = 0, C = E && new CKEDITOR.dom.range(C.getDocument()); F < E; ++F) { var B = z[F]; const L = CKEDITOR.filter.instances[B.data('cke-filter')]; if (L ? L.check(this) : 1)C.selectNodeContents(B), b.call(this, C) }z = A ? !n[A] || x ? 0 : w && !m ? 0 : d(u, r, k, Q) : 1; if (z) {
              if (B = u.getParent(), z = k, E = g, F = l, !B || !(B.getDtd() || CKEDITOR.dtd.span)[E] && !F || z.parentRule && !z.parentRule(B))h = !0; else {
                if (t ||
A && CKEDITOR.dtd.$removeEmpty[A] && (u.getPosition(r) | Q) != Q || (t = c.clone(), t.setStartBefore(u)), A = u.type, A == CKEDITOR.NODE_TEXT || w || A == CKEDITOR.NODE_ELEMENT && !u.getChildCount()) { for (var A = u, R; (h = !A.getNext(H)) && (R = A.getParent(), n[R.getName()]) && d(R, p, k, P);)A = R; t.setEndAfter(A) }
              }
            } else h = !0; u = u.getNextSourceNode(x || w)
          } if (h && t && !t.collapsed) {
            for (var h = J(this, f), w = h.hasAttributes(), x = t.getCommonAncestor(), A = {}, z = {}, B = {}, E = {}, W, T, ca; h && x;) {
              if (x.getName() == g) {
                for (W in k.attributes) {
                  !E[W] && (ca = x.getAttribute(T)) &&
(h.getAttribute(W) == ca ? z[W] = 1 : E[W] = 1)
                } for (T in k.styles)!B[T] && (ca = x.getStyle(T)) && (h.getStyle(T) == ca ? A[T] = 1 : B[T] = 1)
              }x = x.getParent()
            } for (W in z)h.removeAttribute(W); for (T in A)h.removeStyle(T); w && !h.hasAttributes() && (h = null); h ? (t.extractContents().appendTo(h), t.insertNode(h), y.call(this, h), h.mergeSiblings(), CKEDITOR.env.ie || h.$.normalize()) : (h = new CKEDITOR.dom.element('span'), t.extractContents().appendTo(h), t.insertNode(h), y.call(this, h), h.remove(!0)); t = null
          }
        }c.moveToBookmark(q); c.shrink(CKEDITOR.SHRINK_TEXT)
        c.shrink(CKEDITOR.NODE_ELEMENT, !0)
      }
    } function c (a) {
      function b () { for (var a = new CKEDITOR.dom.elementPath(d.getParent()), c = new CKEDITOR.dom.elementPath(m.getParent()), e = null, f = null, g = 0; g < a.elements.length; g++) { var h = a.elements[g]; if (h == a.block || h == a.blockLimit) break; n.checkElementRemovable(h, !0) && (e = h) } for (g = 0; g < c.elements.length; g++) { h = c.elements[g]; if (h == c.block || h == c.blockLimit) break; n.checkElementRemovable(h, !0) && (f = h) }f && m.breakParent(f); e && d.breakParent(e) }a.enlarge(CKEDITOR.ENLARGE_INLINE, 1); const c =
a.createBookmark(); var d = c.startNode; if (a.collapsed) {
        for (var e = new CKEDITOR.dom.elementPath(d.getParent(), a.root), f, g = 0, h; g < e.elements.length && (h = e.elements[g]) && h != e.block && h != e.blockLimit; g++) if (this.checkElementRemovable(h)) { var l; a.collapsed && (a.checkBoundaryOfElement(h, CKEDITOR.END) || (l = a.checkBoundaryOfElement(h, CKEDITOR.START))) ? (f = h, f.match = l ? 'start' : 'end') : (h.mergeSiblings(), h.is(this.element) ? A.call(this, h) : q(h, k(this)[h.getName()])) } if (f) {
          h = d; for (g = 0; ;g++) {
            l = e.elements[g]; if (l.equals(f)) break
            else if (l.match) continue; else l = l.clone(); l.append(h); h = l
          }h[f.match == 'start' ? 'insertBefore' : 'insertAfter'](f)
        }
      } else { var m = c.endNode; var n = this; b(); for (e = d; !e.equals(m);)f = e.getNextSourceNode(), e.type == CKEDITOR.NODE_ELEMENT && this.checkElementRemovable(e) && (e.getName() == this.element ? A.call(this, e) : q(e, k(this)[e.getName()]), f.type == CKEDITOR.NODE_ELEMENT && f.contains(d) && (b(), f = d.getNext())), e = f }a.moveToBookmark(c); a.shrink(CKEDITOR.NODE_ELEMENT, !0)
    } function e (a) {
      const b = []; a.forEach(function (a) {
        if (a.getAttribute('contenteditable') ==
'true') return b.push(a), !1
      }, CKEDITOR.NODE_ELEMENT, !0); return b
    } function g (a) { const b = a.getEnclosedNode() || a.getCommonAncestor(!1, !0); (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) && !a.isReadOnly() && w(a, this) } function h (a) {
      var b = a.getCommonAncestor(!0, !0); if (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) {
        var b = this._.definition; const c = b.attributes; if (c) for (const d in c)a.removeAttribute(d, c[d]); if (b.styles) {
          for (const e in b.styles) {
            b.styles.hasOwnProperty(e) &&
a.removeStyle(e)
          }
        }
      }
    } function l (a) { const b = a.createBookmark(!0); const c = a.createIterator(); c.enforceRealBlocks = !0; this._.enterMode && (c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR); for (var d, e = a.document, f; d = c.getNextParagraph();)!d.isReadOnly() && (c.activeFilter ? c.activeFilter.check(this) : 1) && (f = J(this, e, d), r(d, f)); a.moveToBookmark(b) } function m (a) {
      const b = a.createBookmark(1); const c = a.createIterator(); c.enforceRealBlocks = !0; c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR; for (var d, e; d = c.getNextParagraph();) {
        this.checkElementRemovable(d) &&
(d.is('pre') ? ((e = this._.enterMode == CKEDITOR.ENTER_BR ? null : a.document.createElement(this._.enterMode == CKEDITOR.ENTER_P ? 'p' : 'div')) && d.copyAttributes(e), r(d, e)) : A.call(this, d))
      } a.moveToBookmark(b)
    } function r (a, b) {
      var c = !b; c && (b = a.getDocument().createElement('div'), a.copyAttributes(b)); let d = b && b.is('pre'); let e = a.is('pre'); let g = !d && e; if (d && !e) {
        e = b; (g = a.getBogus()) && g.remove(); g = a.getHtml(); g = C(g, /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, ''); g = g.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi, '$1'); g = g.replace(/([ \t\n\r]+|&nbsp;)/g,
          ' '); g = g.replace(/<br\b[^>]*>/gi, '\n'); if (CKEDITOR.env.ie) { const h = a.getDocument().createElement('div'); h.append(e); e.$.outerHTML = '\x3cpre\x3e' + g + '\x3c/pre\x3e'; e.copyAttributes(h.getFirst()); e = h.getFirst().remove() } else e.setHtml(g); b = e
      } else g ? b = u(c ? [a.getHtml()] : f(a), b) : a.moveChildren(b); b.replace(a); if (d) {
        var c = b; let k; (k = c.getPrevious(R)) && k.type == CKEDITOR.NODE_ELEMENT && k.is('pre') && (d = C(k.getHtml(), /\n$/, '') + '\n\n' + C(c.getHtml(), /^\n/, ''), CKEDITOR.env.ie
          ? c.$.outerHTML = '\x3cpre\x3e' + d + '\x3c/pre\x3e'
          : c.setHtml(d), k.remove())
      } else c && x(b)
    } function f (a) { const b = []; C(a.getOuterHtml(), /(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi, function (a, b, c) { return b + '\x3c/pre\x3e' + c + '\x3cpre\x3e' }).replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi, function (a, c) { b.push(c) }); return b } function C (a, b, c) { let d = ''; let e = ''; a = a.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi, function (a, b, c) { b && (d = b); c && (e = c); return '' }); return d + a.replace(b, c) + e } function u (a, b) {
      let c
      a.length > 1 && (c = new CKEDITOR.dom.documentFragment(b.getDocument())); for (let d = 0; d < a.length; d++) {
        var e = a[d]; var e = e.replace(/(\r\n|\r)/g, '\n'); var e = C(e, /^[ \t]*\n/, ''); var e = C(e, /\n$/, ''); var e = C(e, /^[ \t]+|[ \t]+$/g, function (a, b) { return a.length == 1 ? '\x26nbsp;' : b ? ' ' + CKEDITOR.tools.repeat('\x26nbsp;', a.length - 1) : CKEDITOR.tools.repeat('\x26nbsp;', a.length - 1) + ' ' }); var e = e.replace(/\n/g, '\x3cbr\x3e'); var e = e.replace(/[ \t]{2,}/g, function (a) { return CKEDITOR.tools.repeat('\x26nbsp;', a.length - 1) + ' ' }); if (c) {
          const f = b.clone(); f.setHtml(e)
          c.append(f)
        } else b.setHtml(e)
      } return c || b
    } function A (a, b) {
      var c = this._.definition; const d = c.attributes; var c = c.styles; const e = k(this)[a.getName()]; let f = CKEDITOR.tools.isEmpty(d) && CKEDITOR.tools.isEmpty(c); let g; for (g in d) if (g != 'class' && !this._.definition.fullMatch || a.getAttribute(g) == p(g, d[g]))b && g.slice(0, 5) == 'data-' || (f = a.hasAttribute(g), a.removeAttribute(g)); for (const h in c) this._.definition.fullMatch && a.getStyle(h) != p(h, c[h], !0) || (f = f || !!a.getStyle(h), a.removeStyle(h)); q(a, e, z[a.getName()]); f && (this._.definition.alwaysRemoveElement
        ? x(a, 1)
        : !CKEDITOR.dtd.$block[a.getName()] || this._.enterMode == CKEDITOR.ENTER_BR && !a.hasAttributes() ? x(a) : a.renameNode(this._.enterMode == CKEDITOR.ENTER_P ? 'p' : 'div'))
    } function y (a) { for (var b = k(this), c = a.getElementsByTag(this.element), d, e = c.count(); --e >= 0;)d = c.getItem(e), d.isReadOnly() || A.call(this, d, !0); for (const f in b) if (f != this.element) for (c = a.getElementsByTag(f), e = c.count() - 1; e >= 0; e--)d = c.getItem(e), d.isReadOnly() || q(d, b[f]) } function q (a, b, c) {
      if (b = b && b.attributes) {
        for (let d = 0; d < b.length; d++) {
          const e = b[d][0]
          var f; if (f = a.getAttribute(e)) { const g = b[d][1]; (g === null || g.test && g.test(f) || typeof g === 'string' && f == g) && a.removeAttribute(e) }
        }
      }c || x(a)
    } function x (a, b) {
      if (!a.hasAttributes() || b) {
        if (CKEDITOR.dtd.$block[a.getName()]) { var c = a.getPrevious(R); var d = a.getNext(R); !c || c.type != CKEDITOR.NODE_TEXT && c.isBlockBoundary({ br: 1 }) || a.append('br', 1); !d || d.type != CKEDITOR.NODE_TEXT && d.isBlockBoundary({ br: 1 }) || a.append('br'); a.remove(!0) } else {
          c = a.getFirst(), d = a.getLast(), a.remove(!0), c && (c.type == CKEDITOR.NODE_ELEMENT && c.mergeSiblings(),
          d && !c.equals(d) && d.type == CKEDITOR.NODE_ELEMENT && d.mergeSiblings())
        }
      }
    } function J (a, b, c) { let d; d = a.element; d == '*' && (d = 'span'); d = new CKEDITOR.dom.element(d, b); c && c.copyAttributes(d); d = w(d, a); b.getCustomData('doc_processing_style') && d.hasAttribute('id') ? d.removeAttribute('id') : b.setCustomData('doc_processing_style', 1); return d } function w (a, b) { var c = b._.definition; const d = c.attributes; var c = CKEDITOR.style.getStyleText(c); if (d) for (const e in d)a.setAttribute(e, d[e]); c && a.setAttribute('style', c); return a } function E (a,
      b) { for (const c in a)a[c] = a[c].replace(L, function (a, c) { return b[c] }) } function k (a) { if (a._.overrides) return a._.overrides; const b = a._.overrides = {}; let c = a._.definition.overrides; if (c) { CKEDITOR.tools.isArray(c) || (c = [c]); for (let d = 0; d < c.length; d++) { var e = c[d]; var f; var g; typeof e === 'string' ? f = e.toLowerCase() : (f = e.element ? e.element.toLowerCase() : a.element, g = e.attributes); e = b[f] || (b[f] = {}); if (g) { var e = e.attributes = e.attributes || []; var h; for (h in g)e.push([h.toLowerCase(), g[h]]) } } } return b } function p (a, b, c) {
      const d = new CKEDITOR.dom.element('span')
      d[c ? 'setStyle' : 'setAttribute'](a, b); return d[c ? 'getStyle' : 'getAttribute'](a)
    } function n (a, b) { function c (a, b) { return b.toLowerCase() == 'font-family' ? a.replace(/["']/g, '') : a } typeof a === 'string' && (a = CKEDITOR.tools.parseCssText(a)); typeof b === 'string' && (b = CKEDITOR.tools.parseCssText(b, !0)); for (const d in a) if (!(d in b) || c(b[d], d) != c(a[d], d) && a[d] != 'inherit' && b[d] != 'inherit') return !1; return !0 } function t (a, b, c) {
      const d = a.document; const e = a.getRanges(); b = b ? this.removeFromRange : this.applyToRange; for (var f, g = e.createIterator(); f =
g.getNextRange();)b.call(this, f, c); a.selectRanges(e); d.removeCustomData('doc_processing_style')
    } var z = { address: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, p: 1, pre: 1, section: 1, header: 1, footer: 1, nav: 1, article: 1, aside: 1, figure: 1, dialog: 1, hgroup: 1, time: 1, meter: 1, menu: 1, command: 1, keygen: 1, output: 1, progress: 1, details: 1, datagrid: 1, datalist: 1 }; const B = { a: 1, blockquote: 1, embed: 1, hr: 1, img: 1, li: 1, object: 1, ol: 1, table: 1, td: 1, tr: 1, th: 1, ul: 1, dl: 1, dt: 1, dd: 1, form: 1, audio: 1, video: 1 }; const F = /\s*(?:;\s*|$)/; var L = /#\((.+?)\)/g; var H = CKEDITOR.dom.walker.bookmark(0,
      1); var R = CKEDITOR.dom.walker.whitespaces(1); CKEDITOR.style = function (a, b) {
      if (typeof a.type === 'string') return new CKEDITOR.style.customHandlers[a.type](a); let c = a.attributes; c && c.style && (a.styles = CKEDITOR.tools.extend({}, a.styles, CKEDITOR.tools.parseCssText(c.style)), delete c.style); b && (a = CKEDITOR.tools.clone(a), E(a.attributes, b), E(a.styles, b)); c = this.element = a.element ? typeof a.element === 'string' ? a.element.toLowerCase() : a.element : '*'; this.type = a.type || (z[c]
        ? CKEDITOR.STYLE_BLOCK
        : B[c]
          ? CKEDITOR.STYLE_OBJECT
          : CKEDITOR.STYLE_INLINE); typeof this.element === 'object' && (this.type = CKEDITOR.STYLE_OBJECT); this._ = { definition: a }
    }; CKEDITOR.style.prototype = {
      apply: function (a) { if (a instanceof CKEDITOR.dom.document) return t.call(this, a.getSelection()); if (this.checkApplicable(a.elementPath(), a)) { const b = this._.enterMode; b || (this._.enterMode = a.activeEnterMode); t.call(this, a.getSelection(), 0, a); this._.enterMode = b } },
      remove: function (a) {
        if (a instanceof CKEDITOR.dom.document) return t.call(this, a.getSelection(), 1); if (this.checkApplicable(a.elementPath(),
          a)) { const b = this._.enterMode; b || (this._.enterMode = a.activeEnterMode); t.call(this, a.getSelection(), 1, a); this._.enterMode = b }
      },
      applyToRange: function (a) { this.applyToRange = this.type == CKEDITOR.STYLE_INLINE ? b : this.type == CKEDITOR.STYLE_BLOCK ? l : this.type == CKEDITOR.STYLE_OBJECT ? g : null; return this.applyToRange(a) },
      removeFromRange: function (a) { this.removeFromRange = this.type == CKEDITOR.STYLE_INLINE ? c : this.type == CKEDITOR.STYLE_BLOCK ? m : this.type == CKEDITOR.STYLE_OBJECT ? h : null; return this.removeFromRange(a) },
      applyToObject: function (a) {
        w(a,
          this)
      },
      checkActive: function (a, b) { switch (this.type) { case CKEDITOR.STYLE_BLOCK:return this.checkElementRemovable(a.block || a.blockLimit, !0, b); case CKEDITOR.STYLE_OBJECT:case CKEDITOR.STYLE_INLINE:for (var c = a.elements, d = 0, e; d < c.length; d++) if (e = c[d], this.type != CKEDITOR.STYLE_INLINE || e != a.block && e != a.blockLimit) { if (this.type == CKEDITOR.STYLE_OBJECT) { const f = e.getName(); if (!(typeof this.element === 'string' ? f == this.element : f in this.element)) continue } if (this.checkElementRemovable(e, !0, b)) return !0 } } return !1 },
      checkApplicable: function (a,
        b, c) { b && b instanceof CKEDITOR.filter && (c = b); if (c && !c.check(this)) return !1; switch (this.type) { case CKEDITOR.STYLE_OBJECT:return !!a.contains(this.element); case CKEDITOR.STYLE_BLOCK:return !!a.blockLimit.getDtd()[this.element] } return !0 },
      checkElementMatch: function (a, b) {
        let c = this._.definition; if (!a || !c.ignoreReadonly && a.isReadOnly()) return !1; var d = a.getName(); if (typeof this.element === 'string' ? d == this.element : d in this.element) {
          if (!b && !a.hasAttributes()) return !0; if (d = c._AC)c = d; else {
            var d = {}; let e = 0; const f = c.attributes
            if (f) for (var g in f)e++, d[g] = f[g]; if (g = CKEDITOR.style.getStyleText(c))d.style || e++, d.style = g; d._length = e; c = c._AC = d
          } if (c._length) { for (const h in c) if (h != '_length') if (d = a.getAttribute(h) || '', h == 'style' ? n(c[h], d) : c[h] == d) { if (!b) return !0 } else if (b) return !1; if (b) return !0 } else return !0
        } return !1
      },
      checkElementRemovable: function (a, b, c) {
        if (this.checkElementMatch(a, b, c)) return !0; if (b = k(this)[a.getName()]) {
          let d; if (!(b = b.attributes)) return !0; for (c = 0; c < b.length; c++) {
            if (d = b[c][0], d = a.getAttribute(d)) {
              const e = b[c][1]
              if (e === null) return !0; if (typeof e === 'string') { if (d == e) return !0 } else if (e.test(d)) return !0
            }
          }
        } return !1
      },
      buildPreview: function (a) { const b = this._.definition; var c = []; let d = b.element; d == 'bdo' && (d = 'span'); var c = ['\x3c', d]; let e = b.attributes; if (e) for (const f in e)c.push(' ', f, '\x3d"', e[f], '"'); (e = CKEDITOR.style.getStyleText(b)) && c.push(' style\x3d"', e, '"'); c.push('\x3e', a || b.name, '\x3c/', d, '\x3e'); return c.join('') },
      getDefinition: function () { return this._.definition }
    }; CKEDITOR.style.getStyleText = function (a) {
      var b = a._ST; if (b) return b
      var b = a.styles; let c = a.attributes && a.attributes.style || ''; let d = ''; c.length && (c = c.replace(F, ';')); for (const e in b) { const f = b[e]; const g = (e + ':' + f).replace(F, ';'); f == 'inherit' ? d += g : c += g }c.length && (c = CKEDITOR.tools.normalizeCssText(c, !0)); return a._ST = c + d
    }; CKEDITOR.style.customHandlers = {}; CKEDITOR.style.addCustomHandler = function (a) {
      const b = function (a) { this._ = { definition: a }; this.setup && this.setup(a) }; b.prototype = CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.style.prototype), { assignedTo: CKEDITOR.STYLE_OBJECT },
        a, !0); return this.customHandlers[a.type] = b
    }; var Q = CKEDITOR.POSITION_PRECEDING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED; var P = CKEDITOR.POSITION_FOLLOWING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED
  })(); CKEDITOR.styleCommand = function (a, d) { this.requiredContent = this.allowedContent = this.style = a; CKEDITOR.tools.extend(this, d, !0) }
  CKEDITOR.styleCommand.prototype.exec = function (a) { a.focus(); this.state == CKEDITOR.TRISTATE_OFF ? a.applyStyle(this.style) : this.state == CKEDITOR.TRISTATE_ON && a.removeStyle(this.style) }; CKEDITOR.stylesSet = new CKEDITOR.resourceManager('', 'stylesSet'); CKEDITOR.addStylesSet = CKEDITOR.tools.bind(CKEDITOR.stylesSet.add, CKEDITOR.stylesSet); CKEDITOR.loadStylesSet = function (a, d, b) { CKEDITOR.stylesSet.addExternal(a, d, ''); CKEDITOR.stylesSet.load(a, b) }
  CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
    attachStyleStateChange: function (a, d) { let b = this._.styleStateChangeCallbacks; b || (b = this._.styleStateChangeCallbacks = [], this.on('selectionChange', function (a) { for (let d = 0; d < b.length; d++) { const g = b[d]; const h = g.style.checkActive(a.data.path, this) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF; g.fn.call(this, h) } })); b.push({ style: a, fn: d }) },
    applyStyle: function (a) { a.apply(this) },
    removeStyle: function (a) { a.remove(this) },
    getStylesSet: function (a) {
      if (this._.stylesDefinitions)a(this._.stylesDefinitions)
      else { const d = this; var b = d.config.stylesCombo_stylesSet || d.config.stylesSet; if (!1 === b)a(null); else if (b instanceof Array)d._.stylesDefinitions = b, a(b); else { b || (b = 'default'); var b = b.split(':'); const c = b[0]; CKEDITOR.stylesSet.addExternal(c, b[1] ? b.slice(1).join(':') : CKEDITOR.getUrl('styles.js'), ''); CKEDITOR.stylesSet.load(c, function (b) { d._.stylesDefinitions = b[c]; a(d._.stylesDefinitions) }) } }
    }
  })
  CKEDITOR.dom.comment = function (a, d) { typeof a === 'string' && (a = (d ? d.$ : document).createComment(a)); CKEDITOR.dom.domObject.call(this, a) }; CKEDITOR.dom.comment.prototype = new CKEDITOR.dom.node(); CKEDITOR.tools.extend(CKEDITOR.dom.comment.prototype, { type: CKEDITOR.NODE_COMMENT, getOuterHtml: function () { return '\x3c!--' + this.$.nodeValue + '--\x3e' } }); 'use strict';
  (function () {
    const a = {}; const d = {}; let b; for (b in CKEDITOR.dtd.$blockLimit)b in CKEDITOR.dtd.$list || (a[b] = 1); for (b in CKEDITOR.dtd.$block)b in CKEDITOR.dtd.$blockLimit || b in CKEDITOR.dtd.$empty || (d[b] = 1); CKEDITOR.dom.elementPath = function (b, e) {
      let g = null; let h = null; const l = []; let m = b; let r; e = e || b.getDocument().getBody(); do {
        if (m.type == CKEDITOR.NODE_ELEMENT) {
          l.push(m); if (!this.lastElement && (this.lastElement = m, m.is(CKEDITOR.dtd.$object) || m.getAttribute('contenteditable') == 'false')) continue; if (m.equals(e)) break; if (!h && (r = m.getName(),
          m.getAttribute('contenteditable') == 'true' ? h = m : !g && d[r] && (g = m), a[r])) { if (r = !g && r == 'div') { a: { r = m.getChildren(); for (let f = 0, C = r.count(); f < C; f++) { const u = r.getItem(f); if (u.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$block[u.getName()]) { r = !0; break a } }r = !1 }r = !r }r ? g = m : h = m }
        }
      } while (m = m.getParent()); h || (h = e); this.block = g; this.blockLimit = h; this.root = e; this.elements = l
    }
  })()
  CKEDITOR.dom.elementPath.prototype = {
    compare: function (a) { const d = this.elements; a = a && a.elements; if (!a || d.length != a.length) return !1; for (let b = 0; b < d.length; b++) if (!d[b].equals(a[b])) return !1; return !0 },
    contains: function (a, d, b) {
      let c; typeof a === 'string' && (c = function (b) { return b.getName() == a }); a instanceof CKEDITOR.dom.element
        ? c = function (b) { return b.equals(a) }
        : CKEDITOR.tools.isArray(a)
          ? c = function (b) { return CKEDITOR.tools.indexOf(a, b.getName()) > -1 }
          : typeof a === 'function'
            ? c = a
            : typeof a === 'object' && (c = function (b) {
              return b.getName() in
a
            }); let e = this.elements; let g = e.length; d && g--; b && (e = Array.prototype.slice.call(e, 0), e.reverse()); for (d = 0; d < g; d++) if (c(e[d])) return e[d]; return null
    },
    isContextFor: function (a) { let d; return a in CKEDITOR.dtd.$block ? (d = this.contains(CKEDITOR.dtd.$intermediate) || this.root.equals(this.block) && this.block || this.blockLimit, !!d.getDtd()[a]) : !0 },
    direction: function () { return (this.block || this.blockLimit || this.root).getDirection(1) }
  }
  CKEDITOR.dom.text = function (a, d) { typeof a === 'string' && (a = (d ? d.$ : document).createTextNode(a)); this.$ = a }; CKEDITOR.dom.text.prototype = new CKEDITOR.dom.node()
  CKEDITOR.tools.extend(CKEDITOR.dom.text.prototype, {
    type: CKEDITOR.NODE_TEXT,
    getLength: function () { return this.$.nodeValue.length },
    getText: function () { return this.$.nodeValue },
    setText: function (a) { this.$.nodeValue = a },
    split: function (a) { const d = this.$.parentNode; const b = d.childNodes.length; const c = this.getLength(); const e = this.getDocument(); let g = new CKEDITOR.dom.text(this.$.splitText(a), e); d.childNodes.length == b && (a >= c ? (g = e.createText(''), g.insertAfter(this)) : (a = e.createText(''), a.insertAfter(g), a.remove())); return g },
    substring: function (a,
      d) { return typeof d !== 'number' ? this.$.nodeValue.substr(a) : this.$.nodeValue.substring(a, d) }
  });
  (function () {
    function a (a, c, d) { const g = a.serializable; let h = c[d ? 'endContainer' : 'startContainer']; const l = d ? 'endOffset' : 'startOffset'; const m = g ? c.document.getById(a.startNode) : a.startNode; a = g ? c.document.getById(a.endNode) : a.endNode; h.equals(m.getPrevious()) ? (c.startOffset = c.startOffset - h.getLength() - a.getPrevious().getLength(), h = a.getNext()) : h.equals(a.getPrevious()) && (c.startOffset -= h.getLength(), h = a.getNext()); h.equals(m.getParent()) && c[l]++; h.equals(a.getParent()) && c[l]++; c[d ? 'endContainer' : 'startContainer'] = h; return c }
    CKEDITOR.dom.rangeList = function (a) { if (a instanceof CKEDITOR.dom.rangeList) return a; a ? a instanceof CKEDITOR.dom.range && (a = [a]) : a = []; return CKEDITOR.tools.extend(a, d) }; var d = {
      createIterator: function () {
        const a = this; const c = CKEDITOR.dom.walker.bookmark(); const d = []; let g; return {
          getNextRange: function (h) {
            g = void 0 === g ? 0 : g + 1; const l = a[g]; if (l && a.length > 1) {
              if (!g) for (var m = a.length - 1; m >= 0; m--)d.unshift(a[m].createBookmark(!0)); if (h) {
                for (var r = 0; a[g + r + 1];) {
                  let f = l.document; h = 0; m = f.getById(d[r].endNode); for (f = f.getById(d[r + 1].startNode); ;) {
                    m =
m.getNextSourceNode(!1); if (f.equals(m))h = 1; else if (c(m) || m.type == CKEDITOR.NODE_ELEMENT && m.isBlockBoundary()) continue; break
                  } if (!h) break; r++
                }
              } for (l.moveToBookmark(d.shift()); r--;)m = a[++g], m.moveToBookmark(d.shift()), l.setEnd(m.endContainer, m.endOffset)
            } return l
          }
        }
      },
      createBookmarks: function (b) { for (var c = [], d, g = 0; g < this.length; g++) { c.push(d = this[g].createBookmark(b, !0)); for (let h = g + 1; h < this.length; h++) this[h] = a(d, this[h]), this[h] = a(d, this[h], !0) } return c },
      createBookmarks2: function (a) {
        for (var c = [], d = 0; d <
this.length; d++)c.push(this[d].createBookmark2(a)); return c
      },
      moveToBookmarks: function (a) { for (let c = 0; c < this.length; c++) this[c].moveToBookmark(a[c]) }
    }
  })();
  (function () {
    function a () { return CKEDITOR.getUrl(CKEDITOR.skinName.split(',')[1] || 'skins/' + CKEDITOR.skinName.split(',')[0] + '/') } function d (b) { var c = CKEDITOR.skin['ua_' + b]; const d = CKEDITOR.env; if (c) for (var c = c.split(',').sort(function (a, b) { return a > b ? -1 : 1 }), e = 0, g; e < c.length; e++) if (g = c[e], d.ie && (g.replace(/^ie/, '') == d.version || d.quirks && g == 'iequirks') && (g = 'ie'), d[g]) { b += '_' + c[e]; break } return CKEDITOR.getUrl(a() + b + '.css') } function b (a, b) { g[a] || (CKEDITOR.document.appendStyleSheet(d(a)), g[a] = 1); b && b() } function c (a) {
      let b =
a.getById(h); b || (b = a.getHead().append('style'), b.setAttribute('id', h), b.setAttribute('type', 'text/css')); return b
    } function e (a, b, c) {
      let d, e, g; if (CKEDITOR.env.webkit) for (b = b.split('}').slice(0, -1), e = 0; e < b.length; e++)b[e] = b[e].split('{'); for (let h = 0; h < a.length; h++) {
        if (CKEDITOR.env.webkit) for (e = 0; e < b.length; e++) { g = b[e][1]; for (d = 0; d < c.length; d++)g = g.replace(c[d][0], c[d][1]); a[h].$.sheet.addRule(b[e][0], g) } else {
          g = b; for (d = 0; d < c.length; d++)g = g.replace(c[d][0], c[d][1]); CKEDITOR.env.ie && CKEDITOR.env.version < 11
            ? a[h].$.styleSheet.cssText += g
            : a[h].$.innerHTML += g
        }
      }
    } var g = {}; CKEDITOR.skin = {
      path: a,
      loadPart: function (c, d) { CKEDITOR.skin.name != CKEDITOR.skinName.split(',')[0] ? CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(a() + 'skin.js'), function () { b(c, d) }) : b(c, d) },
      getPath: function (a) { return CKEDITOR.getUrl(d(a)) },
      icons: {},
      addIcon: function (a, b, c, d) { a = a.toLowerCase(); this.icons[a] || (this.icons[a] = { path: b, offset: c || 0, bgsize: d || '16px' }) },
      getIconStyle: function (a, b, c, d, e) {
        let g; a && (a = a.toLowerCase(), b && (g = this.icons[a + '-rtl']),
        g || (g = this.icons[a])); a = c || g && g.path || ''; d = d || g && g.offset; e = e || g && g.bgsize || '16px'; a && (a = a.replace(/'/g, "\\'")); return a && "background-image:url('" + CKEDITOR.getUrl(a) + "');background-position:0 " + d + 'px;background-size:' + e + ';'
      }
    }; CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
      getUiColor: function () { return this.uiColor },
      setUiColor: function (a) {
        const b = c(CKEDITOR.document); return (this.setUiColor = function (a) {
          this.uiColor = a; const c = CKEDITOR.skin.chameleon; let d = ''; let g = ''; typeof c === 'function' && (d = c(this, 'editor'), g =
c(this, 'panel')); a = [[m, a]]; e([b], d, a); e(l, g, a)
        }).call(this, a)
      }
    }); var h = 'cke_ui_color'; var l = []; var m = /\$color/g; CKEDITOR.on('instanceLoaded', function (a) { if (!CKEDITOR.env.ie || !CKEDITOR.env.quirks) { const b = a.editor; a = function (a) { a = (a.data[0] || a.data).element.getElementsByTag('iframe').getItem(0).getFrameDocument(); if (!a.getById('cke_ui_color')) { a = c(a); l.push(a); const d = b.getUiColor(); d && e([a], CKEDITOR.skin.chameleon(b, 'panel'), [[m, d]]) } }; b.on('panelShow', a); b.on('menuShow', a); b.config.uiColor && b.setUiColor(b.config.uiColor) } })
  })();
  (function () {
    if (CKEDITOR.env.webkit)CKEDITOR.env.hc = !1; else { var a = CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"width:0;height:0;position:absolute;left:-10000px;border:1px solid;border-color:red blue"\x3e\x3c/div\x3e', CKEDITOR.document); a.appendTo(CKEDITOR.document.getHead()); try { var d = a.getComputedStyle('border-top-color'); const b = a.getComputedStyle('border-right-color'); CKEDITOR.env.hc = !(!d || d != b) } catch (c) { CKEDITOR.env.hc = !1 }a.remove() }CKEDITOR.env.hc && (CKEDITOR.env.cssClass += ' cke_hc'); CKEDITOR.document.appendStyleText('.cke{visibility:hidden;}')
    CKEDITOR.status = 'loaded'; CKEDITOR.fireOnce('loaded'); if (a = CKEDITOR._.pending) for (delete CKEDITOR._.pending, d = 0; d < a.length; d++)CKEDITOR.editor.prototype.constructor.apply(a[d][0], a[d][1]), CKEDITOR.add(a[d][0])
  })()/*
 Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
  CKEDITOR.skin.name = 'moono-lisa'; CKEDITOR.skin.ua_editor = 'ie,iequirks,ie8,gecko'; CKEDITOR.skin.ua_dialog = 'ie,iequirks,ie8'
  CKEDITOR.skin.chameleon = (function () {
    const b = (function () { return function (b, d) { for (var a = b.match(/[^#]./g), e = 0; e < 3; e++) { const f = e; var c; c = parseInt(a[e], 16); c = ('0' + (d < 0 ? 0 | c * (1 + d) : 0 | c + (255 - c) * d).toString(16)).slice(-2); a[f] = c } return '#' + a.join('') } }()); const f = { editor: new CKEDITOR.template('{id}.cke_chrome [border-color:{defaultBorder};] {id} .cke_top [ background-color:{defaultBackground};border-bottom-color:{defaultBorder};] {id} .cke_bottom [background-color:{defaultBackground};border-top-color:{defaultBorder};] {id} .cke_resizer [border-right-color:{ckeResizer}] {id} .cke_dialog_title [background-color:{defaultBackground};border-bottom-color:{defaultBorder};] {id} .cke_dialog_footer [background-color:{defaultBackground};outline-color:{defaultBorder};] {id} .cke_dialog_tab [background-color:{dialogTab};border-color:{defaultBorder};] {id} .cke_dialog_tab:hover [background-color:{lightBackground};] {id} .cke_dialog_contents [border-top-color:{defaultBorder};] {id} .cke_dialog_tab_selected, {id} .cke_dialog_tab_selected:hover [background:{dialogTabSelected};border-bottom-color:{dialogTabSelectedBorder};] {id} .cke_dialog_body [background:{dialogBody};border-color:{defaultBorder};] {id} a.cke_button_off:hover,{id} a.cke_button_off:focus,{id} a.cke_button_off:active [background-color:{darkBackground};border-color:{toolbarElementsBorder};] {id} .cke_button_on [background-color:{ckeButtonOn};border-color:{toolbarElementsBorder};] {id} .cke_toolbar_separator,{id} .cke_toolgroup a.cke_button:last-child:after,{id} .cke_toolgroup a.cke_button.cke_button_disabled:hover:last-child:after [background-color: {toolbarElementsBorder};border-color: {toolbarElementsBorder};] {id} a.cke_combo_button:hover,{id} a.cke_combo_button:focus,{id} .cke_combo_on a.cke_combo_button [border-color:{toolbarElementsBorder};background-color:{darkBackground};] {id} .cke_combo:after [border-color:{toolbarElementsBorder};] {id} .cke_path_item [color:{elementsPathColor};] {id} a.cke_path_item:hover,{id} a.cke_path_item:focus,{id} a.cke_path_item:active [background-color:{darkBackground};] {id}.cke_panel [border-color:{defaultBorder};] '), panel: new CKEDITOR.template('.cke_panel_grouptitle [background-color:{lightBackground};border-color:{defaultBorder};] .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menubutton:hover,.cke_menubutton:focus,.cke_menubutton:active [background-color:{menubuttonHover};] .cke_menubutton:hover .cke_menubutton_icon, .cke_menubutton:focus .cke_menubutton_icon, .cke_menubutton:active .cke_menubutton_icon [background-color:{menubuttonIconHover};] .cke_menubutton_disabled:hover .cke_menubutton_icon,.cke_menubutton_disabled:focus .cke_menubutton_icon,.cke_menubutton_disabled:active .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menuseparator [background-color:{menubuttonIcon};] a:hover.cke_colorbox, a:active.cke_colorbox [border-color:{defaultBorder};] a:hover.cke_colorauto, a:hover.cke_colormore, a:active.cke_colorauto, a:active.cke_colormore [background-color:{ckeColorauto};border-color:{defaultBorder};] ') }
    return function (g, d) { var a = b(g.uiColor, 0.4); var a = { id: '.' + g.id, defaultBorder: b(a, -0.2), toolbarElementsBorder: b(a, -0.25), defaultBackground: a, lightBackground: b(a, 0.8), darkBackground: b(a, -0.15), ckeButtonOn: b(a, 0.4), ckeResizer: b(a, -0.4), ckeColorauto: b(a, 0.8), dialogBody: b(a, 0.7), dialogTab: b(a, 0.65), dialogTabSelected: '#FFF', dialogTabSelectedBorder: '#FFF', elementsPathColor: b(a, -0.6), menubuttonHover: b(a, 0.1), menubuttonIcon: b(a, 0.5), menubuttonIconHover: b(a, 0.3) }; return f[d].output(a).replace(/\[/g, '{').replace(/\]/g, '}') }
  }()); CKEDITOR.plugins.add('dialogui', {
    onLoad: function () {
      const h = function (b) { this._ || (this._ = {}); this._.default = this._.initValue = b.default || ''; this._.required = b.required || !1; for (var a = [this._], d = 1; d < arguments.length; d++)a.push(arguments[d]); a.push(!0); CKEDITOR.tools.extend.apply(CKEDITOR.tools, a); return this._ }; const v = { build: function (b, a, d) { return new CKEDITOR.ui.dialog.textInput(b, a, d) } }; const n = { build: function (b, a, d) { return new CKEDITOR.ui.dialog[a.type](b, a, d) } }; const q = {
        isChanged: function () {
          return this.getValue() !=
this.getInitValue()
        },
        reset: function (b) { this.setValue(this.getInitValue(), b) },
        setInitValue: function () { this._.initValue = this.getValue() },
        resetInitValue: function () { this._.initValue = this._.default },
        getInitValue: function () { return this._.initValue }
      }; const r = CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
        onChange: function (b, a) {
          this._.domOnChangeRegistered || (b.on('load', function () {
            this.getInputElement().on('change', function () { b.parts.dialog.isVisible() && this.fire('change', { value: this.getValue() }) },
              this)
          }, this), this._.domOnChangeRegistered = !0); this.on('change', a)
        }
      }, !0); const x = /^on([A-Z]\w+)/; const t = function (b) { for (const a in b)(x.test(a) || a == 'title' || a == 'type') && delete b[a]; return b }; const w = function (b) { b = b.data.getKeystroke(); b == CKEDITOR.SHIFT + CKEDITOR.ALT + 36 ? this.setDirectionMarker('ltr') : b == CKEDITOR.SHIFT + CKEDITOR.ALT + 35 && this.setDirectionMarker('rtl') }; CKEDITOR.tools.extend(CKEDITOR.ui.dialog, {
        labeledElement: function (b, a, d, f) {
          if (!(arguments.length < 4)) {
            const c = h.call(this, a); c.labelId = CKEDITOR.tools.getNextId() +
'_label'; this._.children = []; const e = { role: a.role || 'presentation' }; a.includeLabel && (e['aria-labelledby'] = c.labelId); CKEDITOR.ui.dialog.uiElement.call(this, b, a, d, 'div', null, e, function () {
              const e = []; let g = a.required ? ' cke_required' : ''; a.labelLayout != 'horizontal'
                ? e.push('\x3clabel class\x3d"cke_dialog_ui_labeled_label' + g + '" ', ' id\x3d"' + c.labelId + '"', c.inputId ? ' for\x3d"' + c.inputId + '"' : '', (a.labelStyle ? ' style\x3d"' + a.labelStyle + '"' : '') + '\x3e', a.label, '\x3c/label\x3e', '\x3cdiv class\x3d"cke_dialog_ui_labeled_content"',
                  a.controlStyle ? ' style\x3d"' + a.controlStyle + '"' : '', ' role\x3d"presentation"\x3e', f.call(this, b, a), '\x3c/div\x3e')
                : (g = {
                    type: 'hbox',
                    widths: a.widths,
                    padding: 0,
                    children: [{ type: 'html', html: '\x3clabel class\x3d"cke_dialog_ui_labeled_label' + g + '" id\x3d"' + c.labelId + '" for\x3d"' + c.inputId + '"' + (a.labelStyle ? ' style\x3d"' + a.labelStyle + '"' : '') + '\x3e' + CKEDITOR.tools.htmlEncode(a.label) + '\x3c/label\x3e' }, {
                      type: 'html',
                      html: '\x3cspan class\x3d"cke_dialog_ui_labeled_content"' + (a.controlStyle
                        ? ' style\x3d"' + a.controlStyle +
'"'
                        : '') + '\x3e' + f.call(this, b, a) + '\x3c/span\x3e'
                    }]
                  }, CKEDITOR.dialog._.uiElementBuilders.hbox.build(b, g, e)); return e.join('')
            })
          }
        },
        textInput: function (b, a, d) {
          if (!(arguments.length < 3)) {
            h.call(this, a); const f = this._.inputId = CKEDITOR.tools.getNextId() + '_textInput'; const c = { class: 'cke_dialog_ui_input_' + a.type, id: f, type: a.type }; a.validate && (this.validate = a.validate); a.maxLength && (c.maxlength = a.maxLength); a.size && (c.size = a.size); a.inputStyle && (c.style = a.inputStyle); const e = this; let m = !1; b.on('load', function () {
              e.getInputElement().on('keydown',
                function (a) { a.data.getKeystroke() == 13 && (m = !0) }); e.getInputElement().on('keyup', function (a) { a.data.getKeystroke() == 13 && m && (b.getButton('ok') && setTimeout(function () { b.getButton('ok').click() }, 0), m = !1); e.bidi && w.call(e, a) }, null, null, 1E3)
            }); CKEDITOR.ui.dialog.labeledElement.call(this, b, a, d, function () {
              const b = ['\x3cdiv class\x3d"cke_dialog_ui_input_', a.type, '" role\x3d"presentation"']; a.width && b.push('style\x3d"width:' + a.width + '" '); b.push('\x3e\x3cinput '); c['aria-labelledby'] = this._.labelId; this._.required &&
(c['aria-required'] = this._.required); for (const e in c)b.push(e + '\x3d"' + c[e] + '" '); b.push(' /\x3e\x3c/div\x3e'); return b.join('')
            })
          }
        },
        textarea: function (b, a, d) {
          if (!(arguments.length < 3)) {
            h.call(this, a); const f = this; const c = this._.inputId = CKEDITOR.tools.getNextId() + '_textarea'; const e = {}; a.validate && (this.validate = a.validate); e.rows = a.rows || 5; e.cols = a.cols || 20; e.class = 'cke_dialog_ui_input_textarea ' + (a.class || ''); typeof a.inputStyle !== 'undefined' && (e.style = a.inputStyle); a.dir && (e.dir = a.dir); if (f.bidi) {
              b.on('load',
                function () { f.getInputElement().on('keyup', w) }, f)
            }CKEDITOR.ui.dialog.labeledElement.call(this, b, a, d, function () { e['aria-labelledby'] = this._.labelId; this._.required && (e['aria-required'] = this._.required); const a = ['\x3cdiv class\x3d"cke_dialog_ui_input_textarea" role\x3d"presentation"\x3e\x3ctextarea id\x3d"', c, '" ']; let b; for (b in e)a.push(b + '\x3d"' + CKEDITOR.tools.htmlEncode(e[b]) + '" '); a.push('\x3e', CKEDITOR.tools.htmlEncode(f._.default), '\x3c/textarea\x3e\x3c/div\x3e'); return a.join('') })
          }
        },
        checkbox: function (b,
          a, d) {
          if (!(arguments.length < 3)) {
            const f = h.call(this, a, { default: !!a.default }); a.validate && (this.validate = a.validate); CKEDITOR.ui.dialog.uiElement.call(this, b, a, d, 'span', null, null, function () {
              const c = CKEDITOR.tools.extend({}, a, { id: a.id ? a.id + '_checkbox' : CKEDITOR.tools.getNextId() + '_checkbox' }, !0); const e = []; const d = CKEDITOR.tools.getNextId() + '_label'; const g = { class: 'cke_dialog_ui_checkbox_input', type: 'checkbox', 'aria-labelledby': d }; t(c); a.default && (g.checked = 'checked'); typeof c.inputStyle !== 'undefined' && (c.style = c.inputStyle)
              f.checkbox = new CKEDITOR.ui.dialog.uiElement(b, c, e, 'input', null, g); e.push(' \x3clabel id\x3d"', d, '" for\x3d"', g.id, '"' + (a.labelStyle ? ' style\x3d"' + a.labelStyle + '"' : '') + '\x3e', CKEDITOR.tools.htmlEncode(a.label), '\x3c/label\x3e'); return e.join('')
            })
          }
        },
        radio: function (b, a, d) {
          if (!(arguments.length < 3)) {
            h.call(this, a); this._.default || (this._.default = this._.initValue = a.items[0][1]); a.validate && (this.validate = a.validate); const f = []; const c = this; a.role = 'radiogroup'; a.includeLabel = !0; CKEDITOR.ui.dialog.labeledElement.call(this,
              b, a, d, function () {
                for (var e = [], d = [], g = (a.id ? a.id : CKEDITOR.tools.getNextId()) + '_radio', k = 0; k < a.items.length; k++) {
                  const l = a.items[k]; var h = void 0 !== l[2] ? l[2] : l[0]; const n = void 0 !== l[1] ? l[1] : l[0]; var p = CKEDITOR.tools.getNextId() + '_radio_input'; const q = p + '_label'; var p = CKEDITOR.tools.extend({}, a, { id: p, title: null, type: null }, !0); var h = CKEDITOR.tools.extend({}, p, { title: h }, !0); const r = { type: 'radio', class: 'cke_dialog_ui_radio_input', name: g, value: n, 'aria-labelledby': q }; const u = []; c._.default == n && (r.checked = 'checked'); t(p); t(h); typeof p.inputStyle !== 'undefined' &&
(p.style = p.inputStyle); p.keyboardFocusable = !0; f.push(new CKEDITOR.ui.dialog.uiElement(b, p, u, 'input', null, r)); u.push(' '); new CKEDITOR.ui.dialog.uiElement(b, h, u, 'label', null, { id: q, for: r.id }, l[0]); e.push(u.join(''))
                } new CKEDITOR.ui.dialog.hbox(b, f, e, d); return d.join('')
              }); this._.children = f
          }
        },
        button: function (b, a, d) {
          if (arguments.length) {
            typeof a === 'function' && (a = a(b.getParentEditor())); h.call(this, a, { disabled: a.disabled || !1 }); CKEDITOR.event.implementOn(this); const f = this; b.on('load', function () {
              const a = this.getElement();
              (function () { a.on('click', function (a) { f.click(); a.data.preventDefault() }); a.on('keydown', function (a) { a.data.getKeystroke() in { 32: 1 } && (f.click(), a.data.preventDefault()) }) })(); a.unselectable()
            }, this); const c = CKEDITOR.tools.extend({}, a); delete c.style; const e = CKEDITOR.tools.getNextId() + '_label'; CKEDITOR.ui.dialog.uiElement.call(this, b, c, d, 'a', null, { style: a.style, href: 'javascript:void(0)', title: a.label, hidefocus: 'true', class: a.class, role: 'button', 'aria-labelledby': e }, '\x3cspan id\x3d"' + e + '" class\x3d"cke_dialog_ui_button"\x3e' +
CKEDITOR.tools.htmlEncode(a.label) + '\x3c/span\x3e')
          }
        },
        select: function (b, a, d) {
          if (!(arguments.length < 3)) {
            const f = h.call(this, a); a.validate && (this.validate = a.validate); f.inputId = CKEDITOR.tools.getNextId() + '_select'; CKEDITOR.ui.dialog.labeledElement.call(this, b, a, d, function () {
              const c = CKEDITOR.tools.extend({}, a, { id: a.id ? a.id + '_select' : CKEDITOR.tools.getNextId() + '_select' }, !0); const e = []; const d = []; const g = { id: f.inputId, class: 'cke_dialog_ui_input_select', 'aria-labelledby': this._.labelId }; e.push('\x3cdiv class\x3d"cke_dialog_ui_input_',
                a.type, '" role\x3d"presentation"'); a.width && e.push('style\x3d"width:' + a.width + '" '); e.push('\x3e'); void 0 !== a.size && (g.size = a.size); void 0 !== a.multiple && (g.multiple = a.multiple); t(c); for (var k = 0, l; k < a.items.length && (l = a.items[k]); k++)d.push('\x3coption value\x3d"', CKEDITOR.tools.htmlEncode(void 0 !== l[1] ? l[1] : l[0]).replace(/"/g, '\x26quot;'), '" /\x3e ', CKEDITOR.tools.htmlEncode(l[0])); typeof c.inputStyle !== 'undefined' && (c.style = c.inputStyle); f.select = new CKEDITOR.ui.dialog.uiElement(b, c, e, 'select', null,
                g, d.join('')); e.push('\x3c/div\x3e'); return e.join('')
            })
          }
        },
        file: function (b, a, d) {
          if (!(arguments.length < 3)) {
            void 0 === a.default && (a.default = ''); const f = CKEDITOR.tools.extend(h.call(this, a), { definition: a, buttons: [] }); a.validate && (this.validate = a.validate); b.on('load', function () { CKEDITOR.document.getById(f.frameId).getParent().addClass('cke_dialog_ui_input_file') }); CKEDITOR.ui.dialog.labeledElement.call(this, b, a, d, function () {
              f.frameId = CKEDITOR.tools.getNextId() + '_fileInput'; const b = ['\x3ciframe frameborder\x3d"0" allowtransparency\x3d"0" class\x3d"cke_dialog_ui_input_file" role\x3d"presentation" id\x3d"',
                f.frameId, '" title\x3d"', a.label, '" src\x3d"javascript:void(']; b.push(CKEDITOR.env.ie ? '(function(){' + encodeURIComponent('document.open();(' + CKEDITOR.tools.fixDomain + ')();document.close();') + '})()' : '0'); b.push(')"\x3e\x3c/iframe\x3e'); return b.join('')
            })
          }
        },
        fileButton: function (b, a, d) {
          const f = this; if (!(arguments.length < 3)) {
            h.call(this, a); a.validate && (this.validate = a.validate); const c = CKEDITOR.tools.extend({}, a); const e = c.onClick; c.className = (c.className ? c.className + ' ' : '') + 'cke_dialog_ui_button'; c.onClick = function (c) {
              const d =
a.for; e && !1 === e.call(this, c) || (b.getContentElement(d[0], d[1]).submit(), this.disable())
            }; b.on('load', function () { b.getContentElement(a.for[0], a.for[1])._.buttons.push(f) }); CKEDITOR.ui.dialog.button.call(this, b, c, d)
          }
        },
        html: (function () {
          const b = /^\s*<[\w:]+\s+([^>]*)?>/; const a = /^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/; const d = /\/$/; return function (f, c, e) {
            if (!(arguments.length < 3)) {
              let m = []; let g = c.html; g.charAt(0) != '\x3c' && (g = '\x3cspan\x3e' + g + '\x3c/span\x3e'); const k = c.focus; if (k) {
                const l = this.focus; this.focus = function () {
                  (typeof k ===
'function'
                    ? k
                    : l).call(this); this.fire('focus')
                }; c.isFocusable && (this.isFocusable = this.isFocusable); this.keyboardFocusable = !0
              }CKEDITOR.ui.dialog.uiElement.call(this, f, c, m, 'span', null, null, ''); m = m.join('').match(b); g = g.match(a) || ['', '', '']; d.test(g[1]) && (g[1] = g[1].slice(0, -1), g[2] = '/' + g[2]); e.push([g[1], ' ', m[1] || '', g[2]].join(''))
            }
          }
        }()),
        fieldset: function (b, a, d, f, c) {
          const e = c.label; this._ = { children: a }; CKEDITOR.ui.dialog.uiElement.call(this, b, c, f, 'fieldset', null, null, function () {
            const a = []; e && a.push('\x3clegend' +
(c.labelStyle ? ' style\x3d"' + c.labelStyle + '"' : '') + '\x3e' + e + '\x3c/legend\x3e'); for (let b = 0; b < d.length; b++)a.push(d[b]); return a.join('')
          })
        }
      }, !0); CKEDITOR.ui.dialog.html.prototype = new CKEDITOR.ui.dialog.uiElement(); CKEDITOR.ui.dialog.labeledElement.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement(), {
        setLabel: function (b) { const a = CKEDITOR.document.getById(this._.labelId); a.getChildCount() < 1 ? (new CKEDITOR.dom.text(b, CKEDITOR.document)).appendTo(a) : a.getChild(0).$.nodeValue = b; return this },
        getLabel: function () {
          const b =
CKEDITOR.document.getById(this._.labelId); return !b || b.getChildCount() < 1 ? '' : b.getChild(0).getText()
        },
        eventProcessors: r
      }, !0); CKEDITOR.ui.dialog.button.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement(), {
        click: function () { return this._.disabled ? !1 : this.fire('click', { dialog: this._.dialog }) },
        enable: function () { this._.disabled = !1; const b = this.getElement(); b && b.removeClass('cke_disabled') },
        disable: function () { this._.disabled = !0; this.getElement().addClass('cke_disabled') },
        isVisible: function () { return this.getElement().getFirst().isVisible() },
        isEnabled: function () { return !this._.disabled },
        eventProcessors: CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, { onClick: function (b, a) { this.on('click', function () { a.apply(this, arguments) }) } }, !0),
        accessKeyUp: function () { this.click() },
        accessKeyDown: function () { this.focus() },
        keyboardFocusable: !0
      }, !0); CKEDITOR.ui.dialog.textInput.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement(), {
        getInputElement: function () { return CKEDITOR.document.getById(this._.inputId) },
        focus: function () { const b = this.selectParentTab(); setTimeout(function () { const a = b.getInputElement(); a && a.$.focus() }, 0) },
        select: function () { const b = this.selectParentTab(); setTimeout(function () { const a = b.getInputElement(); a && (a.$.focus(), a.$.select()) }, 0) },
        accessKeyUp: function () { this.select() },
        setValue: function (b) { if (this.bidi) { let a = b && b.charAt(0); (a = a == '‪' ? 'ltr' : a == '‫' ? 'rtl' : null) && (b = b.slice(1)); this.setDirectionMarker(a) }b || (b = ''); return CKEDITOR.ui.dialog.uiElement.prototype.setValue.apply(this, arguments) },
        getValue: function () { let b = CKEDITOR.ui.dialog.uiElement.prototype.getValue.call(this); if (this.bidi && b) { const a = this.getDirectionMarker(); a && (b = (a == 'ltr' ? '‪' : '‫') + b) } return b },
        setDirectionMarker: function (b) { const a = this.getInputElement(); b ? a.setAttributes({ dir: b, 'data-cke-dir-marker': b }) : this.getDirectionMarker() && a.removeAttributes(['dir', 'data-cke-dir-marker']) },
        getDirectionMarker: function () { return this.getInputElement().data('cke-dir-marker') },
        keyboardFocusable: !0
      }, q, !0); CKEDITOR.ui.dialog.textarea.prototype =
new CKEDITOR.ui.dialog.textInput(); CKEDITOR.ui.dialog.select.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement(), {
        getInputElement: function () { return this._.select.getElement() },
        add: function (b, a, d) { const f = new CKEDITOR.dom.element('option', this.getDialog().getParentEditor().document); const c = this.getInputElement().$; f.$.text = b; f.$.value = void 0 === a || a === null ? b : a; void 0 === d || d === null ? CKEDITOR.env.ie ? c.add(f.$) : c.add(f.$, null) : c.add(f.$, d); return this },
        remove: function (b) {
          this.getInputElement().$.remove(b)
          return this
        },
        clear: function () { for (let b = this.getInputElement().$; b.length > 0;)b.remove(0); return this },
        keyboardFocusable: !0
      }, q, !0); CKEDITOR.ui.dialog.checkbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement(), {
        getInputElement: function () { return this._.checkbox.getElement() },
        setValue: function (b, a) { this.getInputElement().$.checked = b; !a && this.fire('change', { value: b }) },
        getValue: function () { return this.getInputElement().$.checked },
        accessKeyUp: function () { this.setValue(!this.getValue()) },
        eventProcessors: {
          onChange: function (b,
            a) { if (!CKEDITOR.env.ie || CKEDITOR.env.version > 8) return r.onChange.apply(this, arguments); b.on('load', function () { const a = this._.checkbox.getElement(); a.on('propertychange', function (b) { b = b.data.$; b.propertyName == 'checked' && this.fire('change', { value: a.$.checked }) }, this) }, this); this.on('change', a); return null }
        },
        keyboardFocusable: !0
      }, q, !0); CKEDITOR.ui.dialog.radio.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement(), {
        setValue: function (b, a) {
          for (var d = this._.children, f, c = 0; c < d.length && (f = d[c]); c++) {
            f.getElement().$.checked =
f.getValue() == b
          }!a && this.fire('change', { value: b })
        },
        getValue: function () { for (let b = this._.children, a = 0; a < b.length; a++) if (b[a].getElement().$.checked) return b[a].getValue(); return null },
        accessKeyUp: function () { const b = this._.children; let a; for (a = 0; a < b.length; a++) if (b[a].getElement().$.checked) { b[a].getElement().focus(); return }b[0].getElement().focus() },
        eventProcessors: {
          onChange: function (b, a) {
            if (!CKEDITOR.env.ie || CKEDITOR.env.version > 8) return r.onChange.apply(this, arguments); b.on('load', function () {
              for (var a =
this._.children, b = this, c = 0; c < a.length; c++)a[c].getElement().on('propertychange', function (a) { a = a.data.$; a.propertyName == 'checked' && this.$.checked && b.fire('change', { value: this.getAttribute('value') }) })
            }, this); this.on('change', a); return null
          }
        }
      }, q, !0); CKEDITOR.ui.dialog.file.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement(), q, {
        getInputElement: function () {
          const b = CKEDITOR.document.getById(this._.frameId).getFrameDocument(); return b.$.forms.length > 0
            ? new CKEDITOR.dom.element(b.$.forms[0].elements[0])
            : this.getElement()
        },
        submit: function () { this.getInputElement().getParent().$.submit(); return this },
        getAction: function () { return this.getInputElement().getParent().$.action },
        registerEvents: function (b) { const a = /^on([A-Z]\w+)/; let d; const f = function (a, b, c, d) { a.on('formLoaded', function () { a.getInputElement().on(c, d, a) }) }; let c; for (c in b) if (d = c.match(a)) this.eventProcessors[c] ? this.eventProcessors[c].call(this, this._.dialog, b[c]) : f(this, this._.dialog, d[1].toLowerCase(), b[c]); return this },
        reset: function () {
          function b () {
            d.$.open()
            let b = ''; f.size && (b = f.size - (CKEDITOR.env.ie ? 7 : 0)); const h = a.frameId + '_input'; d.$.write(['\x3chtml dir\x3d"' + g + '" lang\x3d"' + k + '"\x3e\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e\x3cbody style\x3d"margin: 0; overflow: hidden; background: transparent;"\x3e', '\x3cform enctype\x3d"multipart/form-data" method\x3d"POST" dir\x3d"' + g + '" lang\x3d"' + k + '" action\x3d"', CKEDITOR.tools.htmlEncode(f.action), '"\x3e\x3clabel id\x3d"', a.labelId, '" for\x3d"', h, '" style\x3d"display:none"\x3e', CKEDITOR.tools.htmlEncode(f.label),
              '\x3c/label\x3e\x3cinput style\x3d"width:100%" id\x3d"', h, '" aria-labelledby\x3d"', a.labelId, '" type\x3d"file" name\x3d"', CKEDITOR.tools.htmlEncode(f.id || 'cke_upload'), '" size\x3d"', CKEDITOR.tools.htmlEncode(b > 0 ? b : ''), '" /\x3e\x3c/form\x3e\x3c/body\x3e\x3c/html\x3e\x3cscript\x3e', CKEDITOR.env.ie ? '(' + CKEDITOR.tools.fixDomain + ')();' : '', 'window.parent.CKEDITOR.tools.callFunction(' + e + ');', 'window.onbeforeunload \x3d function() {window.parent.CKEDITOR.tools.callFunction(' + m + ')}', '\x3c/script\x3e'].join(''))
            d.$.close(); for (b = 0; b < c.length; b++)c[b].enable()
          } var a = this._; var d = CKEDITOR.document.getById(a.frameId).getFrameDocument(); var f = a.definition; var c = a.buttons; var e = this.formLoadedNumber; var m = this.formUnloadNumber; var g = a.dialog._.editor.lang.dir; var k = a.dialog._.editor.langCode; e || (e = this.formLoadedNumber = CKEDITOR.tools.addFunction(function () { this.fire('formLoaded') }, this), m = this.formUnloadNumber = CKEDITOR.tools.addFunction(function () { this.getInputElement().clearCustomData() }, this), this.getDialog()._.editor.on('destroy', function () {
            CKEDITOR.tools.removeFunction(e)
            CKEDITOR.tools.removeFunction(m)
          })); CKEDITOR.env.gecko ? setTimeout(b, 500) : b()
        },
        getValue: function () { return this.getInputElement().$.value || '' },
        setInitValue: function () { this._.initValue = '' },
        eventProcessors: { onChange: function (b, a) { this._.domOnChangeRegistered || (this.on('formLoaded', function () { this.getInputElement().on('change', function () { this.fire('change', { value: this.getValue() }) }, this) }, this), this._.domOnChangeRegistered = !0); this.on('change', a) } },
        keyboardFocusable: !0
      }, !0); CKEDITOR.ui.dialog.fileButton.prototype =
new CKEDITOR.ui.dialog.button(); CKEDITOR.ui.dialog.fieldset.prototype = CKEDITOR.tools.clone(CKEDITOR.ui.dialog.hbox.prototype); CKEDITOR.dialog.addUIElement('text', v); CKEDITOR.dialog.addUIElement('password', v); CKEDITOR.dialog.addUIElement('textarea', n); CKEDITOR.dialog.addUIElement('checkbox', n); CKEDITOR.dialog.addUIElement('radio', n); CKEDITOR.dialog.addUIElement('button', n); CKEDITOR.dialog.addUIElement('select', n); CKEDITOR.dialog.addUIElement('file', n); CKEDITOR.dialog.addUIElement('fileButton', n); CKEDITOR.dialog.addUIElement('html',
        n); CKEDITOR.dialog.addUIElement('fieldset', { build: function (b, a, d) { for (var f = a.children, c, e = [], h = [], g = 0; g < f.length && (c = f[g]); g++) { const k = []; e.push(k); h.push(CKEDITOR.dialog._.uiElementBuilders[c.type].build(b, c, k)) } return new CKEDITOR.ui.dialog[a.type](b, h, e, d, a) } })
    }
  }); CKEDITOR.DIALOG_RESIZE_NONE = 0; CKEDITOR.DIALOG_RESIZE_WIDTH = 1; CKEDITOR.DIALOG_RESIZE_HEIGHT = 2; CKEDITOR.DIALOG_RESIZE_BOTH = 3; CKEDITOR.DIALOG_STATE_IDLE = 1; CKEDITOR.DIALOG_STATE_BUSY = 2;
  (function () {
    function x () { for (let a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId) + a, c = b - 1; c > b - a; c--) if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a]; return null } function A () { for (let a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId), c = b + 1; c < b + a; c++) if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a]; return null } function K (a, b) {
      for (let c = a.$.getElementsByTagName('input'),
        e = 0, d = c.length; e < d; e++) { const f = new CKEDITOR.dom.element(c[e]); f.getAttribute('type').toLowerCase() == 'text' && (b ? (f.setAttribute('value', f.getCustomData('fake_value') || ''), f.removeCustomData('fake_value')) : (f.setCustomData('fake_value', f.getAttribute('value')), f.setAttribute('value', ''))) }
    } function T (a, b) { const c = this.getInputElement(); c && (a ? c.removeAttribute('aria-invalid') : c.setAttribute('aria-invalid', !0)); a || (this.select ? this.select() : this.focus()); b && alert(b); this.fire('validated', { valid: a, msg: b }) }
    function U () { const a = this.getInputElement(); a && a.removeAttribute('aria-invalid') } function V (a) {
      const b = CKEDITOR.dom.element.createFromHtml(CKEDITOR.addTemplate('dialog', W).output({ id: CKEDITOR.tools.getNextNumber(), editorId: a.id, langDir: a.lang.dir, langCode: a.langCode, editorDialogClass: 'cke_editor_' + a.name.replace(/\./g, '\\.') + '_dialog', closeTitle: a.lang.common.close, hidpi: CKEDITOR.env.hidpi ? 'cke_hidpi' : '' })); const c = b.getChild([0, 0, 0, 0, 0]); const e = c.getChild(0); const d = c.getChild(1); a.plugins.clipboard && CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(c)
      !CKEDITOR.env.ie || CKEDITOR.env.quirks || CKEDITOR.env.edge || (a = 'javascript:void(function(){' + encodeURIComponent('document.open();(' + CKEDITOR.tools.fixDomain + ')();document.close();') + '}())', CKEDITOR.dom.element.createFromHtml('\x3ciframe frameBorder\x3d"0" class\x3d"cke_iframe_shim" src\x3d"' + a + '" tabIndex\x3d"-1"\x3e\x3c/iframe\x3e').appendTo(c.getParent())); e.unselectable(); d.unselectable(); return {
        element: b,
        parts: {
          dialog: b.getChild(0),
          title: e,
          close: d,
          tabs: c.getChild(2),
          contents: c.getChild([3, 0, 0, 0]),
          footer: c.getChild([3, 0, 1, 0])
        }
      }
    } function L (a, b, c) { this.element = b; this.focusIndex = c; this.tabIndex = 0; this.isFocusable = function () { return !b.getAttribute('disabled') && b.isVisible() }; this.focus = function () { a._.currentFocusIndex = this.focusIndex; this.element.focus() }; b.on('keydown', function (a) { a.data.getKeystroke() in { 32: 1, 13: 1 } && this.fire('click') }); b.on('focus', function () { this.fire('mouseover') }); b.on('blur', function () { this.fire('mouseout') }) } function X (a) {
      function b () { a.layout() } const c = CKEDITOR.document.getWindow()
      c.on('resize', b); a.on('hide', function () { c.removeListener('resize', b) })
    } function M (a, b) { this._ = { dialog: a }; CKEDITOR.tools.extend(this, b) } function Y (a) {
      function b (b) { const c = a.getSize(); const k = CKEDITOR.document.getWindow().getViewPaneSize(); const q = b.data.$.screenX; const n = b.data.$.screenY; const r = q - e.x; const l = n - e.y; e = { x: q, y: n }; d.x += r; d.y += l; a.move(d.x + h[3] < g ? -h[3] : d.x - h[1] > k.width - c.width - g ? k.width - c.width + (f.lang.dir == 'rtl' ? 0 : h[1]) : d.x, d.y + h[0] < g ? -h[0] : d.y - h[2] > k.height - c.height - g ? k.height - c.height + h[2] : d.y, 1); b.data.preventDefault() }
      function c () { CKEDITOR.document.removeListener('mousemove', b); CKEDITOR.document.removeListener('mouseup', c); if (CKEDITOR.env.ie6Compat) { const a = u.getChild(0).getFrameDocument(); a.removeListener('mousemove', b); a.removeListener('mouseup', c) } } var e = null; var d = null; var f = a.getParentEditor(); var g = f.config.dialog_magnetDistance; var h = CKEDITOR.skin.margins || [0, 0, 0, 0]; typeof g === 'undefined' && (g = 20); a.parts.title.on('mousedown', function (g) {
        e = { x: g.data.$.screenX, y: g.data.$.screenY }; CKEDITOR.document.on('mousemove', b); CKEDITOR.document.on('mouseup',
          c); d = a.getPosition(); if (CKEDITOR.env.ie6Compat) { const f = u.getChild(0).getFrameDocument(); f.on('mousemove', b); f.on('mouseup', c) }g.data.preventDefault()
      }, a)
    } function Z (a) {
      function b (b) {
        const c = f.lang.dir == 'rtl'; let n = k.width; let q = k.height; let G = n + (b.data.$.screenX - m.x) * (c ? -1 : 1) * (a._.moved ? 1 : 2); let H = q + (b.data.$.screenY - m.y) * (a._.moved ? 1 : 2); var B = a._.element.getFirst(); var B = c && B.getComputedStyle('right'); const C = a.getPosition(); C.y + H > p.height && (H = p.height - C.y); (c ? B : C.x) + G > p.width && (G = p.width - (c ? B : C.x)); if (d == CKEDITOR.DIALOG_RESIZE_WIDTH ||
d == CKEDITOR.DIALOG_RESIZE_BOTH)n = Math.max(e.minWidth || 0, G - g); if (d == CKEDITOR.DIALOG_RESIZE_HEIGHT || d == CKEDITOR.DIALOG_RESIZE_BOTH)q = Math.max(e.minHeight || 0, H - h); a.resize(n, q); a._.moved || a.layout(); b.data.preventDefault()
      } function c () { CKEDITOR.document.removeListener('mouseup', c); CKEDITOR.document.removeListener('mousemove', b); q && (q.remove(), q = null); if (CKEDITOR.env.ie6Compat) { const a = u.getChild(0).getFrameDocument(); a.removeListener('mouseup', c); a.removeListener('mousemove', b) } } var e = a.definition; var d = e.resizable
      if (d != CKEDITOR.DIALOG_RESIZE_NONE) {
        var f = a.getParentEditor(); var g; var h; var p; var m; var k; var q; const n = CKEDITOR.tools.addFunction(function (d) {
          k = a.getSize(); let e = a.parts.contents; e.$.getElementsByTagName('iframe').length && (q = CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_dialog_resize_cover" style\x3d"height: 100%; position: absolute; width: 100%;"\x3e\x3c/div\x3e'), e.append(q)); h = k.height - a.parts.contents.getSize('height', !(CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.quirks)); g = k.width - a.parts.contents.getSize('width',
            1); m = { x: d.screenX, y: d.screenY }; p = CKEDITOR.document.getWindow().getViewPaneSize(); CKEDITOR.document.on('mousemove', b); CKEDITOR.document.on('mouseup', c); CKEDITOR.env.ie6Compat && (e = u.getChild(0).getFrameDocument(), e.on('mousemove', b), e.on('mouseup', c)); d.preventDefault && d.preventDefault()
        }); a.on('load', function () {
          let b = ''; d == CKEDITOR.DIALOG_RESIZE_WIDTH ? b = ' cke_resizer_horizontal' : d == CKEDITOR.DIALOG_RESIZE_HEIGHT && (b = ' cke_resizer_vertical'); b = CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_resizer' +
b + ' cke_resizer_' + f.lang.dir + '" title\x3d"' + CKEDITOR.tools.htmlEncode(f.lang.common.resize) + '" onmousedown\x3d"CKEDITOR.tools.callFunction(' + n + ', event )"\x3e' + (f.lang.dir == 'ltr' ? '◢' : '◣') + '\x3c/div\x3e'); a.parts.footer.append(b, 1)
        }); f.on('destroy', function () { CKEDITOR.tools.removeFunction(n) })
      }
    } function I (a) { a.data.preventDefault(1) } function N (a) {
      const b = CKEDITOR.document.getWindow(); var c = a.config; var e = CKEDITOR.skinName || a.config.skin; let d = c.dialog_backgroundCoverColor || (e == 'moono-lisa' ? 'black' : 'white'); var e = c.dialog_backgroundCoverOpacity
      let f = c.baseFloatZIndex; var c = CKEDITOR.tools.genKey(d, e, f); let g = z[c]; g
        ? g.show()
        : (f = ['\x3cdiv tabIndex\x3d"-1" style\x3d"position: ', CKEDITOR.env.ie6Compat ? 'absolute' : 'fixed', '; z-index: ', f, '; top: 0px; left: 0px; ', CKEDITOR.env.ie6Compat ? '' : 'background-color: ' + d, '" class\x3d"cke_dialog_background_cover"\x3e'], CKEDITOR.env.ie6Compat && (d = "\x3chtml\x3e\x3cbody style\x3d\\'background-color:" + d + ";\\'\x3e\x3c/body\x3e\x3c/html\x3e", f.push('\x3ciframe hidefocus\x3d"true" frameborder\x3d"0" id\x3d"cke_dialog_background_iframe" src\x3d"javascript:'),
          f.push('void((function(){' + encodeURIComponent('document.open();(' + CKEDITOR.tools.fixDomain + ")();document.write( '" + d + "' );document.close();") + '})())'), f.push('" style\x3d"position:absolute;left:0;top:0;width:100%;height: 100%;filter: progid:DXImageTransform.Microsoft.Alpha(opacity\x3d0)"\x3e\x3c/iframe\x3e')), f.push('\x3c/div\x3e'), g = CKEDITOR.dom.element.createFromHtml(f.join('')), g.setOpacity(void 0 !== e ? e : 0.5), g.on('keydown', I), g.on('keypress', I), g.on('keyup', I), g.appendTo(CKEDITOR.document.getBody()),
          z[c] = g); a.focusManager.add(g); u = g; a = function () { const a = b.getViewPaneSize(); g.setStyles({ width: a.width + 'px', height: a.height + 'px' }) }; const h = function () { let a = b.getScrollPosition(); let c = CKEDITOR.dialog._.currentTop; g.setStyles({ left: a.x + 'px', top: a.y + 'px' }); if (c) { do a = c.getPosition(), c.move(a.x, a.y); while (c = c._.parentDialog) } }; J = a; b.on('resize', a); a(); CKEDITOR.env.mac && CKEDITOR.env.webkit || g.focus(); if (CKEDITOR.env.ie6Compat) {
        const p = function () { h(); arguments.callee.prevScrollHandler.apply(this, arguments) }; b.$.setTimeout(function () {
          p.prevScrollHandler =
window.onscroll || function () {}; window.onscroll = p
        }, 0); h()
      }
    } function O (a) { u && (a.focusManager.remove(u), a = CKEDITOR.document.getWindow(), u.hide(), a.removeListener('resize', J), CKEDITOR.env.ie6Compat && a.$.setTimeout(function () { window.onscroll = window.onscroll && window.onscroll.prevScrollHandler || null }, 0), J = null) } const v = CKEDITOR.tools.cssLength; var W = '\x3cdiv class\x3d"cke_reset_all {editorId} {editorDialogClass} {hidpi}" dir\x3d"{langDir}" lang\x3d"{langCode}" role\x3d"dialog" aria-labelledby\x3d"cke_dialog_title_{id}"\x3e\x3ctable class\x3d"cke_dialog ' +
CKEDITOR.env.cssClass + ' cke_{langDir}" style\x3d"position:absolute" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd role\x3d"presentation"\x3e\x3cdiv class\x3d"cke_dialog_body" role\x3d"presentation"\x3e\x3cdiv id\x3d"cke_dialog_title_{id}" class\x3d"cke_dialog_title" role\x3d"presentation"\x3e\x3c/div\x3e\x3ca id\x3d"cke_dialog_close_button_{id}" class\x3d"cke_dialog_close_button" href\x3d"javascript:void(0)" title\x3d"{closeTitle}" role\x3d"button"\x3e\x3cspan class\x3d"cke_label"\x3eX\x3c/span\x3e\x3c/a\x3e\x3cdiv id\x3d"cke_dialog_tabs_{id}" class\x3d"cke_dialog_tabs" role\x3d"tablist"\x3e\x3c/div\x3e\x3ctable class\x3d"cke_dialog_contents" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_contents_{id}" class\x3d"cke_dialog_contents_body" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_footer_{id}" class\x3d"cke_dialog_footer" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e'
    CKEDITOR.dialog = function (a, b) {
      function c () { const a = l._.focusList; a.sort(function (a, b) { return a.tabIndex != b.tabIndex ? b.tabIndex - a.tabIndex : a.focusIndex - b.focusIndex }); for (let b = a.length, c = 0; c < b; c++)a[c].focusIndex = c } function e (a) {
        const b = l._.focusList; a = a || 0; if (!(b.length < 1)) {
          let c = l._.currentFocusIndex; l._.tabBarMode && a < 0 && (c = 0); try { b[c].getInputElement().$.blur() } catch (d) {} let e = c; const g = l._.pageCount > 1; do {
            e += a; if (g && !l._.tabBarMode && (e == b.length || e == -1)) {
              l._.tabBarMode = !0; l._.tabs[l._.currentTabId][0].focus()
              l._.currentFocusIndex = -1; return
            }e = (e + b.length) % b.length; if (e == c) break
          } while (a && !b[e].isFocusable()); b[e].focus(); b[e].type == 'text' && b[e].select()
        }
      } function d (b) {
        if (l == CKEDITOR.dialog._.currentTop) {
          let c = b.data.getKeystroke(); const d = a.lang.dir == 'rtl'; const g = [37, 38, 39, 40]; q = n = 0; if (c == 9 || c == CKEDITOR.SHIFT + 9)e(c == CKEDITOR.SHIFT + 9 ? -1 : 1), q = 1; else if (c == CKEDITOR.ALT + 121 && !l._.tabBarMode && l.getPageCount() > 1)l._.tabBarMode = !0, l._.tabs[l._.currentTabId][0].focus(), l._.currentFocusIndex = -1, q = 1; else if (CKEDITOR.tools.indexOf(g,
            c) != -1 && l._.tabBarMode)c = CKEDITOR.tools.indexOf([d ? 39 : 37, 38], c) != -1 ? x.call(l) : A.call(l), l.selectPage(c), l._.tabs[c][0].focus(), q = 1; else if (c != 13 && c != 32 || !l._.tabBarMode) if (c == 13)c = b.data.getTarget(), c.is('a', 'button', 'select', 'textarea') || c.is('input') && c.$.type == 'button' || ((c = this.getButton('ok')) && CKEDITOR.tools.setTimeout(c.click, 0, c), q = 1), n = 1; else if (c == 27)(c = this.getButton('cancel')) ? CKEDITOR.tools.setTimeout(c.click, 0, c) : !1 !== this.fire('cancel', { hide: !0 }).hide && this.hide(), n = 1; else return; else {
            this.selectPage(this._.currentTabId),
            this._.tabBarMode = !1, this._.currentFocusIndex = -1, e(1), q = 1
          }f(b)
        }
      } function f (a) { q ? a.data.preventDefault(1) : n && a.data.stopPropagation() } let g = CKEDITOR.dialog._.dialogDefinitions[b]; let h = CKEDITOR.tools.clone(aa); let p = a.config.dialog_buttonsOrder || 'OS'; let m = a.lang.dir; let k = {}; let q; let n; (p == 'OS' && CKEDITOR.env.mac || p == 'rtl' && m == 'ltr' || p == 'ltr' && m == 'rtl') && h.buttons.reverse(); g = CKEDITOR.tools.extend(g(a), h); g = CKEDITOR.tools.clone(g); g = new P(this, g); h = V(a); this._ = {
        editor: a,
        element: h.element,
        name: b,
        contentSize: { width: 0, height: 0 },
        size: { width: 0, height: 0 },
        contents: {},
        buttons: {},
        accessKeyMap: {},
        tabs: {},
        tabIdList: [],
        currentTabId: null,
        currentTabIndex: null,
        pageCount: 0,
        lastTab: null,
        tabBarMode: !1,
        focusList: [],
        currentFocusIndex: 0,
        hasFocus: !1
      }; this.parts = h.parts; CKEDITOR.tools.setTimeout(function () { a.fire('ariaWidget', this.parts.contents) }, 0, this); h = { position: CKEDITOR.env.ie6Compat ? 'absolute' : 'fixed', top: 0, visibility: 'hidden' }; h[m == 'rtl' ? 'right' : 'left'] = 0; this.parts.dialog.setStyles(h); CKEDITOR.event.call(this); this.definition = g = CKEDITOR.fire('dialogDefinition',
        { name: b, definition: g }, a).definition; if (!('removeDialogTabs' in a._) && a.config.removeDialogTabs) { h = a.config.removeDialogTabs.split(';'); for (m = 0; m < h.length; m++) if (p = h[m].split(':'), p.length == 2) { const r = p[0]; k[r] || (k[r] = []); k[r].push(p[1]) }a._.removeDialogTabs = k } if (a._.removeDialogTabs && (k = a._.removeDialogTabs[b])) for (m = 0; m < k.length; m++)g.removeContents(k[m]); if (g.onLoad) this.on('load', g.onLoad); if (g.onShow) this.on('show', g.onShow); if (g.onHide) this.on('hide', g.onHide); if (g.onOk) {
        this.on('ok', function (b) {
          a.fire('saveSnapshot')
          setTimeout(function () { a.fire('saveSnapshot') }, 0); !1 === g.onOk.call(this, b) && (b.data.hide = !1)
        })
      } this.state = CKEDITOR.DIALOG_STATE_IDLE; if (g.onCancel) this.on('cancel', function (a) { !1 === g.onCancel.call(this, a) && (a.data.hide = !1) }); var l = this; const t = function (a) { const b = l._.contents; let c = !1; let d; for (d in b) for (const e in b[d]) if (c = a.call(this, b[d][e])) return }; this.on('ok', function (a) {
        t(function (b) {
          if (b.validate) {
            const c = b.validate(this); const d = typeof c === 'string' || !1 === c; d && (a.data.hide = !1, a.stop()); T.call(b, !d, typeof c === 'string'
              ? c
              : void 0); return d
          }
        })
      }, this, null, 0); this.on('cancel', function (b) { t(function (c) { if (c.isChanged()) return a.config.dialog_noConfirmCancel || confirm(a.lang.common.confirmCancel) || (b.data.hide = !1), !0 }) }, this, null, 0); this.parts.close.on('click', function (a) { !1 !== this.fire('cancel', { hide: !0 }).hide && this.hide(); a.data.preventDefault() }, this); this.changeFocus = e; const y = this._.element; a.focusManager.add(y, 1); this.on('show', function () { y.on('keydown', d, this); if (CKEDITOR.env.gecko)y.on('keypress', f, this) }); this.on('hide',
        function () { y.removeListener('keydown', d); CKEDITOR.env.gecko && y.removeListener('keypress', f); t(function (a) { U.apply(a) }) }); this.on('iframeAdded', function (a) { (new CKEDITOR.dom.document(a.data.iframe.$.contentWindow.document)).on('keydown', d, this, null, 0) }); this.on('show', function () {
        c(); let b = l._.pageCount > 1; a.config.dialog_startupFocusTab && b
          ? (l._.tabBarMode = !0, l._.tabs[l._.currentTabId][0].focus(), l._.currentFocusIndex = -1)
          : this._.hasFocus || (this._.currentFocusIndex = b ? -1 : this._.focusList.length - 1, g.onFocus
            ? (b = g.onFocus.call(this)) && b.focus()
            : e(1))
      }, this, null, 4294967295); if (CKEDITOR.env.ie6Compat) this.on('load', function () { const a = this.getElement(); const b = a.getFirst(); b.remove(); b.appendTo(a) }, this); Y(this); Z(this); (new CKEDITOR.dom.text(g.title, CKEDITOR.document)).appendTo(this.parts.title); for (m = 0; m < g.contents.length; m++)(k = g.contents[m]) && this.addPage(k); this.parts.tabs.on('click', function (a) {
        let b = a.data.getTarget(); b.hasClass('cke_dialog_tab') && (b = b.$.id, this.selectPage(b.substring(4, b.lastIndexOf('_'))),
        this._.tabBarMode && (this._.tabBarMode = !1, this._.currentFocusIndex = -1, e(1)), a.data.preventDefault())
      }, this); m = []; k = CKEDITOR.dialog._.uiElementBuilders.hbox.build(this, { type: 'hbox', className: 'cke_dialog_footer_buttons', widths: [], children: g.buttons }, m).getChild(); this.parts.footer.setHtml(m.join('')); for (m = 0; m < k.length; m++) this._.buttons[k[m].id] = k[m]
    }; CKEDITOR.dialog.prototype = {
      destroy: function () { this.hide(); this._.element.remove() },
      resize: (function () {
        return function (a, b) {
          this._.contentSize && this._.contentSize.width ==
a && this._.contentSize.height == b || (CKEDITOR.dialog.fire('resize', { dialog: this, width: a, height: b }, this._.editor), this.fire('resize', { width: a, height: b }, this._.editor), this.parts.contents.setStyles({ width: a + 'px', height: b + 'px' }), this._.editor.lang.dir == 'rtl' && this._.position && (this._.position.x = CKEDITOR.document.getWindow().getViewPaneSize().width - this._.contentSize.width - parseInt(this._.element.getFirst().getStyle('right'), 10)), this._.contentSize = { width: a, height: b })
        }
      }()),
      getSize: function () {
        const a = this._.element.getFirst()
        return { width: a.$.offsetWidth || 0, height: a.$.offsetHeight || 0 }
      },
      move: function (a, b, c) {
        const e = this._.element.getFirst(); const d = this._.editor.lang.dir == 'rtl'; let f = e.getComputedStyle('position') == 'fixed'; CKEDITOR.env.ie && e.setStyle('zoom', '100%'); f && this._.position && this._.position.x == a && this._.position.y == b || (this._.position = { x: a, y: b }, f || (f = CKEDITOR.document.getWindow().getScrollPosition(), a += f.x, b += f.y), d && (f = this.getSize(), a = CKEDITOR.document.getWindow().getViewPaneSize().width - f.width - a), b = { top: (b > 0 ? b : 0) + 'px' },
        b[d ? 'right' : 'left'] = (a > 0 ? a : 0) + 'px', e.setStyles(b), c && (this._.moved = 1))
      },
      getPosition: function () { return CKEDITOR.tools.extend({}, this._.position) },
      show: function () {
        var a = this._.element; const b = this.definition; a.getParent() && a.getParent().equals(CKEDITOR.document.getBody()) ? a.setStyle('display', 'block') : a.appendTo(CKEDITOR.document.getBody()); this.resize(this._.contentSize && this._.contentSize.width || b.width || b.minWidth, this._.contentSize && this._.contentSize.height || b.height || b.minHeight); this.reset(); this.selectPage(this.definition.contents[0].id)
        CKEDITOR.dialog._.currentZIndex === null && (CKEDITOR.dialog._.currentZIndex = this._.editor.config.baseFloatZIndex); this._.element.getFirst().setStyle('z-index', CKEDITOR.dialog._.currentZIndex += 10); CKEDITOR.dialog._.currentTop === null ? (CKEDITOR.dialog._.currentTop = this, this._.parentDialog = null, N(this._.editor)) : (this._.parentDialog = CKEDITOR.dialog._.currentTop, this._.parentDialog.getElement().getFirst().$.style.zIndex -= Math.floor(this._.editor.config.baseFloatZIndex / 2), CKEDITOR.dialog._.currentTop = this)
        a.on('keydown', Q); a.on('keyup', R); this._.hasFocus = !1; for (const c in b.contents) if (b.contents[c]) { var a = b.contents[c]; const e = this._.tabs[a.id]; const d = a.requiredContent; let f = 0; if (e) { for (const g in this._.contents[a.id]) { const h = this._.contents[a.id][g]; h.type != 'hbox' && h.type != 'vbox' && h.getInputElement() && (h.requiredContent && !this._.editor.activeFilter.check(h.requiredContent) ? h.disable() : (h.enable(), f++)) }!f || d && !this._.editor.activeFilter.check(d) ? e[0].addClass('cke_dialog_tab_disabled') : e[0].removeClass('cke_dialog_tab_disabled') } }CKEDITOR.tools.setTimeout(function () {
          this.layout()
          X(this); this.parts.dialog.setStyle('visibility', ''); this.fireOnce('load', {}); CKEDITOR.ui.fire('ready', this); this.fire('show', {}); this._.editor.fire('dialogShow', this); this._.parentDialog || this._.editor.focusManager.lock(); this.foreach(function (a) { a.setInitValue && a.setInitValue() })
        }, 100, this)
      },
      layout: function () {
        const a = this.parts.dialog; const b = this.getSize(); const c = CKEDITOR.document.getWindow().getViewPaneSize(); const e = (c.width - b.width) / 2; const d = (c.height - b.height) / 2; CKEDITOR.env.ie6Compat || (b.height + (d > 0 ? d : 0) > c.height ||
b.width + (e > 0 ? e : 0) > c.width
          ? a.setStyle('position', 'absolute')
          : a.setStyle('position', 'fixed')); this.move(this._.moved ? this._.position.x : e, this._.moved ? this._.position.y : d)
      },
      foreach: function (a) { for (const b in this._.contents) for (const c in this._.contents[b])a.call(this, this._.contents[b][c]); return this },
      reset: (function () { const a = function (a) { a.reset && a.reset(1) }; return function () { this.foreach(a); return this } }()),
      setupContent: function () { const a = arguments; this.foreach(function (b) { b.setup && b.setup.apply(b, a) }) },
      commitContent: function () { const a = arguments; this.foreach(function (b) { CKEDITOR.env.ie && this._.currentFocusIndex == b.focusIndex && b.getInputElement().$.blur(); b.commit && b.commit.apply(b, a) }) },
      hide: function () {
        if (this.parts.dialog.isVisible()) {
          this.fire('hide', {}); this._.editor.fire('dialogHide', this); this.selectPage(this._.tabIdList[0]); const a = this._.element; a.setStyle('display', 'none'); this.parts.dialog.setStyle('visibility', 'hidden'); for (ba(this); CKEDITOR.dialog._.currentTop != this;)CKEDITOR.dialog._.currentTop.hide()
          if (this._.parentDialog) { const b = this._.parentDialog.getElement().getFirst(); b.setStyle('z-index', parseInt(b.$.style.zIndex, 10) + Math.floor(this._.editor.config.baseFloatZIndex / 2)) } else O(this._.editor); if (CKEDITOR.dialog._.currentTop = this._.parentDialog)CKEDITOR.dialog._.currentZIndex -= 10; else { CKEDITOR.dialog._.currentZIndex = null; a.removeListener('keydown', Q); a.removeListener('keyup', R); const c = this._.editor; c.focus(); setTimeout(function () { c.focusManager.unlock(); CKEDITOR.env.iOS && c.window.focus() }, 0) } delete this._.parentDialog
          this.foreach(function (a) { a.resetInitValue && a.resetInitValue() }); this.setState(CKEDITOR.DIALOG_STATE_IDLE)
        }
      },
      addPage: function (a) {
        if (!a.requiredContent || this._.editor.filter.check(a.requiredContent)) {
          for (var b = [], c = a.label ? ' title\x3d"' + CKEDITOR.tools.htmlEncode(a.label) + '"' : '', e = CKEDITOR.dialog._.uiElementBuilders.vbox.build(this, { type: 'vbox', className: 'cke_dialog_page_contents', children: a.elements, expand: !!a.expand, padding: a.padding, style: a.style || 'width: 100%;' }, b), d = this._.contents[a.id] = {}, f = e.getChild(),
            g = 0; e = f.shift();)e.notAllowed || e.type == 'hbox' || e.type == 'vbox' || g++, d[e.id] = e, typeof e.getChild === 'function' && f.push.apply(f, e.getChild()); g || (a.hidden = !0); b = CKEDITOR.dom.element.createFromHtml(b.join('')); b.setAttribute('role', 'tabpanel'); e = CKEDITOR.env; d = 'cke_' + a.id + '_' + CKEDITOR.tools.getNextNumber(); c = CKEDITOR.dom.element.createFromHtml(['\x3ca class\x3d"cke_dialog_tab"', this._.pageCount > 0 ? ' cke_last' : 'cke_first', c, a.hidden ? ' style\x3d"display:none"' : '', ' id\x3d"', d, '"', e.gecko && !e.hc ? '' : ' href\x3d"javascript:void(0)"',
            ' tabIndex\x3d"-1" hidefocus\x3d"true" role\x3d"tab"\x3e', a.label, '\x3c/a\x3e'].join('')); b.setAttribute('aria-labelledby', d); this._.tabs[a.id] = [c, b]; this._.tabIdList.push(a.id); !a.hidden && this._.pageCount++; this._.lastTab = c; this.updateStyle(); b.setAttribute('name', a.id); b.appendTo(this.parts.contents); c.unselectable(); this.parts.tabs.append(c); a.accessKey && (S(this, this, 'CTRL+' + a.accessKey, ca, da), this._.accessKeyMap['CTRL+' + a.accessKey] = a.id)
        }
      },
      selectPage: function (a) {
        if (this._.currentTabId != a && !this._.tabs[a][0].hasClass('cke_dialog_tab_disabled') &&
!1 !== this.fire('selectPage', { page: a, currentPage: this._.currentTabId })) { for (const b in this._.tabs) { const c = this._.tabs[b][0]; const e = this._.tabs[b][1]; b != a && (c.removeClass('cke_dialog_tab_selected'), e.hide()); e.setAttribute('aria-hidden', b != a) } const d = this._.tabs[a]; d[0].addClass('cke_dialog_tab_selected'); CKEDITOR.env.ie6Compat || CKEDITOR.env.ie7Compat ? (K(d[1]), d[1].show(), setTimeout(function () { K(d[1], 1) }, 0)) : d[1].show(); this._.currentTabId = a; this._.currentTabIndex = CKEDITOR.tools.indexOf(this._.tabIdList, a) }
      },
      updateStyle: function () { this.parts.dialog[(this._.pageCount === 1 ? 'add' : 'remove') + 'Class']('cke_single_page') },
      hidePage: function (a) { const b = this._.tabs[a] && this._.tabs[a][0]; b && this._.pageCount != 1 && b.isVisible() && (a == this._.currentTabId && this.selectPage(x.call(this)), b.hide(), this._.pageCount--, this.updateStyle()) },
      showPage: function (a) { if (a = this._.tabs[a] && this._.tabs[a][0])a.show(), this._.pageCount++, this.updateStyle() },
      getElement: function () { return this._.element },
      getName: function () { return this._.name },
      getContentElement: function (a, b) { const c = this._.contents[a]; return c && c[b] },
      getValueOf: function (a, b) { return this.getContentElement(a, b).getValue() },
      setValueOf: function (a, b, c) { return this.getContentElement(a, b).setValue(c) },
      getButton: function (a) { return this._.buttons[a] },
      click: function (a) { return this._.buttons[a].click() },
      disableButton: function (a) { return this._.buttons[a].disable() },
      enableButton: function (a) { return this._.buttons[a].enable() },
      getPageCount: function () { return this._.pageCount },
      getParentEditor: function () { return this._.editor },
      getSelectedElement: function () { return this.getParentEditor().getSelection().getSelectedElement() },
      addFocusable: function (a, b) { if (typeof b === 'undefined')b = this._.focusList.length, this._.focusList.push(new L(this, a, b)); else { this._.focusList.splice(b, 0, new L(this, a, b)); for (let c = b + 1; c < this._.focusList.length; c++) this._.focusList[c].focusIndex++ } },
      setState: function (a) {
        if (this.state != a) {
          this.state = a; if (a == CKEDITOR.DIALOG_STATE_BUSY) {
            if (!this.parts.spinner) {
              const b = this.getParentEditor().lang.dir; const c = {
                attributes: { class: 'cke_dialog_spinner' },
                styles: { float: b == 'rtl' ? 'right' : 'left' }
              }; c.styles['margin-' + (b == 'rtl' ? 'left' : 'right')] = '8px'; this.parts.spinner = CKEDITOR.document.createElement('div', c); this.parts.spinner.setHtml('\x26#8987;'); this.parts.spinner.appendTo(this.parts.title, 1)
            } this.parts.spinner.show(); this.getButton('ok').disable()
          } else a == CKEDITOR.DIALOG_STATE_IDLE && (this.parts.spinner && this.parts.spinner.hide(), this.getButton('ok').enable()); this.fire('state', a)
        }
      }
    }; CKEDITOR.tools.extend(CKEDITOR.dialog, {
      add: function (a, b) {
        this._.dialogDefinitions[a] &&
typeof b !== 'function' || (this._.dialogDefinitions[a] = b)
      },
      exists: function (a) { return !!this._.dialogDefinitions[a] },
      getCurrent: function () { return CKEDITOR.dialog._.currentTop },
      isTabEnabled: function (a, b, c) { a = a.config.removeDialogTabs; return !(a && a.match(new RegExp('(?:^|;)' + b + ':' + c + '(?:$|;)', 'i'))) },
      okButton: (function () {
        const a = function (a, c) {
          c = c || {}; return CKEDITOR.tools.extend({
            id: 'ok',
            type: 'button',
            label: a.lang.common.ok,
            class: 'cke_dialog_ui_button_ok',
            onClick: function (a) {
              a = a.data.dialog; !1 !== a.fire('ok',
                { hide: !0 }).hide && a.hide()
            }
          }, c, !0)
        }; a.type = 'button'; a.override = function (b) { return CKEDITOR.tools.extend(function (c) { return a(c, b) }, { type: 'button' }, !0) }; return a
      }()),
      cancelButton: (function () {
        const a = function (a, c) { c = c || {}; return CKEDITOR.tools.extend({ id: 'cancel', type: 'button', label: a.lang.common.cancel, class: 'cke_dialog_ui_button_cancel', onClick: function (a) { a = a.data.dialog; !1 !== a.fire('cancel', { hide: !0 }).hide && a.hide() } }, c, !0) }; a.type = 'button'; a.override = function (b) {
          return CKEDITOR.tools.extend(function (c) {
            return a(c,
              b)
          }, { type: 'button' }, !0)
        }; return a
      }()),
      addUIElement: function (a, b) { this._.uiElementBuilders[a] = b }
    }); CKEDITOR.dialog._ = { uiElementBuilders: {}, dialogDefinitions: {}, currentTop: null, currentZIndex: null }; CKEDITOR.event.implementOn(CKEDITOR.dialog); CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype); var aa = { resizable: CKEDITOR.DIALOG_RESIZE_BOTH, minWidth: 600, minHeight: 400, buttons: [CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton] }; var D = function (a, b, c) {
      for (var e = 0, d; d = a[e]; e++) {
        if (d.id == b || c && d[c] && (d = D(d[c],
          b, c))) return d
      } return null
    }; var E = function (a, b, c, e, d) { if (c) { for (var f = 0, g; g = a[f]; f++) { if (g.id == c) return a.splice(f, 0, b), b; if (e && g[e] && (g = E(g[e], b, c, e, !0))) return g } if (d) return null }a.push(b); return b }; var F = function (a, b, c) { for (var e = 0, d; d = a[e]; e++) { if (d.id == b) return a.splice(e, 1); if (c && d[c] && (d = F(d[c], b, c))) return d } return null }; var P = function (a, b) { this.dialog = a; for (var c = b.contents, e = 0, d; d = c[e]; e++)c[e] = d && new M(a, d); CKEDITOR.tools.extend(this, b) }; P.prototype = {
      getContents: function (a) {
        return D(this.contents,
          a)
      },
      getButton: function (a) { return D(this.buttons, a) },
      addContents: function (a, b) { return E(this.contents, a, b) },
      addButton: function (a, b) { return E(this.buttons, a, b) },
      removeContents: function (a) { F(this.contents, a) },
      removeButton: function (a) { F(this.buttons, a) }
    }; M.prototype = { get: function (a) { return D(this.elements, a, 'children') }, add: function (a, b) { return E(this.elements, a, b, 'children') }, remove: function (a) { F(this.elements, a, 'children') } }; let J; var z = {}; let u; const w = {}; var Q = function (a) {
      let b = a.data.$.ctrlKey || a.data.$.metaKey; const c =
a.data.$.altKey; const e = a.data.$.shiftKey; const d = String.fromCharCode(a.data.$.keyCode); (b = w[(b ? 'CTRL+' : '') + (c ? 'ALT+' : '') + (e ? 'SHIFT+' : '') + d]) && b.length && (b = b[b.length - 1], b.keydown && b.keydown.call(b.uiElement, b.dialog, b.key), a.data.preventDefault())
    }; var R = function (a) {
      let b = a.data.$.ctrlKey || a.data.$.metaKey; const c = a.data.$.altKey; const e = a.data.$.shiftKey; const d = String.fromCharCode(a.data.$.keyCode); (b = w[(b ? 'CTRL+' : '') + (c ? 'ALT+' : '') + (e ? 'SHIFT+' : '') + d]) && b.length && (b = b[b.length - 1], b.keyup && (b.keyup.call(b.uiElement, b.dialog, b.key),
      a.data.preventDefault()))
    }; var S = function (a, b, c, e, d) { (w[c] || (w[c] = [])).push({ uiElement: a, dialog: b, key: c, keyup: d || a.accessKeyUp, keydown: e || a.accessKeyDown }) }; var ba = function (a) { for (const b in w) { for (var c = w[b], e = c.length - 1; e >= 0; e--)c[e].dialog != a && c[e].uiElement != a || c.splice(e, 1); c.length === 0 && delete w[b] } }; var da = function (a, b) { a._.accessKeyMap[b] && a.selectPage(a._.accessKeyMap[b]) }; var ca = function () {}; (function () {
      CKEDITOR.ui.dialog = {
        uiElement: function (a, b, c, e, d, f, g) {
          if (!(arguments.length < 4)) {
            const h = (e.call ? e(b) : e) ||
'div'; const p = ['\x3c', h, ' ']; const m = (d && d.call ? d(b) : d) || {}; const k = (f && f.call ? f(b) : f) || {}; const q = (g && g.call ? g.call(this, a, b) : g) || ''; var n = this.domId = k.id || CKEDITOR.tools.getNextId() + '_uiElement'; b.requiredContent && !a.getParentEditor().filter.check(b.requiredContent) && (m.display = 'none', this.notAllowed = !0); k.id = n; let r = {}; b.type && (r['cke_dialog_ui_' + b.type] = 1); b.className && (r[b.className] = 1); b.disabled && (r.cke_disabled = 1); for (var l = k.class && k.class.split ? k.class.split(' ') : [], n = 0; n < l.length; n++)l[n] && (r[l[n]] = 1); l =
[]; for (n in r)l.push(n); k.class = l.join(' '); b.title && (k.title = b.title); r = (b.style || '').split(';'); b.align && (l = b.align, m['margin-left'] = l == 'left' ? 0 : 'auto', m['margin-right'] = l == 'right' ? 0 : 'auto'); for (n in m)r.push(n + ':' + m[n]); b.hidden && r.push('display:none'); for (n = r.length - 1; n >= 0; n--)r[n] === '' && r.splice(n, 1); r.length > 0 && (k.style = (k.style ? k.style + '; ' : '') + r.join('; ')); for (n in k)p.push(n + '\x3d"' + CKEDITOR.tools.htmlEncode(k[n]) + '" '); p.push('\x3e', q, '\x3c/', h, '\x3e'); c.push(p.join('')); (this._ || (this._ =
{})).dialog = a; typeof b.isChanged === 'boolean' && (this.isChanged = function () { return b.isChanged }); typeof b.isChanged === 'function' && (this.isChanged = b.isChanged); typeof b.setValue === 'function' && (this.setValue = CKEDITOR.tools.override(this.setValue, function (a) { return function (c) { a.call(this, b.setValue.call(this, c)) } })); typeof b.getValue === 'function' && (this.getValue = CKEDITOR.tools.override(this.getValue, function (a) { return function () { return b.getValue.call(this, a.call(this)) } })); CKEDITOR.event.implementOn(this)
            this.registerEvents(b); this.accessKeyUp && this.accessKeyDown && b.accessKey && S(this, a, 'CTRL+' + b.accessKey); const t = this; a.on('load', function () { const b = t.getInputElement(); if (b) { const c = t.type in { checkbox: 1, ratio: 1 } && CKEDITOR.env.ie && CKEDITOR.env.version < 8 ? 'cke_dialog_ui_focused' : ''; b.on('focus', function () { a._.tabBarMode = !1; a._.hasFocus = !0; t.fire('focus'); c && this.addClass(c) }); b.on('blur', function () { t.fire('blur'); c && this.removeClass(c) }) } }); CKEDITOR.tools.extend(this, b); this.keyboardFocusable && (this.tabIndex =
b.tabIndex || 0, this.focusIndex = a._.focusList.push(this) - 1, this.on('focus', function () { a._.currentFocusIndex = t.focusIndex }))
          }
        },
        hbox: function (a, b, c, e, d) {
          if (!(arguments.length < 4)) {
            this._ || (this._ = {}); const f = this._.children = b; const g = d && d.widths || null; const h = d && d.height || null; let p; const m = { role: 'presentation' }; d && d.align && (m.align = d.align); CKEDITOR.ui.dialog.uiElement.call(this, a, d || { type: 'hbox' }, e, 'table', {}, m, function () {
              const a = ['\x3ctbody\x3e\x3ctr class\x3d"cke_dialog_ui_hbox"\x3e']; for (p = 0; p < c.length; p++) {
                let b = 'cke_dialog_ui_hbox_child'
                const e = []; p === 0 && (b = 'cke_dialog_ui_hbox_first'); p == c.length - 1 && (b = 'cke_dialog_ui_hbox_last'); a.push('\x3ctd class\x3d"', b, '" role\x3d"presentation" '); g ? g[p] && e.push('width:' + v(g[p])) : e.push('width:' + Math.floor(100 / c.length) + '%'); h && e.push('height:' + v(h)); d && void 0 !== d.padding && e.push('padding:' + v(d.padding)); CKEDITOR.env.ie && CKEDITOR.env.quirks && f[p].align && e.push('text-align:' + f[p].align); e.length > 0 && a.push('style\x3d"' + e.join('; ') + '" '); a.push('\x3e', c[p], '\x3c/td\x3e')
              }a.push('\x3c/tr\x3e\x3c/tbody\x3e')
              return a.join('')
            })
          }
        },
        vbox: function (a, b, c, e, d) {
          if (!(arguments.length < 3)) {
            this._ || (this._ = {}); const f = this._.children = b; const g = d && d.width || null; const h = d && d.heights || null; CKEDITOR.ui.dialog.uiElement.call(this, a, d || { type: 'vbox' }, e, 'div', null, { role: 'presentation' }, function () {
              const b = ['\x3ctable role\x3d"presentation" cellspacing\x3d"0" border\x3d"0" ']; b.push('style\x3d"'); d && d.expand && b.push('height:100%;'); b.push('width:' + v(g || '100%'), ';'); CKEDITOR.env.webkit && b.push('float:none;'); b.push('"'); b.push('align\x3d"',
                CKEDITOR.tools.htmlEncode(d && d.align || (a.getParentEditor().lang.dir == 'ltr' ? 'left' : 'right')), '" '); b.push('\x3e\x3ctbody\x3e'); for (let e = 0; e < c.length; e++) {
                const k = []; b.push('\x3ctr\x3e\x3ctd role\x3d"presentation" '); g && k.push('width:' + v(g || '100%')); h ? k.push('height:' + v(h[e])) : d && d.expand && k.push('height:' + Math.floor(100 / c.length) + '%'); d && void 0 !== d.padding && k.push('padding:' + v(d.padding)); CKEDITOR.env.ie && CKEDITOR.env.quirks && f[e].align && k.push('text-align:' + f[e].align); k.length > 0 && b.push('style\x3d"',
                  k.join('; '), '" '); b.push(' class\x3d"cke_dialog_ui_vbox_child"\x3e', c[e], '\x3c/td\x3e\x3c/tr\x3e')
              }b.push('\x3c/tbody\x3e\x3c/table\x3e'); return b.join('')
            })
          }
        }
      }
    })(); CKEDITOR.ui.dialog.uiElement.prototype = {
      getElement: function () { return CKEDITOR.document.getById(this.domId) },
      getInputElement: function () { return this.getElement() },
      getDialog: function () { return this._.dialog },
      setValue: function (a, b) { this.getInputElement().setValue(a); !b && this.fire('change', { value: a }); return this },
      getValue: function () { return this.getInputElement().getValue() },
      isChanged: function () { return !1 },
      selectParentTab: function () { for (var a = this.getInputElement(); (a = a.getParent()) && a.$.className.search('cke_dialog_page_contents') == -1;);if (!a) return this; a = a.getAttribute('name'); this._.dialog._.currentTabId != a && this._.dialog.selectPage(a); return this },
      focus: function () { this.selectParentTab().getInputElement().focus(); return this },
      registerEvents: function (a) {
        const b = /^on([A-Z]\w+)/; let c; const e = function (a, b, c, d) { b.on('load', function () { a.getInputElement().on(c, d, a) }) }; let d; for (d in a) {
          if (c =
d.match(b)) this.eventProcessors[d] ? this.eventProcessors[d].call(this, this._.dialog, a[d]) : e(this, this._.dialog, c[1].toLowerCase(), a[d])
        } return this
      },
      eventProcessors: { onLoad: function (a, b) { a.on('load', b, this) }, onShow: function (a, b) { a.on('show', b, this) }, onHide: function (a, b) { a.on('hide', b, this) } },
      accessKeyDown: function () { this.focus() },
      accessKeyUp: function () {},
      disable: function () { const a = this.getElement(); this.getInputElement().setAttribute('disabled', 'true'); a.addClass('cke_disabled') },
      enable: function () {
        const a =
this.getElement(); this.getInputElement().removeAttribute('disabled'); a.removeClass('cke_disabled')
      },
      isEnabled: function () { return !this.getElement().hasClass('cke_disabled') },
      isVisible: function () { return this.getInputElement().isVisible() },
      isFocusable: function () { return this.isEnabled() && this.isVisible() ? !0 : !1 }
    }; CKEDITOR.ui.dialog.hbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement(), {
      getChild: function (a) {
        if (arguments.length < 1) return this._.children.concat(); a.splice || (a = [a]); return a.length <
2
          ? this._.children[a[0]]
          : this._.children[a[0]] && this._.children[a[0]].getChild ? this._.children[a[0]].getChild(a.slice(1, a.length)) : null
      }
    }, !0); CKEDITOR.ui.dialog.vbox.prototype = new CKEDITOR.ui.dialog.hbox(); (function () {
      const a = { build: function (a, c, e) { for (var d = c.children, f, g = [], h = [], p = 0; p < d.length && (f = d[p]); p++) { const m = []; g.push(m); h.push(CKEDITOR.dialog._.uiElementBuilders[f.type].build(a, f, m)) } return new CKEDITOR.ui.dialog[c.type](a, h, g, e, c) } }; CKEDITOR.dialog.addUIElement('hbox', a); CKEDITOR.dialog.addUIElement('vbox',
        a)
    })(); CKEDITOR.dialogCommand = function (a, b) { this.dialogName = a; CKEDITOR.tools.extend(this, b, !0) }; CKEDITOR.dialogCommand.prototype = { exec: function (a) { a.openDialog(this.dialogName) }, canUndo: !1, editorFocus: 1 }; (function () {
      const a = /^([a]|[^a])+$/; const b = /^\d*$/; const c = /^\d*(?:\.\d+)?$/; const e = /^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/; const d = /^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i; const f = /^(\s*[\w-]+\s*:\s*[^:;]+(?:;|$))*$/; CKEDITOR.VALIDATE_OR = 1; CKEDITOR.VALIDATE_AND = 2; CKEDITOR.dialog.validate = {
        functions: function () {
          const a =
arguments; return function () { const b = this && this.getValue ? this.getValue() : a[0]; let c; let d = CKEDITOR.VALIDATE_AND; const e = []; let f; for (f = 0; f < a.length; f++) if (typeof a[f] === 'function')e.push(a[f]); else break; f < a.length && typeof a[f] === 'string' && (c = a[f], f++); f < a.length && typeof a[f] === 'number' && (d = a[f]); let n = d == CKEDITOR.VALIDATE_AND ? !0 : !1; for (f = 0; f < e.length; f++)n = d == CKEDITOR.VALIDATE_AND ? n && e[f](b) : n || e[f](b); return n ? !0 : c }
        },
        regex: function (a, b) { return function (c) { c = this && this.getValue ? this.getValue() : c; return a.test(c) ? !0 : b } },
        notEmpty: function (b) { return this.regex(a, b) },
        integer: function (a) { return this.regex(b, a) },
        number: function (a) { return this.regex(c, a) },
        cssLength: function (a) { return this.functions(function (a) { return d.test(CKEDITOR.tools.trim(a)) }, a) },
        htmlLength: function (a) { return this.functions(function (a) { return e.test(CKEDITOR.tools.trim(a)) }, a) },
        inlineStyle: function (a) { return this.functions(function (a) { return f.test(CKEDITOR.tools.trim(a)) }, a) },
        equals: function (a, b) { return this.functions(function (b) { return b == a }, b) },
        notEqual: function (a, b) { return this.functions(function (b) { return b != a }, b) }
      }; CKEDITOR.on('instanceDestroyed', function (a) { if (CKEDITOR.tools.isEmpty(CKEDITOR.instances)) { for (var b; b = CKEDITOR.dialog._.currentTop;)b.hide(); for (const c in z)z[c].remove(); z = {} }a = a.editor._.storedDialogs; for (const d in a)a[d].destroy() })
    })(); CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
      openDialog: function (a, b) {
        let c = null; const e = CKEDITOR.dialog._.dialogDefinitions[a]; CKEDITOR.dialog._.currentTop === null && N(this); if (typeof e === 'function') {
          c =
this._.storedDialogs || (this._.storedDialogs = {}), c = c[a] || (c[a] = new CKEDITOR.dialog(this, a)), b && b.call(c, c), c.show()
        } else { if (e == 'failed') throw O(this), Error('[CKEDITOR.dialog.openDialog] Dialog "' + a + '" failed when loading definition.'); typeof e === 'string' && CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(e), function () { typeof CKEDITOR.dialog._.dialogDefinitions[a] !== 'function' && (CKEDITOR.dialog._.dialogDefinitions[a] = 'failed'); this.openDialog(a, b) }, this, 0, 1) }CKEDITOR.skin.loadPart('dialog'); return c
      }
    })
  })()
  CKEDITOR.plugins.add('dialog', { requires: 'dialogui', init: function (x) { x.on('doubleclick', function (A) { A.data.dialog && x.openDialog(A.data.dialog) }, null, null, 999) } }); CKEDITOR.plugins.add('about', { requires: 'dialog', init: function (a) { const b = a.addCommand('about', new CKEDITOR.dialogCommand('about')); b.modes = { wysiwyg: 1, source: 1 }; b.canUndo = !1; b.readOnly = 1; a.ui.addButton && a.ui.addButton('About', { label: a.lang.about.title, command: 'about', toolbar: 'about' }); CKEDITOR.dialog.add('about', this.path + 'dialogs/about.js') } }); (function () {
    CKEDITOR.plugins.add('a11yhelp', {
      requires: 'dialog',
      availableLangs: { af: 1, ar: 1, bg: 1, ca: 1, cs: 1, cy: 1, da: 1, de: 1, 'de-ch': 1, el: 1, en: 1, 'en-gb': 1, eo: 1, es: 1, et: 1, eu: 1, fa: 1, fi: 1, fo: 1, fr: 1, 'fr-ca': 1, gl: 1, gu: 1, he: 1, hi: 1, hr: 1, hu: 1, id: 1, it: 1, ja: 1, km: 1, ko: 1, ku: 1, lt: 1, lv: 1, mk: 1, mn: 1, nb: 1, nl: 1, no: 1, oc: 1, pl: 1, pt: 1, 'pt-br': 1, ro: 1, ru: 1, si: 1, sk: 1, sl: 1, sq: 1, sr: 1, 'sr-latn': 1, sv: 1, th: 1, tr: 1, tt: 1, ug: 1, uk: 1, vi: 1, zh: 1, 'zh-cn': 1 },
      init: function (b) {
        const c = this; b.addCommand('a11yHelp', {
          exec: function () {
            var a = b.langCode
            var a = c.availableLangs[a] ? a : c.availableLangs[a.replace(/-.*/, '')] ? a.replace(/-.*/, '') : 'en'; CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(c.path + 'dialogs/lang/' + a + '.js'), function () { b.lang.a11yhelp = c.langEntries[a]; b.openDialog('a11yHelp') })
          },
          modes: { wysiwyg: 1, source: 1 },
          readOnly: 1,
          canUndo: !1
        }); b.setKeystroke(CKEDITOR.ALT + 48, 'a11yHelp'); CKEDITOR.dialog.add('a11yHelp', this.path + 'dialogs/a11yhelp.js'); b.on('ariaEditorHelpLabel', function (a) { a.data.label = b.lang.common.editorHelp })
      }
    })
  })(); (function () {
    function f (c) { const a = this.att; c = c && c.hasAttribute(a) && c.getAttribute(a) || ''; void 0 !== c && this.setValue(c) } function g () { for (var c, a = 0; a < arguments.length; a++) if (arguments[a] instanceof CKEDITOR.dom.element) { c = arguments[a]; break } if (c) { var a = this.att; const b = this.getValue(); b ? c.setAttribute(a, b) : c.removeAttribute(a, b) } } const k = { id: 1, dir: 1, classes: 1, styles: 1 }; CKEDITOR.plugins.add('dialogadvtab', {
      requires: 'dialog',
      allowedContent: function (c) {
        c || (c = k); const a = []; c.id && a.push('id'); c.dir && a.push('dir'); let b =
''; a.length && (b += '[' + a.join(',') + ']'); c.classes && (b += '(*)'); c.styles && (b += '{*}'); return b
      },
      createAdvancedTab: function (c, a, b) {
        a || (a = k); const d = c.lang.common; const h = { id: 'advanced', label: d.advancedTab, title: d.advancedTab, elements: [{ type: 'vbox', padding: 1, children: [] }] }; let e = []; if (a.id || a.dir) {
          a.id && e.push({ id: 'advId', att: 'id', type: 'text', requiredContent: b ? b + '[id]' : null, label: d.id, setup: f, commit: g }), a.dir && e.push({
            id: 'advLangDir',
            att: 'dir',
            type: 'select',
            requiredContent: b ? b + '[dir]' : null,
            label: d.langDir,
            default: '',
            style: 'width:100%',
            items: [[d.notSet, ''], [d.langDirLTR, 'ltr'], [d.langDirRTL, 'rtl']],
            setup: f,
            commit: g
          }), h.elements[0].children.push({ type: 'hbox', widths: ['50%', '50%'], children: [].concat(e) })
        } if (a.styles || a.classes) {
          e = [], a.styles && e.push({
            id: 'advStyles',
            att: 'style',
            type: 'text',
            requiredContent: b ? b + '{cke-xyz}' : null,
            label: d.styles,
            default: '',
            validate: CKEDITOR.dialog.validate.inlineStyle(d.invalidInlineStyle),
            onChange: function () {},
            getStyle: function (a, c) {
              const b = this.getValue().match(new RegExp('(?:^|;)\\s*' +
a + '\\s*:\\s*([^;]*)', 'i')); return b ? b[1] : c
            },
            updateStyle: function (a, b) { let d = this.getValue(); const e = c.document.createElement('span'); e.setAttribute('style', d); e.setStyle(a, b); d = CKEDITOR.tools.normalizeCssText(e.getAttribute('style')); this.setValue(d, 1) },
            setup: f,
            commit: g
          }), a.classes && e.push({ type: 'hbox', widths: ['45%', '55%'], children: [{ id: 'advCSSClasses', att: 'class', type: 'text', requiredContent: b ? b + '(cke-xyz)' : null, label: d.cssClasses, default: '', setup: f, commit: g }] }), h.elements[0].children.push({
            type: 'hbox',
            widths: ['50%', '50%'],
            children: [].concat(e)
          })
        } return h
      }
    })
  })(); CKEDITOR.plugins.add('basicstyles', {
    init: function (c) {
      let e = 0; const d = function (g, d, b, a) { if (a) { a = new CKEDITOR.style(a); const f = h[b]; f.unshift(a); c.attachStyleStateChange(a, function (a) { !c.readOnly && c.getCommand(b).setState(a) }); c.addCommand(b, new CKEDITOR.styleCommand(a, { contentForms: f })); c.ui.addButton && c.ui.addButton(g, { label: d, command: b, toolbar: 'basicstyles,' + (e += 10) }) } }; var h = {
        bold: ['strong', 'b', ['span', function (a) { a = a.styles['font-weight']; return a == 'bold' || +a >= 700 }]],
        italic: ['em', 'i', ['span', function (a) {
          return a.styles['font-style'] ==
'italic'
        }]],
        underline: ['u', ['span', function (a) { return a.styles['text-decoration'] == 'underline' }]],
        strike: ['s', 'strike', ['span', function (a) { return a.styles['text-decoration'] == 'line-through' }]],
        subscript: ['sub'],
        superscript: ['sup']
      }; const b = c.config; const a = c.lang.basicstyles; d('Bold', a.bold, 'bold', b.coreStyles_bold); d('Italic', a.italic, 'italic', b.coreStyles_italic); d('Underline', a.underline, 'underline', b.coreStyles_underline); d('Strike', a.strike, 'strike', b.coreStyles_strike); d('Subscript', a.subscript,
        'subscript', b.coreStyles_subscript); d('Superscript', a.superscript, 'superscript', b.coreStyles_superscript); c.setKeystroke([[CKEDITOR.CTRL + 66, 'bold'], [CKEDITOR.CTRL + 73, 'italic'], [CKEDITOR.CTRL + 85, 'underline']])
    }
  }); CKEDITOR.config.coreStyles_bold = { element: 'strong', overrides: 'b' }; CKEDITOR.config.coreStyles_italic = { element: 'em', overrides: 'i' }; CKEDITOR.config.coreStyles_underline = { element: 'u' }; CKEDITOR.config.coreStyles_strike = { element: 's', overrides: 'strike' }; CKEDITOR.config.coreStyles_subscript = { element: 'sub' }
  CKEDITOR.config.coreStyles_superscript = { element: 'sup' }; (function () {
    function q (a, f, d, b) {
      if (!a.isReadOnly() && !a.equals(d.editable())) {
        CKEDITOR.dom.element.setMarker(b, a, 'bidi_processed', 1); b = a; for (let c = d.editable(); (b = b.getParent()) && !b.equals(c);) if (b.getCustomData('bidi_processed')) { a.removeStyle('direction'); a.removeAttribute('dir'); return }b = 'useComputedState' in d.config ? d.config.useComputedState : 1; (b ? a.getComputedStyle('direction') : a.getStyle('direction') || a.hasAttribute('dir')) != f && (a.removeStyle('direction'), b
          ? (a.removeAttribute('dir'), f != a.getComputedStyle('direction') &&
a.setAttribute('dir', f))
          : a.setAttribute('dir', f), d.forceNextSelectionCheck())
      }
    } function v (a, f, d) { let b = a.getCommonAncestor(!1, !0); a = a.clone(); a.enlarge(d == CKEDITOR.ENTER_BR ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS); if (a.checkBoundaryOfElement(b, CKEDITOR.START) && a.checkBoundaryOfElement(b, CKEDITOR.END)) { for (var c; b && b.type == CKEDITOR.NODE_ELEMENT && (c = b.getParent()) && c.getChildCount() == 1 && !(b.getName() in f);)b = c; return b.type == CKEDITOR.NODE_ELEMENT && b.getName() in f && b } } function p (a) {
      return {
        context: 'p',
        allowedContent: { 'h1 h2 h3 h4 h5 h6 table ul ol blockquote div tr p div li td': { propertiesOnly: !0, attributes: 'dir' } },
        requiredContent: 'p[dir]',
        refresh: function (a, d) {
          var b = a.config.useComputedState; let c; var b = void 0 === b || b; if (!b) { c = d.lastElement; for (var h = a.editable(); c && !(c.getName() in u || c.equals(h));) { const e = c.getParent(); if (!e) break; c = e } }c = c || d.block || d.blockLimit; c.equals(a.editable()) && (h = a.getSelection().getRanges()[0].getEnclosedNode()) && h.type == CKEDITOR.NODE_ELEMENT && (c = h); c && (b = b
            ? c.getComputedStyle('direction')
            : c.getStyle('direction') || c.getAttribute('dir'), a.getCommand('bidirtl').setState(b == 'rtl' ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF), a.getCommand('bidiltr').setState(b == 'ltr' ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)); b = (d.block || d.blockLimit || a.editable()).getDirection(1); b != (a._.selDir || a.lang.dir) && (a._.selDir = b, a.fire('contentDirChanged', b))
        },
        exec: function (f) {
          const d = f.getSelection(); const b = f.config.enterMode; var c = d.getRanges(); if (c && c.length) {
            for (var h = {}, e = d.createBookmarks(), c = c.createIterator(), g,
              l = 0; g = c.getNextRange(1);) {
              let k = g.getEnclosedNode(); k && (!k || k.type == CKEDITOR.NODE_ELEMENT && k.getName() in r) || (k = v(g, t, b)); k && q(k, a, f, h); const m = new CKEDITOR.dom.walker(g); var n = e[l].startNode; var p = e[l++].endNode; m.evaluator = function (a) {
                let c = b == CKEDITOR.ENTER_P ? 'p' : 'div'; let d; if (d = (a ? a.type == CKEDITOR.NODE_ELEMENT : !1) && a.getName() in t) { if (c = a.is(c))c = (c = a.getParent()) ? c.type == CKEDITOR.NODE_ELEMENT : !1; d = !(c && a.getParent().is('blockquote')) } return !!(d && a.getPosition(n) & CKEDITOR.POSITION_FOLLOWING && (a.getPosition(p) &
CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_CONTAINS) == CKEDITOR.POSITION_PRECEDING)
              }; for (;k = m.next();)q(k, a, f, h); g = g.createIterator(); for (g.enlargeBr = b != CKEDITOR.ENTER_BR; k = g.getNextParagraph(b == CKEDITOR.ENTER_P ? 'p' : 'div');)q(k, a, f, h)
            }CKEDITOR.dom.element.clearAllMarkers(h); f.forceNextSelectionCheck(); d.selectBookmarks(e); f.focus()
          }
        }
      }
    } function w (a) {
      const f = a == l.setAttribute; const d = a == l.removeAttribute; const b = /\bdirection\s*:\s*(.*?)\s*(:?$|;)/; return function (c, h) {
        if (!this.isReadOnly()) {
          let e; if (e = c == (f || d
            ? 'dir'
            : 'direction') || c == 'style' && (d || b.test(h))) { a: { e = this; for (var g = e.getDocument().getBody().getParent(); e;) { if (e.equals(g)) { e = !1; break a }e = e.getParent() }e = !0 }e = !e } if (e && (e = this.getDirection(1), g = a.apply(this, arguments), e != this.getDirection(1))) return this.getDocument().fire('dirChanged', this), g
        } return a.apply(this, arguments)
      }
    } var t = { table: 1, ul: 1, ol: 1, blockquote: 1, div: 1 }; var r = {}; var u = {}; CKEDITOR.tools.extend(r, t, { tr: 1, p: 1, div: 1, li: 1 }); CKEDITOR.tools.extend(u, r, { td: 1 }); CKEDITOR.plugins.add('bidi', {
      init: function (a) {
        function f (b,
          c, d, e, f) { a.addCommand(d, new CKEDITOR.command(a, e)); a.ui.addButton && a.ui.addButton(b, { label: c, command: d, toolbar: 'bidi,' + f }) } if (!a.blockless) { const d = a.lang.bidi; f('BidiLtr', d.ltr, 'bidiltr', p('ltr'), 10); f('BidiRtl', d.rtl, 'bidirtl', p('rtl'), 20); a.on('contentDom', function () { a.document.on('dirChanged', function (b) { a.fire('dirChanged', { node: b.data, dir: b.data.getDirection(1) }) }) }); a.on('contentDirChanged', function (b) { b = (a.lang.dir != b.data ? 'add' : 'remove') + 'Class'; const c = a.ui.space(a.config.toolbarLocation); if (c)c[b]('cke_mixed_dir_content') }) }
      }
    })
    for (var l = CKEDITOR.dom.element.prototype, n = ['setStyle', 'removeStyle', 'setAttribute', 'removeAttribute'], m = 0; m < n.length; m++)l[n[m]] = CKEDITOR.tools.override(l[n[m]], w)
  })(); (function () {
    const m = {
      exec: function (g) {
        let a = g.getCommand('blockquote').state; const k = g.getSelection(); let c = k && k.getRanges()[0]; if (c) {
          const h = k.createBookmarks(); if (CKEDITOR.env.ie) { var e = h[0].startNode; var b = h[0].endNode; var d; if (e && e.getParent().getName() == 'blockquote') for (d = e; d = d.getNext();) if (d.type == CKEDITOR.NODE_ELEMENT && d.isBlockBoundary()) { e.move(d, !0); break } if (b && b.getParent().getName() == 'blockquote') for (d = b; d = d.getPrevious();) if (d.type == CKEDITOR.NODE_ELEMENT && d.isBlockBoundary()) { b.move(d); break } } var f = c.createIterator()
          f.enlargeBr = g.config.enterMode != CKEDITOR.ENTER_BR; if (a == CKEDITOR.TRISTATE_OFF) {
            for (e = []; a = f.getNextParagraph();)e.push(a); e.length < 1 && (a = g.document.createElement(g.config.enterMode == CKEDITOR.ENTER_P ? 'p' : 'div'), b = h.shift(), c.insertNode(a), a.append(new CKEDITOR.dom.text('﻿', g.document)), c.moveToBookmark(b), c.selectNodeContents(a), c.collapse(!0), b = c.createBookmark(), e.push(a), h.unshift(b)); d = e[0].getParent(); c = []; for (b = 0; b < e.length; b++)a = e[b], d = d.getCommonAncestor(a.getParent()); for (a = {
              table: 1,
              tbody: 1,
              tr: 1,
              ol: 1,
              ul: 1
            }; a[d.getName()];)d = d.getParent(); for (b = null; e.length > 0;) { for (a = e.shift(); !a.getParent().equals(d);)a = a.getParent(); a.equals(b) || c.push(a); b = a } for (;c.length > 0;) if (a = c.shift(), a.getName() == 'blockquote') { for (b = new CKEDITOR.dom.documentFragment(g.document); a.getFirst();)b.append(a.getFirst().remove()), e.push(b.getLast()); b.replace(a) } else e.push(a); c = g.document.createElement('blockquote'); for (c.insertBefore(e[0]); e.length > 0;)a = e.shift(), c.append(a)
          } else if (a == CKEDITOR.TRISTATE_ON) {
            b = []
            for (d = {}; a = f.getNextParagraph();) { for (e = c = null; a.getParent();) { if (a.getParent().getName() == 'blockquote') { c = a.getParent(); e = a; break }a = a.getParent() }c && e && !e.getCustomData('blockquote_moveout') && (b.push(e), CKEDITOR.dom.element.setMarker(d, e, 'blockquote_moveout', !0)) }CKEDITOR.dom.element.clearAllMarkers(d); a = []; e = []; for (d = {}; b.length > 0;) {
              f = b.shift(), c = f.getParent(), f.getPrevious() ? f.getNext() ? (f.breakParent(f.getParent()), e.push(f.getNext())) : f.remove().insertAfter(c) : f.remove().insertBefore(c), c.getCustomData('blockquote_processed') ||
(e.push(c), CKEDITOR.dom.element.setMarker(d, c, 'blockquote_processed', !0)), a.push(f)
            }CKEDITOR.dom.element.clearAllMarkers(d); for (b = e.length - 1; b >= 0; b--) { c = e[b]; a: { d = c; for (var f = 0, m = d.getChildCount(), l = void 0; f < m && (l = d.getChild(f)); f++) if (l.type == CKEDITOR.NODE_ELEMENT && l.isBlockBoundary()) { d = !1; break a }d = !0 }d && c.remove() } if (g.config.enterMode == CKEDITOR.ENTER_BR) {
              for (c = !0; a.length;) {
                if (f = a.shift(), f.getName() == 'div') {
                  b = new CKEDITOR.dom.documentFragment(g.document); !c || !f.getPrevious() || f.getPrevious().type ==
CKEDITOR.NODE_ELEMENT && f.getPrevious().isBlockBoundary() || b.append(g.document.createElement('br')); for (c = f.getNext() && !(f.getNext().type == CKEDITOR.NODE_ELEMENT && f.getNext().isBlockBoundary()); f.getFirst();)f.getFirst().remove().appendTo(b); c && b.append(g.document.createElement('br')); b.replace(f); c = !1
                }
              }
            }
          }k.selectBookmarks(h); g.focus()
        }
      },
      refresh: function (g, a) { this.setState(g.elementPath(a.block || a.blockLimit).contains('blockquote', 1) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) },
      context: 'blockquote',
      allowedContent: 'blockquote',
      requiredContent: 'blockquote'
    }; CKEDITOR.plugins.add('blockquote', { init: function (g) { g.blockless || (g.addCommand('blockquote', m), g.ui.addButton && g.ui.addButton('Blockquote', { label: g.lang.blockquote.toolbar, command: 'blockquote', toolbar: 'blocks,10' })) } })
  })(); (function () {
    function r (b, a, c) { a.type || (a.type = 'auto'); if (c && !1 === b.fire('beforePaste', a) || !a.dataValue && a.dataTransfer.isEmpty()) return !1; a.dataValue || (a.dataValue = ''); if (CKEDITOR.env.gecko && a.method == 'drop' && b.toolbox)b.once('afterPaste', function () { b.toolbox.focus() }); return b.fire('paste', a) } function y (b) {
      function a () {
        const a = b.editable(); if (CKEDITOR.plugins.clipboard.isCustomCopyCutSupported) {
          const d = function (a) { b.readOnly && a.name == 'cut' || n.initPasteDataTransfer(a, b); a.data.preventDefault() }; a.on('copy',
            d); a.on('cut', d); a.on('cut', function () { b.readOnly || b.extractSelectedHtml() }, null, null, 999)
        }a.on(n.mainPasteEvent, function (b) { n.mainPasteEvent == 'beforepaste' && p || k(b) }); n.mainPasteEvent == 'beforepaste' && (a.on('paste', function (a) { v || (e(), a.data.preventDefault(), k(a), f('paste') || b.openDialog('paste')) }), a.on('contextmenu', g, null, null, 0), a.on('beforepaste', function (b) { !b.data || b.data.$.ctrlKey || b.data.$.shiftKey || g() }, null, null, 0)); a.on('beforecut', function () { !p && h(b) }); let c; a.attachListener(CKEDITOR.env.ie
          ? a
          : b.document.getDocumentElement(), 'mouseup', function () { c = setTimeout(function () { t() }, 0) }); b.on('destroy', function () { clearTimeout(c) }); a.on('keyup', t)
      } function c (a) { return { type: a, canUndo: a == 'cut', startDisabled: !0, fakeKeystroke: a == 'cut' ? CKEDITOR.CTRL + 88 : CKEDITOR.CTRL + 67, exec: function () { this.type == 'cut' && h(); let a; const d = this.type; if (CKEDITOR.env.ie)a = f(d); else try { a = b.document.$.execCommand(d, !1, null) } catch (c) { a = !1 }a || b.showNotification(b.lang.clipboard[this.type + 'Error']); return a } } } function d () {
        return {
          canUndo: !1,
          async: !0,
          fakeKeystroke: CKEDITOR.CTRL + 86,
          exec: function (b, a) { const d = this; const c = function (a, c) { a && r(b, a, !!c); b.fire('afterCommandExec', { name: 'paste', command: d, returnValue: !!a }) }; typeof a === 'string' ? c({ dataValue: a, method: 'paste', dataTransfer: n.initPasteDataTransfer() }, 1) : b.getClipboardData(c) }
        }
      } function e () { v = 1; setTimeout(function () { v = 0 }, 100) } function g () { p = 1; setTimeout(function () { p = 0 }, 10) } function f (a) {
        const d = b.document; const c = d.getBody(); let e = !1; const f = function () { e = !0 }; c.on(a, f); CKEDITOR.env.version > 7
          ? d.$.execCommand(a)
          : d.$.selection.createRange().execCommand(a); c.removeListener(a, f); return e
      } function h () { if (CKEDITOR.env.ie && !CKEDITOR.env.quirks) { const a = b.getSelection(); let d; let c; let e; a.getType() == CKEDITOR.SELECTION_ELEMENT && (d = a.getSelectedElement()) && (c = a.getRanges()[0], e = b.document.createText(''), e.insertBefore(d), c.setStartBefore(e), c.setEndAfter(d), a.selectRanges([c]), setTimeout(function () { d.getParent() && (e.remove(), a.selectElement(d)) }, 0)) } } function l (a, d) {
        var c = b.document; const e = b.editable(); const f = function (b) { b.cancel() }; let q
        if (!c.getById('cke_pastebin')) {
          const g = b.getSelection(); const h = g.createBookmarks(); CKEDITOR.env.ie && g.root.fire('selectionchange'); let m = new CKEDITOR.dom.element(!CKEDITOR.env.webkit && !e.is('body') || CKEDITOR.env.ie ? 'div' : 'body', c); m.setAttributes({ id: 'cke_pastebin', 'data-cke-temp': '1' }); let k = 0; var c = c.getWindow(); CKEDITOR.env.webkit
            ? (e.append(m), m.addClass('cke_editable'), e.is('body') || (k = e.getComputedStyle('position') != 'static' ? e : CKEDITOR.dom.element.get(e.$.offsetParent), k = k.getDocumentPosition().y))
            : e.getAscendant(CKEDITOR.env.ie
              ? 'body'
              : 'html', 1).append(m); m.setStyles({ position: 'absolute', top: c.getScrollPosition().y - k + 10 + 'px', width: '1px', height: Math.max(1, c.getViewPaneSize().height - 20) + 'px', overflow: 'hidden', margin: 0, padding: 0 }); CKEDITOR.env.safari && m.setStyles(CKEDITOR.tools.cssVendorPrefix('user-select', 'text')); (k = m.getParent().isReadOnly()) ? (m.setOpacity(0), m.setAttribute('contenteditable', !0)) : m.setStyle(b.config.contentsLangDirection == 'ltr' ? 'left' : 'right', '-10000px'); b.on('selectionChange', f, null, null, 0); if (CKEDITOR.env.webkit ||
CKEDITOR.env.gecko)q = e.once('blur', f, null, null, -100); k && m.focus(); k = new CKEDITOR.dom.range(m); k.selectNodeContents(m); const t = k.select(); CKEDITOR.env.ie && (q = e.once('blur', function () { b.lockSelection(t) })); const l = CKEDITOR.document.getWindow().getScrollPosition().y; setTimeout(function () {
            CKEDITOR.env.webkit && (CKEDITOR.document.getBody().$.scrollTop = l); q && q.removeListener(); CKEDITOR.env.ie && e.focus(); g.selectBookmarks(h); m.remove(); let a; CKEDITOR.env.webkit && (a = m.getFirst()) && a.is && a.hasClass('Apple-style-span') &&
(m = a); b.removeListener('selectionChange', f); d(m.getHtml())
          }, 0)
        }
      } function z () { if (n.mainPasteEvent == 'paste') return b.fire('beforePaste', { type: 'auto', method: 'paste' }), !1; b.focus(); e(); const a = b.focusManager; a.lock(); if (b.editable().fire(n.mainPasteEvent) && !f('paste')) return a.unlock(), !1; a.unlock(); return !0 } function q (a) {
        if (b.mode == 'wysiwyg') {
          switch (a.data.keyCode) {
            case CKEDITOR.CTRL + 86:case CKEDITOR.SHIFT + 45:a = b.editable(); e(); n.mainPasteEvent == 'paste' && a.fire('beforepaste'); break; case CKEDITOR.CTRL + 88:case CKEDITOR.SHIFT +
46:b.fire('saveSnapshot'), setTimeout(function () { b.fire('saveSnapshot') }, 50)
          }
        }
      } function k (a) { const d = { type: 'auto', method: 'paste', dataTransfer: n.initPasteDataTransfer(a) }; d.dataTransfer.cacheData(); const c = !1 !== b.fire('beforePaste', d); c && n.canClipboardApiBeTrusted(d.dataTransfer, b) ? (a.data.preventDefault(), setTimeout(function () { r(b, d) }, 0)) : l(a, function (a) { d.dataValue = a.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/ig, ''); c && r(b, d) }) } function t () {
        if (b.mode == 'wysiwyg') {
          const a = u('paste'); b.getCommand('cut').setState(u('cut'))
          b.getCommand('copy').setState(u('copy')); b.getCommand('paste').setState(a); b.fire('pasteState', a)
        }
      } function u (a) { if (w && a in { paste: 1, cut: 1 }) return CKEDITOR.TRISTATE_DISABLED; if (a == 'paste') return CKEDITOR.TRISTATE_OFF; a = b.getSelection(); const d = a.getRanges(); return a.getType() == CKEDITOR.SELECTION_NONE || d.length == 1 && d[0].collapsed ? CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_OFF } var n = CKEDITOR.plugins.clipboard; var p = 0; var v = 0; var w = 0; (function () {
        b.on('key', q); b.on('contentDom', a); b.on('selectionChange', function (b) {
          w =
b.data.selection.getRanges()[0].checkReadOnly(); t()
        }); b.contextMenu && b.contextMenu.addListener(function (b, a) { w = a.getRanges()[0].checkReadOnly(); return { cut: u('cut'), copy: u('copy'), paste: u('paste') } })
      })(); (function () {
        function a (d, c, e, f, q) { const g = b.lang.clipboard[c]; b.addCommand(c, e); b.ui.addButton && b.ui.addButton(d, { label: g, command: c, toolbar: 'clipboard,' + f }); b.addMenuItems && b.addMenuItem(c, { label: g, command: c, group: 'clipboard', order: q }) }a('Cut', 'cut', c('cut'), 10, 1); a('Copy', 'copy', c('copy'), 20, 4); a('Paste',
          'paste', d(), 30, 8)
      })(); b.getClipboardData = function (a, d) {
        function c (a) { a.removeListener(); a.cancel(); d(a.data) } function e (a) { a.removeListener(); a.cancel(); k = !0; d({ type: g, dataValue: a.data.dataValue, dataTransfer: a.data.dataTransfer, method: 'paste' }) } function f () { this.customTitle = a && a.title } let q = !1; var g = 'auto'; var k = !1; d || (d = a, a = null); b.on('paste', c, null, null, 0); b.on('beforePaste', function (a) { a.removeListener(); q = !0; g = a.data.type }, null, null, 1E3); !1 === z() && (b.removeListener('paste', c), q && b.fire('pasteDialog',
          f)
          ? (b.on('pasteDialogCommit', e), b.on('dialogHide', function (a) { a.removeListener(); a.data.removeListener('pasteDialogCommit', e); setTimeout(function () { k || d(null) }, 10) }))
          : d(null))
      }
    } function A (b) {
      if (CKEDITOR.env.webkit) { if (!b.match(/^[^<]*$/g) && !b.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi)) return 'html' } else if (CKEDITOR.env.ie) { if (!b.match(/^([^<]|<br( ?\/)?>)*$/gi) && !b.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi)) return 'html' } else if (CKEDITOR.env.gecko) { if (!b.match(/^([^<]|<br( ?\/)?>)*$/gi)) return 'html' } else return 'html'
      return 'htmlifiedtext'
    } function B (b, a) {
      function c (a) { return CKEDITOR.tools.repeat('\x3c/p\x3e\x3cp\x3e', ~~(a / 2)) + (a % 2 == 1 ? '\x3cbr\x3e' : '') }a = a.replace(/\s+/g, ' ').replace(/> +</g, '\x3e\x3c').replace(/<br ?\/>/gi, '\x3cbr\x3e'); a = a.replace(/<\/?[A-Z]+>/g, function (a) { return a.toLowerCase() }); if (a.match(/^[^<]$/)) return a; CKEDITOR.env.webkit && a.indexOf('\x3cdiv\x3e') > -1 && (a = a.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g, '\x3cbr\x3e').replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g, '\x3cdiv\x3e\x3c/div\x3e'),
      a.match(/<div>(<br>|)<\/div>/) && (a = '\x3cp\x3e' + a.replace(/(<div>(<br>|)<\/div>)+/g, function (a) { return c(a.split('\x3c/div\x3e\x3cdiv\x3e').length + 1) }) + '\x3c/p\x3e'), a = a.replace(/<\/div><div>/g, '\x3cbr\x3e'), a = a.replace(/<\/?div>/g, '')); CKEDITOR.env.gecko && b.enterMode != CKEDITOR.ENTER_BR && (CKEDITOR.env.gecko && (a = a.replace(/^<br><br>$/, '\x3cbr\x3e')), a.indexOf('\x3cbr\x3e\x3cbr\x3e') > -1 && (a = '\x3cp\x3e' + a.replace(/(<br>){2,}/g, function (a) { return c(a.length / 4) }) + '\x3c/p\x3e')); return C(b, a)
    } function D () {
      function b () {
        const a =
{}; let b; for (b in CKEDITOR.dtd)b.charAt(0) != '$' && b != 'div' && b != 'span' && (a[b] = 1); return a
      } const a = {}; return { get: function (c) { return c == 'plain-text' ? a.plainText || (a.plainText = new CKEDITOR.filter('br')) : c == 'semantic-content' ? ((c = a.semanticContent) || (c = new CKEDITOR.filter(), c.allow({ $1: { elements: b(), attributes: !0, styles: !1, classes: !1 } }), c = a.semanticContent = c), c) : c ? new CKEDITOR.filter(c) : null } }
    } function x (b, a, c) {
      a = CKEDITOR.htmlParser.fragment.fromHtml(a); const d = new CKEDITOR.htmlParser.basicWriter(); c.applyTo(a, !0, !1,
        b.activeEnterMode); a.writeHtml(d); return d.getHtml()
    } function C (b, a) { b.enterMode == CKEDITOR.ENTER_BR ? a = a.replace(/(<\/p><p>)+/g, function (a) { return CKEDITOR.tools.repeat('\x3cbr\x3e', a.length / 7 * 2) }).replace(/<\/?p>/g, '') : b.enterMode == CKEDITOR.ENTER_DIV && (a = a.replace(/<(\/)?p>/g, '\x3c$1div\x3e')); return a } function E (b) { b.data.preventDefault(); b.data.$.dataTransfer.dropEffect = 'none' } function F (b) {
      const a = CKEDITOR.plugins.clipboard; b.on('contentDom', function () {
        function c (a, d, c) {
          d.select(); r(b, {
            dataTransfer: c,
            method: 'drop'
          }, 1); c.sourceEditor.fire('saveSnapshot'); c.sourceEditor.editable().extractHtmlFromRange(a); c.sourceEditor.getSelection().selectRanges([a]); c.sourceEditor.fire('saveSnapshot')
        } function d (d, c) { d.select(); r(b, { dataTransfer: c, method: 'drop' }, 1); a.resetDragDataTransfer() } function e (a, d, c) { const e = { $: a.data.$, target: a.data.getTarget() }; d && (e.dragRange = d); c && (e.dropRange = c); !1 === b.fire(a.name, e) && a.data.preventDefault() } function g (a) { a.type != CKEDITOR.NODE_ELEMENT && (a = a.getParent()); return a.getChildCount() }
        const f = b.editable(); const h = CKEDITOR.plugins.clipboard.getDropTarget(b); const l = b.ui.space('top'); const p = b.ui.space('bottom'); a.preventDefaultDropOnElement(l); a.preventDefaultDropOnElement(p); f.attachListener(h, 'dragstart', e); f.attachListener(b, 'dragstart', a.resetDragDataTransfer, a, null, 1); f.attachListener(b, 'dragstart', function (d) { a.initDragDataTransfer(d, b) }, null, null, 2); f.attachListener(b, 'dragstart', function () {
          const d = a.dragRange = b.getSelection().getRanges()[0]; CKEDITOR.env.ie && CKEDITOR.env.version < 10 && (a.dragStartContainerChildCount =
d ? g(d.startContainer) : null, a.dragEndContainerChildCount = d ? g(d.endContainer) : null)
        }, null, null, 100); f.attachListener(h, 'dragend', e); f.attachListener(b, 'dragend', a.initDragDataTransfer, a, null, 1); f.attachListener(b, 'dragend', a.resetDragDataTransfer, a, null, 100); f.attachListener(h, 'dragover', function (a) { const b = a.data.getTarget(); b && b.is && b.is('html') ? a.data.preventDefault() : CKEDITOR.env.ie && CKEDITOR.plugins.clipboard.isFileApiSupported && a.data.$.dataTransfer.types.contains('Files') && a.data.preventDefault() })
        f.attachListener(h, 'drop', function (d) { if (!d.data.$.defaultPrevented) { d.data.preventDefault(); var c = d.data.getTarget(); if (!c.isReadOnly() || c.type == CKEDITOR.NODE_ELEMENT && c.is('html')) { var c = a.getRangeAtDropPosition(d, b); const f = a.dragRange; c && e(d, f, c) } } }, null, null, 9999); f.attachListener(b, 'drop', a.initDragDataTransfer, a, null, 1); f.attachListener(b, 'drop', function (e) {
          if (e = e.data) {
            const f = e.dropRange; const g = e.dragRange; const h = e.dataTransfer; h.getTransferType(b) == CKEDITOR.DATA_TRANSFER_INTERNAL
              ? setTimeout(function () {
                a.internalDrop(g,
                  f, h, b)
              }, 0)
              : h.getTransferType(b) == CKEDITOR.DATA_TRANSFER_CROSS_EDITORS ? c(g, f, h) : d(f, h)
          }
        }, null, null, 9999)
      })
    }CKEDITOR.plugins.add('clipboard', {
      requires: 'dialog',
      init: function (b) {
        let a; const c = D(); b.config.forcePasteAsPlainText ? a = 'plain-text' : b.config.pasteFilter ? a = b.config.pasteFilter : !CKEDITOR.env.webkit || 'pasteFilter' in b.config || (a = 'semantic-content'); b.pasteFilter = c.get(a); y(b); F(b); CKEDITOR.dialog.add('paste', CKEDITOR.getUrl(this.path + 'dialogs/paste.js')); b.on('paste', function (a) {
          a.data.dataTransfer ||
(a.data.dataTransfer = new CKEDITOR.plugins.clipboard.dataTransfer()); if (!a.data.dataValue) { const c = a.data.dataTransfer; let g = c.getData('text/html'); if (g)a.data.dataValue = g, a.data.type = 'html'; else if (g = c.getData('text/plain'))a.data.dataValue = b.editable().transformPlainTextToHtml(g), a.data.type = 'text' }
        }, null, null, 1); b.on('paste', function (a) {
          let b = a.data.dataValue; const c = CKEDITOR.dtd.$block; b.indexOf('Apple-') > -1 && (b = b.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi, ' '), a.data.type != 'html' && (b = b.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi,
            function (a, b) { return b.replace(/\t/g, '\x26nbsp;\x26nbsp; \x26nbsp;') })), b.indexOf('\x3cbr class\x3d"Apple-interchange-newline"\x3e') > -1 && (a.data.startsWithEOL = 1, a.data.preSniffing = 'html', b = b.replace(/<br class="Apple-interchange-newline">/, '')), b = b.replace(/(<[^>]+) class="Apple-[^"]*"/gi, '$1')); if (b.match(/^<[^<]+cke_(editable|contents)/i)) {
            let f; let h; let l = new CKEDITOR.dom.element('div'); for (l.setHtml(b); l.getChildCount() == 1 && (f = l.getFirst()) && f.type == CKEDITOR.NODE_ELEMENT && (f.hasClass('cke_editable') ||
f.hasClass('cke_contents'));)l = h = f; h && (b = h.getHtml().replace(/<br>$/i, ''))
          }CKEDITOR.env.ie ? b = b.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g, function (b, f) { return f.toLowerCase() in c ? (a.data.preSniffing = 'html', '\x3c' + f) : b }) : CKEDITOR.env.webkit ? b = b.replace(/<\/(\w+)><div><br><\/div>$/, function (b, f) { return f in c ? (a.data.endsWithEOL = 1, '\x3c/' + f + '\x3e') : b }) : CKEDITOR.env.gecko && (b = b.replace(/(\s)<br>$/, '$1')); a.data.dataValue = b
        }, null, null, 3); b.on('paste', function (a) {
          a = a.data; let e = a.type; let g = a.dataValue; let f; const h = b.config.clipboard_defaultContentType ||
'html'; const l = a.dataTransfer.getTransferType(b); f = e == 'html' || a.preSniffing == 'html' ? 'html' : A(g); f == 'htmlifiedtext' && (g = B(b.config, g)); e == 'text' && f == 'html' ? g = x(b, g, c.get('plain-text')) : l == CKEDITOR.DATA_TRANSFER_EXTERNAL && b.pasteFilter && !a.dontFilter && (g = x(b, g, b.pasteFilter)); a.startsWithEOL && (g = '\x3cbr data-cke-eol\x3d"1"\x3e' + g); a.endsWithEOL && (g += '\x3cbr data-cke-eol\x3d"1"\x3e'); e == 'auto' && (e = f == 'html' || h == 'html' ? 'html' : 'text'); a.type = e; a.dataValue = g; delete a.preSniffing; delete a.startsWithEOL; delete a.endsWithEOL
        },
        null, null, 6); b.on('paste', function (a) { a = a.data; a.dataValue && (b.insertHtml(a.dataValue, a.type, a.range), setTimeout(function () { b.fire('afterPaste') }, 0)) }, null, null, 1E3); b.on('pasteDialog', function (a) { setTimeout(function () { b.openDialog('paste', a.data) }, 0) })
      }
    }); CKEDITOR.plugins.clipboard = {
      isCustomCopyCutSupported: !CKEDITOR.env.ie && !CKEDITOR.env.iOS,
      isCustomDataTypesSupported: !CKEDITOR.env.ie,
      isFileApiSupported: !CKEDITOR.env.ie || CKEDITOR.env.version > 9,
      mainPasteEvent: CKEDITOR.env.ie && !CKEDITOR.env.edge
        ? 'beforepaste'
        : 'paste',
      canClipboardApiBeTrusted: function (b, a) { return b.getTransferType(a) != CKEDITOR.DATA_TRANSFER_EXTERNAL || CKEDITOR.env.chrome && !b.isEmpty() || CKEDITOR.env.gecko && (b.getData('text/html') || b.getFilesCount()) ? !0 : !1 },
      getDropTarget: function (b) { const a = b.editable(); return CKEDITOR.env.ie && CKEDITOR.env.version < 9 || a.isInline() ? a : b.document },
      fixSplitNodesAfterDrop: function (b, a, c, d) {
        function e (b, c, d) {
          let e = b; e.type == CKEDITOR.NODE_TEXT && (e = b.getParent()); if (e.equals(c) && d != c.getChildCount()) {
            return b =
a.startContainer.getChild(a.startOffset - 1), c = a.startContainer.getChild(a.startOffset), b && b.type == CKEDITOR.NODE_TEXT && c && c.type == CKEDITOR.NODE_TEXT && (d = b.getLength(), b.setText(b.getText() + c.getText()), c.remove(), a.setStart(b, d), a.collapse(!0)), !0
          }
        } const g = a.startContainer; typeof d === 'number' && typeof c === 'number' && g.type == CKEDITOR.NODE_ELEMENT && (e(b.startContainer, g, c) || e(b.endContainer, g, d))
      },
      isDropRangeAffectedByDragRange: function (b, a) {
        const c = a.startContainer; const d = a.endOffset; return b.endContainer.equals(c) &&
b.endOffset <= d || b.startContainer.getParent().equals(c) && b.startContainer.getIndex() < d || b.endContainer.getParent().equals(c) && b.endContainer.getIndex() < d
          ? !0
          : !1
      },
      internalDrop: function (b, a, c, d) {
        let e = CKEDITOR.plugins.clipboard; const g = d.editable(); let f; let h; d.fire('saveSnapshot'); d.fire('lockSnapshot', { dontUpdate: 1 }); CKEDITOR.env.ie && CKEDITOR.env.version < 10 && this.fixSplitNodesAfterDrop(b, a, e.dragStartContainerChildCount, e.dragEndContainerChildCount); (h = this.isDropRangeAffectedByDragRange(b, a)) || (f = b.createBookmark(!1))
        e = a.clone().createBookmark(!1); h && (f = b.createBookmark(!1)); b = f.startNode; a = f.endNode; h = e.startNode; a && b.getPosition(h) & CKEDITOR.POSITION_PRECEDING && a.getPosition(h) & CKEDITOR.POSITION_FOLLOWING && h.insertBefore(b); b = d.createRange(); b.moveToBookmark(f); g.extractHtmlFromRange(b, 1); a = d.createRange(); a.moveToBookmark(e); r(d, { dataTransfer: c, method: 'drop', range: a }, 1); d.fire('unlockSnapshot')
      },
      getRangeAtDropPosition: function (b, a) {
        let c = b.data.$; const d = c.clientX; const e = c.clientY; const g = a.getSelection(!0).getRanges()[0]; const f =
a.createRange(); if (b.data.testRange) return b.data.testRange; if (document.caretRangeFromPoint)c = a.document.$.caretRangeFromPoint(d, e), f.setStart(CKEDITOR.dom.node(c.startContainer), c.startOffset), f.collapse(!0); else if (c.rangeParent)f.setStart(CKEDITOR.dom.node(c.rangeParent), c.rangeOffset), f.collapse(!0); else {
          if (CKEDITOR.env.ie && CKEDITOR.env.version > 8 && g && a.editable().hasFocus) return g; if (document.body.createTextRange) {
            a.focus(); c = a.document.getBody().$.createTextRange(); try {
              for (var h = !1, l = 0; l < 20 &&
!h; l++) { if (!h) try { c.moveToPoint(d, e - l), h = !0 } catch (p) {} if (!h) try { c.moveToPoint(d, e + l), h = !0 } catch (q) {} } if (h) { const k = 'cke-temp-' + (new Date()).getTime(); c.pasteHTML('\x3cspan id\x3d"' + k + '"\x3e​\x3c/span\x3e'); const t = a.document.getById(k); f.moveToPosition(t, CKEDITOR.POSITION_BEFORE_START); t.remove() } else {
                const u = a.document.$.elementFromPoint(d, e); const n = new CKEDITOR.dom.element(u); let r; if (n.equals(a.editable()) || n.getName() == 'html') return g && g.startContainer && !g.startContainer.equals(a.editable()) ? g : null; r = n.getClientRect()
                d < r.left ? f.setStartAt(n, CKEDITOR.POSITION_AFTER_START) : f.setStartAt(n, CKEDITOR.POSITION_BEFORE_END); f.collapse(!0)
              }
            } catch (v) { return null }
          } else return null
        } return f
      },
      initDragDataTransfer: function (b, a) { const c = b.data.$ ? b.data.$.dataTransfer : null; let d = new this.dataTransfer(c, a); c ? this.dragData && d.id == this.dragData.id ? d = this.dragData : this.dragData = d : this.dragData ? d = this.dragData : this.dragData = d; b.data.dataTransfer = d },
      resetDragDataTransfer: function () { this.dragData = null },
      initPasteDataTransfer: function (b, a) {
        if (this.isCustomCopyCutSupported) {
          if (b &&
b.data && b.data.$) { let c = new this.dataTransfer(b.data.$.clipboardData, a); this.copyCutData && c.id == this.copyCutData.id ? (c = this.copyCutData, c.$ = b.data.$.clipboardData) : this.copyCutData = c; return c } return new this.dataTransfer(null, a)
        } return new this.dataTransfer(CKEDITOR.env.edge && b && b.data.$ && b.data.$.clipboardData || null, a)
      },
      preventDefaultDropOnElement: function (b) { b && b.on('dragover', E) }
    }; const p = CKEDITOR.plugins.clipboard.isCustomDataTypesSupported ? 'cke/id' : 'Text'; CKEDITOR.plugins.clipboard.dataTransfer =
function (b, a) {
  b && (this.$ = b); this._ = { metaRegExp: /^<meta.*?>/i, bodyRegExp: /<body(?:[\s\S]*?)>([\s\S]*)<\/body>/i, fragmentRegExp: /\x3c!--(?:Start|End)Fragment--\x3e/g, data: {}, files: [], normalizeType: function (a) { a = a.toLowerCase(); return a == 'text' || a == 'text/plain' ? 'Text' : a == 'url' ? 'URL' : a } }; this.id = this.getData(p); this.id || (this.id = p == 'Text' ? '' : 'cke-' + CKEDITOR.tools.getUniqueId()); if (p != 'Text') try { this.$.setData(p, this.id) } catch (c) {}a && (this.sourceEditor = a, this.setData('text/html', a.getSelectedHtml(1)), p ==
'Text' || this.getData('text/plain') || this.setData('text/plain', a.getSelection().getSelectedText()))
}; CKEDITOR.DATA_TRANSFER_INTERNAL = 1; CKEDITOR.DATA_TRANSFER_CROSS_EDITORS = 2; CKEDITOR.DATA_TRANSFER_EXTERNAL = 3; CKEDITOR.plugins.clipboard.dataTransfer.prototype = {
      getData: function (b) {
        b = this._.normalizeType(b); let a = this._.data[b]; if (void 0 === a || a === null || a === '') try { a = this.$.getData(b) } catch (c) {} if (void 0 === a || a === null || a === '')a = ''; b == 'text/html'
          ? (a = a.replace(this._.metaRegExp, ''), (b = this._.bodyRegExp.exec(a)) &&
b.length && (a = b[1], a = a.replace(this._.fragmentRegExp, '')))
          : b == 'Text' && CKEDITOR.env.gecko && this.getFilesCount() && a.substring(0, 7) == 'file://' && (a = ''); return a
      },
      setData: function (b, a) { b = this._.normalizeType(b); this._.data[b] = a; if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported || b == 'URL' || b == 'Text') { p == 'Text' && b == 'Text' && (this.id = a); try { this.$.setData(b, a) } catch (c) {} } },
      getTransferType: function (b) {
        return this.sourceEditor
          ? this.sourceEditor == b ? CKEDITOR.DATA_TRANSFER_INTERNAL : CKEDITOR.DATA_TRANSFER_CROSS_EDITORS
          : CKEDITOR.DATA_TRANSFER_EXTERNAL
      },
      cacheData: function () {
        function b (b) { b = a._.normalizeType(b); const c = a.getData(b); c && (a._.data[b] = c) } if (this.$) {
          var a = this; let c; let d; if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported) { if (this.$.types) for (c = 0; c < this.$.types.length; c++)b(this.$.types[c]) } else b('Text'), b('URL'); d = this._getImageFromClipboard(); if (this.$ && this.$.files || d) {
            this._.files = []; if (this.$.files && this.$.files.length) for (c = 0; c < this.$.files.length; c++) this._.files.push(this.$.files[c]); this._.files.length === 0 &&
d && this._.files.push(d)
          }
        }
      },
      getFilesCount: function () { return this._.files.length ? this._.files.length : this.$ && this.$.files && this.$.files.length ? this.$.files.length : this._getImageFromClipboard() ? 1 : 0 },
      getFile: function (b) { return this._.files.length ? this._.files[b] : this.$ && this.$.files && this.$.files.length ? this.$.files[b] : b === 0 ? this._getImageFromClipboard() : void 0 },
      isEmpty: function () {
        const b = {}; let a; if (this.getFilesCount()) return !1; for (a in this._.data)b[a] = 1; if (this.$) {
          if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported) {
            if (this.$.types) {
              for (let c =
0; c < this.$.types.length; c++)b[this.$.types[c]] = 1
            }
          } else b.Text = 1, b.URL = 1
        } p != 'Text' && (b[p] = 0); for (a in b) if (b[a] && this.getData(a) !== '') return !1; return !0
      },
      _getImageFromClipboard: function () { let b; if (this.$ && this.$.items && this.$.items[0]) try { if ((b = this.$.items[0].getAsFile()) && b.type) return b } catch (a) {} }
    }
  })(); (function () {
    var c = '\x3ca id\x3d"{id}" class\x3d"cke_button cke_button__{name} cke_button_{state} {cls}"' + (CKEDITOR.env.gecko && !CKEDITOR.env.hc ? '' : " href\x3d\"javascript:void('{titleJs}')\"") + ' title\x3d"{title}" tabindex\x3d"-1" hidefocus\x3d"true" role\x3d"button" aria-labelledby\x3d"{id}_label" aria-describedby\x3d"{id}_description" aria-haspopup\x3d"{hasArrow}" aria-disabled\x3d"{ariaDisabled}"'; CKEDITOR.env.gecko && CKEDITOR.env.mac && (c += ' onkeypress\x3d"return false;"'); CKEDITOR.env.gecko && (c +=
' onblur\x3d"this.style.cssText \x3d this.style.cssText;"'); var c = c + (' onkeydown\x3d"return CKEDITOR.tools.callFunction({keydownFn},event);" onfocus\x3d"return CKEDITOR.tools.callFunction({focusFn},event);" ' + (CKEDITOR.env.ie ? 'onclick\x3d"return false;" onmouseup' : 'onclick') + '\x3d"CKEDITOR.tools.callFunction({clickFn},this);return false;"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{style}"'); var c = c + '\x3e\x26nbsp;\x3c/span\x3e\x3cspan id\x3d"{id}_label" class\x3d"cke_button_label cke_button__{name}_label" aria-hidden\x3d"false"\x3e{label}\x3c/span\x3e\x3cspan id\x3d"{id}_description" class\x3d"cke_button_label" aria-hidden\x3d"false"\x3e{ariaShortcut}\x3c/span\x3e{arrowHtml}\x3c/a\x3e'
    const t = CKEDITOR.addTemplate('buttonArrow', '\x3cspan class\x3d"cke_button_arrow"\x3e' + (CKEDITOR.env.hc ? '\x26#9660;' : '') + '\x3c/span\x3e'); const u = CKEDITOR.addTemplate('button', c); CKEDITOR.plugins.add('button', { beforeInit: function (a) { a.ui.addHandler(CKEDITOR.UI_BUTTON, CKEDITOR.ui.button.handler) } }); CKEDITOR.UI_BUTTON = 'button'; CKEDITOR.ui.button = function (a) { CKEDITOR.tools.extend(this, a, { title: a.label, click: a.click || function (b) { b.execCommand(a.command) } }); this._ = {} }; CKEDITOR.ui.button.handler = { create: function (a) { return new CKEDITOR.ui.button(a) } }
    CKEDITOR.ui.button.prototype = {
      render: function (a, b) {
        function c () { let f = a.mode; f && (f = this.modes[f] ? void 0 !== m[f] ? m[f] : CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, f = a.readOnly && !this.readOnly ? CKEDITOR.TRISTATE_DISABLED : f, this.setState(f), this.refresh && this.refresh()) } const n = CKEDITOR.env; const p = this._.id = CKEDITOR.tools.getNextId(); let g = ''; let d = this.command; let q; let k; let h; this._.editor = a; const e = { id: p, button: this, editor: a, focus: function () { CKEDITOR.document.getById(p).focus() }, execute: function () { this.button.click(a) }, attach: function (a) { this.button.attach(a) } }
        const v = CKEDITOR.tools.addFunction(function (a) { if (e.onkey) return a = new CKEDITOR.dom.event(a), !1 !== e.onkey(e, a.getKeystroke()) }); const w = CKEDITOR.tools.addFunction(function (a) { let b; e.onfocus && (b = !1 !== e.onfocus(e, new CKEDITOR.dom.event(a))); return b }); let r = 0; e.clickFn = q = CKEDITOR.tools.addFunction(function () { r && (a.unlockSelection(1), r = 0); e.execute(); n.iOS && a.focus() }); if (this.modes) {
          var m = {}; a.on('beforeModeUnload', function () { a.mode && this._.state != CKEDITOR.TRISTATE_DISABLED && (m[a.mode] = this._.state) }, this); a.on('activeFilterChange',
            c, this); a.on('mode', c, this); !this.readOnly && a.on('readOnly', c, this)
        } else d && (d = a.getCommand(d)) && (d.on('state', function () { this.setState(d.state) }, this), g += d.state == CKEDITOR.TRISTATE_ON ? 'on' : d.state == CKEDITOR.TRISTATE_DISABLED ? 'disabled' : 'off'); if (this.directional) {
          a.on('contentDirChanged', function (b) {
            const c = CKEDITOR.document.getById(this._.id); const d = c.getFirst(); b = b.data; b != a.lang.dir ? c.addClass('cke_' + b) : c.removeClass('cke_ltr').removeClass('cke_rtl'); d.setAttribute('style', CKEDITOR.skin.getIconStyle(l,
              b == 'rtl', this.icon, this.iconOffset))
          }, this)
        }d ? (k = a.getCommandKeystroke(d)) && (h = CKEDITOR.tools.keystrokeToString(a.lang.common.keyboard, k)) : g += 'off'; var l = k = this.name || this.command; this.icon && !/\./.test(this.icon) && (l = this.icon, this.icon = null); g = {
          id: p,
          name: k,
          iconName: l,
          label: this.label,
          cls: this.className || '',
          state: g,
          ariaDisabled: g == 'disabled' ? 'true' : 'false',
          title: this.title + (h ? ' (' + h.display + ')' : ''),
          ariaShortcut: h ? a.lang.common.keyboardShortcut + ' ' + h.aria : '',
          titleJs: n.gecko && !n.hc
            ? ''
            : (this.title ||
'').replace("'", ''),
          hasArrow: this.hasArrow ? 'true' : 'false',
          keydownFn: v,
          focusFn: w,
          clickFn: q,
          style: CKEDITOR.skin.getIconStyle(l, a.lang.dir == 'rtl', this.icon, this.iconOffset),
          arrowHtml: this.hasArrow ? t.output() : ''
        }; u.output(g, b); if (this.onRender) this.onRender(); return e
      },
      setState: function (a) {
        if (this._.state == a) return !1; this._.state = a; const b = CKEDITOR.document.getById(this._.id); return b
          ? (b.setState(a, 'cke_button'), a == CKEDITOR.TRISTATE_DISABLED ? b.setAttribute('aria-disabled', !0) : b.removeAttribute('aria-disabled'),
            this.hasArrow ? (a = a == CKEDITOR.TRISTATE_ON ? this._.editor.lang.button.selectedLabel.replace(/%1/g, this.label) : this.label, CKEDITOR.document.getById(this._.id + '_label').setText(a)) : a == CKEDITOR.TRISTATE_ON ? b.setAttribute('aria-pressed', !0) : b.removeAttribute('aria-pressed'), !0)
          : !1
      },
      getState: function () { return this._.state },
      toFeature: function (a) {
        if (this._.feature) return this._.feature; let b = this; this.allowedContent || this.requiredContent || !this.command || (b = a.getCommand(this.command) || b); return this._.feature =
b
      }
    }; CKEDITOR.ui.prototype.addButton = function (a, b) { this.add(a, CKEDITOR.UI_BUTTON, b) }
  })(); CKEDITOR.plugins.add('panelbutton', {
    requires: 'button',
    onLoad: function () {
      function e (c) { const a = this._; a.state != CKEDITOR.TRISTATE_DISABLED && (this.createPanel(c), a.on ? a.panel.hide() : a.panel.showBlock(this._.id, this.document.getById(this._.id), 4)) }CKEDITOR.ui.panelButton = CKEDITOR.tools.createClass({
        base: CKEDITOR.ui.button,
        $: function (c) {
          const a = c.panel || {}; delete c.panel; this.base(c); this.document = a.parent && a.parent.getDocument() || CKEDITOR.document; a.block = { attributes: a.attributes }; this.hasArrow = a.toolbarRelated =
!0; this.click = e; this._ = { panelDefinition: a }
        },
        statics: { handler: { create: function (c) { return new CKEDITOR.ui.panelButton(c) } } },
        proto: {
          createPanel: function (c) {
            const a = this._; if (!a.panel) {
              var f = this._.panelDefinition; const e = this._.panelDefinition.block; const g = f.parent || CKEDITOR.document.getBody(); const d = this._.panel = new CKEDITOR.ui.floatPanel(c, g, f); var f = d.addBlock(a.id, e); const b = this; d.onShow = function () { b.className && this.element.addClass(b.className + '_panel'); b.setState(CKEDITOR.TRISTATE_ON); a.on = 1; b.editorFocus && c.focus(); if (b.onOpen)b.onOpen() }
              d.onHide = function (d) { b.className && this.element.getFirst().removeClass(b.className + '_panel'); b.setState(b.modes && b.modes[c.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED); a.on = 0; if (!d && b.onClose)b.onClose() }; d.onEscape = function () { d.hide(1); b.document.getById(a.id).focus() }; if (this.onBlock) this.onBlock(d, f); f.onHide = function () { a.on = 0; b.setState(CKEDITOR.TRISTATE_OFF) }
            }
          }
        }
      })
    },
    beforeInit: function (e) { e.ui.addHandler(CKEDITOR.UI_PANELBUTTON, CKEDITOR.ui.panelButton.handler) }
  })
  CKEDITOR.UI_PANELBUTTON = 'panelbutton'; (function () {
    CKEDITOR.plugins.add('panel', { beforeInit: function (a) { a.ui.addHandler(CKEDITOR.UI_PANEL, CKEDITOR.ui.panel.handler) } }); CKEDITOR.UI_PANEL = 'panel'; CKEDITOR.ui.panel = function (a, b) { b && CKEDITOR.tools.extend(this, b); CKEDITOR.tools.extend(this, { className: '', css: [] }); this.id = CKEDITOR.tools.getNextId(); this.document = a; this.isFramed = this.forceIFrame || this.css.length; this._ = { blocks: {} } }; CKEDITOR.ui.panel.handler = { create: function (a) { return new CKEDITOR.ui.panel(a) } }; const f = CKEDITOR.addTemplate('panel',
      '\x3cdiv lang\x3d"{langCode}" id\x3d"{id}" dir\x3d{dir} class\x3d"cke cke_reset_all {editorId} cke_panel cke_panel {cls} cke_{dir}" style\x3d"z-index:{z-index}" role\x3d"presentation"\x3e{frame}\x3c/div\x3e'); const g = CKEDITOR.addTemplate('panel-frame', '\x3ciframe id\x3d"{id}" class\x3d"cke_panel_frame" role\x3d"presentation" frameborder\x3d"0" src\x3d"{src}"\x3e\x3c/iframe\x3e'); const h = CKEDITOR.addTemplate('panel-frame-inner', '\x3c!DOCTYPE html\x3e\x3chtml class\x3d"cke_panel_container {env}" dir\x3d"{dir}" lang\x3d"{langCode}"\x3e\x3chead\x3e{css}\x3c/head\x3e\x3cbody class\x3d"cke_{dir}" style\x3d"margin:0;padding:0" onload\x3d"{onload}"\x3e\x3c/body\x3e\x3c/html\x3e')
    CKEDITOR.ui.panel.prototype = {
      render: function (a, b) {
        this.getHolderElement = function () {
          var a = this._.holder; if (!a) {
            if (this.isFramed) {
              var a = this.document.getById(this.id + '_frame'); let b = a.getParent(); var a = a.getFrameDocument(); CKEDITOR.env.iOS && b.setStyles({ overflow: 'scroll', '-webkit-overflow-scrolling': 'touch' }); b = CKEDITOR.tools.addFunction(CKEDITOR.tools.bind(function () { this.isLoaded = !0; if (this.onLoad) this.onLoad() }, this)); a.write(h.output(CKEDITOR.tools.extend({
                css: CKEDITOR.tools.buildStyleHtml(this.css),
                onload: 'window.parent.CKEDITOR.tools.callFunction(' +
b + ');'
              }, d))); a.getWindow().$.CKEDITOR = CKEDITOR; a.on('keydown', function (a) { const b = a.data.getKeystroke(); const c = this.document.getById(this.id).getAttribute('dir'); this._.onKeyDown && !1 === this._.onKeyDown(b) ? a.data.preventDefault() : (b == 27 || b == (c == 'rtl' ? 39 : 37)) && this.onEscape && !1 === this.onEscape(b) && a.data.preventDefault() }, this); a = a.getBody(); a.unselectable(); CKEDITOR.env.air && CKEDITOR.tools.callFunction(b)
            } else a = this.document.getById(this.id); this._.holder = a
          } return a
        }; var d = {
          editorId: a.id,
          id: this.id,
          langCode: a.langCode,
          dir: a.lang.dir,
          cls: this.className,
          frame: '',
          env: CKEDITOR.env.cssClass,
          'z-index': a.config.baseFloatZIndex + 1
        }; if (this.isFramed) { var e = CKEDITOR.env.air ? 'javascript:void(0)' : CKEDITOR.env.ie ? 'javascript:void(function(){' + encodeURIComponent('document.open();(' + CKEDITOR.tools.fixDomain + ')();document.close();') + '}())' : ''; d.frame = g.output({ id: this.id + '_frame', src: e }) }e = f.output(d); b && b.push(e); return e
      },
      addBlock: function (a, b) {
        b = this._.blocks[a] = b instanceof CKEDITOR.ui.panel.block
          ? b
          : new CKEDITOR.ui.panel.block(this.getHolderElement(),
            b); this._.currentBlock || this.showBlock(a); return b
      },
      getBlock: function (a) { return this._.blocks[a] },
      showBlock: function (a) { a = this._.blocks[a]; const b = this._.currentBlock; const d = !this.forceIFrame || CKEDITOR.env.ie ? this._.holder : this.document.getById(this.id + '_frame'); b && b.hide(); this._.currentBlock = a; CKEDITOR.fire('ariaWidget', d); a._.focusIndex = -1; this._.onKeyDown = a.onKeyDown && CKEDITOR.tools.bind(a.onKeyDown, a); a.show(); return a },
      destroy: function () { this.element && this.element.remove() }
    }; CKEDITOR.ui.panel.block =
CKEDITOR.tools.createClass({
  $: function (a, b) { this.element = a.append(a.getDocument().createElement('div', { attributes: { tabindex: -1, class: 'cke_panel_block' }, styles: { display: 'none' } })); b && CKEDITOR.tools.extend(this, b); this.element.setAttributes({ role: this.attributes.role || 'presentation', 'aria-label': this.attributes['aria-label'], title: this.attributes.title || this.attributes['aria-label'] }); this.keys = {}; this._.focusIndex = -1; this.element.disableContextMenu() },
  _: {
    markItem: function (a) {
      a != -1 && (a = this.element.getElementsByTag('a').getItem(this._.focusIndex =
a), CKEDITOR.env.webkit && a.getDocument().getWindow().focus(), a.focus(), this.onMark && this.onMark(a))
    }
  },
  proto: {
    show: function () { this.element.setStyle('display', '') },
    hide: function () { this.onHide && !0 === this.onHide.call(this) || this.element.setStyle('display', 'none') },
    onKeyDown: function (a, b) {
      var d = this.keys[a]; switch (d) {
        case 'next':for (var e = this._.focusIndex, d = this.element.getElementsByTag('a'), c; c = d.getItem(++e);) if (c.getAttribute('_cke_focus') && c.$.offsetWidth) { this._.focusIndex = e; c.focus(); break } return c ||
b
          ? !1
          : (this._.focusIndex = -1, this.onKeyDown(a, 1)); case 'prev':e = this._.focusIndex; for (d = this.element.getElementsByTag('a'); e > 0 && (c = d.getItem(--e));) { if (c.getAttribute('_cke_focus') && c.$.offsetWidth) { this._.focusIndex = e; c.focus(); break }c = null } return c || b ? !1 : (this._.focusIndex = d.count(), this.onKeyDown(a, 1)); case 'click':case 'mouseup':return e = this._.focusIndex, (c = e >= 0 && this.element.getElementsByTag('a').getItem(e)) && (c.$[d] ? c.$[d]() : c.$['on' + d]()), !1
      } return !0
    }
  }
})
  })(); CKEDITOR.plugins.add('floatpanel', { requires: 'panel' });
  (function () {
    function v (a, b, c, l, h) { h = CKEDITOR.tools.genKey(b.getUniqueId(), c.getUniqueId(), a.lang.dir, a.uiColor || '', l.css || '', h || ''); let g = f[h]; g || (g = f[h] = new CKEDITOR.ui.panel(b, l), g.element = c.append(CKEDITOR.dom.element.createFromHtml(g.render(a), b)), g.element.setStyles({ display: 'none', position: 'absolute' })); return g } var f = {}; CKEDITOR.ui.floatPanel = CKEDITOR.tools.createClass({
      $: function (a, b, c, l) {
        function h () { e.hide() }c.forceIFrame = 1; c.toolbarRelated && a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE &&
(b = CKEDITOR.document.getById('cke_' + a.name)); const g = b.getDocument(); l = v(a, g, b, c, l || 0); const m = l.element; const p = m.getFirst(); var e = this; m.disableContextMenu(); this.element = m; this._ = { editor: a, panel: l, parentElement: b, definition: c, document: g, iframe: p, children: [], dir: a.lang.dir, showBlockParams: null }; a.on('mode', h); a.on('resize', h); g.getWindow().on('resize', function () { this.reposition() }, this)
      },
      proto: {
        addBlock: function (a, b) { return this._.panel.addBlock(a, b) },
        addListBlock: function (a, b) {
          return this._.panel.addListBlock(a,
            b)
        },
        getBlock: function (a) { return this._.panel.getBlock(a) },
        showBlock: function (a, b, c, l, h, g) {
          const m = this._.panel; const p = m.showBlock(a); this._.showBlockParams = [].slice.call(arguments); this.allowBlur(!1); var e = this._.editor.editable(); this._.returnFocus = e.hasFocus ? e : new CKEDITOR.dom.element(CKEDITOR.document.$.activeElement); this._.hideTimeout = 0; const k = this.element; var e = this._.iframe; var e = CKEDITOR.env.ie && !CKEDITOR.env.edge ? e : new CKEDITOR.dom.window(e.$.contentWindow); var f = k.getDocument(); const r = this._.parentElement.getPositionedAncestor()
          const t = b.getDocumentPosition(f); var f = r ? r.getDocumentPosition(f) : { x: 0, y: 0 }; const q = this._.dir == 'rtl'; let d = t.x + (l || 0) - f.x; let n = t.y + (h || 0) - f.y; !q || c != 1 && c != 4 ? q || c != 2 && c != 3 || (d += b.$.offsetWidth - 1) : d += b.$.offsetWidth; if (c == 3 || c == 4)n += b.$.offsetHeight - 1; this._.panel._.offsetParentId = b.getId(); k.setStyles({ top: n + 'px', left: 0, display: '' }); k.setOpacity(0); k.getFirst().removeStyle('width'); this._.editor.focusManager.add(e); this._.blurSet || (CKEDITOR.event.useCapture = !0, e.on('blur', function (a) {
            function u () {
              delete this._.returnFocus
              this.hide()
            } this.allowBlur() && a.data.getPhase() == CKEDITOR.EVENT_PHASE_AT_TARGET && this.visible && !this._.activeChild && (CKEDITOR.env.iOS ? this._.hideTimeout || (this._.hideTimeout = CKEDITOR.tools.setTimeout(u, 0, this)) : u.call(this))
          }, this), e.on('focus', function () { this._.focused = !0; this.hideChild(); this.allowBlur(!0) }, this), CKEDITOR.env.iOS && (e.on('touchstart', function () { clearTimeout(this._.hideTimeout) }, this), e.on('touchend', function () { this._.hideTimeout = 0; this.focus() }, this)), CKEDITOR.event.useCapture = !1,
          this._.blurSet = 1); m.onEscape = CKEDITOR.tools.bind(function (a) { if (this.onEscape && !1 === this.onEscape(a)) return !1 }, this); CKEDITOR.tools.setTimeout(function () {
            const a = CKEDITOR.tools.bind(function () {
              var a = k; a.removeStyle('width'); if (p.autoSize) {
                var b = p.element.getDocument(); var b = (CKEDITOR.env.webkit || CKEDITOR.env.edge ? p.element : b.getBody()).$.scrollWidth; CKEDITOR.env.ie && CKEDITOR.env.quirks && b > 0 && (b += (a.$.offsetWidth || 0) - (a.$.clientWidth || 0) + 3); a.setStyle('width', b + 10 + 'px'); b = p.element.$.scrollHeight; CKEDITOR.env.ie &&
CKEDITOR.env.quirks && b > 0 && (b += (a.$.offsetHeight || 0) - (a.$.clientHeight || 0) + 3); a.setStyle('height', b + 'px'); m._.currentBlock.element.setStyle('display', 'none').removeStyle('display')
              } else a.removeStyle('height'); q && (d -= k.$.offsetWidth); k.setStyle('left', d + 'px'); var b = m.element.getWindow(); var a = k.$.getBoundingClientRect(); var b = b.getViewPaneSize(); let c = a.width || a.right - a.left; const e = a.height || a.bottom - a.top; const l = q ? a.right : b.width - a.left; const h = q ? b.width - a.right : a.left; q
                ? l < c && (d = h > c ? d + c : b.width > c ? d - a.left : d - a.right + b.width)
                : l < c && (d = h > c ? d - c : b.width > c ? d - a.right + b.width : d - a.left); c = a.top; b.height - a.top < e && (n = c > e ? n - e : b.height > e ? n - a.bottom + b.height : n - a.top); CKEDITOR.env.ie && (b = a = new CKEDITOR.dom.element(k.$.offsetParent), b.getName() == 'html' && (b = b.getDocument().getBody()), b.getComputedStyle('direction') == 'rtl' && (d = CKEDITOR.env.ie8Compat ? d - 2 * k.getDocument().getDocumentElement().$.scrollLeft : d - (a.$.scrollWidth - a.$.clientWidth))); var a = k.getFirst(); let f; (f = a.getCustomData('activePanel')) && f.onHide && f.onHide.call(this, 1); a.setCustomData('activePanel',
                this); k.setStyles({ top: n + 'px', left: d + 'px' }); k.setOpacity(1); g && g()
            }, this); m.isLoaded ? a() : m.onLoad = a; CKEDITOR.tools.setTimeout(function () { const a = CKEDITOR.env.webkit && CKEDITOR.document.getWindow().getScrollPosition().y; this.focus(); p.element.focus(); CKEDITOR.env.webkit && (CKEDITOR.document.getBody().$.scrollTop = a); this.allowBlur(!0); this._.editor.fire('panelShow', this) }, 0, this)
          }, CKEDITOR.env.air ? 200 : 0, this); this.visible = 1; this.onShow && this.onShow.call(this)
        },
        reposition: function () {
          const a = this._.showBlockParams
          this.visible && this._.showBlockParams && (this.hide(), this.showBlock.apply(this, a))
        },
        focus: function () { if (CKEDITOR.env.webkit) { const a = CKEDITOR.document.getActive(); a && !a.equals(this._.iframe) && a.$.blur() }(this._.lastFocused || this._.iframe.getFrameDocument().getWindow()).focus() },
        blur: function () { const a = this._.iframe.getFrameDocument().getActive(); a && a.is('a') && (this._.lastFocused = a) },
        hide: function (a) {
          if (this.visible && (!this.onHide || !0 !== this.onHide.call(this))) {
            this.hideChild(); CKEDITOR.env.gecko && this._.iframe.getFrameDocument().$.activeElement.blur()
            this.element.setStyle('display', 'none'); this.visible = 0; this.element.getFirst().removeCustomData('activePanel'); if (a = a && this._.returnFocus)CKEDITOR.env.webkit && a.type && a.getWindow().$.focus(), a.focus(); delete this._.lastFocused; this._.showBlockParams = null; this._.editor.fire('panelHide', this)
          }
        },
        allowBlur: function (a) { const b = this._.panel; void 0 !== a && (b.allowBlur = a); return b.allowBlur },
        showAsChild: function (a, b, c, f, h, g) {
          if (this._.activeChild != a || a._.panel._.offsetParentId != c.getId()) {
            this.hideChild(), a.onHide =
CKEDITOR.tools.bind(function () { CKEDITOR.tools.setTimeout(function () { this._.focused || this.hide() }, 0, this) }, this), this._.activeChild = a, this._.focused = !1, a.showBlock(b, c, f, h, g), this.blur(), (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) && setTimeout(function () { a.element.getChild(0).$.style.cssText += '' }, 100)
          }
        },
        hideChild: function (a) { const b = this._.activeChild; b && (delete b.onHide, delete this._.activeChild, b.hide(), a && this.focus()) }
      }
    }); CKEDITOR.on('instanceDestroyed', function () {
      const a = CKEDITOR.tools.isEmpty(CKEDITOR.instances)
      let b; for (b in f) { const c = f[b]; a ? c.destroy() : c.element.hide() }a && (f = {})
    })
  })(); CKEDITOR.plugins.add('colorbutton', {
    requires: 'panelbutton,floatpanel',
    init: function (d) {
      function r (a, c, e, g, k) {
        const n = new CKEDITOR.style(l['colorButton_' + c + 'Style']); const m = CKEDITOR.tools.getNextId() + '_colorBox'; k = k || {}; d.ui.add(a, CKEDITOR.UI_PANELBUTTON, {
          label: e,
          title: e,
          modes: { wysiwyg: 1 },
          editorFocus: 0,
          toolbar: 'colors,' + g,
          allowedContent: n,
          requiredContent: n,
          contentTransformations: k.contentTransformations,
          panel: { css: CKEDITOR.skin.getPath('editor'), attributes: { role: 'listbox', 'aria-label': h.panelTitle } },
          onBlock: function (a,
            b) { b.autoSize = !0; b.element.addClass('cke_colorblock'); b.element.setHtml(w(a, c, m)); b.element.getDocument().getBody().setStyle('overflow', 'hidden'); CKEDITOR.ui.fire('ready', this); const f = b.keys; const e = d.lang.dir == 'rtl'; f[e ? 37 : 39] = 'next'; f[40] = 'next'; f[9] = 'next'; f[e ? 39 : 37] = 'prev'; f[38] = 'prev'; f[CKEDITOR.SHIFT + 9] = 'prev'; f[32] = 'click' },
          refresh: function () { d.activeFilter.check(n) || this.setState(CKEDITOR.TRISTATE_DISABLED) },
          onOpen: function () {
            var a = d.getSelection(); var a = a && a.getStartElement(); var a = d.elementPath(a); let b; if (a) {
              a =
a.block || a.blockLimit || d.document.getBody(); do b = a && a.getComputedStyle(c == 'back' ? 'background-color' : 'color') || 'transparent'; while (c == 'back' && b == 'transparent' && a && (a = a.getParent())); b && b != 'transparent' || (b = '#ffffff'); !1 !== l.colorButton_enableAutomatic && this._.panel._.iframe.getFrameDocument().getById(m).setStyle('background-color', b); return b
            }
          }
        })
      } function w (a, c, e) {
        const g = []; const k = l.colorButton_colors.split(','); const n = d.plugins.colordialog && !1 !== l.colorButton_enableMore; const m = k.length + (n ? 2 : 1); const p = CKEDITOR.tools.addFunction(function (b,
          c) {
          function e (a) { this.removeListener('ok', e); this.removeListener('cancel', e); a.name == 'ok' && f(this.getContentElement('picker', 'selectedColor').getValue(), c) } var f = arguments.callee; if (b == '?')d.openDialog('colordialog', function () { this.on('ok', e); this.on('cancel', e) }); else {
            d.focus(); a.hide(); d.fire('saveSnapshot'); d.removeStyle(new CKEDITOR.style(l['colorButton_' + c + 'Style'], { color: 'inherit' })); if (b) {
              const g = l['colorButton_' + c + 'Style']; g.childRule = c == 'back'
                ? function (a) { return t(a) }
                : function (a) {
                  return !(a.is('a') ||
a.getElementsByTag('a').count()) || t(a)
                }; d.applyStyle(new CKEDITOR.style(g, { color: b }))
            }d.fire('saveSnapshot')
          }
        }); !1 !== l.colorButton_enableAutomatic && g.push('\x3ca class\x3d"cke_colorauto" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"', h.auto, '" onclick\x3d"CKEDITOR.tools.callFunction(', p, ",null,'", c, "');return false;\" href\x3d\"javascript:void('", h.auto, '\')" role\x3d"option" aria-posinset\x3d"1" aria-setsize\x3d"', m, '"\x3e\x3ctable role\x3d"presentation" cellspacing\x3d0 cellpadding\x3d0 width\x3d"100%"\x3e\x3ctr\x3e\x3ctd\x3e\x3cspan class\x3d"cke_colorbox" id\x3d"',
          e, '"\x3e\x3c/span\x3e\x3c/td\x3e\x3ctd colspan\x3d7 align\x3dcenter\x3e', h.auto, '\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/a\x3e'); g.push('\x3ctable role\x3d"presentation" cellspacing\x3d0 cellpadding\x3d0 width\x3d"100%"\x3e'); for (e = 0; e < k.length; e++) {
          e % 8 === 0 && g.push('\x3c/tr\x3e\x3ctr\x3e'); let b = k[e].split('/'); let f = b[0]; const q = b[1] || f; b[1] || (f = '#' + f.replace(/^(.)(.)(.)$/, '$1$1$2$2$3$3')); b = d.lang.colorbutton.colors[q] || q; g.push('\x3ctd\x3e\x3ca class\x3d"cke_colorbox" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"',
            b, '" onclick\x3d"CKEDITOR.tools.callFunction(', p, ",'", f, "','", c, "'); return false;\" href\x3d\"javascript:void('", b, '\')" role\x3d"option" aria-posinset\x3d"', e + 2, '" aria-setsize\x3d"', m, '"\x3e\x3cspan class\x3d"cke_colorbox" style\x3d"background-color:#', q, '"\x3e\x3c/span\x3e\x3c/a\x3e\x3c/td\x3e')
        }n && g.push('\x3c/tr\x3e\x3ctr\x3e\x3ctd colspan\x3d8 align\x3dcenter\x3e\x3ca class\x3d"cke_colormore" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"', h.more, '" onclick\x3d"CKEDITOR.tools.callFunction(',
          p, ",'?','", c, "');return false;\" href\x3d\"javascript:void('", h.more, "')\"", ' role\x3d"option" aria-posinset\x3d"', m, '" aria-setsize\x3d"', m, '"\x3e', h.more, '\x3c/a\x3e\x3c/td\x3e'); g.push('\x3c/tr\x3e\x3c/table\x3e'); return g.join('')
      } function t (a) { return a.getAttribute('contentEditable') == 'false' || a.getAttribute('data-nostyle') } var l = d.config; var h = d.lang.colorbutton; if (!CKEDITOR.env.hc) {
        r('TextColor', 'fore', h.textColorTitle, 10, {
          contentTransformations: [[{
            element: 'font',
            check: 'span{color}',
            left: function (a) { return !!a.attributes.color },
            right: function (a) { a.name = 'span'; a.attributes.color && (a.styles.color = a.attributes.color); delete a.attributes.color }
          }]]
        }); const u = {}; const v = d.config.colorButton_normalizeBackground; if (void 0 === v || v) {
          u.contentTransformations = [[{
            element: 'span',
            left: function (a) { const c = CKEDITOR.tools; if (a.name != 'span' || !a.styles || !a.styles.background) return !1; a = c.style.parse.background(a.styles.background); return a.color && c.objectKeys(a).length === 1 },
            right: function (a) {
              const c = (new CKEDITOR.style(d.config.colorButton_backStyle, { color: a.styles.background })).getDefinition()
              a.name = c.element; a.styles = c.styles; a.attributes = c.attributes || {}; return a
            }
          }]]
        }r('BGColor', 'back', h.bgColorTitle, 20, u)
      }
    }
  }); CKEDITOR.config.colorButton_colors = '000,800000,8B4513,2F4F4F,008080,000080,4B0082,696969,B22222,A52A2A,DAA520,006400,40E0D0,0000CD,800080,808080,F00,FF8C00,FFD700,008000,0FF,00F,EE82EE,A9A9A9,FFA07A,FFA500,FFFF00,00FF00,AFEEEE,ADD8E6,DDA0DD,D3D3D3,FFF0F5,FAEBD7,FFFFE0,F0FFF0,F0FFFF,F0F8FF,E6E6FA,FFF'
  CKEDITOR.config.colorButton_foreStyle = { element: 'span', styles: { color: '#(color)' }, overrides: [{ element: 'font', attributes: { color: null } }] }; CKEDITOR.config.colorButton_backStyle = { element: 'span', styles: { 'background-color': '#(color)' } }; CKEDITOR.plugins.colordialog = {
    requires: 'dialog',
    init: function (b) {
      const c = new CKEDITOR.dialogCommand('colordialog'); c.editorFocus = !1; b.addCommand('colordialog', c); CKEDITOR.dialog.add('colordialog', this.path + 'dialogs/colordialog.js'); b.getColorFromDialog = function (c, f) {
        var d = function (a) { this.removeListener('ok', d); this.removeListener('cancel', d); a = a.name == 'ok' ? this.getValueOf('picker', 'selectedColor') : null; c.call(f, a) }; const e = function (a) { a.on('ok', d); a.on('cancel', d) }; b.execCommand('colordialog'); if (b._.storedDialogs &&
b._.storedDialogs.colordialog)e(b._.storedDialogs.colordialog); else CKEDITOR.on('dialogDefinition', function (a) { if (a.data.name == 'colordialog') { const b = a.data.definition; a.removeListener(); b.onLoad = CKEDITOR.tools.override(b.onLoad, function (a) { return function () { e(this); b.onLoad = a; typeof a === 'function' && a.call(this) } }) } })
      }
    }
  }; CKEDITOR.plugins.add('colordialog', CKEDITOR.plugins.colordialog); (function () {
    CKEDITOR.plugins.add('templates', { requires: 'dialog', init: function (a) { CKEDITOR.dialog.add('templates', CKEDITOR.getUrl(this.path + 'dialogs/templates.js')); a.addCommand('templates', new CKEDITOR.dialogCommand('templates')); a.ui.addButton && a.ui.addButton('Templates', { label: a.lang.templates.button, command: 'templates', toolbar: 'doctools,10' }) } }); const c = {}; const f = {}; CKEDITOR.addTemplates = function (a, d) { c[a] = d }; CKEDITOR.getTemplates = function (a) { return c[a] }; CKEDITOR.loadTemplates = function (a, d) {
      for (var e =
[], b = 0, c = a.length; b < c; b++)f[a[b]] || (e.push(a[b]), f[a[b]] = 1); e.length ? CKEDITOR.scriptLoader.load(e, d) : setTimeout(d, 0)
    }
  })(); CKEDITOR.config.templates_files = [CKEDITOR.getUrl('plugins/templates/templates/default.js')]; CKEDITOR.config.templates_replaceContent = !0; CKEDITOR.plugins.add('menu', { requires: 'floatpanel', beforeInit: function (l) { for (var h = l.config.menu_groups.split(','), r = l._.menuGroups = {}, t = l._.menuItems = {}, n = 0; n < h.length; n++)r[h[n]] = n + 1; l.addMenuGroup = function (a, b) { r[a] = b || 100 }; l.addMenuItem = function (a, b) { r[b.group] && (t[a] = new CKEDITOR.menuItem(this, a, b)) }; l.addMenuItems = function (a) { for (const b in a) this.addMenuItem(b, a[b]) }; l.getMenuItem = function (a) { return t[a] }; l.removeMenuItem = function (a) { delete t[a] } } });
  (function () {
    function l (a) { a.sort(function (a, d) { return a.group < d.group ? -1 : a.group > d.group ? 1 : a.order < d.order ? -1 : a.order > d.order ? 1 : 0 }) } var h = '\x3cspan class\x3d"cke_menuitem"\x3e\x3ca id\x3d"{id}" class\x3d"cke_menubutton cke_menubutton__{name} cke_menubutton_{state} {cls}" href\x3d"{href}" title\x3d"{title}" tabindex\x3d"-1" _cke_focus\x3d1 hidefocus\x3d"true" role\x3d"{role}" aria-label\x3d"{label}" aria-describedby\x3d"{id}_description" aria-haspopup\x3d"{hasPopup}" aria-disabled\x3d"{disabled}" {ariaChecked}'
    CKEDITOR.env.gecko && CKEDITOR.env.mac && (h += ' onkeypress\x3d"return false;"'); CKEDITOR.env.gecko && (h += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"'); var h = h + (' onmouseover\x3d"CKEDITOR.tools.callFunction({hoverFn},{index});" onmouseout\x3d"CKEDITOR.tools.callFunction({moveOutFn},{index});" ' + (CKEDITOR.env.ie ? 'onclick\x3d"return false;" onmouseup' : 'onclick') + '\x3d"CKEDITOR.tools.callFunction({clickFn},{index}); return false;"\x3e'); const r = CKEDITOR.addTemplate('menuItem', h + '\x3cspan class\x3d"cke_menubutton_inner"\x3e\x3cspan class\x3d"cke_menubutton_icon"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{iconStyle}"\x3e\x3c/span\x3e\x3c/span\x3e\x3cspan class\x3d"cke_menubutton_label"\x3e{label}\x3c/span\x3e{shortcutHtml}{arrowHtml}\x3c/span\x3e\x3c/a\x3e\x3cspan id\x3d"{id}_description" class\x3d"cke_voice_label" aria-hidden\x3d"false"\x3e{ariaShortcut}\x3c/span\x3e\x3c/span\x3e')
    const t = CKEDITOR.addTemplate('menuArrow', '\x3cspan class\x3d"cke_menuarrow"\x3e\x3cspan\x3e{label}\x3c/span\x3e\x3c/span\x3e'); const n = CKEDITOR.addTemplate('menuShortcut', '\x3cspan class\x3d"cke_menubutton_label cke_menubutton_shortcut"\x3e{shortcut}\x3c/span\x3e'); CKEDITOR.menu = CKEDITOR.tools.createClass({
      $: function (a, b) {
        b = this._.definition = b || {}; this.id = CKEDITOR.tools.getNextId(); this.editor = a; this.items = []; this._.listeners = []; this._.level = b.level || 1; const d = CKEDITOR.tools.extend({}, b.panel, {
          css: [CKEDITOR.skin.getPath('editor')],
          level: this._.level - 1,
          block: {}
        }); const m = d.block.attributes = d.attributes || {}; !m.role && (m.role = 'menu'); this._.panelDefinition = d
      },
      _: {
        onShow: function () { const a = this.editor.getSelection(); const b = a && a.getStartElement(); const d = this.editor.elementPath(); const m = this._.listeners; this.removeAll(); for (let g = 0; g < m.length; g++) { const k = m[g](b, a, d); if (k) for (const e in k) { const f = this.editor.getMenuItem(e); !f || f.command && !this.editor.getCommand(f.command).state || (f.state = k[e], this.add(f)) } } },
        onClick: function (a) {
          this.hide(); if (a.onClick)a.onClick()
          else a.command && this.editor.execCommand(a.command)
        },
        onEscape: function (a) { const b = this.parent; b ? b._.panel.hideChild(1) : a == 27 && this.hide(1); return !1 },
        onHide: function () { this.onHide && this.onHide() },
        showSubMenu: function (a) {
          let b = this._.subMenu; let d = this.items[a]; if (d = d.getItems && d.getItems()) {
            b ? b.removeAll() : (b = this._.subMenu = new CKEDITOR.menu(this.editor, CKEDITOR.tools.extend({}, this._.definition, { level: this._.level + 1 }, !0)), b.parent = this, b._.onClick = CKEDITOR.tools.bind(this._.onClick, this)); for (const m in d) {
              const g =
this.editor.getMenuItem(m); g && (g.state = d[m], b.add(g))
            } const k = this._.panel.getBlock(this.id).element.getDocument().getById(this.id + String(a)); setTimeout(function () { b.show(k, 2) }, 0)
          } else this._.panel.hideChild(1)
        }
      },
      proto: {
        add: function (a) { a.order || (a.order = this.items.length); this.items.push(a) },
        removeAll: function () { this.items = [] },
        show: function (a, b, d, m) {
          if (!this.parent && (this._.onShow(), !this.items.length)) return; b = b || (this.editor.lang.dir == 'rtl' ? 2 : 1); const g = this.items; const k = this.editor; let e = this._.panel; let f = this._.element
          if (!e) {
            e = this._.panel = new CKEDITOR.ui.floatPanel(this.editor, CKEDITOR.document.getBody(), this._.panelDefinition, this._.level); e.onEscape = CKEDITOR.tools.bind(function (a) { if (!1 === this._.onEscape(a)) return !1 }, this); e.onShow = function () { e._.panel.getHolderElement().getParent().addClass('cke').addClass('cke_reset_all') }; e.onHide = CKEDITOR.tools.bind(function () { this._.onHide && this._.onHide() }, this); f = e.addBlock(this.id, this._.panelDefinition.block); f.autoSize = !0; var c = f.keys; c[40] = 'next'; c[9] = 'next'; c[38] =
'prev'; c[CKEDITOR.SHIFT + 9] = 'prev'; c[k.lang.dir == 'rtl' ? 37 : 39] = CKEDITOR.env.ie ? 'mouseup' : 'click'; c[32] = CKEDITOR.env.ie ? 'mouseup' : 'click'; CKEDITOR.env.ie && (c[13] = 'mouseup'); f = this._.element = f.element; c = f.getDocument(); c.getBody().setStyle('overflow', 'hidden'); c.getElementsByTag('html').getItem(0).setStyle('overflow', 'hidden'); this._.itemOverFn = CKEDITOR.tools.addFunction(function (a) {
              clearTimeout(this._.showSubTimeout); this._.showSubTimeout = CKEDITOR.tools.setTimeout(this._.showSubMenu, k.config.menu_subMenuDelay ||
400, this, [a])
            }, this); this._.itemOutFn = CKEDITOR.tools.addFunction(function () { clearTimeout(this._.showSubTimeout) }, this); this._.itemClickFn = CKEDITOR.tools.addFunction(function (a) { const b = this.items[a]; if (b.state == CKEDITOR.TRISTATE_DISABLED) this.hide(1); else if (b.getItems) this._.showSubMenu(a); else this._.onClick(b) }, this)
          }l(g); for (var c = k.elementPath(), c = ['\x3cdiv class\x3d"cke_menu' + (c && c.direction() != k.lang.dir ? ' cke_mixed_dir_content' : '') + '" role\x3d"presentation"\x3e'], h = g.length, n = h && g[0].group,
            q = 0; q < h; q++) { const p = g[q]; n != p.group && (c.push('\x3cdiv class\x3d"cke_menuseparator" role\x3d"separator"\x3e\x3c/div\x3e'), n = p.group); p.render(this, q, c) }c.push('\x3c/div\x3e'); f.setHtml(c.join('')); CKEDITOR.ui.fire('ready', this); this.parent ? this.parent._.panel.showAsChild(e, this.id, a, b, d, m) : e.showBlock(this.id, a, b, d, m); k.fire('menuShow', [e])
        },
        addListener: function (a) { this._.listeners.push(a) },
        hide: function (a) { this._.onHide && this._.onHide(); this._.panel && this._.panel.hide(a) }
      }
    }); CKEDITOR.menuItem = CKEDITOR.tools.createClass({
      $: function (a,
        b, d) { CKEDITOR.tools.extend(this, d, { order: 0, className: 'cke_menubutton__' + b }); this.group = a._.menuGroups[this.group]; this.editor = a; this.name = b },
      proto: {
        render: function (a, b, d) {
          const h = a.id + String(b); const g = typeof this.state === 'undefined' ? CKEDITOR.TRISTATE_OFF : this.state; let k = ''; const e = this.editor; let f; let c; const l = g == CKEDITOR.TRISTATE_ON ? 'on' : g == CKEDITOR.TRISTATE_DISABLED ? 'disabled' : 'off'; this.role in { menuitemcheckbox: 1, menuitemradio: 1 } && (k = ' aria-checked\x3d"' + (g == CKEDITOR.TRISTATE_ON ? 'true' : 'false') + '"'); const u = this.getItems; const q =
'\x26#' + (this.editor.lang.dir == 'rtl' ? '9668' : '9658') + ';'; let p = this.name; this.icon && !/\./.test(this.icon) && (p = this.icon); this.command && (f = e.getCommand(this.command), (f = e.getCommandKeystroke(f)) && (c = CKEDITOR.tools.keystrokeToString(e.lang.common.keyboard, f))); a = {
            id: h,
            name: this.name,
            iconName: p,
            label: this.label,
            cls: this.className || '',
            state: l,
            hasPopup: u ? 'true' : 'false',
            disabled: g == CKEDITOR.TRISTATE_DISABLED,
            title: this.label + (c ? ' (' + c.display + ')' : ''),
            ariaShortcut: c
              ? e.lang.common.keyboardShortcut + ' ' + c.aria
              : '',
            href: "javascript:void('" + (this.label || '').replace("'") + "')",
            hoverFn: a._.itemOverFn,
            moveOutFn: a._.itemOutFn,
            clickFn: a._.itemClickFn,
            index: b,
            iconStyle: CKEDITOR.skin.getIconStyle(p, this.editor.lang.dir == 'rtl', p == this.icon ? null : this.icon, this.iconOffset),
            shortcutHtml: c ? n.output({ shortcut: c.display }) : '',
            arrowHtml: u ? t.output({ label: q }) : '',
            role: this.role ? this.role : 'menuitem',
            ariaChecked: k
          }; r.output(a, d)
        }
      }
    })
  })(); CKEDITOR.config.menu_groups = 'clipboard,form,tablecell,tablecellproperties,tablerow,tablecolumn,table,anchor,link,image,flash,checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,div'; CKEDITOR.plugins.add('contextmenu', {
    requires: 'menu',
    onLoad: function () {
      CKEDITOR.plugins.contextMenu = CKEDITOR.tools.createClass({
        base: CKEDITOR.menu,
        $: function (a) { this.base.call(this, a, { panel: { className: 'cke_menu_panel', attributes: { 'aria-label': a.lang.contextmenu.options } } }) },
        proto: {
          addTarget: function (a, e) {
            a.on('contextmenu', function (a) {
              a = a.data; var c = CKEDITOR.env.webkit ? f : CKEDITOR.env.mac ? a.$.metaKey : a.$.ctrlKey; if (!e || !c) {
                a.preventDefault(); if (CKEDITOR.env.mac && CKEDITOR.env.webkit) {
                  var c = this.editor
                  var b = (new CKEDITOR.dom.elementPath(a.getTarget(), c.editable())).contains(function (a) { return a.hasAttribute('contenteditable') }, !0); b && b.getAttribute('contenteditable') == 'false' && c.getSelection().fake(b)
                } var b = a.getTarget().getDocument(); const d = a.getTarget().getDocument().getDocumentElement(); var c = !b.equals(CKEDITOR.document); var b = b.getWindow().getScrollPosition(); const g = c ? a.$.clientX : a.$.pageX || b.x + a.$.clientX; const h = c ? a.$.clientY : a.$.pageY || b.y + a.$.clientY; CKEDITOR.tools.setTimeout(function () { this.open(d, null, g, h) }, CKEDITOR.env.ie
                  ? 200
                  : 0, this)
              }
            }, this); if (CKEDITOR.env.webkit) { var f; const d = function () { f = 0 }; a.on('keydown', function (a) { f = CKEDITOR.env.mac ? a.data.$.metaKey : a.data.$.ctrlKey }); a.on('keyup', d); a.on('contextmenu', d) }
          },
          open: function (a, e, f, d) { this.editor.focus(); a = a || CKEDITOR.document.getDocumentElement(); this.editor.selectionChange(1); this.show(a, e, f, d) }
        }
      })
    },
    beforeInit: function (a) {
      const e = a.contextMenu = new CKEDITOR.plugins.contextMenu(a); a.on('contentDom', function () { e.addTarget(a.editable(), !1 !== a.config.browserContextMenuOnCtrl) })
      a.addCommand('contextMenu', { exec: function () { a.contextMenu.open(a.document.getBody()) } }); a.setKeystroke(CKEDITOR.SHIFT + 121, 'contextMenu'); a.setKeystroke(CKEDITOR.CTRL + CKEDITOR.SHIFT + 121, 'contextMenu')
    }
  }); (function () {
    function q (a) { const b = (a = a.data) && a.$; return a && b ? CKEDITOR.env.ie && CKEDITOR.env.version < 9 ? b.button === 1 : b.button === 0 : !1 } function k (a, b, e, d) { const c = new CKEDITOR.dom.walker(a); if (a = a.startContainer.getAscendant(b, !0) || a.endContainer.getAscendant(b, !0)) if (e(a), d) return; for (;a = c.next();) if (a = a.getAscendant(b, !0)) if (e(a), d) break } function t (a, b) { const e = { ul: 'ol', ol: 'ul' }; return m(b, function (b) { return b.element === a || b.element === e[a] }) !== -1 } function l (a) {
      this.styles = null; this.sticky = !1; this.editor = a
      this.filter = new CKEDITOR.filter(a.config.copyFormatting_allowRules); !0 === a.config.copyFormatting_allowRules && (this.filter.disabled = !0); a.config.copyFormatting_disallowRules && this.filter.disallow(a.config.copyFormatting_disallowRules)
    } var m = CKEDITOR.tools.indexOf; let r = !1; CKEDITOR.plugins.add('copyformatting', {
      lang: 'en',
      icons: 'copyformatting',
      hidpi: !0,
      init: function (a) {
        const b = CKEDITOR.plugins.copyformatting; b._addScreenReaderContainer(); r || (CKEDITOR.document.appendStyleSheet(this.path + 'styles/copyformatting.css'),
        r = !0); a.addContentsCss && a.addContentsCss(this.path + 'styles/copyformatting.css'); a.copyFormatting = new b.state(a); a.addCommand('copyFormatting', b.commands.copyFormatting); a.addCommand('applyFormatting', b.commands.applyFormatting); a.ui.addButton('CopyFormatting', { label: a.lang.copyformatting.label, command: 'copyFormatting', toolbar: 'cleanup,0' }); a.on('contentDom', function () {
          const e = a.editable(); let b = e.isInline() ? e : a.document; const c = a.ui.get('CopyFormatting'); e.attachListener(b, 'mouseup', function (b) { q(b) && a.execCommand('applyFormatting') })
          e.attachListener(CKEDITOR.document, 'mouseup', function (b) { const d = a.getCommand('copyFormatting'); q(b) && d.state === CKEDITOR.TRISTATE_ON && !e.contains(b.data.getTarget()) && a.execCommand('copyFormatting') }); c && (b = CKEDITOR.document.getById(c._.id), e.attachListener(b, 'dblclick', function () { a.execCommand('copyFormatting', { sticky: !0 }) }), e.attachListener(b, 'mouseup', function (a) { a.data.stopPropagation() }))
        }); a.config.copyFormatting_keystrokeCopy && a.setKeystroke(a.config.copyFormatting_keystrokeCopy, 'copyFormatting')
        a.config.copyFormatting_keystrokePaste && a.setKeystroke(a.config.copyFormatting_keystrokePaste, 'applyFormatting'); a.on('key', function (b) { const d = a.getCommand('copyFormatting'); b = b.data.domEvent; b.getKeystroke && b.getKeystroke() === 27 && d.state === CKEDITOR.TRISTATE_ON && a.execCommand('copyFormatting') }); a.copyFormatting.on('extractFormatting', function (e) {
          let d = e.data.element; if (d.contains(a.editable()) || d.equals(a.editable())) return e.cancel(); d = b._convertElementToStyleDef(d); if (!a.copyFormatting.filter.check(new CKEDITOR.style(d),
            !0, !0)) return e.cancel(); e.data.styleDef = d
        }); a.copyFormatting.on('applyFormatting', function (e) {
          if (!e.data.preventFormatStripping) {
            const d = e.data.range; const c = b._extractStylesFromRange(a, d); let g = b._determineContext(d); let f; let h; if (a.copyFormatting._isContextAllowed(g)) {
              for (h = 0; h < c.length; h++) {
                g = c[h], f = d.createBookmark(), m(b.preservedElements, g.element) === -1
                  ? CKEDITOR.env.webkit && !CKEDITOR.env.chrome ? c[h].removeFromRange(e.data.range, e.editor) : c[h].remove(e.editor)
                  : t(g.element, e.data.styles) && b._removeStylesFromElementInRange(d,
                    g.element), d.moveToBookmark(f)
              }
            }
          }
        }); a.copyFormatting.on('applyFormatting', function (b) { const d = CKEDITOR.plugins.copyformatting; const c = d._determineContext(b.data.range); c === 'list' && a.copyFormatting._isContextAllowed('list') ? d._applyStylesToListContext(b.editor, b.data.range, b.data.styles) : c === 'table' && a.copyFormatting._isContextAllowed('table') ? d._applyStylesToTableContext(b.editor, b.data.range, b.data.styles) : a.copyFormatting._isContextAllowed('text') && d._applyStylesToTextContext(b.editor, b.data.range, b.data.styles) },
          null, null, 999)
      }
    }); l.prototype._isContextAllowed = function (a) { const b = this.editor.config.copyFormatting_allowedContexts; return !0 === b || m(b, a) !== -1 }; CKEDITOR.event.implementOn(l.prototype); CKEDITOR.plugins.copyformatting = {
      state: l,
      inlineBoundary: 'h1 h2 h3 h4 h5 h6 p div'.split(' '),
      excludedAttributes: ['id', 'style', 'href', 'data-cke-saved-href', 'dir'],
      elementsForInlineTransform: ['li'],
      excludedElementsFromInlineTransform: ['table', 'thead', 'tbody', 'ul', 'ol'],
      excludedAttributesFromInlineTransform: ['value', 'type'],
      preservedElements: 'ul ol li td th tr thead tbody table'.split(' '),
      breakOnElements: ['ul', 'ol', 'table'],
      commands: {
        copyFormatting: {
          exec: function (a, b) {
            const e = CKEDITOR.plugins.copyformatting; const d = a.copyFormatting; const c = b ? b.from == 'keystrokeHandler' : !1; const g = b ? b.sticky || c : !1; const f = e._getCursorContainer(a); const h = CKEDITOR.document.getDocumentElement(); if (this.state === CKEDITOR.TRISTATE_ON) {
              return d.styles = null, d.sticky = !1, f.removeClass('cke_copyformatting_active'), h.removeClass('cke_copyformatting_disabled'), h.removeClass('cke_copyformatting_tableresize_cursor'),
              e._putScreenReaderMessage(a, 'canceled'), this.setState(CKEDITOR.TRISTATE_OFF)
            } d.styles = e._extractStylesFromElement(a, a.elementPath().lastElement); this.setState(CKEDITOR.TRISTATE_ON); c || (f.addClass('cke_copyformatting_active'), h.addClass('cke_copyformatting_tableresize_cursor'), a.config.copyFormatting_outerCursor && h.addClass('cke_copyformatting_disabled')); d.sticky = g; e._putScreenReaderMessage(a, 'copied')
          }
        },
        applyFormatting: {
          exec: function (a, b) {
            const e = a.getCommand('copyFormatting'); let d = b
              ? b.from ==
'keystrokeHandler'
              : !1; const c = CKEDITOR.plugins.copyformatting; const g = a.copyFormatting; const f = c._getCursorContainer(a); const h = CKEDITOR.document.getDocumentElement(); if (d || e.state === CKEDITOR.TRISTATE_ON) {
              if (d && !g.styles) return c._putScreenReaderMessage(a, 'failed'); d = c._applyFormat(a, g.styles); g.sticky || (g.styles = null, f.removeClass('cke_copyformatting_active'), h.removeClass('cke_copyformatting_disabled'), h.removeClass('cke_copyformatting_tableresize_cursor'), e.setState(CKEDITOR.TRISTATE_OFF)); c._putScreenReaderMessage(a, d
                ? 'applied'
                : 'canceled')
            }
          }
        }
      },
      _getCursorContainer: function (a) { return a.elementMode === CKEDITOR.ELEMENT_MODE_INLINE ? a.editable() : a.editable().getParent() },
      _convertElementToStyleDef: function (a) { var b = CKEDITOR.tools; const e = a.getAttributes(CKEDITOR.plugins.copyformatting.excludedAttributes); var b = b.parseCssText(a.getAttribute('style'), !0, !0); return { element: a.getName(), type: CKEDITOR.STYLE_INLINE, attributes: e, styles: b } },
      _extractStylesFromElement: function (a, b) {
        const e = {}; const d = []; do {
          if (b.type === CKEDITOR.NODE_ELEMENT && !b.hasAttribute('data-cke-bookmark') &&
(e.element = b, a.copyFormatting.fire('extractFormatting', e, a) && e.styleDef && d.push(new CKEDITOR.style(e.styleDef)), b.getName && m(CKEDITOR.plugins.copyformatting.breakOnElements, b.getName()) !== -1)) break
        } while ((b = b.getParent()) && b.type === CKEDITOR.NODE_ELEMENT); return d
      },
      _extractStylesFromRange: function (a, b) { for (var e = [], d = new CKEDITOR.dom.walker(b), c; c = d.next();)e = e.concat(CKEDITOR.plugins.copyformatting._extractStylesFromElement(a, c)); return e },
      _removeStylesFromElementInRange: function (a, b) {
        for (var e = m(['ol', 'ul', 'table'], b) !==
-1, d = new CKEDITOR.dom.walker(a), c; c = d.next();) if (c = c.getAscendant(b, !0)) if (c.removeAttributes(c.getAttributes()), e) break
      },
      _getSelectedWordOffset: function (a) {
        function b (a, b) { return a[b ? 'getPrevious' : 'getNext'](function (a) { return a.type !== CKEDITOR.NODE_COMMENT }) } function e (a) { return a.type == CKEDITOR.NODE_ELEMENT ? (a = a.getHtml().replace(/<span.*?>&nbsp;<\/span>/g, ''), a.replace(/<.*?>/g, '')) : a.getText() } function d (a, c) {
          let f = a; let g = /\s/g; let h = 'p br ol ul li td th div caption body'.split(' ')
          let k = !1; let l = !1; let p; let n; do { for (p = b(f, c); !p && f.getParent();) { f = f.getParent(); if (m(h, f.getName()) !== -1) { l = k = !0; break }p = b(f, c) } if (p && p.getName && m(h, p.getName()) !== -1) { k = !0; break }f = p } while (f && f.getStyle && (f.getStyle('display') == 'none' || !f.getText())); for (f || (f = a); f.type !== CKEDITOR.NODE_TEXT;)f = !k || c || l ? f.getChild(0) : f.getChild(f.getChildCount() - 1); for (h = e(f); (l = g.exec(h)) != null && (n = l.index, c););if (typeof n !== 'number' && !k) return d(f, c); if (k)c ? n = 0 : (g = /([\.\b]*$)/, n = (l = g.exec(h)) ? l.index : h.length); else if (c && (n +=
1, n > h.length)) return d(f); return { node: f, offset: n }
        } let c = /\b\w+\b/ig; let g; let f; let h; let k; let l; h = k = l = a.startContainer; for (g = e(h); (f = c.exec(g)) != null;) if (f.index + f[0].length >= a.startOffset) return a = f.index, c = f.index + f[0].length, f.index === 0 && (f = d(h, !0), k = f.node, a = f.offset), c >= g.length && (g = d(h), l = g.node, c = g.offset), { startNode: k, startOffset: a, endNode: l, endOffset: c }; return null
      },
      _filterStyles: function (a) {
        const b = CKEDITOR.tools.isEmpty; const e = []; let d; let c; for (c = 0; c < a.length; c++) {
          d = a[c]._.definition, CKEDITOR.tools.indexOf(CKEDITOR.plugins.copyformatting.inlineBoundary,
            d.element) !== -1 && (d.element = a[c].element = 'span'), d.element === 'span' && b(d.attributes) && b(d.styles) || e.push(a[c])
        } return e
      },
      _determineContext: function (a) { function b (b) { const d = new CKEDITOR.dom.walker(a); let c; if (a.startContainer.getAscendant(b, !0) || a.endContainer.getAscendant(b, !0)) return !0; for (;c = d.next();) if (c.getAscendant(b, !0)) return !0 } return b({ ul: 1, ol: 1 }) ? 'list' : b('table') ? 'table' : 'text' },
      _applyStylesToTextContext: function (a, b, e) {
        const d = CKEDITOR.plugins.copyformatting; const c = d.excludedAttributesFromInlineTransform
        let g; let f; CKEDITOR.env.webkit && !CKEDITOR.env.chrome && a.getSelection().selectRanges([b]); for (g = 0; g < e.length; g++) if (b = e[g], m(d.excludedElementsFromInlineTransform, b.element) === -1) { if (m(d.elementsForInlineTransform, b.element) !== -1) for (b.element = b._.definition.element = 'span', f = 0; f < c.length; f++)b._.definition.attributes[c[f]] && delete b._.definition.attributes[c[f]]; b.apply(a) }
      },
      _applyStylesToListContext: function (a, b, e) {
        let d, c, g; for (g = 0; g < e.length; g++) {
          d = e[g], c = b.createBookmark(), d.element === 'ol' || d.element === 'ul'
            ? k(b, { ul: 1, ol: 1 }, function (a) { const b = d; a.getName() !== b.element && a.renameNode(b.element); b.applyToObject(a) }, !0)
            : d.element === 'li' ? k(b, 'li', function (a) { d.applyToObject(a) }) : CKEDITOR.plugins.copyformatting._applyStylesToTextContext(a, b, [d]), b.moveToBookmark(c)
        }
      },
      _applyStylesToTableContext: function (a, b, e) {
        function d (a, b) { a.getName() !== b.element && (b = b.getDefinition(), b.element = a.getName(), b = new CKEDITOR.style(b)); b.applyToObject(a) } let c, g; for (g = 0; g < e.length; g++) {
          c = e[g], m(['table', 'tr'], c.element) !== -1
            ? k(b,
              c.element, function (a) { c.applyToObject(a) })
            : m(['td', 'th'], c.element) !== -1 ? k(b, { td: 1, th: 1 }, function (a) { d(a, c) }) : m(['thead', 'tbody'], c.element) !== -1 ? k(b, { thead: 1, tbody: 1 }, function (a) { d(a, c) }) : CKEDITOR.plugins.copyformatting._applyStylesToTextContext(a, b, [c])
        }
      },
      _applyFormat: function (a, b) {
        let e = a.getSelection().getRanges()[0]; const d = CKEDITOR.plugins.copyformatting; let c; let g; if (!e) return !1; if (e.collapsed) {
          g = a.getSelection().createBookmarks(); if (!(c = d._getSelectedWordOffset(e))) return; e = a.createRange(); e.setStart(c.startNode,
            c.startOffset); e.setEnd(c.endNode, c.endOffset); e.select()
        }b = d._filterStyles(b); if (!a.copyFormatting.fire('applyFormatting', { styles: b, range: e, preventFormatStripping: !1 }, a)) return !1; g && a.getSelection().selectBookmarks(g); return !0
      },
      _putScreenReaderMessage: function (a, b) { this._getScreenReaderContainer().setText(a.lang.copyformatting.notification[b]) },
      _addScreenReaderContainer: function () { return this._getScreenReaderContainer() ? this._getScreenReaderContainer() : CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_screen_reader_only cke_copyformatting_notification"\x3e\x3cdiv aria-live\x3d"polite"\x3e\x3c/div\x3e\x3c/div\x3e')).getChild(0) },
      _getScreenReaderContainer: function () { return CKEDITOR.document.getBody().findOne('.cke_copyformatting_notification div[aria-live]') }
    }; CKEDITOR.config.copyFormatting_outerCursor = !0; CKEDITOR.config.copyFormatting_allowRules = 'b s u i em strong span p div td th ol ul li(*)[*]{*}'; CKEDITOR.config.copyFormatting_disallowRules = '*[data-cke-widget*,data-widget*,data-cke-realelement](cke_widget*)'; CKEDITOR.config.copyFormatting_allowedContexts = !0; CKEDITOR.config.copyFormatting_keystrokeCopy = CKEDITOR.CTRL + CKEDITOR.SHIFT +
67; CKEDITOR.config.copyFormatting_keystrokePaste = CKEDITOR.CTRL + CKEDITOR.SHIFT + 86
  })(); (function () {
    CKEDITOR.plugins.add('div', {
      requires: 'dialog',
      init: function (a) {
        if (!a.blockless) {
          const c = a.lang.div; let b = 'div(*)'; CKEDITOR.dialog.isTabEnabled(a, 'editdiv', 'advanced') && (b += ';div[dir,id,lang,title]{*}'); a.addCommand('creatediv', new CKEDITOR.dialogCommand('creatediv', {
            allowedContent: b,
            requiredContent: 'div',
            contextSensitive: !0,
            contentTransformations: [['div: alignmentToStyle']],
            refresh: function (a, c) {
              this.setState('div' in (a.config.div_wrapTable ? c.root : c.blockLimit).getDtd()
                ? CKEDITOR.TRISTATE_OFF
                : CKEDITOR.TRISTATE_DISABLED)
            }
          })); a.addCommand('editdiv', new CKEDITOR.dialogCommand('editdiv', { requiredContent: 'div' })); a.addCommand('removediv', {
            requiredContent: 'div',
            exec: function (a) {
              function c (b) { (b = CKEDITOR.plugins.div.getSurroundDiv(a, b)) && !b.data('cke-div-added') && (f.push(b), b.data('cke-div-added')) } for (var b = a.getSelection(), g = b && b.getRanges(), e, h = b.createBookmarks(), f = [], d = 0; d < g.length; d++)e = g[d], e.collapsed ? c(b.getStartElement()) : (e = new CKEDITOR.dom.walker(e), e.evaluator = c, e.lastForward())
              for (d = 0; d < f.length; d++)f[d].remove(!0); b.selectBookmarks(h)
            }
          }); a.ui.addButton && a.ui.addButton('CreateDiv', { label: c.toolbar, command: 'creatediv', toolbar: 'blocks,50' }); a.addMenuItems && (a.addMenuItems({ editdiv: { label: c.edit, command: 'editdiv', group: 'div', order: 1 }, removediv: { label: c.remove, command: 'removediv', group: 'div', order: 5 } }), a.contextMenu && a.contextMenu.addListener(function (b) {
            return !b || b.isReadOnly()
              ? null
              : CKEDITOR.plugins.div.getSurroundDiv(a)
                ? { editdiv: CKEDITOR.TRISTATE_OFF, removediv: CKEDITOR.TRISTATE_OFF }
                : null
          })); CKEDITOR.dialog.add('creatediv', this.path + 'dialogs/div.js'); CKEDITOR.dialog.add('editdiv', this.path + 'dialogs/div.js')
        }
      }
    }); CKEDITOR.plugins.div = { getSurroundDiv: function (a, c) { const b = a.elementPath(c); return a.elementPath(b.blockLimit).contains(function (a) { return a.is('div') && !a.isReadOnly() }, 1) } }
  })(); CKEDITOR.plugins.add('resize', {
    init: function (b) {
      function f (d) { let e = c.width; let m = c.height; const f = e + (d.data.$.screenX - n.x) * (g == 'rtl' ? -1 : 1); d = m + (d.data.$.screenY - n.y); h && (e = Math.max(a.resize_minWidth, Math.min(f, a.resize_maxWidth))); p && (m = Math.max(a.resize_minHeight, Math.min(d, a.resize_maxHeight))); b.resize(h ? e : null, m) } function k () {
        CKEDITOR.document.removeListener('mousemove', f); CKEDITOR.document.removeListener('mouseup', k); b.document && (b.document.removeListener('mousemove', f), b.document.removeListener('mouseup',
          k))
      } var a = b.config; const r = b.ui.spaceId('resizer'); var g = b.element ? b.element.getDirection(1) : 'ltr'; !a.resize_dir && (a.resize_dir = 'vertical'); void 0 === a.resize_maxWidth && (a.resize_maxWidth = 3E3); void 0 === a.resize_maxHeight && (a.resize_maxHeight = 3E3); void 0 === a.resize_minWidth && (a.resize_minWidth = 750); void 0 === a.resize_minHeight && (a.resize_minHeight = 250); if (!1 !== a.resize_enabled) {
        let l = null; var n; var c; var h = (a.resize_dir == 'both' || a.resize_dir == 'horizontal') && a.resize_minWidth != a.resize_maxWidth; var p = (a.resize_dir == 'both' || a.resize_dir ==
'vertical') && a.resize_minHeight != a.resize_maxHeight; const q = CKEDITOR.tools.addFunction(function (d) { l || (l = b.getResizable()); c = { width: l.$.offsetWidth || 0, height: l.$.offsetHeight || 0 }; n = { x: d.screenX, y: d.screenY }; a.resize_minWidth > c.width && (a.resize_minWidth = c.width); a.resize_minHeight > c.height && (a.resize_minHeight = c.height); CKEDITOR.document.on('mousemove', f); CKEDITOR.document.on('mouseup', k); b.document && (b.document.on('mousemove', f), b.document.on('mouseup', k)); d.preventDefault && d.preventDefault() }); b.on('destroy',
          function () { CKEDITOR.tools.removeFunction(q) }); b.on('uiSpace', function (a) { if (a.data.space == 'bottom') { let e = ''; h && !p && (e = ' cke_resizer_horizontal'); !h && p && (e = ' cke_resizer_vertical'); const c = '\x3cspan id\x3d"' + r + '" class\x3d"cke_resizer' + e + ' cke_resizer_' + g + '" title\x3d"' + CKEDITOR.tools.htmlEncode(b.lang.common.resize) + '" onmousedown\x3d"CKEDITOR.tools.callFunction(' + q + ', event)"\x3e' + (g == 'ltr' ? '◢' : '◣') + '\x3c/span\x3e'; g == 'ltr' && e == 'ltr' ? a.data.html += c : a.data.html = c + a.data.html } }, b, null, 100); b.on('maximize',
          function (a) { b.ui.space('resizer')[a.data == CKEDITOR.TRISTATE_ON ? 'hide' : 'show']() })
      }
    }
  }); (function () {
    function D (a) {
      function d () { for (var b = g(), e = CKEDITOR.tools.clone(a.config.toolbarGroups) || v(a), f = 0; f < e.length; f++) { let m = e[f]; if (m != '/') { typeof m === 'string' && (m = e[f] = { name: m }); var l; const d = m.groups; if (d) for (let h = 0; h < d.length; h++)l = d[h], (l = b[l]) && c(m, l); (l = b[m.name]) && c(m, l) } } return e } function g () {
        const b = {}; let c; let f; let e; for (c in a.ui.items)f = a.ui.items[c], e = f.toolbar || 'others', e = e.split(','), f = e[0], e = parseInt(e[1] || -1, 10), b[f] || (b[f] = []), b[f].push({ name: c, order: e }); for (f in b) {
          b[f] = b[f].sort(function (b,
            a) { return b.order == a.order ? 0 : a.order < 0 ? -1 : b.order < 0 ? 1 : b.order < a.order ? -1 : 1 })
        } return b
      } function c (c, e) { if (e.length) { c.items ? c.items.push(a.ui.create('-')) : c.items = []; for (var f; f = e.shift();)f = typeof f === 'string' ? f : f.name, b && CKEDITOR.tools.indexOf(b, f) != -1 || (f = a.ui.create(f)) && a.addFeature(f) && c.items.push(f) } } function h (b) {
        const a = []; let e; let d; let h; for (e = 0; e < b.length; ++e) {
          d = b[e], h = {}, d == '/'
            ? a.push(d)
            : CKEDITOR.tools.isArray(d)
              ? (c(h, CKEDITOR.tools.clone(d)), a.push(h))
              : d.items && (c(h, CKEDITOR.tools.clone(d.items)),
              h.name = d.name, a.push(h))
        } return a
      } var b = a.config.removeButtons; var b = b && b.split(','); let e = a.config.toolbar; typeof e === 'string' && (e = a.config['toolbar_' + e]); return a.toolbar = e ? h(e) : d()
    } function v (a) {
      return a._.toolbarGroups || (a._.toolbarGroups = [{ name: 'document', groups: ['mode', 'document', 'doctools'] }, { name: 'clipboard', groups: ['clipboard', 'undo'] }, { name: 'editing', groups: ['find', 'selection', 'spellchecker'] }, { name: 'forms' }, '/', { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] }, {
        name: 'paragraph',
        groups: ['list',
          'indent', 'blocks', 'align', 'bidi']
      }, { name: 'links' }, { name: 'insert' }, '/', { name: 'styles' }, { name: 'colors' }, { name: 'tools' }, { name: 'others' }, { name: 'about' }])
    } const z = function () { this.toolbars = []; this.focusCommandExecuted = !1 }; z.prototype.focus = function () { for (var a = 0, d; d = this.toolbars[a++];) for (var g = 0, c; c = d.items[g++];) if (c.focus) { c.focus(); return } }; const E = {
      modes: { wysiwyg: 1, source: 1 },
      readOnly: 1,
      exec: function (a) {
        a.toolbox && (a.toolbox.focusCommandExecuted = !0, CKEDITOR.env.ie || CKEDITOR.env.air
          ? setTimeout(function () { a.toolbox.focus() },
            100)
          : a.toolbox.focus())
      }
    }; CKEDITOR.plugins.add('toolbar', {
      requires: 'button',
      init: function (a) {
        let d; var g = function (c, h) {
          let b; var e = a.lang.dir == 'rtl'; var k = a.config.toolbarGroupCycling; const q = e ? 37 : 39; var e = e ? 39 : 37; var k = void 0 === k || k; switch (h) {
            case 9:case CKEDITOR.SHIFT + 9:for (;!b || !b.items.length;) {
              if (b = h == 9 ? (b ? b.next : c.toolbar.next) || a.toolbox.toolbars[0] : (b ? b.previous : c.toolbar.previous) || a.toolbox.toolbars[a.toolbox.toolbars.length - 1], b.items.length) {
                for (c = b.items[d ? b.items.length - 1 : 0]; c && !c.focus;) {
                  (c = d ? c.previous : c.next) ||
(b = 0)
                }
              }
            }c && c.focus(); return !1; case q:b = c; do b = b.next, !b && k && (b = c.toolbar.items[0]); while (b && !b.focus); b ? b.focus() : g(c, 9); return !1; case 40:return c.button && c.button.hasArrow ? (a.once('panelShow', function (b) { b.data._.panel._.currentBlock.onKeyDown(40) }), c.execute()) : g(c, h == 40 ? q : e), !1; case e:case 38:b = c; do b = b.previous, !b && k && (b = c.toolbar.items[c.toolbar.items.length - 1]); while (b && !b.focus); b ? b.focus() : (d = 1, g(c, CKEDITOR.SHIFT + 9), d = 0); return !1; case 27:return a.focus(), !1; case 13:case 32:return c.execute(),
            !1
          } return !0
        }; a.on('uiSpace', function (c) {
          if (c.data.space == a.config.toolbarLocation) {
            c.removeListener(); a.toolbox = new z(); var d = CKEDITOR.tools.getNextId(); const b = ['\x3cspan id\x3d"', d, '" class\x3d"cke_voice_label"\x3e', a.lang.toolbar.toolbars, '\x3c/span\x3e', '\x3cspan id\x3d"' + a.ui.spaceId('toolbox') + '" class\x3d"cke_toolbox" role\x3d"group" aria-labelledby\x3d"', d, '" onmousedown\x3d"return false;"\x3e']; var d = !1 !== a.config.toolbarStartupExpanded; let e; let k; a.config.toolbarCanCollapse && a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE &&
b.push('\x3cspan class\x3d"cke_toolbox_main"' + (d ? '\x3e' : ' style\x3d"display:none"\x3e')); for (let q = a.toolbox.toolbars, f = D(a), m = f.length, l = 0; l < m; l++) {
              var r; var n = 0; var w; const p = f[l]; const v = p !== '/' && (f[l + 1] === '/' || l == m - 1); var x; if (p) {
                if (e && (b.push('\x3c/span\x3e'), k = e = 0), p === '/')b.push('\x3cspan class\x3d"cke_toolbar_break"\x3e\x3c/span\x3e'); else {
                  x = p.items || p; for (let y = 0; y < x.length; y++) {
                    const t = x[y]; var A; if (t) {
                      const B = function (c) {
                        c = c.render(a, b); u = n.items.push(c) - 1; u > 0 && (c.previous = n.items[u - 1], c.previous.next = c); c.toolbar = n; c.onkey =
g; c.onfocus = function () { a.toolbox.focusCommandExecuted || a.focus() }
                      }; if (t.type == CKEDITOR.UI_SEPARATOR)k = e && t; else {
                        A = !1 !== t.canGroup; if (!n) {
                          r = CKEDITOR.tools.getNextId(); n = { id: r, items: [] }; w = p.name && (a.lang.toolbar.toolbarGroups[p.name] || p.name); b.push('\x3cspan id\x3d"', r, '" class\x3d"cke_toolbar' + (v ? ' cke_toolbar_last"' : '"'), w ? ' aria-labelledby\x3d"' + r + '_label"' : '', ' role\x3d"toolbar"\x3e'); w && b.push('\x3cspan id\x3d"', r, '_label" class\x3d"cke_voice_label"\x3e', w, '\x3c/span\x3e'); b.push('\x3cspan class\x3d"cke_toolbar_start"\x3e\x3c/span\x3e')
                          var u = q.push(n) - 1; u > 0 && (n.previous = q[u - 1], n.previous.next = n)
                        }A ? e || (b.push('\x3cspan class\x3d"cke_toolgroup" role\x3d"presentation"\x3e'), e = 1) : e && (b.push('\x3c/span\x3e'), e = 0); k && (B(k), k = 0); B(t)
                      }
                    }
                  }e && (b.push('\x3c/span\x3e'), k = e = 0); n && b.push('\x3cspan class\x3d"cke_toolbar_end"\x3e\x3c/span\x3e\x3c/span\x3e')
                }
              }
            }a.config.toolbarCanCollapse && b.push('\x3c/span\x3e'); if (a.config.toolbarCanCollapse && a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
              const C = CKEDITOR.tools.addFunction(function () { a.execCommand('toolbarCollapse') })
              a.on('destroy', function () { CKEDITOR.tools.removeFunction(C) }); a.addCommand('toolbarCollapse', {
                readOnly: 1,
                exec: function (b) {
                  const a = b.ui.space('toolbar_collapser'); const c = a.getPrevious(); const e = b.ui.space('contents'); const d = c.getParent(); const f = parseInt(e.$.style.height, 10); const h = d.$.offsetHeight; const g = a.hasClass('cke_toolbox_collapser_min'); g ? (c.show(), a.removeClass('cke_toolbox_collapser_min'), a.setAttribute('title', b.lang.toolbar.toolbarCollapse)) : (c.hide(), a.addClass('cke_toolbox_collapser_min'), a.setAttribute('title', b.lang.toolbar.toolbarExpand))
                  a.getFirst().setText(g ? '▲' : '◀'); e.setStyle('height', f - (d.$.offsetHeight - h) + 'px'); b.fire('resize', { outerHeight: b.container.$.offsetHeight, contentsHeight: e.$.offsetHeight, outerWidth: b.container.$.offsetWidth })
                },
                modes: { wysiwyg: 1, source: 1 }
              }); a.setKeystroke(CKEDITOR.ALT + (CKEDITOR.env.ie || CKEDITOR.env.webkit ? 189 : 109), 'toolbarCollapse'); b.push('\x3ca title\x3d"' + (d ? a.lang.toolbar.toolbarCollapse : a.lang.toolbar.toolbarExpand) + '" id\x3d"' + a.ui.spaceId('toolbar_collapser') + '" tabIndex\x3d"-1" class\x3d"cke_toolbox_collapser')
              d || b.push(' cke_toolbox_collapser_min'); b.push('" onclick\x3d"CKEDITOR.tools.callFunction(' + C + ')"\x3e', '\x3cspan class\x3d"cke_arrow"\x3e\x26#9650;\x3c/span\x3e', '\x3c/a\x3e')
            }b.push('\x3c/span\x3e'); c.data.html += b.join('')
          }
        }); a.on('destroy', function () { if (this.toolbox) { let a; let d = 0; let b; let e; let g; for (a = this.toolbox.toolbars; d < a.length; d++) for (e = a[d].items, b = 0; b < e.length; b++)g = e[b], g.clickFn && CKEDITOR.tools.removeFunction(g.clickFn), g.keyDownFn && CKEDITOR.tools.removeFunction(g.keyDownFn) } }); a.on('uiReady', function () {
          const c =
a.ui.space('toolbox'); c && a.focusManager.add(c, 1)
        }); a.addCommand('toolbarFocus', E); a.setKeystroke(CKEDITOR.ALT + 121, 'toolbarFocus'); a.ui.add('-', CKEDITOR.UI_SEPARATOR, {}); a.ui.addHandler(CKEDITOR.UI_SEPARATOR, { create: function () { return { render: function (a, d) { d.push('\x3cspan class\x3d"cke_toolbar_separator" role\x3d"separator"\x3e\x3c/span\x3e'); return {} } } } })
      }
    }); CKEDITOR.ui.prototype.addToolbarGroup = function (a, d, g) {
      const c = v(this.editor); const h = d === 0; const b = { name: a }; if (g) {
        if (g = CKEDITOR.tools.search(c, function (a) {
          return a.name ==
g
        })) { !g.groups && (g.groups = []); if (d && (d = CKEDITOR.tools.indexOf(g.groups, d), d >= 0)) { g.groups.splice(d + 1, 0, a); return }h ? g.groups.splice(0, 0, a) : g.groups.push(a); return }d = null
      }d && (d = CKEDITOR.tools.indexOf(c, function (a) { return a.name == d })); h ? c.splice(0, 0, a) : typeof d === 'number' ? c.splice(d + 1, 0, b) : c.push(a)
    }
  })(); CKEDITOR.UI_SEPARATOR = 'separator'; CKEDITOR.config.toolbarLocation = 'top'; (function () {
    function q (a, e) {
      function l (c) { c = k.list[c]; let d; c.equals(a.editable()) || c.getAttribute('contenteditable') == 'true' ? (d = a.createRange(), d.selectNodeContents(c), d = d.select()) : (d = a.getSelection(), d.selectElement(c)); CKEDITOR.env.ie && a.fire('selectionChange', { selection: d, path: new CKEDITOR.dom.elementPath(c) }); a.focus() } function m () { n && n.setHtml('\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e'); delete k.list } const p = a.ui.spaceId('path'); let n; var k = a._.elementsPath; const q = k.idBase; e.html += '\x3cspan id\x3d"' +
p + '_label" class\x3d"cke_voice_label"\x3e' + a.lang.elementspath.eleLabel + '\x3c/span\x3e\x3cspan id\x3d"' + p + '" class\x3d"cke_path" role\x3d"group" aria-labelledby\x3d"' + p + '_label"\x3e\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e\x3c/span\x3e'; a.on('uiReady', function () { const c = a.ui.space('path'); c && a.focusManager.add(c, 1) }); k.onClick = l; const v = CKEDITOR.tools.addFunction(l); const w = CKEDITOR.tools.addFunction(function (c, d) {
        const g = k.idBase; let b; d = new CKEDITOR.dom.event(d); b = a.lang.dir == 'rtl'; switch (d.getKeystroke()) {
          case b
            ? 39
            : 37:case 9:return (b = CKEDITOR.document.getById(g + (c + 1))) || (b = CKEDITOR.document.getById(g + '0')), b.focus(), !1; case b ? 37 : 39:case CKEDITOR.SHIFT + 9:return (b = CKEDITOR.document.getById(g + (c - 1))) || (b = CKEDITOR.document.getById(g + (k.list.length - 1))), b.focus(), !1; case 27:return a.focus(), !1; case 13:case 32:return l(c), !1
        } return !0
      }); a.on('selectionChange', function () {
        for (var c = [], d = k.list = [], g = [], b = k.filters, e = !0, l = a.elementPath().elements, f, u = l.length; u--;) {
          const h = l[u]; let r = 0; f = h.data('cke-display-name')
            ? h.data('cke-display-name')
            : h.data('cke-real-element-type') ? h.data('cke-real-element-type') : h.getName(); (e = h.hasAttribute('contenteditable') ? h.getAttribute('contenteditable') == 'true' : e) || h.hasAttribute('contenteditable') || (r = 1); for (let t = 0; t < b.length; t++) { const m = b[t](h, f); if (!1 === m) { r = 1; break }f = m || f }r || (d.unshift(h), g.unshift(f))
        }d = d.length; for (b = 0; b < d; b++)f = g[b], e = a.lang.elementspath.eleTitle.replace(/%1/, f), f = x.output({ id: q + b, label: e, text: f, jsTitle: "javascript:void('" + f + "')", index: b, keyDownFn: w, clickFn: v }), c.unshift(f); n ||
(n = CKEDITOR.document.getById(p)); g = n; g.setHtml(c.join('') + '\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e'); a.fire('elementsPathUpdate', { space: g })
      }); a.on('readOnly', m); a.on('contentDomUnload', m); a.addCommand('elementsPathFocus', y.toolbarFocus); a.setKeystroke(CKEDITOR.ALT + 122, 'elementsPathFocus')
    } var y = { toolbarFocus: { editorFocus: !1, readOnly: 1, exec: function (a) { (a = CKEDITOR.document.getById(a._.elementsPath.idBase + '0')) && a.focus(CKEDITOR.env.ie || CKEDITOR.env.air) } } }; let e = ''; CKEDITOR.env.gecko &&
CKEDITOR.env.mac && (e += ' onkeypress\x3d"return false;"'); CKEDITOR.env.gecko && (e += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"'); var x = CKEDITOR.addTemplate('pathItem', '\x3ca id\x3d"{id}" href\x3d"{jsTitle}" tabindex\x3d"-1" class\x3d"cke_path_item" title\x3d"{label}"' + e + ' hidefocus\x3d"true"  onkeydown\x3d"return CKEDITOR.tools.callFunction({keyDownFn},{index}, event );" onclick\x3d"CKEDITOR.tools.callFunction({clickFn},{index}); return false;" role\x3d"button" aria-label\x3d"{label}"\x3e{text}\x3c/a\x3e')
    CKEDITOR.plugins.add('elementspath', { init: function (a) { a._.elementsPath = { idBase: 'cke_elementspath_' + CKEDITOR.tools.getNextNumber() + '_', filters: [] }; a.on('uiSpace', function (e) { e.data.space == 'bottom' && q(a, e.data) }) } })
  })(); (function () {
    function q (b, d, a) { a = b.config.forceEnterMode || a; b.mode == 'wysiwyg' && (d || (d = b.activeEnterMode), b.elementPath().isContextFor('p') || (d = CKEDITOR.ENTER_BR, a = 1), b.fire('saveSnapshot'), d == CKEDITOR.ENTER_BR ? t(b, d, null, a) : u(b, d, null, a), b.fire('saveSnapshot')) } function v (b) { b = b.getSelection().getRanges(!0); for (let d = b.length - 1; d > 0; d--)b[d].deleteContents(); return b[0] } function y (b) {
      let d = b.startContainer.getAscendant(function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.getAttribute('contenteditable') == 'true' },
        !0); if (b.root.equals(d)) return b; d = new CKEDITOR.dom.range(d); d.moveToRange(b); return d
    }CKEDITOR.plugins.add('enterkey', { init: function (b) { b.addCommand('enter', { modes: { wysiwyg: 1 }, editorFocus: !1, exec: function (b) { q(b) } }); b.addCommand('shiftEnter', { modes: { wysiwyg: 1 }, editorFocus: !1, exec: function (b) { q(b, b.activeShiftEnterMode, 1) } }); b.setKeystroke([[13, 'enter'], [CKEDITOR.SHIFT + 13, 'shiftEnter']]) } }); const z = CKEDITOR.dom.walker.whitespaces(); const A = CKEDITOR.dom.walker.bookmark(); CKEDITOR.plugins.enterkey = {
      enterBlock: function (b,
        d, a, h) {
        if (a = a || v(b)) {
          a = y(a); let f = a.document; var k = a.checkStartOfBlock(); var m = a.checkEndOfBlock(); let l = b.elementPath(a.startContainer); let c = l.block; var n = d == CKEDITOR.ENTER_DIV ? 'div' : 'p'; let e; if (k && m) {
            if (c && (c.is('li') || c.getParent().is('li'))) {
              c.is('li') || (c = c.getParent()); a = c.getParent(); e = a.getParent(); h = !c.hasPrevious(); var p = !c.hasNext(); var n = b.getSelection(); var g = n.createBookmarks(); var k = c.getDirection(1); var m = c.getAttribute('class'); const r = c.getAttribute('style'); const q = e.getDirection(1) != k; b = b.enterMode != CKEDITOR.ENTER_BR || q || r || m
              if (e.is('li'))h || p ? (h && p && a.remove(), c[p ? 'insertAfter' : 'insertBefore'](e)) : c.breakParent(e); else {
                if (b) if (l.block.is('li') ? (e = f.createElement(d == CKEDITOR.ENTER_P ? 'p' : 'div'), q && e.setAttribute('dir', k), r && e.setAttribute('style', r), m && e.setAttribute('class', m), c.moveChildren(e)) : e = l.block, h || p)e[h ? 'insertBefore' : 'insertAfter'](a); else c.breakParent(a), e.insertAfter(a); else if (c.appendBogus(!0), h || p) for (;f = c[h ? 'getFirst' : 'getLast']();)f[h ? 'insertBefore' : 'insertAfter'](a); else for (c.breakParent(a); f = c.getLast();)f.insertAfter(a)
                c.remove()
              }n.selectBookmarks(g); return
            } if (c && c.getParent().is('blockquote')) { c.breakParent(c.getParent()); c.getPrevious().getFirst(CKEDITOR.dom.walker.invisible(1)) || c.getPrevious().remove(); c.getNext().getFirst(CKEDITOR.dom.walker.invisible(1)) || c.getNext().remove(); a.moveToElementEditStart(c); a.select(); return }
          } else if (c && c.is('pre') && !m) { t(b, d, a, h); return } if (k = a.splitBlock(n)) {
            d = k.previousBlock; c = k.nextBlock; l = k.wasStartOfBlock; b = k.wasEndOfBlock; c
              ? (g = c.getParent(), g.is('li') && (c.breakParent(g),
                c.move(c.getNext(), 1)))
              : d && (g = d.getParent()) && g.is('li') && (d.breakParent(g), g = d.getNext(), a.moveToElementEditStart(g), d.move(d.getPrevious())); if (l || b) {
              if (d) { if (d.is('li') || !w.test(d.getName()) && !d.is('pre'))e = d.clone() } else c && (e = c.clone()); e ? h && !e.is('li') && e.renameNode(n) : g && g.is('li') ? e = g : (e = f.createElement(n), d && (p = d.getDirection()) && e.setAttribute('dir', p)); if (f = k.elementPath) {
                for (h = 0, n = f.elements.length; h < n; h++) {
                  g = f.elements[h]; if (g.equals(f.block) || g.equals(f.blockLimit)) break; CKEDITOR.dtd.$removeEmpty[g.getName()] &&
(g = g.clone(), e.moveChildren(g), e.append(g))
                }
              }e.appendBogus(); e.getParent() || a.insertNode(e); e.is('li') && e.removeAttribute('value'); !CKEDITOR.env.ie || !l || b && d.getChildCount() || (a.moveToElementEditStart(b ? d : e), a.select()); a.moveToElementEditStart(l && !b ? c : e)
            } else {
              c.is('li') && (e = a.clone(), e.selectNodeContents(c), e = new CKEDITOR.dom.walker(e), e.evaluator = function (a) { return !(A(a) || z(a) || a.type == CKEDITOR.NODE_ELEMENT && a.getName() in CKEDITOR.dtd.$inline && !(a.getName() in CKEDITOR.dtd.$empty)) }, (g = e.next()) &&
g.type == CKEDITOR.NODE_ELEMENT && g.is('ul', 'ol') && (CKEDITOR.env.needsBrFiller ? f.createElement('br') : f.createText(' ')).insertBefore(g)), c && a.moveToElementEditStart(c)
            }a.select(); a.scrollIntoView()
          }
        }
      },
      enterBr: function (b, d, a, h) {
        if (a = a || v(b)) {
          let f = a.document; let k = a.checkEndOfBlock(); const m = new CKEDITOR.dom.elementPath(b.getSelection().getStartElement()); const l = m.block; const c = l && m.block.getName(); h || c != 'li'
            ? (!h && k && w.test(c)
                ? (k = l.getDirection())
                    ? (f = f.createElement('div'), f.setAttribute('dir', k), f.insertAfter(l), a.setStart(f,
                        0))
                    : (f.createElement('br').insertAfter(l), CKEDITOR.env.gecko && f.createText('').insertAfter(l), a.setStartAt(l.getNext(), CKEDITOR.env.ie ? CKEDITOR.POSITION_BEFORE_START : CKEDITOR.POSITION_AFTER_START))
                : (b = c == 'pre' && CKEDITOR.env.ie && CKEDITOR.env.version < 8 ? f.createText('\r') : f.createElement('br'), a.deleteContents(), a.insertNode(b), CKEDITOR.env.needsBrFiller
                    ? (f.createText('﻿').insertAfter(b), k && (l || m.blockLimit).appendBogus(), b.getNext().$.nodeValue = '', a.setStartAt(b.getNext(), CKEDITOR.POSITION_AFTER_START))
                    : a.setStartAt(b, CKEDITOR.POSITION_AFTER_END)), a.collapse(!0), a.select(), a.scrollIntoView())
            : u(b, d, a, h)
        }
      }
    }; const x = CKEDITOR.plugins.enterkey; var t = x.enterBr; var u = x.enterBlock; var w = /^h[1-6]$/
  })(); (function () {
    function k (b, f) { const g = {}; const c = []; const e = { nbsp: ' ', shy: '­', gt: '\x3e', lt: '\x3c', amp: '\x26', apos: "'", quot: '"' }; b = b.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g, function (b, a) { const d = f ? '\x26' + a + ';' : e[a]; g[d] = f ? e[a] : '\x26' + a + ';'; c.push(d); return '' }); if (!f && b) { b = b.split(','); let a = document.createElement('div'); let d; a.innerHTML = '\x26' + b.join(';\x26') + ';'; d = a.innerHTML; a = null; for (a = 0; a < d.length; a++) { const h = d.charAt(a); g[h] = '\x26' + b[a] + ';'; c.push(h) } }g.regex = c.join(f ? '|' : ''); return g }CKEDITOR.plugins.add('entities',
      {
        afterInit: function (b) {
          function f (a) { return h[a] } function g (b) { return c.entities_processNumerical != 'force' && a[b] ? a[b] : '\x26#' + b.charCodeAt(0) + ';' } var c = b.config; if (b = (b = b.dataProcessor) && b.htmlFilter) {
            const e = []; !1 !== c.basicEntities && e.push('nbsp,gt,lt,amp'); c.entities && (e.length && e.push('quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro'),
            c.entities_latin && e.push('Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml'), c.entities_greek && e.push('Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv'),
            c.entities_additional && e.push(c.entities_additional)); var a = k(e.join(',')); var d = a.regex ? '[' + a.regex + ']' : 'a^'; delete a.regex; c.entities && c.entities_processNumerical && (d = '[^ -~]|' + d); var d = new RegExp(d, 'g'); var h = k('nbsp,gt,lt,amp,shy', !0); const l = new RegExp(h.regex, 'g'); b.addRules({ text: function (a) { return a.replace(l, f).replace(d, g) } }, { applyToAll: !0, excludeNestedEditable: !0 })
          }
        }
      })
  })(); CKEDITOR.config.basicEntities = !0; CKEDITOR.config.entities = !0; CKEDITOR.config.entities_latin = !0; CKEDITOR.config.entities_greek = !0
  CKEDITOR.config.entities_additional = '#39'; CKEDITOR.plugins.add('popup')
  CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
    popup: function (e, a, b, d) {
      a = a || '80%'; b = b || '70%'; typeof a === 'string' && a.length > 1 && a.substr(a.length - 1, 1) == '%' && (a = parseInt(window.screen.width * parseInt(a, 10) / 100, 10)); typeof b === 'string' && b.length > 1 && b.substr(b.length - 1, 1) == '%' && (b = parseInt(window.screen.height * parseInt(b, 10) / 100, 10)); a < 640 && (a = 640); b < 420 && (b = 420); const f = parseInt((window.screen.height - b) / 2, 10); const g = parseInt((window.screen.width - a) / 2, 10); d = (d || 'location\x3dno,menubar\x3dno,toolbar\x3dno,dependent\x3dyes,minimizable\x3dno,modal\x3dyes,alwaysRaised\x3dyes,resizable\x3dyes,scrollbars\x3dyes') + ',width\x3d' +
a + ',height\x3d' + b + ',top\x3d' + f + ',left\x3d' + g; const c = window.open('', null, d, !0); if (!c) return !1; try { navigator.userAgent.toLowerCase().indexOf(' chrome/') == -1 && (c.moveTo(g, f), c.resizeTo(a, b)), c.focus(), c.location.href = e } catch (h) { window.open(e, null, d, !0) } return !0
    }
  }); (function () {
    function g (a, c) { const d = []; if (c) for (const b in c)d.push(b + '\x3d' + encodeURIComponent(c[b])); else return a; return a + (a.indexOf('?') != -1 ? '\x26' : '?') + d.join('\x26') } function k (a) { a += ''; return a.charAt(0).toUpperCase() + a.substr(1) } function m () {
      var a = this.getDialog(); const c = a.getParentEditor(); c._.filebrowserSe = this; const d = c.config['filebrowser' + k(a.getName()) + 'WindowWidth'] || c.config.filebrowserWindowWidth || '80%'; var a = c.config['filebrowser' + k(a.getName()) + 'WindowHeight'] || c.config.filebrowserWindowHeight ||
'70%'; let b = this.filebrowser.params || {}; b.CKEditor = c.name; b.CKEditorFuncNum = c._.filebrowserFn; b.langCode || (b.langCode = c.langCode); b = g(this.filebrowser.url, b); c.popup(b, d, a, c.config.filebrowserWindowFeatures || c.config.fileBrowserWindowFeatures)
    } function n () { const a = this.getDialog(); a.getParentEditor()._.filebrowserSe = this; return a.getContentElement(this.for[0], this.for[1]).getInputElement().$.value && a.getContentElement(this.for[0], this.for[1]).getAction() ? !0 : !1 } function p (a, c, d) {
      const b = d.params ||
{}; b.CKEditor = a.name; b.CKEditorFuncNum = a._.filebrowserFn; b.langCode || (b.langCode = a.langCode); c.action = g(d.url, b); c.filebrowser = d
    } function l (a, c, d, b) {
      if (b && b.length) {
        for (var e, g = b.length; g--;) {
          if (e = b[g], e.type != 'hbox' && e.type != 'vbox' && e.type != 'fieldset' || l(a, c, d, e.children), e.filebrowser) {
            if (typeof e.filebrowser === 'string' && (e.filebrowser = { action: e.type == 'fileButton' ? 'QuickUpload' : 'Browse', target: e.filebrowser }), e.filebrowser.action == 'Browse') {
              var f = e.filebrowser.url; void 0 === f && (f = a.config['filebrowser' +
k(c) + 'BrowseUrl'], void 0 === f && (f = a.config.filebrowserBrowseUrl)); f && (e.onClick = m, e.filebrowser.url = f, e.hidden = !1)
            } else if (e.filebrowser.action == 'QuickUpload' && e.for && (f = e.filebrowser.url, void 0 === f && (f = a.config['filebrowser' + k(c) + 'UploadUrl'], void 0 === f && (f = a.config.filebrowserUploadUrl)), f)) {
              var h = e.onClick; e.onClick = function (a) {
                let b = a.sender; if (h && !1 === h.call(b, a)) return !1; if (n.call(b, a)) {
                  a = b.getDialog().getContentElement(this.for[0], this.for[1]).getInputElement(); if (b = new CKEDITOR.dom.element(a.$.form)) {
                    (a =
b.$.elements.ckCsrfToken)
                      ? a = new CKEDITOR.dom.element(a)
                      : (a = new CKEDITOR.dom.element('input'), a.setAttributes({ name: 'ckCsrfToken', type: 'hidden' }), b.append(a)), a.setAttribute('value', CKEDITOR.tools.getCsrfToken())
                  } return !0
                } return !1
              }; e.filebrowser.url = f; e.hidden = !1; p(a, d.getContents(e.for[0]).get(e.for[1]), e.filebrowser)
            }
          }
        }
      }
    } function h (a, c, d) { if (d.indexOf(';') !== -1) { d = d.split(';'); for (let b = 0; b < d.length; b++) if (h(a, c, d[b])) return !0; return !1 } return (a = a.getContents(c).get(d).filebrowser) && a.url } function q (a,
      c) { let d = this._.filebrowserSe.getDialog(); let b = this._.filebrowserSe.for; let e = this._.filebrowserSe.filebrowser.onSelect; b && d.getContentElement(b[0], b[1]).reset(); if (typeof c !== 'function' || !1 !== c.call(this._.filebrowserSe)) if (!e || !1 !== e.call(this._.filebrowserSe, a, c)) if (typeof c === 'string' && c && alert(c), a && (b = this._.filebrowserSe, d = b.getDialog(), b = b.filebrowser.target || null)) if (b = b.split(':'), e = d.getContentElement(b[0], b[1]))e.setValue(a), d.selectPage(b[0]) }CKEDITOR.plugins.add('filebrowser', {
      requires: 'popup',
      init: function (a) { a._.filebrowserFn = CKEDITOR.tools.addFunction(q, a); a.on('destroy', function () { CKEDITOR.tools.removeFunction(this._.filebrowserFn) }) }
    }); CKEDITOR.on('dialogDefinition', function (a) { if (a.editor.plugins.filebrowser) for (var c = a.data.definition, d, b = 0; b < c.contents.length; ++b) if (d = c.contents[b])l(a.editor, a.data.name, c, d.elements), d.hidden && d.filebrowser && (d.hidden = !h(c, d.id, d.filebrowser)) })
  })(); CKEDITOR.plugins.add('find', {
    requires: 'dialog',
    init: function (a) {
      const b = a.addCommand('find', new CKEDITOR.dialogCommand('find')); b.canUndo = !1; b.readOnly = 1; a.addCommand('replace', new CKEDITOR.dialogCommand('replace')).canUndo = !1; a.ui.addButton && (a.ui.addButton('Find', { label: a.lang.find.find, command: 'find', toolbar: 'find,10' }), a.ui.addButton('Replace', { label: a.lang.find.replace, command: 'replace', toolbar: 'find,20' })); CKEDITOR.dialog.add('find', this.path + 'dialogs/find.js'); CKEDITOR.dialog.add('replace', this.path +
'dialogs/find.js')
    }
  }); CKEDITOR.config.find_highlight = { element: 'span', styles: { 'background-color': '#004', color: '#fff' } }; (function () {
    function g (a, b) { const c = l.exec(a); const d = l.exec(b); if (c) { if (!c[2] && d[2] == 'px') return d[1]; if (c[2] == 'px' && !d[2]) return d[1] + 'px' } return b } const k = CKEDITOR.htmlParser.cssStyle; const h = CKEDITOR.tools.cssLength; var l = /^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i; const m = {
      elements: {
        $: function (a) {
          let b = a.attributes; if ((b = (b = (b = b && b['data-cke-realelement']) && new CKEDITOR.htmlParser.fragment.fromHtml(decodeURIComponent(b))) && b.children[0]) && a.attributes['data-cke-resizable']) {
            var c = (new k(a)).rules; a = b.attributes; const d = c.width
            var c = c.height; d && (a.width = g(a.width, d)); c && (a.height = g(a.height, c))
          } return b
        }
      }
    }; CKEDITOR.plugins.add('fakeobjects', { init: function (a) { a.filter.allow('img[!data-cke-realelement,src,alt,title](*){*}', 'fakeobjects') }, afterInit: function (a) { (a = (a = a.dataProcessor) && a.htmlFilter) && a.addRules(m, { applyToAll: !0 }) } }); CKEDITOR.editor.prototype.createFakeElement = function (a, b, c, d) {
      var e = this.lang.fakeobjects; var e = e[c] || e.unknown; b = {
        class: b,
        'data-cke-realelement': encodeURIComponent(a.getOuterHtml()),
        'data-cke-real-node-type': a.type,
        alt: e,
        title: e,
        align: a.getAttribute('align') || ''
      }; CKEDITOR.env.hc || (b.src = CKEDITOR.tools.transparentImageData); c && (b['data-cke-real-element-type'] = c); d && (b['data-cke-resizable'] = d, c = new k(), d = a.getAttribute('width'), a = a.getAttribute('height'), d && (c.rules.width = h(d)), a && (c.rules.height = h(a)), c.populate(b)); return this.document.createElement('img', { attributes: b })
    }; CKEDITOR.editor.prototype.createFakeParserElement = function (a, b, c, d) {
      var e = this.lang.fakeobjects; var e = e[c] || e.unknown; let f; f = new CKEDITOR.htmlParser.basicWriter()
      a.writeHtml(f); f = f.getHtml(); b = { class: b, 'data-cke-realelement': encodeURIComponent(f), 'data-cke-real-node-type': a.type, alt: e, title: e, align: a.attributes.align || '' }; CKEDITOR.env.hc || (b.src = CKEDITOR.tools.transparentImageData); c && (b['data-cke-real-element-type'] = c); d && (b['data-cke-resizable'] = d, d = a.attributes, a = new k(), c = d.width, d = d.height, void 0 !== c && (a.rules.width = h(c)), void 0 !== d && (a.rules.height = h(d)), a.populate(b)); return new CKEDITOR.htmlParser.element('img', b)
    }; CKEDITOR.editor.prototype.restoreRealElement =
function (a) { if (a.data('cke-real-node-type') != CKEDITOR.NODE_ELEMENT) return null; const b = CKEDITOR.dom.element.createFromHtml(decodeURIComponent(a.data('cke-realelement')), this.document); if (a.data('cke-resizable')) { const c = a.getStyle('width'); a = a.getStyle('height'); c && b.setAttribute('width', g(b.getAttribute('width'), c)); a && b.setAttribute('height', g(b.getAttribute('height'), a)) } return b }
  })(); (function () {
    function d (a) { a = a.attributes; return a.type == 'application/x-shockwave-flash' || f.test(a.src || '') } function e (a, b) { return a.createFakeParserElement(b, 'cke_flash', 'flash', !0) } var f = /\.swf(?:$|\?)/i; CKEDITOR.plugins.add('flash', {
      requires: 'dialog,fakeobjects',
      onLoad: function () { CKEDITOR.addCss('img.cke_flash{background-image: url(' + CKEDITOR.getUrl(this.path + 'images/placeholder.png') + ');background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 80px;height: 80px;}') },
      init: function (a) {
        let b = 'object[classid,codebase,height,hspace,vspace,width];param[name,value];embed[height,hspace,pluginspage,src,type,vspace,width]'; CKEDITOR.dialog.isTabEnabled(a, 'flash', 'properties') && (b += ';object[align]; embed[allowscriptaccess,quality,scale,wmode]'); CKEDITOR.dialog.isTabEnabled(a, 'flash', 'advanced') && (b += ';object[id]{*}; embed[bgcolor]{*}(*)'); a.addCommand('flash', new CKEDITOR.dialogCommand('flash', { allowedContent: b, requiredContent: 'embed' })); a.ui.addButton && a.ui.addButton('Flash',
          { label: a.lang.common.flash, command: 'flash', toolbar: 'insert,20' }); CKEDITOR.dialog.add('flash', this.path + 'dialogs/flash.js'); a.addMenuItems && a.addMenuItems({ flash: { label: a.lang.flash.properties, command: 'flash', group: 'flash' } }); a.on('doubleclick', function (a) { const b = a.data.element; b.is('img') && b.data('cke-real-element-type') == 'flash' && (a.data.dialog = 'flash') }); a.contextMenu && a.contextMenu.addListener(function (a) { if (a && a.is('img') && !a.isReadOnly() && a.data('cke-real-element-type') == 'flash') return { flash: CKEDITOR.TRISTATE_OFF } })
      },
      afterInit: function (a) { let b = a.dataProcessor; (b = b && b.dataFilter) && b.addRules({ elements: { 'cke:object': function (b) { let c = b.attributes; if (!(c.classid && String(c.classid).toLowerCase() || d(b))) { for (c = 0; c < b.children.length; c++) if (b.children[c].name == 'cke:embed') { if (!d(b.children[c])) break; return e(a, b) } return null } return e(a, b) }, 'cke:embed': function (b) { return d(b) ? e(a, b) : null } } }, 5) }
    })
  })(); CKEDITOR.tools.extend(CKEDITOR.config, { flashEmbedTagOnly: !1, flashAddEmbedTag: !0, flashConvertOnEdit: !1 }); (function () {
    function k (a) {
      const l = a.config; const p = a.fire('uiSpace', { space: 'top', html: '' }).html; var t = (function () {
        function f (a, c, e) { b.setStyle(c, w(e)); b.setStyle('position', a) } function e (a) { const b = k.getDocumentPosition(); switch (a) { case 'top':f('absolute', 'top', b.y - q - r); break; case 'pin':f('fixed', 'top', x); break; case 'bottom':f('absolute', 'top', b.y + (c.height || c.bottom - c.top) + r) }m = a } let m; let k; let n; let c; let h; let q; let v; const p = l.floatSpaceDockedOffsetX || 0; var r = l.floatSpaceDockedOffsetY || 0; const u = l.floatSpacePinnedOffsetX || 0; var x = l.floatSpacePinnedOffsetY ||
0; return function (d) {
          if (k = a.editable()) {
            let f = d && d.name == 'focus'; f && b.show(); a.fire('floatingSpaceLayout', { show: f }); b.removeStyle('left'); b.removeStyle('right'); n = b.getClientRect(); c = k.getClientRect(); h = g.getViewPaneSize(); q = n.height; v = 'pageXOffset' in g.$ ? g.$.pageXOffset : CKEDITOR.document.$.documentElement.scrollLeft; m
              ? (q + r <= c.top ? e('top') : q + r > h.height - c.bottom ? e('pin') : e('bottom'), d = h.width / 2, d = l.floatSpacePreferRight
                  ? 'right'
                  : c.left > 0 && c.right < h.width && c.width > n.width
                    ? l.contentsLangDirection == 'rtl'
                      ? 'right'
                      : 'left'
                    : d - c.left > c.right - d ? 'left' : 'right', n.width > h.width ? (d = 'left', f = 0) : (f = d == 'left' ? c.left > 0 ? c.left : 0 : c.right < h.width ? h.width - c.right : 0, f + n.width > h.width && (d = d == 'left' ? 'right' : 'left', f = 0)), b.setStyle(d, w((m == 'pin' ? u : p) + f + (m == 'pin' ? 0 : d == 'left' ? v : -v))))
              : (m = 'pin', e('pin'), t(d))
          }
        }
      }()); if (p) {
        const k = new CKEDITOR.template('\x3cdiv id\x3d"cke_{name}" class\x3d"cke {id} cke_reset_all cke_chrome cke_editor_{name} cke_float cke_{langDir} ' + CKEDITOR.env.cssClass + '" dir\x3d"{langDir}" title\x3d"' + (CKEDITOR.env.gecko
          ? ' '
          : '') + '" lang\x3d"{langCode}" role\x3d"application" style\x3d"{style}"' + (a.title ? ' aria-labelledby\x3d"cke_{name}_arialbl"' : ' ') + '\x3e' + (a.title ? '\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e' : ' ') + '\x3cdiv class\x3d"cke_inner"\x3e\x3cdiv id\x3d"{topId}" class\x3d"cke_top" role\x3d"presentation"\x3e{content}\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e'); var b = CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml(k.output({
          content: p,
          id: a.id,
          langDir: a.lang.dir,
          langCode: a.langCode,
          name: a.name,
          style: 'display:none;z-index:' + (l.baseFloatZIndex - 1),
          topId: a.ui.spaceId('top'),
          voiceLabel: a.title
        }))); const u = CKEDITOR.tools.eventsBuffer(500, t); const e = CKEDITOR.tools.eventsBuffer(100, t); b.unselectable(); b.on('mousedown', function (a) { a = a.data; a.getTarget().hasAscendant('a', 1) || a.preventDefault() }); a.on('focus', function (b) { t(b); a.on('change', u.input); g.on('scroll', e.input); g.on('resize', e.input) }); a.on('blur', function () {
          b.hide(); a.removeListener('change', u.input); g.removeListener('scroll',
            e.input); g.removeListener('resize', e.input)
        }); a.on('destroy', function () { g.removeListener('scroll', e.input); g.removeListener('resize', e.input); b.clearCustomData(); b.remove() }); a.focusManager.hasFocus && b.show(); a.focusManager.add(b, 1)
      }
    } var g = CKEDITOR.document.getWindow(); var w = CKEDITOR.tools.cssLength; CKEDITOR.plugins.add('floatingspace', { init: function (a) { a.on('loaded', function () { k(this) }, null, null, 20) } })
  })(); CKEDITOR.plugins.add('listblock', {
    requires: 'panel',
    onLoad: function () {
      const f = CKEDITOR.addTemplate('panel-list', '\x3cul role\x3d"presentation" class\x3d"cke_panel_list"\x3e{items}\x3c/ul\x3e'); const g = CKEDITOR.addTemplate('panel-list-item', '\x3cli id\x3d"{id}" class\x3d"cke_panel_listItem" role\x3dpresentation\x3e\x3ca id\x3d"{id}_option" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"{title}" href\x3d"javascript:void(\'{val}\')"  {onclick}\x3d"CKEDITOR.tools.callFunction({clickFn},\'{val}\'); return false;" role\x3d"option"\x3e{text}\x3c/a\x3e\x3c/li\x3e')
      const h = CKEDITOR.addTemplate('panel-list-group', '\x3ch1 id\x3d"{id}" class\x3d"cke_panel_grouptitle" role\x3d"presentation" \x3e{label}\x3c/h1\x3e'); const k = /\'/g; CKEDITOR.ui.panel.prototype.addListBlock = function (a, b) { return this.addBlock(a, new CKEDITOR.ui.listBlock(this.getHolderElement(), b)) }; CKEDITOR.ui.listBlock = CKEDITOR.tools.createClass({
        base: CKEDITOR.ui.panel.block,
        $: function (a, b) {
          b = b || {}; let c = b.attributes || (b.attributes = {}); (this.multiSelect = !!b.multiSelect) && (c['aria-multiselectable'] = !0); !c.role &&
(c.role = 'listbox'); this.base.apply(this, arguments); this.element.setAttribute('role', c.role); c = this.keys; c[40] = 'next'; c[9] = 'next'; c[38] = 'prev'; c[CKEDITOR.SHIFT + 9] = 'prev'; c[32] = CKEDITOR.env.ie ? 'mouseup' : 'click'; CKEDITOR.env.ie && (c[13] = 'mouseup'); this._.pendingHtml = []; this._.pendingList = []; this._.items = {}; this._.groups = {}
        },
        _: {
          close: function () { if (this._.started) { const a = f.output({ items: this._.pendingList.join('') }); this._.pendingList = []; this._.pendingHtml.push(a); delete this._.started } },
          getClick: function () {
            this._.click ||
(this._.click = CKEDITOR.tools.addFunction(function (a) { const b = this.toggle(a); if (this.onClick) this.onClick(a, b) }, this)); return this._.click
          }
        },
        proto: {
          add: function (a, b, c) {
            const d = CKEDITOR.tools.getNextId(); this._.started || (this._.started = 1, this._.size = this._.size || 0); this._.items[a] = d; let e; e = CKEDITOR.tools.htmlEncodeAttr(a).replace(k, "\\'"); a = { id: d, val: e, onclick: CKEDITOR.env.ie ? 'onclick\x3d"return false;" onmouseup' : 'onclick', clickFn: this._.getClick(), title: CKEDITOR.tools.htmlEncodeAttr(c || a), text: b || a }
            this._.pendingList.push(g.output(a))
          },
          startGroup: function (a) { this._.close(); const b = CKEDITOR.tools.getNextId(); this._.groups[a] = b; this._.pendingHtml.push(h.output({ id: b, label: a })) },
          commit: function () { this._.close(); this.element.appendHtml(this._.pendingHtml.join('')); delete this._.size; this._.pendingHtml = [] },
          toggle: function (a) { const b = this.isMarked(a); b ? this.unmark(a) : this.mark(a); return !b },
          hideGroup: function (a) {
            const b = (a = this.element.getDocument().getById(this._.groups[a])) && a.getNext(); a && (a.setStyle('display',
              'none'), b && b.getName() == 'ul' && b.setStyle('display', 'none'))
          },
          hideItem: function (a) { this.element.getDocument().getById(this._.items[a]).setStyle('display', 'none') },
          showAll: function () { let a = this._.items; const b = this._.groups; const c = this.element.getDocument(); let d; for (d in a)c.getById(a[d]).setStyle('display', ''); for (const e in b)a = c.getById(b[e]), d = a.getNext(), a.setStyle('display', ''), d && d.getName() == 'ul' && d.setStyle('display', '') },
          mark: function (a) {
            this.multiSelect || this.unmarkAll(); a = this._.items[a]; const b = this.element.getDocument().getById(a)
            b.addClass('cke_selected'); this.element.getDocument().getById(a + '_option').setAttribute('aria-selected', !0); this.onMark && this.onMark(b)
          },
          unmark: function (a) { const b = this.element.getDocument(); a = this._.items[a]; const c = b.getById(a); c.removeClass('cke_selected'); b.getById(a + '_option').removeAttribute('aria-selected'); this.onUnmark && this.onUnmark(c) },
          unmarkAll: function () {
            const a = this._.items; const b = this.element.getDocument(); let c; for (c in a) { const d = a[c]; b.getById(d).removeClass('cke_selected'); b.getById(d + '_option').removeAttribute('aria-selected') } this.onUnmark &&
this.onUnmark()
          },
          isMarked: function (a) { return this.element.getDocument().getById(this._.items[a]).hasClass('cke_selected') },
          focus: function (a) { this._.focusIndex = -1; const b = this.element.getElementsByTag('a'); let c; let d = -1; if (a) for (c = this.element.getDocument().getById(this._.items[a]).getFirst(); a = b.getItem(++d);) { if (a.equals(c)) { this._.focusIndex = d; break } } else this.element.focus(); c && setTimeout(function () { c.focus() }, 0) }
        }
      })
    }
  }); CKEDITOR.plugins.add('richcombo', { requires: 'floatpanel,listblock,button', beforeInit: function (d) { d.ui.addHandler(CKEDITOR.UI_RICHCOMBO, CKEDITOR.ui.richCombo.handler) } });
  (function () {
    var d = '\x3cspan id\x3d"{id}" class\x3d"cke_combo cke_combo__{name} {cls}" role\x3d"presentation"\x3e\x3cspan id\x3d"{id}_label" class\x3d"cke_combo_label"\x3e{label}\x3c/span\x3e\x3ca class\x3d"cke_combo_button" title\x3d"{title}" tabindex\x3d"-1"' + (CKEDITOR.env.gecko && !CKEDITOR.env.hc ? '' : " href\x3d\"javascript:void('{titleJs}')\"") + ' hidefocus\x3d"true" role\x3d"button" aria-labelledby\x3d"{id}_label" aria-haspopup\x3d"true"'; CKEDITOR.env.gecko && CKEDITOR.env.mac && (d += ' onkeypress\x3d"return false;"')
    CKEDITOR.env.gecko && (d += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"'); var d = d + (' onkeydown\x3d"return CKEDITOR.tools.callFunction({keydownFn},event,this);" onfocus\x3d"return CKEDITOR.tools.callFunction({focusFn},event);" ' + (CKEDITOR.env.ie ? 'onclick\x3d"return false;" onmouseup' : 'onclick') + '\x3d"CKEDITOR.tools.callFunction({clickFn},this);return false;"\x3e\x3cspan id\x3d"{id}_text" class\x3d"cke_combo_text cke_combo_inlinelabel"\x3e{label}\x3c/span\x3e\x3cspan class\x3d"cke_combo_open"\x3e\x3cspan class\x3d"cke_combo_arrow"\x3e' +
(CKEDITOR.env.hc ? '\x26#9660;' : CKEDITOR.env.air ? '\x26nbsp;' : '') + '\x3c/span\x3e\x3c/span\x3e\x3c/a\x3e\x3c/span\x3e'); const k = CKEDITOR.addTemplate('combo', d); CKEDITOR.UI_RICHCOMBO = 'richcombo'; CKEDITOR.ui.richCombo = CKEDITOR.tools.createClass({
      $: function (a) {
        CKEDITOR.tools.extend(this, a, { canGroup: !1, title: a.label, modes: { wysiwyg: 1 }, editorFocus: 1 }); a = this.panel || {}; delete this.panel; this.id = CKEDITOR.tools.getNextNumber(); this.document = a.parent && a.parent.getDocument() || CKEDITOR.document; a.className = 'cke_combopanel'
        a.block = { multiSelect: a.multiSelect, attributes: a.attributes }; a.toolbarRelated = !0; this._ = { panelDefinition: a, items: {} }
      },
      proto: {
        renderHtml: function (a) { const b = []; this.render(a, b); return b.join('') },
        render: function (a, b) {
          function g () { if (this.getState() != CKEDITOR.TRISTATE_ON) { let c = this.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED; a.readOnly && !this.readOnly && (c = CKEDITOR.TRISTATE_DISABLED); this.setState(c); this.setValue(''); c != CKEDITOR.TRISTATE_DISABLED && this.refresh && this.refresh() } } let d =
CKEDITOR.env; const h = 'cke_' + this.id; const e = CKEDITOR.tools.addFunction(function (b) { l && (a.unlockSelection(1), l = 0); c.execute(b) }, this); const f = this; var c = { id: h, combo: this, focus: function () { CKEDITOR.document.getById(h).getChild(1).focus() }, execute: function (c) { const b = f._; if (b.state != CKEDITOR.TRISTATE_DISABLED) if (f.createPanel(a), b.on)b.panel.hide(); else { f.commit(); const d = f.getValue(); d ? b.list.mark(d) : b.list.unmarkAll(); b.panel.showBlock(f.id, new CKEDITOR.dom.element(c), 4) } }, clickFn: e }; a.on('activeFilterChange', g, this); a.on('mode',
            g, this); a.on('selectionChange', g, this); !this.readOnly && a.on('readOnly', g, this); const m = CKEDITOR.tools.addFunction(function (b, d) { b = new CKEDITOR.dom.event(b); const g = b.getKeystroke(); if (g == 40)a.once('panelShow', function (a) { a.data._.panel._.currentBlock.onKeyDown(40) }); switch (g) { case 13:case 32:case 40:CKEDITOR.tools.callFunction(e, d); break; default:c.onkey(c, g) }b.preventDefault() }); const n = CKEDITOR.tools.addFunction(function () { c.onfocus && c.onfocus() }); var l = 0; c.keyDownFn = m; d = {
            id: h,
            name: this.name || this.command,
            label: this.label,
            title: this.title,
            cls: this.className || '',
            titleJs: d.gecko && !d.hc ? '' : (this.title || '').replace("'", ''),
            keydownFn: m,
            focusFn: n,
            clickFn: e
          }; k.output(d, b); if (this.onRender) this.onRender(); return c
        },
        createPanel: function (a) {
          if (!this._.panel) {
            const b = this._.panelDefinition; const d = this._.panelDefinition.block; const k = b.parent || CKEDITOR.document.getBody(); const h = 'cke_combopanel__' + this.name; const e = new CKEDITOR.ui.floatPanel(a, k, b); const f = e.addListBlock(this.id, d); const c = this; e.onShow = function () {
              this.element.addClass(h); c.setState(CKEDITOR.TRISTATE_ON)
              c._.on = 1; c.editorFocus && !a.focusManager.hasFocus && a.focus(); if (c.onOpen)c.onOpen(); a.once('panelShow', function () { f.focus(!f.multiSelect && c.getValue()) })
            }; e.onHide = function (b) { this.element.removeClass(h); c.setState(c.modes && c.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED); c._.on = 0; if (!b && c.onClose)c.onClose() }; e.onEscape = function () { e.hide(1) }; f.onClick = function (a, b) { c.onClick && c.onClick.call(c, a, b); e.hide() }; this._.panel = e; this._.list = f; e.getBlock(this.id).onHide = function () {
              c._.on =
0; c.setState(CKEDITOR.TRISTATE_OFF)
            }; this.init && this.init()
          }
        },
        setValue: function (a, b) { this._.value = a; const d = this.document.getById('cke_' + this.id + '_text'); d && (a || b ? d.removeClass('cke_combo_inlinelabel') : (b = this.label, d.addClass('cke_combo_inlinelabel')), d.setText(typeof b !== 'undefined' ? b : a)) },
        getValue: function () { return this._.value || '' },
        unmarkAll: function () { this._.list.unmarkAll() },
        mark: function (a) { this._.list.mark(a) },
        hideItem: function (a) { this._.list.hideItem(a) },
        hideGroup: function (a) { this._.list.hideGroup(a) },
        showAll: function () { this._.list.showAll() },
        add: function (a, b, d) { this._.items[a] = d || a; this._.list.add(a, b, d) },
        startGroup: function (a) { this._.list.startGroup(a) },
        commit: function () { this._.committed || (this._.list.commit(), this._.committed = 1, CKEDITOR.ui.fire('ready', this)); this._.committed = 1 },
        setState: function (a) {
          if (this._.state != a) {
            const b = this.document.getById('cke_' + this.id); b.setState(a, 'cke_combo'); a == CKEDITOR.TRISTATE_DISABLED ? b.setAttribute('aria-disabled', !0) : b.removeAttribute('aria-disabled'); this._.state =
a
          }
        },
        getState: function () { return this._.state },
        enable: function () { this._.state == CKEDITOR.TRISTATE_DISABLED && this.setState(this._.lastState) },
        disable: function () { this._.state != CKEDITOR.TRISTATE_DISABLED && (this._.lastState = this._.state, this.setState(CKEDITOR.TRISTATE_DISABLED)) }
      },
      statics: { handler: { create: function (a) { return new CKEDITOR.ui.richCombo(a) } } }
    }); CKEDITOR.ui.prototype.addRichCombo = function (a, b) { this.add(a, CKEDITOR.UI_RICHCOMBO, b) }
  })(); (function () {
    function n (a, c, k, d, q, n, u, w) {
      const x = a.config; const r = new CKEDITOR.style(u); const f = q.split(';'); q = []; for (var m = {}, g = 0; g < f.length; g++) { var l = f[g]; if (l) { var l = l.split('/'); const v = {}; const p = f[g] = l[0]; v[k] = q[g] = l[1] || p; m[p] = new CKEDITOR.style(u, v); m[p]._.definition.name = p } else f.splice(g--, 1) }a.ui.addRichCombo(c, {
        label: d.label,
        title: d.panelTitle,
        toolbar: 'styles,' + w,
        allowedContent: r,
        requiredContent: r,
        contentTransformations: [[{
          element: 'font',
          check: 'span',
          left: function (b) {
            return !!b.attributes.size || !!b.attributes.align ||
!!b.attributes.face
          },
          right: function (b) { const a = ' x-small small medium large x-large xx-large 48px'.split(' '); b.name = 'span'; b.attributes.size && (b.styles['font-size'] = a[b.attributes.size], delete b.attributes.size); b.attributes.align && (b.styles['text-align'] = b.attributes.align, delete b.attributes.align); b.attributes.face && (b.styles['font-family'] = b.attributes.face, delete b.attributes.face) }
        }]],
        panel: { css: [CKEDITOR.skin.getPath('editor')].concat(x.contentsCss), multiSelect: !1, attributes: { 'aria-label': d.panelTitle } },
        init: function () { this.startGroup(d.panelTitle); for (let b = 0; b < f.length; b++) { const a = f[b]; this.add(a, m[a].buildPreview(), a) } },
        onClick: function (b) {
          a.focus(); a.fire('saveSnapshot'); const c = this.getValue(); const k = m[b]; if (c && b != c) {
            const d = m[c]; const e = a.getSelection().getRanges()[0]; if (e.collapsed) {
              let f = a.elementPath(); const h = f.contains(function (a) { return d.checkElementRemovable(a) }); if (h) {
                let g = e.checkBoundaryOfElement(h, CKEDITOR.START); const l = e.checkBoundaryOfElement(h, CKEDITOR.END); if (g && l) {
                  for (g = e.createBookmark(); f = h.getFirst();)f.insertBefore(h)
                  h.remove(); e.moveToBookmark(g)
                } else g ? e.moveToPosition(h, CKEDITOR.POSITION_BEFORE_START) : l ? e.moveToPosition(h, CKEDITOR.POSITION_AFTER_END) : (e.splitElement(h), e.moveToPosition(h, CKEDITOR.POSITION_AFTER_END), t(e, f.elements.slice(), h)); a.getSelection().selectRanges([e])
              }
            } else a.removeStyle(d)
          }a[c == b ? 'removeStyle' : 'applyStyle'](k); a.fire('saveSnapshot')
        },
        onRender: function () {
          a.on('selectionChange', function (b) {
            const c = this.getValue(); b = b.data.path.elements; for (var d = 0, f; d < b.length; d++) {
              f = b[d]; for (const e in m) {
                if (m[e].checkElementMatch(f,
                  !0, a)) { e != c && this.setValue(e); return }
              }
            } this.setValue('', n)
          }, this)
        },
        refresh: function () { a.activeFilter.check(r) || this.setState(CKEDITOR.TRISTATE_DISABLED) }
      })
    } function t (a, c, k) { const d = c.pop(); if (d) { if (k) return t(a, c, d.equals(k) ? null : k); k = d.clone(); a.insertNode(k); a.moveToPosition(k, CKEDITOR.POSITION_AFTER_START); t(a, c) } }CKEDITOR.plugins.add('font', {
      requires: 'richcombo',
      init: function (a) {
        const c = a.config; n(a, 'Font', 'family', a.lang.font, c.font_names, c.font_defaultLabel, c.font_style, 30); n(a, 'FontSize', 'size',
          a.lang.font.fontSize, c.fontSize_sizes, c.fontSize_defaultLabel, c.fontSize_style, 40)
      }
    })
  })(); CKEDITOR.config.font_names = 'Arial/Arial, Helvetica, sans-serif;Comic Sans MS/Comic Sans MS, cursive;Courier New/Courier New, Courier, monospace;Georgia/Georgia, serif;Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;Tahoma/Tahoma, Geneva, sans-serif;Times New Roman/Times New Roman, Times, serif;Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;Verdana/Verdana, Geneva, sans-serif'
  CKEDITOR.config.font_defaultLabel = ''; CKEDITOR.config.font_style = { element: 'span', styles: { 'font-family': '#(family)' }, overrides: [{ element: 'font', attributes: { face: null } }] }; CKEDITOR.config.fontSize_sizes = '8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px'; CKEDITOR.config.fontSize_defaultLabel = ''; CKEDITOR.config.fontSize_style = { element: 'span', styles: { 'font-size': '#(size)' }, overrides: [{ element: 'font', attributes: { size: null } }] }; CKEDITOR.plugins.add('forms', {
    requires: 'dialog,fakeobjects',
    onLoad: function () { CKEDITOR.addCss('.cke_editable form{border: 1px dotted #FF0000;padding: 2px;}\n'); CKEDITOR.addCss('img.cke_hidden{background-image: url(' + CKEDITOR.getUrl(this.path + 'images/hiddenfield.gif') + ');background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 16px !important;height: 16px !important;}') },
    init: function (a) {
      const b = a.lang; let g = 0; const h = { email: 1, password: 1, search: 1, tel: 1, text: 1, url: 1 }; const l = {
        checkbox: 'input[type,name,checked,required]',
        radio: 'input[type,name,checked,required]',
        textfield: 'input[type,name,value,size,maxlength,required]',
        textarea: 'textarea[cols,rows,name,required]',
        select: 'select[name,size,multiple,required]; option[value,selected]',
        button: 'input[type,name,value]',
        form: 'form[action,name,id,enctype,target,method]',
        hiddenfield: 'input[type,name,value]',
        imagebutton: 'input[type,alt,src]{width,height,border,border-width,border-style,margin,float}'
      }; const m = {
        checkbox: 'input',
        radio: 'input',
        textfield: 'input',
        textarea: 'textarea',
        select: 'select',
        button: 'input',
        form: 'form',
        hiddenfield: 'input',
        imagebutton: 'input'
      }; let e = function (d, c, e) { const h = { allowedContent: l[c], requiredContent: m[c] }; c == 'form' && (h.context = 'form'); a.addCommand(c, new CKEDITOR.dialogCommand(c, h)); a.ui.addButton && a.ui.addButton(d, { label: b.common[d.charAt(0).toLowerCase() + d.slice(1)], command: c, toolbar: 'forms,' + (g += 10) }); CKEDITOR.dialog.add(c, e) }; const f = this.path + 'dialogs/'; !a.blockless && e('Form', 'form', f + 'form.js'); e('Checkbox', 'checkbox', f + 'checkbox.js'); e('Radio', 'radio',
        f + 'radio.js'); e('TextField', 'textfield', f + 'textfield.js'); e('Textarea', 'textarea', f + 'textarea.js'); e('Select', 'select', f + 'select.js'); e('Button', 'button', f + 'button.js'); const k = a.plugins.image; k && !a.plugins.image2 && e('ImageButton', 'imagebutton', CKEDITOR.plugins.getPath('image') + 'dialogs/image.js'); e('HiddenField', 'hiddenfield', f + 'hiddenfield.js'); a.addMenuItems && (e = {
        checkbox: { label: b.forms.checkboxAndRadio.checkboxTitle, command: 'checkbox', group: 'checkbox' },
        radio: {
          label: b.forms.checkboxAndRadio.radioTitle,
          command: 'radio',
          group: 'radio'
        },
        textfield: { label: b.forms.textfield.title, command: 'textfield', group: 'textfield' },
        hiddenfield: { label: b.forms.hidden.title, command: 'hiddenfield', group: 'hiddenfield' },
        button: { label: b.forms.button.title, command: 'button', group: 'button' },
        select: { label: b.forms.select.title, command: 'select', group: 'select' },
        textarea: { label: b.forms.textarea.title, command: 'textarea', group: 'textarea' }
      }, k && (e.imagebutton = { label: b.image.titleButton, command: 'imagebutton', group: 'imagebutton' }), !a.blockless &&
(e.form = { label: b.forms.form.menu, command: 'form', group: 'form' }), a.addMenuItems(e)); a.contextMenu && (!a.blockless && a.contextMenu.addListener(function (d, c, a) { if ((d = a.contains('form', 1)) && !d.isReadOnly()) return { form: CKEDITOR.TRISTATE_OFF } }), a.contextMenu.addListener(function (d) {
        if (d && !d.isReadOnly()) {
          const c = d.getName(); if (c == 'select') return { select: CKEDITOR.TRISTATE_OFF }; if (c == 'textarea') return { textarea: CKEDITOR.TRISTATE_OFF }; if (c == 'input') {
            const a = d.getAttribute('type') || 'text'; switch (a) {
              case 'button':case 'submit':case 'reset':return { button: CKEDITOR.TRISTATE_OFF }
              case 'checkbox':return { checkbox: CKEDITOR.TRISTATE_OFF }; case 'radio':return { radio: CKEDITOR.TRISTATE_OFF }; case 'image':return k ? { imagebutton: CKEDITOR.TRISTATE_OFF } : null
            } if (h[a]) return { textfield: CKEDITOR.TRISTATE_OFF }
          } if (c == 'img' && d.data('cke-real-element-type') == 'hiddenfield') return { hiddenfield: CKEDITOR.TRISTATE_OFF }
        }
      })); a.on('doubleclick', function (d) {
        let c = d.data.element; if (!a.blockless && c.is('form'))d.data.dialog = 'form'; else if (c.is('select'))d.data.dialog = 'select'; else if (c.is('textarea')) {
          d.data.dialog =
'textarea'
        } else if (c.is('img') && c.data('cke-real-element-type') == 'hiddenfield')d.data.dialog = 'hiddenfield'; else if (c.is('input')) { c = c.getAttribute('type') || 'text'; switch (c) { case 'button':case 'submit':case 'reset':d.data.dialog = 'button'; break; case 'checkbox':d.data.dialog = 'checkbox'; break; case 'radio':d.data.dialog = 'radio'; break; case 'image':d.data.dialog = 'imagebutton' }h[c] && (d.data.dialog = 'textfield') }
      })
    },
    afterInit: function (a) {
      var b = a.dataProcessor; const g = b && b.htmlFilter; var b = b && b.dataFilter; CKEDITOR.env.ie &&
g && g.addRules({ elements: { input: function (a) { a = a.attributes; const b = a.type; b || (a.type = 'text'); b != 'checkbox' && b != 'radio' || a.value != 'on' || delete a.value } } }, { applyToAll: !0 }); b && b.addRules({ elements: { input: function (b) { if (b.attributes.type == 'hidden') return a.createFakeParserElement(b, 'cke_hidden', 'hiddenfield') } } }, { applyToAll: !0 })
    }
  }); CKEDITOR.plugins.add('format', {
    requires: 'richcombo',
    init: function (a) {
      if (!a.blockless) {
        for (var f = a.config, c = a.lang.format, l = f.format_tags.split(';'), d = {}, m = 0, n = [], g = 0; g < l.length; g++) { const h = l[g]; const k = new CKEDITOR.style(f['format_' + h]); if (!a.filter.customConfig || a.filter.check(k))m++, d[h] = k, d[h]._.enterMode = a.config.enterMode, n.push(k) }m !== 0 && a.ui.addRichCombo('Format', {
          label: c.label,
          title: c.panelTitle,
          toolbar: 'styles,20',
          allowedContent: n,
          panel: {
            css: [CKEDITOR.skin.getPath('editor')].concat(f.contentsCss),
            multiSelect: !1,
            attributes: { 'aria-label': c.panelTitle }
          },
          init: function () { this.startGroup(c.panelTitle); for (const a in d) { const e = c['tag_' + a]; this.add(a, d[a].buildPreview(e), e) } },
          onClick: function (b) { a.focus(); a.fire('saveSnapshot'); b = d[b]; const e = a.elementPath(); a[b.checkActive(e, a) ? 'removeStyle' : 'applyStyle'](b); setTimeout(function () { a.fire('saveSnapshot') }, 0) },
          onRender: function () {
            a.on('selectionChange', function (b) {
              const e = this.getValue(); b = b.data.path; this.refresh(); for (const c in d) {
                if (d[c].checkActive(b, a)) {
                  c !=
e && this.setValue(c, a.lang.format['tag_' + c]); return
                }
              } this.setValue('')
            }, this)
          },
          onOpen: function () { this.showAll(); for (const b in d)a.activeFilter.check(d[b]) || this.hideItem(b) },
          refresh: function () { const b = a.elementPath(); if (b) { if (b.isContextFor('p')) for (const c in d) if (a.activeFilter.check(d[c])) return; this.setState(CKEDITOR.TRISTATE_DISABLED) } }
        })
      }
    }
  }); CKEDITOR.config.format_tags = 'p;h1;h2;h3;h4;h5;h6;pre;address;div'; CKEDITOR.config.format_p = { element: 'p' }; CKEDITOR.config.format_div = { element: 'div' }
  CKEDITOR.config.format_pre = { element: 'pre' }; CKEDITOR.config.format_address = { element: 'address' }; CKEDITOR.config.format_h1 = { element: 'h1' }; CKEDITOR.config.format_h2 = { element: 'h2' }; CKEDITOR.config.format_h3 = { element: 'h3' }; CKEDITOR.config.format_h4 = { element: 'h4' }; CKEDITOR.config.format_h5 = { element: 'h5' }; CKEDITOR.config.format_h6 = { element: 'h6' }; (function () { const b = { canUndo: !1, exec: function (a) { const b = a.document.createElement('hr'); a.insertElement(b) }, allowedContent: 'hr', requiredContent: 'hr' }; CKEDITOR.plugins.add('horizontalrule', { init: function (a) { a.blockless || (a.addCommand('horizontalrule', b), a.ui.addButton && a.ui.addButton('HorizontalRule', { label: a.lang.horizontalrule.toolbar, command: 'horizontalrule', toolbar: 'insert,40' })) } }) })(); CKEDITOR.plugins.add('htmlwriter', { init: function (b) { const a = new CKEDITOR.htmlWriter(); a.forceSimpleAmpersand = b.config.forceSimpleAmpersand; a.indentationChars = b.config.dataIndentationChars || '\t'; b.dataProcessor.writer = a } })
  CKEDITOR.htmlWriter = CKEDITOR.tools.createClass({
    base: CKEDITOR.htmlParser.basicWriter,
    $: function () {
      this.base(); this.indentationChars = '\t'; this.selfClosingEnd = ' /\x3e'; this.lineBreakChars = '\n'; this.sortAttributes = 1; this._.indent = 0; this._.indentation = ''; this._.inPre = 0; this._.rules = {}; const b = CKEDITOR.dtd; let a; for (a in CKEDITOR.tools.extend({}, b.$nonBodyContent, b.$block, b.$listItem, b.$tableContent)) {
        this.setRules(a, {
          indent: !b[a]['#'],
          breakBeforeOpen: 1,
          breakBeforeClose: !b[a]['#'],
          breakAfterClose: 1,
          needsSpace: a in
b.$block && !(a in { li: 1, dt: 1, dd: 1 })
        })
      } this.setRules('br', { breakAfterOpen: 1 }); this.setRules('title', { indent: 0, breakAfterOpen: 0 }); this.setRules('style', { indent: 0, breakBeforeClose: 1 }); this.setRules('pre', { breakAfterOpen: 1, indent: 0 })
    },
    proto: {
      openTag: function (b) { const a = this._.rules[b]; this._.afterCloser && a && a.needsSpace && this._.needsSpace && this._.output.push('\n'); this._.indent ? this.indentation() : a && a.breakBeforeOpen && (this.lineBreak(), this.indentation()); this._.output.push('\x3c', b); this._.afterCloser = 0 },
      openTagClose: function (b, a) { const c = this._.rules[b]; a ? (this._.output.push(this.selfClosingEnd), c && c.breakAfterClose && (this._.needsSpace = c.needsSpace)) : (this._.output.push('\x3e'), c && c.indent && (this._.indentation += this.indentationChars)); c && c.breakAfterOpen && this.lineBreak(); b == 'pre' && (this._.inPre = 1) },
      attribute: function (b, a) { typeof a === 'string' && (this.forceSimpleAmpersand && (a = a.replace(/&amp;/g, '\x26')), a = CKEDITOR.tools.htmlEncodeAttr(a)); this._.output.push(' ', b, '\x3d"', a, '"') },
      closeTag: function (b) {
        const a =
this._.rules[b]; a && a.indent && (this._.indentation = this._.indentation.substr(this.indentationChars.length)); this._.indent ? this.indentation() : a && a.breakBeforeClose && (this.lineBreak(), this.indentation()); this._.output.push('\x3c/', b, '\x3e'); b == 'pre' && (this._.inPre = 0); a && a.breakAfterClose && (this.lineBreak(), this._.needsSpace = a.needsSpace); this._.afterCloser = 1
      },
      text: function (b) { this._.indent && (this.indentation(), !this._.inPre && (b = CKEDITOR.tools.ltrim(b))); this._.output.push(b) },
      comment: function (b) {
        this._.indent &&
this.indentation(); this._.output.push('\x3c!--', b, '--\x3e')
      },
      lineBreak: function () { !this._.inPre && this._.output.length > 0 && this._.output.push(this.lineBreakChars); this._.indent = 1 },
      indentation: function () { !this._.inPre && this._.indentation && this._.output.push(this._.indentation); this._.indent = 0 },
      reset: function () { this._.output = []; this._.indent = 0; this._.indentation = ''; this._.afterCloser = 0; this._.inPre = 0; this._.needsSpace = 0 },
      setRules: function (b, a) {
        const c = this._.rules[b]; c
          ? CKEDITOR.tools.extend(c, a, !0)
          : this._.rules[b] =
a
      }
    }
  }); (function () {
    CKEDITOR.plugins.add('iframe', {
      requires: 'dialog,fakeobjects',
      onLoad: function () { CKEDITOR.addCss('img.cke_iframe{background-image: url(' + CKEDITOR.getUrl(this.path + 'images/placeholder.png') + ');background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 80px;height: 80px;}') },
      init: function (a) {
        const b = a.lang.iframe; let c = 'iframe[align,longdesc,frameborder,height,name,scrolling,src,title,width]'; a.plugins.dialogadvtab && (c += ';iframe' + a.plugins.dialogadvtab.allowedContent({
          id: 1,
          classes: 1,
          styles: 1
        })); CKEDITOR.dialog.add('iframe', this.path + 'dialogs/iframe.js'); a.addCommand('iframe', new CKEDITOR.dialogCommand('iframe', { allowedContent: c, requiredContent: 'iframe' })); a.ui.addButton && a.ui.addButton('Iframe', { label: b.toolbar, command: 'iframe', toolbar: 'insert,80' }); a.on('doubleclick', function (a) { const b = a.data.element; b.is('img') && b.data('cke-real-element-type') == 'iframe' && (a.data.dialog = 'iframe') }); a.addMenuItems && a.addMenuItems({ iframe: { label: b.title, command: 'iframe', group: 'image' } })
        a.contextMenu && a.contextMenu.addListener(function (a) { if (a && a.is('img') && a.data('cke-real-element-type') == 'iframe') return { iframe: CKEDITOR.TRISTATE_OFF } })
      },
      afterInit: function (a) { let b = a.dataProcessor; (b = b && b.dataFilter) && b.addRules({ elements: { iframe: function (b) { return a.createFakeParserElement(b, 'cke_iframe', 'iframe', !0) } } }) }
    })
  })(); (function () {
    function m (a) {
      function f (a) { let b = !1; g.attachListener(g, 'keydown', function () { const d = c.getBody().getElementsByTag(a); if (!b) { for (let e = 0; e < d.count(); e++)d.getItem(e).setCustomData('retain', !0); b = !0 } }, null, null, 1); g.attachListener(g, 'keyup', function () { const d = c.getElementsByTag(a); b && (d.count() != 1 || d.getItem(0).getCustomData('retain') || d.getItem(0).hasAttribute('data-cke-temp') || d.getItem(0).remove(1), b = !1) }) } const b = this.editor; var c = a.document; let d = c.body; let e = c.getElementById('cke_actscrpt'); e && e.parentNode.removeChild(e);
      (e = c.getElementById('cke_shimscrpt')) && e.parentNode.removeChild(e); (e = c.getElementById('cke_basetagscrpt')) && e.parentNode.removeChild(e); d.contentEditable = !0; CKEDITOR.env.ie && (d.hideFocus = !0, d.disabled = !0, d.removeAttribute('disabled')); delete this._.isLoadingData; this.$ = d; c = new CKEDITOR.dom.document(c); this.setup(); this.fixInitialSelection(); var g = this; CKEDITOR.env.ie && !CKEDITOR.env.edge && c.getDocumentElement().addClass(c.$.compatMode); CKEDITOR.env.ie && !CKEDITOR.env.edge && b.enterMode != CKEDITOR.ENTER_P
        ? f('p')
        : CKEDITOR.env.edge && b.enterMode != CKEDITOR.ENTER_DIV && f('div'); if (CKEDITOR.env.webkit || CKEDITOR.env.ie && CKEDITOR.env.version > 10)c.getDocumentElement().on('mousedown', function (a) { a.data.getTarget().is('html') && setTimeout(function () { b.editable().focus() }) }); n(b); try { b.document.$.execCommand('2D-position', !1, !0) } catch (h) {}(CKEDITOR.env.gecko || CKEDITOR.env.ie && b.document.$.compatMode == 'CSS1Compat') && this.attachListener(this, 'keydown', function (a) {
        const c = a.data.getKeystroke(); if (c == 33 || c == 34) {
          if (CKEDITOR.env.ie) {
            setTimeout(function () { b.getSelection().scrollIntoView() },
              0)
          } else if (b.window.$.innerHeight > this.$.offsetHeight) { const d = b.createRange(); d[c == 33 ? 'moveToElementEditStart' : 'moveToElementEditEnd'](this); d.select(); a.data.preventDefault() }
        }
      }); CKEDITOR.env.ie && this.attachListener(c, 'blur', function () { try { c.$.selection.empty() } catch (a) {} }); CKEDITOR.env.iOS && this.attachListener(c, 'touchend', function () { a.focus() }); d = b.document.getElementsByTag('title').getItem(0); d.data('cke-title', d.getText()); CKEDITOR.env.ie && (b.document.$.title = this._.docTitle); CKEDITOR.tools.setTimeout(function () {
        this.status ==
'unloaded' && (this.status = 'ready'); b.fire('contentDom'); this._.isPendingFocus && (b.focus(), this._.isPendingFocus = !1); setTimeout(function () { b.fire('dataReady') }, 0)
      }, 0, this)
    } function n (a) {
      function f () { let c; a.editable().attachListener(a, 'selectionChange', function () { const d = a.getSelection().getSelectedElement(); d && (c && (c.detachEvent('onresizestart', b), c = null), d.$.attachEvent('onresizestart', b), c = d.$) }) } function b (a) { a.returnValue = !1 } if (CKEDITOR.env.gecko) {
        try {
          const c = a.document.$; c.execCommand('enableObjectResizing',
            !1, !a.config.disableObjectResizing); c.execCommand('enableInlineTableEditing', !1, !a.config.disableNativeTableHandles)
        } catch (d) {}
      } else CKEDITOR.env.ie && CKEDITOR.env.version < 11 && a.config.disableObjectResizing && f(a)
    } function p () {
      const a = []; if (CKEDITOR.document.$.documentMode >= 8) { a.push('html.CSS1Compat [contenteditable\x3dfalse]{min-height:0 !important}'); const f = []; let b; for (b in CKEDITOR.dtd.$removeEmpty)f.push('html.CSS1Compat ' + b + '[contenteditable\x3dfalse]'); a.push(f.join(',') + '{display:inline-block}') } else {
        CKEDITOR.env.gecko &&
(a.push('html{height:100% !important}'), a.push('img:-moz-broken{-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}'))
      }a.push('html{cursor:text;*cursor:auto}'); a.push('img,input,textarea{cursor:default}'); return a.join('\n')
    } let l; CKEDITOR.plugins.add('wysiwygarea', {
      init: function (a) {
        a.config.fullPage && a.addFeature({ allowedContent: 'html head title; style [media,type]; body (*)[id]; meta link [*]', requiredContent: 'body' }); a.addMode('wysiwyg', function (f) {
          function b (b) {
            b && b.removeListener()
            a.editable(new l(a, d.$.contentWindow.document.body)); a.setData(a.getData(1), f)
          } var c = 'document.open();' + (CKEDITOR.env.ie ? '(' + CKEDITOR.tools.fixDomain + ')();' : '') + 'document.close();'; var c = CKEDITOR.env.air ? 'javascript:void(0)' : CKEDITOR.env.ie && !CKEDITOR.env.edge ? 'javascript:void(function(){' + encodeURIComponent(c) + '}())' : ''; var d = CKEDITOR.dom.element.createFromHtml('\x3ciframe src\x3d"' + c + '" frameBorder\x3d"0"\x3e\x3c/iframe\x3e'); d.setStyles({ width: '100%', height: '100%' }); d.addClass('cke_wysiwyg_frame').addClass('cke_reset')
          c = a.ui.space('contents'); c.append(d); const e = CKEDITOR.env.ie && !CKEDITOR.env.edge || CKEDITOR.env.gecko; if (e)d.on('load', b); var g = a.title; const h = a.fire('ariaEditorHelpLabel', {}).label; g && (CKEDITOR.env.ie && h && (g += ', ' + h), d.setAttribute('title', g)); if (h) { var g = CKEDITOR.tools.getNextId(); var k = CKEDITOR.dom.element.createFromHtml('\x3cspan id\x3d"' + g + '" class\x3d"cke_voice_label"\x3e' + h + '\x3c/span\x3e'); c.append(k, 1); d.setAttribute('aria-describedby', g) }a.on('beforeModeUnload', function (a) { a.removeListener(); k && k.remove() })
          d.setAttributes({ tabIndex: a.tabIndex, allowTransparency: 'true' }); !e && b(); a.fire('ariaWidget', d)
        })
      }
    }); CKEDITOR.editor.prototype.addContentsCss = function (a) { const f = this.config; const b = f.contentsCss; CKEDITOR.tools.isArray(b) || (f.contentsCss = b ? [b] : []); f.contentsCss.push(a) }; l = CKEDITOR.tools.createClass({
      $: function () { this.base.apply(this, arguments); this._.frameLoadedHandler = CKEDITOR.tools.addFunction(function (a) { CKEDITOR.tools.setTimeout(m, 0, this, a) }, this); this._.docTitle = this.getWindow().getFrame().getAttribute('title') },
      base: CKEDITOR.editable,
      proto: {
        setData: function (a, f) {
          const b = this.editor; if (f) this.setHtml(a), this.fixInitialSelection(), b.fire('dataReady'); else {
            this._.isLoadingData = !0; b._.dataStore = { id: 1 }; let c = b.config; const d = c.fullPage; let e = c.docType; let g = CKEDITOR.tools.buildStyleHtml(p()).replace(/<style>/, '\x3cstyle data-cke-temp\x3d"1"\x3e'); d || (g += CKEDITOR.tools.buildStyleHtml(b.config.contentsCss)); const h = c.baseHref ? '\x3cbase href\x3d"' + c.baseHref + '" data-cke-temp\x3d"1" /\x3e' : ''; d && (a = a.replace(/<!DOCTYPE[^>]*>/i, function (a) {
              b.docType =
e = a; return ''
            }).replace(/<\?xml\s[^\?]*\?>/i, function (a) { b.xmlDeclaration = a; return '' })); a = b.dataProcessor.toHtml(a); d
              ? (/<body[\s|>]/.test(a) || (a = '\x3cbody\x3e' + a), /<html[\s|>]/.test(a) || (a = '\x3chtml\x3e' + a + '\x3c/html\x3e'), /<head[\s|>]/.test(a) ? /<title[\s|>]/.test(a) || (a = a.replace(/<head[^>]*>/, '$\x26\x3ctitle\x3e\x3c/title\x3e')) : a = a.replace(/<html[^>]*>/, '$\x26\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e'), h && (a = a.replace(/<head[^>]*?>/, '$\x26' + h)), a = a.replace(/<\/head\s*>/, g + '$\x26'), a =
e + a)
              : a = c.docType + '\x3chtml dir\x3d"' + c.contentsLangDirection + '" lang\x3d"' + (c.contentsLanguage || b.langCode) + '"\x3e\x3chead\x3e\x3ctitle\x3e' + this._.docTitle + '\x3c/title\x3e' + h + g + '\x3c/head\x3e\x3cbody' + (c.bodyId ? ' id\x3d"' + c.bodyId + '"' : '') + (c.bodyClass ? ' class\x3d"' + c.bodyClass + '"' : '') + '\x3e' + a + '\x3c/body\x3e\x3c/html\x3e'; CKEDITOR.env.gecko && (a = a.replace(/<body/, '\x3cbody contenteditable\x3d"true" '), CKEDITOR.env.version < 2E4 && (a = a.replace(/<body[^>]*>/, '$\x26\x3c!-- cke-content-start --\x3e')))
            c = '\x3cscript id\x3d"cke_actscrpt" type\x3d"text/javascript"' + (CKEDITOR.env.ie ? ' defer\x3d"defer" ' : '') + '\x3evar wasLoaded\x3d0;function onload(){if(!wasLoaded)window.parent.CKEDITOR.tools.callFunction(' + this._.frameLoadedHandler + ',window);wasLoaded\x3d1;}' + (CKEDITOR.env.ie ? 'onload();' : 'document.addEventListener("DOMContentLoaded", onload, false );') + '\x3c/script\x3e'; CKEDITOR.env.ie && CKEDITOR.env.version < 9 && (c += '\x3cscript id\x3d"cke_shimscrpt"\x3ewindow.parent.CKEDITOR.tools.enableHtml5Elements(document)\x3c/script\x3e')
            h && CKEDITOR.env.ie && CKEDITOR.env.version < 10 && (c += '\x3cscript id\x3d"cke_basetagscrpt"\x3evar baseTag \x3d document.querySelector( "base" );baseTag.href \x3d baseTag.href;\x3c/script\x3e'); a = a.replace(/(?=\s*<\/(:?head)>)/, c); this.clearCustomData(); this.clearListeners(); b.fire('contentDomUnload'); const k = this.getDocument(); try { k.write(a) } catch (l) { setTimeout(function () { k.write(a) }, 0) }
          }
        },
        getData: function (a) {
          if (a) return this.getHtml(); a = this.editor; const f = a.config; var b = f.fullPage; const c = b && a.docType; const d = b && a.xmlDeclaration
          const e = this.getDocument(); var b = b ? e.getDocumentElement().getOuterHtml() : e.getBody().getHtml(); CKEDITOR.env.gecko && f.enterMode != CKEDITOR.ENTER_BR && (b = b.replace(/<br>(?=\s*(:?$|<\/body>))/, '')); b = a.dataProcessor.toDataFormat(b); d && (b = d + '\n' + b); c && (b = c + '\n' + b); return b
        },
        focus: function () { this._.isLoadingData ? this._.isPendingFocus = !0 : l.baseProto.focus.call(this) },
        detach: function () {
          let a = this.editor; const f = a.document; let b; try { b = a.window.getFrame() } catch (c) {}l.baseProto.detach.call(this); this.clearCustomData(); f.getDocumentElement().clearCustomData()
          CKEDITOR.tools.removeFunction(this._.frameLoadedHandler); b && b.getParent() ? (b.clearCustomData(), (a = b.removeCustomData('onResize')) && a.removeListener(), b.remove()) : CKEDITOR.warn('editor-destroy-iframe')
        }
      }
    })
  })(); CKEDITOR.config.disableObjectResizing = !1; CKEDITOR.config.disableNativeTableHandles = !0; CKEDITOR.config.disableNativeSpellChecker = !0; (function () {
    function e (b, a) { a || (a = b.getSelection().getSelectedElement()); if (a && a.is('img') && !a.data('cke-realelement') && !a.isReadOnly()) return a } function f (b) { let a = b.getStyle('float'); if (a == 'inherit' || a == 'none')a = 0; a || (a = b.getAttribute('align')); return a }CKEDITOR.plugins.add('image', {
      requires: 'dialog',
      init: function (b) {
        if (!b.plugins.image2) {
          CKEDITOR.dialog.add('image', this.path + 'dialogs/image.js'); let a = 'img[alt,!src]{border-style,border-width,float,height,margin,margin-bottom,margin-left,margin-right,margin-top,width}'
          CKEDITOR.dialog.isTabEnabled(b, 'image', 'advanced') && (a = 'img[alt,dir,id,lang,longdesc,!src,title]{*}(*)'); b.addCommand('image', new CKEDITOR.dialogCommand('image', { allowedContent: a, requiredContent: 'img[alt,src]', contentTransformations: [['img{width}: sizeToStyle', 'img[width]: sizeToAttribute'], ['img{float}: alignmentToStyle', 'img[align]: alignmentToAttribute']] })); b.ui.addButton && b.ui.addButton('Image', { label: b.lang.common.image, command: 'image', toolbar: 'insert,10' }); b.on('doubleclick', function (b) {
            const a =
b.data.element; !a.is('img') || a.data('cke-realelement') || a.isReadOnly() || (b.data.dialog = 'image')
          }); b.addMenuItems && b.addMenuItems({ image: { label: b.lang.image.menu, command: 'image', group: 'image' } }); b.contextMenu && b.contextMenu.addListener(function (a) { if (e(b, a)) return { image: CKEDITOR.TRISTATE_OFF } })
        }
      },
      afterInit: function (b) {
        function a (a) {
          const d = b.getCommand('justify' + a); if (d) {
            if (a == 'left' || a == 'right') {
              d.on('exec', function (d) {
                const c = e(b); let g; c && (g = f(c), g == a
                  ? (c.removeStyle('float'), a == f(c) && c.removeAttribute('align'))
                  : c.setStyle('float', a), d.cancel())
              })
            }d.on('refresh', function (d) { let c = e(b); c && (c = f(c), this.setState(c == a ? CKEDITOR.TRISTATE_ON : a == 'right' || a == 'left' ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED), d.cancel()) })
          }
        }b.plugins.image2 || (a('left'), a('right'), a('center'), a('block'))
      }
    })
  })(); CKEDITOR.config.image_removeLinkByEmptyURL = !0; (function () {
    function m (a, b) { let e, f; b.on('refresh', function (a) { const b = [k]; let c; for (c in a.data.states)b.push(a.data.states[c]); this.setState(CKEDITOR.tools.search(b, p) ? p : k) }, b, null, 100); b.on('exec', function (b) { e = a.getSelection(); f = e.createBookmarks(1); b.data || (b.data = {}); b.data.done = !1 }, b, null, 0); b.on('exec', function () { a.forceNextSelectionCheck(); e.selectBookmarks(f) }, b, null, 100) } var k = CKEDITOR.TRISTATE_DISABLED; var p = CKEDITOR.TRISTATE_OFF; CKEDITOR.plugins.add('indent', {
      init: function (a) {
        const b = CKEDITOR.plugins.indent.genericDefinition
        m(a, a.addCommand('indent', new b(!0))); m(a, a.addCommand('outdent', new b())); a.ui.addButton && (a.ui.addButton('Indent', { label: a.lang.indent.indent, command: 'indent', directional: !0, toolbar: 'indent,20' }), a.ui.addButton('Outdent', { label: a.lang.indent.outdent, command: 'outdent', directional: !0, toolbar: 'indent,10' })); a.on('dirChanged', function (b) {
          const f = a.createRange(); const l = b.data.node; f.setStartBefore(l); f.setEndAfter(l); for (var n = new CKEDITOR.dom.walker(f), c; c = n.next();) {
            if (c.type == CKEDITOR.NODE_ELEMENT) {
              if (!c.equals(l) &&
c.getDirection())f.setStartAfter(c), n = new CKEDITOR.dom.walker(f); else { let d = a.config.indentClasses; if (d) for (var g = b.data.dir == 'ltr' ? ['_rtl', ''] : ['', '_rtl'], h = 0; h < d.length; h++)c.hasClass(d[h] + g[0]) && (c.removeClass(d[h] + g[0]), c.addClass(d[h] + g[1])); d = c.getStyle('margin-right'); g = c.getStyle('margin-left'); d ? c.setStyle('margin-left', d) : c.removeStyle('margin-left'); g ? c.setStyle('margin-right', g) : c.removeStyle('margin-right') }
            }
          }
        })
      }
    }); CKEDITOR.plugins.indent = {
      genericDefinition: function (a) {
        this.isIndent = !!a
        this.startDisabled = !this.isIndent
      },
      specificDefinition: function (a, b, e) { this.name = b; this.editor = a; this.jobs = {}; this.enterBr = a.config.enterMode == CKEDITOR.ENTER_BR; this.isIndent = !!e; this.relatedGlobal = e ? 'indent' : 'outdent'; this.indentKey = e ? 9 : CKEDITOR.SHIFT + 9; this.database = {} },
      registerCommands: function (a, b) {
        a.on('pluginsLoaded', function () {
          for (const a in b) {
            (function (a, b) {
              const e = a.getCommand(b.relatedGlobal); let c; for (c in b.jobs) {
                e.on('exec', function (d) {
                  d.data.done || (a.fire('lockSnapshot'), b.execJob(a, c) && (d.data.done =
!0), a.fire('unlockSnapshot'), CKEDITOR.dom.element.clearAllMarkers(b.database))
                }, this, null, c), e.on('refresh', function (d) { d.data.states || (d.data.states = {}); d.data.states[b.name + '@' + c] = b.refreshJob(a, c, d.data.path) }, this, null, c)
              }a.addFeature(b)
            })(this, b[a])
          }
        })
      }
    }; CKEDITOR.plugins.indent.genericDefinition.prototype = { context: 'p', exec: function () {} }; CKEDITOR.plugins.indent.specificDefinition.prototype = {
      execJob: function (a, b) { const e = this.jobs[b]; if (e.state != k) return e.exec.call(this, a) },
      refreshJob: function (a,
        b, e) { b = this.jobs[b]; a.activeFilter.checkFeature(this) ? b.state = b.refresh.call(this, a, e) : b.state = k; return b.state },
      getContext: function (a) { return a.contains(this.context) }
    }
  })(); (function () {
    function f (b, c, a) {
      if (!b.getCustomData('indent_processed')) {
        let d = this.editor; const l = this.isIndent; if (c) { d = b.$.className.match(this.classNameRegex); a = 0; d && (d = d[1], a = CKEDITOR.tools.indexOf(c, d) + 1); if ((a += l ? 1 : -1) < 0) return; a = Math.min(a, c.length); a = Math.max(a, 0); b.$.className = CKEDITOR.tools.ltrim(b.$.className.replace(this.classNameRegex, '')); a > 0 && b.addClass(c[a - 1]) } else {
          c = m(b, a); a = parseInt(b.getStyle(c), 10); const g = d.config.indentOffset || 40; isNaN(a) && (a = 0); a += (l ? 1 : -1) * g; if (a < 0) return; a = Math.max(a,
            0); a = Math.ceil(a / g) * g; b.setStyle(c, a ? a + (d.config.indentUnit || 'px') : ''); b.getAttribute('style') === '' && b.removeAttribute('style')
        }CKEDITOR.dom.element.setMarker(this.database, b, 'indent_processed', 1)
      }
    } function m (b, c) { return (c || b.getComputedStyle('direction')) == 'ltr' ? 'margin-left' : 'margin-right' } const h = CKEDITOR.dtd.$listItem; const p = CKEDITOR.dtd.$list; const k = CKEDITOR.TRISTATE_DISABLED; const n = CKEDITOR.TRISTATE_OFF; CKEDITOR.plugins.add('indentblock', {
      requires: 'indent',
      init: function (b) {
        function c () {
          a.specificDefinition.apply(this,
            arguments); this.allowedContent = { 'div h1 h2 h3 h4 h5 h6 ol p pre ul': { propertiesOnly: !0, styles: d ? null : 'margin-left,margin-right', classes: d || null } }; this.contentTransformations = [['div: splitMarginShorthand'], ['h1: splitMarginShorthand'], ['h2: splitMarginShorthand'], ['h3: splitMarginShorthand'], ['h4: splitMarginShorthand'], ['h5: splitMarginShorthand'], ['h6: splitMarginShorthand'], ['ol: splitMarginShorthand'], ['p: splitMarginShorthand'], ['pre: splitMarginShorthand'], ['ul: splitMarginShorthand']]; this.enterBr &&
(this.allowedContent.div = !0); this.requiredContent = (this.enterBr ? 'div' : 'p') + (d ? '(' + d.join(',') + ')' : '{margin-left}'); this.jobs = {
            20: {
              refresh: function (a, b) {
                var e = b.block || b.blockLimit; if (!e.is(h)) var c = e.getAscendant(h), e = c && b.contains(c) || e; e.is(h) && (e = e.getParent()); if (this.enterBr || this.getContext(b)) {
                  if (d) { var c = d; var e = e.$.className.match(this.classNameRegex); const f = this.isIndent; var c = e ? f ? e[1] != c.slice(-1) : !0 : f; return c ? n : k } return this.isIndent
                    ? n
                    : e
                      ? CKEDITOR[(parseInt(e.getStyle(m(e)), 10) || 0) <= 0
                        ? 'TRISTATE_DISABLED'
                        : 'TRISTATE_OFF']
                      : k
                } return k
              },
              exec: function (a) { var b = a.getSelection(); var b = b && b.getRanges()[0]; let c; if (c = a.elementPath().contains(p))f.call(this, c, d); else for (b = b.createIterator(), a = a.config.enterMode, b.enforceRealBlocks = !0, b.enlargeBr = a != CKEDITOR.ENTER_BR; c = b.getNextParagraph(a == CKEDITOR.ENTER_P ? 'p' : 'div');)c.isReadOnly() || f.call(this, c, d); return !0 }
            }
          }
        } var a = CKEDITOR.plugins.indent; var d = b.config.indentClasses; a.registerCommands(b, { indentblock: new c(b, 'indentblock', !0), outdentblock: new c(b, 'outdentblock') })
        CKEDITOR.tools.extend(c.prototype, a.specificDefinition.prototype, { context: { div: 1, dl: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, ul: 1, ol: 1, p: 1, pre: 1, table: 1 }, classNameRegex: d ? new RegExp('(?:^|\\s+)(' + d.join('|') + ')(?\x3d$|\\s)') : null })
      }
    })
  })(); (function () {
    function w (c) {
      function f (b) {
        for (var e = d.startContainer, a = d.endContainer; e && !e.getParent().equals(b);)e = e.getParent(); for (;a && !a.getParent().equals(b);)a = a.getParent(); if (!e || !a) return !1; for (var g = e, e = [], k = !1; !k;)g.equals(a) && (k = !0), e.push(g), g = g.getNext(); if (e.length < 1) return !1; g = b.getParents(!0); for (a = 0; a < g.length; a++) if (g[a].getName && p[g[a].getName()]) { b = g[a]; break } for (var g = l.isIndent ? 1 : -1, a = e[0], e = e[e.length - 1], k = CKEDITOR.plugins.list.listToArray(b, q), n = k[e.getCustomData('listarray_index')].indent,
          a = a.getCustomData('listarray_index'); a <= e.getCustomData('listarray_index'); a++) if (k[a].indent += g, g > 0) { const h = k[a].parent; k[a].parent = new CKEDITOR.dom.element(h.getName(), h.getDocument()) } for (a = e.getCustomData('listarray_index') + 1; a < k.length && k[a].indent > n; a++)k[a].indent += g; e = CKEDITOR.plugins.list.arrayToList(k, q, null, c.config.enterMode, b.getDirection()); if (!l.isIndent) {
          var f; if ((f = b.getParent()) && f.is('li')) {
            for (var g = e.listNode.getChildren(), r = [], m, a = g.count() - 1; a >= 0; a--) {
              (m = g.getItem(a)) && m.is && m.is('li') &&
r.push(m)
            }
          }
        }e && e.listNode.replace(b); if (r && r.length) for (a = 0; a < r.length; a++) { for (m = b = r[a]; (m = m.getNext()) && m.is && m.getName() in p;)CKEDITOR.env.needsNbspFiller && !b.getFirst(x) && b.append(d.document.createText(' ')), b.append(m); b.insertAfter(f) }e && c.fire('contentDomInvalidated'); return !0
      } for (var l = this, q = this.database, p = this.context, n = c.getSelection(), n = (n && n.getRanges()).createIterator(), d; d = n.getNextRange();) {
        for (var b = d.getCommonAncestor(); b && (b.type != CKEDITOR.NODE_ELEMENT || !p[b.getName()]);) {
          if (c.editable().equals(b)) {
            b =
!1; break
          }b = b.getParent()
        }b || (b = d.startPath().contains(p)) && d.setEndAt(b, CKEDITOR.POSITION_BEFORE_END); if (!b) { var h = d.getEnclosedNode(); h && h.type == CKEDITOR.NODE_ELEMENT && h.getName() in p && (d.setStartAt(h, CKEDITOR.POSITION_AFTER_START), d.setEndAt(h, CKEDITOR.POSITION_BEFORE_END), b = h) }b && d.startContainer.type == CKEDITOR.NODE_ELEMENT && d.startContainer.getName() in p && (h = new CKEDITOR.dom.walker(d), h.evaluator = t, d.startContainer = h.next()); b && d.endContainer.type == CKEDITOR.NODE_ELEMENT && d.endContainer.getName() in
p && (h = new CKEDITOR.dom.walker(d), h.evaluator = t, d.endContainer = h.previous()); if (b) return f(b)
      } return 0
    } function t (c) { return c.type == CKEDITOR.NODE_ELEMENT && c.is('li') } function x (c) { return y(c) && z(c) } var y = CKEDITOR.dom.walker.whitespaces(!0); var z = CKEDITOR.dom.walker.bookmark(!1, !0); const u = CKEDITOR.TRISTATE_DISABLED; const v = CKEDITOR.TRISTATE_OFF; CKEDITOR.plugins.add('indentlist', {
      requires: 'indent',
      init: function (c) {
        function f (c) {
          l.specificDefinition.apply(this, arguments); this.requiredContent = ['ul', 'ol']; c.on('key',
            function (f) { if (c.mode == 'wysiwyg' && f.data.keyCode == this.indentKey) { const n = this.getContext(c.elementPath()); !n || this.isIndent && CKEDITOR.plugins.indentList.firstItemInPath(this.context, c.elementPath(), n) || (c.execCommand(this.relatedGlobal), f.cancel()) } }, this); this.jobs[this.isIndent ? 10 : 30] = {
            refresh: this.isIndent
              ? function (c, f) { const d = this.getContext(f); const b = CKEDITOR.plugins.indentList.firstItemInPath(this.context, f, d); return d && this.isIndent && !b ? v : u }
              : function (c, f) {
                return !this.getContext(f) || this.isIndent
                  ? u
                  : v
              },
            exec: CKEDITOR.tools.bind(w, this)
          }
        } var l = CKEDITOR.plugins.indent; l.registerCommands(c, { indentlist: new f(c, 'indentlist', !0), outdentlist: new f(c, 'outdentlist') }); CKEDITOR.tools.extend(f.prototype, l.specificDefinition.prototype, { context: { ol: 1, ul: 1 } })
      }
    }); CKEDITOR.plugins.indentList = {}; CKEDITOR.plugins.indentList.firstItemInPath = function (c, f, l) { const q = f.contains(t); l || (l = f.contains(c)); return l && q && q.equals(l.getFirst(t)) }
  })(); CKEDITOR.plugins.add('smiley', { requires: 'dialog', init: function (a) { a.config.smiley_path = a.config.smiley_path || this.path + 'images/'; a.addCommand('smiley', new CKEDITOR.dialogCommand('smiley', { allowedContent: 'img[alt,height,!src,title,width]', requiredContent: 'img' })); a.ui.addButton && a.ui.addButton('Smiley', { label: a.lang.smiley.toolbar, command: 'smiley', toolbar: 'insert,50' }); CKEDITOR.dialog.add('smiley', this.path + 'dialogs/smiley.js') } }); CKEDITOR.config.smiley_images = 'regular_smile.png sad_smile.png wink_smile.png teeth_smile.png confused_smile.png tongue_smile.png embarrassed_smile.png omg_smile.png whatchutalkingabout_smile.png angry_smile.png angel_smile.png shades_smile.png devil_smile.png cry_smile.png lightbulb.png thumbs_down.png thumbs_up.png heart.png broken_heart.png kiss.png envelope.png'.split(' ')
  CKEDITOR.config.smiley_descriptions = 'smiley;sad;wink;laugh;frown;cheeky;blush;surprise;indecision;angry;angel;cool;devil;crying;enlightened;no;yes;heart;broken heart;kiss;mail'.split(';'); (function () {
    function n (a, c) { c = void 0 === c || c; let b; if (c)b = a.getComputedStyle('text-align'); else { for (;!a.hasAttribute || !a.hasAttribute('align') && !a.getStyle('text-align');) { b = a.getParent(); if (!b) break; a = b }b = a.getStyle('text-align') || a.getAttribute('align') || '' }b && (b = b.replace(/(?:-(?:moz|webkit)-)?(?:start|auto)/i, '')); !b && c && (b = a.getComputedStyle('direction') == 'rtl' ? 'right' : 'left'); return b } function g (a, c, b) {
      this.editor = a; this.name = c; this.value = b; this.context = 'p'; c = a.config.justifyClasses; const h = a.config.enterMode ==
CKEDITOR.ENTER_P
        ? 'p'
        : 'div'; if (c) { switch (b) { case 'left':this.cssClassName = c[0]; break; case 'center':this.cssClassName = c[1]; break; case 'right':this.cssClassName = c[2]; break; case 'justify':this.cssClassName = c[3] } this.cssClassRegex = new RegExp('(?:^|\\s+)(?:' + c.join('|') + ')(?\x3d$|\\s)'); this.requiredContent = h + '(' + this.cssClassName + ')' } else this.requiredContent = h + '{text-align}'; this.allowedContent = {
        'caption div h1 h2 h3 h4 h5 h6 p pre td th li': {
          propertiesOnly: !0,
          styles: this.cssClassName ? null : 'text-align',
          classes: this.cssClassName || null
        }
      }; a.config.enterMode == CKEDITOR.ENTER_BR && (this.allowedContent.div = !0)
    } function l (a) {
      const c = a.editor; const b = c.createRange(); b.setStartBefore(a.data.node); b.setEndAfter(a.data.node); for (var h = new CKEDITOR.dom.walker(b), d; d = h.next();) {
        if (d.type == CKEDITOR.NODE_ELEMENT) {
          if (!d.equals(a.data.node) && d.getDirection())b.setStartAfter(d), h = new CKEDITOR.dom.walker(b); else {
            let e = c.config.justifyClasses; e && (d.hasClass(e[0])
              ? (d.removeClass(e[0]), d.addClass(e[2]))
              : d.hasClass(e[2]) && (d.removeClass(e[2]),
              d.addClass(e[0]))); e = d.getStyle('text-align'); e == 'left' ? d.setStyle('text-align', 'right') : e == 'right' && d.setStyle('text-align', 'left')
          }
        }
      }
    }g.prototype = {
      exec: function (a) {
        const c = a.getSelection(); const b = a.config.enterMode; if (c) {
          for (var h = c.createBookmarks(), d = c.getRanges(), e = this.cssClassName, g, f, k = a.config.useComputedState, k = void 0 === k || k, m = d.length - 1; m >= 0; m--) {
            for (g = d[m].createIterator(), g.enlargeBr = b != CKEDITOR.ENTER_BR; f = g.getNextParagraph(b == CKEDITOR.ENTER_P ? 'p' : 'div');) {
              if (!f.isReadOnly()) {
                f.removeAttribute('align')
                f.removeStyle('text-align'); const l = e && (f.$.className = CKEDITOR.tools.ltrim(f.$.className.replace(this.cssClassRegex, ''))); const p = this.state == CKEDITOR.TRISTATE_OFF && (!k || n(f, !0) != this.value); e ? p ? f.addClass(e) : l || f.removeAttribute('class') : p && f.setStyle('text-align', this.value)
              }
            }
          }a.focus(); a.forceNextSelectionCheck(); c.selectBookmarks(h)
        }
      },
      refresh: function (a, c) { const b = c.block || c.blockLimit; this.setState(b.getName() != 'body' && n(b, this.editor.config.useComputedState) == this.value ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) }
    }
    CKEDITOR.plugins.add('justify', {
      init: function (a) {
        if (!a.blockless) {
          const c = new g(a, 'justifyleft', 'left'); const b = new g(a, 'justifycenter', 'center'); const h = new g(a, 'justifyright', 'right'); const d = new g(a, 'justifyblock', 'justify'); a.addCommand('justifyleft', c); a.addCommand('justifycenter', b); a.addCommand('justifyright', h); a.addCommand('justifyblock', d); a.ui.addButton && (a.ui.addButton('JustifyLeft', { label: a.lang.justify.left, command: 'justifyleft', toolbar: 'align,10' }), a.ui.addButton('JustifyCenter', {
            label: a.lang.justify.center,
            command: 'justifycenter',
            toolbar: 'align,20'
          }), a.ui.addButton('JustifyRight', { label: a.lang.justify.right, command: 'justifyright', toolbar: 'align,30' }), a.ui.addButton('JustifyBlock', { label: a.lang.justify.block, command: 'justifyblock', toolbar: 'align,40' })); a.on('dirChanged', l)
        }
      }
    })
  })(); CKEDITOR.plugins.add('menubutton', {
    requires: 'button,menu',
    onLoad: function () {
      const d = function (c) {
        const a = this._; let b = a.menu; a.state !== CKEDITOR.TRISTATE_DISABLED && (a.on && b
          ? b.hide()
          : (a.previousState = a.state, b || (b = a.menu = new CKEDITOR.menu(c, { panel: { className: 'cke_menu_panel', attributes: { 'aria-label': c.lang.common.options } } }), b.onHide = CKEDITOR.tools.bind(function () { const b = this.command ? c.getCommand(this.command).modes : this.modes; this.setState(!b || b[c.mode] ? a.previousState : CKEDITOR.TRISTATE_DISABLED); a.on = 0 }, this),
            this.onMenu && b.addListener(this.onMenu)), this.setState(CKEDITOR.TRISTATE_ON), a.on = 1, setTimeout(function () { b.show(CKEDITOR.document.getById(a.id), 4) }, 0)))
      }; CKEDITOR.ui.menuButton = CKEDITOR.tools.createClass({ base: CKEDITOR.ui.button, $: function (c) { delete c.panel; this.base(c); this.hasArrow = !0; this.click = d }, statics: { handler: { create: function (c) { return new CKEDITOR.ui.menuButton(c) } } } })
    },
    beforeInit: function (d) { d.ui.addHandler(CKEDITOR.UI_MENUBUTTON, CKEDITOR.ui.menuButton.handler) }
  })
  CKEDITOR.UI_MENUBUTTON = 'menubutton'; (function () {
    CKEDITOR.plugins.add('language', {
      requires: 'menubutton',
      init: function (a) {
        const b = a.config.language_list || ['ar:Arabic:rtl', 'fr:French', 'es:Spanish']; const c = this; const d = a.lang.language; const e = {}; let g; let h; let k; let f; a.addCommand('language', {
          allowedContent: 'span[!lang,!dir]',
          requiredContent: 'span[lang,dir]',
          contextSensitive: !0,
          exec: function (a, b) { const c = e['language_' + b]; if (c)a[c.style.checkActive(a.elementPath(), a) ? 'removeStyle' : 'applyStyle'](c.style) },
          refresh: function (a) {
            this.setState(c.getCurrentLangElement(a)
              ? CKEDITOR.TRISTATE_ON
              : CKEDITOR.TRISTATE_OFF)
          }
        }); for (f = 0; f < b.length; f++)g = b[f].split(':'), h = g[0], k = 'language_' + h, e[k] = { label: g[1], langId: h, group: 'language', order: f, ltr: ('' + g[2]).toLowerCase() != 'rtl', onClick: function () { a.execCommand('language', this.langId) }, role: 'menuitemcheckbox' }, e[k].style = new CKEDITOR.style({ element: 'span', attributes: { lang: h, dir: e[k].ltr ? 'ltr' : 'rtl' } }); e.language_remove = {
          label: d.remove,
          group: 'language_remove',
          state: CKEDITOR.TRISTATE_DISABLED,
          order: e.length,
          onClick: function () {
            const b = c.getCurrentLangElement(a)
            b && a.execCommand('language', b.getAttribute('lang'))
          }
        }; a.addMenuGroup('language', 1); a.addMenuGroup('language_remove'); a.addMenuItems(e); a.ui.add('Language', CKEDITOR.UI_MENUBUTTON, {
          label: d.button,
          allowedContent: 'span[!lang,!dir]',
          requiredContent: 'span[lang,dir]',
          toolbar: 'bidi,30',
          command: 'language',
          onMenu: function () {
            const b = {}; const d = c.getCurrentLangElement(a); let f; for (f in e)b[f] = CKEDITOR.TRISTATE_OFF; b.language_remove = d ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED; d && (b['language_' + d.getAttribute('lang')] =
CKEDITOR.TRISTATE_ON); return b
          }
        })
      },
      getCurrentLangElement: function (a) { let b = a.elementPath(); a = b && b.elements; let c; if (b) for (let d = 0; d < a.length; d++)b = a[d], !c && b.getName() == 'span' && b.hasAttribute('dir') && b.hasAttribute('lang') && (c = b); return c }
    })
  })(); (function () {
    function p (c) { return c.replace(/'/g, '\\$\x26') } function q (c) { for (var b, a = c.length, f = [], e = 0; e < a; e++)b = c.charCodeAt(e), f.push(b); return 'String.fromCharCode(' + f.join(',') + ')' } function r (c, b) { let a = c.plugins.link; const f = a.compiledProtectionFunction.params; let e; let d; d = [a.compiledProtectionFunction.name, '(']; for (let g = 0; g < f.length; g++)a = f[g].toLowerCase(), e = b[a], g > 0 && d.push(','), d.push("'", e ? p(encodeURIComponent(b[a])) : '', "'"); d.push(')'); return d.join('') } function n (c) {
      c = c.config.emailProtection || ''
      let b; c && c != 'encode' && (b = {}, c.replace(/^([^(]+)\(([^)]+)\)$/, function (a, c, e) { b.name = c; b.params = []; e.replace(/[^,\s]+/g, function (a) { b.params.push(a) }) })); return b
    }CKEDITOR.plugins.add('link', {
      requires: 'dialog,fakeobjects',
      onLoad: function () {
        function c (b) { return a.replace(/%1/g, b == 'rtl' ? 'right' : 'left').replace(/%2/g, 'cke_contents_' + b) } const b = 'background:url(' + CKEDITOR.getUrl(this.path + 'images' + (CKEDITOR.env.hidpi ? '/hidpi' : '') + '/anchor.png') + ') no-repeat %1 center;border:1px dotted #00f;background-size:16px;'
        var a = '.%2 a.cke_anchor,.%2 a.cke_anchor_empty,.cke_editable.%2 a[name],.cke_editable.%2 a[data-cke-saved-name]{' + b + 'padding-%1:18px;cursor:auto;}.%2 img.cke_anchor{' + b + 'width:16px;min-height:15px;height:1.15em;vertical-align:text-bottom;}'; CKEDITOR.addCss(c('ltr') + c('rtl'))
      },
      init: function (c) {
        let b = 'a[!href]'; CKEDITOR.dialog.isTabEnabled(c, 'link', 'advanced') && (b = b.replace(']', ',accesskey,charset,dir,id,lang,name,rel,tabindex,title,type,download]{*}(*)')); CKEDITOR.dialog.isTabEnabled(c, 'link', 'target') &&
(b = b.replace(']', ',target,onclick]')); c.addCommand('link', new CKEDITOR.dialogCommand('link', { allowedContent: b, requiredContent: 'a[href]' })); c.addCommand('anchor', new CKEDITOR.dialogCommand('anchor', { allowedContent: 'a[!name,id]', requiredContent: 'a[name]' })); c.addCommand('unlink', new CKEDITOR.unlinkCommand()); c.addCommand('removeAnchor', new CKEDITOR.removeAnchorCommand()); c.setKeystroke(CKEDITOR.CTRL + 76, 'link'); c.ui.addButton && (c.ui.addButton('Link', { label: c.lang.link.toolbar, command: 'link', toolbar: 'links,10' }),
        c.ui.addButton('Unlink', { label: c.lang.link.unlink, command: 'unlink', toolbar: 'links,20' }), c.ui.addButton('Anchor', { label: c.lang.link.anchor.toolbar, command: 'anchor', toolbar: 'links,30' })); CKEDITOR.dialog.add('link', this.path + 'dialogs/link.js'); CKEDITOR.dialog.add('anchor', this.path + 'dialogs/anchor.js'); c.on('doubleclick', function (a) {
          const b = CKEDITOR.plugins.link.getSelectedLink(c) || a.data.element; b.isReadOnly() || (b.is('a')
            ? (a.data.dialog = !b.getAttribute('name') || b.getAttribute('href') && b.getChildCount()
                ? 'link'
                : 'anchor', a.data.link = b)
            : CKEDITOR.plugins.link.tryRestoreFakeAnchor(c, b) && (a.data.dialog = 'anchor'))
        }, null, null, 0); c.on('doubleclick', function (a) { a.data.dialog in { link: 1, anchor: 1 } && a.data.link && c.getSelection().selectElement(a.data.link) }, null, null, 20); c.addMenuItems && c.addMenuItems({
          anchor: { label: c.lang.link.anchor.menu, command: 'anchor', group: 'anchor', order: 1 },
          removeAnchor: { label: c.lang.link.anchor.remove, command: 'removeAnchor', group: 'anchor', order: 5 },
          link: {
            label: c.lang.link.menu,
            command: 'link',
            group: 'link',
            order: 1
          },
          unlink: { label: c.lang.link.unlink, command: 'unlink', group: 'link', order: 5 }
        }); c.contextMenu && c.contextMenu.addListener(function (a) { if (!a || a.isReadOnly()) return null; a = CKEDITOR.plugins.link.tryRestoreFakeAnchor(c, a); if (!a && !(a = CKEDITOR.plugins.link.getSelectedLink(c))) return null; let b = {}; a.getAttribute('href') && a.getChildCount() && (b = { link: CKEDITOR.TRISTATE_OFF, unlink: CKEDITOR.TRISTATE_OFF }); a && a.hasAttribute('name') && (b.anchor = b.removeAnchor = CKEDITOR.TRISTATE_OFF); return b }); this.compiledProtectionFunction =
n(c)
      },
      afterInit: function (c) { c.dataProcessor.dataFilter.addRules({ elements: { a: function (a) { return a.attributes.name ? a.children.length ? null : c.createFakeParserElement(a, 'cke_anchor', 'anchor') : null } } }); const b = c._.elementsPath && c._.elementsPath.filters; b && b.push(function (a, b) { if (b == 'a' && (CKEDITOR.plugins.link.tryRestoreFakeAnchor(c, a) || a.getAttribute('name') && (!a.getAttribute('href') || !a.getChildCount()))) return 'anchor' }) }
    }); const t = /^javascript:/; const u = /^mailto:([^?]+)(?:\?(.+))?$/; const v = /subject=([^;?:@&=$,\/]*)/i
    const w = /body=([^;?:@&=$,\/]*)/i; const x = /^#(.*)$/; const y = /^((?:http|https|ftp|news):\/\/)?(.*)$/; const z = /^(_(?:self|top|parent|blank))$/; const A = /^javascript:void\(location\.href='mailto:'\+String\.fromCharCode\(([^)]+)\)(?:\+'(.*)')?\)$/; const B = /^javascript:([^(]+)\(([^)]+)\)$/; const C = /\s*window.open\(\s*this\.href\s*,\s*(?:'([^']*)'|null)\s*,\s*'([^']*)'\s*\)\s*;\s*return\s*false;*\s*/; const D = /(?:^|,)([^=]+)=(\d+|yes|no)/gi; const m = {
      id: 'advId',
      dir: 'advLangDir',
      accessKey: 'advAccessKey',
      name: 'advName',
      lang: 'advLangCode',
      tabindex: 'advTabIndex',
      title: 'advTitle',
      type: 'advContentType',
      class: 'advCSSClasses',
      charset: 'advCharset',
      style: 'advStyles',
      rel: 'advRel'
    }; CKEDITOR.plugins.link = {
      getSelectedLink: function (c) { let b = c.getSelection(); const a = b.getSelectedElement(); return a && a.is('a') ? a : (b = b.getRanges()[0]) ? (b.shrink(CKEDITOR.SHRINK_TEXT), c.elementPath(b.getCommonAncestor()).contains('a', 1)) : null },
      getEditorAnchors: function (c) {
        for (var b = c.editable(), a = b.isInline() && !c.plugins.divarea ? c.document : b, b = a.getElementsByTag('a'), a = a.getElementsByTag('img'),
          f = [], e = 0, d; d = b.getItem(e++);)(d.data('cke-saved-name') || d.hasAttribute('name')) && f.push({ name: d.data('cke-saved-name') || d.getAttribute('name'), id: d.getAttribute('id') }); for (e = 0; d = a.getItem(e++);)(d = this.tryRestoreFakeAnchor(c, d)) && f.push({ name: d.getAttribute('name'), id: d.getAttribute('id') }); return f
      },
      fakeAnchor: !0,
      tryRestoreFakeAnchor: function (c, b) { if (b && b.data('cke-real-element-type') && b.data('cke-real-element-type') == 'anchor') { const a = c.restoreRealElement(b); if (a.data('cke-saved-name')) return a } },
      parseLinkAttributes: function (c, b) {
        var a = b && (b.data('cke-saved-href') || b.getAttribute('href')) || ''; const f = c.plugins.link.compiledProtectionFunction; let e = c.config.emailProtection; let d; const g = {}; a.match(t) && (e == 'encode'
          ? a = a.replace(A, function (a, b, c) { c = c || ''; return 'mailto:' + String.fromCharCode.apply(String, b.split(',')) + c.replace(/\\'/g, "'") })
          : e && a.replace(B, function (a, b, c) {
            if (b == f.name) {
              g.type = 'email'; a = g.email = {}; b = /(^')|('$)/g; c = c.match(/[^,\s]+/g); for (var d = c.length, e, h, k = 0; k < d; k++) {
                e = decodeURIComponent, h = c[k].replace(b,
                  '').replace(/\\'/g, "'"), h = e(h), e = f.params[k].toLowerCase(), a[e] = h
              }a.address = [a.name, a.domain].join('@')
            }
          })); if (!g.type) if (e = a.match(x))g.type = 'anchor', g.anchor = {}, g.anchor.name = g.anchor.id = e[1]; else if (e = a.match(u)) { d = a.match(v); a = a.match(w); g.type = 'email'; const k = g.email = {}; k.address = e[1]; d && (k.subject = decodeURIComponent(d[1])); a && (k.body = decodeURIComponent(a[1])) } else a && (d = a.match(y)) && (g.type = 'url', g.url = {}, g.url.protocol = d[1], g.url.url = d[2]); if (b) {
          if (a = b.getAttribute('target')) {
            g.target = {
              type: a.match(z)
                ? a
                : 'frame',
              name: a
            }
          } else if (a = (a = b.data('cke-pa-onclick') || b.getAttribute('onclick')) && a.match(C)) for (g.target = { type: 'popup', name: a[1] }; e = D.exec(a[2]);)e[2] != 'yes' && e[2] != '1' || e[1] in { height: 1, width: 1, top: 1, left: 1 } ? isFinite(e[2]) && (g.target[e[1]] = e[2]) : g.target[e[1]] = !0; b.getAttribute('download') !== null && (g.download = !0); var a = {}; let h; for (h in m)(e = b.getAttribute(h)) && (a[m[h]] = e); if (h = b.data('cke-saved-name') || a.advName)a.advName = h; CKEDITOR.tools.isEmpty(a) || (g.advanced = a)
        } return g
      },
      getLinkAttributes: function (c,
        b) {
        var a = c.config.emailProtection || ''; const f = {}; switch (b.type) {
          case 'url':var a = b.url && void 0 !== b.url.protocol ? b.url.protocol : 'http://'; var e = b.url && CKEDITOR.tools.trim(b.url.url) || ''; f['data-cke-saved-href'] = e.indexOf('/') === 0 ? e : a + e; break; case 'anchor':a = b.anchor && b.anchor.id; f['data-cke-saved-href'] = '#' + (b.anchor && b.anchor.name || a || ''); break; case 'email':var d = b.email; var e = d.address; switch (a) {
            case '':case 'encode':var g = encodeURIComponent(d.subject || ''); var k = encodeURIComponent(d.body || ''); var d = []; g && d.push('subject\x3d' +
g); k && d.push('body\x3d' + k); d = d.length ? '?' + d.join('\x26') : ''; a == 'encode' ? (a = ["javascript:void(location.href\x3d'mailto:'+", q(e)], d && a.push("+'", p(d), "'"), a.push(')')) : a = ['mailto:', e, d]; break; default:a = e.split('@', 2), d.name = a[0], d.domain = a[1], a = ['javascript:', r(c, d)]
          }f['data-cke-saved-href'] = a.join('')
        } if (b.target) {
          if (b.target.type == 'popup') {
            for (var a = ["window.open(this.href, '", b.target.name || '', "', '"], h = 'resizable status location toolbar menubar fullscreen scrollbars dependent'.split(' '), e = h.length,
              g = function (a) { b.target[a] && h.push(a + '\x3d' + b.target[a]) }, d = 0; d < e; d++)h[d] += b.target[h[d]] ? '\x3dyes' : '\x3dno'; g('width'); g('left'); g('height'); g('top'); a.push(h.join(','), "'); return false;"); f['data-cke-pa-onclick'] = a.join('')
          } else b.target.type != 'notSet' && b.target.name && (f.target = b.target.name)
        } b.download && (f.download = ''); if (b.advanced) { for (var l in m)(a = b.advanced[m[l]]) && (f[l] = a); f.name && (f['data-cke-saved-name'] = f.name) }f['data-cke-saved-href'] && (f.href = f['data-cke-saved-href']); l = {
          target: 1,
          onclick: 1,
          'data-cke-pa-onclick': 1,
          'data-cke-saved-name': 1,
          download: 1
        }; b.advanced && CKEDITOR.tools.extend(l, m); for (const n in f) delete l[n]; return { set: f, removed: CKEDITOR.tools.objectKeys(l) }
      },
      showDisplayTextForElement: function (c, b) { const a = { img: 1, table: 1, tbody: 1, thead: 1, tfoot: 1, input: 1, select: 1, textarea: 1 }; return b.widgets && b.widgets.focused ? !1 : !c || !c.getName || !c.is(a) }
    }; CKEDITOR.unlinkCommand = function () {}; CKEDITOR.unlinkCommand.prototype = {
      exec: function (c) {
        const b = new CKEDITOR.style({
          element: 'a',
          type: CKEDITOR.STYLE_INLINE,
          alwaysRemoveElement: 1
        }); c.removeStyle(b)
      },
      refresh: function (c, b) { const a = b.lastElement && b.lastElement.getAscendant('a', !0); a && a.getName() == 'a' && a.getAttribute('href') && a.getChildCount() ? this.setState(CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_DISABLED) },
      contextSensitive: 1,
      startDisabled: 1,
      requiredContent: 'a[href]'
    }; CKEDITOR.removeAnchorCommand = function () {}; CKEDITOR.removeAnchorCommand.prototype = {
      exec: function (c) {
        const b = c.getSelection(); const a = b.createBookmarks(); let f; if (b && (f = b.getSelectedElement()) &&
(f.getChildCount() ? f.is('a') : CKEDITOR.plugins.link.tryRestoreFakeAnchor(c, f)))f.remove(1); else if (f = CKEDITOR.plugins.link.getSelectedLink(c))f.hasAttribute('href') ? (f.removeAttributes({ name: 1, 'data-cke-saved-name': 1 }), f.removeClass('cke_anchor')) : f.remove(1); b.selectBookmarks(a)
      },
      requiredContent: 'a[name]'
    }; CKEDITOR.tools.extend(CKEDITOR.config, { linkShowAdvancedTab: !0, linkShowTargetTab: !0 })
  })(); (function () {
    function I (b, m, e) {
      function c (c) { if (!(!(a = d[c ? 'getFirst' : 'getLast']()) || a.is && a.isBlockBoundary() || !(p = m.root[c ? 'getPrevious' : 'getNext'](CKEDITOR.dom.walker.invisible(!0))) || p.is && p.isBlockBoundary({ br: 1 })))b.document.createElement('br')[c ? 'insertBefore' : 'insertAfter'](a) } for (var f = CKEDITOR.plugins.list.listToArray(m.root, e), g = [], k = 0; k < m.contents.length; k++) {
        var h = m.contents[k]; (h = h.getAscendant('li', !0)) && !h.getCustomData('list_item_processed') && (g.push(h), CKEDITOR.dom.element.setMarker(e,
          h, 'list_item_processed', !0))
      }h = null; for (k = 0; k < g.length; k++)h = g[k].getCustomData('listarray_index'), f[h].indent = -1; for (k = h + 1; k < f.length; k++) if (f[k].indent > f[k - 1].indent + 1) { g = f[k - 1].indent + 1 - f[k].indent; for (h = f[k].indent; f[k] && f[k].indent >= h;)f[k].indent += g, k++; k-- } var d = CKEDITOR.plugins.list.arrayToList(f, e, null, b.config.enterMode, m.root.getAttribute('dir')).listNode; let a; let p; c(!0); c(); d.replace(m.root); b.fire('contentDomInvalidated')
    } function B (b, m) {
      this.name = b; this.context = this.type = m; this.allowedContent =
m + ' li'; this.requiredContent = m
    } function E (b, m, e, c) { for (var f, g; f = b[c ? 'getLast' : 'getFirst'](J);)(g = f.getDirection(1)) !== m.getDirection(1) && f.setAttribute('dir', g), f.remove(), e ? f[c ? 'insertBefore' : 'insertAfter'](e) : m.append(f, c) } function F (b) { function m (e) { const c = b[e ? 'getPrevious' : 'getNext'](u); c && c.type == CKEDITOR.NODE_ELEMENT && c.is(b.getName()) && (E(b, c, null, !e), b.remove(), b = c) }m(); m(1) } function G (b) {
      return b.type == CKEDITOR.NODE_ELEMENT && (b.getName() in CKEDITOR.dtd.$block || b.getName() in CKEDITOR.dtd.$listItem) &&
CKEDITOR.dtd[b.getName()]['#']
    } function C (b, m, e) {
      b.fire('saveSnapshot'); e.enlarge(CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS); let c = e.extractContents(); m.trim(!1, !0); const f = m.createBookmark(); var g = new CKEDITOR.dom.elementPath(m.startContainer); let k = g.block; var g = g.lastElement.getAscendant('li', 1) || k; var h = new CKEDITOR.dom.elementPath(e.startContainer); const d = h.contains(CKEDITOR.dtd.$listItem); var h = h.contains(CKEDITOR.dtd.$list); k ? (k = k.getBogus()) && k.remove() : h && (k = h.getPrevious(u)) && z(k) && k.remove(); (k = c.getLast()) && k.type == CKEDITOR.NODE_ELEMENT &&
k.is('br') && k.remove(); (k = m.startContainer.getChild(m.startOffset)) ? c.insertBefore(k) : m.startContainer.append(c); d && (c = A(d)) && (g.contains(d) ? (E(c, d.getParent(), d), c.remove()) : g.append(c)); for (;e.checkStartOfBlock() && e.checkEndOfBlock();) { h = e.startPath(); c = h.block; if (!c) break; c.is('li') && (g = c.getParent(), c.equals(g.getLast(u)) && c.equals(g.getFirst(u)) && (c = g)); e.moveToPosition(c, CKEDITOR.POSITION_BEFORE_START); c.remove() }e = e.clone(); c = b.editable(); e.setEndAt(c, CKEDITOR.POSITION_BEFORE_END); e = new CKEDITOR.dom.walker(e)
      e.evaluator = function (a) { return u(a) && !z(a) }; (e = e.next()) && e.type == CKEDITOR.NODE_ELEMENT && e.getName() in CKEDITOR.dtd.$list && F(e); m.moveToBookmark(f); m.select(); b.fire('saveSnapshot')
    } function A (b) { return (b = b.getLast(u)) && b.type == CKEDITOR.NODE_ELEMENT && b.getName() in v ? b : null } var v = { ol: 1, ul: 1 }; const K = CKEDITOR.dom.walker.whitespaces(); const H = CKEDITOR.dom.walker.bookmark(); var u = function (b) { return !(K(b) || H(b)) }; var z = CKEDITOR.dom.walker.bogus(); CKEDITOR.plugins.list = {
      listToArray: function (b, m, e, c, f) {
        if (!v[b.getName()]) return []
        c || (c = 0); e || (e = []); for (let g = 0, k = b.getChildCount(); g < k; g++) {
          const h = b.getChild(g); h.type == CKEDITOR.NODE_ELEMENT && h.getName() in CKEDITOR.dtd.$list && CKEDITOR.plugins.list.listToArray(h, m, e, c + 1); if (h.$.nodeName.toLowerCase() == 'li') {
            const d = { parent: b, indent: c, element: h, contents: [] }; f ? d.grandparent = f : (d.grandparent = b.getParent(), d.grandparent && d.grandparent.$.nodeName.toLowerCase() == 'li' && (d.grandparent = d.grandparent.getParent())); m && CKEDITOR.dom.element.setMarker(m, h, 'listarray_index', e.length); e.push(d)
            for (var a = 0, p = h.getChildCount(), l; a < p; a++)l = h.getChild(a), l.type == CKEDITOR.NODE_ELEMENT && v[l.getName()] ? CKEDITOR.plugins.list.listToArray(l, m, e, c + 1, d.grandparent) : d.contents.push(l)
          }
        } return e
      },
      arrayToList: function (b, m, e, c, f) {
        e || (e = 0); if (!b || b.length < e + 1) return null; for (var g, k = b[e].parent.getDocument(), h = new CKEDITOR.dom.documentFragment(k), d = null, a = e, p = Math.max(b[e].indent, 0), l = null, q, n, t = c == CKEDITOR.ENTER_P ? 'p' : 'div'; ;) {
          let r = b[a]; g = r.grandparent; q = r.element.getDirection(1); if (r.indent == p) {
            d && b[a].parent.getName() ==
d.getName() || (d = b[a].parent.clone(!1, 1), f && d.setAttribute('dir', f), h.append(d)); l = d.append(r.element.clone(0, 1)); q != d.getDirection(1) && l.setAttribute('dir', q); for (g = 0; g < r.contents.length; g++)l.append(r.contents[g].clone(1, 1)); a++
          } else if (r.indent == Math.max(p, 0) + 1)r = b[a - 1].element.getDirection(1), a = CKEDITOR.plugins.list.arrayToList(b, null, a, c, r != q ? q : null), !l.getChildCount() && CKEDITOR.env.needsNbspFiller && k.$.documentMode <= 7 && l.append(k.createText(' ')), l.append(a.listNode), a = a.nextIndex; else if (r.indent ==
-1 && !e && g) {
            v[g.getName()] ? (l = r.element.clone(!1, !0), q != g.getDirection(1) && l.setAttribute('dir', q)) : l = new CKEDITOR.dom.documentFragment(k); var d = g.getDirection(1) != q; const y = r.element; const D = y.getAttribute('class'); const z = y.getAttribute('style'); const A = l.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && (c != CKEDITOR.ENTER_BR || d || z || D); var w; const B = r.contents.length; var x; for (g = 0; g < B; g++) {
              if (w = r.contents[g], H(w) && B > 1)A ? x = w.clone(1, 1) : l.append(w.clone(1, 1)); else if (w.type == CKEDITOR.NODE_ELEMENT && w.isBlockBoundary()) {
                d && !w.getDirection() &&
w.setAttribute('dir', q); n = w; const C = y.getAttribute('style'); C && n.setAttribute('style', C.replace(/([^;])$/, '$1;') + (n.getAttribute('style') || '')); D && w.addClass(D); n = null; x && (l.append(x), x = null); l.append(w.clone(1, 1))
              } else A ? (n || (n = k.createElement(t), l.append(n), d && n.setAttribute('dir', q)), z && n.setAttribute('style', z), D && n.setAttribute('class', D), x && (n.append(x), x = null), n.append(w.clone(1, 1))) : l.append(w.clone(1, 1))
            } x && ((n || l).append(x), x = null); l.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && a != b.length - 1 && (CKEDITOR.env.needsBrFiller &&
(q = l.getLast()) && q.type == CKEDITOR.NODE_ELEMENT && q.is('br') && q.remove(), (q = l.getLast(u)) && q.type == CKEDITOR.NODE_ELEMENT && q.is(CKEDITOR.dtd.$block) || l.append(k.createElement('br'))); q = l.$.nodeName.toLowerCase(); q != 'div' && q != 'p' || l.appendBogus(); h.append(l); d = null; a++
          } else return null; n = null; if (b.length <= a || Math.max(b[a].indent, 0) < p) break
        } if (m) {
          for (b = h.getFirst(); b;) {
            if (b.type == CKEDITOR.NODE_ELEMENT && (CKEDITOR.dom.element.clearMarkers(m, b), b.getName() in CKEDITOR.dtd.$listItem && (e = b, k = f = c = void 0, c = e.getDirection()))) {
              for (f =
e.getParent(); f && !(k = f.getDirection());)f = f.getParent(); c == k && e.removeAttribute('dir')
            }b = b.getNextSourceNode()
          }
        } return { listNode: h, nextIndex: a }
      }
    }; const L = /^h[1-6]$/; var J = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT); B.prototype = {
      exec: function (b) {
        this.refresh(b, b.elementPath()); var m = b.config; const e = b.getSelection(); var c = e && e.getRanges(); if (this.state == CKEDITOR.TRISTATE_OFF) {
          var f = b.editable(); if (f.getFirst(u)) { var g = c.length == 1 && c[0]; (m = g && g.getEnclosedNode()) && m.is && this.type == m.getName() && this.setState(CKEDITOR.TRISTATE_ON) } else {
            m.enterMode ==
CKEDITOR.ENTER_BR
              ? f.appendBogus()
              : c[0].fixBlock(1, m.enterMode == CKEDITOR.ENTER_P ? 'p' : 'div'), e.selectRanges(c)
          }
        } for (var m = e.createBookmarks(!0), f = [], k = {}, c = c.createIterator(), h = 0; (g = c.getNextRange()) && ++h;) {
          var d = g.getBoundaryNodes(); var a = d.startNode; var p = d.endNode; a.type == CKEDITOR.NODE_ELEMENT && a.getName() == 'td' && g.setStartAt(d.startNode, CKEDITOR.POSITION_AFTER_START); p.type == CKEDITOR.NODE_ELEMENT && p.getName() == 'td' && g.setEndAt(d.endNode, CKEDITOR.POSITION_BEFORE_END); g = g.createIterator(); for (g.forceBrBreak =
this.state == CKEDITOR.TRISTATE_OFF; d = g.getNextParagraph();) {
            if (!d.getCustomData('list_block')) {
              CKEDITOR.dom.element.setMarker(k, d, 'list_block', 1); for (var l = b.elementPath(d), a = l.elements, p = 0, l = l.blockLimit, q, n = a.length - 1; n >= 0 && (q = a[n]); n--) if (v[q.getName()] && l.contains(q)) { l.removeCustomData('list_group_object_' + h); (a = q.getCustomData('list_group_object')) ? a.contents.push(d) : (a = { root: q, contents: [d] }, f.push(a), CKEDITOR.dom.element.setMarker(k, q, 'list_group_object', a)); p = 1; break }p || (p = l, p.getCustomData('list_group_object_' +
h)
                ? p.getCustomData('list_group_object_' + h).contents.push(d)
                : (a = { root: p, contents: [d] }, CKEDITOR.dom.element.setMarker(k, p, 'list_group_object_' + h, a), f.push(a)))
            }
          }
        } for (q = []; f.length > 0;) {
          if (a = f.shift(), this.state == CKEDITOR.TRISTATE_OFF) {
            if (v[a.root.getName()]) {
              c = b; h = a; a = k; g = q; p = CKEDITOR.plugins.list.listToArray(h.root, a); l = []; for (d = 0; d < h.contents.length; d++) {
                n = h.contents[d], (n = n.getAscendant('li', !0)) && !n.getCustomData('list_item_processed') && (l.push(n), CKEDITOR.dom.element.setMarker(a, n, 'list_item_processed',
                  !0))
              } for (var n = h.root.getDocument(), t = void 0, r = void 0, d = 0; d < l.length; d++) { var y = l[d].getCustomData('listarray_index'); var t = p[y].parent; t.is(this.type) || (r = n.createElement(this.type), t.copyAttributes(r, { start: 1, type: 1 }), r.removeStyle('list-style-type'), p[y].parent = r) }a = CKEDITOR.plugins.list.arrayToList(p, a, null, c.config.enterMode); p = void 0; l = a.listNode.getChildCount(); for (d = 0; d < l && (p = a.listNode.getChild(d)); d++)p.getName() == this.type && g.push(p); a.listNode.replace(h.root); c.fire('contentDomInvalidated')
            } else {
              p =
b; g = a; d = q; l = g.contents; c = g.root.getDocument(); h = []; l.length == 1 && l[0].equals(g.root) && (a = c.createElement('div'), l[0].moveChildren && l[0].moveChildren(a), l[0].append(a), l[0] = a); g = g.contents[0].getParent(); for (n = 0; n < l.length; n++)g = g.getCommonAncestor(l[n].getParent()); t = p.config.useComputedState; p = a = void 0; t = void 0 === t || t; for (n = 0; n < l.length; n++) for (r = l[n]; y = r.getParent();) { if (y.equals(g)) { h.push(r); !p && r.getDirection() && (p = 1); r = r.getDirection(t); a !== null && (a = a && a != r ? null : r); break }r = y } if (!(h.length < 1)) {
                l =
h[h.length - 1].getNext(); n = c.createElement(this.type); d.push(n); for (t = d = void 0; h.length;)d = h.shift(), t = c.createElement('li'), r = d, r.is('pre') || L.test(r.getName()) || r.getAttribute('contenteditable') == 'false' ? d.appendTo(t) : (d.copyAttributes(t), a && d.getDirection() && (t.removeStyle('direction'), t.removeAttribute('dir')), d.moveChildren(t), d.remove()), t.appendTo(n); a && p && n.setAttribute('dir', a); l ? n.insertBefore(l) : n.appendTo(g)
              }
            }
          } else this.state == CKEDITOR.TRISTATE_ON && v[a.root.getName()] && I.call(this, b, a, k)
        }
        for (n = 0; n < q.length; n++)F(q[n]); CKEDITOR.dom.element.clearAllMarkers(k); e.selectBookmarks(m); b.focus()
      },
      refresh: function (b, m) { const e = m.contains(v, 1); const c = m.blockLimit || m.root; e && c.contains(e) ? this.setState(e.is(this.type) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_OFF) }
    }; CKEDITOR.plugins.add('list', {
      requires: 'indentlist',
      init: function (b) {
        b.blockless || (b.addCommand('numberedlist', new B('numberedlist', 'ol')), b.addCommand('bulletedlist', new B('bulletedlist', 'ul')), b.ui.addButton &&
(b.ui.addButton('NumberedList', { label: b.lang.list.numberedlist, command: 'numberedlist', directional: !0, toolbar: 'list,10' }), b.ui.addButton('BulletedList', { label: b.lang.list.bulletedlist, command: 'bulletedlist', directional: !0, toolbar: 'list,20' })), b.on('key', function (m) {
          let e = m.data.domEvent.getKey(); let c; if (b.mode == 'wysiwyg' && e in { 8: 1, 46: 1 }) {
            let f = b.getSelection().getRanges()[0]; let g = f && f.startPath(); if (f && f.collapsed) {
              let k = e == 8; let h = b.editable(); const d = new CKEDITOR.dom.walker(f.clone()); d.evaluator = function (a) {
                return u(a) &&
!z(a)
              }; d.guard = function (a, b) { return !(b && a.type == CKEDITOR.NODE_ELEMENT && a.is('table')) }; e = f.clone(); if (k) {
                var a; (a = g.contains(v)) && f.checkBoundaryOfElement(a, CKEDITOR.START) && (a = a.getParent()) && a.is('li') && (a = A(a))
                  ? (c = a, a = a.getPrevious(u), e.moveToPosition(a && z(a) ? a : c, CKEDITOR.POSITION_BEFORE_START))
                  : (d.range.setStartAt(h, CKEDITOR.POSITION_AFTER_START), d.range.setEnd(f.startContainer, f.startOffset), (a = d.previous()) && a.type == CKEDITOR.NODE_ELEMENT && (a.getName() in v || a.is('li')) && (a.is('li') || (d.range.selectNodeContents(a),
                    d.reset(), d.evaluator = G, a = d.previous()), c = a, e.moveToElementEditEnd(c), e.moveToPosition(e.endPath().block, CKEDITOR.POSITION_BEFORE_END))); if (c)C(b, e, f), m.cancel(); else { var p = g.contains(v); p && f.checkBoundaryOfElement(p, CKEDITOR.START) && (c = p.getFirst(u), f.checkBoundaryOfElement(c, CKEDITOR.START) && (a = p.getPrevious(u), A(c) ? a && (f.moveToElementEditEnd(a), f.select()) : b.execCommand('outdent'), m.cancel())) }
              } else if (c = g.contains('li')) {
                if (d.range.setEndAt(h, CKEDITOR.POSITION_BEFORE_END), k = (h = c.getLast(u)) &&
G(h)
                  ? h
                  : c, g = 0, (a = d.next()) && a.type == CKEDITOR.NODE_ELEMENT && a.getName() in v && a.equals(h) ? (g = 1, a = d.next()) : f.checkBoundaryOfElement(k, CKEDITOR.END) && (g = 2), g && a) {
                  f = f.clone(); f.moveToElementEditStart(a); if (g == 1 && (e.optimize(), !e.startContainer.equals(c))) { for (c = e.startContainer; c.is(CKEDITOR.dtd.$inline);)p = c, c = c.getParent(); p && e.moveToPosition(p, CKEDITOR.POSITION_AFTER_END) }g == 2 && (e.moveToPosition(e.endPath().block, CKEDITOR.POSITION_BEFORE_END), f.endPath().block && f.moveToPosition(f.endPath().block, CKEDITOR.POSITION_AFTER_START))
                  C(b, e, f); m.cancel()
                }
              } else d.range.setEndAt(h, CKEDITOR.POSITION_BEFORE_END), (a = d.next()) && a.type == CKEDITOR.NODE_ELEMENT && a.is(v) && (a = a.getFirst(u), g.block && f.checkStartOfBlock() && f.checkEndOfBlock() ? (g.block.remove(), f.moveToElementEditStart(a), f.select()) : A(a) ? (f.moveToElementEditStart(a), f.select()) : (f = f.clone(), f.moveToElementEditStart(a), C(b, e, f)), m.cancel()); setTimeout(function () { b.selectionChange(1) })
            }
          }
        }))
      }
    })
  })(); (function () {
    CKEDITOR.plugins.liststyle = {
      requires: 'dialog,contextmenu',
      init: function (a) {
        if (!a.blockless) {
          let b; b = new CKEDITOR.dialogCommand('numberedListStyle', { requiredContent: 'ol', allowedContent: 'ol{list-style-type}[start]; li{list-style-type}[value]', contentTransformations: [['ol: listTypeToStyle']] }); b = a.addCommand('numberedListStyle', b); a.addFeature(b); CKEDITOR.dialog.add('numberedListStyle', this.path + 'dialogs/liststyle.js'); b = new CKEDITOR.dialogCommand('bulletedListStyle', {
            requiredContent: 'ul',
            allowedContent: 'ul{list-style-type}',
            contentTransformations: [['ul: listTypeToStyle']]
          }); b = a.addCommand('bulletedListStyle', b); a.addFeature(b); CKEDITOR.dialog.add('bulletedListStyle', this.path + 'dialogs/liststyle.js'); a.addMenuGroup('list', 108); a.addMenuItems({ numberedlist: { label: a.lang.liststyle.numberedTitle, group: 'list', command: 'numberedListStyle' }, bulletedlist: { label: a.lang.liststyle.bulletedTitle, group: 'list', command: 'bulletedListStyle' } }); a.contextMenu.addListener(function (a) {
            if (!a || a.isReadOnly()) return null
            for (;a;) { const b = a.getName(); if (b == 'ol') return { numberedlist: CKEDITOR.TRISTATE_OFF }; if (b == 'ul') return { bulletedlist: CKEDITOR.TRISTATE_OFF }; a = a.getParent() } return null
          })
        }
      }
    }; CKEDITOR.plugins.add('liststyle', CKEDITOR.plugins.liststyle)
  })(); (function () {
    function V (a, c, d) { return n(c) && n(d) && d.equals(c.getNext(function (a) { return !(E(a) || F(a) || u(a)) })) } function z (a) { this.upper = a[0]; this.lower = a[1]; this.set.apply(this, a.slice(2)) } function O (a) { let c = a.element; if (c && n(c) && (c = c.getAscendant(a.triggers, !0)) && a.editable.contains(c)) { const d = P(c); if (d.getAttribute('contenteditable') == 'true') return c; if (d.is(a.triggers)) return d } return null } function ka (a, c, d) { r(a, c); r(a, d); a = c.size.bottom; d = d.size.top; return a && d ? 0 | (a + d) / 2 : a || d } function w (a, c, d) {
      return c =
c[d ? 'getPrevious' : 'getNext'](function (b) { return b && b.type == CKEDITOR.NODE_TEXT && !E(b) || n(b) && !u(b) && !A(a, b) })
    } function q (a, c, d) { return a > c && a < d } function P (a, c) { if (a.data('cke-editable')) return null; for (c || (a = a.getParent()); a && !a.data('cke-editable');) { if (a.hasAttribute('contenteditable')) return a; a = a.getParent() } return null } function la (a) {
      let c = a.doc; const d = G('\x3cspan contenteditable\x3d"false" style\x3d"' + Q + 'position:absolute;border-top:1px dashed ' + a.boxColor + '"\x3e\x3c/span\x3e', c); const b = CKEDITOR.getUrl(this.path +
'images/' + (t.hidpi ? 'hidpi/' : '') + 'icon' + (a.rtl ? '-rtl' : '') + '.png'); v(d, {
        attach: function () { this.wrap.getParent() || this.wrap.appendTo(a.editable, !0); return this },
        lineChildren: [v(G('\x3cspan title\x3d"' + a.editor.lang.magicline.title + '" contenteditable\x3d"false"\x3e\x26#8629;\x3c/span\x3e', c), {
          base: Q + 'height:17px;width:17px;' + (a.rtl ? 'left' : 'right') + ':17px;background:url(' + b + ') center no-repeat ' + a.boxColor + ';cursor:pointer;' + (t.hc
            ? 'font-size: 15px;line-height:14px;border:1px solid #fff;text-align:center;'
            : '') + (t.hidpi ? 'background-size: 9px 10px;' : ''),
          looks: ['top:-8px; border-radius: 2px;', 'top:-17px; border-radius: 2px 2px 0px 0px;', 'top:-1px; border-radius: 0px 0px 2px 2px;']
        }), v(G(W, c), { base: X + 'left:0px;border-left-color:' + a.boxColor + ';', looks: ['border-width:8px 0 8px 8px;top:-8px', 'border-width:8px 0 0 8px;top:-8px', 'border-width:0 0 8px 8px;top:0px'] }), v(G(W, c), {
          base: X + 'right:0px;border-right-color:' + a.boxColor + ';',
          looks: ['border-width:8px 8px 8px 0;top:-8px', 'border-width:8px 8px 0 0;top:-8px',
            'border-width:0 8px 8px 0;top:0px']
        })],
        detach: function () { this.wrap.getParent() && this.wrap.remove(); return this },
        mouseNear: function () { r(a, this); const b = a.holdDistance; const c = this.size; return c && q(a.mouse.y, c.top - b, c.bottom + b) && q(a.mouse.x, c.left - b, c.right + b) ? !0 : !1 },
        place: function () {
          const b = a.view; const c = a.editable; const d = a.trigger; const h = d.upper; const g = d.lower; const l = h || g; const p = l.getParent(); const m = {}; this.trigger = d; h && r(a, h, !0); g && r(a, g, !0); r(a, p, !0); a.inInlineMode && H(a, !0); p.equals(c)
            ? (m.left = b.scroll.x, m.right = -b.scroll.x, m.width = '')
            : (m.left =
l.size.left - l.size.margin.left + b.scroll.x - (a.inInlineMode ? b.editable.left + b.editable.border.left : 0), m.width = l.size.outerWidth + l.size.margin.left + l.size.margin.right + b.scroll.x, m.right = ''); h && g ? m.top = h.size.margin.bottom === g.size.margin.top ? 0 | h.size.bottom + h.size.margin.bottom / 2 : h.size.margin.bottom < g.size.margin.top ? h.size.bottom + h.size.margin.bottom : h.size.bottom + h.size.margin.bottom - g.size.margin.top : h ? g || (m.top = h.size.bottom + h.size.margin.bottom) : m.top = g.size.top - g.size.margin.top; d.is(C) || q(m.top,
            b.scroll.y - 15, b.scroll.y + 5)
            ? (m.top = a.inInlineMode ? 0 : b.scroll.y, this.look(C))
            : d.is(D) || q(m.top, b.pane.bottom - 5, b.pane.bottom + 15) ? (m.top = a.inInlineMode ? b.editable.height + b.editable.padding.top + b.editable.padding.bottom : b.pane.bottom - 1, this.look(D)) : (a.inInlineMode && (m.top -= b.editable.top + b.editable.border.top), this.look(x)); a.inInlineMode && (m.top--, m.top += b.editable.scroll.top, m.left += b.editable.scroll.left); for (const n in m)m[n] = CKEDITOR.tools.cssLength(m[n]); this.setStyles(m)
        },
        look: function (a) {
          if (this.oldLook !=
a) { for (var b = this.lineChildren.length, c; b--;)(c = this.lineChildren[b]).setAttribute('style', c.base + c.looks[0 | a / 2]); this.oldLook = a }
        },
        wrap: new R('span', a.doc)
      }); for (c = d.lineChildren.length; c--;)d.lineChildren[c].appendTo(d); d.look(x); d.appendTo(d.wrap); d.unselectable(); d.lineChildren[0].on('mouseup', function (b) {
        d.detach(); S(a, function (b) { const c = a.line.trigger; b[c.is(I) ? 'insertBefore' : 'insertAfter'](c.is(I) ? c.lower : c.upper) }, !0); a.editor.focus(); t.ie || a.enterMode == CKEDITOR.ENTER_BR || a.hotNode.scrollIntoView()
        b.data.preventDefault(!0)
      }); d.on('mousedown', function (a) { a.data.preventDefault(!0) }); a.line = d
    } function S (a, c, d) { const b = new CKEDITOR.dom.range(a.doc); const e = a.editor; let f; t.ie && a.enterMode == CKEDITOR.ENTER_BR ? f = a.doc.createText(J) : (f = (f = P(a.element, !0)) && f.data('cke-enter-mode') || a.enterMode, f = new R(K[f], a.doc), f.is('br') || a.doc.createText(J).appendTo(f)); d && e.fire('saveSnapshot'); c(f); b.moveToPosition(f, CKEDITOR.POSITION_AFTER_START); e.getSelection().selectRanges([b]); a.hotNode = f; d && e.fire('saveSnapshot') }
    function Y (a, c) {
      return {
        canUndo: !0,
        modes: { wysiwyg: 1 },
        exec: (function () {
          function d (b) { const d = t.ie && t.version < 9 ? ' ' : J; const f = a.hotNode && a.hotNode.getText() == d && a.element.equals(a.hotNode) && a.lastCmdDirection === !!c; S(a, function (d) { f && a.hotNode && a.hotNode.remove(); d[c ? 'insertAfter' : 'insertBefore'](b); d.setAttributes({ 'data-cke-magicline-hot': 1, 'data-cke-magicline-dir': !!c }); a.lastCmdDirection = !!c }); t.ie || a.enterMode == CKEDITOR.ENTER_BR || a.hotNode.scrollIntoView(); a.line.detach() } return function (b) {
            b = b.getSelection().getStartElement()
            let e; b = b.getAscendant(Z, 1); if (!aa(a, b) && b && !b.equals(a.editable) && !b.contains(a.editable)) { (e = P(b)) && e.getAttribute('contenteditable') == 'false' && (b = e); a.element = b; e = w(a, b, !c); let f; n(e) && e.is(a.triggers) && e.is(ma) && (!w(a, e, !c) || (f = w(a, e, !c)) && n(f) && f.is(a.triggers)) ? d(e) : (f = O(a, b), n(f) && (w(a, f, !c) ? (b = w(a, f, !c)) && n(b) && b.is(a.triggers) && d(f) : d(f))) }
          }
        }())
      }
    } function A (a, c) { if (!c || c.type != CKEDITOR.NODE_ELEMENT || !c.$) return !1; const d = a.line; return d.wrap.equals(c) || d.wrap.contains(c) } function n (a) {
      return a &&
a.type == CKEDITOR.NODE_ELEMENT && a.$
    } function u (a) { if (!n(a)) return !1; let c; (c = ba(a)) || (n(a) ? (c = { left: 1, right: 1, center: 1 }, c = !(!c[a.getComputedStyle('float')] && !c[a.getAttribute('align')])) : c = !1); return c } function ba (a) { return !!{ absolute: 1, fixed: 1 }[a.getComputedStyle('position')] } function L (a, c) { return n(c) ? c.is(a.triggers) : null } function aa (a, c) { if (!c) return !1; for (let d = c.getParents(1), b = d.length; b--;) for (let e = a.tabuList.length; e--;) if (d[b].hasAttribute(a.tabuList[e])) return !0; return !1 } function na (a,
      c, d) { c = c[d ? 'getLast' : 'getFirst'](function (b) { return a.isRelevant(b) && !b.is(oa) }); if (!c) return !1; r(a, c); return d ? c.size.top > a.mouse.y : c.size.bottom < a.mouse.y } function ca (a) {
      var c = a.editable; const d = a.mouse; const b = a.view; const e = a.triggerOffset; H(a); const f = d.y > (a.inInlineMode ? b.editable.top + b.editable.height / 2 : Math.min(b.editable.height, b.pane.height) / 2); var c = c[f ? 'getLast' : 'getFirst'](function (a) { return !(E(a) || F(a)) }); if (!c) return null; A(a, c) && (c = a.line.wrap[f ? 'getPrevious' : 'getNext'](function (a) { return !(E(a) || F(a)) }))
      if (!n(c) || u(c) || !L(a, c)) return null; r(a, c); return !f && c.size.top >= 0 && q(d.y, 0, c.size.top + e) ? (a = a.inInlineMode || b.scroll.y === 0 ? C : x, new z([null, c, I, M, a])) : f && c.size.bottom <= b.pane.height && q(d.y, c.size.bottom - e, b.pane.height) ? (a = a.inInlineMode || q(c.size.bottom, b.pane.height - e, b.pane.height) ? D : x, new z([c, null, da, M, a])) : null
    } function ea (a) {
      const c = a.mouse; const d = a.view; var b = a.triggerOffset; const e = O(a); if (!e) return null; r(a, e); var b = Math.min(b, 0 | e.size.outerHeight / 2); let f = []; let k; let h; if (q(c.y, e.size.top - 1, e.size.top + b))h = !1; else if (q(c.y,
        e.size.bottom - b, e.size.bottom + 1))h = !0; else return null; if (u(e) || na(a, e, h) || e.getParent().is(fa)) return null; const g = w(a, e, !h); if (g) { if (g && g.type == CKEDITOR.NODE_TEXT) return null; if (n(g)) { if (u(g) || !L(a, g) || g.getParent().is(fa)) return null; f = [g, e][h ? 'reverse' : 'concat']().concat([T, M]) } } else {
        e.equals(a.editable[h ? 'getLast' : 'getFirst'](a.isRelevant)) ? (H(a), h && q(c.y, e.size.bottom - b, d.pane.height) && q(e.size.bottom, d.pane.height - b, d.pane.height) ? k = D : q(c.y, 0, e.size.top + b) && (k = C)) : k = x, f = [null, e][h
          ? 'reverse'
          : 'concat']().concat([h ? da : I, M, k, e.equals(a.editable[h ? 'getLast' : 'getFirst'](a.isRelevant)) ? h ? D : C : x])
      } return 0 in f ? new z(f) : null
    } function U (a, c, d, b) {
      for (var e = c.getDocumentPosition(), f = {}, k = {}, h = {}, g = {}, l = y.length; l--;)f[y[l]] = parseInt(c.getComputedStyle.call(c, 'border-' + y[l] + '-width'), 10) || 0, h[y[l]] = parseInt(c.getComputedStyle.call(c, 'padding-' + y[l]), 10) || 0, k[y[l]] = parseInt(c.getComputedStyle.call(c, 'margin-' + y[l]), 10) || 0; d && !b || N(a, b); g.top = e.y - (d ? 0 : a.view.scroll.y); g.left = e.x - (d ? 0 : a.view.scroll.x)
      g.outerWidth = c.$.offsetWidth; g.outerHeight = c.$.offsetHeight; g.height = g.outerHeight - (h.top + h.bottom + f.top + f.bottom); g.width = g.outerWidth - (h.left + h.right + f.left + f.right); g.bottom = g.top + g.outerHeight; g.right = g.left + g.outerWidth; a.inInlineMode && (g.scroll = { top: c.$.scrollTop, left: c.$.scrollLeft }); return v({ border: f, padding: h, margin: k, ignoreScroll: d }, g, !0)
    } function r (a, c, d) {
      if (!n(c)) return c.size = null; if (!c.size)c.size = {}; else if (c.size.ignoreScroll == d && c.size.date > new Date() - ga) return null; return v(c.size,
        U(a, c, d), { date: +new Date() }, !0)
    } function H (a, c) { a.view.editable = U(a, a.editable, c, !0) } function N (a, c) { a.view || (a.view = {}); var d = a.view; if (!(!c && d && d.date > new Date() - ga)) { var b = a.win; var d = b.getScrollPosition(); var b = b.getViewPaneSize(); v(a.view, { scroll: { x: d.x, y: d.y, width: a.doc.$.documentElement.scrollWidth - b.width, height: a.doc.$.documentElement.scrollHeight - b.height }, pane: { width: b.width, height: b.height, bottom: b.height + d.y }, date: +new Date() }, !0) } } function pa (a, c, d, b) {
      for (var e = b, f = b, k = 0, h = !1, g = !1, l = a.view.pane.height,
        p = a.mouse; p.y + k < l && p.y - k > 0;) { h || (h = c(e, b)); g || (g = c(f, b)); !h && p.y - k > 0 && (e = d(a, { x: p.x, y: p.y - k })); !g && p.y + k < l && (f = d(a, { x: p.x, y: p.y + k })); if (h && g) break; k += 2 } return new z([e, f, null, null])
    }CKEDITOR.plugins.add('magicline', {
      init: function (a) {
        const c = a.config; const d = c.magicline_triggerOffset || 30; const b = {
          editor: a,
          enterMode: c.enterMode,
          triggerOffset: d,
          holdDistance: 0 | d * (c.magicline_holdDistance || 0.5),
          boxColor: c.magicline_color || '#ff0000',
          rtl: c.contentsLangDirection == 'rtl',
          tabuList: ['data-cke-hidden-sel'].concat(c.magicline_tabuList ||
[]),
          triggers: c.magicline_everywhere ? Z : { table: 1, hr: 1, div: 1, ul: 1, ol: 1, dl: 1, form: 1, blockquote: 1 }
        }; let e; let f; let k; b.isRelevant = function (a) { return n(a) && !A(b, a) && !u(a) }; a.on('contentDom', function () {
          const d = a.editable(); const g = a.document; const l = a.window; v(b, { editable: d, inInlineMode: d.isInline(), doc: g, win: l, hotNode: null }, !0); b.boundary = b.inInlineMode ? b.editable : b.doc.getDocumentElement(); d.is(B.$inline) || (b.inInlineMode && !ba(d) && d.setStyles({ position: 'relative', top: null, left: null }), la.call(this, b), N(b), d.attachListener(a, 'beforeUndoImage',
            function () { b.line.detach() }), d.attachListener(a, 'beforeGetData', function () { b.line.wrap.getParent() && (b.line.detach(), a.once('getData', function () { b.line.attach() }, null, null, 1E3)) }, null, null, 0), d.attachListener(b.inInlineMode ? g : g.getWindow().getFrame(), 'mouseout', function (c) {
            if (a.mode == 'wysiwyg') {
              if (b.inInlineMode) { const d = c.data.$.clientX; c = c.data.$.clientY; N(b); H(b, !0); const e = b.view.editable; const f = b.view.scroll; d > e.left - f.x && d < e.right - f.x && c > e.top - f.y && c < e.bottom - f.y || (clearTimeout(k), k = null, b.line.detach()) } else {
                clearTimeout(k),
                k = null, b.line.detach()
              }
            }
          }), d.attachListener(d, 'keyup', function () { b.hiddenMode = 0 }), d.attachListener(d, 'keydown', function (c) { if (a.mode == 'wysiwyg') switch (c.data.getKeystroke()) { case 2228240:case 16:b.hiddenMode = 1, b.line.detach() } }), d.attachListener(b.inInlineMode ? d : g, 'mousemove', function (c) {
            f = !0; if (a.mode == 'wysiwyg' && !a.readOnly && !k) {
              const d = { x: c.data.$.clientX, y: c.data.$.clientY }; k = setTimeout(function () {
                b.mouse = d; k = b.trigger = null; N(b); f && !b.hiddenMode && a.focusManager.hasFocus && !b.line.mouseNear() && (b.element =
ha(b, !0)) && ((b.trigger = ca(b) || ea(b) || ia(b)) && !aa(b, b.trigger.upper || b.trigger.lower) ? b.line.attach().place() : (b.trigger = null, b.line.detach()), f = !1)
              }, 30)
            }
          }), d.attachListener(l, 'scroll', function () { a.mode == 'wysiwyg' && (b.line.detach(), t.webkit && (b.hiddenMode = 1, clearTimeout(e), e = setTimeout(function () { b.mouseDown || (b.hiddenMode = 0) }, 50))) }), d.attachListener(ja ? g : l, 'mousedown', function () { a.mode == 'wysiwyg' && (b.line.detach(), b.hiddenMode = 1, b.mouseDown = 1) }), d.attachListener(ja ? g : l, 'mouseup', function () {
            b.hiddenMode =
0; b.mouseDown = 0
          }), a.addCommand('accessPreviousSpace', Y(b)), a.addCommand('accessNextSpace', Y(b, !0)), a.setKeystroke([[c.magicline_keystrokePrevious, 'accessPreviousSpace'], [c.magicline_keystrokeNext, 'accessNextSpace']]), a.on('loadSnapshot', function () { let c, d, e, f; for (f in { p: 1, br: 1, div: 1 }) for (c = a.document.getElementsByTag(f), e = c.count(); e--;) if ((d = c.getItem(e)).data('cke-magicline-hot')) { b.hotNode = d; b.lastCmdDirection = d.data('cke-magicline-dir') === 'true' ? !0 : !1; return } }), this.backdoor = {
            accessFocusSpace: S,
            boxTrigger: z,
            isLine: A,
            getAscendantTrigger: O,
            getNonEmptyNeighbour: w,
            getSize: U,
            that: b,
            triggerEdge: ea,
            triggerEditable: ca,
            triggerExpand: ia
          })
        }, this)
      }
    }); var v = CKEDITOR.tools.extend; var R = CKEDITOR.dom.element; var G = R.createFromHtml; var t = CKEDITOR.env; var ja = CKEDITOR.env.ie && CKEDITOR.env.version < 9; var B = CKEDITOR.dtd; var K = {}; var I = 128; var da = 64; var T = 32; var M = 16; var C = 4; var D = 2; var x = 1; var J = ' '; var fa = B.$listItem; var oa = B.$tableContent; var ma = v({}, B.$nonEditable, B.$empty); var Z = B.$block; var ga = 100; var Q = 'width:0px;height:0px;padding:0px;margin:0px;display:block;z-index:9999;color:#fff;position:absolute;font-size: 0px;line-height:0px;'
    var X = Q + 'border-color:transparent;display:block;border-style:solid;'; var W = '\x3cspan\x3e' + J + '\x3c/span\x3e'; K[CKEDITOR.ENTER_BR] = 'br'; K[CKEDITOR.ENTER_P] = 'p'; K[CKEDITOR.ENTER_DIV] = 'div'; z.prototype = { set: function (a, c, d) { this.properties = a + c + (d || x); return this }, is: function (a) { return (this.properties & a) == a } }; var ha = (function () {
      function a (a, d) { const b = a.$.elementFromPoint(d.x, d.y); return b && b.nodeType ? new CKEDITOR.dom.element(b) : null } return function (c, d, b) {
        if (!c.mouse) return null; const e = c.doc; const f = c.line.wrap; b = b || c.mouse
        let k = a(e, b); d && A(c, k) && (f.hide(), k = a(e, b), f.show()); return !k || k.type != CKEDITOR.NODE_ELEMENT || !k.$ || t.ie && t.version < 9 && !c.boundary.equals(k) && !c.boundary.contains(k) ? null : k
      }
    }()); var E = CKEDITOR.dom.walker.whitespaces(); var F = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_COMMENT); var ia = (function () {
      function a (a) {
        var b = a.element; let e; let f; let k; if (!n(b) || b.contains(a.editable) || b.isReadOnly()) return null; k = pa(a, function (a, b) { return !b.equals(a) }, function (a, b) { return ha(a, !0, b) }, b); e = k.upper; f = k.lower; if (V(a, e, f)) {
          return k.set(T,
            8)
        } if (e && b.contains(e)) for (;!e.getParent().equals(b);)e = e.getParent(); else e = b.getFirst(function (b) { return c(a, b) }); if (f && b.contains(f)) for (;!f.getParent().equals(b);)f = f.getParent(); else f = b.getLast(function (b) { return c(a, b) }); if (!e || !f) return null; r(a, e); r(a, f); if (!q(a.mouse.y, e.size.top, f.size.bottom)) return null; for (var b = Number.MAX_VALUE, h, g, l, p; f && !f.equals(e) && (g = e.getNext(a.isRelevant));)h = Math.abs(ka(a, e, g) - a.mouse.y), h < b && (b = h, l = e, p = g), e = g, r(a, e); if (!l || !p || !q(a.mouse.y, l.size.top, p.size.bottom)) return null
        k.upper = l; k.lower = p; return k.set(T, 8)
      } function c (a, b) { return !(b && b.type == CKEDITOR.NODE_TEXT || F(b) || u(b) || A(a, b) || b.type == CKEDITOR.NODE_ELEMENT && b.$ && b.is('br')) } return function (c) { const b = a(c); let e; if (e = b) { e = b.upper; const f = b.lower; e = !e || !f || u(f) || u(e) || f.equals(e) || e.equals(f) || f.contains(e) || e.contains(f) ? !1 : L(c, e) && L(c, f) && V(c, e, f) ? !0 : !1 } return e ? b : null }
    }()); var y = ['top', 'left', 'right', 'bottom']
  })(); CKEDITOR.config.magicline_keystrokePrevious = CKEDITOR.CTRL + CKEDITOR.SHIFT + 51
  CKEDITOR.config.magicline_keystrokeNext = CKEDITOR.CTRL + CKEDITOR.SHIFT + 52; (function () {
    function n (a) { if (!a || a.type != CKEDITOR.NODE_ELEMENT || a.getName() != 'form') return []; for (var e = [], f = ['style', 'className'], b = 0; b < f.length; b++) { let c = a.$.elements.namedItem(f[b]); c && (c = new CKEDITOR.dom.element(c), e.push([c, c.nextSibling]), c.remove()) } return e } function t (a, e) { if (a && a.type == CKEDITOR.NODE_ELEMENT && a.getName() == 'form' && e.length > 0) for (let f = e.length - 1; f >= 0; f--) { const b = e[f][0]; const c = e[f][1]; c ? b.insertBefore(c) : b.appendTo(a) } } function r (a, e) {
      const f = n(a); const b = {}; const c = a.$; e || (b.class = c.className ||
'', c.className = ''); b.inline = c.style.cssText || ''; e || (c.style.cssText = 'position: static; overflow: visible'); t(f); return b
    } function u (a, e) { const f = n(a); const b = a.$; 'class' in e && (b.className = e.class); 'inline' in e && (b.style.cssText = e.inline); t(f) } function v (a) {
      if (!a.editable().isInline()) {
        const e = CKEDITOR.instances; let f; for (f in e) { let b = e[f]; b.mode != 'wysiwyg' || b.readOnly || (b = b.document.getBody(), b.setAttribute('contentEditable', !1), b.setAttribute('contentEditable', !0)) }a.editable().hasFocus && (a.toolbox.focus(),
        a.focus())
      }
    }CKEDITOR.plugins.add('maximize', {
      init: function (a) {
        function e () { const b = c.getViewPaneSize(); a.resize(b.width, b.height, null, !0) } if (a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
          const f = a.lang; const b = CKEDITOR.document; var c = b.getWindow(); let l; let m; let p; let n = CKEDITOR.TRISTATE_OFF; a.addCommand('maximize', {
            modes: { wysiwyg: !CKEDITOR.env.iOS, source: !CKEDITOR.env.iOS },
            readOnly: 1,
            editorFocus: !1,
            exec: function () {
              const h = a.container.getFirst(function (a) { return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass('cke_inner') }); let g = a.ui.space('contents')
              if (a.mode == 'wysiwyg') { var d = a.getSelection(); l = d && d.getRanges(); m = c.getScrollPosition() } else { var k = a.editable().$; l = !CKEDITOR.env.ie && [k.selectionStart, k.selectionEnd]; m = [k.scrollLeft, k.scrollTop] } if (this.state == CKEDITOR.TRISTATE_OFF) {
                c.on('resize', e); p = c.getScrollPosition(); for (d = a.container; d = d.getParent();)d.setCustomData('maximize_saved_styles', r(d)), d.setStyle('z-index', a.config.baseFloatZIndex - 5); g.setCustomData('maximize_saved_styles', r(g, !0)); h.setCustomData('maximize_saved_styles', r(h, !0))
                g = { overflow: CKEDITOR.env.webkit ? '' : 'hidden', width: 0, height: 0 }; b.getDocumentElement().setStyles(g); !CKEDITOR.env.gecko && b.getDocumentElement().setStyle('position', 'fixed'); CKEDITOR.env.gecko && CKEDITOR.env.quirks || b.getBody().setStyles(g); CKEDITOR.env.ie ? setTimeout(function () { c.$.scrollTo(0, 0) }, 0) : c.$.scrollTo(0, 0); h.setStyle('position', CKEDITOR.env.gecko && CKEDITOR.env.quirks ? 'fixed' : 'absolute'); h.$.offsetLeft; h.setStyles({ 'z-index': a.config.baseFloatZIndex - 5, left: '0px', top: '0px' }); h.addClass('cke_maximized')
                e(); g = h.getDocumentPosition(); h.setStyles({ left: -1 * g.x + 'px', top: -1 * g.y + 'px' }); CKEDITOR.env.gecko && v(a)
              } else if (this.state == CKEDITOR.TRISTATE_ON) {
                c.removeListener('resize', e); for (var d = [g, h], q = 0; q < d.length; q++)u(d[q], d[q].getCustomData('maximize_saved_styles')), d[q].removeCustomData('maximize_saved_styles'); for (d = a.container; d = d.getParent();)u(d, d.getCustomData('maximize_saved_styles')), d.removeCustomData('maximize_saved_styles'); CKEDITOR.env.ie
                  ? setTimeout(function () { c.$.scrollTo(p.x, p.y) }, 0)
                  : c.$.scrollTo(p.x,
                    p.y); h.removeClass('cke_maximized'); CKEDITOR.env.webkit && (h.setStyle('display', 'inline'), setTimeout(function () { h.setStyle('display', 'block') }, 0)); a.fire('resize', { outerHeight: a.container.$.offsetHeight, contentsHeight: g.$.offsetHeight, outerWidth: a.container.$.offsetWidth })
              } this.toggleState(); if (d = this.uiItems[0]) {
                g = this.state == CKEDITOR.TRISTATE_OFF ? f.maximize.maximize : f.maximize.minimize, d = CKEDITOR.document.getById(d._.id), d.getChild(1).setHtml(g), d.setAttribute('title', g), d.setAttribute('href', 'javascript:void("' +
g + '");')
              }a.mode == 'wysiwyg' ? l ? (CKEDITOR.env.gecko && v(a), a.getSelection().selectRanges(l), (k = a.getSelection().getStartElement()) && k.scrollIntoView(!0)) : c.$.scrollTo(m.x, m.y) : (l && (k.selectionStart = l[0], k.selectionEnd = l[1]), k.scrollLeft = m[0], k.scrollTop = m[1]); l = m = null; n = this.state; a.fire('maximize', this.state)
            },
            canUndo: !1
          }); a.ui.addButton && a.ui.addButton('Maximize', { label: f.maximize.maximize, command: 'maximize', toolbar: 'tools,10' }); a.on('mode', function () {
            const b = a.getCommand('maximize'); b.setState(b.state ==
CKEDITOR.TRISTATE_DISABLED
              ? CKEDITOR.TRISTATE_DISABLED
              : n)
          }, null, null, 100)
        }
      }
    })
  })(); CKEDITOR.plugins.add('newpage', { init: function (a) { a.addCommand('newpage', { modes: { wysiwyg: 1, source: 1 }, exec: function (b) { const a = this; b.setData(b.config.newpage_html || '', function () { b.focus(); setTimeout(function () { b.fire('afterCommandExec', { name: 'newpage', command: a }); b.selectionChange() }, 200) }) }, async: !0 }); a.ui.addButton && a.ui.addButton('NewPage', { label: a.lang.newpage.toolbar, command: 'newpage', toolbar: 'document,20' }) } }); (function () {
    function e (a) { return { 'aria-label': a, class: 'cke_pagebreak', contenteditable: 'false', 'data-cke-display-name': 'pagebreak', 'data-cke-pagebreak': 1, style: 'page-break-after: always', title: a } }CKEDITOR.plugins.add('pagebreak', {
      requires: 'fakeobjects',
      onLoad: function () {
        const a = ('background:url(' + CKEDITOR.getUrl(this.path + 'images/pagebreak.gif') + ') no-repeat center center;clear:both;width:100%;border-top:#999 1px dotted;border-bottom:#999 1px dotted;padding:0;height:7px;cursor:default;').replace(/;/g,
          ' !important;'); CKEDITOR.addCss('div.cke_pagebreak{' + a + '}')
      },
      init: function (a) { a.blockless || (a.addCommand('pagebreak', CKEDITOR.plugins.pagebreakCmd), a.ui.addButton && a.ui.addButton('PageBreak', { label: a.lang.pagebreak.toolbar, command: 'pagebreak', toolbar: 'insert,70' }), CKEDITOR.env.webkit && a.on('contentDom', function () { a.document.on('click', function (b) { b = b.data.getTarget(); b.is('div') && b.hasClass('cke_pagebreak') && a.getSelection().selectElement(b) }) })) },
      afterInit: function (a) {
        function b (f) {
          CKEDITOR.tools.extend(f.attributes,
            e(a.lang.pagebreak.alt), !0); f.children.length = 0
        } var c = a.dataProcessor; const g = c && c.dataFilter; var c = c && c.htmlFilter; const h = /page-break-after\s*:\s*always/i; const k = /display\s*:\s*none/i; c && c.addRules({ attributes: { class: function (a, b) { const c = a.replace('cke_pagebreak', ''); if (c != a) { let d = CKEDITOR.htmlParser.fragment.fromHtml('\x3cspan style\x3d"display: none;"\x3e\x26nbsp;\x3c/span\x3e').children[0]; b.children.length = 0; b.add(d); d = b.attributes; delete d['aria-label']; delete d.contenteditable; delete d.title } return c } } }, {
          applyToAll: !0,
          priority: 5
        }); g && g.addRules({ elements: { div: function (a) { if (a.attributes['data-cke-pagebreak'])b(a); else if (h.test(a.attributes.style)) { const c = a.children[0]; c && c.name == 'span' && k.test(c.attributes.style) && b(a) } } } })
      }
    }); CKEDITOR.plugins.pagebreakCmd = {
      exec: function (a) { const b = a.document.createElement('div', { attributes: e(a.lang.pagebreak.alt) }); a.insertElement(b) },
      context: 'div',
      allowedContent: {
        div: { styles: '!page-break-after' },
        span: {
          match: function (a) { return (a = a.parent) && a.name == 'div' && a.styles && a.styles['page-break-after'] },
          styles: 'display'
        }
      },
      requiredContent: 'div{page-break-after}'
    }
  })(); (function () {
    var c = { canUndo: !1, async: !0, exec: function (a) { a.getClipboardData({ title: a.lang.pastetext.title }, function (b) { b && a.fire('paste', { type: 'text', dataValue: b.dataValue, method: 'paste', dataTransfer: CKEDITOR.plugins.clipboard.initPasteDataTransfer() }); a.fire('afterCommandExec', { name: 'pastetext', command: c, returnValue: !!b }) }) } }; CKEDITOR.plugins.add('pastetext', {
      requires: 'clipboard',
      init: function (a) {
        a.addCommand('pastetext', c); a.ui.addButton && a.ui.addButton('PasteText', {
          label: a.lang.pastetext.button,
          command: 'pastetext',
          toolbar: 'clipboard,40'
        }); if (a.config.forcePasteAsPlainText)a.on('beforePaste', function (a) { a.data.type != 'html' && (a.data.type = 'text') }); a.on('pasteState', function (b) { a.getCommand('pastetext').setState(b.data) })
      }
    })
  })(); (function () {
    function l (a, b, f) { const d = CKEDITOR.cleanWord; d ? f() : (a = CKEDITOR.getUrl(a.config.pasteFromWordCleanupFile || b + 'filter/default.js'), CKEDITOR.scriptLoader.load(a, f, null, !0)); return !d } function g (a) { a.data.type = 'html' }CKEDITOR.plugins.add('pastefromword', {
      requires: 'clipboard',
      init: function (a) {
        let b = 0; const f = this.path; a.addCommand('pastefromword', {
          canUndo: !1,
          async: !0,
          exec: function (a) {
            const c = this; b = 1; a.once('beforePaste', g); a.getClipboardData({ title: a.lang.pastefromword.title }, function (b) {
              b && a.fire('paste',
                { type: 'html', dataValue: b.dataValue, method: 'paste', dataTransfer: CKEDITOR.plugins.clipboard.initPasteDataTransfer() }); a.fire('afterCommandExec', { name: 'pastefromword', command: c, returnValue: !!b })
            })
          }
        }); a.ui.addButton && a.ui.addButton('PasteFromWord', { label: a.lang.pastefromword.toolbar, command: 'pastefromword', toolbar: 'clipboard,50' }); a.on('pasteState', function (b) { a.getCommand('pastefromword').setState(b.data) }); a.on('paste', function (d) {
          const c = d.data; const h = c.dataValue; const g = /(class=\"?Mso|style=\"[^\"]*\bmso\-|w:WordDocument|<o:\w+>|<\/font>)/
          const e = { dataValue: h }; if (h && (b || g.test(h)) && (!1 !== a.fire('pasteFromWord', e) || b)) { c.dontFilter = !0; var k = l(a, f, function () { if (k)a.fire('paste', c); else if (!a.config.pasteFromWordPromptCleanup || b || confirm(a.lang.pastefromword.confirmCleanup))e.dataValue = CKEDITOR.cleanWord(e.dataValue, a), a.fire('afterPasteFromWord', e), c.dataValue = e.dataValue; b = 0 }); k && d.cancel() }
        }, null, null, 3)
      }
    })
  })(); (function () {
    let h; const k = {
      modes: { wysiwyg: 1, source: 1 },
      canUndo: !1,
      readOnly: 1,
      exec: function (a) {
        let g; var b = a.config; var f = b.baseHref ? '\x3cbase href\x3d"' + b.baseHref + '"/\x3e' : ''; if (b.fullPage)g = a.getData().replace(/<head>/, '$\x26' + f).replace(/[^>]*(?=<\/title>)/, '$\x26 \x26mdash; ' + a.lang.preview.preview); else {
          var b = '\x3cbody '; var d = a.document && a.document.getBody(); d && (d.getAttribute('id') && (b += 'id\x3d"' + d.getAttribute('id') + '" '), d.getAttribute('class') && (b += 'class\x3d"' + d.getAttribute('class') + '" ')); b += '\x3e'; g = a.config.docType +
'\x3chtml dir\x3d"' + a.config.contentsLangDirection + '"\x3e\x3chead\x3e' + f + '\x3ctitle\x3e' + a.lang.preview.preview + '\x3c/title\x3e' + CKEDITOR.tools.buildStyleHtml(a.config.contentsCss) + '\x3c/head\x3e' + b + a.getData() + '\x3c/body\x3e\x3c/html\x3e'
        }f = 640; b = 420; d = 80; try { var c = window.screen; var f = Math.round(0.8 * c.width); var b = Math.round(0.7 * c.height); var d = Math.round(0.1 * c.width) } catch (k) {} if (!1 === a.fire('contentPreview', a = { dataValue: g })) return !1; var c = ''; let e; CKEDITOR.env.ie && (window._cke_htmlToLoad = a.dataValue, e = 'javascript:void( (function(){document.open();' +
('(' + CKEDITOR.tools.fixDomain + ')();').replace(/\/\/.*?\n/g, '').replace(/parent\./g, 'window.opener.') + 'document.write( window.opener._cke_htmlToLoad );document.close();window.opener._cke_htmlToLoad \x3d null;})() )', c = ''); CKEDITOR.env.gecko && (window._cke_htmlToLoad = a.dataValue, c = CKEDITOR.getUrl(h + 'preview.html')); c = window.open(c, null, 'toolbar\x3dyes,location\x3dno,status\x3dyes,menubar\x3dyes,scrollbars\x3dyes,resizable\x3dyes,width\x3d' + f + ',height\x3d' + b + ',left\x3d' + d); CKEDITOR.env.ie && c && (c.location =
e); CKEDITOR.env.ie || CKEDITOR.env.gecko || (e = c.document, e.open(), e.write(a.dataValue), e.close()); return !0
      }
    }; CKEDITOR.plugins.add('preview', { init: function (a) { a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && (h = this.path, a.addCommand('preview', k), a.ui.addButton && a.ui.addButton('Preview', { label: a.lang.preview.preview, command: 'preview', toolbar: 'document,40' })) } })
  })(); CKEDITOR.plugins.add('print', { init: function (a) { a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && (a.addCommand('print', CKEDITOR.plugins.print), a.ui.addButton && a.ui.addButton('Print', { label: a.lang.print.toolbar, command: 'print', toolbar: 'document,50' })) } }); CKEDITOR.plugins.print = { exec: function (a) { CKEDITOR.env.gecko ? a.window.$.print() : a.document.$.execCommand('Print') }, canUndo: !1, readOnly: 1, modes: { wysiwyg: 1 } }; CKEDITOR.plugins.add('removeformat', { init: function (a) { a.addCommand('removeFormat', CKEDITOR.plugins.removeformat.commands.removeformat); a.ui.addButton && a.ui.addButton('RemoveFormat', { label: a.lang.removeformat.toolbar, command: 'removeFormat', toolbar: 'cleanup,10' }) } })
  CKEDITOR.plugins.removeformat = {
    commands: {
      removeformat: {
        exec: function (a) {
          for (var h = a._.removeFormatRegex || (a._.removeFormatRegex = new RegExp('^(?:' + a.config.removeFormatTags.replace(/,/g, '|') + ')$', 'i')), e = a._.removeAttributes || (a._.removeAttributes = a.config.removeFormatAttributes.split(',')), f = CKEDITOR.plugins.removeformat.filter, m = a.getSelection().getRanges(), n = m.createIterator(), p = function (a) { return a.type == CKEDITOR.NODE_ELEMENT }, c; c = n.getNextRange();) {
            c.collapsed || c.enlarge(CKEDITOR.ENLARGE_ELEMENT)
            const l = c.createBookmark(); let b = l.startNode; const d = l.endNode; let k = function (b) { for (var c = a.elementPath(b), e = c.elements, d = 1, g; (g = e[d]) && !g.equals(c.block) && !g.equals(c.blockLimit); d++)h.test(g.getName()) && f(a, g) && b.breakParent(g) }; k(b); if (d) {
              for (k(d), b = b.getNextSourceNode(!0, CKEDITOR.NODE_ELEMENT); b && !b.equals(d);) {
                if (b.isReadOnly()) { if (b.getPosition(d) & CKEDITOR.POSITION_CONTAINS) break; b = b.getNext(p) } else {
                  k = b.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT), b.getName() == 'img' && b.data('cke-realelement') || !f(a, b) || (h.test(b.getName())
                    ? b.remove(1)
                    : (b.removeAttributes(e), a.fire('removeFormatCleanup', b))), b = k
                }
              }
            }c.moveToBookmark(l)
          }a.forceNextSelectionCheck(); a.getSelection().selectRanges(m)
        }
      }
    },
    filter: function (a, h) { for (let e = a._.removeFormatFilters || [], f = 0; f < e.length; f++) if (!1 === e[f](h)) return !1; return !0 }
  }; CKEDITOR.editor.prototype.addRemoveFormatFilter = function (a) { this._.removeFormatFilters || (this._.removeFormatFilters = []); this._.removeFormatFilters.push(a) }; CKEDITOR.config.removeFormatTags = 'b,big,cite,code,del,dfn,em,font,i,ins,kbd,q,s,samp,small,span,strike,strong,sub,sup,tt,u,var'
  CKEDITOR.config.removeFormatAttributes = 'class,style,lang,width,height,align,hspace,valign'; (function () { const b = { readOnly: 1, exec: function (a) { if (a.fire('save') && (a = a.element.$.form)) try { a.submit() } catch (b) { a.submit.click && a.submit.click() } } }; CKEDITOR.plugins.add('save', { init: function (a) { a.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (a.addCommand('save', b).modes = { wysiwyg: !!a.element.$.form }, a.ui.addButton && a.ui.addButton('Save', { label: a.lang.save.toolbar, command: 'save', toolbar: 'document,10' })) } }) })(); (function () {
    CKEDITOR.plugins.add('selectall', {
      init: function (b) {
        b.addCommand('selectAll', { modes: { wysiwyg: 1, source: 1 }, exec: function (a) { const b = a.editable(); if (b.is('textarea'))a = b.$, CKEDITOR.env.ie ? a.createTextRange().execCommand('SelectAll') : (a.selectionStart = 0, a.selectionEnd = a.value.length), a.focus(); else { if (b.is('body'))a.document.$.execCommand('SelectAll', !1, null); else { const c = a.createRange(); c.selectNodeContents(b); c.select() }a.forceNextSelectionCheck(); a.selectionChange() } }, canUndo: !1 }); b.ui.addButton &&
b.ui.addButton('SelectAll', { label: b.lang.selectall.toolbar, command: 'selectAll', toolbar: 'selection,10' })
      }
    })
  })(); (function () {
    const k = { readOnly: 1, preserveState: !0, editorFocus: !1, exec: function (a) { this.toggleState(); this.refresh(a) }, refresh: function (a) { if (a.document) { const c = this.state != CKEDITOR.TRISTATE_ON || a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && !a.focusManager.hasFocus ? 'removeClass' : 'attachClass'; a.editable()[c]('cke_show_blocks') } } }; CKEDITOR.plugins.add('showblocks', {
      onLoad: function () {
        const a = 'p div pre address blockquote h1 h2 h3 h4 h5 h6'.split(' '); let c; let b; let e; let f; const k = CKEDITOR.getUrl(this.path); const l = !(CKEDITOR.env.ie &&
CKEDITOR.env.version < 9); const g = l ? ':not([contenteditable\x3dfalse]):not(.cke_show_blocks_off)' : ''; let d; let h; for (c = b = e = f = ''; d = a.pop();)h = a.length ? ',' : '', c += '.cke_show_blocks ' + d + g + h, e += '.cke_show_blocks.cke_contents_ltr ' + d + g + h, f += '.cke_show_blocks.cke_contents_rtl ' + d + g + h, b += '.cke_show_blocks ' + d + g + '{background-image:url(' + CKEDITOR.getUrl(k + 'images/block_' + d + '.png') + ')}'; CKEDITOR.addCss((c + '{background-repeat:no-repeat;border:1px dotted gray;padding-top:8px}').concat(b, e + '{background-position:top left;padding-left:8px}',
          f + '{background-position:top right;padding-right:8px}')); l || CKEDITOR.addCss('.cke_show_blocks [contenteditable\x3dfalse],.cke_show_blocks .cke_show_blocks_off{border:none;padding-top:0;background-image:none}.cke_show_blocks.cke_contents_rtl [contenteditable\x3dfalse],.cke_show_blocks.cke_contents_rtl .cke_show_blocks_off{padding-right:0}.cke_show_blocks.cke_contents_ltr [contenteditable\x3dfalse],.cke_show_blocks.cke_contents_ltr .cke_show_blocks_off{padding-left:0}')
      },
      init: function (a) {
        function c () { b.refresh(a) }
        if (!a.blockless) { var b = a.addCommand('showblocks', k); b.canUndo = !1; a.config.startupOutlineBlocks && b.setState(CKEDITOR.TRISTATE_ON); a.ui.addButton && a.ui.addButton('ShowBlocks', { label: a.lang.showblocks.toolbar, command: 'showblocks', toolbar: 'tools,20' }); a.on('mode', function () { b.state != CKEDITOR.TRISTATE_DISABLED && b.refresh(a) }); a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && (a.on('focus', c), a.on('blur', c)); a.on('contentDom', function () { b.state != CKEDITOR.TRISTATE_DISABLED && b.refresh(a) }) }
      }
    })
  })(); (function () {
    const f = { preserveState: !0, editorFocus: !1, readOnly: 1, exec: function (a) { this.toggleState(); this.refresh(a) }, refresh: function (a) { if (a.document) { const b = this.state == CKEDITOR.TRISTATE_ON ? 'attachClass' : 'removeClass'; a.editable()[b]('cke_show_borders') } } }; CKEDITOR.plugins.add('showborders', {
      modes: { wysiwyg: 1 },
      onLoad: function () {
        let a; a = (CKEDITOR.env.ie6Compat ? ['.%1 table.%2,', '.%1 table.%2 td, .%1 table.%2 th', '{', 'border : #d3d3d3 1px dotted', '}'] : '.%1 table.%2,;.%1 table.%2 \x3e tr \x3e td, .%1 table.%2 \x3e tr \x3e th,;.%1 table.%2 \x3e tbody \x3e tr \x3e td, .%1 table.%2 \x3e tbody \x3e tr \x3e th,;.%1 table.%2 \x3e thead \x3e tr \x3e td, .%1 table.%2 \x3e thead \x3e tr \x3e th,;.%1 table.%2 \x3e tfoot \x3e tr \x3e td, .%1 table.%2 \x3e tfoot \x3e tr \x3e th;{;border : #d3d3d3 1px dotted;}'.split(';')).join('').replace(/%2/g,
          'cke_show_border').replace(/%1/g, 'cke_show_borders '); CKEDITOR.addCss(a)
      },
      init: function (a) {
        const b = a.addCommand('showborders', f); b.canUndo = !1; !1 !== a.config.startupShowBorders && b.setState(CKEDITOR.TRISTATE_ON); a.on('mode', function () { b.state != CKEDITOR.TRISTATE_DISABLED && b.refresh(a) }, null, null, 100); a.on('contentDom', function () { b.state != CKEDITOR.TRISTATE_DISABLED && b.refresh(a) }); a.on('removeFormatCleanup', function (d) {
          d = d.data; a.getCommand('showborders').state == CKEDITOR.TRISTATE_ON && d.is('table') && (!d.hasAttribute('border') ||
parseInt(d.getAttribute('border'), 10) <= 0) && d.addClass('cke_show_border')
        })
      },
      afterInit: function (a) {
        let b = a.dataProcessor; a = b && b.dataFilter; b = b && b.htmlFilter; a && a.addRules({ elements: { table: function (a) { a = a.attributes; const b = a.class; const c = parseInt(a.border, 10); c && !(c <= 0) || b && b.indexOf('cke_show_border') != -1 || (a.class = (b || '') + ' cke_show_border') } } }); b && b.addRules({
          elements: {
            table: function (a) {
              a = a.attributes; const b = a.class; b && (a.class = b.replace('cke_show_border', '').replace(/\s{2}/, ' ').replace(/^\s+|\s+$/,
                ''))
            }
          }
        })
      }
    }); CKEDITOR.on('dialogDefinition', function (a) {
      let b = a.data.name; if (b == 'table' || b == 'tableProperties') {
        if (a = a.data.definition, b = a.getContents('info').get('txtBorder'), b.commit = CKEDITOR.tools.override(b.commit, function (a) { return function (b, c) { a.apply(this, arguments); const e = parseInt(this.getValue(), 10); c[!e || e <= 0 ? 'addClass' : 'removeClass']('cke_show_border') } }), a = (a = a.getContents('advanced')) && a.get('advCSSClasses')) {
          a.setup = CKEDITOR.tools.override(a.setup, function (a) {
            return function () {
              a.apply(this,
                arguments); this.setValue(this.getValue().replace(/cke_show_border/, ''))
            }
          }), a.commit = CKEDITOR.tools.override(a.commit, function (a) { return function (b, c) { a.apply(this, arguments); parseInt(c.getAttribute('border'), 10) || c.addClass('cke_show_border') } })
        }
      }
    })
  })(); (function () {
    CKEDITOR.plugins.add('sourcearea', {
      init: function (a) {
        function d () { const a = e && this.equals(CKEDITOR.document.getActive()); this.hide(); this.setStyle('height', this.getParent().$.clientHeight + 'px'); this.setStyle('width', this.getParent().$.clientWidth + 'px'); this.show(); a && this.focus() } if (a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
          const f = CKEDITOR.plugins.sourcearea; a.addMode('source', function (e) {
            let b = a.ui.space('contents').getDocument().createElement('textarea'); b.setStyles(CKEDITOR.tools.extend({
              width: CKEDITOR.env.ie7Compat
                ? '99%'
                : '100%',
              height: '100%',
              resize: 'none',
              outline: 'none',
              'text-align': 'left'
            }, CKEDITOR.tools.cssVendorPrefix('tab-size', a.config.sourceAreaTabSize || 4))); b.setAttribute('dir', 'ltr'); b.addClass('cke_source').addClass('cke_reset').addClass('cke_enable_context_menu'); a.ui.space('contents').append(b); b = a.editable(new c(a, b)); b.setData(a.getData(1)); CKEDITOR.env.ie && (b.attachListener(a, 'resize', d, b), b.attachListener(CKEDITOR.document.getWindow(), 'resize', d, b), CKEDITOR.tools.setTimeout(d, 0, b)); a.fire('ariaWidget',
              this); e()
          }); a.addCommand('source', f.commands.source); a.ui.addButton && a.ui.addButton('Source', { label: a.lang.sourcearea.toolbar, command: 'source', toolbar: 'mode,10' }); a.on('mode', function () { a.getCommand('source').setState(a.mode == 'source' ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) }); var e = CKEDITOR.env.ie && CKEDITOR.env.version == 9
        }
      }
    }); var c = CKEDITOR.tools.createClass({
      base: CKEDITOR.editable,
      proto: {
        setData: function (a) { this.setValue(a); this.status = 'ready'; this.editor.fire('dataReady') },
        getData: function () { return this.getValue() },
        insertHtml: function () {},
        insertElement: function () {},
        insertText: function () {},
        setReadOnly: function (a) { this[(a ? 'set' : 'remove') + 'Attribute']('readOnly', 'readonly') },
        detach: function () { c.baseProto.detach.call(this); this.clearCustomData(); this.remove() }
      }
    })
  })()
  CKEDITOR.plugins.sourcearea = { commands: { source: { modes: { wysiwyg: 1, source: 1 }, editorFocus: !1, readOnly: 1, exec: function (c) { c.mode == 'wysiwyg' && c.fire('saveSnapshot'); c.getCommand('source').setState(CKEDITOR.TRISTATE_DISABLED); c.setMode(c.mode == 'source' ? 'wysiwyg' : 'source') }, canUndo: !1 } } }; CKEDITOR.plugins.add('specialchar', {
    availableLangs: { af: 1, ar: 1, bg: 1, ca: 1, cs: 1, cy: 1, da: 1, de: 1, 'de-ch': 1, el: 1, en: 1, 'en-gb': 1, eo: 1, es: 1, et: 1, eu: 1, fa: 1, fi: 1, fr: 1, 'fr-ca': 1, gl: 1, he: 1, hr: 1, hu: 1, id: 1, it: 1, ja: 1, km: 1, ko: 1, ku: 1, lt: 1, lv: 1, nb: 1, nl: 1, no: 1, oc: 1, pl: 1, pt: 1, 'pt-br': 1, ru: 1, si: 1, sk: 1, sl: 1, sq: 1, sv: 1, th: 1, tr: 1, tt: 1, ug: 1, uk: 1, vi: 1, zh: 1, 'zh-cn': 1 },
    requires: 'dialog',
    init: function (a) {
      const c = this; CKEDITOR.dialog.add('specialchar', this.path + 'dialogs/specialchar.js'); a.addCommand('specialchar', {
        exec: function () {
          var b =
a.langCode; var b = c.availableLangs[b] ? b : c.availableLangs[b.replace(/-.*/, '')] ? b.replace(/-.*/, '') : 'en'; CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(c.path + 'dialogs/lang/' + b + '.js'), function () { CKEDITOR.tools.extend(a.lang.specialchar, c.langEntries[b]); a.openDialog('specialchar') })
        },
        modes: { wysiwyg: 1 },
        canUndo: !1
      }); a.ui.addButton && a.ui.addButton('SpecialChar', { label: a.lang.specialchar.toolbar, command: 'specialchar', toolbar: 'insert,50' })
    }
  }); CKEDITOR.config.specialChars = "! \x26quot; # $ % \x26amp; ' ( ) * + - . / 0 1 2 3 4 5 6 7 8 9 : ; \x26lt; \x3d \x26gt; ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~ \x26euro; \x26lsquo; \x26rsquo; \x26ldquo; \x26rdquo; \x26ndash; \x26mdash; \x26iexcl; \x26cent; \x26pound; \x26curren; \x26yen; \x26brvbar; \x26sect; \x26uml; \x26copy; \x26ordf; \x26laquo; \x26not; \x26reg; \x26macr; \x26deg; \x26sup2; \x26sup3; \x26acute; \x26micro; \x26para; \x26middot; \x26cedil; \x26sup1; \x26ordm; \x26raquo; \x26frac14; \x26frac12; \x26frac34; \x26iquest; \x26Agrave; \x26Aacute; \x26Acirc; \x26Atilde; \x26Auml; \x26Aring; \x26AElig; \x26Ccedil; \x26Egrave; \x26Eacute; \x26Ecirc; \x26Euml; \x26Igrave; \x26Iacute; \x26Icirc; \x26Iuml; \x26ETH; \x26Ntilde; \x26Ograve; \x26Oacute; \x26Ocirc; \x26Otilde; \x26Ouml; \x26times; \x26Oslash; \x26Ugrave; \x26Uacute; \x26Ucirc; \x26Uuml; \x26Yacute; \x26THORN; \x26szlig; \x26agrave; \x26aacute; \x26acirc; \x26atilde; \x26auml; \x26aring; \x26aelig; \x26ccedil; \x26egrave; \x26eacute; \x26ecirc; \x26euml; \x26igrave; \x26iacute; \x26icirc; \x26iuml; \x26eth; \x26ntilde; \x26ograve; \x26oacute; \x26ocirc; \x26otilde; \x26ouml; \x26divide; \x26oslash; \x26ugrave; \x26uacute; \x26ucirc; \x26uuml; \x26yacute; \x26thorn; \x26yuml; \x26OElig; \x26oelig; \x26#372; \x26#374 \x26#373 \x26#375; \x26sbquo; \x26#8219; \x26bdquo; \x26hellip; \x26trade; \x26#9658; \x26bull; \x26rarr; \x26rArr; \x26hArr; \x26diams; \x26asymp;".split(' '); CKEDITOR.plugins.add('scayt', {
    requires: 'menubutton,dialog',
    tabToOpen: null,
    dialogName: 'scaytDialog',
    onLoad: function (a) { CKEDITOR.plugins.scayt.onLoadTimestamp = (new Date()).getTime(); (CKEDITOR.skinName || a.config.skin) == 'moono-lisa' && CKEDITOR.document.appendStyleSheet(this.path + 'skins/' + CKEDITOR.skin.name + '/scayt.css') },
    init: function (a) {
      const c = this; const d = CKEDITOR.plugins.scayt; this.bindEvents(a); this.parseConfig(a); this.addRule(a); CKEDITOR.dialog.add(this.dialogName, CKEDITOR.getUrl(this.path + 'dialogs/options.js'))
      this.addMenuItems(a); const b = a.lang.scayt; const e = CKEDITOR.env; a.ui.add('Scayt', CKEDITOR.UI_MENUBUTTON, {
        label: b.text_title,
        title: a.plugins.wsc ? a.lang.wsc.title : b.text_title,
        modes: { wysiwyg: !(e.ie && (e.version < 8 || e.quirks)) },
        toolbar: 'spellchecker,20',
        refresh: function () { let b = a.ui.instances.Scayt.getState(); a.scayt && (b = d.state.scayt[a.name] ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF); a.fire('scaytButtonState', b) },
        onRender: function () { const b = this; a.on('scaytButtonState', function (a) { void 0 !== typeof a.data && b.setState(a.data) }) },
        onMenu: function () {
          let b = a.scayt; a.getMenuItem('scaytToggle').label = a.lang.scayt[b && d.state.scayt[a.name] ? 'btn_disable' : 'btn_enable']; b = { scaytToggle: CKEDITOR.TRISTATE_OFF, scaytOptions: b ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, scaytLangs: b ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, scaytDict: b ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, scaytAbout: b ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, WSC: a.plugins.wsc ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED }; a.config.scayt_uiTabs[0] ||
delete b.scaytOptions; a.config.scayt_uiTabs[1] || delete b.scaytLangs; a.config.scayt_uiTabs[2] || delete b.scaytDict; return b
        }
      }); a.contextMenu && a.addMenuItems && (a.contextMenu.addListener(function (b, d) { const h = a.scayt; let k; let e; h && (e = h.getSelectionNode()) && (k = c.menuGenerator(a, e), h.showBanner('.' + a.contextMenu._.definition.panel.className.split(' ').join(' .'))); return k }), a.contextMenu._.onHide = CKEDITOR.tools.override(a.contextMenu._.onHide, function (b) { return function () { const d = a.scayt; d && d.hideBanner(); return b.apply(this) } }))
    },
    addMenuItems: function (a) {
      const c = this; const d = CKEDITOR.plugins.scayt; a.addMenuGroup('scaytButton'); for (var b = a.config.scayt_contextMenuItemsOrder.split('|'), e = 0; e < b.length; e++)b[e] = 'scayt_' + b[e]; if ((b = ['grayt_description', 'grayt_suggest', 'grayt_control'].concat(b)) && b.length) for (e = 0; e < b.length; e++)a.addMenuGroup(b[e], e - 10); a.addCommand('scaytToggle', { exec: function (a) { const b = a.scayt; d.state.scayt[a.name] = !d.state.scayt[a.name]; !0 === d.state.scayt[a.name] ? b || d.createScayt(a) : b && d.destroy(a) } }); a.addCommand('scaytAbout',
        { exec: function (a) { a.scayt.tabToOpen = 'about'; a.lockSelection(); a.openDialog(c.dialogName) } }); a.addCommand('scaytOptions', { exec: function (a) { a.scayt.tabToOpen = 'options'; a.lockSelection(); a.openDialog(c.dialogName) } }); a.addCommand('scaytLangs', { exec: function (a) { a.scayt.tabToOpen = 'langs'; a.lockSelection(); a.openDialog(c.dialogName) } }); a.addCommand('scaytDict', { exec: function (a) { a.scayt.tabToOpen = 'dictionaries'; a.lockSelection(); a.openDialog(c.dialogName) } }); b = {
        scaytToggle: {
          label: a.lang.scayt.btn_enable,
          group: 'scaytButton',
          command: 'scaytToggle'
        },
        scaytAbout: { label: a.lang.scayt.btn_about, group: 'scaytButton', command: 'scaytAbout' },
        scaytOptions: { label: a.lang.scayt.btn_options, group: 'scaytButton', command: 'scaytOptions' },
        scaytLangs: { label: a.lang.scayt.btn_langs, group: 'scaytButton', command: 'scaytLangs' },
        scaytDict: { label: a.lang.scayt.btn_dictionaries, group: 'scaytButton', command: 'scaytDict' }
      }; a.plugins.wsc && (b.WSC = {
        label: a.lang.wsc.toolbar,
        group: 'scaytButton',
        onClick: function () {
          const b = CKEDITOR.plugins.scayt
          const d = a.scayt; let c = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.container.getText() : a.document.getBody().getText(); (c = c.replace(/\s/g, '')) ? (d && b.state.scayt[a.name] && d.setMarkupPaused && d.setMarkupPaused(!0), a.lockSelection(), a.execCommand('checkspell')) : alert('Nothing to check!')
        }
      }); a.addMenuItems(b)
    },
    bindEvents: function (a) {
      const c = CKEDITOR.plugins.scayt; const d = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE; const b = function () { c.destroy(a) }; const e = function () { !c.state.scayt[a.name] || a.readOnly || a.scayt || c.createScayt(a) }; const f = function () {
        const b =
a.editable(); b.attachListener(b, 'focus', function (b) { CKEDITOR.plugins.scayt && !a.scayt && setTimeout(e, 0); b = CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[a.name] && a.scayt; let c, h; if ((d || b) && a._.savedSelection) { b = a._.savedSelection.getSelectedElement(); b = !b && a._.savedSelection.getRanges(); for (let f = 0; f < b.length; f++)h = b[f], typeof h.startContainer.$.nodeValue === 'string' && (c = h.startContainer.getText().length, (c < h.startOffset || c < h.endOffset) && a.unlockSelection(!1)) } }, this, null, -10)
      }; const g = function () {
        d
          ? a.config.scayt_inlineModeImmediateMarkup ? e() : (a.on('blur', function () { setTimeout(b, 0) }), a.on('focus', e), a.focusManager.hasFocus && e())
          : e(); f(); const c = a.editable(); c.attachListener(c, 'mousedown', function (b) { b = b.data.getTarget(); const d = a.widgets && a.widgets.getByElement(b); d && (d.wrapper = b.getAscendant(function (a) { return a.hasAttribute('data-cke-widget-wrapper') }, !0)) }, this, null, -10)
      }; a.on('contentDom', g); a.on('beforeCommandExec', function (b) {
        const d = a.scayt; let e = null; let f = !1; let g = !0; b.data.name in c.options.disablingCommandExec &&
a.mode == 'wysiwyg'
          ? d && (c.destroy(a), a.fire('scaytButtonState', CKEDITOR.TRISTATE_DISABLED))
          : b.data.name !== 'bold' && b.data.name !== 'italic' && b.data.name !== 'underline' && b.data.name !== 'strike' && b.data.name !== 'subscript' && b.data.name !== 'superscript' && b.data.name !== 'enter' && b.data.name !== 'cut' && b.data.name !== 'language' || !d || (b.data.name === 'cut' && (g = !1, f = !0), b.data.name === 'language' && (e = (e = a.plugins.language.getCurrentLangElement(a)) && e.$, f = !0), a.fire('reloadMarkupScayt', {
            removeOptions: {
              removeInside: g,
              forceBookmark: f,
              selectionNode: e
            },
            timeout: 0
          }))
      }); a.on('beforeSetMode', function (b) { if (b.data == 'source') { if (b = a.scayt)c.destroy(a), a.fire('scaytButtonState', CKEDITOR.TRISTATE_DISABLED); a.document && a.document.getBody().removeAttribute('_jquid') } }); a.on('afterCommandExec', function (b) { a.mode != 'wysiwyg' || b.data.name != 'undo' && b.data.name != 'redo' || setTimeout(function () { c.reloadMarkup(a.scayt) }, 250) }); a.on('readOnly', function (b) {
        let d; b && (d = a.scayt, !0 === b.editor.readOnly
          ? d && d.fire('removeMarkupInDocument', {})
          : d
            ? c.reloadMarkup(d)
            : b.editor.mode == 'wysiwyg' && !0 === c.state.scayt[b.editor.name] && (c.createScayt(a), b.editor.fire('scaytButtonState', CKEDITOR.TRISTATE_ON)))
      }); a.on('beforeDestroy', b); a.on('setData', function () { b(); (a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE || a.plugins.divarea) && g() }, this, null, 50); a.on('reloadMarkupScayt', function (b) { const d = b.data && b.data.removeOptions; b = b.data && b.data.timeout; const e = a.scayt; e && setTimeout(function () { e.removeMarkupInSelectionNode(d); c.reloadMarkup(e) }, b || 0) }); a.on('insertElement', function () {
        a.fire('reloadMarkupScayt',
          { removeOptions: { forceBookmark: !0 } })
      }, this, null, 50); a.on('insertHtml', function () { a.fire('reloadMarkupScayt') }, this, null, 50); a.on('insertText', function () { a.fire('reloadMarkupScayt') }, this, null, 50); a.on('scaytDialogShown', function (b) { b.data.selectPage(a.scayt.tabToOpen) })
    },
    parseConfig: function (a) {
      var c = CKEDITOR.plugins.scayt; c.replaceOldOptionsNames(a.config); typeof a.config.scayt_autoStartup !== 'boolean' && (a.config.scayt_autoStartup = !1); c.state.scayt[a.name] = a.config.scayt_autoStartup; typeof a.config.grayt_autoStartup !== 'boolean' &&
(a.config.grayt_autoStartup = !1); typeof a.config.scayt_inlineModeImmediateMarkup !== 'boolean' && (a.config.scayt_inlineModeImmediateMarkup = !1); c.state.grayt[a.name] = a.config.grayt_autoStartup; a.config.scayt_contextCommands || (a.config.scayt_contextCommands = 'ignore|ignoreall|add'); a.config.scayt_contextMenuItemsOrder || (a.config.scayt_contextMenuItemsOrder = 'suggest|moresuggest|control'); a.config.scayt_sLang || (a.config.scayt_sLang = 'en_US'); if (void 0 === a.config.scayt_maxSuggestions || typeof a.config.scayt_maxSuggestions !== 'number' ||
a.config.scayt_maxSuggestions < 0)a.config.scayt_maxSuggestions = 5; if (void 0 === a.config.scayt_minWordLength || typeof a.config.scayt_minWordLength !== 'number' || a.config.scayt_minWordLength < 1)a.config.scayt_minWordLength = 4; if (void 0 === a.config.scayt_customDictionaryIds || typeof a.config.scayt_customDictionaryIds !== 'string')a.config.scayt_customDictionaryIds = ''; if (void 0 === a.config.scayt_userDictionaryName || typeof a.config.scayt_userDictionaryName !== 'string')a.config.scayt_userDictionaryName = null; if (typeof a.config.scayt_uiTabs ===
'string' && a.config.scayt_uiTabs.split(',').length === 3) { const d = []; const b = []; a.config.scayt_uiTabs = a.config.scayt_uiTabs.split(','); CKEDITOR.tools.search(a.config.scayt_uiTabs, function (a) { Number(a) === 1 || Number(a) === 0 ? (b.push(!0), d.push(Number(a))) : b.push(!1) }); CKEDITOR.tools.search(b, !1) === null ? a.config.scayt_uiTabs = d : a.config.scayt_uiTabs = [1, 1, 1] } else a.config.scayt_uiTabs = [1, 1, 1]; typeof a.config.scayt_serviceProtocol !== 'string' && (a.config.scayt_serviceProtocol = null); typeof a.config.scayt_serviceHost !== 'string' &&
(a.config.scayt_serviceHost = null); typeof a.config.scayt_servicePort !== 'string' && (a.config.scayt_servicePort = null); typeof a.config.scayt_servicePath !== 'string' && (a.config.scayt_servicePath = null); a.config.scayt_moreSuggestions || (a.config.scayt_moreSuggestions = 'on'); typeof a.config.scayt_customerId !== 'string' && (a.config.scayt_customerId = '1:WvF0D4-UtPqN1-43nkD4-NKvUm2-daQqk3-LmNiI-z7Ysb4-mwry24-T8YrS3-Q2tpq2'); typeof a.config.scayt_srcUrl !== 'string' && (c = document.location.protocol, c = c.search(/https?:/) != -1
        ? c
        : 'http:', a.config.scayt_srcUrl = c + '//svc.webspellchecker.net/spellcheck31/lf/scayt3/ckscayt/ckscayt.js'); typeof CKEDITOR.config.scayt_handleCheckDirty !== 'boolean' && (CKEDITOR.config.scayt_handleCheckDirty = !0); typeof CKEDITOR.config.scayt_handleUndoRedo !== 'boolean' && (CKEDITOR.config.scayt_handleUndoRedo = !0); CKEDITOR.config.scayt_handleUndoRedo = CKEDITOR.plugins.undo ? CKEDITOR.config.scayt_handleUndoRedo : !1; typeof a.config.scayt_multiLanguageMode !== 'boolean' && (a.config.scayt_multiLanguageMode = !1); typeof a.config.scayt_multiLanguageStyles !==
'object' && (a.config.scayt_multiLanguageStyles = {}); a.config.scayt_ignoreAllCapsWords && typeof a.config.scayt_ignoreAllCapsWords !== 'boolean' && (a.config.scayt_ignoreAllCapsWords = !1); a.config.scayt_ignoreDomainNames && typeof a.config.scayt_ignoreDomainNames !== 'boolean' && (a.config.scayt_ignoreDomainNames = !1); a.config.scayt_ignoreWordsWithMixedCases && typeof a.config.scayt_ignoreWordsWithMixedCases !== 'boolean' && (a.config.scayt_ignoreWordsWithMixedCases = !1); a.config.scayt_ignoreWordsWithNumbers &&
typeof a.config.scayt_ignoreWordsWithNumbers !== 'boolean' && (a.config.scayt_ignoreWordsWithNumbers = !1); if (a.config.scayt_disableOptionsStorage) {
        var c = CKEDITOR.tools.isArray(a.config.scayt_disableOptionsStorage) ? a.config.scayt_disableOptionsStorage : typeof a.config.scayt_disableOptionsStorage === 'string' ? [a.config.scayt_disableOptionsStorage] : void 0; const e = 'all options lang ignore-all-caps-words ignore-domain-names ignore-words-with-mixed-cases ignore-words-with-numbers'.split(' '); let f = ['lang', 'ignore-all-caps-words',
          'ignore-domain-names', 'ignore-words-with-mixed-cases', 'ignore-words-with-numbers']; const g = CKEDITOR.tools.search; const h = CKEDITOR.tools.indexOf; a.config.scayt_disableOptionsStorage = (function (a) { for (var b = [], d = 0; d < a.length; d++) { const c = a[d]; const m = !!g(a, 'options'); if (!g(e, c) || m && g(f, function (a) { if (a === 'lang') return !1 })) return; g(f, c) && f.splice(h(f, c), 1); if (c === 'all' || m && g(a, 'lang')) return []; c === 'options' && (f = ['lang']) } return b = b.concat(f) }(c))
      }
    },
    addRule: function (a) {
      const c = CKEDITOR.plugins.scayt; var d = a.dataProcessor; const b = d && d.htmlFilter
      const e = a._.elementsPath && a._.elementsPath.filters; var d = d && d.dataFilter; const f = a.addRemoveFormatFilter; const g = function (b) { if (a.scayt && (b.hasAttribute(c.options.data_attribute_name) || b.hasAttribute(c.options.problem_grammar_data_attribute))) return !1 }; const h = function (b) { let d = !0; a.scayt && (b.hasAttribute(c.options.data_attribute_name) || b.hasAttribute(c.options.problem_grammar_data_attribute)) && (d = !1); return d }; e && e.push(g); d && d.addRules({
        elements: {
          span: function (a) {
            const b = a.hasClass(c.options.misspelled_word_class) && a.attributes[c.options.data_attribute_name]
            const d = a.hasClass(c.options.problem_grammar_class) && a.attributes[c.options.problem_grammar_data_attribute]; c && (b || d) && delete a.name; return a
          }
        }
      }); b && b.addRules({ elements: { span: function (a) { const b = a.hasClass(c.options.misspelled_word_class) && a.attributes[c.options.data_attribute_name]; const d = a.hasClass(c.options.problem_grammar_class) && a.attributes[c.options.problem_grammar_data_attribute]; c && (b || d) && delete a.name; return a } } }); f && f.call(a, h)
    },
    scaytMenuDefinition: function (a) {
      const c = this; a = a.scayt; return {
        scayt: {
          scayt_ignore: {
            label: a.getLocal('btn_ignore'),
            group: 'scayt_control',
            order: 1,
            exec: function (a) { a.scayt.ignoreWord() }
          },
          scayt_ignoreall: { label: a.getLocal('btn_ignoreAll'), group: 'scayt_control', order: 2, exec: function (a) { a.scayt.ignoreAllWords() } },
          scayt_add: { label: a.getLocal('btn_addWord'), group: 'scayt_control', order: 3, exec: function (a) { const b = a.scayt; setTimeout(function () { b.addWordToUserDictionary() }, 10) } },
          scayt_option: {
            label: a.getLocal('btn_options'),
            group: 'scayt_control',
            order: 4,
            exec: function (a) { a.scayt.tabToOpen = 'options'; a.lockSelection(); a.openDialog(c.dialogName) },
            verification: function (a) { return a.config.scayt_uiTabs[0] == 1 ? !0 : !1 }
          },
          scayt_language: { label: a.getLocal('btn_langs'), group: 'scayt_control', order: 5, exec: function (a) { a.scayt.tabToOpen = 'langs'; a.lockSelection(); a.openDialog(c.dialogName) }, verification: function (a) { return a.config.scayt_uiTabs[1] == 1 ? !0 : !1 } },
          scayt_dictionary: {
            label: a.getLocal('btn_dictionaries'),
            group: 'scayt_control',
            order: 6,
            exec: function (a) { a.scayt.tabToOpen = 'dictionaries'; a.lockSelection(); a.openDialog(c.dialogName) },
            verification: function (a) {
              return a.config.scayt_uiTabs[2] ==
1
                ? !0
                : !1
            }
          },
          scayt_about: { label: a.getLocal('btn_about'), group: 'scayt_control', order: 7, exec: function (a) { a.scayt.tabToOpen = 'about'; a.lockSelection(); a.openDialog(c.dialogName) } }
        },
        grayt: { grayt_problemdescription: { label: 'Grammar problem description', group: 'grayt_description', order: 1, state: CKEDITOR.TRISTATE_DISABLED, exec: function (a) {} }, grayt_ignore: { label: a.getLocal('btn_ignore'), group: 'grayt_control', order: 2, exec: function (a) { a.scayt.ignorePhrase() } } }
      }
    },
    buildSuggestionMenuItems: function (a,
      c, d) {
      const b = {}; const e = {}; const f = d ? 'word' : 'phrase'; const g = d ? 'startGrammarCheck' : 'startSpellCheck'; const h = a.scayt; if (c.length > 0 && c[0] !== 'no_any_suggestions') {
        if (d) {
          for (d = 0; d < c.length; d++) {
            var k = 'scayt_suggest_' + CKEDITOR.plugins.scayt.suggestions[d].replace(' ', '_'); a.addCommand(k, this.createCommand(CKEDITOR.plugins.scayt.suggestions[d], f, g)); d < a.config.scayt_maxSuggestions
              ? (a.addMenuItem(k, { label: c[d], command: k, group: 'scayt_suggest', order: d + 1 }), b[k] = CKEDITOR.TRISTATE_OFF)
              : (a.addMenuItem(k, {
                  label: c[d],
                  command: k,
                  group: 'scayt_moresuggest',
                  order: d + 1
                }), e[k] = CKEDITOR.TRISTATE_OFF, a.config.scayt_moreSuggestions === 'on' && (a.addMenuItem('scayt_moresuggest', { label: h.getLocal('btn_moreSuggestions'), group: 'scayt_moresuggest', order: 10, getItems: function () { return e } }), b.scayt_moresuggest = CKEDITOR.TRISTATE_OFF))
          }
        } else {
          for (d = 0; d < c.length; d++) {
            k = 'grayt_suggest_' + CKEDITOR.plugins.scayt.suggestions[d].replace(' ', '_'), a.addCommand(k, this.createCommand(CKEDITOR.plugins.scayt.suggestions[d], f, g)), a.addMenuItem(k, {
              label: c[d],
              command: k,
              group: 'grayt_suggest',
              order: d + 1
            }), b[k] = CKEDITOR.TRISTATE_OFF
          }
        }
      } else b.no_scayt_suggest = CKEDITOR.TRISTATE_DISABLED, a.addCommand('no_scayt_suggest', { exec: function () {} }), a.addMenuItem('no_scayt_suggest', { label: h.getLocal('btn_noSuggestions') || 'no_scayt_suggest', command: 'no_scayt_suggest', group: 'scayt_suggest', order: 0 }); return b
    },
    menuGenerator: function (a, c) {
      const d = a.scayt; let b = this.scaytMenuDefinition(a); let e = {}; const f = a.config.scayt_contextCommands.split('|'); const g = c.getAttribute(d.getLangAttribute()) || d.getLang(); let h; let k; h = d.isScaytNode(c); k =
d.isGraytNode(c); h ? (b = b.scayt, e = c.getAttribute(d.getScaytNodeAttributeName()), d.fire('getSuggestionsList', { lang: g, word: e }), e = this.buildSuggestionMenuItems(a, CKEDITOR.plugins.scayt.suggestions, h)) : k && (b = b.grayt, e = c.getAttribute(d.getGraytNodeAttributeName()), k = d.getProblemDescriptionText(e, g), b.grayt_problemdescription && k && (b.grayt_problemdescription.label = k), d.fire('getGrammarSuggestionsList', { lang: g, phrase: e }), e = this.buildSuggestionMenuItems(a, CKEDITOR.plugins.scayt.suggestions, h)); if (h && a.config.scayt_contextCommands ==
'off') return e; for (const l in b)h && CKEDITOR.tools.indexOf(f, l.replace('scayt_', '')) == -1 && a.config.scayt_contextCommands != 'all' || (e[l] = typeof b[l].state !== 'undefined' ? b[l].state : CKEDITOR.TRISTATE_OFF, typeof b[l].verification !== 'function' || b[l].verification(a) || delete e[l], a.addCommand(l, { exec: b[l].exec }), a.addMenuItem(l, { label: a.lang.scayt[b[l].label] || b[l].label, command: l, group: b[l].group, order: b[l].order })); return e
    },
    createCommand: function (a, c, d) {
      return {
        exec: function (b) {
          b = b.scayt
          const e = {}; e[c] = a; b.replaceSelectionNode(e); d === 'startGrammarCheck' && b.removeMarkupInSelectionNode({ grammarOnly: !0 }); b.fire(d)
        }
      }
    }
  })
  CKEDITOR.plugins.scayt = {
    charsToObserve: [{ charName: 'cke-fillingChar', charCode: (function () { var a = CKEDITOR.version.match(/^\d(\.\d*)*/); var a = a && a[0]; let c; if (a) { c = '4.5.7'; let d; var a = a.replace(/\./g, ''); c = c.replace(/\./g, ''); d = a.length - c.length; d = d >= 0 ? d : 0; c = parseInt(a) >= parseInt(c) * Math.pow(10, d) } return c ? Array(7).join(String.fromCharCode(8203)) : String.fromCharCode(8203) }()) }],
    onLoadTimestamp: '',
    state: { scayt: {}, grayt: {} },
    warningCounter: 0,
    suggestions: [],
    options: {
      disablingCommandExec: { source: !0, newpage: !0, templates: !0 },
      data_attribute_name: 'data-scayt-word',
      misspelled_word_class: 'scayt-misspell-word',
      problem_grammar_data_attribute: 'data-grayt-phrase',
      problem_grammar_class: 'gramm-problem'
    },
    backCompatibilityMap: { scayt_service_protocol: 'scayt_serviceProtocol', scayt_service_host: 'scayt_serviceHost', scayt_service_port: 'scayt_servicePort', scayt_service_path: 'scayt_servicePath', scayt_customerid: 'scayt_customerId' },
    alarmCompatibilityMessage: function () {
      this.warningCounter < 5 && (console.warn('Note: You are using latest version of SCAYT plug-in. It is recommended to upgrade WebSpellChecker.net application to version v4.8.3.Contact us by e-mail at support@webspellchecker.net.'),
      this.warningCounter += 1)
    },
    reloadMarkup: function (a) { let c; a && (c = a.getScaytLangList(), a.reloadMarkup ? a.reloadMarkup() : (this.alarmCompatibilityMessage(), c && c.ltr && c.rtl && a.fire('startSpellCheck, startGrammarCheck'))) },
    replaceOldOptionsNames: function (a) { for (const c in a)c in this.backCompatibilityMap && (a[this.backCompatibilityMap[c]] = a[c], delete a[c]) },
    createScayt: function (a) {
      const c = this; const d = CKEDITOR.plugins.scayt; this.loadScaytLibrary(a, function (a) {
        function e (a) { return new SCAYT.CKSCAYT(a, function () {}, function () {}) }
        let f = a.window && a.window.getFrame() || a.editable(); if (f) {
          f = {
            lang: a.config.scayt_sLang,
            container: f.$,
            customDictionary: a.config.scayt_customDictionaryIds,
            userDictionaryName: a.config.scayt_userDictionaryName,
            localization: a.langCode,
            customer_id: a.config.scayt_customerId,
            debug: a.config.scayt_debug,
            data_attribute_name: c.options.data_attribute_name,
            misspelled_word_class: c.options.misspelled_word_class,
            problem_grammar_data_attribute: c.options.problem_grammar_data_attribute,
            problem_grammar_class: c.options.problem_grammar_class,
            'options-to-restore': a.config.scayt_disableOptionsStorage,
            focused: a.editable().hasFocus,
            ignoreElementsRegex: a.config.scayt_elementsToIgnore,
            minWordLength: a.config.scayt_minWordLength,
            multiLanguageMode: a.config.scayt_multiLanguageMode,
            multiLanguageStyles: a.config.scayt_multiLanguageStyles,
            graytAutoStartup: d.state.grayt[a.name],
            charsToObserve: d.charsToObserve
          }; a.config.scayt_serviceProtocol && (f.service_protocol = a.config.scayt_serviceProtocol); a.config.scayt_serviceHost && (f.service_host = a.config.scayt_serviceHost)
          a.config.scayt_servicePort && (f.service_port = a.config.scayt_servicePort); a.config.scayt_servicePath && (f.service_path = a.config.scayt_servicePath); typeof a.config.scayt_ignoreAllCapsWords === 'boolean' && (f['ignore-all-caps-words'] = a.config.scayt_ignoreAllCapsWords); typeof a.config.scayt_ignoreDomainNames === 'boolean' && (f['ignore-domain-names'] = a.config.scayt_ignoreDomainNames); typeof a.config.scayt_ignoreWordsWithMixedCases === 'boolean' && (f['ignore-words-with-mixed-cases'] = a.config.scayt_ignoreWordsWithMixedCases)
          typeof a.config.scayt_ignoreWordsWithNumbers === 'boolean' && (f['ignore-words-with-numbers'] = a.config.scayt_ignoreWordsWithNumbers); let g; try { g = e(f) } catch (h) { c.alarmCompatibilityMessage(), delete f.charsToObserve, g = e(f) }g.subscribe('suggestionListSend', function (a) { for (var b = {}, d = [], c = 0; c < a.suggestionList.length; c++)b['word_' + a.suggestionList[c]] || (b['word_' + a.suggestionList[c]] = a.suggestionList[c], d.push(a.suggestionList[c])); CKEDITOR.plugins.scayt.suggestions = d }); g.subscribe('selectionIsChanged', function (d) {
            a.getSelection().isLocked &&
a.lockSelection()
          }); g.subscribe('graytStateChanged', function (c) { d.state.grayt[a.name] = c.state }); g.addMarkupHandler && g.addMarkupHandler(function (c) { const d = a.editable(); const e = d.getCustomData(c.charName); e && (e.$ = c.node, d.setCustomData(c.charName, e)) }); a.scayt = g; a.fire('scaytButtonState', a.readOnly ? CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_ON)
        } else d.state.scayt[a.name] = !1
      })
    },
    destroy: function (a) { a.scayt && a.scayt.destroy(); delete a.scayt; a.fire('scaytButtonState', CKEDITOR.TRISTATE_OFF) },
    loadScaytLibrary: function (a,
      c) { let d; const b = function () { CKEDITOR.fireOnce('scaytReady'); a.scayt || typeof c === 'function' && c(a) }; typeof window.SCAYT === 'undefined' || typeof window.SCAYT.CKSCAYT !== 'function' ? (d = a.config.scayt_srcUrl + '?' + this.onLoadTimestamp, CKEDITOR.scriptLoader.load(d, function (a) { a && b() })) : window.SCAYT && typeof window.SCAYT.CKSCAYT === 'function' && b() }
  }
  CKEDITOR.on('dialogDefinition', function (a) {
    const c = a.data.name; a = a.data.definition.dialog; if (c === 'scaytDialog')a.on('cancel', function (a) { return !1 }, this, null, -1); if (c === 'checkspell')a.on('cancel', function (a) { a = a.sender && a.sender.getParentEditor(); const b = CKEDITOR.plugins.scayt; const c = a.scayt; c && b.state.scayt[a.name] && c.setMarkupPaused && c.setMarkupPaused(!1); a.unlockSelection() }, this, null, -2); if (c === 'link') {
      a.on('ok', function (a) {
        const b = a.sender && a.sender.getParentEditor(); b && setTimeout(function () {
          b.fire('reloadMarkupScayt',
            { removeOptions: { removeInside: !0, forceBookmark: !0 }, timeout: 0 })
        }, 0)
      })
    }
  })
  CKEDITOR.on('scaytReady', function () {
    if (!0 === CKEDITOR.config.scayt_handleCheckDirty) {
      var a = CKEDITOR.editor.prototype; a.checkDirty = CKEDITOR.tools.override(a.checkDirty, function (a) { return function () { var b = null; var c = this.scayt; if (CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[this.name] && this.scayt) { if (b = this.status == 'ready') var f = c.removeMarkupFromString(this.getSnapshot()), c = c.removeMarkupFromString(this._.previousValue), b = b && c !== f } else b = a.call(this); return b } }); a.resetDirty = CKEDITOR.tools.override(a.resetDirty,
        function (a) { return function () { const b = this.scayt; CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[this.name] && this.scayt ? this._.previousValue = b.removeMarkupFromString(this.getSnapshot()) : a.call(this) } })
    } if (!0 === CKEDITOR.config.scayt_handleUndoRedo) {
      var a = CKEDITOR.plugins.undo.Image.prototype; const c = typeof a.equalsContent === 'function' ? 'equalsContent' : 'equals'; a[c] = CKEDITOR.tools.override(a[c], function (a) {
        return function (b) {
          const c = b.editor.scayt; const f = this.contents; const g = b.contents; let h = null; CKEDITOR.plugins.scayt &&
CKEDITOR.plugins.scayt.state.scayt[b.editor.name] && b.editor.scayt && (this.contents = c.removeMarkupFromString(f) || '', b.contents = c.removeMarkupFromString(g) || ''); h = a.apply(this, arguments); this.contents = f; b.contents = g; return h
        }
      })
    }
  }); (function () {
    CKEDITOR.plugins.add('stylescombo', {
      requires: 'richcombo',
      init: function (c) {
        const l = c.config; const g = c.lang.stylescombo; let f = {}; let k = []; const m = []; c.on('stylesSet', function (b) {
          if (b = b.data.styles) {
            for (var a, h, d, e = 0, n = b.length; e < n; e++) {
              (a = b[e], c.blockless && a.element in CKEDITOR.dtd.$block || typeof a.type === 'string' && !CKEDITOR.style.customHandlers[a.type] || (h = a.name, a = new CKEDITOR.style(a), c.filter.customConfig && !c.filter.check(a))) || (a._name = h, a._.enterMode = l.enterMode, a._.type = d = a.assignedTo || a.type, a._.weight =
e + 1E3 * (d == CKEDITOR.STYLE_OBJECT ? 1 : d == CKEDITOR.STYLE_BLOCK ? 2 : 3), f[h] = a, k.push(a), m.push(a))
            }k.sort(function (a, b) { return a._.weight - b._.weight })
          }
        }); c.ui.addRichCombo('Styles', {
          label: g.label,
          title: g.panelTitle,
          toolbar: 'styles,10',
          allowedContent: m,
          panel: { css: [CKEDITOR.skin.getPath('editor')].concat(l.contentsCss), multiSelect: !0, attributes: { 'aria-label': g.panelTitle } },
          init: function () {
            let b, a, c, d, e, f; e = 0; for (f = k.length; e < f; e++) {
              b = k[e], a = b._name, d = b._.type, d != c && (this.startGroup(g['panelTitle' + String(d)]),
              c = d), this.add(a, b.type == CKEDITOR.STYLE_OBJECT ? a : b.buildPreview(), a)
            } this.commit()
          },
          onClick: function (b) { c.focus(); c.fire('saveSnapshot'); b = f[b]; const a = c.elementPath(); c[b.checkActive(a, c) ? 'removeStyle' : 'applyStyle'](b); c.fire('saveSnapshot') },
          onRender: function () { c.on('selectionChange', function (b) { const a = this.getValue(); b = b.data.path.elements; for (var h = 0, d = b.length, e; h < d; h++) { e = b[h]; for (const g in f) if (f[g].checkElementRemovable(e, !0, c)) { g != a && this.setValue(g); return } } this.setValue('') }, this) },
          onOpen: function () {
            var b =
c.getSelection().getSelectedElement(); var b = c.elementPath(b); const a = [0, 0, 0, 0]; this.showAll(); this.unmarkAll(); for (const h in f) { const d = f[h]; const e = d._.type; d.checkApplicable(b, c, c.activeFilter) ? a[e]++ : this.hideItem(h); d.checkActive(b, c) && this.mark(h) }a[CKEDITOR.STYLE_BLOCK] || this.hideGroup(g['panelTitle' + String(CKEDITOR.STYLE_BLOCK)]); a[CKEDITOR.STYLE_INLINE] || this.hideGroup(g['panelTitle' + String(CKEDITOR.STYLE_INLINE)]); a[CKEDITOR.STYLE_OBJECT] || this.hideGroup(g['panelTitle' + String(CKEDITOR.STYLE_OBJECT)])
          },
          refresh: function () {
            const b =
c.elementPath(); if (b) { for (const a in f) if (f[a].checkApplicable(b, c, c.activeFilter)) return; this.setState(CKEDITOR.TRISTATE_DISABLED) }
          },
          reset: function () { f = {}; k = [] }
        })
      }
    })
  })(); (function () {
    function k (c) {
      return {
        editorFocus: !1,
        canUndo: !1,
        modes: { wysiwyg: 1 },
        exec: function (d) {
          if (d.editable().hasFocus) {
            var e = d.getSelection(); let b; if (b = (new CKEDITOR.dom.elementPath(e.getCommonAncestor(), e.root)).contains({ td: 1, th: 1 }, 1)) {
              var e = d.createRange(); var a = CKEDITOR.tools.tryThese(function () { const a = b.getParent().$.cells[b.$.cellIndex + (c ? -1 : 1)]; a.parentNode.parentNode; return a }, function () {
                var a = b.getParent(); var a = a.getAscendant('table').$.rows[a.$.rowIndex + (c ? -1 : 1)]; return a.cells[c
                  ? a.cells.length - 1
                  : 0]
              }); if (a || c) if (a)a = new CKEDITOR.dom.element(a), e.moveToElementEditStart(a), e.checkStartOfBlock() && e.checkEndOfBlock() || e.selectNodeContents(a); else return !0; else { for (var f = b.getAscendant('table').$, a = b.getParent().$.cells, f = new CKEDITOR.dom.element(f.insertRow(-1), d.document), g = 0, h = a.length; g < h; g++)f.append((new CKEDITOR.dom.element(a[g], d.document)).clone(!1, !1)).appendBogus(); e.moveToElementEditStart(f) }e.select(!0); return !0
            }
          } return !1
        }
      }
    } const h = { editorFocus: !1, modes: { wysiwyg: 1, source: 1 } }; const g = {
      exec: function (c) {
        c.container.focusNext(!0,
          c.tabIndex)
      }
    }; const f = { exec: function (c) { c.container.focusPrevious(!0, c.tabIndex) } }; CKEDITOR.plugins.add('tab', {
      init: function (c) {
        for (var d = !1 !== c.config.enableTabKeyTools, e = c.config.tabSpaces || 0, b = ''; e--;)b += ' '; if (b)c.on('key', function (a) { a.data.keyCode == 9 && (c.insertText(b), a.cancel()) }); if (d)c.on('key', function (a) { (a.data.keyCode == 9 && c.execCommand('selectNextCell') || a.data.keyCode == CKEDITOR.SHIFT + 9 && c.execCommand('selectPreviousCell')) && a.cancel() }); c.addCommand('blur', CKEDITOR.tools.extend(g, h)); c.addCommand('blurBack',
          CKEDITOR.tools.extend(f, h)); c.addCommand('selectNextCell', k()); c.addCommand('selectPreviousCell', k(!0))
      }
    })
  })()
  CKEDITOR.dom.element.prototype.focusNext = function (k, h) {
    const g = void 0 === h ? this.getTabIndex() : h; let f; let c; let d; let e; let b; let a; if (g <= 0) for (b = this.getNextSourceNode(k, CKEDITOR.NODE_ELEMENT); b;) { if (b.isVisible() && b.getTabIndex() === 0) { d = b; break }b = b.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT) } else {
      for (b = this.getDocument().getBody().getFirst(); b = b.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT);) {
        if (!f) {
          if (!c && b.equals(this)) { if (c = !0, k) { if (!(b = b.getNextSourceNode(!0, CKEDITOR.NODE_ELEMENT))) break; f = 1 } } else {
            c && !this.contains(b) &&
(f = 1)
          }
        } if (b.isVisible() && !((a = b.getTabIndex()) < 0)) { if (f && a == g) { d = b; break }a > g && (!d || !e || a < e) ? (d = b, e = a) : d || a !== 0 || (d = b, e = a) }
      }
    }d && d.focus()
  }
  CKEDITOR.dom.element.prototype.focusPrevious = function (k, h) { for (var g = void 0 === h ? this.getTabIndex() : h, f, c, d, e = 0, b, a = this.getDocument().getBody().getLast(); a = a.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT);) { if (!f) if (!c && a.equals(this)) { if (c = !0, k) { if (!(a = a.getPreviousSourceNode(!0, CKEDITOR.NODE_ELEMENT))) break; f = 1 } } else c && !this.contains(a) && (f = 1); if (a.isVisible() && !((b = a.getTabIndex()) < 0)) if (g <= 0) { if (f && b === 0) { d = a; break }b > e && (d = a, e = b) } else { if (f && b == g) { d = a; break }b < g && (!d || b > e) && (d = a, e = b) } }d && d.focus() }; CKEDITOR.plugins.add('table', {
    requires: 'dialog',
    init: function (a) {
      function e (b) { return CKEDITOR.tools.extend(b || {}, { contextSensitive: 1, refresh: function (b, a) { this.setState(a.contains('table', 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED) } }) } if (!a.blockless) {
        const c = a.lang.table; a.addCommand('table', new CKEDITOR.dialogCommand('table', {
          context: 'table',
          allowedContent: 'table{width,height}[align,border,cellpadding,cellspacing,summary];caption tbody thead tfoot;th td tr[scope];' + (a.plugins.dialogadvtab
            ? 'table' + a.plugins.dialogadvtab.allowedContent()
            : ''),
          requiredContent: 'table',
          contentTransformations: [['table{width}: sizeToStyle', 'table[width]: sizeToAttribute'], ['td: splitBorderShorthand'], [{ element: 'table', right: function (b) { b.styles && (b.styles.border && b.styles.border.match(/solid/) && (b.attributes.border = 1), b.styles['border-collapse'] == 'collapse' && (b.attributes.cellspacing = 0)) } }]]
        })); a.addCommand('tableProperties', new CKEDITOR.dialogCommand('tableProperties', e())); a.addCommand('tableDelete', e({
          exec: function (b) {
            let a =
b.elementPath().contains('table', 1); if (a) { const d = a.getParent(); const c = b.editable(); d.getChildCount() != 1 || d.is('td', 'th') || d.equals(c) || (a = d); b = b.createRange(); b.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START); a.remove(); b.select() }
          }
        })); a.ui.addButton && a.ui.addButton('Table', { label: c.toolbar, command: 'table', toolbar: 'insert,30' }); CKEDITOR.dialog.add('table', this.path + 'dialogs/table.js'); CKEDITOR.dialog.add('tableProperties', this.path + 'dialogs/table.js'); a.addMenuItems && a.addMenuItems({
          table: {
            label: c.menu,
            command: 'tableProperties',
            group: 'table',
            order: 5
          },
          tabledelete: { label: c.deleteTable, command: 'tableDelete', group: 'table', order: 1 }
        }); a.on('doubleclick', function (a) { a.data.element.is('table') && (a.data.dialog = 'tableProperties') }); a.contextMenu && a.contextMenu.addListener(function () { return { tabledelete: CKEDITOR.TRISTATE_OFF, table: CKEDITOR.TRISTATE_OFF } })
      }
    }
  }); (function () {
    function t (e) {
      function d (a) { b.length > 0 || a.type != CKEDITOR.NODE_ELEMENT || !C.test(a.getName()) || a.getCustomData('selected_cell') || (CKEDITOR.dom.element.setMarker(c, a, 'selected_cell', !0), b.push(a)) }e = e.getRanges(); for (var b = [], c = {}, a = 0; a < e.length; a++) {
        var f = e[a]; if (f.collapsed)f = f.getCommonAncestor(), (f = f.getAscendant('td', !0) || f.getAscendant('th', !0)) && b.push(f); else {
          var f = new CKEDITOR.dom.walker(f); var g; for (f.guard = d; g = f.next();) {
            g.type == CKEDITOR.NODE_ELEMENT && g.is(CKEDITOR.dtd.table) || (g = g.getAscendant('td',
              !0) || g.getAscendant('th', !0)) && !g.getCustomData('selected_cell') && (CKEDITOR.dom.element.setMarker(c, g, 'selected_cell', !0), b.push(g))
          }
        }
      }CKEDITOR.dom.element.clearAllMarkers(c); return b
    } function p (e, d) {
      for (var b = t(e), c = b[0], a = c.getAscendant('table'), c = c.getDocument(), f = b[0].getParent(), g = f.$.rowIndex, b = b[b.length - 1], h = b.getParent().$.rowIndex + b.$.rowSpan - 1, b = new CKEDITOR.dom.element(a.$.rows[h]), g = d ? g : h, f = d ? f : b, b = CKEDITOR.tools.buildTableMap(a), a = b[g], g = d ? b[g - 1] : b[g + 1], b = b[0].length, c = c.createElement('tr'),
        h = 0; a[h] && h < b; h++) { var k; a[h].rowSpan > 1 && g && a[h] == g[h] ? (k = a[h], k.rowSpan += 1) : (k = (new CKEDITOR.dom.element(a[h])).clone(), k.removeAttribute('rowSpan'), k.appendBogus(), c.append(k), k = k.$); h += k.colSpan - 1 }d ? c.insertBefore(f) : c.insertAfter(f)
    } function u (e) {
      if (e instanceof CKEDITOR.dom.selection) {
        var d = t(e); var b = d[0].getAscendant('table'); let c = CKEDITOR.tools.buildTableMap(b); e = d[0].getParent().$.rowIndex; for (var d = d[d.length - 1], a = d.getParent().$.rowIndex + d.$.rowSpan - 1, d = [], f = e; f <= a; f++) {
          for (var g = c[f], h = new CKEDITOR.dom.element(b.$.rows[f]),
            k = 0; k < g.length; k++) { const l = new CKEDITOR.dom.element(g[k]); let n = l.getParent().$.rowIndex; l.$.rowSpan == 1 ? l.remove() : (--l.$.rowSpan, n == f && (n = c[f + 1], n[k - 1] ? l.insertAfter(new CKEDITOR.dom.element(n[k - 1])) : (new CKEDITOR.dom.element(b.$.rows[f + 1])).append(l, 1))); k += l.$.colSpan - 1 }d.push(h)
        }c = b.$.rows; b = new CKEDITOR.dom.element(c[a + 1] || (e > 0 ? c[e - 1] : null) || b.$.parentNode); for (f = d.length; f >= 0; f--)u(d[f]); return b
      }e instanceof CKEDITOR.dom.element && (b = e.getAscendant('table'), b.$.rows.length == 1 ? b.remove() : e.remove())
      return null
    } function v (e, d) { for (var b = d ? Infinity : 0, c = 0; c < e.length; c++) { var a; a = e[c]; for (var f = d, g = a.getParent().$.cells, h = 0, k = 0; k < g.length; k++) { const l = g[k]; var h = h + (f ? 1 : l.colSpan); if (l == a.$) break }a = h - 1; if (d ? a < b : a > b)b = a } return b } function m (e, d) {
      for (var b = t(e), c = b[0].getAscendant('table'), a = v(b, 1), b = v(b), a = d ? a : b, f = CKEDITOR.tools.buildTableMap(c), c = [], b = [], g = f.length, h = 0; h < g; h++)c.push(f[h][a]), b.push(d ? f[h][a - 1] : f[h][a + 1]); for (h = 0; h < g; h++) {
        c[h] && (c[h].colSpan > 1 && b[h] == c[h]
          ? (a = c[h], a.colSpan += 1)
          : (a = (new CKEDITOR.dom.element(c[h])).clone(),
            a.removeAttribute('colSpan'), a.appendBogus(), a[d ? 'insertBefore' : 'insertAfter'].call(a, new CKEDITOR.dom.element(c[h])), a = a.$), h += a.rowSpan - 1)
      }
    } function y (e, d) { let b = e.getStartElement(); if (b = b.getAscendant('td', 1) || b.getAscendant('th', 1)) { const c = b.clone(); c.appendBogus(); d ? c.insertBefore(b) : c.insertAfter(b) } } function x (e) {
      if (e instanceof CKEDITOR.dom.selection) {
        e = t(e); var d = e[0] && e[0].getAscendant('table'); let b; a: {
          let c = 0; b = e.length - 1; for (var a = {}, f, g; f = e[c++];) {
            CKEDITOR.dom.element.setMarker(a, f, 'delete_cell',
              !0)
          } for (c = 0; f = e[c++];) if ((g = f.getPrevious()) && !g.getCustomData('delete_cell') || (g = f.getNext()) && !g.getCustomData('delete_cell')) { CKEDITOR.dom.element.clearAllMarkers(a); b = g; break a }CKEDITOR.dom.element.clearAllMarkers(a); g = e[0].getParent(); (g = g.getPrevious()) ? b = g.getLast() : (g = e[b].getParent(), b = (g = g.getNext()) ? g.getChild(0) : null)
        } for (g = e.length - 1; g >= 0; g--)x(e[g]); b ? q(b, !0) : d && d.remove()
      } else e instanceof CKEDITOR.dom.element && (d = e.getParent(), d.getChildCount() == 1 ? d.remove() : e.remove())
    } function q (e,
      d) { let b = e.getDocument(); const c = CKEDITOR.document; CKEDITOR.env.ie && CKEDITOR.env.version == 10 && (c.focus(), b.focus()); b = new CKEDITOR.dom.range(b); b['moveToElementEdit' + (d ? 'End' : 'Start')](e) || (b.selectNodeContents(e), b.collapse(d ? !1 : !0)); b.select(!0) } function z (e, d, b) { e = e[d]; if (typeof b === 'undefined') return e; for (d = 0; e && d < e.length; d++) { if (b.is && e[d] == b.$) return d; if (d == b) return new CKEDITOR.dom.element(e[d]) } return b.is ? -1 : null } function w (e, d, b) {
      let c = t(e); let a; if ((d ? c.length != 1 : c.length < 2) || (a = e.getCommonAncestor()) &&
a.type == CKEDITOR.NODE_ELEMENT && a.is('table')) return !1; let f; e = c[0]; a = e.getAscendant('table'); const g = CKEDITOR.tools.buildTableMap(a); const h = g.length; const k = g[0].length; const l = e.getParent().$.rowIndex; const n = z(g, l, e); if (d) { var r; try { var q = parseInt(e.getAttribute('rowspan'), 10) || 1; f = parseInt(e.getAttribute('colspan'), 10) || 1; r = g[d == 'up' ? l - q : d == 'down' ? l + q : l][d == 'left' ? n - f : d == 'right' ? n + f : n] } catch (D) { return !1 } if (!r || e.$ == r) return !1; c[d == 'up' || d == 'left' ? 'unshift' : 'push'](new CKEDITOR.dom.element(r)) }d = e.getDocument(); let p = l
      var q = r = 0; const u = !b && new CKEDITOR.dom.documentFragment(d); var w = 0; for (d = 0; d < c.length; d++) { f = c[d]; var m = f.getParent(); const x = f.getFirst(); let v = f.$.colSpan; let y = f.$.rowSpan; var m = m.$.rowIndex; const A = z(g, m, f); var w = w + v * y; var q = Math.max(q, A - n + v); r = Math.max(r, m - l + y); b || (v = f, (y = v.getBogus()) && y.remove(), v.trim(), f.getChildren().count() && (m == p || !x || x.isBlockBoundary && x.isBlockBoundary({ br: 1 }) || (p = u.getLast(CKEDITOR.dom.walker.whitespaces(!0)), !p || p.is && p.is('br') || u.append('br')), f.moveChildren(u)), d ? f.remove() : f.setHtml('')); p = m } if (b) {
        return r *
q == w
      } u.moveChildren(e); e.appendBogus(); q >= k ? e.removeAttribute('rowSpan') : e.$.rowSpan = r; r >= h ? e.removeAttribute('colSpan') : e.$.colSpan = q; b = new CKEDITOR.dom.nodeList(a.$.rows); c = b.count(); for (d = c - 1; d >= 0; d--)a = b.getItem(d), a.$.cells.length || (a.remove(), c++); return e
    } function A (e, d) {
      var b = t(e); if (b.length > 1) return !1; if (d) return !0; var b = b[0]; var c = b.getParent(); var a = c.getAscendant('table'); var f = CKEDITOR.tools.buildTableMap(a); var g = c.$.rowIndex; let h = z(f, g, b); var k = b.$.rowSpan; let l; if (k > 1) {
        l = Math.ceil(k / 2); for (var k = Math.floor(k /
2), c = g + l, a = new CKEDITOR.dom.element(a.$.rows[c]), f = z(f, c), n, c = b.clone(), g = 0; g < f.length; g++) if (n = f[g], n.parentNode == a.$ && g > h) { c.insertBefore(new CKEDITOR.dom.element(n)); break } else n = null; n || a.append(c)
      } else for (k = l = 1, a = c.clone(), a.insertAfter(c), a.append(c = b.clone()), n = z(f, g), h = 0; h < n.length; h++)n[h].rowSpan++; c.appendBogus(); b.$.rowSpan = l; c.$.rowSpan = k; l == 1 && b.removeAttribute('rowSpan'); k == 1 && c.removeAttribute('rowSpan'); return c
    } function B (e, d) {
      var b = t(e); if (b.length > 1) return !1; if (d) return !0; var b =
b[0]; let c = b.getParent(); var a = c.getAscendant('table'); var a = CKEDITOR.tools.buildTableMap(a); const f = z(a, c.$.rowIndex, b); var g = b.$.colSpan; if (g > 1)c = Math.ceil(g / 2), g = Math.floor(g / 2); else { for (var g = c = 1, h = [], k = 0; k < a.length; k++) { const l = a[k]; h.push(l[f]); l[f].rowSpan > 1 && (k += l[f].rowSpan - 1) } for (a = 0; a < h.length; a++)h[a].colSpan++ }a = b.clone(); a.insertAfter(b); a.appendBogus(); b.$.colSpan = c; a.$.colSpan = g; c == 1 && b.removeAttribute('colSpan'); g == 1 && a.removeAttribute('colSpan'); return a
    } var C = /^(?:td|th)$/; CKEDITOR.plugins.tabletools =
{
  requires: 'table,dialog,contextmenu',
  init: function (e) {
    function d (a) { return CKEDITOR.tools.extend(a || {}, { contextSensitive: 1, refresh: function (a, b) { this.setState(b.contains({ td: 1, th: 1 }, 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED) } }) } function b (a, b) { const c = e.addCommand(a, b); e.addFeature(c) } const c = e.lang.table; b('cellProperties', new CKEDITOR.dialogCommand('cellProperties', d({
      allowedContent: 'td th{width,height,border-color,background-color,white-space,vertical-align,text-align}[colspan,rowspan]',
      requiredContent: 'table',
      contentTransformations: [[{ element: 'td', left: function (a) { return a.styles.background && a.styles.background.match(/^(#[a-fA-F0-9]{3,6}|rgb\([\d, ]+\)|\w+)$/) }, right: function (a) { a.styles['background-color'] = a.styles.background } }]]
    }))); CKEDITOR.dialog.add('cellProperties', this.path + 'dialogs/tableCell.js'); b('rowDelete', d({ requiredContent: 'table', exec: function (a) { a = a.getSelection(); q(u(a)) } })); b('rowInsertBefore', d({
      requiredContent: 'table',
      exec: function (a) {
        a = a.getSelection(); p(a,
          !0)
      }
    })); b('rowInsertAfter', d({ requiredContent: 'table', exec: function (a) { a = a.getSelection(); p(a) } })); b('columnDelete', d({
      requiredContent: 'table',
      exec: function (a) {
        a = a.getSelection(); a = t(a); let b = a[0]; let c = a[a.length - 1]; a = b.getAscendant('table'); for (var d = CKEDITOR.tools.buildTableMap(a), e, l, n = [], r = 0, p = d.length; r < p; r++) for (var m = 0, u = d[r].length; m < u; m++)d[r][m] == b.$ && (e = m), d[r][m] == c.$ && (l = m); for (r = e; r <= l; r++) {
          for (m = 0; m < d.length; m++) {
            c = d[m], b = new CKEDITOR.dom.element(a.$.rows[m]), c = new CKEDITOR.dom.element(c[r]),
            c.$ && (c.$.colSpan == 1 ? c.remove() : --c.$.colSpan, m += c.$.rowSpan - 1, b.$.cells.length || n.push(b))
          }
        }l = a.$.rows[0] && a.$.rows[0].cells; e = new CKEDITOR.dom.element(l[e] || (e ? l[e - 1] : a.$.parentNode)); n.length == p && a.remove(); e && q(e, !0)
      }
    })); b('columnInsertBefore', d({ requiredContent: 'table', exec: function (a) { a = a.getSelection(); m(a, !0) } })); b('columnInsertAfter', d({ requiredContent: 'table', exec: function (a) { a = a.getSelection(); m(a) } })); b('cellDelete', d({ requiredContent: 'table', exec: function (a) { a = a.getSelection(); x(a) } }))
    b('cellMerge', d({ allowedContent: 'td[colspan,rowspan]', requiredContent: 'td[colspan,rowspan]', exec: function (a) { q(w(a.getSelection()), !0) } })); b('cellMergeRight', d({ allowedContent: 'td[colspan]', requiredContent: 'td[colspan]', exec: function (a) { q(w(a.getSelection(), 'right'), !0) } })); b('cellMergeDown', d({ allowedContent: 'td[rowspan]', requiredContent: 'td[rowspan]', exec: function (a) { q(w(a.getSelection(), 'down'), !0) } })); b('cellVerticalSplit', d({ allowedContent: 'td[rowspan]', requiredContent: 'td[rowspan]', exec: function (a) { q(B(a.getSelection())) } }))
    b('cellHorizontalSplit', d({ allowedContent: 'td[colspan]', requiredContent: 'td[colspan]', exec: function (a) { q(A(a.getSelection())) } })); b('cellInsertBefore', d({ requiredContent: 'table', exec: function (a) { a = a.getSelection(); y(a, !0) } })); b('cellInsertAfter', d({ requiredContent: 'table', exec: function (a) { a = a.getSelection(); y(a) } })); e.addMenuItems && e.addMenuItems({
      tablecell: {
        label: c.cell.menu,
        group: 'tablecell',
        order: 1,
        getItems: function () {
          const a = e.getSelection(); const b = t(a); return {
            tablecell_insertBefore: CKEDITOR.TRISTATE_OFF,
            tablecell_insertAfter: CKEDITOR.TRISTATE_OFF,
            tablecell_delete: CKEDITOR.TRISTATE_OFF,
            tablecell_merge: w(a, null, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
            tablecell_merge_right: w(a, 'right', !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
            tablecell_merge_down: w(a, 'down', !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
            tablecell_split_vertical: B(a, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
            tablecell_split_horizontal: A(a, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
            tablecell_properties: b.length >
0
              ? CKEDITOR.TRISTATE_OFF
              : CKEDITOR.TRISTATE_DISABLED
          }
        }
      },
      tablecell_insertBefore: { label: c.cell.insertBefore, group: 'tablecell', command: 'cellInsertBefore', order: 5 },
      tablecell_insertAfter: { label: c.cell.insertAfter, group: 'tablecell', command: 'cellInsertAfter', order: 10 },
      tablecell_delete: { label: c.cell.deleteCell, group: 'tablecell', command: 'cellDelete', order: 15 },
      tablecell_merge: { label: c.cell.merge, group: 'tablecell', command: 'cellMerge', order: 16 },
      tablecell_merge_right: {
        label: c.cell.mergeRight,
        group: 'tablecell',
        command: 'cellMergeRight',
        order: 17
      },
      tablecell_merge_down: { label: c.cell.mergeDown, group: 'tablecell', command: 'cellMergeDown', order: 18 },
      tablecell_split_horizontal: { label: c.cell.splitHorizontal, group: 'tablecell', command: 'cellHorizontalSplit', order: 19 },
      tablecell_split_vertical: { label: c.cell.splitVertical, group: 'tablecell', command: 'cellVerticalSplit', order: 20 },
      tablecell_properties: { label: c.cell.title, group: 'tablecellproperties', command: 'cellProperties', order: 21 },
      tablerow: {
        label: c.row.menu,
        group: 'tablerow',
        order: 1,
        getItems: function () { return { tablerow_insertBefore: CKEDITOR.TRISTATE_OFF, tablerow_insertAfter: CKEDITOR.TRISTATE_OFF, tablerow_delete: CKEDITOR.TRISTATE_OFF } }
      },
      tablerow_insertBefore: { label: c.row.insertBefore, group: 'tablerow', command: 'rowInsertBefore', order: 5 },
      tablerow_insertAfter: { label: c.row.insertAfter, group: 'tablerow', command: 'rowInsertAfter', order: 10 },
      tablerow_delete: { label: c.row.deleteRow, group: 'tablerow', command: 'rowDelete', order: 15 },
      tablecolumn: {
        label: c.column.menu,
        group: 'tablecolumn',
        order: 1,
        getItems: function () { return { tablecolumn_insertBefore: CKEDITOR.TRISTATE_OFF, tablecolumn_insertAfter: CKEDITOR.TRISTATE_OFF, tablecolumn_delete: CKEDITOR.TRISTATE_OFF } }
      },
      tablecolumn_insertBefore: { label: c.column.insertBefore, group: 'tablecolumn', command: 'columnInsertBefore', order: 5 },
      tablecolumn_insertAfter: { label: c.column.insertAfter, group: 'tablecolumn', command: 'columnInsertAfter', order: 10 },
      tablecolumn_delete: { label: c.column.deleteColumn, group: 'tablecolumn', command: 'columnDelete', order: 15 }
    }); e.contextMenu &&
e.contextMenu.addListener(function (a, b, c) { return (a = c.contains({ td: 1, th: 1 }, 1)) && !a.isReadOnly() ? { tablecell: CKEDITOR.TRISTATE_OFF, tablerow: CKEDITOR.TRISTATE_OFF, tablecolumn: CKEDITOR.TRISTATE_OFF } : null })
  },
  getSelectedCells: t
}; CKEDITOR.plugins.add('tabletools', CKEDITOR.plugins.tabletools)
  })()
  CKEDITOR.tools.buildTableMap = function (t) { t = t.$.rows; for (var p = -1, u = [], v = 0; v < t.length; v++) { p++; !u[p] && (u[p] = []); for (let m = -1, y = 0; y < t[v].cells.length; y++) { var x = t[v].cells[y]; for (m++; u[p][m];)m++; for (var q = isNaN(x.colSpan) ? 1 : x.colSpan, x = isNaN(x.rowSpan) ? 1 : x.rowSpan, z = 0; z < x; z++) { u[p + z] || (u[p + z] = []); for (let w = 0; w < q; w++)u[p + z][m + w] = t[v].cells[y] }m += q - 1 } } return u }; (function () {
    const g = [CKEDITOR.CTRL + 90, CKEDITOR.CTRL + 89, CKEDITOR.CTRL + CKEDITOR.SHIFT + 90]; const n = { 8: 1, 46: 1 }; CKEDITOR.plugins.add('undo', {
      init: function (a) {
        function b (a) { d.enabled && !1 !== a.data.command.canUndo && d.save() } function c () { d.enabled = a.readOnly ? !1 : a.mode == 'wysiwyg'; d.onChange() } var d = a.undoManager = new e(a); const l = d.editingHandler = new k(d); const f = a.addCommand('undo', { exec: function () { d.undo() && (a.selectionChange(), this.fire('afterUndo')) }, startDisabled: !0, canUndo: !1 }); const h = a.addCommand('redo', {
          exec: function () {
            d.redo() &&
(a.selectionChange(), this.fire('afterRedo'))
          },
          startDisabled: !0,
          canUndo: !1
        }); a.setKeystroke([[g[0], 'undo'], [g[1], 'redo'], [g[2], 'redo']]); d.onChange = function () { f.setState(d.undoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED); h.setState(d.redoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED) }; a.on('beforeCommandExec', b); a.on('afterCommandExec', b); a.on('saveSnapshot', function (a) { d.save(a.data && a.data.contentOnly) }); a.on('contentDom', l.attachListeners, l); a.on('instanceReady', function () { a.fire('saveSnapshot') })
        a.on('beforeModeUnload', function () { a.mode == 'wysiwyg' && d.save(!0) }); a.on('mode', c); a.on('readOnly', c); a.ui.addButton && (a.ui.addButton('Undo', { label: a.lang.undo.undo, command: 'undo', toolbar: 'undo,10' }), a.ui.addButton('Redo', { label: a.lang.undo.redo, command: 'redo', toolbar: 'undo,20' })); a.resetUndo = function () { d.reset(); a.fire('saveSnapshot') }; a.on('updateSnapshot', function () { d.currentImage && d.update() }); a.on('lockSnapshot', function (a) { a = a.data; d.lock(a && a.dontUpdate, a && a.forceUpdate) }); a.on('unlockSnapshot',
          d.unlock, d)
      }
    }); CKEDITOR.plugins.undo = {}; var e = CKEDITOR.plugins.undo.UndoManager = function (a) { this.strokesRecorded = [0, 0]; this.locked = null; this.previousKeyGroup = -1; this.limit = a.config.undoStackSize || 20; this.strokesLimit = 25; this.editor = a; this.reset() }; e.prototype = {
      type: function (a, b) {
        const c = e.getKeyGroup(a); let d = this.strokesRecorded[c] + 1; b = b || d >= this.strokesLimit; this.typing || (this.hasUndo = this.typing = !0, this.hasRedo = !1, this.onChange()); b ? (d = 0, this.editor.fire('saveSnapshot')) : this.editor.fire('change'); this.strokesRecorded[c] =
d; this.previousKeyGroup = c
      },
      keyGroupChanged: function (a) { return e.getKeyGroup(a) != this.previousKeyGroup },
      reset: function () { this.snapshots = []; this.index = -1; this.currentImage = null; this.hasRedo = this.hasUndo = !1; this.locked = null; this.resetType() },
      resetType: function () { this.strokesRecorded = [0, 0]; this.typing = !1; this.previousKeyGroup = -1 },
      refreshState: function () { this.hasUndo = !!this.getNextImage(!0); this.hasRedo = !!this.getNextImage(!1); this.resetType(); this.onChange() },
      save: function (a, b, c) {
        const d = this.editor; if (this.locked ||
d.status != 'ready' || d.mode != 'wysiwyg') return !1; let e = d.editable(); if (!e || e.status != 'ready') return !1; e = this.snapshots; b || (b = new f(d)); if (!1 === b.contents) return !1; if (this.currentImage) if (b.equalsContent(this.currentImage)) { if (a || b.equalsSelection(this.currentImage)) return !1 } else !1 !== c && d.fire('change'); e.splice(this.index + 1, e.length - this.index - 1); e.length == this.limit && e.shift(); this.index = e.push(b) - 1; this.currentImage = b; !1 !== c && this.refreshState(); return !0
      },
      restoreImage: function (a) {
        const b = this.editor
        let c; a.bookmarks && (b.focus(), c = b.getSelection()); this.locked = { level: 999 }; this.editor.loadSnapshot(a.contents); a.bookmarks ? c.selectBookmarks(a.bookmarks) : CKEDITOR.env.ie && (c = this.editor.document.getBody().$.createTextRange(), c.collapse(!0), c.select()); this.locked = null; this.index = a.index; this.currentImage = this.snapshots[this.index]; this.update(); this.refreshState(); b.fire('change')
      },
      getNextImage: function (a) {
        const b = this.snapshots; const c = this.currentImage; let d; if (c) {
          if (a) {
            for (d = this.index - 1; d >= 0; d--) {
              if (a = b[d], !c.equalsContent(a)) {
                return a.index =
d, a
              }
            }
          } else for (d = this.index + 1; d < b.length; d++) if (a = b[d], !c.equalsContent(a)) return a.index = d, a
        } return null
      },
      redoable: function () { return this.enabled && this.hasRedo },
      undoable: function () { return this.enabled && this.hasUndo },
      undo: function () { if (this.undoable()) { this.save(!0); const a = this.getNextImage(!0); if (a) return this.restoreImage(a), !0 } return !1 },
      redo: function () { if (this.redoable() && (this.save(!0), this.redoable())) { const a = this.getNextImage(!1); if (a) return this.restoreImage(a), !0 } return !1 },
      update: function (a) {
        if (!this.locked) {
          a ||
(a = new f(this.editor)); for (var b = this.index, c = this.snapshots; b > 0 && this.currentImage.equalsContent(c[b - 1]);)--b; c.splice(b, this.index - b + 1, a); this.index = b; this.currentImage = a
        }
      },
      updateSelection: function (a) { if (!this.snapshots.length) return !1; const b = this.snapshots; const c = b[b.length - 1]; return c.equalsContent(a) && !c.equalsSelection(a) ? (this.currentImage = b[b.length - 1] = a, !0) : !1 },
      lock: function (a, b) {
        if (this.locked) this.locked.level++; else if (a) this.locked = { level: 1 }; else {
          let c = null; if (b)c = !0; else {
            const d = new f(this.editor,
              !0); this.currentImage && this.currentImage.equalsContent(d) && (c = d)
          } this.locked = { update: c, level: 1 }
        }
      },
      unlock: function () { if (this.locked && !--this.locked.level) { const a = this.locked.update; this.locked = null; if (!0 === a) this.update(); else if (a) { const b = new f(this.editor, !0); a.equalsContent(b) || this.update() } } }
    }; e.navigationKeyCodes = { 37: 1, 38: 1, 39: 1, 40: 1, 36: 1, 35: 1, 33: 1, 34: 1 }; e.keyGroups = { PRINTABLE: 0, FUNCTIONAL: 1 }; e.isNavigationKey = function (a) { return !!e.navigationKeyCodes[a] }; e.getKeyGroup = function (a) {
      const b = e.keyGroups
      return n[a] ? b.FUNCTIONAL : b.PRINTABLE
    }; e.getOppositeKeyGroup = function (a) { const b = e.keyGroups; return a == b.FUNCTIONAL ? b.PRINTABLE : b.FUNCTIONAL }; e.ieFunctionalKeysBug = function (a) { return CKEDITOR.env.ie && e.getKeyGroup(a) == e.keyGroups.FUNCTIONAL }; var f = CKEDITOR.plugins.undo.Image = function (a, b) { this.editor = a; a.fire('beforeUndoImage'); let c = a.getSnapshot(); CKEDITOR.env.ie && c && (c = c.replace(/\s+data-cke-expando=".*?"/g, '')); this.contents = c; b || (this.bookmarks = (c = c && a.getSelection()) && c.createBookmarks2(!0)); a.fire('afterUndoImage') }
    const h = /\b(?:href|src|name)="[^"]*?"/gi; f.prototype = {
      equalsContent: function (a) { let b = this.contents; a = a.contents; CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) && (b = b.replace(h, ''), a = a.replace(h, '')); return b != a ? !1 : !0 },
      equalsSelection: function (a) {
        const b = this.bookmarks; a = a.bookmarks; if (b || a) {
          if (!b || !a || b.length != a.length) return !1; for (let c = 0; c < b.length; c++) {
            const d = b[c]; const e = a[c]; if (d.startOffset != e.startOffset || d.endOffset != e.endOffset || !CKEDITOR.tools.arrayCompare(d.start, e.start) || !CKEDITOR.tools.arrayCompare(d.end,
              e.end)) return !1
          }
        } return !0
      }
    }; var k = CKEDITOR.plugins.undo.NativeEditingHandler = function (a) { this.undoManager = a; this.ignoreInputEvent = !1; this.keyEventsStack = new m(); this.lastKeydownImage = null }; k.prototype = {
      onKeydown: function (a) {
        const b = a.data.getKey(); if (b !== 229) {
          if (CKEDITOR.tools.indexOf(g, a.data.getKeystroke()) > -1)a.data.preventDefault(); else if (this.keyEventsStack.cleanUp(a), a = this.undoManager, this.keyEventsStack.getLast(b) || this.keyEventsStack.push(b), this.lastKeydownImage = new f(a.editor), e.isNavigationKey(b) ||
this.undoManager.keyGroupChanged(b)) if (a.strokesRecorded[0] || a.strokesRecorded[1])a.save(!1, this.lastKeydownImage, !1), a.resetType()
        }
      },
      onInput: function () { if (this.ignoreInputEvent) this.ignoreInputEvent = !1; else { let a = this.keyEventsStack.getLast(); a || (a = this.keyEventsStack.push(0)); this.keyEventsStack.increment(a.keyCode); this.keyEventsStack.getTotalInputs() >= this.undoManager.strokesLimit && (this.undoManager.type(a.keyCode, !0), this.keyEventsStack.resetInputs()) } },
      onKeyup: function (a) {
        const b = this.undoManager
        a = a.data.getKey(); const c = this.keyEventsStack.getTotalInputs(); this.keyEventsStack.remove(a); if (!(e.ieFunctionalKeysBug(a) && this.lastKeydownImage && this.lastKeydownImage.equalsContent(new f(b.editor, !0)))) if (c > 0)b.type(a); else if (e.isNavigationKey(a)) this.onNavigationKey(!0)
      },
      onNavigationKey: function (a) { const b = this.undoManager; !a && b.save(!0, null, !1) || b.updateSelection(new f(b.editor)); b.resetType() },
      ignoreInputEventListener: function () { this.ignoreInputEvent = !0 },
      attachListeners: function () {
        const a = this.undoManager.editor
        const b = a.editable(); const c = this; b.attachListener(b, 'keydown', function (a) { c.onKeydown(a); if (e.ieFunctionalKeysBug(a.data.getKey()))c.onInput() }, null, null, 999); b.attachListener(b, CKEDITOR.env.ie ? 'keypress' : 'input', c.onInput, c, null, 999); b.attachListener(b, 'keyup', c.onKeyup, c, null, 999); b.attachListener(b, 'paste', c.ignoreInputEventListener, c, null, 999); b.attachListener(b, 'drop', c.ignoreInputEventListener, c, null, 999); b.attachListener(b.isInline() ? b : a.document.getDocumentElement(), 'click', function () { c.onNavigationKey() },
          null, null, 999); b.attachListener(this.undoManager.editor, 'blur', function () { c.keyEventsStack.remove(9) }, null, null, 999)
      }
    }; var m = CKEDITOR.plugins.undo.KeyEventsStack = function () { this.stack = [] }; m.prototype = {
      push: function (a) { a = this.stack.push({ keyCode: a, inputs: 0 }); return this.stack[a - 1] },
      getLastIndex: function (a) { if (typeof a !== 'number') return this.stack.length - 1; for (let b = this.stack.length; b--;) if (this.stack[b].keyCode == a) return b; return -1 },
      getLast: function (a) {
        a = this.getLastIndex(a); return a != -1
          ? this.stack[a]
          : null
      },
      increment: function (a) { this.getLast(a).inputs++ },
      remove: function (a) { a = this.getLastIndex(a); a != -1 && this.stack.splice(a, 1) },
      resetInputs: function (a) { if (typeof a === 'number') this.getLast(a).inputs = 0; else for (a = this.stack.length; a--;) this.stack[a].inputs = 0 },
      getTotalInputs: function () { for (var a = this.stack.length, b = 0; a--;)b += this.stack[a].inputs; return b },
      cleanUp: function (a) { a = a.data.$; a.ctrlKey || a.metaKey || this.remove(17); a.shiftKey || this.remove(16); a.altKey || this.remove(18) }
    }
  })(); CKEDITOR.plugins.add('wsc', {
    requires: 'dialog',
    parseApi: function (a) { a.config.wsc_onFinish = typeof a.config.wsc_onFinish === 'function' ? a.config.wsc_onFinish : function () {}; a.config.wsc_onClose = typeof a.config.wsc_onClose === 'function' ? a.config.wsc_onClose : function () {} },
    parseConfig: function (a) {
      a.config.wsc_customerId = a.config.wsc_customerId || CKEDITOR.config.wsc_customerId || '1:ua3xw1-2XyGJ3-GWruD3-6OFNT1-oXcuB1-nR6Bp4-hgQHc-EcYng3-sdRXG3-NOfFk'; a.config.wsc_customDictionaryIds = a.config.wsc_customDictionaryIds ||
CKEDITOR.config.wsc_customDictionaryIds || ''; a.config.wsc_userDictionaryName = a.config.wsc_userDictionaryName || CKEDITOR.config.wsc_userDictionaryName || ''; a.config.wsc_customLoaderScript = a.config.wsc_customLoaderScript || CKEDITOR.config.wsc_customLoaderScript; a.config.wsc_interfaceLang = a.config.wsc_interfaceLang; CKEDITOR.config.wsc_cmd = a.config.wsc_cmd || CKEDITOR.config.wsc_cmd || 'spell'; CKEDITOR.config.wsc_version = 'v4.3.0-master-d769233'; CKEDITOR.config.wsc_removeGlobalVariable = !0
    },
    onLoad: function (a) {
      (CKEDITOR.skinName || a.config.skin) ==
'moono-lisa' && CKEDITOR.document.appendStyleSheet(this.path + 'skins/' + CKEDITOR.skin.name + '/wsc.css')
    },
    init: function (a) {
      const b = CKEDITOR.env; this.parseConfig(a); this.parseApi(a); a.addCommand('checkspell', new CKEDITOR.dialogCommand('checkspell')).modes = { wysiwyg: !CKEDITOR.env.opera && !CKEDITOR.env.air && document.domain == window.location.hostname && !(b.ie && (b.version < 8 || b.quirks)) }; typeof a.plugins.scayt === 'undefined' && a.ui.addButton && a.ui.addButton('SpellChecker', {
        label: a.lang.wsc.toolbar,
        click: function (a) { let b = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.container.getText() : a.document.getBody().getText(); (b = b.replace(/\s/g, '')) ? a.execCommand('checkspell') : alert('Nothing to check!') },
        toolbar: 'spellchecker,10'
      }); CKEDITOR.dialog.add('checkspell', this.path + (CKEDITOR.env.ie && CKEDITOR.env.version <= 7 ? 'dialogs/wsc_ie.js' : window.postMessage ? 'dialogs/wsc.js' : 'dialogs/wsc_ie.js'))
    }
  }); CKEDITOR.config.plugins = 'dialogui,dialog,about,a11yhelp,dialogadvtab,basicstyles,bidi,blockquote,clipboard,button,panelbutton,panel,floatpanel,colorbutton,colordialog,templates,menu,contextmenu,copyformatting,div,resize,toolbar,elementspath,enterkey,entities,popup,filebrowser,find,fakeobjects,flash,floatingspace,listblock,richcombo,font,forms,format,horizontalrule,htmlwriter,iframe,wysiwygarea,image,indent,indentblock,indentlist,smiley,justify,menubutton,language,link,list,liststyle,magicline,maximize,newpage,pagebreak,pastetext,pastefromword,preview,print,removeformat,save,selectall,showblocks,showborders,sourcearea,specialchar,scayt,stylescombo,tab,table,tabletools,undo,wsc'; CKEDITOR.config.skin = 'moono-lisa'; (function () { const setIcons = function (icons, strip) { const path = CKEDITOR.getUrl('plugins/' + strip); icons = icons.split(','); for (let i = 0; i < icons.length; i++)CKEDITOR.skin.icons[icons[i]] = { path, offset: -icons[++i], bgsize: icons[++i] } }; if (CKEDITOR.env.hidpi) setIcons('about,0,,bold,24,,italic,48,,strike,72,,subscript,96,,superscript,120,,underline,144,,bidiltr,168,,bidirtl,192,,blockquote,216,,copy-rtl,240,,copy,264,,cut-rtl,288,,cut,312,,paste-rtl,336,,paste,360,,bgcolor,384,,textcolor,408,,templates-rtl,432,,templates,456,,copyformatting,480,,creatediv,504,,find-rtl,528,,find,552,,replace,576,,flash,600,,button,624,,checkbox,648,,form,672,,hiddenfield,696,,imagebutton,720,,radio,744,,select-rtl,768,,select,792,,textarea-rtl,816,,textarea,840,,textfield-rtl,864,,textfield,888,,horizontalrule,912,,iframe,936,,image,960,,indent-rtl,984,,indent,1008,,outdent-rtl,1032,,outdent,1056,,smiley,1080,,justifyblock,1104,,justifycenter,1128,,justifyleft,1152,,justifyright,1176,,language,1200,,anchor-rtl,1224,,anchor,1248,,link,1272,,unlink,1296,,bulletedlist-rtl,1320,,bulletedlist,1344,,numberedlist-rtl,1368,,numberedlist,1392,,maximize,1416,,newpage-rtl,1440,,newpage,1464,,pagebreak-rtl,1488,,pagebreak,1512,,pastetext-rtl,1536,,pastetext,1560,,pastefromword-rtl,1584,,pastefromword,1608,,preview-rtl,1632,,preview,1656,,print,1680,,removeformat,1704,,save,1728,,selectall,1752,,showblocks-rtl,1776,,showblocks,1800,,source-rtl,1824,,source,1848,,specialchar,1872,,scayt,1896,,table,1920,,redo-rtl,1944,,redo,1968,,undo-rtl,1992,,undo,2016,,spellchecker,2040,', 'icons_hidpi.png'); else setIcons('about,0,auto,bold,24,auto,italic,48,auto,strike,72,auto,subscript,96,auto,superscript,120,auto,underline,144,auto,bidiltr,168,auto,bidirtl,192,auto,blockquote,216,auto,copy-rtl,240,auto,copy,264,auto,cut-rtl,288,auto,cut,312,auto,paste-rtl,336,auto,paste,360,auto,bgcolor,384,auto,textcolor,408,auto,templates-rtl,432,auto,templates,456,auto,copyformatting,480,auto,creatediv,504,auto,find-rtl,528,auto,find,552,auto,replace,576,auto,flash,600,auto,button,624,auto,checkbox,648,auto,form,672,auto,hiddenfield,696,auto,imagebutton,720,auto,radio,744,auto,select-rtl,768,auto,select,792,auto,textarea-rtl,816,auto,textarea,840,auto,textfield-rtl,864,auto,textfield,888,auto,horizontalrule,912,auto,iframe,936,auto,image,960,auto,indent-rtl,984,auto,indent,1008,auto,outdent-rtl,1032,auto,outdent,1056,auto,smiley,1080,auto,justifyblock,1104,auto,justifycenter,1128,auto,justifyleft,1152,auto,justifyright,1176,auto,language,1200,auto,anchor-rtl,1224,auto,anchor,1248,auto,link,1272,auto,unlink,1296,auto,bulletedlist-rtl,1320,auto,bulletedlist,1344,auto,numberedlist-rtl,1368,auto,numberedlist,1392,auto,maximize,1416,auto,newpage-rtl,1440,auto,newpage,1464,auto,pagebreak-rtl,1488,auto,pagebreak,1512,auto,pastetext-rtl,1536,auto,pastetext,1560,auto,pastefromword-rtl,1584,auto,pastefromword,1608,auto,preview-rtl,1632,auto,preview,1656,auto,print,1680,auto,removeformat,1704,auto,save,1728,auto,selectall,1752,auto,showblocks-rtl,1776,auto,showblocks,1800,auto,source-rtl,1824,auto,source,1848,auto,specialchar,1872,auto,scayt,1896,auto,table,1920,auto,redo-rtl,1944,auto,redo,1968,auto,undo-rtl,1992,auto,undo,2016,auto,spellchecker,2040,auto', 'icons.png') })(); CKEDITOR.lang.languages = { af: 1, sq: 1, ar: 1, eu: 1, bn: 1, bs: 1, bg: 1, ca: 1, 'zh-cn': 1, zh: 1, hr: 1, cs: 1, da: 1, nl: 1, en: 1, 'en-au': 1, 'en-ca': 1, 'en-gb': 1, eo: 1, et: 1, fo: 1, fi: 1, fr: 1, 'fr-ca': 1, gl: 1, ka: 1, de: 1, 'de-ch': 1, el: 1, gu: 1, he: 1, hi: 1, hu: 1, is: 1, id: 1, it: 1, ja: 1, km: 1, ko: 1, ku: 1, lv: 1, lt: 1, mk: 1, ms: 1, mn: 1, no: 1, nb: 1, oc: 1, fa: 1, pl: 1, 'pt-br': 1, pt: 1, ro: 1, ru: 1, sr: 1, 'sr-latn': 1, si: 1, sk: 1, sl: 1, es: 1, sv: 1, tt: 1, th: 1, tr: 1, ug: 1, uk: 1, vi: 1, cy: 1 }
}())
