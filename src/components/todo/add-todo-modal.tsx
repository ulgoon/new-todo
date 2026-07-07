import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { TodoInputForm } from '@/components/todo/todo-input-form'

interface AddTodoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (title: string) => void
}

export function AddTodoModal({ open, onOpenChange, onAdd }: AddTodoModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>할 일 추가</DialogTitle>
        </DialogHeader>
        <TodoInputForm
          onAdd={onAdd}
          onSubmitted={() => onOpenChange(false)}
          autoFocus
        />
      </DialogContent>
    </Dialog>
  )
}
