FROM ubuntu:16.04

RUN apt-get update -y
RUN apt-get install -y python-pip python-dev
RUN apt-get install -y virtualenv
RUN pip install --upgrade pip setuptools waitress



COPY . /app

WORKDIR /app

RUN pip install -r requirements.txt

RUN cd server && python setup.py develop && pip install -e .
