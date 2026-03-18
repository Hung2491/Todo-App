# ─── Stage 1: Build ───────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files trước để tận dụng layer cache
COPY package.json package-lock.json ./

RUN npm ci

# Copy toàn bộ source rồi build
COPY . .

RUN npm run build

# ─── Stage 2: Serve với Nginx ─────────────────────────────────────────────────
FROM nginx:1.27-alpine AS runner

# Xóa config mặc định của Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copy file build từ stage 1
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config tuỳ chỉnh (nếu có)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
