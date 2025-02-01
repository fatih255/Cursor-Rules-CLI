[Jump to content](#content)

On this page

[Next.js](#overview)

=====================

Next.js is a backend framework for your React applications.

Check out [Theo’s Next.js Conf talk↗](https://www.youtube.com/watch?v=W4UhNo3HAMw)
 to get a better understanding of what Next.js is and how it works.

[Why should I use it?](#why-should-i-use-it)

---------------------------------------------

We love React. It has made UI development accessible in ways we never imagined before. It also can lead developers down some rough paths. Next.js offers a lightly opinionated, heavily optimized approach to creating applications using React. From routing to API definitions to image rendering, we trust Next.js to lead developers towards good decisions.

Pairing Next.js with [Vercel↗](https://vercel.com/)
 makes developing and deploying web apps easier than ever before. Their extremely generous free-tier and super intuitive interface provides a point and click solution to deploy your site (We ❤️ Vercel)

[Get Static/Server Props](#get-staticserver-props)

---------------------------------------------------

A key feature of Next.js is its data fetching capabilities. We highly recommend reading through the [official documentation↗](https://nextjs.org/docs/basic-features/data-fetching)
 to understand how to use each method and how they differ. `getServerSideProps` is generally discouraged unless there is a good reason for it, due to the fact that it is a blocking call and will slow down your site. [Incremental Static Regeneration↗](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)
 is a great alternative to `getServerSideProps` when the data is dynamic and can be fetched incrementally.

If you need to use this feature anyway, check these links out: [Advanced tRPC - Callers, functions, and gSSP↗](https://www.youtube.com/watch?v=G2ZzmgShHgQ)
 and [SSG-Helpers↗](https://trpc.io/docs/v9/ssg-helpers)

[Useful Resources](#useful-resources)

--------------------------------------

| Resource | Link |
| --- | --- |
| Next.js Documentation | [https://nextjs.org/docs↗](https://nextjs.org/docs) |
| Next.js GitHub | [https://github.com/vercel/next.js↗](https://github.com/vercel/next.js) |
| Next.js Blog | [https://nextjs.org/blog↗](https://nextjs.org/blog) |
| Next.js Discord | [https://nextjs.org/discord↗](https://nextjs.org/discord) |
| Next.js Twitter | [https://twitter.com/nextjs↗](https://twitter.com/nextjs) |
| Vercel/Next.js YouTube Channel | [https://www.youtube.com/c/VercelHQ↗](https://www.youtube.com/c/VercelHQ) |

[First Steps](/en/usage/first-steps)

[TypeScript](/en/usage/typescript)

* * *