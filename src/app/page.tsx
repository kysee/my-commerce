import { ProductStore } from "@/lib/product";
import ProductList from "@/components/ProductList";

export default function Home() {
  return <ProductList products={ProductStore.getInstance()} />;
}
