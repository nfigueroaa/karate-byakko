# Stage 1: Build the React Application
FROM node:18-alpine as build

WORKDIR /app

# Install dependencies (caching layer)
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install

# Copy source code
COPY . .

# Build for production
RUN pnpm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built assets from Stage 1
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Cloud Run expects the container to listen on $PORT, typically 8080 by default in Nginx config
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
