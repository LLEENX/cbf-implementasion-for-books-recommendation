import { getRekomendasi } from './api.js';

const inputTitle = document.getElementById("inputTitle");
const hasilList = document.getElementById("hasilRekomendasi");
const suggestionBox = document.getElementById("suggestions");

// ==== Tombol Cari Rekomendasi ====
document.getElementById('btnCari').addEventListener('click', async () => {
  const judul = inputTitle.value.trim();
  hasilList.innerHTML = "<p>🔄 Mencari rekomendasi...</p>";

  if (!judul) {
    hasilList.innerHTML = "<p>⚠️ Judul tidak boleh kosong.</p>";
    return;
  }

  try {
    const data = await getRekomendasi(judul);
    if (!data || data.length === 0) {
      hasilList.innerHTML = "<p>❌ Tidak ada rekomendasi ditemukan.</p>";
    } else {
      hasilList.innerHTML = "";
      hasilList.classList.add("card-container");
      hasilList.innerHTML = data.map(item => `
        <div class="card">
          <img src="img/default_cover.png" alt="Cover Buku">
          <div class="card-content">
            <h3>${item.title}</h3>
            <p>${item.spec_detail_info}</p>
          </div>
        </div>
      `).join("");
    }
  } catch (err) {
    hasilList.innerHTML = `<p>❌ ${err.message}</p>`;
  }
});

// ==== AUTOCOMPLETE ====
inputTitle.addEventListener("input", async () => {
  const query = inputTitle.value.trim();
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
        inputTitle.value = item.textContent;
        suggestionBox.innerHTML = "";
      });
    });

  } catch (err) {
    console.error("Autocomplete error:", err);
  }
});
