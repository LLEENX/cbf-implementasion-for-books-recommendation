# 📚 Sistem Rekomendasi Buku Berbasis Content-Based Filtering (CBF)

Proyek ini adalah sistem rekomendasi buku menggunakan pendekatan Content-Based Filtering berbasis Flask (backend) dan HTML/JS (frontend). Sistem merekomendasikan buku lain berdasarkan kemiripan tema/isi dengan buku yang dicari.

---

## 📦 Struktur Folder
```
cbf-rekomendasi/
├── backend/
│   ├── app.py                  # Main Flask API
│   └── model/
│       ├── recommender.py      # Logika rekomendasi CBF
│       └── db.py               # Koneksi ke database MySQL
├── frontend/
│   ├── index.html              # Halaman utama web
│   └── js/
│       ├── api.js              # Kode fetch API
│       └── main.js             # Logika interaksi dan event listener
└── requirements.txt            # Daftar dependensi Python
```

---

## 🚀 Cara Menjalankan

### 1. Clone/Unduh Proyek
```bash
git clone https://github.com/username/cbf-rekomendasi.git
cd cbf-rekomendasi/backend
```

### 2. Buat dan Aktifkan Virtual Environment
```bash
python -m venv venv
venv\Scripts\activate      # Windows
# atau
source venv/bin/activate   # Linux/Mac
```

### 3. Install Dependencies
```bash
pip install -r ../requirements.txt
```


### 4. Jalankan Backend Flask
```bash
python app.py
```

Flask akan berjalan di: http://localhost:5000

### 5. Jalankan Frontend (via Live Server)
- Opsi 1: Menggunakan Live Server di VSCode
> Klik kanan index.html → Open with Live Server
- Opsi 2: Jalankan HTTP server manual
```bash
cd frontend
python -m http.server 5500
```
Buka browser ke: http://localhost:5500

## ⚙️ Konfigurasi Database MySQL
- Buat database dan tabel

```sql
CREATE DATABASE book-recommendation-cbf;

USE book-recommendation-cbf;

CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title TEXT,
  spec_detail_info TEXT,
  notes TEXT,
  classification TEXT
);
```
- Import Data
  Pastikan data buku dimasukkan ke dalam tabel books sesuai kolom di atas. Bisa dilakukan via phpMyAdmin (jika menggunakan Laragon) atau tool lain.

---

## ✅ Fitur
- ✅ Autocomplete judul buku
- ✅ Rekomendasi buku berdasarkan deskripsi
- ✅ Filter stopwords (kata umum dalam Bahasa Indonesia)
- ✅ Integrasi langsung ke database MySQL


