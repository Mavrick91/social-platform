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

  const variants = {
    open: { left: '71px' },
    closed: { left: '-330px' },
  };

  return (
    <motion.div
      ref={ref}
      initial="closed"
      animate="open"
      exit="closed"
      variants={variants}
      transition={{ duration: 0.3 }}
      className="z-10 overflow-hidden shadow-ig border fixed w-[397px] bg-primary-background rounded-tr-2xl flex flex-col rounded-br-2xl h-full border-separator py-2"
    >
      {children}
    </motion.div>
  );
}
