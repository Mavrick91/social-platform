import * as React from 'react';

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <div className="relative h-full grow flex flex-col gap-2">
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <div className="h-full">
          <input
            type={type}
            className={cn(
              'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              error ? 'border-red-500 focus-visible:ring-red-500' : '',
              className
            )}
            ref={ref}
            {...props}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
