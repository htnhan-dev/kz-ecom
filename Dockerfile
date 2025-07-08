# Base image
FROM node:20

# Set working dir
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the project
COPY . .

# Build Vite
RUN npm run build

# Use nginx to serve built files (optional: if static deploy)
# FROM nginx:alpine
# COPY --from=0 /app/dist /usr/share/nginx/html

# If just preview
EXPOSE 5173
CMD ["npm", "run", "preview"]
