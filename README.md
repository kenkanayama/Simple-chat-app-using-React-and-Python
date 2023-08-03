# やったこと
リアルタイムチャットアプリをマイクロサービスで構築

## やってみた理由
作ってみたかった

# 起動

以下でDocker環境構築
>docker-compose build --no-cache

>docker-compose up -d

以下でフロントエンドのDocker環境へ入り、
>docker-compose exec web sh

以下で起動

> npm start

以下でフロントエンドのDocker環境へ入り、

>docker-compose exec server sh

以下で起動

> python main.py

# 感想
'socket.io-client'を`on`すればその後そのコンポーネント上では対応するeventとの双方向通信の確立が、useEffect内で実行しても問題ないことの理解をすんなりと理解できなかった。
（Reactと双方向通信の理解不足があった）

Socket.IOはWebSocketを基礎として以下のような機能の提供をしている点の理解ができた

- 接続の確立
- 再接続の管理
- 名前空間とルームの概念

'socket.io-client'を使うことで簡単に簡単な双方向通信アプリの作成は楽にできた。

しかし想定外でsocketの接続が外れた場合の再接続処理などのエラーハンドリングの実装は行えていない＆わかっていない。

ルームやチャットログを記録する共有リソースとしてのDBの作成は時間があれば行う。同一レコードが含まれないようにロックやトランザクション処理が必要になる想定。