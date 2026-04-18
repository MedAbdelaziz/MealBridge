import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import DeclareSupplyModal from '../components/DeclareSupplyModal';

const CountdownTimer = ({ expiresAtDate }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = new Date(expiresAtDate).getTime();
    
    // Total simulated lifespan of a donation let's say 4 hours to show progress relative
    const totalDuration = 1000 * 60 * 60 * 4; 
    
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = target - now;
      if (difference <= 0) {
        setTimeLeft('Expired');
        setProgress(100);
      } else {
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`Expires in ${hours}h ${minutes}m`);
        
        // Progress bar invert (100% = 0 time left)
        const currentProgress = Math.max(0, Math.min(100, 100 - (difference / totalDuration) * 100));
        setProgress(currentProgress);
      }
    };
    
    calculateTime();
    const timer = setInterval(calculateTime, 60000); // update every minute
    return () => clearInterval(timer);
  }, [expiresAtDate]);

  return (
    <div className="flex flex-col flex-1 gap-1">
      <div className="flex items-center gap-3 w-full">
        <span className={`material-symbols-outlined text-sm ${progress > 75 ? 'text-error' : 'text-primary'}`}>schedule</span>
        <div className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${progress > 75 ? 'bg-gradient-to-r from-secondary-container to-error' : 'bg-gradient-to-r from-primary-container to-primary'}`} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <span className={`text-xs font-bold pl-7 ${progress > 75 ? 'text-error' : 'text-primary'}`}>{timeLeft}</span>
    </div>
  );
};

export default function DonorDashboard() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const activeSupplies = useStore(state => state.activeSupplies);

  return (
    <div className="bg-surface text-on-surface antialiased min-h-screen flex flex-col md:flex-row font-body">
      <nav className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-surface-container-low text-primary z-40 shadow-sm border-r border-outline-variant/15">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold">
              GB
            </div>
            <div>
              <h1 className="text-lg font-black text-primary tracking-tighter">MealBridge</h1>
              <p className="text-xs text-on-surface-variant font-medium">Verified Donor</p>
            </div>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full mb-8 bg-gradient-to-r from-secondary to-secondary-container text-on-secondary py-3 px-4 rounded-lg font-semibold text-sm shadow-[0_4px_12px_rgba(133,83,0,0.15)] hover:shadow-[0_6px_16px_rgba(133,83,0,0.2)] transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined icon-fill">add_circle</span>
            Declare Surplus
          </button>
        </div>
      </nav>

      <main className="flex-1 md:ml-64 pt-8 px-4 md:px-8 pb-24 max-w-7xl mx-auto w-full">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-2">Welcome back, The Green Bistro!</h2>
            <p className="text-on-surface-variant text-base">Here is your impact and current activity for today.</p>
          </div>
        </header>

        {/* Stats Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-surface-container-lowest p-6 rounded-[16px] shadow-sm border border-outline-variant/10 relative overflow-hidden group">
            <p className="text-xs uppercase tracking-[0.05em] text-on-surface-variant font-semibold mb-2">Meals Donated This Month</p>
            <p className="text-4xl font-black text-primary tracking-tighter">1,240</p>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-[16px] shadow-sm border border-outline-variant/10 relative overflow-hidden group">
            <p className="text-xs uppercase tracking-[0.05em] text-on-surface-variant font-semibold mb-2">People Fed</p>
            <p className="text-4xl font-black text-primary tracking-tighter">850</p>
          </div>
          <div className="bg-primary/5 p-6 rounded-[16px] border border-primary/10 relative overflow-hidden group">
            <p className="text-xs uppercase tracking-[0.05em] text-primary font-semibold mb-2">CO2 Saved</p>
            <p className="text-4xl font-black text-primary tracking-tighter">45kg</p>
          </div>
        </section>

        <section className="mb-12">
          <div className="bg-gradient-to-br from-primary to-primary-container rounded-[20px] p-8 md:p-10 text-on-primary shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="relative z-10 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Have extra food today?</h3>
              <p className="text-on-primary/80 max-w-md">Quickly list your surplus items to match with local shelters before they expire.</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="relative z-10 whitespace-nowrap bg-gradient-to-r from-secondary to-secondary-container text-on-secondary px-8 py-4 rounded-[12px] font-bold text-lg shadow-md hover:-translate-y-1 transition-transform flex items-center gap-3"
            >
              <span className="material-symbols-outlined icon-fill">add_shopping_cart</span>
              Declare New Surplus
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-primary">Active Supply</h3>
            </div>
            <div className="space-y-4">
              {activeSupplies.map(supply => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={supply.id} 
                  className="bg-surface-container-lowest p-5 rounded-[16px] shadow-[0_4px_16px_rgba(25,28,29,0.03)] flex flex-col sm:flex-row items-start sm:items-center gap-4 border border-outline-variant/10"
                >
                  <img alt={supply.title} className="w-full sm:w-24 h-32 sm:h-24 rounded-[12px] object-cover shadow-sm" src={supply.image} />
                  <div className="flex-1 w-full mt-2 sm:mt-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="text-lg font-bold text-on-surface truncate pr-2">{supply.title}</h4>
                      <span className={`${supply.status === 'matched' ? 'bg-primary/10 text-primary' : 'bg-surface-container-high text-on-surface-variant'} text-[10px] uppercase tracking-wider font-bold py-1 px-2 rounded-full flex gap-1 items-center`}>
                        {supply.status === 'matched' && <span className="material-symbols-outlined text-[12px] icon-fill">check_circle</span>}
                        {supply.status}
                      </span>
                    </div>
                    <p className="text-on-surface-variant text-sm mb-3">{supply.portions} portions available</p>
                    <CountdownTimer expiresAtDate={supply.expiresAtDate} />
                  </div>
                </motion.div>
              ))}
              {activeSupplies.length === 0 && (
                <div className="text-on-surface-variant">No active supply listed.</div>
              )}
            </div>
          </section>

          <section className="lg:col-span-1 bg-surface-container-low rounded-[20px] p-6 shadow-inner hidden lg:block">
            <h3 className="text-lg font-bold text-primary mb-6">Recent Activity</h3>
            <div className="relative border-l-2 border-outline-variant/20 ml-3 pb-4">
              <div className="relative pl-6 mb-8">
                <span className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-surface-container-lowest border-2 border-primary flex items-center justify-center">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                </span>
                <div className="bg-surface-container-lowest p-4 rounded-[12px] shadow-sm">
                  <p className="text-xs text-on-surface-variant font-medium mb-1">Today, 10:30 AM</p>
                  <p className="text-sm font-semibold text-on-surface">Pickup Completed</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <DeclareSupplyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
