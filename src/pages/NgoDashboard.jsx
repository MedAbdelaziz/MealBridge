import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function NgoDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Smart Matches');
  const smartMatches = useStore(state => state.smartMatches);
  const pendingPickups = useStore(state => state.pendingPickups);
  const myRequests = useStore(state => state.myRequests);
  const claimSupply = useStore(state => state.claimSupply);
  const addNotification = useStore(state => state.addNotification);

  const [loadingClaims, setLoadingClaims] = useState({});

  const handleClaim = (id) => {
    setLoadingClaims(prev => ({ ...prev, [id]: true }));
    // Simulate network delay
    setTimeout(() => {
      claimSupply(id);
      setLoadingClaims(prev => ({ ...prev, [id]: false }));
      addNotification("Donation reserved! Check 'Pending Pickups' for details.");
    }, 1500);
  };

  const tabs = ['Smart Matches', 'My Requests', 'Pending Pickups'];

  return (
    <div className="min-h-screen bg-surface flex overflow-hidden font-body">
      {/* Sidebar (Desktop) */}
      <nav className="hidden md:flex bg-zinc-50 flex-col h-screen w-64 fixed left-0 top-0 border-r border-outline-variant/15 py-6 z-40">
        <div className="px-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold">
              O
            </div>
            <div>
              <h1 className="text-lg font-black text-emerald-900 tracking-tighter">MealBridge</h1>
              <p className="text-xs text-secondary font-medium">Verified NGO</p>
            </div>
          </div>
        </div>
        <div className="flex-1 px-4 space-y-2 overflow-y-auto">
          <a className="flex items-center gap-3 px-4 py-3 bg-white text-emerald-900 shadow-sm rounded-lg mx-2 transition-transform group" href="#">
            <span className="material-symbols-outlined icon-fill">dashboard</span>
            <span>Home</span>
          </a>
        </div>
        <div className="px-4 mt-6">
          <button 
            onClick={() => navigate('/create-request')}
            className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary py-3 rounded-lg font-bold shadow-md hover:opacity-90"
          >
            Create Request
          </button>
        </div>
      </nav>

      {/* Main Content Areas */}
      <main className="flex-1 md:ml-64 relative min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 w-full z-30 border-b border-outline-variant/15">
          <div className="flex items-center justify-between px-6 py-4 w-full max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <span className="md:hidden text-xl font-bold tracking-tighter text-emerald-900">MealBridge</span>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6 md:p-8 lg:p-10 max-w-7xl mx-auto w-full space-y-8 overflow-y-auto pb-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-on-surface tracking-tight mb-1">NGO Dashboard</h2>
              <p className="text-on-surface-variant">Manage your inbound supply and coordinate pickups.</p>
            </div>
            <button 
              onClick={() => navigate('/create-request')}
              className="bg-primary text-on-primary px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-primary-container hover:text-on-primary-container transition-colors font-bold"
            >
              <span className="material-symbols-outlined">add</span>
              Create New Request
            </button>
          </div>

          <div className="flex gap-6 border-b border-outline-variant/20 mb-6 w-full overflow-x-auto">
            {tabs.map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 font-semibold whitespace-nowrap transition-colors ${activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-6">
              
              {activeTab === 'Smart Matches' && (
                <>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-on-surface">Available Near You</h3>
                  </div>
                  {smartMatches.map(match => (
                    <div key={match.id} className="bg-surface-container-lowest rounded-lg p-6 flex flex-col sm:flex-row gap-6 items-start relative overflow-hidden shadow-sm border border-outline-variant/10">
                      <div className={`absolute top-0 left-0 w-1 h-full ${match.urgency === 'high' ? 'bg-gradient-to-b from-secondary to-error' : 'bg-primary-container/50'}`}></div>
                      
                      <div className="w-full sm:w-32 h-32 rounded-lg bg-surface-container-high overflow-hidden shrink-0">
                        <img alt={match.title} src={match.image} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-1 flex flex-col h-full justify-between w-full">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-semibold text-on-surface-variant flex items-center gap-1">
                              <span className="material-symbols-outlined text-[16px]">location_on</span>
                              {match.distance} miles away
                            </span>
                            <span className="text-xs font-semibold text-secondary flex items-center gap-1 bg-secondary-container/10 px-2 py-0.5 rounded-full">
                              <span className="material-symbols-outlined text-[16px]">timer</span>
                              Expiry {match.expiresIn}
                            </span>
                          </div>
                          <h4 className="text-lg font-bold text-on-surface leading-tight mb-1">{match.title}</h4>
                          <p className="text-on-surface-variant text-sm">{match.description}</p>
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-surface-tint">inventory</span>
                            <span className="font-semibold text-on-surface">{match.portions}</span>
                          </div>
                          <button 
                            onClick={() => handleClaim(match.id)}
                            disabled={loadingClaims[match.id]}
                            className="bg-surface-container-high text-primary hover:bg-primary-container/20 px-4 py-2 rounded-lg font-medium transition-colors text-sm disabled:opacity-50 disabled:cursor-wait flex flex-row items-center gap-2"
                          >
                            {loadingClaims[match.id] && <span className="material-symbols-outlined animate-spin" style={{ fontSize: '18px' }}>progress_activity</span>}
                            {loadingClaims[match.id] ? 'Claiming...' : 'Claim Supply'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {smartMatches.length === 0 && (
                     <div className="text-center py-10 text-on-surface-variant">No smart matches currently available. Check back soon.</div>
                  )}
                </>
              )}

              {activeTab === 'Pending Pickups' && (
                <div className="space-y-4">
                  {pendingPickups.map(pickup => (
                    <div key={pickup.id} className="bg-surface-container-low rounded-lg p-4 border border-outline-variant/15 flex justify-between items-center">
                      <div>
                        <p className="font-bold text-on-surface">{pickup.title}</p>
                        <p className="text-sm text-on-surface-variant mt-1">{pickup.pickupTime} - {pickup.location}</p>
                      </div>
                      <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
                        Pending
                      </span>
                    </div>
                  ))}
                  {pendingPickups.length === 0 && (
                     <div className="text-center py-10 text-on-surface-variant">No pending pickups.</div>
                  )}
                </div>
              )}

              {activeTab === 'My Requests' && (
                <div className="space-y-4">
                  {myRequests.map(request => (
                    <div key={request.id} className="bg-surface-container-lowest rounded-lg p-5 border border-outline-variant/15">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-lg">{request.category}</h4>
                        <span className="text-sm font-medium text-secondary">{request.urgency}</span>
                      </div>
                      <p className="text-on-surface-variant mt-2 text-sm">Requested: {request.quantity} portions</p>
                    </div>
                  ))}
                  {myRequests.length === 0 && (
                     <div className="text-center py-10 text-on-surface-variant">You haven't made any requests yet.</div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar Widget */}
            <div className="lg:col-span-4 space-y-6 hidden lg:block">
              <div className="bg-primary text-on-primary rounded-xl p-6 shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-sm font-bold text-primary-fixed-dim mb-4 tracking-wider uppercase">Your Impact This Month</h3>
                  <div className="text-5xl font-black mb-1">1,240</div>
                  <p className="text-on-primary-container font-medium mb-6">Meals Diverted</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-primary-fixed-dim">Goal: 2000</span>
                      <span className="font-bold">62%</span>
                    </div>
                    <div className="w-full bg-primary-container/50 rounded-full h-2 overflow-hidden">
                      <div className="bg-primary-fixed h-full rounded-full" style={{ width: '62%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
