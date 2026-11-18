import { Link } from 'react-router-dom'

const projectLinks = [
  {
    to: '/sobre', title: 'Por dentro do projeto',
    text: 'Conheça o recorte do estudo e por que a equipe escolheu olhar para a procura por estacionamento.',
    style: 'bg-brand lg:col-span-7',
  },
  {
    to: '/integrantes', title: 'Quem faz o Vagaí',
    text: 'Conheça os cinco estudantes da FIAP que desenvolveram a proposta.',
    style: 'bg-ink text-white lg:col-span-5',
  },
  {
    to: '/faq', title: 'Perguntas frequentes',
    text: 'Consulte as dúvidas sobre o piloto, a região escolhida e os objetivos do grupo.',
    style: 'bg-white ring-1 ring-black/10 lg:col-span-5',
  },
  {
    to: '/contato', title: 'Converse com a equipe',
    text: 'Tem uma pergunta sobre o estudo? Encontre os canais de contato dos integrantes.',
    style: 'bg-[#ffe6f1] lg:col-span-7',
  },
]

export function HomePage() {
  return (
    <main className="flex-1">
      <section className="bg-black text-white">
        <div className="container-page grid items-center gap-8 py-14 sm:py-20 md:grid-cols-[1.15fr_1fr]">
          <div className="enter-rise">
            <p className="eyebrow text-brand">FIAP · Global Solution 2026/2</p>
            <h1 className="mt-6 max-w-xl text-5xl leading-[1.02] tracking-tight sm:text-7xl">
              Onde posso <span className="text-brand">estacionar</span> perto do meu destino?
            </h1>
            <p className="mt-6 max-w-lg leading-7 text-zinc-300">
              Para quem chega de carro à Avenida Paulista, a viagem pode continuar por mais alguns quarteirões. O Vagaí estuda esse último trecho em busca de uma vaga.
            </p>
            <a href="#piloto" className="mt-7 inline-flex items-center gap-4 rounded-full bg-brand px-6 py-3 font-bold text-black hover:bg-white">
              Conheça o piloto <span aria-hidden="true">↓</span>
            </a>
          </div>
          <img src="/images/vagai.png" alt="Marca Vagaí, um carro branco com faixas verde e rosa"
            className="enter-rise mx-auto w-full max-w-xs sm:max-w-sm md:max-w-lg motion-safe:[animation-delay:100ms]" />
        </div>
      </section>

      <section id="piloto" aria-labelledby="titulo-piloto" className="container-page grid items-start gap-8 py-16 sm:py-24 md:grid-cols-2 md:gap-16">
        <div>
          <p className="eyebrow">Avenida Paulista · São Paulo</p>
          <h2 id="titulo-piloto" className="mt-4 text-4xl leading-tight tracking-tight sm:text-5xl">O que acontece depois que o motorista chega?</h2>
          <p className="mt-5 max-w-lg leading-7 text-zinc-700">Uma rua pode ter vagas gratuitas, outra pode exigir Zona Azul. Um estacionamento privado pode ficar mais perto da entrada do destino. Descobrir essas alternativas só depois de chegar faz parte do problema que motivou o Vagaí.</p>
        </div>
        <div className="rounded-3xl border border-black/10 bg-zinc-50 p-7 sm:p-9">
          <h3 className="text-2xl">O que queremos medir</h3>
          <dl className="mt-5 divide-y divide-black/10">
            <div className="pb-5">
              <dt className="font-bold">Tempo de procura</dt>
              <dd className="mt-1 leading-7 text-zinc-700">Quantos minutos passam entre chegar à região do destino e conseguir estacionar?</dd>
            </div>
            <div className="pt-5">
              <dt className="font-bold">Distância percorrida</dt>
              <dd className="mt-1 leading-7 text-zinc-700">Quantos quilômetros o motorista roda nesse intervalo, inclusive ao voltar a uma rua por onde já passou?</dd>
            </div>
          </dl>
        </div>
      </section>

      <section aria-labelledby="titulo-projeto" className="border-t border-zinc-200 bg-zinc-50">
        <div className="container-page py-16 sm:py-20">
          <h2 id="titulo-projeto" className="text-4xl tracking-tight">Explore o Vagaí</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
            {projectLinks.map(({ to, title, text, style }) => (
              <Link key={to} to={to} className={`card-lift group flex flex-col rounded-3xl p-7 sm:p-9 ${style}`}>
                <span aria-hidden="true" className="self-end rounded-full border border-current/25 px-3 py-1.5 motion-safe:transition-transform motion-safe:group-hover:translate-x-1">→</span>
                <h3 className="mt-6 text-2xl sm:text-3xl">{title}</h3>
                <p className="mt-2 max-w-md leading-7">{text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
