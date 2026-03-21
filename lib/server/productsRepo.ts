import { promises as fs } from 'fs'
import path from 'path'
import { Product, seedProducts } from '@/lib/productsSeed'

const dataDir = path.join(process.cwd(), 'data')
const dataFile = path.join(dataDir, 'products.json')

const normalizeProduct = (product: Product): Product => {
  const qty = Number(product.stockQuantity ?? (product.inStock ? 1 : 0))
  const stockQuantity = Number.isFinite(qty) ? Math.max(0, Math.floor(qty)) : 0
  return {
    ...product,
    stockQuantity,
    inStock: stockQuantity > 0,
    images: product.images?.length ? product.images : ['/assets/icons/icon.svg'],
  }
}

export const readProducts = async (): Promise<Product[]> => {
  try {
    const content = await fs.readFile(dataFile, 'utf-8')
    const parsed = JSON.parse(content) as Product[]
    return parsed.map(normalizeProduct)
  } catch {
    return seedProducts.map(normalizeProduct)
  }
}

export const writeProducts = async (products: Product[]) => {
  await fs.mkdir(dataDir, { recursive: true })
  await fs.writeFile(dataFile, JSON.stringify(products.map(normalizeProduct), null, 2), 'utf-8')
}
