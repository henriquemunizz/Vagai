import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main className="flex flex-1 items-center justify-center bg-ink px-5 py-20 text-center text-white">
      <div className="enter-rise">
        <p className="font-heading text-8xl font-black leading-none text-brand sm:text-9xl">404</p>
        <h1 className="mt-4 text-3xl sm:text-4xl">Página não encontrada</h1>
        <p className="mt-3 text-zinc-300">Confira o endereço ou volte à página inicial do Vagaí.</p>
        <Link className="mt-7 inline-block rounded-full bg-brand px-6 py-3 font-bold text-black hover:bg-white" to="/">Voltar ao início</Link>
      </div>
    </main>
  )
}
