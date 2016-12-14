FROM mhart/alpine-node:6.8.0

WORKDIR /src
ADD ./screenshot-as-a-service/ .

# If you have native dependencies, you'll need extra tools
RUN apk update
RUN apk add --no-cache make gcc g++ python curl bash

# Install required APKs needed for building, install node modules, fix phantom, then cleanup.
# NOTE: this will replace some libs, not the best approach but all other alpine phantomjs recipes are failling!!!
## RUN curl -Ls "https://github.com/dustinblackman/phantomized/releases/download/2.1.1/dockerized-phantomjs.tar.gz" | tar xz -C /
RUN echo "Extract custom required libs"
COPY ./dockerized-phantomjs.tar.gz /
RUN cat /dockerized-phantomjs.tar.gz | tar xz -C /

## RUN npm install phantomjs-prebuilt --phantomjs_cdnurl=https://bitbucket.org/ariya/phantomjs/downloads
## RUN ln -s /src/node_modules/phantomjs-prebuilt/lib/phantom/bin/phantomjs /usr/bin/phantomjs
RUN echo "Extract phatomjs"
COPY ./phantomjs-2.1.1-linux-x86_64.tar.bz2 /
RUN cat /phantomjs-2.1.1-linux-x86_64.tar.bz2 | tar xj -C /
RUN ln -s /phantomjs-2.1.1-linux-x86_64/bin/phantomjs /usr/bin/phantomjs
RUN phantomjs --version

# install node.js modules
RUN npm install

CMD ["node", "app.js"]