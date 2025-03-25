import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return <div className="h-full flex-center">
    <SignIn />
  </div>
}