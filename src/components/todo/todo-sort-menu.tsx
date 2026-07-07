import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { SortOption } from '@/lib/todo-sort-filter'

const SORT_LABELS: Record<SortOption, string> = {
  newest: '최근순',
  oldest: '오래된순',
  title: '할 일 제목순',
}

interface TodoSortMenuProps {
  sort: SortOption
  onSortChange: (sort: SortOption) => void
}

export function TodoSortMenu({ sort, onSortChange }: TodoSortMenuProps) {
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon-sm" aria-label="정렬">
              <ArrowUpDown />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>정렬: {SORT_LABELS[sort]}</TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup
          value={sort}
          onValueChange={(value) => onSortChange(value as SortOption)}
        >
          {Object.entries(SORT_LABELS).map(([value, label]) => (
            <DropdownMenuRadioItem key={value} value={value}>
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
