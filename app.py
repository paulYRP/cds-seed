from flask import Flask, render_template, redirect, url_for, send_from_directory

app = Flask(__name__, template_folder="docs")
app.secret_key = "QUTKey"

@app.route("/", methods=["GET", "POST"])
def home():
    return redirect(url_for("literature"))

# ---- REPORT ROUTES ----
@app.route("/literature")
def literature():
    with open("docs/literature.html", "r", encoding="utf-8") as f:
        report_content = f.read()
    return render_template("index.html", content=report_content)

@app.route("/database")
def database():
    with open("docs/database.html", "r", encoding="utf-8") as f:
        report_content = f.read()
    return render_template("index.html", content=report_content)

@app.route("/report")
def report():
    with open("docs/report.html", "r", encoding="utf-8") as f:
        report_content = f.read()
    return render_template("index.html", content=report_content)

@app.route("/style/<path:filename>")
def serve_style(filename):
    return send_from_directory("style", filename)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
