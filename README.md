# やったこと
リアルタイムチャットアプリをマイクロサービスで構築

## やってみた理由
作ってみたかった

# 感想
Reactでは'socket.io-client'を`on`すればその後そのコンポーネント上で対応するeventとの双方向通信の確立が、useEffect内で実行しても問題ないことの理解をすんなりと理解できなかった。
（Reactと双方向通信の理解不足があった）

Socket.IOはWebSocketを基礎として以下のような機能の提供をしていることがわかり、基本的にはWebsocketを使用するのではなくSocket.IOを利用するのがいいのだと思った。

- 接続の確立
- 再接続の管理
- 名前空間とルームの概念

'socket.io-client'を使うことで簡単に簡単な双方向通信アプリの作成は楽にできた。

しかし想定外でsocketの接続が外れた場合の再接続処理などのエラーハンドリングの実装は行えていない＆わかっていない。

ルームやチャットログを記録する共有リソースとしてのDBの作成は時間があれば行う。同一レコードが含まれないようにロックやトランザクション処理が必要になる想定。

バックエンドは試したいフレームワークが2つあったためそれぞれ実装した。
server1のFlask-SocketIOはFlask上でsocketioを実行させる。
Flaskのコードを見慣れているのもあり、かなり直感的に理解できたし、公式ドキュメントもわかりやすかった。

server2のTornadoはPythonフレームワークの非同期通信を行うもので使ってみたかった。
実装したところ以下の課題があった
 - TornadoはデフォルトではWebscketプロトコルを使用しており、今回フロントで実装しているSocket.IOプロトコルとは異なるため双方向通信接続ができなかった
 - エラー以外のログを表示しない
 - CORS設定

それぞれ以下で解決した
 - Python-SocketIOにてSocket.IOプロトコルを使用した
   - そのためTornadoを実装したというよりはPython-SocketIOを使用し、その内部でTornadoを使用するということになった
     - しかしTornadoはデフォルトで非同期サポートがあるのと圧倒的なパフォーマンス性能をもったサーバーを利用することになっているので、よしとしました。
 - 標準ライブラリのloggingを使用
 - WebSocket通信のCORSとHTTPリクエスト時のCORSの二つの設定が必要だった



# 起動

以下でDocker環境構築
>docker-compose build --no-cache
>docker-compose up -d

以下でフロントエンドのDocker環境へ入り、
>docker-compose exec web sh

以下で起動
> npm start

以下でバックエンドのDocker環境へ入り、
>docker-compose exec server1 sh
>docker-compose exec server2 sh

それぞれ以下で起動
> python main.py
