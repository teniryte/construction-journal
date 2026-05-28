# Тестовое задание: журнал строительных работ

<p align="center">
  <a href="https://construction-journal.teniryte.ru">
    <img src="https://img.shields.io/badge/Live%20Demo-construction--journal.teniryte.ru-blue?style=for-the-badge&logo=google-chrome" alt="Live Demo" />
  </a>
</p>

Приложение для учета выполненных строительных работ: список записей, фильтр и сортировка по дате, пагинация, создание и редактирование записей, одиночное и массовое удаление, справочник видов работ.

Проект реализован в виде монорепозитория:

- `apps/api`: бэкенд NestJS;
- `apps/web`: фронтенд Next.js;
- `packages/shared`: Zod-схемы и TypeScript-типы, которые используются и на клиенте, и на сервере как единый контракт API.

При выполнении тестового задания приоритет был отдан архитектуре и масштабируемости.

Часть типовых задач (каркас роутинга, настройка DatePicker и CreatableSelect, тема MUI) для ускорения разработки была выполнена с использованием ИИ-агента Codex. Полученный код использовался как черновая база, был в обязательном порятдке отревьюен и при необходимости исправлен.

## Сборка и запуск с помощью Docker

```sh
git clone git@github.com:teniryte/construction-journal.git
cd construction-journal
cp .env.example .env
docker compose up --build
```

Веб-приложение будет доступно на http://localhost:8002

### Запуск дев-сервера

```bash
git clone git@github.com:teniryte/construction-journal.git
cd construction-journal

# Минимально - указать строку соединения с базой данных
cp .env.example .env

bun install

bunx prisma migrate deploy
bunx prisma generate

bun run dev
```

По умолчанию:

- web: [http://localhost:8002](http://localhost:8002)
- api: [http://localhost:8001](http://localhost:8001)

## Технологический стек проекта

- **Bun workspaces** — монорепозиторий, быстрый запуск команд и единый lockfile для приложений и shared-пакета.
- **React 19** / **Next.js App Router** — frontend-приложение с файловой маршрутизацией.
- **MUI** — простой UI-фреймворк, решил не усложнять UI-слой введением radix/shadcn.
- **TanStack Query** — управление server state: загрузка, кэширование, инвалидация и рефетчинг данных.
- **React Hook Form** и **Zod** — формы и типобезопасная валидация с переиспользованием схем. Эффективнее, чем Formik.
- **Axios** — HTTP-клиент для работы с API.
- **NestJS** — backend с явным разделением controller, service и repository.
- **PostgreSQL** — реляционная база данных.
- **Prisma** — типобезопасная работа с PostgreSQL и миграции.
- **eslint** - определяет правила линтинга, как базовые, так и расширенные (архитектурные границы импортов, например).

## Архитектура

Frontend организован по слоям, близко к FSD. Для совместимости файловой структуры App Router с FSD-слоями App Router находится в корневой директории проекта `app`, а FSD-слои – в директории `src`:

- `src/app` — верхний FSD-слой: провайдеры, тема, глобальная инфраструктура;
- `src/views` — компоновочные страницы;
- `src/widgets` — крупные композитные блоки интерфейса;
- `src/features` — пользовательские действия и бизнес-сценарии;
- `src/entities` — бизнес-сущности, API и представление данных;
- `src/shared` — переиспользуемые UI-компоненты, API-клиент, утилиты и конфигурация.

Backend следует схеме `controller -> service -> repository`:

- `controller` отвечает за HTTP-слой и валидацию входных данных;
- `service` содержит бизнес-логику и контролируемую обработку ошибок;
- `repository` инкапсулирует работу с Prisma и базой данных.

Общие API-контракты вынесены в `packages/shared`, чтобы frontend и backend использовали одни и те же схемы, DTO и типы.

Тема приложения находится в `apps/web/src/app/styles`, а базовые UI-примитивы — в `apps/web/src/shared/ui`.
