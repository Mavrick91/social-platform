import { useRegisterUserMutation } from '@/__generated__/graphql';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as z from 'zod';

const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .transform((val) => val.trim()),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .transform((val) => val.trim()),
  username: z
    .string()
    .min(1, 'Username is required')
    .max(30, 'Username must be less than 30 characters')
    .regex(
      /^[a-zA-Z0-9._]+$/,
      'Username can only contain letters, numbers, periods, and underscores'
    )
    .transform((val) => val.trim().toLowerCase()),

  email: z
    .string()
    .email('Invalid email address')
    .transform((val) => val.trim().toLowerCase()),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const [registerUser, { loading, error }] = useRegisterUserMutation();

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      await registerUser({
        variables: {
          createUserInput: data,
        },
      });
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 space-y-4">
      <div className="w-full max-w-sm space-y-4">
        <div className="space-y-2 text-center">
          <div />
          <h1 className="text-3xl font-bold">Register</h1>
        </div>
        {error && (
          <Alert variant="destructive">
            <p>{error.message}</p>
          </Alert>
        )}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Input
                label="First name"
                id="firstName"
                placeholder="John"
                {...register('firstName')}
                error={errors.firstName?.message}
              />
            </div>
            <div className="space-y-2">
              <Input
                label="Last name"
                id="lastName"
                placeholder="Doe"
                {...register('lastName')}
                error={errors.lastName?.message}
              />
            </div>
          </div>
          <Input
            label="Username"
            id="username"
            error={errors.username?.message}
            {...register('username', { required: 'Username is required' })}
          />
          <div className="space-y-2">
            <Input
              label="Email"
              id="email"
              placeholder="johndoe@example.com"
              type="email"
              {...register('email')}
              error={errors.email?.message}
            />
          </div>
          <div className="space-y-2">
            <Input
              label="Password"
              id="password"
              type="password"
              {...register('password')}
              error={errors.password?.message}
            />
          </div>
          <Button loading={loading} className="w-full" type="submit">
            Register
          </Button>
        </form>
        <div className="flex items-center justify-between space-x-2">
          <Link className="text-sm underline" to="/login">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}
