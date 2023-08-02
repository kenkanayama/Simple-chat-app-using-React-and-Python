# Dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5000
# CMD [ "python", "main.py" ]
CMD ["bash", "-c", "while true; do echo 'Container is running'; sleep 60; done"]
