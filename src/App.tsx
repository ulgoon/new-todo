import { CenteredTodoInput } from '@/components/todo/centered-todo-input'
import { useTodos } from '@/hooks/useTodos'

function App() {
  const { todos, addTodo } = useTodos()

  if (todos.length === 0) {
    return <CenteredTodoInput onAdd={addTodo} />
  }

  return (
    <ul className="mx-auto max-w-md space-y-2 p-4">
      {todos.map((todo) => (
        <li key={todo.id} className="rounded-md border p-3">
          {todo.title}
        </li>
      ))}
    </ul>
  )
}

export default App
