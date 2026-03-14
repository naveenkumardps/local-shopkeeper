import { useParams, Link } from "react-router-dom";
import { useProducts, Product } from "@/hooks/useProducts";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

interface ProductDetailProps {
  onAddToCart: (product: Product) => void;
}

export default function ProductDetail({ onAddToCart }: ProductDetailProps) {
  const { id } = useParams();
  const { products } = useProducts();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-lg text-muted-foreground">Product not found</p>
        <Link to="/" className="text-sm text-primary font-medium hover:underline">Back to shop</Link>
      </div>
    );
  }

  const initials = product.title.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition mb-6">
          <ArrowLeft size={16} />
          Back
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Image */}
          <div className="aspect-square overflow-hidden rounded-xl bg-secondary shadow-border relative">
            {product.image ? (
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
                }}
              />
            ) : null}
            <div className={`${product.image ? "hidden" : ""} absolute inset-0 flex items-center justify-center bg-secondary`}>
              <span className="text-4xl font-semibold tracking-tight text-muted-foreground">{initials}</span>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center gap-4">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{product.category}</span>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">{product.title}</h1>
            <p className="font-mono text-2xl font-semibold text-foreground">${product.price.toFixed(2)}</p>
            {product.description && (
              <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
            )}
            <button
              onClick={() => onAddToCart(product)}
              className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground py-3 px-6 text-sm font-medium hover:opacity-90 transition w-full sm:w-auto"
            >
              <ShoppingCart size={16} />
              Add to Cart
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
