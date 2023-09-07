import { FOOD_ITEM_IMAGE_URL } from "@/components/VideoCard";

// data.js
export interface Product {
  id: string;
  name: string;
  imageUrl: string;
}

export const products: Product[] = [
  { id: "1", name: "Product 1", imageUrl: FOOD_ITEM_IMAGE_URL },
  { id: "2", name: "Product 2", imageUrl: FOOD_ITEM_IMAGE_URL },
  // ... add more products
];
