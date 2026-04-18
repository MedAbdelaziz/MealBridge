import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function SignUp() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const setUserRole = useStore(state => state.setUserRole);
  const navigate = useNavigate();

  const validateEmail = (val) => {
    setEmail(val);
    if (!val) {
      setEmailError('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (val) => {
    setPassword(val);
    if (!val) {
      setPasswordError('Password is required');
    } else if (val.length < 8) {
      setPasswordError('Must be at least 8 characters');
    } else if (!/[A-Z]/.test(val) || !/[0-9]/.test(val)) {
      setPasswordError('Must contain a number and uppercase letter');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedRole || emailError || passwordError || !email || !password) return;
    
    setUserRole(selectedRole);
    if (selectedRole === 'donor') {
      navigate('/donor');
    } else {
      navigate('/ngo');
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_12px_32px_rgba(25,28,29,0.04)] ring-1 ring-outline-variant/15 min-h-[700px] mt-10">
      {/* Left Image Section */}
      <div className="hidden md:flex w-1/2 relative bg-surface-container-low">
        <img
          alt="Growth and sustainability"
          className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-multiply"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuN8Ubq79Kzc713lpqG6WakL71jRS_AM23sMeK8GMG8lJ1Rz0rFG6p3GEm0L8dvkUUMyhydqV1_XUakX1kBHYvT5tgU80NWl8v74MCSnw4e-LBKwnh2s66sch8u0O0ZRqcj1NFP1BQHW6UEHwmgZC6kB8WarTwNKugBRFK3fr-g7fjmCw3jy4bSRkjSk0g33L7dSlRFf9GInYGhLn4XV-U8kg4TiBEMyCP9E8jxTSla0tuyvudRHowXzbUCJxfO1acDoo_vgFEDbC0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
        <div className="absolute bottom-12 left-12 right-12 text-on-primary">
          <h2 className="text-3xl font-headline font-bold mb-4 tracking-tight">Join the movement.</h2>
          <p className="text-lg font-body text-primary-fixed-dim leading-relaxed">
            Connect surplus food with communities in need. Every account created is a step towards zero waste.
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-surface-container-lowest">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-headline font-bold text-on-surface mb-2 tracking-tight">Create Account</h1>
          <p className="text-on-surface-variant font-body">Sign up to start sharing or receiving resources.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Role Selector */}
          <div aria-label="Role selection" className="bg-surface-container-low p-1.5 rounded-lg flex space-x-1 mb-8" role="group">
            <button
              className={`flex-1 py-2.5 px-4 rounded-md font-medium text-sm transition-all text-center ${selectedRole === 'donor' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
              type="button"
              onClick={() => setSelectedRole('donor')}
            >
              Food Donor
            </button>
            <button
              className={`flex-1 py-2.5 px-4 rounded-md font-medium text-sm transition-all text-center ${selectedRole === 'ngo' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
              type="button"
              onClick={() => setSelectedRole('ngo')}
            >
              NGO / Charity
            </button>
          </div>

          {/* Organization Name */}
          <div>
            <label className="block text-sm font-label uppercase tracking-widest text-on-surface-variant mb-2" htmlFor="orgName">Organization Name</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant">domain</span>
              <input className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border-0 ring-1 ring-outline-variant/20 rounded-lg text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" id="orgName" name="orgName" placeholder="e.g. Community Food Bank" type="text" />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-label uppercase tracking-widest text-on-surface-variant mb-2" htmlFor="email">Email Address</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant">mail</span>
              <input 
                className={`w-full pl-10 pr-4 py-3 bg-surface-container-lowest border-0 ring-1 ${emailError ? 'ring-error' : 'ring-outline-variant/20'} rounded-lg text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all`}
                id="email" 
                value={email}
                onChange={(e) => validateEmail(e.target.value)}
                placeholder="hello@organization.org" 
                type="email" 
              />
            </div>
            {emailError && <p className="text-error text-xs mt-1">{emailError}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-label uppercase tracking-widest text-on-surface-variant mb-2" htmlFor="password">Password</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant">lock</span>
              <input 
                className={`w-full pl-10 pr-4 py-3 bg-surface-container-lowest border-0 ring-1 ${passwordError ? 'ring-error' : 'ring-outline-variant/20'} rounded-lg text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all`}
                id="password" 
                value={password}
                onChange={(e) => validatePassword(e.target.value)}
                placeholder="••••••••" 
                type="password" 
              />
            </div>
            {passwordError && <p className="text-error text-xs mt-1">{passwordError}</p>}
          </div>

          {/* Submit Button */}
          <button 
            disabled={!selectedRole || !!emailError || !!passwordError || !email || !password}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-lg font-medium text-base hover:opacity-90 transition-opacity flex justify-center items-center gap-2 mt-8 disabled:opacity-50 disabled:cursor-not-allowed" 
            type="submit"
          >
            Create Account
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-on-surface-variant text-sm">
            Already have an account? 
            <a className="text-primary font-medium hover:underline underline-offset-4 ml-1" href="#">Back to Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}
