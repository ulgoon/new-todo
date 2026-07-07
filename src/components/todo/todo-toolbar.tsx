import { Eye, EyeOff } from 'lucide-react'
import { IconTooltipButton } from '@/components/icon-tooltip-button'
import { TodoFilterMenu } from '@/components/todo/todo-filter-menu'
import { TodoSortMenu } from '@/components/todo/todo-sort-menu'
import type { FilterOption, SortOption } from '@/lib/todo-sort-filter'

interface TodoToolbarProps {
  sort: SortOption
  onSortChange: (sort: SortOption) => void
  filter: FilterOption
  onFilterChange: (filter: FilterOption) => void
  showAll: boolean
  onToggleShowAll: () => void
}

export function TodoToolbar({
  sort,
  onSortChange,
  filter,
  onFilterChange,
  showAll,
  onToggleShowAll,
}: TodoToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-2 p-4 pb-0">
      <div className="flex items-center gap-2">
        <TodoSortMenu sort={sort} onSortChange={onSortChange} />
        <TodoFilterMenu filter={filter} onFilterChange={onFilterChange} />
      </div>
      <IconTooltipButton
        label="모두 보기"
        icon={showAll ? <Eye /> : <EyeOff />}
        onClick={onToggleShowAll}
        variant={showAll ? 'default' : 'outline'}
      />
    </div>
  )
}
