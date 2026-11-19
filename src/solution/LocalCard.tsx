import { Link } from 'react-router-dom'
import { categorias, endereco, moeda, type Local } from './api'

interface LocalCardProps {
  local: Local
  fromFavorites?: boolean
  search?: string
  children?: React.ReactNode
}

export function LocalCard({ local, fromFavorites = false, search = '', children }: LocalCardProps) {
  return (
    <article className="local-card">
      <Link className="local-card-link group" to={'/solucao/locais/' + local.id} state={{ fromFavorites, search }}>
        <span className={'category-chip category-' + local.tipo.toLowerCase()}>{categorias[local.tipo]}</span>
        <h3 className="mt-4 text-2xl leading-tight">{local.nome}</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-600">{endereco(local)}</p>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-6">
          <span className="text-sm font-semibold">
            {local.tipo === 'GRATUITO' ? 'Sem cobrança' : local.primeiraHora === null ? 'Tarifa não informada' : moeda(local.primeiraHora) + ' na primeira hora'}
          </span>
          <span className="card-action">Ver detalhes <span aria-hidden="true">→</span></span>
        </div>
      </Link>
      {children}
    </article>
  )
}
