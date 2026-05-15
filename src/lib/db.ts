// Mock prisma for demo mode - no database required
export const prisma = {
  user: {
    findUnique: async () => null,
    create: async () => ({}),
  },
  farm: {
    findMany: async () => [],
    findUnique: async () => null,
    create: async () => ({}),
  },
  product: {
    findMany: async () => [],
    findUnique: async () => null,
    create: async () => ({}),
  },
  reservation: {
    findMany: async () => [],
    create: async () => ({}),
  },
  waitlist: {
    findMany: async () => [],
    findFirst: async () => null,
    create: async () => ({}),
  },
} as any