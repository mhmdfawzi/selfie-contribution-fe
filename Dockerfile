# # Use a Node.js version compatible with Angular
# FROM node:18-alpine AS build

# # Set working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies with --legacy-peer-deps
# RUN npm ci --legacy-peer-deps

# # Copy application files
# COPY . .

# # Build the Angular application
# RUN npm run build

# # Use NGINX to serve the built Angular files
# FROM nginx:alpine

# # Copy built files to NGINX's default public directory
# COPY --from=build /app/dist /usr/share/nginx/html

# # Expose port 80 for the application
# EXPOSE 80

# # Start NGINX server
# CMD ["nginx", "-g", "daemon off;"]
# Use Node.js as the base image for building the app
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the Angular app
RUN npm run build --prod

# Use Caddy as the web server
FROM caddy:latest AS serve

# Set the working directory
WORKDIR /app

# Copy the build output from the previous stage
COPY --from=build /app/dist/app_name/browser /app

# Optionally, format the Caddyfile if present
COPY Caddyfile /app/Caddyfile
RUN [ -f /app/Caddyfile ] && caddy fmt --overwrite /app/Caddyfile || echo "No Caddyfile found, skipping formatting"

# Expose the default Caddy port
EXPOSE 80

# Start the Caddy server
CMD ["caddy", "run", "--config", "/app/Caddyfile"]
