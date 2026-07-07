import { useState, type KeyboardEvent } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface CenteredTodoInputProps {
  onAdd: (title: string) => void
}

export function CenteredTodoInput({ onAdd }: CenteredTodoInputProps) {
  const [title, setTitle] = useState('')

  function submit() {
    if (!title.trim()) return
    onAdd(title)
    setTitle('')
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== 'Enter') return
    event.preventDefault()
    if (event.shiftKey) submit()
  }

  return (
    <div className="flex min-h-svh items-center justify-center p-4">
      <div className="flex w-full max-w-md items-center gap-2">
        <Input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="할 일을 입력하세요"
          autoFocus
        />
        <Button onClick={submit} disabled={!title.trim()}>
          <Plus />
          추가
        </Button>
      </div>
    </div>
  )
}
