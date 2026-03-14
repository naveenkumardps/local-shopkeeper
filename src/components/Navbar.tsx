import { Search, ShoppingCart, Plus, LogIn, LogOut, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartCount: number;
  onCartOpen: () => void;
  onAddProduct: () => void;
  onLoginClick: () => void;
}

export default function Navbar({
  searchQuery,
  onSearchChange,
  cartCount,
  onCartOpen,
  onAddProduct,
  onLoginClick,
}: NavbarProps) {
  const { isAdmin, logout } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md shadow-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        {/* Logo */}
        <Link to="/" className="flex items-baseline gap-2 shrink-0">
          <h1 className="text-lg font-semibold tracking-tight text-foreground">Inventory.</h1>
        </Link>

        {/* Search - desktop */}
        <div className="hidden sm:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-lg bg-secondary pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 border border-border transition"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          {/* Search toggle - mobile */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="sm:hidden p-2 rounded-lg hover:bg-secondary transition text-muted-foreground"
          >
            <Search size={18} />
          </button>

          {/* Cart */}
          <button
            onClick={onCartOpen}
            className="relative p-2 rounded-lg hover:bg-secondary transition text-foreground"
          >
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center min-w-[18px] h-[18px] px-1">
                {cartCount}
              </span>
            )}
          </button>

          {isAdmin && (
            <>
              <button
                onClick={onAddProduct}
                className="flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground px-3 py-1.5 text-sm font-medium hover:opacity-90 transition"
              >
                <Plus size={14} />
                <span className="hidden sm:inline">Add Item</span>
              </button>
              <button
                onClick={logout}
                className="p-2 rounded-lg hover:bg-secondary transition text-muted-foreground"
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </>
          )}
          {!isAdmin && (
            <button
              onClick={onLoginClick}
              className="flex items-center gap-1.5 rounded-lg bg-secondary text-foreground px-3 py-1.5 text-sm font-medium hover:bg-accent transition"
            >
              <LogIn size={14} />
              <span className="hidden sm:inline">Admin</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className="sm:hidden px-4 pb-3 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products..."
              autoFocus
              className="w-full rounded-lg bg-secondary pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 border border-border transition"
            />
          </div>
          <button onClick={() => { setSearchOpen(false); onSearchChange(""); }} className="p-2 text-muted-foreground">
            <X size={16} />
          </button>
        </div>
      )}
    </header>
  );
}
