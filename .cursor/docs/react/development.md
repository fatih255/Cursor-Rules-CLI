---
description: ReactJS framework - Establishes best practices for code structure, state management, async handling, version control, error handling, and debugging to ensure consistency and maintainability.
globs: *.ts, *.tsx, *.js, *.jsx, *.json, *.md, *.yaml, *.yml
---

# Development Standards

Following a **well-defined development workflow** ensures **readability, maintainability, scalability, and collaboration**. The following best practices must be followed in all projects.

---

## **1. Code Structure & Organization**
- Organize files in a **feature-based folder structure** (`components/`, `store/`, `hooks/`, `services/`).
- Use **separation of concerns**:
  - **UI logic**: Kept in `components/`
  - **State management**: Kept in `store/`
  - **Async logic**: Handled using **React Query** inside `hooks/`
- Keep function lengths **reasonable** (ideally under 50 lines).
- Use **consistent indentation**:
  - **JavaScript/TypeScript**: 2 spaces.
- Follow **SOLID principles** and use **design patterns** where applicable.
- Prefer **immutability** over modifying existing objects.

---

## **2. Global State Management - Zustand**
- **Use Zustand** instead of Context API/Redux for global state management.
- Keep stores **modular**: create separate stores for different features.
- Structure Zustand stores as follows:
  ```ts
  import { create } from "zustand";

  interface AuthState {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
  }

  export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    login: (user) => set({ user }),
    logout: () => set({ user: null }),
  }));
```
 
- Avoid **deeply nested state** ; keep the store **flat and normalized** .
 
- Use **selectors**  to improve performance and prevent unnecessary re-renders.


---

**3. Asynchronous Operations - React Query (TanStack Query)**  
- **Use React Query**  instead of `useEffect` for async operations.
 
- Fetching logic must be inside **custom hooks** :

```ts
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../services/api";

export const useUserProfile = (userId: string) => {
  return useQuery(["userProfile", userId], () => getUserProfile(userId), {
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    retry: 2, // Retry failed requests twice
  });
};
```
 
- **Enable caching**  and **pagination**  when handling large datasets.
 
- Use `useMutation` for handling **POST, PUT, DELETE**  requests.
 
- Always provide **error handling and loading states**  when using React Query.


---

**4. Naming Conventions**  
- **Variables & Functions** : `camelCase` (`userProfile`, `fetchData`).
 
- **Classes & Components** : `PascalCase` (`UserCard`, `DatabaseConnector`).
 
- **Constants** : `UPPER_SNAKE_CASE` (`MAX_RETRIES`, `API_URL`).
 
- **Filenames** : 
  - Modules: `kebab-case.ts` (`user-service.ts`).
 
  - Components: `PascalCase.tsx` (`ProfileCard.tsx`).
 
  - Test files: `*.test.ts` or `*.spec.ts` (`auth.test.ts`).
 
- **Interfaces/Types** : `PascalCase` (`UserType`, `IUser`).
 
- **Enums** : `PascalCase` (`UserRole.ADMIN`, `ThemeMode.DARK`).
 
- **API Query Keys** : `snake_case` (`get_user_profile`, `fetch_orders`).
 
- **Database Naming (SQL/MongoDB)** : 
  - Tables/Collections: `snake_case` (`user_profiles`, `order_items`).
 
  - Columns: `camelCase` (`createdAt`, `isActive`).
 
- Use **meaningful, descriptive names**  instead of abbreviations (`isLoading` instead of `ldg`).


---

**5. Version Control & Git Best Practices**  
- Follow **Git flow**  (`feature/`, `hotfix/`, `release/` branches).
 
- Commit messages must follow the **Conventional Commits**  format:

```bash
feat(auth): add JWT authentication
fix(db): resolve connection timeout issue
refactor(ui): improve button styles
```
 
- Keep commits **atomic**  (one feature/fix per commit).
 
- Always **rebase and squash commits**  before merging.
 
- Avoid committing **sensitive information**  (API keys, `.env` files).


---

**6. Code Documentation & Comments**  
- Use **JSDoc/TSDoc**  for all public functions, classes, and APIs.
 
- Comments should **explain why** , not **what**  the code does.
 
- **Avoid redundant comments**  for self-explanatory code.
 
- Document **edge cases and known limitations**  in the code.
 
- Provide **example usage**  for complex functions.


---

**7. Error Handling & Logging**  
- Use **custom error classes**  to differentiate between error types.
 
- Log errors with **contextual information**  (user ID, request ID, timestamps).
 
- Use **structured logging**  (`Winston`, `Pino`, `Loguru`).
 
- Follow proper logging levels: 
  - **DEBUG** : Development use only.
 
  - **INFO** : General application logs.
 
  - **WARN** : Recoverable issues.
 
  - **ERROR** : Critical failures.
 
- Handle both **sync and async errors**  with proper `try/catch` blocks.

```ts
try {
  const data = await fetchUserData(userId);
} catch (error) {
  logger.error(`Failed to fetch user data: ${error.message}`);
}
```


---

**8. Code Review & Quality Assurance**  
- Review **for security vulnerabilities** .
 
- Check **performance implications** .
 
- Verify **error handling** .
 
- Ensure **proper test coverage** .
 
- Look for **duplicate code**  and suggest improvements.


---

**9. Security Best Practices**  
- Never **store credentials in code** —use environment variables.
 
- Sanitize and validate **all user inputs** .
 
- Implement **rate limiting**  to prevent brute-force attacks.
 
- Always **hash passwords**  (`bcrypt`, `Argon2`).
 
- Use **HTTPS everywhere**  and enforce secure cookies.


---

**10. Debugging & Troubleshooting**  
- Use **source maps**  in development to map errors to original code.
 
- Implement **proper logging levels**  to filter out noise.
 
- Use built-in **debugging tools** :
  - Chrome DevTools for frontend.
 
  - `node --inspect` (Node.js) for backend debugging.


---

**Final Notes**  
- **Use Zustand for global state**  instead of Redux or Context API.
 
- **Use React Query (TanStack Query) for async handling**  instead of `useEffect`.
 
- **Enforce linting and formatting**  (`ESLint`, `Prettier`, `Black`).
 
- **Security should be a priority** —always validate input and avoid exposing sensitive data.


```yaml
---

### **Key Improvements**
✅ **Explicit enforcement of Zustand for global state**  
✅ **React Query usage for all async operations**  
✅ **More structured and categorized rules**  
✅ **Added logging, debugging, and security best practices**  
✅ **Example code snippets for clarity**  

Would you like any further refinements or custom rules? 🚀
```

---
description: Defines best practices for React applications, including form handling, state management, and project initialization.
globs: *.ts, *.tsx, *.js, *.jsx
---

# React & Next.js Development Standards

When working with **React or Next.js**, follow these best practices to ensure **performance, maintainability, and consistency**.

---

## **1. Form Handling - Use React Hook Form**
✅ **React Hook Form (`react-hook-form`) must be used for managing form state**.  
✅ **Why?**  
- Better **performance** (minimizes re-renders).  
- Simple **validation integration** (`yup`, `zod`).  
- Less **boilerplate** than `useState`.  

✅ **Installation**:
```bash
npm install react-hook-form
```
✅ **Usage Example** :

```tsx
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email", { required: "Email is required" })} />
      {errors.email && <p>{errors.email.message}</p>}
      
      <input type="password" {...register("password", { required: "Password is required" })} />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit">Login</button>
    </form>
  );
}
```
✅ **Validation using Zod (recommended)** :

```bash
npm install @hookform/resolvers zod
```


```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}

      <input type="password" {...register("password")} />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit">Signup</button>
    </form>
  );
}
```
✅ **Here’s a **new rules file**  enforcing the use of **React Hook Form for form logic**  and **T3 stack (Next.js) with pnpm for new apps** .

---

**React & Next.js Development Standards Rule File** 

```md
---
description: Defines best practices for React applications, including form handling, state management, and project initialization.
globs: *.ts, *.tsx, *.js, *.jsx
---

# React & Next.js Development Standards

When working with **React or Next.js**, follow these best practices to ensure **performance, maintainability, and consistency**.

---

## **1. Form Handling - Use React Hook Form**
✅ **React Hook Form (`react-hook-form`) must be used for managing form state**.  
✅ **Why?**  
- Better **performance** (minimizes re-renders).  
- Simple **validation integration** (`yup`, `zod`).  
- Less **boilerplate** than `useState`.  

✅ **Installation**:
```bash
npm install react-hook-form
```
✅ **Usage Example** :

```tsx
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email", { required: "Email is required" })} />
      {errors.email && <p>{errors.email.message}</p>}
      
      <input type="password" {...register("password", { required: "Password is required" })} />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit">Login</button>
    </form>
  );
}
```
✅ **Validation using Zod (recommended)** :

```bash
npm install @hookform/resolvers zod
```


```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}

      <input type="password" {...register("password")} />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit">Signup</button>
    </form>
  );
}
```
✅ Avoid using uncontrolled state (`useState`) for form inputs** .

---

**2. Next.js App Starter - Use T3 Stack** ✅ **Use the T3 stack for initializing new Next.js applications** .
✅ **Why?**  
- Preconfigured **TypeScript, Next.js, tRPC, Prisma, Tailwind** .
 
- Best practices enforced **out of the box** .

- Faster project setup.
✅ **Installation** :

```bash
pnpm create t3-app@latest
```
✅ **Example Project Setup** :

```bash
pnpm create t3-app@latest my-app
cd my-app
pnpm install
pnpm dev
```
✅ **Preferred Features** : 
- **Database ORM** : Prisma.
 
- **State Management** : Zustand or React Query.
 
- **Validation** : Zod.
 
- **Forms** : React Hook Form + Zod.
 
- **Authentication** : NextAuth.js.
✅ **Example API Route using tRPC** :

```ts
import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = router({
  getUser: publicProcedure.input(z.object({ id: z.string() })).query(({ input }) => {
    return { id: input.id, name: "John Doe" };
  }),
});
```


---

**3. State Management** ✅ **Use Zustand or React Query instead of Context API or Redux** .✅ **For simple global state**  (Zustand):

```bash
npm install zustand
```


```ts
import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
```
✅ **For async state management**  (React Query):

```bash
npm install @tanstack/react-query
```


```tsx
import { useQuery } from "@tanstack/react-query";

const fetchUsers = async () => {
  const res = await fetch("/api/users");
  return res.json();
};

const Users = () => {
  const { data, isLoading, error } = useQuery(["users"], fetchUsers);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <ul>{data.map((user) => <li key={user.id}>{user.name}</li>)}</ul>;
};
```


---

**Final Notes**  
- **Always use React Hook Form for forms**  instead of uncontrolled inputs.
 
- **Use `pnpm create t3-app@latest` for Next.js projects**  instead of manual setup.
 
- **Zustand for global state, React Query for async state** —avoid Context API for large applications.
