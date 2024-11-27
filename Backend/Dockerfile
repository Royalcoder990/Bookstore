FROM jenkins/jenkins:lts

# Install dependencies for Docker Compose
USER root
RUN apt-get update && apt-get install -y \
    curl \
    python3-pip \
    python3-dev \
    libffi-dev \
    build-essential \
    libssl-dev \
    && pip3 install docker-compose

# Switch back to the jenkins user
USER jenkins

# Use Node.js base image
FROM node:18.9.1

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy rest of the application
COPY . .

# Expose the application port
EXPOSE 5050

# Start the server
CMD ["npm", "start"]

