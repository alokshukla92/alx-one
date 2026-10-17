import { SECURO_BASE_PATH } from '@/lib/securo-path'

export type AlxProductId = 'securo' | 'people' | 'inventory'

export type AlxProduct = {
  id: AlxProductId
  nameKey: string
  descriptionKey: string
  /** Entry route when the product is available. */
  path: string
  available: boolean
}

/** ALX One product modules. Only `available` entries are navigable from the hub. */
export const ALX_PRODUCTS: AlxProduct[] = [
  {
    id: 'securo',
    nameKey: 'alx.products.securo.name',
    descriptionKey: 'alx.products.securo.description',
    path: SECURO_BASE_PATH,
    available: true,
  },
  {
    id: 'people',
    nameKey: 'alx.products.people.name',
    descriptionKey: 'alx.products.people.description',
    path: '#',
    available: false,
  },
  {
    id: 'inventory',
    nameKey: 'alx.products.inventory.name',
    descriptionKey: 'alx.products.inventory.description',
    path: '#',
    available: false,
  },
]
