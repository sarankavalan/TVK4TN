from flask import Flask, Response, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/secure.js": {"origins": "*"}})

@app.route("/")
def home():
    return "✅ Backend running"

@app.route("/secure.js", methods=["GET", "OPTIONS"])
def secure_js():
    if request.method == "OPTIONS":
        response = Response()
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = '*'
        response.status_code = 204
        return response

    with open("secure.js", "r", encoding="utf-8") as f:
        content = f.read()

    response = Response(content, mimetype="application/javascript")
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response
