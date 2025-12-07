'use client';

import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { ModeToggle } from './ModeToggle';
import { useConvexAuth } from 'convex/react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();
  return (
    <div className="w-full py-5 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/">
          <h1 className="text-3xl font-bold">
            NextPro <span className="text-blue-500">Blog</span>
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Link className={buttonVariants({ variant: 'ghost' })} href={'/'}>
          <span className="text-lg font-medium">Home</span>
        </Link>
        <Link className={buttonVariants({ variant: 'ghost' })} href={'/blog'}>
          <span className="text-lg font-medium">Blog</span>
        </Link>
        <Link className={buttonVariants({ variant: 'ghost' })} href={'/create'}>
          <span className="text-lg font-medium">Create</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {isLoading ? null : isAuthenticated ? (
          <Button onClick={() => authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                toast.success('Logged out successfully');
                router.push('/');
              },
              onError: (error) => {
                toast.error(error.error.message);
              }
            }
          })}>Logout</Button>
        ) : (
          <>
            <Link
              className={buttonVariants({ variant: 'default' })}
              href={'/auth/login'}
            >
              Login
            </Link>
            <Link
              className={buttonVariants({ variant: 'outline' })}
              href={'/auth/sign-up'}
            >
              Sign Up
            </Link>
          </>
        )}

        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
