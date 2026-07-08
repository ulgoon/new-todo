import type { Todo } from '@/types/todo'

const STORAGE_KEY = 'new-todo:todos-cache'

export function loadCachedTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as Todo[]
  } catch {
    return []
  }
}

export function saveCachedTodos(todos: Todo[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  } catch {
    // localStorage unavailable or full; cache is best-effort only.
  }
}
