// components/WhatsAppButton.jsx
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/923256261008?text=Hi%20Xeuro%20Sports%2C%20I%20am%20interested%20in%20placing%20a%20bulk%20order."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white
                 w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <FaWhatsapp size={28} />
    </motion.a>
  );
}
