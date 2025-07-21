import * as z from 'zod'
import {browserClient as supabase} from '@/lib/client'
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
import {type ActionFunctionArgs, type RouteObject, Link, redirect, useFetcher, useSearchParams} from 'react-router'

export const action = async ({request}: ActionFunctionArgs) => {
  const url = new URL(request.url)
  const origin = url.origin

  const parsedFormData = parseSignUpForm(await request.formData())

  const {error} = await supabase.auth.signUp({
    email: parsedFormData.email,
    password: parsedFormData.password,
    options: {
      emailRedirectTo: `${origin}/protected`,
    },
  })

  if (error) {
    return {error: error.message}
  }

  return redirect('/sign-up?success')
}

const parseSignUpForm = (formData: FormData) => {
  console.log(formData)
  const signUpFormSchema = z.object({
    email: z.email(),
    password: z.string(),
    "repeat-password": z.string(),
  }).refine((data) => data.password === data["repeat-password"], {
    message: "Passwords don't match",
    path: ["repeat-password"], // path of error
  });
  const {data: parsedFormData, error} = signUpFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    "repeat-password": formData.get('repeat-password'),
  })
  if (error) throw error
  return parsedFormData
}

export function SignUp() {
  const fetcher = useFetcher<typeof action>()
  let [searchParams] = useSearchParams()

  const success = !!searchParams.has('success')
  const error = fetcher.data?.error
  const loading = fetcher.state === 'submitting'

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          {success ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Thank you for signing up!</CardTitle>
                <CardDescription>Check your email to confirm</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  You've successfully signed up. Please check your email to confirm your account
                  before signing in.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Sign up</CardTitle>
                <CardDescription>Create a new account</CardDescription>
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
                      </div>
                      <Input id="password" name="password" type="password" required/>
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="repeat-password">Repeat Password</Label>
                      </div>
                      <Input id="repeat-password" name="repeat-password" type="password" required/>
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Creating an account...' : 'Sign up'}
                    </Button>
                  </div>
                  <div className="mt-4 text-center text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="underline underline-offset-4">
                      Login
                    </Link>
                  </div>
                </fetcher.Form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

const route: RouteObject = {
  path: '/sign-up',
  Component: SignUp,
  action: action,
}

export default route