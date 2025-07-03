from flask import Flask, request, Response
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="*", supports_credentials=True)

@app.route("/")
def home():
    return "✅ Flask backend is running."

@app.route("/secure.js")
def serve_js():
    # Only allow requests with correct header
    if request.headers.get("X-From-Extension") != "yes":
        return Response("// ❌ Access Denied", status=403, mimetype="text/javascript")

    with open("secure.js", "r", encoding="utf-8") as file:
        content = file.read()

    response = Response(content, mimetype="text/javascript")
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "X-From-Extension"
    return response
