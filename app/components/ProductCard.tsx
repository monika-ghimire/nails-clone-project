"use client";

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
  lengths?: string[];
  shapes?: string[];
  colors?: string[];
  options?: string[];
};

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleLike: (productId: number) => void;
  isLiked: boolean;
};

export default function ProductCard({ product, onAddToCart, onToggleLike, isLiked }: ProductCardProps) {
  const getInitials = (name: string) => {
    const words = name.split(' ');
    return words.slice(0, 2).map(word => word.charAt(0).toUpperCase()).join('');
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" clipPath="inset(0 50% 0 0)"/>
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      );
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Product Image/Icon Placeholder */}
      <div className="aspect-square bg-linear-to-br from-sky-100 to-sky-200 flex items-center justify-center relative">
        {product.discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            {product.discount}% OFF
          </div>
        )}
        <div className="text-6xl font-bold text-sky-600">
          {getInitials(product.name)}
        </div>
        <button
          onClick={() => onToggleLike(product.id)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
        >
          <svg
            className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : 'text-slate-400'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-sm text-slate-600 mb-3 line-clamp-2">{product.description}</p>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center mr-2">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-slate-600">({product.reviews})</span>
        </div>

        <div className="mb-3 flex flex-wrap gap-2">
          {product.colors?.slice(0, 3).map((color) => (
            <span key={color} className="rounded-full border border-slate-200 bg-slate-100 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
              {color}
            </span>
          ))}
          {product.shapes?.slice(0, 3).map((shape) => (
            <span key={shape} className="rounded-full border border-slate-200 bg-slate-100 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
              {shape}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-slate-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-slate-500 line-through">${product.originalPrice}</span>
            )}
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13l-1.1 5M7 13l2.5-2.5M17 18v2a2 2 0 01-2 2H9a2 2 0 01-2-2v-2m10 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v9m10 0h-4m-6 0h4" />
            </svg>
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}