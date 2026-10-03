import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const products = [
  {
    slug: "regrow-hair-growth-oil",
    name: "Regrow Hair Growth Oil",
    category: "HAIRCARE" as const,
    price: 12500,
    compareAtPrice: 15000,
    shortDescription:
      "A botanical growth oil formulated to strengthen roots and encourage healthy, fuller-looking hair.",
    description:
      "Regrow Hair Growth Oil blends farm-sourced castor, rosemary and neem oils to nourish the scalp, reduce breakage and support natural hair growth over time. Part of Euckays' Farm-to-Beauty haircare line.",
    keyBenefits: [
      "Supports healthy hair growth",
      "Strengthens roots and reduces breakage",
      "Soothes and nourishes the scalp",
    ],
    keyIngredients: ["Castor oil", "Rosemary oil", "Neem oil", "Vitamin E"],
    howToUse:
      "Apply a small amount directly to the scalp and massage gently. Use 2-3 times weekly, preferably at night.",
    suitableFor: "All hair types, including natural, relaxed and colour-treated hair.",
    size: "100ml",
    cautionInfo: "For external use only. Discontinue use if irritation occurs.",
    stock: 40,
    images: ["/images/product/image3.jpeg"],
  },
  {
    slug: "hair-grease",
    name: "Hair Grease",
    category: "HAIRCARE" as const,
    price: 6500,
    compareAtPrice: null,
    shortDescription: "A rich, moisturising hair grease that seals in moisture and adds shine.",
    description:
      "Made with shea butter and natural oils sourced through our agricultural value chain, Euckays Hair Grease locks in moisture and protects hair from dryness and breakage.",
    keyBenefits: ["Seals in moisture", "Adds natural shine", "Protects against dryness"],
    keyIngredients: ["Shea butter", "Castor oil", "Jojoba oil"],
    howToUse: "Scoop a small amount and apply evenly to hair and scalp as needed.",
    suitableFor: "Dry and coarse hair types.",
    size: "150g",
    cautionInfo: null,
    stock: 55,
    images: ["/images/products/hair-grease-1.svg"],
  },
  {
    slug: "shampoo",
    name: "Nourishing Shampoo",
    category: "HAIRCARE" as const,
    price: 7000,
    compareAtPrice: null,
    shortDescription: "A gentle, sulphate-conscious shampoo that cleanses without stripping natural oils.",
    description:
      "Formulated with botanical extracts to cleanse the scalp and hair gently while preserving natural moisture, leaving hair soft and manageable.",
    keyBenefits: ["Gentle cleansing", "Preserves natural moisture", "Leaves hair soft"],
    keyIngredients: ["Aloe vera", "Hibiscus extract", "Tea tree oil"],
    howToUse: "Apply to wet hair, lather, and rinse thoroughly. Follow with conditioner.",
    suitableFor: "All hair types.",
    size: "250ml",
    cautionInfo: null,
    stock: 60,
    images: ["/images/products/shampoo-1.svg"],
  },
  {
    slug: "conditioner",
    name: "Deep Conditioner",
    category: "HAIRCARE" as const,
    price: 7500,
    compareAtPrice: null,
    shortDescription: "A deep conditioning treatment that detangles and restores softness.",
    description:
      "This deep conditioner is enriched with moringa and baobab oil to restore softness, improve elasticity and make styling easier.",
    keyBenefits: ["Detangles hair", "Restores softness", "Improves elasticity"],
    keyIngredients: ["Moringa oil", "Baobab oil", "Shea butter"],
    howToUse: "Apply generously after shampooing, leave for 5-10 minutes, then rinse.",
    suitableFor: "All hair types, especially dry or damaged hair.",
    size: "250ml",
    cautionInfo: null,
    stock: 48,
    images: ["/images/products/conditioner-1.svg"],
  },
  {
    slug: "honey-turmeric-black-soap",
    name: "Honey & Turmeric Black Soap",
    category: "SKINCARE" as const,
    price: 5000,
    compareAtPrice: 6000,
    shortDescription: "A traditional African black soap enriched with honey and turmeric for radiant skin.",
    description:
      "Handmade with locally sourced ingredients, this black soap combines the healing properties of turmeric with the moisturising benefits of honey for clean, glowing skin.",
    keyBenefits: ["Deep cleansing", "Brightens skin tone", "Naturally moisturising"],
    keyIngredients: ["Raw honey", "Turmeric", "Shea butter", "Plantain ash"],
    howToUse: "Lather with water and massage onto damp skin. Rinse thoroughly.",
    suitableFor: "All skin types, including sensitive skin.",
    size: "150g",
    cautionInfo: "Discontinue use if irritation occurs. Avoid contact with eyes.",
    stock: 70,
    images: ["/images/product/Image1.jpeg", "/images/product/image%204.jpeg"],
  },
  {
    slug: "glow-brightening-oil",
    name: "Glow Brightening Oil",
    category: "SKINCARE" as const,
    price: 9500,
    compareAtPrice: null,
    shortDescription: "A lightweight facial oil that brightens and evens out skin tone.",
    description:
      "A blend of rosehip, carrot and squalane oils formulated to brighten the complexion, even skin tone and restore a healthy glow.",
    keyBenefits: ["Brightens complexion", "Evens skin tone", "Lightweight, fast-absorbing"],
    keyIngredients: ["Rosehip oil", "Carrot oil", "Squalane", "Vitamin E"],
    howToUse: "Apply a few drops to clean face and neck morning and night.",
    suitableFor: "All skin types.",
    size: "30ml",
    cautionInfo: "Patch test before first use.",
    stock: 35,
    images: ["/images/product/image2.jpeg"],
  },
  {
    slug: "haircare-bundle",
    name: "Complete Haircare Bundle",
    category: "HAIRCARE" as const,
    price: 28000,
    compareAtPrice: 33500,
    shortDescription: "Shampoo, conditioner, hair grease and growth oil bundled together at a discount.",
    description:
      "Everything you need for a complete Farm-to-Beauty haircare routine, bundled together: Nourishing Shampoo, Deep Conditioner, Hair Grease and Regrow Hair Growth Oil.",
    keyBenefits: ["Complete haircare routine", "Bundled savings", "Farm-to-Beauty ingredients throughout"],
    keyIngredients: ["Shea butter", "Castor oil", "Rosemary oil", "Aloe vera"],
    howToUse: "Follow the individual product instructions for each item in the bundle.",
    suitableFor: "All hair types.",
    size: "4-piece set",
    cautionInfo: null,
    stock: 20,
    images: ["/images/product/image6.jpeg"],
  },
  {
    slug: "skincare-bundle",
    name: "Radiant Skin Bundle",
    category: "SKINCARE" as const,
    price: 13000,
    compareAtPrice: 15500,
    shortDescription: "Honey & Turmeric Black Soap paired with Glow Brightening Oil.",
    description:
      "A simple two-step skincare routine pairing our Honey & Turmeric Black Soap with the Glow Brightening Oil for clean, radiant skin.",
    keyBenefits: ["Complete cleanse-and-glow routine", "Bundled savings"],
    keyIngredients: ["Raw honey", "Turmeric", "Rosehip oil", "Carrot oil"],
    howToUse: "Cleanse with the black soap, then apply the brightening oil to damp skin.",
    suitableFor: "All skin types.",
    size: "2-piece set",
    cautionInfo: null,
    stock: 25,
    images: ["/images/product/image5.jpeg"],
  },
];

const deliveryZones: { state: string; fee: number }[] = [
  { state: "Lagos", fee: 2000 },
  { state: "FCT - Abuja", fee: 3000 },
  { state: "Ogun", fee: 2500 },
  { state: "Oyo", fee: 3000 },
  { state: "Rivers", fee: 3500 },
  { state: "Kano", fee: 4000 },
];

async function main() {
  for (const p of products) {
    const { images, ...data } = p;
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        ...data,
        images: {
          create: images.map((url, i) => ({
            url,
            altText: p.name,
            position: i,
          })),
        },
      },
    });
  }

  for (const zone of deliveryZones) {
    await prisma.deliveryZone.upsert({
      where: { state: zone.state },
      update: { fee: zone.fee },
      create: zone,
    });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await prisma.adminUser.upsert({
      where: { email: adminEmail },
      update: { passwordHash },
      create: { email: adminEmail, passwordHash },
    });
  }

  console.log(`Seeded ${products.length} products, ${deliveryZones.length} delivery zones.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
