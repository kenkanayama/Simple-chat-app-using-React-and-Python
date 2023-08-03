import logging
import tornado.web
import socketio
import tornado.autoreload
from datetime import datetime
import pytz

# Tornadoはデフォルトでログを出力しないので、logging で出力するように設定する
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
handler = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)

# Python-SocketIOのサーバーインスタンスを作成
sio = socketio.AsyncServer(
    async_mode='tornado',  # Tornadoを使用する場合は、async_modeを'tornado'に設定する
    cors_allowed_origins="http://localhost:3000"  # CORSを許可するオリジンを指定する（WebSocket通信（Python-SocketIOがハンドルする）のCORS設定）
)

class MyApplication(tornado.web.Application):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def set_default_headers(self):
        # HTTPリクエストが処理されるたびに自動的に呼び出される。ヘッダーを設定する。
        self.set_header("Access-Control-Allow-Origin", "http://localhost:3000")  # Tornadoがハンドルする通常のHTTPリクエスト（REST APIなど）のCORS設定
        self.set_header("Access-Control-Allow-Headers", "x-requested-with, Content-type")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')

    def options(self, *args, **kwargs):
        # クライアント（ブラウザ）がOPTIONSリクエストを送信したときにTornadoによって自動的に呼び出される
        self.set_status(204)
        self.finish()

app = MyApplication([
    (r"/socket.io/", socketio.get_tornado_handler(sio)),
])

@sio.event
async def join(sid, data):
    logger.info(f'join, {data}')
    username = data['username']
    room = data['room']
    sio.enter_room(sid, room)
    message_data = {
        'message': f'[{username}]が[{room}]に入室しました。',
        'systemMessage': True
    }
    await sio.emit('message', message_data, room=room)

@sio.event
async def leave(sid, data):
    logger.info(f'leave, {data}')
    username = data['username']
    room = data['room']
    sio.leave_room(sid, room)
    message_data = {
        'message': f'[{username}]が[{room}]から退室しました。',
        'systemMessage': True
    }
    await sio.emit('message', message_data, room=room)

@sio.event
async def message(sid, data):
    logger.info(f'message, {data}')
    message_text = data['message']
    username = data['username']
    timestamp = datetime.now(pytz.timezone('Asia/Tokyo')).strftime('%Y-%m-%d %H:%M:%S')
    message_data = {
        'message': message_text,
        'username': username,
        'timestamp': timestamp,
        'systemMessage': False
    }
    await sio.emit('message', message_data, room=data['room'])

if __name__ == '__main__':
    app.listen(8888)
    tornado.autoreload.start()  # ソースコードが変更されたときに再起動する（開発用）
    tornado.ioloop.IOLoop.current().start()