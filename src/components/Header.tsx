'use client'
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link"
import BreadCrumbs from "./BreadCrumbs"

function Header() {
    const { user } = useUser()
    console.log(user)
  return (
    <nav className="flex justify-between items-center p-4">
        {
          user && <Link href={'/'} className="text-2xl">{user.firstName}'s Notes</Link>
        }
        <BreadCrumbs/>
        <div>
          <SignedIn>
            <UserButton/>
          </SignedIn>
          <SignedOut>
            <SignInButton/>
          </SignedOut>
        </div>
    </nav>
  )
}

export default Header