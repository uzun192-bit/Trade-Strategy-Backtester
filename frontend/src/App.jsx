import { useState } from 'react';
import axios from 'axios'; // Импортируем axios

function App() {
  // Состояния для хранения данных, загрузки и ошибки
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // URL нашего бэкенда. 
  // Важно указать полный URL, включая http и порт
  const backendUrl = 'http://localhost:3001/api/test';

  // Функция для запроса данных
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setMessage('');

    try {
      // Делаем GET-запрос на наш бэкенд
      const response = await axios.get(backendUrl);
      
      // Сохраняем сообщение из ответа в состояние
      setMessage(response.data.message);

    } catch (err) {
      // Если произошла ошибка, сохраняем ее
      setError('Не удалось получить данные с бэкенда. (Could not fetch data.)');
      console.error(err);
    } finally {
      // В любом случае убираем индикатор загрузки
      setLoading(false);
    }
  };

  return (
    // Используем Tailwind классы для стилизации
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-900 text-white">
      <div className="rounded-lg bg-gray-800 p-8 shadow-2xl transition-all">
        <h1 className="mb-4 text-3xl font-bold text-blue-400">
          Frontend (React)
        </h1>
        <p className="mb-6 text-gray-300">Нажми кнопку, чтобы получить данные с Backend (Express)</p>
        
        <button
          onClick={fetchData}
          disabled={loading}
          className="w-full rounded-md bg-blue-600 px-4 py-2 font-bold text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Загрузка...' : 'Запросить данные (Fetch Data)'}
        </button>
        
        {/* Область для вывода результата */}
        <div className="mt-6 h-20 rounded-md bg-gray-700 p-4">
          <h2 className="text-sm font-semibold text-gray-400">Ответ от бэкенда:</h2>
          {error && <p className="text-lg text-red-400">{error}</p>}
          {message && <p className="text-lg text-green-400">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default App;