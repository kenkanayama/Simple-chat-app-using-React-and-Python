# Node.jsの公式イメージをベースにする
FROM node:16-alpine

# bashをインストール
RUN apk add --no-cache bash

# 作業ディレクトリを設定
WORKDIR /app

# ソースコードをコピー
COPY . .

# 依存関係をインストール
RUN npm install --silent

EXPOSE 3000

CMD ["npm", "start"]
# 自分の任意のタイミングでコンテナ上で"npm start"を実行したい場合は以下のコマンドでサーバーを起動しておく
# CMD ["bash", "-c", "while true; do echo 'Container is running'; sleep 60; done"]
