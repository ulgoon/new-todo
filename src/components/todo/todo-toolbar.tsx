import { Eye, EyeOff } from 'lucide-react'
import { IconTooltipButton } from '@/components/icon-tooltip-button'

interface TodoToolbarProps {
  showAll: boolean
  onToggleShowAll: () => void
}

export function TodoToolbar({ showAll, onToggleShowAll }: TodoToolbarProps) {
  return (
    <div className="flex items-center justify-end gap-2 p-4 pb-0">
      <IconTooltipButton
        label="모두 보기"
        icon={showAll ? <Eye /> : <EyeOff />}
        onClick={onToggleShowAll}
        variant={showAll ? 'default' : 'outline'}
      />
    </div>
  )
}
