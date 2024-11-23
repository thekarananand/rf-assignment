FROM python:3.12-alpine
RUN apk add libreoffice
RUN apk add font-noto
RUN apk add font-jetbrains-mono
RUN apk add font-linux-libertine
COPY . /opt/backend
WORKDIR /opt/backend
RUN pip install -r requirements.txt
EXPOSE 80
ENTRYPOINT ["fastapi", "run", "main.py", "--port", "80"]