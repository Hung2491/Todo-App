# Stage 1: Build
FROM node:20-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production
FROM nginx:stable-alpine

# 1. Tạo thư mục riêng cho app (Ví dụ đặt tên là todo-app)
# Điều này giúp ông chạy nhiều app mà không bị ghi đè file dist
RUN mkdir -p /usr/share/nginx/html/todo-app

# 2. Copy code từ Stage 1 vào đúng thư mục vừa tạo
COPY --from=build-stage /app/dist /usr/share/nginx/html/todo-app

# 3. Copy file config riêng của ông (Tôi sẽ viết nội dung file này ở dưới)
# Đặt tên file là todo.conf để dễ quản lý backup
COPY ./todo.conf /etc/nginx/conf.d/todo.conf

# 4. Xóa config mặc định để tránh xung đột cổng 80
RUN rm /etc/nginx/conf.d/default.conf

# 5. Khai báo cổng (Nội bộ container sẽ nghe 3002)
EXPOSE 3002

CMD ["nginx", "-g", "daemon off;"]
