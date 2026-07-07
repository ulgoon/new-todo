import { Check, Trash2, Undo2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { IconTooltipButton } from '@/components/icon-tooltip-button'
import { formatDateTime } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { Todo } from '@/types/todo'

interface TodoCardProps {
  todo: Todo
  onComplete: (id: string) => void
  onCancel: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoCard({ todo, onComplete, onCancel, onDelete }: TodoCardProps) {
  const isFinished = todo.status === 'completed' || todo.status === 'cancelled'

  return (
    <Card className={cn(isFinished && 'opacity-60')}>
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <span className={cn('truncate', isFinished && 'line-through')}>
            {todo.title}
          </span>
          <div className="flex shrink-0 items-center gap-1">
            {todo.status === 'in_progress' && (
              <IconTooltipButton
                label="완료"
                icon={<Check />}
                onClick={() => onComplete(todo.id)}
              />
            )}
            {todo.status === 'completed' && (
              <IconTooltipButton
                label="취소"
                icon={<Undo2 />}
                onClick={() => onCancel(todo.id)}
              />
            )}
            <IconTooltipButton
              label="삭제"
              icon={<Trash2 />}
              onClick={() => onDelete(todo.id)}
            />
          </div>
        </div>
        {todo.completedAt && (
          <p className="text-xs text-muted-foreground">
            완료: {formatDateTime(todo.completedAt)}
          </p>
        )}
        {todo.cancelledAt && (
          <p className="text-xs text-muted-foreground">
            취소: {formatDateTime(todo.cancelledAt)}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
