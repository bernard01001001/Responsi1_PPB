# Library Loan REST API

## 📖 Deskripsi Umum & Tujuan Proyek
Proyek ini adalah layanan REST API backend yang dibangun untuk mengelola sistem pencatatan peminjaman buku perpustakaan. API ini mendukung operasi CRUD secara lengkap serta fitur filter data berbasis query parameter (seperti menyaring status peminjaman). Dibangun menggunakan **Node.js**, **Express.js**, dan arsitektur modular MVC, serta memanfaatkan database **Supabase (PostgreSQL)** dan dideploy menggunakan serverless **Vercel**.

---

## 📊 Struktur Data / Schema (`loans`)

| Kolom | Tipe Data | Deskripsi |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key (Auto-generated) |
| `member_name` | TEXT | Nama anggota perpustakaan |
| `book_title` | TEXT | Judul buku yang dipinjam |
| `borrow_date` | DATE | Tanggal peminjaman |
| `due_date` | DATE | Tanggal batas pengembalian |
| `status` | TEXT | Status (`Dipinjam`, `Dikembalikan`, `Terlambat`) |
| `created_at` | TIMESTAMP | Waktu pencatatan data dibuat |
