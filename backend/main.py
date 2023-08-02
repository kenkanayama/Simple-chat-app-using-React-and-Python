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
    send(username + ' has entered the room.', room=room)
    print(username + ' has entered the room.')

@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', room=room)

@socketio.on('message')
def handle_message(data):
    send(data['message'], room=data['room'])

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
