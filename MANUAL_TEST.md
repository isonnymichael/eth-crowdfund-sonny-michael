# Panduan Pengujian Manual (Manual Testing Guide)

File ini berisi parameter contoh dan skenario untuk menguji kontrak `CrowdFund.sol` secara manual menggunakan Remix IDE.

## 1. Create Campaign
Gunakan fungsi `createCampaign` untuk membuat penggalangan dana baru.

**Parameter Contoh:**
- `_title`: `"Membangun Sekolah Blockchain"`
- `_description`: `"Penggalangan dana untuk beasiswa edukasi Web3 di Indonesia."`
- `_goalAmount`: `100000000000000000` (Ini adalah 0.1 ETH dalam Wei)
- `_durationDays`: `7` (Durasi 7 hari)

---

## 2. Contribute
Gunakan fungsi `contribute` dengan mengirimkan ETH dari akun lain (bukan creator).

**Parameter:**
- `_campaignId`: `1` (ID campaign pertama)
- **Value/Amount**: Pastikan Anda mengisi kolom **Value** di Remix (misal: `0.001 ether` atau `1000000000000000 wei`). Minimal kontribusi adalah 0.001 ETH.

---

## 3. Claim Funds
Gunakan fungsi ini jika target (`goalAmount`) sudah tercapai. **Hanya creator** yang bisa memanggil fungsi ini.

**Parameter:**
- `_campaignId`: `1`

---

## 4. Refund
Gunakan fungsi ini jika campaign **Gagal** (deadline lewat dan goal tidak tercapai) atau **Dibatalkan**.

**Parameter:**
- `_campaignId`: `1`

---

## 5. Fitur Tambahan (Additional Features)

### A. Batalkan Campaign (Cancel)
Hanya creator yang bisa membatalkan campaign yang sedang aktif.
- Fungsi: `cancelCampaign(1)`

### B. Perpanjang Deadline (Extend)
Creator bisa menambah waktu satu kali (maksimal 7 hari).
- Fungsi: `extendDeadline(1, 3)` (Menambah 3 hari)

### C. Cek Sisa Waktu
- Fungsi: `getTimeRemaining(1)` (Mengembalikan jumlah detik yang tersisa)

---

## Tips Konversi Unit
- `1 ETH` = `1,000,000,000,000,000,000 Wei` (10^18)
- `0.1 ETH` = `100,000,000,000,000,000 Wei`
- `0.01 ETH` = `10,000,000,000,000,000 Wei` (Minimal Goal)
- `0.001 ETH` = `1,000,000,000,000,000 Wei` (Minimal Kontribusi)
