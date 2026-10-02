import { Power } from 'lucide-react'

const pad = (v) => String(v).padStart(2, '0')

const formatDateTime = (timestamp) => {
  const date = new Date(Number(timestamp) * 1000)
  if (Number.isNaN(date.getTime())) return '--'
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

export default function RelayHistoryTable({ data }) {
  // Build relay change history by detecting state transitions
  const relayEvents = []

  for (let i = 0; i < data.length; i++) {
    const row = data[i]
    const prev = i > 0 ? data[i - 1] : null

    const r1 = row.relay1 !== undefined ? Boolean(Number(row.relay1)) : null
    const r2 = row.relay2 !== undefined ? Boolean(Number(row.relay2)) : null
    const prevR1 = prev && prev.relay1 !== undefined ? Boolean(Number(prev.relay1)) : null
    const prevR2 = prev && prev.relay2 !== undefined ? Boolean(Number(prev.relay2)) : null

    if (r1 !== null && (i === 0 || r1 !== prevR1)) {
      relayEvents.push({
        time: row.timestamp,
        relay: 'Relay 1',
        state: r1,
      })
    }

    if (r2 !== null && (i === 0 || r2 !== prevR2)) {
      relayEvents.push({
        time: row.timestamp,
        relay: 'Relay 2',
        state: r2,
      })
    }
  }

  // Show newest first
  const sorted = [...relayEvents].reverse()

  if (sorted.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center text-sm text-slate-400 dark:text-slate-500">
        Chưa có dữ liệu relay
      </div>
    )
  }

  return (
    <div className="max-h-[400px] overflow-auto rounded-xl">
      <table className="w-full text-left text-sm">
        <thead className="sticky top-0 z-10 bg-slate-100 dark:bg-slate-800/90">
          <tr>
            <th className="px-4 py-3 font-bold text-slate-600 dark:text-slate-300">#</th>
            <th className="px-4 py-3 font-bold text-slate-600 dark:text-slate-300">Thời gian</th>
            <th className="px-4 py-3 font-bold text-slate-600 dark:text-slate-300">Relay</th>
            <th className="px-4 py-3 font-bold text-slate-600 dark:text-slate-300">Trạng thái</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {sorted.map((event, index) => (
            <tr
              key={`${event.time}-${event.relay}-${index}`}
              className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
            >
              <td className="px-4 py-3 tabular-nums text-slate-400 dark:text-slate-500">
                {index + 1}
              </td>
              <td className="whitespace-nowrap px-4 py-3 tabular-nums text-slate-700 dark:text-slate-200">
                {formatDateTime(event.time)}
              </td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-200">
                  <Power size={14} />
                  {event.relay}
                </span>
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${
                    event.state
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      event.state ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                  />
                  {event.state ? 'BẬT' : 'TẮT'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
