import { Input } from '@/components/ui/input';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

type FormData = {
  email: string;
  password: string;
};

type Props = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
};

export default function LoginForm({ register, errors }: Props) {
  return (
    <>
      <div className="space-y-2">
        <Input
          {...register('email')}
          label="Email"
          error={errors.email?.message}
          id="email"
          placeholder="m@example.com"
          type="email"
        />
      </div>
      <div className="space-y-2">
        <Input
          id="password"
          required
          type="password"
          {...register('password')}
          label="Password"
          error={errors.password?.message}
          placeholder="********"
        />
      </div>
    </>
  );
}
