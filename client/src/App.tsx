import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import Categories from "./pages/Categories";
import CategoryProducts from "./pages/CategoryProducts";
import AddProduct from "./pages/AddProduct";
import Home from "./pages/Home";
import Checkout from "./pages/CheckoutPage";
import Navbar from "./components/Navbar";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        <Switch>
          <Route path={"/"} component={Home} />
          <Route path={"/categories"} component={Categories} />
          <Route path={"/categories/:slug"} component={CategoryProducts} />
          <Route path={"/add-product"} component={AddProduct} />
          <Route path={"/checkout"} component={Checkout} />
          <Route path={"/404"} component={NotFound} />
          {/* Final fallback route */}
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </CartProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
export default App;
