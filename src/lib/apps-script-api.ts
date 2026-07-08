import type { Todo } from '@/types/todo'

const API_URL = import.meta.env.VITE_APPS_SCRIPT_URL

type TodoAction =
  | { action: 'create'; todo: Todo }
  | { action: 'update'; todo: Todo }
  | { action: 'delete'; id: string }

export async function fetchTodos(): Promise<Todo[]> {
  if (!API_URL) throw new Error('VITE_APPS_SCRIPT_URL is not set')

  const response = await fetch(API_URL)
  if (!response.ok) throw new Error(`Failed to fetch todos: ${response.status}`)

  const data: { todos: Todo[] } = await response.json()
  return data.todos
}

export async function sendTodoAction(body: TodoAction): Promise<void> {
  if (!API_URL) throw new Error('VITE_APPS_SCRIPT_URL is not set')

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(body),
  })
  if (!response.ok) throw new Error(`Failed to sync todo: ${response.status}`)
}
