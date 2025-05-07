# Use a Node.js base image (Debian-based for compatibility)
FROM node:20-slim

# Install curl for debugging
RUN apt-get update && apt-get install -y curl

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json* ./

# Install dependencies and SWC binary
RUN npm install --production --no-optional --loglevel verbose \
    && npm install @next/swc-linux-x64-gnu@15.3.1 --no-save --loglevel verbose

# Ensure SWC binary is cached
RUN mkdir -p /root/.cache/next-swc \
    && npm run build || true

# Copy Next.js build output and necessary files
COPY .next ./.next
COPY public ./public
COPY next.config.ts ./
COPY .env ./

# Set environment variables to bypass SWC download
ENV NEXT_SWC_PATH=/app/node_modules/@next/swc-linux-x64-gnu
ENV NEXT_SWC_TIMEOUT=60000
ENV NEXT_SWC_MINIFY=true

# Expose the port
EXPOSE 2000

# Start the app
CMD ["npm", "start"]