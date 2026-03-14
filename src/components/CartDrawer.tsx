import { X, Minus, Plus, Trash2 } from "lucide-react";
import { CartItem } from "@/hooks/useCart";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  onClear: () => void;
  totalPrice: number;
}

export default function CartDrawer({ open, onClose, items, onUpdateQuantity, onRemove, onClear, totalPrice }: CartDrawerProps) {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-foreground/10 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-50 shadow-card animate-slide-in flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-base font-semibold tracking-tight text-foreground">Cart ({items.length})</h2>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-secondary transition text-muted-foreground">
            <X size={18} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-sm text-muted-foreground">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3 items-start">
                  <div className="w-16 h-16 rounded-lg bg-secondary overflow-hidden shrink-0">
                    {item.product.image ? (
                      <img src={item.product.image} alt={item.product.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-muted-foreground">
                        {item.product.title.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground truncate">{item.product.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.product.category}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="p-0.5 rounded hover:bg-secondary text-muted-foreground transition"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-mono font-medium text-foreground w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="p-0.5 rounded hover:bg-secondary text-muted-foreground transition"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() => onRemove(item.product.id)}
                        className="p-0.5 rounded hover:bg-secondary text-destructive ml-auto transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <span className="font-mono text-sm font-semibold text-foreground shrink-0">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-border px-6 py-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">Total</span>
                <span className="font-mono text-lg font-semibold text-foreground">${totalPrice.toFixed(2)}</span>
              </div>
              <button className="w-full rounded-lg bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:opacity-90 transition">
                Checkout
              </button>
              <button onClick={onClear} className="w-full text-xs text-muted-foreground hover:text-destructive transition">
                Clear cart
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
