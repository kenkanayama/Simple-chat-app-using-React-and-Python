# Node.jsの公式イメージをベースにする
FROM node:16-alpine

# 作業ディレクトリを設定
WORKDIR /app

# ソースコードをコピー
COPY . .

# 依存関係をインストール
RUN npm install --silent

EXPOSE 3000

# 開発サーバーを起動
CMD ["npm", "start"]