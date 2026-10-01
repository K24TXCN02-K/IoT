export default function SensorCard({
  title,
  value,
  unit,
  subtitle,
  icon: Icon,
  accent = 'sky',
}) {
  const accents = {
    sky: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
    cyan: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
    amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    violet: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
  }

  return (
    <div className="panel p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{title}</p>
          <div className="mt-3 flex items-end gap-2">
            <span className="truncate text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              {value}
            </span>
            {unit ? (
              <span className="mb-1 text-lg font-semibold text-slate-500 dark:text-slate-400">{unit}</span>
            ) : null}
          </div>
          <p className="mt-2 truncate text-xs text-slate-400 dark:text-slate-500">{subtitle}</p>
        </div>
        <div className={`rounded-2xl p-3 ${accents[accent] || accents.sky}`}>
          <Icon size={22} strokeWidth={2.1} />
        </div>
      </div>
    </div>
  )
}
