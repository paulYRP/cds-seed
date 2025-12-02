from flask import Flask, render_template, redirect, url_for, send_from_directory
import os

app = Flask(__name__, template_folder="docs")
app.secret_key = "QUTKey"

@app.route("/", methods=["GET", "POST"])
def home():
    return redirect(url_for("synthetic"))

# ---- REPORT ROUTES ----
@app.route("/synthetic")
def synthetic():
    with open("docs/synthetic.html", "r", encoding="utf-8") as f:
        report_content = f.read()
    return render_template("index.html", content=report_content)

@app.route("/real")
def real():
    with open("docs/real.html", "r", encoding="utf-8") as f:
        report_content = f.read()
    return render_template("index.html", content=report_content)

@app.route("/summary")
def summary():
    with open("docs/summary.html", "r", encoding="utf-8") as f:
        report_content = f.read()
    return render_template("index.html", content=report_content)

@app.route("/reference")
def reference():
    with open("docs/data.html", "r", encoding="utf-8") as f:
        report_content = f.read()
    return render_template("index.html", content=report_content)

@app.route("/style/<path:filename>")
def serve_style(filename):
    return send_from_directory("style", filename)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
