import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return <div className="flex-center h-[90vh]">
    <SignIn />
  </div>
}