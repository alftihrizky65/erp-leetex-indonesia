# Product Requirement Document (PRD) - ERP Database Architecture
**Project:** ERP Leetex Indonesia  
**Document Version:** 1.0.0  
**Target System:** Enterprise Resource Planning (ERP) Database  

---

## 1. Pendahuluan & Standardisasi
Dokumen ini dirancang khusus sebagai panduan arsitektur database ERP agar pengembang sistem (baik programmer manusia maupun AI) dapat mengimplementasikan schema database secara konsisten, terstruktur, dan siap pakai tanpa kebingungan.

### Konvensi Penamaan (Naming Conventions)
- **Nama Tabel:** Menggunakan format *snake_case* jamak (plural), contoh: `users`, `employees`, `sales_orders`.
- **Primary Key:** Menggunakan nama `id` dengan tipe data `UUID` atau `BIGINT AUTO_INCREMENT` (disesuaikan dengan database engine yang dipilih, misal PostgreSQL/MySQL).
- **Foreign Key:** Menggunakan format `nama_tabel_tunggal_id`, contoh: `user_id`, `sales_order_id`.
- **Kolom Audit:** Setiap tabel wajib memiliki kolom audit:
  - `created_at` (timestamp)
  - `updated_at` (timestamp)
  - `deleted_at` (timestamp, untuk soft delete jika diperlukan)

---

## 2. Struktur Modul & Folder Database
Folder database telah disiapkan pada direktori [database/schemas/](file:///c:/laragon/www/erp-leetex-indonesia/database/schemas/) dengan pembagian modul sebagai berikut:

```
database/schemas/
├── users/          # Autentikasi dan Otorisasi
├── employees/      # SDM, Jadwal, Shift, Absensi
├── payroll/        # Penggajian & Insentif
├── finance/        # Kas, Buku Besar, Pemasukan & Pengeluaran
├── inventory/      # Barang, Varian, Kategori, Stok Fisik & Digital
├── machines/       # Data Mesin & Maintenance
├── sales/          # Pelanggan & Pesanan Penjualan
├── procurement/    # Supplier, Purchase Order, Penerimaan & HPP
└── production/     # BOM, Tahapan Produksi, Perintah Kerja
```

---

## 3. Spesifikasi Detail 25 Tabel Database

### Modul 1: User & Authentication Management (`users/`)
#### 1. Tabel `users`
*Tabel untuk manajemen autentikasi pengguna sistem.*
- **Fields:**
  - `id` (UUID, Primary Key)
  - `username` (VARCHAR(50), Unique)
  - `email` (VARCHAR(100), Unique)
  - `password` (VARCHAR(255))
  - `role` (ENUM('admin', 'staff_hr', 'staff_warehouse', 'staff_production', 'staff_finance', 'director'))
  - `is_active` (BOOLEAN, Default: true)
- **Relations:**
  - One-to-One dengan `employees` (jika user merupakan pegawai internal).

---

### Modul 2: Human Resources Management / HRM (`employees/` & `payroll/`)
#### 2. Tabel `employees` (Data Pegawai)
*Menyimpan data profil pegawai secara lengkap.*
- **Fields:**
  - `id` (UUID, Primary Key)
  - `user_id` (UUID, Nullable, Foreign Key -> `users.id`)
  - `employee_code` (VARCHAR(20), Unique) - *Format: EMP-YYYYMM-XXXX*
  - `full_name` (VARCHAR(150))
  - `phone` (VARCHAR(20))
  - `address` (TEXT)
  - `department` (VARCHAR(50))
  - `position` (VARCHAR(50))
  - `join_date` (DATE)
  - `status` (ENUM('permanent', 'contract', 'intern'))

#### 3. Tabel `employee_shifts` (Shift Karyawan)
*Definisi jam kerja shift (misal: Shift 1, Shift 2, Shift 3, Non-Shift).*
- **Fields:**
  - `id` (UUID, Primary Key)
  - `shift_name` (VARCHAR(50))
  - `start_time` (TIME)
  - `end_time` (TIME)
  - `is_night_shift` (BOOLEAN)

#### 4. Tabel `work_schedules` (Jadwal Kerja)
*Penjadwalan harian/mingguan pegawai dengan shift tertentu.*
- **Fields:**
  - `id` (UUID, Primary Key)
  - `employee_id` (UUID, Foreign Key -> `employees.id`)
  - `employee_shift_id` (UUID, Foreign Key -> `employee_shifts.id`)
  - `schedule_date` (DATE)

#### 5. Tabel `attendances` (Absensi)
*Pencatatan kehadiran harian pegawai.*
- **Fields:**
  - `id` (UUID, Primary Key)
  - `employee_id` (UUID, Foreign Key -> `employees.id`)
  - `schedule_date` (DATE)
  - `check_in` (TIMESTAMP, Nullable)
  - `check_out` (TIMESTAMP, Nullable)
  - `status` (ENUM('present', 'late', 'absent', 'sick', 'leave'))
  - `notes` (TEXT, Nullable)

#### 6. Tabel `payrolls` (Penggajian)
*Pencatatan penggajian bulanan pegawai.*
- **Fields:**
  - `id` (UUID, Primary Key)
  - `employee_id` (UUID, Foreign Key -> `employees.id`)
  - `period` (VARCHAR(7)) - *Contoh: "2026-07"*
  - `basic_salary` (DECIMAL(15,2))
  - `allowances` (DECIMAL(15,2)) - *Tunjangan*
  - `deductions` (DECIMAL(15,2)) - *Potongan (absen, dll)*
  - `net_salary` (DECIMAL(15,2))
  - `payment_status` (ENUM('draft', 'paid', 'cancelled'))
  - `paid_at` (TIMESTAMP, Nullable)

---

### Modul 3: Finance & Accounting (`finance/`)
#### 7. Tabel `cash_transactions` (Pemasukan & Pengeluaran)
*Tabel transaksi keuangan umum untuk mencatat cash flow perusahaan.*
- **Fields:**
  - `id` (UUID, Primary Key)
  - `transaction_type` (ENUM('income', 'expense'))
  - `category` (VARCHAR(50)) - *Contoh: operasional, penjualan, pembelian, dll*
  - `amount` (DECIMAL(15,2))
  - `transaction_date` (TIMESTAMP)
  - `description` (TEXT)
  - `reference_code` (VARCHAR(50), Nullable) - *Menghubungkan ke Sales Order/Purchase Order*

---

### Modul 4: Inventory & Warehouse (`inventory/`)
#### 8. Tabel `product_categories` (Kategori Barang)
*Kategori untuk pengelompokan barang (misal: Bahan Baku, Barang Jadi, Sparepart).*
- **Fields:**
  - `id` (UUID, Primary Key)
  - `category_name` (VARCHAR(100))
  - `description` (TEXT, Nullable)

#### 9. Tabel `products` (Data Barang)
*Master data barang/produk utama.*
- **Fields:**
  - `id` (UUID, Primary Key)
  - `category_id` (UUID, Foreign Key -> `product_categories.id`)
  - `sku` (VARCHAR(50), Unique) - *Stock Keeping Unit*
  - `product_name` (VARCHAR(150))
  - `unit_of_measure` (VARCHAR(20)) - *Contoh: Pcs, Kg, Roll*
  - `description` (TEXT, Nullable)

#### 10. Tabel `product_variants` (Varian Barang)
*Spesifikasi variasi barang seperti warna, ukuran, grade.*
- **Fields:**
  - `id` (UUID, Primary Key)
  - `product_id` (UUID, Foreign Key -> `products.id`)
  - `variant_sku` (VARCHAR(50), Unique)
  - `variant_name` (VARCHAR(100)) - *Contoh: Merah - Ukuran L*
  - `additional_price` (DECIMAL(15,2), Default: 0.00)

#### 11. Tabel `physical_stocks` (Stok Fisik)
*Stok aktual yang berada di dalam gudang fisik secara riil (diperbarui saat barang datang/keluar).*
- **Fields:**
  - `id` (UUID, Primary Key)
  - `product_variant_id` (UUID, Foreign Key -> `product_variants.id`)
  - `warehouse_location` (VARCHAR(100)) - *Rak/Lokasi spesifik*
  - `quantity` (DECIMAL(12,4))
  - `last_checked_at` (TIMESTAMP)

#### 12. Tabel `digital_stocks` (Stok Digital / Stok Sistem)
*Stok tercatat secara sistem/logical, memperhitungkan alokasi pesanan (booked stock) dan transit.*
- **Fields:**
  - `id` (UUID, Primary Key)
  - `product_variant_id` (UUID, Foreign Key -> `product_variants.id`)
  - `quantity_available` (DECIMAL(12,4)) - *Stok bebas yang siap dijual*
  - `quantity_allocated` (DECIMAL(12,4)) - *Stok yang sudah dibooking pelanggan*
  - `quantity_incoming` (DECIMAL(12,4)) - *Stok dalam perjalanan dari PO*

---

### Modul 5: Asset & Machine Maintenance (`machines/`)
#### 13. Tabel `machines` (Data Mesin)
*Master data mesin produksi pabrik.*
- **Fields:**
  - `id` (UUID, Primary Key)
  - `machine_code` (VARCHAR(50), Unique)
  - `machine_name` (VARCHAR(100))
  - `brand_model` (VARCHAR(100))
  - `purchase_date` (DATE)
  - `status` (ENUM('active', 'under_maintenance', 'broken', 'inactive'))

#### 14. Tabel `machine_maintenance_schedules` (Jadwal Perawatan Mesin)
*Jadwal preventif pemeliharaan mesin.*
- **Fields:**
  - `id` (UUID, Primary Key)
  - `machine_id` (UUID, Foreign Key -> `machines.id`)
  - `scheduled_date` (DATE)
  - `maintenance_type` (ENUM('routine', 'deep_clean', 'part_replacement'))
  - `assigned_technician` (VARCHAR(100))
  - `status` (ENUM('pending', 'in_progress', 'completed', 'overdue'))

#### 15. Tabel `machine_maintenance_logs` (Riwayat Perawatan Mesin)
*Log realisasi tindakan perawatan yang sudah dilakukan.*
- **Fields:**
  - `id` (UUID, Primary Key)
  - `schedule_id` (UUID, Nullable, Foreign Key -> `machine_maintenance_schedules.id`)
  - `machine_id` (UUID, Foreign Key -> `machines.id`)
  - `execution_date` (DATE)
  - `action_taken` (TEXT)
  - `replaced_parts` (TEXT, Nullable)
  - `cost` (DECIMAL(15,2))
  - `technician_notes` (TEXT)

---

### Modul 6: Sales & Customer CRM (`sales/`)
#### 16. Tabel `customers` (Pelanggan)
*Data profil pelanggan/klien.*
- **Fields:**
  - `id` (UUID, Primary Key)
  - `customer_name` (VARCHAR(150))
  - `company_name` (VARCHAR(150), Nullable)
  - `email` (VARCHAR(100), Nullable)
  - `phone` (VARCHAR(20))
  - `address` (TEXT)

#### 17. Tabel `sales_orders` (Pesanan Penjualan)
*Dokumen utama transaksi pemesanan oleh pelanggan.*
- **Fields:**
  - `id` (UUID, Primary Key)
  - `customer_id` (UUID, Foreign Key -> `customers.id`)
  - `order_number` (VARCHAR(50), Unique) - *Format: SO-YYYYMM-XXXX*
  - `order_date` (DATE)
  - `total_amount` (DECIMAL(15,2))
  - `status` (ENUM('draft', 'pending', 'processing', 'shipped', 'completed', 'cancelled'))

#### 18. Tabel `sales_order_details` (Detail Pesanan Penjualan)
*Rincian item produk yang dipesan dalam Sales Order.*
- **Fields:**
  - `id` (UUID, Primary Key)
  - `sales_order_id` (UUID, Foreign Key -> `sales_orders.id`)
  - `product_variant_id` (UUID, Foreign Key -> `product_variants.id`)
  - `quantity` (DECIMAL(12,4))
  - `unit_price` (DECIMAL(15,2))
  - `subtotal` (DECIMAL(15,2))

---

### Modul 7: Procurement & Vendor Management (`procurement/`)
#### 19. Tabel `suppliers` (Supplier / Vendor)
*Master data supplier penyedia bahan baku/barang.*
- **Fields:**
  - `id` (UUID, Primary Key)
  - `supplier_name` (VARCHAR(150))
  - `contact_person` (VARCHAR(100))
  - `email` (VARCHAR(100), Nullable)
  - `phone` (VARCHAR(20))
  - `address` (TEXT)

#### 20. Tabel `purchase_orders` (Pesanan Pembelian)
*Dokumen pemesanan barang ke supplier/vendor.*
- **Fields:**
  - `id` (UUID, Primary Key)
  - `supplier_id` (UUID, Foreign Key -> `suppliers.id`)
  - `po_number` (VARCHAR(50), Unique) - *Format: PO-YYYYMM-XXXX*
  - `po_date` (DATE)
  - `estimated_delivery` (DATE, Nullable)
  - `total_amount` (DECIMAL(15,2))
  - `status` (ENUM('draft', 'ordered', 'partially_received', 'received', 'cancelled'))

#### 21. Tabel `goods_receipts` (Penerimaan Barang)
*Pencatatan barang yang diterima di gudang berdasarkan Purchase Order.*
- **Fields:**
  - `id` (UUID, Primary Key)
  - `purchase_order_id` (UUID, Foreign Key -> `purchase_orders.id`)
  - `receipt_number` (VARCHAR(50), Unique) - *Format: RC-YYYYMM-XXXX*
  - `received_date` (TIMESTAMP)
  - `received_by` (UUID, Foreign Key -> `users.id`)

#### 22. Tabel `cost_of_goods_manufactured` (Harga Pokok Produksi / HPP)
*Tabel analisis biaya produksi per item barang untuk mendeteksi inflasi harga bahan baku.*
- **Fields:**
  - `id` (UUID, Primary Key)
  - `product_variant_id` (UUID, Foreign Key -> `product_variants.id`)
  - `calculation_date` (DATE)
  - `raw_material_cost` (DECIMAL(15,2))
  - `labor_cost` (DECIMAL(15,2))
  - `overhead_cost` (DECIMAL(15,2))
  - `hpp_total` (DECIMAL(15,2)) - *Jumlah dari total biaya produksi per unit*
  - `inflation_rate` (DECIMAL(5,2)) - *Persentase deviasi kenaikan biaya dibanding periode sebelumnya*

---

### Modul 8: Production & Manufacturing (`production/`)
#### 23. Tabel `bills_of_materials` (BOM)
*Formulasi / resep pembuatan barang jadi dari bahan baku.*
- **Fields:**
  - `id` (UUID, Primary Key)
  - `parent_product_variant_id` (UUID, Foreign Key -> `product_variants.id`) - *Barang Jadi*
  - `component_product_variant_id` (UUID, Foreign Key -> `product_variants.id`) - *Bahan Baku*
  - `quantity_required` (DECIMAL(12,4)) - *Jumlah bahan baku yang dibutuhkan*

#### 24. Tabel `production_stages` (Tahapan Produksi)
*Alur proses produksi (misal: Tahap 1: Potong, Tahap 2: Jahit, Tahap 3: Finishing).*
- **Fields:**
  - `id` (UUID, Primary Key)
  - `stage_name` (VARCHAR(100))
  - `stage_sequence` (INTEGER) - *Urutan pengerjaan*
  - `estimated_duration_minutes` (INTEGER)

#### 25. Tabel `work_orders` (Perintah Kerja)
*Instruksi resmi untuk memulai proses produksi barang.*
- **Fields:**
  - `id` (UUID, Primary Key)
  - `wo_number` (VARCHAR(50), Unique) - *Format: WO-YYYYMM-XXXX*
  - `product_variant_id` (UUID, Foreign Key -> `product_variants.id`) - *Barang yang diproduksi*
  - `quantity_target` (DECIMAL(12,4))
  - `quantity_produced` (DECIMAL(12,4), Default: 0.00)
  - `start_date` (DATE)
  - `end_date` (DATE, Nullable)
  - `status` (ENUM('draft', 'released', 'in_progress', 'paused', 'completed', 'cancelled'))

---

## 4. Panduan Implementasi Selanjutnya untuk Developer / AI
Saat Anda melanjutkan pembuatan kode/schema, ikuti langkah berikut:
1. **Pilih Database Engine:** Gunakan Relational DB seperti PostgreSQL atau MySQL untuk konsistensi relasi data yang kompleks (BOM, PO, SO).
2. **Pilih ORM/Query Builder:** Prisma, Kysely, atau Sequelize sangat direkomendasikan untuk Next.js.
3. **Scaffolding Urutan Migrasi:** Buat tabel master terlebih dahulu sebelum tabel transaksi:
   1. `users`, `product_categories`, `suppliers`, `customers`, `machines`, `employee_shifts`.
   2. `employees`, `products`, `production_stages`.
   3. `product_variants`, `work_schedules`, `machine_maintenance_schedules`.
   4. `attendances`, `payrolls`, `cash_transactions`, `physical_stocks`, `digital_stocks`, `machine_maintenance_logs`, `sales_orders`, `purchase_orders`, `bills_of_materials`.
   5. `sales_order_details`, `goods_receipts`, `cost_of_goods_manufactured`, `work_orders`.
