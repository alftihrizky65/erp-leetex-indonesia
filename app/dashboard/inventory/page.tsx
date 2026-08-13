'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import * as Icons from 'lucide-react'

// ─── Product Data ───────────────────────────────────────────────────────────
interface Product {
  id: string
  name: string
  sku: string
  category: string
  price: number
  stock: number
  image: string
  description: string
}

const products: Product[] = [
  {
    id: '1',
    name: 'Kemeja Formal Lengan Panjang',
    sku: 'KMN-FP-001',
    category: 'Barang Jadi',
    price: 350000,
    stock: 150,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop',
    description: 'Kemeja formal premium dengan bahan katun pilihan, cocok untuk penggunaan sehari-hari dan acara formal.'
  },
  {
    id: '2',
    name: 'Kaos Polos Cotton Combed',
    sku: 'KZ-PL-002',
    category: 'Barang Jadi',
    price: 120000,
    stock: 320,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    description: 'Kaos polos dari cotton combed 30s yang nyaman dipakai, tersedia berbagai warna.'
  },
  {
    id: '3',
    name: 'Kain Katun Jepang Motif',
    sku: 'KKN-JP-003',
    category: 'Bahan Baku',
    price: 85000,
    stock: 85,
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=400&fit=crop',
    description: 'Kain katun Jepang premium dengan motif batik modern, lebar 150cm.'
  },
  {
    id: '4',
    name: 'Kemeja Casual Pendek',
    sku: 'KMN-CS-004',
    category: 'Barang Jadi',
    price: 280000,
    stock: 200,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop',
    description: 'Kemeja casual lengan pendek yang stylish dan nyaman untuk aktivitas santai.'
  },
  {
    id: '5',
    name: 'Benang Polyester Hitam',
    sku: 'BNG-PL-005',
    category: 'Bahan Baku',
    price: 45000,
    stock: 500,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    description: 'Benang polyester premium berkualitas tinggi, cocok untuk berbagai aplikasi tekstil.'
  },
  {
    id: '6',
    name: 'Jaket Denim Classic',
    sku: 'JKT-DN-006',
    category: 'Barang Jadi',
    price: 450000,
    stock: 75,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
    description: 'Jaket denim klasik dengan bahan berkualitas tinggi, tahan lama dan stylish.'
  },
  {
    id: '7',
    name: 'Kain Flanel Premium',
    sku: 'KFN-PR-007',
    category: 'Bahan Baku',
    price: 65000,
    stock: 120,
    image: 'https://images.unsplash.com/photo-1584116591572-d8a84c3a81c5?w=400&h=400&fit=crop',
    description: 'Kain flanel premium yang lembut dan hangat, tersedia berbagai warna menarik.'
  },
  {
    id: '8',
    name: 'Kaos Oversize Streetwear',
    sku: 'KZ-OS-008',
    category: 'Barang Jadi',
    price: 180000,
    stock: 180,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop',
    description: 'Kaos oversize dengan desain streetwear modern, bahan adem dan menyerap keringat.'
  },
]

// ─── Product Card Component ───────────────────────────────────────────────────
interface ProductCardProps {
  product: Product
  onView: (product: Product) => void
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onView, onEdit, onDelete }) => {
  const [imageError, setImageError] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-green-300 transition-all duration-300">
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <Icons.ImageOff className="w-12 h-12 text-gray-400" />
          </div>
        ) : (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        )}
        {/* Stock Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            product.stock > 100
              ? 'bg-green-500 text-white'
              : product.stock > 50
              ? 'bg-yellow-500 text-white'
              : 'bg-red-500 text-white'
          }`}>
            Stok: {product.stock}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <p className="text-xs text-gray-500 mb-1">{product.sku}</p>
            <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{product.name}</h3>
            <p className="text-xs text-gray-500 mt-1">{product.category}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <p className="text-lg font-bold text-[#2E7D32]">{formatPrice(product.price)}</p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onView(product)}
              className="p-2 rounded-lg text-gray-600 hover:bg-green-50 hover:text-[#2E7D32] transition-colors"
              title="Lihat Detail"
            >
              <Icons.Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => onEdit(product)}
              className="p-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              title="Edit"
            >
              <Icons.Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(product.id)}
              className="p-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
              title="Hapus"
            >
              <Icons.Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Product Modal Component ───────────────────────────────────────────────────
interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  mode: 'view' | 'edit' | 'add'
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose, mode }) => {
  if (!isOpen) return null

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const isAddMode = mode === 'add'
  const displayProduct = isAddMode ? {
    id: '',
    name: '',
    sku: '',
    category: '',
    price: 0,
    stock: 0,
    image: '',
    description: ''
  } : product

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">
            {mode === 'view' ? 'Detail Produk' : mode === 'edit' ? 'Edit Produk' : 'Tambah Produk Baru'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Icons.X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {mode === 'view' && displayProduct && (
            <div className="space-y-6">
              {/* Product Image */}
              <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden">
                <Image
                  src={displayProduct.image}
                  alt={displayProduct.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>

              {/* Product Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">SKU</p>
                  <p className="font-medium text-gray-900">{displayProduct.sku}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Kategori</p>
                  <p className="font-medium text-gray-900">{displayProduct.category}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Harga</p>
                  <p className="font-bold text-lg text-[#2E7D32]">{formatPrice(displayProduct.price)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Stok</p>
                  <p className="font-medium text-gray-900">{displayProduct.stock} unit</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Deskripsi</p>
                <p className="text-sm text-gray-700">{displayProduct.description}</p>
              </div>
            </div>
          )}

          {mode === 'edit' || mode === 'add' ? (
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
                  <input
                    type="text"
                    defaultValue={displayProduct?.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 focus:border-[#2E7D32]"
                    placeholder="Masukkan nama produk"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                  <input
                    type="text"
                    defaultValue={displayProduct?.sku}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 focus:border-[#2E7D32]"
                    placeholder="Contoh: PRD-001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 focus:border-[#2E7D32]">
                    <option value="">Pilih Kategori</option>
                    <option value="Barang Jadi">Barang Jadi</option>
                    <option value="Bahan Baku">Bahan Baku</option>
                    <option value="Perlengkapan">Perlengkapan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp)</label>
                  <input
                    type="number"
                    defaultValue={displayProduct?.price}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 focus:border-[#2E7D32]"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stok</label>
                  <input
                    type="number"
                    defaultValue={displayProduct?.stock}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 focus:border-[#2E7D32]"
                    placeholder="0"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL Gambar</label>
                  <input
                    type="url"
                    defaultValue={displayProduct?.image}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 focus:border-[#2E7D32]"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                  <textarea
                    rows={3}
                    defaultValue={displayProduct?.description}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 focus:border-[#2E7D32]"
                    placeholder="Deskripsi produk..."
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2E7D32] text-white rounded-lg text-sm font-medium hover:bg-[#1b5e20] transition-colors"
                >
                  {mode === 'add' ? 'Tambah Produk' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          ) : null}
        </div>
      </div>
    </div>
  )
}

// ─── Inventory Page ─────────────────────────────────────────────────────────
export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'add'>('view')
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const categories = ['all', ...Array.from(new Set(products.map((p) => p.category)))]

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product)
    setModalMode('view')
    setIsModalOpen(true)
  }

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product)
    setModalMode('edit')
    setIsModalOpen(true)
  }

  const handleAddProduct = () => {
    setSelectedProduct(null)
    setModalMode('add')
    setIsModalOpen(true)
  }

  const handleDeleteProduct = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      console.log('Delete product:', id)
      // Implement delete logic
    }
  }

  return (
    <div className="space-y-6">

      {/* ── Page Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Katalog Produk</h1>
          <p className="text-sm text-gray-500 mt-0.5">Kelola katalog produk lengkap dengan gambar dan informasi detail.</p>
        </div>
        <button
          onClick={handleAddProduct}
          className="flex items-center gap-2 px-4 py-2 bg-[#2E7D32] text-white rounded-lg text-sm font-medium hover:bg-[#1b5e20] transition-colors"
        >
          <Icons.Plus className="w-4 h-4" />
          Tambah Produk
        </button>
      </div>

      {/* ── Filters & Search ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama atau SKU..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 focus:border-[#2E7D32] w-64"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 focus:border-[#2E7D32]"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'Semua Kategori' : cat}
              </option>
            ))}
          </select>
        </div>

        {/* Results Count */}
        <p className="text-sm text-gray-500">
          Menampilkan <span className="font-semibold text-gray-900">{filteredProducts.length}</span> dari{' '}
          <span className="font-semibold text-gray-900">{products.length}</span> produk
        </p>
      </div>

      {/* ── Products Grid ── */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onView={handleViewProduct}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Icons.Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Tidak ada produk yang ditemukan</p>
        </div>
      )}

      {/* ── Product Modal ── */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
      />

    </div>
  )
}
