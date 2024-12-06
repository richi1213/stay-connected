# Base image
FROM node:18-alpine AS build_image

# Set working directory
WORKDIR /app/react-app

# Copy package.json and package-lock.json
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .


# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production_image

WORKDIR /app/react-app

# Copy build output to nginx html directory
COPY --from=BUILD_IMAGE /app/react-app/dist/ /app/react-app/dist
EXPOSE 8080

COPY package.json .
COPY vite.config.ts .

RUN npm install typescript
EXPOSE 8080
CMD ["npm", "run", "preview"]

# Copy custom nginx configuration if needed
# Uncomment below lines to include custom nginx.conf
# COPY nginx.conf /etc/nginx/conf.d/default.conf



