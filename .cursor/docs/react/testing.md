---
description: Defines rigorous testing strategies for ensuring code reliability, maintainability, and performance across all projects.
globs: *.ts, *.tsx, *.js, *.jsx
---

# Testing Best Practices

Effective testing ensures **code stability, prevents regressions, and improves maintainability**. The following best practices must be followed across all projects.

---

## **1. Unit Testing**
✅ **Purpose**: Validate individual functions, classes, and modules in isolation.  
✅ **Tools**: Jest (JS/TS)

- Write **isolated unit tests** for every function and module.
- **Mock external dependencies** (APIs, databases) to avoid flaky tests.
- Ensure **each test covers a single behavior** (`Arrange → Act → Assert` pattern).
- Aim for at least **80% unit test coverage**.
- Use **table-driven tests** for repetitive scenarios.
- Enforce **test naming conventions** for clarity:
  ```ts
  test("should return 404 if user is not found", async () => { ... });
```
✅ **Example Unit Test (Jest)** :

```ts
import { sum } from "../utils/math";

test("adds two numbers correctly", () => {
  expect(sum(2, 3)).toBe(5);
});
```
✅ **Mocking External APIs (Jest)** :

```ts
jest.mock("../services/api", () => ({
  fetchUser: jest.fn(() => Promise.resolve({ id: 1, name: "John Doe" })),
}));
```

---

**2. Integration Testing**
✅ **Purpose**: Validate how different modules interact together (e.g., API + database).
✅ **Tools**: Jest (JS/TS), Supertest (APIs)

- Ensure **real API endpoints return expected responses**.
- Use **test databases** (SQLite for local testing, Dockerized DB for CI).
- Test **edge cases** (e.g., missing data, invalid requests).
- Run integration tests **before merging** (`pre-push` hook).

✅ **Example Integration Test (Jest + Supertest)**:
```ts
import request from "supertest";
import app from "../app";

test("GET /users/:id should return 200 with user data", async () => {
  const res = await request(app).get("/users/1");
  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty("id");
});
```

---

**3. End-to-End (E2E) Testing** ✅ **Purpose** : Simulate real user interactions across the entire system.
✅ **Tools** : Cypress, Playwright, Selenium. 
- Ensure **UI components and API endpoints work together** .
 
- Validate **critical user journeys**  (`login → dashboard → logout`).
 
- Test in **multiple browsers**  and **different screen sizes** .
 
- Use **headless mode**  for CI environments.
✅ **Example Cypress Test** :

```js
describe("User Login", () => {
  it("logs in successfully", () => {
    cy.visit("/login");
    cy.get("input[name=email]").type("test@example.com");
    cy.get("input[name=password]").type("password123");
    cy.get("button[type=submit]").click();
    cy.url().should("include", "/dashboard");
  });
});
```

---

**4. Performance & Load Testing** ✅ **Purpose** : Identify performance bottlenecks under load.
✅ **Tools** : k6, JMeter, Artillery. 
- Test **API response times**  under high traffic.
 
- Simulate **concurrent users**  (e.g., 1000 requests/sec).
 
- Monitor **CPU, memory, and database load** .
✅ **Example k6 Load Test** :

```js
import http from "k6/http";
import { check, sleep } from "k6";

export default function () {
  const res = http.get("https://api.example.com/users");
  check(res, { "status is 200": (r) => r.status === 200 });
  sleep(1);
}
```

---

**5. Test Automation & CI/CD Integration** ✅ **Purpose** : Automate test execution and enforce quality gates.
✅ **Tools** : GitHub Actions, Jenkins, GitLab CI, CircleCI. 
- **Run tests on every push**  to `main`.
 
- Enforce **pre-commit hooks**  (`lint-staged`, `husky`) to prevent bad code.
 
- Block merges **if any test fails**  (`required status checks` in GitHub).
 
- Collect **test coverage reports**  automatically.
✅ **Example GitHub Actions Workflow** :

```yaml
name: Run Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm test -- --coverage
```

---

**6. Code Coverage & Quality Metrics** ✅ **Purpose** : Measure how much of the codebase is tested.
✅ **Tools** : Jest Coverage, Istanbul, Codecov. 
- Ensure at least **80% test coverage** .
 
- Fail CI builds **if coverage drops below the threshold** .
 
- Track **uncovered code paths**  to improve test quality.
✅ **Enforce Coverage Thresholds (Jest)** :

```json
"jest": {
  "coverageThreshold": {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": 80
    }
  }
}
```
✅ **Upload Coverage Reports to Codecov** :

```yaml
- uses: codecov/codecov-action@v3
```

---

**7. Debugging & Test Reliability** ✅ **Purpose** : Ensure tests are stable and easy to debug. 
- Use **Use `--detectOpenHandles`**  to detect hanging tests (Jest).
 
- Use **snapshot testing**  for UI consistency (`toMatchSnapshot`).
 
- Debug flaky tests using **Debug flaky tests using `--runInBand`**  (Jest).
 
- Generate **HTML test reports**  (`jest-html-reporter`).
✅ **Fixing Flaky Tests** : 
- Use **Use `cy.wait()` sparingly**  in Cypress; prefer `intercept()`.
 
- Avoid **random test data**  (use seed-based test databases).
 
- Mock network responses where possible (`nock`, `msw`).

---

**Final Notes**  
- **All code must have proper unit, integration, and E2E tests.**
 
- **Performance and security tests should be part of CI/CD workflows.**
 
- **Minimum 80% test coverage is required.**
 
- **Ensure test reliability and avoid flakiness in automation.**

### **Key Improvements**
✅ **Expanded unit, integration, and E2E testing guidelines**  
✅ **Added performance and load testing best practices**  
✅ **Enforced automation using CI/CD and GitHub Actions**  
✅ **Set clear coverage thresholds and quality metrics**  
✅ **Provided real-world code examples for Jest, Cypress, k6, etc.**  
✅ **Guidelines for debugging flaky tests and enforcing test reliability**  