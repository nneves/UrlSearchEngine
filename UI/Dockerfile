FROM mhart/alpine-node:6.8.0

WORKDIR /src
COPY ./src/ .

# install node.js modules
RUN npm install

# move node_modules aside
RUN mv /src/node_modules /dev_node_modules

# copy startup script
COPY ./start.sh /

# add execution permission
RUN chmod +x /start.sh

CMD ["/start.sh"]
