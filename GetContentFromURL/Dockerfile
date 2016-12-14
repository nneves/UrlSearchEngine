FROM mhart/alpine-node:6.8.0

WORKDIR /src
ADD ./content-as-a-service/ .

# If you have native dependencies, you'll need extra tools
# RUN apk update
# RUN apk add --no-cache make gcc g++ python curl bash

# install node.js modules
RUN npm install

CMD ["node", "app.js"]