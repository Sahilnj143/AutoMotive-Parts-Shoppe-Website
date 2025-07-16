import { ShoppingCart, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  brand: string;
  category: string;
  inStock: boolean;
  isOnSale?: boolean;
  isBestSeller?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart, onProductClick }: ProductCardProps) => {
  const discount = product.originalPrice ? 
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <Card className="group cursor-pointer hover:shadow-card-hover transition-all duration-200 overflow-hidden">
      <div className="relative" onClick={() => onProductClick(product)}>
        {/* Badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {product.isOnSale && (
            <Badge className="bg-primary text-primary-foreground">
              {discount}% OFF
            </Badge>
          )}
          {product.isBestSeller && (
            <Badge className="bg-automotive-warning text-foreground">
              Best Seller
            </Badge>
          )}
        </div>

        {/* Wishlist */}
        <button className="absolute top-2 right-2 z-10 p-2 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="h-4 w-4 text-muted-foreground hover:text-primary" />
        </button>

        {/* Product Image */}
        <div className="aspect-square bg-gradient-card p-4 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
          />
        </div>
      </div>

      <CardContent className="p-4">
        {/* Brand & Category */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span className="font-medium">{product.brand}</span>
          <span>{product.category}</span>
        </div>

        {/* Product Name */}
        <h3 
          className="font-semibold text-sm mb-2 line-clamp-2 hover:text-primary transition-colors cursor-pointer"
          onClick={() => onProductClick(product)}
        >
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating)
                    ? "fill-automotive-warning text-automotive-warning"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="mb-3">
          {product.inStock ? (
            <span className="text-xs text-green-600 font-medium">✓ In Stock</span>
          ) : (
            <span className="text-xs text-destructive font-medium">Out of Stock</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="w-full"
          variant={product.inStock ? "default" : "secondary"}
          disabled={!product.inStock}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.inStock ? "Add to Cart" : "Notify When Available"}
        </Button>
      </CardContent>
    </Card>
  );
};