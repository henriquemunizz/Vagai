import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { FaqPage } from './pages/FaqPage'
import { HomePage } from './pages/HomePage'
import { MembersPage } from './pages/MembersPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { SolutionHome, SolutionLayout, SolutionError } from './solution/Solution'
import { CreatePage, FavoritesPage, SearchPage } from './solution/Parking'
import { DetailsPage } from './solution/Details'
import { accountAction, createAction, detailAction, detailLoader, favoriteAction, favoritesLoader, searchLoader, sessionLoader } from './solution/routes'

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<Layout />} hydrateFallbackElement={<p role="status" className="container-page py-10">Carregando…</p>}>
    <Route index element={<HomePage />} />
    <Route path="sobre" element={<AboutPage />} />
    <Route path="integrantes" element={<MembersPage />} />
    <Route path="faq" element={<FaqPage />} />
    <Route path="contato" element={<ContactPage />} />
    <Route path="membros" element={<Navigate to="/integrantes" replace />} />
    <Route path="solucao" id="solution" loader={sessionLoader} element={<SolutionLayout />}>
      <Route errorElement={<SolutionError />}>
        <Route index element={<SolutionHome />} action={accountAction} />
        <Route path="locais" element={<SearchPage />} loader={searchLoader} />
        <Route path="locais/:id" element={<DetailsPage />} loader={detailLoader} action={detailAction} />
        <Route path="cadastrar" element={<CreatePage />} action={createAction} />
        <Route path="favoritos" element={<FavoritesPage />} loader={favoritesLoader} action={favoriteAction} />
      </Route>
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Route>
))

export default function App() {
  return <RouterProvider router={router} />
}
