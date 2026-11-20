function parseMd(md) {
  if (!md) return '';

  // 1. Tables
  md = md.replace(/(?:^|\n)((?:\|.+?\|\r?\n)+)/g, function (match, tableBlock) {
    const lines = tableBlock.trim().split(/\r?\n/).filter(line => line.includes('|'));
    if (lines.length < 2) return match;

    const parseRow = (line) => line.split('|').slice(1, -1).map(c => c.trim());
    const headers = parseRow(lines[0]);
    
    // Check if second line is separator like | --- | --- |
    const isSeparator = /^\|?[\s:-|-]+\|?$/.test(lines[1]);
    const startIndex = isSeparator ? 2 : 1;

    let tableHtml = '<div class="table-responsive"><table class="article-table"><thead><tr>';
    headers.forEach(h => {
      tableHtml += `<th>${h}</th>`;
    });
    tableHtml += '</tr></thead><tbody>';

    for (let i = startIndex; i < lines.length; i++) {
      const row = parseRow(lines[i]);
      tableHtml += '<tr>';
      row.forEach(cell => {
        tableHtml += `<td>${cell}</td>`;
      });
      tableHtml += '</tr>';
    }
    tableHtml += '</tbody></table></div>\n';
    return '\n' + tableHtml + '\n';
  });

  return md;
}

const sample = `# Title
Here is a table:
| Metric | Q3 2026 | Q4 2026 |
| :--- | :--- | :--- |
| Organic Traffic | +42% | +88% |
| AI Citations | 140 | 385 |

End of text`;

console.log(parseMd(sample));

