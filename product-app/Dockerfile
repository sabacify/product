# Use an official Node.js image as the base image
FROM node:20 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the React app for production
RUN npm run build

# Use Nginx to serve the build
FROM nginx:stable-alpine

# Copy the build output to the Nginx HTML directory
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]