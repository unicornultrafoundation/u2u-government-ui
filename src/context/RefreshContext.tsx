import { FAST_REFRESH_INTERVAL, MEDIUM_REFRESH_INTERVAL, SLOW_REFRESH_INTERVAL } from '../contants'
import React, { useState, useEffect } from 'react'
const RefreshContext = React.createContext({ slow: 0, medium: 0, fast: 0 })

// This context maintain 2 counters that can be used as a dependencies on other hooks to force a periodic refresh
const RefreshContextProvider = ({ children }: any) => {
  const [slow, setSlow] = useState(0)
  const [medium, setMedium] = useState(0)
  const [fast, setFast] = useState(0)

  useEffect(() => {
    const interval = setInterval(async () => {
      setFast((prev) => prev + 1)
    }, FAST_REFRESH_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(async () => {
      setMedium((prev) => prev + 1)
    }, MEDIUM_REFRESH_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(async () => {
      setSlow((prev) => prev + 1)
    }, SLOW_REFRESH_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  return <RefreshContext.Provider value={{ slow, medium, fast }}>{children}</RefreshContext.Provider>
}

export { RefreshContext, RefreshContextProvider }
