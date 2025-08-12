# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source files
COPY . .

# Build TypeScript (assumes output to ./dist)
RUN yarn build

# Stage 2: Production
FROM node:20-alpine AS production

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Install only production dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production

# Copy built files and necessary assets
COPY --from=builder /app/dist ./dist

# Change ownership to non-root user
RUN chown -R appuser:appgroup /app

# Expose port (default Fastify port)
EXPOSE 3000

# Drop privileges to non-root user
USER appuser

# Use node to run the built app
CMD ["node", "dist/server.js"]
