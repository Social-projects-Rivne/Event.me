FROM ubuntu:16.04

RUN apt-get update -y && \
    apt-get install -y python-pip python-dev && \
    pip install --upgrade pip setuptools

COPY ./requirements.txt /requirements.txt

WORKDIR /app

RUN pip install -r /requirements.txt
