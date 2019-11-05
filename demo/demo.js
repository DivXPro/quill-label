import QuillLabel from 'src/quill-label.js'
// import better-table styles file
import 'src/assets/quill-label.scss'

Quill.register({
  'modules/label': QuillLabel
}, true)

window.onload = () => {
  const quill = new Quill('#editor-wrapper', {
    theme: 'snow',
    modules: {
      toolbar: [
        ['bold', 'italic'],
        [{ 'color': [] }, { 'background': [] }],
        [{ header: [1, 2, 3, false] }],
        ['formula', 'link', 'label']
      ],
      label: {
        data: [
          { label: '员工姓名', value: 'employee_name' },
          { label: '入职时间', value: 'hire_date' },
          { label: '公司名称', value: 'company_name' }
        ],
      }
    }
  });
}