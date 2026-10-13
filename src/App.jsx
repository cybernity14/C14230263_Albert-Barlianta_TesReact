
import { useState, useRef, useEffect } from "react";
import { semuaMenu } from "./data/menu";
import FilterBar from "./components/FilterBar";
import MenuList from "./components/MenuList";
import Keranjang from "./components/Keranjang";
import SessionTimer from "./components/SessionTimer";
import FormTambahMenu from "./components/FormTambahMenu";
import Panel from "./components/Panel";
import "./App.css";

function App() {
  const [keyword, setKeyword] = useState("");
  const [kategoriAktif, setKategoriAktif] = useState("semua");
  const [daftarMenu, setDaftarMenu] = useState(semuaMenu);

  const [keranjang, setKeranjang] = useState(() => {
    try {
      const tersimpan = localStorage.getItem("kantinkita-keranjang");
      return tersimpan ? JSON.parse(tersimpan) : [];
    } catch {
      return [];
    }
  });

  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(
      "kantinkita-keranjang",
      JSON.stringify(keranjang)
    );
  }, [keranjang]);

  const menuTerfilter = daftarMenu.filter((menu) => {
    const cocokNama = menu.nama
      .toLowerCase()
      .includes(keyword.toLowerCase());

    const cocokKategori =
      kategoriAktif === "semua" ||
      menu.kategori === kategoriAktif;

    return cocokNama && cocokKategori;
  });

  const bersihkanPencarian = () => {
    setKeyword("");
    inputRef.current?.focus();
  };

  const tambahMenu = (menu) => {
    setKeranjang((prev) => {
      const jumlahSekarang = prev.find(
        (item) => item.id === menu.id
      )?.qty ?? 0;

      if (jumlahSekarang >= menu.stok) {
        return prev;
      }

      const ada = prev.some((item) => item.id === menu.id);

      if (ada) {
        return prev.map((item) =>
          item.id === menu.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...menu, qty: 1 }];
    });
  };

  const kurangiMenu = (id) => {
    setKeranjang((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const hapusMenu = (id) => {
    setKeranjang((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const tambahMenuBaru = (menuBaru) => {
    setDaftarMenu((prev) => [...prev, menuBaru]);
  };

  return (
    <main className="app">
      <header className="app-header">
        <h1>KantinKita</h1>
        <p>Temukan menu favoritmu!</p>
      </header>

      <Panel className="panel-timer">
        <SessionTimer />
      </Panel>

      <Panel title="Kelola Menu" className="panel-form">
        <FormTambahMenu
          menus={daftarMenu}
          onTambahMenu={tambahMenuBaru}
        />
      </Panel>

      <Panel title="Cari Menu" className="panel-filter">
        <FilterBar
          menus={daftarMenu}
          keyword={keyword}
          setKeyword={setKeyword}
          kategoriAktif={kategoriAktif}
          setKategoriAktif={setKategoriAktif}
          onBersihkan={bersihkanPencarian}
          inputRef={inputRef}
        />
      </Panel>

      <Panel title="Daftar Menu" className="panel-daftar">
        <p className="jumlah-menu">
          Menampilkan {menuTerfilter.length} menu
        </p>

        <MenuList
          menus={menuTerfilter}
          onTambah={tambahMenu}
          keyword={keyword}
          kategoriAktif={kategoriAktif}
        />
      </Panel>

      <Panel title="Pesanan Saya" className="panel-keranjang">
        <Keranjang
          items={keranjang}
          onTambah={(id) => {
            const menu = daftarMenu.find(
              (item) => item.id === id
            );

            if (menu) tambahMenu(menu);
          }}
          onKurang={kurangiMenu}
          onHapus={hapusMenu}
        />
      </Panel>
    </main>
  );
}

export default App;
