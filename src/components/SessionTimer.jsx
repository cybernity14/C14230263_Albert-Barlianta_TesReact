
import { useState, useEffect } from "react";

function SessionTimer() {
  const [detik, setDetik] = useState(15 * 60);
  const [terlihat, setTerlihat] = useState(true);

  useEffect(() => {
    if (detik <= 0) return;

    const interval = setInterval(() => {
      setDetik((sebelumnya) => Math.max(0, sebelumnya - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [detik]);

  const menit = Math.floor(detik / 60);
  const sisaDetik = detik % 60;

  const formatWaktu = (angka) => String(angka).padStart(2, "0");

  return (
    <section className="session-timer">
      <div className="timer-header">
        <h2>Timer Sesi</h2>

        <button
          type="button"
          onClick={() => setTerlihat((sebelumnya) => !sebelumnya)}
        >
          {terlihat ? "Sembunyikan" : "Tampilkan"}
        </button>
      </div>

      {terlihat && (
        <div className="timer-content">
          <p className={detik === 0 ? "timer-habis" : "timer-waktu"}>
            {formatWaktu(menit)}:{formatWaktu(sisaDetik)}
          </p>

          <p>
            {detik === 0
              ? "Waktu sesi telah habis."
              : "Waktu sesi tersisa."}
          </p>
        </div>
      )}
    </section>
  );
}

export default SessionTimer;
