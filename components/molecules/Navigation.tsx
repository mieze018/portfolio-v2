import Link from 'next/link'

export const Navigation = () => (
  <nav className="flex gap-2">
    <Link href="/">index</Link>
    <Link href="/personal_work">personal_work</Link>
    <Link href="/commissioned_work">commissioned_work</Link>
    <Link href="/info">info</Link>
  </nav>
)
