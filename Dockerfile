FROM node:20-alpine

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# serve build bằng vite preview
EXPOSE 4173
CMD ["npm", "run", "preview"]
