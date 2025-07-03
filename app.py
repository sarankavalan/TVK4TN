from flask import Flask, request, Response

app = Flask(__name__)

@app.route("/")
def home():
    return "✅ Backend running"

@app.route("/secure.js", methods=["GET", "OPTIONS"])
def secure_js():
    if request.method == "OPTIONS":
        # Handle CORS preflight
        response = Response()
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "GET, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "*"
        response.status_code = 204
        return response

    # Serve secure.js file
    with open("secure.js", "r", encoding="utf-8") as f:
        content = f.read()
    response = Response(content, mimetype="application/javascript")
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response

# ✅ Required for Render
if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
