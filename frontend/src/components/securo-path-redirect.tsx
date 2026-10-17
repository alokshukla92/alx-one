import { Navigate, useLocation } from 'react-router-dom'
import { SECURO_BASE_PATH } from '@/lib/securo-path'

/** Keeps old `/transactions`-style bookmarks working after Securo moved under `/securo`. */
export function SecuroPathRedirect() {
  const { pathname, search, hash } = useLocation()
  return <Navigate to={`${SECURO_BASE_PATH}${pathname}${search}${hash}`} replace />
}
