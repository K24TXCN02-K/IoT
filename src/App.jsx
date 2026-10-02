import { useEffect, useMemo, useState } from 'react'
import {
  Cloud,
  Droplets,
  Lightbulb,
  RefreshCw,
  Thermometer,
  Wifi,
  WifiOff,
} from 'lucide-react'
import ChartShell from './components/ChartShell.jsx'
import DualMetricChart from './components/DualMetricChart.jsx'
import LightTimelineChart from './components/LightTimelineChart.jsx'
import MetricLineChart from './components/MetricLineChart.jsx'
import RelayCard from './components/RelayCard.jsx'
import SensorCard from './components/SensorCard.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import { useSensorData } from './hooks/useSensorData.js'

const FILTERS = [
  { id: '30m', label: '30 phút', ms: 30 * 60 * 1000 },
  { id: '1h', label: '1 giờ', ms: 60 * 60 * 1000 },
  { id: '6h', label: '6 giờ', ms: 6 * 60 * 60 * 1000 },
  { id: '24h', label: '24 giờ', ms: 24 * 60 * 60 * 1000 },
  { id: 'all', label: 'Tất cả', ms: null },
]

const pad = (value) => String(value).padStart(2, '0')

const formatTime = (timestamp) => {
  const date = new Date(Number(timestamp) * 1000)
  if (Number.isNaN(date.getTime())) return '--:--'
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`
}

const formatDateTime = (current) => {
  if (current?.datetime) return current.datetime
  if (!current?.timestamp) return '--'
  const date = new Date(Number(current.timestamp) * 1000)
  if (Number.isNaN(date.getTime())) return '--'
  return date.toLocaleString('vi-VN')
}

function App() {
  const { current, history, connected, loading, error, refresh } = useSensorData()
  const [filter, setFilter] = useState('6h')
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('iot-theme')
    if (stored) return stored === 'dark'
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('iot-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const filteredData = useMemo(() => {
    if (!history.length) return []

    const selected = FILTERS.find((item) => item.id === filter)
    const newestMs = Number(history[history.length - 1]?.timestamp || 0) * 1000
    const cutoff = selected?.ms ? newestMs - selected.ms : null

    const rows = cutoff
      ? history.filter((item) => Number(item.timestamp) * 1000 >= cutoff)
      : history

    return rows.map((item) => ({
      ...item,
      temperature: Number(item.temperature),
      humidity: Number(item.humidity),
      lightDigital: Number(item.lightDigital),
      displayTime: formatTime(item.timestamp),
    }))
  }, [history, filter])

  const currentTemperature = current?.temperature ?? '--'
  const currentHumidity = current?.humidity ?? '--'
  const lightState = current?.lightState
    ? String(current.lightState).toUpperCase() === 'DARK' ? 'Tối' : 'Sáng'
    : '--'
  const updatedAt = formatDateTime(current)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <div className="pointer-events-none fixed inset-x-0 top-0 h-72 bg-gradient-to-b from-sky-100/80 via-cyan-50/20 to-transparent dark:from-sky-950/25 dark:via-slate-950/20" />

      {/* Top navigation bar */}
      <nav className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-[1500px] items-center justify-end px-4 py-2 sm:px-6 lg:px-8">
          <ThemeToggle darkMode={darkMode} onToggle={() => setDarkMode((value) => !value)} />
        </div>
      </nav>

      <main className="relative mx-auto max-w-[1500px] px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
        <header className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-bold text-sky-700 dark:border-sky-900/70 dark:bg-sky-950/60 dark:text-sky-300">
              <Cloud size={14} /> Firebase Realtime Database
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Nhóm 5 IoT Dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400 sm:text-base">
              Giám sát nhiệt độ, độ ẩm, ánh sáng và trạng thái relay theo thời gian thực.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={refresh}
              className="inline-flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:text-slate-950 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              <RefreshCw size={17} /> Làm mới
            </button>
          </div>
        </header>

        <section className="panel mb-5 flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="font-bold text-slate-900 dark:text-white">Thiết bị: ESP32</span>
            <span className="hidden h-4 w-px bg-slate-200 dark:bg-slate-700 sm:block" />
            <span className="text-slate-500 dark:text-slate-400">DHT22 + cảm biến ánh sáng digital + Relay</span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`chip ${connected
                ? '!border-emerald-200 !bg-emerald-50 !text-emerald-700 dark:!border-emerald-900/60 dark:!bg-emerald-950/50 dark:!text-emerald-300'
                : '!border-rose-200 !bg-rose-50 !text-rose-700 dark:!border-rose-900/60 dark:!bg-rose-950/50 dark:!text-rose-300'
                }`}
            >
              {connected ? <Wifi size={14} /> : <WifiOff size={14} />}
              Firebase: {connected ? 'CONNECTED' : 'DISCONNECTED'}
            </span>
          </div>
        </section>

        {error ? (
          <div className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300">
            {error}
          </div>
        ) : null}

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SensorCard
            title="Nhiệt độ hiện tại"
            value={currentTemperature}
            unit="°C"
            subtitle={updatedAt}
            icon={Thermometer}
            accent="sky"
          />
          <SensorCard
            title="Độ ẩm hiện tại"
            value={currentHumidity}
            unit="%"
            subtitle={updatedAt}
            icon={Droplets}
            accent="cyan"
          />
          <SensorCard
            title="Ánh sáng"
            value={lightState}
            subtitle={`Digital: ${current?.lightDigital ?? '--'}`}
            icon={Lightbulb}
            accent="amber"
          />
          <RelayCard relay1={current?.relay1} relay2={current?.relay2} />
        </section>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Lịch sử cảm biến</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              {loading ? 'Đang tải dữ liệu...' : `${filteredData.length} bản ghi đang hiển thị`}
            </p>
          </div>
          <div className="flex max-w-full gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            {FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={`whitespace-nowrap rounded-xl px-3 py-2 text-xs font-bold transition ${filter === item.id
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950'
                  : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <section className="mt-4 grid gap-4 xl:grid-cols-2">
          <ChartShell title="Nhiệt độ theo thời gian" subtitle="Dữ liệu DHT22">
            <MetricLineChart
              data={filteredData}
              dataKey="temperature"
              name="Nhiệt độ"
              unit="°C"
              gradientId="temperatureGradient"
              stroke="#0ea5e9"
            />
          </ChartShell>

          <ChartShell title="Độ ẩm theo thời gian" subtitle="Dữ liệu DHT22">
            <MetricLineChart
              data={filteredData}
              dataKey="humidity"
              name="Độ ẩm"
              unit="%"
              gradientId="humidityGradient"
              stroke="#06b6d4"
            />
          </ChartShell>

          <ChartShell title={"Nhiệt độ & Độ ẩm"} subtitle="Biểu đồ kết hợp" className="xl:col-span-2">
            <DualMetricChart data={filteredData} />
          </ChartShell>

          <ChartShell title="Trạng thái ánh sáng theo thời gian" subtitle="Cảm biến digital: SÁNG / TỐI">
            <LightTimelineChart data={filteredData} />
          </ChartShell>
        </section>

        <footer className="mt-7 flex flex-col gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 dark:border-slate-800 dark:text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>ESP32 · Firebase Realtime Database</span>
          <span>Cập nhật hiện tại: {updatedAt}</span>
        </footer>
      </main>
    </div>
  )
}

export default App
