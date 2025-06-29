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

// ==== AUTOCOMPLETE ====
const titleInput = document.getElementById("inputTitle");
const suggestionBox = document.getElementById("suggestions");

titleInput.addEventListener("input", async () => {
  const query = titleInput.value.trim();
  if (query.length < 2) {
    suggestionBox.innerHTML = "";
    return;
  }

  try {
    const res = await fetch(`http://localhost:5000/search?q=${encodeURIComponent(query)}`);
    const titles = await res.json();

    suggestionBox.innerHTML = titles
      .map(title => `<li>${title}</li>`)
      .join("");

    document.querySelectorAll("#suggestions li").forEach(item => {
      item.addEventListener("click", () => {
        titleInput.value = item.textContent;
        suggestionBox.innerHTML = "";
      });
    });

  } catch (err) {
    console.error("Autocomplete error:", err);
  }
});