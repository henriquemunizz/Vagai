import { PageHeader } from '../components/PageHeader'

export function AboutPage() {
  return (
    <main className="flex-1">
      <PageHeader title="Sobre o Vagaí" description="Uma ideia de estudantes da FIAP que conhecem a dificuldade de estacionar em São Paulo." />
      <div className="container-page py-14">
        <section className="enter-rise mx-auto max-w-3xl rounded-3xl border border-black/10 bg-brand/15 p-7 sm:p-9">
          <h2 className="text-2xl">O ponto de partida</h2>
          <div className="mt-4 space-y-4 leading-7 text-zinc-800">
            <p>Alguns integrantes da nossa equipe dirigem em São Paulo e sabem como é chegar perto de um compromisso e ainda precisar dar voltas no quarteirão para estacionar. Dessa experiência surgiu uma pergunta: e se fosse possível conhecer as opções perto do destino antes de sair de casa?</p>
            <p>Foi assim que nasceu o Vagaí, nossa proposta para a Global Solution 2026/2 da FIAP. A ideia é reunir o conhecimento de quem dirige pela cidade. Cada motorista poderá cadastrar um local que conhece, indicar o endereço e compartilhar detalhes como horários ou regras de uso.</p>
            <p>Pode ser um trecho de rua com estacionamento gratuito, uma área de estacionamento rotativo, como a Zona Azul, ou um estacionamento privado. Uma dica que hoje circula entre amigos poderá ajudar também quem está indo ao bairro pela primeira vez.</p>
          </div>
        </section>
      </div>
    </main>
  )
}
