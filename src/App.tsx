import { CenteredTodoInput } from '@/components/todo/centered-todo-input'
import { TodoGrid } from '@/components/todo/todo-grid'
import { useTodos } from '@/hooks/useTodos'

function App() {
  const { todos, addTodo, deleteTodo } = useTodos()

  if (todos.length === 0) {
    return <CenteredTodoInput onAdd={addTodo} />
  }

  return <TodoGrid todos={todos} onDelete={deleteTodo} />
}

export default App
