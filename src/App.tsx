import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import NotFound from "./pages/NotFound.tsx";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";

const queryClient = new QueryClient();

function AppRoutes() {
  const { addToCart } = useCart();

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route
        path="/product/:id"
        element={
          <ProductDetail
            onAddToCart={(p) => { addToCart(p); toast(`${p.title} added to cart`); }}
          />
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
