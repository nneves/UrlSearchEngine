FROM mhart/alpine-node:6.8.0

WORKDIR /src

# copy package.json and package-lock required for 'npm install'
COPY ./src/package.json .
COPY ./src/package-lock.json .

# install node.js modules
RUN npm install

COPY ./src/ .

CMD ["npm", "start"]
