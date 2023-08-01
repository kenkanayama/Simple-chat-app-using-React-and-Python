from flask import Flask, jsonify, request
from flask_socketio import SocketIO
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on('connect')
def handle_connect():
    print('Client connected')
    socketio.emit('message', 'Client successfully connected!')

@socketio.on('message')
def handle_message(data):
    print('received message: ' + data)
    socketio.emit('data', 'This is a response')

@app.route('/user/<recipient>', methods=['POST'])
def receive_message(recipient):
    data = request.get_json()  # JSONデータを取得
    message = data['message']  # JSONから'message'というキーの値を取得
    sender = data['sender']
    message = {
        'data': {
            'message': message,
            'sender': sender
        }
    }
    socketio.emit('message', message, namespace=f'/user/{recipient}')
    return jsonify({'message': f'Message sent to /user/{recipient}, from /user/{sender}'}), 200

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)  # , debug=Trueで自動リロード
