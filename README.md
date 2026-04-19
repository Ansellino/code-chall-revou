# Product Catalog — RevoU Code Challenge

## Live Demo
Live Demo:https://code-chall-revou.vercel.app/

## Tech Stack
- React 18 + Vite
- React Router DOM v6 (Data API: createBrowserRouter, loader)
- Tailwind CSS v3

## Features
- Cascading dropdown filters (Category > Sub-Category > Brand)
- URL-based state persistence (filter tidak hilang saat refresh)
- Reset filter button
- Dynamic breadcrumb navigation
- Responsive product grid

## How to Run
```bash
npm install
npm run dev
```

## Screenshots
### Initial State
![alt text](public/image3.png)

### Cascading Filter in Action
![alt text](public/image2.png)

### URL State Persistence
![alt text](public/image.png)

## Problem Solving Approach
State filter disimpan di URL menggunakan useSearchParams() dari React
Router DOM, bukan useState. Ini memastikan filter tidak hilang saat
browser di-refresh karena URL tetap sama.

Data di-load menggunakan loader function dari React Router Data API,
sehingga data tersedia sebelum komponen dirender.

## 📝 Technical Practice Milestone 1

### Context & Objective
Session ini mengevaluasi implementasi challenge E-Commerce Catalog Filter.
Fokus utamanya bukan hanya aplikasi berjalan, tetapi juga:
- Cara berpikir dan problem-solving saat implementasi
- Pemahaman konsep fundamental (React Router, URL state, DOM rendering)
- Kemampuan komunikasi teknis yang jelas dan terstruktur

Target durasi: 25 menit.

### ⏱️ Session Structure (25 Menit)

#### 1) Ice Breaking & Introduction (2 Menit)
- Perkenalkan diri secara singkat (nama, latar belakang, stack utama)
- Sampaikan agenda 25 menit secara ringkas
- Set ekspektasi: demo singkat, lalu deep dive teknis, lalu Q&A dua arah

Contoh opening singkat:
"Hari ini saya akan demo aplikasi catalog filter, jelaskan arsitektur intinya, lalu masuk ke keputusan teknis seperti URL state, cascading filter, dan edge case handling."

#### 2) Demo & Code Walkthrough (8 Menit)

Urutan demo yang disarankan:
1. Buka halaman awal, tunjukkan semua produk tampil.
2. Pilih Category -> Subcategory -> Brand, tunjukkan cascading dropdown berjalan.
3. Tunjukkan URL berubah sesuai filter.
4. Refresh browser, tunjukkan filter tetap tersimpan.
5. Tekan Reset, tunjukkan URL kembali bersih dan data kembali semua.
6. Tunjukkan breadcrumb dan jumlah produk ikut berubah.
7. (Opsional) Tunjukkan mobile filter drawer bekerja.

Arsitektur high-level yang perlu dijelaskan:
1. Routing & Data Loading:
`src/router.jsx` memakai `createBrowserRouter` dan `loader` untuk menyuplai data katalog sebelum halaman dirender.
2. Container Page:
`src/pages/CatalogPage.jsx` menjadi pusat orkestrasi: baca URL params, hitung opsi cascading, filter produk, dan kirim props ke komponen presentational.
3. Presentational Components:
- `src/components/FilterPanel.jsx` untuk controlled dropdown + reset.
- `src/components/Breadcrumb.jsx` untuk representasi filter aktif.
- `src/components/ProductGrid.jsx` untuk daftar produk atau empty state.

Data flow yang disarankan saat menjelaskan:
"Saat user memilih Category, handler memperbarui URL params lewat `setSearchParams`. Karena params berubah, komponen melakukan re-render. Opsi Subcategory dan Brand dihitung ulang dari relasi data, lalu produk difilter ulang. Akhirnya UI grid, breadcrumb, dan counter item ikut ter-update."

#### 3) Deep Dive & Technical Q&A (10 Menit)

Topik teknis yang kemungkinan ditanya dan jawaban ringkas:

1. Kenapa pakai URL state, bukan local state murni?
- URL state membuat filter shareable, bookmarkable, dan persisten saat refresh.
- Mengurangi mismatch antara UI state dan navigasi browser.

2. Kenapa reset Subcategory dan Brand saat Category berubah?
- Untuk menjaga konsistensi relasi data cascading.
- Mencegah kombinasi filter invalid (misal brand lama tidak ada di category baru).

3. Bagaimana mencegah invalid filter chain?
- `handleCategoryChange` mengosongkan `subcategory` dan `brand`.
- `handleSubcategoryChange` mengosongkan `brand`.
- Dropdown level bawah dinonaktifkan jika parent belum dipilih.

4. Apa alasan pakai `useMemo` untuk map data?
- Lookup by id jadi O(1) untuk breadcrumb dan label brand.
- Menghindari rekalkulasi map setiap render selama dependency tidak berubah.

5. Bagaimana pendekatan DOM manipulation di aplikasi ini?
- Tidak pakai manipulasi DOM imperatif langsung.
- Mengandalkan deklaratif React: state/URL berubah -> virtual DOM diff -> UI ter-update.
- Contoh: drawer mobile muncul/hilang lewat state `isFilterOpen` dan conditional rendering.

6. Edge case apa yang sudah ditangani?
- Empty result menampilkan pesan "Produk tidak ditemukan".
- Dropdown dependent disabled sampai parent valid dipilih.
- Refresh tetap aman karena source of truth ada di URL.

7. Edge case yang bisa ditingkatkan?
- Validasi query param liar (id tidak dikenal) agar otomatis fallback/clean URL.
- Optimasi filtering dengan precomputed index jika dataset jauh lebih besar.

Respons profesional saat ada bug:
"Benar, itu edge case yang terlewat. Perbaikannya saya akan tambahkan validasi params di level page, lalu normalisasi URL jika value tidak valid supaya state tetap konsisten."

#### 4) Reverse Interview, Feedback & Closing (5 Menit)
Siapkan 1-2 pertanyaan singkat:
1. "Di tim ini, standar kualitas frontend untuk level junior-mid lebih ditekankan ke mana: reliability, performance, atau maintainability?"
2. "Kalau challenge ini dikembangkan jadi production feature, prioritas perbaikan pertama yang diharapkan apa?"

Closing singkat:
"Secara implementasi, saya fokus pada URL-driven state, cascading filter yang konsisten, dan komponen yang terpisah jelas antara orchestration dan presentational."

### 🧑‍💻 Guidelines (How to Perform During Interview)

#### Mindset & Approach
- Be clear, structured, concise:
Jelaskan flow end-to-end, bukan lompat file acak.
- Do not be defensive:
Akui gap dengan profesional dan jelaskan perbaikan paling relevan.
- Know your why:
Setiap keputusan teknis harus punya alasan yang bisa dijelaskan cepat.

#### Pre-Interview Preparation Checklist
- Jalankan aplikasi lokal dan pastikan tanpa error.
- Siapkan 2 tab browser: aplikasi running + repository.
- Dry run presentasi maksimal 8 menit untuk demo + walkthrough.

Quick checklist:
- [ ] `npm install`
- [ ] `npm run dev`
- [ ] Uji alur Category -> Subcategory -> Brand
- [ ] Uji refresh (URL persistence)
- [ ] Uji tombol reset
- [ ] Uji empty state
- [ ] Uji tampilan mobile drawer
