export type TodoStatus = 'in_progress' | 'completed' | 'cancelled'

export interface Todo {
  id: string
  title: string
  status: TodoStatus
  createdAt: string
  dueDate: string | null
  completedAt: string | null
  cancelledAt: string | null
  locationAddress: string | null
  locationLat: number | null
  locationLng: number | null
  updatedAt: string
}
