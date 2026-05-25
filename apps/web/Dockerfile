FROM oven/bun:1

WORKDIR /app

COPY package.json bun.lock ./
COPY apps/api/package.json ./apps/api/package.json
COPY apps/web/package.json ./apps/web/package.json
COPY packages/shared/package.json ./packages/shared/package.json

RUN bun install --frozen-lockfile

COPY apps/web ./apps/web
COPY packages/shared ./packages/shared

WORKDIR /app/apps/web

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

RUN bun run build

CMD ["bun", "run", "start"]
