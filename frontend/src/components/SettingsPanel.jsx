import { useState } from 'react';
import { Play, Settings, ChevronDown, ChevronUp } from 'lucide-react';

// Это наш объект настроек из `strategyConfig`
// В реальном приложении мы будем импортировать его из отдельного файла
const initialSettings = {
  firstOrderSizePct: [0.1], // Пока что одно значение, потом сделаем диапазон
  maxAvgOrders: [4, 5], // Диапазон
  avgStepPct: [0.1, 0.15],
  avgOrderSizeMultiplier: [1.25, 1.5],
  tp1TriggerPct: [0.1],
  tp1SellPct: [0.25],
  // ... (здесь будут все остальные настройки)
};

function SettingsPanel({ isLoading, progress, onRunTest }) {
  const [settings, setSettings] = useState(initialSettings);
  const [isExpanded, setIsExpanded] = useState(true); // Показать/скрыть настройки

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Здесь мы будем собирать все данные из формы
    // и передавать их в 'onRunTest'
    onRunTest(settings);
  };

  // TODO: Нам понадобятся функции (onChange) для обновления
  // каждого поля в 'settings'

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Settings className="text-blue-400" size={28} />
          <h2 className="text-2xl font-semibold text-white">
            Настройки: Bitcoin (BTC/USD)
          </h2>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-white"
        >
          {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
      </div>

      {/* Форма с настройками (скрываемая) */}
      {isExpanded && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Контейнер для всех полей настроек */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Пример поля 1: Размер первого ордера */}
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
                // В 'value' мы будем форматировать массив,
                // например: settings.firstOrderSizePct.join(', ')
                // Для простоты пока оставим '10'
                defaultValue="10, 15, 20"
                className="w-full rounded-md border-gray-600 bg-gray-800 px-3 py-2 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Напр: 10, 15, 20"
              />
              <p className="mt-1 text-xs text-gray-400">
                Диапазон (через запятую)
              </p>
            </div>

            {/* Пример поля 2: Кол-во усреднений */}
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
                defaultValue="4, 5, 6, 7"
                className="w-full rounded-md border-gray-600 bg-gray-800 px-3 py-2 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Напр: 4, 5, 6"
              />
              <p className="mt-1 text-xs text-gray-400">
                Диапазон (через запятую)
              </p>
            </div>

            {/* Пример поля 3: Шаг усреднения */}
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
                defaultValue="10, 12.5, 15"
                className="w-full rounded-md border-gray-600 bg-gray-800 px-3 py-2 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Напр: 10, 15"
              />
              <p className="mt-1 text-xs text-gray-400">
                Диапазон (через запятую)
              </p>
            </div>

            {/* Здесь будут остальные 10+ полей для TP1, TP2, TP3, TP4...
              Мы добавим их позже.
            */}
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
              <Play size={20} />
              <span>{isLoading ? 'Выполнение...' : 'Запустить Бэктест'}</span>
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

export default SettingsPanel;
