import { useState, useMemo } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import ProductCard from "@/components/ProductCard";
import AddProductDrawer from "@/components/AddProductDrawer";
import CartDrawer from "@/components/CartDrawer";
import Navbar from "@/components/Navbar";
import CategoryFilter from "@/components/CategoryFilter";
import LoginForm from "@/components/LoginForm";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const Index = () => {
  const { products, addProduct, deleteProduct } = useProducts();
  const { isAdmin, login } = useAuth();
  const { items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))].sort(),
    [products]
  );

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  if (showLogin && !isAdmin) {
    return (
      <LoginForm
        onLogin={(pw) => {
          const success = login(pw);
          if (success) {
            setShowLogin(false);
            toast("Logged in as admin");
          }
          return success;
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={totalItems}
        onCartOpen={() => setCartOpen(true)}
        onAddProduct={() => setDrawerOpen(true)}
        onLoginClick={() => setShowLogin(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Filters */}
        {categories.length > 1 && (
          <div className="mb-6">
            <CategoryFilter categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} />
          </div>
        )}

        {/* Results count */}
        <p className="text-xs font-mono text-muted-foreground mb-4">
          {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"}
          {searchQuery && ` for "${searchQuery}"`}
          {selectedCategory && ` in ${selectedCategory}`}
        </p>

        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="text-lg font-medium text-muted-foreground">
              {products.length === 0 ? "Your collection is empty." : "No matching products found."}
            </p>
            {products.length === 0 && isAdmin && (
              <button onClick={() => setDrawerOpen(true)} className="mt-4 text-sm text-primary font-medium hover:underline">
                Add your first product
              </button>
            )}
            {products.length > 0 && (
              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory(""); }}
                className="mt-4 text-sm text-primary font-medium hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isAdmin={isAdmin}
                  onDelete={(id) => { deleteProduct(id); toast("Item deleted"); }}
                  onAddToCart={(p) => { addToCart(p); toast(`${p.title} added to cart`); }}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      <AddProductDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onAdd={(p) => { addProduct(p); toast("Item added"); }}
      />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onClear={clearCart}
        totalPrice={totalPrice}
      />
    </div>
  );
};

export default Index;
