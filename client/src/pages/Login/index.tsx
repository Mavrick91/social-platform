import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLoginMutation } from '@/generated/graphql.tsx';
import { Link } from 'react-router-dom';
import { Alert } from '@/components/ui/alert.tsx';
import { loginAction, setUserInfo } from '@/features/users/userSlice.ts';
import { useAppDispatch } from '@/store/hooks.ts';
import { jwtDecode } from 'jwt-decode';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password must not be empty'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function Login() {
  const dispatch = useAppDispatch();

  const [login, { loading, error }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await login({ variables: data });

      if (response.data?.login) {
        dispatch(loginAction(response.data.login));
        dispatch(setUserInfo(jwtDecode(response.data.login.accessToken)));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen space-y-4 w-full">
      <div className="w-full max-w-sm space-y-4">
        <div className="space-y-2 text-center">
          <div />
          <h1 className="text-3xl font-bold">Login</h1>
        </div>
        {error && (
          <Alert variant="destructive">
            <p>Login failed. Please try again.</p>
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          <Button className="w-full" type="submit" loading={loading}>
            Login
          </Button>
        </form>
        <div className="flex items-center">
          <Link className="text-sm underline ml-auto" to="/register">
            Sign up
          </Link>
        </div>
      </div>
    </main>
  );
}
