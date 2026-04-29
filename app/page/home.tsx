"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import Marquee from "../components/Marquee";
import Features from "../components/Features";

type Product = {
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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedLengths, setSelectedLengths] = useState<string[]>([]);
  const [selectedShapes, setSelectedShapes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const productsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const uniqueLengths = Array.from(new Set(products.flatMap((product) => product.lengths))).sort();
  const uniqueShapes = Array.from(new Set(products.flatMap((product) => product.shapes))).sort();
  const uniqueColors = Array.from(new Set(products.flatMap((product) => product.colors))).sort();

  useEffect(() => {
    fetch('/data/products.json')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(error => console.error('Error loading products:', error));
  }, []);

  useEffect(() => {
    let next = products;

    if (selectedCategory !== "all") {
      next = next.filter((product) => product.category === selectedCategory);
    }

    if (selectedLengths.length > 0) {
      next = next.filter((product) => product.lengths.some((length) => selectedLengths.includes(length)));
    }

    if (selectedShapes.length > 0) {
      next = next.filter((product) => product.shapes.some((shape) => selectedShapes.includes(shape)));
    }

    if (selectedColors.length > 0) {
      next = next.filter((product) => product.colors.some((color) => selectedColors.includes(color)));
    }

    if (showFavorites) {
      next = next.filter((product) => likedProducts.has(product.id));
    }

    setFilteredProducts(next);
    setCurrentPage(1);
  }, [products, selectedCategory, selectedLengths, selectedShapes, selectedColors, showFavorites, likedProducts]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSidebarOpen(false);
  };

  const toggleFilter = (selected: string[], value: string, setter: (value: string[]) => void) => {
    if (selected.includes(value)) {
      setter(selected.filter((item) => item !== value));
    } else {
      setter([...selected, value]);
    }
  };

  const handleAddToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleToggleLike = (productId: number) => {
    setLikedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar
        onToggleSidebar={() => setSidebarOpen(true)}
        onToggleFavorites={() => setShowFavorites((prev) => !prev)}
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

      <main className="lg:ml-0">
        <Features />
          <Marquee />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome to Ersa Nails</h1>
            <p className="text-slate-600">Discover premium nail care products for your beauty needs</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[280px_1fr] mb-8">
            <aside className="space-y-6 rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Filters</h2>
                <div className="space-y-5">
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-slate-900">Length</h3>
                      <span className="text-xs text-slate-500">{selectedLengths.length || 'All'}</span>
                    </div>
                    <div className="space-y-2">
                      {uniqueLengths.map((length) => (
                        <label key={length} className="flex items-center gap-3 text-sm text-slate-700">
                          <input
                            type="checkbox"
                            checked={selectedLengths.includes(length)}
                            onChange={() => toggleFilter(selectedLengths, length, setSelectedLengths)}
                            className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                          />
                          {length}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-slate-900">Shape</h3>
                      <span className="text-xs text-slate-500">{selectedShapes.length || 'All'}</span>
                    </div>
                    <div className="space-y-2">
                      {uniqueShapes.map((shape) => (
                        <label key={shape} className="flex items-center gap-3 text-sm text-slate-700">
                          <input
                            type="checkbox"
                            checked={selectedShapes.includes(shape)}
                            onChange={() => toggleFilter(selectedShapes, shape, setSelectedShapes)}
                            className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                          />
                          {shape}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-slate-900">Color</h3>
                      <span className="text-xs text-slate-500">{selectedColors.length || 'All'}</span>
                    </div>
                    <div className="space-y-2">
                      {uniqueColors.map((color) => (
                        <label key={color} className="flex items-center gap-3 text-sm text-slate-700">
                          <input
                            type="checkbox"
                            checked={selectedColors.includes(color)}
                            onChange={() => toggleFilter(selectedColors, color, setSelectedColors)}
                            className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                          />
                          {color}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6 mb-8">
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onToggleLike={handleToggleLike}
                    isLiked={likedProducts.has(product.id)}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center">
                  <nav className="flex items-center space-x-1">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-md text-sm font-medium text-slate-500 bg-white border border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      page === currentPage
                        ? 'text-white bg-sky-600 border border-sky-600'
                        : 'text-slate-500 bg-white border border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-md text-sm font-medium text-slate-500 bg-white border border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </nav>
            </div>
          )}

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛍️</div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">No products found</h3>
              <p className="text-slate-600">Try changing the filters or category</p>
            </div>
          )}
        </div>
      </div>
        </div>
    </main>

      <Footer />

      <div className={`fixed inset-0 z-50 transition-all ${cartOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="fixed inset-0 bg-black/40" onClick={() => setCartOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between border-b border-slate-200 p-5">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Your Cart</h2>
              <p className="text-sm text-slate-500">{cart.length} item{cart.length === 1 ? '' : 's'}</p>
            </div>
            <button onClick={() => setCartOpen(false)} className="text-slate-500 hover:text-slate-900">
              Close
            </button>
          </div>
          <div className="p-5 space-y-4 overflow-y-auto h-[calc(100%-230px)]">
            {cart.length === 0 ? (
              <div className="text-center text-slate-500">Your cart is empty.</div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="rounded-2xl border border-slate-200 p-4 bg-slate-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">{item.name}</h3>
                      <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                      {item.originalPrice && <p className="text-xs text-slate-500 line-through">${item.originalPrice.toFixed(2)}</p>}
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">{item.description}</p>
                </div>
              ))
            )}
          </div>
          <div className="border-t border-slate-200 p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-slate-600">Total</span>
              <span className="text-lg font-semibold text-slate-900">${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setCartOpen(false)} className="flex-1 rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                Cancel
              </button>
              <button onClick={() => setCartOpen(false)} className="flex-1 rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white hover:bg-sky-700">
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
