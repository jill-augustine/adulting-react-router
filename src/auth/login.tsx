import * as z from "zod"
import {Button} from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {type ActionFunctionArgs, Link, redirect, useFetcher} from 'react-router'
import {
  browserClient as supabase,
  VITE_SUPABASE_TEST_USER_EMAIL as testUserEmail,
  VITE_SUPABASE_TEST_USER_PASSWORD as testUserPassword,
} from "@/lib/client";

export const loginAction = async ({request}: ActionFunctionArgs) => {
  const loginFormSchema = z.object({
    email: z.email(),
    password: z.string(),
  })
  const formData = await request.formData()
  let email: string
  let password: string
  if (formData.has('is-test-user')) {
    email = testUserEmail
    password = testUserPassword
  } else {
    const parsedFormData = parseLoginForm(formData)
    email = parsedFormData.email
    password = parsedFormData.password
  }
  const {error} = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return {
      error: error?.message ?? 'An error occurred',
    }
  }

  // Update this route to redirect to an authenticated route. The user already has an active session.
  return redirect('/protected')
}

const loginFormSchema = z.object({
  email: z.email(),
  password: z.string(),
});
type LoginFormData = z.infer<typeof loginFormSchema>

const parseLoginForm = (formData: FormData): LoginFormData => {
  const {data: parsedFormData, error} = loginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })
  if (error) throw error
  return parsedFormData
}


export default function Login() {
  const fetcher = useFetcher<typeof loginAction>()
  const error = fetcher.data?.error
  const loading = fetcher.state === 'submitting'

  const testUserFetcher = useFetcher<typeof loginAction>({key: "login-test-user"})
  const testUserError = testUserFetcher.data?.error
  const testUserLoading = testUserFetcher.state === 'loading'

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
  )
}