import React from 'react';

// Menangkap parameter 'data' yang dilempar dari App.jsx
function HasilRekomendasi({ data }) {
  // 1. Jika pengguna belum menekan tombol cari (data belum ada), jangan tampilkan apa-apa
  if (!data) return null;

  // 2. Jika pencarian sudah selesai tapi hasilnya kosong (budget terlalu kecil / menu langka)
  if (data.length === 0) {
    return (
      <section className="w-full py-24 bg-stone-50 border-t border-stone-200" id="hasil">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="bg-rose-50 border border-rose-200 p-10 md:p-14 rounded-3xl shadow-sm">
            <div className="text-5xl mb-6">💸</div>
            <h2 className="text-2xl md:text-3xl font-serif text-rose-900 mb-4">
              Kombinasi Menu Tidak Ditemukan
            </h2>
            <p className="text-rose-700 leading-relaxed max-w-lg mx-auto">
              Maaf, sistem tidak dapat merakit kombinasi 3 hidangan (Main Course, Beverage, dan Side Dish) yang
              total biayanya berada di bawah batasan anggaran yang Anda atur.
              <br /><br />
              <span className="font-semibold text-rose-900">Saran:</span> Cobalah untuk menaikkan sedikit slider batasan
              anggaran atau sesuaikan kembali kriteria rasa dan bahan.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // 3. Jika kombinasi berhasil ditemukan, render kartu rekomendasi seperti biasa
  return (
    <section className="w-full min-h-screen bg-white py-24 border-t border-stone-100" id="hasil">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif text-stone-900 mb-3">Hasil Analisis Sistem</h2>
          <p className="text-stone-500">Ditemukan kombinasi yang relevan dengan preferensi Anda saat ini</p>
        </div>

        <div className="grid gap-8">
          {data.map((paket, index) => (
            <div key={index} className="bg-stone-50 border border-stone-200 p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
              {/* Garis Aksen Toska di Kiri */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-600"></div>

              {/* Header Paket */}
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 border-b border-stone-200 pb-6">
                <div>
                  <h3 className="text-2xl font-serif text-stone-800">Paket Rekomendasi {index + 1}</h3>
                  <p className="text-sm text-stone-500 mt-1">
                    Akurasi Kecocokan: <span className="text-teal-700 font-bold bg-teal-100/50 px-2.5 py-0.5 rounded border border-teal-200 text-xs">
                      {paket['Total Skor'] ? (paket['Total Skor'] / 3).toFixed(2) : '0.00'} / 1.00
                    </span>
                  </p>
                </div>
                <div className="mt-4 md:mt-0 md:text-right flex flex-col md:items-end">
                  <p className="text-xs text-stone-500 font-medium mb-1">Total Biaya</p>
                  <span className="bg-white border border-stone-200 text-teal-700 px-4 py-1.5 rounded-lg font-bold text-xl shadow-sm">
                    Rp {paket['Total Harga'] ? paket['Total Harga'].toLocaleString('id-ID') : 0}
                  </span>
                </div>
              </div>

              {/* Grid 3 Kolom Item Hidangan */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['Main Course', 'Beverage', 'Side Dish'].map((kategori) => {
                  const item = paket[kategori] || {};

                  return (
                    <div key={kategori} className="bg-white border border-stone-200 p-5 rounded-xl flex flex-col h-full shadow-sm">
                      <p className="text-xs text-stone-500 font-medium mb-3">{kategori}:</p>

                      <div className="flex-grow mb-4">
                        <p className="text-base font-bold text-stone-800 leading-tight mb-1">
                          {item.nama_menu || 'Menu tidak tersedia'}
                        </p>
                        <p className="text-sm text-teal-700 font-medium mb-3">
                          {item.nama_restoran || '-'}
                        </p>

                        <div className="space-y-2 pt-2 border-t border-stone-100">
                          <p className="text-xs text-stone-600 leading-relaxed flex items-start gap-1.5">
                            <span className="text-stone-400 mt-0.5">📍</span>

                            {/* PERBAIKAN: Membuat alamat menjadi link interaktif ke Google Maps */}
                            {item.link_alamat ? (
                              <a
                                href={item.link_alamat}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-teal-700 hover:underline transition-colors"
                                title="Buka rute di peta"
                              >
                                {item.Alamat || item.alamat || 'Alamat tidak tersedia'}
                              </a>
                            ) : (
                              <span>{item.Alamat || item.alamat || 'Alamat tidak tersedia'}</span>
                            )}
                          </p>

                          {item.link_restoran &&
                            String(item.link_restoran).toLowerCase() !== 'tidak tersedia' &&
                            String(item.link_restoran).trim() !== '' ? (
                            <a
                              href={item.link_restoran}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-medium text-teal-600 hover:text-teal-800 hover:underline flex items-center gap-1.5 transition-colors inline-block"
                            >
                              <span>🛵</span> Pesan via Aplikasi
                            </a>
                          ) : (
                            <p className="text-xs text-stone-400 italic flex items-center gap-1.5">
                              <span className="grayscale opacity-60">🛵</span> Layanan antar tidak tersedia
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-sm border-t border-stone-200 pt-4 mt-auto">
                        <span className="text-stone-800 font-bold">
                          Rp {item.harga_menu ? item.harga_menu.toLocaleString('id-ID') : 0}
                        </span>
                        <span className="text-stone-400 font-mono text-[10px]">
                          Skor: {item.skor_kemiripan ? item.skor_kemiripan.toFixed(2) : '0.00'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HasilRekomendasi;