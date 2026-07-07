import { ListFilter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { FilterOption } from '@/lib/todo-sort-filter'

const FILTER_LABELS: Record<FilterOption, string> = {
  all: '전체',
  in_progress: '진행중',
  completed: '완료',
  cancelled: '취소',
}

interface TodoFilterMenuProps {
  filter: FilterOption
  onFilterChange: (filter: FilterOption) => void
}

export function TodoFilterMenu({ filter, onFilterChange }: TodoFilterMenuProps) {
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon-sm" aria-label="필터">
              <ListFilter />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>필터: {FILTER_LABELS[filter]}</TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup
          value={filter}
          onValueChange={(value) => onFilterChange(value as FilterOption)}
        >
          {Object.entries(FILTER_LABELS).map(([value, label]) => (
            <DropdownMenuRadioItem key={value} value={value}>
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
