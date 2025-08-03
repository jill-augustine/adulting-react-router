import {Link, useFetcher} from "react-router";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

type LoginCardProps = {
  error?: string;
  loading: boolean;
  fetcher: ReturnType<typeof useFetcher>;
  testUserFetcher: ReturnType<typeof useFetcher>;
  testUserError?: string;
  testUserLoading: boolean;
}

export const LoginCard = ({error, loading, fetcher, testUserError, testUserLoading}: LoginCardProps) => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>Enter your email below to login to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <fetcher.Form method="post">
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        to="/forgot-password"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input id="password" type="password" name="password" required/>
                  </div>
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>
                </div>
              </fetcher.Form>
              <fetcher.Form method="post">
                <div className="grid gap-2">
                  <Input id="is-test-user" type="hidden" name="is-test-user"/>
                </div>
                <div className="flex flex-col gap-6">
                  {testUserError && <p className="text-sm text-red-500">{testUserError}</p>}
                  <Button type="submit" className="w-full" disabled={testUserLoading}>
                    {loading ? 'Logging in as test user...' : 'Login as Test User'}
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{' '}
                  <Link to="/sign-up" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
              </fetcher.Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
