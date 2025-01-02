import Link from 'next/link'
import { Code2Icon, HomeIcon, BookmarkIcon, BriefcaseIcon, MessageCircleIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Code2Icon className="w-8 h-8 mr-2" />
              <span className="font-bold text-lg">LeetCode Prep</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <NavLink href="/">
              <MessageCircleIcon className="w-4 h-4 mr-2" />
              Questions
            </NavLink>
            <NavLink href="/experiences">
              <BriefcaseIcon className="w-4 h-4 mr-2" />
              Experiences
            </NavLink>
            <NavLink href="/my-saves">
              <BookmarkIcon className="w-4 h-4 mr-2" />
              My Saves
            </NavLink>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <span className="sr-only">Open menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-foreground hover:text-primary transition-colors">
      {children}
    </Link>
  )
}

