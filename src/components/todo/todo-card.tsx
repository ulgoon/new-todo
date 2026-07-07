import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
              <Button variant="ghost" size="sm" onClick={() => onComplete(todo.id)}>
                완료
              </Button>
            )}
            {todo.status === 'completed' && (
              <Button variant="ghost" size="sm" onClick={() => onCancel(todo.id)}>
                취소
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={() => onDelete(todo.id)}>
              삭제
            </Button>
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
