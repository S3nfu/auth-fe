---
name: rules
description: Describe when to use this prompt
---
# AGENT_RULES.md

## Project Overview

This project is a marketplace-style web application built with **Next.js**.
The platform supports multiple listing categories (e.g. vehicles, accommodation) under one unified system.

Users can:

* Register and log in
* Create and manage listings
* Message other users
* Save favorites
* Leave reviews
* Search listings with advanced filters

---

## Core Tech Stack

The agent must strictly follow this stack unless explicitly instructed otherwise.

### Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS

### Backend (within Next.js)

* Next.js Route Handlers
* Prisma ORM
* PostgreSQL

### Search

* Typesense (self-hosted, open-source)
* Used for all listing search and filtering

### Background Jobs

* Redis-based queue (BullMQ or similar)
* Separate worker process (not inside API routes)

---

## TypeScript Rules

1. **Do not use `interface`**.
2. Always use **`type`** unless:

   * The structure is extremely complex
   * Or TypeScript forces interface usage

Example:

```ts
// Correct
type User = {
  id: string
  email: string
}

// Incorrect
interface User {
  id: string
  email: string
}
```

---

## Project Architecture

### Directory Structure (recommended)

```
/app
  /api
  /(routes)

/lib
  /prisma
  /services
  /repositories
  /validators
  /types

/modules
  /auth
  /listing
  /chat
  /user
  /search
```

---

## Backend Architecture Rules

The agent must follow **service-based architecture**.

### Do NOT:

* Put business logic inside route handlers
* Access Prisma directly from routes
* Mix validation, DB logic, and response logic in one file

### Correct flow:

```
Route → Validator → Service → Repository → Prisma
```

Example:

```
POST /api/listings
  → validate input (zod)
  → call listingService.create()
  → repository saves via Prisma
  → enqueue background job
```

---

## Database Rules

* Prisma is the single source of truth
* PostgreSQL is the main database
* All schema changes must go through Prisma migrations

### Core Models

Must always exist:

* User
* Listing
* ListingMedia
* Favorite
* Conversation
* Message
* Review

### Listing Structure

Use a **core listing model** with category-specific detail tables.

Example:

* Listing (shared fields)
* CarListingDetails
* AccommodationListingDetails

Never create one giant table with hundreds of optional columns.

---

## Search Rules (Typesense)

Search engine is **not the source of truth**.

### Rules:

* DB = source of truth
* Typesense = search index only

### Flow:

1. Listing is created/updated in DB
2. Background job is triggered
3. Worker updates Typesense index

Never:

* Write directly to Typesense from API routes
* Trust Typesense as primary data storage

---

## Background Job Rules

Heavy or async tasks must be processed in background workers.

### Examples of jobs:

* Search indexing
* Image processing
* Email notifications
* Listing expiration
* Moderation

### Rules:

* API routes must stay fast
* Routes only enqueue jobs
* Workers process the jobs

---

## Validation

* Use **Zod** for all input validation
* No raw `req.body` usage without validation

---

## Styling Rules

* Tailwind CSS only
* No inline styles
* No CSS modules unless absolutely necessary

---

## Naming Conventions

### Files

* kebab-case for files
* Example: `create-listing.service.ts`

### Variables

* camelCase

### Types

* PascalCase

---

## API Design Rules

* REST-style endpoints
* No GraphQL unless explicitly required

Examples:

```
POST   /api/listings
GET    /api/listings/:id
PATCH  /api/listings/:id
DELETE /api/listings/:id
```

---

## General Coding Principles

The agent must:

* Write simple, readable code
* Avoid premature optimization
* Avoid unnecessary abstractions
* Prefer explicit logic over magic
* Keep functions small and focused
* Reuse existing services when possible

---

## What the Agent Is Responsible For

The agent may:

* Create new features
* Add API endpoints
* Modify Prisma models
* Add services, validators, and repositories
* Implement background jobs
* Integrate search indexing
* Write tests (if present)

The agent must NOT:

* Change the tech stack
* Introduce new major dependencies without approval
* Rewrite architecture
* Bypass validation or services
* Use interfaces instead of types

---

## Future Scalability Principles

The architecture must allow:

* Separate worker processes
* External search engine
* External real-time chat service
* Potential future standalone backend

Avoid tight coupling between:

* API routes
* Database logic
* Search engine
* Background jobs

---

## Summary

The system is:

* Next.js fullstack app
* Prisma + PostgreSQL as source of truth
* Typesense for search
* Redis-based background jobs
* Strict service-based architecture
* TypeScript with `type` only (no interfaces)
