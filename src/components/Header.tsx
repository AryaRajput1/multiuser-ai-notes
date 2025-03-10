'use client'
import { SignedIn, SignedOut, SignInButton, SignOutButton, useUser } from "@clerk/nextjs"

function Header() {
    const { user } = useUser()
    console.log(user)
  return (
    <nav className="flex justify-between items-center p-4">
        {
          user && <h1 className="text-2xl"> {user.firstName} 's Notes</h1>
        }
        {/* Breacrumbs */}
        <div>
          <SignedIn>
            <SignOutButton/>
          </SignedIn>
          <SignedOut>
            <SignInButton/>
          </SignedOut>
        </div>
    </nav>
  )
}

export default Header