import { PageHeader } from '../components/PageHeader'

export function AboutPage() {
  return (
    <main className="flex-1">
      <PageHeader title="Sobre o Vagaí" description="Uma ideia de estudantes da FIAP que conhecem a dificuldade de estacionar em São Paulo." />
      <div className="container-page grid gap-5 py-14 md:grid-cols-2">
        <section className="enter-rise rounded-3xl border border-black/10 bg-brand/15 p-7 sm:p-9 md:col-span-2">
          <h2 className="text-2xl">O ponto de partida</h2>
          <div className="mt-4 max-w-3xl space-y-4 leading-7 text-zinc-800">
            <p>Alguns integrantes da nossa equipe dirigem em São Paulo e sabem como é chegar perto de um compromisso e ainda precisar dar voltas no quarteirão para estacionar. Foi daí que veio a ideia do Vagaí. Queríamos saber onde deixar o carro perto do destino antes mesmo de sair de casa.</p>
            <p>Levamos essa pergunta para a Global Solution 2026/2 da FIAP. O tema CitizenTech nos convidou a pensar em como a tecnologia poderia ajudar outras pessoas que passam pela mesma situação.</p>
          </div>
        </section>
        <section className="rounded-3xl border border-black/10 bg-zinc-50 p-7 sm:p-9">
          <h2 className="text-2xl">Quem conhece o bairro pode contribuir</h2>
          <p className="mt-4 leading-7 text-zinc-800">Na proposta do Vagaí, cada motorista poderá cadastrar um local que conhece, indicar o endereço e acrescentar detalhes. A entrada de um estacionamento, por exemplo, pode ficar na rua de trás. Para quem vai ao bairro pela primeira vez, essa dica já muda a chegada.</p>
        </section>
        <section className="rounded-3xl border border-black/10 p-7 sm:p-9">
          <h2 className="text-2xl">Três tipos de estacionamento</h2>
          <p className="mt-4 leading-7 text-zinc-800">A comunidade poderá indicar trechos onde é permitido estacionar gratuitamente, áreas de estacionamento rotativo, como a Zona Azul, e estacionamentos privados. Ao cadastrar um local, o motorista poderá incluir o horário indicado na placa ou o preço informado na entrada.</p>
        </section>
      </div>
    </main>
  )
}
