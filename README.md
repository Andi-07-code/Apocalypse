# ApocaRation: Sistem Pembagian Jatah Ransum Penyintas Pasca Apocalypse
Proyek Team-Based Project (TBP) mata kuliah Rekayasa Perangkat Lunak.
Repository ini diuji otomatis menggunakan GitHub Actions.
# Nama Anggota Kelompok:
Andi Husni Mubarak - F5512520061

Moh. Fikram - F5512520066

Taufik Gandai - F5512520072

## Fitur
- `hitungBobot(peran)`: bobot pemburu=3, dokter=3, dewasa=2, anak=1
- `bagiRansum(stok, daftarOrang)`: membagi stok sesuai bobot, total jatah selalu sama dengan stok
- `hariBertahan(stok, daftarOrang)`: stok cukup untuk berapa hari

## Menjalankan di lokal
Butuh Node.js 18 atau lebih baru.

    npm ci
    npm test

## Menjalankan CI
Workflow ada di `.github/workflows/ci.yml` dan berjalan otomatis saat push dan pull request.
Langkahnya: checkout, setup Node 20, `npm ci`, lalu `npm test`.
Hasilnya dilihat di tab Actions pada repository GitHub.

## Bukti run
- Run sukses (Create ci.yml #1): [https://github.com/Andi-07-code/Apocalypse/actions/runs/43711569490/job/132804058942]
- Run gagal (Update ransum.js #2): [https://github.com/Andi-07-code/Apocalypse/actions/runs/43713207221/job/132809089659]
- Run setelah perbaikan (Update ransum.js #3): [https://github.com/Andi-07-code/Apocalypse/actions/runs/43713784967/job/132810825784]

## Catatan error dan perbaikan
- Gejala: pipeline gagal di langkah `npm test`. Test "total jatah SELALU sama dengan stok" tidak lolos.
- Penyebab: kondisi pada loop pembagian sisa diubah menjadi `if (true) break;`, sehingga loop berhenti di awal dan sisa pembulatan tidak dibagikan. Akibatnya total jatah kurang dari stok.
- Perbaikan: mengembalikan kondisi menjadi `if (sisa === 0) break;` sehingga sisa dibagikan sampai habis.
- Hasil: pipeline kembali hijau (run #3).

## Pembagian peran
Andi Husni Mubarak (F5512520061) : Membuat repository, kode fungsi (src/ransum.js), unit test (test/ransum.test.js), workflow CI (ci.yml)

Moh. Fikram (F5512520066) : Run Gagal (Update ransum.js #2) serta dokumentasinya

Taufik Gandai (F5512520072) : Run setelah perbaikan (Update ransum.js #3) serta dokumentasinya
