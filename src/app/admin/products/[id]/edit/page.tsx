import React from "react";
import { ProductForm } from "@/components/admin/ProductForm";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  
  await connectToDatabase();
  const product = await Product.findById(id).lean();
  
  if (!product) {
    notFound();
  }

  // Convert MongoDB object to simple JS object
  const productData = {
    title: product.title,
    description: product.description,
    price: product.price,
    category: product.category,
    image: product.image,
    esgStats: product.esgStats,
  };

  return <ProductForm initialData={productData as any} isEdit={true} productId={id} />;
}
