FROM nginx:1.29-alpine

# NGINX config with runtime DNS + healthz
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Your built/static assets
COPY public /usr/share/nginx/html

EXPOSE 80

# (Optional) HEALTHCHECK via HTTP
HEALTHCHECK --interval=20s --timeout=5s --retries=10 --start-period=40s \
  CMD sh -lc "wget -q -O- http://127.0.0.1/ >/dev/null 2>&1 || exit 1"
