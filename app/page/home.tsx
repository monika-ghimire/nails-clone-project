"use client";

import { useState, useEffect, useMemo } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import Marquee from "../components/Marquee";
import Features from "../components/Features";
import CartSidebar from "../components/Cart-drawer";

export type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  description: string;
  category: string;
  discount: number | null;
  lengths: string[];
  shapes: string[];
  colors: string[];
  options: string[];
};

type CartItem = Product & { quantity: number };

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedLengths, setSelectedLengths] = useState<string[]>([]);
  const [selectedShapes, setSelectedShapes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const productsPerPage = 8;

  // LOAD PRODUCTS
  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  // FILTERED PRODUCTS (NO STATE, NO EFFECT WARNING)
  const filteredProducts = useMemo(() => {
    let next = products;

    if (selectedCategory !== "all") {
      next = next.filter((p) => p.category === selectedCategory);
    }

    if (selectedLengths.length) {
      next = next.filter((p) =>
        p.lengths.some((l) => selectedLengths.includes(l)),
      );
    }

    if (selectedShapes.length) {
      next = next.filter((p) =>
        p.shapes.some((s) => selectedShapes.includes(s)),
      );
    }

    if (selectedColors.length) {
      next = next.filter((p) =>
        p.colors.some((c) => selectedColors.includes(c)),
      );
    }

    if (showFavorites) {
      next = next.filter((p) => likedProducts.has(p.id));
    }

    return next;
  }, [
    products,
    selectedCategory,
    selectedLengths,
    selectedShapes,
    selectedColors,
    showFavorites,
    likedProducts,
  ]);

  // RESET PAGE (SAFE WAY - NO EFFECT LOOP ISSUE)
  const updateFilters = (callback: () => void) => {
    callback();
    setCurrentPage(1);
  };

  const handleCategorySelect = (category: string) => {
    updateFilters(() => {
      setSelectedCategory(category);
      setSidebarOpen(false);
    });
  };

  const toggleFilter = (
    selected: string[],
    value: string,
    setter: (v: string[]) => void,
  ) => {
    updateFilters(() => {
      if (selected.includes(value)) {
        setter(selected.filter((i) => i !== value));
      } else {
        setter([...selected, value]);
      }
    });
  };

  // CART
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const exist = prev.find((p) => p.id === product.id);
      if (exist) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  // LIKE
  const handleToggleLike = (id: number) => {
    setLikedProducts((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // PAGINATION
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  );

  const cartCount = cart.reduce((a, b) => a + b.quantity, 0);

  const uniqueLengths = [...new Set(products.flatMap((p) => p.lengths))];
  const uniqueShapes = [...new Set(products.flatMap((p) => p.shapes))];
  const uniqueColors = [...new Set(products.flatMap((p) => p.colors))];

  const cartIds = useMemo(() => new Set(cart.map((c) => c.id)), [cart]);

  const handleRemoveFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar
        onToggleSidebar={() => setSidebarOpen(true)}
        onToggleFavorites={() => setShowFavorites((p) => !p)}
        showFavorites={showFavorites}
        onOpenCart={() => setCartOpen(true)}
        cartCount={cartCount}
      />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onCategorySelect={handleCategorySelect}
        selectedCategory={selectedCategory}
      />

      <main>
        <Features />
        <Marquee />

        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Welcome</h1>
          <p className="text-slate-600 mb-6">Premium nail care products</p>

          <div className="grid lg:grid-cols-[280px_1fr] gap-6">
            {/* FILTERS */}
            <aside className="bg-white p-6 flex lg:flex-col shadow-xl  justify-between lg:justify-items-normal! lg:h-[600px] rounded-2xl border-gray-800">
              <h2 className="font-semibold mb-4">Filters</h2>

              {/* LENGTH */}
              <div>
                <h3 className="text-sm font-semibold mb-2">Length</h3>
                {uniqueLengths.map((l) => (
                  <label key={l} className="block text-sm">
                    <input
                      type="checkbox"
                      checked={selectedLengths.includes(l)}
                      onChange={() =>
                        toggleFilter(selectedLengths, l, setSelectedLengths)
                      }
                    />{" "}
                    {l}
                  </label>
                ))}
              </div>

              {/* SHAPE */}
              <div className="lg:mt-4">
                <h3 className="text-sm font-semibold mb-2">Shape</h3>
                {uniqueShapes.map((s) => (
                  <label key={s} className="block text-sm">
                    <input
                      type="checkbox"
                      checked={selectedShapes.includes(s)}
                      onChange={() =>
                        toggleFilter(selectedShapes, s, setSelectedShapes)
                      }
                    />{" "}
                    {s}
                  </label>
                ))}
              </div>

              {/* COLOR */}
              <div className="lf:mt-4">
                <h3 className="text-sm font-semibold mb-2">Color</h3>
                {uniqueColors.map((c) => (
                  <label key={c} className="block text-sm">
                    <input
                      type="checkbox"
                      checked={selectedColors.includes(c)}
                      onChange={() =>
                        toggleFilter(selectedColors, c, setSelectedColors)
                      }
                    />{" "}
                    {c}
                  </label>
                ))}
              </div>
            </aside>

            {/* PRODUCTS */}
            <div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onToggleLike={handleToggleLike}
                    onOpenCart={() => setCartOpen(true)}
                    isInCart={
                      cart.find((item) => item.id === product.id) !== undefined
                    }
                    isLiked={likedProducts.has(product.id)}
                  />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <p className="text-center mt-10 text-gray-500">
                  No products found
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      <CartSidebar
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
         onRemove={handleRemoveFromCart}
      />

      <Footer />
    </div>
  );
}
