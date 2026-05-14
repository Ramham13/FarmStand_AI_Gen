# Virtual Farm Stand - MVP Specification

## Project Overview

**Project Name:** Virtual Farm Stand  
**Type:** Web Application (Next.js + TypeScript + Tailwind + shadcn/ui + Prisma/SQLite)  
**Core Functionality:** A digital roadside farm stand platform enabling farmers to list products, accept reservations, and manage waitlists—without native payments.  
**Target Users:** Small farms, homesteads, cottage-food producers, local agricultural sellers, and customers seeking fresh local products.

---

## Technical Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** SQLite with Prisma ORM
- **Testing:** Vitest + Playwright (to be added)
- **Deployment:** GitHub Actions (to be configured)

---

## Data Models

### Farm
| Field | Type | Description |
|-------|------|-------------|
| id | String (cuid) | Primary key |
| name | String | Farm name |
| slug | String | URL-friendly identifier (unique) |
| description | Text | Farm story/mission |
| location | String | City/state |
| imageUrl | String? | Farm cover image |
| phone | String? | Contact phone |
| email | String? | Contact email |
| website | String? | External website link |
| paymentLink | String? | External payment URL (Venmo, PayPal, etc.) |
| sellerAcknowledged | Boolean | Seller responsibility agreement |
| acknowledgedAt | DateTime? | When acknowledged |
| status | Enum (ACTIVE, SUSPENDED, REMOVED) | Farm visibility status |
| createdAt | DateTime | Record creation |
| updatedAt | DateTime | Last update |

### Product
| Field | Type | Description |
|-------|------|-------------|
| id | String (cuid) | Primary key |
| farmId | String | Foreign key to Farm |
| name | String | Product name |
| category | Enum | Product category (see below) |
| description | Text? | Product details |
| price | Decimal? | Display price |
| unit | String? | Unit (lb, each, dozen, etc.) |
| imageUrl | String? | Product image |
| availability | Enum (AVAILABLE, RESERVED, SOLD_OUT, SEASONAL) | Current status |
| isActive | Boolean | Visible on public page |
| createdAt | DateTime | Record creation |
| updatedAt | DateTime | Last update |

### Product Categories
- PRODUCE (vegetables, fruits)
- EGGS
- DAIRY (milk, cheese, butter)
- MEAT (beef, pork, poultry, lamb)
- LIVE_ANIMALS (piglets, goat kids, chicks)
- POULTRY (chickens, ducks, turkeys)
- PLANTS (seedlings, transplants, perennials)
- SEEDS
- COMPOST
- MANURE
- HAY
- COTTAGE_FOOD (baked goods, preserves, honey)
- CRAFTS (handmade farm items)
- OTHER

### Reservation
| Field | Type | Description |
|-------|------|-------------|
| id | String (cuid) | Primary key |
| productId | String | Foreign key to Product |
| customerName | String | Customer name |
| customerEmail | String | Customer email |
| customerPhone | String? | Customer phone |
| message | Text? | Custom message |
| status | Enum (PENDING, CONFIRMED, DECLINED, CANCELLED) | Request status |
| createdAt | DateTime | Record creation |
| updatedAt | DateTime | Last update |

### Waitlist
| Field | Type | Description |
|-------|------|-------------|
| id | String (cuid) | Primary key |
| productId | String | Foreign key to Product |
| customerName | String | Customer name |
| customerEmail | String | Customer email |
| notifiedAt | DateTime? | When customer was notified |
| createdAt | DateTime | Record creation |

### Admin
| Field | Type | Description |
|-------|------|-------------|
| id | String (cuid) | Primary key |
| email | String | Admin email (unique) |
| role | Enum (ADMIN, SUPER_ADMIN) | Permission level |
| createdAt | DateTime | Record creation |

---

## Pages & Routes

### Public Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page - search/featured farms |
| `/explore` | Browse all farms (with filters) |
| `/farm/[slug]` | Public farm profile page |
| `/farm/[slug]/product/[productId]` | Product detail modal/page |

### Farmer Dashboard (Auth Required)

| Route | Description |
|-------|-------------|
| `/dashboard` | Farmer dashboard overview |
| `/dashboard/farm` | Edit farm profile |
| `/dashboard/products` | Manage products |
| `/dashboard/products/new` | Add new product |
| `/dashboard/products/[id]/edit` | Edit product |
| `/dashboard/reservations` | View incoming reservations |
| `/dashboard/waitlist` | Manage waitlists |
| `/dashboard/settings` | Farm settings & external links |

### Admin Dashboard

| Route | Description |
|-------|-------------|
| `/admin` | Admin overview |
| `/admin/farms` | Manage farms |
| `/admin/reports` | View flagged content |

### Auth

| Route | Description |
|-------|-------------|
| `/login` | Farmer login |
| `/register` | Farmer registration |
| `/onboarding` | First-time farm setup + seller acknowledgement |

---

## Core Features (MVP)

### 1. Farmer Registration & Onboarding
- Email/password signup
- Required: Seller responsibility acknowledgement checkbox
- Required: Agreement text stating farmer is responsible for compliance, payments, and transactions
- Create initial farm profile

### 2. Farm Profile Management
- Farm name, description, location
- Cover image upload (to S3 or local for MVP)
- Contact info (phone, email)
- External payment/contact links display
- Edit functionality

### 3. Product Listings
- Add/edit/delete products
- Categories (broad list from spec)
- Price display (optional)
- Unit display
- Image upload
- Availability status toggle
- Active/inactive toggle

### 4. Public Farm Page
- Farm info header
- Product grid with availability badges
- External payment/contact link buttons
- "Reserve" button per product
- "Join Waitlist" button when unavailable

### 5. Reservation Workflow
- Customer submits reservation request
- Farmer sees request in dashboard
- Farmer can confirm/decline
- Status updates visible to customer (optional email)

### 6. Waitlist Workflow
- Customer joins waitlist when product unavailable
- Farmer can notify next person when available
- Waitlist tracks order of signup

### 7. Admin Moderation
- View all farms/products
- Hide/remove listings
- Suspend farms
- View reports

### 8. Platform Disclaimers
- No-native-payments notice on every page
- "Transactions are directly with the farmer" notice
- Seller responsibility notice

---

## UI Components (shadcn/ui)

- Button, Input, Textarea, Label
- Card, Dialog, Sheet (for modals/sidebars)
- Select, Checkbox, Switch
- Badge (availability status)
- Table (reservations list)
- Form with validation (React Hook Form + Zod)
- Avatar, Navigation Menu
- Toast notifications

---

## Acceptance Criteria

### Farmer Flow
- [ ] Can register with email/password
- [ ] Must acknowledge seller responsibility before creating farm
- [ ] Can create/edit farm profile with all fields
- [ ] Can add products with category, price, availability
- [ ] Can view incoming reservation requests
- [ ] Can confirm/decline reservations
- [ ] Can manage waitlist

### Customer Flow
- [ ] Can browse farms on landing page
- [ ] Can view public farm page with products
- [ ] Can see product availability status
- [ ] Can submit reservation request
- [ ] Can join waitlist for unavailable products
- [ ] Sees "no native payments" disclaimer

### Admin Flow
- [ ] Can view all farms
- [ ] Can hide/remove individual listings
- [ ] Can suspend farms
- [ ] Can view flagged content

### Technical
- [ ] TypeScript compiles without errors
- [ ] ESLint passes
- [ ] Database schema migrates successfully
- [ ] Pages render without crashes
- [ ] Mobile-responsive layout

---

## Out of Scope (MVP)

- Native checkout, cart, payment processing
- Shopping cart
- Deposit/escrow
- Payment verification APIs
- Transaction fees
- Automatic legal compliance by state
- Legal advice generation
- Social media integration
- Native mobile apps
- Complex ad marketplace
- Multi-farmer accounts (one farm per account MVP)
- Email notifications (placeholder UI only)

---

## File Structure

```
virtual-farm-stand/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── explore/
│   │   ├── farm/[slug]/
│   │   ├── dashboard/
│   │   ├── admin/
│   │   ├── api/
│   │   └── auth/
│   ├── components/
│   │   ├── ui/ (shadcn)
│   │   ├── layout/
│   │   ├── farm/
│   │   └── product/
│   ├── lib/
│   │   ├── db.ts (Prisma client)
│   │   └── utils.ts
│   ├── types/
│   └── actions/ (Server Actions)
├── public/
├── SPEC.md
└── README.md
```

---

## Environment Variables

```
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```