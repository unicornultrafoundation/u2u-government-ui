import { useContext } from 'react'
import { RefreshContext } from '../context'

export const useRefresh = () => {
  const { fast, medium, slow } = useContext(RefreshContext)
  return { fastRefresh: fast, mediumRefresh: medium, slowRefresh: slow }
}

