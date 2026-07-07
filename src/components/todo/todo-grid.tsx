import { TodoCard } from '@/components/todo/todo-card'
import type { Todo } from '@/types/todo'

interface TodoGridProps {
  todos: Todo[]
  onComplete: (id: string) => void
  onCancel: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoGrid({ todos, onComplete, onCancel, onDelete }: TodoGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onComplete={onComplete}
          onCancel={onCancel}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
