FROM ubuntu:16.04



RUN apt-get update -y && \

    apt-get install -y python-pip python-dev && \

    pip install --upgrade pip setuptools waitress



COPY . /app



WORKDIR /app






RUN cd server && python setup.py develop && pip install -e .