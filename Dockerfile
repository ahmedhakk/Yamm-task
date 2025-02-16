# Use the official Node.js image as the base image
FROM node:20.11

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 5173

# Command to run the application
CMD [ "npm", "run", "dev" ]
