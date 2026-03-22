'use client'

import { useEffect } from 'react'
import { useCartStore } from '@/store/cartStore'
import { useProductStore } from '@/store/productStore'

/**
 * Keeps cart line product snapshots aligned with server inventory (data/products.json).
 * Cart still persists line ids/qty in localStorage; stock numbers always come from the API after sync.
 */
export function CartCatalogSync() {
  const syncItemsWithCatalog = useCartStore((s) => s.syncItemsWithCatalog)
  const loadProducts = useProductStore((s) => s.loadProducts)

  useEffect(() => {
    const sync = async () => {
      await loadProducts()
      syncItemsWithCatalog(useProductStore.getState().products)
    }
    void sync()

    const onFocus = () => {
      void sync()
    }
    window.addEventListener('focus', onFocus)
    return () => window.removeEventListener('focus', onFocus)
  }, [loadProducts, syncItemsWithCatalog])

  return null
}
