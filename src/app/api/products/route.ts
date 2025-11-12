import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { active: true },
      include: {
        category: true,
        images: { orderBy: { sortOrder: "asc" } },
      },
    });

    return NextResponse.json(
      products.map((product) => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        priceCents: product.priceCents,
        stock: product.stock,
        category: product.category?.name ?? null,
        images: product.images,
      })),
    );
  } catch (error) {
    console.error("Failed to load products", error);
    return NextResponse.json(
      { message: "Nie udało się pobrać produktów." },
      { status: 500 },
    );
  }
}
