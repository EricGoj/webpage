# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production environment
FROM node:18-alpine AS runner

WORKDIR /app

# Copy built assets from the builder stage
COPY --from=builder /app/build /app/build
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/node_modules /app/node_modules

# Expose the port the app runs on
EXPOSE 4173

# Command to run the application
CMD ["node", "build"]