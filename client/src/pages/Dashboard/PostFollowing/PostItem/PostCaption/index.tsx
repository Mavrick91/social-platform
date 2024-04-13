import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  username: string;
  description?: string | null;
};

export default function PostCaption({ username, description }: Props) {
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
    <div className="mt-2 text-sm text-primary-text">
      <div className="font-semibold whitespace-nowrap float-left mr-1">
        <Link to={`/${username}`}>{username}</Link>
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
          className="text-secondary text-sm"
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
