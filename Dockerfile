# Step 1: Build the application
FROM node:18 AS build
 
# Set the working directory inside the container
WORKDIR /app
 
# Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package.json package-lock.json ./
 
# Install dependencies
RUN npm install
 
# Copy the rest of the application files
COPY . .
 
# Build the Vite project
RUN npm run build
 
# Step 2: Set up the production server
FROM nginx:alpine
 
# Copy the build files from the previous stage into the Nginx server
COPY --from=build /app/dist /usr/share/nginx/html
 
# Expose port 80 to access the application in the browser
EXPOSE 80
 
# Start Nginx server to serve the app
CMD ["nginx", "-g", "daemon off;"]