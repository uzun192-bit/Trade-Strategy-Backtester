const express = require('express');
const cors = require('cors');

const app = express();
// Мы будем использовать порт 3001, чтобы он не конфликтовал
// с твоим React-приложением (которое, вероятно, на 5173)
const port = 3001;

// 1. Включаем CORS
// Это КРИТИЧЕСКИ важно. Без этого браузер заблокирует
// запрос от frontend (c localhost:5173) к backend (на localhost:3001)
app.use(cors());

// 2. Создаем наш первый API-маршрут (endpoint)
app.get('/api/btcusd', (req, res) => {
  // Лог в консоль бэкенда (ты увидишь это в терминале)
  console.log('GET /api/test - Запрос получен!');

  // 3. Отправляем JSON-ответ обратно на frontend
  res.json({
    message: 'Привет с бэкенда! 👋 (Hello from Backend!)',
    timestamp: new Date().toISOString(),
  });
});

// 4. Запускаем сервер
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
  console.log('Ожидание запросов...');
});
