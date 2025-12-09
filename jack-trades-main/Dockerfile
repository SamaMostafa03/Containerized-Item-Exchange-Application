# Build stage for backend and frontend
FROM node:18-alpine AS builder

WORKDIR /app

# Copy root package files
COPY package*.json tsconfig.json ./

# Copy server and client directories
COPY server ./server
COPY client ./client

# --- Add bcrypt build dependencies before npm ci ---
RUN apk add --no-cache python3 make g++ \
    && npm ci \
    && apk del python3 make g++

# Build TypeScript backend
RUN npm run build

# Build React frontend
RUN cd client && npm install && npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install dumb-init to handle signals properly
RUN apk add --no-cache dumb-init

# Copy root package files
COPY package*.json ./

# Install production-only dependencies
RUN apk add --no-cache python3 make g++ \
    && npm ci --omit=dev \
    && apk del python3 make g++

# Copy built backend from builder
COPY --from=builder /app/dist ./dist

# Copy built frontend from builder
COPY --from=builder /app/client/build ./client/build

# Expose port
EXPOSE 8000

ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]
