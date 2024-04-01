import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

type Props = {
  previewPicture: string;
};

export default function AccessibilityExpand({ previewPicture }: Props) {
  const { register } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-separator">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-4 w-full flex justify-between items-center"
        type="button"
      >
        <div
          className={cn({
            'font-semibold': isOpen,
          })}
        >
          Accessibility
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown size={16} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-3 text-xs text-zinc-500">
              Alt text describes your photos for people with visual impairments.
              Alt text will be automatically created for your photos or you can
              choose to write your own.
            </div>
            <div>
              <div className="px-3 py-4">
                <div className="flex gap-3 items-center h-11">
                  <img className="size-11 object-cover" src={previewPicture} />
                  <Input
                    placeholder="Write alt text..."
                    className="grow h-full"
                    {...register('altText')}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
