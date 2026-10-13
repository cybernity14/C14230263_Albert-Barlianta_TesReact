
import MenuCard from "./MenuCard";

function MenuList({
  menus,
  onTambah,
  keyword = "",
  kategoriAktif = "semua",
}) {
  if (menus.length === 0) {
    let pesan = "Tidak ada menu yang cocok.";

    if (keyword && kategoriAktif !== "semua") {
      pesan = `Tidak ada menu untuk kata kunci "${keyword}" pada kategori "${kategoriAktif}".`;
    } else if (keyword) {
      pesan = `Tidak ada menu dengan kata kunci "${keyword}".`;
    } else if (kategoriAktif !== "semua") {
      pesan = `Tidak ada menu pada kategori "${kategoriAktif}".`;
    }

    return <p className="pesan-kosong">{pesan}</p>;
  }

  return (
    <section className="menu-list">
      {menus.map((menu) => (
        <MenuCard
          key={menu.id}
          menu={menu}
          onTambah={onTambah}
        />
      ))}
    </section>
  );
}

export default MenuList;
