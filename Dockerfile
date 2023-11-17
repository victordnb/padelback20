# Use an official Node.js runtime as the base image
FROM node:20.9.0

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Make the application run when the container starts
CMD [ "npm", "start" ]