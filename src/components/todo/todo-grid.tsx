import { TodoCard } from '@/components/todo/todo-card'
import type { Todo } from '@/types/todo'

interface TodoGridProps {
  todos: Todo[]
  onEdit: (todo: Todo) => void
  onComplete: (id: string) => void
  onCancel: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoGrid({ todos, onEdit, onComplete, onCancel, onDelete }: TodoGridProps) {
  if (todos.length === 0) {
    return (
      <p className="p-4 text-center text-muted-foreground">
        표시할 항목이 없습니다.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onEdit={onEdit}
          onComplete={onComplete}
          onCancel={onCancel}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
