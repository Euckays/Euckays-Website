import { ProductForm } from "@/components/admin/ProductForm";
import { createProduct } from "../actions";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-brand-black">Add Product</h1>
      <div className="mt-6">
        <ProductForm action={createProduct} submitLabel="Create Product" />
      </div>
    </div>
  );
}
