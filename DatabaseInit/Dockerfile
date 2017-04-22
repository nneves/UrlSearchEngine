FROM mhart/alpine-node:6.8.0

WORKDIR /src
COPY ./src/ .

# install node.js modules
RUN npm install

# copy startup script
COPY ./start.sh /

# add execution permission
RUN chmod +x /start.sh

ENTRYPOINT ["/start.sh"]
