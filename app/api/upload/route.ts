import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get('file')
  const productName = String(formData.get('productName') ?? 'product')

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ message: 'Missing file' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const originalExt = path.extname(file.name || '').toLowerCase()
  const ext = originalExt || '.jpg'
  const safeName = slugify(productName) || 'product'
  const uniqueName = `${safeName}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}${ext}`

  const uploadsDir = path.join(process.cwd(), 'public', 'assets', 'products')
  await fs.mkdir(uploadsDir, { recursive: true })

  const filepath = path.join(uploadsDir, uniqueName)
  await fs.writeFile(filepath, buffer)

  const publicUrl = `/assets/products/${uniqueName}`
  return NextResponse.json({ url: publicUrl }, { status: 201 })
}
