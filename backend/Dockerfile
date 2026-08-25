# Starting image
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# Development(with Hot-Reload)
FROM base AS development
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "run", "dev"]

# Build
FROM base AS builder
RUN npm install
COPY . .
RUN npm run build


# Production
FROM node:20-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /app/dist ./dist
EXPOSE 5000
CMD ["node", "dist/server.js"]