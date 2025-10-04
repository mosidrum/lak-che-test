FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install -g ts-node typescript \
    && npm install

# Copy source files
COPY . .

# Expose app port
EXPOSE 5000

# Start dev server
CMD ["npm", "run", "dev"]
