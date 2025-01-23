install:
    bun install

dev:
    bun dev

generate:
    cd packages/server && bun --bun drizzle-kit generate

migrate:
    cd packages/server && bun --bun drizzle-kit migrate

build:
    cd packages/client && bun run build