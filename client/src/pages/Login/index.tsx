import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen space-y-4 w-full">
      <div className="w-full max-w-sm space-y-4">
        <div className="space-y-2 text-center">
          <div />
          <h1 className="text-3xl font-bold">Login</h1>
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="m@example.com"
              required
              type="email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" required type="password" />
          </div>
          <Button className="w-full" type="submit">
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
