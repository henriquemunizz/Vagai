import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container-page flex flex-wrap items-center justify-between gap-5 py-7 text-sm">
        <p><strong className="mr-3 font-heading text-xl">Vagaí</strong> FIAP · Global Solution 2026/2</p>
        <Link className="underline decoration-brand underline-offset-4" to="/contato">Contato com a equipe</Link>
      </div>
    </footer>
  )
}
