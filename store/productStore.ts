import { create } from 'zustand'
import { Product, seedProducts } from '@/lib/productsSeed'

interface ProductStore {
  products: Product[]
  isLoading: boolean
  loadProducts: () => Promise<void>
  setProducts: (products: Product[]) => void
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
}

export const useProductStore = create<ProductStore>()(
  (set) => ({
    products: seedProducts,
    isLoading: false,
    loadProducts: async () => {
      set({ isLoading: true })
      try {
        const res = await fetch('/api/products', { cache: 'no-store' })
        if (!res.ok) throw new Error('Failed to fetch products')
        const data: Product[] = await res.json()
        set({ products: data })
      } catch {
        // keep seed data as fallback
      } finally {
        set({ isLoading: false })
      }
    },
    setProducts: (products) => set({ products }),
    addProduct: async (product) => {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      })
      if (!res.ok) throw new Error('Failed to add product')
      const created: Product = await res.json()
      set((state) => ({ products: [...state.products, created] }))
    },
    updateProduct: async (id, updatedProduct) => {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      })
      if (!res.ok) throw new Error('Failed to update product')
      const updated: Product = await res.json()
      set((state) => ({
        products: state.products.map((p) => (p.id === id ? updated : p)),
      }))
    },
    deleteProduct: async (id) => {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete product')
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
      }))
    },
  })
)
