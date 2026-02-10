# Reportheld REST API – Week 1 Feasibility Prototype

## Overview

This repository contains a **Week 1 feasibility prototype** for a self-hosted REST API layer for **Reportheld**.

The goal of this project is **not** to fully expose Reportheld, but to explore:

- What should be exposed
- How it could be exposed safely
- Whether a REST API is a viable integration surface for tools like **n8n**

This project is designed to be:

- **Minimal** - Focus on core functionality
- **Runnable** - Works out of the box with Docker
- **Easy to hand over** - Clear documentation and simple structure

---

## Scope (Week 1)

### ✅ Included

- Node.js + Express + TypeScript REST API
- Docker-based self-hosted setup
- **3 core domains** with 9 total endpoints:
  - **Templates** - Reusable report templates
  - **Protocols** - Standardized procedures
  - **Items** - Physical assets/equipment
- Mock (stubbed) Reportheld-like data
- **Comprehensive error handling** with try-catch patterns
- **Modern frontend testing interface** (no Postman needed)
- Basic documentation

### ❌ Explicitly Excluded (for now)

- Authentication / authorization
- Database integration
- Real Reportheld service calls
- Write operations (POST/PUT/DELETE)
- Cloud dependencies
- Production hardening

---

## Architecture (Current)

```
Client / n8n / Frontend
         |
         | HTTP (pull-based)
         v
Reportheld REST API (this project)
         |
         | (mock data for Week 1)
         v
Reportheld Domain (simulated)
```

The API acts as a **controlled product surface**, not a database mirror.

---

## Running the Project

### Requirements

- **Docker**
- **Docker Compose**

### Quick Start

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd reportheld-rest-api
   ```

2. **Build and run with Docker**

   ```bash
   docker compose up --build
   ```

3. **Access the application**
   - **Frontend**: http://localhost:3000
   - **API**: http://localhost:3000/api/v1

### Development Mode (without Docker)

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run development server**

   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   npm start
   ```

---

## API Endpoints

### Health Check

```
GET /health
```

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2026-02-10T21:05:00Z",
  "service": "reportheld-api",
  "version": "1.0.0"
}
```

---

### Templates

**What are Templates?** Reusable report templates that define structure, fields, and validation rules.

```
GET /api/v1/templates
GET /api/v1/templates/:id
GET /api/v1/templates/category/:category
```

**Example Response:**

```json
{
  "success": true,
  "data": {
    "id": "tmpl-001",
    "name": "Safety Inspection Template",
    "category": "safety",
    "description": "Standard template for workplace safety inspections",
    "version": "2.1",
    "fields": [...],
    "active": true,
    "createdAt": "2025-06-15T08:00:00Z",
    "updatedAt": "2026-01-20T14:30:00Z"
  }
}
```

---

### Protocols

**What are Protocols?** Standardized procedures and workflows for tasks and inspections.

```
GET /api/v1/protocols
GET /api/v1/protocols/:id
GET /api/v1/protocols/type/:type
```

**Example Response:**

```json
{
  "success": true,
  "data": {
    "id": "prot-042",
    "name": "Fire Safety Inspection Protocol",
    "type": "inspection",
    "description": "Step-by-step protocol for conducting fire safety inspections",
    "steps": [...],
    "estimatedDuration": "45 minutes",
    "active": true
  }
}
```

---

### Items

**What are Items?** Physical assets, equipment, or inventory tracked for inspection and maintenance.

```
GET /api/v1/items
GET /api/v1/items/:id
GET /api/v1/items/status/:status
```

**Example Response:**

```json
{
  "success": true,
  "data": {
    "id": "item-789",
    "name": "Fire Extinguisher - Building A",
    "type": "safety-equipment",
    "location": "Building A - Floor 2 - East Wing",
    "status": "operational",
    "lastInspection": "2026-01-15T10:00:00Z",
    "nextInspection": "2026-04-15T10:00:00Z"
  }
}
```

---

## Error Handling

All errors return a consistent JSON format:

```json
{
  "success": false,
  "error": {
    "message": "Template not found with id: invalid-id",
    "statusCode": 404,
    "timestamp": "2026-02-10T21:05:00Z"
  }
}
```

**Error Handling Strategy:**

- **asyncHandler middleware** - Wraps all async functions, eliminates repetitive try-catch
- **Centralized error middleware** - Consistent error format across all endpoints
- **Graceful error responses** - All errors return standardized JSON with status codes

---

## Frontend Testing Interface

Access the modern, interactive frontend at **http://localhost:3000**

**Features:**

- ✨ Clean, dark-themed UI
- 📑 Tabbed interface for each domain
- 🎨 JSON syntax highlighting
- 🚀 No Postman needed
- 📱 Responsive design

Simply click on any endpoint button to see the API response in a beautifully formatted view.

---

## Design Decisions (Week 1)

### Why 3 Domains (Templates, Protocols, Items)?

These represent core Reportheld concepts that are:

- **Safe to expose** - No sensitive user data
- **Useful for n8n** - Can drive automation workflows
- **Representative** - Cover different data patterns (structured, hierarchical, relational)

### Why Read-Only?

- Safer for Week 1 exploration
- Reduces risk of data corruption
- Simpler to implement and test
- Aligns with pull-based n8n workflows

### Why Mock Data?

- Reduces Week 1 complexity
- Allows API design without Reportheld dependency
- Faster iteration and testing
- Clear separation of concerns

### Why Docker?

- Reproducible environment
- Easy handover between teams
- Matches self-hosted deployment model
- Eliminates "works on my machine" issues

### Why Frontend Testing Interface?

- **Eliminates Postman dependency** - Developers can test immediately
- **Visual feedback** - See API responses in user-friendly format
- **Living documentation** - Frontend serves as interactive API docs
- **Stakeholder demos** - Easy to show progress to non-technical team members

---

## Open Questions

These are questions for future iterations:

1. **Which Reportheld data is safe to expose externally?**
2. **What authentication model should be reused?**
3. **Should future versions support push-based webhooks?**
4. **How should tenant boundaries be enforced?**
5. **What rate limiting strategy is appropriate?**

---

## Handover Notes

This project is **intentionally small** for Week 1.

### Next Team Can:

- ✅ Replace mock data with real Reportheld service calls
- ✅ Add authentication (JWT, API keys, etc.)
- ✅ Introduce additional endpoints
- ✅ Connect directly to n8n workflows
- ✅ Add database integration
- ✅ Implement write operations (POST/PUT/DELETE)

### Project Structure

```
reportheld-rest-api/
├── src/
│   ├── index.ts              # Express app entry point
│   ├── routes/               # API route definitions
│   ├── controllers/          # Business logic
│   ├── models/               # TypeScript interfaces
│   ├── middleware/           # Error handling, async wrapper
│   └── data/                 # Mock data
├── public/                   # Frontend testing interface
├── Dockerfile                # Docker configuration
├── docker-compose.yml        # Docker Compose setup
└── package.json              # Dependencies and scripts
```

### Where to Start

1. **Add a new endpoint**: Create controller → Create route → Register in `index.ts`
2. **Replace mock data**: Modify controllers to call real services instead of mock data
3. **Add authentication**: Create auth middleware → Apply to routes
4. **Add database**: Install database client → Create data layer → Update controllers

---

## Testing

### Manual Testing (via Frontend)

1. Start the application: `docker compose up`
2. Open http://localhost:3000
3. Click through each tab and test endpoints
4. Verify JSON responses are correct

### Manual Testing (via curl)

```bash
# Health check
curl http://localhost:3000/health

# Get all templates
curl http://localhost:3000/api/v1/templates

# Get specific template
curl http://localhost:3000/api/v1/templates/tmpl-001

# Test error handling
curl http://localhost:3000/api/v1/templates/invalid-id
```

---

## Troubleshooting

### Docker Issues

**Problem**: Port 3000 already in use

```bash
# Solution: Change port in docker-compose.yml
ports:
  - "3001:3000"  # Use 3001 instead
```

**Problem**: Build fails

```bash
# Solution: Clean Docker cache
docker compose down
docker system prune -a
docker compose up --build
```

### Development Issues

**Problem**: TypeScript errors

```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## License

ISC

---

## Contact

**OJT Team 2026**

For questions or issues, please contact the development team.

---

**If something feels incomplete — that is expected for Week 1.** 🚀

This is a feasibility prototype, not a production system. The goal is to validate the approach and gather feedback for future iterations.
