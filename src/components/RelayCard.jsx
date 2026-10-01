import { Power } from 'lucide-react'

function RelayPill({ label, on }) {
  return (
    <div className="flex flex-1 items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950/60">
      <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">{label}</span>
      <span
        className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-bold ${
          on
            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
            : 'bg-slate-200/70 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
        }`}
      >
        <span className={`h-2 w-2 rounded-full ${on ? 'bg-emerald-500' : 'bg-slate-400'}`} />
        {on ? 'ON' : 'OFF'}
      </span>
    </div>
  )
}

export default function RelayCard({ relay1, relay2 }) {
  return (
    <div className="panel p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Relay</p>
          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">Trạng thái điều khiển hiện tại</p>
        </div>
        <div className="rounded-2xl bg-violet-500/10 p-3 text-violet-600 dark:text-violet-400">
          <Power size={22} />
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        <RelayPill label="R1" on={Boolean(relay1)} />
        <RelayPill label="R2" on={Boolean(relay2)} />
      </div>
    </div>
  )
}
