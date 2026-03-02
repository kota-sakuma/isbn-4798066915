FROM node:25.7.0-bookworm-slim AS base

RUN npm install -g corepack && \
  corepack enable && \
  corepack use pnpm@latest

FROM base AS builder

WORKDIR /app

COPY express_app/ pnpm-lock.yaml pnpm-workspace.yaml /app

RUN pnpm fetch --prod

COPY ./ /app

RUN pnpm install --frozen-lockfile --prod

FROM gcr.io/distroless/nodejs25-debian12:latest

WORKDIR /app/express_app

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/express_app /app/express_app

EXPOSE 3000

ENTRYPOINT [ "node" ]

CMD [ "--import=./instrumentation.js", "bin/www" ]
