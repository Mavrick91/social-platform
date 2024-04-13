import { cn } from '@/lib/utils';
import { UseFormRegister } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';

type BubbleThoughtProps = {
  bubbleText?: string;
  size?: 'small' | 'medium';
  canEdit: boolean;
  register?: UseFormRegister<{ thought: string }>;
  thoughtWatch?: string;
};

const BubbleThought: React.FC<BubbleThoughtProps> = ({
  size = 'medium',
  bubbleText,
  canEdit,
  register,
  thoughtWatch,
}) => {
  const { onChange, ...restRegister } = register?.('thought') ?? {};

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange && (thoughtWatch?.length ?? 0) <= 60) {
      onChange(e);
    }
  };

  const containerClasses = cn(
    'flex items-center z-30 bg-highlight-background justify-center absolute rounded-2xl transform -translate-x-1/2 left-1/2',
    {
      'text-[11px] flex bottom-full translate-y-3 min-h-[35px] p-2':
        size === 'small',
      'text-xl p-4 bottom-full translate-y-8': size === 'medium',
      'translate-y-14': size === 'medium' && !canEdit,
    }
  );

  const bubbleClasses = cn('text-primary-text', {
    'w-max max-w-[80px] line-clamp-3 leading-3': size === 'small',
    'w-max max-w-[230px] block px-4': size === 'medium',
  });

  return (
    <div
      className={containerClasses}
      style={{ boxShadow: '0px 0px 12px 0px rgba(0, 0, 0, 0.25)' }}
    >
      <div className="bg-transparent">
        {bubbleText && canEdit ? (
          <TextareaAutosize
            className="min-w-max block bg-highlight-background focus:outline-none resize-none placeholder:text-secondary"
            placeholder="Share a thought..."
            {...restRegister}
            onChange={handleChangeInput}
            autoFocus
            maxRows={4}
            maxLength={60}
          />
        ) : bubbleText ? (
          <span className={bubbleClasses}>{bubbleText}</span>
        ) : (
          <span className="text-secondary shrink-0">Note...</span>
        )}
      </div>
    </div>
  );
};

export default BubbleThought;
