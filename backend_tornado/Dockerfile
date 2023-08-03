# Dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8888
# CMD [ "python", "main.py" ]
# 自分の任意のタイミングで"python main.py"を実行したいため以下のコマンドでサーバーを起動しておいている
CMD ["bash", "-c", "while true; do echo 'Container is running'; sleep 60; done"]
