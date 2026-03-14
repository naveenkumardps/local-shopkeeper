import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useAuth } from "@/hooks/useAuth";
import ProductCard from "@/components/ProductCard";
import AddProductDrawer from "@/components/AddProductDrawer";
import LoginForm from "@/components/LoginForm";
import { AnimatePresence } from "framer-motion";
import { Plus, LogIn, LogOut } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const { products, addProduct, deleteProduct } = useProducts();
  const { isAdmin, login, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

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
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md shadow-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <h1 className="text-xl font-semibold tracking-tight text-foreground">Inventory.</h1>
            <span className="text-xs font-mono text-muted-foreground">{products.length} Items</span>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <>
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-3 py-1.5 text-sm font-medium hover:opacity-90 transition"
                >
                  <Plus size={14} />
                  Add Item
                </button>
                <button
                  onClick={() => { logout(); toast("Logged out"); }}
                  className="flex items-center gap-1.5 rounded-lg bg-secondary text-foreground px-3 py-1.5 text-sm font-medium hover:bg-accent transition"
                >
                  <LogOut size={14} />
                </button>
              </>
            )}
            {!isAdmin && (
              <button
                onClick={() => setShowLogin(true)}
                className="flex items-center gap-1.5 rounded-lg bg-secondary text-foreground px-3 py-1.5 text-sm font-medium hover:bg-accent transition"
              >
                <LogIn size={14} />
                Admin
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="text-lg font-medium text-muted-foreground">Your collection is empty.</p>
            {isAdmin && (
              <button
                onClick={() => setDrawerOpen(true)}
                className="mt-4 text-sm text-primary font-medium hover:underline"
              >
                Add your first product
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isAdmin={isAdmin}
                  onDelete={(id) => { deleteProduct(id); toast("Item deleted"); }}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* Add Product Drawer */}
      <AddProductDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onAdd={(p) => { addProduct(p); toast("Item added"); }}
      />
    </div>
  );
};

export default Index;
