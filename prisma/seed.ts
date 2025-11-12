import bcrypt from "bcryptjs";
import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("Admin123!", 12);

  await prisma.user.upsert({
  where: { email: "contact@creanode.com" },
    update: {},
    create: {
  email: "contact@creanode.com",
      name: "Store Admin",
      role: UserRole.ADMIN,
      passwordHash: adminPassword,
    },
  });

  const categories = [
    {
      slug: "web-development",
      name: "Web Development",
      description: "Custom websites, applications, and system integrations tailored to your business.",
    },
    {
      slug: "branding",
      name: "Branding",
      description: "Logo design, brand identity, and consistent messaging across all channels.",
    },
    {
      slug: "ecommerce",
      name: "E-commerce",
      description: "End-to-end e-commerce builds with payment integrations and ERP synchronisation.",
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      create: category,
      update: category,
    });
  }

  const products = [
    {
      slug: "starter-website-package",
      name: "Starter Website Package",
      description:
        "Strategic discovery workshop, custom design, and CMS-driven website optimised for conversions. Includes SEO setup and analytics integration.",
      priceCents: 49900,
      stock: 5,
      categorySlug: "web-development",
      images: [
        {
          url: "/images/products/starter-website.jpg",
          altText: "Mockup of responsive starter website package",
          sortOrder: 0,
        },
      ],
    },
    {
      slug: "brand-refresh-intensive",
      name: "Brand Refresh Intensive",
      description:
        "Two-week sprint to realign your brand identity. Includes positioning strategy, refreshed visual language, and launch assets.",
      priceCents: 28900,
      stock: 10,
      categorySlug: "branding",
      images: [
        {
          url: "/images/products/brand-refresh.jpg",
          altText: "Brand guidelines and stationary mockup",
          sortOrder: 0,
        },
      ],
    },
    {
      slug: "commerce-plus-build",
      name: "Commerce Plus Build",
      description:
        "Full-featured e-commerce build with product catalogue, customer portal, payments, and fulfilment automation.",
      priceCents: 89900,
      stock: 3,
      categorySlug: "ecommerce",
      images: [
        {
          url: "/images/products/commerce-plus-dashboard.jpg",
          altText: "Dashboard showing ecommerce analytics for Commerce Plus package",
          sortOrder: 0,
        },
      ],
    },
  ];

  for (const product of products) {
    const category = await prisma.category.findUniqueOrThrow({
      where: { slug: product.categorySlug },
      select: { id: true },
    });

    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        description: product.description,
        priceCents: product.priceCents,
        stock: product.stock,
        categoryId: category.id,
        images: {
          deleteMany: {},
          create: product.images,
        },
      },
      create: {
        slug: product.slug,
        name: product.name,
        description: product.description,
        priceCents: product.priceCents,
        stock: product.stock,
        categoryId: category.id,
        images: {
          create: product.images,
        },
      },
    });
  }

  console.log("Seed data applied successfully.");
}

main()
  .catch((error) => {
    console.error("Seeding failed", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
