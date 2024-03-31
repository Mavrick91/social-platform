import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

type Props = {
  firstName: string;
  lastName: string;
  description?: string | null;
};

export default function PostCaption({
  firstName,
  lastName,
  description,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);

  const descriptionRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (descriptionRef.current) {
      const lineHeight = parseFloat(
        getComputedStyle(descriptionRef.current).lineHeight
      );

      if (descriptionRef.current) {
        const lines = descriptionRef.current.scrollHeight / lineHeight;

        setCanExpand(lines >= 2);
      }
    }
  }, [description]);

  if (!description) {
    return null;
  }

  return (
    <div className="mt-2 text-sm">
      <div className="font-semibold whitespace-nowrap float-left mr-1">
        {firstName} {lastName}
      </div>
      <p
        ref={descriptionRef}
        className={cn({
          'line-clamp-1 w-3/5': !isExpanded,
        })}
      >
        {description}
      </p>
      {canExpand && (
        <button
          className="text-zinc-500 text-sm"
          onClick={() => {
            setIsExpanded(!isExpanded);
            setCanExpand(false);
          }}
        >
          More
        </button>
      )}
    </div>
  );
}
