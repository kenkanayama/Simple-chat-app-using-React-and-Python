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

# 開発サーバーを起動
# CMD ["npm", "start"]
# 無限ループを使ってbashを起動
CMD ["bash", "-c", "while true; do echo 'Container is running'; sleep 60; done"]
