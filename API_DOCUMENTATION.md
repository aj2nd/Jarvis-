# API Documentation

This document describes the API endpoints and core modules of your application, based on the features you outlined.  
For each feature, you will find the main endpoints, expected request/response formats, and the roles required.

---

## Table of Contents

1. [User Management & Security](#user-management--security)
2. [Document Upload & Ingestion](#document-upload--ingestion)
3. [Document Processing](#document-processing)
4. [Data Storage & Management](#data-storage--management)
5. [Accounting Automation](#accounting-automation)
6. [Compliance & Filing](#compliance--filing)
7. [Reporting & Insights](#reporting--insights)
8. [Advisory & Support](#advisory--support)
9. [Notifications & Activity](#notifications--activity)
10. [Error Handling](#error-handling)

---

## 1. User Management & Security

- **Roles:** admin, accountant, client

### Auth

- `POST /auth/signup` – Sign up a new user  
- `POST /auth/login` – User login  
- `POST /auth/password-reset` – Request/reset password  
- `POST /auth/2fa/enable` – Enable 2FA  
- `POST /auth/2fa/verify` – Verify 2FA code

### User Profile

- `GET /users/me` – Get current user profile  
- `PUT /users/me` – Update current user profile  
- `GET /users` – List users (admin only)  
- `PUT /users/:id/role` – Change user role (admin only)  
- `GET /audit/logs` – Get audit logs (admin only)

---

## 2. Document Upload & Ingestion

### Upload

- `POST /documents/upload` – Upload single document (supports drag & drop, all roles)
- `POST /documents/bulk-upload` – Bulk upload multiple documents
- `GET /documents/:id/status` – Get status (processing, complete, error)
- `GET /documents/categories` – Get supported categories for auto-categorization

---

## 3. Document Processing

- `GET /documents/:id/ocr` – OCR results for a document
- `GET /documents/:id/extract` – Data extraction results
- `POST /documents/:id/validate` – Trigger auto-validation
- `PUT /documents/:id/review` – Manual review/correction

---

## 4. Data Storage & Management

- `GET /documents/:id/download` – Download original doc
- `GET /documents/:id/versions` – List all versions
- `GET /documents/:id/audit` – Get document audit trail
- `DELETE /documents/:id` – Delete document (if allowed)

---

## 5. Accounting Automation

- `POST /accounting/journals` – Create journal entry (automated/manual)
- `GET /accounting/journals` – List journal entries
- `POST /accounting/bookkeeping/run` – Run bookkeeping job (auto/manual)
- `GET /accounting/reconciliation` – Bank reconciliation (with exchange rates)
- `GET /accounting/chart-of-accounts` – Get chart of accounts
- `PUT /accounting/chart-of-accounts` – Update chart of accounts

---

## 6. Compliance & Filing

- `POST /compliance/vat/register` – Start VAT registration workflow
- `POST /compliance/vat/filing` – File VAT return
- `POST /compliance/tax/register` – Corporate tax registration
- `POST /compliance/tax/filing` – File annual tax return
- `GET /compliance/forms` – List/generate official forms (with e-signature where supported)
- `GET /compliance/calendar` – Filing calendar & deadlines
- `GET /compliance/audit-docs` – Audit-ready document storage

---

## 7. Reporting & Insights

- `GET /reports/pnl` – Monthly P&L
- `GET /reports/ytd` – Year-to-date performance
- `GET /reports/dashboard` – Business dashboards
- `GET /reports/export` – Export PDF/Excel reports
- `GET /reports/drilldown` – Drill-down/filterable reports
- `GET /reports/alerts` – Real-time advisory alerts
- `GET /reports/insights` – AI-powered business insights

---

## 8. Advisory & Support

- `POST /support/ai-chat` – Ask AI chat (accounting/tax Q&A)
- `POST /support/session` – Schedule advisory session (AI/human)
- `GET /support/knowledge-base` – Access knowledge base/FAQ

---

## 9. Notifications & Activity

- `GET /notifications` – List notifications
- `POST /notifications/read` – Mark notifications as read
- `GET /activity` – User and system activity feed

---

## 10. Error Handling

All endpoints return errors in the following format:
```json
{
  "error": "Error message",
  "code": 400,
  "details": {}
}
```
- Use appropriate HTTP status codes (400, 401, 403, 404, 500, etc.)
- Additional fields may be included for validation errors

---

## Notes & Best Practices

- All endpoints use JWT-based authentication unless marked otherwise
- Use `Content-Type: application/json` for all POST/PUT requests unless uploading files (`multipart/form-data`)
- Pagination, filtering, and sorting are supported on all list endpoints
- Role-based access is enforced on sensitive endpoints
- All uploads are virus-scanned and validated before processing

---

_Keep this documentation updated as your API evolves!_
