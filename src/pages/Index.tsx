import { useState } from "react";
import { Search, Wrench, Zap, Settings, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { ProductCard, type Product } from "@/components/ProductCard";
import { Cart } from "@/components/Cart";
import { useCart } from "@/hooks/useCart";
import { products, categories } from "@/data/products";
import heroImg from "@/assets/hero-automotive.jpg";

const Index = () => {
  const {
    items,
    isOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    openCart,
    closeCart,
  } = useCart();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCheckout = () => {
    alert("Checkout functionality will be implemented with Stripe integration!");
  };

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category.toLowerCase() === selectedCategory)
    : products;

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={getTotalItems()} onCartClick={openCart} />

      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Automotive parts warehouse"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-primary-foreground">
            <h1 className="text-5xl font-bold mb-4">
              Quality Auto Parts
              <br />
              <span className="text-automotive-warning">At Your Fingertips</span>
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Find the perfect parts for your vehicle. Over 1 million automotive parts 
              in stock with same-day shipping available.
            </p>
            <div className="flex gap-4">
              <Button variant="default" size="xl" className="bg-primary hover:bg-primary-hover">
                Shop Now
              </Button>
              <Button variant="automotive" size="xl">
                Find My Parts
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground">Find parts for every vehicle and need</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.map((category) => (
              <Card
                key={category.id}
                className={`cursor-pointer hover:shadow-card-hover transition-all duration-200 ${
                  selectedCategory === category.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                )}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-primary rounded-lg flex items-center justify-center">
                    {category.id === "brakes" && <Settings className="h-6 w-6 text-primary-foreground" />}
                    {category.id === "engine" && <Wrench className="h-6 w-6 text-primary-foreground" />}
                    {category.id === "electrical" && <Zap className="h-6 w-6 text-primary-foreground" />}
                    {!["brakes", "engine", "electrical"].includes(category.id) && 
                      <Settings className="h-6 w-6 text-primary-foreground" />}
                  </div>
                  <h3 className="font-semibold mb-1">{category.name}</h3>
                  <p className="text-xs text-muted-foreground">{category.count} items</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                {selectedCategory ? `${categories.find(c => c.id === selectedCategory)?.name} Parts` : "Featured Products"}
              </h2>
              <p className="text-muted-foreground">
                {filteredProducts.length} products available
              </p>
            </div>
            {selectedCategory && (
              <Button 
                variant="outline" 
                onClick={() => setSelectedCategory(null)}
              >
                View All Products
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onProductClick={handleProductClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                <Search className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Part Finder</h3>
              <p className="text-muted-foreground">
                Search by make, model, year, or part number to find exactly what you need
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                <Zap className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
              <p className="text-muted-foreground">
                Free shipping on orders over $75. Same-day shipping available for most items
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                <Star className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-muted-foreground">
                All parts come with manufacturer warranty and our satisfaction guarantee
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Component */}
      <Cart
        items={items}
        isOpen={isOpen}
        onClose={closeCart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default Index;
