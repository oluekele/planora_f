# ---------- Build Stage ----------
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy all source
COPY . .

# Build the Next.js app
RUN npm run build

# ---------- Production Stage ----------
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# Copy package files for npm start
COPY package*.json ./

# Copy built app from builder
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

# Start Next.js
CMD ["npm", "start"]
