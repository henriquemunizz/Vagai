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
      <section aria-label="Perguntas e respostas" className="container-page py-12">
        {questions.map(([question, answer]) => (
          <details key={question} className="group border-b border-zinc-300 py-2">
            <summary className="flex cursor-pointer items-center justify-between gap-5 py-4 font-heading text-xl font-bold">
              {question}<span aria-hidden="true" className="rounded-full bg-brand px-2 group-open:rotate-45">+</span>
            </summary>
            <p className="max-w-3xl pb-4 leading-7 text-zinc-700">{answer}</p>
          </details>
        ))}
      </section>
    </main>
  )
}
