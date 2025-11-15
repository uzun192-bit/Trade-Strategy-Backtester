const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Пути к файлам
const inputHtmlPath = path.join(__dirname, 'src', 'data', 'btcusd.html');
const outputJsonPath = path.join(__dirname, 'src', 'data', 'btcusd.json');

// --- Вспомогательные функции ---

/**
 * Конвертирует немецкую строку-число в float
 * @param {string} str - (e.g., "96.020.725.760" or "94.509,16")
 * @returns {number}
 */
const parseGermanNumber = (str) => {
  if (!str || str === '-') return null; // Обработка пропусков
  return parseFloat(str.replace(/\./g, '').replace(',', '.'));
};

/**
 * Конвертирует немецкую строку-дату в YYYY-MM-DD
 * @param {string} str - (e.g., "15. Nov. 2025")
 * @returns {string}
 */
const parseGermanDate = (str) => {
  const monthMap = {
    'Jan.': '01',
    'Feb.': '02',
    März: '03',
    'Apr.': '04',
    Mai: '05',
    Juni: '06',
    Juli: '07',
    'Aug.': '08',
    'Sep.': '09',
    'Okt.': '10',
    'Nov.': '11',
    'Dez.': '12',
  };

  const parts = str.split(' ');
  if (parts.length !== 3) return null;

  const day = parts[0].replace('.', '');
  const month = monthMap[parts[1]];
  const year = parts[2];

  if (!day || !month || !year) return null;

  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

// --- Основная логика ---

try {
  // 1. Читаем HTML файл
  console.log(`Reading HTML file from ${inputHtmlPath}...`);
  const html = fs.readFileSync(inputHtmlPath, 'utf-8');

  // 2. Загружаем HTML в Cheerio
  const $ = cheerio.load(html);

  const processedData = [];

  // 3. Находим все строки <tr> в <tbody>
  // (Названия классов, как 'yf-1jecxey', могут меняться,
  // поэтому будем искать по тегам)
  $('table > tbody > tr').each((i, row) => {
    const cells = $(row).find('td'); // Находим все ячейки <td> в строке

    if (cells.length === 7) {
      // Убедимся, что это строка с данными
      const date = parseGermanDate($(cells[0]).text());
      const open = parseGermanNumber($(cells[1]).text());
      const high = parseGermanNumber($(cells[2]).text());
      const low = parseGermanNumber($(cells[3]).text());
      const close = parseGermanNumber($(cells[4]).text());
      const adjClose = parseGermanNumber($(cells[5]).text());
      const volume = parseGermanNumber($(cells[6]).text());

      // Добавляем только если дата корректно распозналась
      if (date) {
        processedData.push({
          date,
          open,
          high,
          low,
          close,
          adjClose,
          volume,
        });
      }
    }
  });

  // 4. Переворачиваем массив, т.к. данные идут от новых к старым
  // Нам для бэктеста нужно от старых к новым.
  const chronologicalData = processedData.reverse();

  // 5. Записываем результат в JSON
  fs.writeFileSync(outputJsonPath, JSON.stringify(chronologicalData, null, 2));

  console.log(`Successfully processed ${chronologicalData.length} data rows.`);
  console.log(`Data saved to ${outputJsonPath}`);
} catch (err) {
  console.error('An error occurred:', err.message);
  if (err.code === 'ENOENT') {
    console.error(`Error: File not found at ${inputHtmlPath}`);
    console.error('Please make sure the path and file name are correct.');
  }
}
