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

  return { todos, addTodo, deleteTodo }
}
