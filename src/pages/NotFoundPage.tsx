import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main className="container-page flex-1 py-24">
      <p className="eyebrow">Erro 404</p>
      <h1 className="my-4 text-5xl">Página não encontrada</h1>
      <Link className="underline underline-offset-4" to="/">Voltar ao início</Link>
    </main>
  )
}
