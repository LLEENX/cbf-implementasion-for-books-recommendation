from flask import Flask, request, jsonify
from flask_cors import CORS
from model.recommender import get_recommendation

app = Flask(__name__)
CORS(app)

@app.route('/recommend')
def recommend():
    title = request.args.get("title", "").lower()
    result = get_recommendation(title)
    if result is None:
        return jsonify({"message": "Judul tidak ditemukan"}), 404
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)