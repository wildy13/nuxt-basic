from node:16

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install


# Bundle app source
COPY . .

EXPOSE 80
CMD ["npm",  "start"]