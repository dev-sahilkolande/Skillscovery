# Database Schema Specification

> [!NOTE]
> **Status: Architecture Placeholder (Not Yet Implemented)**
> Skillscovery (v0.9.0) operates exclusively as a frontend application. All current persistence is managed client-side through browser `localStorage`. A production cloud database schema has not yet been implemented.

---

## 1. Planned Backend Architecture

The planned direction for Skillscovery's cloud persistence layer is **Supabase** backed by **PostgreSQL**:

- **Database Engine**: PostgreSQL 16+
- **Database Management & API Layer**: Supabase (PostgREST, GoTrue Auth, Realtime Engine)
- **Security**: PostgreSQL Row-Level Security (RLS) policies enforcing multi-tenant data isolation per user identity (`auth.uid()`).
- **Storage**: Supabase Storage buckets for media assets, profile avatars, and learning attachments.

---

## 2. Conceptual Data Domains

When the backend implementation commences in future releases, the relational schema is expected to support the following conceptual domain entities based on existing client-side data models:

1. **User Profiles (`profiles`)**:
   - Mirrors user identity, display name, handle, role/polymath designation, avatar, timezone, and study streaks.
2. **Roadmaps & Career Milestones (`roadmaps`, `milestones`, `user_roadmaps`)**:
   - Tracks engineering pathways, sequential step milestones, user enrollment status, completion percentages, and verified grades.
3. **Courses & Curriculum Progress (`courses`, `course_enrollments`)**:
   - Manages courses, categories, technical difficulty levels, lesson metadata, and individual lesson completion checkpoints.
4. **Study Planner & Focus Sessions (`planner_sessions`, `focus_logs`)**:
   - Stores scheduled study blocks, duration in minutes, completion timestamps, and pomodoro focus logs.
5. **Saved Items & Media Queues (`bookmarks`, `favorite_tracks`, `watch_later`)**:
   - Manages user-bookmarked courses, saved ambient study playlists, and queued workshop videos.
6. **In-App Notifications (`notifications`)**:
   - Manages notification alerts, category tags, read/unread states, and triggered milestone celebrations.

---

## 3. Implementation Boundary Notice

In accordance with project restrictions:
- No finalized table definitions, SQL migrations, foreign key constraints, or stored procedures are defined in this document.
- Formal database migrations and schema DDL scripts will be introduced during the dedicated backend integration phase (v1.0.0 milestone).
