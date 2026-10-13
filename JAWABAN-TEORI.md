# JAWABAN TEORI REACT

## A1. Aturan Hooks

Penulisan tersebut melanggar Rules of Hooks karena `useState` dipanggil di dalam kondisi `if`. React mencocokkan state dengan urutan pemanggilan Hooks pada setiap render, bukan berdasarkan nama variabel atau kondisi. Jika `sudahLogin` berubah, jumlah atau urutan Hooks dapat berbeda sehingga state bisa tertukar. Perbaikannya adalah memanggil `useState` di tingkat teratas komponen, di luar kondisi.

```jsx
function Profil({ sudahLogin }) {
  const [nama, setNama] = useState("");

  if (!sudahLogin) {
    return null;
  }

  // ...
}
```

## A2. State dan Immutability

Layar tidak berubah karena `items.push(baru)` mengubah array lama secara langsung, sehingga referensi array tetap sama. React menggunakan perubahan nilai dan referensi state untuk menentukan apakah komponen perlu dirender ulang. Perbaikannya adalah membuat array baru menggunakan spread operator.

```jsx
const tambah = (baru) => {
  setItems((prev) => [...prev, baru]);
};
```

## A3. Perilaku useEffect

(a) `useEffect(() => { ... });` berjalan setelah setiap render yang selesai. (b) `useEffect(() => { ... }, []);` berjalan setelah render pertama saat komponen dipasang, dengan kemungkinan pemeriksaan tambahan di Strict Mode saat development. (c) `useEffect(() => { ... }, [kota]);` berjalan setelah render pertama dan kembali berjalan ketika nilai `kota` berubah. Cleanup dijalankan sebelum effect dijalankan kembali karena dependensinya berubah dan ketika komponen dilepas. Cleanup juga dapat dijalankan dalam siklus pemeriksaan tambahan Strict Mode saat development.

## A4. Penempatan State Pencarian

State `keyword` sebaiknya disimpan di komponen induk terdekat yang menaungi FilterBar dan DaftarMenu. Dengan begitu, kedua komponen dapat menggunakan state yang sama melalui props tanpa membuat state pencarian terpisah. Data yang naik dari FilterBar ke induk adalah nilai keyword atau perubahan keyword melalui callback. DaftarMenu kemudian menerima data menu yang sudah difilter dari komponen induk, bukan menerima keyword secara terpisah jika tidak diperlukan.

## A5. Controlled Component

Controlled component adalah komponen input yang nilainya dikendalikan oleh state React melalui properti `value`. Satu fungsi `handleChange` dapat menangani banyak input dengan membaca `name` dan `value` dari `event.target`. Properti `name` menentukan field state yang diperbarui, sedangkan `value` memberikan nilai terbaru dari input. Contohnya, `setForm((prev) => ({ ...prev, [name]: value }))` memperbarui satu field tanpa mengubah field lainnya.
