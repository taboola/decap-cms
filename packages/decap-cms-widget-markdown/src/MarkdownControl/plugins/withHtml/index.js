import { Transforms } from 'slate';
import { deserialize } from './serializer';

const withHtml = editor => {
  const { insertData, isInline, isVoid } = editor;

  editor.isInline = element => {
    return element.type === 'link' ? true : isInline(element);
  };

  editor.isVoid = element => {
    return element.type === 'image' ? true : isVoid(element);
  };

  editor.insertData = data => {
    const html = data.getData('text/html');
    const slateFragment = data.getData('application/x-slate-fragment');

    if (html && !slateFragment) {
      const parsed = new DOMParser().parseFromString(html.replaceAll('\n',''), 'text/html');
      const fragment = deserialize(parsed.body);
      Transforms.insertFragment(editor, fragment);
      return;
    }

    insertData(data);
  };

  return editor;
};

export default withHtml;
