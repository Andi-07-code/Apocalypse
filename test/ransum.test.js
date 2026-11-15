const test = require("node:test");
const assert = require("node:assert");
const { hitungBobot, bagiRansum, hariBertahan } = require("../src/ransum");

const kelompok = [
  { nama: "Andi", peran: "pemburu" },
  { nama: "Fikram", peran: "dokter" },
  { nama: "Taufik", peran: "dewasa" },
  { nama: "Amba", peran: "anak" },
];

test("hitungBobot mengembalikan bobot sesuai peran", () => {
  assert.strictEqual(hitungBobot("pemburu"), 3);
  assert.strictEqual(hitungBobot("dokter"), 3);
  assert.strictEqual(hitungBobot("dewasa"), 2);
  assert.strictEqual(hitungBobot("anak"), 1);
});

test("hitungBobot menolak peran tidak dikenal", () => {
  assert.throws(() => hitungBobot("zombie"), /Peran tidak dikenal/);
});

test("total jatah SELALU sama dengan stok", () => {
  for (const stok of [0, 1, 7, 10, 25, 100, 101]) {
    const hasil = bagiRansum(stok, kelompok);
    const total = hasil.reduce((a, h) => a + h.jatah, 0);
    assert.strictEqual(total, stok, `gagal untuk stok ${stok}`);
  }
});

test("jatah pemburu lebih besar dari anak", () => {
  const hasil = bagiRansum(90, kelompok);
  const pemburu = hasil.find((h) => h.peran === "pemburu").jatah;
  const anak = hasil.find((h) => h.peran === "anak").jatah;
  assert.ok(pemburu > anak);
});

test("pembagian tepat: stok 90 dibagi bobot 3,3,2,1", () => {
  const hasil = bagiRansum(90, kelompok).map((h) => h.jatah);
  assert.deepStrictEqual(hasil, [30, 30, 20, 10]);
});

test("daftar kosong menghasilkan array kosong", () => {
  assert.deepStrictEqual(bagiRansum(50, []), []);
});

test("stok negatif ditolak", () => {
  assert.throws(() => bagiRansum(-5, kelompok), /Stok harus/);
});

test("hariBertahan: stok 27, kebutuhan 9 per hari -> 3 hari", () => {
  assert.strictEqual(hariBertahan(27, kelompok), 3);
});

test("hariBertahan menolak daftar kosong", () => {
  assert.throws(() => hariBertahan(10, []), /tidak boleh kosong/);
});
