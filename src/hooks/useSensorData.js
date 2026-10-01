import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const DATABASE_URL = (
  import.meta.env.VITE_FIREBASE_DATABASE_URL ||
  'https://esp32-sensor-dev-default-rtdb.asia-southeast1.firebasedatabase.app'
).replace(/\/$/, '')

const toRecordArray = (history) => {
  if (!history || typeof history !== 'object') return []

  return Object.entries(history)
    .map(([id, value]) => ({ id, ...value }))
    .filter((item) => Number.isFinite(Number(item.timestamp)))
    .sort((a, b) => Number(a.timestamp) - Number(b.timestamp))
}

export function useSensorData() {
  const [current, setCurrent] = useState(null)
  const [history, setHistory] = useState([])
  const [connected, setConnected] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const historyTimer = useRef(null)

  const fetchHistory = useCallback(async () => {
    const response = await fetch(`${DATABASE_URL}/sensor/history.json`, {
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error(`Không đọc được history (${response.status})`)
    }

    const data = await response.json()
    setHistory(toRecordArray(data))
  }, [])

  const fetchInitialData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const [currentResponse] = await Promise.all([
        fetch(`${DATABASE_URL}/sensor/current.json`, { cache: 'no-store' }),
        fetchHistory(),
      ])

      if (!currentResponse.ok) {
        throw new Error(`Không đọc được current (${currentResponse.status})`)
      }

      setCurrent(await currentResponse.json())
      setConnected(true)
    } catch (err) {
      setError(err.message)
      setConnected(false)
    } finally {
      setLoading(false)
    }
  }, [fetchHistory])

  useEffect(() => {
    fetchInitialData()

    historyTimer.current = window.setInterval(() => {
      fetchHistory().catch((err) => setError(err.message))
    }, 15000)

    return () => {
      if (historyTimer.current) window.clearInterval(historyTimer.current)
    }
  }, [fetchHistory, fetchInitialData])

  const refresh = useCallback(async () => {
    await fetchInitialData()
  }, [fetchInitialData])

  return useMemo(
    () => ({ current, history, connected, loading, error, refresh }),
    [current, history, connected, loading, error, refresh],
  )
}
