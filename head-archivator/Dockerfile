FROM python:3.11-alpine

RUN apk add --no-cache --virtual .build-deps gcc musl-dev libffi-dev \
    && apk add --no-cache postgresql-dev

WORKDIR /app

COPY . /app

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["python", "controller.py"]