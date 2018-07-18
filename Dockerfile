FROM python:2.7

COPY ./requirements.txt /requirements.txt

WORKDIR /app

EXPOSE 6543

RUN pip install -r /requirements.txt
