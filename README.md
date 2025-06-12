# Description
A compliance and document expiry tracker for organizations and professionals.
# MVP Checklist
## MVP Features
### Authentication
- Login/Signup
- Dashboard showing user's documents
### Document tracking
- Upload document
- Set:
    - Name
    - Document type (certificate, license, etc)
    - Expiry date
- Save document metadata
### Expiry Alerts
- See status: Active /  Expiring Soon / Expired
- Auto-alerts (email or in-app)
### Dashboard
- List view of docs with statuses
- Add/Edit/Delete document
### (Optional MVP+) Shared Users
- Invite another email to access/view docs
### Post-MVP / Bonus Features (For prizes)
- AI expiry date extractor (OCR or LLM-based)
- AI doc risk analysis (e.g. “License missing expiry”)
- Compliance area tagging (e.g. Finance, HR)
- Magic links to share documents

- Upload CSV of docs

# Tech Stack
|Layer   |Choice     |
|--------|-----------|
|Frontend|React + TailwindCSS (Bolt.new)|
|Auth    |Clerk      |
|Backend |Node.js    |
|DB      |Bolt.new DB|
|Hosting |Bolt.new   |