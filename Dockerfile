FROM node:24.14.0-bookworm-slim AS base

RUN npm install -g corepack --force && \
corepack enable && \
corepack use pnpm@latest

FROM base AS builder

WORKDIR /app

COPY express_app/ pnpm-lock.yaml pnpm-workspace.yaml /app

RUN CI=true pnpm fetch --prod

COPY ./ /app

RUN CI=true pnpm install --frozen-lockfile --prod

FROM gcr.io/distroless/nodejs24-debian13:nonroot

WORKDIR /app/express_app

COPY --from=builder /app/express_app /app/express_app
COPY --from=builder /app/instrumentation.js /app/instrumentation.js
COPY --from=builder /app/node_modules /app/node_modules

EXPOSE 3000

CMD [ "--import=/app/instrumentation.js", "bin/www" ]
