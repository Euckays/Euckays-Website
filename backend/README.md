# Backend

Server-side code lives here, separate from the storefront UI.

- `lib/prisma.ts` owns the database client.
- `lib/products.ts` and `lib/orders.ts` contain data access.
- `lib/admin-auth.ts` and `lib/paystack.ts` contain auth and payment integrations.
- `actions/` contains checkout, contact, vendor, and admin mutations.
- `http/` contains payment callback and webhook handlers.
- `schema.prisma` and `seed.ts` define and seed the database.

Next.js requires HTTP route handlers and Server Action entrypoints under `src/app/`; those files remain thin framework-facing adapters and import from `@backend/*`. Shared client-safe state and formatting utilities remain in `src/lib/`.
