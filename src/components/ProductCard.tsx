import { Product } from "@/hooks/useProducts";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  onDelete?: (id: string) => void;
  onAddToCart?: (product: Product) => void;
  isAdmin?: boolean;
}

export default function ProductCard({ product, onDelete, onAddToCart, isAdmin }: ProductCardProps) {
  const initials = product.title
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="group relative flex flex-col space-y-3"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden rounded-xl bg-secondary shadow-border relative">
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
              }}
            />
          ) : null}
          <div className={`${product.image ? "hidden" : ""} absolute inset-0 flex items-center justify-center bg-secondary`}>
            <span className="text-2xl font-semibold tracking-tight text-muted-foreground">{initials}</span>
          </div>
        </div>
      </Link>

      <div className="flex justify-between items-start gap-2">
        <div className="min-w-0">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-sm font-medium text-foreground tracking-tight truncate hover:text-primary transition">{product.title}</h3>
          </Link>
          <p className="text-xs text-muted-foreground">{product.category}</p>
        </div>
        <span className="font-mono text-sm font-semibold text-foreground shrink-0">
          ${product.price.toFixed(2)}
        </span>
      </div>

      {product.description && (
        <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
      )}

      {/* Add to cart button */}
      {onAddToCart && (
        <button
          onClick={() => onAddToCart(product)}
          className="flex items-center justify-center gap-1.5 rounded-lg bg-primary text-primary-foreground py-2 text-xs font-medium hover:opacity-90 transition"
        >
          <ShoppingCart size={13} />
          Add to Cart
        </button>
      )}

      {isAdmin && onDelete && (
        <button
          onClick={() => onDelete(product.id)}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/90 backdrop-blur-sm text-destructive text-xs font-medium px-2 py-1 rounded-md shadow-card"
        >
          Delete
        </button>
      )}
    </motion.div>
  );
}
