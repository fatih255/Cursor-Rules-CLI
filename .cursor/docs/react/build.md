---
description: Establishes best practices for build automation, dependency management, and deployment workflows.
globs: *.ts, *.tsx, *.js, *.jsx, *.py, *.java, *.json, Dockerfile, docker-compose.yml, Makefile
---

# Build & Deployment Guidelines

A well-structured build and deployment process ensures **reliable**, **scalable**, and **secure** software releases. Follow these best practices to optimize workflows and reduce downtime.

---

## **1. Continuous Integration & Continuous Deployment (CI/CD)**
- Automate builds and deployments using **GitHub Actions**, **Jenkins**, **GitLab CI**, or **CircleCI**.
- Run **linting, static analysis, security scans, and unit tests** before deploying.
- Use **environment variables** or **secret managers** instead of hardcoded credentials.
- Implement **branch protection rules** (e.g., requiring PR approvals before merging).
- Enable **automated rollback mechanisms** to revert failed deployments.
- Use **blue-green deployment** or **canary releases** to minimize production risks.
- Log and **monitor deployment failures** to enable quick debugging and recovery.

---

## **2. Dependency Management**
- Maintain **lockfiles** (`package-lock.json`, `yarn.lock`, `poetry.lock`, `Pipfile.lock`) to ensure reproducible builds.
- Follow **semantic versioning** (`major.minor.patch`, e.g., `^1.2.3`).
- Regularly **audit dependencies for security vulnerabilities** (`npm audit`, `pip check`, `yarn audit`).
- Implement **dependency caching** in CI/CD pipelines to speed up builds.
- Use **automated dependency updates** with tools like **Dependabot**, **Renovate**, or **Snyk**.
- Avoid unnecessary dependencies by periodically **pruning unused packages** (`npm prune`, `pip freeze`).

---

## **3. Code Bundling, Minification & Optimization**
- Use **tree shaking** to remove unused JavaScript code (`webpack`, `Rollup`, `esbuild`).
- Minify **JavaScript, CSS, and HTML** (`Terser`, `UglifyJS`, `cssnano`).
- Enable **gzip** or **Brotli compression** for faster asset delivery.
- Implement **code splitting** using **dynamic imports** (`import()` in JavaScript).
- Use **lazy loading** for non-critical resources to improve page load times.
- Enable **source maps** in production (but restrict public access) to assist debugging.

---

## **4. Containerization & Orchestration**
- Use **multi-stage builds** in Dockerfiles to minimize image size.
- Maintain a clean `.dockerignore` file to prevent unnecessary files from bloating images.
- Implement **layer caching strategies** to speed up build times.
- Define **health checks** (`HEALTHCHECK` in Dockerfiles) to ensure container stability.
- Follow the principle of **one service per container** (avoid multi-process containers).
- Prefer **Alpine-based** images (`node:18-alpine`, `python:3.9-alpine`) to reduce size.
- Use **non-root users** inside containers to enhance security.
- Implement **read-only filesystem** policies where applicable.
- Set up **Docker image vulnerability scanning** (`Trivy`, `Grype`).

---

## **5. Build Optimization**
- Use **incremental builds** to avoid recompiling unchanged code.
- Implement **build caching** (`turbo`, `NX`, `Docker layer caching`) to reduce build times.
- Enable **parallel processing** in build pipelines (`make -j`, `webpack --parallel`).
- Store **build artifacts** (`.jar`, `.war`, `.zip`, `.tar.gz`) for later debugging or rollback.
- Optimize **build time monitoring** and set thresholds for alerting slow builds.

---

## **6. Infrastructure as Code & Deployment Configuration**
- Store **infrastructure configuration** as code (`Terraform`, `Ansible`, `Pulumi`).
- Use **Helm charts** for Kubernetes deployments.
- Maintain **separate environments** for development, staging, and production.
- Implement **auto-scaling policies** based on workload demand.
- Regularly **review and update infrastructure security policies**.

---

## **7. Monitoring, Logging & Post-Deployment Checks**
- Enable **centralized logging** (`ELK Stack`, `Datadog`, `Fluentd`).
- Set up **real-time performance monitoring** (`Prometheus`, `Grafana`, `New Relic`).
- Use **error tracking tools** (`Sentry`, `Rollbar`) to capture and analyze failures.
- Implement **self-healing mechanisms** in case of failures (`Kubernetes pod auto-restarts`).
- Define **post-deployment verification tests** to ensure successful releases.
- Regularly **audit logs and deployment history** for anomalies.

---

## **Final Notes**
- **Always test deployments in staging before production releases**.
- **Optimize build times** continuously to improve efficiency.
- **Keep documentation updated** for build, deployment, and rollback strategies.
- **Security should be a priority**—encrypt sensitive data and follow best security practices.

