from flask import Flask, Response
from flask_cors import cross_origin

app = Flask(__name__)

@app.route("/")
def home():
    return "✅ Flask backend is running."

@app.route("/secure.js", methods=["GET", "OPTIONS"])
@cross_origin(origins="*")
def serve_js():
    with open("secure.js", "r", encoding="utf-8") as file:
        content = file.read()
    return Response(content, mimetype="text/javascript")
