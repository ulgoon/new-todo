import { useMemo, useState } from 'react'
import { AddTodoFab } from '@/components/todo/add-todo-fab'
import { AddTodoModal } from '@/components/todo/add-todo-modal'
import { CenteredTodoInput } from '@/components/todo/centered-todo-input'
import { EditTodoModal } from '@/components/todo/edit-todo-modal'
import { TodoGrid } from '@/components/todo/todo-grid'
import { TodoToolbar } from '@/components/todo/todo-toolbar'
import { useTodos } from '@/hooks/useTodos'
import { isStale } from '@/lib/todo-visibility'
import {
  filterTodos,
  sortTodos,
  type FilterOption,
  type SortOption,
} from '@/lib/todo-sort-filter'
import type { Todo } from '@/types/todo'

function App() {
  const { todos, addTodo, deleteTodo, completeTodo, cancelTodo, updateTodo } = useTodos()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [sort, setSort] = useState<SortOption>('newest')
  const [filter, setFilter] = useState<FilterOption>('all')
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null)

  const visibleTodos = useMemo(() => {
    const unhidden = showAll ? todos : todos.filter((todo) => !isStale(todo))
    return sortTodos(filterTodos(unhidden, filter), sort)
  }, [todos, showAll, filter, sort])

  const editingTodo = todos.find((todo) => todo.id === editingTodoId) ?? null

  if (todos.length === 0) {
    return <CenteredTodoInput onAdd={addTodo} />
  }

  return (
    <>
      <TodoToolbar
        sort={sort}
        onSortChange={setSort}
        filter={filter}
        onFilterChange={setFilter}
        showAll={showAll}
        onToggleShowAll={() => setShowAll((v) => !v)}
      />
      <TodoGrid
        todos={visibleTodos}
        onEdit={(todo: Todo) => setEditingTodoId(todo.id)}
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
      <EditTodoModal
        todo={editingTodo}
        onOpenChange={(open) => !open && setEditingTodoId(null)}
        onSave={updateTodo}
      />
    </>
  )
}

export default App
