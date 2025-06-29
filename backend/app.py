from flask import Flask, request, jsonify
from flask_cors import CORS
from model.recommender import load_model, get_recommendation
from model.db import connect_db 

app = Flask(__name__)
CORS(app)
load_model()
db = connect_db()

@app.route('/recommend')
def recommend():
    title = request.args.get("title", "").lower()
    result = get_recommendation(title)
    if result is None:
        return jsonify({"message": "Judul tidak ditemukan"}), 404
    return jsonify(result)

@app.route("/search")
def search_titles():
    keyword = request.args.get("q", "")
    if not keyword:
        return jsonify([])

    cursor = db.cursor()
    query = "SELECT title FROM book_converted_1_zip_1 WHERE title LIKE %s LIMIT 10"
    cursor.execute(query, ('%' + keyword + '%',))
    results = [row[0] for row in cursor.fetchall()]
    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)