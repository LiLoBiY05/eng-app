# Multi-stage Dockerfile for Nuxt 4 application
# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Stage 2: Production
FROM node:20-alpine AS runner

WORKDIR /app

# Install PM2 globally
RUN npm install -g pm2

# Copy built application from builder
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/deployment/pm2/ecosystem.config.js ./ecosystem.config.js
COPY --from=builder /app/package.json ./package.json

# Create logs directory
RUN mkdir -p logs

# Update ecosystem.config.js cwd to /app
RUN sed -i "s|cwd: '/path/to/your/app'|cwd: '/app'|g" ecosystem.config.js

# Expose port
EXPOSE 3010

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3010', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start with PM2
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
