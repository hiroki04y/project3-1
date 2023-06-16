# ベースイメージ
FROM node:18.16.0-alpine

# コンテナプロセスの実行されるディレクトリの指定
WORKDIR /usr/src/app

# package.jsonとpackage-lock.jsonをコピーして依存関係をインストール
COPY package*.json ./
RUN npm install

# ソースコードをコンテナ内にコピー
COPY . .

# ポートの開放
EXPOSE 3000
