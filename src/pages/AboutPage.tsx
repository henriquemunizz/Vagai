import { PageHeader } from '../components/PageHeader'

const topics = [
  ['O ponto de partida', 'O projeto nasceu na Global Solution 2026/2 da FIAP. O tema CitizenTech convida os estudantes a investigar como a tecnologia pode ajudar a resolver problemas cotidianos dos cidadãos.'],
  ['Por que estudar a procura', 'Mesmo depois de chegar à região do destino, o motorista ainda pode precisar percorrer várias ruas até estacionar. O piloto proposto concentra o estudo na Avenida Paulista e em seu entorno, considerando locais gratuitos, rotativos e privados.'],
  ['Como avaliar o impacto', 'A equipe propõe comparar o tempo de procura e os quilômetros percorridos em situações semelhantes, com e sem o Vagaí. Essa comparação permitirá avaliar se a proposta ajuda a reduzir deslocamentos.'],
  ['Relação com os ODS', 'O Vagaí se relaciona ao ODS 11, Cidades e Comunidades Sustentáveis, pela atenção à mobilidade urbana. A possível redução de emissões aproxima o projeto do ODS 13, Ação Contra a Mudança Global do Clima. Esses benefícios ainda precisam ser medidos.'],
]

export function AboutPage() {
  return (
    <main className="flex-1">
      <PageHeader title="Sobre o Vagaí" description="Um projeto acadêmico sobre o caminho entre chegar ao destino e encontrar onde estacionar." />
      <div className="container-page grid gap-5 py-14 md:grid-cols-2">
        {topics.map(([title, detail]) => (
          <section key={title} className="enter-rise rounded-3xl border border-black/10 bg-zinc-50 p-7 first:bg-brand/15 sm:p-9">
            <h2 className="text-2xl">{title}</h2>
            <p className="mt-3 leading-7 text-zinc-700">{detail}</p>
          </section>
        ))}
        <section className="rounded-3xl bg-ink p-7 text-white sm:p-9 md:col-span-2">
          <h2 className="text-2xl">Como este site foi construído</h2>
          <p className="mt-3 max-w-3xl leading-7 text-zinc-200">As páginas institucionais usam React e TypeScript. O React Router organiza a navegação, o Tailwind CSS adapta o layout a cada tela e o Vite gera a versão de produção.</p>
        </section>
      </div>
    </main>
  )
}
