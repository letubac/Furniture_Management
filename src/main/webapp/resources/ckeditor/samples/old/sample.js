/**
 * Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

// Tool scripts for the sample pages.
// This file can be ignored and is not required to make use of CKEditor.

(function () {
  CKEDITOR.on('instanceReady', function (ev) {
    // Check for sample compliance.
    const editor = ev.editor
    const meta = CKEDITOR.document.$.getElementsByName('ckeditor-sample-required-plugins')
    const requires = meta.length ? CKEDITOR.dom.element.get(meta[0]).getAttribute('content').split(',') : []
    const missing = []
    let i

    if (requires.length) {
      for (i = 0; i < requires.length; i++) {
        if (!editor.plugins[requires[i]]) { missing.push('<code>' + requires[i] + '</code>') }
      }

      if (missing.length) {
        const warn = CKEDITOR.dom.element.createFromHtml(
          '<div class="warning">' +
						'<span>To fully experience this demo, the ' + missing.join(', ') + ' plugin' + (missing.length > 1 ? 's are' : ' is') + ' required.</span>' +
					'</div>'
        )
        warn.insertBefore(editor.container)
      }
    }

    // Set icons.
    const doc = new CKEDITOR.dom.document(document)
    const icons = doc.find('.button_icon')

    for (i = 0; i < icons.count(); i++) {
      const icon = icons.getItem(i)
      const name = icon.getAttribute('data-icon')
      const style = CKEDITOR.skin.getIconStyle(name, (CKEDITOR.lang.dir == 'rtl'))

      icon.addClass('cke_button_icon')
      icon.addClass('cke_button__' + name + '_icon')
      icon.setAttribute('style', style)
      icon.setStyle('float', 'none')
    }
  })
})()
