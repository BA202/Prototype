FROM python:3.8-slim-buster

WORKDIR  /app

RUN pip install numpy
RUN pip install Flask
RUN pip install mysql-connector-python
RUN pip install requests
RUN pip install langid

COPY . .


EXPOSE 5003

CMD ["python","-u", "./backend.py"]