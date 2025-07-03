from flask import Flask, request, send_file

app = Flask(__name__)

@app.route('/secure.js')
def serve_js():
    if request.headers.get("X-From-Extension") != "yes":
        return "// ❌ Access Denied", 403
    return send_file("secure.js", mimetype="application/javascript")

@app.route('/')
def index():
    return "✅ Flask backend is running."

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
