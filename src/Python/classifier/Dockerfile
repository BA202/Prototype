FROM python:3.7-alpine

WORKDIR  /app

RUN pip install Flask
RUN pip install mysql-connector-python

COPY . .

EXPOSE 5001

CMD ["python","-u", "./classifier.py"]