import { TrendingUp, TrendingDown, ChevronsRight } from 'lucide-react';

function ResultsTable({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center text-gray-500">
        Нет данных для отображения таблицы.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-700">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700/50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300"
            >
              Ранг
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300"
            >
              Прибыль (%)
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300"
            >
              Макс. Просадка (%)
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-300"
            >
              Параметры (Вход | Кол-во | Шаг | Множитель)
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Details</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700 bg-gray-800">
          {data.map((row, index) => (
            <tr key={row.id} className="hover:bg-gray-700/50">
              <td className="whitespace-nowrap px-6 py-4">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    index === 0
                      ? 'bg-green-600'
                      : index === 1
                      ? 'bg-yellow-600'
                      : index === 2
                      ? 'bg-orange-600'
                      : 'bg-gray-600'
                  } text-sm font-bold text-white`}
                >
                  {index + 1}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="flex items-center text-lg font-bold text-green-400">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  {row.profitPct.toFixed(2)}%
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="flex items-center text-lg font-medium text-red-400">
                  <TrendingDown className="mr-2 h-5 w-5" />
                  {row.maxDrawdownPct.toFixed(2)}%
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-400">
                {row.params}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                <button className="flex items-center text-blue-400 hover:text-blue-300">
                  Детали <ChevronsRight className="ml-1 h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultsTable;
