from flask import Flask, request, Response

app = Flask(__name__)

@app.route("/")
def home():
    return "✅ Backend running"

@app.route("/secure.js", methods=["GET", "OPTIONS"])
def serve_js():
    if request.method == "OPTIONS":
        # Proper CORS preflight response
        response = Response()
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "GET, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "*"
        response.status_code = 204
        return response

    # GET request — serve JS
    with open("secure.js", "r", encoding="utf-8") as f:
        content = f.read()
    response = Response(content, mimetype="application/javascript")
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response
