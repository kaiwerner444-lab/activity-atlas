'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TABS = [
  { href: '/', label: 'Atlas' },
  { href: '/coverage', label: 'Coverage' },
  { href: '/collect', label: 'Collect' },
  { href: '/protocols', label: 'Protocols' },
  { href: '/catalog', label: 'Catalog' },
]

export function TopBar() {
  const pathname = usePathname()
  return (
    <header className="topbar">
      <div className="brand">
        Activity Atlas <span>v0.1 seed</span>
      </div>
      <nav className="tabs">
        {TABS.map((t) => (
          <Link key={t.href} href={t.href} className="tab" data-active={pathname === t.href}>
            {t.label}
          </Link>
        ))}
      </nav>
      <button
        className="searchbtn"
        onClick={() => window.dispatchEvent(new CustomEvent('atlas:search'))}
      >
        <span>Search activities</span>
        <span className="kbd" style={{ marginLeft: 'auto' }}>
          /
        </span>
      </button>
    </header>
  )
}
