'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getEntries } from '@/utils/api'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Journal', href: '/journal' },
]

const SideNav =  () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getEntries().then(entries => setEntries(entries))
  })


  return (
    <aside className="absolute w-75 top-0 left-0 h-full border-r px-4 py-12">
      <h3 className=" text-center font-bold pb-2 mb-4 border-b">MOOD JOURNAL</h3>
      <nav>
        <ul>
          {links.map(({ label, href }) => (
            <li key={label} className="py-2 border-b hover:underline">
              <Link href={href}>{label}</Link>
            </li>
          ))}
          {entries?.map(({ id, analysis }) => (
            <li key={id} className="py-2 pl-4 border-b hover:underline truncate capitalize">
              <Link href={`/journal/${id}`}> &gt; {analysis?.subject}</Link>
            </li>
            ))
          }
        </ul>
      </nav>
    </aside>
  )
}

export default SideNav