from datetime import datetime
from flask import Flask
from flask_socketio import SocketIO, join_room, leave_room, send
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    message_data = {'message': username + ' has entered the room.', 'systemMessage': True}
    send(message_data, room=room)
    print(username + ' has entered the room.')

@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    message_data = {'message': username + ' has left the room.', 'systemMessage': True}
    send(message_data, room=room)

@socketio.on('message')
def handle_message(data):
    message_text = data['message']
    username = data['username']
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')  # 現在の時刻を取得
    message_data = {'message': message_text, 'username': username, 'timestamp': timestamp, 'systemMessage': False}
    send(message_data, room=data['room'])

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
