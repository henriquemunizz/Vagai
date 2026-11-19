import { Form, Link, Outlet, useActionData, useNavigation, useRevalidator, useRouteError, useSearchParams } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { useSession } from './useSession'
import './solution.css'

export function Feedback() {
  const data = useActionData() as { error?: string; success?: string } | undefined
  if (data?.error) return <p role="alert" className="rounded-xl bg-red-50 p-3 text-red-900">{data.error}</p>
  return data?.success ? <p role="status" className="rounded-xl bg-emerald-50 p-3">{data.success}</p> : null
}

export function Submit({ children }: { children: React.ReactNode }) {
  const busy = useNavigation().state !== 'idle'
  return <button className="solution-button" disabled={busy}>{busy ? 'Aguarde…' : children}</button>
}

export function SolutionLayout() {
  return (
    <main className="flex-1">
      <PageHeader title="Solução" description="Consulte locais para estacionar e compartilhe o que você conhece em São Paulo." />
      <div className="container-page py-10">
        <Outlet />
      </div>
    </main>
  )
}

export function SolutionError() {
  const error = useRouteError()
  const retry = useRevalidator()
  return <section className="solution-panel">
    <h2>Não foi possível abrir esta página</h2>
    <p role="alert">{error instanceof Error ? error.message : 'Confira a conexão com a API.'}</p>
    <button className="solution-button" onClick={() => retry.revalidate()}>Tentar novamente</button>
    <Link className="solution-link" to="/solucao">Voltar à solução</Link>
  </section>
}

const pages = [
  ['/solucao/locais', 'Buscar estacionamento', 'Consulte endereços, tarifas e informações da comunidade.'],
  ['/solucao/cadastrar', 'Cadastrar um local', 'Compartilhe um estacionamento ou trecho de rua.'],
  ['/solucao/favoritos', 'Meus favoritos', 'Reencontre os locais que você salvou.'],
]

export function SolutionHome() {
  const { user, error } = useSession()
  const [params] = useSearchParams()
  const retry = useRevalidator()
  const registered = params.has('cadastro')
  const signup = params.get('modo') === 'cadastro'
  return <div className="grid items-start gap-6 md:grid-cols-[1fr_1.3fr]">
    <section className="solution-panel">
      <h2>{user ? user.nome : signup ? 'Criar conta' : 'Entrar na conta'}</h2>
      {error && <div role="alert"><p>{error}</p><button className="solution-link" onClick={() => retry.revalidate()}>Tentar novamente</button></div>}
      {user ? <Form method="post"><button className="solution-link" name="acao" value="sair">Sair da conta</button></Form> :
        <Form method="post" className="solution-form" key={signup ? 'cadastro' : 'login'}>
          {registered && <p role="status">Conta criada. Entre com seu nome e senha.</p>}
          {params.has('entrar') && <p>Entre para acessar esta funcionalidade.</p>}
          <input type="hidden" name="acao" value={signup ? 'cadastrar' : 'entrar'} />
          <label>Nome de usuário<input name="nome" className="field" required maxLength={40} autoComplete="username" /></label>
          <label>Senha<input name="senha" type="password" className="field" required minLength={signup ? 8 : undefined} maxLength={255} autoComplete={signup ? 'new-password' : 'current-password'} /></label>
          <Submit>{signup ? 'Cadastrar' : 'Entrar'}</Submit>
          <Link className="solution-link" to={signup ? "/solucao" : "/solucao?modo=cadastro"}>{signup ? 'Já tenho conta' : 'Criar uma conta'}</Link>
        </Form>}
      <Feedback />
    </section>
    <section className="space-y-4">
      <h2 className="text-3xl">Funcionalidades</h2>
      {pages.map(([to, title, detail]) => <Link key={to} to={to} className="solution-panel card-lift block">
        <h3 className="text-xl">{title} <span aria-hidden="true">→</span></h3><p>{detail}</p>
      </Link>)}
    </section>
  </div>
}
