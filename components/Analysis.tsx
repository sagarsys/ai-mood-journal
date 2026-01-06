'use client'
import type { Analysis } from '@/prisma/generated/client'

type Props = {
  analysis: Analysis | null
}

const Analysis = ({ analysis }: Props) => {
  if (!analysis) return null;

  const { mood, summary, color, subject, negative } = analysis;
  const displayed = [
    { name: 'Subject', value: subject },
    { name: 'Summary', value: summary },
    { name: 'Negative', value: negative ? 'Yes' : 'No' },
    { name: 'Mood', value: mood, className: `text-center pt-4 font-semibold text-${negative ? 'white' : 'black'}`, style: { background: color } },
  ]

  return (
    <>
      <div className="bg-slate-900 px-4 py-8 font-bold text-center">
        <h2 className="uppercase">Analysis</h2>
      </div>
      <div className="border-b px-4 py-8">
        <ul>
          {displayed.map(({ name, value, className, style }) => (
            <li key={name} className={`pb-4 mb-4 border-b leading-5 ${className}`} style={style}>
              <span className="mr-2 text-lg font-semibold">{name}:</span>{value}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Analysis