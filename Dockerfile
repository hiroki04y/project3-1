# ベースイメージ
FROM node:18.16.0-alpine

# ポートの開放
EXPOSE 3000

# コンテナプロセスの実行されるディレクトリの指定
WORKDIR /usr/src/app
