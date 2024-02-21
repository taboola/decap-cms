const p = (str) => `<p><span>text${str}</span></p>`;


const paragraph = p("")


const div = `<div>${p(" 1")}${p(" 2")}</div>`;


const th = (col) => `<th>Header ${col}</th>`;
const td = (row, col) => `<td>Row ${row}, Cell ${col}</td>`;
const tr = (row) => `<tr>${td(row, 1)}${td(row, 2)}</tr>`;
const thead = () => `<thead><tr>${th(1)}</tr><tr>${th(2)}</tr></thead>`;

const tbody = () => `<tbody>${tr(1)}${tr(2)}</tbody>`;
const colgroup =  `<colgroup><col /<col /></colgroup>`;
const table = `<table>${colgroup}${thead()}${tbody()}</table>`;
export default {
  paragraph,
  div,
  table,
};
