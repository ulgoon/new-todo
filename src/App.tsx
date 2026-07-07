import { useState } from 'react'
import { AddTodoFab } from '@/components/todo/add-todo-fab'
import { AddTodoModal } from '@/components/todo/add-todo-modal'
import { CenteredTodoInput } from '@/components/todo/centered-todo-input'
import { TodoGrid } from '@/components/todo/todo-grid'
import { useTodos } from '@/hooks/useTodos'

function App() {
  const { todos, addTodo, deleteTodo, completeTodo, cancelTodo } = useTodos()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  if (todos.length === 0) {
    return <CenteredTodoInput onAdd={addTodo} />
  }

  return (
    <>
      <TodoGrid
        todos={todos}
        onComplete={completeTodo}
        onCancel={cancelTodo}
        onDelete={deleteTodo}
      />
      <AddTodoFab onClick={() => setIsAddModalOpen(true)} />
      <AddTodoModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onAdd={addTodo}
      />
    </>
  )
}

export default App
