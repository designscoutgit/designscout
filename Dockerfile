# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory for the app
WORKDIR /

RUN chown -R node:node /

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install any needed dependencies
RUN npm ci

# Copy the rest of the application code into the container
COPY . .

# Expose the port the app will run on
EXPOSE 8080

# Start the Nuxt.js app
CMD ["npm", "start"]
