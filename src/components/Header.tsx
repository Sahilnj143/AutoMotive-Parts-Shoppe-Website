import { useState } from "react";
import { Search, ShoppingCart, Menu, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export const Header = ({ cartItemCount, onCartClick }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-background border-b shadow-automotive">
      {/* Top bar */}
      <div className="bg-automotive-steel text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              1-800-AUTO-PARTS
            </span>
            <span>Free Shipping on Orders $75+</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Track Your Order</span>
            <span>Help Center</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <div className="w-8 h-8 bg-primary-foreground rounded-sm flex items-center justify-center font-bold text-primary">
                AP
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-automotive-steel">AutoParts</h1>
              <p className="text-xs text-muted-foreground">Pro</p>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by part number, make, model, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            
            <Button
              variant="cart"
              onClick={onCartClick}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="ml-2 hidden sm:inline">Cart</span>
              {cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground min-w-[20px] h-5 flex items-center justify-center text-xs">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Button variant="ghost" className="font-medium">
                <Menu className="h-4 w-4 mr-2" />
                All Categories
              </Button>
              <a href="#" className="text-foreground hover:text-primary transition-colors">Brakes</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">Engine</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">Electrical</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">Filters</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">Lighting</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">Tools</a>
            </div>
            <div className="text-sm text-automotive-warning font-medium">
              🔥 Flash Sale: Up to 40% Off
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};