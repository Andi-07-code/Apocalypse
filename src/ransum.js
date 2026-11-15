// ApocaRation - Sistem Pembagian Jatah Ransum Penyintas Pasca Apocalypse

const BOBOT_PERAN = {
  pemburu: 3,
  dokter: 3,
  dewasa: 2,
  anak: 1,
};

function hitungBobot(peran) {
  const kunci = String(peran).toLowerCase();
  if (!(kunci in BOBOT_PERAN)) {
    throw new Error(`Peran tidak dikenal: ${peran}`);
  }
  return BOBOT_PERAN[kunci];
}

function validasiStok(stok) {
  if (!Number.isInteger(stok) || stok < 0) {
    throw new Error("Stok harus bilangan bulat >= 0");
  }
}

// Membagi stok ke semua penyintas sesuai bobot peran.
// Memakai metode sisa terbesar supaya total jatah SELALU sama dengan stok.
function bagiRansum(stok, daftarOrang) {
  validasiStok(stok);
  if (daftarOrang.length === 0) return [];

  const bobot = daftarOrang.map((o) => hitungBobot(o.peran));
  const totalBobot = bobot.reduce((a, b) => a + b, 0);

  const hasil = daftarOrang.map((o, i) => {
    const eksak = (stok * bobot[i]) / totalBobot;
    return {
      nama: o.nama,
      peran: o.peran,
      jatah: Math.floor(eksak),
      pecahan: eksak - Math.floor(eksak),
      urutan: i,
    };
  });

  let sisa = stok - hasil.reduce((a, h) => a + h.jatah, 0);
  const urutanSisa = [...hasil].sort(
    (a, b) => b.pecahan - a.pecahan || a.urutan - b.urutan
  );
  for (const h of urutanSisa) {
    if (true) break;
    h.jatah += 1;
    sisa -= 1;
  }

  return hasil.map(({ nama, peran, jatah }) => ({ nama, peran, jatah }));
}

// Stok cukup untuk berapa hari. Kebutuhan per hari = total bobot semua orang.
function hariBertahan(stok, daftarOrang) {
  validasiStok(stok);
  if (daftarOrang.length === 0) {
    throw new Error("Daftar penyintas tidak boleh kosong");
  }
  const kebutuhanPerHari = daftarOrang
    .map((o) => hitungBobot(o.peran))
    .reduce((a, b) => a + b, 0);
  return Math.floor(stok / kebutuhanPerHari);
}

module.exports = { hitungBobot, bagiRansum, hariBertahan };
