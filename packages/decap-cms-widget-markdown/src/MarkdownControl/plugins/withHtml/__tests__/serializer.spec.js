import { deserialize } from '../serializer';
import html from './html';

describe('testing html deserialize', () => {


  test('paragraph', () => {
    const parsed = new DOMParser().parseFromString(html.paragraph, 'text/html');
    const data = deserialize(parsed.body);
    expect(data).toStrictEqual([
      {
        'type': 'paragraph',
        'children': [
          {
            'text': 'text',
          },
        ],
      },
    ]);
  });

  test('div', () => {
    const parsed = new DOMParser().parseFromString(html.div, 'text/html');
    const data = deserialize(parsed.body);
    expect(data).toStrictEqual([
      {
        'type': 'paragraph',
        'children': [
          {
            'text': 'text 1',
          },
        ],
      },
      {
        'type': 'paragraph',
        'children': [
          {
            'text': 'text 2',
          },
        ],
      },
    ]);

  });


  test('table', () => {
    const parsed = new DOMParser().parseFromString(html.table, 'text/html');
    const data = deserialize(parsed.body);
    expect(data).toStrictEqual([
      {
        'type': 'table',
        'children': [
          {
            'type': 'table-row',
            'children': [
              {
                'type': 'table-cell',
                'children': [
                  {
                    'text': 'Header 1',
                  },
                ],
              },
            ],
          },
          {
            'type': 'table-row',
            'children': [
              {
                'type': 'table-cell',
                'children': [
                  {
                    'text': 'Header 2',
                  },
                ],
              },
            ],
          },
          {
            'type': 'table-row',
            'children': [
              {
                'type': 'table-cell',
                'children': [
                  {
                    'text': 'Row 1, Cell 1',
                  },
                ],
              },
              {
                'type': 'table-cell',
                'children': [
                  {
                    'text': 'Row 1, Cell 2',
                  },
                ],
              },
            ],
          },
          {
            'type': 'table-row',
            'children': [
              {
                'type': 'table-cell',
                'children': [
                  {
                    'text': 'Row 2, Cell 1',
                  },
                ],
              },
              {
                'type': 'table-cell',
                'children': [
                  {
                    'text': 'Row 2, Cell 2',
                  },
                ],
              },
            ],
          },
        ],
      },
    ]);
  });

}); // Path: withHtml.spec.js
