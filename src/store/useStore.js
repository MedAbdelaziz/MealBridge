import { create } from 'zustand';

// Mock initial data based on UI designs
const initialActiveSupplies = [
  {
    id: 's1',
    title: 'Assorted Pastries',
    status: 'pending',
    portions: 20,
    expiresIn: '1h',
    expiresAtDate: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPRfl1Ea_JY6NiOPIyMxgeDnSue9nm6zDmzQkbabPYoVxnUfKHBx7kW2m3xHZKhMld2LNvN81F-kr9afEPO6j1up1jnqKoC5C1UnLoY6lNApkQTI-ZgYUXwQCxJeR4Ks_Adux9gwoXBKQz0zDOT7TmiaIaJooopfrcI58-xemJDUc39HQ6fHY348deV_T-3x-8HzVyUpjRO7S_XjCcVAEVAvwL4CqxqzjJN3hORJ1ZYfsD0gSGITySFacBHXFYURs6wm6ca7jwwBqd'
  },
  {
    id: 's2',
    title: 'Vegetable Curry',
    status: 'matched',
    portions: 15,
    expiresIn: '3h',
    expiresAtDate: new Date(Date.now() + 1000 * 60 * 60 * 3).toISOString(),
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0Y8M2yPFmFXd6nJfIkuW97xveLNn8uMZNsWKom6-YdK9fmPFiVXGXxReinFn16zblW6mgBEduO-yG05vomsDywA8SSLoiSJynn2zAa70a_LnzAS87ajYGmb5ZB7ARivTfAq9MqfsN1Xll8z6CIXjQFMxnxXnGsWCOnXaVgPGftH6caSRAfXMgvPzPyPt2rU5rqfq-Q8Pca4r9bmP79iWYV0CfANIOSThQbxxi9qsFjkE2k5LHI1Uv9v_EIxU09daa-8wv7-lrhprS'
  }
];

const initialSmartMatches = [
  {
    id: 'm1',
    title: 'Hotel Grand - Continental Breakfast',
    description: 'Includes assorted pastries, fresh fruit bowls, and yogurt parfaits.',
    distance: 1.2,
    expiresIn: '2h',
    portions: 30,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHvYYiGhO8e6oQn2drF7G_uNa_UNdQ_Gy39Agudm_3elG-4hiIPhipaJ1eYwVPHT2WJFT8vimkHhQXY5EeC_nNfe5DgWLiSabQP4rq2Q-knsX2h7YHgTyBwOkOm8TpFTQXIcM6WyCw6-IT1eCHXSdOa8cjOfXpOMnTyNuVtupTcxlBhvnrc3xsP8a0MmpGIRZFkhunp14Kyg6MUSYGb_RQZMJG-MX4i2Z57eHC7zFC1F3vnvwMTuo7Bh9ek-A6zEKYoUWp_kgs1dEb',
    urgency: 'high'
  },
  {
    id: 'm2',
    title: 'Fresh Valley Market - Mixed Produce',
    description: 'Slightly bruised apples, excess carrots, and leafy greens.',
    distance: 3.5,
    expiresIn: 'Tomorrow',
    portions: '~45 lbs',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAc2Ra5i7gz7NEPrq7pb-OIDalzk3zmqsFG8Q8hI6lDokJtvxw-NtsfDJHiwT7XOIfZQdmbhQwdeAmODCt-NN9a_IhXss-hMzf1CfI6qqHwgZ7MqQh2DaDKugcf-A8kJZJ6vItHxVtmd3ltgZUHHADjuAjaCqwF6PHmw5Kj7KvTkjAf6JXZ4EVeAio_v1CdkclYVK717HIfToF7M6flV59gle1Wn4TiipLurw8IE-mhWH45Hosa6_S14YAAOhkkP0H2B7ANiYLVPaom',
    urgency: 'normal'
  }
];

export const useStore = create((set, get) => ({
  // Auth state
  userRole: null, // "donor" or "ngo"
  setUserRole: (role) => set({ userRole: role }),

  // Donor state
  activeSupplies: initialActiveSupplies,
  declareSupply: (supply) =>
    set((state) => ({
      activeSupplies: [
        {
          ...supply,
          id: `s${Date.now()}`,
          status: 'pending',
          expiresAtDate: new Date(Date.now() + 1000 * 60 * 60 * supply.hoursAvailable).toISOString(), // Mock adding X hours
        },
        ...state.activeSupplies,
      ],
    })),

  // NGO state
  smartMatches: initialSmartMatches,
  pendingPickups: [
    {
      id: 'p1',
      title: 'Bakery Surplus - City Center',
      pickupTime: 'Today, 4:00 PM',
      location: 'City Center'
    }
  ],
  myRequests: [],
  claimSupply: (id) =>
    set((state) => {
      const match = state.smartMatches.find(m => m.id === id);
      if (!match) return state;

      return {
        smartMatches: state.smartMatches.filter(m => m.id !== id),
        pendingPickups: [
          ...state.pendingPickups,
          {
            id: `claim-${Date.now()}`,
            title: match.title,
            pickupTime: 'Today, ASAP',
            location: 'Nearby'
          }
        ]
      }
    }),
  createRequest: (request) => set((state) => ({
    myRequests: [
      { id: `req-${Date.now()}`, ...request },
      ...state.myRequests
    ]
  })),

  // Notifications
  notifications: [],
  addNotification: (msg) => set(state => ({
    notifications: [...state.notifications, { id: Date.now(), msg }]
  })),
  removeNotification: (id) => set(state => ({
    notifications: state.notifications.filter(n => n.id !== id)
  }))
}));
