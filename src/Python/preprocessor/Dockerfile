FROM python:3.7-alpine

WORKDIR  /app

RUN pip install Flask
RUN pip install mysql-connector-python

COPY . ./
ADD /Users/tobiasrothlin/Documents/BachelorArbeit/Prototype/src/Python/backend/DBInteraction.py ./

EXPOSE 5002

CMD ["python","-u", "./preprocessor.py"]