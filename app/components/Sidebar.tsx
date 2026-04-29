"use client";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
};

const categories = [
  { id: "all", name: "All Products", icon: "🛍️" },
  { id: "new shop", name: "New Shop", icon: "✨" },
  { id: "motherday special", name: "Mother's Day Special", icon: "👩‍👧" },
];

export default function Sidebar({ isOpen, onClose, onCategorySelect, selectedCategory }: SidebarProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40  z-30 "
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Categories</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 lg:hidden"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="mt-4">
          <ul className="space-y-2 px-4">
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => onCategorySelect(category.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-sky-50 text-sky-700 border border-sky-200'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className="text-lg mr-3">{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200">
          <div className="text-center">
            <p className="text-sm text-slate-500">Ersa Nails © 2024</p>
          </div>
        </div>
      </div>
    </>
  );
}