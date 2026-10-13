
import { useState } from "react";

function Keranjang({ items, onTambah, onKurang, onHapus }) {
  const [konfirmasiHapus, setKonfirmasiHapus] = useState(null);

  const totalItem = items.reduce(
    (total, item) => total + item.qty,
    0
  );

  const totalHarga = items.reduce(
    (total, item) => total + item.harga * item.qty,
    0
  );

  const formatRupiah = (harga) =>
    harga.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    });

  const konfirmasi = (id) => {
    if (konfirmasiHapus === id) {
      onHapus(id);
      setKonfirmasiHapus(null);
    } else {
      setKonfirmasiHapus(id);
    }
  };

  return (
    <section className="keranjang">
      <h2>Keranjang ({totalItem})</h2>

      {items.length === 0 ? (
        <p>Keranjang masih kosong.</p>
      ) : (
        <>
          {items.map((item) => (
            <div className="keranjang-item" key={item.id}>
              <div>
                <strong>{item.nama}</strong>
                <p>{formatRupiah(item.harga)}</p>
                <p>Subtotal: {formatRupiah(item.harga * item.qty)}</p>
              </div>

              <div className="kontrol-qty">
                <button
                  type="button"
                  onClick={() => onKurang(item.id)}
                  aria-label={`Kurangi ${item.nama}`}
                >
                  −
                </button>

                <span>{item.qty}</span>

                <button
                  type="button"
                  onClick={() => onTambah(item.id)}
                  aria-label={`Tambah ${item.nama}`}
                >
                  +
                </button>

                {konfirmasiHapus === item.id ? (
                  <>
                    <span>Yakin ingin menghapus?</span>
                    <button
                      type="button"
                      onClick={() => konfirmasi(item.id)}
                      aria-label={`Konfirmasi hapus ${item.nama}`}
                    >
                      Ya, hapus
                    </button>
                    <button
                      type="button"
                      onClick={() => setKonfirmasiHapus(null)}
                    >
                      Batal
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => konfirmasi(item.id)}
                    aria-label={`Hapus ${item.nama}`}
                  >
                    Hapus
                  </button>
                )}
              </div>
            </div>
          ))}

          <h3>Total: {formatRupiah(totalHarga)}</h3>
        </>
      )}
    </section>
  );
}

export default Keranjang;
