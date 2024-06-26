import { useLoginMutation } from '@/__generated__/graphql';
import { Alert } from '@/components/ui/alert.tsx';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import LoginForm from './LoginForm';
import LoginMode from './LoginMode';
import MockedForm from './MockedForm';
import { saveTokens, saveUser } from '@/lib/storage';

const loginSchema = z.object({
  email: z
    .string()
    .email()
    .transform((val) => val.trim().toLowerCase()),
  password: z.string().min(1, 'Password must not be empty'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function Login() {
  const [loginChoice, setLoginChoice] = useState<'custom' | 'mocked'>('custom');
  const [login, { loading, error }] = useLoginMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await login({ variables: data });

      if (response.data?.login) {
        const { accessToken, refreshToken } = response.data.login;
        saveTokens(accessToken, refreshToken);
        saveUser(jwtDecode(accessToken));
        navigate('/');
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
        <LoginMode setLoginChoice={setLoginChoice} loginChoice={loginChoice} />
        {error && (
          <Alert id="error-message" variant="destructive">
            <p>{error.message}</p>
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            {loginChoice === 'mocked' ? (
              <MockedForm setValue={setValue} />
            ) : (
              <LoginForm register={register} errors={errors} />
            )}
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
