import { cn } from '@/lib/utils';

type Props = {
  loginChoice: 'custom' | 'mocked';
  setLoginChoice: (value: 'custom' | 'mocked') => void;
};

export default function LoginMode({ loginChoice, setLoginChoice }: Props) {
  return (
    <div className="relative flex bg-slate-50 rounded-full items-center h-16 shadow-md">
      <div
        className={cn(
          'bg-white shadow-lg absolute transition-all top-0 w-1/2 h-full z-10 flex-1 flex rounded-full',
          {
            'translate-x-0': loginChoice === 'custom',
            'translate-x-full': loginChoice === 'mocked',
          }
        )}
      />
      <button
        className="flex-1 h-full z-10 font-medium text-lg text-center"
        type="button"
        onClick={() => setLoginChoice('custom')}
      >
        Custom
      </button>
      <button
        className="flex-1 h-full z-10 font-medium text-lg text-center"
        type="button"
        onClick={() => setLoginChoice('mocked')}
      >
        Mocked
      </button>
    </div>
  );
}
