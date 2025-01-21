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








# Use Caddy as the web server
FROM caddy:latest AS serve

# Set the working directory
WORKDIR /app

# Copy the build output from the previous stage
COPY --from=build /app/dist/app_name/browser /app

# Check if the Caddyfile exists before copying
RUN test -f Caddyfile && cp Caddyfile /app/Caddyfile || echo "No Caddyfile found, skipping"

# Expose the default Caddy port
EXPOSE 80

# Start the Caddy server
CMD ["caddy", "run", "--config", "/app/Caddyfile"]
