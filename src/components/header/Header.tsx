import { Logo } from '@/components/icons'
import * as React from 'react'

export function Header() {
  return (
    <header className="border-b bg-gray-950/95">
      <div className="flex h-14 items-center gap-4 px-6">
        <h1 className="text-xl font-semibold text-white">
          <Logo />
        </h1>
      </div>
    </header>
  )
}
