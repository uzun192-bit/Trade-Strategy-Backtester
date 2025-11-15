import { useState } from 'react';
import SettingsPanel from './SettingsPanel.jsx';
import ResultsChart from './ResultsChart.jsx';
import ResultsTable from './ResultsTable.jsx';
import { Play, Loader, CheckCircle, AlertTriangle } from 'lucide-react';

// Моковые (тестовые) данные для результатов
const MOCK_RESULTS = [
  {
    id: 1,
    profitPct: 125.5,
    maxDrawdownPct: 15.2,
    params: '10% | 5 | 10% | 1.5x',
  },
  {
    id: 2,
    profitPct: 110.1,
    maxDrawdownPct: 12.0,
    params: '10% | 6 | 10% | 1.5x',
  },
  {
    id: 3,
    profitPct: 95.7,
    maxDrawdownPct: 9.5,
    params: '15% | 5 | 12% | 1.25x',
  },
];

// Моковые данные для графика
const MOCK_CHART_DATA = [
  { date: '2023-01', strategy1: 1000, strategy2: 1000, strategy3: 1000 },
  { date: '2023-02', strategy1: 1100, strategy2: 1050, strategy3: 1080 },
  { date: '2023-03', strategy1: 1050, strategy2: 1150, strategy3: 1120 },
  { date: '2023-04', strategy1: 1250, strategy2: 1200, strategy3: 1180 },
  { date: '2023-05', strategy1: 1300, strategy2: 1220, strategy3: 1250 },
  { date: '2023-06', strategy1: 1280, strategy2: 1300, strategy3: 1350 },
  { date: '2023-07', strategy1: 1400, strategy2: 1350, strategy3: 1400 },
  { date: '2023-08', strategy1: 1550, strategy2: 1400, strategy3: 1420 },
  { date: '2023-09', strategy1: 1500, strategy2: 1450, strategy3: 1500 },
  { date: '2023-10', strategy1: 1650, strategy2: 1550, strategy3: 1510 },
  { date: '2023-11', strategy1: 1800, strategy2: 1600, strategy3: 1620 },
  { date: '2023-12', strategy1: 2255, strategy2: 2101, strategy3: 1957 },
];

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
    // Здесь мы будем делать настоящий запрос к backend
    // А пока - просто симулируем загрузку

    // Имитация прогресса
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 10;
      });
    }, 200);

    // Имитация получения ответа
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setIsLoading(false);

      // Показываем моковые результаты
      setResults(MOCK_RESULTS);
      setChartData(MOCK_CHART_DATA);

      // // Имитация ошибки (для проверки)
      // setError("Произошла ошибка при расчете");
    }, 2200); // 2.2 секунды
  };

  return (
    // 1. Контейнер для секции BTC
    <div className="space-y-6 rounded-lg bg-gray-800 p-6 shadow-md">
      {/* === ВЕРХНЯЯ ЧАСТЬ (Настройки) === */}
      <SettingsPanel
        isLoading={isLoading}
        progress={progress}
        onRunTest={handleRunBacktest}
      />

      {/* === СООБЩЕНИЯ (Загрузка/Ошибка/Успех) === */}
      {isLoading && (
        <div className="flex items-center justify-center space-x-2 rounded-md bg-blue-900/50 p-4 text-blue-200">
          <Loader className="animate-spin" size={20} />
          <span>Идет расчет... ({progress}%)</span>
        </div>
      )}
      {error && (
        <div className="flex items-center space-x-2 rounded-md bg-red-900/50 p-4 text-red-200">
          <AlertTriangle size={20} />
          <span>Ошибка: {error}</span>
        </div>
      )}
      {!isLoading && results.length > 0 && (
        <div className="flex items-center space-x-2 rounded-md bg-green-900/50 p-4 text-green-200">
          <CheckCircle size={20} />
          <span>
            Бэктест завершен! Найдено {results.length} лучших стратегий.
          </span>
        </div>
      )}

      {/* Показываем результаты (График и Таблицу) только
        если нет загрузки и есть какие-то результаты.
      */}
      {!isLoading && results.length > 0 && (
        <div className="space-y-6">
          {/* === ЦЕНТРАЛЬНАЯ ЧАСТЬ (График) === */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">
              Топ-{results.length} Стратегий: График роста
            </h2>
            <div className="h-96 w-full rounded-md bg-gray-900/50 p-4">
              <ResultsChart data={chartData} />
            </div>
          </section>

          {/* === НИЖНЯЯ ЧАСТЬ (Таблица) === */}
          <section>
            <h2 className="mb-4 text-xl font-semibold text-white">
              Топ-{results.length} Стратегий: Результаты
            </h2>
            <ResultsTable data={results} />
          </section>
        </div>
      )}
    </div>
  );
}

export default BacktesterDashboard;
