# Dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8888

CMD [ "python", "main.py" ]
# 自分の任意のタイミングでコンテナ上で"python main.py"を実行したい場合は以下のコマンドでサーバーを起動しておく
# CMD ["bash", "-c", "while true; do echo 'Container is running'; sleep 60; done"]
