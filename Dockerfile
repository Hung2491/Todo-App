# Stage 1: Build (Dùng Node để build ra file tĩnh)
FROM node:20-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production (Dùng Nginx để phục vụ file tĩnh)
FROM nginx:stable-alpine
# Copy code đã build từ Stage 1 sang thư mục của Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
