FROM python:3.7-alpine

WORKDIR  /app

RUN pip install Flask
RUN pip install mysql-connector-python

COPY . .

EXPOSE 5002

CMD ["python","-u", "./preprocessor.py"]