FROM mhart/alpine-node:6.8.0

WORKDIR /src
COPY ./src/ .

# install node.js modules
RUN npm install

CMD ["npm", "start"]
