import { useState, type KeyboardEvent } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface TodoInputFormProps {
  onAdd: (title: string) => void
  onSubmitted?: () => void
  autoFocus?: boolean
}

export function TodoInputForm({ onAdd, onSubmitted, autoFocus }: TodoInputFormProps) {
  const [title, setTitle] = useState('')

  function submit() {
    if (!title.trim()) return
    onAdd(title)
    setTitle('')
    onSubmitted?.()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== 'Enter') return
    event.preventDefault()
    if (event.shiftKey) submit()
  }

  return (
    <div className="flex w-full items-center gap-2">
      <Input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="할 일을 입력하세요"
        autoFocus={autoFocus}
      />
      <Button onClick={submit} disabled={!title.trim()}>
        <Plus />
        추가
      </Button>
    </div>
  )
}
