import { MemberCard } from '../components/MemberCard'
import { PageHeader } from '../components/PageHeader'
import { members } from '../data/members'

export function MembersPage() {
  return (
    <main className="flex-1 bg-zinc-50">
      <PageHeader title="Integrantes" description="Conheça os estudantes que desenvolvem o Vagaí na Global Solution 2026/2 da FIAP." />
      <section aria-label="Equipe Vagaí" className="enter-rise container-page flex flex-wrap justify-center gap-6 py-12 sm:py-16">
        {members.map((member) => <MemberCard key={member.github} member={member} />)}
      </section>
    </main>
  )
}
