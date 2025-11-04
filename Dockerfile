FROM node:20-bullseye AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN apt-get update && apt-get install -y \
    ghostscript \
    graphicsmagick \
    openssl
 
FROM base AS build
WORKDIR /app
COPY . .
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
RUN pnpm run build
 
FROM base AS dokploy
WORKDIR /app
ENV NODE_ENV=production
 
# Copy only the necessary files
# COPY --from=build /app/next.config.js ./next.config.js
# COPY --from=build /app/public ./public
# COPY --from=build /app/.next ./.next
# COPY --from=build /app/package.json ./package.json
# COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/ .
 
EXPOSE 3000
CMD ["pnpm", "start"]