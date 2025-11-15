import React, { useState } from 'react';

// --- SVG Иконки (замена lucide-react) ---

const SettingsIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 .54 1.85v.12a2 2 0 0 1-.54 1.85l-.15.1a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l-.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-.54-1.85v-.12a2 2 0 0 1 .54-1.85l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ChevronDownIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const ChevronUpIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m18 15-6-6-6 6" />
  </svg>
);

const PlayIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const LoaderIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

// --- Компонент Панели Настроек ---

function SettingsPanel({ isLoading, progress, onRunTest }) {
  // Состояние для настроек (пока пустое, добавим позже)
  const [settings, setSettings] = useState({
    firstOrderSizePct: '10, 15, 20',
    maxAvgOrders: '4, 5, 6, 7',
    avgStepPct: '10, 12.5, 15',
  });

  // Состояние для сворачивания/разворачивания
  const [isExpanded, setIsExpanded] = useState(true);

  // Обработчик нажатия кнопки "Запустить"
  const handleSubmit = (e) => {
    e.preventDefault();
    // Передаем текущие настройки (пока что моковые)
    onRunTest(settings);
  };

  return (
    <section>
      {/* Заголовок панели настроек */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <SettingsIcon className="text-blue-400" size={28} />
          <h2 className="text-2xl font-semibold text-white">
            Настройки: Bitcoin (BTC/USD)
          </h2>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-white"
          aria-label={isExpanded ? 'Свернуть' : 'Развернуть'}
        >
          {isExpanded ? (
            <ChevronUpIcon size={24} />
          ) : (
            <ChevronDownIcon size={24} />
          )}
        </button>
      </div>

      {/* Форма с настройками (скрываемая) */}
      {isExpanded && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Контейнер для всех полей настроек */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Пример поля 1 */}
            <div className="rounded-md bg-gray-700 p-4">
              <label
                htmlFor="firstOrderSize"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                1. Размер первого ордера (%)
              </label>
              <input
                type="text"
                id="firstOrderSize"
                value={settings.firstOrderSizePct}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    firstOrderSizePct: e.target.value,
                  })
                }
                className="w-full rounded-md border-gray-600 bg-gray-800 px-3 py-2 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Напр: 10, 15, 20"
              />
              <p className="mt-1 text-xs text-gray-400">
                Диапазон (через запятую)
              </p>
            </div>

            {/* Пример поля 2 */}
            <div className="rounded-md bg-gray-700 p-4">
              <label
                htmlFor="maxAvgOrders"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                2. Макс. кол-во усреднений
              </label>
              <input
                type="text"
                id="maxAvgOrders"
                value={settings.maxAvgOrders}
                onChange={(e) =>
                  setSettings({ ...settings, maxAvgOrders: e.target.value })
                }
                className="w-full rounded-md border-gray-600 bg-gray-800 px-3 py-2 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Напр: 4, 5, 6"
              />
              <p className="mt-1 text-xs text-gray-400">
                Диапазон (через запятую)
              </p>
            </div>

            {/* Пример поля 3 */}
            <div className="rounded-md bg-gray-700 p-4">
              <label
                htmlFor="avgStepPct"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                3. Шаг усреднения (%)
              </label>
              <input
                type="text"
                id="avgStepPct"
                value={settings.avgStepPct}
                onChange={(e) =>
                  setSettings({ ...settings, avgStepPct: e.target.value })
                }
                className="w-full rounded-md border-gray-600 bg-gray-800 px-3 py-2 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Напр: 10, 15"
              />
              <p className="mt-1 text-xs text-gray-400">
                Диапазон (через запятую)
              </p>
            </div>

            {/* ... Здесь будут остальные поля ... */}
          </div>

          {/* Кнопка Запуска и Прогресс-бар */}
          <div className="flex flex-col items-center space-y-4 pt-4">
            {/* Прогресс-бар */}
            {isLoading && (
              <div className="w-full rounded-full bg-gray-700">
                <div
                  className="rounded-full bg-blue-600 p-0.5 text-center text-xs font-medium leading-none text-blue-100 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                >
                  {progress}%
                </div>
              </div>
            )}

            {/* Кнопка */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center space-x-2 rounded-lg bg-green-600 px-6 py-3 text-lg font-bold text-white shadow-lg transition-all hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-500"
            >
              <PlayIcon size={20} className={isLoading ? '' : 'fill-white'} />
              <span>{isLoading ? 'Выполнение...' : 'Запустить Бэктест'}</span>
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

// --- Компонент Блока BTC (Дашборд) ---

function BacktesterDashboard() {
  const [results, setResults] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  // Функция, которая будет запускать бэктест
  const handleRunBacktest = (settings) => {
    console.log('Запуск бэктеста с настройками:', settings);
    setIsLoading(true);
    setError(null);
    setProgress(0);
    setResults([]);
    setChartData([]);

    // --- СИМУЛЯЦИЯ БЭКТЕСТА ---
    // (Позже здесь будет настоящий запрос к backend)

    // Имитация прогресса
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 10;
      });
    }, 200); // Обновляем каждые 200мс

    // Имитация получения ответа
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setIsLoading(false);

      // TODO: Позже мы добавим сюда отображение моковых результатов
      console.log('Бэктест завершен (симуляция).');

      // // Имитация ошибки (для проверки)
      // setError("Произошла ошибка при расчете");
    }, 2200); // 2.2 секунды
  };

  return (
    // Контейнер для секции BTC
    <div className="space-y-6 rounded-lg bg-gray-800 p-6 shadow-md">
      {/* === ВЕРХНЯЯ ЧАСТЬ (Настройки) === */}
      <SettingsPanel
        isLoading={isLoading}
        progress={progress}
        onRunTest={handleRunBacktest}
      />

      {/* === СООБЩЕНИЯ (Загрузка/Ошибка) === */}
      {/* (Мы добавим их сюда, когда будем работать над результатами) */}

      {/* Здесь позже будут График и Таблица Результатов
       */}
    </div>
  );
}

// --- Компонент Шапки (HEADER) ---
function Header() {
  return (
    <header className="border-b border-gray-700 bg-gray-800 shadow-lg">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-white">
          Trade Strategy Backtester
        </h1>
      </div>
    </header>
  );
}

// --- Основной компонент приложения (App) ---
function App() {
  return (
    // Глобальный контейнер с темным фоном
    <div className="min-h-screen w-full bg-gray-900 text-gray-200 font-sans">
      <Header />

      {/* === ОСНОВНАЯ ОБЛАСТЬ (MAIN) === */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Вот наш новый компонент для BTC */}
          <BacktesterDashboard />

          {/* (Позже здесь можно будет добавить <BacktesterDashboard /> для ETH и т.д.) */}
        </div>
      </main>
    </div>
  );
}

export default App;
