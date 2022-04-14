FROM node:alpine

WORKDIR /dashboard

COPY /dashboard ./


RUN npm install
RUN npm install --save react-collapse
RUN npm install react-plotly.js plotly.js
RUN npm install react-day-picker date-fns

#RUN npm install dotenv --save
RUN npm run build

CMD ["npm", "start"]