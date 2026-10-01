import {
  Cloud,
  RefreshCw,
  Wifi,
  WifiOff,
} from 'lucide-react'
import { useSensorData } from './hooks/useSensorData.js'

const formatDateTime = (current) => {
  if (current?.datetime) return current.datetime
  if (!current?.timestamp) return '--'
  const date = new Date(Number(current.timestamp) * 1000)
  if (Number.isNaN(date.getTime())) return '--'
  return date.toLocaleString('vi-VN')
}

function App() {
  const { current, connected, error, refresh } = useSensorData()
  const updatedAt = formatDateTime(current)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
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

        <footer className="mt-7 flex flex-col gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 dark:border-slate-800 dark:text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>ESP32 · Firebase Realtime Database</span>
          <span>Cập nhật hiện tại: {updatedAt}</span>
        </footer>
      </main>
    </div>
  )
}

export default App
