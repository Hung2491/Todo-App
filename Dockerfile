# ===== STAGE 1: BUILD =====
FROM node:20 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# ===== STAGE 2: RUNTIME =====
FROM node:21-alpine

WORKDIR /app

# chỉ copy file cần thiết
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json .

RUN npm install --only=production

CMD ["node", "dist/assets/index-BDHyn50v.js"]
