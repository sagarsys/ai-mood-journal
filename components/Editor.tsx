'use client'
import type { Analysis as AnalysisType } from '@/prisma/generated/client'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'
import { updateEntry } from '@/utils/api'
import Analysis from '@/components/Analysis'
import type { JournalEntryWithAnalysis } from '@/app/journal/[id]/page'

type Props = {
  entry: JournalEntryWithAnalysis
}

const Editor = ({ entry }: Props) => {
  const [value, setValue] = useState<string>(entry.content)
  const [analysis, setAnalysis] = useState<AnalysisType|null>(entry.analysis )
  const [isSaving, setIsSaving] = useState<boolean>(false)

  useAutosave({
    data: value,
    onSave: async (data) => {
      setIsSaving(true)
      const { analysis: updatedAnalysis } = await updateEntry(entry.id, data)
      setAnalysis(updatedAnalysis)
      setIsSaving(false)
    }
  })

  return (
    <div className="h-full w-full py-4 grid grid-cols-3 gap-4">
      <div className="col-span-2">
        {isSaving && <div className="absolute top-0 left-0 w-full bg-background opacity-75 z-10 flex justify-center items-center">Saving...</div>}
        <textarea
          name="content"
          className="w-full h-full p-8 text-xl border"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="col-span-1 border-x border-b mb-4">
        <Analysis analysis={analysis} />
      </div>
    </div>
  )
}

export default Editor