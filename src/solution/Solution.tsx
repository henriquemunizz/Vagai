import { accessTarget } from './access'
import { Form, Link, Navigate, Outlet, useActionData, useNavigation, useRevalidator, useRouteError, useSearchParams } from 'react-router-dom'
import { useSession } from './useSession'

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
  const navigation = useNavigation()
  return (
    <main className="flex-1 bg-zinc-50">
      <header className="solution-hero">
        <div className="container-page text-center">
          <h1 className="text-5xl tracking-tight sm:text-6xl">Solução</h1>
          <p className="mx-auto mt-3 max-w-xl leading-7 text-zinc-300">Consulte locais para estacionar e compartilhe o que você conhece em São Paulo.</p>
        </div>
      </header>
      <div className="container-page py-10">
        {navigation.state === 'loading' && <p role="status" className="mb-3 text-sm">Atualizando…</p>}
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
  ['buscar', '/solucao/locais', 'Buscar estacionamento', 'Consulte endereços, tarifas e informações da comunidade.'],
  ['cadastrar', '/solucao/cadastrar', 'Cadastrar um local', 'Compartilhe um estacionamento ou trecho de rua.'],
  ['favoritos', '/solucao/favoritos', 'Meus favoritos', 'Reencontre os locais que você salvou.'],
]

export function SolutionHome() {
  const { user, error } = useSession()
  const [params] = useSearchParams()
  const retry = useRevalidator()
  const registered = params.has('cadastro')
  const signup = params.get('modo') === 'cadastro'
  const target = accessTarget(params.get('destino'))
  const access = target === 'favoritos'
    ? { title: 'Meus favoritos', icon: '☆', description: 'Entre para consultar os locais que você salvou.' }
    : { title: 'Cadastrar um local', icon: '+', description: 'Entre para compartilhar um local para estacionar.' }
  const toggle = new URLSearchParams()
  if (target) toggle.set('destino', target)
  if (!signup) toggle.set('modo', 'cadastro')
  if (user && target) return <Navigate replace to={'/solucao/' + target} />
  return <div className={target ? 'mx-auto w-full max-w-md' : "grid items-start gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)] lg:gap-10"}>
    <section className="solution-panel account-card">
      {target && <span aria-hidden="true" className={`feature-symbol ${target === 'favoritos' ? 'bg-pink-100' : 'bg-emerald-100'}`}>{access.icon}</span>}
      <h2>{target ? access.title : user ? user.nome : signup ? 'Criar conta' : 'Entrar na conta'}</h2>
      {target && <p className="text-sm leading-6 text-zinc-700">{signup ? 'Crie sua conta para continuar.' : access.description}</p>}
      {error && <div role="alert"><p>{error}</p><button className="solution-link" onClick={() => retry.revalidate()}>Tentar novamente</button></div>}
      {user ? <Form method="post"><input type="hidden" name="acao" value="sair" /><Submit>Sair da conta</Submit></Form> :
        <Form method="post" className="solution-form" key={signup ? 'cadastro' : 'login'}>
          {registered && <p role="status">Conta criada. Entre com seu nome e senha.</p>}
          {params.has('entrar') && <p>Entre para acessar esta funcionalidade.</p>}
          <input type="hidden" name="acao" value={signup ? 'cadastrar' : 'entrar'} />
          <label>Nome de usuário<input name="nome" className="field" required maxLength={40} autoComplete="username" /></label>
          <label>Senha<input name="senha" type="password" className="field" required minLength={signup ? 8 : undefined} maxLength={255} autoComplete={signup ? 'new-password' : 'current-password'} /></label>
          <Submit>{signup ? 'Cadastrar' : target ? 'Entrar e continuar' : 'Entrar'}</Submit>
          <Link className="solution-link" to={{ pathname: "/solucao", search: toggle.toString() }}>{signup ? 'Já tenho conta' : 'Criar uma conta'}</Link>
        </Form>}
      <Feedback />
    </section>
    {target ? <Link className="solution-link mt-5" to="/solucao">← Voltar à solução</Link> : <section className="space-y-4">
      <h2 className="text-3xl">Funcionalidades</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {pages.map(([kind, to, title, detail]) => (
          <Link key={to} to={to} className={`feature-card card-lift feature-${kind}`}>
            <div className="flex items-center justify-between" aria-hidden="true">
              <span className="feature-symbol">
                {kind === 'buscar' ? <span className="search-symbol" /> : kind === 'cadastrar' ? '+' : '☆'}
              </span>
              <span className="text-xl">↗</span>
            </div>
            <h3 className="mt-5 text-xl leading-tight sm:text-2xl">{title}</h3>
            <p className="mt-2 max-w-md text-sm leading-6">{detail}</p>
          </Link>
        ))}
      </div>
    </section>}
  </div>
}
