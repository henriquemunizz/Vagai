import { useEffect, useState } from 'react'
import { Form, Link, useLocation, useLoaderData } from 'react-router-dom'
import { categorias, endereco, moeda } from './api'
import { Feedback, Submit } from './Solution'
import { useSession } from './useSession'
import type { detailLoader } from './routes'

const dias = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo']
const hora = (m: number) => [Math.floor(m / 60), m % 60].map(n => String(n).padStart(2, '0')).join(':')
const utc = (text: string) => Date.parse(text.endsWith('Z') ? text : text + 'Z')

export function DetailsPage() {
  const { local, regras, relatos, avaliacoes } = useLoaderData() as Awaited<ReturnType<typeof detailLoader>>
  const { state } = useLocation()
  const back = state?.fromFavorites ? '/solucao/favoritos' : '/solucao/locais' + (state?.search ? '?' + state.search : '')
  const { user } = useSession()
  const [agora, setAgora] = useState(Date.now)
  useEffect(() => {
    const timer = window.setInterval(() => setAgora(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [])
  const recentes = relatos.filter(r => r.atual && utc(r.data) + 600000 > agora)
  const ativas = regras.filter(r => r.ativo === 1)
  const minha = avaliacoes.find(a => a.idUsuario === user?.id)
  const destino = encodeURIComponent(`${local.rua}, ${local.numero}, ${local.bairro}, São Paulo, SP`)

  return <div className="space-y-6">
    <Link className="solution-link" to={back}>{state?.fromFavorites ? '← Meus favoritos' : '← Voltar à busca'}</Link>
    <section className="solution-panel">
      <p className="eyebrow">{categorias[local.tipo]}</p><h2>{local.nome}</h2>
      <p>{endereco(local)}</p>{local.descricao && <p>{local.descricao}</p>}
      {local.tipo !== 'GRATUITO' && <p>Primeira hora: {moeda(local.primeiraHora)} · Hora adicional: {moeda(local.demaisHoras)}</p>}
      <div className="flex flex-wrap items-center gap-4">
        <a href={'https://www.google.com/maps/dir/?api=1&destination=' + destino} target="_blank" rel="noreferrer" className="solution-link">Abrir rota no Google Maps</a>
        {user ? <Form method="post"><input type="hidden" name="acao" value="favorito" /><Submit>Salvar nos favoritos</Submit></Form>
          : <Link className="solution-link" to={'/solucao?destino=locais/' + local.id}>Entrar para colaborar</Link>}
      </div>
    </section>
    <Feedback />
    <div className="grid items-start gap-5 lg:grid-cols-2">
      <section className="solution-panel">
        <h2>Regras e horários</h2>
        {!ativas.length && <p>Horários e regras ainda não informados.</p>}
        <ul className="space-y-3">{ativas.map(r => <li key={r.id}>
          <strong>{r.tipo === 'PROIBIDO' ? 'Proibido' : 'Permitido'}</strong> · {dias[r.diaSemana - 1]} · {r.inicio === r.fim ? '24 horas a partir das ' + hora(r.inicio) : hora(r.inicio) + ' às ' + hora(r.fim)}
          {r.fim < r.inicio && ' do dia seguinte'}<p>{r.descricao}</p>
        </li>)}</ul>
        {ativas.length > 0 && <p className="text-sm">Em horários sobrepostos, prevalece a proibição.</p>}
        {user && user.id === local.idUsuarioCriador && <details><summary className="cursor-pointer font-semibold">Adicionar regra</summary>
          <Form method="post" className="solution-form mt-4">
            <input type="hidden" name="acao" value="regra" />
            <label>Regra<select className="field" name="tipo"><option value="PERMITIDO">Permitido</option><option value="PROIBIDO">Proibido</option></select></label>
            <label>Dia da semana<select className="field" name="diaSemana">{dias.map((d, i) => <option key={d} value={i + 1}>{d}</option>)}</select></label>
            <label>Início<input name="inicio" className="field" type="time" required /></label>
            <label>Fim<input name="fim" className="field" type="time" required /></label>
            <label>Descrição<input name="descricao" className="field" maxLength={255} required /></label><Submit>Salvar regra</Submit>
          </Form>
        </details>}
      </section>
      {local.tipo !== 'PRIVADO' && <section className="solution-panel">
        <h2>Relatos dos últimos 10 minutos</h2>
        {!recentes.length && <p>Sem relatos recentes</p>}
        <ul className="space-y-2">{recentes.map(r => <li key={r.id}><strong>{r.tipo === 'SEM_VAGA' ? 'Não encontrei vagas' : 'Encontrei vaga'}</strong> · {new Date(utc(r.data)).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}{r.observacao && <p>{r.observacao}</p>}</li>)}</ul>
        {user && <Form method="post" className="solution-form">
          <input type="hidden" name="acao" value="relato" />
          <label>Seu relato<select name="tipo" className="field"><option value="VAGA_ENCONTRADA">Encontrei vaga</option><option value="SEM_VAGA">Não encontrei vagas</option></select></label>
          <label>Observação (opcional)<textarea name="observacao" className="field" maxLength={255} /></label><Submit>Enviar relato</Submit>
        </Form>}
      </section>}
      <section className="solution-panel">
        <h2>Avaliações</h2>{!avaliacoes.length && <p>Este local ainda não recebeu avaliações.</p>}
        <ul className="space-y-3">{avaliacoes.map(a => <li key={a.id}><strong>{a.nota} / 5</strong>{a.idUsuario === user?.id && ' · Sua avaliação'}{a.comentario && <p>{a.comentario}</p>}</li>)}</ul>
        {user && <Form key={local.id + ':' + user.id} method="post" className="solution-form">
          <input type="hidden" name="acao" value="avaliacao" /><input type="hidden" name="avaliacaoId" value={minha?.id ?? ''} />
          <label>Sua nota<select className="field" name="nota" defaultValue={minha?.nota ?? ''} required>
            <option value="" disabled>Selecione</option>{[1, 2, 3, 4, 5].map(n => <option key={n}>{n}</option>)}
          </select></label>
          <label>Comentário (opcional)<textarea name="comentario" className="field" maxLength={500} defaultValue={minha?.comentario ?? ''} /></label>
          <Submit>{minha ? 'Atualizar avaliação' : 'Publicar avaliação'}</Submit>
        </Form>}
      </section>
    </div>
  </div>
}
