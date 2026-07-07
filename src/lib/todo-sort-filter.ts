import type { Todo, TodoStatus } from '@/types/todo'

export type SortOption = 'newest' | 'oldest' | 'title'
export type FilterOption = 'all' | TodoStatus

export function filterTodos(todos: Todo[], filter: FilterOption): Todo[] {
  if (filter === 'all') return todos
  return todos.filter((todo) => todo.status === filter)
}

export function sortTodos(todos: Todo[], sort: SortOption): Todo[] {
  const sorted = [...todos]
  switch (sort) {
    case 'newest':
      return sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
    case 'oldest':
      return sorted.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      )
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title, 'ko'))
  }
}
