# Adamas University: Do-Fetch Institutional Registry — Complete Technical Documentation

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [System Architecture](#2-system-architecture)
3. [Full Database Schema](#3-full-database-schema)
4. [Authentication and Authorization](#4-authentication-and-authorization)
5. [Telegram File Storage](#5-telegram-file-storage)
6. [Redis Caching Layer](#6-redis-caching-layer)
7. [Gemini AI Extraction](#7-gemini-ai-extraction)
8. [Graphify Visualizer](#8-graphify-visualizer)
9. [Complete Workflow Diagrams](#9-complete-workflow-diagrams)
10. [API Reference](#10-api-reference)
11. [Frontend Component Map](#11-frontend-component-map)
12. [Environment Variables and Config](#12-environment-variables-and-config)
13. [Deployment Architecture](#13-deployment-architecture)
14. [Security Analysis](#14-security-analysis)
15. [Dependency Audit](#15-dependency-audit)
16. [Cost Analysis](#16-cost-analysis)
17. [Limitations and Roadmap](#17-limitations-and-roadmap)
18. [FAQ — Panel Defense](#18-faq--panel-defense)
19. [Glossary](#19-glossary)

---

## 1. Project Overview

- **Project name:** Adamas University: Do-Fetch Institutional Registry
- **Purpose:** An institutional repository that acts as an "Infinite Free Storage for Academic Artifacts". It features an AI-powered credential investigator (Gemini) for forensic fraud detection, acting as a zero-cost verifiable credential system.
- **Target users and roles:** `student` (for artifact uploading and portfolio management), `faculty` (for auditing, verification, and section management), and `admin`. [src/context/AuthContext.tsx, sql/schema.sql]
- **Core feature list:**
  - File upload to Telegram (for binary storage)
  - Forensic AI extraction and verification scoring of certificates
  - Dashboard for students and faculty
  - Row Level Security / Domain-locked authentication
  - Public certificate viewer/portfolio

### Tech Stack

| Layer                   | Technology                    | Version         | Config File Location                          |
| ----------------------- | ----------------------------- | --------------- | --------------------------------------------- |
| Fullstack Framework     | Next.js                       | 15.5.15         | `next.config.ts`                              |
| Database                | Supabase (PostgreSQL)         | ^2.104.1        | `sql/schema.sql`, `supabase/rls_policies.sql` |
| Authentication          | Clerk                         | ^6.0.0          | `src/middleware.ts`                           |
| Caching & Rate Limiting | Upstash (Redis)               | [UNVERIFIED]    | `.env.local`, `src/lib/redis.ts`              |
| Storage                 | Telegram Bot API              | [UNVERIFIED]    | `src/lib/telegram.ts`                         |
| AI / Extraction         | Google Generative AI (Gemini) | ^0.24.1         | `src/lib/gemini.ts`                           |
| UI & Styling            | Tailwind CSS                  | ^4              | `postcss.config.mjs`, `src/app/globals.css`   |
| Animations              | GSAP, Framer Motion           | 3.15.0, 12.38.0 | `src/hooks/useGsapAnimations.ts`              |
| Language                | TypeScript                    | ^5              | `tsconfig.json`                               |
| Testing                 | Vitest, Playwright            | 4.1.5, 1.59.1   | `vitest.config.ts`, `playwright.config.ts`    |

### Full Directory Tree

```text
├── .github/
│   └── workflows/
├── .husky/
├── graphify-out/
├── portal/
├── public/
├── sql/
│   └── schema.sql
├── src/
│   ├── __tests__/
│   ├── app/
│   │   ├── api/
│   │   ├── faculty/
│   │   ├── login/
│   │   ├── portfolio/
│   │   ├── student/
│   │   └── verify/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   └── middleware.ts
├── supabase/
│   └── rls_policies.sql
├── tests/
├── Dockerfile
├── docker-compose.yml
├── next.config.ts
├── package.json
└── vercel.json
```

---

## 2. System Architecture

### System Architecture Diagram

```text
[Browser / Client]
       │
       ▼
 [Next.js App Router (Middleware Auth)]
       │
       ├─► [Next.js API Routes (/api/*)]
       │         │
       │         ├─► [Clerk API] (Verify Session JWT)
       │         │
       │         ├─► [Supabase PostgreSQL] (Metadata & Profiles via Service Role)
       │         │
       │         ├─► [Upstash Redis] (Upload Sync State / Rate Limits)
       │         │
       │         ├─► [Telegram Bot API] (Artifact Binary Storage)
       │         │
       │         └─► [Google Gemini] (AI Forensic Credential Extractor)
       │
       └─► [Supabase Client] (Client-side fetches using RLS via Anon Key)
```

### Component Interaction Map

```text
Upload Flow Interaction Map:
[Browser] ──(async/await)──► [Next.js Route: /api/upload]
                                  │
                                  ├─(sync)─► [Clerk Auth Check]
                                  │
                                  ├─(async)─► [Redis]: Set upload status to "synchronizing"
                                  │
                                  ├─(async)─► [Supabase]: Enforce daily upload quota (count >= 10)
                                  │
                                  ├─(async)─► [Telegram API]: uploadToTelegram() → returns fileId
                                  │
                                  ├─(async)─► [Supabase]: Insert certificate metadata
                                  │
                                  └─(async)─► [Redis]: Delete upload status

[Browser] ◄──(sync)── [Response 200 OK / 400 Error]
```

### Technology Decisions

#### Clerk [src/middleware.ts]

- **What it is:** Authentication and User Management platform.
- **Why it was chosen:** Out-of-the-box UI components and secure JWT handling, allowing easy institutional domain-locking.
- **Exactly how it is used:** Used as middleware (`clerkMiddleware`) to block access if `!userId` or domain does not match `@adamasuniversity.ac.in`. Also used in `src/context/AuthContext.tsx` to distribute local user state.

#### Supabase [src/lib/supabase.ts]

- **What it is:** Open-source Firebase alternative based on PostgreSQL.
- **Why it was chosen:** Zero-cost architecture, native relational queries, and Row Level Security.
- **Exactly how it is used:** Server-side API endpoints use `SUPABASE_SERVICE_ROLE_KEY` to bypass RLS (`supabase.from("certificates").insert()`), while client-side fetches use `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

#### Telegram Bot API [src/lib/telegram.ts]

- **What it is:** Cloud-based instant messaging service API.
- **Why it was chosen:** "Infinite Free Storage for Academic Artifacts". Bypasses standard AWS S3 or Supabase Storage costs.
- **Exactly how it is used:** `uploadToTelegram(file)` sends formData via POST to `api.telegram.org/bot{TOKEN}/sendDocument`, retrieving a `file_id` which acts as the DB reference.

#### Google Gemini [src/lib/gemini.ts]

- **What it is:** Multimodal AI model.
- **Why it was chosen:** Capable of combining OCR and logical reasoning in a single prompt for fraud detection.
- **Exactly how it is used:** `extractCertificateData()` passes the file as base64 to `gemini-1.5-flash` with a strict JSON-schema prompt to grade authenticity.

### Entity Relationship Diagram

```text
 ┌──────────────────────┐             ┌─────────────────────────┐
 │ profiles             │             │ certificates            │
 │----------------------│             │-------------------------│
 │ PK  id               │◄──1────M───┼┤ FK  student_id          │
 │     email            │             │ PK  id                  │
 │     full_name        │             │     telegram_file_id    │
 │     role             │             │     score               │
 │     department       │             │     status              │
 │     batch            │             │     extracted_text      │
 │     section          │             │     ...                 │
 └──────────────────────┘             └─────────────────────────┘
```

---

## 3. Full Database Schema

### Table: profiles [sql/schema.sql]

| Column             | Type        | Constraints                     | Default | Notes                                  |
| ------------------ | ----------- | ------------------------------- | ------- | -------------------------------------- |
| `id`               | TEXT        | PRIMARY KEY                     |         | Clerk User ID                          |
| `email`            | TEXT        | UNIQUE, NOT NULL                |         |                                        |
| `full_name`        | TEXT        |                                 |         |                                        |
| `role`             | TEXT        | CHECK (student, faculty, admin) |         |                                        |
| `department`       | TEXT        |                                 |         | e.g. 'CSE', 'ECE'                      |
| `batch`            | TEXT        |                                 |         | For Students                           |
| `section`          | TEXT        |                                 |         | For Students                           |
| `sections_managed` | TEXT[]      |                                 |         | For Faculty                            |
| `created_at`       | TIMESTAMPTZ |                                 | NOW()   |                                        |
| `updated_at`       | TIMESTAMPTZ |                                 | NOW()   | Modtime trigger                        |
| `full_name_locked` | BOOLEAN     | [UNVERIFIED]                    |         | [INFERRED FROM `api/profile/route.ts`] |

### Table: certificates [sql/schema.sql]

| Column                | Type         | Constraints                         | Default           | Notes                   |
| --------------------- | ------------ | ----------------------------------- | ----------------- | ----------------------- |
| `id`                  | UUID         | PRIMARY KEY                         | gen_random_uuid() |                         |
| `student_id`          | TEXT         | REFERENCES profiles(id)             |                   |                         |
| `telegram_file_id`    | TEXT         | NOT NULL                            |                   | Permanent link          |
| `telegram_message_id` | BIGINT       |                                     |                   | Required for deletion   |
| `title`               | TEXT         | NOT NULL                            |                   |                         |
| `issuer`              | TEXT         |                                     |                   |                         |
| `type`                | TEXT         |                                     |                   |                         |
| `issue_date`          | DATE         |                                     |                   |                         |
| `score`               | NUMERIC(5,2) |                                     |                   | AI Calculated Weightage |
| `status`              | TEXT         | CHECK (pending, approved, rejected) | 'pending'         |                         |
| `rejection_reason`    | TEXT         |                                     |                   |                         |
| `extracted_text`      | JSONB        |                                     |                   | Full OCR output         |
| `created_at`          | TIMESTAMPTZ  |                                     | NOW()             |                         |

### JSONB Field Structures

For `extracted_text` JSONB column in `certificates` table [src/app/api/upload/route.ts]:

```json
{
  "raw_filename": "string (original uploaded filename)",
  "authenticity_reasoning": "string (AI reasoning on fraud/genuineness)",
  "file_hash": "string or null",
  "verification_link": "string or null",
  "recipient_name": "string or null",
  "name_match": "boolean",
  "name_mismatch_flag": "boolean"
}
```

### Migrations and Indexes

| Migration File              | Order | What It Does      |
| --------------------------- | ----- | ----------------- |
| `sql/schema.sql`            | 1     | Base schema setup |
| `supabase/rls_policies.sql` | 2     | RLS setup         |

| Index Name           | Table        | Column | Reason            |
| -------------------- | ------------ | ------ | ----------------- |
| `profiles_pkey`      | profiles     | id     | Primary Key       |
| `profiles_email_key` | profiles     | email  | UNIQUE constraint |
| `certificates_pkey`  | certificates | id     | Primary Key       |

_(No explicit custom indexes are defined in `schema.sql` other than PK/UNIQUE constraints)._

---

## 4. Authentication and Authorization

### Authentication Flow

```text
[Browser Request]
       │
       ▼
[Clerk Login (OAuth / Email)]
       │
       ▼
[Email Domain Checked in Middleware]
(e.g., @stu.adamasuniversity.ac.in)
       │
       ▼
[Role Inferred / Checked]
       │
       ▼
[Clerk JWT Session Issued]
       │
       ▼
[Access Protected Routes or AuthContext]
```

### Student vs Faculty Role Logic

[src/middleware.ts]

```js
// Priority 2: Guess based on institutional domain for new users
if (email?.endsWith("@stu.adamasuniversity.ac.in")) {
  return NextResponse.redirect(new URL("/student/dashboard", req.url));
} else if (email?.endsWith("@adamasuniversity.ac.in")) {
  return NextResponse.redirect(new URL("/faculty/dashboard", req.url));
} else {
  // Default fallback: New user with non-institutional email
  return NextResponse.redirect(new URL("/onboarding", req.url));
}
```

### Protected Routes Table

| Route        | Method | Role Required | Middleware                  | File                |
| ------------ | ------ | ------------- | --------------------------- | ------------------- |
| `/student/*` | GET    | student       | Clerk Domain Lock           | `src/middleware.ts` |
| `/faculty/*` | GET    | faculty       | Clerk Domain Lock           | `src/middleware.ts` |
| `/api/*`     | ALL    | authenticated | Clerk `isPublicRoute` check | `src/middleware.ts` |
| `/login`     | GET    | public        | None                        | `src/middleware.ts` |

### RLS vs API Auth — Layered Security

The application uses **Layered Security**:

1. **API Auth (Application Level):** In Next.js routes (e.g., `/api/profile/route.ts`), Clerk's `auth()` is executed to extract the `userId`. The API uses `SUPABASE_SERVICE_ROLE_KEY` to directly alter the database, explicitly bypassing RLS, but strictly limits operations logically using the authenticated `userId`.
2. **RLS (Database Level):** If the client connects to Supabase directly (e.g., via browser using `NEXT_PUBLIC_SUPABASE_ANON_KEY`), the RLS policies in `supabase/rls_policies.sql` enforce that `student_id = auth.uid()::text`.

### Row Level Security Policies

| Policy Name                 | Table          | Operation | Role            | Rule                                        |
| --------------------------- | -------------- | --------- | --------------- | ------------------------------------------- |
| `students_read_own_certs`   | `certificates` | SELECT    | `authenticated` | `student_id = auth.uid() OR role = faculty` |
| `students_insert_own_certs` | `certificates` | INSERT    | `authenticated` | `student_id = auth.uid()`                   |
| `faculty_update_certs`      | `certificates` | UPDATE    | `authenticated` | `role = faculty`                            |

---

## 5. Telegram File Storage

### Why Telegram Was Chosen

Telegram is utilized as a zero-cost backend storage solution. A comment in `src/lib/telegram.ts` explicitly states the reasoning: _"Infinite Free Storage for Academic Artifacts"_. It bypasses traditional S3 or Supabase Storage bucket costs by using a private Telegram channel/chat as a data dump.

### Full Upload Code Path

```text
[Browser]
   │
   ▼ POST /api/upload
[Next.js API: src/app/api/upload/route.ts]
   │
   ├─► [Supabase DB] (Enforce daily quota)
   │
   ├─► [Telegram Bot API] (uploadToTelegram() via sendDocument)
   │        │
   │        └─► Returns: file_id, message_id
   │
   ├─► [Supabase DB] (INSERT INTO certificates)
   │
   ▼
[Response 200 OK]
```

### Full Retrieval Code Path

```text
Request GET /api/view/[fileId]
   │
   ▼
[Telegram Bot API: getFile]
   │ (Returns temporary file_path)
   ▼
[Telegram File API: Download Binary]
   │
   ▼
[Serve Buffer to User as application/pdf or image/*]
```

### Telegram vs Alternatives

| Factor          | Telegram           | AWS S3       | Cloudinary      | Supabase Storage |
| --------------- | ------------------ | ------------ | --------------- | ---------------- |
| Cost            | Free (Hack)        | Paid (Usage) | Paid (Usage)    | Paid (Usage)     |
| File size limit | App: 10MB          | TBs          | GBs             | GBs              |
| Speed           | Slow (2 hops)      | Fast         | Very Fast (CDN) | Fast             |
| Reliability     | Low (Bot Ban Risk) | 99.99%       | 99.99%          | 99.9%            |
| URL permanence  | 1 Hour TTL         | Infinite     | Infinite        | Infinite         |

---

## 6. Redis Caching Layer

### What Is Being Cached

| Cache Key Pattern         | Value Stored                                 | TTL  | Where It Is Set                           |
| ------------------------- | -------------------------------------------- | ---- | ----------------------------------------- |
| `upload_status:${userId}` | `{ status, message, timestamp }`             | 300s | `src/app/api/extract/route.ts` & `upload` |
| `upload_status:${userId}` | `{ status, result, staged_path, timestamp }` | 600s | `src/app/api/extract/route.ts`            |

### Cache HIT Flow

```text
[Frontend poll /status]
      │
      ▼
[API: redis.get(key)] ──► [Upstash Redis REST API]
      │
      ▼
[JSON parsed & returned to User]
```

### Cache Invalidation Strategy

Invalidation is proactive. `redis.del(key)` is explicitly called at the end of a successful upload (`src/app/api/upload/route.ts`), inside the `catch` blocks of upload/extract, and explicitly via the `DELETE /api/upload/status` route.

---

## 7. Gemini AI Extraction

### Exact Prompt Sent to Gemini

```text
You are a hostile, expert forensic credential investigator. Your job is fraud detection. Analyze this certificate/document image for ANY signs of forgery, generic templates, or lack of verification.
      Extract the following in pure JSON format:
      {
        "title": "string (the name/title of the course, achievement, or certificate)",
        ...
        "score": number (Evaluate authenticity OUT OF 50. STRICT RULES: 1. If it looks like a generic Canva/Figma template, max score is 15. 2. If fonts are mismatched or misaligned, score is < 10. 3. If the issuer claims to be a major tech company/university but lacks a verification link/ID, score is strictly < 20.),
        "authenticity_reasoning": "string (...)"
      }
      Only return valid JSON without Markdown blocks.
```

### Full Gemini Pipeline Diagram

```text
[File Uploaded]
       │
       ▼
[Converted to Base64 String]
       │
       ▼
[Gemini Vision API: generateContent()]
       │
       ▼
[JSON Markdown Regex Stripping]
       │
       ▼
[Name-Matching Algorithm (Compares Profile Name to Extracted Name)]
       │
       ▼
[Score Modification (Penalties applied for Mismatches)]
       │
       ▼
[Store result in Redis for Client Retrieval]
```

### Runtime Model Auto-Detection System

Because Gemini models are frequently updated and deprecated, the code contains dynamic discovery logic (`resolveModel()` in `src/lib/gemini.ts`). It hits `https://generativelanguage.googleapis.com/v1/models` to get all currently online models for the provided API key.

---

## 8. Graphify Visualizer

The visualizer is primarily contained within `src/components/RegistryGraph.tsx` and documented by an external graph analysis in the `graphify-out/GRAPH_REPORT.md`.

### Purpose of the Visualizer

It shows a hierarchical mentorship grid representing a Faculty member's network. It displays the root (Faculty), the hubs (Batches managed), and leaves (Sections within those batches). The intended audience is Faculty members to visualize their assigned student cohorts.

### Graphify Data Flow

```text
Static NODES Array → getAbsPos() Calculation →
Render SVG Bezier Paths (Edges) → Render Framer Motion Divs (Nodes) →
Hover State Updates via setHoveredNode()
```

### Graphify Issues Found

- **Hardcoded values:** All nodes (Batch 24, SEC_24_A, etc.) are strictly hardcoded into the file. It does not dynamically load a user's actual `sectionsManaged` array from `useAuth()`.

---

## 9. Complete Workflow Diagrams

### 9.1 — Student Uploads a Certificate

```text
User Selects File → Submit
       │
       ▼
POST /api/extract (Rate Limited)
       │
       ├─► Hash Check → Duplicate? (409 Conflict)
       │
       ├─► Gemini Vision AI Extraction (Score, Data)
       │
       └─► Stage file in Supabase 'draft-artifacts' → Save to Redis ('upload_status')
       │
       ▼
Frontend polls GET /api/upload/status → Shows preview
       │
       ▼
User Clicks "Sync" → POST /api/upload
       │
       ├─► Check quota via Supabase profiles
       │
       ├─► uploadToTelegram() → Get file_id
       │
       └─► DB Insert into 'certificates' → redis.del('upload_status')
       │
       ▼
Success Response
```

### 9.2 — Faculty Reviews a Certificate

```text
Faculty visits Dashboard
       │
       ▼
useCertificates() Hook
       │
       ▼
Supabase Query (Joined with 'profiles' table)
       │
       ▼
RLS / Query Filter: query.in("profiles.section", user.sectionsManaged)
       │
       ▼
Supabase Realtime Channel Subscription (for live updates)
       │
       ▼
Render Certificate Cards in UI
```

---

## 10. API Reference

| Method    | Path                     | Auth  | Role    | Description                                          |
| --------- | ------------------------ | ----- | ------- | ---------------------------------------------------- |
| POST      | `/api/onboarding`        | Clerk | Any     | Upserts user profile and syncs metadata              |
| POST      | `/api/extract`           | Clerk | Any     | Gemini AI extraction, hash check, and Redis staging  |
| POST      | `/api/upload`            | Clerk | Any     | Finalize upload to Telegram and insert to DB         |
| GET       | `/api/upload/status`     | Clerk | Any     | Fetches async status from Redis                      |
| DELETE    | `/api/upload/status`     | Clerk | Any     | Clears async status from Redis                       |
| GET       | `/api/view/[fileId]`     | None  | Public  | Proxies binary file from Telegram                    |
| DELETE    | `/api/certificates/[id]` | Clerk | Owner   | Deletes certificate from DB and Telegram             |
| POST      | `/api/audit`             | None  | Service | Admin route to approve/reject and score certificates |
| POST      | `/api/verify/[id]`       | None  | Public  | Re-evaluates a certificate using AI dynamically      |
| PATCH     | `/api/profile`           | Clerk | Any     | Updates user profile                                 |
| POST, GET | `/api/profile/update`    | Clerk | Any     | Alternative route for profile updates                |
| GET       | `/api/quota`             | Clerk | Any     | Retrieves upload quota data                          |
| GET       | `/api/og/[id]`           | Clerk | Any     | Dynamic OpenGraph image generation                   |

---

## 11. Frontend Component Map

### Component Details Table

| Component        | File Path              | What It Does               | API Calls                 | Role Access |
| ---------------- | ---------------------- | -------------------------- | ------------------------- | ----------- |
| RegistryGraph    | `RegistryGraph.tsx`    | Visualizes Mentor Topology | None                      | Faculty     |
| AuthContext      | `AuthContext.tsx`      | Provides Global User State | `/api/onboarding`         | Any         |
| CertificateCard  | `CertificateCard.tsx`  | UI for individual cert     | None                      | Any         |
| ProfileEditModal | `ProfileEditModal.tsx` | UI to edit user details    | [INFERRED] `/api/profile` | Any         |
| DashboardLayout  | `DashboardLayout.tsx`  | Wraps authenticated views  | None                      | Any         |

### State Management

React Context and Custom Hooks are used. No Redux or Zustand is present.

| Store / Hook        | State It Manages                                       | File                             |
| ------------------- | ------------------------------------------------------ | -------------------------------- |
| `AuthContext`       | Global user, role, metadata, sync state                | `src/context/AuthContext.tsx`    |
| `useCertificates`   | Fetches, stores, and handles Supabase Realtime updates | `src/hooks/useCertificates.ts`   |
| `useProfile`        | Manages user profile data [INFERRED]                   | `src/hooks/useProfile.ts`        |
| `useGsapAnimations` | Orchestrates GSAP timeline refs                        | `src/hooks/useGsapAnimations.ts` |

---

## 12. Environment Variables and Config

| Variable                            | Service   | Purpose                           | Example Value           | Required |
| ----------------------------------- | --------- | --------------------------------- | ----------------------- | -------- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk     | Public key for frontend auth      | `pk_test_...`           | Yes      |
| `CLERK_SECRET_KEY`                  | Clerk     | Private key for API auth checks   | `sk_test_...`           | Yes      |
| `NEXT_PUBLIC_SUPABASE_URL`          | Supabase  | DB/Storage endpoint               | `https://*.supabase.co` | Yes      |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`     | Supabase  | Public key for RLS                | `eyJhb...`              | Yes      |
| `SUPABASE_SERVICE_ROLE_KEY`         | Supabase  | Admin key to bypass RLS in API    | `eyJhb...`              | Yes      |
| `TELEGRAM_BOT_TOKEN`                | Telegram  | Auth for proxy storage bot        | `8642...`               | Yes      |
| `TELEGRAM_CHAT_ID`                  | Telegram  | Target chat/channel ID            | `-1003...`              | Yes      |
| `GEMINI_API_KEY`                    | Google AI | Auth for Vision extraction        | `AIzaSy...`             | Yes      |
| `UPSTASH_REDIS_REST_URL`            | Upstash   | Redis endpoint for status polling | `https://*.upstash.io`  | Yes      |
| `UPSTASH_REDIS_REST_TOKEN`          | Upstash   | Redis auth token                  | `gQAA...`               | Yes      |

_Note: Any variable prefixed with `NEXT_PUBLIC_` is embedded in the frontend bundle. All others are strictly secret and only accessible within Node.js API routes._

| Config File            | Purpose                                         | Used By                    |
| ---------------------- | ----------------------------------------------- | -------------------------- |
| `vercel.json`          | Configures build, security headers, and caching | Vercel Deployment          |
| `docker-compose.yml`   | Maps ports and env for local container          | Docker runtime             |
| `Dockerfile`           | Multi-stage build for standalone Next.js        | Docker / Render deployment |
| `playwright.config.ts` | E2E testing configuration                       | GitHub Actions             |

---

## 13. Deployment Architecture

```text
[Git Push (main)]
       │
       ├─► [GitHub Actions] (Playwright E2E Tests)
       │
       ├─► [Vercel] (Next.js Edge/Serverless Frontend & API Routes)
       │
       └─► [Alternative: Render/Docker] (Standalone Node.js Server via Dockerfile)
```

### Full-Stack on Vercel / Docker

The application is a standard Next.js 15 Full-Stack repository.

- **Vercel Setup:** Deploys natively using `next build`.
- **Docker Setup:** Provided `Dockerfile` utilizes Next.js standalone output tracing (`.next/standalone`) for ultra-lean containerized deployments.

### CI/CD Pipeline

| Workflow File    | Trigger                   | What It Does                                                                     |
| ---------------- | ------------------------- | -------------------------------------------------------------------------------- |
| `playwright.yml` | push, pull_request (main) | Installs dependencies, runs `npx playwright test`, and uploads report artifacts. |

---

## 14. Security Analysis

### Threat Model

| Threat             | Attack Vector                | Likelihood | Impact | Mitigation in Code                                                        |
| ------------------ | ---------------------------- | ---------- | ------ | ------------------------------------------------------------------------- |
| Forged Credentials | Uploading edited PDFs/images | High       | High   | Gemini AI forensic analysis penalizes template usage and font mismatches. |
| DB Scraping        | Querying API for all certs   | Low        | Med    | Supabase RLS policies restrict SELECT queries.                            |
| Telegram Dump      | Accessing raw bot channel    | Med        | High   | Channel is private. Only specific chat_id is targeted.                    |
| Quota Exhaustion   | Spamming `/api/extract`      | Med        | Med    | In-memory sliding window rate-limiter limits users to 5 requests/min.     |

### API Security Gaps

- **Missing Validation:** `/api/audit` only checks if status is `approved` or `rejected`. It blindly trusts the `id` payload without strictly verifying if the certificate actually exists before attempting the update.
- **Public View Route:** `/api/view/[fileId]/route.ts` lacks authentication. Anyone with a valid `fileId` hash can download the underlying artifact.

### Input Validation Coverage

| Endpoint       | Validated? | Library Used | Rules Applied                           |
| -------------- | ---------- | ------------ | --------------------------------------- |
| `/api/extract` | Partial    | Manual Logic | File size < 10MB, specific mime types.  |
| `/api/audit`   | Partial    | Manual Logic | Status Enum check, Score bounds (0-50). |

---

## 15. Dependency Audit

| Package                 | Version  | Purpose             | Critical | Alternatives              |
| ----------------------- | -------- | ------------------- | -------- | ------------------------- |
| `next`                  | 15.5.15  | Core App Framework  | Yes      | React + Vite              |
| `@clerk/nextjs`         | ^6.0.0   | Authentication      | Yes      | NextAuth, Supabase Auth   |
| `@supabase/supabase-js` | ^2.104.1 | Database Client     | Yes      | Prisma, Drizzle           |
| `gsap`                  | ^3.15.0  | Advanced Animations | No       | Framer Motion (redundant) |
| `framer-motion`         | ^12.38.0 | Advanced Animations | No       | GSAP (redundant)          |
| `@google/generative-ai` | ^0.24.1  | Gemini API Wrapper  | Yes      | OpenAI SDK                |

**Technical Debt Discovered:** Both `gsap` and `framer-motion` are installed. This bloats the client-side bundle size. The team should pick one animation library and remove the other.

---

## 16. Cost Analysis

Current total cost is approximately $0 by heavily leveraging serverless free tiers and the Telegram storage hack.

| Service    | Free Tier Limit  | Current Usage | Cost When Exceeded  |
| ---------- | ---------------- | ------------- | ------------------- |
| Vercel     | 100GB Bandwidth  | Minimal       | $20/mo (Pro)        |
| Supabase   | 500MB DB         | Minimal       | $25/mo (Pro)        |
| Telegram   | Unlimited        | Minimal       | N/A (Free forever)  |
| Upstash    | 10k commands/day | Minimal       | $0.20 per 100k cmds |
| Gemini API | 15 RPM           | Minimal       | Pay-as-you-go       |

_Note: The first service to require a paid upgrade will be **Gemini API** if concurrent users spike, due to the strict 15 Requests Per Minute limit on the free tier._

---

## 17. Limitations and Roadmap

### Current Limitations Found in Code

| Limitation                | File                                 | Line | Impact                                                                                        |
| ------------------------- | ------------------------------------ | ---- | --------------------------------------------------------------------------------------------- |
| Rate Limiter is In-Memory | `src/lib/rateLimit.ts`               | 11   | If deployed on Vercel Serverless, memory is wiped between cold starts. Limits reset randomly. |
| Telegram 2-Hop Latency    | `src/app/api/view/[fileId]/route.ts` | 19   | Viewing images is significantly slower than standard CDNs.                                    |

### Technical Debt Discovered

| Debt Item                | File           | Severity | Recommended Fix                                     |
| ------------------------ | -------------- | -------- | --------------------------------------------------- |
| Dual Animation Libraries | `package.json` | Medium   | Uninstall GSAP or Framer Motion to cut bundle size. |

### v1.1 — Short Term Improvements (1-2 months)

- Migrate the in-memory rate limiter (`src/lib/rateLimit.ts`) to use Upstash Redis for persistent cross-instance tracking.
- Standardize animation libraries.

### What Must Change for Production Scale

Telegram storage must be deprecated. It is suitable for a prototype, but a production application requires AWS S3 or Supabase Storage for reliability, permanent URLs, and proper CDN caching.

---

## 18. FAQ — Panel Defense

**Q: Why Telegram instead of AWS S3 or Google Drive?**
For this institutional prototype, Telegram provides an infinite, zero-cost binary storage solution. By proxying requests, we bypass AWS bandwidth costs completely.

**Q: Is storing user files on Telegram safe or ethical?**
It is encrypted in transit and stored in a private channel inaccessible to the public. However, it relies on Telegram's internal privacy policies, making it unsuited for highly regulated PII in a final production environment.

**Q: What happens to all user data if the bot is banned?**
The database and metadata survive, but all underlying PDF and Image binaries are permanently lost.

**Q: Are Telegram file URLs permanent and publicly accessible?**
No. Telegram file URLs expire after approximately 1 hour. This is why our system fetches a fresh URL on every view request via the Bot API.

**Q: Why Supabase over Firebase or PocketBase?**
Supabase provides robust PostgreSQL relational data modeling and native Row Level Security (RLS) directly in the database layer.

**Q: Why Redis instead of querying Supabase directly every time?**
We use Redis exclusively for polling asynchronous upload and AI extraction statuses. Using Supabase for short-lived, high-frequency polling states would rapidly exhaust database connection pools.

**Q: Can this system handle 10,000 concurrent users?**
The Next.js Edge infrastructure and Supabase DB can. However, the Gemini API (Free Tier) and Telegram Bot API would immediately rate-limit.

**Q: Why AI extraction instead of a manual entry form?**
To instantly combat generic Canva/Figma forgeries. The AI acts as a "Forensic Investigator" to immediately block obviously fake documents.

**Q: What happens when a Gemini model gets deprecated?**
We implemented an intelligent `resolveModel()` function that queries the Google API for currently online models and selects the best available fallback dynamically.

**Q: How is student and faculty separation enforced at every layer?**
At the Clerk level (metadata injection), at the Next.js Middleware layer (domain routing), at the API layer (RLS Service Role bypass checks), and at the DB layer via Row Level Security policies.

**Q: How is the bot token protected from being leaked?**
It strictly resides in `.env.local` and Vercel's secret manager. It is never exposed via `NEXT_PUBLIC_` prefixes.

---

## 19. Glossary

**RLS (Row Level Security)**

- Definition: PostgreSQL feature restricting data access based on the user executing the query.
- Used in this project for: Segregating student access to their own certificates and faculty access to their managed sections.

**JWT (JSON Web Token)**

- Definition: A secure, stateless standard for transmitting identity.
- Used in this project for: Clerk authentication passing user sessions to Supabase via custom token templates.

**JSONB**

- Definition: A binary JSON data type in PostgreSQL.
- Used in this project for: Storing unstructured AI output (`extracted_text`) like forensic reasoning without schema migrations.

**file_id**

- Definition: A unique string identifier assigned by Telegram to uploaded media.
- Used in this project for: Referencing Supabase DB records to their actual binary artifact on Telegram servers.

**TTL (Time To Live)**

- Definition: The lifespan of cached data before it is automatically deleted.
- Used in this project for: Automatically clearing Redis polling states (`upload_status`) after 5 to 10 minutes.

**Supabase**

- Definition: An open-source Firebase alternative powered by PostgreSQL.
- Used in this project for: Core database architecture and Row Level Security enforcement.

**Redis (Upstash)**

- Definition: An in-memory data structure store.
- Used in this project for: Short-lived state polling during asynchronous AI extractions.

**Telegram Bot API**

- Definition: An HTTP-based interface created for developers to interact with the Telegram system.
- Used in this project for: Zero-cost backend binary file storage via `sendDocument` and `getFile` methods.

**Gemini Vision API**

- Definition: Google's multimodal generative AI model.
- Used in this project for: Forensic OCR, data extraction, and fraud detection on uploaded certificates.

**Vercel**

- Definition: A cloud platform for static and serverless deployments.
- Used in this project for: Hosting the entire Next.js full-stack application.

**Edge Function / Serverless**

- Definition: Code executed on demand in lightweight, stateless cloud containers.
- Used in this project for: All `/api/` routing infrastructure.

**CORS (Cross-Origin Resource Sharing)**

- Definition: An HTTP-header based mechanism that allows servers to indicate any origins other than its own.
- Used in this project for: Allowing cross-origin fetching of binary data via the `/api/view` endpoint.

**Cache Invalidation**

- Definition: The process of removing or updating stale cache entries.
- Used in this project for: Explicitly calling `redis.del()` when an upload finishes to reset the frontend state.
