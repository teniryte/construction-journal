# Тестовое задание: журнал строительных работ

<p align="center">
  <a href="https://construction-journal.teniryte.ru">
    <img src="https://img.shields.io/badge/Live%20Demo-construction--journal.teniryte.ru-blue?style=for-the-badge&logo=google-chrome" alt="Live Demo" />
  </a>
</p>

Приложение для учета выполненных строительных работ: список записей, фильтр и сортировка по дате, пагинация, создание и редактирование записей, одиночное и массовое удаление, справочник видов работ.

Проект реализован в виде монорепозитория:

- `apps/api`: бэкенд nestjs;
- `apps/web`: фронтенд next.js;
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

Сервер будет доступен на http://localhost:8002

### Запуск дев-сервера

```bash
git clone git@github.com:teniryte/construction-journal.git
cd construction-journal
cp .env.example .env
bun install
bun run dev
```

По умолчанию:

- web: [http://localhost:8002](http://localhost:8002)
- api: [http://localhost:8001](http://localhost:8001)

## Технологический стек проекта

- **Bun workspaces** — монорепозиторий, быстрый запуск команд и единый lockfile для приложений и shared-пакета.
- **Next.js App Router** — frontend-приложение с файловой маршрутизацией и удобной интеграцией React.
- **React 19** — типобезопасный UI и строгая проверка контрактов на этапе разработки.
- **MUI** — простой UI-фреймворк, подходит для тестового задания.
- **TanStack Query** — управление server state: загрузка, кэширование, инвалидация и рефетчинг данных.
- **React Hook Form** и **Zod** — формы и типобезопасная валидация с переиспользованием схем. Эффективнее, чем Formik.
- **Axios** — HTTP-клиент для работы с API на клиенте.
- **NestJS** — backend с явным разделением controller, service и repository.
- **PostgreSQL** — реляционная база данных.
- **Prisma** — типобезопасная работа с PostgreSQL и миграции.
- **eslint** - определяет правила линтинга, как базовые, так и расширенные (архитектурные границы импортов, например).

## Архитектура

Frontend организован по слоям, близко к FSD:

- `app` — провайдеры, тема, глобальная инфраструктура Next.js;
- `views` — компоновочные страницы;
- `widgets` — крупные композитные блоки интерфейса;
- `features` — пользовательские действия и бизнес-сценарии;
- `entities` — бизнес-сущности, API и представление данных;
- `shared` — переиспользуемые UI-компоненты, API-клиент, утилиты и конфигурация.

Backend следует схеме `controller -> service -> repository`:

- `controller` отвечает за HTTP-слой и валидацию входных данных;
- `service` содержит бизнес-логику и контролируемую обработку ошибок;
- `repository` инкапсулирует работу с Prisma и базой данных.

Общие API-контракты вынесены в `packages/shared`, чтобы frontend и backend использовали одни и те же схемы, DTO и типы.

Тема приложения находится в `apps/web/src/app/styles`, а базовые UI-примитивы — в `apps/web/src/shared/ui`.
