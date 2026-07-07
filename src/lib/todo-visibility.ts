import type { Todo } from '@/types/todo'

const HIDE_AFTER_MS = 24 * 60 * 60 * 1000

export function isStale(todo: Todo): boolean {
  const finishedAt =
    todo.status === 'completed'
      ? todo.completedAt
      : todo.status === 'cancelled'
        ? todo.cancelledAt
        : null

  if (!finishedAt) return false
  return Date.now() - new Date(finishedAt).getTime() > HIDE_AFTER_MS
}
