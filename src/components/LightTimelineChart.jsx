import { useMemo } from 'react'

const isDark = (item) => String(item.lightState).toUpperCase() === 'DARK' || Number(item.lightDigital) === 1

const formatTime = (timestamp) => {
  const date = new Date(Number(timestamp) * 1000)
  if (Number.isNaN(date.getTime())) return '--:--'
  return date.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

const median = (values) => {
  if (!values.length) return 0
  const sorted = [...values].sort((a, b) => a - b)
  return sorted[Math.floor(sorted.length / 2)]
}

const buildSegments = (data) => {
  const points = data
    .map((item) => ({
      ...item,
      timestamp: Number(item.timestamp),
      status: isDark(item) ? 'dark' : 'bright',
    }))
    .filter((item) => Number.isFinite(item.timestamp))

  if (!points.length) {
    return {
      segments: [],
      startLabel: '--:--',
      endLabel: '--:--',
    }
  }

  const gaps = points
    .slice(1)
    .map((item, index) => item.timestamp - points[index].timestamp)
    .filter((value) => value > 0)
  const fallbackGap = median(gaps) || 1
  const start = points[0].timestamp
  const end = points[points.length - 1].timestamp + fallbackGap

  const segments = points.reduce((acc, item, index) => {
    const nextTimestamp = points[index + 1]?.timestamp ?? end
    const segmentEnd = nextTimestamp > item.timestamp ? nextTimestamp : item.timestamp + fallbackGap
    const previous = acc[acc.length - 1]

    if (previous?.status === item.status) {
      previous.end = segmentEnd
    } else {
      acc.push({
        status: item.status,
        start: item.timestamp,
        end: segmentEnd,
      })
    }

    return acc
  }, [])

  const total = Math.max(end - start, fallbackGap)

  return {
    segments: segments.map((segment) => ({
      ...segment,
      left: ((segment.start - start) / total) * 100,
      width: ((segment.end - segment.start) / total) * 100,
    })),
    startLabel: formatTime(start),
    endLabel: formatTime(end),
  }
}

function Lane({ label, status, color, segments }) {
  return (
    <>
      <div className="flex items-center justify-end pr-3 text-xs font-black text-slate-500 dark:text-slate-400">
        {label}
      </div>
      <div className="relative overflow-hidden rounded-xl bg-slate-100 ring-1 ring-inset ring-slate-200 dark:bg-slate-800/70 dark:ring-slate-700">
        {segments
          .filter((segment) => segment.status === status)
          .map((segment) => (
            <div
              key={`${segment.status}-${segment.start}`}
              title={`${label}: ${formatTime(segment.start)} - ${formatTime(segment.end)}`}
              className={`absolute inset-y-2 rounded-lg ${color}`}
              style={{
                left: `${segment.left}%`,
                width: `${segment.width}%`,
              }}
            />
          ))}
      </div>
    </>
  )
}

export default function LightTimelineChart({ data }) {
  const { segments, startLabel, endLabel } = useMemo(() => buildSegments(data), [data])

  if (!segments.length) {
    return (
      <div className="flex h-full items-center justify-center text-sm font-semibold text-slate-400">
        Chưa có dữ liệu ánh sáng
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col justify-center">
      <div className="grid h-48 grid-cols-[52px_1fr] grid-rows-2 gap-y-4">
        <Lane
          label="TỐI"
          status="dark"
          color="bg-sky-500 dark:bg-sky-400"
          segments={segments}
        />
        <Lane
          label="SÁNG"
          status="bright"
          color="bg-amber-400 dark:bg-amber-300"
          segments={segments}
        />
      </div>

      <div className="ml-[52px] mt-4 flex justify-between text-[11px] font-semibold text-slate-400 dark:text-slate-500">
        <span>{startLabel}</span>
        <span>{endLabel}</span>
      </div>
    </div>
  )
}
