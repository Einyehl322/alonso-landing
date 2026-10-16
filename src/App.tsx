import { useEffect, useState } from 'react'
import { InterestListPanel } from './components/interest/InterestListPanel'
import { InterestListProvider } from './components/interest/InterestListContext'
import { InterestListFab } from './components/interest/InterestListFab'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { WhatsAppFab } from './components/layout/WhatsAppFab'
import { CategoryPage } from './pages/CategoryPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProductPage } from './pages/ProductPage'
import { useRouter } from './router/context'
import { RouterProvider } from './router/router'
import { matchRoute } from './router/routes'

function Shell() {
  const { pathname } = useRouter()
  const route = matchRoute(pathname)
  const product = route.name === 'product' ? route.product : undefined
  const headerScheme = product?.theme.scheme ?? (route.name === 'category' && route.category.id === 'carplay' ? 'light' : 'dark')
  const [ilistOpen, setIlistOpen] = useState(false)

  // Anuncia el cambio de página a lectores de pantalla.
  const [announcement, setAnnouncement] = useState('')
  useEffect(() => {
    const id = window.setTimeout(() => setAnnouncement(document.title), 120)
    return () => window.clearTimeout(id)
  }, [pathname])

  return (
    <>
      <a className="skip-link" href="#main">
        Saltar al contenido
      </a>
      <Header scheme={headerScheme} />
      <main id="main" tabIndex={-1}>
        {route.name === 'home' && <HomePage />}
        {route.name === 'category' && <CategoryPage key={route.category.id} category={route.category} />}
        {route.name === 'product' && <ProductPage key={route.product.slug} product={route.product} />}
        {route.name === 'not-found' && <NotFoundPage />}
      </main>
      <Footer product={product} />
      <WhatsAppFab product={product} />
      <InterestListFab onClick={() => setIlistOpen(true)} />
      <InterestListPanel open={ilistOpen} onClose={() => setIlistOpen(false)} />
      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </>
  )
}

export default function App() {
  return (
    <RouterProvider>
      <InterestListProvider>
        <Shell />
      </InterestListProvider>
    </RouterProvider>
  )
}
