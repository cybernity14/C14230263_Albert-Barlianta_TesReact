
import { useState } from "react";

function FormTambahMenu({ onTambahMenu, menus }) {
  const [form, setForm] = useState({
    nama: "",
    harga: "",
    kategori: "",
    stok: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const nama = form.nama.trim();
    const harga = Number(form.harga);
    const stok = Number(form.stok);

    if (nama.length < 3) {
      setError("Nama menu minimal 3 karakter.");
      return;
    }

    if (!form.kategori) {
      setError("Kategori wajib dipilih.");
      return;
    }

    if (form.harga === "" || !Number.isFinite(harga) || harga <= 0) {
      setError("Harga harus berupa angka lebih besar dari 0.");
      return;
    }

    if (
      form.stok === "" ||
      !Number.isInteger(stok) ||
      stok < 0
    ) {
      setError("Stok harus berupa bilangan bulat minimal 0.");
      return;
    }

    const menuBaru = {
      id: `menu-${Date.now()}`,
      nama,
      harga,
      kategori: form.kategori,
      stok,
    };

    onTambahMenu(menuBaru);

    setForm({
      nama: "",
      harga: "",
      kategori: "",
      stok: "",
    });
  };

  const kategoriTersedia = [
    ...new Set(menus.map((menu) => menu.kategori)),
  ];

  return (
    <section className="form-menu">
      <h2>Tambah Menu Baru</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="nama">Nama Menu</label>
          <input
            id="nama"
            name="nama"
            type="text"
            value={form.nama}
            onChange={handleChange}
            placeholder="Contoh: Nasi Ayam"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="harga">Harga (Rp)</label>
          <input
            id="harga"
            name="harga"
            type="number"
            min="0"
            step="1"
            value={form.harga}
            onChange={handleChange}
            placeholder="Contoh: 15000"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="kategori">Kategori</label>
          <select
            id="kategori"
            name="kategori"
            value={form.kategori}
            onChange={handleChange}
            required
          >
            <option value="">Pilih kategori</option>

            {kategoriTersedia.map((kategori) => (
              <option key={kategori} value={kategori}>
                {kategori}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="stok">Stok</label>
          <input
            id="stok"
            name="stok"
            type="number"
            min="0"
            step="1"
            value={form.stok}
            onChange={handleChange}
            placeholder="Contoh: 10"
            required
          />
        </div>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <button type="submit">Tambah Menu</button>
      </form>
    </section>
  );
}

export default FormTambahMenu;
