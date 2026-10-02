import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const tooltipStyle = {
  background: 'var(--chart-tooltip-bg)',
  border: '1px solid var(--chart-tooltip-border)',
  borderRadius: 14,
  color: 'var(--chart-tooltip-text)',
}

const formatDuration = (seconds) => {
  const value = Math.max(0, Math.round(Number(seconds) || 0))
  if (value < 60) return `${value}s`

  const minutes = Math.round(value / 60)
  if (minutes < 60) return `${minutes} phút`

  const hours = Math.floor(minutes / 60)
  const restMinutes = minutes % 60
  return restMinutes ? `${hours} giờ ${restMinutes} phút` : `${hours} giờ`
}

export default function LightDonutChart({ darkSeconds, brightSeconds }) {
  const total = darkSeconds + brightSeconds
  const data = [
    { name: 'TỐI', value: darkSeconds, color: '#0ea5e9' },
    { name: 'SÁNG', value: brightSeconds, color: '#f59e0b' },
  ]

  const darkPercent = total ? Math.round((darkSeconds / total) * 100) : 0

  return (
    <div className="relative h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="61%"
            outerRadius="84%"
            paddingAngle={3}
            stroke="none"
            isAnimationActive={false}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} formatter={(value) => formatDuration(value)} />
        </PieChart>
      </ResponsiveContainer>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black text-slate-900 dark:text-white">{darkPercent}%</span>
        <span className="mt-1 text-xs font-semibold text-slate-400">TỐI</span>
      </div>
    </div>
  )
}
