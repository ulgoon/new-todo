import { Loader2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SyncStatusBannerProps {
  isSyncing: boolean
  error: string | null
  onDismissError: () => void
}

export function SyncStatusBanner({ isSyncing, error, onDismissError }: SyncStatusBannerProps) {
  if (error) {
    return (
      <div className="flex items-center justify-between gap-2 bg-destructive/10 px-4 py-2 text-sm text-destructive">
        <span>{error}</span>
        <Button variant="ghost" size="icon-xs" onClick={onDismissError} aria-label="닫기">
          <X />
        </Button>
      </div>
    )
  }

  if (isSyncing) {
    return (
      <div className="flex items-center gap-2 bg-muted px-4 py-2 text-sm text-muted-foreground">
        <Loader2 className="size-3.5 animate-spin" />
        동기화 중...
      </div>
    )
  }

  return null
}
