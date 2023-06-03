# EST

[English](./README.md) / 简体中文

EST (Express Starter Template) 是一个基于 `Express/TypeScript/Prisma/PostgreSQL` 的模板项目。

## 特性

- [x] 基于 [Express](https://expressjs.com/)
- [x] [TypeScript](https://www.typescriptlang.org/)，当然
- [x] [Prisma](https://www.prisma.io/) 作为 ORM
- [x] JWT 认证和基于角色的授权
- [x] 使用 `multer` 构建文件服务
- [ ] 配置完善的日志系统，使用 [Winston] 和 [Morgan]
- [ ] 使用 [Jest] 和 [Supertest] 进行单元测试、集成测试和 E2E 测试
- [x] 使用 `ESLint` 执行代码检查
- [x] 使用 `Prettier` 执行代码格式化
- [x] 使用 `cspell` 执行代码拼写检查
- [x] 使用 `Husky`，`lint-staged` 和 `commitlint` 进行 Git 提交管理
- [ ] 使用 `Docker` 和 `Docker Compose` 进行容器化
- [x] 使用 `@/*` 作为绝对路径

## 技术栈

- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)

## 开始使用

### GitHub 模板

> EST 需要 Node 版本 >=14.16.0

[使用这个模板创建仓库](https://github.com/recallwei/est/generate)。

### 克隆到本地

如果您更喜欢使用更干净的 Git 历史记录手动执行此操作：

```bash
npx degit recallwei/est my-est-app
cd my-est-app
pnpm i
```

## 清单

使用此模板时，请尝试按照清单正确更新您自己的信息：

- [ ] 整理 `README.md`
- [ ] 修改 `LICENSE` 中的作者名
- [ ] 修改 `package.json` 中的项目名称、描述、作者等信息
- [ ] 在 `.env` 中修改环境变量，删除示例环境变量 `.env.example`
- [ ] 删除 `src/routes` 目录下的示例 Controller 和路由信息

## 注意

- 文件服务默认会保存在 `./storage` 目录下，该目录默认被添加至 `.gitignore` 中，该目录可通过 `.env` 中的 `FILE_STORAGE_PATH` 重新设置，
  不要忘记将该配置目录添加到 `.gitignore`，以防将存储的文件上传到 GitHub。

## 使用

### 环境

- Node.js >=16.14.0
- pnpm
- PostgreSQL

### 配置环境变量

配置 `.env` 文件，参考 [.env.example](./.env.example).

### 安装

```bash
pnpm i
```

### 数据库迁移

```bash
pnpm prisma:migrate
pnpm prisma:generate
```

### 启动

```bash
pnpm dev
```

### 构建

```bash
pnpm build
```

## 已知问题

- [x] `chalk` v5.x 与 `ts-node` 不兼容，使用 `chalk` v4.x 代替。
- [x] 使用 `bcrypt.js` 而不是 `bcrypt`，避免安装过多依赖。

## 许可证

[MIT](/LICENSE) License &copy; 2023 [Bruce Song](https://github.com/recallwei)
