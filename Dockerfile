# Use the official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies (including dev dependencies for build)
RUN npm ci && npm cache clean --force

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Clean up dev dependencies
RUN npm prune --production

# Create a non-root user to run the app
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Change ownership of the working directory to the nestjs user
RUN chown -R nestjs:nodejs /usr/src/app
USER nestjs

# Expose the port the app runs on
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Define the command to run the application
CMD ["node", "dist/main"]
