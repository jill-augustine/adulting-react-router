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
import {useFetcher, useLoaderData} from 'react-router'
import {type SettingsLoaderData} from "@/settings/loader";
import {DisplayNameInput, PasswordInput, RepeatPasswordInput} from "@/sign-up/components";

type UpdatePasswordProps = {
  fetcher: ReturnType<typeof useFetcher>,
  loading: boolean,
  error?: string,
  userData: { displayName: string },
}

export const UpdateSettingsCard = ({fetcher, loading, error, userData}: UpdatePasswordProps) => {

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Settings</CardTitle>
              <CardDescription>Update your user information below.</CardDescription>
            </CardHeader>
            <CardContent>
              <fetcher.Form method="post">
                <div className="flex flex-col gap-6">
                  <DisplayNameInput defaultValue={userData.displayName}/>
                  <PasswordInput label="Update Password" required={false}/>
                  <RepeatPasswordInput required={false}/>
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Saving...' : 'Save changes'}
                  </Button>
                </div>
              </fetcher.Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
