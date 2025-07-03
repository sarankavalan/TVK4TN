from flask import Flask, request, Response
from flask_cors import cross_origin

app = Flask(__name__)

@app.route("/")
def home():
    return "✅ Flask backend is running."

@app.route("/secure.js", methods=["GET", "OPTIONS"])
@cross_origin(
    origins="*",
    methods=["GET", "OPTIONS"],
    allow_headers=["X-From-Extension"],
)
def serve_js():
    if request.method == "OPTIONS":
        # Handle preflight request
        return Response(status=204)

    if request.headers.get("X-From-Extension") != "yes":
        return Response("// ❌ Access Denied", status=403, mimetype="text/javascript")

    with open("secure.js", "r", encoding="utf-8") as file:
        content = file.read()

    return Response(content, mimetype="text/javascript")
