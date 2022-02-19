FROM node:alpine

WORKDIR /hotel_reviews

COPY /hotel_reviews ./


RUN npm install
RUN npm install --save react-circular-progressbar

#RUN npm install dotenv --save
RUN npm run build


CMD ["npm", "start"]