import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AddTodoFabProps {
  onClick: () => void
}

export function AddTodoFab({ onClick }: AddTodoFabProps) {
  return (
    <Button
      size="icon-lg"
      className="fixed right-6 bottom-6 h-14 w-14 rounded-full shadow-lg"
      onClick={onClick}
      title="할 일 추가"
    >
      <Plus className="size-6" />
    </Button>
  )
}
