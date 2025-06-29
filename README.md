# 📚 Sistem Rekomendasi Buku Berbasis Content-Based Filtering (CBF)

Proyek ini adalah sistem rekomendasi buku menggunakan pendekatan Content-Based Filtering berbasis Flask (backend) dan HTML/JS (frontend). Sistem merekomendasikan buku lain berdasarkan kemiripan tema/isi dengan buku yang dicari.

---

## 📦 Struktur Folder
```
cbf-rekomendasi/
├── backend/
│ ├── app.py
│ ├── model/
│ │ ├── recommender.py
│ │ └── db.py
│ └── database/
│ └── koneksi.py
├── frontend/
│ ├── index.html
│ ├── js/
│ │ ├── api.js
│ │ └── main.js
└── requirements.txt
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
- Masuk ke folder frontend/
- Buka index.html dengan Live Server (di VSCode: klik kanan → Open with Live Server)
- Atau via terminal:

```bash
cd frontend
python -m http.server 5500
```
Buka browser ke: http://localhost:5500

## ⚙️ Konfigurasi Database MySQL
Buat database pustaka dan tabel books:

```sql
CREATE DATABASE pustaka;

USE pustaka;

CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title TEXT,
  spec_detail_info TEXT,
  notes TEXT,
  classification TEXT
);
```
Impor data kamu ke tabel books sesuai kolom di atas.
