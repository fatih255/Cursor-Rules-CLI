---
description: Implements security best practices for applications.
globs: *.ts, *.tsx, *.js, *.jsx, *.config.js, *.yaml
---

## Security Rules

### **1. Authentication & Authorization**
- Always use **hashed passwords** (`bcrypt`, `Argon2`).
- Implement **JWT expiration** and token refresh strategies.
- Restrict API access using **OAuth, API keys, or role-based access control (RBAC)**.
- Implement **MFA** for sensitive operations.
- Use secure session management.
- Implement proper password policies.

### **2. Secure Coding Practices**
- Avoid using **eval()**, `innerHTML`, or `document.write()`.
- Use **parameterized queries** to prevent SQL injection.
- Validate and sanitize **all user inputs**.
- Implement **Content Security Policy (CSP)**.
- Use **HTTPS** for all communications.
- Implement proper **error handling** without exposing sensitive details.

### **3. Data Protection**
- Encrypt sensitive data using **AES-256** or **RSA**.
- Store secrets in **.env files** or secure vaults.
- Implement **CORS policies** to prevent unauthorized API access.
- Use **secure cookies** with appropriate flags.
- Implement proper **data backup** strategies.
- Regular security audits of stored data.

### **4. API Security**
- Implement **rate limiting**.
- Use **API versioning**.
- Validate request payload size.
- Implement proper **API authentication**.
- Use **HTTPS** for all API endpoints.
- Monitor for suspicious API activity.

### **5. Security Testing**
- Regular **penetration testing**.
- Implement **security scanning** in CI/CD.
- Use **SAST** and **DAST** tools.
- Regular **vulnerability assessments**.
- Security **code reviews**.
- Monitor security advisories.

### **6. Infrastructure Security**
- Use **WAF** for web applications.
- Implement proper **network segmentation**.
- Regular **security patches** and updates.
- Secure **configuration management**.
- Monitor system **access logs**.
- Implement **disaster recovery** plans.
