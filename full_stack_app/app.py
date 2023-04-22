from flask import Flask, jsonify, send_from_directory

app = Flask(__name__, static_folder='static', static_url_path='')


@app.route('/')
def index():
    return send_from_directory('static', 'index.html')


@app.route('/api/data', methods=['GET'])
def get_data():
    data = {
        "message": "Hello from Flask!"
    }
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)
