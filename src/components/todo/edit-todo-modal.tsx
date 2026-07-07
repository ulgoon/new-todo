import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TodoLocationMap } from '@/components/todo/todo-location-map'
import { geocodeAddress } from '@/lib/geocode'
import { fromDateTimeLocalValue, toDateTimeLocalValue } from '@/lib/format'
import type { Todo } from '@/types/todo'

interface EditTodoFormProps {
  todo: Todo
  onSave: (id: string, updates: Partial<Todo>) => void
  onClose: () => void
}

function EditTodoForm({ todo, onSave, onClose }: EditTodoFormProps) {
  const [title, setTitle] = useState(todo.title)
  const [dueDateLocal, setDueDateLocal] = useState(toDateTimeLocalValue(todo.dueDate))
  const [isCompleted, setIsCompleted] = useState(todo.status === 'completed')
  const [locationAddress, setLocationAddress] = useState(todo.locationAddress ?? '')
  const [locationLat, setLocationLat] = useState<number | null>(todo.locationLat)
  const [locationLng, setLocationLng] = useState<number | null>(todo.locationLng)
  const [isGeocoding, setIsGeocoding] = useState(false)
  const [geocodeError, setGeocodeError] = useState<string | null>(null)

  async function handleAddressBlur() {
    const trimmed = locationAddress.trim()
    if (!trimmed) {
      setLocationLat(null)
      setLocationLng(null)
      setGeocodeError(null)
      return
    }

    setIsGeocoding(true)
    setGeocodeError(null)
    try {
      const result = await geocodeAddress(trimmed)
      if (result) {
        setLocationLat(result.lat)
        setLocationLng(result.lng)
      } else {
        setLocationLat(null)
        setLocationLng(null)
        setGeocodeError('위치를 찾을 수 없습니다')
      }
    } catch {
      setLocationLat(null)
      setLocationLng(null)
      setGeocodeError('위치 검색에 실패했습니다')
    } finally {
      setIsGeocoding(false)
    }
  }

  function handleSave() {
    const trimmedTitle = title.trim()
    if (!trimmedTitle) return

    const updates: Partial<Todo> = {
      title: trimmedTitle,
      dueDate: fromDateTimeLocalValue(dueDateLocal),
      locationAddress: locationAddress.trim() || null,
      locationLat,
      locationLng,
    }

    if (isCompleted && todo.status !== 'completed') {
      updates.status = 'completed'
      updates.completedAt = new Date().toISOString()
    } else if (!isCompleted && todo.status !== 'in_progress') {
      updates.status = 'in_progress'
    }

    onSave(todo.id, updates)
    onClose()
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>할 일 수정</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="edit-title">할 일 내용</Label>
          <Input
            id="edit-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="edit-due-date">마감시간</Label>
          <Input
            id="edit-due-date"
            type="datetime-local"
            value={dueDateLocal}
            onChange={(event) => setDueDateLocal(event.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="edit-completed"
            checked={isCompleted}
            onCheckedChange={(checked) => setIsCompleted(checked === true)}
          />
          <Label htmlFor="edit-completed">완료</Label>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="edit-location">위치</Label>
          <Input
            id="edit-location"
            value={locationAddress}
            onChange={(event) => setLocationAddress(event.target.value)}
            onBlur={handleAddressBlur}
            placeholder="위치를 입력하세요"
          />
          {isGeocoding && (
            <p className="text-xs text-muted-foreground">위치 검색 중...</p>
          )}
          {geocodeError && <p className="text-xs text-destructive">{geocodeError}</p>}
          {locationLat !== null && locationLng !== null && (
            <TodoLocationMap lat={locationLat} lng={locationLng} />
          )}
        </div>
      </div>
      <DialogFooter>
        <Button onClick={handleSave} disabled={!title.trim()}>
          저장
        </Button>
      </DialogFooter>
    </>
  )
}

interface EditTodoModalProps {
  todo: Todo | null
  onOpenChange: (open: boolean) => void
  onSave: (id: string, updates: Partial<Todo>) => void
}

export function EditTodoModal({ todo, onOpenChange, onSave }: EditTodoModalProps) {
  return (
    <Dialog open={todo !== null} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {todo && (
          <EditTodoForm
            key={todo.id}
            todo={todo}
            onSave={onSave}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
