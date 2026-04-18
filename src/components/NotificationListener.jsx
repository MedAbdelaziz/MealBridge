import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';

export default function NotificationListener() {
  const notifications = useStore(state => state.notifications);
  const removeNotification = useStore(state => state.removeNotification);

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        removeNotification(notifications[0].id);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notifications, removeNotification]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {notifications.map(notif => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="bg-surface-container-lowest border border-primary/20 shadow-[0_8px_24px_rgba(25,28,29,0.12)] rounded-lg p-4 flex items-start gap-4 max-w-sm w-full"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-[20px] icon-fill">notifications_active</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-on-surface mb-0.5">New Update</p>
              <p className="text-sm text-on-surface-variant font-medium">{notif.msg}</p>
            </div>
            <button 
              onClick={() => removeNotification(notif.id)}
              className="text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
