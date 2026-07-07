import { Plus } from 'lucide-react'
import { IconTooltipButton } from '@/components/icon-tooltip-button'

interface AddTodoFabProps {
  onClick: () => void
}

export function AddTodoFab({ onClick }: AddTodoFabProps) {
  return (
    <IconTooltipButton
      label="할 일 추가"
      icon={<Plus className="size-6" />}
      onClick={onClick}
      variant="default"
      size="icon-lg"
      className="fixed right-6 bottom-6 h-14 w-14 rounded-full shadow-lg"
    />
  )
}
