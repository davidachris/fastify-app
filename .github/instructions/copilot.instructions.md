---
applyTo: '**'
---
# Copilot Rules for Fastify 5.x REST API Development

## 1. Project Structure & Organization
- Use clear, modular folder structure (`src/routes`, `src/plugins`, `src/db`, etc.).
- Group related routes and plugins in their respective directories.
- Keep configuration and environment variables separate from code.

## 2. TypeScript Best Practices
- Use strict TypeScript settings (`strict: true` in `tsconfig.json`).
- Type all request/response objects and plugin options.
- Prefer interfaces and types for data models and route schemas.

## 3. Fastify Idioms
- Use Fastify plugins for reusable logic (auth, db, validation).
- Register plugins and routes using autoload for scalability.
- Use route options (`schema`, `config`, etc.) for validation and custom logic.

## 4. Validation & Error Handling
- Validate all incoming requests using JSON schema (`schema` property).
- Return consistent error responses with appropriate HTTP status codes.
- Use Fastify’s built-in error handling and hooks for global concerns.

## 5. Authentication & Authorization
- Implement authentication as a plugin or middleware.
- Use route-level or config-based protection for sensitive endpoints.
- Avoid hardcoding secrets; use environment variables.

## 6. Database Integration
- Use official Fastify plugins for database connections (e.g., `@fastify/mongodb`).
- Handle connection errors gracefully.
- Abstract database logic into service or repository layers.

## 7. Testing & Quality
- Write unit and integration tests for routes and plugins.
- Use TypeScript for test files and keep them in a dedicated `test/` directory.
- Ensure code coverage and run tests before deployment.

## 8. Documentation & Comments
- Document public APIs and plugin interfaces.
- Use JSDoc for complex functions and types.
- Keep README and route-level docs up to date.

## 9. Dependency Management
- Use only well-maintained, official Fastify plugins and libraries.
- Keep dependencies up to date and avoid unnecessary packages.

## 10. Security & Performance
- Use security plugins (`@fastify/helmet`, etc.).
- Validate and sanitize all user input.
- Enable logging and monitoring for production.
