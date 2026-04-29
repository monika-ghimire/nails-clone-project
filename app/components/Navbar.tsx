"use client";

import { useRouter } from "next/navigation";

type NavbarProps = {
  onToggleSidebar: () => void;
  onToggleFavorites: () => void;
  showFavorites: boolean;
  onOpenCart: () => void;
  cartCount: number;
};

export default function Navbar({ onToggleSidebar, onToggleFavorites, showFavorites, onOpenCart, cartCount }: NavbarProps) {
  const router = useRouter();
  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="ml-4">
              <h1 className="text-xl font-bold text-slate-900">Ersa Nails</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/signup')}
              className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Sign In
            </button>

            <button
              onClick={onToggleFavorites}
              className={`p-2 rounded-md ${showFavorites ? 'bg-sky-600 text-white' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'} transition-colors`}
              aria-label="Show favorites"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" stroke="none">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>

            <button
              onClick={onOpenCart}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 relative"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13l-1.1 5M7 13l2.5-2.5M17 18v2a2 2 0 01-2 2H9a2 2 0 01-2-2v-2m10 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v9m10 0h-4m-6 0h4" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-sky-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}