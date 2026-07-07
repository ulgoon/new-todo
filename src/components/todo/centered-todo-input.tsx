import { TodoInputForm } from '@/components/todo/todo-input-form'

interface CenteredTodoInputProps {
  onAdd: (title: string) => void
}

export function CenteredTodoInput({ onAdd }: CenteredTodoInputProps) {
  return (
    <div className="flex min-h-svh items-center justify-center p-4">
      <div className="w-full max-w-md">
        <TodoInputForm onAdd={onAdd} autoFocus />
      </div>
    </div>
  )
}
