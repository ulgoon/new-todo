import { useEffect, useRef, useState } from 'react'
import type { Todo } from '@/types/todo'
import { fetchTodos, sendTodoAction } from '@/lib/apps-script-api'
import { loadCachedTodos, saveCachedTodos } from '@/lib/todo-cache'

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => loadCachedTodos())
  const [isLoading, setIsLoading] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const todosRef = useRef(todos)
  useEffect(() => {
    todosRef.current = todos
  }, [todos])

  useEffect(() => {
    let cancelled = false

    fetchTodos()
      .then((fetched) => {
        if (cancelled) return
        setTodos(fetched)
        saveCachedTodos(fetched)
      })
      .catch(() => {
        if (cancelled) return
        setError('할 일 목록을 불러오지 못했습니다. 저장된 목록을 표시합니다.')
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  async function mutate(next: Todo[], action: () => Promise<void>) {
    const previous = todosRef.current
    setTodos(next)
    saveCachedTodos(next)
    setIsSyncing(true)
    try {
      await action()
      setError(null)
    } catch {
      setTodos(previous)
      saveCachedTodos(previous)
      setError('저장에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsSyncing(false)
    }
  }

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
    mutate([newTodo, ...todosRef.current], () =>
      sendTodoAction({ action: 'create', todo: newTodo }),
    )
  }

  function deleteTodo(id: string) {
    mutate(
      todosRef.current.filter((todo) => todo.id !== id),
      () => sendTodoAction({ action: 'delete', id }),
    )
  }

  function completeTodo(id: string) {
    const now = new Date().toISOString()
    const next = todosRef.current.map((todo) =>
      todo.id === id
        ? { ...todo, status: 'completed' as const, completedAt: now, updatedAt: now }
        : todo,
    )
    const updated = next.find((todo) => todo.id === id)
    if (!updated) return
    mutate(next, () => sendTodoAction({ action: 'update', todo: updated }))
  }

  function cancelTodo(id: string) {
    const now = new Date().toISOString()
    const next = todosRef.current.map((todo) =>
      todo.id === id
        ? { ...todo, status: 'cancelled' as const, cancelledAt: now, updatedAt: now }
        : todo,
    )
    const updated = next.find((todo) => todo.id === id)
    if (!updated) return
    mutate(next, () => sendTodoAction({ action: 'update', todo: updated }))
  }

  function updateTodo(id: string, updates: Partial<Todo>) {
    const now = new Date().toISOString()
    const next = todosRef.current.map((todo) =>
      todo.id === id ? { ...todo, ...updates, updatedAt: now } : todo,
    )
    const updated = next.find((todo) => todo.id === id)
    if (!updated) return
    mutate(next, () => sendTodoAction({ action: 'update', todo: updated }))
  }

  function clearError() {
    setError(null)
  }

  return {
    todos,
    isLoading,
    isSyncing,
    error,
    addTodo,
    deleteTodo,
    completeTodo,
    cancelTodo,
    updateTodo,
    clearError,
  }
}
