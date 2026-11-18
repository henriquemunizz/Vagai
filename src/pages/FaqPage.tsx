import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'

const questions = [
  ['O que é o Vagaí?', 'É um projeto acadêmico da FIAP que investiga como ajudar motoristas a encontrar onde estacionar perto do destino.'],
  ['Qual é a região do piloto?', 'A proposta começa na região da Avenida Paulista, em São Paulo.'],
  ['O que significa CitizenTech?', 'É o tema da Global Solution 2026/2. O desafio é aplicar tecnologia a problemas do cotidiano dos cidadãos, como a busca por estacionamento.'],
  ['O projeto já mediu a redução de deslocamentos?', 'A medição faz parte do piloto proposto. A equipe pretende comparar o tempo e a distância de procura em condições semelhantes.'],
]

export function FaqPage() {
  return (
    <main className="flex-1">
      <PageHeader title="Perguntas frequentes" description="Tire suas dúvidas sobre a proposta, a região do piloto e os objetivos do Vagaí." />
      <div className="container-page grid gap-8 py-14 lg:grid-cols-[1fr_2fr]">
        <aside className="self-start lg:sticky lg:top-6">
          <h2 className="text-2xl">Tem outra dúvida?</h2>
          <Link className="mt-3 inline-block font-bold underline decoration-pink underline-offset-4" to="/contato">Fale com a equipe</Link>
        </aside>
        <section aria-label="Perguntas e respostas" className="space-y-3">
        {questions.map(([question, answer]) => (
          <details key={question} className="group rounded-2xl border border-zinc-200 px-5 py-1 open:border-emerald-700 open:bg-emerald-50">
            <summary className="flex cursor-pointer items-center justify-between gap-5 py-4 font-heading text-xl font-bold">
              {question}<span aria-hidden="true" className="rounded-full bg-brand px-2 motion-safe:transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="max-w-3xl pb-4 leading-7 text-zinc-700">{answer}</p>
          </details>
        ))}
        </section>
      </div>
    </main>
  )
}
