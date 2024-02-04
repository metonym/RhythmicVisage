FROM oven/bun

WORKDIR /usr/src/app

COPY . .

# Install any needed packages specified in package.json
RUN bun install

# Build the client
RUN bun build:client

# Set the environment to production
ENV NODE_ENV production

CMD [ "bun", "start" ]