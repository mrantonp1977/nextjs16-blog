'use client';

import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { ModeToggle } from './ModeToggle';
import { useConvexAuth } from 'convex/react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useRouter, usePathname } from 'next/navigation';

const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();
  const pathname = usePathname();

  const activeClass =
    'underline underline-offset-10 decoration-4 decoration-purple-600 duration-700';

  return (
    <div className="w-full py-5 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/">
          <h1 className="text-4xl font-extrabold text-purple-500">
            NextPro <span className="text-purple-200">Blog</span>
          </h1>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <Link
          className={`${buttonVariants({ variant: 'ghost' })} ${
            pathname === '/' ? activeClass : ''
          }`}
          href="/"
        >
          <span className="text-lg font-medium">Home</span>
        </Link>

        <Link
          className={`${buttonVariants({ variant: 'ghost' })} ${
            pathname.startsWith('/blog') ? activeClass : ''
          }`}
          href="/blog"
        >
          <span className="text-lg font-medium">Blog</span>
        </Link>

        <Link
          className={`${buttonVariants({ variant: 'ghost' })} ${
            pathname === '/create' ? activeClass : ''
          }`}
          href="/create"
        >
          <span className="text-lg font-medium">Create</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {isLoading ? null : isAuthenticated ? (
          <Button
            onClick={() =>
              authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    toast.success('Logged out successfully');
                    router.push('/');
                  },
                  onError: (error) => {
                    toast.error(error.error.message);
                  }
                }
              })
            }
          >
            Logout
          </Button>
        ) : (
          <>
            <Link
              className={buttonVariants({ variant: 'default' })}
              href="/auth/login"
            >
              Login
            </Link>
            <Link
              className={buttonVariants({ variant: 'outline' })}
              href="/auth/sign-up"
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
