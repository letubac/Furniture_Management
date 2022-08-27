/*
 Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
(function () {
  CKEDITOR.dialog.add('link', function (e) {
    const m = CKEDITOR.plugins.link; let p; const q = function () { var a = this.getDialog(); let b = a.getContentElement('target', 'popupFeatures'); var a = a.getContentElement('target', 'linkTargetName'); const n = this.getValue(); if (b && a) switch (b = b.getElement(), b.hide(), a.setValue(''), n) { case 'frame':a.setLabel(e.lang.link.targetFrameName); a.getElement().show(); break; case 'popup':b.show(); a.setLabel(e.lang.link.targetPopupName); a.getElement().show(); break; default:a.setValue(n), a.getElement().hide() } }
    const h = function (a) { a.target && this.setValue(a.target[this.id] || '') }; const f = function (a) { a.advanced && this.setValue(a.advanced[this.id] || '') }; const k = function (a) { a.target || (a.target = {}); a.target[this.id] = this.getValue() || '' }; const l = function (a) { a.advanced || (a.advanced = {}); a.advanced[this.id] = this.getValue() || '' }; const c = e.lang.common; const b = e.lang.link; let g; return {
      title: b.title,
      minWidth: (CKEDITOR.skinName || e.config.skin) == 'moono-lisa' ? 450 : 350,
      minHeight: 240,
      contents: [{
        id: 'info',
        label: b.info,
        title: b.info,
        elements: [{
          type: 'text',
          id: 'linkDisplayText',
          label: b.displayText,
          setup: function () { this.enable(); this.setValue(e.getSelection().getSelectedText()); p = this.getValue() },
          commit: function (a) { a.linkText = this.isEnabled() ? this.getValue() : '' }
        }, {
          id: 'linkType',
          type: 'select',
          label: b.type,
          default: 'url',
          items: [[b.toUrl, 'url'], [b.toAnchor, 'anchor'], [b.toEmail, 'email']],
          onChange: function () {
            const a = this.getDialog(); const b = ['urlOptions', 'anchorOptions', 'emailOptions']; const n = this.getValue(); var d = a.definition.getContents('upload'); var d = d && d.hidden; n == 'url'
              ? (e.config.linkShowTargetTab &&
a.showPage('target'), d || a.showPage('upload'))
              : (a.hidePage('target'), d || a.hidePage('upload')); for (d = 0; d < b.length; d++) { let c = a.getContentElement('info', b[d]); c && (c = c.getElement().getParent().getParent(), b[d] == n + 'Options' ? c.show() : c.hide()) }a.layout()
          },
          setup: function (a) { this.setValue(a.type || 'url') },
          commit: function (a) { a.type = this.getValue() }
        }, {
          type: 'vbox',
          id: 'urlOptions',
          children: [{
            type: 'hbox',
            widths: ['25%', '75%'],
            children: [{
              id: 'protocol',
              type: 'select',
              label: c.protocol,
              default: 'http://',
              items: [['http://‎',
                'http://'], ['https://‎', 'https://'], ['ftp://‎', 'ftp://'], ['news://‎', 'news://'], [b.other, '']],
              setup: function (a) { a.url && this.setValue(a.url.protocol || '') },
              commit: function (a) { a.url || (a.url = {}); a.url.protocol = this.getValue() }
            }, {
              type: 'text',
              id: 'url',
              label: c.url,
              required: !0,
              onLoad: function () { this.allowOnChange = !0 },
              onKeyUp: function () {
                this.allowOnChange = !1; const a = this.getDialog().getContentElement('info', 'protocol'); const b = this.getValue(); const c = /^((javascript:)|[#\/\.\?])/i; const d = /^(http|https|ftp|news):\/\/(?=.)/i.exec(b)
                d ? (this.setValue(b.substr(d[0].length)), a.setValue(d[0].toLowerCase())) : c.test(b) && a.setValue(''); this.allowOnChange = !0
              },
              onChange: function () { if (this.allowOnChange) this.onKeyUp() },
              validate: function () { const a = this.getDialog(); return a.getContentElement('info', 'linkType') && a.getValueOf('info', 'linkType') != 'url' ? !0 : !e.config.linkJavaScriptLinksAllowed && /javascript\:/.test(this.getValue()) ? (alert(c.invalidValue), !1) : this.getDialog().fakeObj ? !0 : CKEDITOR.dialog.validate.notEmpty(b.noUrl).apply(this) },
              setup: function (a) {
                this.allowOnChange =
!1; a.url && this.setValue(a.url.url); this.allowOnChange = !0
              },
              commit: function (a) { this.onChange(); a.url || (a.url = {}); a.url.url = this.getValue(); this.allowOnChange = !1 }
            }],
            setup: function () { this.getDialog().getContentElement('info', 'linkType') || this.getElement().show() }
          }, { type: 'button', id: 'browse', hidden: 'true', filebrowser: 'info:url', label: c.browseServer }]
        }, {
          type: 'vbox',
          id: 'anchorOptions',
          width: 260,
          align: 'center',
          padding: 0,
          children: [{
            type: 'fieldset',
            id: 'selectAnchorText',
            label: b.selectAnchor,
            setup: function () {
              g =
m.getEditorAnchors(e); this.getElement()[g && g.length ? 'show' : 'hide']()
            },
            children: [{
              type: 'hbox',
              id: 'selectAnchor',
              children: [{
                type: 'select',
                id: 'anchorName',
                default: '',
                label: b.anchorName,
                style: 'width: 100%;',
                items: [['']],
                setup: function (a) { this.clear(); this.add(''); if (g) for (let b = 0; b < g.length; b++)g[b].name && this.add(g[b].name); a.anchor && this.setValue(a.anchor.name); (a = this.getDialog().getContentElement('info', 'linkType')) && a.getValue() == 'email' && this.focus() },
                commit: function (a) {
                  a.anchor || (a.anchor = {})
                  a.anchor.name = this.getValue()
                }
              }, { type: 'select', id: 'anchorId', default: '', label: b.anchorId, style: 'width: 100%;', items: [['']], setup: function (a) { this.clear(); this.add(''); if (g) for (let b = 0; b < g.length; b++)g[b].id && this.add(g[b].id); a.anchor && this.setValue(a.anchor.id) }, commit: function (a) { a.anchor || (a.anchor = {}); a.anchor.id = this.getValue() } }],
              setup: function () { this.getElement()[g && g.length ? 'show' : 'hide']() }
            }]
          }, {
            type: 'html',
            id: 'noAnchors',
            style: 'text-align: center;',
            html: '\x3cdiv role\x3d"note" tabIndex\x3d"-1"\x3e' +
CKEDITOR.tools.htmlEncode(b.noAnchors) + '\x3c/div\x3e',
            focus: !0,
            setup: function () { this.getElement()[g && g.length ? 'hide' : 'show']() }
          }],
          setup: function () { this.getDialog().getContentElement('info', 'linkType') || this.getElement().hide() }
        }, {
          type: 'vbox',
          id: 'emailOptions',
          padding: 1,
          children: [{
            type: 'text',
            id: 'emailAddress',
            label: b.emailAddress,
            required: !0,
            validate: function () {
              const a = this.getDialog(); return a.getContentElement('info', 'linkType') && a.getValueOf('info', 'linkType') == 'email'
                ? CKEDITOR.dialog.validate.notEmpty(b.noEmail).apply(this)
                : !0
            },
            setup: function (a) { a.email && this.setValue(a.email.address); (a = this.getDialog().getContentElement('info', 'linkType')) && a.getValue() == 'email' && this.select() },
            commit: function (a) { a.email || (a.email = {}); a.email.address = this.getValue() }
          }, { type: 'text', id: 'emailSubject', label: b.emailSubject, setup: function (a) { a.email && this.setValue(a.email.subject) }, commit: function (a) { a.email || (a.email = {}); a.email.subject = this.getValue() } }, {
            type: 'textarea',
            id: 'emailBody',
            label: b.emailBody,
            rows: 3,
            default: '',
            setup: function (a) {
              a.email &&
this.setValue(a.email.body)
            },
            commit: function (a) { a.email || (a.email = {}); a.email.body = this.getValue() }
          }],
          setup: function () { this.getDialog().getContentElement('info', 'linkType') || this.getElement().hide() }
        }]
      }, {
        id: 'target',
        requiredContent: 'a[target]',
        label: b.target,
        title: b.target,
        elements: [{
          type: 'hbox',
          widths: ['50%', '50%'],
          children: [{
            type: 'select',
            id: 'linkTargetType',
            label: c.target,
            default: 'notSet',
            style: 'width : 100%;',
            items: [[c.notSet, 'notSet'], [b.targetFrame, 'frame'], [b.targetPopup, 'popup'], [c.targetNew,
              '_blank'], [c.targetTop, '_top'], [c.targetSelf, '_self'], [c.targetParent, '_parent']],
            onChange: q,
            setup: function (a) { a.target && this.setValue(a.target.type || 'notSet'); q.call(this) },
            commit: function (a) { a.target || (a.target = {}); a.target.type = this.getValue() }
          }, { type: 'text', id: 'linkTargetName', label: b.targetFrameName, default: '', setup: function (a) { a.target && this.setValue(a.target.name) }, commit: function (a) { a.target || (a.target = {}); a.target.name = this.getValue().replace(/([^\x00-\x7F]|\s)/gi, '') } }]
        }, {
          type: 'vbox',
          width: '100%',
          align: 'center',
          padding: 2,
          id: 'popupFeatures',
          children: [{
            type: 'fieldset',
            label: b.popupFeatures,
            children: [{ type: 'hbox', children: [{ type: 'checkbox', id: 'resizable', label: b.popupResizable, setup: h, commit: k }, { type: 'checkbox', id: 'status', label: b.popupStatusBar, setup: h, commit: k }] }, { type: 'hbox', children: [{ type: 'checkbox', id: 'location', label: b.popupLocationBar, setup: h, commit: k }, { type: 'checkbox', id: 'toolbar', label: b.popupToolbar, setup: h, commit: k }] }, {
              type: 'hbox',
              children: [{
                type: 'checkbox',
                id: 'menubar',
                label: b.popupMenuBar,
                setup: h,
                commit: k
              }, { type: 'checkbox', id: 'fullscreen', label: b.popupFullScreen, setup: h, commit: k }]
            }, { type: 'hbox', children: [{ type: 'checkbox', id: 'scrollbars', label: b.popupScrollBars, setup: h, commit: k }, { type: 'checkbox', id: 'dependent', label: b.popupDependent, setup: h, commit: k }] }, {
              type: 'hbox',
              children: [{ type: 'text', widths: ['50%', '50%'], labelLayout: 'horizontal', label: c.width, id: 'width', setup: h, commit: k }, {
                type: 'text',
                labelLayout: 'horizontal',
                widths: ['50%', '50%'],
                label: b.popupLeft,
                id: 'left',
                setup: h,
                commit: k
              }]
            }, { type: 'hbox', children: [{ type: 'text', labelLayout: 'horizontal', widths: ['50%', '50%'], label: c.height, id: 'height', setup: h, commit: k }, { type: 'text', labelLayout: 'horizontal', label: b.popupTop, widths: ['50%', '50%'], id: 'top', setup: h, commit: k }] }]
          }]
        }]
      }, {
        id: 'upload',
        label: b.upload,
        title: b.upload,
        hidden: !0,
        filebrowser: 'uploadButton',
        elements: [{ type: 'file', id: 'upload', label: c.upload, style: 'height:40px', size: 29 }, {
          type: 'fileButton',
          id: 'uploadButton',
          label: c.uploadSubmit,
          filebrowser: 'info:url',
          for: ['upload',
            'upload']
        }]
      }, {
        id: 'advanced',
        label: b.advanced,
        title: b.advanced,
        elements: [{
          type: 'vbox',
          padding: 1,
          children: [{
            type: 'hbox',
            widths: ['45%', '35%', '20%'],
            children: [{ type: 'text', id: 'advId', requiredContent: 'a[id]', label: b.id, setup: f, commit: l }, { type: 'select', id: 'advLangDir', requiredContent: 'a[dir]', label: b.langDir, default: '', style: 'width:110px', items: [[c.notSet, ''], [b.langDirLTR, 'ltr'], [b.langDirRTL, 'rtl']], setup: f, commit: l }, {
              type: 'text',
              id: 'advAccessKey',
              requiredContent: 'a[accesskey]',
              width: '80px',
              label: b.acccessKey,
              maxLength: 1,
              setup: f,
              commit: l
            }]
          }, { type: 'hbox', widths: ['45%', '35%', '20%'], children: [{ type: 'text', label: b.name, id: 'advName', requiredContent: 'a[name]', setup: f, commit: l }, { type: 'text', label: b.langCode, id: 'advLangCode', requiredContent: 'a[lang]', width: '110px', default: '', setup: f, commit: l }, { type: 'text', label: b.tabIndex, id: 'advTabIndex', requiredContent: 'a[tabindex]', width: '80px', maxLength: 5, setup: f, commit: l }] }]
        }, {
          type: 'vbox',
          padding: 1,
          children: [{
            type: 'hbox',
            widths: ['45%', '55%'],
            children: [{
              type: 'text',
              label: b.advisoryTitle,
              requiredContent: 'a[title]',
              default: '',
              id: 'advTitle',
              setup: f,
              commit: l
            }, { type: 'text', label: b.advisoryContentType, requiredContent: 'a[type]', default: '', id: 'advContentType', setup: f, commit: l }]
          }, { type: 'hbox', widths: ['45%', '55%'], children: [{ type: 'text', label: b.cssClasses, requiredContent: 'a(cke-xyz)', default: '', id: 'advCSSClasses', setup: f, commit: l }, { type: 'text', label: b.charset, requiredContent: 'a[charset]', default: '', id: 'advCharset', setup: f, commit: l }] }, {
            type: 'hbox',
            widths: ['45%', '55%'],
            children: [{
              type: 'text',
              label: b.rel,
              requiredContent: 'a[rel]',
              default: '',
              id: 'advRel',
              setup: f,
              commit: l
            }, { type: 'text', label: b.styles, requiredContent: 'a{cke-xyz}', default: '', id: 'advStyles', validate: CKEDITOR.dialog.validate.inlineStyle(e.lang.common.invalidInlineStyle), setup: f, commit: l }]
          }, {
            type: 'hbox',
            widths: ['45%', '55%'],
            children: [{
              type: 'checkbox',
              id: 'download',
              requiredContent: 'a[download]',
              label: b.download,
              setup: function (a) { void 0 !== a.download && this.setValue('checked', 'checked') },
              commit: function (a) {
                this.getValue() && (a.download =
this.getValue())
              }
            }]
          }]
        }]
      }],
      onShow: function () { let a = this.getParentEditor(); const b = a.getSelection(); let c = b.getSelectedElement(); const d = this.getContentElement('info', 'linkDisplayText').getElement().getParent().getParent(); let e = null; (e = m.getSelectedLink(a)) && e.hasAttribute('href') ? c || (b.selectElement(e), c = e) : e = null; m.showDisplayTextForElement(c, a) ? d.show() : d.hide(); a = m.parseLinkAttributes(a, e); this._.selectedElement = e; this.setupContent(a) },
      onOk: function () {
        let a = {}; this.commitContent(a); let b = e.getSelection(); let c = m.getLinkAttributes(e,
          a); if (this._.selectedElement) { var d = this._.selectedElement; const g = d.data('cke-saved-href'); const h = d.getHtml(); let f; d.setAttributes(c.set); d.removeAttributes(c.removed); if (a.linkText && p != a.linkText)f = a.linkText; else if (g == h || a.type == 'email' && h.indexOf('@') != -1)f = a.type == 'email' ? a.email.address : c.set['data-cke-saved-href']; f && (d.setText(f), b.selectElement(d)); delete this._.selectedElement } else {
          b = b.getRanges()[0]; b.collapsed
            ? (a = new CKEDITOR.dom.text(a.linkText || (a.type == 'email' ? a.email.address : c.set['data-cke-saved-href']),
                e.document), b.insertNode(a), b.selectNodeContents(a))
            : p !== a.linkText && (a = new CKEDITOR.dom.text(a.linkText, e.document), b.shrink(CKEDITOR.SHRINK_TEXT), e.editable().extractHtmlFromRange(b), b.insertNode(a)); a = b._find('a'); for (d = 0; d < a.length; d++)a[d].remove(!0); c = new CKEDITOR.style({ element: 'a', attributes: c.set }); c.type = CKEDITOR.STYLE_INLINE; c.applyToRange(b, e); b.select()
        }
      },
      onLoad: function () { e.config.linkShowAdvancedTab || this.hidePage('advanced'); e.config.linkShowTargetTab || this.hidePage('target') },
      onFocus: function () {
        let a =
this.getContentElement('info', 'linkType'); a && a.getValue() == 'url' && (a = this.getContentElement('info', 'url'), a.select())
      }
    }
  })
})()
