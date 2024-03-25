import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

type Props = {
  displaySmallNav: boolean;
};

export default function SideNavLogo({ displaySmallNav }: Props) {
  return (
    <Link
      to="/dashboard"
      className="flex mb-5 w-full justify-center h-[73px] items-center"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: displaySmallNav ? 1 : 0 }}
        transition={{ delay: 0.2 }}
        className={cn({
          'p-3 w-full text-black flex items-center hover:bg-secondary-button rounded-md hover:scale-[1.1] transition-all':
            displaySmallNav,
        })}
        exit={{ display: 'none' }}
      >
        {displaySmallNav && (
          <div>
            <Instagram />
          </div>
        )}
      </motion.div>
      <motion.div
        className="justify-center text-3xl pt-6 pb-4 h-20 font-semibold whitespace-nowrap"
        style={{
          fontFamily: 'Dancing script',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: displaySmallNav ? 0 : 1 }}
        transition={{ delay: 0.2 }}
      >
        {!displaySmallNav && <span>{`Instagram Clone`}</span>}
      </motion.div>
    </Link>
  );
}
