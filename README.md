# EST

English / [简体中文](./README.zh-CN.md)

EST (Express Starter Template) is an opinionated `Express/TypeScript/Prisma/PostgreSQL` starter template.

## Feature

- [x] Based on [Express](https://expressjs.com/)
- [x] [TypeScript](https://www.typescriptlang.org/), of course
- [x] [Prisma](https://www.prisma.io/) for ORM
- [x] JWT authentication and role based authorization
- [x] File service with `multer`
- [ ] Fully configured logger with [Winston] and [Morgan]
- [ ] Unit, Integration and E2E tests with [Jest] and [Supertest]
- [x] Linting with `ESLint`
- [x] Formatting with `Prettier`
- [x] Spelling check with `cspell`
- [x] Git commit management with `Husky`, `lint-staged` and `commitlint`
- [ ] Containerised with `Docker` and `Docker Compose`
- [x] Absolute path with `@/*`

## Tech Stack

- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)

## Getting Started

## GitHub Template

> EST requires Node version >=14.16.0

[Create a repo from this template](https://github.com/recallwei/est/generate).

### Clone to Local

If you prefer to do it manually for a cleaner Git history, do the following:

```bash
npx degit recallwei/est my-est-app
cd my-est-app
pnpm i
```

## Checklist

When using this template, try to update your own information correctly according to the checklist:

- [ ] Clean up `README.md`
- [ ] Change author name in `LICENSE`
- [ ] Change project name, description, author, etc. in `package.json`
- [ ] Modify environment variables in `.env` and delete the file `.env.example` which is an example of environment variables
- [ ] Delete the example controller and route information in the `src/routes` directory

## Notice

- The file service will be saved in the `./storage` directory by default, which is added to `.gitignore` by default.
  The directory can be reset by `FILE_STORAGE_PATH` in `.env`.
  Don't forget to add the storage directory to `.gitignore` to prevent the stored files from being uploaded to GitHub.

## Usage

### Environment

- Node.js >=16.14.0
- pnpm
- PostgreSQL

### Config Environment Variables

Config `.env` file, refer to [.env.example](./.env.example).

### Install

```bash
pnpm i
```

### DB Migration

```bash
pnpm prisma:migrate
pnpm prisma:generate
```

### Start

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

## Known Issue

- [x] `chalk` v5.x doesn't work with `ts-node` well, use `chalk` v4.x instead.
- [x] Use `bcrypt.js` instead of `bcrypt` to avoid dependencies installing.

## License

[MIT](/LICENSE) License &copy; 2023 [Bruce Song](https://github.com/recallwei)
