import { notFound } from "next/navigation";
import { adminGet } from "@/lib/admin-session";
import type { Product } from "@/lib/api-types";
import { ProductForm } from "@/components/admin/ProductForm";
import { updateProduct } from "../actions";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = (await adminGet<{ product: Product }>(`/admin/products/${encodeURIComponent(id)}`))?.product;
  if (!product) notFound();

  const boundAction = updateProduct.bind(null, product.id);

  return (
    <div>
      <h1 className="font-display text-2xl text-brand-black">Edit Product</h1>
      <div className="mt-6">
        <ProductForm
          action={boundAction}
          submitLabel="Save Changes"
          defaults={{
            name: product.name,
            slug: product.slug,
            category: product.category,
            price: product.price,
            compareAtPrice: product.compareAtPrice,
            shortDescription: product.shortDescription,
            description: product.description,
            keyBenefits: product.keyBenefits,
            keyIngredients: product.keyIngredients,
            howToUse: product.howToUse,
            suitableFor: product.suitableFor,
            size: product.size,
            cautionInfo: product.cautionInfo,
            stock: product.stock,
            isActive: product.isActive,
            seoTitle: product.seoTitle,
            seoDescription: product.seoDescription,
            images: product.images.map((i) => i.url),
          }}
        />
      </div>
    </div>
  );
}
