import { useState } from 'react';

const ProductCard = ({ product, onQuantityChange, isUrgent, onToggleUrgent }) => {
  const [quantity, setQuantity] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    // قبول الأرقام فقط
    if (value === '' || /^\d+$/.test(value)) {
      setQuantity(value);
      onQuantityChange(product.id, value === '' ? 0 : parseInt(value));
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 ${
      isUrgent ? 'ring-4 ring-yellow-400' : ''
    }`}>
      <div className="relative h-48 bg-gray-200">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/200?text=صورة';
          }}
        />
        {/* Star Button */}
        <button
          onClick={() => onToggleUrgent(product.id)}
          className={`absolute top-2 right-2 w-10 h-10 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center ${
            isUrgent
              ? 'bg-yellow-400 hover:bg-yellow-500 scale-110'
              : 'bg-white hover:bg-gray-100'
          }`}
          title={isUrgent ? 'منتج ضروري' : 'وضع علامة كمنتج ضروري'}
        >
          <span className={`text-2xl ${isUrgent ? 'animate-pulse' : ''}`}>
            {isUrgent ? '⭐' : '☆'}
          </span>
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-3 text-center">
          {product.name}
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
              الوحدة: {product.unit}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 whitespace-nowrap">
              الكمية:
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={quantity}
              onChange={handleChange}
              placeholder="0"
              className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-center text-lg font-semibold"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
