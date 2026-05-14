# Architecture Overview - Virtual Farm Stand

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client (Browser)                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Landing   │  │   Farm      │  │  Dashboard  │             │
│  │   / Explore │  │   Pages     │  │  (Auth)     │             │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘             │
└─────────┼────────────────┼────────────────┼────────────────────┘
          │                │                │
          ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Next.js App Router                           │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  Server Actions (mutations)  │  API Routes (REST)          ││
│  │  - createFarm()              │  - /api/auth/*              ││
│  │  - updateProduct()           │  - (future integrations)    ││
│  │  - manageReservation()       │                             ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Prisma ORM                                  │
│                     (SQLite Database)                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │   Farm   │  │ Product  │  │ Reserv-  │  │ Waitlist │       │
│  │          │  │          │  │ ation    │  │          │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

## Component Description

### Frontend (Next.js App Router)
- **Pages:** React Server Components with client-side interactivity where needed
- **Styling:** Tailwind CSS + shadcn/ui components
- **Forms:** React Hook Form + Zod validation
- **State:** Server Actions for mutations, React state for UI

### Backend
- **Server Actions:** Type-safe mutations (create, update, delete)
- **Database ORM:** Prisma for type-safe queries
- **Auth:** NextAuth.js (or custom implementation for MVP)

### Database (SQLite)
- Local file-based SQLite for MVP
- Schema defined in `prisma/schema.prisma`
- Migrations managed via Prisma CLI

## Data Flow

### Customer Flow
1. User visits landing page → server fetches featured farms
2. User browses farm page → server loads farm + products
3. User clicks "Reserve" → modal opens, submits reservation form
4. Server Action creates Reservation record (status: PENDING)
5. Farmer sees request in dashboard

### Farmer Flow
1. Farmer registers → creates Account + Farm
2. Onboarding requires seller responsibility acknowledgement
3. Dashboard shows pending reservations
4. Farmer confirms/declines → status updates

### Admin Flow
1. Admin logs in → views all farms/products
2. Can suspend/remove listings
3. Can view flagged content

## Security Considerations

- **Auth:** Session-based authentication
- **CSRF:** Next.js built-in CSRF protection
- **Input Validation:** Zod schemas on all forms
- **Database:** Parameterized queries via Prisma
- **Public Pages:** No sensitive data exposure
- **Payment Links:** External URLs - platform not involved in transactions

## Scalability Notes

### MVP (Current)
- Single server, SQLite
- Suitable for <100 farms, moderate traffic

### Future Considerations
- **Database:** Migrate to PostgreSQL for production
- **File Storage:** Move from local to S3/Blob storage
- **Caching:** Add Redis for session/frequently-accessed data
- **CDN:** Static assets via CDN
- **Auth:** External provider (Auth0, Clerk) for enterprise

## Environment

```
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Deployment (Future)

- **Platform:** Vercel (recommended for Next.js)
- **CI/CD:** GitHub Actions
- **Database:** Separate managed PostgreSQL
- **Storage:** S3 for images

## File Organization

```
src/
├── app/           # Next.js pages & routes
├── components/    # React components
│   ├── ui/        # shadcn/ui components
│   ├── layout/    # Layout components
│   ├── farm/      # Farm-specific components
│   └── product/   # Product-specific components
├── lib/           # Utilities (db, utils)
├── types/         # TypeScript types
└── actions/       # Server Actions
```

## Dependencies

| Package | Purpose |
|---------|---------|
| next | React framework |
| typescript | Type safety |
| tailwindcss | Styling |
| shadcn/ui | UI components |
| prisma | Database ORM |
| react-hook-form | Form handling |
| zod | Validation |
| @auth/prisma-adapter | Auth (if using NextAuth) |
