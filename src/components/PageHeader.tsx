interface PageHeaderProps {
  title: string
  description: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="border-b-4 border-brand bg-black py-12 text-white sm:py-16">
      <div className="container-page">
        <h1 className="text-5xl tracking-tight">{title}</h1>
        <p className="mt-4 max-w-2xl leading-7 text-zinc-300">{description}</p>
      </div>
    </header>
  )
}
