import { useState, useEffect } from "react";

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  createdAt: number;
}

const STORAGE_KEY = "store_products";

const initialProducts: Product[] = [
  {
    id: "1",
    title: "Minimal Desk Lamp",
    price: 89.00,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600&q=80",
    description: "Clean lines, warm light. Adjustable arm with matte black finish.",
    category: "Lighting",
    createdAt: Date.now(),
  },
  {
    id: "2",
    title: "Concrete Planter",
    price: 34.00,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80",
    description: "Hand-poured concrete with drainage hole. Fits 4-inch pots.",
    category: "Home",
    createdAt: Date.now(),
  },
  {
    id: "3",
    title: "Wool Throw Blanket",
    price: 120.00,
    image: "https://images.unsplash.com/photo-1580301762395-21ce6d555b43?w=600&q=80",
    description: "100% merino wool. Oatmeal color. Made in Portugal.",
    category: "Textiles",
    createdAt: Date.now(),
  },
  {
    id: "4",
    title: "Ceramic Mug Set",
    price: 48.00,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80",
    description: "Set of 2 hand-thrown mugs. Speckled glaze, 12oz capacity.",
    category: "Kitchen",
    createdAt: Date.now(),
  },
];

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Omit<Product, "id" | "createdAt">) => {
    const newProduct: Product = {
      ...product,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return { products, addProduct, deleteProduct };
}
