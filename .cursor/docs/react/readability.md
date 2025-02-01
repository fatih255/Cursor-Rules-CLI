---
description: Enforces readable, maintainable, and scalable code across all files, ensuring modular services, reusable components, and effective code splitting.
globs: *.ts, *.tsx, *.js, *.jsx, *.md
---

# Code Readability & Maintainability Rules

Readable and maintainable code improves **scalability, debugging, and collaboration**. The following guidelines must be followed to ensure **clarity, modularity, and reusability**.

---

## **1. Code Formatting**
- **Line length should not exceed 100 characters**.
- Use **Prettier** for auto-formatting.
- **One statement per line**; avoid inline multiple statements.
- Use consistent **spacing around operators and after commas**.
- Use **meaningful line breaks** to group related code.
- Maintain a **consistent brace style** (`K&R` or `Allman`, but not mixed).
- Enforce **trailing commas** where applicable to improve diff readability.

---

## **2. Service Class Structure & Reusability**
- **All services must be implemented as reusable classes**.
- Avoid **static functions** unless truly necessary (e.g., utility/helper functions).
- Service classes should **follow dependency injection** principles.
- **Never access global state directly** inside services; pass dependencies as arguments.
- Keep **business logic inside services**, not inside components.
- Example of a properly structured service class:
  ```ts
  class AuthService {
    private apiClient;

    constructor(apiClient) {
      this.apiClient = apiClient;
    }

    async login(username: string, password: string) {
      return this.apiClient.post("/login", { username, password });
    }

    async logout() {
      return this.apiClient.post("/logout");
    }
  }

  export default new AuthService(apiClientInstance);
```
 
- **Avoid tight coupling** ; services should be easily interchangeable.


---

**3. Function Design**  
- Functions should perform **only one responsibility** .
 
- Prefer **pure functions**  (without side effects).
 
- Use **default parameters**  instead of multiple function overloads.

- Keep the number of parameters minimal (≤ 3 preferred).
 
- Use **descriptive parameter names** .
 
- **Return early**  to avoid deep nesting.
 
- **Extract common logic into reusable utility functions** .


---

**4. Code Organization & Code Splitting**  
- **Group related functions and variables together** .
 
- Keep files **focused and manageable in size**  (≤ 300 lines).
 
- **If a component exceeds 300 lines** , implement **code splitting** : 
  - Move complex logic into **custom hooks**  or **service classes** .
 
  - Use **lazy loading**  (`React.lazy()`, `import()`) to defer loading.
 
  - Example:

```tsx
const UserProfile = React.lazy(() => import("./UserProfile"));
```
 
- **Component files should contain only UI logic** ; business logic belongs in services.
 
- **Keep imports clean and well-ordered** : 
  - **Library imports first**  (React, lodash, etc.).
 
  - **Project-specific imports next** .
 
  - **Local file imports last** .


---

**5. Comments & Documentation**  
- Use **JSDoc-style comments**  for functions and classes.
 
- **Multi-line comments**  should start with `/**` and end with `*/`.
 
- Use **TODOs with context**  (`// TODO: Improve caching (John, 2024-02-01)`).
 
- Document **complex algorithms and business logic** .
 
- Include **usage examples**  for public APIs.
 
- **Keep documentation up-to-date**  with code changes.


---

**6. Variable & Naming Conventions**  
- Use **intention-revealing names** .
 
- Avoid **abbreviations**  unless widely known (`API`, `ID`, `URL`).
 
- Use **consistent terminology**  across the codebase.
 
- Name **boolean variables with prefixes** : 
  - ✅ `isValid`, `hasPermission`, `canDelete`
 
  - ❌ `valid`, `permission`, `delete`
 
- Use **plural names for arrays/collections** .
 
- Maintain **consistent casing styles** : 
  - **Variables/Functions** : `camelCase`
 
  - **Classes/Components** : `PascalCase`
 
  - **Constants** : `UPPER_SNAKE_CASE`
 
  - **Enums** : `PascalCase`
 
  - **Database Tables/Columns** : 
    - SQL: `snake_case`
 
    - MongoDB: `camelCase`


---

**7. Code Maintainability**  
- Avoid **magic numbers** ; use **named constants** .

```ts
const MAX_LOGIN_ATTEMPTS = 5;
if (userAttempts > MAX_LOGIN_ATTEMPTS) { ... }
```
 
- Extract **complex conditions**  into readable helper functions.
 
- Keep **nesting levels minimal**  (≤ 3 levels).
 
- **Use early returns**  to reduce complexity.
 
- **Break down complex expressions**  into intermediate variables.

```ts
const isUserActive = user.isLoggedIn && user.profileComplete && !user.isBanned;
```
 
- Document **technical debt**  with clear explanations (`// FIXME: Optimize this query`).


---

**8. Security & Performance Best Practices**  
- **Never store credentials in code** —use environment variables.
 
- **Sanitize and validate all user inputs** .
 
- Implement **rate limiting**  to prevent brute-force attacks.
 
- **Optimize expensive operations**  with caching.
 
- Use **lazy loading and pagination**  for large datasets.
 
- Avoid **unnecessary re-renders**  in React: 
  - Use `React.memo()` for pure components.
 
  - Use `useCallback()` and `useMemo()` where necessary.


---

**9. Error Handling & Logging**  
- **All errors must be handled explicitly** —never ignore them.
 
- Use **custom error classes** :

```ts
class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}
```
 
- **Log errors with contextual information** :

```ts
logger.error(`Login failed for user ${userId}: ${error.message}`);
```
 
- Use **structured logging**  (`Winston`, `Pino`, `Loguru`).
 
- Follow proper logging levels: 
  - **DEBUG** : Development use only.
 
  - **INFO** : General application logs.
 
  - **WARN** : Recoverable issues.
 
  - **ERROR** : Critical failures.
 
- **Handle both sync and async errors**  properly with `try/catch` blocks.


---

**10. Testing & Quality Assurance**  
- **Follow TDD (Test-Driven Development)**  where feasible.
 
- Write **unit tests for every function/module** .
 
- Ensure **at least 80% test coverage** .
 
- Use **mocking**  for dependencies (`jest.mock()`).
 
- Use **Jest** for JavaScript/TypeScript testing.
 
- Include **edge case testing** :
  - ✅ Null/undefined inputs.

  - ✅ Large datasets.

  - ✅ Invalid user inputs.

Example Jest test:

```ts
test("should return 404 if user is not found", async () => {
  const res = await request(app).get("/user/999");
  expect(res.status).toBe(404);
});
```


---

**Final Notes**  
- **Service classes must be used for business logic** ; avoid mixing logic in components.
 
- **Break large components into smaller, reusable parts**  and apply **code splitting** .
 
- **Always write clear, maintainable, and reusable code** .
 
- **Security should be a priority** —always validate input and avoid exposing sensitive data.

