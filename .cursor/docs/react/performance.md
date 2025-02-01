---
description: Enforces high-performance coding practices across frontend, backend, and database layers.
globs: *.ts, *.tsx, *.js, *.jsx, *.sql
---

# Performance Optimization Guidelines

Ensuring efficient and optimized code is crucial for scalability, maintainability, and user experience. Follow these rules to maximize performance across all areas of development.

---

## **1. Code Optimization**
- Use **functional programming** techniques (`map()`, `filter()`, `reduce()`) to avoid unnecessary loops.
- Replace deeply nested loops with **caching, batching, or precomputed data structures**.
- Implement **memoization** (`useMemo` in React) for expensive computations.
- Use **tail-call optimization** to prevent excessive stack usage in recursive functions.
- Prefer **bitwise operations** over arithmetic where applicable (`x >> 1` instead of `Math.floor(x / 2)`).
- Reduce object creation; prefer **object pooling** for frequently used instances.

---

## **2. Memory Management**
- Use **lazy loading** and **pagination** when handling large datasets.
- Avoid memory leaks by **removing event listeners** and clearing timers (`clearInterval`, `clearTimeout`).
- Use **WeakMap** and **WeakSet** for ephemeral data storage to enable automatic garbage collection.
- Release **unused variables** (`null` out references) in long-running processes.
- Regularly monitor memory allocation with **profiling tools** (`Chrome DevTools`, `Node.js heap snapshots`).

---

## **3. API & Network Optimization**
- **Batch API requests** to reduce network overhead.
- Use **gzip** or **Brotli compression** for API responses to minimize payload size.
- Implement **HTTP/2** or **gRPC** to improve request multiplexing.
- Optimize REST APIs by using **efficient pagination strategies** (cursor-based over offset-based).
- Implement **rate limiting** and **request queuing** to prevent server overload.
- Utilize **CDNs (Content Delivery Networks)** to cache and serve static assets faster.
- Prefer **WebSockets** over polling when real-time communication is required.

---

## **4. Frontend Performance Optimization**
- Use **image optimization** strategies (WebP/AVIF format, lazy loading).
- Implement **code splitting** and **dynamic imports** to reduce initial load times.
- Minimize reflows and repaints by reducing **DOM manipulation**.
- Enable **GPU acceleration** using `will-change: transform;` for smoother animations.
- Use **virtual scrolling** for large lists (`react-window`, `InfiniteScroll`).
- Implement **debouncing & throttling** for event listeners (`scroll`, `resize`, `input` events).

---

## **5. Database Performance Optimization**
- Use **proper indexing** to speed up query execution.
- Optimize queries by **avoiding SELECT *** and fetching only required columns.
- Use **connection pooling** to reduce database overhead.
- Implement **read replicas** for high-read workloads.
- Use **database partitioning and sharding** for handling large-scale data.
- Optimize query execution plans with **EXPLAIN ANALYZE** (PostgreSQL) or **EXPLAIN** (MySQL).
- Cache expensive queries using **Redis**, **Memcached**, or **Materialized Views**.

---

## **6. Asynchronous & Parallel Processing**
- Utilize **worker threads** or **Web Workers** for CPU-intensive operations.
- Prefer **async/await** over `.then()` chains for better readability and performance.
- Offload background tasks using **message queues** (`RabbitMQ`, `Kafka`).
- Use **parallel execution** with `Promise.all()` or **thread pools** in backend languages.
- Implement **non-blocking I/O** in Node.js via `fs.promises.readFile()` or `stream.pipe()`.

---

## **7. Monitoring, Profiling & Performance Audits**
- Use **profiling tools** (`Chrome Lighthouse`, `WebPageTest`, `Flame graphs`) for performance analysis.
- Set up **real-time performance monitoring** (`New Relic`, `Datadog`, `Google PageSpeed`).
- Implement **error tracking** (`Sentry`, `Rollbar`) for runtime issues.
- Set up **automated performance testing** (`k6`, `JMeter`) to benchmark APIs.
- Establish **alerting systems** (Grafana, Prometheus) for detecting performance regressions.

---

### **Final Notes**
- Always test performance optimizations under **real-world conditions**.
- Benchmark changes before and after implementing improvements.
- Profile **CPU, memory, and network usage** periodically to catch bottlenecks.
- Keep performance a **continuous process** rather than a one-time fix.

