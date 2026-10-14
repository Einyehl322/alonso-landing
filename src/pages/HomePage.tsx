import { ProductCollection } from '../components/product/ProductCollection'
import { usePageMeta } from '../router/usePageMeta'
import { CarplayUniverse } from '../sections/home/CarplayUniverse'
import { CategoryChooser } from '../sections/home/CategoryChooser'
import { Hero } from '../sections/home/Hero'
import { HowToBuy } from '../sections/home/HowToBuy'
import { IntercomUniverse } from '../sections/home/IntercomUniverse'
import { Manifesto } from '../sections/home/Manifesto'
import { RoadFeature } from '../sections/home/RoadFeature'

/**
 * Recorrido de la home: impresión → qué ofrecemos → acceso rápido →
 * inspiración → cada universo con sus modelos → cómo comprar → contacto.
 */
export function HomePage() {
  usePageMeta(null)

  return (
    <>
      <Hero />
      <Manifesto />
      <CategoryChooser />
      <RoadFeature />
      <IntercomUniverse />
      <ProductCollection category="intercomunicadores" scheme="dark" linkToCategory title="Intercomunicadores" />
      <CarplayUniverse />
      <ProductCollection category="carplay" scheme="light" linkToCategory title="Pantallas CarPlay" />
      <HowToBuy />
    </>
  )
}
