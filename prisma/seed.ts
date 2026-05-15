import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Clean up existing data
  await prisma.waitlist.deleteMany()
  await prisma.reservation.deleteMany()
  await prisma.product.deleteMany()
  await prisma.farm.deleteMany()
  await prisma.user.deleteMany()
  await prisma.report.deleteMany()

  // Demo farms data - matching the explore page hardcoded data
  const farms = [
    {
      name: "Sunny Meadow Farm",
      slug: "sunny-meadow-farm",
      location: "Rural Valley, CA",
      region: "West",
      description: "Family-owned farm specializing in fresh eggs and vegetables.",
      emoji: "🐔",
      category: "EGGS",
      featured: true,
      priceRange: "$",
      phone: "(555) 123-4567",
      email: "sunny@farm.com",
      website: "https://sunnymeadowfarm.example.com",
      products: [
        { name: "Fresh Eggs", category: "Eggs", price: 6.0, unit: "dozen", availability: "AVAILABLE" },
        { name: "Heirloom Tomatoes", category: "Vegetables", price: 4.5, unit: "lb", availability: "AVAILABLE" },
      ],
    },
    {
      name: "Green Acres Farm",
      slug: "green-acres",
      location: "Portland, OR",
      region: "West",
      description: "Sustainable farm growing heirloom vegetables and herbs.",
      emoji: "🌿",
      category: "PRODUCE",
      featured: true,
      priceRange: "$$",
      phone: "(555) 234-5678",
      email: "info@greenacres.example.com",
      products: [
        { name: "Fresh Herb Bundle", category: "Herbs", price: 5.0, unit: "bundle", availability: "AVAILABLE" },
        { name: "Mixed Greens", category: "Vegetables", price: 4.0, unit: "bag", availability: "AVAILABLE" },
      ],
    },
    {
      name: "Valley View Dairy",
      slug: "valley-view-dairy",
      location: "Madison, WI",
      region: "Midwest",
      description: "Small-batch artisan cheese and raw milk from grass-fed cows.",
      emoji: "🥛",
      category: "DAIRY",
      featured: false,
      priceRange: "$$$",
      phone: "(555) 345-6789",
      email: "sales@valleyviewdairy.example.com",
      products: [
        { name: "Aged Cheddar", category: "Dairy", price: 12.0, unit: "lb", availability: "SEASONAL" },
        { name: "Fresh Mozzarella", category: "Dairy", price: 10.0, unit: "lb", availability: "SEASONAL" },
      ],
    },
    {
      name: "Mountain Poultry",
      slug: "mountain-poultry",
      location: "Asheville, NC",
      region: "Southeast",
      description: "Heritage breed chickens and ducks, pasture-raised.",
      emoji: "🦆",
      category: "POULTRY",
      featured: false,
      priceRange: "$$",
      phone: "(555) 456-7890",
      email: "hello@mountainpoultry.example.com",
      products: [
        { name: "Duck Eggs", category: "Eggs", price: 8.0, unit: "dozen", availability: "SOLD_OUT" },
        { name: "Chicken Eggs", category: "Eggs", price: 5.0, unit: "dozen", availability: "SOLD_OUT" },
      ],
    },
    {
      name: "Heritage Homestead",
      slug: "heritage-homestead",
      location: "Austin, TX",
      region: "South",
      description: "Heirloom vegetables and heritage breed pigs.",
      emoji: "🐷",
      category: "MEAT",
      featured: false,
      priceRange: "$$",
      phone: "(555) 567-8901",
      email: "contact@heritagehomestead.example.com",
      products: [
        { name: "Heirloom Tomatoes", category: "Vegetables", price: 4.5, unit: "lb", availability: "AVAILABLE" },
        { name: "Pork Chops", category: "Meat", price: 15.0, unit: "lb", availability: "AVAILABLE" },
      ],
    },
    {
      name: "Sunrise Orchard",
      slug: "sunrise-orchard",
      location: "Ashland, OR",
      region: "West",
      description: "Organic apples, pears, and berries.",
      emoji: "🍎",
      category: "PRODUCE",
      featured: false,
      priceRange: "$",
      phone: "(555) 678-9012",
      email: "picks@sunriseorchard.example.com",
      products: [
        { name: "Apples", category: "Fruit", price: 3.0, unit: "lb", availability: "SEASONAL" },
        { name: "Pears", category: "Fruit", price: 3.5, unit: "lb", availability: "SEASONAL" },
      ],
    },
    {
      name: "Blooming Gardens",
      slug: "blooming-gardens",
      location: "Denver, CO",
      region: "West",
      description: "Beautiful container gardens, succulents, and herb starts.",
      emoji: "🌺",
      category: "PLANTS",
      featured: false,
      priceRange: "$$",
      phone: "(555) 789-0123",
      email: "orders@bloominggardens.example.com",
      products: [
        { name: "Herb Starts", category: "Plants", price: 4.0, unit: "pot", availability: "AVAILABLE" },
        { name: "Succulents", category: "Plants", price: 6.0, unit: "pot", availability: "AVAILABLE" },
        { name: "Petunias", category: "Plants", price: 3.5, unit: "pot", availability: "AVAILABLE" },
      ],
    },
    {
      name: "Grandma's Kitchen",
      slug: "grandmas-kitchen",
      location: "Burlington, VT",
      region: "Northeast",
      description: "Homemade baked goods and preserves from family recipes.",
      emoji: "🧁",
      category: "COTTAGE_FOOD",
      featured: false,
      priceRange: "$",
      phone: "(555) 890-1234",
      email: "yummy@grandmaskitchen.example.com",
      products: [
        { name: "Blueberry Jam", category: "Pantry", price: 7.0, unit: "jar", availability: "AVAILABLE" },
        { name: "Chocolate Chip Cookies", category: "Bakery", price: 8.0, unit: "dozen", availability: "AVAILABLE" },
        { name: "Bread", category: "Bakery", price: 5.0, unit: "loaf", availability: "AVAILABLE" },
      ],
    },
  ]

  // Create farms with their products
  for (const farmData of farms) {
    // Create a unique user for each farm
    const user = await prisma.user.create({
      data: {
        email: `${farmData.slug.replace(/-/g, '_')}@example.com`,
        password: "hashed_password_placeholder",
        role: "FARMER",
      },
    })

    const { products, category, ...farmFields } = farmData
    const farm = await prisma.farm.create({
      data: {
        ...farmFields,
        sellerAcknowledged: true,
        acknowledgedAt: new Date(),
        status: "ACTIVE",
        userId: user.id,
      },
    })
    console.log("Created farm:", farm.name)

    // Create products for this farm
    for (const p of products) {
      await prisma.product.create({
        data: {
          ...p,
          farmId: farm.id,
          isActive: true,
        },
      })
      console.log("  - Created product:", p.name)
    }
  }

  console.log("Seed completed!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })