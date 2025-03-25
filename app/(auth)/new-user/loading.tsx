import LoaderSpinner from '@/components/ui/loader-spinner'

export default function Loading() {
  return (
    <div className="h-full flex-center ">
      <LoaderSpinner size="2xl" color="secondary" />
    </div>
  )
}
