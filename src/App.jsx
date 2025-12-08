import { useState } from 'react';
import ProductCard from './components/ProductCard';
import { productsData } from './data/products';

function App() {
  const [quantities, setQuantities] = useState({});
  const [showReport, setShowReport] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [urgentProducts, setUrgentProducts] = useState({});
  const [language, setLanguage] = useState('ar');

  const handleQuantityChange = (productId, quantity) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: quantity
    }));
  };

  const toggleUrgent = (productId) => {
    setUrgentProducts(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const generateReport = () => {
    const isArabic = language === 'ar';
    let report = isArabic ? '📊 تقرير الجرد\n' : '📊 Inventory Report\n';
    report += '━━━━━━━━━━━━━━━━━━\n\n';
    
    let hasItems = false;
    
    productsData.forEach(category => {
      const categoryItems = category.items.filter(item => quantities[item.id] > 0);
      
      if (categoryItems.length > 0) {
        hasItems = true;
        report += `📦 ${category.category[language]}\n`;
        report += '─────────────\n';
        
        categoryItems.forEach(item => {
          const urgentMark = urgentProducts[item.id] ? ' ⭐' : '';
          report += `• ${item.name[language]}: ${quantities[item.id]} ${item.unit[language]}${urgentMark}\n`;
        });
        
        report += '\n';
      }
    });
    
    if (!hasItems) {
      report += isArabic ? '❌ لا توجد منتجات مجرودة\n' : '❌ No products inventoried\n';
    }
    
    // Add urgent products section
    const urgentList = [];
    productsData.forEach(category => {
      category.items.forEach(item => {
        if (urgentProducts[item.id]) {
          urgentList.push({
            name: item.name[language],
            category: category.category[language],
            quantity: quantities[item.id] || 0,
            unit: item.unit[language]
          });
        }
      });
    });
    
    if (urgentList.length > 0) {
      report += '━━━━━━━━━━━━━━━━━━\n';
      report += isArabic ? '⭐ المنتجات الضرورية للتوفير\n' : '⭐ Essential Products to Stock\n';
      report += '─────────────\n';
      urgentList.forEach(item => {
        report += `• ${item.name} (${item.category})\n`;
        if (item.quantity > 0) {
          const currentQty = isArabic ? 'الكمية الحالية' : 'Current Quantity';
          report += `  ${currentQty}: ${item.quantity} ${item.unit}\n`;
        }
      });
      report += '\n';
    }
    
    report += '━━━━━━━━━━━━━━━━━━\n';
    report += `📅 ${isArabic ? 'التاريخ' : 'Date'}: ${new Date().toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}\n`;
    report += `🕐 ${isArabic ? 'الوقت' : 'Time'}: ${new Date().toLocaleTimeString(isArabic ? 'ar-SA' : 'en-US')}`;
    
    return report;
  };

  const handleGenerateReport = () => {
    setShowReport(true);
  };

  const copyToClipboard = () => {
    const report = generateReport();
    const successMsg = language === 'ar' 
      ? '✅ تم نسخ التقرير! يمكنك الآن لصقه في واتساب'
      : '✅ Report copied! You can now paste it in WhatsApp';
    navigator.clipboard.writeText(report).then(() => {
      alert(successMsg);
    });
  };

  const resetApp = () => {
    setQuantities({});
    setUrgentProducts({});
    setShowReport(false);
  };

  if (showReport) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
              {language === 'ar' ? '📊 تقرير الجرد' : '📊 Inventory Report'}
            </h2>
            
            <div className={`bg-gray-50 rounded-lg p-6 mb-6 font-mono text-sm whitespace-pre-wrap ${language === 'ar' ? 'text-right' : 'text-left'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {generateReport()}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={copyToClipboard}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 text-lg"
              >
                {language === 'ar' ? '📋 نسخ التقرير' : '📋 Copy Report'}
              </button>
              <button
                onClick={resetApp}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 text-lg"
              >
                {language === 'ar' ? '🔄 جرد جديد' : '🔄 New Inventory'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const scrollToSection = (categoryId) => {
    setActiveSection(categoryId);
    const element = document.getElementById(`section-${categoryId}`);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex-1"></div>
            <div className="text-center flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-1">
                {language === 'ar' ? '📦 نظام الجرد' : '📦 Inventory System'}
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                {language === 'ar' ? 'أدخل الكمية المجرودة لكل منتج' : 'Enter the inventoried quantity for each product'}
              </p>
            </div>
            <div className="flex-1 flex justify-end">
              <button
                onClick={() => setLanguage(lang => lang === 'ar' ? 'en' : 'ar')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 text-sm shadow-md"
                title={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
              >
                {language === 'ar' ? '🌐 EN' : '🌐 AR'}
              </button>
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {productsData.map(category => (
              <button
                key={category.id}
                onClick={() => scrollToSection(category.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 whitespace-nowrap ${
                  activeSection === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.category[language]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Products by Category */}
        {productsData.map(category => (
          <div key={category.id} id={`section-${category.id}`} className="mb-12 scroll-mt-32">
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              <h2 className="text-2xl font-bold text-gray-800 text-center">
                {category.category[language]}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {category.items.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  language={language}
                  onQuantityChange={handleQuantityChange}
                  isUrgent={urgentProducts[product.id]}
                  onToggleUrgent={toggleUrgent}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Generate Report Button */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-10">
          <button
            onClick={handleGenerateReport}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-2xl transition-all duration-200 text-xl hover:scale-105"
          >
            {language === 'ar' ? '📄 إنشاء التقرير' : '📄 Generate Report'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
