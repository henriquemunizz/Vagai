import { LocalCard } from './LocalCard'
import { useState } from 'react'
import { Form, Link, Navigate, useLoaderData, useSearchParams } from 'react-router-dom'
import { categorias, type Local } from './api'
import { Feedback, Submit } from './Solution'
import { useSession } from './useSession'
import type { favoritesLoader } from './routes'

export function SearchPage() {
  const locais = useLoaderData() as Local[]
  const [params] = useSearchParams()
  return <section className="space-y-6">
    <Link to="/solucao" className="solution-link">Voltar à solução</Link>
    <h2 className="text-3xl">Buscar estacionamento</h2>
    <Form method="get" key={params.toString()} className="solution-form solution-panel md:grid-cols-3">
      <label>Rua<input className="field" name="rua" defaultValue={params.get('rua') || ''} /></label>
      <label>Bairro<input className="field" name="bairro" defaultValue={params.get('bairro') || ''} /></label>
      <label>Categoria<select className="field" name="tipo" defaultValue={params.get('tipo') || ''}>
        <option value="">Todas</option>{Object.entries(categorias).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
      </select></label>
      <div className="flex flex-wrap items-center gap-4 md:col-span-3">
        <Submit>Buscar</Submit>
        {['rua', 'bairro', 'tipo'].some(key => params.get(key)) && <Link className="solution-link" to="/solucao/locais">Limpar filtros</Link>}
      </div>
    </Form>
    {locais.length ? <>
      <h3 className="text-lg">{locais.length} {locais.length === 1 ? 'local encontrado' : 'locais encontrados'}</h3>
      <div className="grid gap-4 md:grid-cols-2">{locais.map(local => <LocalCard key={local.id} local={local} search={params.toString()} />)}</div>
    </> : <div className="empty-panel">
      <h3>Nenhum local encontrado</h3><p>Experimente outra rua, outro bairro ou outra categoria.</p>
      <Link className="solution-link" to="/solucao/cadastrar">Cadastrar um local</Link>
    </div>}
  </section>
}

export function CreatePage() {
  const { user } = useSession()
  const [tipo, setTipo] = useState('GRATUITO')
  if (!user) return <Navigate replace to="/solucao?destino=cadastrar" />
  return <section className="solution-panel mx-auto max-w-2xl">
    <Link className="solution-link" to="/solucao">Voltar à solução</Link>
    <h2>Cadastrar local</h2><Link to="/solucao/locais" className="solution-link">Conferir locais já cadastrados</Link>
    <Form method="post" className="solution-form">
      <label>Nome do local<input className="field" name="nome" required maxLength={100} /></label>
      <label>Categoria<select className="field" name="tipo" value={tipo} onChange={e => setTipo(e.target.value)}>
        {Object.entries(categorias).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
      </select></label>
      <label>Rua<input className="field" name="rua" required maxLength={150} /></label>
      <label>Número ou referência<input className="field" name="numero" required maxLength={20} /></label>
      <label>Bairro<input className="field" name="bairro" required maxLength={100} /></label>
      {tipo !== 'GRATUITO' && <div className="grid gap-4 sm:grid-cols-2">
        <label>Primeira hora (R$)<input className="field" name="primeiraHora" type="number" min="0" max="99999999.99" step="0.01" required={tipo === 'PRIVADO'} /></label>
        <label>Hora adicional (R$)<input className="field" name="demaisHoras" type="number" min="0" max="99999999.99" step="0.01" required={tipo === 'PRIVADO'} /></label>
      </div>}
      <label>Descrição (opcional)<textarea className="field" name="descricao" maxLength={255} /></label>
      <Submit>Salvar local</Submit><Feedback />
    </Form>
  </section>
}

export function FavoritesPage() {
  const favoritos = useLoaderData() as Awaited<ReturnType<typeof favoritesLoader>>
  return <section className="space-y-5">
    <Link className="solution-link" to="/solucao">Voltar à solução</Link><h2 className="text-3xl">Meus favoritos</h2>
    <Feedback />
    {!favoritos.length && <div className="empty-panel">
      <span aria-hidden="true" className="favorite-symbol">☆</span>
      <h3>Seus locais salvos aparecerão aqui</h3>
      <p>Abra um estacionamento na busca e escolha “Salvar nos favoritos”.</p>
      <Link className="solution-button" to="/solucao/locais">Buscar estacionamento</Link>
    </div>}
    <div className="grid gap-4 md:grid-cols-2">{favoritos.map(f => {
      const remove = <Form method="post" className="border-t border-zinc-100 px-6 py-2">
        <input type="hidden" name="id" value={f.id} /><Submit secondary>Remover dos favoritos</Submit>
      </Form>
      return f.local ? <LocalCard key={f.id} local={f.local} fromFavorites>{remove}</LocalCard> :
        <article key={f.id} className="local-card"><h3 className="p-6 text-lg">Local indisponível</h3>{remove}</article>
    })}</div>
  </section>
}
