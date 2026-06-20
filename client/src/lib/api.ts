export interface Product {
  id: string;
  categorySlug: string;
  code: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  details: string[];
}

export async function fetchAllProducts(): Promise<Product[]> {
  const res = await fetch("/api/products");
  if (!res.ok) throw new Error("Failed to load products");
  return res.json();
}

export async function fetchProductsByCategory(slug: string): Promise<Product[]> {
  const res = await fetch(`/api/products/category/${slug}`);
  if (!res.ok) throw new Error("Failed to load products");
  return res.json();
}

export interface NewProductInput {
  categorySlug: string;
  name: string;
  price: number;
  description: string;
  imageFile: File;
}

export async function createProduct(input: NewProductInput): Promise<Product> {
  const formData = new FormData();
  formData.append("categorySlug", input.categorySlug);
  formData.append("name", input.name);
  formData.append("price", String(input.price));
  formData.append("description", input.description);
  formData.append("image", input.imageFile);

  const res = await fetch("/api/products", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to add product");
  return res.json();
}
