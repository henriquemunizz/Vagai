import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <main className="flex-1">
      <section className="bg-black text-white">
        <div className="container-page grid items-center gap-6 py-12 sm:py-16 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="eyebrow text-brand">FIAP · Global Solution 2026/2</p>
            <h1 className="mt-6 max-w-xl text-5xl leading-[1.02] tracking-tight sm:text-7xl">
              Onde posso <span className="text-brand">estacionar</span> perto do meu destino?
            </h1>
            <p className="mt-6 max-w-lg leading-7 text-zinc-300">O Vagaí parte dessa pergunta para estudar a procura por estacionamento na região da Avenida Paulista, em São Paulo.</p>
            <Link to="/sobre" className="mt-7 inline-block rounded-full bg-brand px-6 py-3 font-bold text-black hover:bg-white">Conheça o projeto <span aria-hidden="true">↗</span></Link>
          </div>
          <img src="/images/vagai.png" alt="Marca Vagaí, um carro branco com faixas verde e rosa" className="mx-auto w-full max-w-sm md:max-w-lg" />
        </div>
      </section>
      <section className="container-page grid gap-6 py-12 sm:grid-cols-2 sm:py-16">
        <div className="border-t-4 border-pink pt-5">
          <p className="eyebrow">CitizenTech</p>
          <h2 className="mt-2 text-3xl">Uma questão de mobilidade urbana</h2>
        </div>
        <div className="pt-2 leading-7">
          <p>Dar voltas no quarteirão também faz parte do tempo de uma viagem. Nossa equipe quer entender quanto desse percurso poderia ser evitado se o motorista conhecesse as opções perto do destino.</p>
          <Link to="/integrantes" className="mt-4 inline-block font-bold underline underline-offset-4">Conheça a equipe</Link>
        </div>
      </section>
    </main>
  )
}
