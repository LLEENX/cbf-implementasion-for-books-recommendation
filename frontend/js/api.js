const API_BASE_URL = "http://localhost:5000";

export async function getRekomendasi(judul) {
  try {
    const response = await fetch(`${API_BASE_URL}/recommend?title=${encodeURIComponent(judul)}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Gagal mengambil rekomendasi");
    }
    return await response.json();
  } catch (err) {
    console.error("API error:", err);
    throw err;
  }
}