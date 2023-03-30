FROM alpine:latest

ARG PORT=8000
ENV PORT=$PORT

RUN apk add py3-pip python3

COPY . .

RUN pip install --no-cache-dir -r /myapp/requirements.txt

VOLUME ["/myapp/data"]

WORKDIR /myapp

EXPOSE $PORT

CMD ["python", "app.py"]
