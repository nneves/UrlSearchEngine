FROM risingstack/alpine:3.4-v8.5.0-4.7.0

# Sets NODE_ENV as development so devDependencies are installed
ENV NODE_ENV=development

# Create and set the WORKDIR so all following commands run in it
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/scripts
RUN mkdir -p /usr/src/cache
WORKDIR /usr/src/app

# Copy the package.json and npm-shrinkwrap to fix dependencies versions
COPY ./uicode/package.json ./
COPY ./uicode/npm-shrinkwrap.json ./

# Copy semantic-ui resources
COPY ./uicode/semantic/ ./semantic
COPY ./uicode/semantic.json ./

# Install app dependencies
RUN npm install
RUN mv /usr/src/app/node_modules /usr/src/cache/
RUN ln -s /usr/src/cache/node_modules /usr/src/app/node_modules

# Copy the start.sh script
COPY ./uiscripts/start.sh /usr/src/scripts/start.sh
COPY ./uiscripts/build.sh /usr/src/scripts/build.sh
RUN chmod +x /usr/src/scripts/start.sh
RUN chmod +x /usr/src/scripts/build.sh

# Bundle app source after installation to not invalidate the cache before
COPY ./uicode/ ./

# Run React app
CMD [ "/usr/src/scripts/start.sh" ]