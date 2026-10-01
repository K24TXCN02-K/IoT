import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle({ darkMode, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-white"
      title={darkMode ? 'Chuyển sang Light mode' : 'Chuyển sang Dark mode'}
      aria-label={darkMode ? 'Chuyển sang Light mode' : 'Chuyển sang Dark mode'}
    >
      {darkMode ? <Sun size={19} /> : <Moon size={19} />}
    </button>
  )
}
