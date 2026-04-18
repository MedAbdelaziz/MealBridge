import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';

const getSuggestedQuantity = async () => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(120);
    }, 1500);
  });
};

export default function NewRequestNgo() {
  const navigate = useNavigate();
  const createRequest = useStore(state => state.createRequest);

  const [quantity, setQuantity] = useState('');
  const [suggestion, setSuggestion] = useState(null);
  const [suggestionStatus, setSuggestionStatus] = useState('loading'); // loading, available, applied, manual_override
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    let isMounted = true;
    getSuggestedQuantity().then((val) => {
      if (isMounted) {
        setSuggestion(val);
        setSuggestionStatus('available');
      }
    });
    return () => { isMounted = false; };
  }, []);

  const handleApplySuggestion = () => {
    if (suggestion) {
      setQuantity(suggestion);
      setSuggestionStatus('applied');
      setPulseKey(prev => prev + 1); // Trigger animation on input
    }
  };

  const handleQuantityChange = (e) => {
    const val = e.target.value;
    setQuantity(val);
    if (suggestionStatus === 'applied' && parseInt(val, 10) !== suggestion) {
      setSuggestionStatus('manual_override');
    }
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (!quantity) return;
    
    createRequest({
      category: 'Hot Prepared Meals',
      quantity: parseInt(quantity, 10),
      urgency: 'Standard'
    });
    navigate('/ngo');
  };

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 font-body h-screen overflow-y-auto bg-surface-container-low text-on-surface antialiased">
      <div className="mb-8">
        <button 
          onClick={() => navigate('/ngo')}
          className="group flex items-center gap-2 text-primary hover:text-primary-container transition-colors mb-6 text-sm font-medium font-label" 
          type="button"
        >
          <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>
          Back to Dashboard
        </button>
        <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tight text-on-surface">Create New Request</h1>
        <p className="text-on-surface-variant mt-2 text-base font-body max-w-xl">Let donors know what your community needs today.</p>
      </div>

      <div className="bg-surface-container-lowest rounded-xl shadow-[0_12px_32px_rgba(25,28,29,0.04)] overflow-hidden">
        <form onSubmit={handlePublish} className="p-6 md:p-10 space-y-12">
          {/* Section 1 */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold font-headline text-on-surface tracking-tight">1. What do you need?</h2>
            
            <div className="space-y-4">
              <label className="block text-sm font-semibold font-label text-on-surface-variant uppercase tracking-wider">Meal Category</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="relative bg-surface-container-lowest border-2 border-primary rounded-lg p-4 flex flex-col items-center justify-center gap-3 cursor-pointer text-center group">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-xl icon-fill" >set_meal</span>
                  </div>
                  <span className="text-sm font-medium text-on-surface leading-tight">Hot Prepared<br/>Meals</span>
                  <div className="absolute top-2 right-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-primary text-[12px] font-bold">check</span>
                  </div>
                </div>
                {/* Other standard items... */}
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold font-headline text-on-surface tracking-tight">2. How much do you need?</h2>
            
            <AnimatePresence mode="wait">
              {suggestionStatus !== 'manual_override' && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-surface-variant/40 border border-tertiary-fixed/40 rounded-xl p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
                >
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center shrink-0">
                      {suggestionStatus === 'loading' ? (
                        <motion.span 
                          animate={{ rotate: 360 }} 
                          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                          className="material-symbols-outlined text-on-tertiary-fixed icon-fill"
                        >sync</motion.span>
                      ) : (
                        <span className="material-symbols-outlined text-on-tertiary-fixed icon-fill">auto_awesome</span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-on-surface mb-1">
                        {suggestionStatus === 'loading' ? 'Analyzing historic data...' : 'Smart Estimate'}
                      </h3>
                      {suggestionStatus !== 'loading' && (
                        <p className="text-sm text-on-surface-variant leading-relaxed">
                          You typically need <span className="font-bold text-on-surface">{suggestion} meals</span> on Friday evenings based on your historical distribution.
                        </p>
                      )}
                    </div>
                  </div>
                  {suggestionStatus === 'available' && (
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleApplySuggestion}
                      type="button"
                      className="shrink-0 px-4 py-2 bg-surface-container-lowest text-primary text-sm font-bold rounded-lg shadow-sm hover:shadow transition-all border border-outline-variant/20 whitespace-nowrap"
                    >
                      Use Estimate
                    </motion.button>
                  )}
                  {suggestionStatus === 'applied' && (
                     <span className="text-primary text-sm font-bold flex items-center gap-1">
                       <span className="material-symbols-outlined text-[18px]">check_circle</span> Applied
                     </span>
                  )}
                </motion.div>
              )}

              {suggestionStatus === 'manual_override' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-surface-container/50 border border-outline-variant/20 rounded-xl p-3 flex items-center gap-3"
                >
                  <span className="material-symbols-outlined text-on-surface-variant">edit</span>
                  <span className="text-sm text-on-surface-variant">Manual entry detected. Smart estimate was {suggestion}.</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col items-center justify-center py-6 bg-surface-container-low/50 rounded-xl border border-outline-variant/15">
              <label className="text-sm font-semibold font-label text-on-surface-variant uppercase tracking-wider mb-6">Target Quantity (Meals/Portions)</label>
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, (parseInt(prev, 10) || 0) - 1))}
                  className="w-14 h-14 rounded-full bg-surface-container-lowest shadow-sm border border-outline-variant/20 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors focus:outline-none" 
                  type="button"
                >
                  <span className="material-symbols-outlined text-2xl">remove</span>
                </button>
                <div className="relative w-32">
                  <motion.input 
                    key={pulseKey}
                    initial={pulseKey > 0 ? { scale: 1.2, color: '#154212' } : { scale: 1 }}
                    animate={{ scale: 1, color: '#191c1d' }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    aria-label="Target Quantity" 
                    className="w-full bg-transparent text-center text-5xl font-bold font-headline text-on-surface border-b-2 border-outline-variant/30 focus:border-primary focus:outline-none focus:ring-0 pb-2 px-0 transition-colors" 
                    type="number" 
                    value={quantity}
                    onChange={handleQuantityChange}
                    placeholder="0"
                  />
                </div>
                <button 
                  onClick={() => setQuantity(prev => (parseInt(prev, 10) || 0) + 1)}
                  className="w-14 h-14 rounded-full bg-surface-container-lowest shadow-sm border border-outline-variant/20 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors focus:outline-none" 
                  type="button"
                >
                  <span className="material-symbols-outlined text-2xl">add</span>
                </button>
              </div>
            </div>
          </section>

          <div className="pt-8 mt-4 border-t border-outline-variant/15 flex flex-col-reverse sm:flex-row justify-end items-center gap-4">
            <button 
              onClick={() => navigate('/ngo')}
              className="w-full sm:w-auto px-6 py-3 text-sm font-bold text-primary hover:bg-primary/5 rounded-lg transition-colors" 
              type="button"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={!quantity}
              className="w-full sm:w-auto px-8 py-3 text-sm font-bold text-on-primary bg-gradient-to-r from-primary to-primary-container rounded-lg shadow-[0_4px_12px_rgba(21,66,18,0.2)] hover:shadow-[0_6px_16px_rgba(21,66,18,0.3)] transition-all disabled:opacity-50"
            >
              Publish Request
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
