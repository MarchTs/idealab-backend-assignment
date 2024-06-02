# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Make port 3000 available outside the container
EXPOSE 3000

# Start the application
CMD [ "yarn", "app" ]