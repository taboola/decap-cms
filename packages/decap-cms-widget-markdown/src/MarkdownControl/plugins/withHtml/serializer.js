import { jsx } from 'slate-hyperscript';

const ELEMENT_TAGS = {
  A: el => ({ type: 'link', data: { url: el.getAttribute('href') }}),
  BLOCKQUOTE: () => ({ type: 'quote' }),
  H1: () => ({ type: 'heading-one' }),
  H2: () => ({ type: 'heading-two' }),
  H3: () => ({ type: 'heading-three' }),
  H4: () => ({ type: 'heading-four' }),
  H5: () => ({ type: 'heading-five' }),
  H6: () => ({ type: 'heading-six' }),
  IMG: el => ({ type: 'image', url: el.getAttribute('src') }),
  LI: () => ({ type: 'list-item' }),
  OL: () => ({ type: 'numbered-list' }),
  P: () => ({ type: 'paragraph' }),
  PRE: () => ({ type: 'code' }),
  UL: () => ({ type: 'bulleted-list' }),
  TABLE: (el) => {
    // console.log({el})
    return { type: 'table' };
  },


  TR: (el) => {
    // console.log(el)
    return { type: 'table-row' };
  },
  TD: (el) => {
    // console.log(el)
    return { type: 'table-cell' };
  },
  TH: (el) => {
    // console.log(el)
    return { type: 'table-cell' };
  },

}


const filters  = {
  TABLE: ( child ) => {
    return  ['THEAD', 'TBODY', 'TR', 'TH', 'TD'].includes(child.nodeName)
  },
  'default': () => true
}

// COMPAT: `B` is omitted here because Google Docs uses `<b>` in weird ways.
const TEXT_TAGS = {
  CODE: () => ({ code: true }),
  DEL: () => ({ strikethrough: true }),
  EM: () => ({ italic: true }),
  I: () => ({ italic: true }),
  S: () => ({ strikethrough: true }),
  STRONG: () => ({ bold: true }),
  U: () => ({ underline: true }),
}

export const deserialize = el => {
  if (el.nodeType === 3) {
    return el.textContent
  } else if (el.nodeType !== 1) {
    return null
  } else if (el.nodeName === 'BR') {
    if (el.parentNode.nodeName === 'TD'){
      return ' '
    }
    return '\n'
  }

  const { nodeName } = el
  let parent = el

  if (
    nodeName === 'PRE' &&
    el.childNodes[0] &&
    el.childNodes[0].nodeName === 'CODE'
  ) {
    parent = el.childNodes[0]
  }

  const filter = filters?.[el.nodeName] ?? filters?.default;
  let children = Array.from(parent.childNodes).filter(filter).map(deserialize).flat();

  if (children.length === 0) {
    children = [{ text: '' }]
  }

  if (el.nodeName === 'BODY') {
    return jsx('fragment', {}, children)
  }

  if (ELEMENT_TAGS[nodeName]) {
    const attrs = ELEMENT_TAGS[nodeName](el)
    return jsx('element', attrs, children)
  }

  if (TEXT_TAGS[nodeName]) {
    const attrs = TEXT_TAGS[nodeName](el)
    return children.map(child => jsx('text', attrs, child))
  }

  return children
}
