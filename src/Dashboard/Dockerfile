FROM node:alpine

WORKDIR /hotel_dashboard

COPY /hotel_dashboard ./


RUN npm install

#RUN npm install dotenv --save
RUN npm run build

CMD ["npm", "start"]