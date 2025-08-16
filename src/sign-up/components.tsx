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
import {Link, useFetcher} from 'react-router'

type SignUpCardProps = {
  fetcher: ReturnType<typeof useFetcher>,
  success: boolean,
  error?: string,
  loading: boolean,
}

const SuccessfulSignUpCard = () => {
  return <Card>
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
  </Card>;
}

// For use within `CardContent div.flex-col`
export const DisplayNameInput = ({defaultValue}: { defaultValue?: string }) => {
  return <div className="grid gap-2">
    <Label htmlFor="display-name">Display Name</Label>
    <Input
      id="display-name"
      name="display-name"
      type="text"
      minLength={4}
      maxLength={20}
      defaultValue={defaultValue}
      required
    />
  </div>;
}
export const PasswordInput = ({label, required = true}: { required?: boolean, label?: string }) => {
  return <div className="grid gap-2">
    <div className="flex items-center">
      <Label htmlFor="password">{label ?? "Password"}</Label>
    </div>
    <Input id="password" name="password" type="password" required={required}/>
  </div>;
}
export const RepeatPasswordInput = ({required = true}: { required?: boolean }) => {
  return <div className="grid gap-2">
    <div className="flex items-center">
      <Label htmlFor="repeat-password">Repeat Password</Label>
    </div>
    <Input id="repeat-password" name="repeat-password" type="password" required={required}/>
  </div>;
}
const SignUpFormCard = (
  {error, loading, fetcher}: Omit<SignUpCardProps, "success">
) => {
  return <Card>
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
              required
            />
          </div>
          <DisplayNameInput/>
          <PasswordInput/>
          <RepeatPasswordInput/>
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
  </Card>;
}

export const SignUpCard = ({fetcher, success, error, loading}: SignUpCardProps) => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          {success ? <SuccessfulSignUpCard/> : <SignUpFormCard fetcher={fetcher} error={error} loading={loading}/>}
        </div>
      </div>
    </div>
  )
}