# Pinned QA runner: Bun + Playwright (Chromium) + k6 smoke (via Docker stage)
FROM oven/bun:1.4.2 AS base
WORKDIR /app

# ---- deps ----
FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# ---- test runner ----
FROM base AS runner
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Playwright browsers (Chromium only — matches CI matrix)
RUN bunx playwright install chromium --with-deps
CMD ["bun", "run", "test"]
