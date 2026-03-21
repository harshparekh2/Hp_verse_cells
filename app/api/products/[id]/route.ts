import { NextResponse } from 'next/server'
import { readProducts, writeProducts } from '@/lib/server/productsRepo'
import { Product } from '@/lib/productsSeed'

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function PUT(req: Request, context: RouteContext) {
  const { id } = await context.params
  const patch = (await req.json()) as Partial<Product>
  const products = await readProducts()
  const index = products.findIndex((product) => product.id === id)
  if (index < 0) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 })
  }

  const updated = { ...products[index], ...patch, id }
  products[index] = updated
  await writeProducts(products)
  return NextResponse.json(updated)
}

export async function DELETE(_req: Request, context: RouteContext) {
  const { id } = await context.params
  const products = await readProducts()
  const next = products.filter((product) => product.id !== id)
  if (next.length === products.length) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 })
  }

  await writeProducts(next)
  return NextResponse.json({ success: true })
}
