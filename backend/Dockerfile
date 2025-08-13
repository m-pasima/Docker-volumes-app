FROM node:20-alpine

WORKDIR /app

# Install only what's needed for prod
COPY package*.json ./
RUN npm ci --only=production

# App code
COPY server.js ./

# Ensure writable data dir (even without a volume)
RUN mkdir -p /data && chown -R node:node /data

# Optional but good practice
ENV NODE_ENV=production PORT=3000

# Persist contacts on /data when a volume is attached
VOLUME ["/data"]

EXPOSE 3000

# Liveness via TCP so we don't need an HTTP route to be green
HEALTHCHECK --interval=20s --timeout=3s --retries=10 --start-period=30s \
  CMD sh -lc "apk add --no-cache busybox-extras >/dev/null 2>&1 || true; nc -z 127.0.0.1 3000 || exit 1"

USER node

CMD ["npm", "start"]

