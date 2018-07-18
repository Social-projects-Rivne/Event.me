FROM python:2.7

RUN apt-get update -y && \
    pip install --upgrade pip setuptools

COPY ./requirements.txt /requirements.txt

WORKDIR /app

RUN pip install -r /requirements.txt

EXPOSE 6543
