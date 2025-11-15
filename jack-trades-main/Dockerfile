# Build stage for backend and frontend
FROM node:18-alpine AS builder

WORKDIR /app

# Copy root package files
COPY package*.json tsconfig.json ./

# Copy server and client directories
COPY server ./server
COPY client ./client

# Install dependencies
RUN npm ci

# Build TypeScript backend
RUN npm run build

# Build React frontend
RUN cd client && npm ci && npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install dumb-init to handle signals properly
RUN apk add --no-cache dumb-init

# Copy root package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# Copy built backend from builder
COPY --from=builder /app/dist ./dist

# Copy built frontend from builder
COPY --from=builder /app/client/build ./client/build

# Expose port
EXPOSE 8000

# Use dumb-init to run node
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]
