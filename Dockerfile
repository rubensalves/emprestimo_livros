FROM mhart/alpine-node:10

WORkDIR /src

COPY package.json /app
RUN npm install

ADD . .

EXPOSE 8000

CMD ["npm", "start"]