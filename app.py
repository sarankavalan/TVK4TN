from flask import Flask, request, Response, send_file

app = Flask(__name__)

@app.route("/")
def home():
    return "✅ Backend is live."

@app.route("/secure.js", methods=["GET", "OPTIONS"])
def serve_js():
    if request.method == "OPTIONS":
        # Preflight request response
        response = Response()
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "GET, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "*"
        response.status_code = 204
        return response

    # Serve JS normally
    with open("secure.js", "r", encoding="utf-8") as f:
        content = f.read()
    response = Response(content, mimetype="application/javascript")
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response
