import { useCallback, useEffect, useState } from 'react'

function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(Boolean(url))
  const [error, setError] = useState('')
  const [requestNumber, setRequestNumber] = useState(0)

  const refetch = useCallback(() => {
    setRequestNumber((current) => current + 1)
  }, [])

  useEffect(() => {
    if (!url) return undefined

    const controller = new AbortController()

    const loadData = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(url, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Ошибка сервера: ${response.status} ${response.statusText}`)
        }

        const result = await response.json()
        setData(result)
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          const message = requestError instanceof TypeError
            ? 'Не удалось подключиться к API. Проверьте интернет-соединение.'
            : requestError.message || 'Не удалось загрузить данные.'
          setError(message)
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadData()

    return () => controller.abort()
  }, [url, requestNumber])

  return { data, loading, error, refetch }
}

export default useFetch
