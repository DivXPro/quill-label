import Quill from 'quill'

const Embed = Quill.import('blots/embed');

class LabelBlot extends Embed {
  static create(value) {
    const node = super.create(value);
    if (typeof value === 'string') {
      node.setAttribute('template-label-id', value);
      node.textContent = value;
    } else if (typeof value === 'object') {
      node.setAttribute('template-label-id', value.id);
      node.textContent = value.text;
    }
    return node;
  }

  static value(node) {
    return node.getAttribute('template-label-id');
  }
}

LabelBlot.blotName = 'label';
LabelBlot.className = 'ql-label';
LabelBlot.tagName = 'span';

export default LabelBlot;
