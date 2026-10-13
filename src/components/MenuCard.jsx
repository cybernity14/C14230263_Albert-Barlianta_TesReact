
import styles from "./MenuCard.module.css";

function MenuCard({ menu, onTambah }) {
  const habis = menu.stok === 0;

  const hargaRupiah = menu.harga.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  return (
    <article className={styles.card}>
      <h3 className={styles.nama}>{menu.nama}</h3>

      <p className={styles.harga}>{hargaRupiah}</p>

      <p className={styles.info}>
        Kategori: {menu.kategori}
      </p>

      <p className={habis ? styles.habis : styles.tersedia}>
        Stok: {habis ? "Habis" : menu.stok}
      </p>

      <button
        type="button"
        className={styles.tombol}
        onClick={() => onTambah(menu)}
        disabled={habis}
      >
        {habis ? "Stok Habis" : "Tambah"}
      </button>
    </article>
  );
}

export default MenuCard;
