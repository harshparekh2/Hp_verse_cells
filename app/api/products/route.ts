import { NextResponse } from 'next/server'
import { readProducts, writeProducts } from '@/lib/server/productsRepo'
import { Product } from '@/lib/productsSeed'

const createId = () => Math.random().toString(36).slice(2, 11)

export async function GET() {
  const products = await readProducts()
  return NextResponse.json(products)
}

export async function POST(req: Request) {
  const payload = (await req.json()) as Omit<Product, 'id'>
  const products = await readProducts()
  const created: Product = { ...payload, id: createId() }
  const next = [...products, created]
  await writeProducts(next)
  return NextResponse.json(created, { status: 201 })
}
