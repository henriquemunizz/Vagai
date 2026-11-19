# Vagaí

Interface do projeto acadêmico da **Global Solution 2026/2 da FIAP**, no tema **CitizenTech**. O Vagaí parte da pergunta “Onde posso estacionar perto do meu destino?”. A ideia surgiu entre os próprios integrantes da equipe. Alguns dirigem em São Paulo e conhecem a dificuldade de achar vaga perto do destino.

A proposta é que a própria comunidade possa cadastrar locais gratuitos, rotativos e privados em diferentes bairros da cidade, compartilhando endereços, horários e regras que conhece.

## Páginas

| Página | Rota | Conteúdo |
| --- | --- | --- |
| Início | `/` | Apresentação do Vagaí e da proposta colaborativa |
| Sobre | `/sobre` | Origem da ideia e contribuição da comunidade |
| Integrantes | `/integrantes` | Fotos, turmas e perfis da equipe |
| FAQ | `/faq` | Perguntas frequentes sobre o projeto |
| Contato | `/contato` | Acesso aos perfis e formulário com validação local |
| Solução | `/solucao` | Login, cadastro de conta e acesso às funcionalidades |

O endereço `/membros` também leva à equipe. Endereços desconhecidos exibem a página 404.

## Execução local

Use Node.js 24 e npm. A integração está na branch `feature/integracao-api`.

```sh
git switch feature/integracao-api
npm ci
npm run dev
```

Abra `http://localhost:5173`. Execute `npm run lint` para analisar o código e `npm run build` para validar o TypeScript e gerar o site em `dist/`. O comando `npm run preview` serve essa versão localmente.

## Conexão com o backend

Inicie o projeto Vagai-backend1/vagai com Java 21, o esquema Oracle preparado e as variáveis de ambiente indicadas no README do backend. O frontend usa http://localhost:8080 por padrão. Para apontar para outro servidor, copie `.env.example` para `.env`, ajuste `VITE_API_URL` e reinicie o Vite. Na publicação, defina a variável antes do build.

Configure `FRONTEND_ORIGIN` no Spring com a origem exata do frontend (localmente, http://localhost:5173). Login e logout usam o cookie de sessão do servidor. Para implantação HTTPS entre sites diferentes, configure `COOKIE_SECURE=true` e `COOKIE_SAME_SITE=none` no backend. O navegador precisa permitir o cookie nessa configuração.

Em **Solução**, a busca por rua, bairro e categoria é pública. Cada local exibe endereço, tarifas, horários, avaliações e acesso ao Google Maps pelo endereço. Com uma conta, o motorista pode cadastrar locais, salvar favoritos, avaliar e atualizar a própria nota. Relatos em locais gratuitos e rotativos aparecem por dez minutos. O criador de um local pode adicionar regras de uso na página de detalhes.

## Interface

A interface usa React, Vite, TypeScript, React Router, Tailwind CSS e React Hook Form. As fontes Inter (textos) e Nunito (títulos e marca) são servidas localmente. A identidade combina o carro branco sobre fundo preto com faixas verde e rosa.

## Organização Git

A `main` contém um commit inicial vazio. A `develop` parte desse commit e reúne as entregas. Cada branch `feature/*` parte da `develop` e retorna a ela por um commit de merge.

## Integrantes

| Foto | Nome | RM | Turma | Perfis |
| --- | --- | --- | --- | --- |
| <img src="public/images/henrique.jpg" width=64 alt="Henrique da Silva Muniz" /> | Henrique da Silva Muniz | 573874 | 1TDSPV-2026 | [GitHub](https://github.com/henriquemunizz) · [LinkedIn](https://www.linkedin.com/in/henrique-muniz-044b05365) |
| <img src="public/images/erick.jpg" width=64 alt="Erick Keiji Miyashiro" /> | Erick Keiji Miyashiro | 568966 | 1TDSPV-2026 | [GitHub](https://github.com/erickmiyashiro) · [LinkedIn](https://www.linkedin.com/in/erick-keiji-miyashiro-6228b93b4) |
| <img src="public/images/yuto.jpeg" width=64 alt="Yuto Inoue" /> | Yuto Inoue | 573161 | 1TDSPV-2026 | [GitHub](https://github.com/yutoinouee) · [LinkedIn](https://www.linkedin.com/in/yuto-inoue-713348373) |
| <img src="public/images/rafael.png" width=64 alt="Rafael Andres" /> | Rafael Andres | 573700 | 1TDSPX-2026 | [GitHub](https://github.com/Andresxz1) · [LinkedIn](https://www.linkedin.com/in/rafaandres/) |
| <img src="public/images/vitor.png" width=64 alt="Vitor Rodrigues" /> | Vitor Rodrigues | 571297 | 1TDSPX-2026 | [GitHub](https://github.com/vitorf8) · [LinkedIn](https://www.linkedin.com/in/vitor-rodrigues-ferreira-22048a30b/) |
