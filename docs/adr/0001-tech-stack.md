# ADR 0001: Technology Stack

**Date:** 2025-05-14
**Status:** Accepted

## Context

The Virtual Farm Stand project requires a database ORM and API foundation. Two main options were considered: **Prisma** and **Drizzle**.

## Decision

**Prisma** is the chosen ORM for this project.

## Why Prisma

1. **Simpler onboarding** - Prisma has excellent TypeScript integration out of the box with less boilerplate than Drizzle
2. **Migration tooling** - Built-in migration commands (`prisma migrate`) are straightforward for a small team
3. **IDE support** - Prisma VS Code extension provides autocomplete for schema and queries
4. **Current adoption** - Already partially implemented in the project with `prisma/schema.prisma` and `src/lib/db.ts`
5. **SQLite compatibility** - Both work well, but Prisma's SQLite support is mature and well-documented
6. **MVP scope** - For a small MVP with SQLite, Prisma's slightly larger runtime overhead is not a concern

## Alternatives Considered

- **Drizzle**: Lighter weight, more SQL-like, but requires more setup. Good for high-performance needs, but overkill for MVP.

## Implications

- Using SQLite for local development (`dev.db`)
- Prisma Client generated via `prisma generate`
- Migrations managed via `prisma migrate`

## Related Files

- `/prisma/schema.prisma` - Database schema
- `/src/lib/db.ts` - Prisma client instance
