FROM node:18

WORKDIR /app

COPY . /app

RUN npm ci

RUN npm run build 

WORKDIR /app/src

EXPOSE 3000

CMD [ "npx", "serve" , "-s" , "dist" ]