import { getRekomendasi } from './api.js';

document.getElementById('btnCari').addEventListener('click', async () => {
  const judul = document.getElementById('inputTitle').value.trim();
  const hasilList = document.getElementById('hasilRekomendasi');
  hasilList.innerHTML = "<li>🔄 Mencari rekomendasi...</li>";

  if (!judul) {
    hasilList.innerHTML = "<li>⚠️ Judul tidak boleh kosong.</li>";
    return;
  }

  try {
    const data = await getRekomendasi(judul);
    if (data.length === 0) {
      hasilList.innerHTML = "<li>📭 Tidak ada rekomendasi ditemukan.</li>";
    } else {
      hasilList.innerHTML = "";
      data.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${item.title}</strong><br>${item.spec_detail_info}`;
        hasilList.appendChild(li);
      });
    }
  } catch (err) {
    hasilList.innerHTML = `<li>❌ ${err.message}</li>`;
  }
});