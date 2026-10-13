
function FilterBar({
  menus,
  keyword,
  setKeyword,
  kategoriAktif,
  setKategoriAktif,
  onBersihkan,
  inputRef,
}) {
  const kategori = [
    ...new Set(menus.map((menu) => menu.kategori)),
  ];

  const jumlahKategori = (namaKategori) =>
    menus.filter((menu) => menu.kategori === namaKategori).length;

  return (
    <section className="filter-bar">
      <div className="pencarian">
        <input
          ref={inputRef}
          type="text"
          placeholder="Cari nama menu..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          aria-label="Cari nama menu"
        />

        <button type="button" onClick={onBersihkan}>
          Bersihkan
        </button>
      </div>

      <div className="filter-kategori">
        <button
          type="button"
          className={kategoriAktif === "semua" ? "aktif" : ""}
          onClick={() => setKategoriAktif("semua")}
        >
          Semua ({menus.length})
        </button>

        {kategori.map((item) => (
          <button
            type="button"
            key={item}
            className={kategoriAktif === item ? "aktif" : ""}
            onClick={() => setKategoriAktif(item)}
          >
            {item} ({jumlahKategori(item)})
          </button>
        ))}
      </div>
    </section>
  );
}

export default FilterBar;
