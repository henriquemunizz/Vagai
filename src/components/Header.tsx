import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Início' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/integrantes', label: 'Integrantes' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contato', label: 'Contato' },
]

export function Header() {
  return (
    <header className="border-b border-white/15 bg-black text-white">
      <nav aria-label="Navegação principal" className="container-page flex flex-wrap items-center justify-between gap-3 py-4">
        <NavLink to="/" className="flex items-center gap-2 font-heading text-3xl font-black">
          <img src="/images/vagai.png" alt="" className="w-11" /> Vagaí
        </NavLink>
        <div className="flex flex-wrap gap-1">
          {links.map(({ to, label }) => (
            <NavLink key={to} to={to} end className={({ isActive }) =>
              'rounded-full px-3 py-2 text-sm font-semibold ' +
              (isActive ? 'bg-brand text-black' : 'hover:bg-white/15')
            }>{label}</NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}
