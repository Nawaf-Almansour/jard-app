import { useState } from 'react';

const ProductCard = ({ product, language, onQuantityChange, isUrgent, onToggleUrgent }) => {
  const [quantity, setQuantity] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    // قبول الأرقام الصحيحة والعشرية (مثل 1.5، 2.75)
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setQuantity(value);
      onQuantityChange(product.id, value === '' ? 0 : parseFloat(value) || 0);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 ${
      isUrgent ? 'ring-4 ring-yellow-400' : ''
    }`}>
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name[language]}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            const placeholder = e.target.nextElementSibling;
            if (placeholder) placeholder.style.display = 'flex';
          }}
        />
        <div className="absolute inset-0 flex-col items-center justify-center p-4 hidden" style={{display: 'none'}}>
          <svg className="w-16 h-16 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm text-gray-500 text-center font-semibold">{product.name[language]}</p>
        </div>
        {/* Star Button */}
        <button
          onClick={() => onToggleUrgent(product.id)}
          className={`absolute top-2 right-2 w-10 h-10 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center ${
            isUrgent
              ? 'bg-yellow-400 hover:bg-yellow-500 scale-110'
              : 'bg-white hover:bg-gray-100'
          }`}
          title={isUrgent 
            ? (language === 'ar' ? 'منتج ضروري' : 'Essential product')
            : (language === 'ar' ? 'وضع علامة كمنتج ضروري' : 'Mark as essential product')
          }
        >
          <span className={`text-2xl ${isUrgent ? 'animate-pulse' : ''}`}>
            {isUrgent ? '⭐' : '☆'}
          </span>
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-3 text-center">
          {product.name[language]}
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
              {language === 'ar' ? 'الوحدة' : 'Unit'}: {product.unit[language]}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 whitespace-nowrap">
              {language === 'ar' ? 'الكمية' : 'Quantity'}:
            </label>
            <input
              type="text"
              inputMode="decimal"
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
