from flask import Flask, Response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow all origins, all headers, all methods

@app.route("/")
def home():
    return "✅ Flask backend is running."

@app.route("/secure.js", methods=["GET", "OPTIONS"])
def serve_js():
    with open("secure.js", "r", encoding="utf-8") as f:
        content = f.read()

    return Response(content, mimetype="text/javascript")
