from flask import Flask
app = Flask(__name__)
#commentnff
@app.route("/api/python")
def hello_world():
    return "<p>wwwwffHello,fffWdorld!</p>" 