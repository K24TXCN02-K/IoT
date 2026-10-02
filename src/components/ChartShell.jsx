export default function ChartShell({ title, subtitle, children, actions, className }) {
  return (
    <section className={`panel min-w-0 p-5 sm:p-6 ${className || ''}`}>
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h2>
          {subtitle ? (
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{subtitle}</p>
          ) : null}
        </div>
        {actions}
      </div>
      <div className="h-[310px] w-full">{children}</div>
    </section>
  )
}
