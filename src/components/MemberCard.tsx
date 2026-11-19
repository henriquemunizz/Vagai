import type { Member } from '../types/member'

export function MemberCard({ member }: { member: Member }) {
  return (
    <article className="card-lift group flex w-full max-w-80 flex-col items-center rounded-3xl border border-black/10 bg-white p-7 text-center shadow-sm sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]">
      <div className="rounded-full bg-linear-to-br from-brand via-white to-pink p-1">
        <img className="size-28 rounded-full border-4 border-white object-cover motion-safe:transition-transform motion-safe:group-hover:scale-[1.03]"
          src={member.image} alt={`Foto de ${member.name}`} />
      </div>
      <h2 className="mt-5 text-2xl leading-tight">{member.name}</h2>
      <p className="mt-2 text-sm leading-6 text-zinc-700">Turma {member.className}</p>
      {member.rm && <p className="text-sm text-zinc-600">RM {member.rm}</p>}
      <div className="mt-auto flex flex-wrap justify-center gap-2 pt-5 text-sm font-bold">
        <a href={member.github} aria-label={`GitHub de ${member.name}`}
          className="rounded-full bg-ink px-4 py-2 text-white hover:bg-zinc-700">GitHub</a>
        <a href={member.linkedin} aria-label={`LinkedIn de ${member.name}`}
          className="rounded-full bg-brand px-4 py-2 hover:bg-emerald-200">LinkedIn</a>
      </div>
    </article>
  )
}
