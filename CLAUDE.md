# Recon Wrench — Bo Beuckman Ford Repair Doc Tool

## What This App Does
Internal service department tool for Bo Beuckman Ford (Ellisville, MO). Technicians and service advisors click through 4 steps to generate warranty-compliant repair order documentation in the 3C format (Concern / Cause / Correction). No typing required — output is copy-ready for the DMS.

## Stack
- **Backend**: Node.js / Express (port 3003)
- **Database**: PocketBase (hosted on Railway)
- **Frontend**: Plain HTML/CSS/JS (no framework)
- **Deploy**: Railway

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

## PocketBase Setup
Create a `repairs` collection with these fields:
- `repair_type` (text)
- `concern` (text)
- `condition` (text)
- `correction` (text)
- `created` (auto date — built in)

## Deploying to Railway
1. Push to GitHub
2. Connect repo to Railway
3. Set environment variables (PORT, POCKETBASE_URL)
4. Railway auto-detects Node.js and runs `npm start`

## How to Add New Repair Types
Edit `public/app.js` — add a new key to the `REPAIR_DATA` object:
```js
"New Repair Type": {
  concerns: ["concern 1", "concern 2", ...],  // 5 options
  conditions: ["condition 1", "condition 2", ...],  // 5 options
  corrections: ["correction 1", "correction 2", ...]  // 5 options
}
```
Use Ford-specific language: reference Motorcraft part numbers, Ford WSS specs, and Ford workshop manual procedures.

## Phase 2 Features (Not Yet Built)
- AI-generated repair descriptions using Claude API
- Ford TSB (Technical Service Bulletin) lookup integration
- Mileage and VIN fields on the repair order
- Export to PDF
- Admin panel to add/edit repair types without touching code
