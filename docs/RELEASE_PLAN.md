# Skillscovery Release Plan & Versioning Strategy

This document establishes the release governance model, versioning taxonomy, and development-to-release workflow for **Skillscovery**.

---

## 1. Semantic Versioning Model

Skillscovery adheres to [Semantic Versioning 2.0.0](https://semver.org/) (`MAJOR.MINOR.PATCH`):

$$\text{Version Format: } \mathbf{MAJOR.MINOR.PATCH}$$

- **MAJOR (X.0.0)**:
  - Incompatible API changes, breaking client/server contracts, or architectural platform shifts.
  - Examples: Transitioning from local mock storage to mandatory cloud authentication, major schema rewrites, or non-backward-compatible database migrations.
- **MINOR (0.X.0)**:
  - Backward-compatible feature additions or substantial platform capabilities.
  - Examples: Introducing Supabase backend integration, real media streaming, collaborative study rooms, or roadmap customization tools.
- **PATCH (0.0.X)**:
  - Backward-compatible bug fixes, UI/UX polish, security updates, and performance optimizations.
  - Examples: Resolving viewport overflow bugs, styling refinements, accessibility fixes, or package vulnerability patches.

---

## 2. Version Roadmap Overview

| Version | Status | Milestone Description |
| :---: | :---: | :--- |
| **0.9.0** | **Current** | **Frontend Prototype & Design System Foundation**: Feature-complete client-side cockpit with modular pages (Dashboard, Learning, Roadmaps, Planner, Analytics, Music, Videos, Settings), responsive viewports (320px–1440px), accessible modals, Focus Session timer, and `localStorage` persistence. |
| **0.9.x** | *Upcoming* | Minor frontend optimizations, automated test harness setup (Vitest/Playwright), and backend integration preparation. |
| **1.0.0** | *Target Release* | **First Complete Multi-User Production Platform**: Live cloud backend (Supabase / PostgreSQL), user authentication & authorization, cloud-persisted study sessions, real audio/video streaming, production deployment, and telemetry. |

---

## 3. Scope Definition for Target Release (v1.0.0)

Version **1.0.0** marks the transition of Skillscovery from an interactive frontend prototype to a production-grade, multi-user web application:

1. **Authentication & Identity**:
   - Secure sign-up, sign-in, session renewal, and password recovery via Supabase Auth.
   - User profile isolation, role-based access control, and user avatars.
2. **Persistent Cloud Database (PostgreSQL)**:
   - Migration from client `localStorage` to relational PostgreSQL tables with Row-Level Security (RLS).
   - Cloud synchronization across multiple devices and browsers.
3. **Real Media Delivery**:
   - Integration with cloud object storage (e.g., Supabase Storage / AWS S3) for audio tracks and streaming video assets.
4. **Production Infrastructure & CI/CD**:
   - Automated continuous integration testing pipeline.
   - Edge deployment on cloud hosting with custom domain and SSL termination.

---

## 4. Release Lifecycle & Governance Workflow

Every release follows a strict 6-stage quality lifecycle:

```
[1. Planning & Scope] ➔ [2. Implementation] ➔ [3. Quality Assurance] ➔ [4. Documentation] ➔ [5. Approval & Sign-Off] ➔ [6. Tag & Deployment]
```

### Stage 1: Planning & Scope Definition
- Maintain GitHub Milestones and Projects tracking target features for the next release.
- Define explicit acceptance criteria and security requirements before coding begins.
- Assign target version number (`PATCH`, `MINOR`, or `MAJOR`) according to SemVer rules.

### Stage 2: Implementation & Branching Strategy
- Develop all features on dedicated topic branches branched from `main`:
  - `feature/feature-name` for new capabilities.
  - `fix/issue-description` for bug fixes.
  - `chore/task-name` for dependencies or tooling.
- Keep commits atomic and descriptive following Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`).

### Stage 3: Quality Assurance & Verification
Prior to merging into `main`, changes must pass automated and manual verification:
1. **Lint & Formatting**: `npm run lint` must pass with 0 errors and 0 warnings.
2. **Bundle Build**: `npm run build` must compile cleanly without chunking warnings or module errors.
3. **Accessibility (a11y)**: Modal dialogs must preserve focus traps, Escape key dismissal, and WCAG AA contrast.
4. **Responsive Integrity**: Layout must be tested across mobile (320px, 360px, 375px, 430px), tablet (768px), and desktop (1024px, 1440px) viewports with zero horizontal scrolling.

### Stage 4: Documentation Updates
- Update the root `VERSION` file with the target version string.
- Update `CHANGELOG.md` with categorized notes under `[Added]`, `[Changed]`, `[Fixed]`, or `[Limitations]`.
- Update relevant architecture, API, or database guides in `docs/`.

### Stage 5: Approval & Code Freeze
- Open a Pull Request into `main`.
- Require review and sign-off by repository maintainers.
- Conduct final staging smoke test.

### Stage 6: Git Tagging & Release Publication
Once merged into `main`, execute release tagging:
```bash
# 1. Ensure local main is synchronized with remote
git checkout main
git pull origin main

# 2. Create an annotated and signed Git release tag
git tag -a v1.0.0 -m "Release v1.0.0: First Complete Multi-User Platform"

# 3. Push tag to GitHub
git push origin v1.0.0
```
- Publish a formal GitHub Release attaching release notes copied from `CHANGELOG.md`.
