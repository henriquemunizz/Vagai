import { accessTarget } from './access'
import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from 'react-router-dom'
import { api, ApiError, sessao, type Local, type Avaliacao, type Relato, type Regra, type Favorito } from './api'

export async function sessionLoader({ request }: LoaderFunctionArgs) {
  try { return { user: await sessao(request.signal), error: '' } }
  catch (e) { return { user: null, error: message(e) } }
}

function message(error: unknown) {
  return error instanceof Error ? error.message : 'Não foi possível concluir o pedido.'
}
function failure(error: unknown, target?: 'cadastrar' | 'favoritos') {
  if (error instanceof ApiError && error.status === 401) return redirect(target ? '/solucao?destino=' + target : '/solucao?entrar=1')
  return { error: message(error) }
}
const field = (data: FormData, name: string) => String(data.get(name) ?? '').trim()

export async function accountAction({ request }: ActionFunctionArgs) {
  const form = await request.formData()
  const target = accessTarget(new URL(request.url).searchParams.get('destino'))
  try {
    if (field(form, 'acao') === 'sair') {
      try { await api('/usuarios/logout', 'POST') }
      catch (e) { if (!(e instanceof ApiError && e.status === 401)) throw e }
    } else {
      const conta = { nome: field(form, 'nome'), senha: String(form.get('senha') ?? '') }
      if (field(form, 'acao') === 'cadastrar') {
        await api('/usuarios', 'POST', conta)
        return redirect('/solucao?cadastro=ok' + (target ? '&destino=' + target : ''))
      }
      await api('/usuarios/login', 'POST', conta)
      if (target) return redirect('/solucao/' + target)
    }
    return redirect('/solucao')
  } catch (e) { return { error: message(e) } }
}

export async function searchLoader({ request }: LoaderFunctionArgs) {
  const params = new URL(request.url).searchParams
  const filtro = new URLSearchParams()
  for (const key of ['rua', 'bairro']) {
    const value = params.get(key)?.trim()
    if (value) filtro.set(key, value)
  }
  const locais = await api<Local[]>('/estacionamentos?' + filtro, 'GET', undefined, request.signal)
  return params.get('tipo') ? locais.filter(p => p.tipo === params.get('tipo')) : locais
}

export async function createAction({ request }: ActionFunctionArgs) {
  const f = await request.formData()
  const tipo = field(f, 'tipo')
  const tarifa = (key: string) => tipo === 'GRATUITO' || !field(f, key) ? null : Number(field(f, key))
  try {
    const local = await api<Local>('/estacionamentos', 'POST', {
      nome: field(f, 'nome'), tipo, descricao: field(f, 'descricao') || null,
      rua: field(f, 'rua'), bairro: field(f, 'bairro'), numero: field(f, 'numero'),
      primeiraHora: tarifa('primeiraHora'), demaisHoras: tarifa('demaisHoras'), ativo: 1,
    })
    return redirect('/solucao/locais/' + local.id)
  } catch (e) { return failure(e, 'cadastrar') }
}

export async function detailLoader({ params, request }: LoaderFunctionArgs) {
  const base = '/estacionamentos/' + encodeURIComponent(params.id!)
  const get = <T,>(path: string) => api<T>(path, 'GET', undefined, request.signal)
  const [local, regras, relatos, avaliacoes] = await Promise.all([
    get<Local>(base), get<Regra[]>(base + '/regras'), get<Relato[]>(base + '/reportes'), get<Avaliacao[]>(base + '/avaliacoes'),
  ])
  return { local, regras, relatos, avaliacoes }
}

export async function detailAction({ params, request }: ActionFunctionArgs) {
  const f = await request.formData()
  const id = Number(params.id)
  const base = '/estacionamentos/' + id
  try {
    switch (field(f, 'acao')) {
      case 'favorito':
        await api('/favoritos', 'POST', { idEstacionamento: id })
        return { success: 'Local salvo nos favoritos.' }
      case 'relato':
        await api(base + '/reportes', 'POST', { tipo: field(f, 'tipo'), observacao: field(f, 'observacao') || null })
        return { success: 'Relato publicado.' }
      case 'avaliacao': {
        const nota = Number(field(f, 'nota'))
        const comentario = field(f, 'comentario') || null
        const anterior = field(f, 'avaliacaoId')
        if (anterior) await api('/avaliacoes/' + anterior, 'PUT', { idEstacionamento: id, nota, comentario })
        else await api(base + '/avaliacoes', 'POST', { nota, comentario })
        return { success: 'Avaliação salva.' }
      }
      case 'regra': {
        const minutos = (key: string) => {
          const [h, m] = field(f, key).split(':').map(Number)
          return h * 60 + m
        }
        await api('/regras', 'POST', { idEstacionamento: id, descricao: field(f, 'descricao'), diaSemana: Number(field(f, 'diaSemana')),
          inicio: minutos('inicio'), fim: minutos('fim'), ativo: 1, tipo: field(f, 'tipo') })
        return { success: 'Regra cadastrada.' }
      }
      default: return { error: 'Ação desconhecida.' }
    }
  } catch (e) { return failure(e) }
}

export async function favoritesLoader({ request }: LoaderFunctionArgs) {
  try {
    const favoritos = await api<Favorito[]>('/usuarios/me/favoritos', 'GET', undefined, request.signal)
    return await Promise.all(favoritos.map(async f => ({
      ...f, local: await api<Local>('/estacionamentos/' + f.idEstacionamento, 'GET', undefined, request.signal),
    })))
  } catch (e) {
    if (e instanceof ApiError && e.status === 401) throw redirect('/solucao?destino=favoritos')
    throw e
  }
}

export async function favoriteAction({ request }: ActionFunctionArgs) {
  const f = await request.formData()
  try { await api('/favoritos/' + encodeURIComponent(field(f, 'id')), 'DELETE'); return { success: 'Favorito removido.' } }
  catch (e) { return failure(e, 'favoritos') }
}
