import type { Member } from '../types/member'

export function MemberCard({ member }: { member: Member }) {
  return (
    <article className="flex flex-col items-start rounded-2xl border border-zinc-200 p-6">
      <img className="mb-5 size-24 rounded-full object-cover" src={member.image} alt={`Foto de ${member.name}`} />
      <h2 className="text-2xl leading-tight">{member.name}</h2>
      <p className="my-3 text-sm text-zinc-700">{member.className}{member.rm && ` · RM ${member.rm}`}</p>
      <div className="mt-auto flex gap-4 pt-3 text-sm font-bold underline decoration-pink underline-offset-4">
        <a href={member.github} aria-label={`GitHub de ${member.name}`}>GitHub</a>
        <a href={member.linkedin} aria-label={`LinkedIn de ${member.name}`}>LinkedIn</a>
      </div>
    </article>
  )
}
