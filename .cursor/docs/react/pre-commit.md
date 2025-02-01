---
description: Defines pre-commit checks to enforce code quality, security, and best practices.
globs: *.ts, *.tsx, *.js, *.jsx, *.json, *.yaml, *.yml, *.md
---

# Pre-Commit Check Rules

Pre-commit checks ensure that all code meets **quality, security, and formatting** standards before being committed. These checks prevent bad code from entering the repository and enforce consistency across the team.

---

## **1. Linting & Formatting**
✅ **Ensure all code follows formatting standards**:
- Use **ESLint + Prettier** for JavaScript/TypeScript.
- Validate **JSON/YAML formatting**.

✅ **Command examples**:
```bash
eslint --fix .
prettier --write .
```

---

**2. Type Checking & Compilation**
✅ **Ensure code is correctly typed**:
- TypeScript: Run `tsc --noEmit` to catch type errors.

✅ **Command examples**:
```bash
tsc --noEmit
```

---

**3. Security Scans**
✅ **Prevent security vulnerabilities**:
- **Secrets detection**: Check for accidental API keys or credentials.
- **Dependency audit**: Scan for known vulnerabilities (`npm audit`).
- **Static analysis**: Identify security flaws in the code.

✅ **Command examples**:
```bash
gitleaks detect
npm audit --production
```

---

**4. Unit Tests & Coverage**
✅ **Ensure all unit tests pass before committing**:
- **Run all unit tests** (`Jest`, `Mocha`).
- **Ensure minimum test coverage** (e.g., 80%).

✅ **Command examples**:
```bash
jest --coverage
```

---

**5. Import Sorting & Dependency Checks**
✅ **Ensure imports are ordered and unused dependencies are removed**:
- **Use `eslint-plugin-import` for JavaScript/TypeScript**.
- **Remove unused dependencies** (`depcheck`).

✅ **Command examples**:
```bash
depcheck
```

---

**6. Prevent Large File Commits** ✅ **Avoid committing large files accidentally** : 
- **Warn if a file > 5MB** .
 
- **Prevent committing binary files (e.g., `.exe`, `.zip`)** .
✅ **Command examples** :

```bash
find . -type f -size +5M
```


---

**7. Enforce Commit Message Format** ✅ **Use Conventional Commits format** : 
- **feat** : New feature.
 
- **fix** : Bug fix.
 
- **docs** : Documentation updates.
 
- **refactor** : Code improvements without changing functionality.
 
- **test** : Adding missing tests.
 
- **chore** : Maintenance tasks.
✅ **Command example**  (Git Hook):

```bash
#!/bin/sh
commit_msg=$(cat "$1")
if ! echo "$commit_msg" | grep -Eq "^(feat|fix|docs|refactor|test|chore)(\(.+\))?: .{10,}$"; then
  echo "❌ Commit message does not follow Conventional Commits format!"
  exit 1
fi
```


---

**8. Code Splitting & Performance Checks** ✅ **Ensure large components are split into smaller ones** : 
- **Warn if a React component exceeds 300 lines** .
 
- **Ensure tree shaking optimizations** .
 
- **Detect unnecessary re-renders** .
✅ **Command examples** :

```bash
npx size-limit
react-perf-checker
```


---

**9. Hook Configuration (pre-commit, pre-push)** ✅ **Automate checks with Git Hooks** : 
- **Pre-commit hook** : Runs formatting, linting, security scans.
 
- **Pre-push hook** : Runs tests and prevents failed builds from being pushed.
✅ **Here's a detailed pre-commit check rule file to enforce best practices before commits. This ensures that only formatted, secure, and tested code is committed.**

---

**Pre-Commit Check Rules** 

```md
---
description: Defines pre-commit checks to enforce code quality, security, and best practices.
globs: *.ts, *.tsx, *.js, *.jsx, *.json, *.yaml, *.yml, *.md
---

# Pre-Commit Check Rules

Pre-commit checks ensure that all code meets **quality, security, and formatting** standards before being committed. These checks prevent bad code from entering the repository and enforce consistency across the team.

---

## **1. Linting & Formatting**
✅ **Ensure all code follows formatting standards**:
- Use **ESLint + Prettier** for JavaScript/TypeScript.
- Validate **JSON/YAML formatting**.

✅ **Command examples**:
```bash
eslint --fix .
prettier --write .
```

---

**2. Type Checking & Compilation**
✅ **Ensure code is correctly typed**:
- TypeScript: Run `tsc --noEmit` to catch type errors.

✅ **Command examples**:
```bash
tsc --noEmit
```

---

**3. Security Scans**
✅ **Prevent security vulnerabilities**:
- **Secrets detection**: Check for accidental API keys or credentials.
- **Dependency audit**: Scan for known vulnerabilities (`npm audit`).
- **Static analysis**: Identify security flaws in the code.

✅ **Command examples**:
```bash
gitleaks detect
npm audit --production
```

---

**4. Unit Tests & Coverage**
✅ **Ensure all unit tests pass before committing**:
- **Run all unit tests** (`Jest`, `Mocha`).
- **Ensure minimum test coverage** (e.g., 80%).

✅ **Command examples**:
```bash
jest --coverage
```

---

**5. Import Sorting & Dependency Checks**
✅ **Ensure imports are ordered and unused dependencies are removed**:
- **Use `eslint-plugin-import` for JavaScript/TypeScript**.
- **Remove unused dependencies** (`depcheck`).

✅ **Command examples**:
```bash
depcheck
```

---

**6. Prevent Large File Commits** ✅ **Avoid committing large files accidentally** : 
- **Warn if a file > 5MB** .
 
- **Prevent committing binary files (e.g., `.exe`, `.zip`)** .
✅ **Command examples** :

```bash
find . -type f -size +5M
```

---

**7. Enforce Commit Message Format** ✅ **Use Conventional Commits format** : 
- **feat** : New feature.
 
- **fix** : Bug fix.
 
- **docs** : Documentation updates.
 
- **refactor** : Code improvements without changing functionality.
 
- **test** : Adding missing tests.
 
- **chore** : Maintenance tasks.
✅ **Command example**  (Git Hook):

```bash
#!/bin/sh
commit_msg=$(cat "$1")
if ! echo "$commit_msg" | grep -Eq "^(feat|fix|docs|refactor|test|chore)(\(.+\))?: .{10,}$"; then
  echo "❌ Commit message does not follow Conventional Commits format!"
  exit 1
fi
```

---

**8. Code Splitting & Performance Checks** ✅ **Ensure large components are split into smaller ones** : 
- **Warn if a React component exceeds 300 lines** .
 
- **Ensure tree shaking optimizations** .
 
- **Detect unnecessary re-renders** .
✅ **Command examples** :

```bash
npx size-limit
react-perf-checker
```

---

**9. Hook Configuration (pre-commit, pre-push)** ✅ **Automate checks with Git Hooks** : 
- **Pre-commit hook** : Runs formatting, linting, security scans.
 
- **Pre-push hook** : Runs tests and prevents failed builds from being pushed.
✅ **Example .husky/pre-commit file** :

```bash
#!/bin/sh
npx lint-staged
```
✅ **Example pre-commit-config.yaml (Python projects)** :

```yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    hooks:
      - id: trailing-whitespace
      - id: check-json
      - id: check-yaml
      - id: end-of-file-fixer
  - repo: https://github.com/psf/black
    hooks:
      - id: black
```

---

**Final Notes**  
- **All pre-commit checks must pass before committing.**
 
- **Use Git hooks (`pre-commit`, `pre-push`) to enforce these checks automatically.**
 
- **Security and performance are mandatory—never skip vulnerability scans.**

```pgsql
---

### **Key Features in This Pre-Commit Check File**
✅ **Automated linting, formatting, and type checking**  
✅ **Security checks to prevent API key leaks & vulnerabilities**  
✅ **Unit tests & minimum coverage enforcement**  
✅ **Prevents large, unnecessary file commits**  
✅ **Ensures all commits follow Conventional Commits format**  
✅ **Detects large components and enforces code splitting**  
✅ **Ready for integration with Git hooks (`husky`, `pre-commit` framework)**  