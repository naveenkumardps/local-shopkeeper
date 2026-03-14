import { useState, FormEvent } from "react";
import { X } from "lucide-react";

interface AddProductDrawerProps {
  open: boolean;
  onClose: () => void;
  onAdd: (product: { title: string; price: number; image: string; description: string; category: string }) => void;
}

export default function AddProductDrawer({ open, onClose, onAdd }: AddProductDrawerProps) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!title.trim()) e.title = "Required";
    if (!price || isNaN(Number(price)) || Number(price) <= 0) e.price = "Valid price required";
    if (!category.trim()) e.category = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    onAdd({ title: title.trim(), price: Number(price), image: image.trim(), description: description.trim(), category: category.trim() });
    setTitle(""); setPrice(""); setImage(""); setDescription(""); setCategory("");
    setErrors({});
    onClose();
  };

  if (!open) return null;

  const inputClass = "w-full rounded-lg bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary border border-border transition";

  return (
    <>
      <div className="fixed inset-0 bg-foreground/10 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-50 shadow-card animate-slide-in flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-base font-semibold tracking-tight text-foreground">Add Item</h2>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-secondary transition text-muted-foreground">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
          <Field label="Title" error={errors.title}>
            <input className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Product name" />
          </Field>

          <Field label="Price" error={errors.price}>
            <input className={inputClass} value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.00" type="number" step="0.01" min="0" />
          </Field>

          <Field label="Category" error={errors.category}>
            <input className={inputClass} value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Lighting" />
          </Field>

          <Field label="Image URL">
            <input className={inputClass} value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." />
            {image && (
              <div className="mt-2 w-16 h-16 rounded-lg overflow-hidden bg-secondary shadow-border">
                <img src={image} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.target as HTMLImageElement).style.display = "none"} />
              </div>
            )}
          </Field>

          <Field label="Description">
            <textarea className={`${inputClass} resize-none`} rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Optional description" />
          </Field>

          <button type="submit" className="w-full rounded-lg bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:opacity-90 transition shadow-card">
            Add Item
          </button>
        </form>
      </div>
    </>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
