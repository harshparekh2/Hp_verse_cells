import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/lib/productsSeed'

export interface CartItem {
  product: Product
  quantity: number
}

const availableStock = (product: Product) =>
  Math.max(0, Math.floor(Number(product.stockQuantity ?? (product.inStock ? 1 : 0))))

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, quantity: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  /** Merge cart lines with latest server/catalog products and clamp qty to stock */
  syncItemsWithCatalog: (catalog: Product[]) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity) => {
        const max = availableStock(product)
        if (max <= 0 || quantity <= 0) return
        set((state) => {
          const existingItem = state.items.find((item) => item.product.id === product.id)
          if (existingItem) {
            const mergedQty = Math.min(existingItem.quantity + quantity, max)
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, product, quantity: mergedQty }
                  : item
              ),
            }
          }
          return {
            items: [...state.items, { product, quantity: Math.min(quantity, max) }],
          }
        })
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }))
      },
      updateQuantity: (productId, quantity) => {
        set((state) => {
          const next: CartItem[] = []
          for (const item of state.items) {
            if (item.product.id !== productId) {
              next.push(item)
              continue
            }
            const max = availableStock(item.product)
            if (max <= 0) continue
            const nextQty = Math.min(Math.max(1, quantity), max)
            next.push({ ...item, quantity: nextQty })
          }
          return { items: next }
        })
      },
      syncItemsWithCatalog: (catalog) => {
        set((state) => {
          const next = state.items
            .map((item) => {
              const latest = catalog.find((p) => p.id === item.product.id)
              if (!latest) return null
              const max = availableStock(latest)
              if (max <= 0) return null
              const nextQty = Math.min(item.quantity, max)
              if (nextQty <= 0) return null
              return { product: latest, quantity: nextQty }
            })
            .filter(Boolean) as CartItem[]
          return { items: next }
        })
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        return get().items.reduce((total, item) => total + item.product.price * item.quantity, 0)
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: 'cart-store',
    }
  )
)
