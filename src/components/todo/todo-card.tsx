import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Todo } from '@/types/todo'

interface TodoCardProps {
  todo: Todo
  onDelete: (id: string) => void
}

export function TodoCard({ todo, onDelete }: TodoCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between gap-2">
        <span className="truncate">{todo.title}</span>
        <Button variant="ghost" size="sm" onClick={() => onDelete(todo.id)}>
          삭제
        </Button>
      </CardContent>
    </Card>
  )
}
