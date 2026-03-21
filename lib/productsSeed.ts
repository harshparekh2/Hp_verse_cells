export interface Product {
  id: string
  name: string
  brand: string
  price: number
  images: string[]
  specs: string[]
  description: string
  inStock: boolean
  condition: string
  category: string
  color?: string
  year?: string
  storage?: string
  ram?: string
  stockQuantity?: number
}

export const seedProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 16 Pro',
    brand: 'Apple',
    price: 119900,
    images: ['https://images.unsplash.com/photo-1726589452761-1d82907ad6d5?auto=format&fit=crop&w=1200&q=80'],
    specs: ['6.3" Display', 'A18 Pro', '48MP Camera'],
    description: 'Latest flagship iPhone with advanced AI features',
    inStock: true,
    condition: 'Like New',
    category: 'flagship',
    color: 'Natural Titanium',
    year: '2024',
    storage: '256GB',
    ram: '8GB',
    stockQuantity: 5,
  },
  {
    id: '2',
    name: 'Galaxy S24 Ultra',
    brand: 'Samsung',
    price: 124900,
    images: ['https://images.unsplash.com/photo-1710173412606-c4f66647ec82?auto=format&fit=crop&w=1200&q=80'],
    specs: ['6.8" Display', 'Snapdragon 8 Gen 3', '200MP Camera'],
    description: 'Premium Android experience with cutting-edge technology',
    inStock: true,
    condition: 'Excellent',
    category: 'flagship',
    color: 'Titanium Gray',
    year: '2024',
    storage: '512GB',
    ram: '12GB',
    stockQuantity: 4,
  },
  {
    id: '3',
    name: 'Pixel 9 Pro XL',
    brand: 'Google',
    price: 109900,
    images: ['https://images.unsplash.com/photo-1726137568717-37fcebaea75f?auto=format&fit=crop&w=1200&q=80'],
    specs: ['6.8" LTPO OLED', 'Tensor G4', '50MP Triple Camera'],
    description: 'Google flagship with advanced AI camera and clean Android experience',
    inStock: true,
    condition: 'Like New',
    category: 'flagship',
    color: 'Obsidian',
    year: '2025',
    storage: '256GB',
    ram: '16GB',
    stockQuantity: 6,
  },
  {
    id: '4',
    name: 'Xiaomi 14 Ultra',
    brand: 'Xiaomi',
    price: 99900,
    images: ['https://images.unsplash.com/photo-1715692166949-f6fce4facc8d?auto=format&fit=crop&w=1200&q=80'],
    specs: ['6.73" AMOLED', 'Snapdragon 8 Gen 3', 'Leica Quad Camera'],
    description: 'Premium camera-centric smartphone tuned for pro photography',
    inStock: true,
    condition: 'Excellent',
    category: 'flagship',
    color: 'Black',
    year: '2024',
    storage: '512GB',
    ram: '16GB',
    stockQuantity: 3,
  },
  {
    id: '5',
    name: 'OnePlus 12',
    brand: 'OnePlus',
    price: 69900,
    images: ['https://images.unsplash.com/photo-1702745788085-c42625fca5ee?auto=format&fit=crop&w=1200&q=80'],
    specs: ['6.82" QHD AMOLED', 'Snapdragon 8 Gen 3', '100W Fast Charging'],
    description: 'Smooth flagship performance with ultra-fast charging and Hasselblad tuning',
    inStock: true,
    condition: 'Excellent',
    category: 'flagship',
    color: 'Flowy Emerald',
    year: '2024',
    storage: '256GB',
    ram: '12GB',
    stockQuantity: 7,
  },
  {
    id: '6',
    name: 'Sony Xperia 1 VI',
    brand: 'Sony',
    price: 119000,
    images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=80'],
    specs: ['6.5" OLED 120Hz', 'Snapdragon 8 Gen 3', 'Creator-grade video tools'],
    description: 'Cinema-inspired flagship for creators who want manual camera control',
    inStock: true,
    condition: 'Like New',
    category: 'flagship',
    color: 'Khaki Green',
    year: '2024',
    storage: '256GB',
    ram: '12GB',
    stockQuantity: 2,
  },
  {
    id: '7',
    name: 'Motorola Edge 50 Ultra',
    brand: 'Motorola',
    price: 54999,
    images: ['https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?auto=format&fit=crop&w=1200&q=80'],
    specs: ['6.7" pOLED', 'Snapdragon 8s Gen 3', '125W TurboPower'],
    description: 'Premium finish, strong battery life, and fast charging for daily power users',
    inStock: true,
    condition: 'Excellent',
    category: 'mid-range',
    color: 'Peach Fuzz',
    year: '2024',
    storage: '512GB',
    ram: '12GB',
    stockQuantity: 9,
  },
]
