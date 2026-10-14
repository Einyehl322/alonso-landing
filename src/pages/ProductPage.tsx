import { ProductCompare } from '../components/product/ProductCompare'
import { getProducts } from '../data/catalog'
import type { Product } from '../data/types'
import { usePageMeta } from '../router/usePageMeta'
import { MobileBuyBar } from '../sections/product/MobileBuyBar'
import { ProductBenefits } from '../sections/product/ProductBenefits'
import { ProductClosing } from '../sections/product/ProductClosing'
import { ProductDetails } from '../sections/product/ProductDetails'
import { ProductFaq } from '../sections/product/ProductFaq'
import { ProductGallery } from '../sections/product/ProductGallery'
import { ProductHero } from '../sections/product/ProductHero'
import { ProductIntro } from '../sections/product/ProductIntro'
import { ProductSpecs } from '../sections/product/ProductSpecs'
import { ProductSubnav, type SubnavItem } from '../sections/product/ProductSubnav'

export function ProductPage({ product }: { product: Product }) {
  usePageMeta(product.name, `${product.tagline} ${product.isDemo ? '(Modelo demostrativo)' : ''}`.trim())
  const hasCompare = getProducts(product.category).length > 1

  const items: SubnavItem[] = [
    { id: 'resumen', label: 'Resumen' },
    { id: 'detalles', label: 'Detalles' },
    { id: 'especificaciones', label: 'Especificaciones' },
    { id: 'galeria', label: 'Galería' },
    ...(hasCompare ? [{ id: 'comparar', label: 'Comparar' }] : []),
    { id: 'faq', label: 'Preguntas' },
  ]

  return (
    <div style={{ background: product.theme.bg }}>
      <ProductHero product={product} />
      <div className="product-body">
        <ProductSubnav product={product} items={items} />
        <ProductIntro product={product} />
        <ProductDetails product={product} />
        <ProductBenefits product={product} />
        <ProductSpecs product={product} />
        <ProductGallery product={product} />
        {hasCompare ? <ProductCompare category={product.category} current={product} /> : null}
        <ProductFaq product={product} />
        <ProductClosing product={product} />
      </div>
      <MobileBuyBar product={product} />
    </div>
  )
}
