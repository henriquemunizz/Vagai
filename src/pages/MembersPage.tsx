import { MemberCard } from '../components/MemberCard'
import { PageHeader } from '../components/PageHeader'
import { members } from '../data/members'

export function MembersPage() {
  return (
    <main className="flex-1">
      <PageHeader title="Integrantes" description="Conheça os estudantes que desenvolvem o Vagaí na Global Solution 2026/2 da FIAP." />
      <section aria-label="Equipe Vagaí" className="container-page grid gap-5 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => <MemberCard key={member.github} member={member} />)}
      </section>
    </main>
  )
}
