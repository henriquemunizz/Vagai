import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export function ContactPage() {
  const [reviewed, setReviewed] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>()

  return (
    <main className="flex-1">
      <PageHeader title="Contato" description="Converse com os estudantes responsáveis pelo Vagaí." />
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1fr_1.5fr]">
        <section className="enter-rise self-start rounded-3xl bg-ink p-7 text-white sm:p-9">
          <h2 className="text-3xl">Fale com a equipe</h2>
          <p className="my-4 max-w-md leading-7">Para conversar sobre o projeto, acesse o perfil de um dos integrantes no LinkedIn.</p>
          <Link className="inline-block rounded-full bg-brand px-5 py-3 font-bold text-black hover:bg-white" to="/integrantes">Ver perfis da equipe</Link>
        </section>
        <form className="space-y-4 rounded-3xl border border-zinc-200 p-6 shadow-sm sm:p-9" noValidate
          onChange={() => setReviewed(false)} onSubmit={handleSubmit(() => setReviewed(true))}>
          <h2 className="text-2xl">Prepare sua mensagem</h2>
          <p className="text-sm text-zinc-600">Use o formulário para revisar seu texto antes de enviá-lo pelo perfil de um integrante. Os dados ficam nesta página.</p>
          <div>
            <label htmlFor="name">Nome completo</label>
            <input className="field" id="name" autoComplete="name" {...register('name', { required: 'Informe seu nome.' })} />
            {errors.name && <p role="alert" className="mt-1 text-sm text-red-700">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="email">E-mail</label>
            <input className="field" id="email" type="email" autoComplete="email" {...register('email', {
              required: 'Informe seu e-mail.',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Confira o endereço de e-mail.' },
            })} />
            {errors.email && <p role="alert" className="mt-1 text-sm text-red-700">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="subject">Assunto</label>
            <input className="field" id="subject" {...register('subject', { required: 'Informe o assunto.' })} />
            {errors.subject && <p role="alert" className="mt-1 text-sm text-red-700">{errors.subject.message}</p>}
          </div>
          <div>
            <label htmlFor="message">Mensagem</label>
            <textarea className="field" id="message" rows={4} {...register('message', { required: 'Escreva sua mensagem.' })} />
            {errors.message && <p role="alert" className="mt-1 text-sm text-red-700">{errors.message.message}</p>}
          </div>
          <button className="rounded-full bg-brand px-6 py-3 font-bold" type="submit">Conferir mensagem</button>
          {reviewed && <p role="status" className="rounded-xl bg-emerald-50 p-4 text-emerald-900">Campos conferidos. Copie sua mensagem e envie pelo LinkedIn do integrante escolhido.</p>}
        </form>
      </div>
    </main>
  )
}
