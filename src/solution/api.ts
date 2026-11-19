const base = (import.meta.env.VITE_API_URL || 'https://vagai-springboot.onrender.com').replace(/\/$/, '')

export interface Usuario { id: number; nome: string }
export const categorias = { GRATUITO: 'Gratuito', ROTATIVO: 'Rotativo', PRIVADO: 'Privado' }
export interface Local {
  id: number
  nome: string
  descricao: string | null
  tipo: keyof typeof categorias
  rua: string
  numero: string
  bairro: string
  primeiraHora: number | null
  demaisHoras: number | null
  idUsuarioCriador: number | null
  ativo: number
}
export interface Favorito { id: number; idEstacionamento: number }
export interface Avaliacao { id: number; idUsuario: number; nota: number; comentario: string | null }
export interface Relato { id: number; tipo: 'SEM_VAGA' | 'VAGA_ENCONTRADA'; observacao: string | null; data: string; atual: boolean }
export interface Regra { id: number; diaSemana: number; inicio: number; fim: number; descricao: string; tipo: string; ativo: number }

export class ApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export async function api<T>(path: string, method = 'GET', body?: object, signal?: AbortSignal): Promise<T> {
  let response: Response
  try {
    response = await fetch(base + path, {
      method, signal, credentials: 'include', cache: 'no-store',
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch (error) {
    if (signal?.aborted) throw error
    throw new Error('Não foi possível conectar à API do Vagaí. Confira a conexão e tente novamente.', { cause: error })
  }
  if (!response.ok) {
    const data = await response.json().catch(() => null)
    throw new ApiError(response.status, data?.mensagem || 'A API não conseguiu concluir o pedido.')
  }
  return response.status === 204 ? undefined as T : response.json()
}

export async function sessao(signal?: AbortSignal) {
  try { return await api<Usuario>('/usuarios/me', 'GET', undefined, signal) }
  catch (error) {
    if (error instanceof ApiError && error.status === 401) return null
    throw error
  }
}
export const endereco = (p: Local) => `${p.rua}, ${p.numero} · ${p.bairro}`
export const moeda = (n: number | null) => n == null ? 'Não informada' : n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
