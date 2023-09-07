import os
from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/store')
def store():
    return "i sell kebab"

if __name__ == '__main__':
    # Port is set to 8080, change to anything you want
    #   Remember, has to be 1024 or above
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port, debug=True)