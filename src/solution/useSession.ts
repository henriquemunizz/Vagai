import { useRouteLoaderData } from 'react-router-dom'
import type { sessionLoader } from './routes'

export function useSession() {
  return useRouteLoaderData('solution') as Awaited<ReturnType<typeof sessionLoader>>
}
