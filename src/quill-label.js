import Quill from 'quill'
import Emitter from 'quill/core/emitter';
import QuillLabelBlot from './quill-label-blot';

const Module = Quill.import('core/module');

class Label extends Module {
  static register() {
    Quill.register(QuillLabelBlot, true);
  }

  constructor(quill, options) {
    super(quill, options);
    this.toolbar = quill.getModule('toolbar');
    if (typeof this.toolbar !== 'undefined') {
      this.toolbar.addHandler('label', this.openLabelSelect.bind(this));
    }
    const labelBtns = document.getElementsByClassName('ql-label');
    if (labelBtns) {
      [].slice.call(labelBtns).forEach(emojiBtn => {
        emojiBtn.innerHTML = options.buttonIcon;
      });
    }
    this.root = quill.addContainer('ql-select-tooltip');
    let selectHtml = '<select class="ql-select-label">';
    [].slice.call(options.data || []).forEach(opt => selectHtml += `<option value=\"${opt.value}\">${opt.label}</option>`);
    selectHtml +=  '</select>';
    this.root.innerHTML = selectHtml;
    const select = this.root.querySelector('select');
    select.addEventListener('change', event => {
      const index = event.target.options.selectedIndex;
      const option = event.target.options[index];
      this.save(option);
    });
    this.hide();
  }

  hide() {
    this.root.style.display = 'none';
  }

  show() {
    this.root.style.display = 'block';
  }


  openLabelSelect() {
    const range = this.quill.getSelection();
    const atSignBounds = this.quill.getBounds(range.index);
    const paletteMaxPos = atSignBounds.left + 250;
    this.root.style.top = `${10 +
      atSignBounds.top +
      atSignBounds.height}px`;
    if (paletteMaxPos > this.quill.container.offsetWidth) {
      this.root.style.left = `${atSignBounds.left - 250}px`;
    } else {
      this.root.style.left = `${atSignBounds.left}px`;
    }
    this.show();
  }

  save(opt) {
    const range = this.quill.getSelection(true);
    if (range != null) {
      const index = range.index + range.length;
      this.quill.insertEmbed(index, 'label', opt, Emitter.sources.USER);
      this.quill.insertText(index + 1, '', Emitter.sources.USER);
      this.quill.setSelection(index + 2, Emitter.sources.USER);
    }
    this.hide();
  }
}

Label.DEFAULTS = {
  buttonIcon:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="none" d="M0 0h24v24H0z"/><path fill="#444" stroke-width="1" d="M4 2h16a1 1 0 0 1 1 1v19.276a.5.5 0 0 1-.704.457L12 19.03l-8.296 3.702A.5.5 0 0 1 3 22.276V3a1 1 0 0 1 1-1zm15 17.965V4H5v15.965l7-3.124 7 3.124zM12 13.5l-2.939 1.545.561-3.272-2.377-2.318 3.286-.478L12 6l1.47 2.977 3.285.478-2.377 2.318.56 3.272L12 13.5z"/></svg>',
};

export default Label;
