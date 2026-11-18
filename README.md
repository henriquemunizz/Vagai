# Vagaí

Site institucional do projeto acadêmico da **Global Solution 2026/2 da FIAP**, no tema **CitizenTech**. O Vagaí parte da pergunta “Onde posso estacionar perto do meu destino?”. O piloto proposto estuda a procura por estacionamento na região da Avenida Paulista, em São Paulo.

O objetivo é reduzir o tempo e a distância percorrida durante a procura. A relação com os ODS 11 e 13 orienta o estudo. Os resultados dependem de medições futuras.

## Páginas

| Página | Rota | Conteúdo |
| --- | --- | --- |
| Início | `/` | Apresentação do Vagaí e do piloto |
| Sobre | `/sobre` | Contexto, objetivos e avaliação de impacto |
| Integrantes | `/integrantes` | Fotos, turmas e perfis da equipe |
| FAQ | `/faq` | Perguntas frequentes sobre o projeto |
| Contato | `/contato` | Acesso aos perfis e formulário com validação local |

O endereço `/membros` também leva à equipe. Endereços desconhecidos exibem a página 404.

## Execução local

Use Node.js 24 e npm. A versão de desenvolvimento está na branch `develop`.

```sh
git switch develop
npm ci
npm run dev
```

Abra `http://localhost:5173`. Execute `npm run lint` para analisar o código e `npm run build` para validar o TypeScript e gerar o site em `dist/`. O comando `npm run preview` serve essa versão localmente.

## Interface

A interface usa React, Vite, TypeScript, React Router, Tailwind CSS e React Hook Form. As fontes Inter (textos) e Nunito (títulos e marca) são servidas localmente. A identidade combina o carro branco sobre fundo preto com faixas verde e rosa.

## Organização Git

A `main` contém um commit inicial vazio. A `develop` parte desse commit e reúne as entregas. Cada branch `feature/*` parte da `develop` e retorna a ela por um commit de merge.
