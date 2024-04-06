import useClickOutside from '@/hooks/useOnClickOutside';
import { motion } from 'framer-motion';
import { useRef } from 'react';

type Props = {
  children: React.ReactNode;
  toggle: () => void;
};

export default function SideNavOverlay({ children, toggle }: Props) {
  const ref = useRef(null);

  useClickOutside(ref, () => {
    toggle();
  });

  return (
    <motion.div
      ref={ref}
      initial={{ left: '-400px' }}
      animate={{ left: '77px' }}
      exit={{ left: '-400px' }}
      transition={{ duration: 0.5 }}
      className="bg-white z-10 overflow-hidden shadow-2xl border absolute w-[400px] rounded-tr-2xl rounded-br-2xl h-full border-separator py-2"
    >
      {children}
    </motion.div>
  );
}
