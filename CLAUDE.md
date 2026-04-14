# Recon Wrench — Bo Beuckman Ford Repair Doc Tool

## What This App Does
Internal service department tool for Bo Beuckman Ford (Ellisville, MO). Technicians and service advisors log in and click through 4 steps to generate warranty-compliant repair order documentation in the 3C format (Concern / Cause / Correction). No typing required — output is copy-ready for the DMS.

## Stack
- **Backend**: Node.js / Express (port 3003)
- **Database**: PocketBase (hosted on Railway)
- **Frontend**: Plain HTML/CSS/JS (no framework)
- **Deploy**: Railway
- **GitHub**: bdaron22/recon-wrench

## Running Locally
```bash
npm install
node server.js
# Open http://localhost:3003
```

## Environment Variables (.env)
```
PORT=3003
POCKETBASE_URL=https://pocketbase-production-b08f.up.railway.app
```

## Authentication
- Users log in with a username and password
- Auth is handled via PocketBase's `staff` auth collection
- Usernames are stored as `{username}@bobeuckman.local` in PocketBase email field
- Login form only asks for username (email suffix is appended server-side)
- Tokens stored in localStorage, sent via `Authorization: Bearer` header
- Two roles: `tech` (normal user) and `admin` (can manage users + view history)

## PocketBase Collections

### `staff` (auth collection)
- `email` — stores username@bobeuckman.local (used for auth identity)
- `name` (text) — display name
- `role` (select: "tech", "admin")
- `active` (bool) — deactivated users can't log in

### `repairs` (base collection)
- `repair_type` (text)
- `concern` (text)
- `condition` (text)
- `correction` (text)
- `created_by` (relation to staff)
- `created` / `updated` (auto dates)

## File Structure
```
public/
  login.html       — Login page
  index.html       — Main 4-step wizard
  admin.html       — Admin panel (users + history)
  auth.js          — Shared auth utilities (token, authFetch, requireLogin)
  repair-data.js   — All 31 repair types + category mappings
  app.js           — Wizard logic with category filter
  admin.js         — Admin panel logic
  style.css        — All styles (login, app, admin, mobile)
server.js          — Express server with auth middleware + API endpoints
```

## How to Add New Repair Types
Edit `public/repair-data.js`:

1. Add the repair type to `REPAIR_DATA`:
```js
"New Repair Type": {
  concerns: ["concern 1", ...],     // 5 options
  conditions: ["condition 1", ...],  // 5 options
  corrections: ["correction 1", ...]  // 5 options
}
```

2. Add it to a category in `REPAIR_CATEGORIES`:
```js
"Category Name": [..., "New Repair Type"]
```

Use Ford-specific language: reference Motorcraft part numbers, Ford WSS specs, and Ford workshop manual procedures.

## How to Add New Users
- Log in as admin → click "Admin" in header → Users tab → "+ Add User"
- Or via API: `POST /api/admin/users` with `{ name, username, password, role }`

## Admin Accounts
- **Brent Faron** — username: `bfaron`, role: admin
- **Jeremy Bay** — username: `jbay`, role: admin

## API Endpoints
- `POST /api/auth/login` — `{ username, password }` → `{ token, user }`
- `GET /api/auth/me` — validate token
- `POST /api/repairs` — create RO (auth required)
- `GET /api/admin/users` — list staff (admin only)
- `POST /api/admin/users` — create staff (admin only)
- `PATCH /api/admin/users/:id` — update staff (admin only)
- `GET /api/admin/repairs` — paginated repair history (admin only)

## Deploying to Railway
1. Push to GitHub (`git push origin main`)
2. Railway auto-deploys from GitHub
3. Set env vars: `PORT`, `POCKETBASE_URL`

## Phase 2 Features (Not Yet Built)
- AI-generated repair descriptions using Claude API
- Ford TSB (Technical Service Bulletin) lookup integration
- Mileage and VIN fields on the repair order
- Export to PDF
- Admin panel to add/edit repair types without touching code (currently in repair-data.js)
