# n8n Integration Guide - Reportheld REST API

## Quick Start

### API Base URL

```
http://localhost:3000/api/v1
```

_(Replace `localhost` with actual server IP when deployed)_

---

## Available Endpoints

### 1. Get All Templates

```
GET /api/v1/templates
```

**Response:**

```json
{
  "success": true,
  "count": 5,
  "total": 5,
  "page": 1,
  "data": [...]
}
```

**Use Case:** List all available report templates

---

### 2. Get Single Template

```
GET /api/v1/templates/{id}
```

**Example:** `GET /api/v1/templates/tmpl-001`

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "tmpl-001",
    "name": "Safety Inspection Template",
    "category": "safety",
    "fields": [...]
  }
}
```

**Use Case:** Get details of a specific template

---

### 3. Filter Templates by Category

```
GET /api/v1/templates/category/{category}
```

**Categories:** `safety`, `quality`, `maintenance`, `compliance`, `general`

**Example:** `GET /api/v1/templates/category/safety`

**Use Case:** Get all safety-related templates

---

### 4. Get All Protocols

```
GET /api/v1/protocols
```

**Use Case:** List all procedures and workflows

---

### 5. Get Single Protocol

```
GET /api/v1/protocols/{id}
```

**Example:** `GET /api/v1/protocols/prot-042`

**Use Case:** Get specific protocol details with steps

---

### 6. Filter Protocols by Type

```
GET /api/v1/protocols/type/{type}
```

**Types:** `inspection`, `maintenance`, `emergency`, `audit`, `training`

**Example:** `GET /api/v1/protocols/type/inspection`

---

### 7. Get All Items

```
GET /api/v1/items
```

**Use Case:** List all equipment and assets

---

### 8. Get Single Item

```
GET /api/v1/items/{id}
```

**Example:** `GET /api/v1/items/item-789`

**Use Case:** Get specific item details

---

### 9. Filter Items by Status

```
GET /api/v1/items/status/{status}
```

**Statuses:** `operational`, `maintenance`, `retired`, `damaged`, `missing`

**Example:** `GET /api/v1/items/status/operational`

**Use Case:** Get all operational equipment

---

## n8n Workflow Examples

### Example 1: Daily Equipment Check

**Workflow:**

1. **Schedule Trigger** - Every day at 8 AM
2. **HTTP Request** - `GET /api/v1/items/status/maintenance`
3. **IF Node** - Check if count > 0
4. **Send Email** - Alert maintenance team

---

### Example 2: Template Sync

**Workflow:**

1. **Webhook Trigger** - When template updated
2. **HTTP Request** - `GET /api/v1/templates/{id}`
3. **Set Node** - Format data
4. **HTTP Request** - Send to another system

---

### Example 3: Protocol Reminder

**Workflow:**

1. **Schedule Trigger** - Weekly
2. **HTTP Request** - `GET /api/v1/protocols/type/inspection`
3. **Loop Over Items**
4. **Send Slack Message** - Remind team of inspections

---

## Error Handling

All errors return this format:

```json
{
  "success": false,
  "error": {
    "message": "Template not found with id: invalid-id",
    "statusCode": 404,
    "timestamp": "2026-02-11T05:58:22Z"
  }
}
```

**In n8n:**

- Use "Continue On Fail" option
- Check `success` field in response
- Handle errors with IF node

---

## Pagination

List endpoints support pagination:

```
GET /api/v1/templates?page=1&limit=10
```

**Parameters:**

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

---

## Current Limitations

⚠️ **Week 1 Prototype - Read Only**

- ❌ No POST/PUT/DELETE (can't create/update)
- ❌ No authentication (anyone can access)
- ❌ Mock data only (not real Reportheld data)
- ✅ All GET endpoints work
- ✅ Proper error handling
- ✅ JSON responses

---

## Testing the API

**Option 1: Browser**

- Visit: `http://localhost:3000`
- Use the testing interface

**Option 2: curl**

```bash
curl http://localhost:3000/api/v1/templates
```

**Option 3: Postman**

- Import the endpoints
- Test each one

**Option 4: n8n**

- Add HTTP Request node
- Test directly in workflow

---

## Next Steps for Production

Before using in production workflows:

1. ✅ Deploy to server (not localhost)
2. ✅ Add authentication
3. ✅ Connect to real Reportheld data
4. ✅ Add write operations (POST/PUT/DELETE)
5. ✅ Set up monitoring

---

## Support

For issues or questions:

- Check API logs
- Verify server is running
- Test with curl first
- Check response format

**API Status:** `GET /health`
