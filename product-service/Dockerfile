# Use Node v20
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Set permissions for run.sh to be executable
RUN chmod +x ./run.sh

# Build TypeScript files
RUN npx prisma generate
RUN npx tsc

# Expose the port
EXPOSE 3001
ENV ADDRESS=0.0.0.0 PORT=3001

# Run the server
CMD ./run.sh