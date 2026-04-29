"use client";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type CartSidebarProps = {
  open: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onAdd?: (id: number) => void;
  onRemove?: (id: number) => void;
};

export default function CartSidebar({
  open,
  onClose,
  cartItems,
  onAdd,
  onRemove,
}: CartSidebarProps) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40  z-40 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 
        transform transition-transform duration-300 flex flex-col
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b bg-gradient-to-r from-pink-500 to-rose-500 text-white">
          <h2 className="text-lg font-semibold">Your Cart</h2>

          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition"
          >
            <span className="material-icons text-white">x</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-pink-50">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <span className="material-icons text-6xl mb-3">
                shopping cart
              </span>
              <p className="text-sm">Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-pink-100"
              >
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Rs {item.price} × {item.quantity}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {/* REMOVE BUTTON */}
                  <button
                    onClick={() => onRemove?.(item.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                  >
                    <span className="material-icons text-md  font-bold">-</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t bg-white p-5 space-y-3 shadow-inner">
          <div className="flex justify-between text-lg">
            <span className="text-gray-600">Total</span>
            <span className="font-bold text-gray-900">Rs {total}</span>
          </div>

          <button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition">
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}
