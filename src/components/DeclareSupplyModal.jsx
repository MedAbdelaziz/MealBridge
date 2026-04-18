import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';

export default function DeclareSupplyModal({ isOpen, onClose }) {
  const declareSupply = useStore(state => state.declareSupply);
  
  const [description, setDescription] = useState('');
  const [portions, setPortions] = useState(10);
  const [hoursAvailable, setHoursAvailable] = useState(4); // Default 4 hours
  const [handover, setHandover] = useState('pickup');

  const handleSubmit = () => {
    if (!description || !portions) return;
    
    declareSupply({
      title: description.substring(0, 30) + '...', // Simple derivation
      description,
      portions,
      hoursAvailable,
      handover,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPRfl1Ea_JY6NiOPIyMxgeDnSue9nm6zDmzQkbabPYoVxnUfKHBx7kW2m3xHZKhMld2LNvN81F-kr9afEPO6j1up1jnqKoC5C1UnLoY6lNApkQTI-ZgYUXwQCxJeR4Ks_Adux9gwoXBKQz0zDOT7TmiaIaJooopfrcI58-xemJDUc39HQ6fHY348deV_T-3x-8HzVyUpjRO7S_XjCcVAEVAvwL4CqxqzjJN3hORJ1ZYfsD0gSGITySFacBHXFYURs6wm6ca7jwwBqd', // Default bakery placeholder
    });
    
    // Reset and close
    setDescription('');
    setPortions(10);
    setHoursAvailable(4);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 font-body text-on-surface">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-[2px]"
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-surface-container-lowest w-full max-w-lg rounded-xl shadow-[0_12px_32px_rgba(25,28,29,0.08)] flex flex-col relative z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-outline-variant/10 flex items-center justify-between bg-surface-container-lowest">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">volunteer_activism</span>
                </div>
                <h2 className="text-xl font-headline font-semibold text-on-surface tracking-tight">List Surplus Food</h2>
              </div>
              <button 
                onClick={onClose}
                className="text-on-surface-variant hover:text-on-surface transition-colors p-2 rounded-full hover:bg-surface-container-low"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-6 overflow-y-auto max-h-[70vh] bg-surface flex flex-col gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-label font-medium text-on-surface-variant uppercase tracking-[0.05em] mb-2">Meal Type &amp; Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-surface-container-lowest border-0 ring-1 ring-outline-variant/20 rounded-lg p-3 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary focus:outline-none transition-shadow resize-none shadow-sm"
                    placeholder="e.g., 2 trays of roasted vegetable lasagna, prepared today..."
                    rows="3"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Portions */}
                  <div>
                    <label className="block text-sm font-label font-medium text-on-surface-variant uppercase tracking-[0.05em] mb-2">Portions</label>
                    <div className="flex items-center bg-surface-container-lowest ring-1 ring-outline-variant/20 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary transition-shadow shadow-sm">
                      <button onClick={() => setPortions(Math.max(1, portions - 1))} className="px-3 py-2 text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface" type="button">
                        <span className="material-symbols-outlined text-[20px]">remove</span>
                      </button>
                      <input 
                        className="w-full text-center border-0 bg-transparent p-2 text-on-surface font-semibold focus:ring-0" 
                        type="number" 
                        value={portions}
                        onChange={(e) => setPortions(parseInt(e.target.value) || 0)}
                      />
                      <button onClick={() => setPortions(portions + 1)} className="px-3 py-2 text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface" type="button">
                        <span className="material-symbols-outlined text-[20px]">add</span>
                      </button>
                    </div>
                  </div>
                  {/* Time */}
                  <div>
                    <label className="block text-sm font-label font-medium text-on-surface-variant uppercase tracking-[0.05em] mb-2">Hours Available</label>
                    <div className="flex items-center bg-surface-container-lowest ring-1 ring-outline-variant/20 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary transition-shadow shadow-sm">
                        <input 
                          className="w-full text-center border-0 bg-transparent p-2 text-on-surface font-semibold focus:ring-0" 
                          type="number" 
                          min="1"
                          value={hoursAvailable}
                          onChange={(e) => setHoursAvailable(parseInt(e.target.value) || 1)}
                        />
                    </div>
                  </div>
                </div>
              </div>

              {/* Handover */}
              <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/10">
                <label className="block text-sm font-label font-medium text-on-surface-variant uppercase tracking-[0.05em] mb-3">Handover Method</label>
                <div className="flex flex-col gap-3">
                  <label className="flex items-center p-3 bg-surface-container-lowest rounded-lg cursor-pointer hover:bg-surface-variant/50 transition-colors border border-outline-variant/20">
                    <input 
                      checked={handover === 'pickup'} 
                      onChange={() => setHandover('pickup')}
                      className="text-primary focus:ring-primary border-outline-variant w-5 h-5" 
                      name="handover" 
                      type="radio" 
                    />
                    <div className="ml-3 flex flex-col">
                      <span className="text-on-surface font-medium">NGO must pick up</span>
                      <span className="text-sm text-on-surface-variant">We'll hold it at our location</span>
                    </div>
                    <span className="material-symbols-outlined ml-auto text-on-surface-variant">storefront</span>
                  </label>
                  <label className="flex items-center p-3 bg-surface-container-lowest rounded-lg cursor-pointer hover:bg-surface-variant/50 transition-colors border border-outline-variant/20">
                    <input 
                      checked={handover === 'deliver'} 
                      onChange={() => setHandover('deliver')}
                      className="text-primary focus:ring-primary border-outline-variant w-5 h-5" 
                      name="handover" 
                      type="radio" 
                    />
                    <div className="ml-3 flex flex-col">
                      <span className="text-on-surface font-medium">We can deliver</span>
                      <span className="text-sm text-on-surface-variant">We'll drop it off to a nearby NGO</span>
                    </div>
                    <span className="material-symbols-outlined ml-auto text-on-surface-variant">local_shipping</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-surface-container-lowest border-t border-outline-variant/10 flex items-center justify-end gap-3 rounded-b-xl">
              <button onClick={onClose} className="px-5 py-2.5 text-primary font-medium text-sm hover:bg-surface-container-low rounded-lg transition-colors focus:outline-none" type="button">
                Cancel
              </button>
              <button 
                onClick={handleSubmit} 
                className="px-6 py-2.5 bg-gradient-to-r from-secondary to-secondary-container text-on-secondary font-medium text-sm rounded-lg hover:opacity-90 transition-opacity focus:outline-none shadow-sm flex items-center gap-2" 
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">publish</span>
                Publish Supply
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
