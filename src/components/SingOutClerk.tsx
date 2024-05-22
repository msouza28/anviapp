import { SignedIn, UserButton } from '@clerk/clerk-react'

export default function SingOutClerk() {
  return (
    <header style={{ fontSize: '24px' }}>
        <SignedIn >
          <UserButton/>
        </SignedIn>
      </header>
  )
}
