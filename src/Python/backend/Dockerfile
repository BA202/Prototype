FROM python:3.7-alpine

WORKDIR  /app

RUN pip install Flask
RUN pip install mysql-connector-python
RUN pip install requests

COPY . .


EXPOSE 5003

CMD ["python","-u", "./backend.py"]