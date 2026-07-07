import { useState } from 'react'
import type { Todo } from '@/types/todo'

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([])

  function addTodo(title: string) {
    const trimmedTitle = title.trim()
    if (!trimmedTitle) return

    const now = new Date().toISOString()
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: trimmedTitle,
      status: 'in_progress',
      createdAt: now,
      dueDate: null,
      completedAt: null,
      cancelledAt: null,
      locationAddress: null,
      locationLat: null,
      locationLng: null,
      updatedAt: now,
    }
    setTodos((prev) => [newTodo, ...prev])
  }

  function deleteTodo(id: string) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  function completeTodo(id: string) {
    const now = new Date().toISOString()
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, status: 'completed', completedAt: now, updatedAt: now }
          : todo,
      ),
    )
  }

  function cancelTodo(id: string) {
    const now = new Date().toISOString()
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, status: 'cancelled', cancelledAt: now, updatedAt: now }
          : todo,
      ),
    )
  }

  return { todos, addTodo, deleteTodo, completeTodo, cancelTodo }
}
