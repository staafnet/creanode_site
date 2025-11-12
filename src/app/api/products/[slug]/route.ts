import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
  const { slug } = await context.params;

  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        images: { orderBy: { sortOrder: "asc" } },
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Produkt nie został znaleziony." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      priceCents: product.priceCents,
      stock: product.stock,
      category: product.category?.name ?? null,
      images: product.images,
    });
  } catch (error) {
    console.error("Failed to load product", error);
    return NextResponse.json(
      { message: "Nie udało się pobrać produktu." },
      { status: 500 },
    );
  }
}
