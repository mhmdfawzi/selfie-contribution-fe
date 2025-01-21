# Use a Node.js version compatible with Angular
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies with --legacy-peer-deps
RUN npm ci --legacy-peer-deps

# Copy application files
COPY . .

# Build the Angular application
RUN npm run build

# Use NGINX to serve the built Angular files
FROM nginx:alpine

# Copy built files to NGINX's default public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the application
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
