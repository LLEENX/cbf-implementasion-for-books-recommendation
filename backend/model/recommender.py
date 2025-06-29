from .db import connect_db
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

# Koneksi DB
conn = connect_db()
query = "SELECT title, spec_detail_info, notes, classification FROM book_converted_1_zip_1 WHERE spec_detail_info IS NOT NULL"
df = pd.read_sql(query, conn)
conn.close()

df['content'] = (
    df['title'].astype(str) + ' ' +
    df['spec_detail_info'].astype(str)
)

stopwords_indo = [
    "yang", "dan", "di", "ke", "dari", "untuk", "dengan", "pada", "adalah",
    "ini", "itu", "oleh", "juga", "sebagai", "dalam", "atau", "akan", "karena",
    "tidak", "lebih", "tersebut", "bisa", "telah", "mereka", "kami", "kita",
    "ia", "saya", "sudah", "namun", "menjadi", "banyak", "agar", "bahwa", "buku"
]

tfidf = TfidfVectorizer(stop_words=stopwords_indo)
tfidf_matrix = tfidf.fit_transform(df['content'])
indices = pd.Series(df.index, index=df['title'].str.lower()).drop_duplicates()

def get_recommendation(title):
    if title not in indices:
        return None
    idx = indices[title]
    cosine_sim = linear_kernel(tfidf_matrix[idx:idx+1], tfidf_matrix).flatten()
    sim_scores = sorted(list(enumerate(cosine_sim)), key=lambda x: x[1], reverse=True)[1:6]
    book_indices = [i[0] for i in sim_scores]
    return df.iloc[book_indices][['title', 'spec_detail_info']].to_dict(orient='records')
