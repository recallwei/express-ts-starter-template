# EST

EST (Express Starter Template) is an opinionated `Express/TypeScript/Prisma/PostgreSQL` starter template.

## Feature

- [ ] [Express](https://expressjs.com/), out of box
- [ ] [TypeScript](https://www.typescriptlang.org/), of course
- [ ] [Prisma](https://www.prisma.io/) for ORM
- [ ] JWT authentication and role based authorization by custom middleware
- [ ] Fully configured logger with [Winston] and [Morgan]
- [ ] Unit, Integration and E2E tests with [Jest] and [Supertest]
- [ ] Linting with `ESLint`
- [ ] Formatting with `Prettier`
- [ ] Code spell check
- [ ] Git hooks with `Husky` and `lint-staged`
- [ ] Containerised with `Docker` and `Docker Compose`
- [ ] Path aliases support

## Tech Stack

- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)

## Usage

### Install

```bash
pnpm i
```

### Start

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

## Issue

- [x] `chalk` v5.x doesn't work with `ts-node` well, use `chalk` v4.x instead.

## License

[MIT](/LICENSE) License &copy; 2023 [Bruce Song](https://github.com/recallwei)
