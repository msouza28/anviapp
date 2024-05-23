import { SignedIn, UserButton } from '@clerk/clerk-react'

export default function SingOutClerk() {
  return (
    <header style={{ fontSize: '24px', marginLeft:'20px' }}>
        <SignedIn >
          <UserButton/>
        </SignedIn>
      </header>
  )
}
